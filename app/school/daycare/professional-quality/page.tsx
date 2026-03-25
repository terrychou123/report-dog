import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { daycareProfile } from "@/lib/ai/evaluation-profiles/daycare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "貳、專業照護品質（項目 5–22）｜日間照顧機構評鑑",
  description:
    "日間照顧機構評鑑「專業照護品質」18 項評鑑基準詳細說明：入案評估、個別照顧計畫、日常照顧、活動設計、健康管理、護理照護、用藥管理、飲食照護、復健、失智照護、家屬溝通等，含準備要訣。",
  keywords: [
    "日照中心照護品質評鑑",
    "日間照顧個別照顧計畫",
    "日照失智照護評鑑",
    "日照用藥管理評鑑",
    "臺北市日間照顧評鑑基準",
    "113年度日照評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/daycare/professional-quality" },
  openGraph: {
    title: "貳、專業照護品質（項目 5–22）｜日間照顧評鑑｜報告汪",
    description: "日間照顧機構評鑑專業照護品質 18 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/daycare/professional-quality",
  },
};

const section = daycareProfile.sections.find((s) => s.shortCode === "專")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  5: {
    content:
      "評估工具要有版本記錄（如 Barthel Index、MMSE），建議統一使用標準化版本並在紀錄中標注工具名稱。定期重新評估的時間點建議設定提醒機制，避免逾期未評。",
    variant: "info",
  },
  6: {
    content:
      "個別照顧計畫（ICP）必須反映評估結果，不能使用制式模板直接套用。跨專業討論需有會議記錄，家屬同意須有書面簽署，而非只是口頭告知。",
    variant: "warning",
  },
  7: {
    content:
      "計畫執行紀錄需能對應到 ICP 的具體目標，例如「增進獨立進食能力」需有每日進食紀錄佐證。評值結果若未達目標，需在紀錄中說明調整方向。",
    variant: "info",
  },
  8: {
    content:
      "日常照顧紀錄要涵蓋情緒狀態與特殊事件，不可只記錄「正常」或「無異狀」。評鑑委員關注工作人員與個案互動的尊重態度，現場觀察是主要審查方式。",
    variant: "neutral",
  },
  9: {
    content:
      "活動計畫需包含認知、社交、休閒、身體活動等多元類型，且說明各活動適合的失能程度或認知狀況。活動紀錄要記錄參與人數與個案反應，不能只記錄「完成」。",
    variant: "info",
  },
  10: {
    content:
      "生命徵象記錄頻率「至少每月」，但慢性病個案（如高血壓、糖尿病）建議更頻繁量測並記錄。異常值的後續追蹤（通報家屬、就醫、複測）需有完整書面記錄。",
    variant: "warning",
  },
  11: {
    content:
      "護理師人力配置需符合日間照顧服務設置標準規定（依核定人數計算）。護理處置紀錄需包含評估、執行及評值三個步驟，不可只記錄執行項目。",
    variant: "warning",
  },
  12: {
    content:
      "藥物儲存需注意光線、溫度、濕度，需冷藏藥品需有冰箱溫度記錄。用藥錯誤通報機制需包含事件描述、處置措施及改善行動，建立不責難的通報文化有助於提升紀錄完整性。",
    variant: "warning",
  },
  13: {
    content:
      "吞嚥困難個案的增稠劑使用需有護理師評估及醫師建議的書面記錄。供餐環境衛生應有定期清潔紀錄，若委外餐廳供餐需有委外契約及食品安全稽核記錄。",
    variant: "info",
  },
  14: {
    content:
      "若有需求個案但無法轉介（如等待名額），需有書面說明替代處置方式。復健執行記錄需由執行人員（治療師或照服員）親自簽名，不可由他人代填。",
    variant: "neutral",
  },
  15: {
    content:
      "失智友善環境設計要點：出入口有防走失措施（如延遲開門警報）、方向標示清楚（大字、圖示）、照片名牌輔助辨識。BPSD 評估記錄應包含觸發因素分析及非藥物介入方式。",
    variant: "info",
  },
  16: {
    content:
      "家屬溝通記錄要包含電話聯絡紀錄，不限於書面會議。若家屬無法出席家屬會議，需有電話或書面溝通替代記錄。家屬反映意見不論大小都需有書面處理回覆。",
    variant: "neutral",
  },
  17: {
    content:
      "緊急事件 SOP 要特別針對日照常見狀況設計：跌倒（量測生命徵象、通知家屬、就醫評估）、噎食（哈姆立克法步驟）、急症（叫救護車流程）。演練需有簽到記錄及事後檢討。",
    variant: "warning",
  },
  18: {
    content:
      "結案摘要需包含服務期間摘要、轉介原因、後續安置建議。轉介其他服務（如住宿型機構）需有書面轉介單及後續追蹤電話記錄，確認個案已妥善銜接。",
    variant: "neutral",
  },
  19: {
    content:
      "志工服務紀錄需能對應到志工訓練內容，未受訓的志工不可從事涉及個案照護的服務。訓練記錄需包含課程名稱、時數、簽到表及測驗或心得。",
    variant: "info",
  },
  20: {
    content:
      "跨專業個案研討會建議每季至少召開一次，並有明確議題（非只是例行通報）。若機構規模小、跨專業人員兼任，需說明跨專業溝通的替代機制（如定期個別會議）。",
    variant: "neutral",
  },
  21: {
    content:
      "照護紀錄最常見的缺失是「事後補登」，紀錄時間與實際服務時間不符。建議建立當日完成紀錄的工作慣例，必要時可使用行動裝置即時記錄。",
    variant: "warning",
  },
  22: {
    content:
      "品質改善需有 PDCA 循環：問題辨識（P）、改善執行（D）、效果查核（C）、持續改進（A）。只有計畫而無追蹤記錄是評鑑最常見的扣分原因。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "貳、專業照護品質（日間照顧機構評鑑基準項目 5–22）",
  description:
    "日間照顧機構評鑑基準「專業照護品質」18 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/daycare/professional-quality",
});

export default function DaycareProfessionalQualityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          貳、專業照護品質
        </Badge>
        <h1 className="text-2xl font-bold mb-3">專業照護品質（項目 5–22）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 18 個評鑑項目，是日照評鑑的核心區塊，涵蓋從入案評估、個別照顧計畫到各類專業照護服務。
          護理師、社工、照服員及治療師的跨團隊合作程度，
          直接反映在這個區塊的評鑑結果。
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
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Items */}
      <div className="space-y-12">
        {section.items.map((item) => (
          <section key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400 font-mono">
                {item.id}
              </span>
              <h2 className="text-lg font-bold">{item.title}</h2>
              <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
              <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">評鑑標準</h3>
              <ol className="space-y-1.5 list-none pl-0">
                {item.criteria.map((criterion, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-mono text-foreground">
                      {i + 1}
                    </span>
                    {criterion}
                  </li>
                ))}
              </ol>
            </div>

            {tips[item.id] && (
              <DocsTip variant={tips[item.id].variant ?? "neutral"} title="準備要訣">
                {tips[item.id].content}
              </DocsTip>
            )}
          </section>
        ))}
      </div>

      {/* Prev / Next navigation */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/daycare/client-rights"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          壹、個案權益保障
        </Link>
        <Link
          href="/school/daycare/management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          參、經營管理效能
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
