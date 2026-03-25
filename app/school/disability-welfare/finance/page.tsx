import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { disabilityWelfareProfile } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "F、會計與財務管理（項目 30–35）｜身心障礙福利機構評鑑",
  description:
    "身心障礙福利機構評鑑「會計與財務管理」6 項評鑑基準詳細說明：會計帳冊、財務管理要件、現金收支、固定資產、物資管理、成本管理，含準備要訣。",
  keywords: [
    "身心障礙福利機構財務管理",
    "身心障礙機構會計",
    "身心障礙機構成本管理",
    "身心障礙福利機構評鑑",
    "財務管理評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/disability-welfare/finance" },
  openGraph: {
    title: "F、會計與財務管理（項目 30–35）｜身心障礙福利機構評鑑｜報告汪",
    description: "身心障礙福利機構評鑑會計與財務管理區塊 6 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/disability-welfare/finance",
  },
};

const section = (() => {
  const s = disabilityWelfareProfile.sections.find((s) => s.shortCode === "F");
  if (!s) throw new Error("disabilityWelfareProfile: section F not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  30: {
    content:
      "會計帳冊需依一般公認會計原則（GAAP）或非營利組織會計準則設置。建議聘請具資格之會計師或定期諮詢，確保帳冊正確性及合規性。",
    variant: "info",
  },
  31: {
    content:
      "財務管理規定需書面化，包含各級授權核決金額限制。財務報告揭露方式需符合主管機關規定，建議確認機構適用之公開揭露義務。",
    variant: "info",
  },
  32: {
    content:
      "現金管理需有嚴格的內控機制，建議收付分離、定期核對。若有服務對象個人金錢代管，需另立專帳，不得與機構帳戶混用。",
    variant: "warning",
  },
  33: {
    content:
      "固定資產清冊應包含資產名稱、購置日期、購置金額、耐用年限及現值。定期盤點（建議每年至少一次）並有盤點紀錄，資產若有損失或報廢需依規定辦理核銷。",
    variant: "info",
  },
  34: {
    content:
      "物資管理需建立完整的進出存紀錄，特別是食材、藥品等重要物資。定期盤點結果需與帳面記錄核對，差異需有說明及處理措施。",
    variant: "info",
  },
  35: {
    content:
      "成本分析有助於了解機構財務健康狀況及服務定價合理性。建議至少每半年進行一次成本分析，分析結果提報董事會或主管人員，作為決策參考。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "F、會計與財務管理（身心障礙福利機構評鑑基準項目 30–35）",
  description:
    "身心障礙福利機構評鑑基準「會計與財務管理」6 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/disability-welfare/finance",
});

export default function DisabilityWelfareFinancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-0 hover:bg-purple-500/20">
          F、會計與財務管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">會計與財務管理（項目 30–35）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 6 個評鑑項目，檢視機構財務管理制度的健全性，包含會計帳冊設置、財務管理規定、
          現金控制、資產與物資管理及成本分析，確保機構財務透明、合規。
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
              <span className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400 font-mono">
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
          href="/school/disability-welfare/staff-management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          E、員工管理
        </Link>
        <Link
          href="/school/disability-welfare"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          返回總覽
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
