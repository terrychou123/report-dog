import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { nursingHomeProfile } from "@/lib/ai/evaluation-profiles/nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { SoapCta } from "@/components/school/soap-cta";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { nursingHomeTips } from "@/lib/evaluation-tips/nursing-home";

export const metadata: Metadata = {
  title: "B、專業照護品質（項目 10–38）｜住宿型照顧機構評鑑",
  description:
    "住宿型照顧機構評鑑「專業照護品質」29 項評鑑基準詳細說明（115年度全國版）：服務計畫、醫療服務、防疫機制、藥品管理、跌倒壓傷預防、失禁定時如廁、膳食服務、管灌照護等，含準備要訣。",
  keywords: [
    "住宿型長照評鑑專業照護",
    "安養機構照護品質評鑑",
    "長照機構護理品質評鑑",
    "住民服務計畫評鑑",
    "115年度住宿型長照評鑑",
    "住宿式長照機構失禁照護",
  ],
  alternates: { canonical: "https://reportwang.com/school/nursing-home/professional-quality" },
  openGraph: {
    title: "B、專業照護品質（項目 10–38）｜住宿型照顧機構評鑑｜報告汪",
    description: "住宿型照顧機構評鑑專業照護品質 29 項基準詳細說明與準備要訣（115年度全國版）。",
    url: "https://reportwang.com/school/nursing-home/professional-quality",
  },
};

const section = nursingHomeProfile.sections.find((s) => s.shortCode === "專")!;

const tips = nursingHomeTips;

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "B、專業照護品質（住宿型照顧機構評鑑基準項目 10–38）",
  description:
    "住宿型照顧機構評鑑基準「專業照護品質」29 個評鑑項目詳細說明、準備要訣與實用提示（115年度全國版）。",
  path: "/school/nursing-home/professional-quality",
});

export default function NursingHomeProfessionalQualityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          B、專業照護品質
        </Badge>
        <h1 className="text-2xl font-bold mb-3">專業照護品質（項目 10–38）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 29 個評鑑項目（115年度全國版），是住宿型機構評鑑中項目最多的區塊，涵蓋從服務計畫、醫療照護、感染防疫、膳食管理到日常生活照護的完整照護品質體系。
          115年度新增「失禁服務對象定時如廁計畫」（B26），護理與社工人員的備戰程度直接決定本區塊的得分。
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
          <section key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400 font-mono">
                {item.id}
              </span>
              <h2 className="text-lg font-bold">{item.title}</h2>
              <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
              <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">評鑑標準</h3>
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
            {tips[item.id]?.soap && <SoapCta facility="nursing-home" />}
          </section>
        ))}
      </div>

      {/* Prev / Next navigation */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/nursing-home/management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          A、經營管理效能
        </Link>
        <Link
          href="/school/nursing-home/safety-environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          C、安全環境設備
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
