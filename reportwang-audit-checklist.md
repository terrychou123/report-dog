# ReportWang 代理友善 + SEO 雙審計 Checklist

**適用範圍：** reportwang.com 的所有公開頁面（首頁、功能頁、定價頁、Blog、登入/註冊頁）
不含登入後的應用程式介面

**技術棧：** Next.js App Router + React + TypeScript + Tailwind CSS + Supabase

**使用方式：** 交給 Claude Code，對著現有 codebase 逐項檢查並列出待修清單

---

## A. SEO 基礎

### A1. Title Tag

- [ ] 每個頁面 `<title>` 唯一、不重複
- [ ] 長度 50–60 字元（中文約 25–30 字）
- [ ] 包含主要關鍵字（如「長照評鑑」「報告汪」「核實佐證資料」）
- [ ] 檢查 Next.js `generateMetadata` 是否每頁都有正確設定
- [ ] 動態頁面（如 blog 文章）的 title 不是 fallback 預設值

### A2. Meta Description

- [ ] 每頁都有 `<meta name="description">`
- [ ] 長度 140–160 字元（中文約 70–80 字）
- [ ] 描述具體、有行動引導，不要用罐頭文案
- [ ] 包含長尾關鍵字
- [ ] 動態頁面（blog、功能子頁）有對應的 description，不是共用同一段

### A3. Heading 階層

- [ ] 每頁僅一個 `<h1>`，且為頁面主題
- [ ] `<h2>` 涵蓋頁面主要區段，包含次要關鍵字
- [ ] 階層不跳級（h1 → h3 中間缺 h2 要修）
- [ ] heading 不被用作純視覺樣式（例如為了字大就用 h2）

### A4. Open Graph 與 Twitter Card

- [ ] `og:title`、`og:description`、`og:image` 完整
- [ ] `og:image` 為 1200×630，且為實際內容相關圖（不要用 logo）
- [ ] `twitter:card` 設為 `summary_large_image`

### A5. Canonical 與 hreflang

- [ ] 每頁有 `<link rel="canonical">`
- [ ] 若有繁簡中文版本，設定 `hreflang="zh-TW"` 和 `hreflang="zh-CN"`

### A6. Structured Data

- [ ] 公司資訊用 `Organization` schema
- [ ] 產品頁用 `SoftwareApplication` 或 `Product` schema
- [ ] Blog 文章用 `Article` schema，含 `author`、`datePublished`
- [ ] FAQ 區塊用 `FAQPage` schema
- [ ] 用 Google Rich Results Test 驗證

### A7. Blog 區塊

- [ ] `/blog` 路徑存在且可被索引
- [ ] sitemap 包含所有 blog 文章
- [ ] 內部連結結構：產品頁可導流到相關 blog，blog 文章間有相關連結

### A8. Sitemap 與 robots.txt

- [ ] `sitemap.xml` 自動生成（Next.js 的 `sitemap.ts`）
- [ ] `robots.txt` 不誤擋重要路徑
- [ ] 確認 AI 爬蟲（GPTBot、ClaudeBot、PerplexityBot）的處理策略：要被引用就要允許

---

## B. 代理友善：語義化 HTML（最重要）

### B1. 互動元件的本質

- [ ] 所有可點擊的按鈕都是 `<button>`，不是 `<div onClick>` 或 `<span onClick>`
- [ ] 所有連結都是 `<a href="...">`，不是用 JS 跳轉的 div
- [ ] 連結用於導航，按鈕用於動作（不要把連結樣式化成按鈕但不用 `<a>`）
- [ ] `<button>` 都有明確 `type`（`submit`、`button`、`reset`）

### B2. 語義化區塊

- [ ] 主要內容包在 `<main>`
- [ ] 導覽用 `<nav>`
- [ ] 頁尾用 `<footer>`
- [ ] Blog 文章用 `<article>`
- [ ] 獨立區段用 `<section>`，且有 `aria-labelledby` 或內部 heading
- [ ] 不要用 `<div className="nav">`，要用 `<nav>`

### B3. 圖片與媒體

- [ ] 所有 `<img>` 有 `alt` 屬性
- [ ] 裝飾性圖片用 `alt=""`（明確告訴代理可忽略）
- [ ] 內容性圖片的 `alt` 描述圖片資訊，不只是檔名
- [ ] 重要資訊（功能說明、評鑑流程）不只放在圖片，要有對應文字
- [ ] Next.js `<Image>` 都填了 `alt`

### B4. ARIA 與可存取性樹

- [ ] 自訂元件（如 modal、dropdown、tabs）有正確 `role` 和 `aria-*`
- [ ] 圖示按鈕（純 icon button）有 `aria-label`
- [ ] 隱藏內容用 `aria-hidden="true"` 而不是 `display:none` 內藏文字
- [ ] 打開 Chrome DevTools → Accessibility → Accessibility Tree，檢查首頁是否能看出頁面結構

---

## C. 代理友善：表單與輸入

### C1. Label 綁定

- [ ] 每個 `<input>` 都有對應 `<label for="id">`
- [ ] 或用 `<label>` 包住 `<input>`
- [ ] 不要僅用 `placeholder` 當作 label
- [ ] 表單群組用 `<fieldset>` + `<legend>`

### C2. 輸入屬性

- [ ] `<input>` 有正確 `type`（`email`、`tel`、`url`、`number`）
- [ ] 必填欄位有 `required`
- [ ] 有 `autocomplete` 屬性（如 `email`、`tel`、`name`）
- [ ] 錯誤訊息用 `aria-describedby` 連到輸入框

### C3. 提交流程

- [ ] 表單包在 `<form>` 內
- [ ] 提交按鈕是 `<button type="submit">`
- [ ] Loading 狀態有可見變化（按鈕 `disabled`、文字改變）
- [ ] 成功/失敗訊息對代理可見（不只用顏色區分）

---

## D. 代理友善：版面穩定性

### D1. 沒有 hover-only 互動

- [ ] 主導覽選單不能只有 hover 才展開（要支援 click/tap）
- [ ] 重要 CTA 不依賴 hover 才出現
- [ ] Tooltip 內的關鍵資訊也要有 text fallback

### D2. 視覺穩定

- [ ] 沒有強烈 layout shift（CLS < 0.1）
- [ ] 圖片有 `width`/`height`，避免載入時撐版
- [ ] Web font 載入策略合理（`font-display: swap`）

### D3. Cursor 與點擊提示

- [ ] 所有可點擊元素有 `cursor: pointer`

特別注意：Tailwind v4 預設 `<button>` 沒有 `cursor: pointer`，要在 global CSS 加：

```css
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

- [ ] 互動元件最小點擊區域 ≥ 24×24 px（行動裝置）

### D4. 互動回饋

- [ ] 按鈕點擊後有可見狀態（pressed、loading、disabled）
- [ ] Focus state 明顯（不要 `outline: none` 又沒補上其他 focus 樣式）

---

## E. 代理友善：渲染策略

### E1. SSR/SSG 確認

- [ ] 著陸頁、功能頁、定價頁用 Server Component（App Router 預設）
- [ ] 公開的 blog 文章用 SSG 或 ISR
- [ ] 用 `curl` 或 `view-source:` 檢查：產品名稱、定價、功能描述、CTA 文字是否在初始 HTML 內，而不是 client-side render 後才出現
- [ ] 重要結構化資料（JSON-LD）在 server 端就輸出

### E2. JavaScript 依賴

- [ ] 關掉 JS 看頁面：核心內容（產品介紹、價格、聯絡資訊）仍可讀
- [ ] 不要把唯一的 CTA 放在 client component
- [ ] `'use client'` 邊界明確，不要整頁都 client component

### E3. 效能

- [ ] PageSpeed Insights 分數 ≥ 90（行動裝置 ≥ 85）
- [ ] LCP < 2.5s、FID < 100ms、CLS < 0.1
- [ ] 首屏 HTML 體積合理（避免 hydration 太重）

---

## F. 內容品質（呼應 Google 對「非普通內容」的定義）

### F1. 內容深度

- [ ] 每篇 blog 不是 AI 生成味很重的「7 個技巧」「5 個重點」
- [ ] 包含真實案例：哪間長照機構用了報告汪、過程細節、結果
- [ ] 包含具體數字：評鑑準備時間從幾天到幾小時、節省多少人力
- [ ] 內容能回答長照業者實際痛點，不是泛泛而談

### F2. E-E-A-T（經驗、專業、權威、可信）

- [ ] 文章有作者標示（即使是 Terry 本人或團隊）
- [ ] About 頁面說明團隊的長照領域背景
- [ ] 引用法規來源（衛福部公告、長照 2.0 評鑑指標）並連結
- [ ] 客戶案例或見證（取得授權後使用）

### F3. 避免內容濫用

- [ ] 不要為每個關鍵字變體建獨立頁面（如「台北長照評鑑」「新北長照評鑑」「桃園長照評鑑」內容雷同）
- [ ] 不重複發佈幾乎相同內容的不同版本
- [ ] 內容更新有實質改動，不只是改日期

---

## G. AI 爬蟲與引用準備

### G1. 爬蟲存取

- [ ] `robots.txt` 對主要 AI 爬蟲的策略明確：
  - `GPTBot`（OpenAI）
  - `ClaudeBot`、`anthropic-ai`（Anthropic）
  - `PerplexityBot`、`Perplexity-User`
  - `Google-Extended`（Google AI 訓練用，獨立於 Googlebot）
- [ ] 若希望被引用，至少允許 user-agent 抓取公開內容

### G2. 內容可引用性

- [ ] 重要事實（功能、價格、支援的評鑑類型）以結構化方式呈現
- [ ] FAQ 區塊用問答結構，每題答案能獨立成立
- [ ] 數據和統計有來源連結

### G3. 不要做的事（Google 明確說沒用）

- ❌ 不需要建立 `llms.txt`
- ❌ 不需要為 AI 把內容「分塊」成微小片段
- ❌ 不需要為 AI 改寫整站內容
- ❌ 不需要在外部網站灌「提及」
