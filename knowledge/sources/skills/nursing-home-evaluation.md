---
name: nursing-home-evaluation
description: |
  住宿型機構評鑑大師：協助建立和維護 /school/nursing-home 評鑑小教室的內容。
  當使用者要新增或修改住宿型照顧機構評鑑相關教學頁面時觸發。
  包含 115 年度衛生福利部全國版評鑑基準知識（63 項 + 3 加減分）、頁面模板與 SEO 指引。
metadata:
  filePattern:
    - "app/school/nursing-home/**"
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

# 住宿型機構評鑑大師

## 評鑑基準知識

### 住宿型照顧機構（115 年度住宿式長期照顧服務機構績效考核指標，衛生福利部全國版）

來源檔案：`lib/ai/evaluation-profiles/nursing-home.ts`

**4 大區塊 63 項 + 加減分 3 項：**

| 區塊 | shortCode | 項目 id 範圍 | 頁面路徑 | 主色 |
|------|-----------|-------------|---------|------|
| A、經營管理效能 | 管 | 1–9（9項） | /school/nursing-home/management | orange-500 |
| B、專業照護品質 | 專 | 10–38（29項） | /school/nursing-home/professional-quality | green-500 |
| C、安全環境設備 | 安 | 39–54（16項） | /school/nursing-home/safety-environment | teal-500 |
| D、個案權益保障 | 權 | 55–63（9項） | /school/nursing-home/client-rights | blue-500 |
| 加減分項目 | 創 | 64–66（3項） | /school/nursing-home/innovation | purple-500 |

**sections 陣列索引：**
- `sections[0]` — A、經營管理效能（shortCode: "管"）
- `sections[1]` — B、專業照護品質（shortCode: "專"）
- `sections[2]` — C、安全環境設備（shortCode: "安"）
- `sections[3]` — D、個案權益保障（shortCode: "權"）
- `sections[4]` — 加減分項目（shortCode: "創"）

**115年度關鍵新增/變更：**
- A8：合併「社工/護理/兼任/照服員設置」（舊版 A8+A9+A10+A11）
- A9：合併「新進/在職/廚工教育訓練」（舊版 A13+A14+A15）
- B19（id 28）：合併「鼻胃管及導尿管移除」（舊版 B20+B21）
- B26（id 35）：**新增**「失禁服務對象定時如廁計畫」
- B28（id 37）：合併「膳食菜單 + 個別化飲食 + 適宜餐具」（舊版 B29+B30+B31）
- C9（id 47）：用電安全擴充 + 防火管理人禁由社工/醫事人員/照服員兼任
- C10（id 48）：等待救援空間需符合不燃材料/防火門/防排煙三項構造要求
- C11（id 49）：EOP 每年 4 次（含複合式 1 次 + 夜間 1 次）
- D2（id 56）：入住契約審閱期明訂至少 5 天
- D8（id 62）：新增病人自主權利法（病主法）相關要求
- 加分②（id 65）：**新增**「機構內空氣品質 CO₂ < 1000ppm」加分項

---

## 顏色對應

| 區塊 | Badge class | 數字圓 class |
|------|------------|------------|
| A、經營管理效能 | `bg-orange-500/10 text-orange-600 dark:text-orange-400` | `bg-orange-500/10 text-orange-600 dark:text-orange-400` |
| B、專業照護品質 | `bg-green-500/10 text-green-600 dark:text-green-400` | `bg-green-500/10 text-green-600 dark:text-green-400` |
| C、安全環境設備 | `bg-teal-500/10 text-teal-600 dark:text-teal-400` | `bg-teal-500/10 text-teal-600 dark:text-teal-400` |
| D、個案權益保障 | `bg-blue-500/10 text-blue-600 dark:text-blue-400` | `bg-blue-500/10 text-blue-600 dark:text-blue-400` |
| E、服務改進創新 | `bg-purple-500/10 text-purple-600 dark:text-purple-400` | `bg-purple-500/10 text-purple-600 dark:text-purple-400` |

---

## 頁面模板

### 區塊頁面模板

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { nursingHomeProfile } from "@/lib/ai/evaluation-profiles/nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "區塊名稱（項目 X–Y）｜住宿型照顧機構評鑑",
  description: "...",
  keywords: ["住宿型長照評鑑", "安養機構評鑑", "長照機構評鑑基準", "115年度評鑑"],
  alternates: { canonical: "https://reportwang.com/school/nursing-home/SLUG" },
  openGraph: { ... },
};

const section = nursingHomeProfile.sections.find((s) => s.shortCode === "SHORT_CODE")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  // 每個項目 id 一個 tip
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "...",
  description: "...",
  path: "/school/nursing-home/SLUG",
});
```

---

## SEO 確認清單

每頁必須確認：
- [ ] `metadata.title` 含「住宿型」或「安養機構」+ 區塊名
- [ ] `metadata.keywords` 含：「住宿型長照評鑑」「安養機構評鑑」「115年度評鑑」
- [ ] `alternates.canonical` 設定正確 URL（`https://reportwang.com/school/nursing-home/SLUG`）
- [ ] `educationalContentJsonLd()` 已加入每頁
- [ ] openGraph 完整（title、description、url）
- [ ] h1/h2 層級正確，anchor links 支援深連結（`#item-{id}`）
- [ ] prev/next 導航正確連接相鄰頁面

---

## 重要設計原則

1. **每個評鑑區塊一頁**（非每個項目一頁）— 避免薄頁面
2. **Anchor links** (`#item-{id}`) 支援深連結
3. **DocsTip** 提供準備要訣 — 複用 `components/docs/docs-tip.tsx`
4. **JSON-LD** 使用 `educationalContentJsonLd()` from `lib/jsonld.ts`
5. **顏色語義** — purple 代表 E 服務改進創新（最後區塊）
6. **上下頁導航** — 最後一頁（innovation）的 next 改為返回總覽
7. **評鑑 Profile 資料分離** — 教學內容在頁面中，評鑑標準在 `lib/ai/evaluation-profiles/nursing-home.ts`
8. **B 區塊 29 項較多** — TOC 使用 `grid grid-cols-1 sm:grid-cols-2` 排版
