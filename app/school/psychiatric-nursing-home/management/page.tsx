import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { psychiatricNursingHomeProfile } from "@/lib/ai/evaluation-profiles/psychiatric-nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "A、經營管理效能（A1.1–A5.1）｜精神護理之家評鑑",
  description:
    "115年度精神護理之家評鑑基準 A 面向：經營管理效能，共 9 條指標。包含業務計畫、查核缺失改善、性騷擾防治機制、人員配置（重點項目）、工作人員權益、教育訓練及資料管理。",
  keywords: ["精神護理之家評鑑", "115年度評鑑", "經營管理效能", "人員配置", "重點項目"],
  alternates: {
    canonical: "https://reportwang.com/school/psychiatric-nursing-home/management",
  },
  openGraph: {
    title: "A、經營管理效能（A1.1–A5.1）｜精神護理之家評鑑",
    description: "115年度精神護理之家評鑑 A 面向 9 條指標完整解說。",
    url: "https://reportwang.com/school/psychiatric-nursing-home/management",
  },
};

const section = psychiatricNursingHomeProfile.sections.find(
  (s) => s.shortCode === "A"
)!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  1: {
    content:
      "需備妥：機構章程、組織圖、監督或經營團隊會議紀錄、短中長程工作計畫及年度業務計畫。評鑑委員會現場訪談監督或經營團隊成員，請確保相關人員了解機構宗旨及計畫內容。",
    variant: "info",
  },
  2: {
    content:
      "首次接受評鑑或上次評鑑未有建議事項之機構，本指標說明第2點免評。改善情形計算：分子為改善項目數，分母為建議事項數，需達到各級別改善比例才能得到對應評級。",
    variant: "info",
  },
  3: {
    content:
      "若機構聘有外籍看護工，性騷擾及性侵害防治辦法應有該國語言之版本。評鑑委員會會訪談工作人員及住民確認了解程度，請確保全體工作人員知道通報流程。",
    variant: "warning",
  },
  4: {
    content:
      "負責人評鑑時應在場並做簡報，若不克在場，須獲得委員共識同意。如代理負責人代理期間超過一個月者，應報請原發開業執照機關備查。",
    variant: "warning",
  },
  5: {
    content:
      "【重點項目】：24小時均有護理人員於機構內上班，不得以電話On-Call方式替代。200床以上須設置職能治療師1名（其中至少1名為職能治療師）及每200床1名臨床心理師；未滿200床每20床每週職能治療及臨床心理師服務時數至少各4小時。照顧服務員需具有國民身分證（外配及陸配有居留證明即可）。",
    variant: "warning",
  },
  6: {
    content:
      "若無執行佐證資料可供參閱，僅部分符合基準說明3的規範（不能完全符合）。工作手冊至少每年檢討修訂一次，需有修訂記錄。",
    variant: "info",
  },
  7: {
    content:
      "健康檢查不得以勞工檢查代替，因該檢查不符合感染管制要求。工作人員包含自行聘用及外包人力。廚工健康檢查依食品藥物管理署規範辦理。",
    variant: "warning",
  },
  8: {
    content:
      "在職教育訓練每年至少20小時，其中感染管制課程至少4小時。廚工每年至少8小時營養及衛生相關教育訓練。現職護理人員BLS急救訓練證照在效期內者須達50%以上。工作人員包含專任及兼任人員。",
    variant: "info",
  },
  9: {
    content:
      "若機構使用電子病歷系統，須訂有電子病歷管理規範。住民資料統計分析需有具體改善措施，並作為品質改善依據。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "精神護理之家評鑑 A、經營管理效能",
  description: "115年度精神護理之家評鑑基準 A 面向 9 條指標完整解說。",
  path: "/school/psychiatric-nursing-home/management",
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
          A、經營管理效能
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          A、經營管理效能（A1.1–A5.1）
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本面向共 9 條指標，涵蓋業務計畫擬訂、查核缺失改善、性騷擾防治機制、人員配置（重點項目）、工作人員權益、教育訓練及住民資料管理，是精神護理之家評鑑的行政管理核心。
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
              className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
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
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-medium">
                {item.id}
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-semibold text-base">{item.title}</h2>
                  {"isTrialDeduction" in item && item.isTrialDeduction && (
                    <Badge variant="destructive" className="text-xs">重點項目</Badge>
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
          href="/school/psychiatric-nursing-home"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          評鑑總覽
        </Link>
        <Link
          href="/school/psychiatric-nursing-home/professional-care"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          B、專業照護品質
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
