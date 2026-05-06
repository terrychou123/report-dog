import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { nursingHomeProfile, meta as nursingHomeMeta } from "@/lib/ai/evaluation-profiles/nursing-home";
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
  ArrowRightIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "住宿型照顧機構評鑑基準總覽",
  description:
    "115 年度住宿式長期照顧服務機構績效考核指標完整說明，共 63 項目、4 大區塊：經營管理效能、專業照護品質、安全環境設備、個案權益保障，另有加減分項目 3 項。",
  keywords: [
    "住宿型長照評鑑",
    "安養機構評鑑",
    "長照機構評鑑基準",
    "115年度評鑑",
    "老人安養評鑑",
    "住宿式長期照顧評鑑",
    "住宿型照顧機構評鑑指標",
  ],
  alternates: { canonical: "https://reportwang.com/school/nursing-home" },
  openGraph: {
    title: "住宿型照顧機構評鑑基準總覽｜評鑑小教室｜報告汪",
    description: "63 項住宿型照顧機構評鑑基準完整解說（115年度全國版），掌握評鑑重點，提升評鑑通過率。",
    url: "https://reportwang.com/school/nursing-home",
  },
};

const sectionMeta = [
  {
    href: "/school/nursing-home/management",
    icon: SettingsIcon,
    name: "A、經營管理效能",
    shortCode: "管",
    itemRange: "項目 1–9（9項）",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/nursing-home/professional-quality",
    icon: HeartPulseIcon,
    name: "B、專業照護品質",
    shortCode: "專",
    itemRange: "項目 10–38（29項）",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/nursing-home/safety-environment",
    icon: ShieldIcon,
    name: "C、安全環境設備",
    shortCode: "安",
    itemRange: "項目 39–54（16項）",
    bgClass: "bg-teal-500/10",
    textClass: "text-teal-600 dark:text-teal-400",
  },
  {
    href: "/school/nursing-home/client-rights",
    icon: ShieldCheckIcon,
    name: "D、個案權益保障",
    shortCode: "權",
    itemRange: "項目 55–63（9項）",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/nursing-home/innovation",
    icon: StarIcon,
    name: "加減分項目",
    shortCode: "創",
    itemRange: "項目 64–66（3項）",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-600 dark:text-purple-400",
  },
];

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "住宿型照顧機構評鑑基準",
  description:
    "115 年度住宿式長期照顧服務機構績效考核指標，共 63 項目 + 加減分 3 項，4 大區塊完整解說。",
  path: "/school/nursing-home",
  hasPart: [
    {
      name: "A、經營管理效能（項目 1–9）",
      url: "https://reportwang.com/school/nursing-home/management",
    },
    {
      name: "B、專業照護品質（項目 10–38）",
      url: "https://reportwang.com/school/nursing-home/professional-quality",
    },
    {
      name: "C、安全環境設備（項目 39–54）",
      url: "https://reportwang.com/school/nursing-home/safety-environment",
    },
    {
      name: "D、個案權益保障（項目 55–63）",
      url: "https://reportwang.com/school/nursing-home/client-rights",
    },
    {
      name: "加減分項目（項目 64–66）",
      url: "https://reportwang.com/school/nursing-home/innovation",
    },
  ],
});

const regularItemCount = nursingHomeProfile.sections
  .filter((s) => s.shortCode !== "創")
  .flatMap((s) => s.items).length;
const bonusItemCount = nursingHomeProfile.sections
  .filter((s) => s.shortCode === "創")
  .flatMap((s) => s.items).length;

const FAQ_ITEMS = [
  {
    question: "住宿型照顧機構評鑑分哪幾大區塊、共幾項？",
    answer: `分 4 大區塊（A 經營管理效能、B 專業照護品質、C 安全環境設備、D 個案權益保障）共 ${regularItemCount} 項正式評鑑項目，另有加減分 3 項（加分 2 項、扣分 1 項）。適用 115 年度衛生福利部全國版基準，相對 114 年度大幅精簡合併。`,
  },
  {
    question: "住宿型機構評鑑中最需要注意的文件是哪些？",
    answer: "重點文件包括：工作手冊與員工申訴辦法（A1/A2）、業務計畫書及前次評鑑缺失改善記錄（A3/A4）、護理師及照服員設置資格佐證（A8）、在職教育訓練出席記錄（A9）；護理照護及用藥安全紀錄（B 區塊）；消防設備檢修報告及 EOP 演練記錄（C9/C11）；入住契約（審閱期至少 5 天，D2）及申訴機制紀錄（D4）。",
  },
  {
    question: "多職類協作下，評鑑文件如何分工管理？",
    answer: "依護理師、照服員、社工師、營養師分別建立標籤，各職類文件自動歸位，機構主任可跨標籤彙整。評鑑前篩選「評鑑備審」標籤，避免文件散落找不到。",
  },
  {
    question: "如何用報告汪準備住宿型機構評鑑備審？",
    answer: `一鍵匯入住宿型評鑑範本後，可按 A/B/C/D 四大區塊分標籤管理，AI 逐項對應 ${regularItemCount} 項基準分析文件缺漏，直接標示哪個區塊需要補件，大幅減少評鑑前的臨時補件壓力。`,
  },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/nursing-home"));

export default function NursingHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">住宿型照顧機構</Badge>
        <h1 className="text-2xl font-bold mb-3">住宿型照顧機構評鑑基準總覽</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${nursingHomeMeta.year} 年度` },
            { label: "主管機關", value: nursingHomeMeta.agency },
            { label: "評鑑項目", value: `共 ${regularItemCount} 正式項 + 加減分 ${bonusItemCount} 項` },
            { label: "評鑑區塊", value: "4 大區塊" },
          ]}
        />
        <SourceCallout meta={nursingHomeMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed mt-2">
          以下為 115 年度住宿式長期照顧服務機構績效考核指標（衛生福利部全國版），共 63 個評鑑項目 + 加減分 3 項，分為 4 大區塊。
          點擊各區塊可查看詳細說明、準備要訣與實用提示。
        </p>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {sectionMeta.map((sec) => {
          const section = nursingHomeProfile.sections.find((s) => s.shortCode === sec.shortCode);
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
        <h2 className="text-lg font-semibold mb-4">全部 {regularItemCount} 項評鑑項目 + 加減分</h2>
        <div className="space-y-6">
          {nursingHomeProfile.sections.map((section) => {
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
                      href={`/school/nursing-home/${slug}#item-${item.id}`}
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
          下載「住宿型長照機構」評鑑自我檢查表（Excel），對照評鑑基準逐項自我檢核。
        </p>
        <a
          href="/downloads/residential.xlsx"
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
          到報告汪一鍵匯入「住宿型照顧機構」評鑑範本，包含 4 個標籤和 {regularItemCount} 份報告範本，省去手動建立的時間。
        </p>
        <Link
          href="/docs/import-templates"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          了解如何匯入評鑑範本 →
        </Link>
      </div>

      {/* /residential 互連 */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        想了解住宿型長照機構的文書管理系統？{" "}
        <Link href="/residential" className="text-primary hover:underline font-medium">
          前往住宿型機構服務介紹 →
        </Link>
      </p>

      <SchoolFaqSection items={FAQ_ITEMS} />
    </>
  );
}
