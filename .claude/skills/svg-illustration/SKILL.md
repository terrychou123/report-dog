---
name: svg-illustration
description: |
  部落格 SVG 插圖風格指南：確保報告汪部落格的封面圖與內文插圖維持柔和專業的視覺風格。
  當建立或修改 public/blog/ 下的 SVG 檔案時觸發。
  包含色彩系統、尺寸規範、五大圖表模板（流程圖/時程圖/檢核表/分類卡片/PDCA）與品牌元素。
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
| 內文插圖（標準） | 800 | 460 | `0 0 800 460` |
| 內文插圖（複雜） | 800 | 480 | `0 0 800 480` |

每個 SVG 必須同時設定 `width`、`height`、`viewBox`。

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

### 文字色（Tailwind Slate 系列）

| 層級 | 色票 | 用途 |
|------|------|------|
| 主標題 | `#1e293b` | 圖表標題、卡片標題（slate-800） |
| 內容文字 | `#475569` | 條列說明（slate-600） |
| 輔助文字 | `#64748b` | 副標、說明（slate-500） |
| 淡化文字 | `#94a3b8` | 待確認項目（slate-400） |
| 品牌水印 | `#c4bfb8` | 底部浮水印 |

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

| 元素 | 字級 | 字重 | 顏色 |
|------|------|------|------|
| 圖表主標題 | 20px | 700 | `#3d3530` |
| 副標題/說明 | 12px | 400 | `#8a8178` |
| 卡片/節標題 | 15–16px | 700 | `#3d3530` |
| STEP 數字 | 18px | 700 | 對應主色 |
| STEP 標籤 | 11px | 700 | 對應主色 |
| 條列說明 | 12–13px | 400 | `#6b6560` |
| 時程標籤 | 11px | 600 | 對應主色（深版） |
| 英文輔助 | 11–12px | 400 | `#8a8178` |
| 品牌水印 | 11px | 400 | `#bab4ac` |

---

## 佈局元素規格

### 色塊方形標記（區段標題）
```xml
<rect x="{x}" y="{y}" width="6" height="24" rx="3" fill="{主色}"/>
<text x="{x+14}" y="{y+17}" font-family="'Noto Sans TC', sans-serif" font-size="15" fill="#3d3530" font-weight="700">{標題}</text>
```

### STEP 圓形編號
```xml
<circle cx="{cx}" cy="{cy}" r="28" fill="{淺底色}"/>
<text x="{cx}" y="{cy-8}" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="11" fill="{主色}" font-weight="700">STEP</text>
<text x="{cx}" y="{cy+9}" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="18" fill="{主色}" font-weight="700">01</text>
```

### 時程 Pill 標籤
```xml
<rect x="{x}" y="{y}" width="114" height="24" rx="12" fill="{淺底色}"/>
<text x="{x+57}" y="{y+16}" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="11" fill="{主色}" font-weight="600">第 N–M 週</text>
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
<rect x="{x}" y="{y}" width="60" height="18" rx="9" fill="{淺底色}"/>
<text x="{x+30}" y="{y+13}" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="10" fill="{主色}" font-weight="600">{標籤文字}</text>
```

### 分隔線
```xml
<line x1="40" y1="{y}" x2="760" y2="{y}" stroke="#dedad3" stroke-width="1"/>
```

---

## 品牌元素

**每張 SVG 必須包含品牌浮水印：「報告汪 reportwang.com」**

### 內文插圖（右下角）
```xml
<text x="756" y="450" text-anchor="end" font-family="'Noto Sans TC', sans-serif" font-size="11" fill="#c4bfb8">報告汪 reportwang.com</text>
```

### 封面圖（左下角膠囊標籤）
```xml
<rect x="60" y="560" width="160" height="32" rx="16" fill="rgba(255,255,255,0.2)"/>
<text x="140" y="581" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="13" fill="rgba(255,255,255,0.85)" font-weight="600">報告汪 reportwang.com</text>
```

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

- [ ] SVG 尺寸符合類型規範（封面 1200×630 / 內文 800×460）
- [ ] `viewBox` 與 `width`/`height` 一致
- [ ] 背景色使用 `#f0efe8`（米黃暖色）
- [ ] 字型為 `'Noto Sans TC', sans-serif`
- [ ] 所有顏色來自本文件定義的色彩系統
- [ ] 包含「報告汪製作」品牌標記
- [ ] 檔案命名符合 `{機構}-{主題}-{類型}.svg` 格式
- [ ] SVG 自包含（無外部圖片引用、無 JavaScript）
- [ ] 中文文字正確顯示（用繁體中文）
- [ ] 各 `<defs>` 中的 id 在本檔案內唯一
