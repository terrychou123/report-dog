---
name: general-nursing-home-evaluation
description: |
  一般護理之家評鑑大師：協助建立和維護 /school/general-nursing-home 評鑑小教室的內容。
  當使用者要新增或修改一般護理之家評鑑相關教學頁面時觸發。
  包含 115 年度一般護理之家評鑑基準知識（15 項）、頁面模板與 SEO 指引。
metadata:
  filePattern:
    - "app/school/general-nursing-home/**"
    - "lib/ai/evaluation-profiles/general-nursing-home.ts"
    - "lib/school-nav.ts"
  priority: 90
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# 一般護理之家評鑑大師

## 評鑑基準知識

### 一般護理之家（115 年度）

來源檔案：`lib/ai/evaluation-profiles/general-nursing-home.ts`

**4 大區塊 15 項目：**

| 區塊 | shortCode | 項目範圍 | 頁面路徑 | 主色 |
|------|-----------|---------|---------|------|
| A、行政組織、經營管理與服務對象權益保障 | A | 1–5 | /school/general-nursing-home/administration | orange-500 |
| B、專業服務與生活照顧 | B | 6–8 | /school/general-nursing-home/professional-care | green-500 |
| C、環境設施與安全維護 | C | 9–12 | /school/general-nursing-home/safety-environment | blue-500 |
| D、特別事項 | D | 13–15 | /school/general-nursing-home/special-items | purple-500 |

**sections 陣列索引：**
- `sections[0]` — A、行政組織、經營管理與服務對象權益保障（shortCode: "A"）
- `sections[1]` — B、專業服務與生活照顧（shortCode: "B"）
- `sections[2]` — C、環境設施與安全維護（shortCode: "C"）
- `sections[3]` — D、特別事項（shortCode: "D"）

**各項目摘要：**

| ID | 標題 | 負責人 | 重點 |
|----|------|--------|------|
| 1 | A1.1 機構負責人實際管理行政作業與照護品質 | 負責人 | 每月巡查記錄、護理人員執照、護病比、在職訓練16小時 |
| 2 | A1.2 專任人員配置及急救訓練情形 | 負責人/護理主管 | 護理主管資格、急救訓練BLS/AED、新進人員訓練、照服員結業證書 |
| 3 | A1.3 意外或緊急事件處理流程及執行情形 | 負責人/護理主管 | 意外事件流程、24小時通報、急救流程、實地抽測 |
| 4 | A2.1 防疫機制落實執行及檢討改善 | 感控負責人/護理師 | 感染管制計畫、防疫機制演練、傳染病監測、感控訓練6小時 |
| 5 | A2.2 推動安寧緩和療護及病人醫療自主權 | 負責人/社工 | 安寧緩和資訊、AD協助辦理、工作人員訓練、轉介機制 |
| 6 | B1 住民服務需求評估及確實依評估結果執行照護計畫 | 護理師/護理長 | 24小時初評、72小時完整評估、個別化計畫、每3個月修訂 |
| 7 | B2 提供住民整合性照顧並定期檢討執行成效 | 護理長/跨專業團隊 | 每3個月跨專業會議、家屬參與、全人照顧整合、ADL/認知評估 |
| 8 | B3 訂有品質監測指標並定期檢討執行成效 | 護理長/品管 | 跌倒/壓傷/導管感染指標、每季分析、改善追蹤、教育訓練 |
| 9 | C1 災害緊急應變計畫及作業程序符合機構及住民需要並落實演練 | 負責人/防火管理人 | 災害計畫、每年2次消防演練含夜間、工作人員熟知疏散、消防設備維護 |
| 10 | C2 疏散避難系統及等待救援空間設置 | 行政/設施管理 | 通道暢通、防火區劃、疏散標誌、緊急照明 |
| 11 | C3 疏散策略及持續照顧作業程序並落實教育訓練 | 防火管理人/護理師 | 個別化疏散策略、疏散後照顧程序、教育訓練、實地抽測 |
| 12 | C4 情境式火災風險辨識與溝通並依情境實地抽測演練 | 負責人/護理師 | 情境式疏散計畫、風險辨識、實地情境演練、住民自救原則 |
| 13 | D1 創新或配合政策執行 | 負責人 | 創新服務成效、參與政府計畫、書面紀錄成效評估 |
| 14 | D2 強化住民口腔健康照護 | 護理師/照服員 | 口腔健康評估、工作人員訓練、每日口腔清潔紀錄、牙科轉介 |
| 15 | D3 其他重大異常情事（試評扣分項）| 負責人 | 無重大事故未通報、無違法情事、無人權侵害、配合評鑑 |

**特別注意：**
- D3 為 `isTrialDeduction: true`，試評扣分項，任何違規直接影響整體評鑑結果
- C4 為情境演練查核，評鑑委員可能現場抽測

---

## 顏色對應

| 區塊 | Badge class | 數字圓 class |
|------|------------|------------|
| A、行政組織 | `bg-orange-500/10 text-orange-600 dark:text-orange-400` | `bg-orange-500/10 text-orange-600 dark:text-orange-400` |
| B、專業服務 | `bg-green-500/10 text-green-600 dark:text-green-400` | `bg-green-500/10 text-green-600 dark:text-green-400` |
| C、環境設施 | `bg-blue-500/10 text-blue-600 dark:text-blue-400` | `bg-blue-500/10 text-blue-600 dark:text-blue-400` |
| D、特別事項 | `bg-purple-500/10 text-purple-600 dark:text-purple-400` | `bg-purple-500/10 text-purple-600 dark:text-purple-400` |

---

## 頁面結構

### 路由對應

| 路由 | 頁面 |
|------|------|
| /school/general-nursing-home | 總覽頁（4 個區塊卡片 + 15 項目列表） |
| /school/general-nursing-home/administration | A 區塊（項目 1–5） |
| /school/general-nursing-home/professional-care | B 區塊（項目 6–8） |
| /school/general-nursing-home/safety-environment | C 區塊（項目 9–12） |
| /school/general-nursing-home/special-items | D 區塊（項目 13–15） |

### 頁面模板（區塊頁）

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { generalNursingHomeProfile } from "@/lib/ai/evaluation-profiles/general-nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

// section = generalNursingHomeProfile.sections.find((s) => s.shortCode === "A" | "B" | "C" | "D")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  // item id: { content, variant }
};

// JSON-LD type: 總覽頁用 "Course"，區塊頁用 "LearningResource"
```

---

## SEO 確認清單

- `keywords` 必須含 "一般護理之家評鑑"、"115年度評鑑"
- `alternates.canonical` 使用完整 URL（`https://reportwang.com/school/general-nursing-home/...`）
- `metadata.title` 格式：`區塊名稱（項目 X–Y）｜一般護理之家評鑑`
- `openGraph.url` 同 canonical
- JSON-LD type: 總覽頁用 `"Course"`，區塊頁用 `"LearningResource"`

---

## 設計原則

- 總覽頁顯示 4 個區塊卡片 + 全部 15 項目列表
- 區塊頁包含：Header Badge → Mini TOC → Items → Prev/Next 導航
- Item 數字圓顏色依區塊配色（A=orange, B=green, C=blue, D=purple）
- DocsTip variant: `"warning"` 用於必須注意的扣分風險，`"info"` 用於操作建議，`"neutral"` 用於補充說明
- D3 是試評扣分項，tip 必須使用 `"warning"` variant 並清楚說明影響
- C4 為情境演練查核，tip 須說明評鑑委員可能現場抽測
- A2.1 防疫機制須注意教育訓練時數（每年至少6小時）的核查
