import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { generalNursingHomeProfile } from "@/lib/ai/evaluation-profiles/general-nursing-home";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "環境設施與安全維護（C1–C4）｜一般護理之家評鑑",
  description:
    "一般護理之家評鑑「環境設施與安全維護」4 項評鑑基準詳細說明：災害緊急應變計畫與演練、疏散避難系統與等待救援空間、個別化疏散策略與持續照顧程序、情境式火災風險辨識與實地抽測，含準備要訣。",
  keywords: [
    "一般護理之家評鑑環境設施",
    "護理之家消防安全評鑑",
    "護理之家疏散策略",
    "護理之家情境演練評鑑",
    "115年度一般護理之家評鑑",
    "護理之家評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/general-nursing-home/safety-environment" },
  openGraph: {
    title: "環境設施與安全維護（C1–C4）｜一般護理之家評鑑｜報告汪",
    description: "一般護理之家評鑑環境設施區塊 4 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/general-nursing-home/safety-environment",
  },
};

const section = (() => {
  const s = generalNursingHomeProfile.sections.find((s) => s.shortCode === "C");
  if (!s) throw new Error("generalNursingHomeProfile: section C not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  9: {
    content:
      "災害應變計畫須依機構所在地特性涵蓋火災、地震、颱風等情境，並明確分工。每年2次消防演練（含夜間1次）的執行紀錄需包含演練計畫、出席名冊、演練照片及檢討改善報告。消防設備維護保養應有合格廠商簽署的維護記錄。",
    variant: "info",
  },
  10: {
    content:
      "疏散避難通道須定期實地確認暢通無阻，特別注意倉儲區域及服務出入口是否有雜物堆放。等待救援空間（防火區劃）的位置標示須清晰，緊急照明設備應定期測試並留有測試紀錄。",
    variant: "info",
  },
  11: {
    content:
      "個別化疏散策略須依住民失能程度分類（可步行、需輪椅、需擔架），並指定對應工作人員協助。疏散後持續照顧程序應涵蓋醫療用藥銜接、特殊飲食需求及緊急聯絡機制。工作人員教育訓練紀錄須保存完整。",
    variant: "info",
  },
  12: {
    content:
      "C4 為實地情境演練查核，評鑑委員可能依不同起火位置現場抽測工作人員反應。建議定期進行情境式演練，確保工作人員熟悉各種起火點的疏散路線及住民搬移技巧。情境演練紀錄應包含演練情境描述、執行過程及改善事項。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "C、環境設施與安全維護（一般護理之家評鑑基準項目 9–12）",
  description:
    "一般護理之家評鑑基準「環境設施與安全維護」4 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/general-nursing-home/safety-environment",
});

export default function GeneralNursingHomeSafetyEnvironmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0 hover:bg-blue-500/20">
          C、環境設施與安全維護
        </Badge>
        <h1 className="text-2xl font-bold mb-3">環境設施與安全維護（項目 9–12）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 4 個評鑑項目，涵蓋災害緊急應變計畫的建立與演練、疏散避難系統的實地查核，
          以及針對住民失能程度的個別化疏散策略，特別包含情境式火災風險辨識的實地抽測，是本次評鑑的重點查核區塊。
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
              <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
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
          href="/school/general-nursing-home/professional-care"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          B、專業服務
        </Link>
        <Link
          href="/school/general-nursing-home/special-items"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          D、特別事項
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
