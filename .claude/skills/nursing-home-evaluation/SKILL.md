---
name: nursing-home-evaluation
description: |
  住宿型機構評鑑大師：協助建立和維護 /school/nursing-home 評鑑小教室的內容。
  當使用者要新增或修改住宿型照顧機構評鑑相關教學頁面時觸發。
  包含 114 年度臺北市評鑑基準知識（75 項）、頁面模板與 SEO 指引。
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

### 住宿型照顧機構（114 年度臺北市老人安養暨長期照顧機構）

來源檔案：`lib/ai/evaluation-profiles/nursing-home.ts`

**5 大區塊 75 項目：**

| 區塊 | shortCode | 項目範圍 | 頁面路徑 | 主色 |
|------|-----------|---------|---------|------|
| A、經營管理效能 | 管 | 1–15 | /school/nursing-home/management | orange-500 |
| B、專業照護品質 | 專 | 16–47 | /school/nursing-home/professional-quality | green-500 |
| C、安全環境設備 | 安 | 48–63 | /school/nursing-home/safety-environment | teal-500 |
| D、個案權益保障 | 權 | 64–72 | /school/nursing-home/client-rights | blue-500 |
| E、服務改進創新 | 創 | 73–75 | /school/nursing-home/innovation | purple-500 |

**sections 陣列索引：**
- `sections[0]` — A、經營管理效能（shortCode: "管"）
- `sections[1]` — B、專業照護品質（shortCode: "專"）
- `sections[2]` — C、安全環境設備（shortCode: "安"）
- `sections[3]` — D、個案權益保障（shortCode: "權"）
- `sections[4]` — E、服務改進創新（shortCode: "創"）

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
  keywords: ["住宿型長照評鑑", "安養機構評鑑", "長照機構評鑑基準", "114年度評鑑"],
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
- [ ] `metadata.keywords` 含：「住宿型長照評鑑」「安養機構評鑑」「114年度評鑑」
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
8. **B 區塊 32 項較多** — TOC 使用 `grid grid-cols-1 sm:grid-cols-2` 排版
