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
  title: "壹、個案權益保障（項目 1–4）｜小規機評鑑基準",
  description:
    "115 年度小規模多機能機構評鑑「個案權益保障」4 項評鑑基準詳細說明：服務資訊公開、意見反應申訴機制、服務契約簽訂（衛福部 113 年範本）、個人資料管理與保密性，含準備要訣。",
  keywords: [
    "小規機個案權益評鑑",
    "小規機服務契約評鑑",
    "小規模多機能機構評鑑",
    "臺北市小規機評鑑",
    "115年度小規機評鑑基準",
  ],
  alternates: { canonical: "https://reportwang.com/school/multi-function-care/client-rights" },
  openGraph: {
    title: "壹、個案權益保障（項目 1–4）｜小規機評鑑｜報告汪",
    description: "115 年度小規機評鑑「個案權益保障」4 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/multi-function-care/client-rights",
  },
};

const section = requireSection(multiFunctionCareProfile.sections, "權");
const tips = multiFunctionCareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "multi-function-care",
  subpage: "client-rights",
  section,
  name: "壹、個案權益保障（小規模多機能機構評鑑基準項目 1–4）",
  description: "115 年度小規模多機能機構評鑑基準「個案權益保障」4 個評鑑項目詳細說明、準備要訣與實用提示。",
});

export default function MultiFunctionCareClientRightsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* 頁首 */}
      <div className="mb-6">
        <Badge className="mb-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0 hover:bg-blue-500/20">
          壹、個案權益保障
        </Badge>
        <h1 className="text-2xl font-bold mb-3">個案權益保障（項目 1–4）</h1>
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
          本區塊共 4 個評鑑項目，涵蓋機構服務資訊公開、意見反應申訴機制、服務契約簽訂，
          以及個人資料管理與保密性。評鑑委員會查閱相關書面文件，並現場訪談確認制度是否確實落實。
          小規機服務契約需採用衛生福利部 113 年公告的社區式服務類定型化契約範本。
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
              <span className="shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-mono font-semibold">
                {item.id}
              </span>
              <div>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="text-xs text-muted-foreground">負責人員：{item.responsible}</p>
              </div>
            </div>

            {/* 評鑑基準 */}
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

              {/* 附件清單 */}
              {"attachments" in item && item.attachments && (
                <div className="mb-4 rounded-md bg-muted/40 p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">📎 契約附件清單</p>
                  <ul className="space-y-1">
                    {(item.attachments as string[]).map((att, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                        <span className="shrink-0">•</span>
                        <span>{att}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 評核方式 */}
              <p className="text-xs text-muted-foreground mb-3">
                <span className="font-medium">評核方式：</span>{item.reviewMethod}
              </p>

              {/* 備註 */}
              {"reviewBasis" in item && item.reviewBasis && (
                <p className="text-xs text-muted-foreground bg-muted/40 rounded-md p-2 mb-3">
                  <span className="font-medium">備註：</span>{item.reviewBasis}
                </p>
              )}

              {/* 準備要訣 */}
              {tips[item.id] && <DocsTip variant={tips[item.id]!.variant}>{tips[item.id]!.content}</DocsTip>}

              {/* 補充資料 */}
              <EvaluationReferences references={multiFunctionCareReferences[item.id]} />
            </div>
          </div>
        ))}
      </div>

      {/* 前後頁導航 */}
      <div className="mt-12 flex justify-between text-sm">
        <Link href="/school/multi-function-care" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeftIcon className="h-4 w-4" /> 評鑑基準總覽
        </Link>
        <Link href="/school/multi-function-care/professional-quality" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          貳、專業照護品質 <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
