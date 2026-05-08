import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { multiFunctionCareProfile, meta as multiFunctionCareMeta } from "@/lib/ai/evaluation-profiles/multi-function-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { multiFunctionCareTips } from "@/lib/evaluation-tips/multi-function-care";
import { EvaluationReferences } from "@/components/school/evaluation-references";
import { multiFunctionCareReferences } from "@/lib/evaluation-references/multi-function-care";

export const metadata: Metadata = {
  title: "貳、專業照護品質（項目 5–23）｜小規機評鑑基準",
  description:
    "115 年度小規模多機能機構評鑑「專業照護品質」19 項評鑑基準詳細說明：服務對象評估、照顧計畫、追蹤評值、居服照服員服務執行、協助服藥、活動辦理、健康管理、防疫機制、品質監測，含準備要訣。",
  keywords: [
    "小規機照護品質評鑑",
    "小規機居家服務評鑑",
    "小規模多機能機構照顧計畫",
    "臺北市小規機評鑑",
    "115年度小規機評鑑基準",
  ],
  alternates: { canonical: "https://reportwang.com/school/multi-function-care/professional-quality" },
  openGraph: {
    title: "貳、專業照護品質（項目 5–23）｜小規機評鑑｜報告汪",
    description: "115 年度小規機評鑑「專業照護品質」19 項基準詳細說明與準備要訣，含居服獨有第 11 項。",
    url: "https://reportwang.com/school/multi-function-care/professional-quality",
  },
};

const section = requireSection(multiFunctionCareProfile.sections, "專");
const tips = multiFunctionCareTips;

// 子分類定義（對應 115 年度基準書結構）
const subCategories = [
  { label: "（一）評估與處遇", ids: [5, 6, 7, 8, 9, 10] },
  { label: "（二）健康生活照顧", ids: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] },
  { label: "（三）品質監測", ids: [23] },
];

const jsonLd = schoolSubpageJsonLd({
  type: "multi-function-care",
  subpage: "professional-quality",
  section,
  name: "貳、專業照護品質（小規模多機能機構評鑑基準項目 5–23）",
  description: "115 年度小規模多機能機構評鑑基準「專業照護品質」19 個評鑑項目詳細說明、準備要訣與實用提示。",
});

export default function MultiFunctionCareProfessionalQualityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* 頁首 */}
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          貳、專業照護品質
        </Badge>
        <h1 className="text-2xl font-bold mb-3">專業照護品質（項目 5–23）</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${multiFunctionCareMeta.year} 年度` },
            { label: "主管機關", value: multiFunctionCareMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={multiFunctionCareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 19 個評鑑項目，是小規機評鑑的核心區塊，分為三個子分類：評估與處遇、健康生活照顧、品質監測。
          與日照中心評鑑相比，本區塊新增第 11 項「照顧服務員之服務執行（居服）」，著重居家服務查核，
          包含到府服務計畫執行、準時到班、即時通報等面向。
        </p>
      </div>

      {/* 居服獨有提示 */}
      <div className="mb-6 rounded-lg border border-green-500/20 bg-green-500/5 p-3 flex gap-2">
        <Badge className="text-xs bg-green-500/10 text-green-700 dark:text-green-400 border-0 shrink-0">居服</Badge>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">第 11 項</span>「照顧服務員之服務執行（居服）」為小規機獨有項目，
          評鑑委員將查核居服員到府服務的查核機制與執行紀錄。
        </p>
      </div>

      {/* 目錄 */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">本頁內容</p>
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
                        <span className="flex items-center gap-1">
                          {item.title}
                          {item.id === 11 && (
                            <Badge className="text-xs bg-green-500/10 text-green-700 dark:text-green-400 border-0 py-0">居服</Badge>
                          )}
                        </span>
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
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 pb-2 border-b">
              {cat.label}
            </h2>
            <div className="space-y-10">
              {section.items
                .filter((item) => cat.ids.includes(item.id))
                .map((item) => (
                  <div key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center text-sm font-mono font-semibold">
                        {item.id}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold flex items-center gap-2">
                          {item.title}
                          {item.id === 11 && (
                            <Badge className="text-xs bg-green-500/10 text-green-700 dark:text-green-400 border-0">居服</Badge>
                          )}
                        </h3>
                        <p className="text-xs text-muted-foreground">負責人員：{item.responsible}</p>
                      </div>
                    </div>
                    <div className="ml-11">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">評鑑基準</p>
                      <ol className="space-y-1.5 mb-4">
                        {item.criteria.map((c, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <span className="shrink-0 text-muted-foreground font-mono">{i + 1}.</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ol>
                      <p className="text-xs text-muted-foreground mb-3">
                        <span className="font-medium">評核方式：</span>{item.reviewMethod}
                      </p>
                      {"reviewBasis" in item && item.reviewBasis && (
                        <p className="text-xs text-muted-foreground bg-muted/40 rounded-md p-2 mb-3">
                          <span className="font-medium">備註：</span>{item.reviewBasis}
                        </p>
                      )}
                      {tips[item.id] && <DocsTip variant={tips[item.id]!.variant}>{tips[item.id]!.content}</DocsTip>}
                      <EvaluationReferences references={multiFunctionCareReferences[item.id]} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* 前後頁導航 */}
      <div className="mt-12 flex justify-between text-sm">
        <Link href="/school/multi-function-care/client-rights" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeftIcon className="h-4 w-4" /> 壹、個案權益保障
        </Link>
        <Link href="/school/multi-function-care/management" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          參、經營管理效能 <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
