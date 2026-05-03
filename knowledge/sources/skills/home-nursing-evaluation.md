---
name: home-nursing-evaluation
description: |
  居家護理所評鑑大師：協助建立和維護 /school/home-nursing 評鑑小教室的內容。
  當使用者要新增或修改居家護理所評鑑相關教學頁面時觸發。
  包含 115 年度居家護理所評鑑基準知識（8 項）、頁面模板與 SEO 指引。
metadata:
  filePattern:
    - "app/school/home-nursing/**"
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

# 居家護理所評鑑大師

## 評鑑基準知識

### 居家護理所（115 年度）

來源檔案：`lib/ai/evaluation-profiles/home-nursing.ts`

**2 大區塊 8 項目：**

| 區塊 | shortCode | 項目範圍 | 頁面路徑 | 主色 |
|------|-----------|---------|---------|------|
| A、經營管理 | A | 1–5 | /school/home-nursing/management | orange-500 |
| B、照護管理 | B | 6–8 | /school/home-nursing/care-management | green-500 |

**sections 陣列索引：**
- `sections[0]` — A、經營管理（shortCode: "A"）
- `sections[1]` — B、照護管理（shortCode: "B"）

**各項目摘要：**

| ID | 標題（含權重） | 負責人 | 重點 |
|----|------|--------|------|
| 1 | A1 社區資源盤點與運用 (6%) | 負責人/護理人員 | 資源盤點評估、社區資源連結運用、社區機構轉介個案至本所 |
| 2 | A2 感染管制作業與器材維護管理 (8%) | 感控負責人 | 感控手冊（疾管署指引/傳染病/肺結核/疥瘡/手部衛生）、【試評，本年度不計分】流感疫苗 80%（排除禁忌症）、廢棄物處理方式、醫材盤點維修保養校正+專人管理 |
| 3 | A3 居家訪視人員安全管理 (8%) | 負責人 | 安全管理辦法（含安全配備+預防作為）、事件通報記錄、改善追蹤 |
| 4 | A4 個案緊急或意外事件處理 (8%) | 負責人/護理人員 | 緊急處理辦法（含造廔口氣管/胃/腸/膀胱）、事件記錄、定期檢討 |
| 5 | A5 機構經營指標監測與持續改善 (15%) | 負責人/品管 | **5 項固定指標**：平均個案管理人數、護理人員離職率、個案非計畫性住院率、個案急診使用率、皮膚損傷發生率；定期統計分析、超閾值改善、修訂閾值 |
| 6 | B1 機構資訊管理 (10%) | 負責人/行政 | 衛福部指定填報系統完成 5 項：服務項目、服務區域、緊急連絡方式、訪視安全權益、跨域合作 |
| 7 | B2 個案照護管理 (45%) | 護理人員 | 評鑑日前一年內 10 位以上個案（含未結案及結案）、收案時及每 6 個月全人評估（需求改變時再評）、個別化照護計畫 |
| 8 | B3 加分項目 (5%) | 負責人 | 任一即可：創新/實證照護、全國或縣市競賽獲獎、國際交流、照護特色標竿、學會或協會口頭或海報發表 |

---

## 顏色對應

| 區塊 | Badge class | 數字圓 class |
|------|------------|------------|
| A、經營管理 | `bg-orange-500/10 text-orange-600 dark:text-orange-400` | `bg-orange-500/10 text-orange-600 dark:text-orange-400` |
| B、照護管理 | `bg-green-500/10 text-green-600 dark:text-green-400` | `bg-green-500/10 text-green-600 dark:text-green-400` |

---

## 頁面模板

### 區塊頁面模板

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { homeNursingProfile } from "@/lib/ai/evaluation-profiles/home-nursing";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "區塊名稱（項目 X–Y）｜居家護理所評鑑",
  description: "...",
  keywords: ["居家護理所評鑑", "115年度評鑑", "居家護理評鑑基準"],
  alternates: { canonical: "https://reportwang.com/school/home-nursing/SLUG" },
  openGraph: { ... },
};

const section = homeNursingProfile.sections.find((s) => s.shortCode === "A" | "B")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  // item id: { content, variant }
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "...",
  description: "...",
  path: "/school/home-nursing/SLUG",
});

export default function PageName() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div className="mb-6">
        <Badge className="mb-3 bg-COLOR-500/10 text-COLOR-600 dark:text-COLOR-400 border-0 hover:bg-COLOR-500/20">
          區塊名稱
        </Badge>
        <h1 className="text-2xl font-bold mb-3">區塊名稱（項目 X–Y）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">說明文字</p>
      </div>
      {/* TOC, Items, Prev/Next — 參照現有區塊頁面模式 */}
    </>
  );
}
```

---

## SEO 確認清單

- `keywords` 必須含 "居家護理所評鑑"、"115年度評鑑"
- `alternates.canonical` 使用完整 URL（`https://reportwang.com/school/home-nursing/...`）
- `metadata.title` 格式：`區塊名稱（項目 X–Y）｜居家護理所評鑑`
- `openGraph.url` 同 canonical
- JSON-LD type: 總覽頁用 `"Course"`，區塊頁用 `"LearningResource"`

---

## 設計原則

- 總覽頁顯示 2 個區塊卡片 + 全部 8 項目列表（依 nursing-home 模式）
- 區塊頁包含：Header Badge → Mini TOC → Items → Prev/Next 導航
- Item 數字圓顏色依區塊配色（A=orange, B=green）
- DocsTip variant: `"warning"` 用於必須注意的扣分風險，`"info"` 用於操作建議，`"neutral"` 用於補充說明
- B1 是「全符合 5 項」類型，需在 tip 特別說明
- B3 是加分項目，tip 說明非必要但建議備妥佐證
- A2 有【試評，本年度不計分】項目，tip 需說明試評意義、排除禁忌症、仍建議備妥記錄
- A5 的 5 項指標為官方**固定名稱**，不可自行替換，SSOT 見 `lib/ai/evaluation-profiles/home-nursing.ts`
