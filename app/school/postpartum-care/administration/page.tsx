import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { babycareProfile, meta as babycareMeta } from "@/lib/ai/evaluation-profiles/babycare";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { babycareTips } from "@/lib/evaluation-tips/babycare";

export const metadata: Metadata = {
  title: "行政組織、經營管理與服務對象權益保障（A1.1–A2.3）｜產後護理之家評鑑",
  description:
    "產後護理之家評鑑「行政組織、經營管理與服務對象權益保障」5 項評鑑基準詳細說明：專任人員配置（護產人員1.4倍、NRP/BLS）、教育訓練（母乳哺育8小時、機構外研習8小時）、母嬰安全感染管制（流感疫苗80%）、意外事件預防處理（7類）、品質管理監測（6項指標），含準備要訣。",
  keywords: [
    "產後護理之家評鑑行政組織",
    "月子中心人員配置評鑑",
    "產後護理之家NRP訓練",
    "產後護理之家感染管制",
    "115年度產後護理之家評鑑",
    "月子中心評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/postpartum-care/administration" },
  openGraph: {
    title: "行政組織與服務對象權益保障（A1.1–A2.3）｜產後護理之家評鑑｜報告汪",
    description: "產後護理之家評鑑行政組織區塊 5 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/postpartum-care/administration",
  },
};

const section = (() => {
  const s = babycareProfile.sections.find((s) => s.shortCode === "A");
  if (!s) throw new Error("babycareProfile: section A not found");
  return s;
})();

const tips = babycareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "postpartum-care",
  subpage: "administration",
  section,
  name: "A、行政組織、經營管理與服務對象權益保障（產後護理之家評鑑基準項目 1–5）",
  description:
    "產後護理之家評鑑基準「行政組織、經營管理與服務對象權益保障」5 個評鑑項目詳細說明、準備要訣與實用提示。",
});

export default function PostpartumCareAdministrationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0 hover:bg-orange-500/20">
          A、行政組織、經營管理與服務對象權益保障
        </Badge>
        <h1 className="text-2xl font-bold mb-3">行政組織、經營管理與服務對象權益保障（項目 1–5）</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${babycareMeta.year} 年度` },
            { label: "主管機關", value: babycareMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={babycareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 5 個評鑑項目，涵蓋產後護理之家的行政管理核心，包含護產人員配置比例與急救資格、
          教育訓練規定、母嬰安全與感染管制、意外事件預防處理，以及品質管理機制與指標監測，
          是評鑑委員審核機構管理制度的重要依據。
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
              <ul className="space-y-1.5 list-none pl-0">
                {item.criteria.map((criterion, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-mono text-foreground">
                      {i + 1}
                    </span>
                    {criterion}
                  </li>
                ))}
              </ul>
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
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/postpartum-care"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回總覽
        </Link>
        <Link
          href="/school/postpartum-care/professional-care"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          B、專業服務
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
