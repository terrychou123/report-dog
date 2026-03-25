import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { homeCareProfile } from "@/lib/ai/evaluation-profiles/home-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

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

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  15: {
    content:
      "組織章程、行政規定和 SOP 要「可查閱」，建議製作電子版目錄並分類整理，讓評鑑委員可以快速定位到任何一份文件。",
    variant: "info",
  },
  16: {
    content:
      "「依法令規定配置」指照服員與個案人數比例符合長照服務法規定。人員缺額要有補充機制的書面說明（如委派給哪家人力公司、多久補足），不能只口頭說「在招募中」。",
    variant: "warning",
  },
  17: {
    content:
      "照顧服務員訓練結業證書影本必須建檔，若有人員資格即將到期（如急救證照），應有到期追蹤表。外籍照服員的資格認定需特別注意相關法規要求。",
    variant: "warning",
  },
  18: {
    content:
      "年度訓練計畫需在年初制定並保存。若有臨時新增訓練，也要補入計畫或另立記錄。訓練時數規定因機構類型和人員資格有所不同，建議向主管機關確認。",
    variant: "info",
  },
  19: {
    content:
      "健康檢查結果屬個人隱私，不可讓其他人員查看，應有專門的保密管理機制。患有傳染病人員的「停止入戶服務」決定需有書面授權記錄。",
    variant: "warning",
  },
  20: {
    content:
      "考核制度要有「評核標準」，不能只是主管的主觀印象。建議使用量化指標（如準時率、紀錄完整率、申訴次數）搭配質性評核。",
    variant: "neutral",
  },
  21: {
    content:
      "財務帳冊不需要對外公開，但需讓評鑑委員可以查閱。建議帳冊與憑證採用統一編號對應，方便追蹤查核。",
    variant: "neutral",
  },
  22: {
    content:
      "「收費標準公開」要具體到在服務合約或入案說明書中列明。退費爭議（即使最後無退費）也需有書面處理記錄，包含個案或家屬的簽名確認。",
    variant: "info",
  },
  23: {
    content:
      "留任率計算公式需一致，建議明確定義「專任」的標準（如每週固定服務幾小時以上）。離職分析要有具體改善措施，如「薪資調整」「彈性排班」等，不能只寫「加強關懷」。",
    variant: "info",
  },
  24: {
    content:
      "兼任人員的流動率通常高於專任人員，改善措施可以著重在「入職導引」和「固定合作關係建立」。若機構沒有兼任人員，此項目可直接標注「N/A」並說明理由。",
    variant: "neutral",
  },
  25: {
    content:
      "資訊系統的「權限管控」需有具體設定紀錄（如每位人員的帳號權限清單）。「定期備份」建議至少每週一次，並有備份成功的系統記錄或手動紀錄。",
    variant: "info",
  },
  26: {
    content:
      "感染管制 SOP 要包含洗手步驟、個人防護裝備使用時機、物品清消方式。疫情期間的特別措施（如 COVID-19 相關）應另立記錄保存。",
    variant: "warning",
  },
  27: {
    content:
      "「品質改善」要有 PDCA 循環的完整記錄：計畫（P）、執行（D）、查核（C）、行動（A）。只有計畫沒有執行和追蹤記錄是最常見的缺失。",
    variant: "warning",
  },
  28: {
    content:
      "滿意度調查需「匿名」，建議使用密封回收信封或線上表單。分析報告要有「改善措施」欄位，不能只呈現統計數字。發放對象應包含所有個案或隨機抽樣，抽樣方法需說明。",
    variant: "info",
  },
  29: {
    content:
      "品質指標至少要包含「服務準時率」「個案滿意度」「申訴件數/率」三項。監測頻率建議每季一次，年度報告需呈現趨勢分析（如各季度比較）。",
    variant: "info",
  },
  30: {
    content:
      "機構自評建議在評鑑前 2–3 個月完成，讓改善措施有時間執行並留下追蹤記錄。自評結果需簽名確認，若有董事會需提交會議討論並留存紀錄。",
    variant: "neutral",
  },
};

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
