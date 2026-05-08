import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { disabilityWelfareProfile, meta as disabilityWelfareMeta } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { disabilityWelfareTips } from "@/lib/evaluation-tips/disability-welfare";

export const metadata: Metadata = {
  title: "個別化服務計畫（指標 4101–4103）｜身心障礙福利機構評鑑｜109年度",
  description:
    "109年度身心障礙福利機構評鑑「個別化服務計畫」3 項指標（4101–4103）完整說明：個別化服務計畫（ISP）訂定、執行與評估機制，含當事人參與原則與計畫修正頻率要求。",
  keywords: [
    "身心障礙機構個別化服務計畫",
    "ISP評鑑",
    "身心障礙福利機構個別服務",
    "109年度身心障礙福利機構評鑑",
    "身心障礙個別化計畫評鑑",
    "身心障礙機構專業服務",
  ],
  alternates: {
    canonical: "https://reportwang.com/school/disability-welfare/individual-care",
  },
  openGraph: {
    title: "個別化服務計畫（4101–4103）｜身心障礙福利機構評鑑｜報告汪",
    description: "109年度身心障礙福利機構評鑑個別化服務計畫（ISP）3 項指標完整說明。",
    url: "https://reportwang.com/school/disability-welfare/individual-care",
  },
};

// 從 專 section 取出 items 32-34（個別化服務計畫 4101–4103）
const sectionZhuan = requireSection(disabilityWelfareProfile.sections, "專");
const ispItems = sectionZhuan.items.filter((i) => i.id >= 32 && i.id <= 34);
const section = { ...sectionZhuan, items: ispItems };

const tips = disabilityWelfareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "disability-welfare",
  subpage: "individual-care",
  section,
  name: "個別化服務計畫（109年度身心障礙福利機構評鑑指標 4101–4103）",
  description:
    "109年度身心障礙福利機構評鑑「個別化服務計畫」3 項指標完整說明，涵蓋 ISP 訂定、執行評估與當事人參與機制。",
  extraFaq: [
    {
      question: "個別化服務計畫（ISP）必須多久修訂一次？",
      answer:
        "依評鑑指標要求，ISP 需定期評估與修正，通常至少每年或依服務對象狀況改變時進行修訂。修訂過程需有當事人（或其監護人/家屬）的參與並留有記錄。",
    },
    {
      question: "ISP 必須包含哪些基本內容？",
      answer:
        "ISP 應包含：服務對象基本資料與評估結果、個別化服務目標、具體服務項目與頻率、執行人員、預期成效指標，以及定期評估記錄。計畫應由服務對象本人或其法定代理人參與訂定並簽名確認。",
    },
    {
      question: "評鑑時如何查核 ISP 執行情形？",
      answer:
        "評鑑委員會以「審閱書面資料＋現場訪談」方式查核，需備妥：全體服務對象的現行 ISP 文件、修訂記錄、執行進度追蹤表，及必要時的服務對象或家屬簽名確認文件。",
    },
  ],
});

export default function DisabilityWelfareIndividualCarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-0 hover:bg-purple-500/20">
          三、專業服務
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          個別化服務計畫（指標 4101–4103）
        </h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${disabilityWelfareMeta.year} 年度` },
            { label: "主管機關", value: disabilityWelfareMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={disabilityWelfareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          個別化服務計畫（ISP, Individualized Service Plan）是身心障礙福利機構評鑑「三、專業服務」的核心，
          共 3 項指標（項目 32–34），強調以服務對象為中心，落實個別化、參與式的服務規劃與評估。
        </p>
      </div>

      {/* Mini TOC */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">本頁指標</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {ispItems.map((item) => (
            <li key={item.id}>
              <a href={`#item-${item.id}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-background border flex items-center justify-center text-xs font-mono">{item.id}</span>
                <span className="truncate">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Items */}
      <div className="space-y-12">
        {ispItems.map((item) => (
          <section key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400 font-mono">
                {item.id}
              </span>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <Badge variant="outline" className="text-xs">{item.indicatorCode}</Badge>
              <Badge variant="secondary" className="text-xs">{item.score}分</Badge>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">評鑑標準</p>
              <ol className="space-y-1.5 list-none pl-0">
                {item.criteria.map((criterion, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-mono text-foreground">{i + 1}</span>
                    {criterion}
                  </li>
                ))}
              </ol>
            </div>

            {item.reviewBasis && (
              <div className="mb-4">
                <p className="text-sm font-semibold mb-1">評鑑實施方式：{item.reviewMethod}</p>
                <p className="text-xs text-muted-foreground">{item.reviewBasis}</p>
              </div>
            )}

            {item.note && (
              <div className="mb-4 rounded-md bg-muted/50 border p-3">
                <p className="text-xs text-muted-foreground whitespace-pre-line">📌 {item.note}</p>
              </div>
            )}

            {tips[item.id] && (
              <DocsTip variant={(tips[item.id].variant ?? "neutral") as DocsTipVariant} title="準備要訣">
                {tips[item.id].content}
              </DocsTip>
            )}
          </section>
        ))}
      </div>

      {/* Prev / Next */}
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link href="/school/disability-welfare/professional" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeftIcon className="h-4 w-4" />
          三、專業服務（全部）
        </Link>
        <Link href="/school/disability-welfare/health-management" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          健康管理與安全
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
