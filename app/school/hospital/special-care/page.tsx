import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { hospitalProfile } from "@/lib/ai/evaluation-profiles/hospital";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "2.4 特殊照護服務（項目 66–89）｜醫院評鑑小教室",
  description:
    "醫院評鑑「特殊照護服務」24 項評鑑項目詳細說明：血液透析、化療、放射治療、輸血、內視鏡、心導管、精神科、婦產科、器官移植等特殊照護，多數為可免評條文。",
  keywords: [
    "醫院評鑑特殊照護",
    "醫院評鑑血液透析",
    "醫院評鑑化學治療",
    "醫院評鑑可免評",
    "醫院評鑑",
    "區域醫院評鑑",
    "地區醫院評鑑",
    "評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/hospital/special-care" },
  openGraph: {
    title: "2.4 特殊照護服務（項目 66–89）｜醫院評鑑小教室｜報告汪",
    description: "醫院評鑑特殊照護服務區塊 24 項評鑑項目詳細說明與準備要訣。",
    url: "https://reportwang.com/school/hospital/special-care",
  },
};

const section = (() => {
  const s = hospitalProfile.sections.find((s) => s.shortCode === "2.4");
  if (!s) throw new Error("hospitalProfile: section 2.4 not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  66: {
    content:
      "血液透析屬可免評條文，但若醫院有提供透析服務，務必確認水質監測紀錄齊全，並準備透析室設備維護及人員訓練記錄。",
    variant: "info",
  },
  67: {
    content:
      "化療調配需在生物安全操作台進行，評鑑時委員重點查核調配環境是否符合規定，以及廢棄物處理的合規性。此為可免評條文。",
    variant: "info",
  },
  68: {
    content:
      "放射治療作業屬可免評，若有提供服務，設備校正紀錄與治療計畫驗證文件是查核重點，確保輻射防護符合原能會規定。",
    variant: "info",
  },
  69: {
    content:
      "輸血作業安全為重點條文，務必確認血型確認與交叉試驗的雙重查核流程落實，輸血不良反應通報案例需有完整處理紀錄。",
    variant: "warning",
  },
  70: {
    content:
      "內視鏡設備的清洗消毒流程是評鑑重點，即使為可免評條文，若有提供服務，洗消紀錄、藥液濃度監測及人員訓練記錄均須備齊。",
    variant: "info",
  },
  71: {
    content:
      "心導管室為可免評條文。提供心導管服務的醫院須確認術前評估表、手術安全查核及緊急應變設備（如電擊器）的完備性。",
    variant: "info",
  },
  74: {
    content:
      "精神科照護為可免評，但若有精神科病房，強制隔離約束的書面紀錄與法定程序格外重要，且病人申訴管道需公告周知。",
    variant: "warning",
  },
  75: {
    content:
      "婦產科照護為可免評。重點在生產安全查核清單的確實使用，以及新生兒安全防護措施（如防嬰兒失竊手環）是否完備。",
    variant: "info",
  },
  85: {
    content:
      "器官移植照護為可免評條文。若有執行移植手術，需確認符合人體器官移植條例規定，並備有跨科整合照護的完整紀錄。",
    variant: "info",
  },
  89: {
    content:
      "長期照護銜接服務為一般條文，需評估。建議建立出院準備服務啟動的標準流程，確認高風險病人的社工介入紀錄完整。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "2.4 特殊照護服務（醫院評鑑基準項目 66–89）",
  description:
    "醫院評鑑基準「特殊照護服務」24 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/hospital/special-care",
});

export default function HospitalSpecialCarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-0 hover:bg-cyan-500/20">
          2.4 特殊照護服務
        </Badge>
        <h1 className="text-2xl font-bold mb-3">特殊照護服務（項目 66–89）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本章共 24 個評鑑項目，涵蓋血液透析、化療、放射治療、輸血、內視鏡、心導管、精神科、婦產科、器官移植等特殊照護服務，多數為可免評條文。
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
              <span className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-sm font-bold text-cyan-600 dark:text-cyan-400 font-mono">
                {item.id}
              </span>
              <span className="text-xs text-muted-foreground font-mono">{item.articleNumber}</span>
              <h2 id={`heading-${item.id}`} className="text-lg font-bold">{item.title}</h2>
              <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
              <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
              {item.category === "必要" && (
                <Badge className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 border-0">必要</Badge>
              )}
              {item.category === "重點" && (
                <Badge className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0">重點</Badge>
              )}
              {item.category === "試評" && (
                <Badge variant="outline" className="text-xs">試評</Badge>
              )}
              {item.category === "可免評" && (
                <Badge variant="secondary" className="text-xs">可免評</Badge>
              )}
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
          href="/school/hospital/care-execution"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          2.3 照護執行
        </Link>
        <Link
          href="/school/hospital/medication-safety"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          2.5 用藥安全
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
