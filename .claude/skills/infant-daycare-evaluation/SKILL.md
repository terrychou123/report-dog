---
name: infant-daycare-evaluation
description: |
  托嬰中心評鑑大師：協助建立和維護 /school/infant-daycare 評鑑小教室的內容。
  當使用者要新增或修改托嬰中心評鑑相關教學頁面時觸發。
  包含臺北市114-116年度托嬰中心評鑑基準知識（60項）、頁面模板與 SEO 指引。
metadata:
  filePattern:
    - "app/school/infant-daycare/**"
    - "app/infant-daycare/**"
    - "lib/school-nav.ts"
    - "lib/ai/evaluation-profiles/infant-daycare.ts"
    - "lib/supplementary-sheets/infant-daycare.ts"
  priority: 90
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# 托嬰中心評鑑大師

**評鑑名稱：** 臺北市114-116年度托嬰中心評鑑指標
**主管機關：** 臺北市政府社會局
**評鑑週期：** 114-116年度（3年一輪）
**總題數：** 60題（另加減分項目與機構特色）
**滿分：** 100分

---

## 評鑑區塊對照表

| 大類 | 子類 | shortCode | 項目範圍 | 題數 | 路徑 slug |
|-----|------|-----------|--------|-----|-----------|
| 一、行政管理（20分） | 立案行政與業務管理 | 管 | 1-3 | 3 | administration |
| | 人事領導與管理 | 人 | 4-5 | 2 | administration |
| | 文書與檔案管理 | 文 | 6-7 | 2 | administration |
| | 財務、總務與安全管理 | 財 | 8-10 | 3 | administration |
| | 兒童權益保障 | 權 | 11 | 1 | administration |
| 二、托育活動（40分） | 關係建立與互動 | 互 | 12-14 | 3 | childcare-activities |
| | 環境規劃與使用 | 環 | 15-23 | 9 | childcare-activities |
| | 活動規劃與實施 | 活 | 24-33 | 10 | childcare-activities |
| | 親師交流與合作 | 親 | 34-36 | 3 | childcare-activities |
| 三、健康安全（40分） | 健康管理 | 健 | 37-39 | 3 | health-safety |
| | 健康安全飲食 | 食 | 40-44 | 5 | health-safety |
| | 環境與衛生設備 | 衛 | 45-51 | 7 | health-safety |
| | 環境與設備安全 | 安 | 52-57 | 6 | health-safety |
| | 健康與安全照護 | 護 | 58-60 | 3 | health-safety |

---

## 色彩對照表

| 大類 | Badge class | 數字圓 class |
|-----|------------|-------------|
| 行政管理 | `bg-orange-100 text-orange-700` | `bg-orange-500 text-white` |
| 托育活動 | `bg-blue-100 text-blue-700` | `bg-blue-500 text-white` |
| 健康安全 | `bg-green-100 text-green-700` | `bg-green-500 text-white` |

---

## 關鍵檔案路徑

| 用途 | 路徑 |
|-----|------|
| 評鑑 Profile | `lib/ai/evaluation-profiles/infant-daycare.ts` |
| 補充表單定義 | `lib/supplementary-sheets/infant-daycare.ts` |
| 評鑑小教室總覽 | `app/school/infant-daycare/page.tsx` |
| 行政管理頁 | `app/school/infant-daycare/administration/page.tsx` |
| 托育活動頁 | `app/school/infant-daycare/childcare-activities/page.tsx` |
| 健康安全頁 | `app/school/infant-daycare/health-safety/page.tsx` |
| 宣傳著陸頁 | `app/infant-daycare/page.tsx` |
| 導航設定 | `lib/school-nav.ts` |
| Excel 下載 | `public/downloads/infant-daycare.xlsx` |

---

## 頁面模板（總覽頁）

```tsx
import type { Metadata } from "next";
import { infantDaycareProfile } from "@/lib/ai/evaluation-profiles/infant-daycare";
import { educationalContentJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "托嬰中心評鑑準備指南｜114-116年度 60 項評鑑基準",
  description: "...",
  keywords: ["托嬰中心評鑑", "臺北市托嬰中心", "114年評鑑", "托嬰中心自評表"],
  alternates: { canonical: "https://reportwang.com/school/infant-daycare" },
};

const sectionMeta = [
  {
    href: "/school/infant-daycare/administration",
    icon: "⚙️",
    name: "行政管理",
    shortCode: "管",
    itemRange: "項目 1–11",
    bgClass: "bg-orange-100",
    textClass: "text-orange-700",
  },
  {
    href: "/school/infant-daycare/childcare-activities",
    icon: "🧸",
    name: "托育活動",
    shortCode: "托",
    itemRange: "項目 12–36",
    bgClass: "bg-blue-100",
    textClass: "text-blue-700",
  },
  {
    href: "/school/infant-daycare/health-safety",
    icon: "🛡️",
    name: "健康安全",
    shortCode: "健",
    itemRange: "項目 37–60",
    bgClass: "bg-green-100",
    textClass: "text-green-700",
  },
];
```

---

## SEO 檢查清單

- [ ] `<title>` 含「托嬰中心評鑑」及年度（114-116年）
- [ ] keywords 含：托嬰中心評鑑、臺北市托嬰、114年評鑑、嬰幼兒照護、自評表
- [ ] canonical URL 已設定
- [ ] JSON-LD `educationalContentJsonLd` 已加入
- [ ] openGraph title/description/type 已填寫
- [ ] h1 含「托嬰中心」關鍵字
- [ ] 有 prev/next 分頁導航連結

---

## 設計原則

1. **每個大類一頁**：行政管理（items 1-11）、托育活動（items 12-36）、健康安全（items 37-60）各一頁
2. **錨點連結**：項目使用 `id="item-{n}"` 以便 TOC 直達
3. **DocsTip**：每個項目提供備考提示（評鑑員關注重點）
4. **JSON-LD**：總覽用 `type: "Course"`，分區用 `type: "LearningResource"`
5. **色彩語義**：橘色＝行政管理、藍色＝托育活動、綠色＝健康安全
6. **prev/next 導航**：三頁首尾相連，方便連貫閱讀
7. **資料與 UI 分離**：Profile 資料來自 `infantDaycareProfile`，勿在 JSX 硬編碼

---

## 評鑑重點提示（各區塊常見扣分陷阱）

### 行政管理
- 廚工體檢未每年執行（應與其他人員的2年週期區分）
- 監視器設備未留保養紀錄
- 托育人員訓練時數未達18小時（線上課程需備截圖證明）

### 托育活動
- 1歲以內嬰兒使用枕頭（預防窒息違規）
- 睡床間距未保持30公分以上
- 寶寶日誌未每日記錄個別嬰幼兒發展表現

### 健康安全
- 食物樣品未冷藏或未標示日期
- 冰箱無溫度計或溫度超標（冷藏須0-7°C）
- 給藥未有委託藥單或五對原則記錄不全
- 感染管制手冊未依最新版本修訂
