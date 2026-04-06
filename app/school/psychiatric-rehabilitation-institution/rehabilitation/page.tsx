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
  title: "第2章、復健服務（2.1–2.14）｜精神復健機構評鑑",
  description:
    "115年度精神復健機構評鑑基準第2章復健服務完整解說。日間型14條（配分37）、住宿型14條（配分37），涵蓋復健評估、復健目標與計畫、社區生活訓練、就業輔導、生活諮詢、藥物自我管理、社區融合及同儕支持。",
  keywords: [
    "精神復健機構評鑑",
    "復健服務",
    "115年度評鑑",
    "復健評估",
    "社區融合",
    "個人復元",
    "PFM",
  ],
  alternates: {
    canonical: "https://reportwang.com/school/psychiatric-rehabilitation-institution/rehabilitation",
  },
  openGraph: {
    title: "第2章、復健服務（2.1–2.14）｜精神復健機構評鑑",
    description: "115年度精神復健機構評鑑第2章復健服務，日間型14條/住宿型14條完整解說。",
    url: "https://reportwang.com/school/psychiatric-rehabilitation-institution/rehabilitation",
  },
};

const daySection = psychiatricRehabilitationDayProfile.sections.find(
  (s) => s.shortCode === "2"
)!;
const residentialSection = psychiatricRehabilitationResidentialProfile.sections.find(
  (s) => s.shortCode === "2"
)!;

// 日間型準備提示
const dayTips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  11: {
    content:
      "復健評估包含：獨立生活功能、社會功能、休閒功能、職業功能、身心健康狀況及家庭與社會支持系統之評估等。獨立生活功能評估應包含：個人衛生（含口腔）、居家環境整潔、正常的飲食與作息、財務自主管理、生活所需烹煮訓練、衣物清洗及整理。資料庫係指以電子化的方式將資料儲存在電腦系統。",
    variant: "info",
  },
  12: {
    content:
      "學員的「復健評估」應與復健目標、計畫密切連貫，如：評估結果發現學員個人衛生差，則應有相關訓練計畫。至少每3個月修正1次，每位學員均有其主責復健訓練之工作人員。",
    variant: "info",
  },
  16: {
    content:
      "工作復健訓練如：清潔維護、烹飪及備餐、清潔餐具、接待與總機、採購、信件收發、求職技巧、產業訓練、電腦文書處理、環保分類、園藝、居家電器修理等。轉銜服務如：轉介職業輔導評量、職業訓練、就業服務、追蹤輔導、職務再設計、創業輔導及其他轉銜服務等。",
    variant: "info",
  },
  18: {
    content:
      "【PFM 項目】評鑑委員將以「以病人為焦點之查證方式」訪談學員。「輔導規則就醫及藥物自我管理訓練計畫」包含：規則就醫、認識藥物名稱、形狀、作用、排藥訓練及自我保管、按時服用等。機構應強化學員自行規則就醫及藥物自我管理訓練，保持其病情穩定為首要治療目標。",
    variant: "warning",
  },
  19: {
    content:
      "生活適應議題如：感情婚姻、人際關係、謀職、工作適應、壓力處理、情緒管理、社區資源運用、興趣培養、健康維護及疾病復元等。每次至少達45分鐘，團體人數不超過30人。",
    variant: "info",
  },
  20: {
    content:
      "自治會議討論內容如：伙食、設施、設備、社區參與、復健活動安排、生活公約、學員權益、機構管理、防疫措施等。團體人數不超過50人，由學員擔任主席及記錄。",
    variant: "info",
  },
  22: {
    content:
      "【PFM 項目】社區融合指各類社區復健活動之運用須結合社區資源，並包括經常性辦理社區交流活動與社區服務。評鑑委員將訪談學員確認參與情形。",
    variant: "warning",
  },
  23: {
    content:
      "【試評項目】本項成績不納入評鑑結果計算，用於收集機構執行情形。為促進個人復元，機構應提供學員參與社會與公民活動的機會，增進與他人及社會的連結，及對自身權益的關心或倡議。",
    variant: "neutral",
  },
  24: {
    content:
      "【試評項目】本項成績不納入評鑑結果計算。機構應善用同儕支持的力量，同時轉化生病的意義，培養學員的利他行為，促進復元。有金錢交易的陪同行為（如陪同就醫或協助洗澡等）不予計入。",
    variant: "neutral",
  },
};

// 住宿型準備提示
const residentialTips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  13: {
    content:
      "復健評估包含：獨立生活功能、社會功能、休閒功能、職業功能、身心健康狀況及家庭與社會支持系統之評估等。住宿型獨立生活功能至少每3個月評估1次；家庭與社會支持系統至少每年評估1次。資料庫係指以電子化的方式將資料儲存在電腦系統。",
    variant: "info",
  },
  14: {
    content:
      "住民的「復健評估」應與復健目標、計畫密切連貫。至少每3個月修正1次，每位住民均有其主責復健訓練之工作人員。",
    variant: "info",
  },
  15: {
    content:
      "住宿型特別強調「獨立生活功能訓練」，配分6分（為全章最高分項目）。訓練內容應盡量貼近住民在社區真正獨立生活時的需要與操作方式，並實地體驗學習，以逐步達成各項訓練目標。",
    variant: "info",
  },
  18: {
    content:
      "住宿型此項與日間型標題不同，強調「職前準備、工作轉介或就業輔導」。符合 B 級需有60%以上的住民可以參與機構外工作復健或社區就業。",
    variant: "info",
  },
  20: {
    content:
      "【PFM 項目】評鑑委員將以「以病人為焦點之查證方式」訪談住民。機構應強化住民自行規則就醫及藥物自我管理訓練，保持其病情穩定為首要治療目標，注重住民服藥順從性，並搭配必要的服藥監督。",
    variant: "warning",
  },
  24: {
    content:
      "【PFM 項目】社區融合指各類社區復健活動之運用須結合社區資源，並包括經常性辦理社區交流活動與社區服務。評鑑委員將訪談住民確認參與情形。",
    variant: "warning",
  },
  25: {
    content:
      "【試評項目】本項成績不納入評鑑結果計算，用於收集機構執行情形。為促進個人復元，機構應提供住民參與社會與公民活動的機會。",
    variant: "neutral",
  },
  26: {
    content:
      "【試評項目】本項成績不納入評鑑結果計算。機構應善用同儕支持的力量，同時轉化生病的意義，培養住民的利他行為，促進復元。",
    variant: "neutral",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "精神復健機構評鑑 第2章、復健服務",
  description: "115年度精神復健機構評鑑基準第2章復健服務，日間型14條/住宿型14條完整解說。",
  path: "/school/psychiatric-rehabilitation-institution/rehabilitation",
});

export default function RehabilitationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          第2章、復健服務
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          第2章、復健服務
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          機構主要任務是協助學員/住民逐步適應社會生活，透過專業團隊的全人評估，與學員/住民共同決定具體可行之復健目標與計畫，運用「有目的的活動」做為復元媒介，結合社區資源，進行真實的社區生活復健。日間型與住宿型均為 14 條（配分 37 分）。
        </p>
      </div>

      <FacilityTypeTabs
        dayItems={daySection.items}
        residentialItems={residentialSection.items}
        dayTips={dayTips}
        residentialTips={residentialTips}
        colorClass="green"
      />

      {/* Prev/Next */}
      <div className="flex justify-between mt-10 pt-6 border-t">
        <Link
          href="/school/psychiatric-rehabilitation-institution/management"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          第1章、經營管理
        </Link>
        <Link
          href="/school/psychiatric-rehabilitation-institution/service-quality"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          第3章、服務品質
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
