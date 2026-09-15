// 微信生态周报 · 访问计数器 Cloudflare Worker
// 全站统一真实计数：PV 每次访问 +1，UV 每个独立访客 +1（首次）
// 基数：PV 1006 / UV 502（仅在该 KV 从未计数过时作为起点）

const PV_BASE = 1006;
const UV_BASE = 502;

// KV 命名空间绑定名：COUNTER_KV（在 wrangler.toml 里配置）
// 键：pv（总访问量）、uv（独立访客数）、uv_seen（已计数的访客指纹集合，用逗号分隔）

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

// 简单的独立访客指纹：结合 IP + 一个前端传入的稳定标识（存于访客 localStorage 的 anonId）
function fingerprint(request, anonId) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const ua = request.headers.get('User-Agent') || '';
  return `${ip}|${anonId || ''}|${ua}`;
}

async function handleGet(request, env) {
  const url = new URL(request.url);
  const anonId = url.searchParams.get('anon') || '';
  const fp = fingerprint(request, anonId);

  // 读取当前计数（不存在则用基数初始化）
  let pvRaw = await env.COUNTER_KV.get('pv');
  let uvRaw = await env.COUNTER_KV.get('uv');
  let seenRaw = await env.COUNTER_KV.get('uv_seen') || '';

  let pv = pvRaw === null ? PV_BASE : parseInt(pvRaw, 10);
  let uv = uvRaw === null ? UV_BASE : parseInt(uvRaw, 10);
  let seen = seenRaw ? seenRaw.split(',') : [];

  // PV 每次 +1
  pv += 1;

  // UV：仅当该指纹首次出现时 +1
  let isNewVisitor = false;
  if (fp && seen.indexOf(fp) === -1) {
    uv += 1;
    seen.push(fp);
    isNewVisitor = true;
    // 防止集合无限膨胀：超过 5000 条时截断保留后 4000 条
    if (seen.length > 5000) {
      seen = seen.slice(-4000);
    }
  }

  // 写回 KV
  await env.COUNTER_KV.put('pv', String(pv));
  await env.COUNTER_KV.put('uv', String(uv));
  await env.COUNTER_KV.put('uv_seen', seen.join(','));

  return new Response(
    JSON.stringify({ pv, uv, isNewVisitor }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        ...corsHeaders(),
      },
    }
  );
}

export default {
  async options() {
    return new Response(null, { headers: corsHeaders() });
  },
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders() });
    }
    return handleGet(request, env);
  },
};
