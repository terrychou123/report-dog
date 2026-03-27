import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { youthCareProfile } from "@/lib/ai/evaluation-profiles/youth-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "建築物環境與設施設備（項目 11–15）｜兒少教養機構評鑑",
  description:
    "111年度兒少教養機構聯合評鑑：貳、建築物環境與設施設備，共5項基準，包含機構環境配置、公共安全及災害應變管理、飲食衛生管理、基本急救物資配置及健康服務評鑑說明。",
  keywords: [
    "兒少教養機構評鑑",
    "兒少機構環境設施評鑑",
    "111年度聯合評鑑",
    "教養機構公共安全評鑑",
    "兒少機構衛生管理",
    "安置機構建築物評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/youth-care/environment" },
  openGraph: {
    title: "建築物環境與設施設備（項目 11–15）｜兒少教養機構評鑑｜報告汪",
    description: "兒少教養機構評鑑貳、建築物環境與設施設備5項基準完整解說，由主管機關依輔導查核情形評分。",
    url: "https://reportwang.com/school/youth-care/environment",
  },
};

const section = youthCareProfile.sections[1];

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  11: {
    content: "本項由主管機關依108-111年輔導查核情形給分（110年度聯合稽查結果不列計分數）。機構應主動配合輔導查核，若有缺失應確實改善並留存改善記錄，以爭取「缺失均已改善」等級的分數。",
    variant: "info",
  },
  12: {
    content: "建築物安全檢查簽證及申報文件（108-112年）是本項的重要備審資料，務必確認取得主管機關准予備查公文。公共安全查核若有缺失，應優先處理並書面記錄改善過程。",
    variant: "warning",
  },
  13: {
    content: "飲食衛生管理同時涵蓋建築物設施（第七至九項目）及專業服務「膳食管理」兩部分。確認廚房設備、食材管理、膳食記錄符合衛生法規，並留存輔導查核相關記錄。",
    variant: "neutral",
  },
  14: {
    content: "基本急救及防護物資配備屬於「無缺失/有缺失」二元評分，配合主管機關查核確認物資符合規定是最有效的準備方式。",
    variant: "info",
  },
  15: {
    content: "健康服務項目不含「基本急救及防護物資配置」（該部分已在項目14單獨計分）。健康服務的其他查核項目（如定期健檢、就醫協助等）需每年均符合規定方可取得滿分。",
    variant: "neutral",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "兒少教養機構評鑑：貳、建築物環境與設施設備",
  description: "111年度兒少教養機構聯合評鑑建築物環境與設施設備5項基準完整解說，包含機構環境配置、公共安全及災害應變管理、飲食衛生管理等。",
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
          <span className="text-sm text-muted-foreground">項目 11–15</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{section.name}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共5項基準（13分），全部由主管機關依108-111年輔導查核情形給分（110年度聯合稽查結果不列計分數）。機構應積極配合主管機關輔導查核，並確實改善缺失。
        </p>
      </div>

      {/* Important note */}
      <div className="mb-6 rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
        <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
          重要提醒：本區塊所有項目均由主管機關評分
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          機構無法直接操作評分，但可透過配合輔導查核、確實改善缺失、留存改善記錄來提升得分。
        </p>
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
                  <Badge variant="secondary" className="text-xs">輔導查核</Badge>
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
