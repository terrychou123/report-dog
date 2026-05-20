import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { psychiatricNursingHomeProfile, meta as psychiatricNursingHomeMeta } from "@/lib/ai/evaluation-profiles/psychiatric-nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { psychiatricNursingHomeTips } from "@/lib/evaluation-tips/psychiatric-nursing-home";
import { EvaluationReferences } from "@/components/school/evaluation-references";
import { psychiatricNursingHomeReferences } from "@/lib/evaluation-references/psychiatric-nursing-home";

export const metadata: Metadata = {
  title: "C、安全維護及設施設備（C1.1–C1.3）｜精神護理之家評鑑",
  description:
    "115年度精神護理之家評鑑基準 C 面向：安全維護及設施設備，共 3 條指標。含疏散避難系統（重點項目）、火災應變計畫及夜間演練。",
  keywords: ["精神護理之家評鑑", "115年度評鑑", "安全維護", "疏散避難", "火災應變", "重點項目"],
  alternates: {
    canonical: "/school/psychiatric-nursing-home/safety-facilities",
  },
  openGraph: {
    title: "C、安全維護及設施設備（C1.1–C1.3）｜精神護理之家評鑑",
    description: "115年度精神護理之家評鑑 C 面向 3 條指標完整解說。",
    url: "https://reportwang.com/school/psychiatric-nursing-home/safety-facilities",
  },
};

const section = psychiatricNursingHomeProfile.sections.find(
  (s) => s.shortCode === "C"
)!;

const tips = psychiatricNursingHomeTips;

const jsonLd = schoolSubpageJsonLd({
  type: "psychiatric-nursing-home",
  subpage: "safety-facilities",
  section,
  name: "精神護理之家評鑑 C、安全維護及設施設備",
  description: "115年度精神護理之家評鑑基準 C 面向 3 條指標完整解說。",
});

export default function SafetyFacilitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="mb-6">
        <Badge className="mb-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0 hover:bg-orange-500/20">
          C、安全維護及設施設備
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          C、安全維護及設施設備（C1.1–C1.3）
        </h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${psychiatricNursingHomeMeta.year} 年度` },
            { label: "資料來源", value: psychiatricNursingHomeMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={psychiatricNursingHomeMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本面向共 3 條指標，包含 1 項重點項目（C1.1 疏散避難系統）。精神護理之家因住民具有精神障礙特性，疏散避難的規劃與演練尤為重要，各樓層須設置符合規定之等待救接空間。
        </p>
      </div>

      <div className="space-y-8">
        {section.items.map((item) => (
          <div key={item.id} id={`item-${item.id}`} className="scroll-mt-16">
            <div className="flex items-start gap-3 mb-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center text-sm font-medium">
                {item.id}
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-base">{item.title}</h3>
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
                <DocsTip variant={tips[item.id].variant ?? "neutral"}>
                  {tips[item.id].content}
                </DocsTip>
              )}
              <EvaluationReferences references={psychiatricNursingHomeReferences[item.id]} />
            </div>
          </div>
        ))}
      </div>

      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="flex justify-between mt-10 pt-6 border-t">
        <Link
          href="/school/psychiatric-nursing-home/professional-quality"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          B、專業照護品質
        </Link>
        <Link
          href="/school/psychiatric-nursing-home/resident-rights"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          D、住民權益保障
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
