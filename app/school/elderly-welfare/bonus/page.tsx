import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { elderlyWelfareProfile, meta as elderlyWelfareMeta } from "@/lib/ai/evaluation-profiles/elderly-welfare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon } from "lucide-react";
import { elderlyWelfareTips } from "@/lib/evaluation-tips/elderly-welfare";

export const metadata: Metadata = {
  title: "F、加分題（項目 75–77）｜老人福利機構評鑑",
  description:
    "老人福利機構評鑑「加分題」3 項評鑑基準詳細說明：人才培育（留才計畫、薪資待遇提升）、智慧照護（輔助科技、資訊系統應用）、在地安老服務（社區整合、多元服務輸出），含準備要訣。",
  keywords: [
    "老人福利機構評鑑加分題",
    "老人機構人才培育評鑑",
    "老人機構智慧照護",
    "老人福利機構在地安老",
    "115年度老人福利機構評鑑",
  ],
  alternates: { canonical: "/school/elderly-welfare/bonus" },
  openGraph: {
    title: "F、加分題（項目 75–77）｜老人福利機構評鑑｜報告汪",
    description: "老人福利機構評鑑加分題 3 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/elderly-welfare/bonus",
  },
};

const section = requireSection(elderlyWelfareProfile.sections, "加");

const tips = elderlyWelfareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "elderly-welfare",
  subpage: "bonus",
  section,
  name: "F、加分題（老人福利機構評鑑基準項目 75–77）",
  description:
    "老人福利機構評鑑基準「加分題」3 個評鑑項目詳細說明、準備要訣與實用提示。",
});

export default function ElderlyWelfareBonusPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-0 hover:bg-purple-500/20">
          F、加分題
        </Badge>
        <h1 className="text-2xl font-bold mb-3">加分題（項目 75–77）</h1>
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
          加分題共 3 個項目（最高加 2 分），評鑑機構在人才培育、智慧照護與在地安老服務上的卓越表現。
          加分題雖非必要項目，但能有效提升機構整體評鑑成績，展現機構的前瞻視野。
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
              <span className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400 font-mono">
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

      <div className="mt-12 flex items-center justify-start border-t pt-6">
        <Link
          href="/school/elderly-welfare/innovation"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          E、服務改進創新
        </Link>
      </div>
    </>
  );
}
