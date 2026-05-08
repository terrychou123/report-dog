import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { elderlyWelfareProfile, meta as elderlyWelfareMeta } from "@/lib/ai/evaluation-profiles/elderly-welfare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { elderlyWelfareTips } from "@/lib/evaluation-tips/elderly-welfare";

export const metadata: Metadata = {
  title: "A、經營管理效能（項目 1–15）｜老人福利機構評鑑",
  description:
    "老人福利機構評鑑「經營管理效能」15 項評鑑基準詳細說明：工作手冊制度、入出機構管理、業務計畫、查核缺失改善、住民保護機制、危機管理、業務負責人資格、社工護理照服人員配置、勞動條件、在職訓練及感染管制，含準備要訣。",
  keywords: [
    "老人福利機構評鑑經營管理",
    "老人福利機構人員配置",
    "老人福利機構工作手冊",
    "115年度老人福利機構評鑑",
    "老人照顧機構評鑑基準",
  ],
  alternates: { canonical: "https://reportwang.com/school/elderly-welfare/management" },
  openGraph: {
    title: "A、經營管理效能（項目 1–15）｜老人福利機構評鑑｜報告汪",
    description: "老人福利機構評鑑經營管理效能 15 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/elderly-welfare/management",
  },
};

const section = requireSection(elderlyWelfareProfile.sections, "管");

const tips = elderlyWelfareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "elderly-welfare",
  subpage: "management",
  section,
  name: "A、經營管理效能（老人福利機構評鑑基準項目 1–15）",
  description:
    "老人福利機構評鑑基準「經營管理效能」15 個評鑑項目詳細說明、準備要訣與實用提示。",
});

export default function ElderlyWelfareManagementPage() {
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
        <h1 className="text-2xl font-bold mb-3">經營管理效能（項目 1–15）</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${elderlyWelfareMeta.year} 年度` },
            { label: "資料來源", value: elderlyWelfareMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={elderlyWelfareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 15 個評鑑項目，涵蓋老人福利機構的整體管理能力，從行政制度、人員設置資格、教育訓練到危機風險管理。
          業務負責人的資格與實際參與程度是評鑑委員關注的核心重點。
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
          </section>
        ))}
      </div>

      {/* Prev / Next navigation */}
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/elderly-welfare"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回總覽
        </Link>
        <Link
          href="/school/elderly-welfare/professional-quality"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          B、專業照護品質
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
