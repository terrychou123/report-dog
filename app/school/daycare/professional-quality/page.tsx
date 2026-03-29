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
    "115 年度日間照顧機構評鑑「專業照護品質」18 項評鑑基準詳細說明：服務對象評估、照顧計畫、追蹤評值、活動辦理、安全看視、協助服藥、健康管理、防疫機制與品質監測，含準備要訣。",
  keywords: [
    "日照中心照護品質評鑑",
    "日間照顧照顧計畫評鑑",
    "日照服務對象評估",
    "日照協助服藥評鑑",
    "日照健康管理評鑑",
    "臺北市日間照顧評鑑基準",
    "115年度日照評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/daycare/professional-quality" },
  openGraph: {
    title: "貳、專業照護品質（項目 5–22）｜日間照顧評鑑｜報告汪",
    description: "115 年度日間照顧機構評鑑專業照護品質 18 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/daycare/professional-quality",
  },
};

const section = daycareProfile.sections.find((s) => s.shortCode === "專")!;

// 子分類定義（對應 115 年度基準書結構）
const subCategories = [
  { label: "（一）評估與處遇", ids: [5, 6, 7, 8, 9, 10] },
  { label: "（二）健康生活照顧", ids: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] },
  { label: "（三）品質監測", ids: [22] },
];

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  5: {
    content:
      "入案評估需使用標準化工具（如 ADL、IADL、MMSE），評估表需記錄使用工具版本及評分結果。定期重新評估時間需有提醒機制避免逾期，重評若有顯著變化需連結照顧計畫的調整，評鑑委員會抽查評估紀錄是否與照顧計畫前後呼應。",
    variant: "info",
  },
  6: {
    content:
      "照顧計畫（ICP）必須根據評估結果個別訂定，不可使用制式模板套用所有個案。跨專業討論需有會議記錄，家屬同意需有書面簽署。115 年度特別強調計畫需包含個案及家屬意見，反映個案中心原則。",
    variant: "warning",
  },
  7: {
    content:
      "追蹤評值記錄需對應照顧計畫的具體目標，如目標為「增進進食獨立性」需有每日進食協助程度紀錄。若目標未達成，需在評值欄位說明原因及計畫調整方向，而非直接改寫目標來規避問題。",
    variant: "info",
  },
  8: {
    content:
      "服務對象研討需有正式會議記錄（含出席人員、討論議題、結論）。115 年度要求依個案需求辦理，複雜個案建議每季至少一次。若由社工師個別研討替代團體研討，需有清楚的個案討論紀錄佐證。",
    variant: "neutral",
  },
  9: {
    content:
      "督導機制需有書面記錄，包含督導日期、受督員工姓名、督導內容摘要及後續追蹤。評鑑委員關注督導是否有實質討論照護品質議題，而非僅做行政通知。建議建立督導記錄表，與人事考核分開管理。",
    variant: "info",
  },
  10: {
    content:
      "開案、收案、轉介及結案等各類情形均需有書面辦法，且實際執行記錄需能對應到辦法規定的流程。評鑑會抽查特定個案的完整服務歷程紀錄，確認轉介或結案有完整交接及後續追蹤記錄。",
    variant: "warning",
  },
  11: {
    content:
      "自我照顧能力促進需有個別化目標（如「協助穿衣後逐步減少協助」），並有每日執行紀錄記錄個案自理程度。評鑑委員會觀察現場照服員是否習慣性包辦所有照顧動作，缺乏促進自主的意識。",
    variant: "info",
  },
  12: {
    content:
      "藥物需有獨立儲存空間並上鎖，需冷藏藥品需有溫度記錄。服藥紀錄需記錄「給藥時間、藥名、劑量、給藥人員」，拒絕服藥或遺漏情形需特別標記並通知護理師。115 年度強調用藥流程需有標準化 SOP。",
    variant: "warning",
  },
  13: {
    content:
      "團體活動計畫需涵蓋認知、社交、身體活動、休閒等多元類型，並說明適合的失能程度。活動記錄需包含實際參與人數與個案反應，不可只記錄「完成」。活動照片可作為佐證資料，但文字記錄仍是主要依據。",
    variant: "info",
  },
  14: {
    content:
      "安全看視 SOP 需針對高風險個案（如有跌倒史、行動不便者）訂定個別看視頻率。現場觀察是主要評核方式，評鑑委員會觀察服務期間照服員與個案的實際距離與注意程度，以及個案活動區域的物理安全措施。",
    variant: "warning",
  },
  15: {
    content:
      "個人清潔衛生照護（如口腔護理、梳洗）需有執行記錄，記錄頻率依個案狀況設定。評鑑委員會觀察個案實際儀容狀態及照護過程是否尊重個案隱私，建議照護時關門、使用隔簾，並向個案說明照護動作。",
    variant: "neutral",
  },
  16: {
    content:
      "餐點需有每日菜單記錄，熱量及營養均衡應有依據（如委由營養師審核）。若吞嚥困難個案使用增稠劑，需有護理師評估記錄及醫師建議佐證。委外供餐需有廠商合約及食品安全稽核記錄，確保衛生品質。",
    variant: "info",
  },
  17: {
    content:
      "休閒運動設施需有定期使用與維護記錄，器材若有損壞需立即停用並修繕。評鑑委員會觀察設施是否符合高齡使用安全（無尖角、防滑、適當高度），以及個案是否實際使用，而非設施閒置。",
    variant: "neutral",
  },
  18: {
    content:
      "社會參與活動（如外出社區活動）需有完整計畫、個案出席記錄及安全評估。外出前需評估個案身體狀況及風險，若有特殊照護需求需有額外人力安排。115 年度強調活動設計需考量個案的社會角色與興趣，避免流於形式。",
    variant: "info",
  },
  19: {
    content:
      "家屬支持服務需有執行記錄，包含電話諮詢、家屬說明會或個別輔導。建議建立家屬聯繫記錄表，記錄聯繫日期、方式、內容及家屬反應。若辦理家屬教育課程，需有簽到表及課程內容記錄。",
    variant: "neutral",
  },
  20: {
    content:
      "年度健康檢查需有記錄，追蹤異常值是評核重點。護理師需定期量測並記錄生命徵象，高血壓、糖尿病等慢性病個案需有更頻繁的監測記錄。異常數值的後續處置（通知家屬、就醫建議、複測）需完整記錄。",
    variant: "warning",
  },
  21: {
    content:
      "防疫 SOP 需包含個案體溫量測、環境清消頻率、疑似確診處理流程。演練需有書面記錄（含日期、參與人員、演練情境及檢討）。115 年度特別要求防疫物資（口罩、消毒液）需有庫存管理記錄，確保備量充足。",
    variant: "warning",
  },
  22: {
    content:
      "品質指標需定期彙整（建議每季），指標內容應包含跌倒率、感染事件率、個案滿意度等。指標分析需有比較基準（與上季或年度目標比較），若指標惡化需有書面原因分析及改善行動計畫，PDCA 循環是評鑑委員的關注重點。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "貳、專業照護品質（日間照顧機構評鑑基準項目 5–22）",
  description:
    "115 年度日間照顧機構評鑑基準「專業照護品質」18 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/daycare/professional-quality",
});

export default function DaycareProfessionalQualityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* 頁首 */}
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          貳、專業照護品質
        </Badge>
        <h1 className="text-2xl font-bold mb-3">專業照護品質（項目 5–22）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 18 個評鑑項目，是日照評鑑的核心區塊，分為三個子分類：評估與處遇、健康生活照顧、品質監測。
          涵蓋從入案評估、照顧計畫到各類日常照護服務，護理師、社工與照服員的跨團隊合作程度
          直接反映在這個區塊的評鑑結果。
        </p>
      </div>

      {/* 目錄 */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          本頁內容
        </p>
        <div className="space-y-3">
          {subCategories.map((cat) => (
            <div key={cat.label}>
              <p className="text-xs font-medium text-muted-foreground mb-1">{cat.label}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2">
                {section.items
                  .filter((item) => cat.ids.includes(item.id))
                  .map((item) => (
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
            </div>
          ))}
        </div>
      </nav>

      {/* 評鑑項目列表（依子分類呈現） */}
      <div className="space-y-16">
        {subCategories.map((cat) => (
          <div key={cat.label}>
            {/* 子分類標題 */}
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 pb-2 border-b">
              {cat.label}
            </h2>
            <div className="space-y-12">
              {section.items
                .filter((item) => cat.ids.includes(item.id))
                .map((item) => (
                  <section key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400 font-mono">
                        {item.id}
                      </span>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
                      <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2">評鑑標準</p>
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
          </div>
        ))}
      </div>

      {/* 上下頁導航 */}
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
