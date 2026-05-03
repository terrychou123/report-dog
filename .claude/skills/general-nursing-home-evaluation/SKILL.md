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

來源檔案（SSOT）：`lib/ai/evaluation-profiles/general-nursing-home.ts`

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

**各項目摘要（以官方 115 年度 PDF 為 SSOT）：**

| ID | 標題 | 負責人 | 關鍵數字/要點 |
|----|------|--------|------|
| 1 | A1.1 機構負責人實際管理行政作業與照護品質 | 負責人 | 投保勞健保、參加當年度評鑑說明會、研習每年至少 **4 小時**、留有管理紀錄（品管會議/家屬說明會/勞資會議） |
| 2 | A1.2 專任人員配置及急救訓練情形 | 負責人/護理主管 | 護理/照服員/社工人員資格、最近 **3 年**內聘用無違規、**CPR/CPCR/BLS** 證照在效期、人力配置達設置標準 **1.4 倍（休假係數）** |
| 3 | A1.3 意外或緊急事件處理流程及執行情形 | 負責人/護理主管 | 護理/照服員/社工完成教育訓練每年至少 **1 小時**（含緊急就醫）、事後有檢討分析改善紀錄 |
| 4 | A2.1 防疫機制落實執行及檢討改善 | 感控負責人/護理師 | 教育訓練每年至少 **4 小時**（非 6 小時）、新興傳染病應變計畫每年修訂 1 次、接種名冊（住民+工作人員）、**流感疫苗接種率達 80%**；第 7 點感染管制細節為試評 |
| 5 | A2.2 推動安寧緩和療護及病人醫療自主權 | 負責人/社工 | 護理人員及社工完成安寧緩和+**病人自主權利法**訓練、提供住民家屬資訊且有實際案例；照服員訓練為試評 |
| 6 | B1 住民服務需求評估及確實依評估結果執行照護計畫 | 護理師/護理長 | 護理人員完成全人評估訓練、**72 小時**完成整體性評估（含疼痛/跌倒/壓力性損傷）、每 **3 個月**至少 1 次再評估、適應評估與輔導追蹤 |
| 7 | B2 提供住民整合性照顧，並定期檢討執行成效 | 護理長/跨專業團隊 | 跨專業照會（醫師/藥師/營養師/治療師/社工）並追蹤成效、每月至少 **1 次文康活動**（留個別/團體觀察紀錄）、預防延緩失能規範、跨專業聯繫會或個案討論會 |
| 8 | B3 訂有品質監測指標，並定期檢討執行成效 | 護理長/品管 | **6 項品質指標：(1)跌倒 (2)壓力性損傷 (3)約束 (4)感染 (5)非計畫性轉急性住院 (6)非計畫性體重改變**；月/季/年分析；定期品質會議修訂年度閾值 |
| 9 | C1 災害緊急應變計畫及作業程序符合機構及住民需要並落實演練 | 負責人/防火管理人 | 含停電；火災計畫須納入大夜班簡化編組、縱火、下方樓層/相鄰場所起火；**每半年 2 次演練**（複合型 1 次+夜間火災 1 次） |
| 10 | C2 疏散避難系統及等待救援空間設置 | 行政/設施管理 | 動線暢通+標示、**雙向逃生路徑**（含一座安全梯+兩個以上避難途徑）、防火門可各側無鑰匙開啟、各樓層兩處以上等待救援空間+消防搶救辨識圖面 |
| 11 | C3 訂定符合機構及住民需要之疏散策略及持續照顧作業程序，並落實以風險溝通為主之緊急應變教育訓練 | 防火管理人/護理師 | 各層 2 個以上逃生路徑+大廳逃生避難圖、**防火管理人須全程參與衛福部研習**、**含外籍照服員**參與防火種子訓練、各樓層疏散順序策略、水平避難與就地避難時機 |
| 12 | C4 災害情境緊急應變符合機構需要之情境式火災風險辨識與溝通，並依情境實地抽測演練 | 負責人/護理師 | 訂有情境演練計畫+**夜間版本**、演練需執行：消防設施操作+**RACE**+防火區劃門隨手關閉+水平疏散；**6 點不合格判定**（見下方） |
| 13 | D1 創新或配合政策執行 | 負責人 | 配合政府政策（室內空氣品質標章/愛滋示範/友善機構）、主動創新（人力留任/實證/國內外交流） |
| 14 | D2 強化住民口腔健康照護 | 護理師/照服員 | **長期臥床及鼻胃管住民**口腔清潔、牙科社區資源轉介，**全程與 B1、B2 連續性照護過程結合** |
| 15 | D3 其他重大異常情事（試評扣分項）| 負責人 | 影響住民/工作人員 safety/health and wellbeing/dignity 之重大異常情事，且無法歸屬其他基準項目者，視情節扣分（**試評，本年度免計分**） |

**C4 六點不合格判定備註：**
1. 夜間人員做出會造成住民重大傷亡之動作（即使認真努力但錯誤）
2. 現場指揮官站在火場都不移動，漠視火煙不能控制下的迫害與威脅
3. 未評估起火住房住民人數過多之事實，費盡力氣把其中一/二位住民移往遠處等待救援空間
4. 應變人員無法正確辨識火場資訊做出適當研判
5. 未能操作或不會操作關鍵公共安全設施或設備
6. 由消防承包商操作消防設施或設備，或演練過程有非參演人員進行其他協助行為

**特別注意：**
- D3 為 `isTrialDeduction: true`，試評扣分項，任何違規直接影響整體評鑑結果
- C4 為情境演練查核，評鑑委員可能現場抽測，且夜間演練計畫必須獨立規劃
- A2.1 教育訓練時數為 **4 小時**（不是 6 小時）
- C1 演練頻率為 **每半年 2 次**（不是每年 2 次）
- A1.2 人力配置需達 **1.4 倍（休假係數）**

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
import { schoolSubpageJsonLd } from "@/lib/school-jsonld";
import { generalNursingHomeProfile } from "@/lib/ai/evaluation-profiles/general-nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { generalNursingHomeTips } from "@/lib/evaluation-tips/general-nursing-home";

// section = generalNursingHomeProfile.sections.find((s) => s.shortCode === "A" | "B" | "C" | "D")!;

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
- C4 為情境演練查核，tip 須說明評鑑委員可能現場抽測及 6 點不合格判定
- A2.1 防疫機制教育訓練時數強調正確數字：每年至少 **4 小時**
- C1 演練頻率強調正確頻率：**每半年 2 次**（不是每年 2 次）
