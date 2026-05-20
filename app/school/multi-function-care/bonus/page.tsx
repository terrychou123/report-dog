import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { multiFunctionCareProfile, meta as multiFunctionCareMeta } from "@/lib/ai/evaluation-profiles/multi-function-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon } from "lucide-react";
import { multiFunctionCareTips } from "@/lib/evaluation-tips/multi-function-care";
import { EvaluationReferences } from "@/components/school/evaluation-references";
import { multiFunctionCareReferences } from "@/lib/evaluation-references/multi-function-care";

export const metadata: Metadata = {
  title: "伍、加分題（項目 46–47）｜小規機評鑑基準",
  description:
    "115 年度小規模多機能機構評鑑 2 項加分題詳細說明：服務原住民族之文化敏感度措施、機構權益保障（監視錄影設備），含準備要訣與法規依據，總計最多加 3 分。",
  keywords: [
    "小規機加分題",
    "小規模多機能機構加分",
    "原住民族文化敏感度",
    "小規機監視錄影設備",
    "115年度小規機評鑑",
  ],
  alternates: { canonical: "/school/multi-function-care/bonus" },
  openGraph: {
    title: "伍、加分題（項目 46–47）｜小規機評鑑｜報告汪",
    description: "115 年度小規機評鑑 2 項加分題完整說明與準備要訣，總計最多加 3 分。",
    url: "https://reportwang.com/school/multi-function-care/bonus",
  },
};

const section = requireSection(multiFunctionCareProfile.sections, "加");
const tips = multiFunctionCareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "multi-function-care",
  subpage: "bonus",
  section,
  name: "伍、加分題（小規模多機能機構評鑑基準項目 46–47）",
  description: "115 年度小規模多機能機構評鑑 2 項加分題詳細說明、準備要訣與法規依據。",
});

export default function MultiFunctionCareBonusPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* 頁首 */}
      <div className="mb-6">
        <Badge className="mb-3 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-0 hover:bg-yellow-500/20">
          伍、加分題
        </Badge>
        <h1 className="text-2xl font-bold mb-3">加分題（項目 46–47）</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${multiFunctionCareMeta.year} 年度` },
            { label: "資料來源", value: multiFunctionCareMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "最多加分", value: "3 分" },
          ]}
        />
        <SourceCallout meta={multiFunctionCareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 2 個加分題項目，不計入正式 45 項評鑑項次，由評鑑委員共議給分，
          總計最多加 3 分（第 46 項最多加 2 分、第 47 項最多加 1 分）。
          加分題著重機構是否展現多元族群文化敏感度，以及是否落實監視錄影設備的合規管理。
        </p>
      </div>

      {/* 目錄 */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">本頁內容</p>
        <ul className="space-y-1">
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

      {/* 評鑑項目列表 */}
      <div className="space-y-10">
        {section.items.map((item) => (
          <div key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex items-start gap-3 mb-4">
              <span className="shrink-0 w-8 h-8 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 flex items-center justify-center text-sm font-mono font-semibold">
                ★
              </span>
              <div>
                <h3 className="text-base font-semibold">{item.title}</h3>
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

      {/* 前後頁導航 */}
      <div className="mt-12 flex justify-start text-sm">
        <Link href="/school/multi-function-care/safety-environment" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeftIcon className="h-4 w-4" /> 肆、安全環境設備
        </Link>
      </div>
    </>
  );
}
