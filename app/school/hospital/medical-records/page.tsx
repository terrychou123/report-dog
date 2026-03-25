import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { hospitalProfile } from "@/lib/ai/evaluation-profiles/hospital";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "1.4 病歷、資訊與溝通管理（項目 23–26）｜醫院評鑑小教室",
  description:
    "醫院評鑑「病歷、資訊與溝通管理」4 項評鑑項目詳細說明：病歷書寫、資訊安全、醫療資訊系統及內外部溝通機制，確保醫療資訊正確流通，含準備要訣。",
  keywords: [
    "醫院評鑑病歷管理",
    "醫院資訊安全評鑑",
    "醫院電子病歷",
    "醫院溝通管理",
    "醫院評鑑",
    "區域醫院評鑑",
    "地區醫院評鑑",
    "評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/hospital/medical-records" },
  openGraph: {
    title: "1.4 病歷、資訊與溝通管理（項目 23–26）｜醫院評鑑小教室｜報告汪",
    description: "醫院評鑑「病歷、資訊與溝通管理」4 項評鑑項目詳細說明與準備要訣。",
    url: "https://reportwang.com/school/hospital/medical-records",
  },
};

const section = (() => {
  const s = hospitalProfile.sections.find((s) => s.shortCode === "1.4");
  if (!s) throw new Error("hospitalProfile: section 1.4 not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  23: {
    content:
      "病歷書寫管理是「必要」項目，委員通常會抽查實際病歷。常見缺失包括：醫療人員未及時書寫、簽名不完整、電子病歷中存在大量複製貼上（Copy-Paste）導致內容不符實況。建議事前進行病歷品質稽核，特別關注手術紀錄、出院摘要及知情同意書的完整性。電子病歷若採用，需確認符合電子病歷相關法規（如電子簽章）。",
    variant: "warning",
  },
  24: {
    content:
      "資訊安全管理是「重點」項目，近年因資安事件頻傳，委員查核更為嚴格。重點準備：(1) 資安政策文件（含使用者帳號管理、密碼規定）；(2) 最近一次資料備份還原測試紀錄；(3) 系統存取權限審查紀錄（確認離職人員帳號已停用）；(4) 若曾發生資安事件，需有完整的通報及改善紀錄。",
    variant: "warning",
  },
  25: {
    content:
      "醫療資訊系統穩定性是日常運作的基礎。建議準備：(1) 系統維護及升級計畫（含年度維護合約）；(2) 近一年系統故障紀錄及緊急應變執行狀況（如紙本備援機制）；(3) 系統資料完整性定期查核紀錄（如帳務稽核、病歷完整性統計）。委員通常關注系統故障時業務是否能持續不中斷。",
    variant: "info",
  },
  26: {
    content:
      "溝通機制項目需呈現「有效溝通」而非僅有會議召開。重點備妥：院務會議、部門主管會議及各委員會的近一年會議紀錄，並能呈現決議追蹤機制。對病人及家屬的資訊提供（看診時間、費用、醫療說明等）需有多種管道（書面、網路、現場）的具體說明。緊急事件對外溝通授權規定（如媒體發言授權）需明確書面化。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "1.4 病歷、資訊與溝通管理（醫院評鑑項目 23–26）",
  description:
    "醫院評鑑「病歷、資訊與溝通管理」4 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/hospital/medical-records",
});

export default function HospitalMedicalRecordsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 border-0 hover:bg-teal-500/20">
          1.4 病歷、資訊與溝通管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">病歷、資訊與溝通管理（項目 23–26）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本章共 4 個評鑑項目，涵蓋病歷書寫、資訊安全、醫療資訊系統及內外部溝通機制，確保醫療資訊正確流通。
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
              <span className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center text-sm font-bold text-teal-600 dark:text-teal-400 font-mono">
                {item.id}
              </span>
              <h2 id={`heading-${item.id}`} className="text-lg font-bold">{item.title}</h2>
              <span className="text-xs text-muted-foreground font-mono">{item.articleNumber}</span>
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
          href="/school/hospital/human-resources"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          1.3 人力資源
        </Link>
        <Link
          href="/school/hospital/safety-environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          1.5 安全環境
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
