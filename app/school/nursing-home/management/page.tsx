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
  title: "A、經營管理效能（項目 1–9）｜住宿型照顧機構評鑑",
  description:
    "住宿型照顧機構評鑑「經營管理效能」9 項評鑑基準詳細說明（115年度全國版）：工作手冊、入出機構管理、業務計畫、前次評鑑改善、人員保護、危機管理、人員設置資格與教育訓練，含準備要訣。",
  keywords: [
    "住宿型長照評鑑經營管理",
    "安養機構人員配置評鑑",
    "長照機構工作手冊評鑑",
    "護理人員設置評鑑",
    "115年度住宿型長照評鑑",
    "住宿式長照機構評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/nursing-home/management" },
  openGraph: {
    title: "A、經營管理效能（項目 1–9）｜住宿型照顧機構評鑑｜報告汪",
    description: "住宿型照顧機構評鑑經營管理效能 9 項基準詳細說明與準備要訣（115年度全國版）。",
    url: "https://reportwang.com/school/nursing-home/management",
  },
};

const section = requireSection(nursingHomeProfile.sections, "管");

const tips = nursingHomeTips;

const jsonLd = schoolSubpageJsonLd({
  type: "nursing-home",
  subpage: "management",
  section,
  name: "A、經營管理效能（住宿型照顧機構評鑑基準項目 1–9）",
  description:
    "住宿型照顧機構評鑑基準「經營管理效能」9 個評鑑項目詳細說明、準備要訣與實用提示（115年度全國版）。",
});

export default function NursingHomeManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0 hover:bg-orange-500/20">
          A、經營管理效能
        </Badge>
        <h1 className="text-2xl font-bold mb-3">經營管理效能（項目 1–9）</h1>
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
          本區塊共 9 個評鑑項目（115年度全國版），涵蓋住宿型機構的整體管理能力，從行政制度、人員設置資格、教育訓練到危機風險管理。
          115年度將人員設置（A8）及教育訓練（A9）各自合併為單一項目，並新增「前次評鑑缺失改善」（A4）。
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
              <span className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-sm font-bold text-orange-600 dark:text-orange-400 font-mono">
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
          href="/school/nursing-home"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回總覽
        </Link>
        <Link
          href="/school/nursing-home/professional-quality"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          B、專業照護品質
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
