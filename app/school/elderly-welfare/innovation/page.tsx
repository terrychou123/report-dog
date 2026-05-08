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
  title: "E、服務改進創新（項目 72–74）｜老人福利機構評鑑",
  description:
    "老人福利機構評鑑「服務改進創新」3 項評鑑基準詳細說明：前次評鑑缺失改善情形、創新服務方案推行情形、近 4 年違規事件改善情形，含準備要訣。",
  keywords: [
    "老人福利機構服務創新評鑑",
    "老人機構前次評鑑改善",
    "115年度老人福利機構評鑑",
    "老人照顧機構服務改進",
  ],
  alternates: { canonical: "https://reportwang.com/school/elderly-welfare/innovation" },
  openGraph: {
    title: "E、服務改進創新（項目 72–74）｜老人福利機構評鑑｜報告汪",
    description: "老人福利機構評鑑服務改進創新 3 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/elderly-welfare/innovation",
  },
};

const section = requireSection(elderlyWelfareProfile.sections, "創");

const tips = elderlyWelfareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "elderly-welfare",
  subpage: "innovation",
  section,
  name: "E、服務改進創新（老人福利機構評鑑基準項目 72–74）",
  description:
    "老人福利機構評鑑基準「服務改進創新」3 個評鑑項目詳細說明、準備要訣與實用提示。",
});

export default function ElderlyWelfareInnovationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-0 hover:bg-indigo-500/20">
          E、服務改進創新
        </Badge>
        <h1 className="text-2xl font-bold mb-3">服務改進創新（項目 72–74）</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${elderlyWelfareMeta.year} 年度` },
            { label: "主管機關", value: elderlyWelfareMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={elderlyWelfareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 3 個評鑑項目（占分 2%），聚焦於機構的持續改善能力，包含前次評鑑缺失的具體改善成效、創新服務方案的推行情形及近 4 年違規事件的改善狀況。
        </p>
      </div>

      {/* Mini TOC */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          本頁內容
        </p>
        <ul className="grid grid-cols-1 gap-1">
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
              <span className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-sm font-bold text-indigo-600 dark:text-indigo-400 font-mono">
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
          href="/school/elderly-welfare/client-rights"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          D、個案權益保障
        </Link>
        <Link
          href="/school/elderly-welfare/bonus"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          F、加分題
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
