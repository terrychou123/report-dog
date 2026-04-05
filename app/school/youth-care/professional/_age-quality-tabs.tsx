"use client";

import { useState, useMemo } from "react";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";

type Item = {
  id: number;
  title: string;
  responsible: string;
  criteria: string[];
  reviewMethod: string;
  score?: number;
  note?: string;
  ageGroup?: string;
};

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  17: {
    content: "【2歲以下】入院協助與適應：需了解嬰幼兒身心狀態並提供陪伴安撫（2分），及協助適應正常生活作息（2分）。保存入院協助記錄及個案生活輔導紀錄，作為評鑑佐證文件。",
    variant: "neutral",
  },
  18: {
    content: "【2歲以下】在院生活輔導是2歲以下版本配分最重的項目（16分，共8個子項各2分）。重點是提供家庭式生活環境、依嬰幼兒個別差異提供適當刺激、建立良好依附關係。學前兒童發展檢核表是重要評分依據，請確實建立並定期更新。",
    variant: "warning",
  },
  19: {
    content: "【2歲以下】離院協助與準備：需協助嬰幼兒離院準備，包含與原生家庭/親屬/未來照顧者的重聚準備。保存個案清冊（含入出院時間、資源運用、結案原因）及離院轉銜協助記錄。",
    variant: "neutral",
  },
  20: {
    content: "【2歲以下】直接服務共5個子項各2分（10分）。評鑑委員特別注意：嬰幼兒個案處遇計畫需定期更新、生活記錄需完整詳實、有建立特殊行為的標準處理模式，以及離院後的轉銜協助與追蹤輔導紀錄。",
    variant: "info",
  },
  21: {
    content: "【2歲以上18歲以下】入院協助與適應：需了解兒少身心狀態並提供陪伴安撫（2分），及協助了解並適應機構生活（2分）。入院協助記錄需呈現個別化的協助措施，非制式化流程。",
    variant: "neutral",
  },
  22: {
    content: "【2歲以上18歲以下】在院生活輔導共15個子項各1分（15分）。特別注意：(1)財務規劃管理能力分2子項各0.5分；(2)必須有性侵害、性騷擾及霸凌預防與處理的制度與訓練記錄；(3)倡導兒少應有權益需有具體機制（如家庭會議、個案決策參與）。評鑑委員透過訪談了解兒少是否真正了解自身權益。",
    variant: "warning",
  },
  23: {
    content: "【2歲以上18歲以下】離院協助與準備（4分）：協助離院準備（2分）及少年獨立生活技巧訓練（2分）。獨立生活技巧訓練需有具體的課程或活動記錄，包含就業、金錢管理、租屋、就醫等實用技能。",
    variant: "info",
  },
  24: {
    content: "【2歲以上18歲以下】直接服務共9個子項各1分（9分）。評鑑委員透過個案訪談驗證服務品質，確保：(1)個案處遇計畫真實反映個案需求；(2)心理諮商輔導有具體服務記錄；(3)職業性向探索及生涯輔導有執行記錄；(4)離院兒少追蹤輔導有具體記錄（建議至少追蹤1年）。",
    variant: "warning",
  },
};

function ItemCard({ item, colorClass, bgClass }: { item: Item; colorClass: string; bgClass: string }) {
  return (
    <div id={`item-${item.id}`} className="scroll-mt-20">
      <div className="flex items-start gap-3 mb-3">
        <span className={`w-8 h-8 rounded-full ${bgClass} flex items-center justify-center text-sm font-bold ${colorClass} font-mono shrink-0`}>
          {item.id}
        </span>
        <div className="flex-1">
          <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
            {item.score !== undefined && (
              <Badge variant="secondary" className="text-xs">{item.score}分</Badge>
            )}
          </div>
        </div>
      </div>
      <div className="ml-11">
        <p className="text-xs text-muted-foreground mb-2 font-medium">評鑑基準：</p>
        <ol className="space-y-1.5 list-decimal list-inside mb-4">
          {item.criteria.map((c, i) => (
            <li key={i} className="text-sm text-muted-foreground leading-relaxed">{c}</li>
          ))}
        </ol>
        {tips[item.id] && (
          <DocsTip variant={tips[item.id].variant ?? "neutral"}>
            {tips[item.id].content}
          </DocsTip>
        )}
      </div>
    </div>
  );
}

export function AgeQualityTabs({ allItems }: { allItems: Item[] }) {
  const [ageTab, setAgeTab] = useState<"under2" | "over2">("under2");

  const under2Items = useMemo(() => allItems.filter((item) => item.ageGroup === "under2"), [allItems]);
  const over2Items = useMemo(() => allItems.filter((item) => item.ageGroup === "over2"), [allItems]);
  const activeItems = ageTab === "under2" ? under2Items : over2Items;

  return (
    <div>
      {/* 說明 */}
      <div className="mb-4 rounded-lg bg-blue-500/5 border border-blue-500/20 p-4">
        <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-1">評分說明</p>
        <p className="text-xs text-muted-foreground">
          受評機構如同時安置有2歲以下及2歲以上個案，分數計算方式為取兩項指標之平均數。
          請依機構收容對象選擇對應版本查閱。
        </p>
      </div>

      {/* Tab 切換 */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setAgeTab("under2")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            ageTab === "under2"
              ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          適用 2歲以下（32分）
        </button>
        <button
          onClick={() => setAgeTab("over2")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            ageTab === "over2"
              ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/30"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          適用 2歲以上18歲以下（32分）
        </button>
      </div>

      {/* 配分小表 */}
      {ageTab === "under2" ? (
        <div className="mb-6 grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { label: "入院協助", score: "4分", id: "17" },
            { label: "在院生活", score: "16分", id: "18" },
            { label: "離院協助", score: "2分", id: "19" },
            { label: "直接服務", score: "10分", id: "20" },
          ].map((s) => (
            <a key={s.id} href={`#item-${s.id}`}
              className="rounded-lg bg-indigo-500/5 border border-indigo-500/20 p-2 hover:bg-indigo-500/10 transition-colors">
              <div className="font-bold text-indigo-600 dark:text-indigo-400">{s.score}</div>
              <div className="text-muted-foreground mt-0.5">{s.label}</div>
            </a>
          ))}
        </div>
      ) : (
        <div className="mb-6 grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { label: "入院協助", score: "4分", id: "21" },
            { label: "在院生活", score: "15分", id: "22" },
            { label: "離院協助", score: "4分", id: "23" },
            { label: "直接服務", score: "9分", id: "24" },
          ].map((s) => (
            <a key={s.id} href={`#item-${s.id}`}
              className="rounded-lg bg-violet-500/5 border border-violet-500/20 p-2 hover:bg-violet-500/10 transition-colors">
              <div className="font-bold text-violet-600 dark:text-violet-400">{s.score}</div>
              <div className="text-muted-foreground mt-0.5">{s.label}</div>
            </a>
          ))}
        </div>
      )}

      {/* 對應項目 */}
      <div className="space-y-10">
        {activeItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            colorClass={ageTab === "under2" ? "text-indigo-600 dark:text-indigo-400" : "text-violet-600 dark:text-violet-400"}
            bgClass={ageTab === "under2" ? "bg-indigo-500/10" : "bg-violet-500/10"}
          />
        ))}
      </div>
    </div>
  );
}
