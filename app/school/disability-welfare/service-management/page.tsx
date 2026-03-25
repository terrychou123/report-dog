import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { disabilityWelfareProfile } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "D、服務管理（項目 20–23）｜身心障礙福利機構評鑑",
  description:
    "身心障礙福利機構評鑑「服務管理」4 項評鑑基準詳細說明：機構設施安全、工作手冊、風險管理、服務使用者權益維護，含準備要訣。",
  keywords: [
    "身心障礙福利機構服務管理",
    "身心障礙機構設施安全",
    "身心障礙機構風險管理",
    "身心障礙福利機構評鑑",
    "服務管理評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/disability-welfare/service-management" },
  openGraph: {
    title: "D、服務管理（項目 20–23）｜身心障礙福利機構評鑑｜報告汪",
    description: "身心障礙福利機構評鑑服務管理區塊 4 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/disability-welfare/service-management",
  },
};

const section = (() => {
  const s = disabilityWelfareProfile.sections.find((s) => s.shortCode === "D");
  if (!s) throw new Error("disabilityWelfareProfile: section D not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  20: {
    content:
      "設施安全涵蓋建築、消防、無障礙等多個面向，建議準備各類合格證明文件的整理夾。消防演練紀錄需包含日期、參與人員、演練流程及檢討記錄。評鑑委員通常會實地巡視，確保疏散通道無堆積物。",
    variant: "warning",
  },
  21: {
    content:
      "工作手冊需與實際業務相符，且確保工作人員知悉內容。建議定期（如每年）辦理工作手冊宣導，並請工作人員簽名確認已閱讀。手冊更新時需記錄版本及更新日期。",
    variant: "info",
  },
  22: {
    content:
      "風險管理計畫需涵蓋各類可能發生的風險，並訂有預防措施及事後處理流程。建議建立「風險事件紀錄表」，每次事件後完整記錄並進行根因分析，改善措施需有追蹤。",
    variant: "info",
  },
  23: {
    content:
      "服務使用者權益維護需落實到工作人員的日常行為。建議安排年度教育訓練並有出席紀錄；自我評估需有書面報告，顯示問題點及改善計畫。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "D、服務管理（身心障礙福利機構評鑑基準項目 20–23）",
  description:
    "身心障礙福利機構評鑑基準「服務管理」4 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/disability-welfare/service-management",
});

export default function DisabilityWelfareServiceManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 border-0 hover:bg-teal-500/20">
          D、服務管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">服務管理（項目 20–23）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 4 個評鑑項目，涵蓋機構設施安全、服務流程管理及風險預防，
          是確保服務對象獲得安全、有品質服務的重要基礎。
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
          href="/school/disability-welfare/administration"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          C、行政管理
        </Link>
        <Link
          href="/school/disability-welfare/staff-management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          E、員工管理
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
