import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { daycareProfile } from "@/lib/ai/evaluation-profiles/daycare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "壹、個案權益保障（項目 1–4）｜日間照顧機構評鑑",
  description:
    "日間照顧機構評鑑「個案權益保障」4 項評鑑基準詳細說明：服務資訊公開、個案基本權益維護、個案隱私保護、申訴機制，含準備要訣與實用提示。",
  keywords: [
    "日照中心個案權益評鑑",
    "日間照顧服務資訊公開",
    "日照機構申訴機制評鑑",
    "臺北市日照評鑑準備",
    "113年度日間照顧評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/daycare/client-rights" },
  openGraph: {
    title: "壹、個案權益保障（項目 1–4）｜日間照顧評鑑｜報告汪",
    description: "日間照顧機構評鑑個案權益保障 4 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/daycare/client-rights",
  },
};

const section = daycareProfile.sections.find((s) => s.shortCode === "權")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  1: {
    content:
      "日照中心的網路平台可以是官方網站、LINE 官方帳號或社區長照資訊平台。評鑑委員會實際確認連結是否有效、資訊是否最新，活動訊息也需定期更新，不可放置過期內容。",
    variant: "info",
  },
  2: {
    content:
      "「個案權益聲明書」需在入案時當場向個案及家屬說明並簽署，而非只是備查。評鑑時會抽查個案書面資料，確認簽署紀錄是否完整。工作人員應能口頭說明主要權益保障內容。",
    variant: "warning",
  },
  3: {
    content:
      "日照中心拍攝個案活動照片（如社交媒體發文、宣傳用途）須另行取得書面授權，不可只用口頭同意。個案資料存取應有電腦帳號權限管控，非相關人員不得查閱。",
    variant: "warning",
  },
  4: {
    content:
      "申訴管道需讓個案及家屬「知悉」，建議在服務合約、入案說明書及公告欄中列明。即使最終無申訴案件，申訴箱或電話管道仍需維持運作，並有定期查看記錄。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "壹、個案權益保障（日間照顧機構評鑑基準項目 1–4）",
  description:
    "日間照顧機構評鑑基準「個案權益保障」4 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/daycare/client-rights",
});

export default function DaycareClientRightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0 hover:bg-blue-500/20">
          壹、個案權益保障
        </Badge>
        <h1 className="text-2xl font-bold mb-3">個案權益保障（項目 1–4）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 4 個評鑑項目，著重在日照中心如何保障服務對象（個案）的基本權利，
          包括資訊公開、個案尊嚴、隱私保護及申訴管道。這是評鑑委員第一個審查的區塊，
          往往也是最能展現機構對個案尊重程度的關鍵。
        </p>
      </div>

      {/* Mini TOC */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          本頁內容
        </p>
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

      {/* Items */}
      <div className="space-y-12">
        {section.items.map((item) => (
          <section key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
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
          href="/school/daycare"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          日照評鑑總覽
        </Link>
        <Link
          href="/school/daycare/professional-quality"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          貳、專業照護品質
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
