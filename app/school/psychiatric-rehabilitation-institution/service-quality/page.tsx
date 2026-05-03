import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd } from "@/lib/school-jsonld";
import {
  psychiatricRehabilitationDayProfile,
  psychiatricRehabilitationResidentialProfile,
} from "@/lib/ai/evaluation-profiles/psychiatric-rehabilitation-institution";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { psychiatricRehabilitationDayTips } from "@/lib/evaluation-tips/psychiatric-rehabilitation-day";
import { psychiatricRehabilitationResidentialTips } from "@/lib/evaluation-tips/psychiatric-rehabilitation-residential";
import { FacilityTypeTabs } from "../_facility-type-tabs";

export const metadata: Metadata = {
  title: "第3章、服務品質（3.1–3.14）｜精神復健機構評鑑",
  description:
    "115年度精神復健機構評鑑基準第3章服務品質完整解說。日間型12條（配分29）、住宿型14條（配分30），涵蓋工作手冊、收結案標準、紀錄管理、復健基金、權益維護、健康維護、緊急應變、出入自由（住宿型重點項目）。",
  keywords: [
    "精神復健機構評鑑",
    "服務品質",
    "115年度評鑑",
    "權益維護",
    "出入自由",
    "重點項目",
    "復健基金管理",
  ],
  alternates: {
    canonical: "https://reportwang.com/school/psychiatric-rehabilitation-institution/service-quality",
  },
  openGraph: {
    title: "第3章、服務品質（3.1–3.14）｜精神復健機構評鑑",
    description: "115年度精神復健機構評鑑第3章服務品質，日間型12條/住宿型14條完整解說。",
    url: "https://reportwang.com/school/psychiatric-rehabilitation-institution/service-quality",
  },
};

const daySection = psychiatricRehabilitationDayProfile.sections.find(
  (s) => s.shortCode === "3"
)!;
const residentialSection = psychiatricRehabilitationResidentialProfile.sections.find(
  (s) => s.shortCode === "3"
)!;

const dayTips = psychiatricRehabilitationDayTips;

const residentialTips = psychiatricRehabilitationResidentialTips;

const jsonLd = schoolSubpageJsonLd({
  type: "psychiatric-rehabilitation-institution",
  subpage: "service-quality",
  section: daySection,
  name: "精神復健機構評鑑 第3章、服務品質",
  description: "115年度精神復健機構評鑑基準第3章服務品質，日間型12條/住宿型14條完整解說。",
});

export default function ServiceQualityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="mb-6">
        <Badge className="mb-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0 hover:bg-orange-500/20">
          第3章、服務品質
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          第3章、服務品質
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          復健服務品質的精進應深植於每日復健的常規中，依 PDCA 原則檢討機構的功能與復健績效。日間型共 12 條（配分 29 分），住宿型共 14 條（配分 30 分，含唯一重點項目 3.11 維護住民出入自由）。住宿型的管理方式有別於醫院，重點在秉持復元理念與優勢觀點，於最少限制的環境中，與住民一起協作，逐步擺脫疾病限制。
        </p>
      </div>

      <FacilityTypeTabs
        dayItems={daySection.items}
        residentialItems={residentialSection.items}
        dayTips={dayTips}
        residentialTips={residentialTips}
        colorClass="orange"
      />

      {/* Prev/Next */}
      <div className="flex justify-between mt-10 pt-6 border-t">
        <Link
          href="/school/psychiatric-rehabilitation-institution/rehabilitation"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          第2章、復健服務
        </Link>
        <Link
          href="/school/psychiatric-rehabilitation-institution"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          回到評鑑總覽
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
