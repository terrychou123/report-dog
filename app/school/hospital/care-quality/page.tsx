import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { hospitalProfile } from "@/lib/ai/evaluation-profiles/hospital";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "2.2 醫療照護品質與安全管理（項目 47–49）｜醫院評鑑小教室",
  description:
    "醫院評鑑「醫療照護品質與安全管理」3 項評鑑項目詳細說明：醫療品質指標管理、病人安全文化推動及異常事件通報與分析，三項均為必要條文，含準備要訣。",
  keywords: [
    "醫院評鑑",
    "區域醫院評鑑",
    "地區醫院評鑑",
    "醫療品質指標",
    "病人安全文化",
    "異常事件通報",
    "評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/hospital/care-quality" },
  openGraph: {
    title: "2.2 醫療照護品質與安全管理（項目 47–49）｜醫院評鑑｜報告汪",
    description: "醫院評鑑「醫療照護品質與安全管理」3 項必要條文詳細說明與準備要訣。",
    url: "https://reportwang.com/school/hospital/care-quality",
  },
};

const section = (() => {
  const s = hospitalProfile.sections.find((s) => s.shortCode === "2.2");
  if (!s) throw new Error("hospitalProfile: section 2.2 not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  47: {
    content:
      "品質指標的「意義性」是評鑑重點：委員會問的不是「有無指標」，而是「為何選這些指標、如何詮釋異常」。建議每項指標附有說明文件，包含指標定義、資料來源、目標值設定依據（如對標全國平均）及歷史趨勢圖。",
    variant: "info",
  },
  49: {
    content:
      "異常事件通報系統常見問題是「通報量過低」，這反而是評鑑扣分警訊——代表院內通報文化不足。建議定期統計各部門通報率，對通報率低的部門進行主動說明與鼓勵，並確認系統中有不良事件、警示事件、Near Miss 三類均有案例。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "2.2 醫療照護品質與安全管理（醫院評鑑基準項目 47–49）",
  description:
    "醫院評鑑基準「醫療照護品質與安全管理」3 個必要條文評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/hospital/care-quality",
});

export default function HospitalCareQualityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0 hover:bg-emerald-500/20">
          2.2 醫療照護品質與安全管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">醫療照護品質與安全管理（項目 47–49）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本章共 3 個評鑑項目，涵蓋醫療品質指標管理、病人安全文化推動及異常事件通報與分析，三項均為必要條文。
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
              <span className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
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
          href="/school/hospital/patient-rights"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          2.1 病人權責
        </Link>
        <Link
          href="/school/hospital/care-execution"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          2.3 照護執行
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
