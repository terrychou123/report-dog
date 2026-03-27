import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { youthCareProfile } from "@/lib/ai/evaluation-profiles/youth-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "服務創新（加分題）（項目 28）｜兒少教養機構評鑑",
  description:
    "111年度兒少教養機構聯合評鑑：伍、服務創新加分題（3分），評估機構服務或營運是否有發展性、突破性或創造性，包含完整規劃、確實執行、具體成效及賡續推廣4項條件。",
  keywords: [
    "兒少教養機構評鑑",
    "安置機構服務創新評鑑",
    "111年度聯合評鑑加分題",
    "教養機構創新服務",
    "兒少機構優等加分",
  ],
  alternates: { canonical: "https://reportwang.com/school/youth-care/innovation" },
  openGraph: {
    title: "服務創新（加分題）（項目 28）｜兒少教養機構評鑑｜報告汪",
    description: "兒少教養機構評鑑伍、服務創新加分題完整解說，掌握如何展現機構創新亮點爭取加分。",
    url: "https://reportwang.com/school/youth-care/innovation",
  },
};

const section = youthCareProfile.sections[4];

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  28: {
    content: "服務創新加分題需同時符合4項條件：有完整規劃、確實執行、具有成效、且賡續推廣。評鑑委員透過討論決議是否列為優等或甲等，因此創新亮點的簡報呈現和佐證文件的準備非常重要。建議整理一份清晰的創新服務說明文件，涵蓋創新動機、執行歷程、量化成效及未來推廣計畫。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "兒少教養機構評鑑：伍、服務創新（加分題）",
  description: "111年度兒少教養機構聯合評鑑服務創新加分題說明，評估機構服務或營運的發展性、突破性或創造性。",
  path: "/school/youth-care/innovation",
});

export default function YouthCareInnovationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20">
            {section.shortCode}
          </Badge>
          <span className="text-sm text-muted-foreground">加分題 · 項目 28</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{section.name}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊為加分題，共1項基準（3分）。機構相較於以往的服務或營運有明顯發展性、突破性或創造性，且符合完整規劃、確實執行、具有成效、賡續推廣4項條件，由評鑑人員共同討論議決是否予以加分。
        </p>
      </div>

      {/* Important note */}
      <div className="mb-6 rounded-lg bg-purple-500/10 border border-purple-500/20 p-4">
        <p className="text-sm text-purple-700 dark:text-purple-400 font-medium">
          評分方式說明
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          服務創新（加分題）及是否列為優等、甲等，由實地評鑑人員共同討論議決。機構應在評鑑當天主動向委員說明創新服務亮點並提供完整佐證文件。
        </p>
      </div>

      {/* Items */}
      <div className="space-y-10">
        {section.items.map((item) => (
          <div key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400 font-mono shrink-0">
                {item.id}
              </span>
              <div className="flex-1">
                <h2 className="text-lg font-semibold leading-snug">{item.title}</h2>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
                  <Badge variant="secondary" className="text-xs">加分題（3分）</Badge>
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

              {/* 創新服務示例 */}
              <div className="mb-4 rounded-lg border bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">創新服務類型示例</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "營運模式創新（如混齡安置、社區融合模式）",
                    "服務策略之創新（如創傷知情照顧TIC實踐）",
                    "專業服務之研發（如自行開發評估工具）",
                    "開發資源的創新策略（如跨域資源連結）",
                    "科技應用創新（如數位化個案管理系統）",
                    "族群文化回應式照顧服務設計",
                  ].map((example) => (
                    <div
                      key={example}
                      className="text-xs text-muted-foreground bg-card rounded p-2.5 border"
                    >
                      {example}
                    </div>
                  ))}
                </div>
              </div>

              {tips[item.id] && (
                <DocsTip variant={tips[item.id].variant ?? "neutral"}>
                  {tips[item.id].content}
                </DocsTip>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 評等條件說明 */}
      <div className="mt-8 rounded-xl border bg-card p-5">
        <h3 className="text-sm font-semibold mb-3">評鑑等第標準</h3>
        <div className="grid sm:grid-cols-5 gap-2">
          {[
            { grade: "優等", score: "90分以上" },
            { grade: "甲等", score: "80–89分" },
            { grade: "乙等", score: "70–79分" },
            { grade: "丙等", score: "60–69分" },
            { grade: "丁等", score: "60分以下" },
          ].map((g) => (
            <div key={g.grade} className="text-center rounded-lg bg-muted/40 p-2.5">
              <div className="text-sm font-bold">{g.grade}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{g.score}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          ⚠ 各評鑑大項目分數未達各該項最高分數之80%者，不得列為優等；未達70%者，不得列為甲等。丙等、丁等者，一律辦理複評。
        </p>
      </div>

      {/* Prev */}
      <div className="mt-12 flex items-center border-t pt-6">
        <Link
          href="/school/youth-care/rights"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          肆、權益保障
        </Link>
      </div>
    </>
  );
}
