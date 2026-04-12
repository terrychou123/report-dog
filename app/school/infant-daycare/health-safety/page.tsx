import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { infantDaycareProfile } from "@/lib/ai/evaluation-profiles/infant-daycare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { infantDaycareTips } from "@/lib/evaluation-tips/infant-daycare";

export const metadata: Metadata = {
  title: "健康安全（項目 37–60）｜托嬰中心評鑑 114-116年度",
  description:
    "臺北市114-116年度托嬰中心評鑑：三、健康安全（40分），共24項基準，涵蓋健康管理、健康安全飲食、環境與衛生設備、環境與設備安全及健康與安全照護完整說明與準備要訣。",
  keywords: [
    "托嬰中心健康安全評鑑",
    "托嬰中心餐點飲食評鑑",
    "托嬰中心衛生設備評鑑",
    "114年托嬰中心健康管理",
    "托嬰中心給藥管理評鑑",
    "托嬰中心感染管制評鑑",
    "嬰幼兒安全環境評鑑",
  ],
  alternates: {
    canonical: "https://reportwang.com/school/infant-daycare/health-safety",
  },
  openGraph: {
    title: "健康安全（項目 37–60）｜托嬰中心評鑑｜報告汪",
    description:
      "托嬰中心評鑑三、健康安全24項基準完整解說，掌握健康管理、飲食衛生、給藥管理、環境安全及感染管制等評鑑要點。",
    url: "https://reportwang.com/school/infant-daycare/health-safety",
  },
};

// Health-safety sections: indices 9-13 (items 37-60)
const healthSections = infantDaycareProfile.sections.slice(9, 14);
const allItems = healthSections.flatMap((s) => s.items);

const tips = infantDaycareTips;

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "托嬰中心評鑑：三、健康安全",
  description:
    "臺北市114-116年度托嬰中心評鑑三、健康安全24項基準完整解說，涵蓋健康管理、飲食衛生、給藥管理、環境設備安全及感染管制。",
  path: "/school/infant-daycare/health-safety",
});

export default function InfantDaycareHealthSafetyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20">
            健安
          </Badge>
          <span className="text-sm text-muted-foreground">項目 37–60 ／ 40 分</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">三、健康安全</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共24項基準（40分），涵蓋健康管理、健康安全飲食、環境與衛生設備、環境與設備安全及健康與安全照護五大面向。
          評鑑委員會進行實地觀察並查驗相關記錄，其中食物樣品留存、給藥委託單、感染管制手冊版本為最常見扣分陷阱。
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
              className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20 transition-colors"
            >
              {item.id}. {item.title}
            </a>
          ))}
        </div>
      </div>

      {/* Items grouped by sub-section */}
      <div className="space-y-12">
        {healthSections.map((section) => (
          <div key={section.name}>
            {/* Sub-section header */}
            <div className="flex items-center gap-2 mb-6 pb-2 border-b">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                {section.shortCode}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">{section.name}</span>
            </div>

            <div className="space-y-10">
              {section.items.map((item) => (
                <div key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400 font-mono shrink-0">
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
          href="/school/infant-daycare/childcare-activities"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          二、托育活動
        </Link>
        <Link
          href="/school/infant-daycare"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          評鑑基準總覽
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
