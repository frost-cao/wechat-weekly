# 微信生态周报项目长期记忆

## 图标风格规范（用户确认，2026-05-12）
- **统一白底圆角方形**背景（rx=14），图标内容用官方原色呈现
- **图标来源优先级**：① 用户直接提供的官方图片（优先！裁剪文字只保留图标）② 官方SVG URL提取 ③ 绝不自己创造形状
- **视频号**：橙色蝴蝶结图案（#F5A623），白底，来自官方logo.png裁剪
- **微信小店**：官方青绿色(#0AB8A6)路径，白底，来自官方SVG提取
- **企业微信**：绿底(#29B765) + ant-design官方路径
- **微信支付**：绿底(#07C160) + Remix Icon官方路径
- **小程序**：绿底(#07C160) + 双圆形路径
- 如有新图标需求：**等用户提供官方图片，不自行绘制**

## 构建流程规范
- b64图标文件路径：`C:\Users\v_yiicao\WorkBuddy\20260413140616\`（非Desktop）
- **⚠️ 双构建源陷阱（2026-07-06 发现）**：真正生效的源是仓库外的 `C:\Users\v_yiicao\WorkBuddy\20260413140616\build_html.js`（自动化从父目录 `node build_html.js` 执行，写向 `wechat-weekly/index.html`）；仓库内 `wechat-weekly/build_html.js` 只是镜像副本，且父目录源**不受 git 版本控制**。改东西务必改父目录那份，或统一收敛到仓库内一份（待用户确认）。
- 当前可用构建命令（保持与自动化一致）：在父目录 `20260413140616` 执行 `node build_html.js`，再到 `wechat-weekly` 执行 `node ../clean_tags.js`
- 构建后推送：`git add index.html build_html.js && git commit -m "..." && git push origin main`
- automation memory路径：`C:\Users\v_yiicao\WorkBuddy\20260413140616\wechat-weekly\.workbuddy\automations\automation\memory.md`（注意：实际路径在 wechat-weekly 下，非 Desktop）

## 内容规范（用户确认，2026-06-16 更新）
- 每条内容必须配原始链接，不允许无链接条目
- 重要截止日期/生效日期用 `alert` class 标红展示
- **链接必须是官方来源**：优先使用各产品线官方域名链接
  - 微信小店：`store.weixin.qq.com`
  - 微信开放平台：`developers.weixin.qq.com`
  - 企业微信：`work.weixin.qq.com`
  - 微信支付：`pay.weixin.qq.com`
  - 公众号/视频号/小程序：优先 `mp.weixin.qq.com` 或官方公告页
- **无官方链接的处理**：如果官方未发布公告/文档，必须在条目中用灰色小字标注，例如：
  - `⚠️ 此为第三方观察，非官方公告`
  - `⚠️ 未找到官方来源，此为行业分析`
  - `⚠️ 测试阶段信息，非正式公告`
- **禁止使用**：第三方媒体链接（腾讯新闻、今日头条、雪球、微信公众号文章等）作为"查看公告"链接

## 信息源抓取规范（2026-06-03 更新，2026-06-16 修订）
**微信小店必须完整抓取成长中心，不能只靠搜索引擎**

**⚠️ 链接规范（2026-06-16 新增）**：
- 抓取时**必须优先找官方链接**（官方文档/公告页），不使用第三方报道链接
- 如果官方未发布公告，先在条目中标注"非官方公告"，不要放第三方链接
- 各产品线官方链接域名：
  - 微信小店：`store.weixin.qq.com/chengzhang/webdoc/...`
  - 微信开放平台：`developers.weixin.qq.com`
  - 企业微信：`work.weixin.qq.com`
  - 微信支付：`pay.weixin.qq.com`
  - 公众号/视频号/小程序：优先官方社区或公告页

执行周报任务时，微信小店信息按以下**固定顺序**采集（每个URL都必须fetch）：

### 必须抓取的成长中心页面（按优先级排序）
| 优先级 | 页面 | URL | 抓取内容 |
|--------|------|-----|----------|
| 1 | 平台公告 | `https://store.weixin.qq.com/chengzhang/notice/all` | 本周全部公告（调整公告/激励政策/治理公告/活动通知） |
| 2 | 规则中心（已修订） | `https://store.weixin.qq.com/chengzhang/rule/shop/1?f_rule_status=rule_status_1` | 已修订规则（含修订日期） |
| 3 | 功能/手册中心 | `https://store.weixin.qq.com/chengzhang/manual/shop/1` | 操作指引、功能更新文档 |
| 4 | 成长中心首页 | `https://store.weixin.qq.com/chengzhang/home` | 兜底，确认无遗漏 |

### 抓取要求
- 每个页面均需**翻页**查看本周（周一至周日）更新的条目，不能只看第1页
- 公告页面共54页，重点看第1页（最新），如有必要时回溯2-3页
- 规则中心共2页，必须看第1页和第2页
- 功能中心共3页，必须看第1页和第2页
- 每条收录内容**必须附原始链接**（`store.weixin.qq.com/chengzhang/webdoc/...`）
- 生效日期/公示截止日期用 `alert` class 标红

### 其他产品线信息源
- 公众号/小程序/视频号/企业微信/微信支付/微信开放平台/推客：微信开发者社区 + WebSearch 关键词
- WebSearch 搜索格式：`产品名 + 更新 + 2026年X月X日-X月X日`

**原因**：成长中心有大量深层规则页面，搜索引擎无法覆盖，必须主动抓取上述4个固定URL。

## 配色规范（用户确认，2026-05-21）
- 整体风格：**轻量、降饱和**，避免大面积深色实色块
- 主色调：中绿 `#2d8b61`（非 `#07553b` 深绿），背景绿 `#f0f7f3 / #fafcfb`
- Header 渐变：`#1b6b48 → #2d8b61 → #52b888`
- 条目竖条：`#86c9a8`（柔和中绿，非鲜亮 `#2ecc87`）
- 卡片标题栏：浅绿背景 + 深绿文字（不用实色深绿块）
- 链接按钮：`#2d8b61` + opacity 0.85，hover 全实

- 8大产品线：公众号、小程序、视频号、微信小店、推客、企业微信、微信开放平台、微信支付
- 每期新增 p{n} 期次，Tab导航最新期在最左，**默认激活最新期**
- ⚠️ **新增期次后必须手动转移 active 类**：从旧期次的 tab-btn 和 period-content 移到新期次！JS 的 `activePeriodId` 变量不够，HTML 的 `active` class 才控制初始渲染
- ⚠️ **PERIODS 数组三处一致（2026-09-15 踩坑）**：新增期次必须同时核对 ① `const PERIODS=[...]` 首条含新 id ② period-content 内容块存在 ③ `activePeriodId` 已改。**只改 activePeriodId 不改 PERIODS 会导致月份下拉不显示新分组/新按钮**（renderTabs 遍历 PERIODS）。构建后必 `grep "id: 'pXX'" index.html` 确认 PERIODS 真有该条目。
- ⚠️ `build_html.js` 在**仓库外**（父目录 `20260413140616`），`git add` 报 "outside repository" 无法提交它；只 `git add index.html`。父目录那份不受 git 版本控制。
- 日历组件自动根据 PERIODS 数组渲染

## 内容过滤规范（2026-06-16 更新）
- **不收录**：警方通报/行政处罚/封号处罚等社会新闻；非官方产品更新的内容
- **只收录**：官方功能上线/算法调整公告；规则中心新修订/新生效规则；平台公告/激励政策/操作指引更新
- **去重**：每期必须与上期对比，上期已报道且无新进展的条目不重复收录（标注"本期无更新"或直接删除）

## 数据恢复规范（2026-06-09）

**重要提醒：永远不要删除历史期次的数据！**

### 问题场景
在编辑 `build_html.js` 时，可能意外删除旧的期次内容块（如 p6、p65）。

### 恢复步骤
1. **从 git 历史恢复**：
   ```bash
   git show <commit-hash>:index.html > recovered.html
   ```
   或使用 Node.js 脚本从 git 历史中提取特定期次的 HTML 块

2. **处理 ID 冲突**：
   - 如果恢复的期次 ID 与新增期次冲突（如旧 p7 和新 p7）
   - 将旧期次重命名为 p{n}{n}（如 p65 表示 2026.5.26–6.1）
   - 同时更新：内容块 ID、PERIODS 数组、Tab 按钮、`switchTab` 调用

3. **修复闭合注释**：
   - 确保每个期次内容块都有正确的闭合注释
   - 格式：`<div class="period-content" id="p{n}">...</div><!-- /p{n} -->`
   - 使用 Node.js 脚本批量查找和替换比手动 Edit 更可靠

4. **验证完整性**：
   ```bash
   grep -n "</div><!-- /p" build_html.js
   ```
   - 确保每个期次都有对应的开始和结束注释
   - 确保 PERIODS 数组、Tab 按钮、内容块三者 ID 一致

### 最佳实践
- **使用 Node.js 脚本处理大块 HTML**：Edit 工具在处理大块内容时可能因特殊字符失败
- **先备份再修改**：`fs.copyFileSync(src, backup)`  before any write operation
- **验证三次**：修改后验证 (1) 文件大小合理 (2) 所有期次可访问 (3) GitHub Pages 正常渲染
- **提交信息详细**：记录恢复了哪些期次、从哪个 commit 恢复、修复了什么问题

## 发布前检查清单（2026-06-16 新增）
每次推送前必须检查以下项目：
1. ✅ **active 类**：只在最新期次的 period-content 上（2026-07-06 起 Tab 栏改为「按月分组下拉选择器」：切换高亮由 `.period-opt.active` + `.month-group.open` 控制，不再有 `tab-btn`）
2. ✅ **HTML 结构**：每个 period-content 标签正确配对（无重复/嵌套错误）
3. ✅ **去重**：与上期对比，删除重复条目
4. ✅ **条数计数**：与实际条目数量一致
5. ✅ **链接检查**：所有链接必须是官方来源，非官方链接已标注说明
6. ✅ **内容过滤**：无警方通报/行政处罚等社会新闻
7. ✅ **`<script>` 开标签**：`grep -c '<script>' index.html` ≥ 1（2026-07-03 曾因缺开标签导致整段 JS 不执行、Tab/截止日/分享按钮全瘫）
8. ✅ **JS 语法**：构建后 `node -e "new Function(脚本)"` 必须可解析（2026-07-06 曾在 build_html.js 模板内用字符串拼接内联 `onclick` 带引号被模板转义破坏，报 "Unexpected string"；**一律用纯 DOM API createElement + .onclick 构建动态内容，禁止在模板字符串里拼引号内联事件**）
9. ✅ **mobile 适配块**：`grep -c '@media (max-width: 768px)' index.html` ≥ 1（2026-07-08 加入移动端适配）
10. 以上全部通过后再 push
11. ✅ **禁用 `git add -A`**（2026-09-15 踩坑：误提交 .wrangler 凭证到公开仓库）。一律 `git add <具体文件>`；临时文件（`_*.py/_*.js`）用完即删，`.gitignore` 已排除凭证与临时脚本。

## 移动端响应式（2026-07-08 加入）
- **断点位置**：build_html.js 模板 `<style>` 中、`@media print` **之前**插入 `@media (max-width: 768px) { ... }` 块
- **块大小**：约 53 条规则、覆盖 45 个 class（header / tabs / cal / search / deadline / container / overview-table / dim-block / item / footer 全家）
- **关键设计**：
  - `.header` 改 `flex-direction: column; align-items: flex-start; padding: 20px 16px 16px`，header-actions 浮右上
  - `.tabs` 改 `flex-wrap: nowrap; overflow-x: auto; -webkit-overflow-scrolling: touch` 横向滚动 + 隐藏滚动条
  - `.period-dropdown` 改 `right: 0; left: auto; min-width: 160px; max-height: 70vh; overflow-y: auto`
  - `.link-btn` 改 `display: block; width: fit-content` 单独成行（窄屏不被挤）
  - `.item` padding-right 保留 30px 给 share-btn
- **常见错误**：
  - ⚠️ 移动端 `@media` 块必须放在 `@media print` 之前（CSS 级联），否则 print 样式被 mobile 覆盖
  - ⚠️ header 不要保留 `position: absolute` 的 actions，要用 `position: static; align-self: flex-end` 重定位
  - ⚠️ 链接按钮 `.link-btn` 在窄屏必须 `display: block`，不能只缩 padding
- **2026-07-08 反馈修复**：
  - **header-actions 漂移**：禁止用 `margin-top: 负值` 假定位；改 `position: absolute; top: 12px; right: 16px`，header 加 `padding-top: 50px` 留位
  - **月份下拉被裁剪**：mobile `.tabs` 用 `overflow-x: auto` 会裁剪所有 absolute 子元素（包括 `.period-dropdown`），**改 `flex-wrap: wrap; overflow: visible` 即可修复**；同时 `.month-group` z-index: 50、`.period-dropdown` z-index: 100 提权防遮挡
  - **普世规则**：`overflow: auto/scroll` 的容器**绝对不能**作为 dropdown/popover 的祖先

## 发布地址（2026-07-08 变更）
- **线上地址（当前）**：`https://frost-cao.github.io/wechat-weekly/`
- **旧地址（已废弃）**：`https://18256302582-ship-it.github.io/wechat-weekly/`（账号 `18256302582-ship-it` 于 2026-07-08 弃用，详见用户级 `~/.workbuddy/MEMORY.md`）
- 所有"验证线上部署 / 给用户的链接 / 自动化 memory 地址引用"一律用**新地址**
- ⚠️ 历史 daily log（2026-05-12 / 2026-05-19 / 2026-06-30）里的旧地址是当时事实记录，**不要回改**
