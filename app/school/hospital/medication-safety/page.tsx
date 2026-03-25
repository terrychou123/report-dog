import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { hospitalProfile } from "@/lib/ai/evaluation-profiles/hospital";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "2.5 用藥安全（項目 90–98）｜醫院評鑑小教室",
  description:
    "醫院評鑑「用藥安全」9 項評鑑項目詳細說明：藥品管理制度、處方開立、藥品調劑、給藥安全、高警訊藥品管理、藥品不良反應、抗生素管理及管制藥品管理。",
  keywords: [
    "醫院評鑑用藥安全",
    "醫院評鑑高警訊藥品",
    "醫院評鑑管制藥品",
    "醫院評鑑抗生素管理",
    "醫院評鑑",
    "區域醫院評鑑",
    "地區醫院評鑑",
    "評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/hospital/medication-safety" },
  openGraph: {
    title: "2.5 用藥安全（項目 90–98）｜醫院評鑑小教室｜報告汪",
    description: "醫院評鑑用藥安全區塊 9 項評鑑項目詳細說明與準備要訣。",
    url: "https://reportwang.com/school/hospital/medication-safety",
  },
};

const section = (() => {
  const s = hospitalProfile.sections.find((s) => s.shortCode === "2.5");
  if (!s) throw new Error("hospitalProfile: section 2.5 not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  90: {
    content:
      "藥品管理制度為重點條文。評鑑委員常實地查核儲藥區溫濕度監測紀錄及有效期限管理。建議定期執行藥品盤點，並保留紀錄備查。",
    variant: "info",
  },
  91: {
    content:
      "處方開立管理重點在電子簽核流程的完整性。若有仿單外使用案例，務必確認有醫師說明紀錄及病人同意書存檔。",
    variant: "info",
  },
  92: {
    content:
      "靜脈注射藥品調配環境是實地查核重點。確認層流操作台定期維護校正，並有調配紀錄可供查核。",
    variant: "warning",
  },
  93: {
    content:
      "給藥安全為必要條文，評鑑委員可能實地觀察或訪談護理人員。確保「五對」查核（病人、藥品、劑量、途徑、時間）已成為日常作業習慣，且有書面紀錄。",
    variant: "warning",
  },
  94: {
    content:
      "高警訊藥品管理為必要條文。建議製作高警訊藥品清單並張貼於儲藥區，確認濃縮電解質（如 KCl 注射液）有特別標示與獨立儲存，雙重查核簽名紀錄完整。",
    variant: "warning",
  },
  95: {
    content:
      "藥品不良反應監測為重點條文。確認院內有通報系統（如連結全國藥物不良反應通報系統），嚴重不良反應已依規定通報，且資訊記錄於病歷中有過敏警示。",
    variant: "info",
  },
  96: {
    content:
      "抗生素合理使用管理為重點條文。須確認抗生素管理小組定期開會並有紀錄，限制性抗生素有審核流程，抗藥性監測結果有定期分析報告。",
    variant: "info",
  },
  97: {
    content:
      "管制藥品管理為必要條文，查核嚴格。清點紀錄需逐班完整，浪費量需雙人簽名，儲存設備（如雙重上鎖）需符合法規規定，任何短缺都必須立即通報處理。",
    variant: "warning",
  },
  98: {
    content:
      "出院藥物衛教為重點條文。建議使用標準化衛教單張，衛教後以回覆示教（teach-back）方式確認病人理解，並留存衛教簽名紀錄。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "2.5 用藥安全（醫院評鑑基準項目 90–98）",
  description:
    "醫院評鑑基準「用藥安全」9 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/hospital/medication-safety",
});

export default function HospitalMedicationSafetyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-violet-500/10 text-violet-600 dark:text-violet-400 border-0 hover:bg-violet-500/20">
          2.5 用藥安全
        </Badge>
        <h1 className="text-2xl font-bold mb-3">用藥安全（項目 90–98）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本章共 9 個評鑑項目，涵蓋藥品管理制度、處方開立、藥品調劑、給藥安全、高警訊藥品管理、藥品不良反應、抗生素管理及管制藥品管理。
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
              <span className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-sm font-bold text-violet-600 dark:text-violet-400 font-mono">
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
          href="/school/hospital/special-care"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          2.4 特殊照護
        </Link>
        <Link
          href="/school/hospital/anesthesia-surgery"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          2.6 麻醉手術
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
