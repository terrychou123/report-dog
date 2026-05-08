import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { babycareProfile, meta as babycareMeta } from "@/lib/ai/evaluation-profiles/babycare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { babycareTips } from "@/lib/evaluation-tips/babycare";

export const metadata: Metadata = {
  title: "特別事項（D1–D2）｜產後護理之家評鑑",
  description:
    "產後護理之家評鑑「特別事項」2 項評鑑基準詳細說明：配合政策執行加分項（母嬰親善認證、創新服務）、重大異常情事試評扣分項，含準備要訣。",
  keywords: [
    "產後護理之家評鑑特別事項",
    "月子中心母嬰親善認證評鑑",
    "產後護理之家試評扣分",
    "月子中心創新服務評鑑",
    "115年度產後護理之家評鑑",
    "月子中心評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/postpartum-care/special-items" },
  openGraph: {
    title: "特別事項（D1–D2）｜產後護理之家評鑑｜報告汪",
    description: "產後護理之家評鑑特別事項區塊 2 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/postpartum-care/special-items",
  },
};

const section = (() => {
  const s = babycareProfile.sections.find((s) => s.shortCode === "D");
  if (!s) throw new Error("babycareProfile: section D not found");
  return s;
})();

const tips = babycareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "postpartum-care",
  subpage: "special-items",
  section,
  name: "D、特別事項（產後護理之家評鑑基準項目 16–17）",
  description:
    "產後護理之家評鑑基準「特別事項」2 個評鑑項目詳細說明、準備要訣與實用提示。",
});

export default function PostpartumCareSpecialItemsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-0 hover:bg-purple-500/20">
          D、特別事項
        </Badge>
        <h1 className="text-2xl font-bold mb-3">特別事項（項目 16–17）</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${babycareMeta.year} 年度` },
            { label: "主管機關", value: babycareMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={babycareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 2 個評鑑項目，包含配合政策執行的加分機會（如母嬰親善認證、創新服務推廣），
          以及重大異常情事的試評扣分項。其中 D2 為試評扣分項，任何重大違規情事將直接影響整體評鑑結果，需特別留意。
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
              <h3 id={`heading-${item.id}`} className="text-lg font-bold">{item.title}</h3>
              <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
              <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
              {"isTrialDeduction" in item && item.isTrialDeduction && (
                <Badge variant="destructive" className="text-xs">試評扣分項</Badge>
              )}
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">評鑑標準</p>
              <ul className="space-y-1.5 list-none pl-0">
                {item.criteria.map((criterion, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-mono text-foreground">
                      {i + 1}
                    </span>
                    {criterion}
                  </li>
                ))}
              </ul>
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
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/postpartum-care/safety-environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          C、環境設施
        </Link>
        <Link
          href="/school/postpartum-care"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          返回總覽
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
