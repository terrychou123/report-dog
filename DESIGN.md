# Design System — 報告汪

## Product Context
- **What this is:** 台灣長照機構評鑑報告管理平台，提供報告複製模板、AI 段落編輯、標籤分類管理
- **Who it's for:** 社工、個管師、行政人員
- **Space/industry:** 長照評鑑 / 社會福利 / 醫療健康 SaaS
- **Project type:** Web app (dashboard + 行銷頁面 + 部落格)

## Aesthetic Direction
- **Direction:** Organic/Natural — 大地色調、圓潤形態、溫和紋理
- **Decoration level:** Intentional — 微妙的暖色底色變化，不是純白
- **Mood:** 溫暖、專業、值得信賴。像一位經驗豐富的社工同事，而不是冷冰冰的企業工具。
- **Reference sites:** PointClickCare (森林綠)、Sage Health (薰衣草紫)、CareAcademy (橘色)

## Typography
- **Display/Hero:** Noto Serif TC (weight 600-700) — 中文襯線體傳達「正式感」和「文件權威感」，對評鑑報告平台很合適
- **Body:** Geist Sans (weight 400-500) — 現代幾何無襯線，閱讀舒適
- **UI/Labels:** Geist Sans (weight 500-600)
- **Data/Tables:** Geist Sans (tabular-nums) — 數字等寬對齊
- **Code:** Geist Mono
- **Loading:** Noto Serif TC 透過 `next/font/google` 載入；Geist 已透過 `next/font/google` 載入
- **Scale:**
  - hero: 42px / 2.625rem (serif)
  - h1: 32px / 2rem (serif)
  - h2: 24px / 1.5rem (serif)
  - h3: 18px / 1.125rem (serif)
  - body: 16px / 1rem (sans)
  - small: 14px / 0.875rem (sans)
  - caption: 12px / 0.75rem (sans)
  - data-large: 32px / 2rem (sans, tabular-nums)

## Color

### Approach: Balanced
深青色主色保留專業感但帶溫度，赤陶橘強調色用於 CTA 和重點標註（與 blog SVG 統一）。

### Light Mode (CSS variables for `globals.css` `:root`)
```css
--background: 40 20% 99%;           /* #faf9f6 暖米白 */
--foreground: 20 10% 17%;           /* 暖深色文字 */
--card: 0 0% 100%;                  /* 白色卡片 */
--card-foreground: 20 10% 17%;
--popover: 0 0% 100%;
--popover-foreground: 20 10% 17%;
--primary: 195 55% 38%;             /* 深青色 */
--primary-foreground: 0 0% 100%;
--secondary: 35 8% 93%;             /* 暖灰 */
--secondary-foreground: 20 10% 17%;
--muted: 35 10% 94%;                /* 暖灰底 */
--muted-foreground: 28 5% 45%;      /* 暖灰文字 */
--accent: 18 76% 52%;               /* 赤陶橘 */
--accent-foreground: 0 0% 100%;
--destructive: 0 72% 55%;
--destructive-foreground: 0 0% 98%;
--border: 35 8% 87%;                /* 暖邊框 */
--input: 35 8% 87%;
--ring: 195 55% 38%;
--chart-1: 195 55% 38%;             /* 深青 */
--chart-2: 18 76% 52%;              /* 赤陶橘 */
--chart-3: 152 55% 40%;             /* 綠色 */
--chart-4: 38 90% 52%;              /* 琥珀 */
--chart-5: 280 45% 55%;             /* 紫色 */
--radius: 0.625rem;
```

### Dark Mode (CSS variables for `globals.css` `.dark`)
```css
--background: 20 15% 9%;            /* 帶暖色的深色 */
--foreground: 35 10% 93%;
--card: 20 10% 14%;
--card-foreground: 35 10% 93%;
--popover: 20 10% 14%;
--popover-foreground: 35 10% 93%;
--primary: 195 50% 55%;
--primary-foreground: 0 0% 100%;
--secondary: 20 8% 18%;
--secondary-foreground: 35 8% 88%;
--muted: 20 8% 18%;
--muted-foreground: 28 5% 55%;
--accent: 18 70% 58%;
--accent-foreground: 0 0% 100%;
--destructive: 0 62% 30%;
--destructive-foreground: 0 0% 98%;
--border: 20 6% 24%;
--input: 20 6% 24%;
--ring: 195 50% 55%;
--chart-1: 195 50% 55%;
--chart-2: 18 70% 58%;
--chart-3: 152 45% 50%;
--chart-4: 38 80% 58%;
--chart-5: 280 45% 60%;
```

### Semantic Colors
- **Success:** hsl(152, 55%, 40%)
- **Warning:** hsl(38, 90%, 52%)
- **Error:** hsl(0, 72%, 55%)
- **Info:** hsl(195, 55%, 38%) (same as primary)

## Icons
- **Style:** 單色 SVG 線條 icon (outline style)
- **Library:** Lucide Icons（與 shadcn/ui 一致，安裝：`npm install lucide-react`）
- **Specs:** 24x24 viewBox, stroke-width: 1.8, stroke-linecap: round, stroke-linejoin: round, fill: none
- **Feature cards（大 icon）:** 44x44 圓形淺色背景 (border-radius: 50%) + 22x22 icon
  - Primary icons: `background: hsl(var(--primary) / 0.1)`, `color: hsl(var(--primary))`
  - Accent icons: `background: hsl(var(--accent) / 0.1)`, `color: hsl(var(--accent))`
- **Sidebar / inline:** 16x16 直接使用，不加背景
- **Alerts / inline labels:** 16x16 直接使用，顏色跟隨 alert 語義色
- **不使用 emoji 作為 UI icon**

## Spacing
- **Base unit:** 4px
- **Density:** Comfortable
- **Scale:** 2xs(2px) xs(4px) sm(8px) md(16px) lg(24px) xl(32px) 2xl(48px) 3xl(64px)

## Layout
- **Approach:** Grid-disciplined (dashboard 嚴格欄位，行銷頁面適度放鬆)
- **Grid:** 12 columns (desktop), 8 (tablet), 4 (mobile)
- **Max content width:** 1100px
- **Border radius:**
  - sm: 6px (badge, 小元件)
  - default: 10px (buttons, inputs, cards) — `--radius: 0.625rem`
  - lg: 16px (large cards, modals, dashboard panels)
  - full: 9999px (pills, avatars)

## Motion
- **Approach:** Minimal-functional — 只處理狀態轉場，不加裝飾動畫
- **Easing:** enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration:** micro(50-100ms) short(150-250ms) medium(250-400ms)
- **不使用 scroll-driven animations 或 entrance animations**

## Docs Illustration

### 目的與適用範圍

- 用在 `/docs/*` 教學頁，以步驟操作示意圖輔助文字說明
- **一條原則：示意圖補充說明，不取代文字步驟**（SEO `<ol>/<ul>` 文字必須完整保留）
- Blog SVG（`public/blog/`）走另一套風格，不適用此規範
- 行銷頁面優先用真實截圖，不用示意圖

| 情境 | 建議 |
|---|---|
| 步驟教學（點 X、選 Y、填 Z） | SVG mockup（UI 改版時只改 SVG，成本低） |
| 真實資料展示（圖表結果、AI 回應範例） | 真實截圖 PNG（去識別化） |
| 概念說明（什麼是標籤、權限如何運作） | Flow / diagram SVG（白底、結構為主） |
| 純概念無視覺操作 | 不放圖，文字 + DocsTip 即可 |

---

### 檔案規格

```
位置:        public/docs/<page-slug>-step<n>-<verb>.svg
範例:        public/docs/create-report-step1-modal.svg
viewBox:     800 × 500（無例外）
字型:        font-family="'Noto Sans TC', sans-serif"
檔案大小:    目標 < 30KB（PoC 三張為 3.5 / 6.0 / 4.8 KB）
```

---

### 色票（凍結自 PoC getting-started）

| 用途 | Hex |
|---|---|
| 畫布背景 | `#f0efe8` |
| 主卡片底 | `#ffffff` |
| 卡片描邊 | `#e8e6de` |
| 分隔線 | `#dedad3` |
| 主標題色 | `#1e293b` |
| 內文 | `#57534e` |
| 次要文字 | `#78716c` |
| 中性灰（placeholder / icon） | `#a8a29e` |
| Active / 連結 / 主按鈕 | `#3a8fa8`（對應 UI `--primary`） |
| 高亮虛線框、箭頭 | `#d97706`（對應 UI `--accent` 的 SVG 變體） |
| 標註淡底 | `#fef3c7` |
| 標註文字 | `#92400e` |
| Modal 遮罩 | `#1e293b` opacity 0.4 |

---

### 字級 & 圓角

**字級（font-size）：** 主標 22 / 副標 14 / 內文 13 / 標籤 12 / 浮水印 10

**圓角（rx）：**
- 卡片 / Modal：`rx=12–14`
- Button：`rx=8`
- Pill / Badge / Tab active：`rx=6–8`
- Tabs 容器：`rx=8`

---

### 標註（callout）規格

- **配置原則：** ①② 放左側（準備動作），③ 放右側（最後點擊 / CTA）
- **樣式：** `fill="#fef3c7"` `stroke="#d97706"` `stroke-width="1.5"` `rx=8` 文字 `fill="#92400e"`
- **箭頭：** `<marker>` polygon `fill="#d97706"`，連線 `stroke-width="1.5"`

### 必備元素

- **右下角浮水印：** `示意圖｜實際介面以登入後為準`（10px，`fill="#a8a29e"`）
- **主要 CTA 按鈕：** 套虛線高亮框 `fill="none"` `stroke="#d97706"` `stroke-dasharray="5 3"`

---

### Workflow checklist（製作前必須依序完成）

> ⚠️ PoC 曾因跳過第 1 步（只看 code 未截真實 UI）導致整張重畫，**第 1 步不可省略**。

1. **截真實 UI 圖**：登入本機或 staging，桌機 + 375px 手機各截一張。**不可只看原始碼推測畫面。**
2. **校對 docs 文字 vs 真實 UI**：核對 button 文案、tab 名稱、檔案格式說明、頁面結構。若有偏差，**先改 docs 文字**再畫圖。
3. **依截圖畫 SVG**，套用上方色票 / 字級 / 圓角規格。
4. **撰寫 `alt` 文字**：把畫面主要元件的文字寫進去（SEO + a11y 雙贏）。
5. **撰寫 `figcaption`**：一句話描述步驟重點。
6. **本機驗證：** `npm run dev`，雙視窗並排（一邊 docs 一邊真實 UI）比對版位。
7. **響應式：** DevTools 切 375px，確認圖片縮放後仍清楚。
8. **暗色模式：** 切 dark mode 確認米色背景不過刺眼。
9. **檔案大小：** 確認 < 30KB。

---

### 整合方式（page.tsx 範本）

```tsx
<figure className="my-6 not-prose">
  <Image
    src="/docs/<page-slug>-step<n>-<verb>.svg"
    alt="<畫面主要元件的文字描述>"
    width={800}
    height={500}
    className="w-full h-auto rounded-lg border border-border"
  />
  <figcaption className="mt-2 text-sm text-muted-foreground text-center">
    步驟 N：<一句話重點>
  </figcaption>
</figure>
```

- 插在對應 `<h2>` 步驟與 `<ol>/<ul>` 之間
- `not-prose` 避免 Tailwind Typography 覆蓋 `<figure>` 樣式

---

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-08 | Initial design system created | 從冷藍 shadcn 預設微調至暖色系，基於長照行業競品研究 (PointClickCare, Sage, ECP, CareAcademy) |
| 2026-04-08 | 主色選深青 hsl(195,55%,38%) | 同行用綠/紫/藍，深青是獨特定位（專業且溫暖） |
| 2026-04-08 | 強調色選赤陶橘 hsl(18,76%,52%) | blog SVG 已大量使用橘色，統一品牌識別 |
| 2026-04-08 | 新增 Noto Serif TC 標題字體 | 中文襯線體提升評鑑報告平台的正式感和權威感 |
| 2026-04-08 | Icon 使用 Lucide 單色線條風格 | 與 shadcn/ui 一致，單色圓形背景提供清潔專業感 |
