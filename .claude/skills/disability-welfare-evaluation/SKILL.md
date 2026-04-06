---
name: disability-welfare-evaluation
description: 身心障礙福利機構評鑑大師：協助建立和維護 /school/disability-welfare 評鑑小教室的內容。當使用者要新增或修改身心障礙福利機構評鑑相關教學頁面時觸發。包含衛福部社家署 109年度評鑑指標知識（49 項）、頁面模板與 SEO 規範。
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

- **評鑑名稱**：109年度身心障礙福利機構評鑑指標
- **主管機關**：衛福部社家署
- **項目總數**：49 項（含 5 項不計分新增指標）
- **區塊數**：3 大區塊
- **評鑑年度**：109年度

## 評鑑基準結構

| 區塊 | shortCode | 項目範圍 | 項目數 | 路徑 slug | 主色 |
|------|-----------|---------|-------|-----------|------|
| 一、行政組織及經營管理（含會計及財務管理） | 行 | 1–11 | 11 | administration | blue-500 |
| 二、環境設施及安全維護 | 環 | 12–31 | 20（含5項不計分） | environment | green-500 |
| 三、專業服務 | 專 | 32–49 | 18 | professional | purple-500 |

### 子區塊結構

**一、行政組織及經營管理**
- (一) 行政組織及經營管理：項目 1-7（1101-1107）
- (二) 會計及財務管理：項目 8-11（2101-2104）

**二、環境設施及安全維護**
- 項目 12-26（3101-3114）：計分指標
- 項目 27-31（3115-3119）：不計分新增指標（室外通路、室內通路、坡道、樓梯、昇降機）

**三、專業服務**
- 項目 32-34（4101-4103）：個別化服務計畫
- 項目 35-41（4201-4207）：專業團隊與照顧服務
- 項目 42-47（4301-4306）：健康管理與安全
- 項目 48-49（4401-4402）：社區與家庭支持

## 顏色方案

| 區塊 | Badge & 數字圓 class |
|------|---------------------|
| 一 行政管理 | `bg-blue-500/10 text-blue-600 dark:text-blue-400` |
| 二 環境設施 | `bg-green-500/10 text-green-600 dark:text-green-400` |
| 三 專業服務 | `bg-purple-500/10 text-purple-600 dark:text-purple-400` |

## 關鍵檔案位置

- 資料檔：`lib/ai/evaluation-profiles/disability-welfare.ts`
- 總覽頁：`app/school/disability-welfare/page.tsx`
- 區塊頁：`app/school/disability-welfare/{slug}/page.tsx`
  - administration（行政組織及經營管理）
  - environment（環境設施及安全維護）
  - professional（專業服務）
- 導覽：`lib/school-nav.ts`
- 附表定義：`lib/supplementary-sheets/disability-welfare.ts`
- 檢查表產生：`scripts/generate-disability-welfare-checklist.ts`

## 核心指標

- 項目 16（3105）：建築物公共安全檢查簽證申報及消防安全設備（核心指標）

## 特殊指標說明

- 部分指標有子項目（如 1106-1~4 專業服務人力、3101-A/B 浴廁、4204-A/B 體能活動、4303-A/B 膳食服務）
- 部分指標僅適用特定機構類型（如重度失能機構適評）
- 項目 27-31 為不計分新增指標

## SEO 規範

- canonical: `https://reportwang.com/school/disability-welfare/...`
- keywords 必含：「身心障礙福利機構評鑑」「身心障礙機構」「109年度」
- JSON-LD: 總覽 `"Course"`, 區塊頁 `"LearningResource"`
