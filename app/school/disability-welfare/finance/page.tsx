import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection } from "@/lib/school-jsonld";
import { disabilityWelfareProfile } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { disabilityWelfareTips } from "@/lib/evaluation-tips/disability-welfare";

export const metadata: Metadata = {
  title: "會計及財務管理（指標 2101–2104）｜身心障礙福利機構評鑑｜109年度",
  description:
    "109年度身心障礙福利機構評鑑「會計及財務管理」4 項指標（2101–2104）完整說明：會計制度建立、財務報告函報、財物盤點管理、捐贈財物徵信，含常見扣分項目與準備要訣。",
  keywords: [
    "身心障礙機構會計制度評鑑",
    "身心障礙機構財務報告評鑑",
    "社福機構財務管理評鑑",
    "109年度身心障礙福利機構評鑑",
    "身心障礙機構捐贈徵信",
    "身心障礙福利機構評鑑財務",
  ],
  alternates: {
    canonical: "https://reportwang.com/school/disability-welfare/finance",
  },
  openGraph: {
    title: "會計及財務管理（2101–2104）｜身心障礙福利機構評鑑｜報告汪",
    description: "109年度身心障礙福利機構評鑑會計及財務管理 4 項指標完整說明與準備要訣。",
    url: "https://reportwang.com/school/disability-welfare/finance",
  },
};

// 從 行 section 取出 items 8-11（會計及財務管理）
const sectionHang = requireSection(disabilityWelfareProfile.sections, "行");
const financeItems = sectionHang.items.filter((i) => i.id >= 8 && i.id <= 11);
const section = { ...sectionHang, items: financeItems };

const tips = disabilityWelfareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "disability-welfare",
  subpage: "finance",
  section,
  name: "會計及財務管理（109年度身心障礙福利機構評鑑指標 2101–2104）",
  description:
    "109年度身心障礙福利機構評鑑「（二）會計及財務管理」4 項指標完整說明，涵蓋會計制度、財務報告、財物管理及捐贈徵信。",
  extraFaq: [
    {
      question: "身心障礙機構財務報告需向哪個機關函報？",
      answer:
        "依指標 2102，財務報表（含資產負債表、收支餘絀表、現金流量表、淨值變動表及附註）須經董事會決議或負責人認可後，函報立案之主管機關備查，且 3 年度平均業務支出占支出合計需達 75% 以上。",
    },
    {
      question: "捐贈款項必須如何專戶管理？",
      answer:
        "指定用途捐款須設置專戶存款，但同一專戶中性質不同的款項仍應依原定用途支付；指定用途捐款必須公開徵信於機構網站、刊物或新聞紙。無論捐款金額，均需開立收據並依規定函報。",
    },
    {
      question: "一萬元以上的支出必須如何處理？",
      answer:
        "依指標 2103，新臺幣 1 萬元以上的支出，必須全數以支票支付或透過金融機構撥付，不可使用現金支付，以確保交易有可查驗的金融紀錄。",
    },
  ],
});

export default function DisabilityWelfareFinancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0 hover:bg-blue-500/20">
          一、行政組織及經營管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          （二）會計及財務管理（指標 2101–2104）
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊為「行政組織及經營管理」的第二子區塊，共 4 項指標（項目 8–11），合計 12 分，
          涵蓋機構的會計制度建立、財務報告函報、財物盤點管理及捐贈財物徵信。
          財務透明度是主管機關監督重點，建議優先確保會計制度完整且定期函報。
        </p>
      </div>

      {/* Mini TOC */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          本頁指標
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {financeItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#item-${item.id}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-background border flex items-center justify-center text-xs font-mono">
                  {item.id}
                </span>
                <span className="truncate">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Items */}
      <div className="space-y-12">
        {financeItems.map((item) => (
          <section key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
                {item.id}
              </span>
              <h2 className="text-lg font-bold">{item.title}</h2>
              <Badge variant="outline" className="text-xs">{item.indicatorCode}</Badge>
              <Badge variant="secondary" className="text-xs">{item.score}分</Badge>
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

            {item.reviewBasis && (
              <div className="mb-4">
                <p className="text-sm font-semibold mb-1">
                  評鑑實施方式：{item.reviewMethod}
                </p>
                <p className="text-xs text-muted-foreground">{item.reviewBasis}</p>
              </div>
            )}

            {item.note && (
              <div className="mb-4 rounded-md bg-muted/50 border p-3">
                <p className="text-xs text-muted-foreground whitespace-pre-line">
                  📌 {item.note}
                </p>
              </div>
            )}

            {tips[item.id] && (
              <DocsTip
                variant={(tips[item.id].variant ?? "neutral") as DocsTipVariant}
                title="準備要訣"
              >
                {tips[item.id].content}
              </DocsTip>
            )}
          </section>
        ))}
      </div>

      {/* Prev / Next */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/disability-welfare/administration"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          一、行政組織及經營管理
        </Link>
        <Link
          href="/school/disability-welfare/environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          二、環境設施及安全維護
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
