import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { disabilityWelfareProfile } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "A、權益保障（項目 1–8）｜身心障礙福利機構評鑑",
  description:
    "身心障礙福利機構評鑑「權益保障」8 項評鑑基準詳細說明：生存權、健康權、安全權、選擇權、隱私權、參與權、社交權、申訴權，含準備要訣。",
  keywords: [
    "身心障礙福利機構評鑑權益保障",
    "身心障礙機構CRPD",
    "身心障礙機構隱私權",
    "身心障礙機構申訴",
    "身心障礙福利機構評鑑",
    "評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/disability-welfare/rights-protection" },
  openGraph: {
    title: "A、權益保障（項目 1–8）｜身心障礙福利機構評鑑｜報告汪",
    description: "身心障礙福利機構評鑑權益保障區塊 8 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/disability-welfare/rights-protection",
  },
};

const section = (() => {
  const s = disabilityWelfareProfile.sections.find((s) => s.shortCode === "A");
  if (!s) throw new Error("disabilityWelfareProfile: section A not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  1: {
    content:
      "生存權是最基本的保障，機構應有書面紀錄證明服務對象的基本生活需求均獲滿足。建議建立個別化飲食紀錄、醫療照護追蹤表，並確保緊急醫療流程圖張貼於顯眼位置。",
    variant: "info",
  },
  2: {
    content:
      "健康權強調定期健康監測，機構應建立健康檢查追蹤表，記錄每次檢查結果及後續處置。建議與鄰近醫療機構建立合作關係，確保轉介管道暢通。",
    variant: "info",
  },
  3: {
    content:
      "安全保障涵蓋人身安全與財物安全。建議訂定事件通報SOP並張貼於工作站，定期演練通報流程。環境安全巡查應有書面紀錄，發現問題立即改善並記錄。",
    variant: "warning",
  },
  4: {
    content:
      "選擇權要求機構在日常生活各面向提供服務對象選擇機會。建議建立「服務對象偏好紀錄表」，記錄飲食、作息、活動等偏好，並定期更新。評鑑委員可能詢問服務對象本人，務必確保工作人員實際尊重其選擇。",
    variant: "warning",
  },
  5: {
    content:
      "隱私權涵蓋面向最廣（7項標準），需重點準備。個人資料保護需建立完整管理制度；照護操作隱私保護需工作人員實際執行且可示範；拍照及影像授權需有書面同意書存檔。",
    variant: "warning",
  },
  6: {
    content:
      "參與權強調服務對象在機構生活中的主動參與。建議定期舉辦住民（服務對象）會議，會議紀錄需包含出席名單、討論內容及後續追蹤。社區活動參與記錄應系統化保存。",
    variant: "info",
  },
  7: {
    content:
      "人際社交權需注意不得無故限制家屬探視或服務對象通訊。建議訂定探視規定並告知家屬，探視紀錄保存完整。若因特殊情況限制探視，須有書面說明及家屬同意。",
    variant: "info",
  },
  8: {
    content:
      "申訴管道需實際可用，不能只是書面規定。建議在明顯位置張貼申訴流程及主管機關聯繫資訊，並確保服務對象及家屬實際知悉。滿意度調查需定期辦理，結果需有後續改善行動。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "A、權益保障（身心障礙福利機構評鑑基準項目 1–8）",
  description:
    "身心障礙福利機構評鑑基準「權益保障」8 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/disability-welfare/rights-protection",
});

export default function DisabilityWelfareRightsProtectionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0 hover:bg-orange-500/20">
          A、權益保障
        </Badge>
        <h1 className="text-2xl font-bold mb-3">權益保障（項目 1–8）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 8 個評鑑項目，涵蓋身心障礙服務對象的基本權益保障，包含生存權、健康權、安全權、選擇權、
          隱私權、參與權、人際社交權及申訴權，呼應《身心障礙者權利公約》（CRPD）的核心精神。
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
              <span className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-sm font-bold text-orange-600 dark:text-orange-400 font-mono">
                {item.id}
              </span>
              <h2 id={`heading-${item.id}`} className="text-lg font-bold">{item.title}</h2>
              <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
              <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">評鑑標準</p>
              <ol role="list" className="space-y-1.5 list-none pl-0">
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
          href="/school/disability-welfare"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回總覽
        </Link>
        <Link
          href="/school/disability-welfare/appropriate-care"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          B、適性照顧
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
