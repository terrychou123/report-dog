import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { daycareProfile } from "@/lib/ai/evaluation-profiles/daycare";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheckIcon,
  HeartPulseIcon,
  SettingsIcon,
  ShieldIcon,
  ArrowRightIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "日間照顧機構評鑑基準總覽",
  description:
    "113 年度臺北市政府社會局日間照顧機構評鑑基準完整說明，共 43 項目、4 大區塊：個案權益保障、專業照護品質、經營管理效能與安全環境設備。",
  keywords: [
    "日間照顧機構評鑑基準",
    "日照中心評鑑",
    "日間照顧評鑑準備",
    "臺北市日照評鑑",
    "日間照顧中心評鑑基準",
    "113年度評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/daycare" },
  openGraph: {
    title: "日間照顧機構評鑑基準總覽｜評鑑小教室｜報告汪",
    description: "43 項日間照顧機構評鑑基準完整解說，掌握評鑑重點，提升評鑑通過率。",
    url: "https://reportwang.com/school/daycare",
  },
};

const sectionMeta = [
  {
    href: "/school/daycare/client-rights",
    icon: ShieldCheckIcon,
    name: "壹、個案權益保障",
    shortCode: "權",
    itemRange: "項目 1–4",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/daycare/professional-quality",
    icon: HeartPulseIcon,
    name: "貳、專業照護品質",
    shortCode: "專",
    itemRange: "項目 5–22",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/daycare/management",
    icon: SettingsIcon,
    name: "參、經營管理效能",
    shortCode: "管",
    itemRange: "項目 23–37",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/daycare/safety-environment",
    icon: ShieldIcon,
    name: "肆、安全環境設備",
    shortCode: "安",
    itemRange: "項目 38–43",
    bgClass: "bg-teal-500/10",
    textClass: "text-teal-600 dark:text-teal-400",
  },
];

const jsonLd = educationalContentJsonLd({
  type: "Course",
  name: "日間照顧機構評鑑基準",
  description:
    "113 年度臺北市政府社會局日間照顧機構評鑑基準，共 43 項目、4 大區塊完整解說。",
  path: "/school/daycare",
  hasPart: [
    {
      name: "壹、個案權益保障（項目 1–4）",
      url: "https://reportwang.com/school/daycare/client-rights",
    },
    {
      name: "貳、專業照護品質（項目 5–22）",
      url: "https://reportwang.com/school/daycare/professional-quality",
    },
    {
      name: "參、經營管理效能（項目 23–37）",
      url: "https://reportwang.com/school/daycare/management",
    },
    {
      name: "肆、安全環境設備（項目 38–43）",
      url: "https://reportwang.com/school/daycare/safety-environment",
    },
  ],
});

export default function DaycarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">日間照顧機構</Badge>
        <h1 className="text-2xl font-bold mb-3">日間照顧機構評鑑基準總覽</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          以下為 113 年度臺北市政府社會局日間照顧機構評鑑基準，共 43 個評鑑項目，分為 4 大區塊。
          點擊各區塊可查看詳細說明、準備要訣與實用提示。
        </p>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {sectionMeta.map((sec) => {
          const section = daycareProfile.sections.find((s) => s.shortCode === sec.shortCode);
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
        <h2 className="text-lg font-semibold mb-4">全部 43 項評鑑項目</h2>
        <div className="space-y-6">
          {daycareProfile.sections.map((section) => {
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
                      href={`/school/daycare/${slug}#item-${item.id}`}
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

      {/* Import CTA */}
      <div className="mt-10 rounded-xl bg-primary/5 border border-primary/20 p-5">
        <p className="text-sm font-semibold mb-1">看完評鑑基準了嗎？</p>
        <p className="text-sm text-muted-foreground mb-3">
          到報告汪一鍵匯入「日間照顧機構」評鑑範本，包含 4 個標籤和 43 份報告範本，省去手動建立的時間。
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
