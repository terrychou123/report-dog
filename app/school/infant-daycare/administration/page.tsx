import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { infantDaycareProfile } from "@/lib/ai/evaluation-profiles/infant-daycare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { infantDaycareTips } from "@/lib/evaluation-tips/infant-daycare";

export const metadata: Metadata = {
  title: "行政管理（項目 1–11）｜托嬰中心評鑑 114-116年度",
  description:
    "臺北市114-116年度托嬰中心評鑑：一、行政管理（20分），共11項基準，涵蓋立案行政、人事管理、文書檔案、財務安全及兒童權益保障完整說明與準備要訣。",
  keywords: [
    "托嬰中心評鑑行政管理",
    "托嬰中心人事管理評鑑",
    "托嬰中心在職訓練時數",
    "114年托嬰中心評鑑",
    "托嬰中心兒童權益保障",
    "托嬰中心文書管理",
  ],
  alternates: {
    canonical: "https://reportwang.com/school/infant-daycare/administration",
  },
  openGraph: {
    title: "行政管理（項目 1–11）｜托嬰中心評鑑｜報告汪",
    description:
      "托嬰中心評鑑一、行政管理11項基準完整解說，掌握立案行政、員工在職訓練、人事管理、財務安全等評鑑要點。",
    url: "https://reportwang.com/school/infant-daycare/administration",
  },
};

// Admin sections: indices 0-4 (items 1-11)
const adminSections = infantDaycareProfile.sections.slice(0, 5);
const allItems = adminSections.flatMap((s) => s.items);

const tips = infantDaycareTips;

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "托嬰中心評鑑：一、行政管理",
  description:
    "臺北市114-116年度托嬰中心評鑑一、行政管理11項基準完整解說，涵蓋立案行政、員工在職訓練、人事管理、文書檔案、財務安全及兒童權益保障。",
  path: "/school/infant-daycare/administration",
});

export default function InfantDaycareAdministrationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20">
            行政
          </Badge>
          <span className="text-sm text-muted-foreground">項目 1–11 ／ 20 分</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">一、行政管理</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共11項基準（20分），涵蓋立案行政與業務管理、人事領導與管理、文書與檔案管理、財務總務與安全管理，以及兒童權益保障五大面向。
          負責人／主管人員、行政人員及托育人員各有不同評鑑側重，評鑑委員會進行實地觀察、訪談及文件查閱。
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
              className="text-xs px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 transition-colors"
            >
              {item.id}. {item.title}
            </a>
          ))}
        </div>
      </div>

      {/* Items grouped by sub-section */}
      <div className="space-y-12">
        {adminSections.map((section) => (
          <div key={section.name}>
            {/* Sub-section header */}
            <div className="flex items-center gap-2 mb-6 pb-2 border-b">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400">
                {section.shortCode}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">{section.name}</span>
            </div>

            <div className="space-y-10">
              {section.items.map((item) => (
                <div key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-sm font-bold text-orange-600 dark:text-orange-400 font-mono shrink-0">
                      {item.id}
                    </span>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold leading-snug">{item.title}</h2>
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
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/infant-daycare"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          評鑑基準總覽
        </Link>
        <Link
          href="/school/infant-daycare/childcare-activities"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          二、托育活動
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
