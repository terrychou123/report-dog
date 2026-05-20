# ReportWang 代理友善 + SEO 雙審計結果

**審計日期：** 2026-05-19
**對照檔案：** `reportwang-audit-checklist.md`
**審計範圍：** 公開頁面 — `/`、`/pricing`、`/testimonial`、`/downloads`、`/onboarding`、`/blog/**`、`/docs/**`、`/school/**`、11 個 facility landing pages、`/auth/login`、`/auth/sign-up`
**排除：** `/protected/**`、`/(dashboard)/**`、`/admin/**`、`/blog-admin/**`

> 註：checklist 本身沒有 H 節（執行優先順序建議），本報告第 3 部份採用合理預設分波。

---

## 1. PASS 清單（已符合）

### A. SEO 基礎
- **A1 Title**：全站 template `%s｜報告汪`（`app/layout.tsx:13-16`）；14+ 頁有獨立 title；blog 動態 title 用 `seoTitle || title` 非 fallback（`app/blog/[slug]/page.tsx:106`）
- **A2 Description**：主要公開頁皆設定；blog/school/docs 動態頁有獨立 description（`app/blog/[slug]/page.tsx:107`、`app/school/daycare/page.tsx:22-23`、`app/docs/getting-started/page.tsx:10`）
- **A3 Heading**：首頁、blog 列表、blog 文章、pricing、各機構頁皆唯一 `<h1>`（`app/page.tsx:116`、`app/blog/page.tsx:129`、`app/blog/[slug]/page.tsx:252`、`app/pricing/page.tsx:52`）
- **A4 OG/Twitter**：layout 預設完整含 1200×630 image（`app/layout.tsx:22-37`）；多數機構頁有專屬動態 OG（`app/psychiatric/opengraph-image.tsx` 等）；blog [slug] 有動態 OG
- **A5 Canonical**：`metadataBase` 已設（`app/layout.tsx:12`）；每頁有獨立 canonical
- **A6 JSON-LD**：Organization、WebSite+SearchAction、SoftwareApplication+Offer、FAQPage、BlogPosting、HowTo、Breadcrumb 全部齊全（`lib/jsonld.ts` + 各頁注入）
- **A7 Blog**：`/blog` 可索引；sitemap 動態抓所有 published 文章（`app/sitemap.ts:11-25`）；機構頁 → blog → school 內部連結結構完整
- **A8 Sitemap/robots**：sitemap 涵蓋首頁/12 機構/pricing/testimonial/downloads/blog/docs/school 全子頁；revalidate=86400（`app/sitemap.ts:7`）

### B. 語義化 HTML
- **B1**：審計範圍無 `<div onClick>` / `<span onClick>` 用於導航；導覽連結一律 `next/link`（`components/navbar.tsx:13-27`）；多數 `<button>` 有 `type`
- **B2**：`<nav>`（`components/navbar.tsx:10`）、`<footer>`（`components/footer.tsx:8`）、`<main>`、`<article>`（`app/docs/**/page.tsx`）、`<section>` 都有用；mobile Sheet 有 `<SheetTitle className="sr-only">`（`components/mobile-menu.tsx:22`）
- **B3**：審計範圍內所有 `<img>`、`<Image>` 都帶 `alt`（含裝飾性 `alt=""`）
- **B4**：Mobile/Docs/School trigger 有 `aria-label`；隱藏錨點 `aria-hidden="true"`（`components/downloads/download-gate-dialog.tsx:81`）；密碼切換按鈕有 aria-label（`components/sign-up-form.tsx:147`）

### C. 表單與輸入
- **C1**：sign-up/login/download-gate 都有 `<Label htmlFor>` 綁定（`components/sign-up-form.tsx:126/128, 142/161` 等）；newsletter 用 `aria-label`
- **C2 部分**：sign-up-form 完整設定 `type="email" inputMode="email" autoComplete="email" required`（126-138）、`autoComplete="new-password"`（163, 176）
- **C3**：form 包覆、`<Button type="submit">`、loading 文字可見變化

### D. 版面穩定性
- **D1**：桌面 nav 不靠 hover、行動 Sheet click 觸發
- **D4**：shadcn `Button` 有 `focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`（`components/ui/button.tsx:8`）；sign-up-form 自訂 button 也補上 focus ring（`components/sign-up-form.tsx:103`）；globals.css 無粗暴 `outline:none`

### E. 渲染策略
- **E1**：所有 facility landing 與 pricing 皆為 Server Component；blog 用 `"use cache"` + `cacheTag`（`app/blog/[slug]/page.tsx:57,60`）；JSON-LD 全部 server 端 `dangerouslySetInnerHTML` 輸出（`app/layout.tsx:70-75` 等）
- **E2**：`'use client'` 邊界乾淨；CTA 用 islands 模式（`StartButton`、`TrialButton`、`TrackedCtaLink`）
- **E3**：`next/font` 用 `display: "swap"`（`app/layout.tsx:46-50, 54-59`）；公開頁零原生 `<img>`；GA/AdSense `next/script` afterInteractive 不阻塞

### F. 內容品質
- Blog schema 有 `author` 欄位（`db/schema.ts:151`）並渲染（`app/blog/[slug]/page.tsx:258-260`）
- HowTo schema 至少 3 步才注入（避免 schema spam）
- 文章自動 TOC、TL;DR、閱讀時間、首字圖 priority

### G. AI 爬蟲與引用
- **G1**：明確允許 GPTBot / ClaudeBot / anthropic-ai / PerplexityBot / Google-Extended / cohere-ai / CCBot（`app/robots.ts:22-26`）
- **G2**：FAQPage schema 全站 facility 頁都有；blog 自動萃取 FAQ；`/llms.txt` 動態產生供 LLM 引用（`app/llms.txt/route.ts`）

---

## 2. FAIL 清單（未符合）

### A. SEO 基礎

**A1. Title 嚴重超長（中文 33–50 字，建議 25–30 字）**
- `app/home-care/page.tsx:19` — `居服機構 AI 文書管理系統｜督導標籤追蹤・日誌 AI 撰寫・評鑑查核零補件`
- `app/day-care/page.tsx:20` — `日照中心 AI 文書管理系統｜活動紀錄 AI 撰寫・評鑑備審一鍵彙整・多職類協作`
- `app/residential/page.tsx:19` — `住宿型長照機構 AI 文書管理系統｜護理師・照服員・社工・營養師多職種協作｜報告汪`
- `app/hospital/page.tsx:19` — `醫院護理部 AI 文書管理｜病房報告整合・交接班標籤・評鑑備審｜報告汪`
- `app/disability-welfare/page.tsx:20` — 50+ 字
- `app/page.tsx:40` — `absolute` 跳過 template 且 56 字
- **修正**：壓縮至 25–30 字，例：「居服機構 AI 文書管理｜日誌・評鑑備審｜報告汪」

**A1. 認證頁完全無 metadata**
- `app/auth/login/page.tsx`、`app/auth/sign-up/page.tsx`
- **修正**：加 `export const metadata = { title: "登入｜報告汪", robots: { index: false } }`

**A1. 「核實佐證資料」關鍵字未出現在任何 title**
- **修正**：在 `/school` 主頁或 `/downloads` title 納入此關鍵字

**A2. Description 嚴重超長（中文 100–200 字，建議 70–80 字）**
- `app/page.tsx:42`（~130 字）、`app/hospital/page.tsx:21`、`app/residential/page.tsx:21`、`app/disability-welfare/page.tsx:21`
- `app/school/page.tsx:27-28`（200+ 字，極端違規）
- **修正**：壓縮至 70–80 字，聚焦核心賣點

**A3. Blog 文章 CTA 卡片硬編碼 `<h2>` 干擾文章結構**
- `app/blog/[slug]/page.tsx:350` — `<h2 className="text-xl font-bold mb-2">報告汪 — AI 長照文書助理</h2>`
- `app/blog/[slug]/page.tsx:366` — `<h2>延伸閱讀：評鑑基準小教室</h2>`
- **修正**：改為 `<p className="font-bold text-xl">` 或 `<h3>`

**A4. multi-function-care Twitter card 區塊缺失**
- `app/multi-function-care/page.tsx:26-29` — 只有 openGraph，沒 twitter
- **修正**：加 `twitter: { card: "summary_large_image", title, description }`

**A5. 全站無 hreflang** ✅ 已決策：維持現狀
- 業務無 zh-CN 計畫（2026-05-19 確認），`<html lang="zh-TW">` 足夠
- 此項從 FAIL 移除，不需修正

**A5. canonical 格式不一致**
- 部分絕對 URL（`app/blog/page.tsx:26`），部分相對 path（`app/pricing/page.tsx:13`）
- **修正**：基於 `metadataBase` 統一用相對 path

**A6. Pricing Offer schema 缺 parent product context**
- `app/pricing/page.tsx:34-44` — 純 Offer 沒 `itemOffered`
- **修正**：包裝為 `SoftwareApplication`，offers 為其屬性

**A6. Blog author 為通用名稱**
- `lib/jsonld.ts:132` — fallback 為「報告汪編輯團隊」
- **修正**：依文章作者欄位帶入真實具名 Person（E-E-A-T）

**A7. robots.ts disallow 路徑未加尾斜線（前綴匹配風險）**
- `app/robots.ts:16-19` — `/follow`、`/share`、`/tag`
- **修正**：改為 `/follow/`、`/share/`、`/tag/` 精確匹配

**A7. sitemap DB 失敗靜默 fallback**
- `app/sitemap.ts:16-18` — catch 後 publishedPosts 為空陣列無告警
- **修正**：加 logging/Sentry 監控

**A8. `/onboarding` 列入 sitemap 但為登入流程 client 頁**
- `app/sitemap.ts:74`
- **修正**：移除或在 `app/onboarding/page.tsx` 加 `robots: { index: false }`

### B. 語義化 HTML / a11y

**B1. `<span role="button">` 巢狀包覆 `<button>` 造成互動元素巢狀**
- `components/downloads/download-gate-dialog.tsx:83-91`
- 違反內容：`<span onClick={handleOpen} role="button" tabIndex={0} ...>{trigger}</span>` 而 `trigger` 常傳入 `<button>`（如 `school-download-button.tsx:31`、`app/downloads/page.tsx:101`）
- **修正**：改用 Radix `<DialogTrigger asChild>` 標準模式，把 onClick 綁在原生 button 上

**B1. 原生 `<button>` 缺 `type`（預設 submit 會誤觸發父表單）**
- `components/school/school-download-button.tsx:31`
- `app/downloads/page.tsx:101`
- **修正**：加 `type="button"`

**B2. `app/page.tsx` 11 個 `<section>` 缺 aria 標籤**
- `app/page.tsx:111, 131, 147, 217, 276, 303, 355, 369, 516, 568, 645`（僅 `:604` 有 `aria-label="常見問題"`）
- **修正**：每個 section 內最重要 heading 加 `id`，section 加 `aria-labelledby`

**B2. navbar 未用 `<header>` 包覆**
- `components/navbar.tsx:10`
- **修正**：以 `<header>` 包 `<nav>`，協助螢幕閱讀器辨識 banner landmark

**B4. ThemeSwitcher icon-only trigger 無 aria-label**
- `components/theme-switcher.tsx:32-53` — `<Button>` 內只有 Sun/Moon/Laptop 圖示
- **修正**：加 `aria-label="切換主題"` 或 sr-only 文字

### C. 表單

**C2. login-form 缺 autoComplete / inputMode**
- `components/login-form.tsx:73-80, 92-98`
- **修正**：email input 加 `autoComplete="email" inputMode="email"`；password input 加 `autoComplete="current-password"`

**C2. download-gate-dialog 缺 autoComplete**
- `components/downloads/download-gate-dialog.tsx:105-114`
- **修正**：加 `autoComplete="email" inputMode="email"`

**C2. newsletter-form 缺 autoComplete**
- `components/newsletter-form.tsx:43-52`
- **修正**：加 `autoComplete="email" inputMode="email"`

### D. 版面穩定性

**D3. globals.css 無 `cursor: pointer` 規則（Tailwind v4 預設 button 無手型）**
- `app/globals.css` — grep 無 cursor 規則
- **修正**：
  ```css
  @layer base {
    button:not(:disabled),
    [role="button"]:not(:disabled) { cursor: pointer; }
  }
  ```

**D4. 自訂原生 `<button>` 缺 focus-visible 樣式**
- `components/school/school-download-button.tsx:31`
- `app/downloads/page.tsx:101`
- **修正**：補 `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded`，或改用 `<Button>` 元件

### F. 內容品質

**F. facility landing pages 模板化雷同度高**
- `app/home-care/page.tsx`、`app/hospital/page.tsx`、`app/day-care/page.tsx`、`app/general-nursing-home/page.tsx`、`app/disability-welfare/page.tsx`、`app/home-nursing/page.tsx`
- 雷同證據：六頁開頭 import 順序相同、`STATS` 三欄結構相同、`FAQPage` JSON-LD 模板相同（「報告汪適合 X 哪些角色使用？」/「如何用 Y 標籤管理 Z？」）、`reviewJsonLd` 注入位置一致；差異僅名詞替換（居服員/護理師、督導/護理長）與 stats 數字
- **修正**：(a) 每頁加 1–2 段機構獨有真實內容（如「居服員工作流程實例」、「醫院 JCI 評鑑特有挑戰」）；(b) FAQ 至少 50% 換成該機構真實常見問題；(c) stats 數字加可驗證來源或 disclaimer

**F. facility 頁面引用「115 年度評鑑基準」但無官方連結**
- 多個 facility 著陸頁
- **修正**：在 FAQ 或 footer 加「資料來源：衛生福利部 [URL]」連結

### G. AI 爬蟲

**G1. robots.ts 缺 Perplexity-User**
- `app/robots.ts:23`（Perplexity 2024 後有兩個 UA：`PerplexityBot` 爬蟲 + `Perplexity-User` 即時讀取）
- **修正**：userAgent 陣列加 `"Perplexity-User"`

**G1. robots.ts 缺 Applebot-Extended**
- `app/robots.ts:23`（Apple Intelligence / Siri 訓練）
- **修正**：補 `"Applebot-Extended"`

### G3 反向檢查（策略議題）

**`/llms.txt` 存在** — `app/llms.txt/route.ts` ✅ 已決策：保留
- 2026-05-19 確認保留，理由已寫入 `CLAUDE.md` 的「SEO Infrastructure」區塊
- 屬主動引用策略，動態產生，不影響 SEO sitemap/robots，純粹是 LLM-only 補充入口
- 此項從 FAIL 移除

---

## 3. 修正優先順序

### 🔴 第一波（高 ROI / 直接影響 CTR + 代理可用性）

| 項目 | 位置 |
|---|---|
| 壓縮所有 facility/首頁 title 至 25–30 字 | `app/{page,home-care,day-care,hospital,residential,disability-welfare,...}/page.tsx` |
| 壓縮 description 至 70–80 字（特別是 `app/school/page.tsx:27-28`） | 同上 + `app/school/page.tsx` |
| 認證頁加 `robots: { index: false }` metadata | `app/auth/login/page.tsx`、`app/auth/sign-up/page.tsx` |
| globals.css 補 `button { cursor: pointer }` | `app/globals.css` |
| 拆 download-gate-dialog 的 `<span role="button">` 巢狀互動 | `components/downloads/download-gate-dialog.tsx:83-91` |
| login-form / download-gate / newsletter 補 `autoComplete` + `inputMode` | `components/login-form.tsx:73-98`、`download-gate-dialog.tsx:105-114`、`newsletter-form.tsx:43-52` |
| Blog CTA `<h2>` 改成非語義標籤 | `app/blog/[slug]/page.tsx:350, 366` |

### 🟡 第二波（SEO + a11y 強化）

| 項目 | 位置 |
|---|---|
| robots.ts 加 `Perplexity-User`、`Applebot-Extended` | `app/robots.ts:22-26` |
| robots.ts disallow 路徑加尾斜線 | `app/robots.ts:16-19` |
| `/onboarding` 加 `robots: { index: false }` 並從 sitemap 移除 | `app/onboarding/page.tsx` + `app/sitemap.ts:74` |
| school-download-button / downloads button 補 `type="button"` + focus-visible | `components/school/school-download-button.tsx:31`、`app/downloads/page.tsx:101` |
| ThemeSwitcher 加 `aria-label` | `components/theme-switcher.tsx:32-53` |
| navbar 用 `<header>` 包 `<nav>` | `components/navbar.tsx:10` |
| `app/page.tsx` 11 個 section 補 `aria-labelledby` | `app/page.tsx:111,131,147,217,276,303,355,369,516,568,645` |
| multi-function-care 補 `twitter` metadata 區塊 | `app/multi-function-care/page.tsx:26-29` |
| canonical URL 統一為相對 path | 各 `metadata.alternates.canonical` |
| Pricing Offer 包裝為 `SoftwareApplication` schema | `app/pricing/page.tsx:34-44` |

### 🟢 第三波（內容品質 + 策略議題）

| 項目 | 位置 |
|---|---|
| facility landing pages 去模板化（加機構獨有段落、FAQ 換 50%、stats 加 disclaimer） | 6 個 facility 著陸頁 |
| facility 頁面加衛福部評鑑基準官方連結 | 同上 |
| Blog `author` 帶入真實具名 Person（E-E-A-T） | `lib/jsonld.ts:132` |
| sitemap DB 失敗加告警 logging | `app/sitemap.ts:16-18` |
| 「核實佐證資料」關鍵字納入 `/school` 或 `/downloads` title | `app/school/page.tsx`、`app/downloads/page.tsx` |

> 已決策（無需執行）：
> - hreflang — 維持現狀，無 zh-CN 計畫
> - `/llms.txt` — 保留，理由已記錄於 `CLAUDE.md`

---

## 整體評估

**強項：**
- SEO 基礎工程紮實：metadataBase、sitemap、robots、JSON-LD helpers 完整
- 渲染策略乾淨：公開頁面 100% Server Component + JSON-LD server 注入 + islands CTA
- a11y 基線高於業界平均：所有 `<img>`/`<Image>` 都有 alt、form label 全部綁定、icon button 多數有 sr-only、shadcn primitives 內建 focus-visible

**最大缺口：**
1. **Title/description 普遍超長** — SERP 截斷直接影響 CTR
2. **facility landing pages 模板化嚴重** — F2 內容深度與 Google 「非普通內容」原則衝突，是中期 SEO 風險
3. **app/globals.css 缺 `cursor: pointer`** — 全站按鈕滑鼠回饋不自然，這是 Tailwind v4 已知陷阱

修完第一波即可看到 CTR、a11y 評分明顯提升；第三波是長期內容工程。
