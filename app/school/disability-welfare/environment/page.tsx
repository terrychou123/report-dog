import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { disabilityWelfareProfile } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title:
    "二、環境設施及安全維護（項目 12–31）｜身心障礙福利機構評鑑｜109年度",
  description:
    "109年度身心障礙福利機構評鑑「環境設施及安全維護」20 項評鑑指標詳細說明：浴廁設施、無障礙設備、消防安全、緊急災害應變、寢室面積、環境衛生等，含準備要訣。",
  keywords: [
    "身心障礙福利機構評鑑環境設施",
    "身心障礙機構消防安全",
    "身心障礙機構無障礙設施",
    "身心障礙機構評鑑安全維護",
    "身心障礙福利機構評鑑",
    "109年度評鑑準備",
  ],
  alternates: {
    canonical:
      "https://reportwang.com/school/disability-welfare/environment",
  },
  openGraph: {
    title:
      "二、環境設施及安全維護（項目 12–31）｜身心障礙福利機構評鑑｜報告汪",
    description:
      "109年度身心障礙福利機構評鑑環境設施及安全維護區塊 20 項指標詳細說明與準備要訣。",
    url: "https://reportwang.com/school/disability-welfare/environment",
  },
};

const section = (() => {
  const s = disabilityWelfareProfile.sections.find(
    (s) => s.shortCode === "環",
  );
  if (!s)
    throw new Error("disabilityWelfareProfile: section 環 not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  12: {
    content:
      "浴廁比例（1:6）是硬性規定，務必提前計算確認。注意隱密性要求：廁所及浴室都需有隔間或門簾，且需有男女之分。重度失能機構另需注意臥床者專用洗澡設備。",
    variant: "warning",
  },
  13: {
    content:
      "無障礙浴廁以108年新公告設計規範為依據。既有建物如無法符合現行標準，可向建築機關提出替代改善計畫。輪椅使用者每滿6人需增設一處廁所。",
    variant: "info",
  },
  14: {
    content:
      "緊急呼叫設備需涵蓋無障礙廁所、寢室、一般廁所等空間。重點注意設備功能正常且可在工作站或走廊顯示。日間型機構若無寢室，第2項不適評。",
    variant: "warning",
  },
  15: {
    content:
      "避難逃生路徑需雙向（兩個以上逃生出口），防火門須能隨時關閉或與火警系統連動。等待救援空間需具通排煙及防火區劃功能。二層樓以上建築才需設置。",
    variant: "warning",
  },
  16: {
    content:
      "本項為核心指標，影響評鑑等第。公安申報需現場置有報告書及合格證明；消防檢修每半年1次，需備3年完整紀錄；防火管理人需有效證書；每月需自主檢查用電設備安全。",
    variant: "warning",
  },
  17: {
    content:
      "緊急災害應變演練每年至少2次（含夜間演練1次）。演練需有完整腳本、過程紀錄、檢討會議及修正方案。夜間演練以大夜班為準，日間型機構夜間演練不適用。",
    variant: "warning",
  },
  18: {
    content:
      "本項為新增指標，重點在疏散策略的具體可行性。緊急避難平面圖需符合實際方位且標示所在位置。演練紀錄需包含不同屬性服務對象（輪椅、臥床、插管等）的全程紀錄及照片。",
    variant: "info",
  },
  19: {
    content:
      "寢室面積標準：每人7平方公尺（小型住宿機構5平方公尺）。評分以符合比例分級：50-75%為1級分，75-100%為2級分，100%為3級分。每間寢室都需有採光及通風。",
    variant: "info",
  },
  20: {
    content:
      "機具使用安全分兩類評估：(1)服務對象使用的機具需有警示標誌及防護設備；(2)工作人員使用的儀器設備需有操作維護規定及定期校正紀錄。重度失能機構僅評第3、4項。",
    variant: "info",
  },
  21: {
    content:
      "護理空間僅重度失能機構適評。護理站需有護理紀錄櫃、藥品存放櫃、護理工作車，且準備空間應為獨立隔間以符合感染管控。每棟層均需設有護理站或簡易工作站。",
    variant: "info",
  },
  22: {
    content:
      "環境清潔需每3個月全面消毒1次並有紀錄。廢棄物需依規定分類處理，事業廢棄物或感染性廢棄物需與廠商簽約。非重度失能機構適用前3項標準，重度失能機構適用全部。",
    variant: "info",
  },
  23: {
    content:
      "污物處理需有書面辦法、流程圖及處理紀錄。注意不同屬性污物（如尿布、嘔吐物及糞便等）需分別訂定處理辦法。污物動線需符合感染管控原則。",
    variant: "info",
  },
  24: {
    content:
      "餐廳廚房衛生重點：需有配膳作業標準、定期清潔消毒紀錄、防蟲害措施。供膳外包需有合約及衛生合格證明。餐具需有消毒設備，有傳染管理需求者需有專屬餐具。",
    variant: "info",
  },
  25: {
    content:
      "食物儲存重點：冷藏溫度需7°C以下、蔬菜與肉類分開、定期檢查有效日期、專屬空間不放非食品。這四項都是現場實查重點。",
    variant: "info",
  },
  26: {
    content:
      "儲藏設施為新增指標。易燃可燃物品需集中管理且上鎖，儲存物品需有分類標示及進冊盤點紀錄。化學物品及氣氧鋼瓶需獨立管制。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "二、環境設施及安全維護（109年度身心障礙福利機構評鑑指標項目 12–31）",
  description:
    "109年度身心障礙福利機構評鑑指標「環境設施及安全維護」20 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/disability-welfare/environment",
});

export default function DisabilityWelfareEnvironmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          二、環境設施及安全維護
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          環境設施及安全維護（項目 12–31）
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 20 個評鑑項目（含 5 項不計分新增指標），涵蓋浴廁設施、無障礙設備、消防安全、
          緊急災害應變、寢室面積、機具維護、環境衛生及食品安全等面向。其中項目
          16（建築物公安及消防）為核心指標。
        </p>
      </div>

      {/* Mini TOC */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          本頁內容
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {section.items.map((item) => (
            <li key={item.id}>
              <a
                href={`#item-${item.id}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-background border flex items-center justify-center text-xs font-mono">
                  {item.id}
                </span>
                <span className="truncate">
                  {item.score === 0 ? "⊘ " : ""}
                  {item.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Items */}
      <div className="space-y-12">
        {section.items.map((item) => (
          <section
            key={item.id}
            id={`item-${item.id}`}
            aria-labelledby={`heading-${item.id}`}
            className="scroll-mt-20"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400 font-mono">
                {item.id}
              </span>
              <h2
                id={`heading-${item.id}`}
                className="text-lg font-bold"
              >
                {item.title}
              </h2>
              <Badge variant="outline" className="text-xs">
                {item.indicatorCode}
              </Badge>
              <Badge
                variant={item.score === 0 ? "destructive" : "secondary"}
                className="text-xs"
              >
                {item.score > 0 ? `${item.score}分` : "不計分"}
              </Badge>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">評鑑標準</p>
              <ol role="list" className="space-y-1.5 list-none pl-0">
                {item.criteria.map((criterion, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-sm text-muted-foreground"
                  >
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-mono text-foreground">
                      {i + 1}
                    </span>
                    {criterion}
                  </li>
                ))}
              </ol>
            </div>

            {item.reviewBasis && (
              <div className="mb-4">
                <p className="text-sm font-semibold mb-1">
                  評鑑實施方式：{item.reviewMethod}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.reviewBasis}
                </p>
              </div>
            )}

            {item.note && (
              <div className="mb-4 rounded-md bg-muted/50 border p-3">
                <p className="text-xs text-muted-foreground whitespace-pre-line">
                  📌 {item.note}
                </p>
              </div>
            )}

            {tips[item.id] && (
              <DocsTip
                variant={tips[item.id].variant ?? "neutral"}
                title="準備要訣"
              >
                {tips[item.id].content}
              </DocsTip>
            )}
          </section>
        ))}
      </div>

      {/* Prev / Next navigation */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/disability-welfare/administration"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          一、行政組織及經營管理
        </Link>
        <Link
          href="/school/disability-welfare/professional"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          三、專業服務
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
