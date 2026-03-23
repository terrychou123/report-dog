import type { LucideIcon } from "lucide-react";
import {
  RocketIcon,
  FileTextIcon,
  SparklesIcon,
  TagIcon,
  CopyIcon,
  BarChartIcon,
  ClockIcon,
  TableIcon,
  BuildingIcon,
  HelpCircleIcon,
} from "lucide-react";

export interface DocsNavItem {
  href: string;
  label: string;
  title: string;
  icon?: LucideIcon;
  desc?: string;
}

export interface DocsNavSection {
  group: string;
  items: DocsNavItem[];
}

export const docsNavSections: DocsNavSection[] = [
  {
    group: "入門",
    items: [
      {
        href: "/docs/getting-started",
        label: "快速開始",
        title: "報告汪快速開始教學",
        icon: RocketIcon,
        desc: "三步驟完成註冊與第一份報告",
      },
      {
        href: "/docs/create-report",
        label: "建立報告",
        title: "如何在報告汪建立報告",
        icon: FileTextIcon,
        desc: "貼上文字、上傳 .doc 或手動輸入",
      },
    ],
  },
  {
    group: "核心功能",
    items: [
      {
        href: "/docs/ai-editing",
        label: "AI 段落修改",
        title: "使用 AI 修改報告段落",
        icon: SparklesIcon,
        desc: "點擊段落下指令，AI 即時產出修改版本",
      },
      {
        href: "/docs/tags-and-search",
        label: "標籤分類與搜尋",
        title: "標籤分類與全文搜尋教學",
        icon: TagIcon,
        desc: "建立標籤、篩選報告、全文搜尋",
      },
      {
        href: "/docs/copy-and-templates",
        label: "複製報告與模板",
        title: "一鍵複製報告與建立模板",
        icon: CopyIcon,
        desc: "一鍵複製上期報告，建立個人模板庫",
      },
      {
        href: "/docs/evaluation",
        label: "AI 評鑑分析",
        title: "AI 評鑑分析功能教學",
        icon: BarChartIcon,
        desc: "上傳報告，AI 五維度評鑑分析",
      },
      {
        href: "/docs/version-history",
        label: "版本歷史與共享",
        title: "版本歷史查看與報告共享",
        icon: ClockIcon,
        desc: "查看歷史版本、還原、產生唯讀分享連結",
      },
      {
        href: "/docs/excel-editing",
        label: "Excel 表格編輯",
        title: "Excel 式表格編輯功能",
        icon: TableIcon,
        desc: "插入表格、Excel 式編輯、匯出 .xlsx",
      },
    ],
  },
  {
    group: "進階應用",
    items: [
      {
        href: "/docs/scenarios",
        label: "四大機構實戰情境",
        title: "四大長照機構使用情境",
        icon: BuildingIcon,
        desc: "居服、日照、護理、醫院實際使用案例",
      },
      {
        href: "/docs/faq",
        label: "常見問題",
        title: "報告汪常見問題解答",
        icon: HelpCircleIcon,
        desc: "帳號、費用、AI 功能、資料安全解答",
      },
    ],
  },
];
