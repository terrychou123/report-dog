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
  title: "第1章、經營管理（1.1–1.12）｜精神復健機構評鑑",
  description:
    "115年度精神復健機構評鑑基準第1章經營管理完整解說。日間型10條（配分34）、住宿型12條（配分33），涵蓋負責人經營管理、人力穩定性、督導訓練、健康檢查、社區便利性、復健資源及空間設施。",
  keywords: [
    "精神復健機構評鑑",
    "經營管理",
    "115年度評鑑",
    "日間型精神復健機構",
    "住宿型精神復健機構",
  ],
  alternates: {
    canonical: "https://reportwang.com/school/psychiatric-rehabilitation-institution/management",
  },
  openGraph: {
    title: "第1章、經營管理（1.1–1.12）｜精神復健機構評鑑",
    description: "115年度精神復健機構評鑑第1章經營管理，日間型10條/住宿型12條完整解說。",
    url: "https://reportwang.com/school/psychiatric-rehabilitation-institution/management",
  },
};

const daySection = psychiatricRehabilitationDayProfile.sections.find(
  (s) => s.shortCode === "1"
)!;
const residentialSection = psychiatricRehabilitationResidentialProfile.sections.find(
  (s) => s.shortCode === "1"
)!;

const dayTips = psychiatricRehabilitationDayTips;

const residentialTips = psychiatricRehabilitationResidentialTips;

const jsonLd = schoolSubpageJsonLd({
  type: "psychiatric-rehabilitation-institution",
  subpage: "management",
  section: daySection,
  name: "精神復健機構評鑑 第1章、經營管理",
  description: "115年度精神復健機構評鑑基準第1章經營管理，日間型10條/住宿型12條完整解說。",
  extraFaq: [
    {
      question: "精神復健機構評鑑第1章「經營管理」的配分如何？",
      answer: "日間型機構共 10 個項目（配分 34 分），住宿型共 12 個項目（配分 33 分）。涵蓋負責人經營理念、人力穩定性、督導訓練制度、健康檢查、社區便利性及復健資源開發。",
    },
    {
      question: "負責人上任有何資格與時間限制？",
      answer: "依評鑑基準 1.1，負責人上任至評鑑當年 7 月 1 日前須滿 1 年，且需具備個人復元及社區支持理念，並能提出短中長程計畫。",
    },
  ],
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
          第1章、經營管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          第1章、經營管理
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本章主要在評量機構負責人經營管理的妥適性，為影響服務品質最基本之要素，包括人力資源、財務管理、復健理念、復健績效與整體發展方向之規劃等。日間型共 10 條（配分 34 分），住宿型共 12 條（配分 33 分）。
        </p>
      </div>

      <FacilityTypeTabs
        dayItems={daySection.items}
        residentialItems={residentialSection.items}
        dayTips={dayTips}
        residentialTips={residentialTips}
        colorClass="blue"
      />

      {/* Prev/Next */}
      <div className="flex justify-between mt-10 pt-6 border-t">
        <Link
          href="/school/psychiatric-rehabilitation-institution"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          評鑑總覽
        </Link>
        <Link
          href="/school/psychiatric-rehabilitation-institution/rehabilitation"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          第2章、復健服務
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
