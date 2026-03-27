import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { youthCareProfile } from "@/lib/ai/evaluation-profiles/youth-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "權益保障（項目 23–27）｜兒少教養機構評鑑",
  description:
    "111年度兒少教養機構聯合評鑑：肆、權益保障，共5項基準（18分），包含表意權、平等權、生命生存及發展權、隱私與保密權、受有效保護的權利完整評鑑說明與準備要訣。",
  keywords: [
    "兒少教養機構評鑑",
    "兒少權益保障評鑑",
    "111年度聯合評鑑",
    "安置兒少表意權",
    "兒少隱私保密評鑑",
    "受有效保護的權利",
    "兒少平等權評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/youth-care/rights" },
  openGraph: {
    title: "權益保障（項目 23–27）｜兒少教養機構評鑑｜報告汪",
    description: "兒少教養機構評鑑肆、權益保障5項基準完整解說，涵蓋表意權、平等權、發展權、隱私保密及受有效保護的權利。",
    url: "https://reportwang.com/school/youth-care/rights",
  },
};

const section = youthCareProfile.sections[3];

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  23: {
    content: "本項僅安置2歲以下嬰幼兒機構不適用。「獨立且具審查功能的申訴機制」是評鑑委員特別關注的重點，申訴機制需有獨立的審查功能（非機構內部人員自審），並有實際案件受理及處理記錄。兒少參與機構規定制定、個人事務決策的文件記錄非常重要。",
    variant: "warning",
  },
  24: {
    content: "本項評鑑重點在於「積極作為」而非「無差別對待聲明」。評鑑委員會詢問機構具體如何協助兒少克服學校歧視或職場不公平對待。如有實際案例，需備妥機構介入協助的紀錄。",
    variant: "info",
  },
  25: {
    content: "本項涵蓋兒少生活的8個面向，每個面向都需有具體執行紀錄。特別是「技能與專長培育」及「心理發展」兩項，需有具體的活動記錄和成效說明。醫療就診需有特定或固定醫療院所的就醫流程文件。",
    variant: "info",
  },
  26: {
    content: "寢室、廁所、浴室絕對不能有監看或錄影設備，評鑑委員會進行實地觀察確認。個案資料使用需有「資料使用同意書」及「肖像同意書」，且需有系統管理與使用者權限的相關規定文件。",
    variant: "warning",
  },
  27: {
    content: "本項部分由主管機關負責評分。「無違反兒童及少年福利與權益保障法第49條各款所定情事」是最重要的基準，若發生相關情事將無法列為優等或甲等。應確保所有工作人員熟知相關法規，並建立相應的防範機制。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "兒少教養機構評鑑：肆、權益保障",
  description: "111年度兒少教養機構聯合評鑑權益保障5項基準完整解說，包含表意權、平等權、生命生存及發展權、隱私與保密權及受有效保護的權利。",
  path: "/school/youth-care/rights",
});

export default function YouthCareRightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20">
            {section.shortCode}
          </Badge>
          <span className="text-sm text-muted-foreground">項目 23–27</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{section.name}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共5項基準（18分），以兒童最佳利益為核心，評估機構是否落實安置兒少的各項基本權利。評鑑委員特別重視機構是否有具體制度與執行記錄，而非僅有書面規定。
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
              className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20 transition-colors"
            >
              {item.id}. {item.title.length > 10 ? item.title.slice(0, 10) + "…" : item.title}
            </a>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="space-y-10">
        {section.items.map((item) => (
          <div key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400 font-mono shrink-0">
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
          href="/school/youth-care/professional"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          參、專業服務
        </Link>
        <Link
          href="/school/youth-care/innovation"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          伍、服務創新（加分題）
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
