import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { daycareProfile } from "@/lib/ai/evaluation-profiles/daycare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { daycareTips } from "@/lib/evaluation-tips/daycare";

export const metadata: Metadata = {
  title: "參、經營管理效能（項目 23–37）｜日間照顧機構評鑑",
  description:
    "115 年度日間照顧機構評鑑「經營管理效能」15 項評鑑基準詳細說明：業務計畫、工作手冊、人力設置、服務人員訓練、留任率、財務管理、緊急事件處理與性騷擾防治機制，含準備要訣。",
  keywords: [
    "日照中心經營管理評鑑",
    "日間照顧人員配置評鑑",
    "日照機構財務管理評鑑",
    "日照服務人員留任率",
    "日照緊急事件處理評鑑",
    "臺北市日照評鑑管理效能",
    "115年度日間照顧評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/daycare/management" },
  openGraph: {
    title: "參、經營管理效能（項目 23–37）｜日間照顧評鑑｜報告汪",
    description: "115 年度日間照顧機構評鑑經營管理效能 15 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/daycare/management",
  },
};

const section = daycareProfile.sections.find((s) => s.shortCode === "管")!;

// 子分類定義（對應 115 年度基準書結構）
const subCategories = [
  { label: "（一）行政制度", ids: [23, 24, 25, 26, 27] },
  { label: "（二）服務人員管理", ids: [28, 29, 30, 31, 32, 33] },
  { label: "（三）財務管理", ids: [34] },
  { label: "（四）緊急事件管理", ids: [35, 36, 37] },
];

const tips = daycareTips;

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "參、經營管理效能（日間照顧機構評鑑基準項目 23–37）",
  description:
    "115 年度日間照顧機構評鑑基準「經營管理效能」15 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/daycare/management",
});

export default function DaycareManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* 頁首 */}
      <div className="mb-6">
        <Badge className="mb-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0 hover:bg-orange-500/20">
          參、經營管理效能
        </Badge>
        <h1 className="text-2xl font-bold mb-3">經營管理效能（項目 23–37）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 15 個評鑑項目，分為四個子分類：行政制度、服務人員管理、財務管理與緊急事件管理。
          115 年度新增「前次評鑑建議改善情形」及「機構性騷擾防治機制」兩個項目，
          主管和行政人員的備戰程度通常決定了這個區塊的得分高低。
        </p>
      </div>

      {/* 目錄 */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          本頁內容
        </p>
        <div className="space-y-3">
          {subCategories.map((cat) => (
            <div key={cat.label}>
              <p className="text-xs font-medium text-muted-foreground mb-1">{cat.label}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2">
                {section.items
                  .filter((item) => cat.ids.includes(item.id))
                  .map((item) => (
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
            </div>
          ))}
        </div>
      </nav>

      {/* 評鑑項目列表（依子分類呈現） */}
      <div className="space-y-16">
        {subCategories.map((cat) => (
          <div key={cat.label}>
            {/* 子分類標題 */}
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 pb-2 border-b">
              {cat.label}
            </h2>
            <div className="space-y-12">
              {section.items
                .filter((item) => cat.ids.includes(item.id))
                .map((item) => (
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
                      <p className="text-sm font-semibold mb-2">評鑑標準</p>
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
          </div>
        ))}
      </div>

      {/* 上下頁導航 */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/daycare/professional-quality"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          貳、專業照護品質
        </Link>
        <Link
          href="/school/daycare/safety-environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          肆、安全環境設備
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
