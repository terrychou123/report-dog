---
name: postpartum-care-evaluation
description: 產後護理之家評鑑大師：115年度產後護理之家評鑑基準知識、school頁面模板、SEO規範與設計原則
filePattern: "app/school/postpartum-care/**,lib/ai/evaluation-profiles/babycare.ts,lib/school-nav.ts"
priority: 90
---

# 產後護理之家評鑑大師

## 評鑑基準知識表（115年度，共 4 區塊 17 項）

| ID | 項目代號 | 標題 | 負責人 | 查核方式 | 重點 |
|----|---------|------|--------|---------|------|
| 1 | A1.1 | 專任人員配置情形 | 機構負責人 | 資料查核、現場訪談 | 護產人員1.4倍配置、NRP/BLS資格、執照效期 |
| 2 | A1.2 | 教育訓練及急救訓練 | 護理主管 | 資料查核 | 母乳哺育8hr、機構外研習8hr、NRP/BLS複訓 |
| 3 | A2.1 | 母嬰安全及感染管制 | 感控負責人 | 資料查核、現場觀察 | 流感疫苗接種率≥80%、手部衛生稽核 |
| 4 | A2.2 | 意外事件預防與處理 | 護理主管 | 資料查核、現場查核 | 7類意外事件SOP、24小時通報時限 |
| 5 | A2.3 | 品質管理機制與監測 | 品管負責人 | 資料查核 | 6項品質指標監測、滿意度調查 |
| 6 | B1.1 | 產婦照護 | 護產人員 | 資料查核、個案紀錄 | 入住評估、傷口護理、產後憂鬱症篩查(EPDS) |
| 7 | B1.2 | 嬰兒照護 | 嬰兒照顧人員 | 資料查核、個案紀錄 | 體重監測、黃疸評估、身分辨識手腳環 |
| 8 | B1.3 | 親子關係促進 | 護產人員 | 資料查核、個案紀錄 | 肌膚接觸指導、家屬參與、回覆示教 |
| 9 | B1.4 | 團體衛教課程 | 護產人員 | 資料查核、現場觀察 | 課程計畫書、出席紀錄、多元教材 |
| 10 | B1.5 | 出住院評估 | 護產人員 | 資料查核、個案紀錄 | 出院評估、出院指導簽名、出院後追蹤 |
| 11 | B1.6 | 緊急狀況處理 | 護產人員 | 資料查核、訪談 | 產婦/嬰兒緊急SOP、與鄰近醫院合作協議 |
| 12 | B1.7 | 哺乳及餵食計畫 | 護產人員 | 資料查核、個案紀錄 | 個別化哺乳計畫、純母乳哺育率統計 |
| 13 | B1.8 | 母乳收集與貯存 | 護產人員 | 資料查核、現場觀察 | 母乳標示(姓名/日期/時間)、冰箱溫度監測 |
| 14 | C1 | 疏散避難系統 | 防火管理人 | 資料查核、現場觀察 | 嬰兒疏散SOP（人員分工）、消防演練記錄 |
| 15 | C2 | 災害緊急應變 | 行政/安全管理人員 | 資料查核、現場觀察 | 天災應變計畫、嬰兒室溫度24～26°C監測 |
| 16 | D1 | 配合政策執行（加分） | 機構負責人 | 資料查核、訪談 | 母嬰親善認證、創新服務、主管機關計畫 |
| 17 | D2 | 重大異常情事（試評扣分） | 機構負責人 | 資料查核 | 直接扣分項，需 `isTrialDeduction: true` |

### 6 項品質指標（A2.3 重點）
1. 嬰兒紅臀發生率
2. 產婦乳腺炎發生率
3. 純母乳哺育率
4. 嬰兒體重回升達出生體重比率
5. 嬰兒黃疸（需照光）發生率
6. 服務對象（產婦）滿意度

### 7 類意外事件（A2.2 重點）
跌倒、燙傷、嬰兒抱錯、嬰兒誘拐、藥物錯誤、設備故障、其他重大事故

---

## 顏色對應

| 區塊 | Badge/圓圈 bgClass | Badge/圓圈 textClass |
|------|-------------------|---------------------|
| A | `bg-orange-500/10` | `text-orange-600 dark:text-orange-400` |
| B | `bg-green-500/10` | `text-green-600 dark:text-green-400` |
| C | `bg-blue-500/10` | `text-blue-600 dark:text-blue-400` |
| D | `bg-purple-500/10` | `text-purple-600 dark:text-purple-400` |

---

## 路由結構

```
app/school/postpartum-care/
  page.tsx                    → 總覽頁（Course JSON-LD）
  administration/page.tsx     → A 區（items 1–5, orange）
  professional-care/page.tsx  → B 區（items 6–13, green）
  safety-environment/page.tsx → C 區（items 14–15, blue）
  special-items/page.tsx      → D 區（items 16–17, purple）
```

Profile: `lib/ai/evaluation-profiles/babycare.ts` → export `babycareProfile`
Nav: `lib/school-nav.ts` → group `"產後護理之家"`

---

## 頁面模板

### 區塊頁結構（每個 section page 均相同）
```tsx
// 1. 從 babycareProfile 取出對應 section（throw if not found）
const section = (() => {
  const s = babycareProfile.sections.find((s) => s.shortCode === "A");
  if (!s) throw new Error("babycareProfile: section A not found");
  return s;
})();

// 2. tips Record<number, { content: string; variant?: DocsTipVariant }>
// key = 全域 item.id（非區塊內索引）

// 3. JSON-LD: educationalContentJsonLd({ type: "LearningResource", ... })

// 4. JSX 結構：
//    Header（Badge + h1 + 說明）
//    Mini TOC（nav > ul > li > a href="#item-{id}"）
//    Items（section id="item-{id}" scroll-mt-20）
//      - 數字圓（顏色同區塊）+ h2 + 負責人Badge + 查核方式Badge
//      - D 區加：isTrialDeduction && <Badge variant="destructive">試評扣分項</Badge>
//      - 評鑑標準 ol（shrink-0 w-5 h-5 rounded bg-muted 序號）
//      - DocsTip（variant: warning 用於嚴格合規/扣分項）
//    Prev/Next 導航
```

### isTrialDeduction 用法
```tsx
{"isTrialDeduction" in item && item.isTrialDeduction && (
  <Badge variant="destructive" className="text-xs">試評扣分項</Badge>
)}
```

---

## SEO 清單

- `metadata.title` 格式：`"[區塊名稱]（[代號]–[代號]）｜產後護理之家評鑑"`
- `metadata.keywords` 必含：`"產後護理之家評鑑"`, `"月子中心評鑑"`, `"115年度產後護理之家評鑑"`
- `alternates.canonical`：`"https://reportwang.com/school/postpartum-care/[slug]"`
- 總覽頁 JSON-LD type: `"Course"`，區塊頁 type: `"LearningResource"`
- anchor links 格式：`#item-{全域id}` （非區塊內索引）

---

## 設計原則

1. **全域連續 ID**：A(1-5), B(6-13), C(14-15), D(16-17)。`item.id` 是全域唯一值，anchor `#item-{id}` 直接使用
2. **D2 試評扣分**：`isTrialDeduction: true` + `variant="destructive"` Badge + DocsTip `variant: "warning"`
3. **B 區是評鑑核心**：8 項，且涵蓋產後護理之家特有的嬰兒照護、母乳哺育，準備要訣應具體
4. **嬰兒疏散 SOP**：C1 最重要，須提及人員分工細節
5. **數字合規要求**：護產人員1.4倍、NRP/BLS、母乳哺育8hr、機構外研習8hr、流感疫苗80%、嬰兒室24～26°C 均為精確數字，不得修改
