import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection } from "@/lib/school-jsonld";
import { homeNursingProfile } from "@/lib/ai/evaluation-profiles/home-nursing";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { homeNursingTips } from "@/lib/evaluation-tips/home-nursing";

export const metadata: Metadata = {
  title: "A5 機構經營指標監測（15%）｜居家護理所評鑑",
  description:
    "115年度居家護理所評鑑 A5 機構經營指標監測與持續改善（15%）完整說明：5 項固定指標——平均個案管理人數、護理人員離職率、個案非計畫性住院率、個案急診使用率、皮膚損傷發生率，含閾值設定與改善機制。",
  keywords: [
    "居家護理所評鑑品質指標",
    "居家護理皮膚損傷發生率",
    "護理人員離職率評鑑",
    "個案非計畫性住院率",
    "居家護理評鑑A5",
    "115年度居家護理所評鑑",
    "居家護理機構經營指標",
  ],
  alternates: {
    canonical: "https://reportwang.com/school/home-nursing/quality-indicators",
  },
  openGraph: {
    title: "A5 機構經營指標監測（15%）｜居家護理所評鑑｜報告汪",
    description: "居家護理所評鑑最高權重單項（15%）：5 項固定品質指標完整說明與監測機制。",
    url: "https://reportwang.com/school/home-nursing/quality-indicators",
  },
};

const sectionA = requireSection(homeNursingProfile.sections, "A");
// A5 機構經營指標監測為 section A 的第 5 個 item（id=5）
const a5Item = sectionA.items.find((i) => i.id === 5)!;
const section = { ...sectionA, items: [a5Item] };

const tips = homeNursingTips;

const jsonLd = schoolSubpageJsonLd({
  type: "home-nursing",
  subpage: "quality-indicators",
  section,
  name: "A5 機構經營指標監測與持續改善（居家護理所評鑑）",
  description:
    "115年度居家護理所評鑑 A5 機構經營指標監測（15%）：5 項固定指標說明、閾值設定方法與持續改善機制。",
  extraFaq: [
    {
      question: "居家護理所評鑑 A5 共有哪 5 項固定品質指標？",
      answer:
        "依 115 年度評鑑基準，5 項固定指標為：（1）平均個案管理人數、（2）護理人員離職率、（3）個案非計畫性住院率、（4）個案急診使用率、（5）皮膚損傷發生率。機構須自行訂定各項指標的閾值，並定期統計分析。",
    },
    {
      question: "A5 閾值如何設定才算合理？",
      answer:
        "評鑑基準要求機構自行訂定閾值，並依監測結果持續修訂。建議參考同類型機構的基準值或衛福部公告數據，第一年若無歷史資料，可設定保守目標後逐步調整。重點是呈現「訂定→監測→超閾值時提出改善措施→追蹤成效」的完整迴路。",
    },
    {
      question: "監測頻率須多久一次？",
      answer:
        "評鑑基準要求「定期（每月、季等）統計資料分析」，機構可選擇每月或每季，建議至少每季製作一份指標分析報告，以便評鑑時能展示完整的時間序列數據。",
    },
    {
      question: "A5 佔 15%，是評鑑中最高權重的單一項目嗎？",
      answer:
        "是的。A5 佔 15%，是居家護理所評鑑中單一項目最高權重，超越其他任一項目（A1–A4 各佔 6–8%，B1 佔 10%，B2 佔 45%）。若 A5 未通過，對整體評分影響極大。",
    },
  ],
});

// 5 項固定指標
const FIVE_INDICATORS = [
  {
    name: "平均個案管理人數",
    description: "反映機構服務量能，計算方式為評鑑日前一年內，平均每位護理人員所管理的個案數。",
    tip: "建議定期（每月）從個案管理系統匯出數據並留存，提供歷月趨勢圖表效果最佳。",
  },
  {
    name: "護理人員離職率",
    description: "反映人員穩定度，計算方式為評鑑日前一年內離職護理人員數 ÷ 年度平均在職護理人員數 × 100%。",
    tip: "若離職率偏高，須提出具體留任措施（薪酬調整、教育訓練、彈性排班等）並追蹤執行成效。",
  },
  {
    name: "個案非計畫性住院率",
    description: "反映照護品質，計算服務期間因非預期狀況緊急住院的個案比例。",
    tip: "需區分「計畫性住院」（如定期手術、健康檢查入院）與「非計畫性住院」，並在病歷中清楚記錄住院原因。",
  },
  {
    name: "個案急診使用率",
    description: "反映緊急照護處置能力，計算服務期間因緊急狀況送急診的個案比例。",
    tip: "若急診使用率偏高，改善措施可包含強化家屬緊急處置教育、與醫療院所建立更緊密的協作機制。",
  },
  {
    name: "皮膚損傷發生率",
    description: "反映基礎照護品質，計算服務期間新發生壓傷（壓力性損傷）或其他皮膚損傷的個案比例。",
    tip: "建議引入標準化的皮膚評估工具（如 Braden Scale）並定期評估記錄，同時追蹤已有損傷個案的改善情形。",
  },
];

export default function HomeNursingQualityIndicatorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0 hover:bg-orange-500/20">
          A、經營管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">A5 機構經營指標監測與持續改善（15%）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          A5 是居家護理所評鑑中<strong>單一項目最高權重（15%）</strong>，要求機構建立 5 項固定品質指標的監測機制，
          並能展示「訂定閾值 → 定期分析 → 超閾值改善 → 追蹤成效」的完整品管迴路。
        </p>
      </div>

      {/* 評鑑標準 */}
      <section id={`item-${a5Item.id}`} className="mb-10 scroll-mt-20">
        <h2 className="text-base font-bold mb-3">評鑑標準（A5，項目 5）</h2>
        <ol className="space-y-2">
          {a5Item.criteria.map((criterion, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
              <span className="shrink-0 mt-0.5 w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-mono text-foreground">
                {i + 1}
              </span>
              {criterion}
            </li>
          ))}
        </ol>
      </section>

      {/* 5 項固定指標 */}
      <section className="mb-10">
        <h2 className="text-base font-bold mb-4">5 項固定品質指標詳解</h2>
        <div className="space-y-4">
          {FIVE_INDICATORS.map((ind, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center text-xs font-bold text-orange-600 dark:text-orange-400">
                  {i + 1}
                </span>
                <h3 className="text-sm font-semibold">{ind.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{ind.description}</p>
              <p className="text-xs text-muted-foreground/80 italic">💡 {ind.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 閾值設定與監測機制 */}
      <section className="mb-10">
        <h2 className="text-base font-bold mb-4">閾值設定 × 監測機制</h2>
        <DocsTip variant="info" title="建立品管迴路">
          評鑑重點不在指標數值本身「好不好」，而在機構能否呈現完整的品質管理迴路：
          （1）訂有指標監測計畫；（2）定期統計並分析；（3）超過閾值時提出具體改善措施；（4）追蹤改善成效並修訂閾值。
        </DocsTip>

        <DocsTip variant="warning" title="常見扣分原因">
          ① 僅有數字紀錄，無分析說明及改善措施；② 所有指標設定「目標值 = 0%」（不切實際）；
          ③ 閾值從未修訂；④ 超閾值月份未提出對應改善方案；⑤ 紀錄時間範圍不足一年。
        </DocsTip>
      </section>

      {tips[5] && (
        <DocsTip variant={tips[5].variant ?? "neutral"} title="準備要訣">
          {tips[5].content}
        </DocsTip>
      )}

      {/* Prev / Next */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/home-nursing/management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          A、經營管理（全部項目）
        </Link>
        <Link
          href="/school/home-nursing/care-management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          B、照護管理
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
