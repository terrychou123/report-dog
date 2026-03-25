import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { disabilityWelfareProfile } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "E、員工管理與福利（項目 24–29）｜身心障礙福利機構評鑑",
  description:
    "身心障礙福利機構評鑑「員工管理與福利」6 項評鑑基準詳細說明：員工支持方案、職業安全、員工權利、教育訓練、健康檢查、激勵考核，含準備要訣。",
  keywords: [
    "身心障礙福利機構員工管理",
    "身心障礙機構教育訓練",
    "身心障礙機構勞動權益",
    "身心障礙福利機構評鑑",
    "員工管理評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/disability-welfare/staff-management" },
  openGraph: {
    title: "E、員工管理與福利（項目 24–29）｜身心障礙福利機構評鑑｜報告汪",
    description: "身心障礙福利機構評鑑員工管理與福利區塊 6 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/disability-welfare/staff-management",
  },
};

const section = (() => {
  const s = disabilityWelfareProfile.sections.find((s) => s.shortCode === "E");
  if (!s) throw new Error("disabilityWelfareProfile: section E not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  24: {
    content:
      "員工支持方案可結合外部 EAP 服務提供者，確保有書面合約及使用紀錄。若規模較小，可從每月督導會議、壓力疏導活動等著手，重要的是有執行紀錄。",
    variant: "info",
  },
  25: {
    content:
      "職業安全訓練需依工作性質安排，如照顧工作人員應接受移位技巧、感染控制等訓練。建議建立職安訓練年度計畫表，確保每位工作人員均完成必要訓練。",
    variant: "info",
  },
  26: {
    content:
      "勞動條件合規是基本要求。建議定期自我檢核薪資、工時、休假等記錄是否符合勞基法，可使用勞動部提供的自我檢查表工具進行評估。",
    variant: "warning",
  },
  27: {
    content:
      "教育訓練記錄需系統化管理。建議建立工作人員訓練護照或紀錄卡，逐人記錄訓練課程、時數及完成日期。年度訓練計畫需在年初訂定，並定期追蹤執行情形。",
    variant: "info",
  },
  28: {
    content:
      "健康檢查紀錄需妥善保存，並依個資法規定維護隱私。有特殊健康狀況需要工作調整者，應有書面記錄並依法辦理，不得歧視。",
    variant: "info",
  },
  29: {
    content:
      "績效考核制度需書面化且實際執行。考核結果需與薪資晉升有連結，並讓工作人員了解考核標準。建議保存每次考核紀錄，作為評鑑佐證。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "E、員工管理與福利（身心障礙福利機構評鑑基準項目 24–29）",
  description:
    "身心障礙福利機構評鑑基準「員工管理與福利」6 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/disability-welfare/staff-management",
});

export default function DisabilityWelfareStaffManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-0 hover:bg-indigo-500/20">
          E、員工管理與福利
        </Badge>
        <h1 className="text-2xl font-bold mb-3">員工管理與福利（項目 24–29）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 6 個評鑑項目，強調機構對工作人員的支持與管理，包含員工福利、職業安全、勞動權益、
          教育訓練及績效管理，是維持服務品質的重要基礎。
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
              <span className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-sm font-bold text-indigo-600 dark:text-indigo-400 font-mono">
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
          href="/school/disability-welfare/service-management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          D、服務管理
        </Link>
        <Link
          href="/school/disability-welfare/finance"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          F、會計與財務
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
