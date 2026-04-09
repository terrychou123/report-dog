---
name: psychiatric-nursing-home-evaluation
description: |
  精神護理之家評鑑大師：協助建立和維護 /school/psychiatric-nursing-home 評鑑小教室的內容。
  當使用者要新增或修改精神護理之家評鑑相關教學頁面時觸發。
  包含 115 年度精神護理之家評鑑基準知識（36 條）、頁面模板與 SEO 指引。
metadata:
  filePattern:
    - "app/school/psychiatric-nursing-home/**"
    - "app/(public)/psychiatric/**"
    - "lib/ai/evaluation-profiles/psychiatric-nursing-home.ts"
    - "scripts/generate-psychiatric-nursing-home-checklist.ts"
  priority: 90
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# 精神護理之家評鑑大師

## 評鑑基準知識

### 精神護理之家（115 年度）

來源：115年度精神護理之家評鑑基準（115年3月12日公告版）

**5 大面向 36 條（一般項目32條、可選項目2條、重點項目2條）：**

| 面向 | shortCode | 條數 | 頁面路徑 | 主色 |
|------|-----------|------|---------|------|
| A、經營管理效能 | A | 9 | /school/psychiatric-nursing-home/management | blue-600 |
| B、專業照護品質 | B | 21 | /school/psychiatric-nursing-home/professional-care | green-600 |
| C、安全維護及設施設備 | C | 3 | /school/psychiatric-nursing-home/safety-facilities | orange-600 |
| D、住民權益保障 | D | 2 | /school/psychiatric-nursing-home/resident-rights | purple-600 |
| E、創新及改革 | E | 1 | /school/psychiatric-nursing-home/innovation | rose-600 |

**各條目摘要：**

| ID | 代碼 | 標題 | 負責人 | 類型 |
|----|------|------|--------|------|
| 1 | A1.1 | 業務計畫及管運方針之擬訂與執行 | 院長/主任 | 一般 |
| 2 | A1.2 | 查核缺失改善及評鑑建議事項改善 | 負責人 | 一般 |
| 3 | A1.3 | 性侵害及性騷擾事件防治機制 | 負責人/行政主任 | 一般 |
| 4 | A2.1 | 機構負責人實際參與行政及照顧品質管理 | 主任/護理長 | 一般 |
| 5 | A2.2 | 聘用工作人員設置情形 | 人事主管 | **重點** |
| 6 | A3.1 | 工作人員權益相關制度訂定及執行 | 行政主任 | 一般 |
| 7 | A3.2 | 工作人員定期接受健康檢查 | 行政主任 | 一般 |
| 8 | A4.1 | 職前及在職訓練計畫訂定及辦理 | 督導/教育訓練負責人 | 一般 |
| 9 | A5.1 | 住民資料管理、統計分析與應用及保密 | 資訊管理負責人 | 一般 |
| 10 | B1.1 | 住民服務計畫與評估及管理（含營養評估） | 護理長 | 一般 |
| 11 | B1.2 | 住民適應輔導或支持措施 | 護理人員/社工師 | 一般 |
| 12 | B1.3 | 防疫機制建置情形 | 感控負責人 | 一般 |
| 13 | B1.4 | 跨專業整合照護執行情形 | 護理長/各專業人員 | 一般 |
| 14 | B1.5 | 提供住民例行及必要之醫療服務 | 護理人員 | 一般 |
| 15 | B1.6 | 提供住民處方藥品安全管理與藥事服務 | 護理人員 | 一般 |
| 16 | B1.7 | 住民照護服務品質監測情形 | 品質管理負責人 | 一般 |
| 17 | B1.8 | 住民健康檢查及健康管理情形 | 護理人員 | 一般 |
| 18 | B1.9 | 侵入性照護之執行情形 | 護理人員 | **可選** |
| 19 | B1.10 | 緊急及意外事件處理情形 | 負責人/護理人員 | 一般 |
| 20 | B1.11 | 提供緊急送醫服務情形 | 護理人員 | 一般 |
| 21 | B1.12 | 提供符合住民需求之個別、團體或社區活動 | 社工師/活動治療師 | 一般 |
| 22 | B1.13 | 社區資源聯結及運用情形 | 社工師 | 一般 |
| 23 | B1.14 | 與家屬互動及提供服務情形 | 社工師 | 一般 |
| 24 | B1.15 | 鼓勵住民參與機構復健作業活動情形 | 職能治療師 | 一般 |
| 25 | B1.16 | 護理站設施備設備設置情形 | 護理長 | 一般 |
| 26 | B2.1 | 協助與促進住民自我照顧能力 | 照顧服務員 | 一般 |
| 27 | B2.2 | 提供住民清潔服務情形（含身體、寢具及衣物） | 照顧服務員 | 一般 |
| 28 | B2.3 | 提供預防及延緩失能活動情形 | 職能/物理治療師 | 一般 |
| 29 | B3.1 | 住民膳食及個別化飲食情形 | 營養師 | 一般 |
| 30 | B3.2 | 管灌住民餵食情形 | 護理人員 | **可選** |
| 31 | C1.1 | 疏散避難系統及等待救接空間設置 | 負責人/安全管理 | **重點** |
| 32 | C1.2 | 火災應變計畫及作業程序並落實演練 | 負責人/安全管理 | 一般 |
| 33 | C1.3 | 落實機構特性之夜間演練計畫 | 負責人/安全管理 | 一般 |
| 34 | D1.1 | 尊重住民信仰情形 | 社工師 | 一般 |
| 35 | D1.2 | 推動安寧緩和療護及病人自主權利 | 護理長/主治醫師 | 一般 |
| 36 | E1.1 | 創新或特色措施具有成效並公開分享 | 院長/負責人 | 一般 |

---

## 顏色對應

| 面向 | Badge class | 數字圓 class |
|------|------------|------------|
| A、經營管理效能 | `bg-blue-500/10 text-blue-600 dark:text-blue-400` | `bg-blue-500/10 text-blue-600 dark:text-blue-400` |
| B、專業照護品質 | `bg-green-500/10 text-green-600 dark:text-green-400` | `bg-green-500/10 text-green-600 dark:text-green-400` |
| C、安全維護及設施設備 | `bg-orange-500/10 text-orange-600 dark:text-orange-400` | `bg-orange-500/10 text-orange-600 dark:text-orange-400` |
| D、住民權益保障 | `bg-purple-500/10 text-purple-600 dark:text-purple-400` | `bg-purple-500/10 text-purple-600 dark:text-purple-400` |
| E、創新及改革 | `bg-rose-500/10 text-rose-600 dark:text-rose-400` | `bg-rose-500/10 text-rose-600 dark:text-rose-400` |

---

## 重要評鑑特點

### 精神護理之家特有項目
1. **A2.2 人員設置（重點項目）**：24小時均有護理人員在上班（不得以電話On-Call方式替代）；200床以上須設置職能治療人員1名及每200床1名臨床心理師；未滿200床每20床每週至少4小時職能治療及臨床心理師
2. **B1.7 照護品質監測**：依據精神護理機構評鑑持續性監測指標操作型定義手冊，監測6項指標：跌倒、壓力性損傷、約束、感染、非計畫性轉急性住院、非計畫性體重改變
3. **B1.10 緊急及意外事件**：包含住民不假外出處理程序，依精神衛生法第52條規定須通報家屬及警察機關
4. **B1.15 復健作業**：復健作業時間每週不得超過15小時，並訂有獎勵金計算辦法
5. **C1.1 疏散避難（重點項目）**：各樓層須有2個以上不同避難方向之等待救接空間
6. **B1.9 侵入性照護（可選）**：有使用抽痰、換藥、換管路之住民，本項不得免評
7. **B3.2 管灌（可選）**：有管灌住民情形，本項不得免評

### 評分制度
- A（完全符合）→ D（部分符合）→ E（完全不符合）
- 重點項目：A2.2、C1.1（未達C級即視為不合格）
- 可選項目：B1.9、B3.2（機構若未收治相關狀況之住民，得免評）

---

## 頁面模板

### 總覽頁模板
```tsx
// app/school/psychiatric-nursing-home/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { psychiatricNursingHomeProfile } from "@/lib/ai/evaluation-profiles/psychiatric-nursing-home";
import { BrainCircuitIcon, HeartPulseIcon, ShieldIcon, UsersIcon, SparklesIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "精神護理之家評鑑小教室｜報告汪",
  description: "115年度精神護理之家評鑑基準完整解說，共5大面向36條指標，涵蓋經營管理效能、專業照護品質、安全維護及設施設備、住民權益保障及創新及改革。",
  keywords: ["精神護理之家評鑑", "115年度評鑑", "精神護理機構", "精神衛生法", "評鑑基準", "護理之家評鑑"],
  alternates: { canonical: "https://reportwang.com/school/psychiatric-nursing-home" },
};
```

### 子頁面模板
```tsx
import { psychiatricNursingHomeProfile } from "@/lib/ai/evaluation-profiles/psychiatric-nursing-home";
const section = psychiatricNursingHomeProfile.sections.find((s) => s.shortCode === "A")!;
```

---

## SEO 確認清單

- `keywords` 必須含「精神護理之家評鑑」、「115年度評鑑」
- `alternates.canonical` 使用完整 URL（`https://reportwang.com/school/psychiatric-nursing-home/...`）
- `metadata.title` 格式：`區塊名稱（條目 X–Y）｜精神護理之家評鑑`
- JSON-LD type: 總覽頁用 `"Course"`，區塊頁用 `"LearningResource"`

---

## 設計原則

- 總覽頁顯示 5 個面向卡片 + 全部 36 條目列表
- 子頁面包含：Header Badge → Mini TOC → Items → Prev/Next 導航
- 重點項目（A2.2、C1.1）需特別標示 `variant="warning"` 的 DocsTip
- 可選項目（B1.9、B3.2）需說明免評條件
- 精神護理之家特色：強調約束管理、精神衛生法規範、住民不假外出處理
- 24小時護理人員在班是核心要求，需在 A2.2 的 tip 特別說明
