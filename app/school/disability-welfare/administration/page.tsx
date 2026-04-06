import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { disabilityWelfareProfile } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title:
    "一、行政組織及經營管理（項目 1–11）｜身心障礙福利機構評鑑｜109年度",
  description:
    "109年度身心障礙福利機構評鑑「行政組織及經營管理（含會計及財務管理）」11 項評鑑指標詳細說明：董事會運作、機構管理制度、員工管理、專業人力、會計制度、財務管理等，含準備要訣。",
  keywords: [
    "身心障礙福利機構評鑑行政管理",
    "身心障礙機構評鑑會計財務",
    "身心障礙機構董事會",
    "身心障礙機構人力配置",
    "身心障礙福利機構評鑑",
    "109年度評鑑準備",
  ],
  alternates: {
    canonical:
      "https://reportwang.com/school/disability-welfare/administration",
  },
  openGraph: {
    title:
      "一、行政組織及經營管理（項目 1–11）｜身心障礙福利機構評鑑｜報告汪",
    description:
      "109年度身心障礙福利機構評鑑行政組織及經營管理區塊 11 項指標詳細說明與準備要訣。",
    url: "https://reportwang.com/school/disability-welfare/administration",
  },
};

const section = (() => {
  const s = disabilityWelfareProfile.sections.find(
    (s) => s.shortCode === "行",
  );
  if (!s)
    throw new Error("disabilityWelfareProfile: section 行 not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  1: {
    content:
      "董（理）事會運作是法人治理的基礎。建議確認捐助章程與實際運作一致，會議紀錄需完整記錄出席人數、議案及決議，並保留函報主管機關之公文副本。法人附設機構可以法人運作狀況評分。",
    variant: "info",
  },
  2: {
    content:
      "機構管理制度涵蓋面向廣泛（4項標準）。建議：(1)會議紀錄需包含追蹤管考欄位；(2)工作手冊至少涵蓋組織架構、業務執掌、入出機構辦法等；(3)員工權益制度需含差假、薪資、申訴等規定；(4)入出機構管理辦法須涵蓋5項以上內容。",
    variant: "warning",
  },
  3: {
    content:
      "機構配合情形重點在於系統登打與人員配置。務必定期更新「全國身心障礙福利資訊整合平台」資料，且確認員工良民證或性侵害犯罪查閱紀錄齊全。實際服務人數需達核定人數80%。",
    variant: "warning",
  },
  4: {
    content:
      "員工健檢需注意不同職類的檢查項目差異：一般員工每2年、新進人員到職前（需含糞便檢查）、廚工及夜間人員每年。健檢報告以3個月內為有效，106-108年度資料需完整保留。",
    variant: "info",
  },
  5: {
    content:
      "訓練時數要求明確：新進人員3個月內需滿24小時職前訓練；急救訓練內部參加率需達80%；直接服務人員每年至少20小時在職訓練（含4小時應急管制＋2小時口腔照護）。所有訓練需有效益評量紀錄。",
    variant: "warning",
  },
  6: {
    content:
      "專業服務人力（8分）是本區塊最高分項目，涵蓋社工、護理、教保/訓練、生活服務4類人力比。計算採106-108年歷月平均值。注意各機構類型適用不同比例，夜間人力不符規定會酌扣0.5分。",
    variant: "warning",
  },
  7: {
    content:
      "法定通報為新增指標，需將性侵害犯罪防治法第8條及身心障礙者權益保障法第76條的通報機制納入內部流程，並辦理相關訓練。建議製作通報流程圖並張貼於工作站。",
    variant: "info",
  },
  8: {
    content:
      "會計制度需有日記帳及總分類帳。重點注意：各項支出需有合法憑據、營運擔保金及補助款需設專戶專款專用。公立機構標準3不適評。",
    variant: "info",
  },
  9: {
    content:
      "財務報表需經董事會議決議並函報主管機關。3年度平均業務支出占支出合計需≧75%，建議提前計算確認。標準1為新增標準。",
    variant: "info",
  },
  10: {
    content:
      "財物管理重點：1萬元以上經費需以支票或金融機構撥付；印鑑需分別保管；財產每年至少盤點1次；政府補助財產需編列清冊並黏貼財產標示。",
    variant: "info",
  },
  11: {
    content:
      "捐贈財物管理需建立完整徵信制度。注意指定用途捐款得集中一個專戶但需足額儲存，且需公開徵信（網站、刊物或電子媒體）。法人附設機構可以法人運作狀況評分。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "一、行政組織及經營管理（109年度身心障礙福利機構評鑑指標項目 1–11）",
  description:
    "109年度身心障礙福利機構評鑑指標「行政組織及經營管理」11 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/disability-welfare/administration",
});

export default function DisabilityWelfareAdministrationPage() {
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
          行政組織及經營管理（含會計及財務管理）（項目 1–11）
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 11 個評鑑項目，分為兩個子區塊：「行政組織及經營管理」（項目
          1-7）涵蓋董事會運作、機構管理、員工管理及專業人力配置；「會計及財務管理」（項目
          8-11）涵蓋會計制度、財務報告、財物管理及捐贈徵信。
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
                <span className="truncate">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Items */}
      <div className="space-y-12">
        {section.items.map((item, idx) => {
          // 在子區塊切換處插入標題
          const showSubHeader =
            idx === 0 ||
            item.subSection !== section.items[idx - 1]?.subSection;
          return (
            <div key={item.id}>
              {showSubHeader && (
                <h3 className="text-base font-bold text-muted-foreground mb-6 pt-4 border-t first:border-t-0 first:pt-0">
                  {item.subSection}
                </h3>
              )}
              <section
                id={`item-${item.id}`}
                aria-labelledby={`heading-${item.id}`}
                className="scroll-mt-20"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
                    {item.id}
                  </span>
                  <h2
                    id={`heading-${item.id}`}
                    className="text-lg font-bold"
                  >
                    {item.title}
                  </h2>
                  <Badge variant="outline" className="text-xs">
                    {item.indicatorCode}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {item.score}分
                  </Badge>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">評鑑標準</p>
                  <ol role="list" className="space-y-1.5 list-none pl-0">
                    {item.criteria.map((criterion, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-sm text-muted-foreground"
                      >
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
                    <p className="text-xs text-muted-foreground">
                      {item.reviewBasis}
                    </p>
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
                    variant={tips[item.id].variant ?? "neutral"}
                    title="準備要訣"
                  >
                    {tips[item.id].content}
                  </DocsTip>
                )}
              </section>
            </div>
          );
        })}
      </div>

      {/* Prev / Next navigation */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/disability-welfare"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回總覽
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
