import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { homeNursingProfile } from "@/lib/ai/evaluation-profiles/home-nursing";
import { DocsTip } from "@/components/docs/docs-tip";
import { SoapCta } from "@/components/school/soap-cta";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { homeNursingTips } from "@/lib/evaluation-tips/home-nursing";

export const metadata: Metadata = {
  title: "A、經營管理（項目 1–5）｜居家護理所評鑑",
  description:
    "居家護理所評鑑「經營管理」5 項評鑑基準詳細說明：社區資源盤點、感染管制與器材維護、居家訪視人員安全管理、個案緊急意外事件處理、機構經營指標監測，含準備要訣。",
  keywords: [
    "居家護理所評鑑經營管理",
    "居家護理感染管制評鑑",
    "居家訪視人員安全",
    "居家護理評鑑指標",
    "115年度居家護理所評鑑",
    "護理所評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/home-nursing/management" },
  openGraph: {
    title: "A、經營管理（項目 1–5）｜居家護理所評鑑｜報告汪",
    description: "居家護理所評鑑經營管理 5 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/home-nursing/management",
  },
};

const section = homeNursingProfile.sections.find((s) => s.shortCode === "A")!;

const tips = homeNursingTips;

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "A、經營管理（居家護理所評鑑基準項目 1–5）",
  description:
    "居家護理所評鑑基準「經營管理」5 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/home-nursing/management",
});

export default function HomeNursingManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0 hover:bg-orange-500/20">
          A、經營管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">經營管理（項目 1–5）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 5 個評鑑項目，涵蓋居家護理所的整體經營管理能力，從社區資源運用、感染管制、
          訪視人員安全到品質監測指標，是評鑑委員審核機構管理制度的核心依據。
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
              <span className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-sm font-bold text-orange-600 dark:text-orange-400 font-mono">
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
            {tips[item.id]?.soap && <SoapCta facility="home-nursing" />}
          </section>
        ))}
      </div>

      {/* Prev / Next navigation */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/home-nursing"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回總覽
        </Link>
        <Link
          href="/school/home-nursing/care-management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          B、照護管理
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
