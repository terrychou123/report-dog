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

export const metadata: Metadata = {
  title: "D、住民權益保障（D1.1–D1.2）｜精神護理之家評鑑",
  description:
    "115年度精神護理之家評鑑基準 D 面向：住民權益保障，共 2 條指標。含尊重住民信仰及推動安寧緩和療護及病人自主權利。",
  keywords: ["精神護理之家評鑑", "115年度評鑑", "住民權益", "安寧緩和療護", "病人自主"],
  alternates: {
    canonical: "https://reportwang.com/school/psychiatric-nursing-home/resident-rights",
  },
  openGraph: {
    title: "D、住民權益保障（D1.1–D1.2）｜精神護理之家評鑑",
    description: "115年度精神護理之家評鑑 D 面向 2 條指標完整解說。",
    url: "https://reportwang.com/school/psychiatric-nursing-home/resident-rights",
  },
};

const section = psychiatricNursingHomeProfile.sections.find(
  (s) => s.shortCode === "D"
)!;

const tips = psychiatricNursingHomeTips;

const jsonLd = schoolSubpageJsonLd({
  type: "psychiatric-nursing-home",
  subpage: "resident-rights",
  section,
  name: "精神護理之家評鑑 D、住民權益保障",
  description: "115年度精神護理之家評鑑基準 D 面向 2 條指標完整解說。",
});

export default function ResidentRightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="mb-6">
        <Badge className="mb-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-0 hover:bg-purple-500/20">
          D、住民權益保障
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          D、住民權益保障（D1.1–D1.2）
        </h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${psychiatricNursingHomeMeta.year} 年度` },
            { label: "主管機關", value: psychiatricNursingHomeMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={psychiatricNursingHomeMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本面向共 2 條指標，涵蓋尊重住民宗教信仰及推動安寧緩和療護與病人自主權利。精神護理之家應尊重住民的精神、靈性需求，並積極推動病人自主權利法相關事宜。
        </p>
      </div>

      <div className="space-y-8">
        {section.items.map((item) => (
          <div key={item.id} id={`item-${item.id}`} className="scroll-mt-16">
            <div className="flex items-start gap-3 mb-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm font-medium">
                {item.id}
              </span>
              <div>
                <h3 className="font-semibold text-base">{item.title}</h3>
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

      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="flex justify-between mt-10 pt-6 border-t">
        <Link
          href="/school/psychiatric-nursing-home/safety-facilities"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          C、安全維護及設施設備
        </Link>
        <Link
          href="/school/psychiatric-nursing-home/innovation"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          E、創新及改革
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
