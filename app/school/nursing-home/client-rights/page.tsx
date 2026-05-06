import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { nursingHomeProfile, meta as nursingHomeMeta } from "@/lib/ai/evaluation-profiles/nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { nursingHomeTips } from "@/lib/evaluation-tips/nursing-home";
import { EvaluationReferences } from "@/components/school/evaluation-references";
import { nursingHomeReferences } from "@/lib/evaluation-references/nursing-home";

export const metadata: Metadata = {
  title: "D、個案權益保障（項目 55–63）｜住宿型照顧機構評鑑",
  description:
    "住宿型照顧機構評鑑「個案權益保障」9 項評鑑基準詳細說明（115年度全國版）：個案資料管理、入住契約（審閱期 5 天）、生活注意事項、申訴機制、宗教信仰、居家情境、財物管理、緩和醫療（病主法）、滿意度調查，含準備要訣。",
  keywords: [
    "住宿型長照評鑑個案權益",
    "安養機構服務契約評鑑",
    "長照機構申訴機制評鑑",
    "住民財物管理評鑑",
    "115年度住宿型長照評鑑",
    "病人自主權利法長照",
  ],
  alternates: { canonical: "https://reportwang.com/school/nursing-home/client-rights" },
  openGraph: {
    title: "D、個案權益保障（項目 55–63）｜住宿型照顧機構評鑑｜報告汪",
    description: "住宿型照顧機構評鑑個案權益保障 9 項基準詳細說明與準備要訣（115年度全國版）。",
    url: "https://reportwang.com/school/nursing-home/client-rights",
  },
};

const section = requireSection(nursingHomeProfile.sections, "權");

const tips = nursingHomeTips;

const jsonLd = schoolSubpageJsonLd({
  type: "nursing-home",
  subpage: "client-rights",
  section,
  name: "D、個案權益保障（住宿型照顧機構評鑑基準項目 55–63）",
  description:
    "住宿型照顧機構評鑑基準「個案權益保障」9 個評鑑項目詳細說明、準備要訣與實用提示（115年度全國版）。",
});

export default function NursingHomeClientRightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0 hover:bg-blue-500/20">
          D、個案權益保障
        </Badge>
        <h1 className="text-2xl font-bold mb-3">個案權益保障（項目 55–63）</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${nursingHomeMeta.year} 年度` },
            { label: "主管機關", value: nursingHomeMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={nursingHomeMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 9 個評鑑項目（115年度全國版），著重保障住民在機構中的基本權益。115年度新增入住契約審閱期明訂 5 天（D2）、無家屬服務對象遺物管理規定（D7）、病人自主權利法相關要求（D8）。
          社工人員是本區塊的主要負責角色，需確保住民的聲音被聽見並有回應機制。
        </p>
      </div>

      {/* Mini TOC */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          本頁內容
        </p>
        <ul className="space-y-1">
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
          <section key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
                {item.id}
              </span>
              <h2 className="text-lg font-bold">{item.title}</h2>
              <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
              <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">評鑑標準</h3>
              <ol className="space-y-1.5 list-none pl-0">
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

            <EvaluationReferences references={nursingHomeReferences[item.id]} />
          </section>
        ))}
      </div>

      {/* Prev / Next navigation */}
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/nursing-home/safety-environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          C、安全環境設備
        </Link>
        <Link
          href="/school/nursing-home/innovation"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          加減分項目
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
