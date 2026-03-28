---
name: youth-care-evaluation
description: |
  兒少教養機構評鑑大師：協助建立和維護 /school/youth-care 評鑑小教室的內容。
  當使用者要新增或修改兒少教養機構評鑑相關教學頁面時觸發。
  包含 111 年度兒童及少年安置及教養機構聯合評鑑指標知識（28 項）、頁面模板與 SEO 指引。
metadata:
  filePattern:
    - "app/school/youth-care/**"
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

# 兒少教養機構評鑑大師

## 評鑑基準知識

### 兒少教養機構（111 年度兒童及少年安置及教養機構聯合評鑑）

來源檔案：`lib/ai/evaluation-profiles/youth-care.ts`

**5 大區塊 28 項目：**

| 區塊 | 項目範圍 | 頁面路徑 | 主色 |
|------|---------|---------|------|
| 壹、行政組織與經營管理 | 1–10 | /school/youth-care/administration | orange-500 |
| 貳、建築物環境與設施設備 | 11–15 | /school/youth-care/environment | teal-500 |
| 參、專業服務 | 16–22 | /school/youth-care/professional | blue-500 |
| 肆、權益保障 | 23–27 | /school/youth-care/rights | green-500 |
| 伍、服務創新（加分題）| 28 | /school/youth-care/innovation | purple-500 |

**sections 陣列索引：**
- `sections[0]` — 壹、行政組織與經營管理（shortCode: "管"）
- `sections[1]` — 貳、建築物環境與設施設備（shortCode: "環"）
- `sections[2]` — 參、專業服務（shortCode: "專"）
- `sections[3]` — 肆、權益保障（shortCode: "權"）
- `sections[4]` — 伍、服務創新（加分題）（shortCode: "創"）

**評鑑人員分工：**
- 評鑑人員負責：壹一(一)(二)(三)、壹二(一)(三)、壹三全部、肆一至四、伍
- 主管機關負責（標示*）：壹二(二)、貳全部、肆五（部分）
- 評鑑人員與主管機關共同：肆五

---

## 顏色對應

| 區塊 | Badge class | 數字圓 class |
|------|------------|------------|
| 壹、行政組織與經營管理 | `bg-orange-500/10 text-orange-600 dark:text-orange-400` | `bg-orange-500/10 text-orange-600 dark:text-orange-400` |
| 貳、建築物環境與設施設備 | `bg-teal-500/10 text-teal-600 dark:text-teal-400` | `bg-teal-500/10 text-teal-600 dark:text-teal-400` |
| 參、專業服務 | `bg-blue-500/10 text-blue-600 dark:text-blue-400` | `bg-blue-500/10 text-blue-600 dark:text-blue-400` |
| 肆、權益保障 | `bg-green-500/10 text-green-600 dark:text-green-400` | `bg-green-500/10 text-green-600 dark:text-green-400` |
| 伍、服務創新（加分題）| `bg-purple-500/10 text-purple-600 dark:text-purple-400` | `bg-purple-500/10 text-purple-600 dark:text-purple-400` |

---

## 頁面模板

### 區塊頁面模板

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { youthCareProfile } from "@/lib/ai/evaluation-profiles/youth-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "區塊名稱（項目 X–Y）｜兒少教養機構評鑑",
  description: "...",
  keywords: ["兒少教養機構評鑑", "兒童及少年安置教養機構", "111年度聯合評鑑"],
  alternates: { canonical: "https://reportwang.com/school/youth-care/SLUG" },
  openGraph: { ... },
};

const section = youthCareProfile.sections[INDEX]; // 0=壹 1=貳 2=參 3=肆 4=伍

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  // 每個項目 id 一個 tip
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "...",
  description: "...",
  path: "/school/youth-care/SLUG",
});
```

### 項目圓圈顏色（依區塊）

```tsx
// 替換 COLOR 為對應顏色（orange/teal/blue/green/purple）
<span className="w-8 h-8 rounded-full bg-COLOR-500/10 flex items-center justify-center text-sm font-bold text-COLOR-600 dark:text-COLOR-400 font-mono">
  {item.id}
</span>
```

---

## SEO 確認清單

每頁必須確認：
- [ ] `metadata.title` 含「兒少教養機構」或「兒童及少年安置教養機構」+ 區塊名
- [ ] `metadata.keywords` 含地區及類型變體：「兒少教養機構評鑑基準」「111年度聯合評鑑」「兒童及少年安置機構」
- [ ] `alternates.canonical` 設定正確 URL（`https://reportwang.com/school/youth-care/SLUG`）
- [ ] `educationalContentJsonLd()` 已加入每頁
- [ ] openGraph 完整（title、description、url）
- [ ] h1/h2 層級正確，anchor links 支援深連結（`#item-{id}`）
- [ ] prev/next 導航正確連接相鄰頁面

---

## 重要設計原則

1. **每個評鑑區塊一頁**（非每個項目一頁）— 避免薄頁面
2. **Anchor links** (`#item-{id}`) 支援深連結
3. **DocsTip** 提供準備要訣 — 複用 `components/docs/docs-tip.tsx`
4. **Data-UI 分離**：評鑑資料在 `lib/ai/evaluation-profiles/youth-care.ts`，教學內容在頁面
5. **JSON-LD**：總覽頁用 `"Course"`，區塊頁用 `"LearningResource"`

---

## 評鑑基準重點提示

### 壹、行政組織與經營管理
- 董事會功能需有具體支援紀錄，不只是開會紀錄
- 業務計畫需於「前1年度」訂定，須有績效記錄
- 危機管理計畫需選擇 3 項（含）以上風險類型
- 會計與出納應分工，財務須有專戶

### 貳、建築物環境與設施設備
- 本區塊項目由主管機關依輔導查核情形給分（機構無法自行評分）
- 需準備輔導查核表及建築物安全檢查簽證相關文件

### 參、專業服務
- 安置照顧計畫需在安置 1 個月內完成
- 個案處遇計畫需定期檢視（1年內每3個月；1年以上至少每3至6個月）
- 專業督導至少每月 1 次
- 結束安置後關懷至少追蹤 1 年

### 肆、權益保障
- 申訴機制需「獨立且具審查功能」
- 監看錄影設備不得裝置於寢室、廁所、浴室
- 不適用：「表意權」項目僅安置2歲以下嬰幼兒機構不適用
