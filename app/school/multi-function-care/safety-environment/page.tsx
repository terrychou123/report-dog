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
  title: "肆、安全環境設備（項目 40–45）｜小規機評鑑基準",
  description:
    "115 年度小規模多機能機構評鑑「安全環境設備」6 項評鑑基準詳細說明：高齡友善環境、盥洗衛生設備、休息場所、飲用水檢查、廚房衛生、機構環境清潔及病媒防治，含準備要訣。",
  keywords: [
    "小規機安全環境評鑑",
    "小規模多機能機構評鑑",
    "小規機高齡友善環境",
    "臺北市小規機評鑑",
    "115年度小規機評鑑基準",
  ],
  alternates: { canonical: "https://reportwang.com/school/multi-function-care/safety-environment" },
  openGraph: {
    title: "肆、安全環境設備（項目 40–45）｜小規機評鑑｜報告汪",
    description: "115 年度小規機評鑑「安全環境設備」6 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/multi-function-care/safety-environment",
  },
};

const section = requireSection(multiFunctionCareProfile.sections, "安");
const tips = multiFunctionCareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "multi-function-care",
  subpage: "safety-environment",
  section,
  name: "肆、安全環境設備（小規模多機能機構評鑑基準項目 40–45）",
  description: "115 年度小規模多機能機構評鑑基準「安全環境設備」6 個評鑑項目詳細說明、準備要訣與實用提示。",
});

export default function MultiFunctionCareSafetyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* 頁首 */}
      <div className="mb-6">
        <Badge className="mb-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 border-0 hover:bg-teal-500/20">
          肆、安全環境設備
        </Badge>
        <h1 className="text-2xl font-bold mb-3">安全環境設備（項目 40–45）</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${multiFunctionCareMeta.year} 年度` },
            { label: "資料來源", value: multiFunctionCareMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={multiFunctionCareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 6 個評鑑項目，涵蓋硬體環境設施的安全性與衛生維護。評鑑委員會實地查看機構空間，
          確認高齡友善設計、衛浴設備、飲用水品質、廚房衛生及病媒防治的落實情形。
          小規機夜宿區域的環境安全（走廊照明、緊急呼叫系統）尤其需要提前確認。
        </p>
      </div>

      {/* 目錄 */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">本頁內容</p>
        <p className="text-xs text-muted-foreground mb-1">（一）硬體環境設施</p>
        <ul className="space-y-1 pl-2">
          {section.items.map((item) => (
            <li key={item.id}>
              <a href={`#item-${item.id}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-background border flex items-center justify-center text-xs font-mono">{item.id}</span>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 子分類標題 */}
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 pb-2 border-b">
        （一）硬體環境設施
      </h2>

      {/* 評鑑項目列表 */}
      <div className="space-y-10">
        {section.items.map((item) => (
          <div key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex items-start gap-3 mb-4">
              <span className="shrink-0 w-8 h-8 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center text-sm font-mono font-semibold">
                {item.id}
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
      <div className="mt-12 flex justify-between text-sm">
        <Link href="/school/multi-function-care/management" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeftIcon className="h-4 w-4" /> 參、經營管理效能
        </Link>
        <Link href="/school/multi-function-care/bonus" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          伍、加分題 <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
