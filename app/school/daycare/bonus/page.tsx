import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { daycareProfile, meta as daycareMeta } from "@/lib/ai/evaluation-profiles/daycare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon } from "lucide-react";
import { daycareTips } from "@/lib/evaluation-tips/daycare";

export const metadata: Metadata = {
  title: "伍、加分題（項目 44–45）｜日間照顧機構評鑑",
  description:
    "115 年度日間照顧機構評鑑 2 項加分題詳細說明：服務原住民族之文化敏感度措施、機構權益保障（監視錄影設備），含準備要訣與法規依據，總計最多加 3 分。",
  keywords: [
    "日照加分題",
    "日間照顧加分題",
    "原住民族文化敏感度",
    "日照監視錄影設備",
    "臺北市日照評鑑",
    "日間照顧中心評鑑基準",
    "115年度評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/daycare/bonus" },
  openGraph: {
    title: "伍、加分題（項目 44–45）｜日間照顧評鑑｜報告汪",
    description:
      "115 年度日間照顧評鑑 2 項加分題完整說明與準備要訣，總計最多加 3 分。",
    url: "https://reportwang.com/school/daycare/bonus",
  },
};

const section = requireSection(daycareProfile.sections, "加");

const jsonLd = schoolSubpageJsonLd({
  type: "daycare",
  subpage: "bonus",
  section,
  name: "伍、加分題（日間照顧機構評鑑基準項目 44–45）",
  description:
    "115 年度日間照顧機構評鑑 2 項加分題詳細說明、準備要訣與法規依據。",
});

export default function DaycareBonusPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* 頁首 */}
      <div className="mb-6">
        <Badge className="mb-3 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-0 hover:bg-yellow-500/20">
          伍、加分題
        </Badge>
        <h1 className="text-2xl font-bold mb-3">加分題（項目 44–45）</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${daycareMeta.year} 年度` },
            { label: "資料來源", value: daycareMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={daycareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 2 個加分題項目，不計入正式 43 項評鑑項次，由評鑑委員共議給分，總計最多加 3 分（項目 44 最多加 2 分、項目 45 最多加 1 分）。
          加分題著重在機構是否展現對多元族群的文化敏感度，以及是否落實監視錄影設備的合規管理。
        </p>
      </div>

      {/* 目錄 */}
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

      {/* 評鑑項目列表 */}
      <div className="space-y-12">
        {section.items.map((item) => (
          <section key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-sm font-bold text-yellow-600 dark:text-yellow-400 font-mono">
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

            {daycareTips[item.id] && (
              <DocsTip variant={daycareTips[item.id].variant ?? "neutral"} title="準備要訣">
                {daycareTips[item.id].content}
              </DocsTip>
            )}
          </section>
        ))}
      </div>

      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      {/* 上下頁導航 */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/daycare/safety-environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          肆、安全環境設備
        </Link>
        <Link
          href="/school/daycare"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          返回日照評鑑總覽
        </Link>
      </div>
    </>
  );
}
