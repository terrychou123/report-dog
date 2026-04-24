# 補充分頁 Excel 排版規範

> **SSOT**：`sheet-style-kit.ts`（補充分頁）、`excel-template-builder.ts`（檢核表主體）、`scripts/lib/excel-checklist-builder.ts`（下載 xlsx）

---

## 一、兩條 Excel 產線

| | 產線 A：下載 xlsx | 產線 B：DB FortuneSheet JSON |
|---|---|---|
| **入口** | `scripts/generate-*-checklist.ts` | `lib/excel-template-builder.ts` |
| **函式庫** | exceljs | 自製 JSON（SheetData[]） |
| **樣式 SSOT** | `scripts/lib/excel-checklist-builder.ts` | `lib/excel-template-builder.ts` + `sheet-style-kit.ts` |
| **輸出目的地** | `public/downloads/*.xlsx` | DB `report_templates.content` |
| **底色** | Header 藍 `FF4472C4`、子標題橘 `FFFCE4D6` | **無底色**（全局約定） |
| **框線** | 四邊細框 | 無框線 |

> **欄寬比例刻意對齊**：產線 A 字元寬 × 7 ≈ 產線 B px 寬（例：A 欄 12 字元 ≈ B 欄 84 px）。

---

## 二、產線 B 全域約定（FortuneSheet JSON）

1. **取消底色** — 除 TIP 列例外（淺綠 `#e8f5e9`），所有儲存格不設 `bg`。
2. **取消特殊字色** — 除 note 列灰字（`#666666`），不設 `fc`。
3. **對齊**：Header 全置中（`ht:0`）；基準說明靠左（`ht:1`）。
4. **換行**：需換行的儲存格設 `tb:2`（wrapText）。
5. **審查方式列**：合併 7 欄。

> 來源：`lib/excel-template-builder.ts` L51–L52、L62–L71、L212–L218

---

## 三、產線 B 版面常數（`sheet-style-kit.ts` L22–L28）

```ts
HEADER_ROW_HEIGHT     = 26    // 表頭列高
TITLE_ROW_HEIGHT      = 30    // 主標題列高
DATA_ROW_BASE_HEIGHT  = 30    // 資料列預設高
NOTE_ROW_HEIGHT       = 22    // 說明列高
POLICY_SECTION_HEIGHT = 54    // 政策條文列最小高
PIXELS_PER_BULLET_LINE = 24   // 每條 bullet 估高
SECTION_ROW_PADDING   = 16    // 政策列底部 padding
```

`sectionRowHeight(numBullets)` = `max(54, numBullets × 24 + 16)`

---

## 四、`cellStyles` 欄位語意

| 欄位 | 型態 | 語意 | 常用值 |
|---|---|---|---|
| `ht` | `0\|1\|2` | 水平對齊 | `0` 置中、`1` 靠左、`2` 靠右 |
| `vt` | `0\|1\|2` | 垂直對齊 | `0` 置中、`1` 靠上、`2` 靠下 |
| `tb` | `number` | 文字換行 | `2` = wrapText |
| `fc` | `string` | 字色 hex | `"#666666"` 灰字 |
| `bg` | `string` | 底色 hex | `"#e8f5e9"` TIP 淺綠、`"#EFEFEF"` 契約 section-header |
| `bold` | `boolean` | 粗體 | `true` |

合併儲存格不寫進 `cellStyles`，而是寫在 `config.merge`：

```ts
merge["r_c"] = { r: rowIdx, c: colIdx, rs: rowSpan, cs: colSpan }
```

欄寬 `config.columnlen`（px）、列高 `config.rowlen`（px）。

> 語意轉譯層（實際渲染）：`components/fortune-editor-inner.tsx` L101（tb）/ L159（ht）/ L167（vt）

---

## 五、補充分頁風格族群

補充分頁（Sheet 1+）有**兩種風格族群**，新增時必須先判斷屬哪族。

### 族群 A｜Kit 標準族

套用 `sheet-style-kit.ts` 的高階 builder，**不需自行管理樣式細節**。

| 常數 | 值 |
|---|---|
| TitleH | 30 |
| section bg | 無 |
| rowH | `DATA_ROW_BASE_HEIGHT = 30` |

**現有代表**：`daycare-item-24-custom.ts`、`daycare-item-45-custom.ts`

```ts
import { buildTableSheet, buildPolicyOnlySheet } from "./sheet-style-kit";
```

### 族群 B｜契約族（例外）

定型化契約或帶有 section-header 底色的版面，保留各自 local helper。

| 常數 | 值 |
|---|---|
| TitleH | 32 |
| section bg | `#EFEFEF` 或 `#EEEEEE` |
| rowH | `Math.max(30, numLines × 20 + 10)` |

**現有代表**：`daycare-item-3/4/35-custom.ts`、`nursing-home-item-65-custom.ts`、15 支 `home-care-item-*-custom.ts`

> kit 檔頭（`sheet-style-kit.ts` L1–L8）明文記載此豁免。

---

## 六、新增補充分頁決策樹

```
是否需要 section-header 底色（定型化契約、條文列表）？
│
├─ 是 → 契約族：複製 daycare-item-3-custom.ts 的 local helper，
│         TitleH=32、bg=#EFEFEF、rowH=max(30, n×20+10)
│
└─ 否 → Kit 標準族：
         │
         ├─ 含示範列＋空白列 → buildTableSheet(...)
         └─ 純兩欄規定事項／規定內容 → buildPolicyOnlySheet(...)
```

---

## 七、關鍵檔案索引

| 用途 | 路徑 |
|---|---|
| 補充分頁樣式 SSOT | `lib/supplementary-sheets/sheet-style-kit.ts` |
| 檢核表主體 + FortuneSheet 型別 | `lib/excel-template-builder.ts` |
| 下載 xlsx 樣式 SSOT | `scripts/lib/excel-checklist-builder.ts` |
| cellStyles 語意轉譯層 | `components/fortune-editor-inner.tsx` |
| 各 facility 統籌入口 | `lib/supplementary-sheets/custom-sheet-builders.ts` |
| 契約族範本（複製起點） | `lib/supplementary-sheets/daycare-item-3-custom.ts` |
| Kit 標準族範本（複製起點） | `lib/supplementary-sheets/daycare-item-24-custom.ts` |
