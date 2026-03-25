---
name: disability-welfare-evaluation
description: 身心障礙福利機構評鑑大師：協助建立和維護 /school/disability-welfare 評鑑小教室的內容。當使用者要新增或修改身心障礙福利機構評鑑相關教學頁面時觸發。包含衛福部社家署評鑑基準知識（35 項）、頁面模板與 SEO 規範。
metadata:
  filePattern: "**/school/disability-welfare/**"
priority: 90
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
---

# 身心障礙福利機構評鑑大師

## 文件基礎資訊

- **評鑑名稱**：身心障礙福利機構專業服務品質與經營管理標準指引
- **主管機關**：衛福部社家署
- **項目總數**：35 項
- **區塊數**：6 大區塊

## 評鑑基準結構

| 區塊 | shortCode | 項目範圍 | 項目數 | 路徑 slug | 主色 |
|------|-----------|---------|-------|-----------|------|
| A、權益保障 | A | 1–8 | 8 | rights-protection | orange-500 |
| B、適性照顧與支持 | B | 9–17 | 9 | appropriate-care | green-500 |
| C、行政管理 | C | 18–19 | 2 | administration | blue-500 |
| D、服務管理 | D | 20–23 | 4 | service-management | teal-500 |
| E、員工管理與福利 | E | 24–29 | 6 | staff-management | indigo-500 |
| F、會計與財務管理 | F | 30–35 | 6 | finance | purple-500 |

## 顏色方案

| 區塊 | Badge & 數字圓 class |
|------|---------------------|
| A 權益保障 | `bg-orange-500/10 text-orange-600 dark:text-orange-400` |
| B 適性照顧 | `bg-green-500/10 text-green-600 dark:text-green-400` |
| C 行政管理 | `bg-blue-500/10 text-blue-600 dark:text-blue-400` |
| D 服務管理 | `bg-teal-500/10 text-teal-600 dark:text-teal-400` |
| E 員工管理 | `bg-indigo-500/10 text-indigo-600 dark:text-indigo-400` |
| F 會計財務 | `bg-purple-500/10 text-purple-600 dark:text-purple-400` |

## 關鍵檔案位置

- 資料檔：`lib/ai/evaluation-profiles/disability-welfare.ts`
- 總覽頁：`app/school/disability-welfare/page.tsx`
- 區塊頁：`app/school/disability-welfare/{slug}/page.tsx`
- 導覽：`lib/school-nav.ts`

## SEO 規範

- canonical: `https://reportwang.com/school/disability-welfare/...`
- keywords 必含：「身心障礙福利機構評鑑」「身心障礙機構」
- JSON-LD: 總覽 `"Course"`, 區塊頁 `"LearningResource"`
