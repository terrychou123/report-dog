import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { psychiatricNursingHomeProfile } from "@/lib/ai/evaluation-profiles/psychiatric-nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "B、專業照護品質（B1.1–B3.2）｜精神護理之家評鑑",
  description:
    "115年度精神護理之家評鑑基準 B 面向：專業照護品質，共 21 條指標。含住民服務計畫、防疫機制、跨專業整合照護、藥品管理、品質監測、緊急事件處理、社區資源、膳食服務等完整說明。",
  keywords: ["精神護理之家評鑑", "115年度評鑑", "專業照護品質", "住民服務計畫", "防疫機制", "品質監測"],
  alternates: {
    canonical: "https://reportwang.com/school/psychiatric-nursing-home/professional-care",
  },
  openGraph: {
    title: "B、專業照護品質（B1.1–B3.2）｜精神護理之家評鑑",
    description: "115年度精神護理之家評鑑 B 面向 21 條指標完整解說。",
    url: "https://reportwang.com/school/psychiatric-nursing-home/professional-care",
  },
};

const section = psychiatricNursingHomeProfile.sections.find(
  (s) => s.shortCode === "B"
)!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  10: {
    content: "新進住民72小時內完成個別化評估，需包含身體、心理、社會、認知、活動功能及營養評估。體重每月至少測量一次並記錄，有異常需有營養師介入。",
    variant: "info",
  },
  11: {
    content: "住民適應不良問題發生後一週內需完成輔導並有紀錄。若嚴重適應不良需轉介其他專業人員，需有轉介紀錄。",
    variant: "info",
  },
  12: {
    content: "感染管制計畫同一年度課程主題不得重複。住民體溫每日至少測量1次，工作人員每週至少測量1次。防疫裝備至少備有一週需求量。",
    variant: "warning",
  },
  13: {
    content: "跨專業聯繫會議或個案討論會至少每3個月召開一次，依住民需要由照護團隊相關專業人員參與。",
    variant: "info",
  },
  14: {
    content: "若機構有收治愛滋感染住民，應定期照會感染科醫師及監測病情變化。新入住住民1個月內完成醫師診察及評估，每3個月巡診一次。",
    variant: "info",
  },
  15: {
    content: "管制藥品應依管制藥品管理條例第24條規定設置於業務處所保管；其屬第一級至第三級管制藥品者，並應專設儲藏室、加鎖儲藏。工作區域不得任意放置非醫囑提供之藥品。",
    variant: "warning",
  },
  16: {
    content: "依據精神護理機構評鑑持續性監測指標操作型定義手冊，監測6項指標：(1)跌倒 (2)壓力性損傷 (3)約束 (4)感染 (5)非計畫性轉急性住院 (6)非計畫性體重改變。每月蒐集並逐案檢討。依精神衛生法第32條第2項規定，約束住民需告知家屬及立即護送就醫。",
    variant: "warning",
  },
  17: {
    content: "入住時應有最近三個月內胸部X光檢查報告，阿米巴性痢疾及桿菌性痢疾須在入住前14天內檢查。每年體檢可配合成人健檢或老人健檢辦理。",
    variant: "info",
  },
  18: {
    content: "【可選項目】：有使用抽痰、換藥、換管路之住民，本項不得免評。侵入性照護技術必須由護理人員執行，定期稽核技術正確性。",
    variant: "warning",
  },
  19: {
    content: "緊急及意外事件包含住民不假外出，依精神衛生法第52條規定，住民擅自離開機構時應即通知其家屬或保護人；住民行蹤不明時，應即通知地方主管機關及警察機關積極協尋。",
    variant: "warning",
  },
  20: {
    content: "依護理人員法第26條規定，護理人員執行業務時，遇有病人危急，應立即聯絡醫師，但必要時，得先行給予緊急救護處理。特約救護車應備有車輛定期保養、人員訓練證明。",
    variant: "info",
  },
  21: {
    content: "各類活動或團體工作多元，包含：提供住民選擇活動項目之權利，如：同一時段有2種以上團體活動可選擇；或於活動辦理前提供2種以上活動項目讓住民選擇。住民社區支持服務應依多元連續服務原則規劃辦理。",
    variant: "info",
  },
  22: {
    content: "社區資源聯結需連結至少3處（C級）或5處（B/A級）多元化社區服務網絡，包含：家屬教育、志工人力資源、同儕支持、社區關懷據點、精神障礙者協作模式服務據點、自立生活中心等。",
    variant: "info",
  },
  23: {
    content: "每年至少辦理2次家屬教育、座談會或聯誼活動，留有簽到單、活動相片及活動紀錄。工作人員每季至少1次與家屬（親友）電訪、視訊或會談。",
    variant: "info",
  },
  24: {
    content: "復健作業活動時間每週不得超過15小時。復健作業活動內容係指具復健性質之服務性工作（例如：機構公共區域清潔、整理或廚房備菜等）或代工，不包含純粹的娛樂活動。",
    variant: "warning",
  },
  25: {
    content: "護理站須設置基本急救設備，包含：氧氣、鼻管、人工氣道、氧氣面罩、抽吸設備、喉頭鏡、氣管內管、甦醒袋及常備急救藥品等。各樓層應設置護理站或簡易護理工作站。",
    variant: "info",
  },
  26: {
    content: "提供住民衛生保健及健康生活方式等衛教，依住民個別需求提供增強自我照顧能力之措施。",
    variant: "neutral",
  },
  27: {
    content: "住民貼身衣物穿著比例達50%以上（排除全日穿著居布之住民人數）。寢具至少每兩週更換清洗一次。",
    variant: "info",
  },
  28: {
    content: "由物理治療師或職能治療師進行專業評估，每週至少有下床活動機制，每日提供簡易被動式肢體活動。",
    variant: "info",
  },
  29: {
    content: "快樂餐主要是讓住民依個人偏好自由選擇餐點，並非準備很多餐點供住民選擇，且不需要進行熱量分析。菜單由專任或特約營養師擬定。",
    variant: "info",
  },
  30: {
    content: "【可選項目】：有管灌住民情形，本項不得免評。灌食配方食物不全是商業配方，每週至少七次灌注自然食材。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "精神護理之家評鑑 B、專業照護品質",
  description: "115年度精神護理之家評鑑基準 B 面向 21 條指標完整解說。",
  path: "/school/psychiatric-nursing-home/professional-care",
});

export default function ProfessionalCarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          B、專業照護品質
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          B、專業照護品質（B1.1–B3.2）
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本面向共 21 條指標，是評鑑比重最大的面向。涵蓋住民服務計畫與評估（含營養評估）、適應輔導、防疫機制、跨專業整合照護、醫療服務、藥品管理、照護品質監測、健康檢查、緊急事件處理、活動規劃、社區資源、家屬互動、復健作業及膳食服務等。其中 B1.9（侵入性照護）及 B3.2（管灌）為可選項目。
        </p>
      </div>

      {/* Mini TOC */}
      <div className="border rounded-lg p-3 mb-6 bg-muted/30">
        <p className="text-xs font-medium mb-2 text-muted-foreground">本頁指標</p>
        <div className="flex flex-wrap gap-1.5">
          {section.items.map((item) => (
            <a
              key={item.id}
              href={`#item-${item.id}`}
              className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20 transition-colors"
            >
              {item.title.split(" ")[0]}
            </a>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="space-y-8">
        {section.items.map((item) => (
          <div key={item.id} id={`item-${item.id}`} className="scroll-mt-16">
            <div className="flex items-start gap-3 mb-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center text-sm font-medium">
                {item.id}
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-semibold text-base">{item.title}</h2>
                  {"isTrialDeduction" in item && item.isTrialDeduction && (
                    <Badge variant="destructive" className="text-xs">重點項目</Badge>
                  )}
                  {item.title.includes("可選") && (
                    <Badge variant="secondary" className="text-xs">可選項目</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  負責人：{item.responsible}
                </p>
              </div>
            </div>

            <div className="ml-11">
              <p className="text-xs font-medium text-muted-foreground mb-2">評核要點</p>
              <ul className="space-y-1.5 mb-3">
                {item.criteria.map((criterion, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{criterion}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs font-medium text-muted-foreground mb-1">評核方式</p>
              <p className="text-sm text-muted-foreground mb-3">{item.reviewMethod}</p>

              {tips[item.id] && (
                <DocsTip variant={tips[item.id].variant}>
                  {tips[item.id].content}
                </DocsTip>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Prev/Next */}
      <div className="flex justify-between mt-10 pt-6 border-t">
        <Link
          href="/school/psychiatric-nursing-home/management"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          A、經營管理效能
        </Link>
        <Link
          href="/school/psychiatric-nursing-home/safety-facilities"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          C、安全維護及設施設備
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
