import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { nursingHomeProfile } from "@/lib/ai/evaluation-profiles/nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "A、經營管理效能（項目 1–15）｜住宿型照顧機構評鑑",
  description:
    "住宿型照顧機構評鑑「經營管理效能」15 項評鑑基準詳細說明：工作手冊、入出機構管理、業務計畫、缺失改善、人員保護、危機管理、人員設置資格與教育訓練，含準備要訣。",
  keywords: [
    "住宿型長照評鑑經營管理",
    "安養機構人員配置評鑑",
    "長照機構工作手冊評鑑",
    "護理人員設置評鑑",
    "114年度住宿型長照評鑑",
    "臺北市安養機構評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/nursing-home/management" },
  openGraph: {
    title: "A、經營管理效能（項目 1–15）｜住宿型照顧機構評鑑｜報告汪",
    description: "住宿型照顧機構評鑑經營管理效能 15 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/nursing-home/management",
  },
};

const section = nursingHomeProfile.sections.find((s) => s.shortCode === "管")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  1: {
    content:
      "工作手冊應按章節索引整理，建議製作目錄並標注頁碼，方便評鑑委員快速查找。工作手冊須記載緊急事件求助與通報聯繫窗口、電話，並確認至少每年修訂一次並留有修訂紀錄。",
    variant: "info",
  },
  2: {
    content:
      "確認現場實際服務人數未超過許可床數，且收案類型（長照型/養護型/失智型/安養型）與立案相符。近 4 年違規收容紀錄建議主動向主管機關索取書面確認，勿等評鑑委員查詢時才臨時確認。",
    variant: "warning",
  },
  3: {
    content:
      "年度業務計畫需在前一年度訂定（非評鑑前才補製），短、中長程計畫須涵蓋 3 年以上且具可行性。建議將計畫執行進度以量化指標呈現，並定期追蹤記錄，以利評鑑委員核查績效。",
    variant: "info",
  },
  4: {
    content:
      "建立缺失改善追蹤表，清楚列出改善項目、預定完成日期、實際完成日期及改善佐證。若無法 100% 改善，需提供說明文件。查核對象包含衛福、消防、建管、勞工等各主管機關的查核紀錄。",
    variant: "warning",
  },
  5: {
    content:
      "辦法中需清楚區分住民保護、性騷擾及性侵害三類事件，各有獨立的預防措施與處理流程（含申訴及再申訴）。若機構有聘用外籍工作人員，辦法需備有該國語言版本。",
    variant: "warning",
  },
  6: {
    content:
      "風險管理計畫至少涵蓋 3 個以上的風險類別（如天然災害、財務風險、意外事件），每類需有明確處理程序。每半年需有書面分析報告，若有事件發生，應有逐案處置記錄。",
    variant: "info",
  },
  7: {
    content:
      "業務負責人（主任/院長）需確認：資格符合法規、專任且在機構投保勞健保並提撥勞退金。評鑑委員通常會現場訪談，確認業務負責人確實參與行政與照護品質管理，而非掛名。",
    variant: "warning",
  },
  8: {
    content:
      "社工人員比例依收案類型計算（長照/養護/失智 1:100；安養 1:80）。若有兼任社工，需備有原任職單位同意證明書，且已向該單位報備，並在機構投保勞保。注意：服務簽到紀錄需與個案紀錄相符。",
    variant: "info",
  },
  9: {
    content:
      "護理人員為一級必要項目。聘任人數需符合設置標準（長照 1:15；養護/失智 1:20），且全日均應有護理人員上班（含夜班）。確認執業登錄有效，近 4 年無違規聘用紀錄。",
    variant: "warning",
  },
  10: {
    content:
      "兼任（特約）專業人員（營養師、物理/職能治療師、醫師等）需完成支援報備程序，持有主管機關核定的公文或合約，並有實際到勤簽到紀錄。到勤紀錄與服務紀錄需能相互對應。",
    variant: "info",
  },
  11: {
    content:
      "照服員為一級必要項目，且設置比例分日班與夜班計算，不可混用。注意：外籍照服員人數不得超過本國籍照服員及護理人員的總人數，且全日各班需有我國籍照服員上班。",
    variant: "warning",
  },
  12: {
    content:
      "近 4 年勞動條件違規紀錄（勞基法、性別工作平等法、勞工退休金條例）向主管機關確認時建議取得書面文件。評鑑委員通常也會現場訪談工作人員，確認薪資、排班等實際情形。",
    variant: "neutral",
  },
  13: {
    content:
      "職前訓練需於到職後 1 個月內完成（至少 16 小時），訓練內容需包含感染管制（至少 4 小時）、勞工安全衛生（至少 3 小時）、老人保護概念等。建議製作新進訓練完成追蹤清單，並留有適任性考核記錄。",
    variant: "info",
  },
  14: {
    content:
      "每位工作人員每年至少 20 小時在職訓練，其中感染管制至少 4 小時，且急救訓練需在有效期限內（通常 3 年）。建議以人員為單位建立訓練記錄表，清楚列出各課程時數及完訓證明，以利評鑑委員核查。",
    variant: "info",
  },
  15: {
    content:
      "廚工需具備丙級以上餐飲技術士執照（正本備查），每年接受至少 8 小時外部衛生訓練（如餐飲工會辦理，非機構內部訓練）。若廚工人員有異動，須確認新進廚工也具備相關資格及訓練記錄。",
    variant: "neutral",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "A、經營管理效能（住宿型照顧機構評鑑基準項目 1–15）",
  description:
    "住宿型照顧機構評鑑基準「經營管理效能」15 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/nursing-home/management",
});

export default function NursingHomeManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0 hover:bg-orange-500/20">
          A、經營管理效能
        </Badge>
        <h1 className="text-2xl font-bold mb-3">經營管理效能（項目 1–15）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 15 個評鑑項目，涵蓋住宿型機構的整體管理能力，從行政制度、人員設置資格、教育訓練到危機風險管理。
          負責人的資格與實際參與程度是評鑑委員關注的核心重點。
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
          href="/school/nursing-home"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回總覽
        </Link>
        <Link
          href="/school/nursing-home/professional-quality"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          B、專業照護品質
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
