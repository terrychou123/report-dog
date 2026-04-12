import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { hospitalProfile } from "@/lib/ai/evaluation-profiles/hospital";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon } from "lucide-react";
import { hospitalTips } from "@/lib/evaluation-tips/hospital";

export const metadata: Metadata = {
  title: "2.8 檢驗、病理與放射作業（項目 111–124）｜醫院評鑑小教室",
  description:
    "醫院評鑑「檢驗、病理與放射作業」14 項評鑑項目詳細說明：檢驗品質管理、血液銀行、微生物檢驗、病理組織、細胞病理、放射作業及醫學影像資訊管理。",
  keywords: [
    "醫院評鑑檢驗病理",
    "醫院評鑑放射作業",
    "醫院評鑑血液銀行",
    "醫院評鑑PACS",
    "醫院評鑑",
    "區域醫院評鑑",
    "地區醫院評鑑",
    "評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/hospital/lab-pathology" },
  openGraph: {
    title: "2.8 檢驗、病理與放射作業（項目 111–124）｜醫院評鑑小教室｜報告汪",
    description: "醫院評鑑檢驗、病理與放射作業區塊 14 項評鑑項目詳細說明與準備要訣。",
    url: "https://reportwang.com/school/hospital/lab-pathology",
  },
};

const section = (() => {
  const s = hospitalProfile.sections.find((s) => s.shortCode === "2.8");
  if (!s) throw new Error("hospitalProfile: section 2.8 not found");
  return s;
})();

const tips = hospitalTips;

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "2.8 檢驗、病理與放射作業（醫院評鑑基準項目 111–124）",
  description:
    "醫院評鑑基準「檢驗、病理與放射作業」14 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/hospital/lab-pathology",
});

export default function HospitalLabPathologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-lime-500/10 text-lime-600 dark:text-lime-400 border-0 hover:bg-lime-500/20">
          2.8 檢驗、病理與放射作業
        </Badge>
        <h1 className="text-2xl font-bold mb-3">檢驗、病理與放射作業（項目 111–124）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本章共 14 個評鑑項目，涵蓋檢驗品質管理、血液銀行、微生物檢驗、病理組織、細胞病理、放射作業及醫學影像資訊管理。
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
              <span className="w-8 h-8 rounded-full bg-lime-500/10 flex items-center justify-center text-sm font-bold text-lime-600 dark:text-lime-400 font-mono">
                {item.id}
              </span>
              <span className="text-xs text-muted-foreground font-mono">{item.articleNumber}</span>
              <h2 id={`heading-${item.id}`} className="text-lg font-bold">{item.title}</h2>
              <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
              <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
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
          href="/school/hospital/infection-control"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          2.7 感染管制
        </Link>
        <Link
          href="/school/hospital"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回總覽
        </Link>
      </div>
    </>
  );
}
