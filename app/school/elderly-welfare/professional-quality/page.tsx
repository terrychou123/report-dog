import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { elderlyWelfareProfile } from "@/lib/ai/evaluation-profiles/elderly-welfare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "B、專業照護品質（項目 16–46）｜老人福利機構評鑑",
  description:
    "老人福利機構評鑑「專業照護品質」31 項評鑑基準詳細說明：社工服務、個案資料管理、個別化照護計畫、生活照顧、護理服務、用藥管理、醫療轉介、復能活動、膳食服務、失智照護、安寧照護、品質監測指標，含準備要訣。",
  keywords: [
    "老人福利機構評鑑專業照護",
    "老人照護計畫評鑑",
    "老人機構護理服務評鑑",
    "老人福利機構品質監測",
    "115年度老人福利機構評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/elderly-welfare/professional-quality" },
  openGraph: {
    title: "B、專業照護品質（項目 16–46）｜老人福利機構評鑑｜報告汪",
    description: "老人福利機構評鑑專業照護品質 31 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/elderly-welfare/professional-quality",
  },
};

const section = elderlyWelfareProfile.sections.find((s) => s.shortCode === "專")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  16: {
    content:
      "社工服務紀錄需清楚記載服務目標、執行內容及後續追蹤事項，確認每位住民至少每季有社工服務記錄。評鑑委員可能會抽查個案紀錄，確認社工實際服務情形。",
    variant: "info",
  },
  17: {
    content:
      "個案基本資料應包含最新的病歷摘要、緊急聯絡人、過敏史及個人生活習慣等，且定期更新。資料保存需符合個人資料保護法規定，紙本資料應有專區存放並管控。",
    variant: "info",
  },
  18: {
    content:
      "個別化照護計畫（ICP）需由多專業團隊共同訂定，並邀請住民本人及家屬參與。計畫須包含短期及長期照護目標，並每 6 個月至少全面評估修訂一次，留有修訂記錄。",
    variant: "warning",
  },
  19: {
    content:
      "入住評估應使用標準化工具（如 ADL、CDR、MMSE 等），評估結果需作為訂定照護計畫的依據。若住民狀況有明顯變化，應即時重新評估。",
    variant: "info",
  },
  20: {
    content:
      "生活照顧服務紀錄需依班別記錄，確認日夜班均有完整紀錄。若住民有特殊照護需求（如鼻胃管、導尿管），需有特別護理紀錄，並確認執行人員資格符合規定。",
    variant: "info",
  },
  22: {
    content:
      "跌倒、壓傷等安全事件須在 24 小時內完成通報，並有完整處置紀錄。壓傷需每班評估記錄，跌倒後需進行風險重新評估並調整照護措施，家屬需於事件發生後即時通知。",
    variant: "warning",
  },
  23: {
    content:
      "菜單需由合格營養師設計，確認熱量與營養素符合長者需求。特殊飲食（如糖尿病餐、低鹽餐、管灌飲食）需有個別化飲食計畫，並定期評估。",
    variant: "info",
  },
  25: {
    content:
      "藥品管理需設置專用藥品存放區，管制藥品雙重上鎖並記錄。給藥需採三讀五對流程，確認給藥後住民確實服用。藥品自備需有醫師處方，外觀、有效期限定期查核。",
    variant: "warning",
  },
  27: {
    content:
      "復能及促進活動應依住民個別能力設計，非一體適用。活動記錄需包含參與人員名單、活動評估及住民反應，顯示活動確實依據照護計畫執行。",
    variant: "info",
  },
  30: {
    content:
      "失智症住民照護需使用認知功能評估工具定期追蹤，並依失智程度訂定個別化照護策略。若住民有遊走、激動等行為症狀，需有具體因應措施及記錄。",
    variant: "info",
  },
  32: {
    content:
      "提供安寧照護前，需完成住民意願確認及家屬說明，並有書面簽署。安寧照護計畫需定期評估，確認符合住民最大利益。相關決策過程應有會議記錄佐證。",
    variant: "warning",
  },
  36: {
    content:
      "品質監測指標（如跌倒率、壓傷發生率、約束率、身體拘束使用率等）需每月彙整，並定期分析趨勢。若指標數值異常，需有改善措施及追蹤記錄，以供評鑑委員核查持續改善能力。",
    variant: "warning",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "B、專業照護品質（老人福利機構評鑑基準項目 16–46）",
  description:
    "老人福利機構評鑑基準「專業照護品質」31 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/elderly-welfare/professional-quality",
});

export default function ElderlyWelfareProfessionalQualityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          B、專業照護品質
        </Badge>
        <h1 className="text-2xl font-bold mb-3">專業照護品質（項目 16–46）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 31 個評鑑項目，為老人福利機構評鑑占分最高的區塊（40%），涵蓋社工服務、護理照護、生活照顧、用藥管理、膳食服務、復能活動至品質監測指標。
          個別化照護計畫的多專業整合程度是評鑑重要關鍵。
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
              <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400 font-mono">
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
          href="/school/elderly-welfare/management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          A、經營管理效能
        </Link>
        <Link
          href="/school/elderly-welfare/safety-environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          C、安全環境設備
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
