import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { disabilityWelfareProfile } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "C、行政管理（項目 18–19）｜身心障礙福利機構評鑑",
  description:
    "身心障礙福利機構評鑑「行政管理」2 項評鑑基準詳細說明：法規對服務對象的規定、行政管理落實，含準備要訣。",
  keywords: [
    "身心障礙福利機構行政管理",
    "身心障礙機構法規",
    "身心障礙福利機構評鑑",
    "行政管理評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/disability-welfare/administration" },
  openGraph: {
    title: "C、行政管理（項目 18–19）｜身心障礙福利機構評鑑｜報告汪",
    description: "身心障礙福利機構評鑑行政管理區塊 2 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/disability-welfare/administration",
  },
};

const section = (() => {
  const s = disabilityWelfareProfile.sections.find((s) => s.shortCode === "C");
  if (!s) throw new Error("disabilityWelfareProfile: section C not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  18: {
    content:
      "機構設置標準及服務人數是基本門檻，需確保完全符合法規。建議整理一份「法規合規清單」，列出各項法規要求及機構現況，定期核對並更新。",
    variant: "info",
  },
  19: {
    content:
      "行政管理落實需有完整文件體系。建議建立文件清冊，確保組織章程、各類規定、會議紀錄均妥善保存且易於查閱。評鑑委員可能要求現場查閱特定文件，需確保檔案整理有序。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "C、行政管理（身心障礙福利機構評鑑基準項目 18–19）",
  description:
    "身心障礙福利機構評鑑基準「行政管理」2 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/disability-welfare/administration",
});

export default function DisabilityWelfareAdministrationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0 hover:bg-blue-500/20">
          C、行政管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">行政管理（項目 18–19）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 2 個評鑑項目，檢視機構是否符合法規設置標準，以及行政管理制度是否落實，
          是確保機構合法合規運作的基礎。
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
          href="/school/disability-welfare/appropriate-care"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          B、適性照顧
        </Link>
        <Link
          href="/school/disability-welfare/service-management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          D、服務管理
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
