import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { nursingHomeProfile } from "@/lib/ai/evaluation-profiles/nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "B、專業照護品質（項目 16–47）｜住宿型照顧機構評鑑",
  description:
    "住宿型照顧機構評鑑「專業照護品質」32 項評鑑基準詳細說明：服務計畫、醫療服務、防疫機制、藥品管理、跌倒壓傷預防、膳食服務、管灌照護等，含準備要訣。",
  keywords: [
    "住宿型長照評鑑專業照護",
    "安養機構照護品質評鑑",
    "長照機構護理品質評鑑",
    "住民服務計畫評鑑",
    "114年度住宿型長照評鑑",
    "臺北市安養機構評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/nursing-home/professional-quality" },
  openGraph: {
    title: "B、專業照護品質（項目 16–47）｜住宿型照顧機構評鑑｜報告汪",
    description: "住宿型照顧機構評鑑專業照護品質 32 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/nursing-home/professional-quality",
  },
};

const section = nursingHomeProfile.sections.find((s) => s.shortCode === "專")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  16: {
    content:
      "服務品質會議需每 3 個月定期召開，會議記錄需顯示實際討論服務品質及工作改善議題，不能僅記錄宣達事項。決議事項要有執行追蹤記錄，評鑑委員會核查決議與執行的對應情形。",
    variant: "info",
  },
  17: {
    content:
      "新進住民 72 小時內的個別化評估是重點查核項目。高風險評估至少須含跌倒、壓力性損傷、營養不良三項。每 3 個月（安養機構 6 個月）定期評估需有完整記錄，並可看出評估結果如何影響照顧計畫修正。",
    variant: "warning",
  },
  18: {
    content:
      "資訊系統帳號管理需有明確的使用者權限設定紀錄（如各人員的帳號清單及其存取權限等級）。現場評鑑時工作人員可能被要求實際操作系統，展示密碼保護及權限控管機制是否落實。",
    variant: "info",
  },
  19: {
    content:
      "適應輔導記錄需包含環境介紹、權利義務說明，以及對情緒不穩住民的後續關懷處理。若發生嚴重適應問題已請社工、醫護協處，需有完整的處理過程記錄，評鑑委員可能抽查個案紀錄核對。",
    variant: "neutral",
  },
  20: {
    content:
      "跨專業聯繫會每 3 個月召開，需至少 3 種不同領域人員（如護理、社工、物理治療師）參與，且有紀錄及追蹤。轉介或照會的條件與流程需書面化，每次轉介均需有記錄及後續追蹤情形。",
    variant: "info",
  },
  21: {
    content:
      "文康活動年度計畫需兼顧動態和靜態活動，並有鼓勵住民參與的策略。每月至少辦理 1 次，活動記錄需包含辦理時間、參加成員、活動內容、質量評值及活動照片，並評估活動對住民的助益。",
    variant: "info",
  },
  22: {
    content:
      "社區資源網絡需建立至少 3 處以上的多元化資源（含志工、醫療、福利、經濟補助、關懷據點等），並定期盤點更新。各項活動（含社區交流）均需留有含活動照片在內的完整記錄。",
    variant: "neutral",
  },
  23: {
    content:
      "家屬教育每年至少辦理 2 次（需含防災及公共安全主題），每季至少 1 次與每位住民家屬電訪或會談（無家屬者除外），均需有詳細紀錄。家屬互動（探訪、外出）記錄也需完整留存。",
    variant: "info",
  },
  24: {
    content:
      "特約醫師巡診記錄不得以門診紀錄代替，需有獨立的巡診記錄。長期照顧機構每月巡診、安養機構每 3 個月巡診，新進住民需於 1 個月內完成首次醫師評估。建議抽查 5 位住民的完整醫療服務記錄。",
    variant: "warning",
  },
  25: {
    content:
      "防疫機制是二級加強項目，查核重點：住民每日量體溫、工作人員每週至少量 1 次且紀錄完整、每間寢室設有洗手設施（含乾/洗手液且在效期內）。感染管制手冊需定期更新，通報作業流程需確實執行。",
    variant: "warning",
  },
  26: {
    content:
      "藥品儲存查核重點：是否依規定區分類別、均在有效期限內、盛裝容器有清楚標示（姓名、服用時間及劑量）、管制藥品專設上鎖櫃。不再使用的管制藥品需送交健保特約藥局或醫療院所回收銷毀，並有回收記錄。",
    variant: "warning",
  },
  27: {
    content:
      "三讀五對的給藥流程需由醫護人員執行並有完整用藥記錄。每位住民每 3 個月需有藥師提供藥物管理諮詢的記錄。重複用藥、藥物交互作用的觀察及追蹤記錄是評鑑委員的重要查核重點。",
    variant: "info",
  },
  28: {
    content:
      "跌倒預防評估及處理辦法需書面化，每次跌倒事件應逐案分析處置。定期（至少每半年）分析跌倒監測數據，並有書面改善方案。建議建立跌倒事件月報表，以利累積分析及改善追蹤。",
    variant: "info",
  },
  29: {
    content:
      "壓力性損傷評估工具（如 Braden Scale）及處理辦法需書面化，每季定期分析（安養機構不適用）。發生壓傷案件需逐案分析處置，監測記錄需完整。評鑑委員可能現場查看住民皮膚狀況。",
    variant: "warning",
  },
  30: {
    content:
      "疼痛評估需依住民年齡及認知功能選擇合適工具，並納入生命徵象評估。若有疼痛，需持續評估並記錄疼痛位置、嚴重度、持續時間、緩解及加重因素，確認處置反應也需完整記錄。",
    variant: "info",
  },
  31: {
    content:
      "約束需有醫師診斷或護理人員專業判斷，並備有住民、家屬或委託人的同意書（自簽訂日起 3 個月內有效）。約束過程需隨時監測並有完整記錄，每季進行分析檢討。評鑑委員會現場查看有無不當約束。",
    variant: "warning",
  },
  32: {
    content:
      "感染監測需涵蓋皮膚傳染病（含疥瘡）、呼吸道、腸道傳染病、不明原因發燒等類別，發生案件需逐案分析處置，且每半年定期檢討防疫作為及 SOP。群聚感染事件的通報紀錄是重要查核文件。",
    variant: "warning",
  },
  33: {
    content:
      "非計畫性住院事件需有辦法及流程，每次發生均需逐案分析處置，每季定期分析並有改善方案。建議建立非計畫性住院事件月報表，長期追蹤趨勢，以利評鑑委員了解機構的監測及改善能力。",
    variant: "info",
  },
  34: {
    content:
      "體重每月至少測量 1 次，30 天內體重變化 ±5% 以上視為非計畫性體重改變，需逐案分析處置。建議建立體重監測月報，每半年定期分析改善方案。評鑑委員會抽查個別住民的體重記錄完整性。",
    variant: "info",
  },
  35: {
    content:
      "鼻胃管移除照護計畫需有完整作業規範（含目的、護理對象、執行方法、評值方法），並有逐案服務記錄。適用對象為經評估可移除鼻胃管者；若無適合移除的個案，也需留下評估過程的佐證資料（安養機構不適用）。",
    variant: "neutral",
  },
  36: {
    content:
      "導尿管移除照護計畫需包含膀胱訓練等具體措施，並有逐案服務記錄。若無適合移除導尿管的個案，機構仍須留下評估過程的佐證資料（安養機構不適用）。評鑑委員會核查訓練記錄是否確實執行。",
    variant: "neutral",
  },
  37: {
    content:
      "健康檢查項目需完整：胸部X光、糞便（陰性）、血液常規及生化、尿液檢查，新進工作人員另需B型肝炎抗原抗體報告。廚工另需A型肝炎、傷寒（糞便）及寄生蟲檢查。新進工作人員的胸部X光需為最近3個月內。",
    variant: "info",
  },
  38: {
    content:
      "侵入性照護技術（抽痰、換藥、換管路等）需由護理人員執行，且有標準作業流程。評鑑委員可能現場抽測護理人員的操作技術，確認與 SOP 一致。定期稽核紀錄及發現問題的改善措施需有完整書面記錄。",
    variant: "warning",
  },
  39: {
    content:
      "緊急送醫辦法需有具體的醫療資源網絡（含合作醫院名稱及聯繫方式），並備有救護車合作契約或機構自有緊急交通工具。每次緊急送醫均需有完整紀錄，包含與家屬即時聯繫的時間及內容。",
    variant: "info",
  },
  40: {
    content:
      "疫苗接種清冊需逐人註明施打日期及施打與否（含未施打原因）。機構需有鼓勵住民及工作人員接種的具體策略（如接種說明、移動施打服務等），評鑑委員會核查接種率及未接種的管理方式。",
    variant: "neutral",
  },
  41: {
    content:
      "可移動住民每日至少下床 2 次（意識不清或昏迷者每日至少 1 次），需有紀錄。重度失能住民（ADL60 以下或 CMS7 級以上）需依物理/職能治療師評估，每日提供被動式肢體活動並有記錄（安養住民不適用感官刺激及認知訓練）。",
    variant: "warning",
  },
  42: {
    content:
      "臥床住民至少每 2 小時翻身拍背，翻身擺位需正確，且紀錄內容需與實際操作相符。評鑑委員可能現場觀察翻身操作技術，並比對護理記錄的記載時間。夏天每週至少洗澡 3 次（一般每週至少 2 次）。",
    variant: "warning",
  },
  43: {
    content:
      "自我照顧能力提升計畫需個別化（非統一格式），依評估結果擬訂具體目標（如自己吃飯、翻身、如廁等），並有執行紀錄。輔具提供需依住民個別需求，建議建立輔具使用清單，以利評鑑委員核查。",
    variant: "info",
  },
  44: {
    content:
      "菜單需由合格（專任或特約）營養師擬定，至少提供 2 星期循環菜單，且每日實際餐食需與菜單相符。每週至少 1 次快樂餐（讓住民自由選擇餐點），評鑑委員可能現場查看當日菜單與實際供餐是否相符。",
    variant: "info",
  },
  45: {
    content:
      "依疾病類別（糖尿病、腎臟病等）提供個別化飲食，營養評估異常的住民需有營養師介入改善措施並定期追蹤。每半年至少 1 次膳食滿意度調查，結果需有具體改善措施，評鑑委員會核查食物質地是否符合住民需求。",
    variant: "info",
  },
  46: {
    content:
      "個別化餐具（缺口杯、易握把柄湯匙刀叉、高邊盤等）需依住民需求實際提供，並有清楚標示（姓名）。機構餐具不應全為不鏽鋼材質，除特殊情形外不應使用免洗餐具。評鑑委員可能於用餐時間現場觀察。",
    variant: "neutral",
  },
  47: {
    content:
      "管灌技術查核重點：確認管路位置（回抽）、空針高度正確、流速適當；灌食時及灌食後住民上半身抬高 30–45 度並維持 1 小時；每日至少 1 次天然食材（非商業配方稀釋果汁）。抽測時不可使用灌食筒或灌食袋。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "B、專業照護品質（住宿型照顧機構評鑑基準項目 16–47）",
  description:
    "住宿型照顧機構評鑑基準「專業照護品質」32 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/nursing-home/professional-quality",
});

export default function NursingHomeProfessionalQualityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          B、專業照護品質
        </Badge>
        <h1 className="text-2xl font-bold mb-3">專業照護品質（項目 16–47）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 32 個評鑑項目，是住宿型機構評鑑中項目最多的區塊，涵蓋從服務計畫、醫療照護、感染防疫、膳食管理到日常生活照護的完整照護品質體系。
          護理與社工人員的備戰程度直接決定本區塊的得分。
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
          href="/school/nursing-home/management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          A、經營管理效能
        </Link>
        <Link
          href="/school/nursing-home/safety-environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          C、安全環境設備
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
