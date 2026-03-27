import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { youthCareProfile } from "@/lib/ai/evaluation-profiles/youth-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "行政組織與經營管理（項目 1–10）｜兒少教養機構評鑑",
  description:
    "111年度兒少教養機構聯合評鑑：壹、行政組織與經營管理，共10項基準，包含董事會功能、業務計畫、危機管理、人力資源、財務管理等完整說明與準備要訣。",
  keywords: [
    "兒少教養機構評鑑",
    "兒童及少年安置教養機構行政管理",
    "111年度聯合評鑑",
    "教養機構董事會評鑑",
    "兒少機構財務評鑑",
    "安置機構人力資源評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/youth-care/administration" },
  openGraph: {
    title: "行政組織與經營管理（項目 1–10）｜兒少教養機構評鑑｜報告汪",
    description: "兒少教養機構評鑑壹、行政組織與經營管理10項基準完整解說，掌握董事會功能、業務計畫、財務管理評鑑要點。",
    url: "https://reportwang.com/school/youth-care/administration",
  },
};

const section = youthCareProfile.sections[0];

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  1: {
    content: "董事會議紀錄是最重要的佐證文件。每次開會後應確認有函報主管機關並取得備查公文字號。公立及非財團或社團法人機構不適用本項評鑑。",
    variant: "warning",
  },
  2: {
    content: "年度業務計畫應於「前1年度」訂定，法人機構須有董事會同意紀錄。評鑑委員會特別注意計畫是否確實執行且有績效記錄，不只是計畫書。中長程計畫需涵蓋3年以上。",
    variant: "info",
  },
  3: {
    content: "危機管理計畫需選擇至少3種風險類型制定計畫（天然災害、意外事件、公共安全事件等）。最關鍵的是要有事件「發生後的處理記錄」與「改善追蹤報告」，只有計畫但無執行記錄無法得高分。",
    variant: "warning",
  },
  4: {
    content: "員工手冊需涵蓋差假、福利、退休、績效考評及員工申訴等完整辦法。評鑑委員會抽查薪資給付是否依制度執行，建議保存薪資憑證及績效考評紀錄。",
    variant: "neutral",
  },
  5: {
    content: "本項由主管機關負責評分，機構無法直接操作。機構應配合主管機關輔導查核，確保專業人員進用符合「兒童及少年福利機構設置標準」第22條規定，如有缺失應即時改善。",
    variant: "info",
  },
  6: {
    content: "無勞基法、性平法、勞退條例裁罰記錄是基本要求。若曾有裁罰應備齊改善文件。本項由評鑑人員負責，但需主管機關配合提供查核資料。",
    variant: "neutral",
  },
  7: {
    content: "會計制度由會計評鑑人員（非一般評鑑委員）負責審查。需備妥：經主管機關備查之會計制度、銀行存摺及對帳單、帳簿傳票憑證等原始記帳憑證。政府補助款及指定用途捐款必須專戶管理。",
    variant: "warning",
  },
  8: {
    content: "目的事業支出占總支出比例需達70%以上（108至111年度平均），這是財務報告評鑑的關鍵指標。法人機構需有董事會決議財務報表的相關紀錄，並函報主管機關備查。",
    variant: "info",
  },
  9: {
    content: "會計與出納需有明確分工，印鑑應由不同人員分別保管。現金支出每筆超過1萬元者，必須以劃線記名支票或匯款支付，不得以現金支付。",
    variant: "warning",
  },
  10: {
    content: "捐款收據需連號印製且序時開立（不可跳號）。受贈財物須辦理公開徵信（網站、新聞紙或其他公開方式）。若有指定用途，必須確保用途符合捐贈者意願並有專簿記錄。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "兒少教養機構評鑑：壹、行政組織與經營管理",
  description: "111年度兒少教養機構聯合評鑑行政組織與經營管理10項基準完整解說，包含董事會功能、業務計畫、危機管理、人力資源及財務管理。",
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
          <span className="text-sm text-muted-foreground">項目 1–10</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{section.name}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共10項基準（25分），涵蓋董事會功能與經營理念、業務計畫擬訂與執行、危機風險管理、人力資源管理，以及財務管理四大面向。
          其中項目5「專業人員進用」由主管機關負責評分；項目7至10由會計評鑑人員負責審查。
        </p>
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
                  <Badge variant="secondary" className="text-xs">{item.reviewMethod.split("、")[0]}</Badge>
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
          貳、建築物環境與設施設備
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
