import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { generalNursingHomeProfile, meta as generalNursingHomeMeta } from "@/lib/ai/evaluation-profiles/general-nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { SoapCta } from "@/components/school/soap-cta";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { generalNursingHomeTips } from "@/lib/evaluation-tips/general-nursing-home";
import { EvaluationReferences } from "@/components/school/evaluation-references";
import { generalNursingHomeReferences } from "@/lib/evaluation-references/general-nursing-home";

export const metadata: Metadata = {
  title: "專業服務與生活照顧（B1–B3）｜一般護理之家評鑑",
  description:
    "一般護理之家評鑑「專業服務與生活照顧」3 項評鑑基準詳細說明：住民服務需求評估與照護計畫執行、整合性照顧與跨專業團隊、品質監測指標定期檢討，含準備要訣。",
  keywords: [
    "一般護理之家評鑑專業服務",
    "護理之家照護計畫評鑑",
    "護理之家跨專業照護",
    "護理之家品質監測指標",
    "115年度一般護理之家評鑑",
    "護理之家評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/general-nursing-home/professional-care" },
  openGraph: {
    title: "專業服務與生活照顧（B1–B3）｜一般護理之家評鑑｜報告汪",
    description: "一般護理之家評鑑專業服務區塊 3 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/general-nursing-home/professional-care",
  },
};

const section = (() => {
  const s = generalNursingHomeProfile.sections.find((s) => s.shortCode === "B");
  if (!s) throw new Error("generalNursingHomeProfile: section B not found");
  return s;
})();

const tips = generalNursingHomeTips;

const jsonLd = schoolSubpageJsonLd({
  type: "general-nursing-home",
  subpage: "professional-care",
  section,
  name: "B、專業服務與生活照顧（一般護理之家評鑑基準項目 6–8）",
  description:
    "一般護理之家評鑑基準「專業服務與生活照顧」3 個評鑑項目詳細說明、準備要訣與實用提示。",
});

export default function GeneralNursingHomeProfessionalCarePage() {
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
        <h1 className="text-2xl font-bold mb-3">專業服務與生活照顧（項目 6–8）</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${generalNursingHomeMeta.year} 年度` },
            { label: "主管機關", value: generalNursingHomeMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={generalNursingHomeMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 3 個評鑑項目，涵蓋住民個別化照護需求評估與計畫執行、跨專業整合性照顧，
          以及照護品質監測指標的建立與持續改善，是評鑑委員衡量機構照護品質的核心依據。
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

            <EvaluationReferences references={generalNursingHomeReferences[item.id]} />
            {tips[item.id] && (
              <DocsTip variant={tips[item.id].variant ?? "neutral"} title="準備要訣">
                {tips[item.id].content}
              </DocsTip>
            )}
            {tips[item.id]?.soap && <SoapCta facility="general-nursing-home" />}
          </section>
        ))}
      </div>

      {/* Prev / Next navigation */}
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/general-nursing-home/administration"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          A、行政組織
        </Link>
        <Link
          href="/school/general-nursing-home/safety-environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          C、環境設施
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
