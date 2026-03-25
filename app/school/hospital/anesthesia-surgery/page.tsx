import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { hospitalProfile } from "@/lib/ai/evaluation-profiles/hospital";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "2.6 麻醉與手術（項目 99–107）｜醫院評鑑小教室",
  description:
    "醫院評鑑「麻醉與手術」9 項評鑑項目詳細說明：手術安全查核、麻醉前評估、麻醉作業管理、手術室安全、術後照護、術後疼痛管理及手術器械管理。",
  keywords: [
    "醫院評鑑麻醉手術",
    "醫院評鑑手術安全查核",
    "醫院評鑑TIME OUT",
    "醫院評鑑麻醉前評估",
    "醫院評鑑",
    "區域醫院評鑑",
    "地區醫院評鑑",
    "評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/hospital/anesthesia-surgery" },
  openGraph: {
    title: "2.6 麻醉與手術（項目 99–107）｜醫院評鑑小教室｜報告汪",
    description: "醫院評鑑麻醉與手術區塊 9 項評鑑項目詳細說明與準備要訣。",
    url: "https://reportwang.com/school/hospital/anesthesia-surgery",
  },
};

const section = (() => {
  const s = hospitalProfile.sections.find((s) => s.shortCode === "2.6");
  if (!s) throw new Error("hospitalProfile: section 2.6 not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  99: {
    content:
      "手術安全查核為必要條文，是手術照護最關鍵的查核項目。評鑑委員通常要求查閱手術查核表紀錄，並訪談手術室人員。確認 Time Out 由所有在場人員共同執行，且執行過程有書面記錄。",
    variant: "warning",
  },
  100: {
    content:
      "麻醉前評估為必要條文。擇期手術病人的麻醉前評估紀錄必須在手術前完成，確認 ASA 分級紀錄清楚，高風險病人有特殊說明，知情同意書由麻醉科醫師親自取得。",
    variant: "warning",
  },
  101: {
    content:
      "麻醉作業管理為必要條文。評鑑重點包含麻醉機定期保養校正紀錄、困難插管推車內容物清單及定期查核紀錄，確保緊急應變設備隨時可用。",
    variant: "warning",
  },
  102: {
    content:
      "手術室安全管理為重點條文。器械及海棉針計點需有書面紀錄，計點結果不符時需有標準化處理流程。手術室潔淨度監測紀錄應定期保存備查。",
    variant: "info",
  },
  103: {
    content:
      "術後照護作業為重點條文。恢復室的護病比與設備（如脈搏血氧計、心電監測）需符合規定，病人轉出標準（Aldrete score 或等效評估工具）需書面化，並有執行紀錄。",
    variant: "info",
  },
  104: {
    content:
      "術後疼痛管理為一般條文。雖非重點，建議建立標準化術後疼痛評估流程，評估結果及用藥調整有書面記錄，可展現照護品質的主動管理態度。",
    variant: "info",
  },
  105: {
    content:
      "日間手術管理為一般條文。若有日間手術服務，確認病人選擇標準有書面規定，出院指示單內容完整（含緊急聯絡方式），並有病人確認簽收紀錄。",
    variant: "info",
  },
  106: {
    content:
      "緊急手術應變為一般條文。建議訂定緊急手術啟動 SOP，並定期進行演練，「到刀時間」等品質指標的監測數據可作為持續改善的依據。",
    variant: "info",
  },
  107: {
    content:
      "手術器械及耗材管理為重點條文。植入物批號追蹤紀錄是評鑑常見查核項目，確認系統化追蹤機制完善。消毒供應中心的滅菌監測（生物指標、化學指標）紀錄需完整保存。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "2.6 麻醉與手術（醫院評鑑基準項目 99–107）",
  description:
    "醫院評鑑基準「麻醉與手術」9 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/hospital/anesthesia-surgery",
});

export default function HospitalAnesthesiaSurgeryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-0 hover:bg-fuchsia-500/20">
          2.6 麻醉與手術
        </Badge>
        <h1 className="text-2xl font-bold mb-3">麻醉與手術（項目 99–107）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本章共 9 個評鑑項目，涵蓋手術安全查核、麻醉前評估、麻醉作業管理、手術室安全、術後照護、術後疼痛管理及手術器械管理。
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
              <span className="w-8 h-8 rounded-full bg-fuchsia-500/10 flex items-center justify-center text-sm font-bold text-fuchsia-600 dark:text-fuchsia-400 font-mono">
                {item.id}
              </span>
              <span className="text-xs text-muted-foreground font-mono">{item.articleNumber}</span>
              <h2 id={`heading-${item.id}`} className="text-lg font-bold">{item.title}</h2>
              <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
              <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
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
          href="/school/hospital/medication-safety"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          2.5 用藥安全
        </Link>
        <Link
          href="/school/hospital/infection-control"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          2.7 感染管制
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
