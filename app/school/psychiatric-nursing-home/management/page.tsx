import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { psychiatricNursingHomeProfile } from "@/lib/ai/evaluation-profiles/psychiatric-nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { psychiatricNursingHomeTips } from "@/lib/evaluation-tips/psychiatric-nursing-home";

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

const tips = psychiatricNursingHomeTips;

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
