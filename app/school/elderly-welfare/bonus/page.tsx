import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { elderlyWelfareProfile } from "@/lib/ai/evaluation-profiles/elderly-welfare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "F、加分題（項目 75–77）｜老人福利機構評鑑",
  description:
    "老人福利機構評鑑「加分題」3 項評鑑基準詳細說明：人才培育（留才計畫、薪資待遇提升）、智慧照護（輔助科技、資訊系統應用）、在地安老服務（社區整合、多元服務輸出），含準備要訣。",
  keywords: [
    "老人福利機構評鑑加分題",
    "老人機構人才培育評鑑",
    "老人機構智慧照護",
    "老人福利機構在地安老",
    "115年度老人福利機構評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/elderly-welfare/bonus" },
  openGraph: {
    title: "F、加分題（項目 75–77）｜老人福利機構評鑑｜報告汪",
    description: "老人福利機構評鑑加分題 3 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/elderly-welfare/bonus",
  },
};

const section = elderlyWelfareProfile.sections.find((s) => s.shortCode === "加")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  75: {
    content:
      "人才培育計畫需有具體的薪資結構說明、晉升制度及留才措施。若機構有提供額外福利（如住宿補貼、學費補助、員工認股等），需有書面制度並有實際執行佐證，以展現機構對長期人才投資的重視。",
    variant: "info",
  },
  76: {
    content:
      "智慧照護應用需有具體的導入成效說明，而非僅展示設備存在。建議準備使用前後的比較數據（如護理工作效率提升、住民安全事件減少等），說明科技如何真實改善照護品質。",
    variant: "info",
  },
  77: {
    content:
      "在地安老服務需有具體的社區服務紀錄，包含服務人次、服務類型及服務範圍，展現機構如何將資源延伸至社區。與其他機構或醫療院所的合作協議書可作為重要佐證。",
    variant: "neutral",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "F、加分題（老人福利機構評鑑基準項目 75–77）",
  description:
    "老人福利機構評鑑基準「加分題」3 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/elderly-welfare/bonus",
});

export default function ElderlyWelfareBonusPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-0 hover:bg-purple-500/20">
          F、加分題
        </Badge>
        <h1 className="text-2xl font-bold mb-3">加分題（項目 75–77）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          加分題共 3 個項目（最高加 2 分），評鑑機構在人才培育、智慧照護與在地安老服務上的卓越表現。
          加分題雖非必要項目，但能有效提升機構整體評鑑成績，展現機構的前瞻視野。
        </p>
      </div>

      {/* Mini TOC */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          本頁內容
        </p>
        <ul className="grid grid-cols-1 gap-1">
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
              <span className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400 font-mono">
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
      <div className="mt-12 flex items-center justify-start border-t pt-6">
        <Link
          href="/school/elderly-welfare/innovation"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          E、服務改進創新
        </Link>
      </div>
    </>
  );
}
