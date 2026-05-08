import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { hospitalProfile, meta as hospitalMeta } from "@/lib/ai/evaluation-profiles/hospital";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import {
  SettingsIcon,
  UsersIcon,
  UserCheckIcon,
  FileTextIcon,
  ShieldIcon,
  HeartHandshakeIcon,
  AlertTriangleIcon,
  ShieldCheckIcon,
  ActivityIcon,
  StethoscopeIcon,
  SparklesIcon,
  PillIcon,
  SyringeIcon,
  BugIcon,
  FlaskConicalIcon,
  ArrowRightIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "醫院評鑑小教室｜115年度醫院評鑑基準（區域醫院、地區醫院）｜報告汪",
  description:
    "115 年度衛生福利部醫院評鑑基準完整解說，共 2 篇、15 章、124 條，適用區域醫院及地區醫院。含必要、重點、試評、可免評條文分類說明，幫助醫院管理人員快速掌握評鑑重點。",
  keywords: [
    "醫院評鑑",
    "區域醫院評鑑",
    "地區醫院評鑑",
    "115年度醫院評鑑基準",
    "醫院評鑑基準及評量項目",
    "衛生福利部醫院評鑑",
    "評鑑小教室",
    "醫療法第28條",
  ],
  alternates: { canonical: "https://reportwang.com/school/hospital" },
  openGraph: {
    title: "醫院評鑑小教室｜115年度醫院評鑑基準｜報告汪",
    description: "124 條醫院評鑑基準完整解說（區域醫院、地區醫院適用），掌握評鑑重點，提升通過率。",
    url: "https://reportwang.com/school/hospital",
  },
};

const sectionMeta = [
  {
    href: "/school/hospital/strategy",
    icon: SettingsIcon,
    name: "1.1 醫院經營策略",
    shortCode: "1.1",
    itemRange: "項目 1–5",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/hospital/staff-support",
    icon: UsersIcon,
    name: "1.2 員工管理與支持制度",
    shortCode: "1.2",
    itemRange: "項目 6–12",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/hospital/human-resources",
    icon: UserCheckIcon,
    name: "1.3 人力資源管理",
    shortCode: "1.3",
    itemRange: "項目 13–22",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/hospital/medical-records",
    icon: FileTextIcon,
    name: "1.4 病歷、資訊與溝通管理",
    shortCode: "1.4",
    itemRange: "項目 23–26",
    bgClass: "bg-teal-500/10",
    textClass: "text-teal-600 dark:text-teal-400",
  },
  {
    href: "/school/hospital/safety-environment",
    icon: ShieldIcon,
    name: "1.5 安全的環境與設備",
    shortCode: "1.5",
    itemRange: "項目 27–33",
    bgClass: "bg-indigo-500/10",
    textClass: "text-indigo-600 dark:text-indigo-400",
  },
  {
    href: "/school/hospital/patient-services",
    icon: HeartHandshakeIcon,
    name: "1.6 病人導向之服務與管理",
    shortCode: "1.6",
    itemRange: "項目 34–37",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-600 dark:text-purple-400",
  },
  {
    href: "/school/hospital/risk-management",
    icon: AlertTriangleIcon,
    name: "1.7 風險與危機管理",
    shortCode: "1.7",
    itemRange: "項目 38–42",
    bgClass: "bg-rose-500/10",
    textClass: "text-rose-600 dark:text-rose-400",
  },
  {
    href: "/school/hospital/patient-rights",
    icon: ShieldCheckIcon,
    name: "2.1 病人及家屬權責",
    shortCode: "2.1",
    itemRange: "項目 43–46",
    bgClass: "bg-amber-500/10",
    textClass: "text-amber-600 dark:text-amber-400",
  },
  {
    href: "/school/hospital/care-quality",
    icon: ActivityIcon,
    name: "2.2 醫療照護品質與安全管理",
    shortCode: "2.2",
    itemRange: "項目 47–49",
    bgClass: "bg-emerald-500/10",
    textClass: "text-emerald-600 dark:text-emerald-400",
  },
  {
    href: "/school/hospital/care-execution",
    icon: StethoscopeIcon,
    name: "2.3 醫療照護之執行與評估",
    shortCode: "2.3",
    itemRange: "項目 50–65",
    bgClass: "bg-sky-500/10",
    textClass: "text-sky-600 dark:text-sky-400",
  },
  {
    href: "/school/hospital/special-care",
    icon: SparklesIcon,
    name: "2.4 特殊照護服務",
    shortCode: "2.4",
    itemRange: "項目 66–89",
    bgClass: "bg-cyan-500/10",
    textClass: "text-cyan-600 dark:text-cyan-400",
  },
  {
    href: "/school/hospital/medication-safety",
    icon: PillIcon,
    name: "2.5 用藥安全",
    shortCode: "2.5",
    itemRange: "項目 90–98",
    bgClass: "bg-violet-500/10",
    textClass: "text-violet-600 dark:text-violet-400",
  },
  {
    href: "/school/hospital/anesthesia-surgery",
    icon: SyringeIcon,
    name: "2.6 麻醉與手術",
    shortCode: "2.6",
    itemRange: "項目 99–107",
    bgClass: "bg-fuchsia-500/10",
    textClass: "text-fuchsia-600 dark:text-fuchsia-400",
  },
  {
    href: "/school/hospital/infection-control",
    icon: BugIcon,
    name: "2.7 感染管制",
    shortCode: "2.7",
    itemRange: "項目 108–110",
    bgClass: "bg-red-500/10",
    textClass: "text-red-600 dark:text-red-400",
  },
  {
    href: "/school/hospital/lab-pathology",
    icon: FlaskConicalIcon,
    name: "2.8 檢驗、病理與放射作業",
    shortCode: "2.8",
    itemRange: "項目 111–124",
    bgClass: "bg-lime-500/10",
    textClass: "text-lime-600 dark:text-lime-400",
  },
];

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "115 年度醫院評鑑基準",
  description:
    "衛生福利部 115 年度醫院評鑑基準及評量項目（區域醫院、地區醫院適用），共 124 條、15 章完整解說。",
  path: "/school/hospital",
  hasPart: sectionMeta.map((s) => ({
    name: `${s.name}（${s.itemRange}）`,
    url: `https://reportwang.com${s.href}`,
  })),
});

const FAQ_ITEMS = [
  { question: "醫院評鑑涵蓋哪幾大面向？", answer: "醫院評鑑涵蓋策略管理、病人服務、人力資源、安全環境、感染管制、藥物安全、醫療紀錄等 15 大面向，共 124 條評鑑基準。" },
  { question: "護理部在醫院評鑑中的主要職責是什麼？", answer: "護理部主要負責照護品質面向的評核，包括護理評估、護理計畫、護理紀錄完整性，以及跌倒、壓傷、約束等品質指標的持續監測記錄。" },
  { question: "如何有效整理評鑑備審的護理文書？", answer: "建立班別標籤（白班、小夜、大夜）及「評鑑備審」標籤群組，日常文書貼上對應標籤，評鑑前篩選即可全數到位，達到零補件目標。" },
  { question: "感染管制文件應如何準備評鑑？", answer: "感控文件包含手部衛生稽核記錄、多重抗藥菌監測、侵入性治療感染率統計，建議依基準建立獨立標籤，每月定期歸檔，避免評鑑前臨時補件。" },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/hospital"));

function SectionGrid({
  sections,
  className,
}: {
  sections: typeof sectionMeta;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {sections.map((sec) => {
        const section = hospitalProfile.sections.find((s) => s.shortCode === sec.shortCode);
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
                <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                  {sec.name}
                </h3>
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
  );
}

export default function HospitalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">醫院評鑑</Badge>
        <h1 className="text-2xl font-bold mb-3">醫院評鑑基準總覽</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${hospitalMeta.year} 年度` },
            { label: "主管機關", value: hospitalMeta.agency },
            { label: "評鑑項目", value: `共 ${hospitalMeta.totalItems} 條` },
            { label: "法源依據", value: hospitalMeta.legalBasis ?? "" },
          ]}
        />
        <SourceCallout meta={hospitalMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed mt-2">
          以下為衛生福利部依醫療法第 28 條辦理之「115 年度醫院評鑑基準及評量項目」，
          共 2 篇、15 章、124 條，適用區域醫院及地區醫院。
          點擊各章節可查看詳細說明、準備要訣與實用提示。
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 border-0">必要 10 條</Badge>
          <Badge className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0">重點 5 條（示意）</Badge>
          <Badge variant="outline" className="text-xs">試評 4 條</Badge>
          <Badge variant="secondary" className="text-xs">可免評 59 條</Badge>
        </div>
      </div>

      {/* Part 1 */}
      <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        第一篇 經營管理（7 章）
      </h2>
      <SectionGrid sections={sectionMeta.slice(0, 7)} className="mb-8" />

      {/* Part 2 */}
      <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        第二篇 醫療照護（8 章）
      </h2>
      <SectionGrid sections={sectionMeta.slice(7)} className="mb-10" />

      {/* Full item list */}
      <div>
        <h2 className="text-lg font-semibold mb-4">全部 124 項評鑑項目</h2>
        <div className="space-y-6">
          {hospitalProfile.sections.map((section) => {
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
                      href={`/school/hospital/${slug}#item-${item.id}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors group"
                    >
                      <span className="shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-mono font-semibold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {item.id}
                      </span>
                      <span className="text-sm group-hover:text-primary transition-colors flex-1">
                        {item.title}
                      </span>
                      {item.category && item.category !== "一般" && (
                        <Badge
                          variant={item.category === "可免評" ? "secondary" : "outline"}
                          className="text-xs shrink-0"
                        >
                          {item.category}
                        </Badge>
                      )}
                      <Badge variant="outline" className="ml-auto text-xs shrink-0 hidden sm:inline-flex">
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
          下載「醫院評鑑」自我檢查表（Excel），對照評鑑基準逐項自我檢核。
        </p>
        <a
          href="/downloads/hospital.xlsx"
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
          到報告汪一鍵匯入「醫院」評鑑範本，包含 15 個標籤和 124 份報告範本，省去手動建立的時間。
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
