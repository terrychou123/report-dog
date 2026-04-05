import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { youthCareProfile } from "@/lib/ai/evaluation-profiles/youth-care";
import { Badge } from "@/components/ui/badge";
import {
  SettingsIcon,
  BuildingIcon,
  HeartPulseIcon,
  FileTextIcon,
  StarIcon,
  ArrowRightIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "兒少安置機構評鑑基準總覽｜112年度評鑑完整說明",
  description:
    "112年度兒童及少年安置機構評鑑指標完整說明，共35項目、5大區塊：行政組織與經營管理（10分）、建築物環境及設施設備（10分）、專業服務（60分）、財務管理（20分）及特殊事項或措施（±10分）。幫助機構社工、生輔人員、行政主管快速掌握評鑑重點。",
  keywords: [
    "兒少安置機構評鑑",
    "兒童及少年安置機構",
    "112年度評鑑",
    "兒童及少年福利機構評鑑",
    "安置機構評鑑基準",
    "兒少評鑑準備",
    "安置機構評鑑指標",
  ],
  alternates: { canonical: "https://reportwang.com/school/youth-care" },
  openGraph: {
    title: "兒少安置機構評鑑基準總覽｜評鑑小教室｜報告汪",
    description: "112年度兒少安置機構評鑑基準完整解說，掌握5大區塊評鑑重點，提升評鑑通過率。",
    url: "https://reportwang.com/school/youth-care",
  },
};

const sectionMeta = [
  {
    href: "/school/youth-care/administration",
    icon: SettingsIcon,
    name: "壹、行政組織與經營管理",
    shortCode: "管",
    itemRange: "項目 1–6・10分",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/youth-care/environment",
    icon: BuildingIcon,
    name: "貳、建築物環境及設施設備",
    shortCode: "環",
    itemRange: "項目 7–14・10分",
    bgClass: "bg-teal-500/10",
    textClass: "text-teal-600 dark:text-teal-400",
  },
  {
    href: "/school/youth-care/professional",
    icon: HeartPulseIcon,
    name: "參、專業服務",
    shortCode: "專",
    itemRange: "項目 15–28・60分",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/youth-care/finance",
    icon: FileTextIcon,
    name: "肆、財務管理",
    shortCode: "財",
    itemRange: "項目 29・20分",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/youth-care/innovation",
    icon: StarIcon,
    name: "伍、特殊事項或措施（含創新服務方案）",
    shortCode: "特",
    itemRange: "項目 30–35・±10分",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-600 dark:text-purple-400",
  },
];

const jsonLd = educationalContentJsonLd({
  type: "Course",
  name: "兒少安置機構評鑑基準",
  description:
    "112年度兒童及少年安置機構評鑑指標，共35項目、5大區塊完整解說。",
  path: "/school/youth-care",
  hasPart: sectionMeta.map((s) => ({
    name: s.name,
    url: `https://reportwang.com${s.href}`,
    description: s.itemRange,
  })),
});

export default function YouthCareSchoolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="prose prose-sm dark:prose-invert max-w-none mb-8">
        <h1 className="text-2xl font-bold mb-2">兒少安置機構評鑑基準</h1>
        <p className="text-muted-foreground">
          112年度兒童及少年安置機構評鑑指標，共 35 項目、5 大區塊。專業服務配分最重（60分），另含財務管理（20分）及特殊事項加減分（±10分），幫助機構人員系統性準備評鑑。
        </p>
      </div>

      {/* 配分總覽 */}
      <div className="mb-8 rounded-xl border bg-muted/20 p-4">
        <p className="text-xs font-semibold text-muted-foreground mb-3">各區塊配分</p>
        <div className="grid grid-cols-5 gap-2 text-center">
          {[
            { label: "壹 行政管理", score: "10分", color: "text-orange-600 dark:text-orange-400" },
            { label: "貳 環境設備", score: "10分", color: "text-teal-600 dark:text-teal-400" },
            { label: "參 專業服務", score: "60分", color: "text-blue-600 dark:text-blue-400" },
            { label: "肆 財務管理", score: "20分", color: "text-green-600 dark:text-green-400" },
            { label: "伍 特殊事項", score: "±10分", color: "text-purple-600 dark:text-purple-400" },
          ].map((item) => (
            <div key={item.label} className="rounded-lg bg-card border p-2.5">
              <div className={`text-base font-bold ${item.color}`}>{item.score}</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-tight">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {sectionMeta.map((section) => {
          const Icon = section.icon;
          const profileSection = youthCareProfile.sections.find(
            (s) => s.shortCode === section.shortCode
          );
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group relative rounded-xl border bg-card p-5 hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 rounded-lg ${section.bgClass} p-2`}>
                  <Icon className={`h-5 w-5 ${section.textClass}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                    {section.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">
                    {section.itemRange}
                  </p>
                  {/* Item chips preview */}
                  {profileSection && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {profileSection.items.slice(0, 4).map((item) => (
                        <span
                          key={item.id}
                          className={`text-xs px-2 py-0.5 rounded-full ${section.bgClass} ${section.textClass}`}
                        >
                          {item.id}. {item.title.length > 10 ? item.title.slice(0, 10) + "…" : item.title}
                        </span>
                      ))}
                      {profileSection.items.length > 4 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          +{profileSection.items.length - 4} 項
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {profileSection?.items.length ?? 0} 項基準
                    </Badge>
                    <ArrowRightIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Full item list */}
      <div className="mt-10 space-y-6">
        <h2 className="text-lg font-semibold">所有評鑑項目</h2>
        {youthCareProfile.sections.map((section) => {
          const meta = sectionMeta.find((m) => m.shortCode === section.shortCode);
          if (!meta) return null;
          return (
            <div key={section.name}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${meta.bgClass} ${meta.textClass}`}>
                  {section.shortCode}
                </span>
                <span className="text-sm font-medium">{section.name}</span>
              </div>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {section.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`${meta.href}#item-${item.id}`}
                    className="flex items-center gap-2.5 rounded-lg border bg-card px-3 py-2 hover:border-primary/40 hover:bg-muted/40 transition-colors"
                  >
                    <span className={`w-7 h-7 rounded-full ${meta.bgClass} flex items-center justify-center text-xs font-bold ${meta.textClass} font-mono shrink-0`}>
                      {item.id}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.responsible}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Import Templates CTA */}
      <div className="mt-10 rounded-xl bg-primary/5 border border-primary/20 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="shrink-0 rounded-xl bg-primary/10 p-3">
            <DownloadIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold mb-1">一鍵匯入兒少安置機構評鑑範本</h2>
            <p className="text-sm text-muted-foreground">
              學完評鑑基準後，到報告汪一鍵匯入兒少安置機構的標籤與報告範本（含個案輔導目標、服務品質、資源結合等評鑑項目），AI 協助填寫內容，省去手動建立的時間。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
