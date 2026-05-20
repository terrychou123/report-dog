import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { youthCareProfile, meta as youthCareMeta } from "@/lib/ai/evaluation-profiles/youth-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { youthCareTips } from "@/lib/evaluation-tips/youth-care";

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
  alternates: { canonical: "/school/youth-care/environment" },
  openGraph: {
    title: "建築物環境及設施設備（項目 7–14）｜兒少安置機構評鑑｜報告汪",
    description: "兒少安置機構評鑑貳、建築物環境及設施設備8項基準完整解說，全部由主管機關依輔導查核情形評分，評委可依現場狀況±2分。",
    url: "https://reportwang.com/school/youth-care/environment",
  },
};

const section = youthCareProfile.sections[1];

const tips = youthCareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "youth-care",
  subpage: "environment",
  section,
  name: "兒少安置機構評鑑：貳、建築物環境及設施設備",
  description: "112年度兒少安置機構評鑑建築物環境及設施設備8項基準完整解說，包含整體環境衛生、機構環境配置、公共安全、危機事故預防及處理等，評委可依現場狀況±2分。",
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
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${youthCareMeta.year} 年度` },
            { label: "資料來源", value: youthCareMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={youthCareMeta} />
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
                <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
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
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/youth-care/administration"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          壹、行政組織與經營管理
        </Link>
        <Link
          href="/school/youth-care/professional-quality"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          參、專業服務
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
