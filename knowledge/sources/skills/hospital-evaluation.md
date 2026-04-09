---
name: hospital-evaluation
description: 醫院評鑑大師：協助建立和維護 /school/hospital 評鑑小教室的內容。當使用者要新增或修改醫院評鑑相關教學頁面時觸發。包含 114 年度醫院評鑑基準知識（124 條 / 15 章）、頁面模板與 SEO 規範。
metadata:
  filePattern: "**/school/hospital/**"
priority: 90
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
---

# 醫院評鑑大師

## 文件基礎資訊

- **評鑑名稱**：114 年度醫院評鑑基準及評量項目
- **主管機關**：衛生福利部（依醫療法第 28 條辦理）
- **適用範圍**：區域醫院、地區醫院
- **條文總數**：124 條
- **章數**：15 章（2 篇）

## 評鑑基準結構

| 篇 | 章 | 章名 | 條數 | shortCode | slug | 項目範圍 |
|---|---|------|-----|-----------|------|---------|
| 第一篇 經營管理 | 1.1 | 醫院經營策略 | 5 | 1.1 | strategy | 1–5 |
| | 1.2 | 員工管理與支持制度 | 7 | 1.2 | staff-support | 6–12 |
| | 1.3 | 人力資源管理 | 10 | 1.3 | human-resources | 13–22 |
| | 1.4 | 病歷、資訊與溝通管理 | 4 | 1.4 | medical-records | 23–26 |
| | 1.5 | 安全的環境與設備 | 7 | 1.5 | safety-environment | 27–33 |
| | 1.6 | 病人導向之服務與管理 | 4 | 1.6 | patient-services | 34–37 |
| | 1.7 | 風險與危機管理 | 5 | 1.7 | risk-management | 38–42 |
| 第二篇 醫療照護 | 2.1 | 病人及家屬權責 | 4 | 2.1 | patient-rights | 43–46 |
| | 2.2 | 醫療照護品質與安全管理 | 3 | 2.2 | care-quality | 47–49 |
| | 2.3 | 醫療照護之執行與評估 | 16 | 2.3 | care-execution | 50–65 |
| | 2.4 | 特殊照護服務 | 24 | 2.4 | special-care | 66–89 |
| | 2.5 | 用藥安全 | 9 | 2.5 | medication-safety | 90–98 |
| | 2.6 | 麻醉與手術 | 9 | 2.6 | anesthesia-surgery | 99–107 |
| | 2.7 | 感染管制 | 3 | 2.7 | infection-control | 108–110 |
| | 2.8 | 檢驗、病理與放射作業 | 14 | 2.8 | lab-pathology | 111–124 |

## 條文分類

- **必要**：未符合視為重大缺失
- **重點**：防火安全、護病比、感染管制等重點領域
- **試評**：本次不納入成績計算
- **可免評**：確認符合免評條件後可不計入成績
- **一般**：一般性評鑑條文

## 顏色方案

| shortCode | 章名簡稱 | Badge & 數字圓 class |
|-----------|---------|---------------------|
| 1.1 | 經營策略 | `bg-orange-500/10 text-orange-600 dark:text-orange-400` |
| 1.2 | 員工管理 | `bg-green-500/10 text-green-600 dark:text-green-400` |
| 1.3 | 人力資源 | `bg-blue-500/10 text-blue-600 dark:text-blue-400` |
| 1.4 | 病歷資訊 | `bg-teal-500/10 text-teal-600 dark:text-teal-400` |
| 1.5 | 安全環境 | `bg-indigo-500/10 text-indigo-600 dark:text-indigo-400` |
| 1.6 | 病人服務 | `bg-purple-500/10 text-purple-600 dark:text-purple-400` |
| 1.7 | 風險管理 | `bg-rose-500/10 text-rose-600 dark:text-rose-400` |
| 2.1 | 病人權責 | `bg-amber-500/10 text-amber-600 dark:text-amber-400` |
| 2.2 | 品質安全 | `bg-emerald-500/10 text-emerald-600 dark:text-emerald-400` |
| 2.3 | 照護執行 | `bg-sky-500/10 text-sky-600 dark:text-sky-400` |
| 2.4 | 特殊照護 | `bg-cyan-500/10 text-cyan-600 dark:text-cyan-400` |
| 2.5 | 用藥安全 | `bg-violet-500/10 text-violet-600 dark:text-violet-400` |
| 2.6 | 麻醉手術 | `bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400` |
| 2.7 | 感染管制 | `bg-red-500/10 text-red-600 dark:text-red-400` |
| 2.8 | 檢驗病理 | `bg-lime-500/10 text-lime-600 dark:text-lime-400` |

## 條文分類 Badge 樣式

- 必要：`<Badge className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 border-0">必要</Badge>`
- 重點：`<Badge className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0">重點</Badge>`
- 試評：`<Badge variant="outline" className="text-xs">試評</Badge>`
- 可免評：`<Badge variant="secondary" className="text-xs">可免評</Badge>`
- 一般：不顯示 Badge

## 關鍵檔案位置

- 資料檔：`lib/ai/evaluation-profiles/hospital.ts`
- 總覽頁：`app/school/hospital/page.tsx`
- 章節頁：`app/school/hospital/{slug}/page.tsx`
- 導覽：`lib/school-nav.ts`（"醫院評鑑" 群組）

## SEO 規範

- canonical: `https://reportwang.com/school/hospital/...`
- keywords 必含：「醫院評鑑」「區域醫院評鑑」「地區醫院評鑑」「114年度醫院評鑑基準」
- JSON-LD: 總覽 `"Course"`, 章節頁 `"LearningResource"`
- `areaServed: Taiwan`, `inLanguage: zh-TW`
