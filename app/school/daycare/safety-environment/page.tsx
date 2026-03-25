import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { daycareProfile } from "@/lib/ai/evaluation-profiles/daycare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "肆、安全環境設備（項目 38–43）｜日間照顧機構評鑑",
  description:
    "日間照顧機構評鑑「安全環境設備」6 項評鑑基準詳細說明：空間環境、消防安全、設備維護、無障礙設施、交通接送服務、安全監控，含準備要訣與實用提示。",
  keywords: [
    "日照中心安全環境評鑑",
    "日照機構消防安全評鑑",
    "日間照顧無障礙設施評鑑",
    "日照交通接送服務評鑑",
    "臺北市日照評鑑安全設備",
    "113年度日間照顧評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/daycare/safety-environment" },
  openGraph: {
    title: "肆、安全環境設備（項目 38–43）｜日間照顧評鑑｜報告汪",
    description: "日間照顧機構評鑑安全環境設備 6 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/daycare/safety-environment",
  },
};

const section = daycareProfile.sections.find((s) => s.shortCode === "安")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  38: {
    content:
      "空間坪數需符合日照設置標準（每人至少 4.5 平方公尺活動空間）。評鑑委員會現場量測及觀察，走道是否淨空、地板是否防滑（建議有止滑墊或防滑地磚）、採光照度是否足夠都是查核重點。",
    variant: "info",
  },
  39: {
    content:
      "消防設備定期檢查記錄需有合格廠商簽章（每半年一次），不可只由機構自行填寫。消防演練建議包含老人疏散的輔具使用（輪椅推行、步行輔具撤離），並有照片記錄。",
    variant: "warning",
  },
  40: {
    content:
      "設備保養記錄建議以設備為單位建立個別維護紀錄表，包含保養日期、保養項目、廠商及費用。損壞設備的通報至修繕完成要有時間記錄，若無法即時修繕需說明暫時替代方案。",
    variant: "neutral",
  },
  41: {
    content:
      "無障礙設施現場查核重點：扶手是否穩固、坡道坡度是否符合規定（1:12 以下）、廁所扶手及空間是否符合輪椅迴轉半徑。定期檢查記錄建議每月或每季一次，若有損壞需即時修繕。",
    variant: "info",
  },
  42: {
    content:
      "接送車輛的定期保養記錄（含行車里程、保養項目）要與保養廠收據相符。駕駛人員建議定期接受緊急救護訓練（如 CPR）。輪椅固定裝置若無法固定輪椅型號需有替代安全措施說明。",
    variant: "warning",
  },
  43: {
    content:
      "監控設備使用需符合個人資料保護法，影像保存期限及查閱權限需有書面規定，並告知個案及家屬。緊急呼叫鈴建議每月測試一次並有測試記錄，確保功能正常可用。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "肆、安全環境設備（日間照顧機構評鑑基準項目 38–43）",
  description:
    "日間照顧機構評鑑基準「安全環境設備」6 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/daycare/safety-environment",
});

export default function DaycareSafetyEnvironmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 border-0 hover:bg-teal-500/20">
          肆、安全環境設備
        </Badge>
        <h1 className="text-2xl font-bold mb-3">安全環境設備（項目 38–43）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 6 個評鑑項目，是日照評鑑的最後一個區塊，著重在機構實體環境的安全性與無障礙可及性。
          評鑑委員通常以現場觀察為主要審查方式，確認空間、設備是否真正符合長者使用需求。
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

      {/* Prev / Next navigation */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/daycare/management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          參、經營管理效能
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
