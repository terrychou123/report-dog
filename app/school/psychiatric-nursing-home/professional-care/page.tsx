import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { psychiatricNursingHomeProfile } from "@/lib/ai/evaluation-profiles/psychiatric-nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { psychiatricNursingHomeTips } from "@/lib/evaluation-tips/psychiatric-nursing-home";

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

const tips = psychiatricNursingHomeTips;

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
