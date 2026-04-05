import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { youthCareProfile } from "@/lib/ai/evaluation-profiles/youth-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "行政組織與經營管理（項目 1–6）｜兒少安置機構評鑑",
  description:
    "112年度兒少安置機構評鑑：壹、行政組織與經營管理（10分），共6項基準，包含董事會功能與運作、機構行政組織運作、員工手冊及人事制度、人員資格與人數、訓練進修、勞動條件完整說明與準備要訣。",
  keywords: [
    "兒少安置機構評鑑",
    "兒童及少年安置機構行政管理",
    "112年度評鑑",
    "安置機構董事會評鑑",
    "兒少機構人力資源評鑑",
    "安置機構勞動條件評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/youth-care/administration" },
  openGraph: {
    title: "行政組織與經營管理（項目 1–6）｜兒少安置機構評鑑｜報告汪",
    description: "兒少安置機構評鑑壹、行政組織與經營管理6項基準完整解說，掌握董事會功能、人力資源、勞動條件評鑑要點。",
    url: "https://reportwang.com/school/youth-care/administration",
  },
};

const section = youthCareProfile.sections[0];

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  1: {
    content: "董(理)事會議紀錄是最重要的佐證文件。依財團法人法第43條規定，每次召開董事會應有完整議事紀錄。評鑑委員特別注意：(1)年度決算書、業務執行書是否確實提董事會審議；(2)董事改選或改聘是否函報主管機關並取得備查公文；(3)非財團法人機構（如公立機構）不適用本項部分基準。",
    variant: "warning",
  },
  2: {
    content: "資訊系統填報是112年度新增的重點（配分1分）。確認機構已建置衛福部社會及家庭署「全國兒少安置及追蹤管理系統」，且院生名冊與系統資料一致。各項報表（院童動態表、季報表、年度業務報告等）需於主管機關規定時數內完成填報，建議建立內部填報時程表。",
    variant: "warning",
  },
  3: {
    content: "員工手冊及人事制度共5個子項各0.4分，每項均需有制度並確實執行。特別注意：(1)差勤管理及代理人制度需有「落實工作交接」的執行紀錄；(2)員工申訴制度需涵蓋性騷擾、性侵害防治及性別工作平等保障措施；(3)薪資管理制度需有薪資給付相關紀錄。",
    variant: "neutral",
  },
  4: {
    content: "本項由主管機關依輔導查核情形評分。機構需特別注意人員流動率的計算與控管：流動率20%以下為「優」、21%-30%為「可」、超過31%為「待加強」。建議建立久任獎勵制度（如年資獎金、訓練補助等）以爭取0.5加分。專任人員切結書需確實簽署。",
    variant: "info",
  },
  5: {
    content: "訓練進修由主管機關依輔導查核情形評分。重點確認：(1)所有專業人員每年均完成「兒童及少年福利機構專業人員資格及訓練辦法」規定之訓練時數；(2)主管、社工、生輔員、保育員、托育員、心輔員等全員每年完成性侵害防治相關課程，需保存參加人員及課程清冊。",
    variant: "info",
  },
  6: {
    content: "勞動條件由主管機關依輔導查核情形評分。本項涵蓋107年至112年的累積查核，每年均需符合規定。確認機構無違反勞動基準法、性別工作平等法、勞退條例等勞動法規的裁罰紀錄。如曾有缺失應確實改善並保存改善紀錄。",
    variant: "neutral",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "兒少安置機構評鑑：壹、行政組織與經營管理",
  description: "112年度兒少安置機構評鑑行政組織與經營管理6項基準完整解說，包含董事會功能、行政組織運作、員工手冊、人員資格、訓練進修及勞動條件。",
  path: "/school/youth-care/administration",
});

export default function YouthCareAdministrationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20">
            {section.shortCode}
          </Badge>
          <span className="text-sm text-muted-foreground">項目 1–6・10分</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{section.name}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共6項基準（10分），涵蓋行政組織機能與運作（4分）及人力資源（6分）兩大面向。
          其中項目4至6標示「*」者由主管機關依輔導查核情形評分，機構需積極配合主管機關的輔導查核並確實改善缺失。
        </p>
      </div>

      {/* 子區塊說明 */}
      <div className="mb-6 grid sm:grid-cols-2 gap-3">
        <div className="rounded-lg border bg-orange-500/5 p-3">
          <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">一、行政組織機能與運作（4分）</p>
          <p className="text-xs text-muted-foreground">項目1：董(理)事會功能與運作（2分）、項目2：機構行政組織架構與業務運作（2分）</p>
        </div>
        <div className="rounded-lg border bg-orange-500/5 p-3">
          <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">二、人力資源（6分）</p>
          <p className="text-xs text-muted-foreground">項目3：員工手冊及人事制度（2分）、項目4：人員資格與人數（2分）*、項目5：訓練進修（1分）*、項目6：勞動條件（1分）*</p>
        </div>
      </div>

      {/* Mini TOC */}
      <div className="mb-8 rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">本頁項目</p>
        <div className="flex flex-wrap gap-2">
          {section.items.map((item) => (
            <a
              key={item.id}
              href={`#item-${item.id}`}
              className="text-xs px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 transition-colors"
            >
              {item.id}. {item.title}
            </a>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="space-y-10">
        {section.items.map((item) => (
          <div key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-sm font-bold text-orange-600 dark:text-orange-400 font-mono shrink-0">
                {item.id}
              </span>
              <div className="flex-1">
                <h2 className="text-lg font-semibold leading-snug">{item.title}</h2>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
                  {"score" in item && (
                    <Badge variant="secondary" className="text-xs">{item.score}分</Badge>
                  )}
                  {"note" in item && item.note && (
                    <Badge variant="outline" className="text-xs text-amber-600 border-amber-400">
                      主管機關評分
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="ml-11">
              <p className="text-xs text-muted-foreground mb-2 font-medium">評鑑基準：</p>
              <ol className="space-y-1.5 list-decimal list-inside mb-4">
                {item.criteria.map((c, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                    {c}
                  </li>
                ))}
              </ol>

              {tips[item.id] && (
                <DocsTip variant={tips[item.id].variant ?? "neutral"}>
                  {tips[item.id].content}
                </DocsTip>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/youth-care"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          評鑑基準總覽
        </Link>
        <Link
          href="/school/youth-care/environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          貳、建築物環境及設施設備
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
