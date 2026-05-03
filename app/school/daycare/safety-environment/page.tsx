import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection } from "@/lib/school-jsonld";
import { daycareProfile } from "@/lib/ai/evaluation-profiles/daycare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { daycareTips } from "@/lib/evaluation-tips/daycare";

export const metadata: Metadata = {
  title: "肆、安全環境設備（項目 38–43）｜日間照顧機構評鑑",
  description:
    "115 年度日間照顧機構評鑑「安全環境設備」6 項評鑑基準詳細說明：高齡友善環境、盥洗衛生設備、休息場所、飲用水檢查、廚房衛生、環境清潔及病媒防治，含準備要訣與實用提示。",
  keywords: [
    "日照中心安全環境評鑑",
    "日照機構高齡友善環境評鑑",
    "日間照顧廚房衛生評鑑",
    "日照飲用水檢查評鑑",
    "日照機構病媒防治",
    "臺北市日照評鑑安全設備",
    "115年度日間照顧評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/daycare/safety-environment" },
  openGraph: {
    title: "肆、安全環境設備（項目 38–43）｜日間照顧評鑑｜報告汪",
    description: "115 年度日間照顧機構評鑑安全環境設備 6 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/daycare/safety-environment",
  },
};

const section = requireSection(daycareProfile.sections, "安");

const tips = daycareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "daycare",
  subpage: "safety-environment",
  section,
  name: "肆、安全環境設備（日間照顧機構評鑑基準項目 38–43）",
  description:
    "115 年度日間照顧機構評鑑基準「安全環境設備」6 個評鑑項目詳細說明、準備要訣與實用提示。",
});

export default function DaycareSafetyEnvironmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* 頁首 */}
      <div className="mb-6">
        <Badge className="mb-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 border-0 hover:bg-teal-500/20">
          肆、安全環境設備
        </Badge>
        <h1 className="text-2xl font-bold mb-3">安全環境設備（項目 38–43）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 6 個評鑑項目，是日照評鑑的最後一個區塊，著重在機構實體環境的安全性與高齡友善程度。
          115 年度將子分類調整為「（一）硬體環境設施」，評鑑委員以現場觀察為主要審查方式，
          確認空間、設備是否真正符合長者使用需求。
        </p>
      </div>

      {/* 子分類標題 */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pb-2 border-b">
          （一）硬體環境設施
        </h2>
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
              <span className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center text-sm font-bold text-teal-600 dark:text-teal-400 font-mono">
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

      {/* 上下頁導航 */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/daycare/management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          參、經營管理效能
        </Link>
        <Link
          href="/school/daycare/bonus"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          伍、加分題
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
