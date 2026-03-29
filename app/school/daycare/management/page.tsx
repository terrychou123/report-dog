import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { daycareProfile } from "@/lib/ai/evaluation-profiles/daycare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

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

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  23: {
    content:
      "年度業務計畫需在年初完成並有主管核定，計畫內容要具體可執行（如收案人數目標、活動辦理場次、訓練時數）。評鑑時會對照計畫與實際執行記錄，計畫與執行落差大需有書面說明原因，建議每季進行執行進度自我檢視。",
    variant: "info",
  },
  24: {
    content:
      "工作手冊需涵蓋主要業務流程（如收案程序、照護紀錄規範、緊急處理 SOP），且需定期更新（建議每年檢視一次）。評鑑委員關注手冊是否為員工實際使用，而非只是備查存放，建議在新進人員訓練中使用工作手冊並留下記錄。",
    variant: "info",
  },
  25: {
    content:
      "行政會議（如主管會議、工作人員會議）需定期召開（建議每月至少一次）並有完整會議記錄，記錄需包含議題、討論內容、決議事項及追蹤狀態。評鑑委員關注會議是否有實質討論機構服務品質議題，而非僅做行政宣達。",
    variant: "neutral",
  },
  26: {
    content:
      "器材（輪椅、助行器、電動床等）需有個別維護記錄卡，記載購入日期、保養週期、維修歷程。損壞器材需即時停用並標示，修繕完成前需有替代方案。評鑑委員會現場確認器材功能是否正常及維護記錄是否與實際狀況相符。",
    variant: "neutral",
  },
  27: {
    content:
      "115 年度新增項目：評鑑委員會對照上次評鑑建議事項，確認機構是否已具體改善並有執行記錄。建議在收到上次評鑑報告後即建立改善追蹤表，列出每項建議的負責人、預計完成日期及實際執行結果，作為本次評鑑的重要佐證。",
    variant: "warning",
  },
  28: {
    content:
      "人力配置需符合日照服務設置標準（依核定收案人數計算護理師、社工、照服員比例）。若有缺額，需有招募中的書面佐證（如職缺公告、面試記錄）。外籍照服員需確認工作許可及照服員訓練資格，若有人員兼任情形需說明符合規定的依據。",
    variant: "warning",
  },
  29: {
    content:
      "年度教育訓練計畫需在年初制定，涵蓋長照法規、照護技術、緊急處理、感染管制等面向（每人每年至少 20 小時）。臨時加辦的訓練也需補充至計畫記錄。評鑑抽查訓練簽到表及課程資料，確認計畫與實際執行相符。",
    variant: "info",
  },
  30: {
    content:
      "留任率計算公式：（年底在職人數 ÷ 年初在職人數）× 100%，計算期間為評鑑前一年度。若留任率偏低（低於 60%），需提供書面說明原因（如人員自行離職、自然退休），並說明機構已採取的留任措施。",
    variant: "warning",
  },
  31: {
    content:
      "業務負責人（主任）需具備社工師或社工員資格，並有在職訓練記錄。若有臨時代理主任情形，需說明代理期間及資格符合情形。評鑑委員關注主任是否實際在機構主持業務，而非掛名登記。",
    variant: "info",
  },
  32: {
    content:
      "服務人員年度健康檢查記錄需備齊，項目需包含胸部 X 光（結核病篩檢）。若有人員未完成檢查，需有說明原因及後續安排。廚房工作人員另需有食品從業人員健康證明（A 型肝炎及傷寒檢驗）。",
    variant: "warning",
  },
  33: {
    content:
      "服務人員疫苗注射記錄（如流感疫苗、COVID-19 疫苗）需備齊。若有人員未接種，需有說明原因（如醫療禁忌）。115 年度要求機構主動提供或協助安排員工接種，並留有集體接種或自行接種的記錄彙整。",
    variant: "info",
  },
  34: {
    content:
      "財務帳冊需備齊供評鑑委員查閱，帳冊與憑證需統一編號對應。收費標準需在服務合約、DM 及公告欄中公開。若為非營利法人需依規定辦理財務公開及主管機關申報。退費爭議即使最終無退費，也需有書面記錄含家屬確認簽名。",
    variant: "neutral",
  },
  35: {
    content:
      "意外事件（跌倒、燙傷、噎食等）及緊急事件（急症、走失）均需有 SOP，且需有實際演練記錄（每年至少一次）。事件發生後需有書面事件報告（含原因分析及改善措施），並在期限內通報主管機關。評鑑委員會抽查特定事件的完整紀錄。",
    variant: "warning",
  },
  36: {
    content:
      "急救箱需備有完整急救物品（含 AED 或確認設置位置），所有物品需在有效期限內。每月定期清點並有記錄（含清點人員簽名）。員工急救訓練證照（CPR + AED）需在有效期限內，建議製作到期追蹤表提前安排複訓。",
    variant: "warning",
  },
  37: {
    content:
      "115 年度新增項目：機構需有性騷擾防治相關書面規定及申訴管道，且需有年度員工教育訓練記錄（包含認識性騷擾、申訴流程等內容）。評鑑委員會確認規定是否已讓全體員工知悉（如發給員工手冊、訓練簽到表），並確認申訴管道是否運作。",
    variant: "warning",
  },
};

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
