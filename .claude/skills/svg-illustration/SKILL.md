---
name: svg-illustration
description: |
  部落格 SVG 插圖風格指南：確保報告汪部落格的封面圖與內文插圖維持柔和專業的視覺風格。
  當建立或修改 public/blog/ 下的 SVG 檔案時觸發。
  包含色彩系統、尺寸規範、封面圖模板（OG 社群卡）、五大圖表模板（流程圖/時程圖/檢核表/分類卡片/PDCA）與品牌元素。
metadata:
  filePattern:
    - "public/blog/**/*.svg"
    - "public/blog/*.svg"
  priority: 90
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# 部落格 SVG 插圖風格指南

## ⚡ 生成工作流（每次建立 SVG 必須按此順序執行）

> **根本原因提醒**：SKILL.md 規則分散、字數多，AI 容易遺漏細節。**必須從模板複製骨架**，不得從規則重新推導。

1. **確定版型與 N 值** → 直列清單（N=3~6）? 流程圖? 封面?
2. **Read 對應模板檔案** → `public/blog/template-list-{N}.svg`（或其他版型的模板）
3. **複製全部 XML 骨架** → 僅替換 `<text>` 內的中文字串，不改任何座標或屬性

   > **封面模板特別提醒（6 個 `template-cover*.svg`）**：
   > - 文字為起點式座標 + 左對齊（無 `text-anchor="middle"`），複製時**不要**把 x 改成 rect 中心。
   > - `font-family` 在每個 `<text>` 上，執行 `--fix` 後會自動搬到 `<svg>` 根元素並補上 `sans-serif` fallback，無需手動搬移。
   > - **`<clipPath id="clip0_1_XXX">` 需改為唯一 id**（例如 `clip-{article-slug}`），同時更新 `<g clip-path="url(#...)">` 對應的 id，避免多張封面在同一頁面 id 碰撞。
   > - 浮水印為 `fill="#D97706"`、`y=593.964`（vs 模板為 `y=591.592`），**非**舊版的 `#c4bfb8 y=590 text-anchor=end`。
   > - `template-cover-quote.svg` 頂部「人物訪談」pill 為**硬編碼**，若需改為「機構故事／過來人分享／專家觀點」等，直接替換文字即可。
   > - `template-cover-chart.svg` 的 5 個百分比（85/70/50/35/20）是範例資料，與柱高綁定；修改數值時必須同步用 `bar_h = round(percent/100 × 400), top_y = 506 - bar_h, label_y = top_y - 10` 重算每根柱的 `y/height` 與數值標籤的 `y`。

4. **依字數調整 font-size** → 用本文件的自適應公式（Q_font 等），只改需要縮小的部分
5. **驗證並修正** → 執行下方指令，確認全部 PASS

### 驗證快速指令

```bash
# 驗證單一檔案（詳細輸出）
npm run svg:validate -- public/blog/{filename}.svg --verbose

# 驗證全部非模板 SVG
npm run svg:validate

# 自動修正可修項目 + 驗證（推薦）
npm run svg:validate -- --fix public/blog/{filename}.svg --verbose
```

### --fix 可自動修正的項目

| 修正項目 | 說明 |
|---------|------|
| font-family 位置 | 從 `<text>` 移至 `<svg>` 根元素 |
| Row rect rx | 修正為 `rx="12"` |
| Circle opacity | 加上 `opacity="0.15"` |
| S 標籤框 rx/opacity | 修正為 `rx="8"` `opacity="0.12"` |
| 左色條 rx | 修正為 `rx="2"` |
| Circle 內文字色 | 實心圓 → 半透明後，白色文字改為主色 |

**需人工判斷（只報告）**：Q 列標題 font-size、Row y 座標錯位、Header 風格、emoji

---

## 設計原則

**風格定位：專業資訊圖表風**（與報告汪網站視覺系統一致）

1. **使用報告汪 Tailwind-600 色系**：與網站卡片相同的藍/綠/橘/紫/青，NOT 柔和低彩度
2. **暖色底調**：背景米黃 `#f0efe8`，非純白、非冷灰
3. **幾何圖形為主**：色塊、圓形、弧形，非卡片邊框線
4. **對稱清晰佈局**：中央圖表 + 四周說明文字
5. **層次分明排版**：大標題粗體 + 中標準體 + 小說明細體
6. **色塊方形標記（■）**：用於引導標題/分段
7. **文字垂直置中**：所有文字區塊必須在其所屬容器（rect / pill / card / circle / header row）的高度範圍內垂直置中對齊。通用公式：
   - 單行：`text_y = container_y + container_h / 2 + font_size × 0.35`
   - 雙行（標題 + 副文字，baseline 間距 = gap）：`title_y = container_y + container_h / 2 - gap / 2 + (title_font - subtitle_font) × 0.175`，`subtitle_y = title_y + gap`
   - 三區塊以上：使用 equal-gap 等間距佈局，`gap = (usable_h - total_content_h) / (區塊數 + 1)`

---

## 尺寸規範

| 類型 | 寬 | 高 | viewBox |
|------|----|----|---------|
| 封面圖（OG/社群） | 1200 | 630 | `0 0 1200 630` |
| 內文插圖 | 800 | **500** | `0 0 800 500` |

每個 SVG 必須同時設定 `width`、`height`、`viewBox`。內文插圖統一 800×500，不再有 460/480 兩種版本。

---

## 內文插圖密度規範

| 指標 | 規則 |
|------|------|
| 密度 | 每 300–500 字（中文字元）插入 1 張內文插圖 |
| 目標 | 每篇 3,000–5,000 字的文章應有 7–8 張內文圖（不含封面） |
| 插入位置 | 每個 `<h2>` 或 `<h3>` 段落結束後、下一段落開始前 |
| 避免 | 連續兩張圖之間不可少於 200 字；不在 FAQ 問答內部插圖 |

### 單張圖最大內容量（絕不縮小字級來塞更多內容）

| 版型 | 最多項目數 | 每項最多行數 |
|------|----------|------------|
| 直列清單 | **最多 6 項**（建議 ≤ 4） | 標題 1 行 + 說明 1 行 |
| 多欄卡片 | **2 欄 × 3 項 = 6 項** | 標題 1 行 + 說明 1 行 |
| 流程圖步驟 | **3–4 步** | 步驟標題 + 說明 2 行 |
| 表格列 | **4 列** | 每格 2 行 |
| 單欄詳細 | **3 項** | 標題 + 說明 3 行 |

**⚠ 內容放不下時：拆成多張 SVG，絕不縮小字級**

### 文章圖片數量快速估算

| 文章字數 | 建議插圖數（不含封面） |
|---------|---------------------|
| 2,000–2,500 字 | 5–6 張 |
| 3,000–3,500 字 | 7–8 張 |
| 4,000–5,000 字 | 8–10 張 |

### 插圖 HTML 嵌入格式

```html
<figure style="margin: 2rem 0;">
  <img src="/blog/{filename}.svg" alt="..." style="width:100%;border-radius:12px;" />
  <figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:0.5rem;">圖：...</figcaption>
</figure>
```

---

## 色彩系統

### 主色（報告汪 Tailwind-600，與網站一致）

| 面向 | 主色 | 淺底色 | Tailwind |
|------|------|--------|---------|
| 個案權益保障 | `#2563eb` | `#eff6ff` | blue-600 |
| 專業照護品質 | `#16a34a` | `#f0fdf4` | green-600 |
| 經營管理效能 | `#ea580c` | `#fff7ed` | orange-600 |
| 加分題 | `#9333ea` | `#faf5ff` | purple-600 |
| 安全環境設備 | `#0d9488` | `#f0fdfa` | teal-600 |
| 創新服務 | `#4f46e5` | `#eef2ff` | indigo-600 |

**流程圖／條列圖色彩順序（大地色系，最終定案）**：
| 步驟/列 | 主色 | 背景色 | 說明 |
|--------|------|--------|------|
| 1 | `#d97706` | `#fef3c7` | 琥珀（amber-600） |
| 2 | `#78716c` | `#f5f5f4` | 暖灰（stone-500） |
| 3 | `#57534e` | `#f5f0eb` | 深棕（stone-600） |
| 4 | `#a8a29e` | `#f5f5f4` | 淺灰（stone-400） |
| 5 | `#94a3b8` | `#f1f5f9` | 藍灰（slate-400） |
| 6 | `#6b7280` | `#f9fafb` | 中灰（gray-500）— 僅限 6 列條列圖使用 |

### 輔助色

| 名稱 | 色票 | 用途 |
|------|------|------|
| 警示紅 | `#dc2626` | 評鑑日標記、緊急事項（red-600） |

### 文字色（簡化為 3 層）

| 層級 | 色票 | 對比度 | 用途 |
|------|------|--------|------|
| 標題 | `#1e293b` | ~12:1 ✓ | 圖表主標題、卡片標題 |
| 內容 | `#57534e` | ~5.2:1 ✓ | 所有說明文字、副標、標籤 |
| 浮水印 | `#d97706` | 品牌琥珀色 | 品牌浮水印專用（流程圖／條列圖） |

> ⚠ **已移除**：`#3d3530`、`#6b6560`、`#8a8178`、`#94a3b8`、`#475569`、`#64748b` — 這些顏色對比度不足或與 3 層體系重疊，統一改用上表。

### 結構色

| 用途 | 色票 |
|------|------|
| 背景 | `#f0efe8`（米黃暖色） |
| 分隔線 | `#dedad3` |
| 卡片底色（奇數列） | `white` |
| 卡片底色（偶數列） | `#fafaf8` |
| 表頭背景 | `#e8e4dc` |

---

## 字型規範

字型統一使用：`font-family="'Noto Sans TC', sans-serif"`

**最小字級：14px（絕對限制，禁止任何低於 14px 的文字）**

| 元素 | 字級 | 字重 | 顏色 | 手機顯示 |
|------|------|------|------|---------|
| 圖表主標題 | **24px** | 700 | `#1e293b` | ~10px |
| 副標題/說明 | **16px** | 400 | `#57534e` | ~7px |
| 卡片/節標題 | **18px** | 700 | `#1e293b` | ~8px |
| STEP 數字 | **22px** | 700 | 對應主色 | ~9px |
| STEP 標籤 | **14px** | 700 | 對應主色 | ~6px |
| 條列說明 | **16px** | 400 | `#57534e` | ~7px |
| 時程標籤 | **14px** | 600 | 對應主色 | ~6px |
| 標籤 Chip | **14px** | 600 | 對應主色 | ~6px |
| 品牌水印（內文） | 16px | 400 | `#c4bfb8` | ~7px |
| 品牌水印（封面） | 24px | 400 | `#c4bfb8` | — |

> 手機顯示估算基準：800px SVG 在 375px 螢幕 ≈ 43% 縮放

### 字數自適應分級（依內容字數選擇 font-size）

**字數計算規則**：CJK 字元 = 1，ASCII/半形 = 0.6，空格 = 0.3

#### 流程圖版型（自適應 3-5 步驟，畫布 800×500）

**水平佈局策略**：

- **N=3**：card_w 固定 **170px**，整組置中（兩側留白）
- **N=4/5**：card_w 撐滿全幅（左右邊距 28px，可用寬 744px）

```
# N=3 置中佈局
card_w        = 170
arrow_gap     = 16
total_group   = 3 × 170 + 2 × 16 = 542
margin        = (800 - 542) / 2 = 129
card[i].x     = 129 + i × (170 + 16)
card[i].cx    = card[i].x + 85

# N=4/5 滿幅佈局
arrow_gap = (N ≤ 4) ? 16 : 12
card_w    = (744 - (N-1) × arrow_gap) / N
card[i].x  = 28 + i × (card_w + arrow_gap)
card[i].cx = card[i].x + card_w / 2
```

| N | card_w | arrow_gap | r = card_w/4 | 佈局方式 |
|---|--------|----------|--------------|---------|
| 3 | **170** | 16 | **43** | 置中（margin=129） |
| 4 | **174** | 16 | **44** | 滿幅 |
| 5 | **140** | 12 | **35** | 滿幅 |

**卡片座標快查表**：

| N=3 | i=0: x=129 cx=214 | i=1: x=315 cx=400 | i=2: x=501 cx=586 |
|-----|-----|-----|-----|

| N=4 | i=0: x=28 cx=115 | i=1: x=218 cx=305 | i=2: x=408 cx=495 | i=3: x=598 cx=685 |
|-----|-----|-----|-----|-----|

| N=5 | i=0: x=28 cx=98 | i=1: x=180 cx=250 | i=2: x=332 cx=402 | i=3: x=484 cx=554 | i=4: x=636 cx=706 |
|-----|-----|-----|-----|-----|-----|

**箭頭**（arrow_y = (card_y + card_bottom) / 2 = (108+450)/2 = **279**）：

```
arrow[i].x1 = card[i].x + card_w
arrow[i].x2 = card[i+1].x
```

**卡片內部元素**（card_y=108, card_h=342, card_bottom=450，全部以 cx 置中，**等間距（equal-gap）佈局**）：

```
# 等間距公式：4 段間距相等（頂 / 塊1-2 / 塊2-3 / 底）
usable_top = card_y + 8          （116）
usable_h   = card_h - 8          （334）

block1_h = 2 × r                 （r=43 → 86, r=35 → 70）
block3_h = 36                    （K Pill 固定）

# H 字級自適應（依最長標題字數決定，同 SVG 全卡統一）
max_H_chars = 同一張 SVG 中所有卡片 H 的最大字數
H_font      = min(36, floor((card_w - 28) / max_H_chars))
H_to_J1     = max(24, round(H_font × 0.78))
block2_h    = round(H_font × 0.72) + H_to_J1 + 22

content_h = block1_h + block2_h + block3_h
gap = (usable_h - content_h) / 4

# Block 1 (STEP 圓圈)
r         = round(card_w / 4)
circle_cy = usable_top + gap + r

# 圓圈內文字自適應（依 r 計算）
"STEP" font = round(r × 0.4)       （r=43 → 17, r=35 → 14）
"0N"   font = round(r × 0.65)      （r=43 → 28, r=35 → 23）
"STEP" y    = cy - round(r × 0.25) （r=43 → cy-11, r=35 → cy-9）
"0N"   y    = cy + round(r × 0.4)  （r=43 → cy+17, r=35 → cy+14）

# Block 2 (H + J1 + J2)
block2_top  = usable_top + gap + block1_h + gap
H_baseline  = block2_top + round(H_font × 0.72)
J1_baseline = H_baseline + H_to_J1
J2_baseline = J1_baseline + 22

# Block 3 (K Pill)
pill_y      = usable_top + gap + block1_h + gap + block2_h + gap
pill_text_y = pill_y + 24
pill_w      = min(148, card_w - 26)
pill_x      = cx - pill_w / 2
pill_h      = 36
```

**快查表**：

| 欄位 | N=3（card_w=170, 4字）| N=5（card_w=140, 2字）|
|------|----------------------|----------------------|
| H_font | **35** | **36** |
| block2_h | 74 | 76 |
| gap | **35** | **38** |
| circle cy | **194** | **189** |
| "STEP" y | **183** | **180** |
| "0N" y | **211** | **203** |
| H y | **297** | **288** |
| J1 y | **324** | **316** |
| J2 y | **346** | **338** |
| pill y | **381** | **376** |
| pill text y | **405** | **400** |
| arrow y | **279** | **279** |

**標題分隔線**（與卡片群組等寬）：

```
x1 = first_card.x
x2 = last_card.x + card_w
```

| N | x1 | x2 |
|---|----|-----|
| 3 | 129 | 671 |
| 4 | 28 | 772 |
| 5 | 28 | 776 |

> ⚠ 卡片內部**不放**水平分隔線（H 標題下方不加 line）。

**垂直佈局（固定，不隨 N 變化）**：

```
主標 32px y=48，副標 22px y=78，分隔線 y=94
card_y=108，card_h=342，card_bottom=450，浮水印 y=480
usable_top = card_y + 8 = 116
usable_h   = card_h - 8  = 334
分隔線→card 間距 = 14px，card 底 = 450，底部間距 = 30px
arrow_y = (card_y + card_bottom) / 2 = (108+450)/2 = 279
```

**字級規範**：

| 元素 | 可用寬 | 字數 | font-size（card_w≥170）| font-size（card_w=140）|
|------|--------|------|----------------------|----------------------|
| **A 主標題** | ~720px | 自適應公式 | `round(B_width / (A_CJK_eq × 1.15))` | 同左 |
| | | 範例 N=3（9字→37px）| **37px** | — |
| | | 範例 N=5（8字→42px）| — | **42px** |
| **B 副標題** | ~720px | ≤ 10 字 | **26px** | 同左 |
| | | 11–18 字 | **22px** | 同左 |
| | | 19+ 字 | **18px** | 同左 |

> **A 等寬公式**：先按字數決定 B_font（查上表），再算 A_font：
> `B_width = B_font × B_CJK_eq`（CJK=1.0，半形數字=0.55，空格=0.28）
> `A_font = round(B_width / A_CJK_eq)`（純像素等寬，目標「標題總寬 = 副標題總寬」）
| **G STEP 標籤** | 圓圈內 | 永遠 "STEP" | **16px** | **14px** |
| **G 步驟數字** | 圓圈內 | 永遠 2 碼 | **26px** | **22px** |
| **H 卡片標題** | card_w | 自適應公式 | `min(36, ⌊(card_w−28)/max_chars⌋)` | 同左 |
| | | 範例 N=3 4字 | **35px**（170px卡） | — |
| | | 範例 N=5 2字 | — | **36px**（140px卡） |
| **J 說明文字**（最多 2 行） | card_w | 自適應公式 | `max(16, min(H_font-6, round(H_font×H_chars/max_J_chars)))` | 同左 |
| | | 範例 N=3（max_J=7）| **20px** | — |
| | | 範例 N=5（max_J=5）| — | **16–18px**（原值，公式不縮小）|
| **K Pill 標籤** | pill_w | ≤ 5 字 | **18px** | **16px** |
| | | 6+ 字 | **16px** | **14px** |

#### 直列清單版型（test-list-new.svg，畫布 800×500，列寬 744px）

| 元素 | 可用寬 | 字數 | font-size | 備註 |
|------|--------|------|-----------|------|
| **M2 Header 主標題**（左對齊，w700） | ~740px | ≤ 8 字 | **40px** | 無 M1 分類標籤 |
| | | 9–14 字 | **36px** | |
| | | 15–20 字 | **32px** | |
| | | 21+ 字 | **30px**（最小）| |
| **Q 列標題**（x=100 左對齊，w700） | ~500px | ≤ 8 字 | **22px** | |
| | | 9–12 字 | **20px** | |
| | | 13+ 字 | **18px**（最小）| |
| **R 列說明文**（不加粗） | ~500px | 全部 | **16px** | 統一不分字數 |
| **S1 條文標題**（136px rect 內，不加粗） | — | 全部 | **16px** | |
| **S2 條文說明**（136px rect 內，不加粗） | — | 全部 | **16px** | |

**自適應佈局（3-6 條）**（畫布高 500）—— **Header h = H，兩層間距（outer > inner）**：

- Header 高度 = Row 高度（H），視覺統一
- **兩層間距**：外圍間距（outer_gap）大於列間距（inner_gap），製造「章節分段」視覺
  - outer_gap：頂部、Header↔Row1、底部（呼吸空間）
  - inner_gap：Row 與 Row 之間（緊湊連貫）

```
inner_gap = 固定值（見表格）
outer_gap = floor((500 - (N+1)×H - (N-1)×inner_gap) / 3)
Header y   = outer_gap
Row[0] y   = outer_gap + H + outer_gap
Row[i] y   = Row[i-1].y + H + inner_gap   （i ≥ 1）
```

| N 條數 | H | inner_gap | outer_gap | Header y | 備註 |
|--------|---|-----------|-----------|----------|------|
| 3 條 | **90** | **13** | **38** | 38 | 兩層間距，3×38+4×90+2×13=500 ✓ |
| 4 條 | **62** | **13** | **50** | 50 | 兩層間距，3×50+5×62+3×13=499 ✓ |
| 5 條 | **60** | **13** | **29** | 29 | 兩層間距，3×29+6×60+4×13=499 ✓ |
| 6 條 | **54** | **10** | header_gap=10, pad=31 | 31 | pad+header_gap+inner全=10，2×31+10+7×54+5×10=500 ✓ |

> N=3~6 均使用兩層間距（pad > inner），視覺上上下留白一致、列間緊湊。N=6 特殊：header_gap=inner=10，上下 pad=31。

**Header 文字垂直置中**（font = M2_font）：
```
text_y = header_y + (H + M2_font × 0.85) / 2
```

**自適應字型（依 H 縮放，保持視覺填充比例一致）**：
```
Q_font   = clamp(18, round(H × 0.35), 28)   主標題字級
R_font   = clamp(14, Q_font - 6, 18)         副標題字級
circle_r = clamp(16, round(H × 0.22), 22)   圓圈半徑
NUM_font = clamp(16, round(circle_r × 0.9), 20)
S_rect_h = clamp(34, H - 16, 52)             右側色框高度
```

**Row 內垂直置中（等視覺留白）**：
```
spacing  = round(4 + R_font×0.85 + Q_font×0.15)
Q_y      = row_y + round((H + Q_font×0.85 - R_font×0.15 - spacing) / 2)
R_y      = Q_y + spacing
circle cy    = row_y + H/2
NUM text y   = circle_cy + round(NUM_font × 0.35)
S_rect_y = row_y + round((H - S_rect_h) / 2)
S1       = S_rect_y + round((S_rect_h - 12) / 2)
S2       = S1 + 20
```

**快速查表（自適應結果，每 N 對應一組值）**：

| H  | N | Q_font | R_font | circle_r | Q_off | R_off | cy  | S rect y (h)  | S1  | S2  |
|----|---|--------|--------|----------|-------|-------|-----|---------------|-----|-----|
| 90 | 3 | **28** | **18** | **20**   | +44   | +68   | +45 | +19 (h=52)    | +39 | +59 |
| 62 | 4 | 22     | 16     | 16       | +28   | +48   | +31 | +8  (h=46)    | +25 | +45 |
| 60 | 5 | 20     | 16     | 16       | +27   | +48   | +30 | +8  (h=44)    | +24 | +44 |
| 54 | 6 | 18     | 14     | 16       | +24   | +43   | +27 | +8  (h=38)    | +21 | +41 |

> ⚠ **最小字級 16px**（直列清單版型，N=6 的 R_font=14px 為例外，視可讀性酌情拆圖）。放不下時改拆成多張圖，不得縮字。

**Row 元素固定規則（所有 N 統一）**：
```
Row rect（大框）         rx="10", fill="#e8e6de"
左色條                  rx="2", width="6"
Circle opacity          0.15（全部 N=3~6 一致）
S rect opacity          0.12（全部 N=3~6 一致）
S rect rx               rx="8"
S 標籤文字色             = 該列主色（circle fill 的同色），不得偷換其他顏色
```

> ⚠ **禁止使用 `#64748b`、`#78716c`（等輔助色）作為 Row 4/5/6 的 S 文字色** — 必須使用該列的主色。

**列表圖 XML 骨架（N=4，基準版型，template-list-4.svg）**：

```xml
<!-- ===== N=4 列表圖骨架（800×500）===== -->
<!-- H=62, inner_gap=13, outer_gap=50 (Header y=50, Row 1/2/3/4 y=160/235/310/385) -->
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"
     font-family="'Noto Sans TC', sans-serif">

  <!-- 背景 -->
  <rect width="800" height="500" fill="#f0efe8"/>

  <!-- Header（y=50, h=76, 比 Row 稍高增加標題份量） -->
  <rect x="0" y="50" width="800" height="76" fill="white"/>
  <rect x="0" y="50" width="6" height="76" fill="#d97706"/>
  <!-- M2 Header 主標題：≤8字 44px / 9-14字 36px / 15-20字 32px -->
  <text x="28" y="104" font-size="44" fill="#1e293b" font-weight="700">HEADER 主標題</text>

  <!-- ===== Row 1（y=160）色系 #d97706 琥珀 ===== -->
  <rect x="28" y="160" width="744" height="62" rx="12" fill="white" stroke="#e8e6de" stroke-width="1"/>
  <rect x="28" y="160" width="6" height="62" rx="2" fill="#d97706"/>
  <circle cx="66" cy="191" r="16" fill="#d97706" opacity="0.15"/>
  <text x="66" y="197" font-size="16" fill="#d97706" text-anchor="middle" font-weight="900">1</text>
  <!-- Q 列標題（x=100，≤8字 22px / 9-12字 20px），R 說明文（16px，固定） -->
  <text x="100" y="188" font-size="22" fill="#1e293b" font-weight="700">列標題</text>
  <text x="100" y="208" font-size="16" fill="#57534e">列說明文字，16px 固定，不加粗</text>
  <!-- S 右側標籤框（x=620, w=136, h=46, rx=8, opacity=0.12） -->
  <rect x="620" y="168" width="136" height="46" rx="8" fill="#d97706" opacity="0.12"/>
  <text x="688" y="185" font-size="16" fill="#d97706" text-anchor="middle">S1 條文標題</text>
  <text x="688" y="205" font-size="16" fill="#d97706" text-anchor="middle">S2 條文說明</text>

  <!-- ===== Row 2（y=235）色系 #78716c 暖灰 ===== -->
  <rect x="28" y="235" width="744" height="62" rx="12" fill="white" stroke="#e8e6de" stroke-width="1"/>
  <rect x="28" y="235" width="6" height="62" rx="2" fill="#78716c"/>
  <circle cx="66" cy="266" r="16" fill="#78716c" opacity="0.15"/>
  <text x="66" y="272" font-size="16" fill="#78716c" text-anchor="middle" font-weight="900">2</text>
  <text x="100" y="263" font-size="22" fill="#1e293b" font-weight="700">列標題</text>
  <text x="100" y="283" font-size="16" fill="#57534e">列說明文字</text>
  <rect x="620" y="243" width="136" height="46" rx="8" fill="#78716c" opacity="0.12"/>
  <text x="688" y="260" font-size="16" fill="#78716c" text-anchor="middle">S1 條文標題</text>
  <text x="688" y="280" font-size="16" fill="#78716c" text-anchor="middle">S2 條文說明</text>

  <!-- ===== Row 3（y=310）色系 #57534e 深棕 ===== -->
  <rect x="28" y="310" width="744" height="62" rx="12" fill="white" stroke="#e8e6de" stroke-width="1"/>
  <rect x="28" y="310" width="6" height="62" rx="2" fill="#57534e"/>
  <circle cx="66" cy="341" r="16" fill="#57534e" opacity="0.15"/>
  <text x="66" y="347" font-size="16" fill="#57534e" text-anchor="middle" font-weight="900">3</text>
  <text x="100" y="338" font-size="22" fill="#1e293b" font-weight="700">列標題</text>
  <text x="100" y="358" font-size="16" fill="#57534e">列說明文字</text>
  <rect x="620" y="318" width="136" height="46" rx="8" fill="#57534e" opacity="0.12"/>
  <text x="688" y="335" font-size="16" fill="#57534e" text-anchor="middle">S1 條文標題</text>
  <text x="688" y="355" font-size="16" fill="#57534e" text-anchor="middle">S2 條文說明</text>

  <!-- ===== Row 4（y=385）色系 #a8a29e 淺灰 ===== -->
  <rect x="28" y="385" width="744" height="62" rx="12" fill="white" stroke="#e8e6de" stroke-width="1"/>
  <rect x="28" y="385" width="6" height="62" rx="2" fill="#a8a29e"/>
  <circle cx="66" cy="416" r="16" fill="#a8a29e" opacity="0.15"/>
  <text x="66" y="422" font-size="16" fill="#a8a29e" text-anchor="middle" font-weight="900">4</text>
  <text x="100" y="413" font-size="22" fill="#1e293b" font-weight="700">列標題</text>
  <text x="100" y="433" font-size="16" fill="#57534e">列說明文字</text>
  <rect x="620" y="393" width="136" height="46" rx="8" fill="#a8a29e" opacity="0.12"/>
  <text x="688" y="410" font-size="16" fill="#a8a29e" text-anchor="middle">S1 條文標題</text>
  <text x="688" y="430" font-size="16" fill="#a8a29e" text-anchor="middle">S2 條文說明</text>

  <!-- 浮水印 -->
  <text x="760" y="480" font-size="16" fill="#d97706" text-anchor="end" font-weight="400">報告汪 reportwang.com</text>
</svg>
```

**N 變體快查（Row y 座標，依公式 outer_gap + H + outer_gap 計算）**：

| N | H | outer_gap | Header y | Row 1 | Row 2 | Row 3 | Row 4 | Row 5 | Row 6 | S rect h |
|---|---|-----------|----------|-------|-------|-------|-------|-------|-------|----------|
| 3 | 90 | 38 | 38 | 166 | 269 | 372 | — | — | — | 52 |
| 4 | 62 | 50 | **50** | **160** | **235** | **310** | **385** | — | — | 46 |
| 5 | 60 | 29 | 29 | 118 | 191 | 264 | 337 | 410 | — | 44 |
| 6 | 54 | pad=31 | 31 | 95 | 159 | 223 | 287 | 351 | 415 | 38 |

> N=4 粗體值為 template-list-4.svg 實測值（Header h=76，略高於 H=62）。
> N=6 特殊：header_gap=inner_gap=10，Row[i+1] y = Row[i] y + H + 10。
> Q_y 偏移（+28）、R_y 偏移（+48）、circle cy 偏移（+H/2）各 N 一致，依各自 H 計算。

---

## 佈局元素規格

### 色塊方形標記（區段標題）
```xml
<rect x="{x}" y="{y}" width="6" height="28" rx="3" fill="{主色}"/>
<text x="{x+16}" y="{y+20}" font-family="'Noto Sans TC', sans-serif" font-size="18" fill="#1e293b" font-weight="700">{標題}</text>
```

### STEP 圓形編號
```xml
<circle cx="{cx}" cy="{cy}" r="34" fill="{淺底色}"/>
<text x="{cx}" y="{cy-8}" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="14" fill="{主色}" font-weight="700">STEP</text>
<text x="{cx}" y="{cy+12}" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="22" fill="{主色}" font-weight="700">01</text>
```

### 時程 Pill 標籤
```xml
<rect x="{x}" y="{y}" width="130" height="30" rx="15" fill="{淺底色}"/>
<text x="{x+65}" y="{y+21}" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="14" fill="{主色}" font-weight="600">第 N–M 週</text>
```

### 卡片頂部色條
```xml
<!-- 頂部圓角 -->
<rect x="{x}" y="{y}" width="{w}" height="8" rx="4" fill="{主色}"/>
<!-- 填補直角接縫 -->
<rect x="{x}" y="{y+4}" width="{w}" height="4" fill="{主色}"/>
```

### 標籤 Chip（底部附加說明）
```xml
<rect x="{x}" y="{y}" width="80" height="26" rx="13" fill="{淺底色}"/>
<text x="{x+40}" y="{y+18}" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="14" fill="{主色}" font-weight="600">{標籤文字}</text>
```

### 分隔線
```xml
<line x1="40" y1="{y}" x2="760" y2="{y}" stroke="#dedad3" stroke-width="1"/>
```

### ⚠ 禁止使用 Emoji 或 Unicode 符號

**禁止在 SVG `<text>` 中使用任何 emoji（📥👥✍️⚠✓○□ 等）**，各平台渲染不一致。改用 SVG 圖形替代：

| 符號意涵 | SVG 替代方案 |
|---------|------------|
| 警告 ⚠ | `<polygon points="cx-9,cy+8 cx,cy-10 cx+9,cy+8" fill="none" stroke="{色}" stroke-width="2"/><text x="cx" y="cy+5" text-anchor="middle" font-size="14" fill="{色}" font-weight="700">!</text>` |
| 勾選 ✓ | `<path d="M cx-6,cy L cx-1,cy+5 L cx+6,cy-5" fill="none" stroke="{色}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` |
| 待確認 ○ | `<circle cx="cx" cy="cy" r="8" fill="none" stroke="{色}" stroke-width="1.5"/>` |
| 核取框 □ | `<rect x="cx-7" y="cy-7" width="14" height="14" rx="3" fill="none" stroke="{色}" stroke-width="1.5"/>` |
| 數字圓圈 | `<circle cx="cx" cy="cy" r="16" fill="{淺底色}"/><text x="cx" y="cy+6" text-anchor="middle" font-size="16" fill="{色}" font-weight="700">{N}</text>` |

---

## 品牌元素

**每張 SVG 必須包含品牌浮水印：「報告汪 reportwang.com」**

### 內文插圖（右下角）
```xml
<!-- 內文插圖高度 500px，浮水印固定在 y=480 -->
<text x="760" y="480" font-size="16" fill="#d97706" text-anchor="end" font-weight="400" font-family="'Noto Sans TC', sans-serif">報告汪 reportwang.com</text>
```

### 封面圖（右下角浮水印）
```xml
<!-- 標準封面（cover/chart/checklist/timeline/quote）：y=593.964 font-size=24 fill=#D97706 -->
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" letter-spacing="0em"><tspan x="879.008" y="593.964">報告汪 reportwang.com</tspan></text>
<!-- vs 模板專用：y=591.592 font-size=22 -->
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" letter-spacing="0em"><tspan x="879.924" y="591.592">報告汪 reportwang.com</tspan></text>
```

---

## 封面圖模板（template-cover.svg）

**用途**：OG Image / 社群分享卡 / 文章列表縮圖（1200×630）

### 元素速查表

| 元素 | x | y | w | h | 規格 |
|------|---|---|---|---|------|
| 背景 | 0 | 0 | 1200 | 630 | fill `#F0EFE8` |
| 右側面板 | 820 | 0 | 380 | 630 | fill `#E8E6DE` |
| 右側大數字 `{數字}` | 816.59 | 212.54 | — | — | font=140 bold fill=`#D97706`（起點式左對齊） |
| 數字說明 `{數字說明}` | 943.418 | 278.708 | — | — | font=28 bold fill=`#78716C` |
| 卡片 r1c1 rect | 846 | 300 | 155 | 86 | rx=10 fill=white stroke=`#E8E6DE` |
| 卡片 r1c1 title | 845.002 | 342.708 | — | — | font=28 bold fill=`#D97706` |
| 卡片 r1c1 subtitle | 874.005 | 372.592 | — | — | font=22 fill=`#A8A29E` |
| 卡片 r1c2 rect | 1011 | 300 | 155 | 86 | rx=10 fill=white stroke=`#E8E6DE` |
| 卡片 r1c2 title | 1010 | 342.708 | — | — | font=28 bold fill=`#78716C` |
| 卡片 r1c2 subtitle | 1039 | 372.592 | — | — | font=22 fill=`#A8A29E` |
| 卡片 r2c1 rect | 846 | 399 | 155 | 86 | rx=10 fill=white stroke=`#E8E6DE` |
| 卡片 r2c1 title | 845.002 | 441.708 | — | — | font=28 bold fill=`#78716C` |
| 卡片 r2c1 subtitle | 874.005 | 471.592 | — | — | font=22 fill=`#A8A29E` |
| 卡片 r2c2 rect | 1011 | 399 | 155 | 86 | rx=10 fill=white stroke=`#E8E6DE` |
| 卡片 r2c2 title | 1010 | 441.708 | — | — | font=28 bold fill=`#D97706` |
| 卡片 r2c2 subtitle | 1039 | 471.592 | — | — | font=22 fill=`#A8A29E` |
| 右側底部 pill | 846 | 498 | 320 | 52 | rx=10 fill=`#D97706` opacity=0.12 |
| 底部 pill 文字 | 939.418 | 536.708 | — | — | font=28 bold fill=`#D97706` |
| 左主標題 L1 | 60 | 219.32 | — | — | font=120 bold fill=`#1E293B` |
| 左主標題 L2 | 60 | 357.32 | — | — | font=120 bold fill=`#D97706` |
| 分隔線 | 57.5→822 | 384 | — | — | stroke=`#DEDAD3` sw=2 |
| 副標題 | 60 | 434.068 | — | — | font=38 fill=`#57534E` |
| pill 1 rect | 60 | 454 | 148 | 54 | rx=10 fill=`#D97706` opacity=0.12 |
| pill 1 text | 84.002 | 493.708 | — | — | font=28 bold fill=`#D97706` |
| pill 2 rect | 220 | 454 | 148 | 54 | rx=10 fill=`#78716C` opacity=0.12 |
| pill 2 text | 244.002 | 493.708 | — | — | font=28 bold fill=`#78716C` |
| pill 3 rect | 380 | 454 | 148 | 54 | rx=10 fill=`#57534E` opacity=0.12 |
| pill 3 text | 404.002 | 493.708 | — | — | font=28 bold fill=`#57534E` |
| 適用對象 | 60 | 549.708 | — | — | font=28 fill=`#94A3B8` |
| 浮水印 | 879.008 | 593.964 | — | — | font=24 fill=`#D97706` |

### 骨架 XML

> ⚠️ 複製後必須把 `clip0_1_238` 改為 `clip-{article-slug}` 以避免同頁多張封面 id 碰撞。

```xml
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip-{slug})">
<path d="M1200 0H0V630H1200V0Z" fill="#F0EFE8"/>
<path d="M1200 0H820V630H1200V0Z" fill="#E8E6DE"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="140" font-weight="bold" letter-spacing="0em"><tspan x="816.59" y="212.54">{數字}</tspan></text>
<text fill="#78716C" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="943.418" y="278.708">{數字說明}</tspan></text>
<path d="M991 300H856C850.477 300 846 304.477 846 310V376C846 381.523 850.477 386 856 386H991C996.523 386 1001 381.523 1001 376V310C1001 304.477 996.523 300 991 300Z" fill="white" stroke="#E8E6DE"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="845.002" y="342.708">{卡片標題 1}</tspan></text>
<text fill="#A8A29E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" letter-spacing="0em"><tspan x="874.005" y="372.592">{副文字 1}</tspan></text>
<path d="M1156 300H1021C1015.48 300 1011 304.477 1011 310V376C1011 381.523 1015.48 386 1021 386H1156C1161.52 386 1166 381.523 1166 376V310C1166 304.477 1161.52 300 1156 300Z" fill="white" stroke="#E8E6DE"/>
<text fill="#78716C" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="1010" y="342.708">{卡片標題 2}</tspan></text>
<text fill="#A8A29E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" letter-spacing="0em"><tspan x="1039" y="372.592">{副文字 2}</tspan></text>
<path d="M991 399H856C850.477 399 846 403.477 846 409V475C846 480.523 850.477 485 856 485H991C996.523 485 1001 480.523 1001 475V409C1001 403.477 996.523 399 991 399Z" fill="white" stroke="#E8E6DE"/>
<text fill="#78716C" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="845.002" y="441.708">{卡片標題 3}</tspan></text>
<text fill="#A8A29E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" letter-spacing="0em"><tspan x="874.005" y="471.592">{副文字 3}</tspan></text>
<path d="M1156 399H1021C1015.48 399 1011 403.477 1011 409V475C1011 480.523 1015.48 485 1021 485H1156C1161.52 485 1166 480.523 1166 475V409C1166 403.477 1161.52 399 1156 399Z" fill="white" stroke="#E8E6DE"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="1010" y="441.708">{卡片標題 4}</tspan></text>
<text fill="#A8A29E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" letter-spacing="0em"><tspan x="1039" y="471.592">{副文字 4}</tspan></text>
<path opacity="0.12" d="M1156 498H856C850.477 498 846 502.477 846 508V540C846 545.523 850.477 550 856 550H1156C1161.52 550 1166 545.523 1166 540V508C1166 502.477 1161.52 498 1156 498Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="939.418" y="536.708">{底部標籤}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="120" font-weight="bold" letter-spacing="0em"><tspan x="60" y="219.32">{主標題第 1 行}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="120" font-weight="bold" letter-spacing="0em"><tspan x="60" y="357.32">{主標題第 2 行}</tspan></text>
<path d="M57.5 384H822" stroke="#DEDAD3" stroke-width="2"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="38" letter-spacing="0em"><tspan x="60" y="434.068">{副標題}</tspan></text>
<path opacity="0.12" d="M198 454H70C64.4772 454 60 458.477 60 464V498C60 503.523 64.4772 508 70 508H198C203.523 508 208 503.523 208 498V464C208 458.477 203.523 454 198 454Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="84.002" y="493.708">{標籤 1}</tspan></text>
<path opacity="0.12" d="M358 454H230C224.477 454 220 458.477 220 464V498C220 503.523 224.477 508 230 508H358C363.523 508 368 503.523 368 498V464C368 458.477 363.523 454 358 454Z" fill="#78716C"/>
<text fill="#78716C" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="244.002" y="493.708">{標籤 2}</tspan></text>
<path opacity="0.12" d="M518 454H390C384.477 454 380 458.477 380 464V498C380 503.523 384.477 508 390 508H518C523.523 508 528 503.523 528 498V464C528 458.477 523.523 454 518 454Z" fill="#57534E"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="404.002" y="493.708">{標籤 3}</tspan></text>
<text fill="#94A3B8" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" letter-spacing="0em"><tspan x="60" y="549.708">{適用對象說明}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" letter-spacing="0em"><tspan x="879.008" y="593.964">報告汪 reportwang.com</tspan></text>
</g>
<defs>
<clipPath id="clip-{slug}">
<rect width="1200" height="630" fill="white"/>
</clipPath>
</defs>
</svg>
```

---

## 封面圖模板：適用情境對照表

> 每次製作文章封面，先查此表選擇最適合的模板，再 Read 對應模板 XML 複製骨架。

| 模板檔案 | 適用文章標題模式 | 右側版型 |
|---------|---------------|---------|
| `template-cover.svg` | 「N 項全攻略／逐條拆解」「重點指南」「分析解析」 | 2×2 白底卡片 + 琥珀大數字（左對齊）+ 底部寬 pill |
| `template-cover-chart.svg` | 「常見 N 大缺失／TOP 10」「佔比 X%」「數據比較」 | 5 根垂直長條圖（漸色，85/70/50/35/20%） |
| `template-cover-quote.svg` | 「訪談」「過來人」「引言」「觀點」 | 受訪者頭像（r=135 外框 + 2 圓剪影）+ 機構/姓名/職稱 + 2 pill |
| `template-cover-timeline.svg` | **「N 天倒數」「N 天上手」「準備時程表」「三階段」** | **大字時程標題（font=80）+** 3 節點（r=25，漸深配色）+ 底部 pill |
| `template-cover-checklist.svg` | **「自我檢核表」「逐條檢核清單」「N 項清單」「FAQ」** | 6 列檢核清單（**圓角方形** checkbox，2✓+4空）+ 底部寬 pill |
| `template-cover-vs.svg` | **「A vs B」「日間 vs 住宿」「NG vs OK」「前後比較」** | **全幅**（無右側面板）雙卡 495×252 + 挖空 VS 圓 |

---

## 封面圖模板（template-cover-timeline.svg）

**用途**：倒數計畫、準備時程、N 天上手、三階段攻略類文章封面（1200×630）

### 關鍵規格重點

- 右側時程標題 **font=80 bold**（非 26），位置 `tspan x=820.266 y=154.88` fill=`#57534E`（起點式左對齊）
- 3 節點 **r=25**（非 r=20），cx=**873**/1012/1147，cy=**269**（非 268）
- 節點配色漸深：**`#D97706` / `#78716C` / `#57534E`**
- 節點內數字 **font=40 bold fill=white**，tspan x=`861.223/1000.22/1135.22` y=`286.44`
- 連接線 `M892 269H987` / `M1027 269H1122` sw=4 linecap=round
- 右側面板 x=**821**（非 820，Figma 匯出偏移 1px）
- 左側 pills y=**450**（非 454），其餘左側結構與 template-cover.svg 相同

### 骨架 XML

> ⚠️ 複製後必須把 `clip0_1_135` 改為 `clip-{article-slug}`。

```xml
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip-{slug})">
<path d="M1200 0H0V630H1200V0Z" fill="#F0EFE8"/>
<path d="M1201 0H821V630H1201V0Z" fill="#E8E6DE"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="80" font-weight="bold" letter-spacing="0em"><tspan x="820.266" y="154.88">{時程標題}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="18" font-weight="bold" letter-spacing="0em"><tspan x="832.319" y="234.848">{第 1 階段}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="811.224" y="321.592">{階段 1 名稱}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="17" letter-spacing="0em"><tspan x="829.14" y="346.912">{說明文字 1}</tspan></text>
<text fill="#78716C" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="18" font-weight="bold" letter-spacing="0em"><tspan x="969.319" y="234.848">{第 2 階段}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="948.224" y="321.592">{階段 2 名稱}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="17" letter-spacing="0em"><tspan x="964.14" y="346.912">{說明文字 2}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="18" font-weight="bold" letter-spacing="0em"><tspan x="1106.32" y="234.848">{第 3 階段}</tspan></text>
<path d="M892 269H987" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
<path d="M1027 269H1122" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
<path d="M873 294C886.807 294 898 282.807 898 269C898 255.193 886.807 244 873 244C859.193 244 848 255.193 848 269C848 282.807 859.193 294 873 294Z" fill="#D97706"/>
<text fill="white" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="40" font-weight="bold" letter-spacing="0em"><tspan x="861.223" y="286.44">1</tspan></text>
<path d="M1012 294C1025.81 294 1037 282.807 1037 269C1037 255.193 1025.81 244 1012 244C998.193 244 987 255.193 987 269C987 282.807 998.193 294 1012 294Z" fill="#78716C"/>
<text fill="white" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="40" font-weight="bold" letter-spacing="0em"><tspan x="1000.22" y="286.44">2</tspan></text>
<path d="M1147 294C1160.81 294 1172 282.807 1172 269C1172 255.193 1160.81 244 1147 244C1133.19 244 1122 255.193 1122 269C1122 282.807 1133.19 294 1147 294Z" fill="#57534E"/>
<text fill="white" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="40" font-weight="bold" letter-spacing="0em"><tspan x="1135.22" y="286.44">3</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="1085.22" y="321.592">{階段 3 名稱}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="17" letter-spacing="0em"><tspan x="1099.14" y="346.912">{說明文字 3}</tspan></text>
<path opacity="0.12" d="M1155 500H865C859.477 500 855 504.477 855 510V538C855 543.523 859.477 548 865 548H1155C1160.52 548 1165 543.523 1165 538V510C1165 504.477 1160.52 500 1155 500Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="26" font-weight="bold" letter-spacing="0em"><tspan x="948.174" y="535.336">{底部標籤}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="120" font-weight="bold" letter-spacing="0em"><tspan x="60" y="219.32">{主標題第 1 行}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="120" font-weight="bold" letter-spacing="0em"><tspan x="60" y="357.32">{主標題第 2 行}</tspan></text>
<path d="M60 384.005L821 383" stroke="#DEDAD3" stroke-width="2"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="38" letter-spacing="0em"><tspan x="60" y="433.068">{副標題}</tspan></text>
<path opacity="0.12" d="M198 450H70C64.4772 450 60 454.477 60 460V494C60 499.523 64.4772 504 70 504H198C203.523 504 208 499.523 208 494V460C208 454.477 203.523 450 198 450Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="84.002" y="489.708">{標籤 1}</tspan></text>
<path opacity="0.12" d="M358 450H230C224.477 450 220 454.477 220 460V494C220 499.523 224.477 504 230 504H358C363.523 504 368 499.523 368 494V460C368 454.477 363.523 450 358 450Z" fill="#78716C"/>
<text fill="#78716C" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="244.002" y="489.708">{標籤 2}</tspan></text>
<path opacity="0.12" d="M518 450H390C384.477 450 380 454.477 380 460V494C380 499.523 384.477 504 390 504H518C523.523 504 528 499.523 528 494V460C528 454.477 523.523 450 518 450Z" fill="#57534E"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="404.002" y="489.708">{標籤 3}</tspan></text>
<text fill="#94A3B8" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" letter-spacing="0em"><tspan x="60" y="542.708">{適用對象說明}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" letter-spacing="0em"><tspan x="879.008" y="593.964">報告汪 reportwang.com</tspan></text>
</g>
<defs>
<clipPath id="clip-{slug}">
<rect width="1200" height="630" fill="white"/>
</clipPath>
</defs>
</svg>
```

---

## 封面圖模板（template-cover-checklist.svg）

**用途**：自評檢核表、逐條清單、文件準備清單、FAQ 類文章封面（1200×630）

### 關鍵規格重點

- Checkbox 為**圓角方形 rect（30×30, rx=2.5）**，非圓形；stroke=`#A8A29E` sw=1.5
- 僅 Row 1–2 有勾選 path（`M860 {y+22} L869.286 {y+32} L886 {y+12}`），Row 3–6 **無**勾選（空白 checkbox）
- Row y 起始：**119/181/243/305/367/429**（整體上移；row h=54 不變）
- Rows 1–4 opacity=0.7 / Rows 5–6 opacity=0.5
- Label x=**892**（非 882），font=20 bold；Rows 1–4 fill=`#1E293B`，Rows 5–6 fill=`#57534E`
- 底部 pill：x=**843** w=**334** y=501（非 x=855 w=310 y=518）；text tspan(921.348, 535.964) font=24
- 左側主標題 y=**220.32/358.32**（與 cover 差 1px，Figma artifact）
- 左側 pills y=**450**，副標題 y=429.068

### 骨架 XML

> ⚠️ 複製後必須把 `clip0_1_74` 改為 `clip-{article-slug}`。

```xml
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip-{slug})">
<path d="M1200 0H0V630H1200V0Z" fill="#F0EFE8"/>
<path d="M1200 0H820V630H1200V0Z" fill="#E8E6DE"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="26" font-weight="bold" letter-spacing="0em"><tspan x="922.174" y="92.336">{檢核清單標題}</tspan></text>
<!-- 列 1（y=119）已完成，有勾選 -->
<path opacity="0.7" d="M1169 119H851C846.582 119 843 122.582 843 127V165C843 169.418 846.582 173 851 173H1169C1173.42 173 1177 169.418 1177 165V127C1177 122.582 1173.42 119 1169 119Z" fill="white"/>
<path d="M878.5 131H857.5C855.015 131 853 133.015 853 135.5V156.5C853 158.985 855.015 161 857.5 161H878.5C880.985 161 883 158.985 883 156.5V135.5C883 133.015 880.985 131 878.5 131Z" stroke="#A8A29E" stroke-width="1.5"/>
<path d="M860 141L869.286 151L886 131" stroke="#D97706" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="20" font-weight="bold" letter-spacing="0em"><tspan x="892" y="154.22">{檢核項目 1}</tspan></text>
<!-- 列 2（y=181）已完成，有勾選 -->
<path opacity="0.7" d="M1169 181H851C846.582 181 843 184.582 843 189V227C843 231.418 846.582 235 851 235H1169C1173.42 235 1177 231.418 1177 227V189C1177 184.582 1173.42 181 1169 181Z" fill="white"/>
<path d="M860 206L869.286 216L886 196" stroke="#D97706" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M878.5 193H857.5C855.015 193 853 195.015 853 197.5V218.5C853 220.985 855.015 223 857.5 223H878.5C880.985 223 883 220.985 883 218.5V197.5C883 195.015 880.985 193 878.5 193Z" stroke="#A8A29E" stroke-width="1.5"/>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="20" font-weight="bold" letter-spacing="0em"><tspan x="892" y="216.22">{檢核項目 2}</tspan></text>
<!-- 列 3（y=243）無勾選 -->
<path opacity="0.7" d="M1169 243H851C846.582 243 843 246.582 843 251V289C843 293.418 846.582 297 851 297H1169C1173.42 297 1177 293.418 1177 289V251C1177 246.582 1173.42 243 1169 243Z" fill="white"/>
<path d="M878.5 255H857.5C855.015 255 853 257.015 853 259.5V280.5C853 282.985 855.015 285 857.5 285H878.5C880.985 285 883 282.985 883 280.5V259.5C883 257.015 880.985 255 878.5 255Z" stroke="#A8A29E" stroke-width="1.5"/>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="20" font-weight="bold" letter-spacing="0em"><tspan x="892" y="278.22">{檢核項目 3}</tspan></text>
<!-- 列 4（y=305）無勾選 -->
<path opacity="0.7" d="M1169 305H851C846.582 305 843 308.582 843 313V351C843 355.418 846.582 359 851 359H1169C1173.42 359 1177 355.418 1177 351V313C1177 308.582 1173.42 305 1169 305Z" fill="white"/>
<path d="M878.5 317H857.5C855.015 317 853 319.015 853 321.5V342.5C853 344.985 855.015 347 857.5 347H878.5C880.985 347 883 344.985 883 342.5V321.5C883 319.015 880.985 317 878.5 317Z" stroke="#A8A29E" stroke-width="1.5"/>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="20" font-weight="bold" letter-spacing="0em"><tspan x="892" y="341.22">{檢核項目 4}</tspan></text>
<!-- 列 5（y=367）待辦 opacity=0.5 -->
<path opacity="0.5" d="M1169 367H851C846.582 367 843 370.582 843 375V413C843 417.418 846.582 421 851 421H1169C1173.42 421 1177 417.418 1177 413V375C1177 370.582 1173.42 367 1169 367Z" fill="white"/>
<path d="M878.5 379H857.5C855.015 379 853 381.015 853 383.5V404.5C853 406.985 855.015 409 857.5 409H878.5C880.985 409 883 406.985 883 404.5V383.5C883 381.015 880.985 379 878.5 379Z" stroke="#A8A29E" stroke-width="1.5"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="20" font-weight="bold" letter-spacing="0em"><tspan x="892" y="403.22">{檢核項目 5}</tspan></text>
<!-- 列 6（y=429）待辦 opacity=0.5 -->
<path opacity="0.5" d="M1169 429H851C846.582 429 843 432.582 843 437V475C843 479.418 846.582 483 851 483H1169C1173.42 483 1177 479.418 1177 475V437C1177 432.582 1173.42 429 1169 429Z" fill="white"/>
<path d="M878.5 441H857.5C855.015 441 853 443.015 853 445.5V466.5C853 468.985 855.015 471 857.5 471H878.5C880.985 471 883 468.985 883 466.5V445.5C883 443.015 880.985 441 878.5 441Z" stroke="#A8A29E" stroke-width="1.5"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="20" font-weight="bold" letter-spacing="0em"><tspan x="892" y="465.22">{檢核項目 6}</tspan></text>
<!-- 底部進度 pill -->
<path opacity="0.12" d="M1166.23 501H853.774C847.824 501 843 505.477 843 511V539C843 544.523 847.824 549 853.774 549H1166.23C1172.18 549 1177 544.523 1177 539V511C1177 505.477 1172.18 501 1166.23 501Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="921.348" y="535.964">已完成 {N} / 6 項</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="120" font-weight="bold" letter-spacing="0em"><tspan x="60" y="220.32">{主標題第 1 行}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="120" font-weight="bold" letter-spacing="0em"><tspan x="60" y="358.32">{主標題第 2 行}</tspan></text>
<path d="M60 385L820 383.953" stroke="#DEDAD3" stroke-width="2"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="38" letter-spacing="0em"><tspan x="60" y="429.068">{副標題}</tspan></text>
<path opacity="0.12" d="M198 450H70C64.4772 450 60 454.477 60 460V494C60 499.523 64.4772 504 70 504H198C203.523 504 208 499.523 208 494V460C208 454.477 203.523 450 198 450Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="84.002" y="489.708">{標籤 1}</tspan></text>
<path opacity="0.12" d="M358 450H230C224.477 450 220 454.477 220 460V494C220 499.523 224.477 504 230 504H358C363.523 504 368 499.523 368 494V460C368 454.477 363.523 450 358 450Z" fill="#78716C"/>
<text fill="#78716C" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="244.002" y="489.708">{標籤 2}</tspan></text>
<path opacity="0.12" d="M518 450H390C384.477 450 380 454.477 380 460V494C380 499.523 384.477 504 390 504H518C523.523 504 528 499.523 528 494V460C528 454.477 523.523 450 518 450Z" fill="#57534E"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="404.002" y="489.708">{標籤 3}</tspan></text>
<text fill="#94A3B8" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" letter-spacing="0em"><tspan x="60" y="540.708">{適用對象說明}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" letter-spacing="0em"><tspan x="879.008" y="593.964">報告汪 reportwang.com</tspan></text>
</g>
<defs>
<clipPath id="clip-{slug}">
<rect width="1200" height="630" fill="white"/>
</clipPath>
</defs>
</svg>
```

---

## 封面圖模板（template-cover-vs.svg）

**用途**：A vs B 對比、日間 vs 住宿、NG vs OK、前後比較類文章封面（1200×630）

### 關鍵規格重點

- **全幅單色背景**（無右側灰底面板），僅 `fill="#F0EFE8"`
- 主標題 **font=80**（非 90），**起點式**左對齊 tspan(328.086, 102.88/194.88)，**非** `text-anchor="middle"`
- 分隔線 y=**218**（非 224）：`M40 218H1160`
- 3 色 pills y=236 h=42，x=**374/530/686**（非 364/520/676），labels tspan(401.145/557.145/713.145, 266.964) font=24
- 左卡 `(40, 297, 495, 252)` rx≈15.23，**非** `(40, 282, 520, 290, rx=16)`；stroke=`#D97706` sw=3
- 右卡 `(665, 297, 495, 252)` rx≈15.23；stroke=`#78716C` sw=3
- **卡內無側邊色條**（舊版 `rect x=40 w=8 fill=#d97706` 已移除）
- 標頭 pill opacity=**0.15**（非 0.12）；左 tspan(75.6543, 341.592)，右 tspan(696.214, 341.592)
- VS 圓 cx=600 cy=**416**（非 427），**fill=`#F0EFE8`**（與背景同色，挖空效果）
- 浮水印 tspan(879.924, **591.592**) font=**22**（此模板特有，其他封面均為 y=593.964 font=24）

### 骨架 XML

> ⚠️ 複製後必須把 `clip0_1_168` 改為 `clip-{article-slug}`。

```xml
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip-{slug})">
<path d="M1200 0H0V630H1200V0Z" fill="#F0EFE8"/>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="80" font-weight="bold" letter-spacing="0em"><tspan x="328.086" y="102.88">{主標題第 1 行}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="80" font-weight="bold" letter-spacing="0em"><tspan x="328.086" y="194.88">{主標題第 2 行}</tspan></text>
<path d="M40 218H1160" stroke="#DEDAD3" stroke-width="2"/>
<path opacity="0.12" d="M504 236H384C378.477 236 374 240.477 374 246V268C374 273.523 378.477 278 384 278H504C509.523 278 514 273.523 514 268V246C514 240.477 509.523 236 504 236Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="401.145" y="266.964">{標籤 1}</tspan></text>
<path opacity="0.12" d="M660 236H540C534.477 236 530 240.477 530 246V268C530 273.523 534.477 278 540 278H660C665.523 278 670 273.523 670 268V246C670 240.477 665.523 236 660 236Z" fill="#78716C"/>
<text fill="#78716C" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="557.145" y="266.964">{標籤 2}</tspan></text>
<path opacity="0.12" d="M816 236H696C690.477 236 686 240.477 686 246V268C686 273.523 690.477 278 696 278H816C821.523 278 826 273.523 826 268V246C826 240.477 821.523 236 816 236Z" fill="#57534E"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="713.145" y="266.964">{標籤 3}</tspan></text>
<!-- 左卡 (40, 297, 495, 252, rx≈15.23) -->
<path d="M519.769 297H55.2308C46.819 297 40 303.225 40 310.903V535.097C40 542.775 46.819 549 55.2308 549H519.769C528.181 549 535 542.775 535 535.097V310.903C535 303.225 528.181 297 519.769 297Z" fill="white" stroke="#D97706" stroke-width="3"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="75.6543" y="341.592">{選項 A 名稱}</tspan></text>
<path d="M65 360H535" stroke="#E8E6DE"/>
<path opacity="0.15" d="M205 314H75C69.4772 314 65 318.477 65 324V340C65 345.523 69.4772 350 75 350H205C210.523 350 215 345.523 215 340V324C215 318.477 210.523 314 205 314Z" fill="#D97706"/>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="75" y="398.592">{比較重點 1}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="75" y="434.592">{比較重點 2}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="75" y="470.592">{比較重點 3}</tspan></text>
<text fill="#78716C" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="17" letter-spacing="0em"><tspan x="75" y="512.912">{補充說明}</tspan></text>
<!-- 右卡 (665, 297, 495, 252, rx≈15.23) -->
<path d="M1144.77 297H680.231C671.819 297 665 303.225 665 310.903V535.097C665 542.775 671.819 549 680.231 549H1144.77C1153.18 549 1160 542.775 1160 535.097V310.903C1160 303.225 1153.18 297 1144.77 297Z" fill="white" stroke="#78716C" stroke-width="3"/>
<path d="M665 360H1135" stroke="#E8E6DE"/>
<path opacity="0.15" d="M826 314H696C690.477 314 686 318.477 686 324V340C686 345.523 690.477 350 696 350H826C831.523 350 836 345.523 836 340V324C836 318.477 831.523 314 826 314Z" fill="#78716C"/>
<text fill="#78716C" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="696.214" y="341.592">{選項 B 名稱}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="696" y="398.592">{比較重點 1}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="696" y="434.592">{比較重點 2}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="696" y="470.592">{比較重點 3}</tspan></text>
<text fill="#78716C" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="17" letter-spacing="0em"><tspan x="696" y="512.912">{補充說明}</tspan></text>
<!-- VS 圓（fill=#F0EFE8 與背景同色，挖空效果） -->
<path d="M600 456C622.091 456 640 438.091 640 416C640 393.909 622.091 376 600 376C577.909 376 560 393.909 560 416C560 438.091 577.909 456 600 456Z" fill="#F0EFE8" stroke="#D97706" stroke-width="3"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="32" font-weight="bold" letter-spacing="0em"><tspan x="580.312" y="429.952">VS</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" letter-spacing="0em"><tspan x="879.924" y="591.592">報告汪 reportwang.com</tspan></text>
</g>
<defs>
<clipPath id="clip-{slug}">
<rect width="1200" height="630" fill="white"/>
</clipPath>
</defs>
</svg>
```

---

## 五大圖表模板

### 1. 流程圖（template-flow.svg）

**用途**：呈現 3–5 個依序進行的步驟流程

**骨架結構（以 N=4 為例，大地色系）**：
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" font-family="'Noto Sans TC', sans-serif">
  <!-- 背景 -->
  <rect width="800" height="500" fill="#f0efe8"/>

  <!-- 標題區（統一規範：主標 32px y=48 / 副標 22px y=78 / 分隔線 y=94） -->
  <text x="400" y="48" text-anchor="middle" font-size="32" fill="#1e293b" font-weight="700">{N} 步驟{流程名稱}</text>
  <text x="400" y="78" text-anchor="middle" font-size="22" fill="#57534e">{副標文字}</text>
  <line x1="28" y1="94" x2="772" y2="94" stroke="#dedad3" stroke-width="1"/>

  <!-- 箭頭（N-1 個，arrow_y=279，= (108+450)/2） -->
  <line x1="202" y1="279" x2="218" y2="279" stroke="#c4bfb8" stroke-width="2"/>
  <polygon points="202,273 218,279 202,285" fill="#c4bfb8"/>
  <!-- ...重複 N-1 次... -->

  <!-- Step 1：{標題}（#d97706 琥珀）card x=28 cx=115 -->
  <!-- 卡片 y=108, height=342, 底=450（對齊分類卡片下排下緣） -->
  <rect x="28" y="108" width="174" height="342" rx="12" fill="white" stroke="#e8e6de" stroke-width="1"/>
  <rect x="28" y="108" width="174" height="8" rx="4" fill="#d97706"/>
  <rect x="28" y="112" width="174" height="4" fill="#d97706"/>
  <!-- Block 1: STEP 圓圈（r=44, cy=201） -->
  <circle cx="115" cy="201" r="44" fill="#fef3c7"/>
  <text x="115" y="190" text-anchor="middle" font-size="18" fill="#d97706" font-weight="700">STEP</text>
  <text x="115" y="219" text-anchor="middle" font-size="29" fill="#d97706" font-weight="700">01</text>
  <!-- Block 2: H 22px, J 15px -->
  <text x="115" y="299" text-anchor="middle" font-size="22" fill="#1e293b" font-weight="700">{標題}</text>
  <text x="115" y="327" text-anchor="middle" font-size="15" fill="#57534e">{說明行 1}</text>
  <text x="115" y="349" text-anchor="middle" font-size="15" fill="#57534e">{說明行 2}</text>
  <!-- Block 3: Pill -->
  <rect x="41" y="377" width="148" height="36" rx="18" fill="#fef3c7"/>
  <text x="115" y="401" text-anchor="middle" font-size="16" fill="#d97706" font-weight="600">{時程標籤}</text>

  <!-- Step 2：{標題}（#78716c 暖灰）...Step 3（#57534e 深棕）...Step 4（#a8a29e 淺灰）... -->

  <!-- 浮水印 -->
  <text x="760" y="480" font-size="16" fill="#d97706" text-anchor="end" font-weight="400">報告汪 reportwang.com</text>
</svg>
```

> ⚠ 卡片 stroke 統一使用 `stroke="#e8e6de" stroke-width="1"`，所有卡片（含最後一張）相同，不加強。

---

### 2. 時程甘特圖（template-timeline.svg）

**用途**：呈現多個任務在週次/月份上的執行時間分佈

**骨架結構**：
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#f0efe8"/>
  <!-- 標題區（統一規範：主標 32px y=48 / 副標 22px y=78 / 分隔線 y=94） -->
  <text x="400" y="48" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="32" fill="#1e293b" font-weight="700">{圖表標題}</text>
  <text x="400" y="78" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="22" fill="#57534e">{副標說明}</text>
  <line x1="40" y1="94" x2="760" y2="94" stroke="#dedad3" stroke-width="1"/>

  <!-- 時間軸：y=272（(94+450)/2），實心大圓 r=24） -->
  <line x1="60" y1="272" x2="736" y2="272" stroke="#a8a29e" stroke-width="4"/>
  <polygon points="736,265 736,279 752,272" fill="#a8a29e"/>

  <!-- 節點（奇數在上，偶數在下）：色彩順序 #d97706→#78716c→#57534e→#a8a29e→#94a3b8 -->

  <!-- 上方節點（以節點 1 為例）-->
  <!-- 卡片：x=cx-60, y=108, w=120, h=100（不動，頂部色條） -->
  <rect x="{cx-60}" y="108" width="120" height="100" rx="12" fill="white" stroke="#e8e6de" stroke-width="1"/>
  <rect x="{cx-60}" y="108" width="120" height="8" rx="4" fill="{主色}"/>
  <rect x="{cx-60}" y="112" width="120" height="4" fill="{主色}"/>
  <text x="{cx}" y="145" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="20" fill="#1e293b" font-weight="700">{標題}</text>
  <text x="{cx}" y="167" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="16" fill="#57534e">{說明 1}</text>
  <text x="{cx}" y="187" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="16" fill="#57534e">{說明 2}</text>
  <!-- 虛線（卡片底208 → 圓頂248）+ 實心大圓 r=24 -->
  <line x1="{cx}" y1="208" x2="{cx}" y2="248" stroke="{主色}" stroke-width="1.5" stroke-dasharray="4,3"/>
  <circle cx="{cx}" cy="272" r="24" fill="{主色}"/>
  <text x="{cx}" y="280" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="20" fill="white" font-weight="700">{N}</text>
  <!-- W 標籤 pill（節點下方，y=300=272+24+4） -->
  <rect x="{cx-34}" y="300" width="68" height="22" rx="11" fill="{主色}"/>
  <text x="{cx}" y="315" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="14" fill="white" font-weight="700">W1–W2</text>

  <!-- 下方節點（以節點 2 為例）-->
  <!-- W 標籤 pill（節點上方，y=222=272-24-4-22，距上方卡片底208間距14px） -->
  <rect x="{cx-34}" y="222" width="68" height="22" rx="11" fill="{主色}"/>
  <text x="{cx}" y="237" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="14" fill="white" font-weight="700">W3–W4</text>
  <circle cx="{cx}" cy="272" r="24" fill="{主色}"/>
  <text x="{cx}" y="280" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="20" fill="white" font-weight="700">{N}</text>
  <!-- 虛線（圓底296 → 卡片頂350） -->
  <line x1="{cx}" y1="296" x2="{cx}" y2="350" stroke="{主色}" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- 卡片（下方，底部色條，底=450） -->
  <rect x="{cx-60}" y="350" width="120" height="100" rx="12" fill="white" stroke="#e8e6de" stroke-width="1"/>
  <rect x="{cx-60}" y="442" width="120" height="8" rx="4" fill="{主色}"/>
  <rect x="{cx-60}" y="438" width="120" height="4" fill="{主色}"/>
  <text x="{cx}" y="379" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="20" fill="#1e293b" font-weight="700">{標題}</text>
  <text x="{cx}" y="401" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="16" fill="#57534e">{說明 1}</text>
  <text x="{cx}" y="421" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="16" fill="#57534e">{說明 2}</text>

  <!-- 浮水印 -->
  <text x="760" y="480" font-size="16" fill="#d97706" text-anchor="end" font-weight="400" font-family="'Noto Sans TC', sans-serif">報告汪 reportwang.com</text>
</svg>
```

---

### 3. 檢核表（template-checklist.svg）

**用途**：呈現分組的確認清單，分已完成（✓）與待確認（○）

**骨架結構**：
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#f0efe8"/>
  <!-- 標題區（統一規範：主標 32px y=48 / 副標 22px y=78 / 分隔線 y=94） -->
  <text x="400" y="48" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="32" fill="#1e293b" font-weight="700">{圖表標題}</text>
  <text x="400" y="78" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="22" fill="#57534e">{副標說明}</text>
  <line x1="40" y1="94" x2="760" y2="94" stroke="#dedad3" stroke-width="1"/>

  <!-- 左欄（x=60~380，+20px 右移）/ 右欄（x=416~760），中間垂直線 x=400 -->
  <!-- 每欄 2 個區段，各區段 4 個項目 -->

  <!-- 區段標題（色塊標記，左欄 x=60，右欄 x=416） -->
  <rect x="{x}" y="{y}" width="6" height="24" rx="3" fill="{主色}"/>
  <text x="{x+14}" y="{y+17}" font-family="'Noto Sans TC', sans-serif" font-size="20" fill="#1e293b" font-weight="700">{區段名稱}</text>

  <!-- 已完成項目（SVG path 勾選，checkbox 為 rect 20×20 rx=3） -->
  <!-- 左欄 checkbox x=64，右欄 x=420；文字左欄 x=94，右欄 x=450 -->
  <rect x="{cbx}" y="{cby}" width="20" height="20" rx="3" fill="#f0efe8" stroke="#a8a29e" stroke-width="1"/>
  <path d="M {cbx+4},{cby+10} L {cbx+8},{cby+15} L {cbx+17},{cby+3}" fill="none" stroke="{主色}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="{txtx}" y="{cby+16}" font-family="'Noto Sans TC', sans-serif" font-size="18" fill="#1e293b">{項目文字}</text>

  <!-- 待確認項目（空心方框） -->
  <rect x="{cbx}" y="{cby}" width="20" height="20" rx="3" fill="none" stroke="#a8a29e" stroke-width="1.5"/>
  <text x="{txtx}" y="{cby+16}" font-family="'Noto Sans TC', sans-serif" font-size="18" fill="#1e293b">{待確認項目}</text>

  <!-- 垂直分隔線 -->
  <line x1="400" y1="98" x2="400" y2="432" stroke="#dedad3" stroke-width="1"/>

  <!-- 圖例 + 浮水印 -->
  <line x1="40" y1="433" x2="760" y2="433" stroke="#dedad3" stroke-width="1"/>
  <!-- 已確認圖例：rect x=75 -->
  <rect x="75" y="443" width="18" height="18" rx="3" fill="#f0efe8" stroke="#a8a29e" stroke-width="1"/>
  <path d="M 78,453 L 82,458 L 91,446" fill="none" stroke="#78716c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="102" y="458" font-family="'Noto Sans TC', sans-serif" font-size="18" fill="#57534e">已確認完成</text>
  <!-- 待確認圖例：rect x=220 -->
  <rect x="220" y="443" width="18" height="18" rx="3" fill="none" stroke="#a8a29e" stroke-width="1.5"/>
  <text x="247" y="458" font-family="'Noto Sans TC', sans-serif" font-size="18" fill="#57534e">待確認項目</text>

  <text x="760" y="480" font-size="16" fill="#d97706" text-anchor="end" font-weight="400" font-family="'Noto Sans TC', sans-serif">報告汪 reportwang.com</text>
</svg>
```

---

### 4. 分類卡片（template-categories.svg）

**用途**：呈現 4 個並列的概念/面向/類別，每個含標題與條列說明

**骨架結構**：
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#f0efe8"/>
  <!-- 標題區（統一規範：主標 32px y=48 / 副標 22px y=78 / 分隔線 y=94） -->
  <text x="400" y="48" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="32" fill="#1e293b" font-weight="700">{圖表標題}</text>
  <text x="400" y="78" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="22" fill="#57534e">{副標說明}</text>
  <line x1="40" y1="94" x2="760" y2="94" stroke="#dedad3" stroke-width="1"/>

  <!-- 2×2 卡片配置 -->
  <!-- 上排：x=40(w=346) / x=414(w=346), y=104, h=168 -->
  <!-- 下排：x=40(w=346) / x=414(w=346), y=288, h=162，底=450（對齊基準） -->

  <!-- 卡片頂部彩色 header（含 SVG 圖示 + 標題） -->
  <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="white"/>
  <rect x="{x}" y="{y}" width="{w}" height="44" rx="12" fill="{主色}"/>
  <rect x="{x}" y="{y+24}" width="{w}" height="20" fill="{主色}"/>
  <!-- 圖示：用 SVG 幾何圖形，不用 Unicode 符號 -->
  <!-- 例：圓形圖示 -->
  <circle cx="{x+30}" cy="{y+22}" r="9" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>
  <circle cx="{x+30}" cy="{y+22}" r="3" fill="white" opacity="0.8"/>
  <!-- 標題文字 -->
  <text x="{x+w/2}" y="{y+29}" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="15" fill="white" font-weight="700">{卡片標題}</text>

  <!-- 條列說明（3–4 行，≥14px） -->
  <text x="{x+20}" y="{y+72}" font-family="'Noto Sans TC', sans-serif" font-size="14" fill="#57534e">• {說明 1}</text>
  <text x="{x+20}" y="{y+92}" font-family="'Noto Sans TC', sans-serif" font-size="14" fill="#57534e">• {說明 2}</text>
  <text x="{x+20}" y="{y+112}" font-family="'Noto Sans TC', sans-serif" font-size="14" fill="#57534e">• {說明 3}</text>
  <text x="{x+20}" y="{y+132}" font-family="'Noto Sans TC', sans-serif" font-size="14" fill="#57534e">• {說明 4}</text>

  <!-- 底部標籤 Chips（h=20, rx=10，文字 14px） -->
  <rect x="{x+16}" y="{y+h-26}" width="70" height="20" rx="10" fill="{淺底色}"/>
  <text x="{x+51}" y="{y+h-12}" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="14" fill="{主色}" font-weight="600">{標籤}</text>

  <!-- 浮水印 -->
  <text x="760" y="480" font-size="16" fill="#d97706" text-anchor="end" font-weight="400" font-family="'Noto Sans TC', sans-serif">報告汪 reportwang.com</text>
</svg>
```

---

### 5. PDCA 循環圖（template-pdca.svg）

**用途**：呈現 Plan-Do-Check-Act 四個環節的循環關係

**造型**：粗弧形箭頭環（參考圖風格） — 每段是寬厚的弧形箭頭，末端有突出三角箭頭，四段之間有小間隙，與參考圖保持一致。

> ⚠ PDCA 使用**大地色系**順序色（琥珀→暖灰→深棕→淺灰），與全站風格一致。

**設計參數**（圓心 cx=400, cy=285，SVG 800×500，水平置中）：
- 外半徑 R=130，內半徑 r=68（弧帶厚 62px）
- 每段弧 **72°**，間隔 **18°**（4×72+4×18=360°）
- 箭頭翹出：外側 +15→r=145，內側 -15→r=53，箭尖在 r=99 再多 14°
- 整體**順時針旋轉 50°**（Plan 右上、Do 右下、Check 左下、Act 左上）
- `point(radius, θ) = (400 + radius·sinθ, 285 − radius·cosθ)`

**各弧段 Path**（箭頭路徑：外弧→外翹→箭尖→內翹→內弧末端→內弧反向→Z）：

| 弧段 | 角度 | 顏色 | Path d |
|------|------|------|--------|
| Plan（P） | 14°→86°，尖@100° | `#d97706` | `M 431 159 A 130 130 0 0 1 530 276 L 545 275 L 498 302 L 453 281 L 468 280 A 68 68 0 0 0 416 219 Z` |
| Do（D） | 104°→176°，尖@190° | `#78716c` | `M 526 316 A 130 130 0 0 1 409 415 L 410 430 L 383 383 L 404 338 L 405 353 A 68 68 0 0 0 466 301 Z` |
| Check（C） | 194°→266°，尖@280° | `#57534e` | `M 369 411 A 130 130 0 0 1 270 294 L 255 295 L 303 268 L 347 289 L 332 290 A 68 68 0 0 0 384 351 Z` |
| Act（A） | 284°→356°，尖@10° | `#a8a29e` | `M 274 254 A 130 130 0 0 1 391 155 L 390 140 L 417 188 L 396 232 L 395 217 A 68 68 0 0 0 334 269 Z` |

**字母位置**（各弧中點，r=99，font-size=30，全部 fill="white"）：

| 字母 | 弧中點角 | x | y | fill |
|------|---------|---|---|------|
| P | 50° | 476 | 227 | white |
| D | 140° | 464 | 367 | white |
| C | 230° | 324 | 355 | white |
| A | 320° | 336 | 215 | white |

**中央文字**：白圓已移除，「PDCA」(y=278) + 「Cycle」(y=302) 直接顯示於箭頭間隙，均為 `font-size="22" font-weight="700" fill="#1e293b"`

**四角說明文字佈局**：
- 右上（Plan）：x=555, y=130
- 右下（Do）：x=555, y=365
- 左下（Check）：x=100, y=365
- 左上（Act）：x=100, y=130

每個說明含：色塊標記（6px 色條）+ 標題（22px 粗體）+ 虛線分隔 + 2 行說明（17px）

---

## 評鑑面向色彩對照

| 評鑑面向 | 大地色（主色） | 大地色（淺底） |
|---------|--------------|--------------|
| 第 1 欄/弧/卡片 | `#d97706`（琥珀） | `#fef3c7` |
| 第 2 欄/弧/卡片 | `#78716c`（暖灰） | `#f5f5f4` |
| 第 3 欄/弧/卡片 | `#57534e`（深棕） | `#f5f0eb` |
| 第 4 欄/弧/卡片 | `#a8a29e`（淺灰） | `#f5f5f4` |

> ⚠ 所有模板（checklist / categories / PDCA）均採大地色系順序色，不再使用 Tailwind-600 鮮豔色或自創柔和色。
> 第 4 色 `#a8a29e` 淺灰作為背景色時，上方文字需改用 `#1e293b` 深色，確保對比度。

---

## 命名規則

格式：`{機構類型}-{文章主題}-{圖表類型}.svg`

| 圖表類型 | 後綴 |
|---------|------|
| 封面圖 | `-cover` |
| 流程圖 | `-flow` |
| 時程圖 | `-timeline` |
| 檢核表 | `-checklist` |
| 分類卡片 | `-categories` |
| PDCA 圖 | `-pdca` |

範例：`daycare-checklist-flow.svg`、`nursing-home-timeline-cover.svg`

---

## 跨模板一致性規範

下列參數是**所有五種圖表模板**必須共用的絕對規範，不得因模板類型不同而有差異。

### 標題區（五大模板統一）

| 元素 | 規定值 |
|------|--------|
| 主標題 font-size | `32` |
| 主標題 y | `48` |
| 副標題 font-size | `22` |
| 副標題 y | `78` |
| 分隔線 y | `94` |
| 分隔線色 | `#dedad3` stroke-width="1" |

### 內容底對齊（分類卡片為基準）

| 模板 | 內容底 y | 說明 |
|------|---------|------|
| 分類卡片 | **450**（基準） | 下排 y=288+h=162=450 |
| 流程圖 | **450** | 卡片 y=108+height=342=450 |
| 時程圖 | **450** | 下方卡片 y=350+h=100=450 |
| 檢核表 | 不固定（4欄項目） | — |
| PDCA | 不固定（圓形佈局） | — |

### 共用參數

| 參數 | 規定值 | 備註 |
|------|--------|------|
| 浮水印 y | `y="480"` | 五種模板統一 |
| 卡片圓角 | `rx="12"` | 卡片 rect 的 rx 值統一 |
| 浮水印色 | `#d97706` | 品牌琥珀色 |
| 色彩輪轉序列 | 1→`#d97706` 2→`#78716c` 3→`#57534e` 4→`#a8a29e` 5→`#94a3b8` 6→`#6b7280` | 超過 5 步驟/列時才使用第 6 色 |

### 刻意保留的差異（非 bug）

以下差異是兩種模板的**功能性設計分工**，屬刻意設計而非疏漏：

| 維度 | flow（流程圖） | list（條列圖） | 原因 |
|------|--------------|--------------|------|
| 標題系統 | 置中大標題 + 副標題 + 分隔線 | 左對齊色塊標題列 | flow 需要引導語；list 需要快速辨識主題 |
| 卡片底色 | `white`（浮出感） | `#e8e6de`（嵌入感） | flow 強調每個步驟獨立；list 強調整體清單閱讀 |
| 色條方向 | 頂部 8px 橫條 | 左側 6px 直條 | 各自與版面方向一致 |
| 編號圓圈 | 大圓（r=35-44）+ STEP/01 雙行 | 小圓（r=16-20）+ 單數字 | flow 圓圈是視覺主角；list 圓圈是輔助標記 |

---

## 量化圖表模板（Tier 1 擴充，2026-04）

> **適用情境**：文章含有可量化數據時（百分比、排行、時程、比例分佈），優先使用量化圖表版型取代純文字清單，視覺說服力更強。

### 版型對照（麥肯錫五分類）

| McKinsey 類型 | 模板檔案 | 適合主題範例 |
|---|---|---|
| 項類對比（量化） | `template-bar-h.svg` | 缺失出現頻率、各班照護比、達標率排行 |
| 成分對比（part-to-whole） | `template-donut.svg` | 評鑑等級分佈、經費來源占比、通過率 |
| 相關性（矩陣分類） | `template-quadrant.svg` | 急迫性 × 重要性、人力 × 品質決策矩陣 |
| 時間序列（量化甘特） | `template-gantt.svg` | 90 天準備計畫、各週任務並行與工時 |
| 封面替代版型 | `template-cover-chart.svg` | 右側以直條圖取代 2×2 卡片（打破同質化） |

---

### template-bar-h.svg（水平長條圖）

**尺寸**：800×500

**版型結構**：
- Header（y=50, h=76）：白底 + 左 6px 琥珀色條 + 主標題
- 5 個水平長條列（y=155/215/275/335/395，各 h=44）
- 每列結構：編號圓圈（cx=55）+ 標籤（x=80）+ 軌道（x=220, w=500）+ 填色條 + 數值（x=724）
- 長條最大寬度 500px 代表 100%，按比例縮放

**使用方式**：
```
1. Read template-bar-h.svg
2. 替換 Header 主標題（≤16 字 36px / ≤20 字 28px）
3. 替換每列的：標籤文字 / 百分比數值 / 填色條 width（= 數值/100 × 500）
4. 最多 5 列，不足 5 列時移除多餘 Row 並調整 y 間距
5. 顏色順序固定：#d97706 / #78716c / #57534e / #a8a29e / #94a3b8
```

**bar_w 快速計算**：
```
bar_w = round(百分比 / 100 × 500)
範例：72% → 360px，43% → 215px
```

---

### template-donut.svg（環形圖）

**尺寸**：800×500

**版型結構**：
- Header（y=50, h=76）
- 環形圖：圓心 (270, 290)，外徑 145，內徑 85，從 12 點鐘順時針切割
- 中心文字：說明（y=272, 18px）+ 總數（y=302, 36px）
- 右側圖例（x=490）：4 個卡片列（y=155/225/295/365，h=62）含迷你長條

**切片弧形路徑說明（4 切片，必須與角度對應）**：

| 切片 | 角度 | 顏色 | 範例路徑（40%，-90° to 54°） |
|------|------|------|------|
| S1 | -90° → end | #d97706 | `M 270 205 L 270 145 A 145 145 0 0 1 {x2} {y2} L {ix2} {iy2} A 85 85 0 0 0 270 205 Z` |

**新弧路徑計算**（改變切片比例時）：
```
end_angle = start_angle + slice_percent / 100 × 360°
outer_x = 270 + 145 × cos(angle_rad)
outer_y = 290 + 145 × sin(angle_rad)
inner_x = 270 + 85 × cos(angle_rad)
inner_y = 290 + 85 × sin(angle_rad)
large_arc = 1 if slice_percent > 50 else 0
```

**中心白圓（必須保留，確保環孔清晰）**：
```xml
<circle cx="270" cy="290" r="83" fill="#f0efe8"/>
```

---

### template-quadrant.svg（2×2 四象限矩陣）

**尺寸**：800×500

**版型結構**：
- Header（y=50, h=76）：標題格式「{X 軸} × {Y 軸} {圖表類型}」
- 格線區（x=28, y=145, w=744, h=300, fill=white）
- 垂直軸：x=400（虛線）/ 水平軸：y=295（虛線）
- 4 個象限卡片（各 w=348, h=128, rx=12）
  - 左上 (x=40, y=155) / 右上 (x=412, y=155)
  - 左下 (x=40, y=307) / 右下 (x=412, y=307)

**象限標準配色**（依重要性遞減）：
```
右上（最優先）: #d97706
左上（計畫中）: #78716c
右下（委派）:   #57534e
左下（暫緩）:   #a8a29e
```

**卡片文字座標（h=128, gap=24）**：
```
title_y = card_y + 53   (font-size=18, font-weight=700)
desc_y  = card_y + 77   (font-size=14, fill=#57534e)
text_x  = card_x + 18
```

---

### template-gantt.svg（甘特圖）

**尺寸**：800×500

**版型結構**：
- Header（y=50, h=76）
- 時間軸表頭（y=140, h=30）：左欄名稱（x=28~213）+ 週次（x=220~772）
- 週列寬度：552px / 8 週 = **每週 69px**
- 週中心 x = 220 + n×69 + 34（n=0..7）→ W1=254, W2=323, ..., W8=737
- 5 個任務列（y=176/232/288/344/400，h=48）
- 甘特條：bar_y = row_y+10, bar_h=28, rx=6

**甘特條 x 座標快算**：
```
bar_x = 220 + (start_week - 1) × 69
bar_w = duration_weeks × 69 - 2   (留 2px 邊距)
```

**最多 8 週 / 5 行**；超過 8 週請改用 12 週版型（每週寬改為 46px）：
```
12週: bar_x = 220 + (start_week - 1) × 46
```

---

### template-cover-chart.svg（封面圖表版型）

**尺寸**：1200×630

**關鍵規格重點**：
- 圖表標題 **font=36**（非 26），tspan(924.395, 103.696) fill=`#57534E`
- 基準線為 **path rect** `x=841 y=506 w=340 h=2 fill=#A8A29E`（非 `<line>`）
- 柱底 y=**506**（非 545），最高柱 h=400（代表 100%）
- 柱 x=855/920/985/1050/1115，w=44，rx=6，opacity=0.9
- 數值標籤 tspan x=`851.312/916.312/981.312/1046.31/1111.31`（起點式偏左）
- 類別標籤 `{A}-{E}` y=534.22 font=20 fill=`#57534E`（不是 572）
- 左側副標題 y=425.068，pills y=450，適用對象 y=550.708

**柱高快算公式（新版，以 y=506 為基準線）**：
```
bar_h   = round(percent / 100 × 400)
top_y   = 506 - bar_h
label_y = top_y - 10
category_label_y = 534 (固定)

範例（模板預設值）：
  85% → bar_h=340, top_y=166, label_y=156 ✓
  70% → bar_h=280, top_y=226, label_y=216 ✓
  50% → bar_h=200, top_y=306, label_y=296 ✓
  35% → bar_h=140, top_y=366, label_y=356 ✓
  20% → bar_h= 80, top_y=426, label_y=416 ✓
```

> ⚠️ 複製後必須把 `clip0_1_75` 改為 `clip-{article-slug}`。

```xml
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip-{slug})">
<path d="M1200 0H0V630H1200V0Z" fill="#F0EFE8"/>
<path d="M1200 0H820V630H1200V0Z" fill="#E8E6DE"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="36" font-weight="bold" letter-spacing="0em"><tspan x="924.395" y="103.696">{圖表標題}</tspan></text>
<!-- 基準線 -->
<path d="M1179 506H841C840.448 506 840 506.448 840 507C840 507.552 840.448 508 841 508H1179C1179.55 508 1180 507.552 1180 507C1180 506.448 1179.55 506 1179 506Z" fill="#A8A29E"/>
<!-- 柱 A 85% (top_y=166, h=340) -->
<path opacity="0.9" d="M893 166H861C857.686 166 855 168.686 855 172V500C855 503.314 857.686 506 861 506H893C896.314 506 899 503.314 899 500V172C899 168.686 896.314 166 893 166Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="851.312" y="155.964">85%</tspan></text>
<!-- 柱 B 70% (top_y=226, h=280) -->
<path opacity="0.9" d="M958 226H926C922.686 226 920 228.686 920 232V500C920 503.314 922.686 506 926 506H958C961.314 506 964 503.314 964 500V232C964 228.686 961.314 226 958 226Z" fill="#78716C"/>
<text fill="#78716C" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="916.312" y="215.964">70%</tspan></text>
<!-- 柱 C 50% (top_y=306, h=200) -->
<path opacity="0.9" d="M1023 306H991C987.686 306 985 308.686 985 312V500C985 503.314 987.686 506 991 506H1023C1026.31 506 1029 503.314 1029 500V312C1029 308.686 1026.31 306 1023 306Z" fill="#57534E"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="981.312" y="295.964">50%</tspan></text>
<!-- 柱 D 35% (top_y=366, h=140) -->
<path opacity="0.9" d="M1088 366H1056C1052.69 366 1050 368.686 1050 372V500C1050 503.314 1052.69 506 1056 506H1088C1091.31 506 1094 503.314 1094 500V372C1094 368.686 1091.31 366 1088 366Z" fill="#A8A29E"/>
<text fill="#A8A29E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="1046.31" y="355.964">35%</tspan></text>
<!-- 柱 E 20% (top_y=426, h=80) -->
<path opacity="0.9" d="M1153 426H1121C1117.69 426 1115 428.686 1115 432V500C1115 503.314 1117.69 506 1121 506H1153C1156.31 506 1159 503.314 1159 500V432C1159 428.686 1156.31 426 1153 426Z" fill="#94A3B8"/>
<text fill="#94A3B8" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="1111.31" y="415.964">20%</tspan></text>
<!-- 類別標籤 -->
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="20" letter-spacing="0em"><tspan x="864.168" y="534.22">{A}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="20" letter-spacing="0em"><tspan x="929.17" y="534.22">{B}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="20" letter-spacing="0em"><tspan x="994.365" y="534.22">{C}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="20" letter-spacing="0em"><tspan x="1058.38" y="534.22">{D}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="20" letter-spacing="0em"><tspan x="1124.36" y="534.22">{E}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="120" font-weight="bold" letter-spacing="0em"><tspan x="60" y="219.32">{主標題第 1 行}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="120" font-weight="bold" letter-spacing="0em"><tspan x="60" y="357.32">{主標題第 2 行}</tspan></text>
<path d="M60 384H820" stroke="#DEDAD3" stroke-width="2"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="38" letter-spacing="0em"><tspan x="60" y="425.068">{副標題}</tspan></text>
<path opacity="0.12" d="M198 450H70C64.4772 450 60 454.477 60 460V494C60 499.523 64.4772 504 70 504H198C203.523 504 208 499.523 208 494V460C208 454.477 203.523 450 198 450Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="84.002" y="489.708">{標籤 1}</tspan></text>
<path opacity="0.12" d="M358 450H230C224.477 450 220 454.477 220 460V494C220 499.523 224.477 504 230 504H358C363.523 504 368 499.523 368 494V460C368 454.477 363.523 450 358 450Z" fill="#78716C"/>
<text fill="#78716C" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="244.002" y="489.708">{標籤 2}</tspan></text>
<path opacity="0.12" d="M518 450H390C384.477 450 380 454.477 380 460V494C380 499.523 384.477 504 390 504H518C523.523 504 528 499.523 528 494V460C528 454.477 523.523 450 518 450Z" fill="#57534E"/>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" font-weight="bold" letter-spacing="0em"><tspan x="404.002" y="489.708">{標籤 3}</tspan></text>
<text fill="#94A3B8" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="28" letter-spacing="0em"><tspan x="60" y="550.708">{適用對象說明}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" letter-spacing="0em"><tspan x="879.008" y="593.964">報告汪 reportwang.com</tspan></text>
</g>
<defs>
<clipPath id="clip-{slug}">
<rect width="1200" height="630" fill="white"/>
</clipPath>
</defs>
</svg>
```

**使用時機**：文章封面需突顯多項目比較（如各機構達標率、各面向得分），以圖表代替數字卡，增強差異感。

---

## 量化圖表模板 Tier 2（2026-04 擴充）

> **與 Tier 1 相同規範**：土色系、背景 #f0efe8、Noto Sans TC、浮水印 y=480。

### 版型對照

| McKinsey 類型 | 模板檔案 | 適合主題範例 |
|---|---|---|
| 成分（年度堆疊） | `template-stacked-bar.svg` | 各年評鑑等級分佈變化、各項目占比演變 |
| 項類（A/B 對照） | `template-vs-compare.svg` | 自主備評 vs 委外、兩種照護模式比較 |
| 時間序列（垂直柱） | `template-column.svg` | 年度通過率、各年度缺失數量柱狀比較 |
| 時間序列（折線） | `template-line.svg` | 達標率趨勢、各季缺失數折線追蹤 |

---

### template-stacked-bar.svg（100% 堆疊水平長條）

**尺寸**：800×500

**版型結構**：
- Header（y=50, h=76）
- 垂直刻度線（x=345/470/595 代表 25%/50%/75%）+ 刻度標籤（y=161）
- 3 個年度列（y=175/265/355，bar_h=44，間距 90px）
- 圖例（y=416，4 色塊 + 標籤）

**每列畫法（順序不可顛倒）**：
```xml
<!-- 1. 白底（rx=12）先畫，提供外圓角 -->
<rect x="220" y="{bar_y}" width="500" height="44" rx="12" fill="white" stroke="#e8e6de" stroke-width="1"/>
<!-- 2. 色段（rx=0）疊上，填色至白底中間 -->
<rect x="220" y="{bar_y}" width="{w1}" height="44" fill="#d97706"/>
<rect x="{220+w1}" y="{bar_y}" width="{w2}" height="44" fill="#78716c"/>
<!-- ... 以此類推 -->
<!-- 3. 百分比文字（白色或深色）-->
<text ...>XX%</text>
```

**色段寬度快算（bar 總寬 500px = 100%）**：
```
segment_w = round(percent / 100 × 500)
```

**text_y（色段內百分比標籤）**：
```
text_y = bar_y + 44/2 + 14×0.35 = bar_y + 22 + 4.9 = bar_y + 27
```

**小字色選擇**：#a8a29e（淡石色）段使用 `fill="#1e293b"`；其餘深色段使用 `fill="white"`。

---

### template-vs-compare.svg（A/B 側邊對照表）

**尺寸**：800×500

**版型結構**：
- Header（y=50, h=76）：標題格式「{選項A名} vs {選項B名} 比較」
- 欄標題（y=136, h=48）：面向（#1e293b）/ A（#d97706）/ B（#78716c）
- 4 個比較列（y=192/248/304/360，h=50，間距 56）

**欄位 x 座標**：
```
面向欄: x=28,  w=180  → 中心 x=118
A 欄:   x=209, w=282  → 文字起始 x=220
B 欄:   x=492, w=280  → 文字起始 x=503
```

**text_y（每列）**：`row_y + 31`（公式：row_y + 25 + 16×0.35）

**勝出標示（SVG 勾選路徑，置於勝出欄右側）**：
```xml
<!-- A 欄勝出: cx=471 -->
<path d="M 466,{cy} L 470,{cy+5} L 477,{cy-4}" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<!-- B 欄勝出: cx=752 -->
<path d="M 747,{cy} L 751,{cy+5} L 758,{cy-4}" fill="none" stroke="#78716c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
```

**勝出欄淡底色（opacity=0.08）**：A 勝出用 `fill="#d97706"`，B 勝出用 `fill="#78716c"`，繪製在對應欄 rect 之後。

---

### template-column.svg（垂直柱狀圖）

**尺寸**：800×500

**圖表座標（與 template-line.svg 共享）**：
```
圖表區: x=90~760, y=140~410 (h=270, 代表 0%~100%)
Y軸線: x=90, 基線: y=410
水平格線(虛線): y=208/275/343 (75%/50%/25%)
Y軸標籤: text-anchor=end, x=82
5 根柱子: w=80, x=135/260/385/510/635
          中心: 175/300/425/550/675
柱高計算: bar_h = round(value/100 × 270)
         top_y = 410 - bar_h
年份標籤: y=428, text-anchor=middle
數值標籤: text_y = top_y - 10
```

**配色規則**：最新一年用 `#d97706`（強調），過去年份用 `#a8a29e` 或 `#78716c`。

**柱高快算表（270px = 100%）**：
```
100%=270  90%=243  80%=216  70%=189  60%=162  50%=135  40%=108  30%=81
```

---

### template-line.svg（折線趨勢圖）

**尺寸**：800×500

**圖表座標**：同 `template-column.svg`（共享 x/y 軸範圍與格線）

**5 個資料點（x 與 column 柱中心相同）**：
```
x: 175/300/425/550/675
y = 410 - round(value/100 × 270)
```

**元素畫法（順序不可顛倒）**：
```xml
<!-- 1. 格線（最底層） -->
<polyline> <!-- 2. 格線後畫面積填色 -->
<path d="M x1 y1 L ... L xN yN L xN 410 L x1 410 Z" fill="#d97706" opacity="0.08"/>
<!-- 3. 折線 -->
<polyline points="x1,y1 x2,y2 ..." fill="none" stroke="#d97706" stroke-width="3"/>
<!-- 4. 過去年圓圈 (r=6, fill=white, stroke=#a8a29e) -->
<!-- 5. 最新年圓圈 (r=10, fill=#d97706, stroke=white) -->
<!-- 6. 數值標籤（圓圈上方） -->
```

**數值標籤 y 座標**：
```
過去年（r=6）: text_y = point_y - 6 - 12 = point_y - 18
最新年（r=10）: text_y = point_y - 10 - 12 = point_y - 22
```

---

## 量化圖表模板 Tier 3（2026-04 擴充）

### McKinsey 五分類對應

| 模板檔名 | 圖表類型 | McKinsey 分類 | 適用情境 |
|----------|---------|--------------|---------|
| `template-histogram.svg` | 頻率直方圖 | 頻率分佈對比 | 機構得分分佈、人力配置分佈 |
| `template-scatter.svg` | 散佈圖（含趨勢線） | 相關性對比 | 床位數 vs 評鑑分數、人力 vs 缺失數 |
| `template-cover-quote.svg` | 引言封面 | 封面替代版型 | 訪談型文章、專家觀點、機構故事 |

---

### template-histogram.svg — 頻率分佈直方圖

**特徵：相鄰柱無間隔（直方圖），白色分隔線**

**圖表區：** x=90~756（Y 軸 x=90），y=140~410（h=270）

**6 個相鄰色柱（w=111px，無間隔）：**

| 柱 | 起始 x | 中心 x | 得分區間 | 顏色 |
|----|-------|-------|---------|-----|
| 1 | 90 | 145 | 60-69 | `#c4bfb8`（最淡） |
| 2 | 201 | 256 | 70-74 | `#a8a29e` |
| 3 | 312 | 367 | 75-79 | `#78716c` |
| 4 | 423 | 478 | 80-84 | `#d97706`（峰值強調） |
| 5 | 534 | 589 | 85-89 | `#78716c` |
| 6 | 645 | 700 | 90分+ | `#a8a29e` |

**高度公式：** `bar_h = round(n / max_n × 270)`，`top_y = 410 - bar_h`

**Y 軸刻度：** 0/10/20/30 → y=410/333/256/179（每格 77px = 10家）

**格線：** y=333/256/179（虛線 `stroke-dasharray="4,3"`）

**白色分隔線（直方圖邊界）：** 在 x=201/312/423/534/645 畫 `stroke="white" stroke-width="2"`

**峰值 callout pill（強調最高柱）：**
```xml
<rect x="{peak_x}" y="148" width="112" height="26" rx="10" fill="#d97706" opacity="0.12"/>
<text x="{peak_cx}" y="166" font-size="14" fill="#d97706" text-anchor="middle" font-weight="600">最多集中</text>
```

---

### template-scatter.svg — 散佈圖

**特徵：15 資料點、虛線趨勢線、三色群集、左上角圖例**

**圖表區：** Y 軸 x=100，baseline y=410；x=100~760，y=140~410（h=270）

**座標公式（模板範例）：**
- X 軸：床位數 20~100，`x_scale = (760-100)/(100-20) = 8.25 px/unit`
  `x = 100 + (beds - 20) × 8.25`
- Y 軸：評鑑分數 60~100，`y_scale = 270/40 = 6.75 px/unit`
  `y = 410 - (score - 60) × 6.75`

**三色群集：**

| 群集 | 顏色 | r | 說明 |
|------|-----|---|-----|
| 得分 90+（最優） | `#d97706` | 9 | 稍大圓，突顯優秀群 |
| 得分 80-89 | `#78716c` | 7 | 標準圓 |
| 得分 < 80 | `#a8a29e` | 7 | 標準圓 |

**趨勢線（虛線琥珀色，半透明）：**
```xml
<line x1="{x_start}" y1="{y_start}" x2="{x_end}" y2="{y_end}"
      stroke="#d97706" stroke-width="2" stroke-dasharray="8,5" opacity="0.5"/>
```

**趨勢標籤 pill（右上角）：**
```xml
<rect x="490" y="150" width="120" height="26" rx="10" fill="#d97706" opacity="0.12"/>
<text x="550" y="168" font-size="14" fill="#d97706" text-anchor="middle" font-weight="600">正相關趨勢</text>
```

**圖例（左上角，y=148~216 無資料點安全區）：**
- 每列：circle r=6 at x=114，text x=128，cy 間距 23px
- 確保圖例在 y=148~220 區域，避免與資料點重疊

---

### template-cover-quote.svg — 訪談引言封面

**尺寸：1200×630（封面比例）**

### 關鍵規格重點

- **頂部「人物訪談」pill 為硬編碼**（非 placeholder），需改類型時直接替換文字
- 右側頭像外圈 **r=135**（非 r=92），cx=1010 cy=**205**
- 肩部為**圓形** path（非 ellipse），cx=1010 cy=276.902 r≈44
- 引言 y 基線：**189.556 / 253.556 / 317.556**（非 182/246/310）
- 受訪者姓名 y=**398.44** font=40（非 398）
- 職稱 y=**439.336** font=26（非 442）
- **此版型沒有主標題（L1/L2）、沒有副標題、沒有左側 pills、沒有適用對象**

### 骨架 XML

> ⚠️ 複製後必須把 `clip0_1_99` 改為 `clip-{article-slug}`。

```xml
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip-{slug})">
<path d="M1200 0H0V630H1200V0Z" fill="#F0EFE8"/>
<path d="M1200 0H820V630H1200V0Z" fill="#E8E6DE"/>
<!-- 頂部類別 pill（硬編碼「人物訪談」，需改類型時替換文字） -->
<path opacity="0.12" d="M182 56H70C64.4772 56 60 60.4772 60 66V86C60 91.5228 64.4772 96 70 96H182C187.523 96 192 91.5228 192 86V66C192 60.4772 187.523 56 182 56Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" font-weight="bold" letter-spacing="0em"><tspan x="78" y="87.964">人物訪談</tspan></text>
<!-- 琥珀縱向強調線 (x=60, y=116, w=8, h=330) -->
<path d="M68 116H60V446H68V116Z" fill="#D97706"/>
<!-- 引言（3 行，行距 64px） -->
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="46" font-weight="bold" letter-spacing="0em"><tspan x="90" y="189.556">{引言第一行文字}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="46" font-weight="bold" letter-spacing="0em"><tspan x="90" y="253.556">{引言第二行文字}</tspan></text>
<text fill="#78716C" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="46" font-weight="bold" letter-spacing="0em"><tspan x="90" y="317.556">{引言第三行（結語或繼續）}</tspan></text>
<path d="M60 345H760" stroke="#DEDAD3" stroke-width="2"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="40" font-weight="bold" letter-spacing="0em"><tspan x="90" y="398.44">{受訪者姓名}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="26" letter-spacing="0em"><tspan x="90" y="439.336">{職稱・所屬機構}</tspan></text>
<!-- 右側頭像剪影（外圈 r=135，頭 cy=160.978，身 cy=276.902） -->
<path d="M1010 340C1084.56 340 1145 279.558 1145 205C1145 130.442 1084.56 70 1010 70C935.442 70 875 130.442 875 205C875 279.558 935.442 340 1010 340Z" fill="white" stroke="#D97706" stroke-width="3"/>
<path d="M1010 205C1034.31 205 1054.02 185.291 1054.02 160.978C1054.02 136.666 1034.31 116.957 1010 116.957C985.687 116.957 965.978 136.666 965.978 160.978C965.978 185.291 985.687 205 1010 205Z" fill="#C4BFB8"/>
<path d="M1010 317.989C1058.63 317.989 1098.04 299.594 1098.04 276.902C1098.04 254.21 1058.63 235.815 1010 235.815C961.375 235.815 921.957 254.21 921.957 276.902C921.957 299.594 961.375 317.989 1010 317.989Z" fill="#C4BFB8"/>
<!-- 右側文字資訊 -->
<text fill="#A8A29E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="20" letter-spacing="0em"><tspan x="963.242" y="373.22">{機構名稱}</tspan></text>
<text fill="#1E293B" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="30" font-weight="bold" letter-spacing="0em"><tspan x="968.662" y="410.58">{姓名}</tspan></text>
<text fill="#57534E" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" letter-spacing="0em"><tspan x="980.566" y="439.592">{職稱}</tspan></text>
<!-- 右側標籤 pills（兩列） -->
<path opacity="0.12" d="M1000 460H880C874.477 460 870 464.477 870 470V486C870 491.523 874.477 496 880 496H1000C1005.52 496 1010 491.523 1010 486V470C1010 464.477 1005.52 460 1000 460Z" fill="#D97706"/>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="898.686" y="487.592">{標籤一}</tspan></text>
<path opacity="0.12" d="M1000 506H880C874.477 506 870 510.477 870 516V532C870 537.523 874.477 542 880 542H1000C1005.52 542 1010 537.523 1010 532V516C1010 510.477 1005.52 506 1000 506Z" fill="#78716C"/>
<text fill="#78716C" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="22" font-weight="bold" letter-spacing="0em"><tspan x="898.686" y="533.592">{標籤二}</tspan></text>
<text fill="#D97706" style="white-space: pre" xml:space="preserve" font-family="Noto Sans TC" font-size="24" letter-spacing="0em"><tspan x="879.008" y="593.964">報告汪 reportwang.com</tspan></text>
</g>
<defs>
<clipPath id="clip-{slug}">
<rect width="1200" height="630" fill="white"/>
</clipPath>
</defs>
</svg>
```

---

## 凍結保護機制

部分 SVG 已定稿，**禁止修改**。凍結的 SVG 第一行會有以下標記：

```xml
<!-- @frozen: 此圖已定稿，請勿修改 -->
```

**操作規則：**
- 建立或批次修改 SVG 前，先檢查第一行是否含有 `@frozen`
- 有 `@frozen` 的檔案一律跳過，不得修改
- 如確實需要修改，請先移除 `@frozen` 註解並告知使用者

凍結標記範例（加在 `<svg>` 標籤之前）：
```xml
<!-- @frozen: 此圖已定稿，請勿修改 -->
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"
     font-family="'Noto Sans TC', sans-serif">
```

---

## 上線前品質檢查清單

**自動化驗證（優先執行）：**
```bash
npm run svg:validate -- public/blog/{filename}.svg --verbose
```
全部 PASS 後再進行人工確認。

**人工確認項目（自動驗證無法涵蓋）：**
- [ ] **若檔案含 `@frozen` 標記則跳過（禁止修改）**
- [ ] SVG 尺寸符合規範（封面 1200×630 / 內文 **800×500**）
- [ ] `viewBox` 與 `width`/`height` 一致
- [ ] 背景色使用 `#f0efe8`（米黃暖色）
- [ ] 字型為 `'Noto Sans TC', sans-serif`（設定在 `<svg>` 根元素）
- [ ] **無任何低於 14px 的文字**（最重要！）
- [ ] **無 emoji 或 Unicode 符號字元**（用 SVG 圖形替代）
- [ ] **文字色只用 `#1e293b`（標題）或 `#57534e`（內容）**
- [ ] 單張圖項目數未超過密度上限
- [ ] 所有顏色來自本文件定義的色彩系統
- [ ] 包含「報告汪 reportwang.com」品牌浮水印（內文 y=480 / **封面 y=593.964**，vs 模板 y=591.592）
- [ ] **封面類 SVG 浮水印 fill=`#D97706`**（琥珀色）；內文類為 `#d97706`（同色）
- [ ] **封面類 clip-path id 不得使用原模板 `clip0_1_XXX`**，必須改為 article-unique，例如 `clip-{article-slug}`，避免多張 SVG 同頁面碰撞
- [ ] 檔案命名符合 `{機構}-{主題}-{類型}.svg` 格式
- [ ] SVG 自包含（無外部圖片引用、無 JavaScript）
- [ ] 中文文字正確顯示（用繁體中文）
- [ ] 各 `<defs>` 中的 id 在本檔案內唯一
