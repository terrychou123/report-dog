---
name: home-care-evaluation
description: |
  居家長照機構評鑑大師：協助建立和維護 /school 評鑑小教室的內容。
  當使用者要新增或修改評鑑相關教學頁面時觸發。
  包含評鑑基準知識、頁面建立模板與新增機構類型的完整步驟指引。
metadata:
  filePattern:
    - "app/school/**"
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

# 居家長照機構評鑑大師

## 評鑑基準知識

### 居家服務機構（115 年度臺北市政府社會局）

來源檔案：`lib/ai/evaluation-profiles/home-care.ts`

**4 大區塊 32 項目：**

| 區塊 | 項目範圍 | 頁面路徑 |
|------|---------|---------|
| 壹、個案權益保障 | 1–4 | /school/home-care/client-rights |
| 貳、專業照護品質 | 5–14 | /school/home-care/professional-quality |
| 參、經營管理效能 | 15–30 | /school/home-care/management |
| 加分題 | 31–32 | /school/home-care/bonus |

**每個評鑑項目的結構：**
```ts
{
  id: number,          // 項目編號
  title: string,       // 項目名稱
  responsible: string, // 負責人員（如「社工/照服員」）
  criteria: string[],  // 4 個評鑑標準
  reviewMethod: string // 審查方式（如「文件檢閱、現場訪談」）
}
```

---

## 頁面建立模板

### 區塊頁面模板（如 client-rights/page.tsx）

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { homeCareProfile } from "@/lib/ai/evaluation-profiles/home-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "區塊名稱（項目 X–Y）",
  description: "...",
  keywords: [...],
  alternates: { canonical: "https://reportwang.com/school/home-care/SLUG" },
  openGraph: { ... },
};

const section = homeCareProfile.sections[INDEX]; // 0=壹 1=貳 2=參 3=加

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  // 每個項目 id 一個 tip
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "...",
  description: "...",
  path: "/school/home-care/SLUG",
});

export default function SectionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* Header: Badge + h1 + 說明段落 */}
      {/* Mini TOC: anchor links */}
      {/* Items loop: id circle + h2 + responsible badge + reviewMethod badge + criteria ol + DocsTip */}
      {/* Prev/Next navigation */}
    </>
  );
}
```

### 項目渲染模板

```tsx
<section id={`item-${item.id}`} className="scroll-mt-20">
  <div className="flex flex-wrap items-center gap-2 mb-3">
    <span className="w-8 h-8 rounded-full bg-COLOR/10 flex items-center justify-center text-sm font-bold text-COLOR font-mono">
      {item.id}
    </span>
    <h2 className="text-lg font-bold">{item.title}</h2>
    <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
    <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
  </div>

  <div className="mb-4">
    <h3 className="text-sm font-semibold mb-2">評鑑標準</h3>
    <ol className="space-y-1.5 list-none pl-0">
      {item.criteria.map((criterion, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
          <span className="shrink-0 mt-0.5 w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-mono text-foreground">
            {i + 1}
          </span>
          {criterion}
        </li>
      ))}
    </ol>
  </div>

  {tips[item.id] && (
    <DocsTip variant={tips[item.id].variant ?? "neutral"} title="準備要訣">
      {tips[item.id].content}
    </DocsTip>
  )}
</section>
```

### 顏色對應

| 區塊 | 顏色 |
|------|------|
| 壹、個案權益保障 | `blue-500` |
| 貳、專業照護品質 | `green-500` |
| 參、經營管理效能 | `orange-500` |
| 加分題 | `purple-500` |

---

## 新增機構類型步驟

當需要新增「日照中心」「住宿型長照」「護理之家」等新機構類型時：

### Step 1：建立評鑑 Profile
```
lib/ai/evaluation-profiles/{機構-slug}.ts
```
格式與 `home-care.ts` 相同，包含 sections + items。

### Step 2：新增 Nav Section
在 `lib/school-nav.ts` 的 `schoolNavSections` 陣列中：
1. 新增一個群組（如「日間照顧機構」）
2. 在「即將推出」群組中移除對應的 comingSoon 項目

### Step 3：新增路由頁面
```
app/school/{机構-slug}/page.tsx           // 總覽頁
app/school/{机構-slug}/{section-slug}/page.tsx  // 各區塊頁
```

### Step 4：更新總覽頁
在 `app/school/page.tsx` 的 `courses` 陣列中，將 `available: false` 改為 `available: true` 並更新 href。

### Step 5：SEO 確認清單
- [ ] 每頁 `metadata.title` 包含機構類型名稱
- [ ] `metadata.keywords` 包含「機構名稱 + 評鑑」變體關鍵字
- [ ] `alternates.canonical` 設定正確 URL
- [ ] `educationalContentJsonLd()` 已加入每頁
- [ ] `inLanguage: "zh-TW"` 已設定（在 jsonld.ts 的 helper 中自動加入）

---

## 重要設計原則

1. **每個評鑑區塊一頁**（非每個項目一頁）— 避免薄頁面
2. **Anchor links** (`#item-{id}`) 支援深連結
3. **DocsTip** 提供準備要訣 — 複用 `components/docs/docs-tip.tsx`，不另建組件
4. **JSON-LD** 使用 `educationalContentJsonLd()` from `lib/jsonld.ts`
5. **顏色語義** — 每個機構類型用一個主色，各區塊有對應子色調
6. **上下頁導航** — 方便使用者線性閱讀完整評鑑基準
7. **評鑑 Profile 資料分離** — 教學內容在頁面中，評鑑標準在 `lib/ai/evaluation-profiles/` 中，方便 AI 評鑑功能也能使用相同資料
