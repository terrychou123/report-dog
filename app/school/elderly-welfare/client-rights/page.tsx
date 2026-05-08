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
  title: "D、個案權益保障（項目 63–71）｜老人福利機構評鑑",
  description:
    "老人福利機構評鑑「個案權益保障」9 項評鑑基準詳細說明：服務資訊公開、服務契約訂定、個人資料保護、申訴機制、住民滿意度調查、住民自主參與、家庭聯繫及支持等，含準備要訣。",
  keywords: [
    "老人福利機構個案權益",
    "老人機構服務契約評鑑",
    "老人機構申訴機制",
    "老人福利機構住民滿意度",
    "115年度老人福利機構評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/elderly-welfare/client-rights" },
  openGraph: {
    title: "D、個案權益保障（項目 63–71）｜老人福利機構評鑑｜報告汪",
    description: "老人福利機構評鑑個案權益保障 9 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/elderly-welfare/client-rights",
  },
};

const section = requireSection(elderlyWelfareProfile.sections, "權");

const tips = elderlyWelfareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "elderly-welfare",
  subpage: "client-rights",
  section,
  name: "D、個案權益保障（老人福利機構評鑑基準項目 63–71）",
  description:
    "老人福利機構評鑑基準「個案權益保障」9 個評鑑項目詳細說明、準備要訣與實用提示。",
});

export default function ElderlyWelfareClientRightsPage() {
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
        <h1 className="text-2xl font-bold mb-3">個案權益保障（項目 63–71）</h1>
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
          本區塊共 9 個評鑑項目（占分 13%），關注老人福利機構是否落實住民的基本權益保障，從資訊透明、契約保障、隱私保護到申訴機制與滿意度調查的執行情形。
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
              <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
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
          href="/school/elderly-welfare/safety-environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          C、安全環境設備
        </Link>
        <Link
          href="/school/elderly-welfare/innovation"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          E、服務改進創新
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
