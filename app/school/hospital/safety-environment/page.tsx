import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { hospitalProfile } from "@/lib/ai/evaluation-profiles/hospital";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "1.5 安全的環境與設備（項目 27–33）｜醫院評鑑小教室",
  description:
    "醫院評鑑「安全的環境與設備」7 項評鑑項目詳細說明：建築安全、消防管理、醫療設備、危險物品、緊急應變、環境清潔及廢棄物管理，含準備要訣。",
  keywords: [
    "醫院評鑑環境安全",
    "醫院消防評鑑",
    "醫院醫療設備管理",
    "醫院廢棄物管理",
    "醫院評鑑",
    "區域醫院評鑑",
    "地區醫院評鑑",
    "評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/hospital/safety-environment" },
  openGraph: {
    title: "1.5 安全的環境與設備（項目 27–33）｜醫院評鑑小教室｜報告汪",
    description: "醫院評鑑「安全的環境與設備」7 項評鑑項目詳細說明與準備要訣。",
    url: "https://reportwang.com/school/hospital/safety-environment",
  },
};

const section = (() => {
  const s = hospitalProfile.sections.find((s) => s.shortCode === "1.5");
  if (!s) throw new Error("hospitalProfile: section 1.5 not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  27: {
    content:
      "建築物安全是「重點」項目，合法使用執照及無障礙設施是基本門檻。評鑑前需確認使用執照有效且與實際用途相符（如加蓋或變更用途需有相應核准文件）。無障礙設施（坡道、廁所、電梯）需符合現行法規標準，且實際可正常使用。緊急備用電源（UPS 及緊急發電機）的定期測試紀錄需完整保存。",
    variant: "warning",
  },
  28: {
    content:
      "消防安全是「必要」項目，委員必定實地查核。重點準備：(1) 消防設備檢查維護紀錄（含每半年定期檢查報告）；(2) 近一年至少 2 次消防疏散演練紀錄（含 1 次夜間演練），需有照片及人員出席紀錄；(3) 各病房張貼最新逃生路線圖；(4) 臥床及行動不便病人疏散計畫（含輪椅、擔架及人力分配）。委員可能當場詢問員工疏散程序，需確保全員熟知。",
    variant: "warning",
  },
  29: {
    content:
      "醫療設備管理是「重點」項目。設備清冊需與實際設備一致（含序號、保固及維護狀態）。預防性維護計畫需呈現各類設備的維護週期及實際執行紀錄。高風險設備（呼吸器、電刀、除顫器等）的使用前安全查核表（Checklist）需有填寫紀錄。設備使用訓練紀錄需與設備清冊對應，確認所有操作人員均受過訓練。",
    variant: "warning",
  },
  30: {
    content:
      "危險物品管理是「重點」項目，委員通常會實地查看儲存區域。常見缺失：化學品標示不完整（缺中文標示或安全資料表）、壓縮氣體鋼瓶未固定、儲存區域未加鎖。建議事前完成危險物品清冊盤點，確認儲存條件符合規定，並將緊急應變程序（含洩漏、火災處置）以明顯圖表張貼於儲存區域旁。",
    variant: "warning",
  },
  31: {
    content:
      "緊急應變計畫是「重點」項目，需涵蓋各類災害情境（火災、地震、停電、大量傷患等）。計畫不能只是書面文件，需有定期演練紀錄並說明演練後的改善追蹤。指揮系統圖（含代理人）需張貼於明顯位置，讓員工隨時可查閱。與外部緊急救護體系（消防局、急救責任醫院）的聯繫機制需有書面協議或聯絡名冊。",
    variant: "warning",
  },
  32: {
    content:
      "環境清潔管理需呈現系統化執行而非一次性整理。各區域清潔頻率及清潔方法需有書面規定（如加護病房與一般走廊的清潔頻率不同）。清潔人員（含外包廠商）的感染管制訓練紀錄需完整。環境清潔稽核結果（含不合格項目）及改善追蹤紀錄是委員評估管理成效的重要依據。",
    variant: "info",
  },
  33: {
    content:
      "廢棄物管理是「重點」項目，委員通常實地查核廢棄物暫存區。常見缺失：醫療廢棄物與一般廢棄物混置、廢棄物暫存區未加鎖或未標示、委外處理廠商的合格證明過期。建議事前確認委外廠商的廢棄物清除許可仍有效，轉運聯單保存完整（至少 3 年），且暫存區域的廢棄物標示、分類容器及儲存條件符合規定。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "1.5 安全的環境與設備（醫院評鑑項目 27–33）",
  description:
    "醫院評鑑「安全的環境與設備」7 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/hospital/safety-environment",
});

export default function HospitalSafetyEnvironmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-0 hover:bg-indigo-500/20">
          1.5 安全的環境與設備
        </Badge>
        <h1 className="text-2xl font-bold mb-3">安全的環境與設備（項目 27–33）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本章共 7 個評鑑項目，涵蓋建築安全、消防管理、醫療設備、危險物品、緊急應變、環境清潔及廢棄物管理。
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
              <span className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-sm font-bold text-indigo-600 dark:text-indigo-400 font-mono">
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
          href="/school/hospital/medical-records"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          1.4 病歷資訊
        </Link>
        <Link
          href="/school/hospital/patient-services"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          1.6 病人服務
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
