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
    "日間照顧機構評鑑「經營管理效能」15 項評鑑基準詳細說明：機構行政管理、人員配置資格訓練、財務收費管理、感染管制、委外服務、危機管理、品質監測與機構自評，含準備要訣。",
  keywords: [
    "日照中心經營管理評鑑",
    "日間照顧人員配置評鑑",
    "日照機構財務管理評鑑",
    "日照感染管制評鑑",
    "臺北市日照評鑑管理效能",
    "113年度日間照顧評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/daycare/management" },
  openGraph: {
    title: "參、經營管理效能（項目 23–37）｜日間照顧評鑑｜報告汪",
    description: "日間照顧機構評鑑經營管理效能 15 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/daycare/management",
  },
};

const section = daycareProfile.sections.find((s) => s.shortCode === "管")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  23: {
    content:
      "組織章程及各項行政管理規定要分類整理，建議製作索引清單，方便評鑑委員快速查找。行政會議記錄需有主席簽名，並顯示實際討論議題，不能只記錄「宣達事項」。",
    variant: "info",
  },
  24: {
    content:
      "日照中心依規定須配置主任（社工師/社工員）、護理師、照服員等人員，人數比例以核定收案人數計算。若有缺額，須有招募中的書面佐證，不能只口頭說明。",
    variant: "warning",
  },
  25: {
    content:
      "資格證書影本建檔時注意是否在有效期限內（如急救證照每 3 年更新）。建議製作人員資格到期追蹤表，以利提前安排續訓。外籍照服員需確認工作許可及照服員訓練資格。",
    variant: "warning",
  },
  26: {
    content:
      "年度教育訓練計畫需在年初制定，訓練課程要涵蓋長照法規、照護技術、緊急處理等面向。若有臨時辦理的訓練課程，需補充至計畫記錄，確保計畫與實際執行相符。",
    variant: "info",
  },
  27: {
    content:
      "考核標準要具體量化，如「照護紀錄完整率」「準時到班率」等，避免純主觀評分。考核結果告知建議採書面方式，並附改善建議，以利人員有所依循。",
    variant: "neutral",
  },
  28: {
    content:
      "財務帳冊需讓評鑑委員可查閱，即使不對外公開也須備齊。帳冊與憑證建議統一編號對應，方便追蹤查核。若為非營利法人需依規定辦理財務公開及申報。",
    variant: "neutral",
  },
  29: {
    content:
      "收費標準的「公開」要具體體現在服務合約、DM 及公告欄中。退費爭議即使最後無退費，也需有書面記錄（含個案或家屬確認簽名），以備查驗。",
    variant: "info",
  },
  30: {
    content:
      "資訊系統帳號權限管控需有明確記錄（如人員帳號清單及權限等級）。政府資訊申報（如照管中心個案資料、評鑑資料）需有申報時間及確認記錄。",
    variant: "info",
  },
  31: {
    content:
      "照護物料（尿布、手套、口罩等）的庫存記錄建議包含入庫、使用及結存，以利評鑑委員確認物料充足。儲存環境需符合食品或衛材的相關衛生規定。",
    variant: "neutral",
  },
  32: {
    content:
      "感染管制 SOP 要包含洗手五時機、個人防護裝備穿脫流程、環境清消頻率。感染事件通報不限傳染病，跌倒傷口感染、腸胃道症狀群聚等也應納入通報機制。",
    variant: "warning",
  },
  33: {
    content:
      "委外服務契約需明確規範服務品質標準及查核機制。定期查核紀錄需顯示實際查核結果，不能只有「查核完畢」字樣，發現問題需有改善要求及追蹤記錄。",
    variant: "info",
  },
  34: {
    content:
      "危機應變計畫要針對日照中心的特定風險設計：火災（含老人疏散程序）、地震（桌下避難、撤離動線）、停電（緊急照明、設備備援）。演練記錄需包含事後檢討與改善事項。",
    variant: "warning",
  },
  35: {
    content:
      "品質指標建議至少包含：跌倒發生率、感染事件率、個案滿意度、服務量達成率。每季彙整數據並與上季比較，若指標惡化需有書面分析原因及改善行動計畫。",
    variant: "info",
  },
  36: {
    content:
      "滿意度調查需確保匿名性（密封回收或線上表單），發放對象應包含個案（依認知功能調整問卷）及家屬。分析報告需有改善措施欄位，追蹤期限需明確。",
    variant: "info",
  },
  37: {
    content:
      "機構自評建議在評鑑前 3 個月完成，讓發現的問題有時間改善並留下執行記錄。自評報告需有主管簽章，若有董事會需提交討論，並保存會議記錄。",
    variant: "neutral",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "參、經營管理效能（日間照顧機構評鑑基準項目 23–37）",
  description:
    "日間照顧機構評鑑基準「經營管理效能」15 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/daycare/management",
});

export default function DaycareManagementPage() {
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
        <h1 className="text-2xl font-bold mb-3">經營管理效能（項目 23–37）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 15 個評鑑項目，涵蓋日照中心的整體管理能力，從行政制度、人員管理、財務紀律到品質監測體系。
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
