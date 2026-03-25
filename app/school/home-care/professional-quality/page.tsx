import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { homeCareProfile } from "@/lib/ai/evaluation-profiles/home-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "貳、專業照護品質（項目 5–14）",
  description:
    "居家服務機構評鑑「專業照護品質」10 項評鑑基準詳細說明：入案評估、個別服務計畫、身體照顧、緊急事件處理、督導訪視等，含準備要訣與實用提示。",
  keywords: [
    "居家服務專業照護品質",
    "照護品質評鑑",
    "個別服務計畫評鑑",
    "居家服務入案評估",
    "居家督導訪視",
  ],
  alternates: { canonical: "https://reportwang.com/school/home-care/professional-quality" },
  openGraph: {
    title: "貳、專業照護品質（項目 5–14）｜居家服務評鑑｜報告汪",
    description: "居家服務機構評鑑專業照護品質 10 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/home-care/professional-quality",
  },
};

const section = homeCareProfile.sections[1]; // 貳、專業照護品質

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  5: {
    content:
      "評估工具需標準化，建議使用 ADL（日常生活活動功能量表）或 IADL（工具性日常生活活動功能量表）。每年至少重新評估一次，如個案狀況明顯改變應即時重評。",
    variant: "info",
  },
  6: {
    content:
      "服務計畫需有個案或家屬親筆簽名同意，單純「口頭告知」不符合標準。電子簽名需符合電子簽章法規定，否則仍需紙本備查。",
    variant: "warning",
  },
  7: {
    content:
      "評值不等於填表，要有「依評值結果調整計畫」的書面記錄。若評值後計畫未調整，需記載理由（如「個案狀況穩定，計畫維持不變」）。",
    variant: "info",
  },
  8: {
    content:
      "照服員入戶服務前後的安全確認（防跌評估、環境危險因子）也是評鑑重點。建議在服務紀錄中加入一欄「安全狀況確認」。",
    variant: "neutral",
  },
  9: {
    content:
      "「家務協助不超越服務範疇」是常見缺失。長照 2.0 規定家務服務不包含全家人的清潔、非個案使用的空間，照服員應清楚知道服務範圍的界線。",
    variant: "warning",
  },
  10: {
    content:
      "緊急事件處理 SOP 要具體到「誰負責打電話給誰」，不能只寫「通報主管」。建議每季做一次桌上演練並留下記錄。",
    variant: "info",
  },
  11: {
    content:
      "家屬溝通記錄建議使用統一格式，包含「溝通日期、溝通對象、討論重點、達成共識、後續追蹤事項」五個欄位，便於評鑑委員快速核閱。",
    variant: "neutral",
  },
  12: {
    content:
      "電訪與入戶訪視的比例要符合機構規定。常見缺失是電訪記錄過於簡略（如只記「狀況良好」），建議記載至少三個面向：身體狀況、服務滿意度、近期特殊事項。",
    variant: "warning",
  },
  13: {
    content:
      "電子服務紀錄系統需有照服員本人登入（不可讓別人代填），若使用紙本，照服員當日服務結束後應即時填寫並親筆簽名。保存年限通常為 3 年，請確認機構規定。",
    variant: "info",
  },
  14: {
    content:
      "結案後 30 天內仍應有追蹤記錄，確認個案是否已轉介至其他服務或安置妥當。若個案家屬拒絕追蹤，需書面記載並保存。",
    variant: "neutral",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "貳、專業照護品質（居家服務機構評鑑基準項目 5–14）",
  description:
    "居家服務機構評鑑基準「專業照護品質」10 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/home-care/professional-quality",
});

export default function ProfessionalQualityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          貳、專業照護品質
        </Badge>
        <h1 className="text-2xl font-bold mb-3">專業照護品質（項目 5–14）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 10 個評鑑項目，是評鑑分量最重的核心區塊，檢視機構從個案入案到結案的完整照護流程，
          包括評估、計畫擬定、服務執行品質、緊急應變能力與督導機制。
          書面記錄的完整性與工作人員的實際執行情形都是評核重點。
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
              <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400 font-mono">
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
          href="/school/home-care/client-rights"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          壹、個案權益保障
        </Link>
        <Link
          href="/school/home-care/management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          參、經營管理效能
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
