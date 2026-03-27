import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { elderlyWelfareProfile } from "@/lib/ai/evaluation-profiles/elderly-welfare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "C、安全環境設備（項目 47–62）｜老人福利機構評鑑",
  description:
    "老人福利機構評鑑「安全環境設備」16 項評鑑基準詳細說明：建築結構安全、消防設備維護、緊急疏散計畫、無障礙設施、寢室床位、冷暖空調、廚房衛生、公共區域安全等，含準備要訣。",
  keywords: [
    "老人福利機構安全環境",
    "老人機構消防安全評鑑",
    "老人機構建築設備評鑑",
    "115年度老人福利機構評鑑",
    "老人照顧機構設施評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/elderly-welfare/safety-environment" },
  openGraph: {
    title: "C、安全環境設備（項目 47–62）｜老人福利機構評鑑｜報告汪",
    description: "老人福利機構評鑑安全環境設備 16 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/elderly-welfare/safety-environment",
  },
};

const section = elderlyWelfareProfile.sections.find((s) => s.shortCode === "安")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  47: {
    content:
      "建築物安全相關文件（使用執照、消防安全檢查合格文件）需備齊且在有效期限內。若有租用場所，須確認建物所有人提供之相關文件，並確認機構使用範圍符合核准用途。",
    variant: "info",
  },
  48: {
    content:
      "消防設備需依規定定期委託合格廠商進行保養檢修，並有書面記錄。評鑑委員通常會實際查看滅火器是否在有效期限內、緊急照明及出口指示燈是否正常運作。",
    variant: "warning",
  },
  49: {
    content:
      "無障礙設施須符合老人及行動不便者的使用需求，包含扶手高度、地板防滑處理、輪椅通道寬度等。建議定期巡查並記錄設施維護狀況，發現問題即時修繕。",
    variant: "info",
  },
  51: {
    content:
      "緊急疏散計畫需包含明確的疏散路線圖並張貼於各樓層顯眼處。每年至少舉辦 2 次消防演練（包含夜間模擬），演練後需有書面記錄、評估及改善措施。",
    variant: "warning",
  },
  52: {
    content:
      "寢室空間需符合每人最低使用面積規定，且床位間距符合老人行動與護理操作需求。臥床住民床位需可調整高度，確認床欄功能正常。",
    variant: "info",
  },
  55: {
    content:
      "廚房設備衛生及食材管理須符合食品安全衛生相關規範，包含食材進出貨記錄、保存溫度管理（冷藏/冷凍）、廚工健康檢查記錄等，並定期進行環境清潔消毒。",
    variant: "info",
  },
  60: {
    content:
      "醫療廢棄物（如針頭、敷料等）須依規定分類收集，委託合格廠商清運，並有清運記錄。感染性廢棄物須單獨標示並上鎖存放，避免一般住民或訪客接觸。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "C、安全環境設備（老人福利機構評鑑基準項目 47–62）",
  description:
    "老人福利機構評鑑基準「安全環境設備」16 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/elderly-welfare/safety-environment",
});

export default function ElderlyWelfareSafetyEnvironmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 border-0 hover:bg-teal-500/20">
          C、安全環境設備
        </Badge>
        <h1 className="text-2xl font-bold mb-3">安全環境設備（項目 47–62）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 16 個評鑑項目（占分 25%），涵蓋老人福利機構的硬體設施安全，從建築結構、消防設備、無障礙設施到廚房衛生管理。
          評鑑委員通常會進行現場實地查核，確認設施維護狀況是否符合規定。
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
              <span className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center text-sm font-bold text-teal-600 dark:text-teal-400 font-mono">
                {item.id}
              </span>
              <h2 className="text-lg font-bold">{item.title}</h2>
              <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
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
          href="/school/elderly-welfare/professional-quality"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          B、專業照護品質
        </Link>
        <Link
          href="/school/elderly-welfare/client-rights"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          D、個案權益保障
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
