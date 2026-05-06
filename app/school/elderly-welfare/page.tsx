import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { elderlyWelfareProfile, meta as elderlyWelfareMeta } from "@/lib/ai/evaluation-profiles/elderly-welfare";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import {
  ShieldCheckIcon,
  HeartPulseIcon,
  SettingsIcon,
  StarIcon,
  ShieldIcon,
  SparklesIcon,
  ArrowRightIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "老人福利機構評鑑基準總覽｜115年度老人福利機構評鑑指標",
  description:
    "115 年度老人福利機構評鑑指標完整說明，共 77 項目、6 大區塊：經營管理效能、專業照護品質、安全環境設備、個案權益保障、服務改進創新與加分題。",
  keywords: [
    "老人福利機構評鑑",
    "老人福利機構評鑑指標",
    "115年度老人福利機構",
    "長照機構評鑑基準",
    "老人安養機構評鑑",
    "老人照顧機構評鑑",
    "老人福利機構評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/elderly-welfare" },
  openGraph: {
    title: "老人福利機構評鑑基準總覽｜評鑑小教室｜報告汪",
    description: "77 項老人福利機構評鑑基準完整解說，掌握評鑑重點，提升評鑑通過率。",
    url: "https://reportwang.com/school/elderly-welfare",
  },
};

const sectionMeta = [
  {
    href: "/school/elderly-welfare/management",
    icon: SettingsIcon,
    name: "A、經營管理效能",
    shortCode: "管",
    itemRange: "項目 1–15",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/elderly-welfare/professional-quality",
    icon: HeartPulseIcon,
    name: "B、專業照護品質",
    shortCode: "專",
    itemRange: "項目 16–46",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/elderly-welfare/safety-environment",
    icon: ShieldIcon,
    name: "C、安全環境設備",
    shortCode: "安",
    itemRange: "項目 47–62",
    bgClass: "bg-teal-500/10",
    textClass: "text-teal-600 dark:text-teal-400",
  },
  {
    href: "/school/elderly-welfare/client-rights",
    icon: ShieldCheckIcon,
    name: "D、個案權益保障",
    shortCode: "權",
    itemRange: "項目 63–71",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/elderly-welfare/innovation",
    icon: StarIcon,
    name: "E、服務改進創新",
    shortCode: "創",
    itemRange: "項目 72–74",
    bgClass: "bg-indigo-500/10",
    textClass: "text-indigo-600 dark:text-indigo-400",
  },
  {
    href: "/school/elderly-welfare/bonus",
    icon: SparklesIcon,
    name: "F、加分題",
    shortCode: "加",
    itemRange: "項目 75–77",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-600 dark:text-purple-400",
  },
];

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "老人福利機構評鑑基準",
  description:
    "115 年度老人福利機構評鑑指標，共 77 項目、6 大區塊完整解說。",
  path: "/school/elderly-welfare",
  hasPart: [
    {
      name: "A、經營管理效能（項目 1–15）",
      url: "https://reportwang.com/school/elderly-welfare/management",
    },
    {
      name: "B、專業照護品質（項目 16–46）",
      url: "https://reportwang.com/school/elderly-welfare/professional-quality",
    },
    {
      name: "C、安全環境設備（項目 47–62）",
      url: "https://reportwang.com/school/elderly-welfare/safety-environment",
    },
    {
      name: "D、個案權益保障（項目 63–71）",
      url: "https://reportwang.com/school/elderly-welfare/client-rights",
    },
    {
      name: "E、服務改進創新（項目 72–74）",
      url: "https://reportwang.com/school/elderly-welfare/innovation",
    },
    {
      name: "F、加分題（項目 75–77）",
      url: "https://reportwang.com/school/elderly-welfare/bonus",
    },
  ],
});

const FAQ_ITEMS = [
  { question: "老人福利機構評鑑分幾大區塊、共幾項？", answer: "6 大區塊（個案服務、專業照護品質、人力資源、行政管理、安全環境設施、創新服務）共 77 項評鑑項目，另有加分題。" },
  { question: "個案服務區塊的評鑑重點是什麼？", answer: "入住評估（CGA 老年綜合評估）完整性、個別照顧計畫（ICP）是否每季更新、服務紀錄與 ICP 目標的對應性，以及家屬溝通紀錄。" },
  { question: "老人福利機構如何管理多職類評鑑文件？", answer: "依護理師、照服員、社工師、營養師建立職類標籤，各自管理對應文件，機構主任跨標籤彙整月報，評鑑前篩選備審標籤一次到位。" },
  { question: "如何用報告汪準備老人福利機構評鑑？", answer: "匯入老人福利機構評鑑範本，依 77 項基準分類建檔，AI 評鑑分析直接標示哪個區塊缺件，大幅減少評鑑前補件壓力。" },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/elderly-welfare"));

export default function ElderlyWelfarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">老人福利機構</Badge>
        <h1 className="text-2xl font-bold mb-3">老人福利機構評鑑基準總覽</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${elderlyWelfareMeta.year} 年度` },
            { label: "主管機關", value: elderlyWelfareMeta.agency },
            { label: "評鑑項目", value: `共 ${elderlyWelfareMeta.totalItems} 項` },
            { label: "評鑑區塊", value: "6 大區塊（含加分題）" },
          ]}
        />
        <SourceCallout meta={elderlyWelfareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed mt-2">
          以下為 115 年度老人福利機構評鑑指標，共 77 個評鑑項目，分為 6 大區塊（含加分題）。
          點擊各區塊可查看詳細說明、準備要訣與實用提示。
        </p>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {sectionMeta.map((sec) => {
          const section = elderlyWelfareProfile.sections.find((s) => s.shortCode === sec.shortCode);
          const Icon = sec.icon;
          return (
            <Link
              key={sec.href}
              href={sec.href}
              className="group rounded-xl border bg-card p-5 hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 rounded-lg p-2 ${sec.bgClass}`}>
                  <Icon className={`h-5 w-5 ${sec.textClass}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                    {sec.name}
                  </h2>
                  <p className="text-xs text-muted-foreground mb-3">{sec.itemRange}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {section?.items.slice(0, 4).map((item) => (
                      <span
                        key={item.id}
                        className="text-xs bg-muted rounded px-1.5 py-0.5 text-muted-foreground"
                      >
                        {item.title}
                      </span>
                    ))}
                    {(section?.items.length ?? 0) > 4 && (
                      <span className="text-xs text-muted-foreground px-1.5 py-0.5">
                        +{(section?.items.length ?? 0) - 4} 項
                      </span>
                    )}
                  </div>
                  <ArrowRightIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Full item list */}
      <div>
        <h2 className="text-lg font-semibold mb-4">全部 77 項評鑑項目</h2>
        <div className="space-y-6">
          {elderlyWelfareProfile.sections.map((section) => {
            const slug = sectionMeta.find((s) => s.shortCode === section.shortCode)?.href.split("/").at(-1);
            if (!slug) return null;
            return (
              <div key={section.shortCode}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.name}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/school/elderly-welfare/${slug}#item-${item.id}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors group"
                    >
                      <span className="shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-mono font-semibold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {item.id}
                      </span>
                      <span className="text-sm group-hover:text-primary transition-colors">
                        {item.title}
                      </span>
                      <Badge variant="outline" className="ml-auto text-xs shrink-0">
                        {item.responsible}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Download CTA */}
      <div className="mt-10 rounded-xl border border-dashed border-primary/30 bg-muted/50 p-5 text-center">
        <p className="text-sm font-semibold mb-1">📋 免費下載自我檢查表</p>
        <p className="text-sm text-muted-foreground mb-3">
          下載「老人福利機構」評鑑自我檢查表（Excel），對照評鑑基準逐項自我檢核。
        </p>
        <a
          href="/downloads/elderly-welfare.xlsx"
          download
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <DownloadIcon className="h-4 w-4" />
          免費下載 Excel 檢查表 →
        </a>
      </div>

      {/* Import CTA */}
      <div className="mt-10 rounded-xl bg-primary/5 border border-primary/20 p-5">
        <p className="text-sm font-semibold mb-1">看完評鑑基準了嗎？</p>
        <p className="text-sm text-muted-foreground mb-3">
          到報告汪一鍵匯入「老人福利機構」評鑑範本，包含 6 個標籤和 77 份報告範本，省去手動建立的時間。
        </p>
        <Link
          href="/docs/import-templates"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          了解如何匯入評鑑範本 →
        </Link>
      </div>

      <SchoolFaqSection items={FAQ_ITEMS} />
    </>
  );
}
