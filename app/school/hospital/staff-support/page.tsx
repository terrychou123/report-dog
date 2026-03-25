import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { hospitalProfile } from "@/lib/ai/evaluation-profiles/hospital";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "1.2 員工管理與支持制度（項目 6–12）｜醫院評鑑小教室",
  description:
    "醫院評鑑「員工管理與支持制度」7 項評鑑項目詳細說明：員工支持方案、申訴機制、職業安全、職業傷害保護、健康管理、勞動條件及倫理規範，含準備要訣。",
  keywords: [
    "醫院評鑑員工管理",
    "醫院職業安全衛生",
    "醫院員工申訴",
    "醫院勞動條件",
    "醫院評鑑",
    "區域醫院評鑑",
    "地區醫院評鑑",
    "評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/hospital/staff-support" },
  openGraph: {
    title: "1.2 員工管理與支持制度（項目 6–12）｜醫院評鑑小教室｜報告汪",
    description: "醫院評鑑「員工管理與支持制度」7 項評鑑項目詳細說明與準備要訣。",
    url: "https://reportwang.com/school/hospital/staff-support",
  },
};

const section = (() => {
  const s = hospitalProfile.sections.find((s) => s.shortCode === "1.2");
  if (!s) throw new Error("hospitalProfile: section 1.2 not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  6: {
    content:
      "員工協助方案（EAP）需有實際可用的管道，不能僅停留在規定書面。建議確認心理諮商轉介流程、聯絡窗口及資源清單均已公告於工作站或院內網路，並能提供至少 1 件實際運用案例（去識別化）作為佐證。職場暴力處理流程需員工能實際說明，而非僅紙上規定。",
    variant: "info",
  },
  7: {
    content:
      "員工申訴機制最常見的缺失是「有制度、無執行」。評鑑委員可能直接詢問員工是否知道申訴管道，因此申訴流程需透過多管道宣導（海報、院內公告、職前訓練等）。申訴案件若有紀錄，需確保有後續處理及追蹤紀錄，且申訴人保護規定明確。",
    variant: "warning",
  },
  8: {
    content:
      "職業安全衛生管理是「重點」項目，委員通常會實地查看工作環境及詢問職安人員。重點準備：(1) 職安管理計畫含年度目標與執行追蹤；(2) 危害識別及風險評估紀錄（需涵蓋主要作業區域）；(3) 近兩年職安事故通報及改善紀錄；(4) 員工職安訓練時數及紀錄。",
    variant: "warning",
  },
  9: {
    content:
      "針扎及血液暴露事件是醫療院所最常見的職業傷害，需有標準化處理流程（SOP）並確保員工熟知。建議將針扎處理流程卡張貼於護理站、手術室等高風險區域，並定期模擬演練。投保記錄及職業傷害後追蹤管理文件需整理備查。",
    variant: "info",
  },
  10: {
    content:
      "員工健康管理重點在於「有做有記錄」。新進員工健康檢查報告需建檔，具傳染性疾病的處理決定需有書面依據。在職健康檢查結果若發現異常，需有後續追蹤及工作調整紀錄（如需異動）。健康促進方案（戒菸、運動、體重管理等）的辦理紀錄也需備妥。",
    variant: "info",
  },
  11: {
    content:
      "勞動條件保障雖屬「一般」類別，但若發現違法情事（如違規超時工作），影響將較嚴重。建議事前確認工時記錄、排班表、薪資發放紀錄均完整，並確認值班醫師及護理人員的連續工時符合規定。如有特殊排班情形，需有員工同意書及相關說明。",
    variant: "warning",
  },
  12: {
    content:
      "員工服務守則及倫理規範需落實於日常管理，而非僅存在於人事規章中。建議確認員工到職時有簽收守則的書面紀錄，倫理教育訓練每年辦理並有出席紀錄。若有員工違規懲處案件，需有完整的調查及處理紀錄（去識別化備查）。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "1.2 員工管理與支持制度（醫院評鑑項目 6–12）",
  description:
    "醫院評鑑「員工管理與支持制度」7 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/hospital/staff-support",
});

export default function HospitalStaffSupportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          1.2 員工管理與支持制度
        </Badge>
        <h1 className="text-2xl font-bold mb-3">員工管理與支持制度（項目 6–12）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本章共 7 個評鑑項目，涵蓋員工支持方案、申訴機制、職業安全、職業傷害保護、健康管理、勞動條件及倫理規範。
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
          <section key={item.id} id={`item-${item.id}`} aria-labelledby={`heading-${item.id}`} className="scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400 font-mono">
                {item.id}
              </span>
              <h2 id={`heading-${item.id}`} className="text-lg font-bold">{item.title}</h2>
              <span className="text-xs text-muted-foreground font-mono">{item.articleNumber}</span>
              {item.category === "必要" && (
                <Badge className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 border-0">必要</Badge>
              )}
              {item.category === "重點" && (
                <Badge className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0">重點</Badge>
              )}
              {item.category === "試評" && (
                <Badge variant="outline" className="text-xs">試評</Badge>
              )}
              {item.category === "可免評" && (
                <Badge variant="secondary" className="text-xs">可免評</Badge>
              )}
              <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
              <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">評鑑標準</p>
              <ol role="list" className="space-y-1.5 list-none pl-0">
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
          href="/school/hospital/strategy"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          1.1 經營策略
        </Link>
        <Link
          href="/school/hospital/human-resources"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          1.3 人力資源
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
