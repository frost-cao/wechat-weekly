# -*- coding: utf-8 -*-
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

def font(size, bold=False):
    p = r"C:\Windows\Fonts\msyhbd.ttc" if bold else r"C:\Windows\Fonts\msyh.ttc"
    return ImageFont.truetype(p, size)

# 渐变背景（135°方向：左上 #1b6b48 → 中 #2d8b61 → 右下 #52b888）
c1 = np.array([0x1b, 0x6b, 0x48])
c2 = np.array([0x2d, 0x8b, 0x61])
c3 = np.array([0x52, 0xb8, 0x88])
xs = np.linspace(0, 1, W)
ys = np.linspace(0, 1, H)
tx = xs * 0.55
ty = ys * 0.45
T = np.minimum(tx[np.newaxis, :] + ty[:, np.newaxis], 1.0)  # (H, W)
T3 = T[:, :, np.newaxis]  # (H, W, 1)
half = 0.5
grad = np.zeros((H, W, 3))
mask1 = T < half
mask2 = ~mask1
t1 = T[mask1][:, np.newaxis]  # (N,1)
grad[mask1] = (c1 * (1 - t1 / half) + c2 * (t1 / half))
t2 = T[mask2][:, np.newaxis]
grad[mask2] = (c2 * (1 - (t2 - half) / half) + c3 * ((t2 - half) / half))
img = Image.fromarray(grad.clip(0, 255).astype(np.uint8), "RGB")

d = ImageDraw.Draw(img)

# 顶部金色徽标
bx0, by0, bx1, by1 = 80, 78, 310, 124
d.rounded_rectangle([bx0, by0, bx1, by1], radius=23, fill=(0xf5, 0xa6, 0x23))
bt = font(24, bold=True)
btext = "每周更新 · 第20期"
bw = d.textlength(btext, font=bt)
d.text(((bx0 + bx1 - bw) / 2, by0 + 9), btext, font=bt, fill=(0x5a, 0x3d, 0x00))

# 主标题
d.text((80, 180), "微信生态每周更新汇总", font=font(72, bold=True), fill=(255, 255, 255))

# 副标题（产品线）
d.text((82, 278), "公众号 · 小程序 · 视频号 · 微信小店 · 推客 · 企业微信 · 开放平台 · 微信支付",
       font=font(27), fill=(234, 255, 242))

# 分隔线
d.line([(82, 330), (1118, 330)], fill=(255, 255, 255), width=2)

# 本期重点
d.text((82, 368), "本期重点（2026.9.7–9.13）", font=font(30, bold=True), fill=(255, 216, 122))
lines = [
    "· 微信小店规则治理密集落地（热招品牌 / 无人机实名 / 珍珠质检）",
    "· 微信开放平台「接入微信 AI 生态指引」自动模式内测开启",
    "· 微信支付服贸会展示跨境收付通 / 全球收银台",
]
yy = 420
for ln in lines:
    d.text((82, yy), ln, font=font(25), fill=(255, 255, 255))
    yy += 44

out = r"C:\Users\v_yiicao\WorkBuddy\20260413140616\wechat-weekly\og-cover.png"
img.save(out, "PNG", optimize=True)
print("PNG 生成成功:", "%.1fKB" % (os.path.getsize(out) / 1024))
