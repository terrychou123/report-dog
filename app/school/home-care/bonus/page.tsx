import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { homeCareProfile, meta as homeCareMeta } from "@/lib/ai/evaluation-profiles/home-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon } from "lucide-react";
import { homeCareTips } from "@/lib/evaluation-tips/home-care";

export const metadata: Metadata = {
  title: "加分題（項目 31–32）",
  description:
    "居家服務機構評鑑加分題 2 項說明：創新服務或社區資源連結、照顧者支持服務，幫助機構在正式評鑑外展現額外價值，爭取加分。",
  keywords: [
    "居家服務評鑑加分題",
    "創新服務評鑑",
    "照顧者支持服務評鑑",
    "居家服務社區資源",
    "長照創新",
  ],
  alternates: { canonical: "https://reportwang.com/school/home-care/bonus" },
  openGraph: {
    title: "加分題（項目 31–32）｜居家服務評鑑｜報告汪",
    description: "居家服務機構評鑑加分題 2 項：創新服務與照顧者支持服務詳細說明。",
    url: "https://reportwang.com/school/home-care/bonus",
  },
};

const section = homeCareProfile.sections[3]; // 加分題

const tips = homeCareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "home-care",
  subpage: "bonus",
  section,
  name: "加分題（居家服務機構評鑑基準項目 31–32）",
  description:
    "居家服務機構評鑑基準加分題 2 個項目詳細說明：創新服務或社區資源連結、照顧者支持服務。",
});

export default function BonusPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-0 hover:bg-purple-500/20">
          加分題
        </Badge>
        <h1 className="text-2xl font-bold mb-3">加分題（項目 31–32）</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${homeCareMeta.year} 年度` },
            { label: "主管機關", value: homeCareMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={homeCareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          加分題共 2 個項目，不在正式評鑑基準分數內，但可以展現機構的創新能力與對家庭照顧者的關懷。
          評鑑委員通常會對這兩個項目印象深刻，是提升整體評鑑形象的好機會。
          備妥完整記錄，就算不能量化，也能讓評鑑委員看見機構的用心。
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
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-xl bg-primary/5 border border-primary/20 p-5">
        <p className="text-sm font-semibold mb-1">完成居家服務評鑑基準學習！</p>
        <p className="text-sm text-muted-foreground mb-3">
          已掌握全部 32 項評鑑基準。現在讓報告汪 AI 協助分析你的評鑑報告，找出需要補強的評鑑項目。
        </p>
        <Link
          href="/protected"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          開始 AI 評鑑分析
        </Link>
      </div>

      {/* Prev navigation */}
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="mt-8 flex items-center border-t pt-6">
        <Link
          href="/school/home-care/management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          參、經營管理效能
        </Link>
      </div>
    </>
  );
}
