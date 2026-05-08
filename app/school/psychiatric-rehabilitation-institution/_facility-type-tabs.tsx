"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { DocsTip } from "@/components/docs/docs-tip";
import { EvaluationReferences } from "@/components/school/evaluation-references";
import type { ReferenceDoc } from "@/lib/evaluation-references/types";

type Item = {
  id: number;
  title: string;
  score: number;
  responsible: string;
  criteria: string[];
  reviewMethod: string;
  isOptional?: boolean;
  isTrial?: boolean;
  isPfm?: boolean;
  isTrialDeduction?: boolean;
};

type TipRecord = Record<number, { content: string; variant?: "neutral" | "info" | "warning" }>;

type ReferencesMap = Partial<Record<number, ReferenceDoc[]>>;

interface FacilityTypeTabsProps {
  dayItems: Item[];
  residentialItems: Item[];
  dayTips?: TipRecord;
  residentialTips?: TipRecord;
  dayReferences?: ReferencesMap;
  residentialReferences?: ReferencesMap;
  colorClass: keyof typeof colorConfig;
}

const colorConfig: Record<string, { bg: string; text: string; circle: string; toc: string }> = {
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    circle: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    toc: "bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20",
  },
  green: {
    bg: "bg-green-500/10",
    text: "text-green-600 dark:text-green-400",
    circle: "bg-green-500/10 text-green-600 dark:text-green-400",
    toc: "bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20",
  },
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
    circle: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    toc: "bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20",
  },
};

export function FacilityTypeTabs({
  dayItems,
  residentialItems,
  dayTips = {},
  residentialTips = {},
  dayReferences,
  residentialReferences,
  colorClass,
}: FacilityTypeTabsProps) {
  const [facilityType, setFacilityType] = useState<"day" | "residential">("day");

  const activeItems = useMemo(
    () => (facilityType === "day" ? dayItems : residentialItems),
    [facilityType, dayItems, residentialItems]
  );

  const activeTips = facilityType === "day" ? dayTips : residentialTips;
  const activeReferences = facilityType === "day" ? dayReferences : residentialReferences;
  const colors = colorConfig[colorClass];

  return (
    <div>
      {/* 子類型切換 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFacilityType("day")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            facilityType === "day"
              ? "bg-sky-500/10 text-sky-600 dark:text-sky-400"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          日間型（{dayItems.length} 條）
        </button>
        <button
          onClick={() => setFacilityType("residential")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            facilityType === "residential"
              ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          住宿型（{residentialItems.length} 條）
        </button>
      </div>

      {/* 用語提示 */}
      <div className="text-xs text-muted-foreground mb-4 px-2">
        {facilityType === "day"
          ? "💡 日間型機構服務對象稱為「學員」，學員每日往返機構接受復健訓練"
          : "💡 住宿型機構服務對象稱為「住民」，住民全時居住於機構內"}
      </div>

      {/* Mini TOC */}
      <div className="border rounded-lg p-3 mb-6 bg-muted/30">
        <p className="text-xs font-medium mb-2 text-muted-foreground">本頁指標</p>
        <div className="flex flex-wrap gap-1.5">
          {activeItems.map((item) => (
            <a
              key={item.id}
              href={`#item-${item.id}`}
              className={`text-xs px-2 py-0.5 rounded transition-colors ${colors.toc}`}
            >
              {item.title.split(" ")[0]}
            </a>
          ))}
        </div>
      </div>

      {/* 條目列表 */}
      <div className="space-y-8">
        {activeItems.map((item) => (
          <div key={`${facilityType}-${item.id}`} id={`item-${item.id}`} className="scroll-mt-16">
            <div className="flex items-start gap-3 mb-3">
              <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${colors.circle}`}>
                {item.id}
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-semibold text-base">{item.title}</h2>
                  {item.isTrialDeduction && (
                    <Badge variant="destructive" className="text-xs">重點項目</Badge>
                  )}
                  {item.isOptional && (
                    <Badge variant="secondary" className="text-xs">可選項目</Badge>
                  )}
                  {item.isTrial && (
                    <Badge variant="outline" className="text-xs">試評</Badge>
                  )}
                  {item.isPfm && (
                    <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0 text-xs">
                      PFM
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  負責人：{item.responsible}
                  {item.score > 0 && <span className="ml-2">配分：{item.score}</span>}
                  {item.isTrial && <span className="ml-2">（成績不納入計算）</span>}
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

              {activeTips[item.id] && (
                <DocsTip variant={activeTips[item.id].variant}>
                  {activeTips[item.id].content}
                </DocsTip>
              )}
              <EvaluationReferences references={activeReferences?.[item.id]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
