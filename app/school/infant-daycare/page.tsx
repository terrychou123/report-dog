import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { infantDaycareProfile } from "@/lib/ai/evaluation-profiles/infant-daycare";
import { Badge } from "@/components/ui/badge";
import {
  SettingsIcon,
  BabyIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "托嬰中心評鑑準備指南｜114-116年度 60 項評鑑基準完整說明",
  description:
    "臺北市114-116年度托嬰中心評鑑指標完整說明，共60項目、3大區塊：行政管理（20分）、托育活動（40分）、健康安全（40分）。幫助托嬰中心負責人、托育人員及行政人員快速掌握評鑑重點，提升評鑑準備效率。",
  keywords: [
    "托嬰中心評鑑",
    "臺北市托嬰中心評鑑",
    "114年托嬰中心評鑑",
    "114-116年度托嬰中心評鑑指標",
    "托嬰中心評鑑基準",
    "托嬰中心自評表",
    "嬰幼兒照護評鑑",
    "托育評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/infant-daycare" },
  openGraph: {
    title: "托嬰中心評鑑準備指南｜114-116年度 60 項評鑑基準｜報告汪",
    description:
      "臺北市114-116年度托嬰中心評鑑指標60項完整解說，行政管理、托育活動、健康安全三大區塊，快速掌握評鑑重點。",
    url: "https://reportwang.com/school/infant-daycare",
  },
};

const sectionMeta = [
  {
    href: "/school/infant-daycare/administration",
    icon: SettingsIcon,
    name: "一、行政管理",
    itemRange: "項目 1–11",
    score: "20 分",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
    sectionIndices: [0, 1, 2, 3, 4],
  },
  {
    href: "/school/infant-daycare/childcare-activities",
    icon: BabyIcon,
    name: "二、托育活動",
    itemRange: "項目 12–36",
    score: "40 分",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
    sectionIndices: [5, 6, 7, 8],
  },
  {
    href: "/school/infant-daycare/health-safety",
    icon: ShieldCheckIcon,
    name: "三、健康安全",
    itemRange: "項目 37–60",
    score: "40 分",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
    sectionIndices: [9, 10, 11, 12, 13],
  },
];

const jsonLd = educationalContentJsonLd({
  type: "Course",
  name: "托嬰中心評鑑基準",
  description:
    "臺北市114-116年度托嬰中心評鑑指標，共60項目、3大區塊完整解說。",
  path: "/school/infant-daycare",
  hasPart: sectionMeta.map((s) => ({
    name: s.name,
    url: `https://reportwang.com${s.href}`,
    description: `${s.itemRange}，配分 ${s.score}`,
  })),
});

// Color mapping by section index
function getSectionColor(idx: number) {
  if (idx <= 4) return { bgClass: "bg-orange-500/10", textClass: "text-orange-600 dark:text-orange-400" };
  if (idx <= 8) return { bgClass: "bg-blue-500/10", textClass: "text-blue-600 dark:text-blue-400" };
  return { bgClass: "bg-green-500/10", textClass: "text-green-600 dark:text-green-400" };
}

function getMajorHref(idx: number) {
  if (idx <= 4) return "/school/infant-daycare/administration";
  if (idx <= 8) return "/school/infant-daycare/childcare-activities";
  return "/school/infant-daycare/health-safety";
}

export default function InfantDaycareSchoolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="prose prose-sm dark:prose-invert max-w-none mb-8">
        <h1 className="text-2xl font-bold mb-2">托嬰中心評鑑基準</h1>
        <p className="text-muted-foreground">
          臺北市114-116年度托嬰中心評鑑指標，共 60 項目、3 大區塊。涵蓋行政管理（20分）、托育活動（40分）及健康安全（40分），幫助托嬰中心負責人、托育人員及行政人員系統性備戰評鑑。
        </p>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {sectionMeta.map((section) => {
          const Icon = section.icon;
          const items = section.sectionIndices.flatMap(
            (i) => infantDaycareProfile.sections[i].items
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
                  <div className="flex flex-wrap gap-1 mb-3">
                    {items.slice(0, 3).map((item) => (
                      <span
                        key={item.id}
                        className={`text-xs px-2 py-0.5 rounded-full ${section.bgClass} ${section.textClass}`}
                      >
                        {item.id}. {item.title.length > 8 ? item.title.slice(0, 8) + "…" : item.title}
                      </span>
                    ))}
                    {items.length > 3 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        +{items.length - 3} 項
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {items.length} 項 ／ {section.score}
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
        {infantDaycareProfile.sections.map((section, sIdx) => {
          const { bgClass, textClass } = getSectionColor(sIdx);
          const href = getMajorHref(sIdx);
          return (
            <div key={section.name}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${bgClass} ${textClass}`}>
                  {section.shortCode}
                </span>
                <span className="text-sm font-medium">{section.name}</span>
              </div>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {section.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`${href}#item-${item.id}`}
                    className="flex items-center gap-2.5 rounded-lg border bg-card px-3 py-2 hover:border-primary/40 hover:bg-muted/40 transition-colors"
                  >
                    <span className={`w-7 h-7 rounded-full ${bgClass} flex items-center justify-center text-xs font-bold ${textClass} font-mono shrink-0`}>
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
            <h2 className="text-base font-semibold mb-1">一鍵匯入托嬰中心評鑑範本</h2>
            <p className="text-sm text-muted-foreground">
              學完評鑑基準後，到報告汪一鍵匯入托嬰中心的標籤與報告範本（60 個評鑑項目，含寶寶日誌、健康紀錄、給藥委託單、食物樣品管理表等），AI 協助填寫內容，省去手動建立的時間。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
