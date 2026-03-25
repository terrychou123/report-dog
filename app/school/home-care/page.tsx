import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { homeCareProfile } from "@/lib/ai/evaluation-profiles/home-care";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheckIcon,
  HeartPulseIcon,
  SettingsIcon,
  StarIcon,
  ArrowRightIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "居家服務機構評鑑基準總覽",
  description:
    "115 年度臺北市政府社會局居家服務機構評鑑基準完整說明，共 32 項目、4 大區塊：個案權益保障、專業照護品質、經營管理效能與加分題。",
  keywords: [
    "居家服務機構評鑑基準",
    "居服評鑑項目",
    "居家服務評鑑準備",
    "臺北市居家服務評鑑",
    "115年度評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/home-care" },
  openGraph: {
    title: "居家服務機構評鑑基準總覽｜評鑑小教室｜報告汪",
    description: "32 項居家服務機構評鑑基準完整解說，掌握評鑑重點，提升評鑑通過率。",
    url: "https://reportwang.com/school/home-care",
  },
};

const sectionMeta = [
  {
    href: "/school/home-care/client-rights",
    icon: ShieldCheckIcon,
    name: "壹、個案權益保障",
    shortCode: "權",
    itemRange: "項目 1–4",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/home-care/professional-quality",
    icon: HeartPulseIcon,
    name: "貳、專業照護品質",
    shortCode: "專",
    itemRange: "項目 5–14",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/home-care/management",
    icon: SettingsIcon,
    name: "參、經營管理效能",
    shortCode: "管",
    itemRange: "項目 15–30",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/home-care/bonus",
    icon: StarIcon,
    name: "加分題",
    shortCode: "加",
    itemRange: "項目 31–32",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
];

const jsonLd = educationalContentJsonLd({
  type: "Course",
  name: "居家服務機構評鑑基準",
  description:
    "115 年度臺北市政府社會局居家服務機構評鑑基準，共 32 項目、4 大區塊完整解說。",
  path: "/school/home-care",
  hasPart: [
    {
      name: "壹、個案權益保障（項目 1–4）",
      url: "https://reportwang.com/school/home-care/client-rights",
    },
    {
      name: "貳、專業照護品質（項目 5–14）",
      url: "https://reportwang.com/school/home-care/professional-quality",
    },
    {
      name: "參、經營管理效能（項目 15–30）",
      url: "https://reportwang.com/school/home-care/management",
    },
    {
      name: "加分題（項目 31–32）",
      url: "https://reportwang.com/school/home-care/bonus",
    },
  ],
});

export default function HomeCarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">居家服務機構</Badge>
        <h1 className="text-2xl font-bold mb-3">居家服務機構評鑑基準總覽</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          以下為 115 年度臺北市政府社會局居家服務機構評鑑基準，共 32 個評鑑項目，分為 4 大區塊。
          點擊各區塊可查看詳細說明、準備要訣與實用提示。
        </p>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {sectionMeta.map((sec) => {
          const section = homeCareProfile.sections.find((s) => s.shortCode === sec.shortCode);
          const Icon = sec.icon;
          return (
            <Link
              key={sec.href}
              href={sec.href}
              className="group rounded-xl border bg-card p-5 hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 rounded-lg p-2 ${sec.color.split(" ")[0]}`}>
                  <Icon className={`h-5 w-5 ${sec.iconColor}`} />
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
        <h2 className="text-lg font-semibold mb-4">全部 32 項評鑑項目</h2>
        <div className="space-y-6">
          {homeCareProfile.sections.map((section) => {
            return (
              <div key={section.shortCode}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.name}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const slugMap: Record<string, string> = {
                      "權": "client-rights",
                      "專": "professional-quality",
                      "管": "management",
                      "加": "bonus",
                    };
                    const slug = slugMap[section.shortCode];
                    return (
                      <Link
                        key={item.id}
                        href={`/school/home-care/${slug}#item-${item.id}`}
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
                    );
                  })}
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
          下載「居家長照機構」評鑑自我檢查表（Excel），對照評鑑基準逐項自我檢核。
        </p>
        <a
          href="/downloads/home-care.xlsx"
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
          到報告汪一鍵匯入「居家服務機構」評鑑範本，包含 4 個標籤和 32 份報告範本，省去手動建立的時間。
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
