import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { nursingHomeProfile } from "@/lib/ai/evaluation-profiles/nursing-home";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheckIcon,
  HeartPulseIcon,
  SettingsIcon,
  StarIcon,
  ShieldIcon,
  ArrowRightIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "住宿型照顧機構評鑑基準總覽",
  description:
    "114 年度臺北市老人安養暨長期照顧機構評鑑指標完整說明，共 75 項目、5 大區塊：經營管理效能、專業照護品質、安全環境設備、個案權益保障與服務改進創新。",
  keywords: [
    "住宿型長照評鑑",
    "安養機構評鑑",
    "長照機構評鑑基準",
    "114年度評鑑",
    "老人安養評鑑",
    "臺北市長照機構評鑑",
    "住宿型照顧機構評鑑指標",
  ],
  alternates: { canonical: "https://reportwang.com/school/nursing-home" },
  openGraph: {
    title: "住宿型照顧機構評鑑基準總覽｜評鑑小教室｜報告汪",
    description: "75 項住宿型照顧機構評鑑基準完整解說，掌握評鑑重點，提升評鑑通過率。",
    url: "https://reportwang.com/school/nursing-home",
  },
};

const sectionMeta = [
  {
    href: "/school/nursing-home/management",
    icon: SettingsIcon,
    name: "A、經營管理效能",
    shortCode: "管",
    itemRange: "項目 1–15",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/nursing-home/professional-quality",
    icon: HeartPulseIcon,
    name: "B、專業照護品質",
    shortCode: "專",
    itemRange: "項目 16–47",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/nursing-home/safety-environment",
    icon: ShieldIcon,
    name: "C、安全環境設備",
    shortCode: "安",
    itemRange: "項目 48–63",
    bgClass: "bg-teal-500/10",
    textClass: "text-teal-600 dark:text-teal-400",
  },
  {
    href: "/school/nursing-home/client-rights",
    icon: ShieldCheckIcon,
    name: "D、個案權益保障",
    shortCode: "權",
    itemRange: "項目 64–72",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/nursing-home/innovation",
    icon: StarIcon,
    name: "E、服務改進創新",
    shortCode: "創",
    itemRange: "項目 73–75",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-600 dark:text-purple-400",
  },
];

const jsonLd = educationalContentJsonLd({
  type: "Course",
  name: "住宿型照顧機構評鑑基準",
  description:
    "114 年度臺北市老人安養暨長期照顧機構評鑑指標，共 75 項目、5 大區塊完整解說。",
  path: "/school/nursing-home",
  hasPart: [
    {
      name: "A、經營管理效能（項目 1–15）",
      url: "https://reportwang.com/school/nursing-home/management",
    },
    {
      name: "B、專業照護品質（項目 16–47）",
      url: "https://reportwang.com/school/nursing-home/professional-quality",
    },
    {
      name: "C、安全環境設備（項目 48–63）",
      url: "https://reportwang.com/school/nursing-home/safety-environment",
    },
    {
      name: "D、個案權益保障（項目 64–72）",
      url: "https://reportwang.com/school/nursing-home/client-rights",
    },
    {
      name: "E、服務改進創新（項目 73–75）",
      url: "https://reportwang.com/school/nursing-home/innovation",
    },
  ],
});

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
        <p className="text-muted-foreground text-sm leading-relaxed">
          以下為 114 年度臺北市老人安養暨長期照顧機構評鑑指標，共 75 個評鑑項目，分為 5 大區塊。
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
        <h2 className="text-lg font-semibold mb-4">全部 75 項評鑑項目</h2>
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
    </>
  );
}
