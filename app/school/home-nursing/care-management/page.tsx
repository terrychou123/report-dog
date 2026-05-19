import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { homeNursingProfile, meta as homeNursingMeta } from "@/lib/ai/evaluation-profiles/home-nursing";
import { DocsTip } from "@/components/docs/docs-tip";
import { SoapCta } from "@/components/school/soap-cta";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { homeNursingTips } from "@/lib/evaluation-tips/home-nursing";
import { EvaluationReferences } from "@/components/school/evaluation-references";
import { homeNursingReferences } from "@/lib/evaluation-references/home-nursing";

export const metadata: Metadata = {
  title: "B、照護管理（項目 6–8）｜居家護理所評鑑",
  description:
    "居家護理所評鑑「照護管理」3 項評鑑基準詳細說明：機構資訊管理（衛福部指定填報 5 項）、個案照護管理（10 位以上個案、全人評估、照護計畫）、加分項目（創新照護、競賽獲獎、國際交流等），含準備要訣。本區塊佔總分 55%。",
  keywords: [
    "居家護理所評鑑照護管理",
    "居家護理個案照護評鑑",
    "居家護理機構資訊填報",
    "居家護理評鑑加分項目",
    "115年度居家護理所評鑑",
    "護理所評鑑準備",
    "B2個案照護管理",
    "衛福部指定填報",
  ],
  alternates: { canonical: "/school/home-nursing/care-management" },
  openGraph: {
    title: "B、照護管理（項目 6–8）｜居家護理所評鑑｜報告汪",
    description: "居家護理所評鑑照護管理 3 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/home-nursing/care-management",
  },
};

const section = requireSection(homeNursingProfile.sections, "B");

const tips = homeNursingTips;

const jsonLd = schoolSubpageJsonLd({
  type: "home-nursing",
  subpage: "care-management",
  section,
  name: "B、照護管理（居家護理所評鑑基準項目 6–8）",
  description:
    "居家護理所評鑑基準「照護管理」3 個評鑑項目詳細說明、準備要訣與實用提示。",
});

export default function HomeNursingCareManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          B、照護管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">照護管理（項目 6–8）</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${homeNursingMeta.year} 年度` },
            { label: "資料來源", value: homeNursingMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={homeNursingMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 3 個評鑑項目，佔總分 <strong>55%</strong>（B3 加分 5% 為額外加分，不計入 100%）。
          涵蓋機構資訊向衛福部指定系統填報（5 項全符合）、個案全人評估與個別化照護計畫，
          以及鼓勵機構創新的加分項目（任一項目具佐證即可得分）。
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
          <section key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400 font-mono">
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
            <EvaluationReferences references={homeNursingReferences[item.id]} />
            {tips[item.id]?.soap && <SoapCta facility="home-nursing" />}
          </section>
        ))}
      </div>

      {/* Prev / Next navigation */}
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/home-nursing/management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          A、經營管理
        </Link>
        <Link
          href="/school/home-nursing"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          返回總覽
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
