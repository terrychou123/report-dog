import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection } from "@/lib/school-jsonld";
import { disabilityWelfareProfile } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { disabilityWelfareTips } from "@/lib/evaluation-tips/disability-welfare";

export const metadata: Metadata = {
  title: "健康管理與安全（指標 4301–4306）｜身心障礙福利機構評鑑｜109年度",
  description:
    "109年度身心障礙福利機構評鑑「健康管理與安全」6 項指標（4301–4306）完整說明：護理人員健康管理、緊急事件處理、安全保護措施、膳食服務衛生等，含評鑑查核重點與準備要訣。",
  keywords: [
    "身心障礙機構健康管理評鑑",
    "身心障礙機構護理人員評鑑",
    "身心障礙機構緊急事件處理",
    "109年度身心障礙福利機構評鑑",
    "身心障礙機構安全保護",
    "身心障礙機構膳食服務",
  ],
  alternates: {
    canonical: "https://reportwang.com/school/disability-welfare/health-management",
  },
  openGraph: {
    title: "健康管理與安全（4301–4306）｜身心障礙福利機構評鑑｜報告汪",
    description: "109年度身心障礙福利機構評鑑健康管理與安全 6 項指標完整說明與準備要訣。",
    url: "https://reportwang.com/school/disability-welfare/health-management",
  },
};

// 從 專 section 取出 items 42-47（健康管理與安全 4301–4306）
const sectionZhuan = requireSection(disabilityWelfareProfile.sections, "專");
const healthItems = sectionZhuan.items.filter((i) => i.id >= 42 && i.id <= 47);
const section = { ...sectionZhuan, items: healthItems };

const tips = disabilityWelfareTips;

const jsonLd = schoolSubpageJsonLd({
  type: "disability-welfare",
  subpage: "health-management",
  section,
  name: "健康管理與安全（109年度身心障礙福利機構評鑑指標 4301–4306）",
  description:
    "109年度身心障礙福利機構評鑑「健康管理與安全」6 項指標完整說明，涵蓋護理人員健康管理、緊急事件處理、安全保護措施及膳食服務。",
  extraFaq: [
    {
      question: "身心障礙機構健康管理與安全區塊共幾項指標？",
      answer:
        "本區塊共 6 項指標（4301–4306），為「三、專業服務」的第三子區塊，含護理人員配置健康管理、緊急及意外事件通報處理、約束與保護措施規範、膳食服務衛生管理等。",
    },
    {
      question: "緊急事件處理需要哪些書面資料？",
      answer:
        "需備妥：緊急事件處理流程圖與 SOP 文件；事件發生後的書面記錄（含處理過程、通報紀錄）；定期演練紀錄；以及近年度事件統計分析及改善措施報告。",
    },
    {
      question: "膳食服務需符合哪些衛生規範？",
      answer:
        "膳食服務（指標 4303）需符合食品安全衛生管理法相關規定，包含食材來源管理、廚房環境衛生、廚工健康檢查，以及特殊膳食（糖尿病、低鹽等）的個別化調整記錄。",
    },
  ],
});

export default function DisabilityWelfareHealthManagementPage() {
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
          健康管理與安全（指標 4301–4306）
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 6 項指標（項目 42–47），為「三、專業服務」的第三子區塊，涵蓋服務對象的健康維護、
          緊急事件應對、安全保護措施及膳食管理。護理人員配置與緊急處理機制是查核重點。
        </p>
      </div>

      {/* Mini TOC */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">本頁指標</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {healthItems.map((item) => (
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
        {healthItems.map((item) => (
          <section key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400 font-mono">
                {item.id}
              </span>
              <h2 className="text-lg font-bold">{item.title}</h2>
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
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link href="/school/disability-welfare/individual-care" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeftIcon className="h-4 w-4" />
          個別化服務計畫
        </Link>
        <Link href="/school/disability-welfare/professional" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          三、專業服務（全部）
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
