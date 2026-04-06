import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import {
  psychiatricRehabilitationDayProfile,
  psychiatricRehabilitationResidentialProfile,
} from "@/lib/ai/evaluation-profiles/psychiatric-rehabilitation-institution";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { FacilityTypeTabs } from "../_facility-type-tabs";

export const metadata: Metadata = {
  title: "第1章、經營管理（1.1–1.12）｜精神復健機構評鑑",
  description:
    "115年度精神復健機構評鑑基準第1章經營管理完整解說。日間型10條（配分34）、住宿型12條（配分33），涵蓋負責人經營管理、人力穩定性、督導訓練、健康檢查、社區便利性、復健資源及空間設施。",
  keywords: [
    "精神復健機構評鑑",
    "經營管理",
    "115年度評鑑",
    "日間型精神復健機構",
    "住宿型精神復健機構",
  ],
  alternates: {
    canonical: "https://reportwang.com/school/psychiatric-rehabilitation-institution/management",
  },
  openGraph: {
    title: "第1章、經營管理（1.1–1.12）｜精神復健機構評鑑",
    description: "115年度精神復健機構評鑑第1章經營管理，日間型10條/住宿型12條完整解說。",
    url: "https://reportwang.com/school/psychiatric-rehabilitation-institution/management",
  },
};

const daySection = psychiatricRehabilitationDayProfile.sections.find(
  (s) => s.shortCode === "1"
)!;
const residentialSection = psychiatricRehabilitationResidentialProfile.sections.find(
  (s) => s.shortCode === "1"
)!;

// 日間型準備提示
const dayTips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  1: {
    content:
      "負責人評鑑時應在場並做簡報，若不克在場須獲得委員共識同意。「個人復元」強調 CHIME 架構（連結性、希望、身份、意義、充權），工作人員的任務是確認、擴展與支持學員達成生活目標。「社區支持」指運用社區資源，提供病人於社區生活所需之居住、就學、就業、就醫等支持。",
    variant: "info",
  },
  2: {
    content:
      "【可選項目】新設立機構（自開業執照日起計算至評鑑當年7月1日）未滿一年者本項得免評，超過一年者不得免評。留任比例計算：分母為4年內登記於該機構之專任工作人員人數減任職未滿3個月者，分子為4年內任職超過1年以上之專任工作人員人數。",
    variant: "info",
  },
  3: {
    content:
      "督導人員至少應曾服務於中央衛生主管機關評鑑合格之精神醫療機構、精神復健機構，從事精神醫療相關工作滿4年以上之專業人員，並具備正確之社區復健概念。督導內容包含社區復健理念、品質管理、個案討論、方案規劃、紀錄品質查核及個別學員復健計畫執行狀況等。",
    variant: "info",
  },
  7: {
    content:
      "復健治療空間如：職能治療活動室、會談室、康樂室、烹飪室、產業加工場、園藝區（室）、運動場地、復健農（牧）場地等。復健治療空間計算應扣除辦公室及工作人員宿舍等空間。會談室應具隱私性。",
    variant: "info",
  },
  9: {
    content:
      "【可選項目】新設立機構（不包括機構因故歇業，由另一位負責人於原址申請設立許可並開業者）、第一次申請評鑑或上次評鑑無建議改善事項者，本項得免評。本條文所指「前次評鑑之建議改善事項」係包含機構評鑑結果意見表中之「改善事項」、「建議事項」及「綜合意見」。",
    variant: "info",
  },
};

// 住宿型準備提示
const residentialTips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  1: {
    content:
      "負責人評鑑時應在場並做簡報，若不克在場須獲得委員共識同意。住宿型機構的住民不是住院病人，管理方式有別於醫院，重點在秉持復元理念與優勢觀點，於最少限制的環境中，與住民一起協作，逐步擺脫疾病限制，重建社會角色。",
    variant: "info",
  },
  2: {
    content:
      "【可選項目】新設立機構（自開業執照日起計算至評鑑當年7月1日）未滿一年者本項得免評，超過一年者不得免評。留任比例計算：分母為4年內登記於該機構之專任工作人員人數減任職未滿3個月者，分子為4年內任職超過1年以上之專任工作人員人數。",
    variant: "info",
  },
  4: {
    content:
      "住宿型機構特有項目。機構24小時均應有負責人、專任管理人員或專業人員在機構內提供服務。人力配置數不計入廚工、外籍勞工及志工，應以機構向衛生局報備之人員為限。工作人員排班紀錄得參考勞動檢查相關紀錄。",
    variant: "warning",
  },
  8: {
    content:
      "住宿型機構特有項目。日常活動空間含餐廳、客廳休閒、復健活動空間或其他相關空間。如設會談空間，應具隱私性。倘若於機構內從事產業代工，不得影響住民日常活動空間。未登記立案之日常活動空間所放置的復健治療設施，不納入計算。",
    variant: "info",
  },
  10: {
    content:
      "住宿型機構特有項目。廚房主要係提供住民使用，以提升其生活自理能力，非僅供機構備餐使用。食物儲存標示有效日期，冷藏設備需溫度在7℃以下並留有紀錄。餐具應有消毒設備，有傳染病管理需求之對象應有個人專屬餐具。",
    variant: "info",
  },
  11: {
    content:
      "【可選項目】新設立機構（不包括機構因故歇業，由另一位負責人於原址申請設立許可並開業者）、第一次申請評鑑或上次評鑑無建議改善事項者，本項得免評。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "精神復健機構評鑑 第1章、經營管理",
  description: "115年度精神復健機構評鑑基準第1章經營管理，日間型10條/住宿型12條完整解說。",
  path: "/school/psychiatric-rehabilitation-institution/management",
});

export default function ManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="mb-6">
        <Badge className="mb-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0 hover:bg-blue-500/20">
          第1章、經營管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          第1章、經營管理
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本章主要在評量機構負責人經營管理的妥適性，為影響服務品質最基本之要素，包括人力資源、財務管理、復健理念、復健績效與整體發展方向之規劃等。日間型共 10 條（配分 34 分），住宿型共 12 條（配分 33 分）。
        </p>
      </div>

      <FacilityTypeTabs
        dayItems={daySection.items}
        residentialItems={residentialSection.items}
        dayTips={dayTips}
        residentialTips={residentialTips}
        colorClass="blue"
      />

      {/* Prev/Next */}
      <div className="flex justify-between mt-10 pt-6 border-t">
        <Link
          href="/school/psychiatric-rehabilitation-institution"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          評鑑總覽
        </Link>
        <Link
          href="/school/psychiatric-rehabilitation-institution/rehabilitation"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          第2章、復健服務
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
