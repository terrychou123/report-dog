---
name: youth-care-evaluation
description: |
  兒少教養機構評鑑大師：協助建立和維護 /school/youth-care 評鑑小教室的內容。
  當使用者要新增或修改兒少安置機構評鑑相關教學頁面時觸發。
  包含 112 年度兒童及少年安置機構評鑑指標知識（35 項）、頁面模板與 SEO 指引。
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

# 兒少安置機構評鑑大師

## 評鑑基準知識

### 兒少安置機構（112 年度兒童及少年安置機構評鑑）

來源檔案：`lib/ai/evaluation-profiles/youth-care.ts`

**5 大區塊 35 項目：**

| 區塊 | 配分 | 項目範圍 | 頁面路徑 | 主色 |
|------|------|---------|---------|------|
| 壹、行政組織與經營管理 | 10分 | 1–6 | /school/youth-care/administration | orange-500 |
| 貳、建築物環境及設施設備 | 10分（±2） | 7–14 | /school/youth-care/environment | teal-500 |
| 參、專業服務 | 60分 | 15–28 | /school/youth-care/professional | blue-500 |
| 肆、財務管理 | 20分 | 29 | /school/youth-care/finance | green-500 |
| 伍、特殊事項或措施（含創新服務方案）| ±10分 | 30–35 | /school/youth-care/innovation | purple-500 |

**sections 陣列索引：**
- `sections[0]` — 壹、行政組織與經營管理（shortCode: "管"）
- `sections[1]` — 貳、建築物環境及設施設備（shortCode: "環"）
- `sections[2]` — 參、專業服務（shortCode: "專"）
- `sections[3]` — 肆、財務管理（shortCode: "財"）
- `sections[4]` — 伍、特殊事項或措施（含創新服務方案）（shortCode: "特"）

**各 section 的 items 欄位說明：**
- `id` — 全域唯一項目編號（1-35）
- `title` — 項目名稱
- `subSection` — 子區塊名稱（如「一、行政組織機能與運作」）
- `score` — 配分（數字，伍的扣分項為負數）
- `responsible` — 主責人員
- `criteria` — 評鑑基準（字串陣列）
- `reviewMethod` — 評鑑方式
- `reviewBasis` — 評分依據
- `ageGroup` — 僅參三雙版本項目有，值為 "under2"（2歲以下）或 "over2"（2歲以上18歲以下）
- `note` — 特殊備注（如「主管機關評分」）

**參三雙版本說明：**
- items 17-20：適用安置2歲以下兒童（ageGroup: "under2"）
- items 21-24：適用安置未滿2歲以上18歲以下兒童及少年（ageGroup: "over2"）
- 兩套版本的總分均為32分（入院協助4分+在院生活+離院協助+直接服務）
- 同時安置兩種年齡個案的機構，以兩版本平均計分

**評鑑委員分工：**
- 評鑑人員負責：壹1、壹2、壹3、參16、參17-24、參26-28、肆30-35
- 主管機關負責（標示*）：壹4、壹5、壹6、貳7-14、參15、參25
- 肆29（財務管理）：依歷年財務查核結果計分

---

## 顏色對應

| 區塊 | Badge class | 數字圓 class |
|------|------------|------------|
| 壹、行政組織與經營管理 | `bg-orange-500/10 text-orange-600 dark:text-orange-400` | `bg-orange-500/10 text-orange-600 dark:text-orange-400` |
| 貳、建築物環境及設施設備 | `bg-teal-500/10 text-teal-600 dark:text-teal-400` | `bg-teal-500/10 text-teal-600 dark:text-teal-400` |
| 參、專業服務 | `bg-blue-500/10 text-blue-600 dark:text-blue-400` | `bg-blue-500/10 text-blue-600 dark:text-blue-400` |
| 參三（2歲以下） | `bg-indigo-500/10 text-indigo-600 dark:text-indigo-400` | — |
| 參三（2歲以上） | `bg-violet-500/10 text-violet-600 dark:text-violet-400` | — |
| 肆、財務管理 | `bg-green-500/10 text-green-600 dark:text-green-400` | `bg-green-500/10 text-green-600 dark:text-green-400` |
| 伍、特殊事項（扣分） | `bg-red-500/10 text-red-600 dark:text-red-400` | — |
| 伍、特殊事項（加分） | `bg-purple-500/10 text-purple-600 dark:text-purple-400` | `bg-purple-500/10 text-purple-600 dark:text-purple-400` |

---

## 頁面模板

### 區塊頁面模板（server component）

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { youthCareProfile } from "@/lib/ai/evaluation-profiles/youth-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "區塊名稱（項目 X–Y）｜兒少安置機構評鑑",
  description: "...",
  keywords: ["兒少安置機構評鑑", "兒童及少年安置機構", "112年度評鑑"],
  alternates: { canonical: "https://reportwang.com/school/youth-care/SLUG" },
  openGraph: { ... },
};

const section = youthCareProfile.sections[INDEX]; // 0=壹 1=貳 2=參 3=肆 4=伍
```

### 參三雙版本頁面

參頁面的雙版本切換使用 client component 抽離：
- 頁面本身：`app/school/youth-care/professional/page.tsx`（server component，匯出 metadata）
- 互動 tab 切換：`app/school/youth-care/professional/_age-quality-tabs.tsx`（client component，前置 `_` 表示非路由）
- 傳入 `allItems={section.items}` 讓 client component 自行過濾雙版本

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
- [ ] `metadata.title` 含「兒少安置機構」或「兒童及少年安置機構」+ 區塊名
- [ ] `metadata.keywords` 含類型變體：「兒少安置機構評鑑基準」「112年度評鑑」「兒童及少年安置機構」
- [ ] `alternates.canonical` 設定正確 URL（`https://reportwang.com/school/youth-care/SLUG`）
- [ ] `educationalContentJsonLd()` 已加入每頁
- [ ] openGraph 完整（title、description、url）
- [ ] h1/h2 層級正確，anchor links 支援深連結（`#item-{id}`）
- [ ] prev/next 導航正確連接相鄰頁面
- [ ] **不得出現** 舊版「111年度」、「聯合評鑑」等字樣

---

## 重要設計原則

1. **每個評鑑區塊一頁**（非每個項目一頁）— 避免薄頁面
2. **Anchor links** (`#item-{id}`) 支援深連結
3. **DocsTip** 提供準備要訣 — 複用 `components/docs/docs-tip.tsx`
4. **Data-UI 分離**：評鑑資料在 `lib/ai/evaluation-profiles/youth-care.ts`，教學內容在頁面
5. **JSON-LD**：總覽頁用 `"Course"`，區塊頁用 `"LearningResource"`
6. **互動元素**需抽成 client component，頁面本身維持 server component 以保留 metadata 匯出

---

## 評鑑基準重點提示

### 壹、行政組織與經營管理
- 資訊系統填報為112年新增重點（1分），確認全國兒少安置及追蹤管理系統資料一致
- 人員流動率計算：進入率+退出率÷2；20%以下優、21-30%可、超過31%待加強
- 項目4-6由主管機關依輔導查核評分，需積極配合年度查核

### 貳、建築物環境及設施設備
- 本區塊所有項目由主管機關評分，評委可依現場狀況±2分
- 機構環境配置（項目8）分4個配分各0.5分，兒少設置標準第21條是重要法規依據
- 危機事故處理（項目12）共4子項，需有完整的分析→改進→教育訓練四環節

### 參、專業服務
- 輔導目標達成（項目16）是最高配分單項（15分），目標需具體可衡量
- 參三雙版本：2歲以下在院生活輔導16分（8子項）、2歲以上在院生活輔導15分（15子項）
- 在院生活輔導需涵蓋性侵害/性騷擾/霸凌預防與處理及倡導兒少應有權益

### 肆、財務管理
- 分數由歷年財務查核結果決定，無法在評鑑當天補救
- 共4次查核（社家署109年+地方政府110/111/112年），每次合格20分，函文補件每次扣2分
- 確保會計制度落實：帳冊完整、收支憑證、捐款徵信公開

### 伍、特殊事項或措施
- 違規扣分：以發生案件數計，最高扣10分
- 最高加分：收容多元+4分（特殊需求兒少5名以上+3分，加開發資源+1分）
- COVID防疫加分（最高+3分）：建立完整計畫、工作人員疫苗施打率達門檻
