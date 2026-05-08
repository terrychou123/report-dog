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
  title: "參、經營管理效能（項目 24–39）｜小規機評鑑基準",
  description:
    "115 年度小規模多機能機構評鑑「經營管理效能」16 項評鑑基準詳細說明：業務計畫、工作手冊、人力設置、服務人員訓練、留任率、寢室管理（夜宿）、財務管理、緊急事件處理與性騷擾防治，含準備要訣。",
  keywords: [
    "小規機經營管理評鑑",
    "小規機人員配置評鑑",
    "小規模多機能機構夜宿管理",
    "臺北市小規機評鑑",
    "115年度小規機評鑑基準",
  ],
  alternates: { canonical: "https://reportwang.com/school/multi-function-care/management" },
  openGraph: {
    title: "參、經營管理效能（項目 24–39）｜小規機評鑑｜報告汪",
    description: "115 年度小規機評鑑「經營管理效能」16 項基準詳細說明與準備要訣，含夜宿獨有第 29 項。",
    url: "https://reportwang.com/school/multi-function-care/management",
  },
};

const section = requireSection(multiFunctionCareProfile.sections, "管");
const tips = multiFunctionCareTips;

// 子分類定義（對應 115 年度基準書結構）
const subCategories = [
  { label: "（一）行政制度", ids: [24, 25, 26, 27, 28, 29] },
  { label: "（二）服務人員管理", ids: [30, 31, 32, 33, 34, 35] },
  { label: "（三）財務管理", ids: [36] },
  { label: "（四）緊急事件管理", ids: [37, 38, 39] },
];

const jsonLd = schoolSubpageJsonLd({
  type: "multi-function-care",
  subpage: "management",
  section,
  name: "參、經營管理效能（小規模多機能機構評鑑基準項目 24–39）",
  description: "115 年度小規模多機能機構評鑑基準「經營管理效能」16 個評鑑項目詳細說明、準備要訣與實用提示。",
});

export default function MultiFunctionCareManagementPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* 頁首 */}
      <div className="mb-6">
        <Badge className="mb-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0 hover:bg-orange-500/20">
          參、經營管理效能
        </Badge>
        <h1 className="text-2xl font-bold mb-3">經營管理效能（項目 24–39）</h1>
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
          本區塊共 16 個評鑑項目，分為行政制度、服務人員管理、財務管理、緊急事件管理四個子分類。
          與日照中心評鑑相比，新增第 29 項「訂有寢室管理規範（夜宿）」，要求機構建立寢具清潔更換機制及性別隱私保護。
          工作手冊（第 25 項）範圍也需涵蓋居服員與夜宿輪值人員。
        </p>
      </div>

      {/* 夜宿獨有提示 */}
      <div className="mb-6 rounded-lg border border-purple-500/20 bg-purple-500/5 p-3 flex gap-2">
        <Badge className="text-xs bg-purple-500/10 text-purple-700 dark:text-purple-400 border-0 shrink-0">夜宿</Badge>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">第 29 項</span>「訂有寢室管理規範（夜宿）」為小規機獨有項目，
          評鑑委員將查核寢室清潔規範與性別隱私保護措施。
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
                          {item.id === 29 && (
                            <Badge className="text-xs bg-purple-500/10 text-purple-700 dark:text-purple-400 border-0 py-0">夜宿</Badge>
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
                      <span className="shrink-0 w-8 h-8 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center text-sm font-mono font-semibold">
                        {item.id}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold flex items-center gap-2">
                          {item.title}
                          {item.id === 29 && (
                            <Badge className="text-xs bg-purple-500/10 text-purple-700 dark:text-purple-400 border-0">夜宿</Badge>
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
        <Link href="/school/multi-function-care/professional-quality" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeftIcon className="h-4 w-4" /> 貳、專業照護品質
        </Link>
        <Link href="/school/multi-function-care/safety-environment" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          肆、安全環境設備 <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
