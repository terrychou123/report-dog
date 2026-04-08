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

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-08 | Initial design system created | 從冷藍 shadcn 預設微調至暖色系，基於長照行業競品研究 (PointClickCare, Sage, ECP, CareAcademy) |
| 2026-04-08 | 主色選深青 hsl(195,55%,38%) | 同行用綠/紫/藍，深青是獨特定位（專業且溫暖） |
| 2026-04-08 | 強調色選赤陶橘 hsl(18,76%,52%) | blog SVG 已大量使用橘色，統一品牌識別 |
| 2026-04-08 | 新增 Noto Serif TC 標題字體 | 中文襯線體提升評鑑報告平台的正式感和權威感 |
| 2026-04-08 | Icon 使用 Lucide 單色線條風格 | 與 shadcn/ui 一致，單色圓形背景提供清潔專業感 |
