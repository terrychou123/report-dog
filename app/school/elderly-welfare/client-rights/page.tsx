import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { elderlyWelfareProfile } from "@/lib/ai/evaluation-profiles/elderly-welfare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "D、個案權益保障（項目 63–71）｜老人福利機構評鑑",
  description:
    "老人福利機構評鑑「個案權益保障」9 項評鑑基準詳細說明：服務資訊公開、服務契約訂定、個人資料保護、申訴機制、住民滿意度調查、住民自主參與、家庭聯繫及支持等，含準備要訣。",
  keywords: [
    "老人福利機構個案權益",
    "老人機構服務契約評鑑",
    "老人機構申訴機制",
    "老人福利機構住民滿意度",
    "115年度老人福利機構評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/elderly-welfare/client-rights" },
  openGraph: {
    title: "D、個案權益保障（項目 63–71）｜老人福利機構評鑑｜報告汪",
    description: "老人福利機構評鑑個案權益保障 9 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/elderly-welfare/client-rights",
  },
};

const section = elderlyWelfareProfile.sections.find((s) => s.shortCode === "權")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  63: {
    content:
      "服務資訊公開項目需涵蓋立案核准文件、收費標準、服務項目說明及評鑑結果等，並確認公開方式（機構官網、公告欄）資訊為最新版本，避免顯示過期費率或已變更的服務內容。",
    variant: "info",
  },
  64: {
    content:
      "服務契約須於住民入住前簽訂，並由住民本人或法定代理人簽章。契約內容需清楚說明服務項目、收費方式、終止條件及住民權利，且需每年審閱是否需要更新。",
    variant: "warning",
  },
  65: {
    content:
      "個人資料保護措施需包含資料蒐集同意書、資料存取權限管控及資料銷毀程序。電子檔案需有密碼保護，紙本資料需上鎖保存，並確認工作人員了解個資保護相關規定。",
    variant: "info",
  },
  66: {
    content:
      "申訴管道需多元（書面、口頭、電話），且須有獨立第三方受理機制，不能只由機構內部人員處理。每件申訴均需有受理記錄、處理過程及結果通知，並追蹤申訴人後續滿意度。",
    variant: "warning",
  },
  67: {
    content:
      "住民滿意度調查每年至少執行 1 次，採用匿名方式，確保住民能自由表達意見。調查結果需彙整分析，並訂定改善措施，以書面呈現改善成效，讓住民看見機構的進步。",
    variant: "info",
  },
  68: {
    content:
      "住民自主決策的記錄（如餐食選擇、活動參與意願、外出許可等）需有書面紀錄佐證。機構應確保住民的生活自主空間，避免過度保護或不必要的限制，並尊重住民個人的生活習慣。",
    variant: "neutral",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "D、個案權益保障（老人福利機構評鑑基準項目 63–71）",
  description:
    "老人福利機構評鑑基準「個案權益保障」9 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/elderly-welfare/client-rights",
});

export default function ElderlyWelfareClientRightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0 hover:bg-blue-500/20">
          D、個案權益保障
        </Badge>
        <h1 className="text-2xl font-bold mb-3">個案權益保障（項目 63–71）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 9 個評鑑項目（占分 13%），關注老人福利機構是否落實住民的基本權益保障，從資訊透明、契約保障、隱私保護到申訴機制與滿意度調查的執行情形。
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
              <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
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
          href="/school/elderly-welfare/safety-environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          C、安全環境設備
        </Link>
        <Link
          href="/school/elderly-welfare/innovation"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          E、服務改進創新
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
