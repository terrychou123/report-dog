import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { daycareProfile, meta as daycareMeta } from "@/lib/ai/evaluation-profiles/daycare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { daycareTips } from "@/lib/evaluation-tips/daycare";

export const metadata: Metadata = {
  title: "貳、專業照護品質（項目 5–22）｜日間照顧機構評鑑",
  description:
    "115 年度日間照顧機構評鑑「專業照護品質」18 項評鑑基準詳細說明：服務對象評估、照顧計畫、追蹤評值、活動辦理、安全看視、協助服藥、健康管理、防疫機制與品質監測，含準備要訣。",
  keywords: [
    "日照中心照護品質評鑑",
    "日間照顧照顧計畫評鑑",
    "日照服務對象評估",
    "日照協助服藥評鑑",
    "日照健康管理評鑑",
    "臺北市日間照顧評鑑基準",
    "115年度日照評鑑",
  ],
  alternates: { canonical: "/school/daycare/professional-quality" },
  openGraph: {
    title: "貳、專業照護品質（項目 5–22）｜日間照顧評鑑｜報告汪",
    description: "115 年度日間照顧機構評鑑專業照護品質 18 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/daycare/professional-quality",
  },
};

const section = requireSection(daycareProfile.sections, "專");

// 子分類定義（對應 115 年度基準書結構）
const subCategories = [
  { label: "（一）評估與處遇", ids: [5, 6, 7, 8, 9, 10] },
  { label: "（二）健康生活照顧", ids: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] },
  { label: "（三）品質監測", ids: [22] },
];

const tips = daycareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "daycare",
  subpage: "professional-quality",
  section,
  name: "貳、專業照護品質（日間照顧機構評鑑基準項目 5–22）",
  description:
    "115 年度日間照顧機構評鑑基準「專業照護品質」18 個評鑑項目詳細說明、準備要訣與實用提示。",
});

export default function DaycareProfessionalQualityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* 頁首 */}
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          貳、專業照護品質
        </Badge>
        <h1 className="text-2xl font-bold mb-3">專業照護品質（項目 5–22）</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${daycareMeta.year} 年度` },
            { label: "資料來源", value: daycareMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={daycareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 18 個評鑑項目，是日照評鑑的核心區塊，分為三個子分類：評估與處遇、健康生活照顧、品質監測。
          涵蓋從入案評估、照顧計畫到各類日常照護服務，護理師、社工與照服員的跨團隊合作程度
          直接反映在這個區塊的評鑑結果。
        </p>
      </div>

      {/* 目錄 */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          本頁內容
        </p>
        <div className="space-y-3">
          {subCategories.map((cat) => (
            <div key={cat.label}>
              <p className="text-xs font-medium text-muted-foreground mb-1">{cat.label}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2">
                {section.items
                  .filter((item) => cat.ids.includes(item.id))
                  .map((item) => (
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
            </div>
          ))}
        </div>
      </nav>

      {/* 評鑑項目列表（依子分類呈現） */}
      <div className="space-y-16">
        {subCategories.map((cat) => (
          <div key={cat.label}>
            {/* 子分類標題 */}
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 pb-2 border-b">
              {cat.label}
            </h2>
            <div className="space-y-12">
              {section.items
                .filter((item) => cat.ids.includes(item.id))
                .map((item) => (
                  <section key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400 font-mono">
                        {item.id}
                      </span>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
                      <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2">評鑑標準</p>
                      <ol className="space-y-1.5 list-none pl-0">
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
          </div>
        ))}
      </div>

      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      {/* 上下頁導航 */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/daycare/client-rights"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          壹、個案權益保障
        </Link>
        <Link
          href="/school/daycare/management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          參、經營管理效能
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
