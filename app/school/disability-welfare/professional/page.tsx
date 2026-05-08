import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { disabilityWelfareProfile, meta as disabilityWelfareMeta } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { DocsTip } from "@/components/docs/docs-tip";
import { SoapCta } from "@/components/school/soap-cta";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { disabilityWelfareTips } from "@/lib/evaluation-tips/disability-welfare";

export const metadata: Metadata = {
  title:
    "三、專業服務（項目 32–49）｜身心障礙福利機構評鑑｜109年度",
  description:
    "109年度身心障礙福利機構評鑑「專業服務」18 項評鑑指標詳細說明：ISP個別化服務計畫、專業團隊、輔具器材、健康管理、膳食服務、社區資源與家庭訪視等，含準備要訣。",
  keywords: [
    "身心障礙福利機構評鑑專業服務",
    "身心障礙機構ISP",
    "身心障礙機構個別化服務計畫",
    "身心障礙機構評鑑專業團隊",
    "身心障礙福利機構評鑑",
    "109年度評鑑準備",
  ],
  alternates: {
    canonical:
      "https://reportwang.com/school/disability-welfare/professional",
  },
  openGraph: {
    title:
      "三、專業服務（項目 32–49）｜身心障礙福利機構評鑑｜報告汪",
    description:
      "109年度身心障礙福利機構評鑑專業服務區塊 18 項指標詳細說明與準備要訣。",
    url: "https://reportwang.com/school/disability-welfare/professional",
  },
};

const section = (() => {
  const s = disabilityWelfareProfile.sections.find(
    (s) => s.shortCode === "專",
  );
  if (!s)
    throw new Error("disabilityWelfareProfile: section 專 not found");
  return s;
})();

const tips = disabilityWelfareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "disability-welfare",
  subpage: "professional",
  section,
  name: "三、專業服務（109年度身心障礙福利機構評鑑指標項目 32–49）",
  description:
    "109年度身心障礙福利機構評鑑指標「專業服務」18 個評鑑項目詳細說明、準備要訣與實用提示。",
});

export default function DisabilityWelfareProfessionalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-0 hover:bg-purple-500/20">
          三、專業服務
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          專業服務（項目 32–49）
        </h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${disabilityWelfareMeta.year} 年度` },
            { label: "主管機關", value: disabilityWelfareMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={disabilityWelfareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 18 個評鑑項目，涵蓋個別化服務/支持計畫（ISP）擬訂與執行、專業團隊服務、
          輔具器材、體能休閒活動、健康管理、膳食服務、用藥安全、傳染病防治、社區資源運用及家庭訪視等面向。
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
                <span className="truncate">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Items */}
      <div className="space-y-12">
        {section.items.map((item) => (
          <section
            key={item.id}
            id={`item-${item.id}`}
            aria-labelledby={`heading-${item.id}`}
            className="scroll-mt-20"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400 font-mono">
                {item.id}
              </span>
              <h2
                id={`heading-${item.id}`}
                className="text-lg font-bold"
              >
                {item.title}
              </h2>
              <Badge variant="outline" className="text-xs">
                {item.indicatorCode}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {item.score}分
              </Badge>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">評鑑標準</p>
              <ol role="list" className="space-y-1.5 list-none pl-0">
                {item.criteria.map((criterion, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-sm text-muted-foreground"
                  >
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-mono text-foreground">
                      {i + 1}
                    </span>
                    {criterion}
                  </li>
                ))}
              </ol>
            </div>

            {item.reviewBasis && (
              <div className="mb-4">
                <p className="text-sm font-semibold mb-1">
                  評鑑實施方式：{item.reviewMethod}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.reviewBasis}
                </p>
              </div>
            )}

            {item.note && (
              <div className="mb-4 rounded-md bg-muted/50 border p-3">
                <p className="text-xs text-muted-foreground whitespace-pre-line">
                  📌 {item.note}
                </p>
              </div>
            )}

            {tips[item.id] && (
              <DocsTip
                variant={tips[item.id].variant ?? "neutral"}
                title="準備要訣"
              >
                {tips[item.id].content}
              </DocsTip>
            )}
            {tips[item.id]?.soap && <SoapCta facility="disability-welfare" />}
          </section>
        ))}
      </div>

      {/* Prev / Next navigation */}
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/disability-welfare/environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          二、環境設施及安全維護
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
