import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { generalNursingHomeProfile } from "@/lib/ai/evaluation-profiles/general-nursing-home";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "行政組織與服務對象權益保障（A1.1–A2.2）｜一般護理之家評鑑",
  description:
    "一般護理之家評鑑「行政組織、經營管理與服務對象權益保障」5 項評鑑基準詳細說明：負責人管理作業、人員配置及急救訓練、緊急事件處理流程、防疫機制、安寧緩和療護，含準備要訣。",
  keywords: [
    "一般護理之家評鑑行政組織",
    "護理之家人員配置評鑑",
    "護理之家防疫機制",
    "護理之家安寧緩和療護",
    "115年度一般護理之家評鑑",
    "護理之家評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/general-nursing-home/administration" },
  openGraph: {
    title: "行政組織與服務對象權益保障（A1.1–A2.2）｜一般護理之家評鑑｜報告汪",
    description: "一般護理之家評鑑行政組織區塊 5 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/general-nursing-home/administration",
  },
};

const section = (() => {
  const s = generalNursingHomeProfile.sections.find((s) => s.shortCode === "A");
  if (!s) throw new Error("generalNursingHomeProfile: section A not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  1: {
    content:
      "負責人每月巡查紀錄建議使用標準化表單，記載查看日期、實際照護情形觀察重點及簽名。護理人員執照有效性應定期核查，並建立執照效期提醒機制。護病比紀錄須完整反映各班次實際情形。",
    variant: "info",
  },
  2: {
    content:
      "急救訓練記錄須包含訓練日期、課程內容（BLS、AED操作）、講師資格及出席名冊。新進人員訓練計畫應書面化，涵蓋機構規章、護理技術及緊急應變程序。照服員訓練結業證書應影印存檔並建立到期提醒。",
    variant: "info",
  },
  3: {
    content:
      "意外事件24小時通報規定至關重要，建議設立標準化通報流程表，包含事件發生時間、當事人狀況、處置措施、通報對象及後續追蹤。評鑑委員可能實地抽測護理人員對緊急處理流程的熟悉度，建議定期演練並留有演練記錄。",
    variant: "warning",
  },
  4: {
    content:
      "本項為防疫機制，建議整合感染管制計畫與傳染病防疫機制為完整文件，定期演練並留有演練紀錄。教育訓練記錄須確認每人每年達6小時以上，建議以人員名冊逐一核實，確保無遺漏。",
    variant: "warning",
  },
  5: {
    content:
      "安寧緩和療護資訊提供建議製作書面衛教單張，供住民及家屬參閱。預立醫療決定（AD）協助流程需有書面說明，轉介機制應與合作醫療機構簽訂書面協議，工作人員訓練紀錄需妥善保存。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "A、行政組織、經營管理與服務對象權益保障（一般護理之家評鑑基準項目 1–5）",
  description:
    "一般護理之家評鑑基準「行政組織、經營管理與服務對象權益保障」5 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/general-nursing-home/administration",
});

export default function GeneralNursingHomeAdministrationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0 hover:bg-orange-500/20">
          A、行政組織、經營管理與服務對象權益保障
        </Badge>
        <h1 className="text-2xl font-bold mb-3">行政組織、經營管理與服務對象權益保障（項目 1–5）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 5 個評鑑項目，涵蓋護理之家的行政管理核心，包含負責人管理責任、人員配置與急救訓練、
          緊急事件處理流程、防疫機制，以及安寧緩和療護與醫療自主權推動，是評鑑委員審核機構管理制度的重要依據。
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
          <section key={item.id} id={`item-${item.id}`} aria-labelledby={`heading-${item.id}`} className="scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-sm font-bold text-orange-600 dark:text-orange-400 font-mono">
                {item.id}
              </span>
              <h2 id={`heading-${item.id}`} className="text-lg font-bold">{item.title}</h2>
              <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
              <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">評鑑標準</p>
              <ol role="list" className="space-y-1.5 list-none pl-0">
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
          href="/school/general-nursing-home"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回總覽
        </Link>
        <Link
          href="/school/general-nursing-home/professional-care"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          B、專業服務
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
