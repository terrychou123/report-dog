import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { homeCareProfile } from "@/lib/ai/evaluation-profiles/home-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { homeCareTips } from "@/lib/evaluation-tips/home-care";

export const metadata: Metadata = {
  title: "參、經營管理效能（項目 15–30）",
  description:
    "居家服務機構評鑑「經營管理效能」16 項評鑑基準詳細說明：機構行政管理、人員配置資格訓練、財務收費管理、感染管制、品質改善與機構自評，含準備要訣。",
  keywords: [
    "居家服務經營管理評鑑",
    "機構管理效能",
    "照服員人員配置評鑑",
    "居家服務財務管理",
    "服務品質改善評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/home-care/management" },
  openGraph: {
    title: "參、經營管理效能（項目 15–30）｜居家服務評鑑｜報告汪",
    description: "居家服務機構評鑑經營管理效能 16 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/home-care/management",
  },
};

const section = homeCareProfile.sections[2]; // 參、經營管理效能

const tips = homeCareTips;

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "參、經營管理效能（居家服務機構評鑑基準項目 15–30）",
  description:
    "居家服務機構評鑑基準「經營管理效能」16 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/home-care/management",
});

export default function ManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0 hover:bg-orange-500/20">
          參、經營管理效能
        </Badge>
        <h1 className="text-2xl font-bold mb-3">經營管理效能（項目 15–30）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 16 個評鑑項目，是三大核心區塊中項目最多的，涵蓋機構整體管理能力，
          從行政制度、人員管理、財務紀律到品質監測體系。
          主管和行政人員的備戰程度通常決定了這個區塊的得分高低。
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

      {/* Prev / Next navigation */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/home-care/professional-quality"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          貳、專業照護品質
        </Link>
        <Link
          href="/school/home-care/bonus"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          加分題
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
