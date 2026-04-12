import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { nursingHomeProfile } from "@/lib/ai/evaluation-profiles/nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { nursingHomeTips } from "@/lib/evaluation-tips/nursing-home";

export const metadata: Metadata = {
  title: "C、安全環境設備（項目 48–63）｜住宿型照顧機構評鑑",
  description:
    "住宿型照顧機構評鑑「安全環境設備」16 項評鑑基準詳細說明：採光通風、無障礙設施、消防安全、緊急疏散、廚房衛生、隔離空間、飲用水安全等，含準備要訣。",
  keywords: [
    "住宿型長照評鑑安全環境",
    "安養機構消防安全評鑑",
    "長照機構無障礙設施評鑑",
    "護理之家疏散演練評鑑",
    "114年度住宿型長照評鑑",
    "臺北市安養機構環境評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/nursing-home/safety-environment" },
  openGraph: {
    title: "C、安全環境設備（項目 48–63）｜住宿型照顧機構評鑑｜報告汪",
    description: "住宿型照顧機構評鑑安全環境設備 16 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/nursing-home/safety-environment",
  },
};

const section = nursingHomeProfile.sections.find((s) => s.shortCode === "安")!;

const tips = nursingHomeTips;

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "C、安全環境設備（住宿型照顧機構評鑑基準項目 48–63）",
  description:
    "住宿型照顧機構評鑑基準「安全環境設備」16 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/nursing-home/safety-environment",
});

export default function NursingHomeSafetyEnvironmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 border-0 hover:bg-teal-500/20">
          C、安全環境設備
        </Badge>
        <h1 className="text-2xl font-bold mb-3">安全環境設備（項目 48–63）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 16 個評鑑項目，著重在機構實體環境的安全性與無障礙可及性。評鑑委員通常以現場觀察及設備測試為主要審查方式，
          包含多個「一級必要」項目，不達標將直接影響評鑑等級。
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
              <span className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center text-sm font-bold text-teal-600 dark:text-teal-400 font-mono">
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
          </section>
        ))}
      </div>

      {/* Prev / Next navigation */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/nursing-home/professional-quality"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          B、專業照護品質
        </Link>
        <Link
          href="/school/nursing-home/client-rights"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          D、個案權益保障
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
