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

## 設計原則

**風格定位：專業資訊圖表風**（與報告汪網站視覺系統一致）

1. **使用報告汪 Tailwind-600 色系**：與網站卡片相同的藍/綠/橘/紫/青，NOT 柔和低彩度
2. **暖色底調**：背景米黃 `#f0efe8`，非純白、非冷灰
3. **幾何圖形為主**：色塊、圓形、弧形，非卡片邊框線
4. **對稱清晰佈局**：中央圖表 + 四周說明文字
5. **層次分明排版**：大標題粗體 + 中標準體 + 小說明細體
6. **色塊方形標記（■）**：用於引導標題/分段

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
| 直列清單 | **4 項** | 標題 1 行 + 說明 1 行 |
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

**流程圖色彩順序**：Step1=藍 → Step2=綠 → Step3=橘 → Step4=青

### 輔助色

| 名稱 | 色票 | 用途 |
|------|------|------|
| 警示紅 | `#dc2626` | 評鑑日標記、緊急事項（red-600） |

### 文字色（簡化為 3 層）

| 層級 | 色票 | 對比度 | 用途 |
|------|------|--------|------|
| 標題 | `#1e293b` | ~12:1 ✓ | 圖表主標題、卡片標題 |
| 內容 | `#57534e` | ~5.2:1 ✓ | 所有說明文字、副標、標籤 |
| 浮水印 | `#c4bfb8` | 1.6:1（刻意淡） | 品牌浮水印專用 |

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

**箭頭**（arrow_y = card_y + card_h/2 = 301）：

```
arrow[i].x1 = card[i].x + card_w
arrow[i].x2 = card[i+1].x
```

**卡片內部元素**（card_y=141, card_h=320，全部以 cx 置中，**等間距（equal-gap）佈局**）：

```
# 等間距公式：4 段間距相等（頂 / 塊1-2 / 塊2-3 / 底）
usable_top = card_y + 8          （149）
usable_h   = card_h - 8          （312）

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
| gap | **29** | **32** |
| circle cy | **221** | **216** |
| "STEP" y | 210 | 207 |
| "0N" y | 238 | 230 |
| H y | **318** | **309** |
| J1 y | **345** | **337** |
| J2 y | **367** | **359** |
| pill y | **396** | **391** |
| pill text y | **420** | **415** |

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
A 主標題 y=72，B 副標題 y=108，水平分隔線 y=124
card_y=141，card_h=320，浮水印 y=480
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

**自適應佈局（3-5 條）**（畫布高 500）—— **全等距，Header h = H**：

- Header 高度 = Row 高度（H），視覺統一
- 所有間隔（top、header-to-row1、各行間距、bottom）統一為同一個 `gap`

```
間隔數 = N + 2
gap    = floor((500 - (N+1) × H) / (N + 2))   ← Header 也佔 H
Header y   = gap
Row[i] y   = gap + H + (i + 1) × gap + i × H   （i 從 0 開始）
```

| N 條數 | H（header + row 同高） | gap（全等距） | Header y |
|--------|----------------------|--------------|----------|
| 3 條 | **72** | **42** | 42 |
| 4 條 | **62** | **30** | 30 |
| 5 條 | **56** | **23** | 23 |

**Header 文字垂直置中**（font = M2_font）：
```
text_y = header_y + (H + M2_font × 0.85) / 2
```

**Row 內垂直置中（等視覺留白）**：
```
pad    = (H - Q_font × 0.85 - 20 - 16 × 0.24) / 2
Q_y    = row_y + pad + Q_font × 0.85
R_y    = Q_y + 20
circle cy    = row_y + H/2
NUM text y   = row_y + H/2 + 6
NUM circle r = (H ≥ 72) ? 18 : 16
S rect h     = min(46, H - 16)
S rect y     = row_y + (H - S_rect_h) / 2
S1 baseline  = row_y + H/2 - 6
S2 baseline  = row_y + H/2 + 14
```

快速查表（Q_font 自適應 Q/R offset）：

| H  | Q_font | Q offset | R offset | cy | NUM(+6) | S rect y (h) | S1(-6) | S2(+14) |
|----|--------|----------|----------|----|---------|--------------|--------|---------|
| 72 | 22 | **+33** | **+53** | +36 | +42 | +13 (h=46) | +30 | +50 |
| 72 | 20 | **+33** | **+53** | +36 | +42 | +13 (h=46) | +30 | +50 |
| 72 | 18 | **+32** | **+52** | +36 | +42 | +13 (h=46) | +30 | +50 |
| 62 | 22 | **+28** | **+48** | +31 | +37 | +8  (h=46) | +25 | +45 |
| 62 | 20 | **+28** | **+48** | +31 | +37 | +8  (h=46) | +25 | +45 |
| 62 | 18 | **+27** | **+47** | +31 | +37 | +8  (h=46) | +25 | +45 |
| 56 | 22 | **+25** | **+45** | +28 | +34 | +8  (h=40) | +22 | +42 |
| 56 | 20 | **+25** | **+45** | +28 | +34 | +8  (h=40) | +22 | +42 |
| 56 | 18 | **+24** | **+44** | +28 | +34 | +8  (h=40) | +22 | +42 |

> ⚠ **最小字級 16px**（直列清單版型）。放不下時改拆成多張圖，不得縮字。

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
<text x="760" y="480" font-size="16" fill="#c4bfb8" text-anchor="end" font-weight="400" font-family="'Noto Sans TC', sans-serif">報告汪 reportwang.com</text>
```

### 封面圖（右下角浮水印）
```xml
<text x="1140" y="590" font-size="24" fill="#c4bfb8" text-anchor="end" font-weight="400" font-family="'Noto Sans TC', sans-serif">報告汪 reportwang.com</text>
```

---

## 封面圖模板（template-cover.svg）

**用途**：OG Image / 社群分享卡 / 文章列表縮圖（1200×630）

### 基本規格

| 項目 | 規格 |
|------|------|
| 尺寸 | `width="1200" height="630"` |
| viewBox | `0 0 1200 630` |
| 背景 | `#f0efe8`（米黃暖色） |
| 字型 | `font-family="'Noto Sans TC', sans-serif"` |

### 佈局結構（左右分割）

```
┌─────────────────────────────────┬──────────────┐
│ 左側主內容區 (x:60~780)         │ 右側裝飾區塊  │
│                                 │ (x:820~1200) │
│ 主標題第 1 行 100–130px #1e293b │ fill=#e8e6de  │
│ 主標題第 2 行 100–130px #d97706 │              │
│                                 │ 裝飾大數字    │
│ ── 分隔線 #dedad3               │ 140~220px    │
│ 副標題 38–40px #64748b          │ fill=#d97706  │
│                                 │ opacity=0.85  │
│ 特色標籤列 4~5 個 pill 28–30px  │              │
│                                 │ 說明文字      │
│ 適用對象/資料來源 28–30px        │ 28–30px      │
│                                 │              │
│ 浮水印（右下角）24–28px ───────→│              │
└─────────────────────────────────┴──────────────┘
```

### 左側主內容區元素

| 元素 | 字級 | 字重 | 顏色 |
|------|------|------|------|
| 主標題第 1 行 | 100–130px | 900 | `#1e293b` |
| 主標題第 2 行 | 100–130px | 900 | `#d97706`（琥珀強調） |
| 分隔線 | — | — | `#dedad3` stroke-width=1.5~2 |
| 副標題 | 38–40px | 400 | `#64748b` |
| 特色標籤列 | 28–30px | 600~700 | 各標籤色，`rx=8~10` |
| 適用對象/來源 | 28–30px | 400 | `#94a3b8` / `#a8a29e` |
| 浮水印 | 24–28px | 400 | `#c4bfb8` |

### 右側裝飾區塊

| 元素 | 規格 |
|------|------|
| 背景色 | `#e8e6de`（x=820, w=380, h=630） |
| 裝飾大數字 | `font-size="140~220"` `font-weight="900"` `fill="#d97706"` `opacity="0.85"` `text-anchor="middle"` |
| 數字說明 | `font-size="28~30"` `fill="#78716c"` `font-weight="600"` |
| 裝飾標籤/卡片標題 | `font-size="28~30"` |
| 卡片副文字/時程說明 | `font-size="22~28"`（可縮小以符合高度平衡） |
| 單行 pill 標籤 | `font-size="28~30"`（維持大字） |

### 重點設計原則

1. **數字必須醒目**：右側裝飾大數字用 `#d97706`（琥珀色），不能用淺灰
2. **右側高度對齊**：右側裝飾內容（不含浮水印）總高度 ≤ 左側主內容區總高度；裝飾大數字頂部 ≥ 左側主標題頂部（≈y=104）；底部卡片/標籤 ≤ 左側適用對象文字底部（≈y=565）。超出時先縮小裝飾大數字（下限 140px），再縮小副文字（下限 22px）
3. **字要夠大**：主標題 100–130px，副標 38–40px，標籤/適用對象 28–30px，浮水印 24–28px，右側卡片副文字最小 22px
4. **減少空白**：標籤列、卡片、說明文字填滿，不留大片空白
5. **琥珀色 `#d97706` 是核心強調色**：主標題第 2 行、裝飾數字、主要特色標籤
6. **不放品牌文字在左側**：只保留右下角浮水印，不放左下角膠囊標籤
7. **不放頂部類別 tag**：不需要「經營管理」「管理指南」等分類標籤
8. **pill/卡片文字上下置中**：右側裝飾區 pill 或白底卡片內的文字，須在容器高度內垂直置中。計算公式：
   - 單行：`text_y = rect_y + rect_h/2 + font_size × 0.35`
   - 雙行（標題+副文字，baseline 間距 = gap）：`title_y = rect_y + rect_h/2 - gap/2 + (title_font - subtitle_font) × 0.175`，`subtitle_y = title_y + gap`

### 骨架 XML（以 2×2 資訊卡片為例）

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" font-family="'Noto Sans TC', sans-serif">
  <!-- 背景 -->
  <rect width="1200" height="630" fill="#f0efe8"/>
  <!-- 右側裝飾區塊 -->
  <rect x="820" y="0" width="380" height="630" fill="#e8e6de"/>

  <!--
    右側高度計算（以裝飾數字 "45" 為例）：
    · 大數字 font-size=180, baseline=y=239, 頂部≈y=104（與左側主標題頂部對齊）
    · 最後卡片底部 ≤ 左側適用對象 y=558 ✓
  -->

  <!-- 右側裝飾大數字（頂部對齊左側主標題） -->
  <text x="1010" y="239" font-size="180" font-weight="900" fill="#d97706" text-anchor="middle" opacity="0.85">{數字}</text>
  <text x="1010" y="281" font-size="28" fill="#78716c" text-anchor="middle" font-weight="600">{數字說明}</text>

  <!-- 右側 2×2 資訊卡片（row1 y=299, row2 y=395, h=86）
       垂直置中：title_y = rect_y + 43 - 31/2 + 28×0.35 ≈ rect_y + 37
                sub_y   = title_y + 31（固定行距）
  -->
  <rect x="840" y="299" width="155" height="86" rx="10" fill="white" stroke="#e8e5de" stroke-width="1"/>
  <text x="918" y="336" font-size="28" fill="#d97706" text-anchor="middle" font-weight="700">{卡片標題 1}</text>
  <text x="918" y="367" font-size="22" fill="#a8a29e" text-anchor="middle">{副文字 1}</text>

  <rect x="1005" y="299" width="155" height="86" rx="10" fill="white" stroke="#e8e5de" stroke-width="1"/>
  <text x="1083" y="336" font-size="28" fill="#78716c" text-anchor="middle" font-weight="700">{卡片標題 2}</text>
  <text x="1083" y="367" font-size="22" fill="#a8a29e" text-anchor="middle">{副文字 2}</text>

  <rect x="840" y="395" width="155" height="86" rx="10" fill="white" stroke="#e8e5de" stroke-width="1"/>
  <text x="918" y="432" font-size="28" fill="#78716c" text-anchor="middle" font-weight="700">{卡片標題 3}</text>
  <text x="918" y="463" font-size="22" fill="#a8a29e" text-anchor="middle">{副文字 3}</text>

  <rect x="1005" y="395" width="155" height="86" rx="10" fill="white" stroke="#e8e5de" stroke-width="1"/>
  <text x="1083" y="432" font-size="28" fill="#d97706" text-anchor="middle" font-weight="700">{卡片標題 4}</text>
  <text x="1083" y="463" font-size="22" fill="#a8a29e" text-anchor="middle">{副文字 4}</text>

  <!-- 右側底部標籤（底部 ≤ y=558）
       單行置中：y = 491 + 52/2 + 28×0.35 ≈ 527
  -->
  <rect x="840" y="491" width="320" height="52" rx="10" fill="#d97706" opacity="0.12"/>
  <text x="1000" y="527" font-size="28" fill="#d97706" text-anchor="middle" font-weight="700">{底部標籤}</text>

  <!-- 左側主內容區（主標題頂部≈y=104） -->
  <text x="60" y="200" font-size="120" font-weight="900" fill="#1e293b">{主標題第 1 行}</text>
  <text x="60" y="338" font-size="120" font-weight="900" fill="#d97706">{主標題第 2 行}</text>

  <line x1="60" y1="365" x2="780" y2="365" stroke="#dedad3" stroke-width="2"/>

  <text x="60" y="416" font-size="38" fill="#64748b" font-weight="400">{副標題}</text>

  <!-- 特色標籤列（pill 高 54px，28px 文字） -->
  <rect x="60" y="450" width="148" height="54" rx="10" fill="#d97706" opacity="0.12"/>
  <text x="134" y="483" font-size="28" fill="#d97706" text-anchor="middle" font-weight="600">{標籤 1}</text>

  <rect x="220" y="450" width="148" height="54" rx="10" fill="#78716c" opacity="0.12"/>
  <text x="294" y="483" font-size="28" fill="#78716c" text-anchor="middle" font-weight="600">{標籤 2}</text>

  <!-- 適用對象說明（y=558，底部≈y=565） -->
  <text x="60" y="558" font-size="28" fill="#94a3b8">{適用對象說明}</text>

  <!-- 浮水印 -->
  <text x="1140" y="590" font-size="24" fill="#c4bfb8" text-anchor="end" font-weight="400">報告汪 reportwang.com</text>
</svg>
```

### 右側裝飾變體

| 版型 | 適用情境 | 說明 |
|------|---------|------|
| 2×2 資訊卡片 | 統計數字、面向分類 | 4 個白底卡片 `rx=10`，含標題 28px + 副文字 22px |
| 直列 pill 標籤 | 技巧/要點列表 | 3~4 個橫向 pill，各 `height=56`，文字 28px |
| 時程條 | 月份/時程呈現 | 3 條 `height=80`，左側 7px 色條，標題 28px + 說明 22px |

---

## 五大圖表模板

### 1. 流程圖（template-flow.svg）

**用途**：呈現 3–5 個依序進行的步驟流程

**骨架結構**：
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="460" viewBox="0 0 800 460">
  <!-- 背景 -->
  <rect width="800" height="460" fill="#f0efe8"/>
  <!-- 標題 -->
  <text x="400" y="38" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="20" fill="#3d3530" font-weight="700">{圖表標題}</text>
  <text x="400" y="58" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="12" fill="#8a8178">{副標說明}</text>
  <line x1="60" y1="72" x2="740" y2="72" stroke="#dedad3" stroke-width="1"/>

  <!-- 步驟卡片（4 張，等寬排列） -->
  <!-- 每張卡片：x=40/222/404/586, width=162, y=90, height=300 -->
  <!-- 色彩順序：紫 #9b8ec4 → 粉紅 #d4829c → 金黃 #d4b44a → 青綠 #5bbfb5 -->

  <!-- Step 1（紫） -->
  <rect x="40" y="90" width="162" height="300" rx="12" fill="white"/>
  <rect x="40" y="90" width="162" height="8" rx="4" fill="#9b8ec4"/>
  <rect x="40" y="94" width="162" height="4" fill="#9b8ec4"/>
  <circle cx="121" cy="144" r="28" fill="#f3f0fa"/>
  <text x="121" y="138" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="11" fill="#9b8ec4" font-weight="700">STEP</text>
  <text x="121" y="155" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="18" fill="#9b8ec4" font-weight="700">01</text>
  <text x="121" y="197" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="16" fill="#3d3530" font-weight="700">{步驟標題}</text>
  <line x1="60" y1="210" x2="182" y2="210" stroke="#f0ede6" stroke-width="1"/>
  <text x="121" y="234" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="12" fill="#6b6560">{說明行 1}</text>
  <text x="121" y="254" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="12" fill="#6b6560">{說明行 2}</text>
  <text x="121" y="274" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="12" fill="#6b6560">{說明行 3}</text>
  <rect x="64" y="350" width="114" height="24" rx="12" fill="#f3f0fa"/>
  <text x="121" y="366" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="11" fill="#9b8ec4" font-weight="600">{時程標籤}</text>

  <!-- 箭頭連接（重複 3 次）-->
  <polygon points="210,235 224,229 224,241" fill="#c4bfb8"/>
  <line x1="202" y1="235" x2="213" y2="235" stroke="#c4bfb8" stroke-width="1.5"/>

  <!-- 品牌 -->
  <text x="756" y="450" text-anchor="end" font-family="'Noto Sans TC', sans-serif" font-size="11" fill="#bab4ac">報告汪製作</text>
</svg>
```

---

### 2. 時程甘特圖（template-timeline.svg）

**用途**：呈現多個任務在週次/月份上的執行時間分佈

**骨架結構**：
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="460" viewBox="0 0 800 460">
  <rect width="800" height="460" fill="#f0efe8"/>
  <!-- 標題 -->
  <text x="400" y="38" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="20" fill="#3d3530" font-weight="700">{圖表標題}</text>
  <text x="400" y="58" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="12" fill="#8a8178">{副標說明}</text>
  <line x1="40" y1="70" x2="760" y2="70" stroke="#dedad3" stroke-width="1"/>

  <!-- 表頭 -->
  <rect x="40" y="80" width="720" height="36" rx="4" fill="#e8e4dc"/>
  <!-- 任務名稱欄（width=220）、週次欄（從 x=260 到 x=760，每週 ~42px） -->
  <text x="130" y="103" text-anchor="middle" ...>準備任務</text>
  <!-- 週次標籤 W1~W12 -->
  <!-- 垂直分隔線 x=260（名稱/甘特分界）-->

  <!-- 任務列（每列 height=54，y=116/170/224/278/332） -->
  <!-- 左側色帶 width="5"，顏色依序：紫/粉紅/金黃/青綠/橄欖 -->
  <!-- 任務條：rx="12" pill 形，fill 用對應主色 opacity="0.85" -->

  <!-- 評鑑日標記（右側紅色虛線 + pill 標籤） -->
  <line x1="758" y1="80" x2="758" y2="420" stroke="#c4453a" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="{x}" y="390" width="60" height="22" rx="11" fill="#c4453a"/>
  <text ...>評鑑日</text>

  <!-- 品牌 -->
  <text x="756" y="452" text-anchor="end" font-family="'Noto Sans TC', sans-serif" font-size="11" fill="#bab4ac">報告汪製作</text>
</svg>
```

---

### 3. 檢核表（template-checklist.svg）

**用途**：呈現分組的確認清單，分已完成（✓）與待確認（○）

**骨架結構**：
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="460" viewBox="0 0 800 460">
  <rect width="800" height="460" fill="#f0efe8"/>
  <!-- 標題 + 分隔線 -->

  <!-- 左欄（x=40~380）/ 右欄（x=416~760），中間垂直線 x=400 -->
  <!-- 每欄 2 個區段，各區段 4 個項目 -->

  <!-- 區段標題（色塊標記） -->
  <rect x="{x}" y="{y}" width="6" height="24" rx="3" fill="{主色}"/>
  <text x="{x+14}" y="{y+17}" ...>{區段名稱}</text>

  <!-- 已完成項目圓圈 -->
  <circle cx="{cx}" cy="{cy}" r="8" fill="{淺底色}"/>
  <text x="{cx}" y="{cy+5}" text-anchor="middle" font-family="sans-serif" font-size="10" fill="{主色}">✓</text>
  <text x="{cx+18}" y="{cy+4}" font-family="'Noto Sans TC', sans-serif" font-size="13" fill="#3d3530">{項目文字}</text>

  <!-- 待確認項目（淡色圓圈 + 淡色文字） -->
  <circle cx="{cx}" cy="{cy}" r="8" fill="{極淡底色}"/>
  <text ...fill="{淡主色}">○</text>
  <text ...fill="#9a938a">{待確認項目}</text>

  <!-- 圖例 + 品牌 -->
  <line x1="40" y1="408" x2="760" y2="408" stroke="#dedad3" stroke-width="1"/>
  <!-- ✓ = 已確認完成 | ○ = 待確認項目 -->
  <text x="756" y="426" text-anchor="end" ... fill="#bab4ac">報告汪製作</text>
</svg>
```

---

### 4. 分類卡片（template-categories.svg）

**用途**：呈現 4 個並列的概念/面向/類別，每個含標題與條列說明

**骨架結構**：
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="460" viewBox="0 0 800 460">
  <rect width="800" height="460" fill="#f0efe8"/>
  <!-- 標題 + 分隔線 -->

  <!-- 2×2 卡片配置 -->
  <!-- 上排：x=40(w=346) / x=414(w=346), y=84, h=172 -->
  <!-- 下排：x=40(w=346) / x=414(w=346), y=272, h=160 -->

  <!-- 卡片頂部彩色 header（含圖示 + 標題） -->
  <rect x="{x}" y="{y}" width="{w}" height="44" rx="12" fill="{主色}"/>
  <rect x="{x}" y="{y+24}" width="{w}" height="20" fill="{主色}"/>
  <!-- 圖示裝飾方塊 -->
  <rect x="{x+20}" y="{y+12}" width="20" height="20" rx="3" fill="rgba(255,255,255,0.3)"/>
  <text x="{x+30}" y="{y+26}" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white">{符號}</text>
  <!-- 標題文字 -->
  <text x="{x+w/2}" y="{y+29}" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="15" fill="white" font-weight="700">{卡片標題}</text>

  <!-- 條列說明（3–4 行） -->
  <text x="{x+20}" y="{y+70}" font-family="'Noto Sans TC', sans-serif" font-size="12" fill="#6b6560">• {說明}</text>

  <!-- 底部標籤 Chips -->
  <rect x="{x+16}" y="{y+h-28}" width="60" height="18" rx="9" fill="{淺底色}"/>
  <text x="{x+46}" y="{y+h-15}" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="10" fill="{主色}" font-weight="600">{標籤}</text>

  <!-- 品牌 -->
  <text x="756" y="452" text-anchor="end" font-family="'Noto Sans TC', sans-serif" font-size="11" fill="#bab4ac">報告汪製作</text>
</svg>
```

---

### 5. PDCA 循環圖（template-pdca.svg）

**用途**：呈現 Plan-Do-Check-Act 四個環節的循環關係

**關鍵座標**（以 cx=400, cy=230, 外徑=125, 內徑=80 為準）：

| 弧段 | 角度範圍 | 顏色 | Path d 值 |
|------|---------|------|-----------|
| Plan（P） | -80° → 5° | `#d4829c` | `M 422 107 A 125 125 0 0 1 525 241 L 480 237 A 80 80 0 0 0 414 151 Z` |
| Do（D） | 10° → 95° | `#d4b44a` | `M 523 252 A 125 125 0 0 1 389 355 L 393 310 A 80 80 0 0 0 479 244 Z` |
| Check（C） | 100° → 185° | `#5bbfb5` | `M 378 353 A 125 125 0 0 1 276 219 L 320 223 A 80 80 0 0 0 386 309 Z` |
| Act（A） | 190° → 275° | `#9b8ec4` | `M 277 208 A 125 125 0 0 1 411 106 L 407 150 A 80 80 0 0 0 321 216 Z` |

| 箭頭 | polygon points |
|------|----------------|
| Plan | `501,255 494,230 512,248` |
| Do | `375,331 400,324 382,342` |
| Check | `299,205 306,230 290,212` |
| Act | `425,129 400,136 418,120` |

| 字母 | 位置 |
|------|------|
| P | `x=481 y=178` |
| D | `x=462 y=321` |
| C | `x=319 y=302` |
| A | `x=338 y=159` |

**中央圓**：`cx=400 cy=230 r=74 fill="white"`

**四角說明文字佈局**：
- 右上（Plan）：x=556, y=72
- 右下（Do）：x=556, y=300
- 左下（Check）：x=100, y=300
- 左上（Act）：x=100, y=72

每個說明含：色塊標記（■）+ 標題（15px 粗體）+ 虛線分隔 + 2 行說明（12px）

---

## 評鑑面向色彩對照

| 評鑑面向 | 色系 | 主色 |
|---------|------|------|
| 個案權益保障 | 柔和紫 | `#9b8ec4` |
| 專業照護品質 | 柔和粉紅 | `#d4829c` |
| 文件資料管理 | 柔和金黃 | `#d4b44a` |
| 安全環境設備 | 柔和青綠 | `#5bbfb5` |
| 經營管理效能 | 暖橄欖 | `#a09060` |
| 加分題 | 磚紅 | `#c4453a` |

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

## 上線前品質檢查清單

- [ ] SVG 尺寸符合規範（封面 1200×630 / 內文 **800×500**）
- [ ] `viewBox` 與 `width`/`height` 一致
- [ ] 背景色使用 `#f0efe8`（米黃暖色）
- [ ] 字型為 `'Noto Sans TC', sans-serif`
- [ ] **無任何低於 14px 的文字**（最重要！）
- [ ] **無 emoji 或 Unicode 符號字元**（用 SVG 圖形替代）
- [ ] **文字色只用 `#1e293b`（標題）或 `#57534e`（內容）**
- [ ] 單張圖項目數未超過密度上限
- [ ] 所有顏色來自本文件定義的色彩系統
- [ ] 包含「報告汪 reportwang.com」品牌浮水印（y=480）
- [ ] 檔案命名符合 `{機構}-{主題}-{類型}.svg` 格式
- [ ] SVG 自包含（無外部圖片引用、無 JavaScript）
- [ ] 中文文字正確顯示（用繁體中文）
- [ ] 各 `<defs>` 中的 id 在本檔案內唯一
