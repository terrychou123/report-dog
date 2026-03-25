import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { hospitalProfile } from "@/lib/ai/evaluation-profiles/hospital";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "2.8 檢驗、病理與放射作業（項目 111–124）｜醫院評鑑小教室",
  description:
    "醫院評鑑「檢驗、病理與放射作業」14 項評鑑項目詳細說明：檢驗品質管理、血液銀行、微生物檢驗、病理組織、細胞病理、放射作業及醫學影像資訊管理。",
  keywords: [
    "醫院評鑑檢驗病理",
    "醫院評鑑放射作業",
    "醫院評鑑血液銀行",
    "醫院評鑑PACS",
    "醫院評鑑",
    "區域醫院評鑑",
    "地區醫院評鑑",
    "評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/hospital/lab-pathology" },
  openGraph: {
    title: "2.8 檢驗、病理與放射作業（項目 111–124）｜醫院評鑑小教室｜報告汪",
    description: "醫院評鑑檢驗、病理與放射作業區塊 14 項評鑑項目詳細說明與準備要訣。",
    url: "https://reportwang.com/school/hospital/lab-pathology",
  },
};

const section = (() => {
  const s = hospitalProfile.sections.find((s) => s.shortCode === "2.8");
  if (!s) throw new Error("hospitalProfile: section 2.8 not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  111: {
    content:
      "檢驗品質管理為重點條文。確認內部品管（QC）每日執行有紀錄，且定期參加外部能力試驗（如 PT/EQA）並有成績紀錄。危急值通報流程須書面化，並有實際通報案例的追蹤紀錄。",
    variant: "warning",
  },
  112: {
    content:
      "緊急檢驗作業為一般條文。建議統計近期緊急檢驗報告時效（TAT）達成率，若有未達標情形，應有改善計畫。全天候服務的人力排班紀錄需備妥。",
    variant: "info",
  },
  113: {
    content:
      "血液銀行作業為重點條文。血品儲存溫度需持續監控並有溫度記錄曲線，警示設備（如溫度異常警報）需實際可用。廢棄血品的處理紀錄及委外銷毀單據需完整保存。",
    variant: "warning",
  },
  114: {
    content:
      "微生物檢驗為一般條文。多重抗藥性菌（如 MRSA、CRE）的及時通報流程是查核重點，確認與感染管制單位的通報連結機制清楚，並有通報紀錄可查。",
    variant: "info",
  },
  115: {
    content:
      "病理組織檢查為重點條文。病理標本的採集、容器標示及運送規範需書面化，確認緊急術中冷凍切片的報告時效符合規定，報告格式符合相關學會規範。",
    variant: "warning",
  },
  116: {
    content:
      "細胞病理學為一般條文。子宮頸抹片等細胞學檢查的品管機制（如陽性率監測、判讀一致性評核）需有紀錄，使用標準分類系統（如 Bethesda System）有助於展現品質管理水準。",
    variant: "info",
  },
  117: {
    content:
      "解剖病理作業為可免評條文。若有執行屍體解剖，確認符合相關法規（如須有家屬同意）及醫學倫理規範，解剖結果有書面記錄。",
    variant: "info",
  },
  118: {
    content:
      "一般放射作業為重點條文。放射師執照與執業登記的有效性是基本要求。工作人員個人劑量計（TLD）佩戴紀錄及年度輻射劑量報告需完整，X 光室鉛板屏蔽的定期檢驗紀錄需備查。",
    variant: "warning",
  },
  119: {
    content:
      "電腦斷層作業為重點條文。CT 顯影劑過敏反應的緊急應變車（含腎上腺素等急救藥品）需配備完整，使用前腎功能篩選紀錄需可查核。輻射劑量最適化（如 ALARA 原則）的執行紀錄建議保存。",
    variant: "warning",
  },
  120: {
    content:
      "磁振造影作業為重點條文。MRI 安全篩選問卷的確實執行是必要的，特別注意植入心臟節律器或金屬植入物的病人。磁場緊急停機（quench）的應變程序需書面化，且工作人員熟知。",
    variant: "warning",
  },
  121: {
    content:
      "超音波作業為一般條文。超音波操作人員訓練紀錄及相關認證（如有）需備妥，設備定期保養校正紀錄有助於展現品質管理。",
    variant: "info",
  },
  122: {
    content:
      "血管攝影作業為可免評條文。若有提供介入性放射服務，手術安全查核（包含病人確認、手術部位確認）及輻射防護措施的落實記錄是查核重點。",
    variant: "info",
  },
  123: {
    content:
      "放射治療品質管理為可免評條文。若有提供放射治療，設備日校正、月校正及年校正紀錄，以及治療計畫的獨立驗證紀錄，是評鑑委員的重點查核項目。",
    variant: "info",
  },
  124: {
    content:
      "醫學影像資訊管理為重點條文。PACS 系統的備份機制及還原測試紀錄需定期執行，影像保存年限符合法規規定（門診 7 年、住院 10 年），存取管控記錄完整。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "2.8 檢驗、病理與放射作業（醫院評鑑基準項目 111–124）",
  description:
    "醫院評鑑基準「檢驗、病理與放射作業」14 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/hospital/lab-pathology",
});

export default function HospitalLabPathologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-lime-500/10 text-lime-600 dark:text-lime-400 border-0 hover:bg-lime-500/20">
          2.8 檢驗、病理與放射作業
        </Badge>
        <h1 className="text-2xl font-bold mb-3">檢驗、病理與放射作業（項目 111–124）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本章共 14 個評鑑項目，涵蓋檢驗品質管理、血液銀行、微生物檢驗、病理組織、細胞病理、放射作業及醫學影像資訊管理。
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
              <span className="w-8 h-8 rounded-full bg-lime-500/10 flex items-center justify-center text-sm font-bold text-lime-600 dark:text-lime-400 font-mono">
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
          href="/school/hospital/infection-control"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          2.7 感染管制
        </Link>
        <Link
          href="/school/hospital"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回總覽
        </Link>
      </div>
    </>
  );
}
