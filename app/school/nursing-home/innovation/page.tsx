import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { nursingHomeProfile } from "@/lib/ai/evaluation-profiles/nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon } from "lucide-react";
import { nursingHomeTips } from "@/lib/evaluation-tips/nursing-home";

export const metadata: Metadata = {
  title: "E、服務改進創新（項目 73–75）｜住宿型照顧機構評鑑",
  description:
    "住宿型照顧機構評鑑「服務改進創新」3 項評鑑基準詳細說明：前次評鑑建議改善、創新或配合政策措施執行、評鑑期間違規及重大負面事件，含準備要訣。",
  keywords: [
    "住宿型長照評鑑服務改進",
    "安養機構創新服務評鑑",
    "長照機構評鑑改善情形",
    "住宿型機構違規紀錄評鑑",
    "114年度住宿型長照評鑑",
    "臺北市安養機構評鑑創新",
  ],
  alternates: { canonical: "https://reportwang.com/school/nursing-home/innovation" },
  openGraph: {
    title: "E、服務改進創新（項目 73–75）｜住宿型照顧機構評鑑｜報告汪",
    description: "住宿型照顧機構評鑑服務改進創新 3 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/nursing-home/innovation",
  },
};

const section = nursingHomeProfile.sections.find((s) => s.shortCode === "創")!;

const tips = nursingHomeTips;

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "E、服務改進創新（住宿型照顧機構評鑑基準項目 73–75）",
  description:
    "住宿型照顧機構評鑑基準「服務改進創新」3 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/nursing-home/innovation",
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
          E、服務改進創新
        </Badge>
        <h1 className="text-2xl font-bold mb-3">服務改進創新（項目 73–75）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 3 個評鑑項目，是住宿型機構評鑑的最後一個區塊。前次評鑑改善與創新服務項目是加分機會，
          而違規及重大負面事件則為扣分項目，需特別謹慎維護機構的合法運作與住民安全。
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

      {/* Prev / Next navigation */}
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
