import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { hospitalProfile } from "@/lib/ai/evaluation-profiles/hospital";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { hospitalTips } from "@/lib/evaluation-tips/hospital";

export const metadata: Metadata = {
  title: "1.6 病人導向之服務與管理（項目 34–37）｜醫院評鑑小教室",
  description:
    "醫院評鑑「病人導向之服務與管理」4 項評鑑項目詳細說明：病人服務資訊提供、就醫流程管理、病人滿意度管理及社區健康促進，含準備要訣。",
  keywords: [
    "醫院評鑑",
    "區域醫院評鑑",
    "地區醫院評鑑",
    "病人導向服務",
    "病人滿意度",
    "就醫流程管理",
    "社區健康促進",
    "評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/hospital/patient-services" },
  openGraph: {
    title: "1.6 病人導向之服務與管理（項目 34–37）｜醫院評鑑｜報告汪",
    description: "醫院評鑑「病人導向之服務與管理」4 項評鑑項目詳細說明與準備要訣。",
    url: "https://reportwang.com/school/hospital/patient-services",
  },
};

const section = (() => {
  const s = hospitalProfile.sections.find((s) => s.shortCode === "1.6");
  if (!s) throw new Error("hospitalProfile: section 1.6 not found");
  return s;
})();

const tips = hospitalTips;

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "1.6 病人導向之服務與管理（醫院評鑑基準項目 34–37）",
  description:
    "醫院評鑑基準「病人導向之服務與管理」4 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/hospital/patient-services",
});

export default function HospitalPatientServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-0 hover:bg-purple-500/20">
          1.6 病人導向之服務與管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">病人導向之服務與管理（項目 34–37）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本章共 4 個評鑑項目，涵蓋病人服務資訊提供、就醫流程管理、病人滿意度管理及社區健康促進。
        </p>
      </div>

      {/* Mini TOC */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          本頁內容
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {section.items.map((item) => (
            <li key={item.id}>
              <a
                href={`#item-${item.id}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-background border flex items-center justify-center text-xs font-mono">
                  {item.id}
                </span>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Items */}
      <div className="space-y-12">
        {section.items.map((item) => (
          <section key={item.id} id={`item-${item.id}`} aria-labelledby={`heading-${item.id}`} className="scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400 font-mono">
                {item.id}
              </span>
              <h2 id={`heading-${item.id}`} className="text-lg font-bold">{item.title}</h2>
              <span className="text-xs text-muted-foreground font-mono">{item.articleNumber}</span>
              {item.category === "必要" && (
                <Badge className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 border-0">必要</Badge>
              )}
              {item.category === "重點" && (
                <Badge className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0">重點</Badge>
              )}
              {item.category === "試評" && (
                <Badge variant="outline" className="text-xs">試評</Badge>
              )}
              {item.category === "可免評" && (
                <Badge variant="secondary" className="text-xs">可免評</Badge>
              )}
              <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
              <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">評鑑標準</p>
              <ol role="list" className="space-y-1.5 list-none pl-0">
                {item.criteria.map((criterion, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-mono text-foreground">
                      {i + 1}
                    </span>
                    {criterion}
                  </li>
                ))}
              </ol>
            </div>

            {tips[item.id] && (
              <DocsTip variant={tips[item.id].variant ?? "neutral"} title="準備要訣">
                {tips[item.id].content}
              </DocsTip>
            )}
          </section>
        ))}
      </div>

      {/* Prev / Next navigation */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/hospital/safety-environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          1.5 安全環境
        </Link>
        <Link
          href="/school/hospital/risk-management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          1.7 風險管理
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
