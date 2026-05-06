import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import {
  psychiatricRehabilitationDayProfile,
  psychiatricRehabilitationResidentialProfile,
  meta as psychiatricRehabDayMeta,
} from "@/lib/ai/evaluation-profiles/psychiatric-rehabilitation-institution";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { psychiatricRehabilitationDayTips } from "@/lib/evaluation-tips/psychiatric-rehabilitation-day";
import { psychiatricRehabilitationResidentialTips } from "@/lib/evaluation-tips/psychiatric-rehabilitation-residential";
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

const dayTips = psychiatricRehabilitationDayTips;

const residentialTips = psychiatricRehabilitationResidentialTips;

const jsonLd = schoolSubpageJsonLd({
  type: "psychiatric-rehabilitation-institution",
  subpage: "rehabilitation",
  section: daySection,
  name: "精神復健機構評鑑 第2章、復健服務",
  description: "115年度精神復健機構評鑑基準第2章復健服務，日間型14條/住宿型14條完整解說。",
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
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${psychiatricRehabDayMeta.year} 年度` },
            { label: "主管機關", value: psychiatricRehabDayMeta.agency },
            { label: "本區塊項目", value: `共 ${daySection.items.length} 條` },
            { label: "區塊名稱", value: daySection.name },
          ]}
        />
        <SourceCallout meta={psychiatricRehabDayMeta} />
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
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section: daySection })} />

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
