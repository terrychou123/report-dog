import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { nursingHomeProfile, meta as nursingHomeMeta } from "@/lib/ai/evaluation-profiles/nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon } from "lucide-react";
import { nursingHomeTips } from "@/lib/evaluation-tips/nursing-home";
import { EvaluationReferences } from "@/components/school/evaluation-references";
import { nursingHomeReferences } from "@/lib/evaluation-references/nursing-home";

export const metadata: Metadata = {
  title: "加減分項目（項目 64–66）｜住宿型照顧機構評鑑",
  description:
    "住宿型照顧機構評鑑「加減分項目」3 項詳細說明（115年度全國版）：創新或配合政策執行（最多 +2 分）、機構內空氣品質 CO₂<1000ppm（最多 +1 分）、評鑑期間違規及重大負面事件（最多 -2 分），含準備要訣。",
  keywords: [
    "住宿型長照評鑑加分項目",
    "安養機構創新服務評鑑",
    "長照機構空氣品質評鑑",
    "住宿型機構違規紀錄評鑑",
    "115年度住宿型長照評鑑",
    "住宿式長照加減分",
  ],
  alternates: { canonical: "/school/nursing-home/innovation" },
  openGraph: {
    title: "加減分項目（項目 64–66）｜住宿型照顧機構評鑑｜報告汪",
    description: "住宿型照顧機構評鑑加減分項目 3 項詳細說明與準備要訣（115年度全國版）。",
    url: "https://reportwang.com/school/nursing-home/innovation",
  },
};

const section = requireSection(nursingHomeProfile.sections, "創");

const tips = nursingHomeTips;

const jsonLd = schoolSubpageJsonLd({
  type: "nursing-home",
  subpage: "innovation",
  section,
  name: "加減分項目（住宿型照顧機構評鑑基準項目 64–66）",
  description:
    "住宿型照顧機構評鑑基準「加減分項目」3 個項目詳細說明、準備要訣與實用提示（115年度全國版）。",
});

export default function NursingHomeInnovationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-0 hover:bg-purple-500/20">
          加減分項目
        </Badge>
        <h1 className="text-2xl font-bold mb-3">加減分項目（項目 64–66）</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${nursingHomeMeta.year} 年度` },
            { label: "資料來源", value: nursingHomeMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={nursingHomeMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          115年度共 3 個加減分項目。創新或配合政策執行最多 +2 分；115年度新增「機構內空氣品質 CO₂&lt;1000ppm」最多 +1 分；
          評鑑期間違規及重大負面事件最多扣 2 分，需特別謹慎維護機構合法運作與住民安全。
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
              <span className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400 font-mono">
                {item.id}
              </span>
              <h3 className="text-lg font-bold">{item.title}</h3>
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
          href="/school/nursing-home/client-rights"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          D、個案權益保障
        </Link>
        <Link
          href="/school/nursing-home"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          返回住宿型評鑑總覽
        </Link>
      </div>
    </>
  );
}
