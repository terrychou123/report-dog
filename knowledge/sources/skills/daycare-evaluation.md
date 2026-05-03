---
name: daycare-evaluation
description: |
  日照中心評鑑大師：協助建立和維護 /school/daycare 評鑑小教室的內容。
  當使用者要新增或修改日間照顧機構評鑑相關教學頁面時觸發。
  包含 115 年度臺北市評鑑基準知識（43 正式項 + 2 加分題）、頁面模板與 SEO 指引。
metadata:
  filePattern:
    - "app/school/daycare/**"
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

# 日照中心評鑑大師

## 評鑑基準知識

### 日間照顧機構（115 年度臺北市政府社會局法定評鑑基準）

來源檔案：`lib/ai/evaluation-profiles/daycare.ts`

**4 大區塊 43 正式項目 + 伍、加分題 2 項：**

| 區塊 | 項目範圍 | 頁面路徑 | 主色 |
|------|---------|---------|------|
| 壹、個案權益保障 | 1–4 | /school/daycare/client-rights | blue-500 |
| 貳、專業照護品質 | 5–22 | /school/daycare/professional-quality | green-500 |
| 參、經營管理效能 | 23–37 | /school/daycare/management | orange-500 |
| 肆、安全環境設備 | 38–43 | /school/daycare/safety-environment | teal-500 |
| 伍、加分題 | 44–45 | 顯示於總覽頁 | yellow-500 |

**sections 陣列索引：**
- `sections[0]` — 壹、個案權益保障（shortCode: "權"）
- `sections[1]` — 貳、專業照護品質（shortCode: "專"）
- `sections[2]` — 參、經營管理效能（shortCode: "管"）
- `sections[3]` — 肆、安全環境設備（shortCode: "安"）
- `sections[4]` — 伍、加分題（shortCode: "加"，不對應獨立子頁）

**115年度新特色：**
- 貳、專業照護品質含 3 子分類：（一）評估與處遇（5-10）、（二）健康生活照顧（11-21）、（三）品質監測（22）
- 參、經營管理效能含 4 子分類：（一）行政制度（23-27）、（二）服務人員管理（28-33）、（三）財務管理（34）、（四）緊急事件管理（35-37）
- 肆、安全環境設備含子分類：（一）硬體環境設施（38-43）
- 評分採 A-E 五等制（部分項目為 A-B-E 三等或特殊計分）

---

## 法定文件範本索引

需要附上政府指定範本的評鑑項目，已在範本庫以客製分頁呈現，資料源對應如下：

| 項目 id | 項目名稱 | 法定範本 | 來源檔案 | 範本分頁 builder |
|---|---|---|---|---|
| 3 | 服務契約簽訂情形 | 衛福部「社區式服務類長期照顧服務機構定型化契約範本」 | `lib/supplementary-sheets/daycare-item-3-custom.ts` | `buildDaycareItem3CustomSheets()` |

第 3 項提供 6 張客製分頁：
1. 主契約（第一條～第二十九條）
2. 附件一：肖像權意願書
3. 附件二：個人資料授權同意書
4. 附件三：使用者委託簽約者同意書
5. 附件四+附件四之一：服務項目、時間、頻率及費用
6. 附件五：緊急事故處理同意書

**撰寫 /school/daycare 教學頁面時**：
- 凡引用第 3 項 `DocsTip` 或準備要訣，須提及「採用衛福部定型化契約範本」為關鍵符合條件
- 不得自行撰寫契約條文示例；如需展示片段，直接引述 `daycare-item-3-custom.ts` 的內容以保持一致
- SEO 關鍵字可加入「社區式服務定型化契約」「日照中心契約範本」強化搜尋覆蓋

---

## 顏色對應

| 區塊 | Badge class | 數字圓 class |
|------|------------|------------|
| 壹、個案權益保障 | `bg-blue-500/10 text-blue-600 dark:text-blue-400` | `bg-blue-500/10 text-blue-600 dark:text-blue-400` |
| 貳、專業照護品質 | `bg-green-500/10 text-green-600 dark:text-green-400` | `bg-green-500/10 text-green-600 dark:text-green-400` |
| 參、經營管理效能 | `bg-orange-500/10 text-orange-600 dark:text-orange-400` | `bg-orange-500/10 text-orange-600 dark:text-orange-400` |
| 肆、安全環境設備 | `bg-teal-500/10 text-teal-600 dark:text-teal-400` | `bg-teal-500/10 text-teal-600 dark:text-teal-400` |

---

## 頁面模板

### 區塊頁面模板

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { daycareProfile } from "@/lib/ai/evaluation-profiles/daycare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "區塊名稱（項目 X–Y）｜日間照顧機構評鑑",
  description: "...",
  keywords: ["日照中心...評鑑", "臺北市日照評鑑", "113年度日間照顧評鑑"],
  alternates: { canonical: "https://reportwang.com/school/daycare/SLUG" },
  openGraph: { ... },
};

const section = daycareProfile.sections[INDEX]; // 0=壹 1=貳 2=參 3=肆

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  // 每個項目 id 一個 tip
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "...",
  description: "...",
  path: "/school/daycare/SLUG",
});
```

### 項目圓圈顏色（依區塊）

```tsx
// 替換 COLOR 為對應顏色（blue/green/orange/teal）
<span className="w-8 h-8 rounded-full bg-COLOR-500/10 flex items-center justify-center text-sm font-bold text-COLOR-600 dark:text-COLOR-400 font-mono">
  {item.id}
</span>
```

---

## SEO 確認清單

每頁必須確認：
- [ ] `metadata.title` 含「日間照顧」或「日照」+ 區塊名
- [ ] `metadata.keywords` 含地區變體：「臺北市日照評鑑」「日間照顧中心評鑑基準」「115年度評鑑」
- [ ] `alternates.canonical` 設定正確 URL（`https://reportwang.com/school/daycare/SLUG`）
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
5. **顏色語義** — teal 代表安全環境設備（最後區塊）
6. **上下頁導航** — 最後一頁（safety-environment）的 next 改為返回總覽
7. **評鑑 Profile 資料分離** — 教學內容在頁面中，評鑑標準在 `lib/ai/evaluation-profiles/daycare.ts`
