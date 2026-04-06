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
  title: "第3章、服務品質（3.1–3.14）｜精神復健機構評鑑",
  description:
    "115年度精神復健機構評鑑基準第3章服務品質完整解說。日間型12條（配分29）、住宿型14條（配分30），涵蓋工作手冊、收結案標準、紀錄管理、復健基金、權益維護、健康維護、緊急應變、出入自由（住宿型重點項目）。",
  keywords: [
    "精神復健機構評鑑",
    "服務品質",
    "115年度評鑑",
    "權益維護",
    "出入自由",
    "重點項目",
    "復健基金管理",
  ],
  alternates: {
    canonical: "https://reportwang.com/school/psychiatric-rehabilitation-institution/service-quality",
  },
  openGraph: {
    title: "第3章、服務品質（3.1–3.14）｜精神復健機構評鑑",
    description: "115年度精神復健機構評鑑第3章服務品質，日間型12條/住宿型14條完整解說。",
    url: "https://reportwang.com/school/psychiatric-rehabilitation-institution/service-quality",
  },
};

const daySection = psychiatricRehabilitationDayProfile.sections.find(
  (s) => s.shortCode === "3"
)!;
const residentialSection = psychiatricRehabilitationResidentialProfile.sections.find(
  (s) => s.shortCode === "3"
)!;

// 日間型準備提示
const dayTips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  25: {
    content:
      "手冊內容應明列機構理念、願景、任務、組織架構、各單位及人員業務職掌、收案及結案標準、學員權益維護及隱私保護、復健服務內容、重要工作流程、緊急事件通報聯繫窗口及權益維護辦法等資料。",
    variant: "info",
  },
  26: {
    content:
      "【PFM 項目】收案評估包括：診斷、病情穩定度、社會功能、自我照顧能力、行為遵從性、復健動機潛能、生理疾病、身心障礙程度、合併其他障別等。收案條件：經精神科專科醫師診斷需精神復健之病人，且符合仍需延續醫療照護、須強化服藥順從性、仍有殘餘症狀干擾、受精神疾病影響導致個人功能缺失或減退者之一。",
    variant: "warning",
  },
  27: {
    content:
      "回歸社區生活定義：生活功能已可自我照顧、分擔家務、就學、就業可返家或獨立生活者。結案比例計算：分子為4年內功能進步並結案回歸社區生活之學員人次，分母為4年內服務總人次。",
    variant: "info",
  },
  28: {
    content:
      "個案紀錄管理辦法應包含精神復健機構設立擴充許可及管理辦法第15條規定：機構內相關人員執行業務，應製作紀錄，並以適當方式儲存保管。紀錄應至少保存7年，但未成年者之紀錄應至少保存至其成年後7年。",
    variant: "info",
  },
  29: {
    content:
      "【PFM 項目】復健基金全數運用於學員所需，其中90%應列為工作獎勵並按月發放。「具有產值之工作訓練」係指機構對於執行精神病人工作訓練之加工、代工、產品或於機構內辦理之勞務訓練。學員接受復健治療所衍生之收入須以現金方式給予，不得以點數方式兌換。",
    variant: "warning",
  },
  30: {
    content:
      "【PFM 項目】需確實執行9項權益維護措施：落實精神衛生法、妥善管理個人資料、訂有性騷擾防治辦法、依學員學習需求提出維護及教育權益的具體方法、錄音錄影需取得同意、權益規範以易懂文字張貼、維護隱私、訂有申訴處理流程、收費標準經主管機關核定。",
    variant: "warning",
  },
  36: {
    content:
      "【試評項目】本項成績不納入評鑑結果計算。訪客紀錄可參考衛生福利部疾病管制署訂定之「長期照護機構訪客紀錄單（範例）」辦理。能依據不同疫情訂定規範，如：探訪時間、體溫監測、詢問TOCC等。",
    variant: "neutral",
  },
};

// 住宿型準備提示
const residentialTips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  28: {
    content:
      "【PFM 項目】住宿型收案條件與日間型相同。評鑑委員將以「以病人為焦點之查證方式」訪談住民，若無法與抽樣之住民進行訪談瞭解其情形時，本條文則評量為「未符合C等級」。",
    variant: "warning",
  },
  29: {
    content:
      "住宿型結案標準強調：4年內有15%以上住民經復健後功能進步，結案回歸社區生活且為家屬接受，有就學、就業成功案例。回歸社區生活定義：生活功能已可自我照顧、分擔家務、就學、就業可返家或獨立生活者。",
    variant: "info",
  },
  31: {
    content:
      "【可選項目 + PFM 項目】透過機構復健訓練所得（含義賣）應列入復健基金管理，本項不得免評。復健基金全數運用於住民所需，其中90%應列為工作獎勵並按月發放。住民接受復健治療所衍生之收入須以現金方式給予，不得以點數方式兌換。",
    variant: "warning",
  },
  32: {
    content:
      "【PFM 項目】住宿型需確實執行13項權益維護措施（比日間型多4項）。額外包含：不得以不當行為約定或處罰剝奪住民基本生活權益、除防範緊急暴力自殺自傷外不得約束住民、有讓住民選擇備餐的方式、有產值之工作訓練所得應全額發給住民。",
    variant: "warning",
  },
  33: {
    content:
      "【PFM 項目】住宿型特有項目。每位住民應有財物自主管理評估及訓練機制，且住民有60%以上可自行保管全部財物。代管住民財務應有完備之管理機制，包括安全之存放處所、詳實之收支明細表、住民及工作人員簽名，且支領金額經住民同意，並每月告知住民家屬。",
    variant: "warning",
  },
  34: {
    content:
      "住宿型健康維護措施特別要求：住民應提供入住前3個月內之胸部X光檢查報告，及於入住時提供入住前14天內檢查之桿菌性痢疾、阿米巴性痢疾檢驗報告。住民於入住時尚無檢查報告或有疑似感染症狀者，應安排與他人區隔，經確認無感染後才入住一般住房。",
    variant: "warning",
  },
  37: {
    content:
      "【重點項目 + PFM 項目】住宿型唯一重點項目。未達C級即視為評鑑不合格。機構應採開放式管理，不應以任何設施設備限制住民出入自由。如機構因疫情或災變須限制住民行動自由，應依據相關法令輔導其配合，並維護其應有之權益。有評估與訓練住民自行外出活動或返家之機制。",
    variant: "warning",
  },
  40: {
    content:
      "【試評項目】本項成績不納入評鑑結果計算。訪客紀錄可參考衛生福利部疾病管制署訂定之「長期照護機構訪客紀錄單（範例）」辦理。",
    variant: "neutral",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "精神復健機構評鑑 第3章、服務品質",
  description: "115年度精神復健機構評鑑基準第3章服務品質，日間型12條/住宿型14條完整解說。",
  path: "/school/psychiatric-rehabilitation-institution/service-quality",
});

export default function ServiceQualityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="mb-6">
        <Badge className="mb-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0 hover:bg-orange-500/20">
          第3章、服務品質
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          第3章、服務品質
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          復健服務品質的精進應深植於每日復健的常規中，依 PDCA 原則檢討機構的功能與復健績效。日間型共 12 條（配分 29 分），住宿型共 14 條（配分 30 分，含唯一重點項目 3.11 維護住民出入自由）。住宿型的管理方式有別於醫院，重點在秉持復元理念與優勢觀點，於最少限制的環境中，與住民一起協作，逐步擺脫疾病限制。
        </p>
      </div>

      <FacilityTypeTabs
        dayItems={daySection.items}
        residentialItems={residentialSection.items}
        dayTips={dayTips}
        residentialTips={residentialTips}
        colorClass="orange"
      />

      {/* Prev/Next */}
      <div className="flex justify-between mt-10 pt-6 border-t">
        <Link
          href="/school/psychiatric-rehabilitation-institution/rehabilitation"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          第2章、復健服務
        </Link>
        <Link
          href="/school/psychiatric-rehabilitation-institution"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          回到評鑑總覽
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
