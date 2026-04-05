import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { youthCareProfile } from "@/lib/ai/evaluation-profiles/youth-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "建築物環境及設施設備（項目 7–14）｜兒少安置機構評鑑",
  description:
    "112年度兒少安置機構評鑑：貳、建築物環境及設施設備（10分），共8項基準，包含整體環境衛生、機構環境配置、醫療保健設施、食物冷凍設備、公共安全、危機事故預防及處理、飲食及環境衛生、健康與醫療完整說明。評委可依現場狀況±2分。",
  keywords: [
    "兒少安置機構評鑑",
    "兒少機構環境設施評鑑",
    "112年度評鑑",
    "安置機構公共安全評鑑",
    "兒少機構衛生管理",
    "安置機構建築物評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/youth-care/environment" },
  openGraph: {
    title: "建築物環境及設施設備（項目 7–14）｜兒少安置機構評鑑｜報告汪",
    description: "兒少安置機構評鑑貳、建築物環境及設施設備8項基準完整解說，全部由主管機關依輔導查核情形評分，評委可依現場狀況±2分。",
    url: "https://reportwang.com/school/youth-care/environment",
  },
};

const section = youthCareProfile.sections[1];

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  7: {
    content: "整體環境衛生由主管機關依輔導查核情形評分。機構應配合輔導查核，若有缺失應於主管機關規定期限內確實改善並留存改善記錄，以避免列計缺失扣分。",
    variant: "info",
  },
  8: {
    content: "機構環境配置分4個配分項目，各0.5分。重要法規依據：兒少福利機構設置標準第21條，含室內樓地板面積（不得少於120㎡）、室外活動空間（每人不少於3㎡）、2歲以下兒童活動空間（≥10㎡）、2歲以上（≥15㎡）、寢室床位限制等。樓梯走道需有扶手欄杆及防滑設施。",
    variant: "warning",
  },
  9: {
    content: "醫療保健設施依輔導查核表-專業服務第六項目「健康服務」(一)評分，需每年均符合規定。確認急救設備（AED、急救箱等）配置齊全，並留存相關查核紀錄。",
    variant: "neutral",
  },
  10: {
    content: "食物冷凍(藏)設備及儲存空間需依輔導查核表-建築物及設施設備第七項目，每年均符合規定。確認冷藏冷凍設備功能正常、溫度記錄完整，食材分類儲存符合衛生法規。",
    variant: "neutral",
  },
  11: {
    content: "公共安全由主管機關依建築物及設施設備第三至六項目評分，需每年均符合規定。建築物安全檢查簽證及消防安全設備檢查申報文件需齊備，有缺失應優先處理並書面記錄改善過程。",
    variant: "warning",
  },
  12: {
    content: "危機事故預防及處理是本區塊中最複雜的項目（2分），共4個子項各0.5分。重點是「分析」和「改進措施」，不只是有處理記錄。建議建立標準化的危機事故處理流程，包含：即時處理→分析→改進→教育訓練四個環節，並保存完整文件。",
    variant: "warning",
  },
  13: {
    content: "飲食及環境衛生同時涵蓋建築物設施（第八項目「飲用水」）及專業服務（第五項目「膳食管理」）。確認廚房設備、食材管理、餐點製備及供應符合衛生法規，飲用水定期水質檢驗，並留存輔導查核相關紀錄。",
    variant: "neutral",
  },
  14: {
    content: "健康與醫療涵蓋輔導查核表-專業服務第六項目「健康服務」(二)-(十)，不含(一)（醫療保健設施，已列為項目9單獨計分）。健康檢查、就醫協助、用藥管理等需每年均符合規定。",
    variant: "neutral",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "兒少安置機構評鑑：貳、建築物環境及設施設備",
  description: "112年度兒少安置機構評鑑建築物環境及設施設備8項基準完整解說，包含整體環境衛生、機構環境配置、公共安全、危機事故預防及處理等，評委可依現場狀況±2分。",
  path: "/school/youth-care/environment",
});

export default function YouthCareEnvironmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-teal-500/10 text-teal-600 dark:text-teal-400 hover:bg-teal-500/20">
            {section.shortCode}
          </Badge>
          <span className="text-sm text-muted-foreground">項目 7–14・10分</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{section.name}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共8項基準（10分），全部由主管機關依輔導查核情形評分。
          評鑑委員可依現場狀況於本大項±2分（即最低8分、最高12分）。機構應積極配合主管機關輔導查核，並確實改善缺失。
        </p>
      </div>

      {/* Important notes */}
      <div className="mb-6 space-y-3">
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
          <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
            重要提醒：本區塊所有項目均由主管機關評分，且評委可依現場狀況±2分
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            機構無法直接操作評分，但可透過配合輔導查核、確實改善缺失、留存改善記錄，以及現場呈現良好的環境狀態來提升得分。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg border bg-teal-500/5 p-3">
            <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-1">一、機構硬體設備管理（5分）</p>
            <p className="text-xs text-muted-foreground">項目7整體環境衛生（1分）、項目8機構環境配置（2分）、項目9醫療保健設施（1分）、項目10食物冷凍設備（1分）</p>
          </div>
          <div className="rounded-lg border bg-teal-500/5 p-3">
            <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-1">二、機構安全與衛生保健（5分）</p>
            <p className="text-xs text-muted-foreground">項目11公共安全（1分）、項目12危機事故預防（2分）、項目13飲食及環境衛生（1分）、項目14健康與醫療（1分）</p>
          </div>
        </div>
      </div>

      {/* Mini TOC */}
      <div className="mb-8 rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">本頁項目</p>
        <div className="flex flex-wrap gap-2">
          {section.items.map((item) => (
            <a
              key={item.id}
              href={`#item-${item.id}`}
              className="text-xs px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 hover:bg-teal-500/20 transition-colors"
            >
              {item.id}. {item.title}
            </a>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="space-y-10">
        {section.items.map((item) => (
          <div key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center text-sm font-bold text-teal-600 dark:text-teal-400 font-mono shrink-0">
                {item.id}
              </span>
              <div className="flex-1">
                <h2 className="text-lg font-semibold leading-snug">{item.title}</h2>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
                  {"score" in item && (
                    <Badge variant="secondary" className="text-xs">{item.score}分</Badge>
                  )}
                  <Badge variant="outline" className="text-xs text-amber-600 border-amber-400">
                    輔導查核
                  </Badge>
                </div>
              </div>
            </div>

            <div className="ml-11">
              <p className="text-xs text-muted-foreground mb-2 font-medium">評鑑基準：</p>
              <ol className="space-y-1.5 list-decimal list-inside mb-4">
                {item.criteria.map((c, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                    {c}
                  </li>
                ))}
              </ol>

              {tips[item.id] && (
                <DocsTip variant={tips[item.id].variant ?? "neutral"}>
                  {tips[item.id].content}
                </DocsTip>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/youth-care/administration"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          壹、行政組織與經營管理
        </Link>
        <Link
          href="/school/youth-care/professional"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          參、專業服務
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
