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
    "115 年度日間照顧機構評鑑「個案權益保障」4 項評鑑基準詳細說明：服務資訊公開、意見反應申訴機制、服務契約簽訂、個人資料管理與保密性，含準備要訣與實用提示。",
  keywords: [
    "日照中心個案權益評鑑",
    "日間照顧服務資訊公開",
    "日照機構申訴機制評鑑",
    "臺北市日照評鑑準備",
    "日間照顧服務契約評鑑",
    "115年度日間照顧評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/daycare/client-rights" },
  openGraph: {
    title: "壹、個案權益保障（項目 1–4）｜日間照顧評鑑｜報告汪",
    description: "115 年度日間照顧機構評鑑個案權益保障 4 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/daycare/client-rights",
  },
};

const section = daycareProfile.sections.find((s) => s.shortCode === "權")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  1: {
    content:
      "服務資訊需在機構顯眼處公告，並同步更新網路平台（官方網站、LINE 官方帳號或長照資訊平台均可）。評鑑委員會確認網站資訊是否與實際服務內容一致，包含費用、服務項目、人員配置及聯絡方式，過期資訊可能影響評分。",
    variant: "info",
  },
  2: {
    content:
      "申訴辦法需有書面版本，並定期向服務對象及家屬說明管道（可於入案說明、服務合約及公告欄中呈現）。115 年度特別要求每季進行申訴意見彙整分析，即使無申訴案件也需保留定期查看的書面記錄，顯示機構確實運作此機制。",
    variant: "warning",
  },
  3: {
    content:
      "服務契約必須使用社會局核定的標準版本，不得自行刪減主要條款。個案或家屬需有至少 3 天的契約審閱期，並有書面確認。評鑑時會抽查契約樣本，確認簽署日期、版本是否符合規定，以及是否已完整告知服務內容與費用。",
    variant: "warning",
  },
  4: {
    content:
      "個案資料應依個人資料保護法分類建檔，紙本需上鎖存放，電子檔須設定存取權限（避免非相關人員查閱）。拍攝個案活動照片或影片須有書面肖像權同意書，入案時簽署並說明使用範圍（如社媒宣傳、評鑑報告等），未取得同意即使用可能面臨違規。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "壹、個案權益保障（日間照顧機構評鑑基準項目 1–4）",
  description:
    "115 年度日間照顧機構評鑑基準「個案權益保障」4 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/daycare/client-rights",
});

export default function DaycareClientRightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* 頁首 */}
      <div className="mb-6">
        <Badge className="mb-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0 hover:bg-blue-500/20">
          壹、個案權益保障
        </Badge>
        <h1 className="text-2xl font-bold mb-3">個案權益保障（項目 1–4）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 4 個評鑑項目，著重在日照中心如何保障服務對象的基本權利，
          包括資訊公開、申訴機制、服務契約與個人資料保護。這是評鑑委員第一個審查的區塊，
          也是展現機構對個案尊重程度的基礎。
        </p>
      </div>

      {/* 目錄 */}
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

      {/* 評鑑項目列表 */}
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

      {/* 上下頁導航 */}
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
