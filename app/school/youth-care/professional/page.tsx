import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { youthCareProfile } from "@/lib/ai/evaluation-profiles/youth-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "專業服務（項目 16–22）｜兒少教養機構評鑑",
  description:
    "111年度兒少教養機構聯合評鑑：參、專業服務，共7項基準（44分），包含進住機構協助、安置期間生活輔導、家庭重聚、結束安置輔導、資源結合、團體活動及專業支持等完整評鑑說明。",
  keywords: [
    "兒少教養機構評鑑",
    "安置機構專業服務評鑑",
    "111年度聯合評鑑",
    "兒少安置計畫評鑑",
    "安置期間生活輔導評鑑",
    "兒少教養機構社工評鑑",
    "結束安置準備輔導",
  ],
  alternates: { canonical: "https://reportwang.com/school/youth-care/professional" },
  openGraph: {
    title: "專業服務（項目 16–22）｜兒少教養機構評鑑｜報告汪",
    description: "兒少教養機構評鑑參、專業服務7項基準完整解說，涵蓋安置計畫、生活輔導、家庭重聚、結束安置等核心社工服務評鑑要點。",
    url: "https://reportwang.com/school/youth-care/professional",
  },
};

const section = youthCareProfile.sections[2];

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  16: {
    content: "安置照顧計畫需在「安置1個月內」完成，這是評鑑委員最常查核的時間點。計畫需依兒少的年齡、族群特性和文化背景個別化擬定，且需有與重要關係人（父母、主責社工、教師）共同討論的書面記錄。",
    variant: "warning",
  },
  17: {
    content: "個案處遇計畫定期檢視是本項的核心：安置1年內，以3個月為原則（至多不超過6個月）；1年以上則至少每3至6個月檢視調整。緊急、短期安置個案不適用定期檢視規定。評鑑委員會抽查多個個案紀錄，確保定期檢視有確實執行。",
    variant: "warning",
  },
  18: {
    content: "本項不適用於緊急安置個案。評鑑重點是「具體的方法與策略」及「有成效」，不只是有辦法與主責社工聯繫。需保存每次家庭聯繫、會面或重聚的紀錄，包含兒少反應和後續追蹤情形。",
    variant: "info",
  },
  19: {
    content: "結束安置後的關懷追蹤需至少持續1年，評鑑委員會查核是否有具體的追蹤記錄。準備計畫需涵蓋多面向議題（就學、就業、租屋、就醫、金錢管理等），緊急安置個案不適用「關懷結束安置個案」部分。",
    variant: "info",
  },
  20: {
    content: "資源清冊需「每年盤點更新」，評鑑委員會看是否有更新日期紀錄。重要的是要有實際「運用紀錄」，說明曾連結哪些資源給哪些個案，並呈現資源連結的成效。",
    variant: "neutral",
  },
  21: {
    content: "團體活動或服務方案需有「成效評估及紀錄」，不只是活動辦理記錄。成效評估可以是量化（參與人數、達成率）或質化（個案回饋、行為改變觀察）方式呈現。",
    variant: "neutral",
  },
  22: {
    content: "專業督導制度需有明確頻率（至少每月1次），且督導紀錄要清楚記錄督導內容（含專業知能提升、問題討論、危機預防等）。若機構在「升遷與久任」方面有具體支持措施（如薪資調整制度、資深員工獎勵），應備齊相關辦法文件。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "兒少教養機構評鑑：參、專業服務",
  description: "111年度兒少教養機構聯合評鑑專業服務7項基準完整解說，包含進住機構協助與適應、安置期間生活輔導、兒少與家庭重聚、結束安置準備與輔導等核心服務。",
  path: "/school/youth-care/professional",
});

export default function YouthCareProfessionalPage() {
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
            {section.shortCode}
          </Badge>
          <span className="text-sm text-muted-foreground">項目 16–22</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{section.name}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共7項基準（44分），是整個評鑑配分最重的區塊，著重個案服務品質。評鑑委員會透過審閱文件、實地觀察、與機構人員訪談及與個案訪談等方式綜合評分。
        </p>
      </div>

      {/* Mini TOC */}
      <div className="mb-8 rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">本頁項目</p>
        <div className="flex flex-wrap gap-2">
          {section.items.map((item) => (
            <a
              key={item.id}
              href={`#item-${item.id}`}
              className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
            >
              {item.id}. {item.title.length > 12 ? item.title.slice(0, 12) + "…" : item.title}
            </a>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="space-y-10">
        {section.items.map((item) => (
          <div key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 font-mono shrink-0">
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

      {/* Prev / Next */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/youth-care/environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          貳、建築物環境與設施設備
        </Link>
        <Link
          href="/school/youth-care/rights"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          肆、權益保障
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
