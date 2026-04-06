import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { disabilityWelfareProfile } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { Badge } from "@/components/ui/badge";
import {
  SettingsIcon,
  ShieldCheckIcon,
  HeartPulseIcon,
  ArrowRightIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "身心障礙福利機構評鑑小教室｜109年度｜報告汪",
  description:
    "109年度身心障礙福利機構評鑑指標完整解說，共3大區塊49項目，涵蓋行政組織及經營管理、環境設施及安全維護、專業服務，幫助身心障礙機構管理人員掌握評鑑重點。",
  keywords: [
    "身心障礙福利機構評鑑",
    "身心障礙機構評鑑基準",
    "109年度身障機構評鑑",
    "身心障礙機構",
    "身心障礙福利機構",
    "評鑑小教室",
    "長照機構評鑑",
    "社家署評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/disability-welfare" },
  openGraph: {
    title: "身心障礙福利機構評鑑小教室｜109年度｜報告汪",
    description:
      "49 項身心障礙福利機構評鑑指標完整解說，掌握評鑑重點，提升評鑑通過率。",
    url: "https://reportwang.com/school/disability-welfare",
  },
};

// 區塊頁面對應設定
const sectionMeta = [
  {
    href: "/school/disability-welfare/administration",
    icon: SettingsIcon,
    name: "一、行政組織及經營管理（含會計及財務管理）",
    shortCode: "行",
    itemRange: "項目 1–11",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/disability-welfare/environment",
    icon: ShieldCheckIcon,
    name: "二、環境設施及安全維護",
    shortCode: "環",
    itemRange: "項目 12–31（含5項不計分）",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/disability-welfare/professional",
    icon: HeartPulseIcon,
    name: "三、專業服務",
    shortCode: "專",
    itemRange: "項目 32–49",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-600 dark:text-purple-400",
  },
];

const jsonLd = educationalContentJsonLd({
  type: "Course",
  name: "109年度身心障礙福利機構評鑑指標",
  description:
    "109年度身心障礙福利機構評鑑指標，共 49 項目、3 大區塊完整解說。",
  path: "/school/disability-welfare",
  hasPart: [
    {
      name: "一、行政組織及經營管理（項目 1–11）",
      url: "https://reportwang.com/school/disability-welfare/administration",
    },
    {
      name: "二、環境設施及安全維護（項目 12–31）",
      url: "https://reportwang.com/school/disability-welfare/environment",
    },
    {
      name: "三、專業服務（項目 32–49）",
      url: "https://reportwang.com/school/disability-welfare/professional",
    },
  ],
});

export default function DisabilityWelfarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">
          身心障礙福利機構｜109年度
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          身心障礙福利機構評鑑指標總覽
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          以下為衛福部社家署「109年度身心障礙福利機構評鑑指標」，共 49
          個評鑑項目（含 5 項不計分新增指標），分為 3
          大區塊。點擊各區塊可查看詳細說明、準備要訣與實用提示。
        </p>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {sectionMeta.map((sec) => {
          const section = disabilityWelfareProfile.sections.find(
            (s) => s.shortCode === sec.shortCode,
          );
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
                  <p className="text-xs text-muted-foreground mb-3">
                    {sec.itemRange}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {section?.items.slice(0, 4).map((item) => (
                      <span
                        key={item.id}
                        className="text-xs bg-muted rounded px-1.5 py-0.5 text-muted-foreground"
                      >
                        {item.title.length > 10
                          ? item.title.slice(0, 10) + "…"
                          : item.title}
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
        <h2 className="text-lg font-semibold mb-4">全部 49 項評鑑項目</h2>
        <div className="space-y-6">
          {disabilityWelfareProfile.sections.map((section) => {
            const meta = sectionMeta.find(
              (s) => s.shortCode === section.shortCode,
            );
            if (!meta) return null;
            return (
              <div key={section.shortCode}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.name}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.id}
                      href={`${meta.href}#item-${item.id}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors group"
                    >
                      <span className="shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-mono font-semibold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {item.id}
                      </span>
                      <span className="text-sm group-hover:text-primary transition-colors flex-1 min-w-0 truncate">
                        {item.score === 0 && (
                          <Badge
                            variant="outline"
                            className="text-xs mr-1.5 shrink-0"
                          >
                            不計分
                          </Badge>
                        )}
                        {item.title}
                      </span>
                      <Badge
                        variant="outline"
                        className="ml-auto text-xs shrink-0"
                      >
                        {item.score > 0 ? `${item.score}分` : "不計分"}
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
        <p className="text-sm font-semibold mb-1">
          📋 免費下載自我檢查表
        </p>
        <p className="text-sm text-muted-foreground mb-3">
          下載「身心障礙福利機構」評鑑自我檢查表（Excel），對照 109
          年度評鑑指標逐項自我檢核。
        </p>
        <a
          href="/downloads/disability-welfare.xlsx"
          download
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <DownloadIcon className="h-4 w-4" />
          免費下載 Excel 檢查表 →
        </a>
      </div>

      {/* Import CTA */}
      <div className="mt-10 rounded-xl bg-primary/5 border border-primary/20 p-5">
        <p className="text-sm font-semibold mb-1">看完評鑑指標了嗎？</p>
        <p className="text-sm text-muted-foreground mb-3">
          到報告汪一鍵匯入「身心障礙福利機構」評鑑範本，包含 3 個標籤和 49
          份報告範本，省去手動建立的時間。
        </p>
        <Link
          href="/docs/import-templates"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          了解如何匯入評鑑範本 →
        </Link>
      </div>
    </>
  );
}
