import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { hospitalProfile } from "@/lib/ai/evaluation-profiles/hospital";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "1.3 人力資源管理（項目 13–22）｜醫院評鑑小教室",
  description:
    "醫院評鑑「人力資源管理」10 項評鑑項目詳細說明：醫師、護理、醫事人員及行政人力配置，以及各類訓練、繼續教育與人員資格管理，含準備要訣。",
  keywords: [
    "醫院評鑑人力資源",
    "醫院護病比評鑑",
    "醫院醫師人力",
    "醫院在職教育訓練",
    "醫院評鑑",
    "區域醫院評鑑",
    "地區醫院評鑑",
    "評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/hospital/human-resources" },
  openGraph: {
    title: "1.3 人力資源管理（項目 13–22）｜醫院評鑑小教室｜報告汪",
    description: "醫院評鑑「人力資源管理」10 項評鑑項目詳細說明與準備要訣。",
    url: "https://reportwang.com/school/hospital/human-resources",
  },
};

const section = (() => {
  const s = hospitalProfile.sections.find((s) => s.shortCode === "1.3");
  if (!s) throw new Error("hospitalProfile: section 1.3 not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  13: {
    content:
      "醫師人力配置是「必要」項目，執照有效性及執業登記是基本門檻。評鑑前需確認所有執業醫師的執照均在有效期內，且執業地點登記正確。排班表需能呈現各科別均符合值班規定，夜間值班覆蓋範圍明確。若有外聘或支援醫師，其執業資格文件同樣需完整。",
    variant: "warning",
  },
  14: {
    content:
      "護理人力配置是「必要」項目，護病比是委員最常查核的數據。需備妥各病房近 3 個月的每日護病比記錄，確認均符合法規標準。夜班護理人力配置特別重要，需有實際班表可供查看。若曾有護病比不符規定的情形，需說明當時的緊急補足機制及後續改善措施。",
    variant: "warning",
  },
  15: {
    content:
      "各類醫事人員（藥師、放射師、醫事檢驗師、治療師等）的執照及執業登記文件需集中整理，建立執照到期日追蹤清冊，方便隨時查核。特別注意各類別的法定人力下限，若業務量增加需同步評估是否需要增加人力配置。",
    variant: "info",
  },
  16: {
    content:
      "社工及行政人力雖屬「一般」類別，但社工師執照有效性及社工人力是否符合法規規定仍需確認。工作說明書（Job Description）需有書面版本，並與實際職責一致，避免評鑑時員工說的工作內容與書面不符。",
    variant: "info",
  },
  17: {
    content:
      "新進人員職前訓練是「重點」項目，委員可能直接詢問新進員工訓練內容。職前訓練計畫需涵蓋病人安全、感染管制、消防逃生等核心主題，且每位新進人員均需有完成訓練的簽名紀錄及測驗成績。建議建立完整的職前訓練電子檔案，可快速查詢特定員工的訓練完成狀況。",
    variant: "warning",
  },
  18: {
    content:
      "在職教育訓練是「重點」項目，年度訓練計畫需在年初訂定並依計畫執行。重點準備：(1) 各職類的年度應訓時數及實際完成時數統計；(2) 訓練紀錄需含課程名稱、日期、講師及出席簽名；(3) 若有員工未達應訓時數，需有補救機制及紀錄；(4) 訓練成效評估（如測驗或問卷）結果及改善說明。",
    variant: "warning",
  },
  19: {
    content:
      "醫師繼續教育學分是個人責任，但醫院需有系統性的管理機制。建議建立醫師繼續教育學分追蹤表，定期（至少每半年）確認各醫師的學分累積狀況，並提醒學分不足者及時補修。醫院主辦或協辦的學術活動可作為支持醫師進修的佐證。",
    variant: "info",
  },
  20: {
    content:
      "護理人員繼續教育管理模式類似醫師，但護理部門通常更容易建立集中管理機制。建議護理部建立繼續教育學分追蹤系統，並在年度護理部報告中呈現全院護理人員繼續教育達標率。院內辦理的護理研討會、技術研習等活動的核可學分紀錄需完整保存。",
    variant: "info",
  },
  21: {
    content:
      "志工管理制度需特別注意「不替代醫療專業人員」的界線。志工的服務範圍規定（如不得執行任何醫療行為、不得單獨照護病人等）需有書面規定，且志工實際了解並遵守。志工基本訓練紀錄（含感染管制、個資保護等）及定期督導紀錄需完整保存。",
    variant: "info",
  },
  22: {
    content:
      "人員資格審查中，背景查核（含性侵害、兒少虐待前科查詢）是近年評鑑重點。需確認所有人員（含志工）進用前均完成查核，並有書面紀錄。執照及證書的有效性追蹤需有系統化管理，避免出現執照過期仍在執業的情形，此為嚴重缺失。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "1.3 人力資源管理（醫院評鑑項目 13–22）",
  description:
    "醫院評鑑「人力資源管理」10 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/hospital/human-resources",
});

export default function HospitalHumanResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0 hover:bg-blue-500/20">
          1.3 人力資源管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">人力資源管理（項目 13–22）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本章共 10 個評鑑項目，涵蓋醫師、護理、醫事人員及行政人力配置，以及各類訓練、繼續教育與人員資格管理。
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
              <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
                {item.id}
              </span>
              <h2 id={`heading-${item.id}`} className="text-lg font-bold">{item.title}</h2>
              <span className="text-xs text-muted-foreground font-mono">{item.articleNumber}</span>
              {item.category === "必要" && (
                <Badge className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 border-0">必要</Badge>
              )}
              {item.category === "重點" && (
                <Badge className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0">重點</Badge>
              )}
              {item.category === "試評" && (
                <Badge variant="outline" className="text-xs">試評</Badge>
              )}
              {item.category === "可免評" && (
                <Badge variant="secondary" className="text-xs">可免評</Badge>
              )}
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
          href="/school/hospital/staff-support"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          1.2 員工管理
        </Link>
        <Link
          href="/school/hospital/medical-records"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          1.4 病歷資訊
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
