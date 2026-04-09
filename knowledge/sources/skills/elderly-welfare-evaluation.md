---
name: elderly-welfare-evaluation
description: |
  老人福利機構評鑑大師：協助建立和維護 /school/elderly-welfare 評鑑小教室及 /blog 部落格的內容。
  當使用者要新增或修改老人福利機構評鑑相關教學頁面時觸發。
  包含 115 年度老人福利機構評鑑基準知識（77 項）、頁面模板與 SEO 指引。
metadata:
  filePattern:
    - "app/school/elderly-welfare/**"
    - "lib/ai/evaluation-profiles/elderly-welfare.ts"
    - "lib/supplementary-sheets/elderly-welfare.ts"
  priority: 90
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# 老人福利機構評鑑大師

## 評鑑基準速覽

| 區塊 | 名稱 | shortCode | 項目 | 占分 | 頁面 slug | 色彩 |
|------|------|-----------|------|------|---------|------|
| A | 經營管理效能 | 管 | 1–15（15項） | 20% | management | orange-500 |
| B | 專業照護品質 | 專 | 16–46（31項） | 40% | professional-quality | green-500 |
| C | 安全環境設備 | 安 | 47–62（16項） | 25% | safety-environment | teal-500 |
| D | 個案權益保障 | 權 | 63–71（9項） | 13% | client-rights | blue-500 |
| E | 服務改進創新 | 創 | 72–74（3項） | 2% | innovation | indigo-500 |
| F | 加分題 | 加 | 75–77（3項） | +2分 | bonus | purple-500 |

**Profile ID**: `elderly-welfare`
**Profile export**: `elderlyWelfareProfile`
**Source**: 115年度老人福利機構評鑑指標

## 負責人員分配

| 區塊/項目 | 負責人員 |
|----------|---------|
| A1–A7, A12–A15 | 行政/主管 |
| A8（社工人員設置） | 社工 |
| A9（護理人員設置） | 護理 |
| A10（特約專業人員） | 行政/主管 |
| A11（照服員設置） | 照服 |
| B1–B8（社工服務） | 社工 |
| B9–B24（護理服務） | 護理 |
| B25–B27（照服服務） | 照服 |
| B28, B30, B43, B45（行政類） | 行政/主管 |
| C1–C14, C16 | 行政/主管 |
| C15（護理廢棄物） | 護理 |
| D1–D7, D9 | 社工 |
| D8（護理相關） | 護理 |
| E1–E3 | 行政/主管 |
| F1（人才培育） | 護理 |
| F2（智慧照護） | 社工 |
| F3（在地安老） | 行政/主管 |

## 頁面模板說明

### 區塊頁面標準結構

```tsx
// 1. Metadata（SEO）
export const metadata: Metadata = {
  title: "{區塊}（項目 {N}–{M}）｜老人福利機構評鑑",
  description: "老人福利機構評鑑「{區塊名稱}」{N} 項評鑑基準詳細說明...",
  alternates: { canonical: "https://reportwang.com/school/elderly-welfare/{slug}" },
  openGraph: { ... }
};

// 2. section = elderlyWelfareProfile.sections.find((s) => s.shortCode === "{shortCode}")!

// 3. tips = Record<number, { content: string; variant?: "neutral"|"info"|"warning" }>

// 4. JSON-LD
const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "{區塊}（老人福利機構評鑑基準項目 {N}–{M}）",
  path: "/school/elderly-welfare/{slug}",
});

// 5. JSX 結構：Header > Mini TOC > Items > Prev/Next Nav
```

### 色彩對應

| 區塊 | Badge 背景 | Badge 文字 | item 圓圈 |
|------|-----------|-----------|---------|
| A | bg-orange-500/10 | text-orange-600 dark:text-orange-400 | bg-orange-500/10 |
| B | bg-green-500/10 | text-green-600 dark:text-green-400 | bg-green-500/10 |
| C | bg-teal-500/10 | text-teal-600 dark:text-teal-400 | bg-teal-500/10 |
| D | bg-blue-500/10 | text-blue-600 dark:text-blue-400 | bg-blue-500/10 |
| E | bg-indigo-500/10 | text-indigo-600 dark:text-indigo-400 | bg-indigo-500/10 |
| F | bg-purple-500/10 | text-purple-600 dark:text-purple-400 | bg-purple-500/10 |

## SEO 確認清單

新增或修改頁面時確認：

- [ ] `title` 含「老人福利機構評鑑」關鍵字
- [ ] `alternates.canonical` 路徑正確（`/school/elderly-welfare/{slug}`）
- [ ] `openGraph.url` 一致
- [ ] JSON-LD `type: "LearningResource"` 用於區塊頁，`type: "Course"` 用於總覽頁
- [ ] 總覽頁 JSON-LD 有完整的 `hasPart` 6 個區塊連結

## 關鍵檔案路徑

| 用途 | 路徑 |
|------|------|
| 評鑑 Profile | `lib/ai/evaluation-profiles/elderly-welfare.ts` |
| 附屬表單定義 | `lib/supplementary-sheets/elderly-welfare.ts` |
| 總覽頁 | `app/school/elderly-welfare/page.tsx` |
| A 區塊 | `app/school/elderly-welfare/management/page.tsx` |
| B 區塊 | `app/school/elderly-welfare/professional-quality/page.tsx` |
| C 區塊 | `app/school/elderly-welfare/safety-environment/page.tsx` |
| D 區塊 | `app/school/elderly-welfare/client-rights/page.tsx` |
| E 區塊 | `app/school/elderly-welfare/innovation/page.tsx` |
| F 區塊 | `app/school/elderly-welfare/bonus/page.tsx` |

## 設計原則

1. **準備要訣**：DocsTip variant 選擇 — `warning` 用於一級必要/常見扣分，`info` 用於量化標準，`neutral` 用於補充說明
2. **評鑑重點**：B 區占分最高（40%），ICP 多專業整合是核心
3. **二級加強項目**：A2 入出機構管理、A4 查核缺失改善為二級加強項目，特別嚴格
4. **加分題獨立**：F 區加分題最高 +2 分，非必要但建議準備
