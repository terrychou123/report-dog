import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { nursingHomeProfile } from "@/lib/ai/evaluation-profiles/nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "D、個案權益保障（項目 64–72）｜住宿型照顧機構評鑑",
  description:
    "住宿型照顧機構評鑑「個案權益保障」9 項評鑑基準詳細說明：個案資料管理、服務契約、生活注意事項、申訴機制、宗教信仰、居家情境、財物管理、臨終照護、滿意度調查，含準備要訣。",
  keywords: [
    "住宿型長照評鑑個案權益",
    "安養機構服務契約評鑑",
    "長照機構申訴機制評鑑",
    "住民財物管理評鑑",
    "114年度住宿型長照評鑑",
    "臺北市安養機構個案權益",
  ],
  alternates: { canonical: "https://reportwang.com/school/nursing-home/client-rights" },
  openGraph: {
    title: "D、個案權益保障（項目 64–72）｜住宿型照顧機構評鑑｜報告汪",
    description: "住宿型照顧機構評鑑個案權益保障 9 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/nursing-home/client-rights",
  },
};

const section = nursingHomeProfile.sections.find((s) => s.shortCode === "權")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  64: {
    content:
      "個案資料管理系統為二級加強項目。需明確訂定各使用者的系統存取權限，並有書面管理辦法（含個人資料保護法依據、肖像權同意書）。統計分析結果需有具體改善措施，評鑑委員可能要求現場操作系統展示帳號及權限管控機制。",
    variant: "info",
  },
  65: {
    content:
      "服務契約需給予住民至少 5 天審閱期（需有書面記錄），契約內容需完備（服務項目、收費標準、雙方權利義務、申訴管道）且不得低於定型化契約，不得有「不得記載事項」。當法規或服務條件變更時需更換契約，評鑑委員會查核契約是否核章完整。",
    variant: "warning",
  },
  66: {
    content:
      "生活注意事項需張貼於明顯處並以書面告知住民及家屬（需有簽名記錄），且須允許住民可自由和外界溝通（不得限制通訊自由）。若有住民違反注意事項，需有具體的處理或調整記錄，評鑑委員可能直接詢問住民是否了解相關規定。",
    variant: "info",
  },
  67: {
    content:
      "申訴管道需張貼於機構明顯處，並清楚告知住民及家屬（含口頭告知記錄）。申訴案件需有專人處理，處理結果需書面回覆申訴者並留存記錄，每年分析申訴案件並有追蹤記錄。評鑑委員可能詢問住民是否清楚申訴流程。",
    variant: "info",
  },
  68: {
    content:
      "靈性關懷服務需有個別服務記錄（非僅列於年度計畫），簡易宗教設施（如佛堂、禱告室）需實際提供住民使用，並有使用記錄。確認每位住民均有自行決定參與宗教活動的機會，評鑑委員可能現場觀察設施及訪談住民。",
    variant: "neutral",
  },
  69: {
    content:
      "居家情境佈置為二級加強項目。確認：床與床之間有隔離視線的屏障物（如圍簾）、監視器未設置於寢室及浴廁內、每個床位旁有擺放私人物品的空間、允許住民攜帶個人物品佈置環境。評鑑委員會現場察看個人空間的隱私性。",
    variant: "info",
  },
  70: {
    content:
      "財物管理辦法需涵蓋退休金代墊、零用金管理、重要財物保管及死亡遺產處理等，並有書面告知住民及家屬的記錄（需有簽名）。財產管理需由專人負責並留有明細記錄，評鑑委員可能現場訪談住民是否了解相關規定。",
    variant: "neutral",
  },
  71: {
    content:
      "安寧緩和醫療資訊提供需有書面記錄，DNR 處理作業流程（含已簽訂及未簽訂者的不同處理程序）需書面化並有實際案例。確認有鼓勵住民或家屬針對 DNR 共同討論的機制，並提供臨終照護關懷流程手冊，記錄協助家屬處理喪葬事宜的過程。",
    variant: "info",
  },
  72: {
    content:
      "每年至少辦理 1 次不具名滿意度調查（採密封回收或線上表單確保匿名性），調查內容需含服務內容、服務人員態度、設施設備等項目。需有調查分析報告，且依結果提出具體改善措施，評鑑委員會核查調查問卷及改善方案的完整性。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "D、個案權益保障（住宿型照顧機構評鑑基準項目 64–72）",
  description:
    "住宿型照顧機構評鑑基準「個案權益保障」9 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/nursing-home/client-rights",
});

export default function NursingHomeClientRightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0 hover:bg-blue-500/20">
          D、個案權益保障
        </Badge>
        <h1 className="text-2xl font-bold mb-3">個案權益保障（項目 64–72）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 9 個評鑑項目，著重保障住民在機構中的基本權益，從個資保護、服務契約、申訴機制到臨終照護的完整權益體系。
          社工人員是本區塊的主要負責角色，需確保住民的聲音被聽見並有回應機制。
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
              <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
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
          href="/school/nursing-home/safety-environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          C、安全環境設備
        </Link>
        <Link
          href="/school/nursing-home/innovation"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          E、服務改進創新
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
