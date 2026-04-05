import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { youthCareProfile } from "@/lib/ai/evaluation-profiles/youth-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "特殊事項或措施（項目 30–35）｜兒少安置機構評鑑",
  description:
    "112年度兒少安置機構評鑑：伍、特殊事項或措施（含創新服務方案）（±10分），含違規事件扣分（最高-10分）及多項加分項目（最高+10分），包含收容多元加分、服務學習、社工薪資標準、COVID防疫措施、其他創新服務完整說明。",
  keywords: [
    "兒少安置機構評鑑",
    "安置機構特殊事項評鑑",
    "112年度評鑑加分",
    "安置機構創新服務",
    "兒少機構違規扣分",
    "社工薪資標準加分",
  ],
  alternates: { canonical: "https://reportwang.com/school/youth-care/innovation" },
  openGraph: {
    title: "特殊事項或措施（項目 30–35）｜兒少安置機構評鑑｜報告汪",
    description: "兒少安置機構評鑑伍、特殊事項或措施（±10分）完整說明，涵蓋違規扣分項目及多項加分機制，掌握評鑑加分關鍵。",
    url: "https://reportwang.com/school/youth-care/innovation",
  },
};

const section = youthCareProfile.sections[4];

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  30: {
    content: "違規事件扣分是唯一的扣分機制，以發生案件數計算，最高扣10分。「不當對待安置個案」和「未如期通報兒少保案件」是最常見的扣分原因。機構應建立完整的通報機制，確保所有工作人員熟知法規義務（兒少法第49條、53條），一旦發生事件應依規定通報，不可隱匿或延誤。",
    variant: "warning",
  },
  31: {
    content: "收容個案樣態多元是最高加分項（最高+4分）。「特殊需求兒少」通常包含身心障礙、重大疾病、愛滋等特殊需求個案。機構需準備：(1)院生名冊證明特殊需求兒少人數；(2)為這些個案特別開發的資源及服務說明文件（如特殊治療資源、專業合作等）。",
    variant: "info",
  },
  32: {
    content: "服務學習及志願服務加分（最高+1分）：需由機構列舉具體說明安置兒少參與服務學習的成果，可包含社區服務、跨代融合活動、弱勢族群協助等。建議準備：活動照片、參與人數、服務紀錄，以及兒少的學習反思。",
    variant: "neutral",
  },
  33: {
    content: "社工薪資符合衛福部標準（最高+1分）：需提供社工之勞保投保清冊及薪資匯款清單佐證。薪資標準依衛福部108年10月15日衛部數字第1081369577號函頒之規定。機構如有多名社工，需全部均符合標準才能申請加分。",
    variant: "info",
  },
  34: {
    content: "COVID-19防疫措施加分（最高+3分）：分4個子項，共可累積3分。重點是完整的應變計畫文件及施打率數據。施打率需達到規定門檻（兒少1-2劑達8成、工作人員1-3劑達9成、追加劑達6成），建議準備完整的施打統計資料。",
    variant: "neutral",
  },
  35: {
    content: "其他創新服務（最高+1分）需同時符合4項條件：有完整規劃、確實執行、具有成效、且賡續推廣。評鑑委員透過討論議決，因此創新亮點的說明文件準備非常重要。建議整理一份清晰的創新服務說明文件，涵蓋創新動機、執行歷程、量化成效及未來推廣計畫。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "兒少安置機構評鑑：伍、特殊事項或措施（含創新服務方案）",
  description: "112年度兒少安置機構評鑑特殊事項或措施說明，含違規扣分及多項加分機制，最高可影響分數達±10分。",
  path: "/school/youth-care/innovation",
});

export default function YouthCareInnovationPage() {
  // 扣分項與加分項分開呈現
  const deductItem = section.items.find((item) => item.id === 30);
  const bonusItems = section.items.filter((item) => item.id !== 30);

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
          <span className="text-sm text-muted-foreground">項目 30–35・±10分</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{section.name}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊由扣分項（最高扣10分）及加分項（最高加10分）組成。違規事件將影響整體評等，而多項加分機制可提升機構得分，充分準備可爭取±10分的分數差距。
        </p>
      </div>

      {/* 概覽 */}
      <div className="mb-8 grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4">
          <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">扣分項目</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">-10分</span>
            <span className="text-xs text-muted-foreground">最高扣分</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">違反兒少法相關情事（依案件數計）</p>
        </div>
        <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4">
          <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">加分項目</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {[
              { label: "收容多元", score: "+4" },
              { label: "服務學習", score: "+1" },
              { label: "社工薪資", score: "+1" },
              { label: "COVID防疫", score: "+3" },
              { label: "創新服務", score: "+1" },
            ].map((item) => (
              <span key={item.label} className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                {item.label} {item.score}
              </span>
            ))}
          </div>
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
              className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                item.id === 30
                  ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20"
                  : "bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20"
              }`}
            >
              {item.id}. {item.title.length > 14 ? item.title.slice(0, 14) + "…" : item.title}
            </a>
          ))}
        </div>
      </div>

      {/* 扣分項 */}
      <div className="mb-10">
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400">扣分</span>
          違規事件扣分項
        </h2>
        {deductItem && (
          <div id={`item-${deductItem.id}`} className="scroll-mt-20">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-sm font-bold text-red-600 dark:text-red-400 font-mono shrink-0">
                {deductItem.id}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold leading-snug">{deductItem.title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <Badge variant="outline" className="text-xs">{deductItem.responsible}</Badge>
                  <Badge variant="destructive" className="text-xs">最高扣10分</Badge>
                </div>
              </div>
            </div>
            <div className="ml-11">
              <p className="text-xs text-muted-foreground mb-2 font-medium">扣分情形：</p>
              <ol className="space-y-1.5 list-decimal list-inside mb-4">
                {deductItem.criteria.map((c, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed">{c}</li>
                ))}
              </ol>
              {tips[deductItem.id] && (
                <DocsTip variant={tips[deductItem.id].variant ?? "neutral"}>
                  {tips[deductItem.id].content}
                </DocsTip>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 加分項 */}
      <div>
        <h2 className="text-base font-semibold mb-6 flex items-center gap-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">加分</span>
          創新服務與特殊事項加分項
        </h2>
        <div className="space-y-10">
          {bonusItems.map((item) => (
            <div key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
              <div className="flex items-start gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400 font-mono shrink-0">
                  {item.id}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
                    {"score" in item && (
                      <Badge className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20">
                        最高+{(item as { score: number }).score}分
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="ml-11">
                <p className="text-xs text-muted-foreground mb-2 font-medium">加分條件：</p>
                <ol className="space-y-1.5 list-decimal list-inside mb-4">
                  {item.criteria.map((c, i) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed">{c}</li>
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
      </div>

      {/* 評鑑等第說明 */}
      <div className="mt-10 rounded-xl border bg-card p-5">
        <h3 className="text-sm font-semibold mb-3">評鑑等第參考標準</h3>
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
          href="/school/youth-care/finance"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          肆、財務管理
        </Link>
      </div>
    </>
  );
}
