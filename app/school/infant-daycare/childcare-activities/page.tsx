import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { infantDaycareProfile, meta as infantDaycareMeta } from "@/lib/ai/evaluation-profiles/infant-daycare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { infantDaycareTips } from "@/lib/evaluation-tips/infant-daycare";

export const metadata: Metadata = {
  title: "托育活動（項目 12–36）｜托嬰中心評鑑 114-116年度",
  description:
    "臺北市114-116年度托嬰中心評鑑：二、托育活動（40分），共25項基準，涵蓋關係建立與互動、環境規劃與使用、活動規劃與實施、親師交流與合作完整說明與準備要訣。",
  keywords: [
    "托嬰中心托育活動評鑑",
    "托嬰中心環境規劃評鑑",
    "托嬰中心活動設計評鑑",
    "114年托嬰中心評鑑托育活動",
    "托嬰中心親師合作評鑑",
    "嬰幼兒照護環境評鑑",
    "寶寶日誌評鑑",
  ],
  alternates: {
    canonical:
      "https://reportwang.com/school/infant-daycare/childcare-activities",
  },
  openGraph: {
    title: "托育活動（項目 12–36）｜托嬰中心評鑑｜報告汪",
    description:
      "托嬰中心評鑑二、托育活動25項基準完整解說，掌握環境規劃、活動設計、嬰幼兒發展紀錄及親師交流等評鑑要點。",
    url: "https://reportwang.com/school/infant-daycare/childcare-activities",
  },
};

// Activity sections: indices 5-8 (items 12-36)
const activitySections = infantDaycareProfile.sections.slice(5, 9);
const allItems = activitySections.flatMap((s) => s.items);

const tips = infantDaycareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "infant-daycare",
  subpage: "childcare-activities",
  section: activitySections,
  name: "托嬰中心評鑑：二、托育活動",
  description:
    "臺北市114-116年度托嬰中心評鑑二、托育活動25項基準完整解說，涵蓋關係建立、環境規劃、活動設計及親師交流。",
});

export default function InfantDaycareChildcareActivitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20">
            托育
          </Badge>
          <span className="text-sm text-muted-foreground">項目 12–36 ／ 40 分</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">二、托育活動</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${infantDaycareMeta.year} 年度` },
            { label: "主管機關", value: infantDaycareMeta.agency },
            { label: "本區塊項目", value: `共 ${allItems.length} 項` },
            { label: "區塊名稱", value: "二、托育活動" },
          ]}
        />
        <SourceCallout meta={infantDaycareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共25項基準（40分），涵蓋關係建立與互動、環境規劃與使用、活動規劃與實施、親師交流與合作四大面向。
          評鑑委員會進行現場實地觀察，重點關注托育人員與嬰幼兒的互動品質、環境安全及個別化活動設計。
        </p>
      </div>

      {/* Mini TOC */}
      <div className="mb-8 rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">本頁項目</p>
        <div className="flex flex-wrap gap-2">
          {allItems.map((item) => (
            <a
              key={item.id}
              href={`#item-${item.id}`}
              className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
            >
              {item.id}. {item.title}
            </a>
          ))}
        </div>
      </div>

      {/* Items grouped by sub-section */}
      <div className="space-y-12">
        {activitySections.map((section) => (
          <div key={section.name}>
            {/* Sub-section header */}
            <div className="flex items-center gap-2 mb-6 pb-2 border-b">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                {section.shortCode}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">{section.name}</span>
            </div>

            <div className="space-y-10">
              {section.items.map((item) => (
                <div key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 font-mono shrink-0">
                      {item.id}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
                        <Badge variant="secondary" className="text-xs">{item.reviewMethod.split("、")[0]}</Badge>
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
          </div>
        ))}
      </div>

      {/* Prev / Next */}
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section: activitySections })} />

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/infant-daycare/administration"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          一、行政管理
        </Link>
        <Link
          href="/school/infant-daycare/health-safety"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          三、健康安全
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
