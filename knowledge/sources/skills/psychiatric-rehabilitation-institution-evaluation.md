---
name: psychiatric-rehabilitation-institution-evaluation
description: |
  精神復健機構評鑑大師：協助建立和維護 /school/psychiatric-rehabilitation-institution 評鑑小教室的內容。
  當使用者要新增或修改精神復健機構評鑑相關內容時觸發。
  包含 115 年度精神復健機構評鑑基準知識（日間型36條、住宿型40條）、頁面模板與 SEO 指引。
metadata:
  filePattern:
    - "app/school/psychiatric-rehabilitation-institution/**"
    - "lib/ai/evaluation-profiles/psychiatric-rehabilitation-institution.ts"
    - "scripts/generate-psychiatric-rehabilitation-institution-checklist.ts"
  priority: 90
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# 精神復健機構評鑑大師

## 評鑑基準知識

### 精神復健機構（115 年度）

來源：115年度精神復健機構評鑑基準（含日間型及住宿型機構）

**特殊性**：此評鑑有兩種子類型：
- **日間型機構**：3 章 36 條，學員（trainee），配分 100
- **住宿型機構**：3 章 40 條，住民（resident），配分 100

### 章節摘要

#### 日間型 — 3 章 36 條（一般33條、可選2條、試評2條，不含試評）

| 章 | shortCode | 條數 | 配分 | 頁面路徑 | 主色 |
|---|-----------|------|------|---------|------|
| 第1章 經營管理 | 1 | 10 | 34 | /school/psychiatric-rehabilitation-institution/management | blue-600 |
| 第2章 復健服務 | 2 | 14 | 37 | /school/psychiatric-rehabilitation-institution/rehabilitation | green-600 |
| 第3章 服務品質 | 3 | 12 | 29 | /school/psychiatric-rehabilitation-institution/service-quality | orange-600 |

#### 住宿型 — 3 章 40 條（一般34條、可選3條、重點1條、試評3條，不含試評）

| 章 | shortCode | 條數 | 配分 | 頁面路徑 | 主色 |
|---|-----------|------|------|---------|------|
| 第1章 經營管理 | 1 | 12 | 33 | /school/psychiatric-rehabilitation-institution/management | blue-600 |
| 第2章 復健服務 | 2 | 14 | 37 | /school/psychiatric-rehabilitation-institution/rehabilitation | green-600 |
| 第3章 服務品質 | 3 | 14 | 30 | /school/psychiatric-rehabilitation-institution/service-quality | orange-600 |

---

### 日間型條目摘要（36條）

| ID | 代碼 | 標題 | 類型 | PFM |
|----|------|------|------|-----|
| 1 | 1.1 | 機構負責人之經營管理 | 一般 | |
| 2 | 可1.2 | 專任工作人員人力穩定性 | 可選 | |
| 3 | 1.3 | 督導與教育訓練制度 | 一般 | |
| 4 | 1.4 | 工作人員定期接受健康檢查情形 | 一般 | |
| 5 | 1.5 | 社區便利性 | 一般 | |
| 6 | 1.6 | 復健資源開發及運用 | 一般 | |
| 7 | 1.7 | 復健治療空間及設施 | 一般 | |
| 8 | 1.8 | 健身及康樂設施 | 一般 | |
| 9 | 可1.9 | 前次評鑑建議事項辦理情形確實且具成效 | 可選 | |
| 10 | 1.10 | 評鑑資料填寫及實地評鑑簡報品質良好 | 一般 | |
| 11 | 2.1 | 復健評估 | 一般 | |
| 12 | 2.2 | 訂定復健目標及計畫 | 一般 | |
| 13 | 2.3 | 提供社區生活化之多元復健服務 | 一般 | |
| 14 | 2.4 | 活動妥善規劃並定期修正 | 一般 | |
| 15 | 2.5 | 提供健康促進活動 | 一般 | |
| 16 | 2.6 | 提供工作復健訓練及轉銜服務 | 一般 | |
| 17 | 2.7 | 定期生活諮詢及心理輔導 | 一般 | |
| 18 | 2.8 | 輔導規則就醫及藥物自我管理 | 一般 | ✓ |
| 19 | 2.9 | 召開社區復健及適應討論會 | 一般 | |
| 20 | 2.10 | 召開學員自治會議 | 一般 | |
| 21 | 2.11 | 提供學員家庭支持服務 | 一般 | |
| 22 | 2.12 | 社區融合 | 一般 | ✓ |
| 23 | 試2.13 | 社會參與 | 試評 | |
| 24 | 試2.14 | 同儕支持 | 試評 | |
| 25 | 3.1 | 訂有工作手冊，並落實執行 | 一般 | |
| 26 | 3.2 | 訂定適當收案標準，並落實執行 | 一般 | ✓ |
| 27 | 3.3 | 訂定適當結案標準，並落實執行 | 一般 | |
| 28 | 3.4 | 紀錄完整，並妥善管理 | 一般 | |
| 29 | 3.5 | 適切的復健基金管理 | 一般 | ✓ |
| 30 | 3.6 | 落實學員權益維護措施 | 一般 | ✓ |
| 31 | 3.7 | 落實學員健康維護措施 | 一般 | |
| 32 | 3.8 | 訂定處理緊急醫療、異常及群聚感染事件處理流程，並落實執行 | 一般 | |
| 33 | 3.9 | 建立機構緊急應變管理機制並落實執行 | 一般 | |
| 34 | 3.10 | 召開品質管理相關會議 | 一般 | |
| 35 | 3.11 | 執行學員及家屬滿意度調查 | 一般 | |
| 36 | 試3.12 | 訂定並落實訪客管理規範，且有訪客紀錄 | 試評 | |

---

### 住宿型條目摘要（40條）

| ID | 代碼 | 標題 | 類型 | PFM |
|----|------|------|------|-----|
| 1 | 1.1 | 機構負責人之經營管理 | 一般 | |
| 2 | 可1.2 | 專任工作人員人力穩定性 | 可選 | |
| 3 | 1.3 | 督導與教育訓練制度 | 一般 | |
| 4 | 1.4 | 適切的日、夜間人力配置 | 一般 | |
| 5 | 1.5 | 工作人員定期接受健康檢查情形 | 一般 | |
| 6 | 1.6 | 社區便利性 | 一般 | |
| 7 | 1.7 | 復健資源開發及運用 | 一般 | |
| 8 | 1.8 | 日常活動空間 | 一般 | |
| 9 | 1.9 | 健身及康樂設施 | 一般 | |
| 10 | 1.10 | 廚房空間及設施 | 一般 | |
| 11 | 可1.11 | 前次評鑑建議事項辦理情形確實且具成效 | 可選 | |
| 12 | 1.12 | 評鑑資料填寫及實地評鑑簡報品質良好 | 一般 | |
| 13 | 2.1 | 復健評估 | 一般 | |
| 14 | 2.2 | 訂定復健目標及計畫 | 一般 | |
| 15 | 2.3 | 提供個別化的獨立生活功能訓練 | 一般 | |
| 16 | 2.4 | 活動妥善規劃並定期修正 | 一般 | |
| 17 | 2.5 | 提供健康促進活動 | 一般 | |
| 18 | 2.6 | 職前準備、工作轉介或就業輔導 | 一般 | |
| 19 | 2.7 | 定期生活諮詢及心理輔導 | 一般 | |
| 20 | 2.8 | 輔導規則就醫及藥物自我管理 | 一般 | ✓ |
| 21 | 2.9 | 召開社區復健及適應討論會 | 一般 | |
| 22 | 2.10 | 召開住民自治會議 | 一般 | |
| 23 | 2.11 | 提供住民家庭支持服務 | 一般 | |
| 24 | 2.12 | 社區融合 | 一般 | ✓ |
| 25 | 試2.13 | 社會參與 | 試評 | |
| 26 | 試2.14 | 同儕支持 | 試評 | |
| 27 | 3.1 | 訂有工作手冊，並落實執行 | 一般 | |
| 28 | 3.2 | 訂定適當收案標準，並落實執行 | 一般 | ✓ |
| 29 | 3.3 | 訂定適當結案標準，並落實執行 | 一般 | |
| 30 | 3.4 | 紀錄完整，並妥善管理 | 一般 | |
| 31 | 可3.5 | 適切的復健基金管理 | 可選 | ✓ |
| 32 | 3.6 | 落實住民權益維護措施 | 一般 | ✓ |
| 33 | 3.7 | 維護住民財物自主管理權益 | 一般 | ✓ |
| 34 | 3.8 | 落實住民健康維護措施 | 一般 | |
| 35 | 3.9 | 訂定處理緊急醫療、異常及群聚感染事件處理流程，並落實執行 | 一般 | |
| 36 | 3.10 | 建立機構緊急應變管理機制並落實執行 | 一般 | |
| 37 | 重3.11 | 維護住民出入自由 | **重點** | ✓ |
| 38 | 3.12 | 召開品質管理相關會議 | 一般 | |
| 39 | 3.13 | 執行住民及家屬滿意度調查 | 一般 | |
| 40 | 試3.14 | 訂定並落實訪客管理規範，且有訪客紀錄 | 試評 | |

---

## 顏色對應

| 章 | Badge class | 數字圓 class |
|---|------------|------------|
| 第1章 經營管理 | `bg-blue-500/10 text-blue-600 dark:text-blue-400` | `bg-blue-500/10 text-blue-600 dark:text-blue-400` |
| 第2章 復健服務 | `bg-green-500/10 text-green-600 dark:text-green-400` | `bg-green-500/10 text-green-600 dark:text-green-400` |
| 第3章 服務品質 | `bg-orange-500/10 text-orange-600 dark:text-orange-400` | `bg-orange-500/10 text-orange-600 dark:text-orange-400` |

### 子類型徽章顏色

| 子類型 | Badge class |
|--------|------------|
| 日間型 | `bg-sky-500/10 text-sky-600 dark:text-sky-400` |
| 住宿型 | `bg-violet-500/10 text-violet-600 dark:text-violet-400` |

---

## 重要評鑑特點

### 雙子類型結構

1. **日間型（Community day program）**：學員每日往返，機構提供復健訓練與社區生活支持
2. **住宿型（Residential rehabilitation）**：住民全時居住，機構提供最少限制的生活環境並支持獨立生活功能訓練

**用語差異**：日間型使用「學員」，住宿型使用「住民」

### 特殊項目說明

1. **住宿型 3.11 維護住民出入自由（重點項目）**：
   - 機構應採開放式管理，不應以任何設施設備限制住民出入自由
   - 未達 C 級即視為評鑑不合格
   - 需以 `variant="warning"` DocsTip 特別標示

2. **可選項目（可免評）**：
   - 日間型 1.2、1.9；住宿型 1.2、1.11（前次評鑑建議改善），住宿型 3.5（復健基金）
   - 新設機構未滿一年、上次評鑑無建議改善事項等可申請免評

3. **試評項目（成績不納入計算）**：
   - 兩種類型共有：2.13 社會參與、2.14 同儕支持
   - 住宿型另有：3.14 訂定並落實訪客管理規範
   - 用於收集機構執行情形，不影響最終評鑑結果

4. **PFM 以病人為焦點之查證（Patient Focus Method）**：
   - 評鑑委員將直接訪談學員/住民，無法訪談時評為「未符合 C 等級」
   - 日間型 PFM 項目：2.8、2.12、3.2、3.5、3.6
   - 住宿型 PFM 項目：2.8、2.12、3.2、3.5、3.6、3.7、3.11

5. **個人復元理念（Personal Recovery）**：
   - 強調 CHIME 架構：Connectedness、Hope、Identity、Meaning、Empowerment
   - 由有罹病經驗的康復者制定自身目標，非由專業人員單方主導

6. **社區支持定義**：指運用社區資源，提供病人在社區生活所需之居住、安置、就學、就業、就養、就醫、社會參與及自立生活及其他支持措施與協助。

### 評分制度

- 五級：A（完全符合且卓越）→ B（符合且良好）→ C（符合基本要求）→ D（部分符合）→ E（完全不符合）
- 三級：A、C、E 三級評量（適用部分條文）
- 重點項目：3.11（住宿型）— 未達 C 級即評鑑不合格
- 配分：以五級評量為主，三級評量另計

---

## 頁面模板

### 總覽頁模板

```tsx
// app/school/psychiatric-rehabilitation-institution/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { psychiatricRehabilitationInstitutionDayProfile, psychiatricRehabilitationInstitutionResidentialProfile } from "@/lib/ai/evaluation-profiles/psychiatric-rehabilitation-institution";
import { BriefcaseMedicalIcon, HeartHandshakeIcon, ClipboardCheckIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "精神復健機構評鑑小教室｜報告汪",
  description: "115年度精神復健機構評鑑基準完整解說，含日間型（36條）與住宿型（40條）兩種類型，涵蓋經營管理、復健服務、服務品質三大章節，助機構做好評鑑準備。",
  keywords: ["精神復健機構評鑑", "日間型精神復健機構", "住宿型精神復健機構", "115年度評鑑", "精神衛生法", "評鑑基準"],
  alternates: { canonical: "https://reportwang.com/school/psychiatric-rehabilitation-institution" },
};
```

### 章節頁模板（含子類型切換）

```tsx
// app/school/psychiatric-rehabilitation-institution/management/page.tsx
import type { Metadata } from "next";
import { FacilityTypeTabs } from "./_facility-type-tabs";
import {
  getDayManagementItems,
  getResidentialManagementItems,
} from "@/lib/ai/evaluation-profiles/psychiatric-rehabilitation-institution";

export const metadata: Metadata = {
  title: "第1章 經營管理（條目 1.1–1.10/1.12）｜精神復健機構評鑑",
  description: "115年度精神復健機構評鑑基準第1章經營管理詳細解說，含日間型10條與住宿型12條，涵蓋負責人經營、人力穩定性、督導訓練、環境設施等面向。",
  alternates: { canonical: "https://reportwang.com/school/psychiatric-rehabilitation-institution/management" },
};

export default function ManagementPage() {
  return (
    <div>
      {/* Header Badge */}
      <Badge className="bg-blue-500/10 text-blue-600">第1章 經營管理</Badge>

      {/* Facility Type Tabs (Client Component) */}
      <FacilityTypeTabs
        dayItems={getDayManagementItems()}
        residentialItems={getResidentialManagementItems()}
      />

      {/* Prev/Next Navigation */}
    </div>
  );
}
```

### 子類型切換 Client Component

```tsx
// app/school/psychiatric-rehabilitation-institution/management/_facility-type-tabs.tsx
"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

type FacilityType = "day" | "residential";

interface Props {
  dayItems: Item[];
  residentialItems: Item[];
}

export function FacilityTypeTabs({ dayItems, residentialItems }: Props) {
  const [facilityType, setFacilityType] = useState<FacilityType>("day");

  return (
    <div>
      {/* Tab Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFacilityType("day")}
          className={facilityType === "day" ? "bg-sky-500/10 text-sky-600" : ""}
        >
          日間型（{dayItems.length} 條）
        </button>
        <button
          onClick={() => setFacilityType("residential")}
          className={facilityType === "residential" ? "bg-violet-500/10 text-violet-600" : ""}
        >
          住宿型（{residentialItems.length} 條）
        </button>
      </div>

      {/* Items */}
      {(facilityType === "day" ? dayItems : residentialItems).map((item) => (
        <div key={item.code} id={`item-${item.code}`}>
          {/* Item content */}
        </div>
      ))}
    </div>
  );
}
```

---

## SEO 確認清單

- `keywords` 必須含「精神復健機構評鑑」、「日間型精神復健機構」、「住宿型精神復健機構」
- `alternates.canonical` 使用完整 URL（`https://reportwang.com/school/psychiatric-rehabilitation-institution/...`）
- `metadata.title` 格式：`章名稱（條目 X–Y）｜精神復健機構評鑑`
- JSON-LD type: 總覽頁用 `"Course"`，章節頁用 `"LearningResource"`
- 章節頁 description 需同時提及日間型和住宿型

---

## 設計原則

- 總覽頁顯示 3 個章節卡片（含日間型/住宿型條數對比）+ 兩種類型全部條目列表
- 章節頁包含：Header Badge → 子類型切換 Tabs → Mini TOC → Items → Prev/Next 導航
- **子類型切換 Tabs** 為 Client Component，每個章節頁建立獨立的 `_facility-type-tabs.tsx`
- 住宿型重點項目（3.11）需標示 `variant="warning"` 的 DocsTip，說明未達 C 級即不合格
- 可選項目（日間型 1.2、1.9；住宿型 1.2、1.11、3.5）需說明免評條件
- 試評項目（2.13、2.14；住宿型另有 3.14）需說明成績不納入計算
- PFM 項目需加特殊標記（badge 或 icon），說明評鑑委員將直接訪談學員/住民
- 兩種類型用語差異（學員 vs 住民）應在頁面頂部說明或以 tooltip 標示
- 深度連結用 `#item-{code}`（如 `#item-2.8`、`#item-3.11`）
- 復元理念（CHIME）與社區支持定義應在第2章 復健服務頁面有完整說明
