import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { babycareProfile } from "@/lib/ai/evaluation-profiles/babycare";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { babycareTips } from "@/lib/evaluation-tips/babycare";

export const metadata: Metadata = {
  title: "專業服務與生活照顧（B1.1–B1.8）｜產後護理之家評鑑",
  description:
    "產後護理之家評鑑「專業服務與生活照顧」8 項評鑑基準詳細說明：產婦照護、嬰兒照護、親子關係促進、團體衛教課程、出住院評估、緊急狀況處理、哺乳及餵食計畫、母乳收集與貯存，含準備要訣。",
  keywords: [
    "產後護理之家評鑑專業服務",
    "月子中心嬰兒照護評鑑",
    "產後護理之家母乳哺育評鑑",
    "月子中心緊急狀況處理",
    "115年度產後護理之家評鑑",
    "月子中心評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/postpartum-care/professional-care" },
  openGraph: {
    title: "專業服務與生活照顧（B1.1–B1.8）｜產後護理之家評鑑｜報告汪",
    description: "產後護理之家評鑑專業服務區塊 8 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/postpartum-care/professional-care",
  },
};

const section = (() => {
  const s = babycareProfile.sections.find((s) => s.shortCode === "B");
  if (!s) throw new Error("babycareProfile: section B not found");
  return s;
})();

const tips = babycareTips;

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "B、專業服務與生活照顧（產後護理之家評鑑基準項目 6–13）",
  description:
    "產後護理之家評鑑基準「專業服務與生活照顧」8 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/postpartum-care/professional-care",
});

export default function PostpartumCareProfessionalCarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          B、專業服務與生活照顧
        </Badge>
        <h1 className="text-2xl font-bold mb-3">專業服務與生活照顧（項目 6–13）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 8 個評鑑項目，是產後護理之家評鑑的核心，涵蓋產婦照護、嬰兒照護、親子關係促進、
          團體衛教課程、出住院評估、緊急狀況處理、哺乳及餵食計畫，以及母乳收集與貯存管理，
          展現機構專業照護能力的重要指標。
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
              <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400 font-mono">
                {item.id}
              </span>
              <h2 id={`heading-${item.id}`} className="text-lg font-bold">{item.title}</h2>
              <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
              <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
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
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/postpartum-care/administration"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          A、行政組織
        </Link>
        <Link
          href="/school/postpartum-care/safety-environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          C、環境設施
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
