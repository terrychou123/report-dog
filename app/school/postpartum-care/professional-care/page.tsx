import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { babycareProfile } from "@/lib/ai/evaluation-profiles/babycare";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "專業服務與生活照顧（B1.1–B1.8）｜產後護理之家評鑑",
  description:
    "產後護理之家評鑑「專業服務與生活照顧」8 項評鑑基準詳細說明：產婦照護、嬰兒照護、親子關係促進、團體衛教課程、出住院評估、緊急狀況處理、哺乳及餵食計畫、母乳收集與貯存，含準備要訣。",
  keywords: [
    "產後護理之家評鑑專業服務",
    "月子中心嬰兒照護評鑑",
    "產後護理之家母乳哺育評鑑",
    "月子中心緊急狀況處理",
    "115年度產後護理之家評鑑",
    "月子中心評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/postpartum-care/professional-care" },
  openGraph: {
    title: "專業服務與生活照顧（B1.1–B1.8）｜產後護理之家評鑑｜報告汪",
    description: "產後護理之家評鑑專業服務區塊 8 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/postpartum-care/professional-care",
  },
};

const section = (() => {
  const s = babycareProfile.sections.find((s) => s.shortCode === "B");
  if (!s) throw new Error("babycareProfile: section B not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  6: {
    content:
      "產婦入住護理評估應使用標準化評估表，確保每項評估內容（生命徵象、傷口、子宮復原、乳房、情緒）均有記錄。產後憂鬱症篩查建議使用愛丁堡產後憂鬱量表（EPDS），入住時及出院前各評估一次，分數異常者需有追蹤記錄。",
    variant: "info",
  },
  7: {
    content:
      "嬰兒體重監測是評鑑委員重點查核項目。建議每日定時測量體重，使用標準化體重記錄表，並標注體重下降百分比。黃疸評估紀錄應包含評估日期、使用方法（經皮黃疸儀/目視）及數值，需照光治療者應記錄照光時間及效果。",
    variant: "warning",
  },
  8: {
    content:
      "親子關係促進的記錄重點在於「有沒有做」及「產婦/家屬學會了嗎」。建議使用衛教記錄單，讓產婦簽名確認已接受指導，並記錄回覆示教結果。家屬參與記錄有助於展現機構促進家庭支持的努力。",
    variant: "info",
  },
  9: {
    content:
      "團體衛教課程需要有課程計畫書（含主題、師資、時間、地點）及出席簽到表。如辦理嬰兒按摩、母乳哺育等課程，建議保留照片並附說明。評鑑時可能詢問課程內容，負責人員應熟悉課程細節。",
    variant: "info",
  },
  10: {
    content:
      "出院評估記錄是最容易被忽略的部分。建議使用標準化出院評估表，確保產婦及嬰兒狀況均有評估記錄，且出院指導有產婦/家屬簽名。出院後電話追蹤建議於出院後 24～48 小時進行，並記錄追蹤內容及產婦回應。",
    variant: "info",
  },
  11: {
    content:
      "緊急狀況 SOP 的熟悉度是評鑑重點，委員可能實地抽測護理人員。建議每季辦理一次緊急處理演練，並記錄演練情境、參與人員及檢討結果。與鄰近醫院的合作協議應備妥合約正本，轉介紀錄完整保存。",
    variant: "warning",
  },
  12: {
    content:
      "個別化哺乳計畫應在入住評估後即制訂，並根據產婦意願（母乳/配方奶/混合）及身體狀況調整。純母乳哺育率是品質指標之一，建議每月統計並記錄推廣措施。評鑑時提供近 3～6 個月的統計趨勢圖，顯示持續改善的努力。",
    variant: "info",
  },
  13: {
    content:
      "母乳貯存溫度的定期監測記錄非常重要，建議每日記錄冰箱/冷凍庫溫度，異常時有記錄及處理措施。母乳標示的完整性（姓名、日期、時間）需現場稽核，確認每袋母乳均有清楚標示。母乳解凍及使用的衛教單張應統一製作並發給產婦。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "B、專業服務與生活照顧（產後護理之家評鑑基準項目 6–13）",
  description:
    "產後護理之家評鑑基準「專業服務與生活照顧」8 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/postpartum-care/professional-care",
});

export default function PostpartumCareProfessionalCarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          B、專業服務與生活照顧
        </Badge>
        <h1 className="text-2xl font-bold mb-3">專業服務與生活照顧（項目 6–13）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 8 個評鑑項目，是產後護理之家評鑑的核心，涵蓋產婦照護、嬰兒照護、親子關係促進、
          團體衛教課程、出住院評估、緊急狀況處理、哺乳及餵食計畫，以及母乳收集與貯存管理，
          展現機構專業照護能力的重要指標。
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
          <section key={item.id} id={`item-${item.id}`} aria-labelledby={`heading-${item.id}`} className="scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400 font-mono">
                {item.id}
              </span>
              <h2 id={`heading-${item.id}`} className="text-lg font-bold">{item.title}</h2>
              <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
              <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">評鑑標準</p>
              <ul className="space-y-1.5 list-none pl-0">
                {item.criteria.map((criterion, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-mono text-foreground">
                      {i + 1}
                    </span>
                    {criterion}
                  </li>
                ))}
              </ul>
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
          href="/school/postpartum-care/administration"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          A、行政組織
        </Link>
        <Link
          href="/school/postpartum-care/safety-environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          C、環境設施
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
