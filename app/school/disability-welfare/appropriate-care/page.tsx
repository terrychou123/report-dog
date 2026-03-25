import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { disabilityWelfareProfile } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "B、適性照顧與支持（項目 9–17）｜身心障礙福利機構評鑑",
  description:
    "身心障礙福利機構評鑑「適性照顧與支持」9 項評鑑基準詳細說明：個別化支持計畫（ISP）、特殊照顧、情緒行為支持、家庭支持、轉銜、生涯教育，含準備要訣。",
  keywords: [
    "身心障礙福利機構ISP",
    "個別化支持計畫",
    "身心障礙機構轉銜",
    "身心障礙機構家庭支持",
    "身心障礙福利機構評鑑",
    "適性照顧評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/disability-welfare/appropriate-care" },
  openGraph: {
    title: "B、適性照顧與支持（項目 9–17）｜身心障礙福利機構評鑑｜報告汪",
    description: "身心障礙福利機構評鑑適性照顧與支持區塊 9 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/disability-welfare/appropriate-care",
  },
};

const section = (() => {
  const s = disabilityWelfareProfile.sections.find((s) => s.shortCode === "B");
  if (!s) throw new Error("disabilityWelfareProfile: section B not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  9: {
    content:
      "入住前需求評估是 ISP 的基礎。建議使用標準化評估工具，評估結果需具體記載服務對象的需求與期待。評鑑委員可能實地訪談服務對象，確認需求是否真正被回應。",
    variant: "info",
  },
  10: {
    content:
      "ISP 是評鑑的核心文件，需特別注意：（1）每位服務對象均需有 ISP，不得遺漏；（2）服務對象本人或家屬需簽名；（3）目標需具體可量測（SMART 原則）；（4）每6個月至少檢視一次，有修訂紀錄。",
    variant: "warning",
  },
  11: {
    content:
      "有特殊照顧需求的服務對象，其照護計畫需由具備資格的專業人員擬定。照護技術訓練紀錄需完整，評鑑委員可能實地抽測執行情形。",
    variant: "info",
  },
  12: {
    content:
      "情緒行為支持計畫需以正向支持（PBS）為核心。任何限制措施須有書面依據、知情同意及定期檢視，不得作為懲罰手段。建議定期邀請心理師或行為分析師（BCBA）會診。",
    variant: "warning",
  },
  13: {
    content:
      "多元支持需求包含溝通、學習、休閒等層面。若服務對象有溝通困難，建議評估 AAC 需求，相關輔具申請紀錄可作為評鑑佐證。",
    variant: "info",
  },
  14: {
    content:
      "社區資源清冊建議分類整理（醫療、就業、休閒、福利等），並標注聯繫窗口及更新日期。轉介紀錄須保存，說明轉介原因及結果。",
    variant: "info",
  },
  15: {
    content:
      "家庭支持是項目最多的區塊（8項標準），需特別重視。建議建立家屬通聯紀錄本，每次聯繫均需記錄。家屬教育訓練可邀請外部講師並保存出席紀錄。家庭危機通報流程需書面化並演練。",
    variant: "warning",
  },
  16: {
    content:
      "轉銜計畫需提前規劃，建議在服務對象離開前至少3個月啟動轉銜程序。轉銜後追蹤紀錄是容易遺漏的部分，務必建立系統化追蹤機制。",
    variant: "warning",
  },
  17: {
    content:
      "生涯教育適用於有能力發展就業技能的服務對象。就業輔導資源連結需有書面紀錄，建議與勞政單位（職業訓練局）建立合作關係。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "B、適性照顧與支持（身心障礙福利機構評鑑基準項目 9–17）",
  description:
    "身心障礙福利機構評鑑基準「適性照顧與支持」9 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/disability-welfare/appropriate-care",
});

export default function DisabilityWelfareAppropriateCare() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          B、適性照顧與支持
        </Badge>
        <h1 className="text-2xl font-bold mb-3">適性照顧與支持（項目 9–17）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 9 個評鑑項目，強調以個別化方式回應服務對象的多元需求，核心工具為個別化支持計畫（ISP），
          並涵蓋特殊照顧、情緒行為支持、家庭支持、轉銜及生涯教育等面向。
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
              <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400 font-mono">
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
          href="/school/disability-welfare/rights-protection"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          A、權益保障
        </Link>
        <Link
          href="/school/disability-welfare/administration"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          C、行政管理
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
