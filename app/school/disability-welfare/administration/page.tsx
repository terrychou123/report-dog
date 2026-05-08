import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { disabilityWelfareProfile, meta as disabilityWelfareMeta } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { disabilityWelfareTips } from "@/lib/evaluation-tips/disability-welfare";

export const metadata: Metadata = {
  title:
    "一、行政組織及經營管理（項目 1–11）｜身心障礙福利機構評鑑｜109年度",
  description:
    "109年度身心障礙福利機構評鑑「行政組織及經營管理（含會計及財務管理）」11 項評鑑指標詳細說明：董事會運作、機構管理制度、員工管理、專業人力、會計制度、財務管理等，含準備要訣。",
  keywords: [
    "身心障礙福利機構評鑑行政管理",
    "身心障礙機構評鑑會計財務",
    "身心障礙機構董事會",
    "身心障礙機構人力配置",
    "身心障礙福利機構評鑑",
    "109年度評鑑準備",
  ],
  alternates: {
    canonical:
      "https://reportwang.com/school/disability-welfare/administration",
  },
  openGraph: {
    title:
      "一、行政組織及經營管理（項目 1–11）｜身心障礙福利機構評鑑｜報告汪",
    description:
      "109年度身心障礙福利機構評鑑行政組織及經營管理區塊 11 項指標詳細說明與準備要訣。",
    url: "https://reportwang.com/school/disability-welfare/administration",
  },
};

const section = (() => {
  const s = disabilityWelfareProfile.sections.find(
    (s) => s.shortCode === "行",
  );
  if (!s)
    throw new Error("disabilityWelfareProfile: section 行 not found");
  return s;
})();

const tips = disabilityWelfareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "disability-welfare",
  subpage: "administration",
  section,
  name: "一、行政組織及經營管理（109年度身心障礙福利機構評鑑指標項目 1–11）",
  description:
    "109年度身心障礙福利機構評鑑指標「行政組織及經營管理」11 個評鑑項目詳細說明、準備要訣與實用提示。",
  extraFaq: [
    {
      question: "身心障礙機構評鑑「行政組織及經營管理」包含哪兩個子區塊？",
      answer: "本區塊分為兩部分：（一）行政組織及經營管理（指標 1101–1107，共 7 項），涵蓋董事會運作、機構管理制度、員工健康檢查、訓練及法定通報；（二）會計及財務管理（指標 2101–2104，共 4 項），涵蓋會計制度、財務報告、財物管理及捐贈徵信。",
    },
    {
      question: "員工健康檢查有哪些頻率規定？",
      answer: "一般員工每 2 年一次（血液、尿液、胸部 X 光）；廚工及夜間工作人員每年一次（加 A 肝、傷寒、異物檢查）；新進人員於到職前完成健檢（含糞便檢查，以 3 個月內報告為有效）。",
    },
  ],
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
          一、行政組織及經營管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          行政組織及經營管理（含會計及財務管理）（項目 1–11）
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
          本區塊共 11 個評鑑項目，分為兩個子區塊：「行政組織及經營管理」（項目
          1-7）涵蓋董事會運作、機構管理、員工管理及專業人力配置；「會計及財務管理」（項目
          8-11）涵蓋會計制度、財務報告、財物管理及捐贈徵信。
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
        {section.items.map((item, idx) => {
          // 在子區塊切換處插入標題
          const showSubHeader =
            idx === 0 ||
            item.subSection !== section.items[idx - 1]?.subSection;
          return (
            <div key={item.id}>
              {showSubHeader && (
                <h3 className="text-base font-bold text-muted-foreground mb-6 pt-4 border-t first:border-t-0 first:pt-0">
                  {item.subSection}
                </h3>
              )}
              <section
                id={`item-${item.id}`}
                aria-labelledby={`heading-${item.id}`}
                className="scroll-mt-20"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
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
              </section>
            </div>
          );
        })}
      </div>

      {/* Prev / Next navigation */}
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/disability-welfare"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回總覽
        </Link>
        <Link
          href="/school/disability-welfare/environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          二、環境設施及安全維護
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
