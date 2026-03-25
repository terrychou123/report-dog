import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { disabilityWelfareProfile } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheckIcon,
  HeartPulseIcon,
  SettingsIcon,
  ShieldIcon,
  StarIcon,
  BuildingIcon,
  ArrowRightIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "身心障礙福利機構評鑑小教室｜報告汪",
  description:
    "身心障礙福利機構專業服務品質與經營管理標準指引完整解說，共6大區塊35項目，幫助身心障礙機構管理人員掌握評鑑重點。",
  keywords: [
    "身心障礙福利機構評鑑",
    "身心障礙機構評鑑基準",
    "CRPD",
    "身心障礙機構",
    "身心障礙福利機構",
    "評鑑小教室",
    "長照機構評鑑",
    "社家署評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/disability-welfare" },
  openGraph: {
    title: "身心障礙福利機構評鑑小教室｜評鑑小教室｜報告汪",
    description: "35 項身心障礙福利機構評鑑基準完整解說，掌握評鑑重點，提升評鑑通過率。",
    url: "https://reportwang.com/school/disability-welfare",
  },
};

const sectionMeta = [
  {
    href: "/school/disability-welfare/rights-protection",
    icon: ShieldCheckIcon,
    name: "A、權益保障",
    shortCode: "A",
    itemRange: "項目 1–8",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/disability-welfare/appropriate-care",
    icon: HeartPulseIcon,
    name: "B、適性照顧與支持",
    shortCode: "B",
    itemRange: "項目 9–17",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/disability-welfare/administration",
    icon: SettingsIcon,
    name: "C、行政管理",
    shortCode: "C",
    itemRange: "項目 18–19",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/disability-welfare/service-management",
    icon: ShieldIcon,
    name: "D、服務管理",
    shortCode: "D",
    itemRange: "項目 20–23",
    bgClass: "bg-teal-500/10",
    textClass: "text-teal-600 dark:text-teal-400",
  },
  {
    href: "/school/disability-welfare/staff-management",
    icon: StarIcon,
    name: "E、員工管理與福利",
    shortCode: "E",
    itemRange: "項目 24–29",
    bgClass: "bg-indigo-500/10",
    textClass: "text-indigo-600 dark:text-indigo-400",
  },
  {
    href: "/school/disability-welfare/finance",
    icon: BuildingIcon,
    name: "F、會計與財務管理",
    shortCode: "F",
    itemRange: "項目 30–35",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-600 dark:text-purple-400",
  },
];

const jsonLd = educationalContentJsonLd({
  type: "Course",
  name: "身心障礙福利機構評鑑基準",
  description:
    "身心障礙福利機構專業服務品質與經營管理標準指引，共 35 項目、6 大區塊完整解說。",
  path: "/school/disability-welfare",
  hasPart: [
    {
      name: "A、權益保障（項目 1–8）",
      url: "https://reportwang.com/school/disability-welfare/rights-protection",
    },
    {
      name: "B、適性照顧與支持（項目 9–17）",
      url: "https://reportwang.com/school/disability-welfare/appropriate-care",
    },
    {
      name: "C、行政管理（項目 18–19）",
      url: "https://reportwang.com/school/disability-welfare/administration",
    },
    {
      name: "D、服務管理（項目 20–23）",
      url: "https://reportwang.com/school/disability-welfare/service-management",
    },
    {
      name: "E、員工管理與福利（項目 24–29）",
      url: "https://reportwang.com/school/disability-welfare/staff-management",
    },
    {
      name: "F、會計與財務管理（項目 30–35）",
      url: "https://reportwang.com/school/disability-welfare/finance",
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
        <Badge variant="secondary" className="mb-3">身心障礙福利機構</Badge>
        <h1 className="text-2xl font-bold mb-3">身心障礙福利機構評鑑基準總覽</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          以下為衛福部社家署「身心障礙福利機構專業服務品質與經營管理標準指引」，共 35 個評鑑項目，分為 6 大區塊。
          點擊各區塊可查看詳細說明、準備要訣與實用提示。
        </p>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {sectionMeta.map((sec) => {
          const section = disabilityWelfareProfile.sections.find((s) => s.shortCode === sec.shortCode);
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
        <h2 className="text-lg font-semibold mb-4">全部 35 項評鑑項目</h2>
        <div className="space-y-6">
          {disabilityWelfareProfile.sections.map((section) => {
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
                      href={`/school/disability-welfare/${slug}#item-${item.id}`}
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
          到報告汪一鍵匯入「身心障礙福利機構」評鑑範本，包含 6 個標籤和 35 份報告範本，省去手動建立的時間。
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
