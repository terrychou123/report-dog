import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { generalNursingHomeProfile, meta as generalNursingHomeMeta } from "@/lib/ai/evaluation-profiles/general-nursing-home";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import {
  SettingsIcon,
  HeartPulseIcon,
  ShieldIcon,
  StarIcon,
  ArrowRightIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "一般護理之家評鑑小教室｜報告汪",
  description:
    "115年度一般護理之家評鑑基準完整解說，共4大區塊15項目，幫助護理之家管理人員掌握評鑑重點。",
  keywords: [
    "一般護理之家評鑑",
    "115年度評鑑",
    "護理之家評鑑基準",
    "評鑑小教室",
    "長照機構評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/general-nursing-home" },
  openGraph: {
    title: "一般護理之家評鑑小教室｜評鑑小教室｜報告汪",
    description: "15 項一般護理之家評鑑基準完整解說，掌握評鑑重點，提升評鑑通過率。",
    url: "https://reportwang.com/school/general-nursing-home",
  },
};

const sectionMeta = [
  {
    href: "/school/general-nursing-home/administration",
    icon: SettingsIcon,
    name: "A、行政組織、經營管理與服務對象權益保障",
    shortCode: "A",
    itemRange: "項目 1–5",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/general-nursing-home/professional-quality",
    icon: HeartPulseIcon,
    name: "B、專業服務與生活照顧",
    shortCode: "B",
    itemRange: "項目 6–8",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/general-nursing-home/safety-environment",
    icon: ShieldIcon,
    name: "C、環境設施與安全維護",
    shortCode: "C",
    itemRange: "項目 9–12",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/general-nursing-home/special-items",
    icon: StarIcon,
    name: "D、特別事項",
    shortCode: "D",
    itemRange: "項目 13–15",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-600 dark:text-purple-400",
  },
];

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "一般護理之家評鑑基準",
  description:
    "115 年度一般護理之家評鑑基準，共 15 項目、4 大區塊完整解說。",
  path: "/school/general-nursing-home",
  hasPart: [
    {
      name: "A、行政組織、經營管理與服務對象權益保障（項目 1–5）",
      url: "https://reportwang.com/school/general-nursing-home/administration",
    },
    {
      name: "B、專業服務與生活照顧（項目 6–8）",
      url: "https://reportwang.com/school/general-nursing-home/professional-quality",
    },
    {
      name: "C、環境設施與安全維護（項目 9–12）",
      url: "https://reportwang.com/school/general-nursing-home/safety-environment",
    },
    {
      name: "D、特別事項（項目 13–15）",
      url: "https://reportwang.com/school/general-nursing-home/special-items",
    },
  ],
});

const FAQ_ITEMS = [
  { question: "一般護理之家評鑑分幾大區塊、共幾項？", answer: "4 大區塊（A 行政組織、B 專業服務、C 環境設施、D 特別事項）共 15 項評鑑基準。" },
  { question: "B 區專業服務的評鑑重點是什麼？", answer: "B1 住民服務需求評估（72 小時整體性評估）、B2 整合性照顧（個別化照護計畫）、B3 品質監測（跌倒、壓傷、約束、感染、非計畫性轉急性住院、體重改變等 6 項指標）。" },
  { question: "C 區環境設施需要準備哪些文件？", answer: "C1 災害應變計畫與每半年 2 次（含夜間）演練記錄；C2 等待救援空間圖面；C3 防火管理人研習記錄、外籍照服員防火訓練記錄；C4 情境演練計畫（含夜間版本）。" },
  { question: "如何用報告汪準備一般護理之家評鑑？", answer: "匯入一般護理之家評鑑範本，依 A/B/C/D 四大構面分標籤，AI 逐項標示文件缺漏，評鑑前確認每項基準均有完整佐證文件。" },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/general-nursing-home"));

export default function GeneralNursingHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">一般護理之家</Badge>
        <h1 className="text-2xl font-bold mb-3">一般護理之家評鑑基準總覽</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${generalNursingHomeMeta.year} 年度` },
            { label: "主管機關", value: generalNursingHomeMeta.agency },
            { label: "評鑑項目", value: `共 ${generalNursingHomeMeta.totalItems} 項` },
            { label: "評鑑區塊", value: "4 大區塊（A–D）" },
          ]}
        />
        <SourceCallout meta={generalNursingHomeMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed mt-2">
          以下為 115 年度一般護理之家評鑑基準，共 15 個評鑑項目，分為 4 大區塊。
          點擊各區塊可查看詳細說明、準備要訣與實用提示。
        </p>
      </div>

      {/* 各區塊項目數對照 */}
      <div className="not-prose mb-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <caption className="py-2.5 px-4 text-left font-semibold text-foreground border-b bg-muted/30">
            115 年度一般護理之家評鑑各區塊概覽
          </caption>
          <thead>
            <tr className="border-b bg-muted/20 text-muted-foreground">
              <th className="py-2 px-4 text-left font-medium">評鑑區塊</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">項目範圍</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">項目數</th>
              <th className="py-2 px-4 text-left font-medium">主要查核重點</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 px-4 font-medium">A、行政組織、經營管理與服務對象權益保障</td>
              <td className="py-2 px-4 text-center text-muted-foreground">1–5</td>
              <td className="py-2 px-4 text-center">5 項</td>
              <td className="py-2 px-4 text-muted-foreground">負責人管理、人員配置、緊急事件、防疫機制、安寧療護</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">B、專業服務與生活照顧</td>
              <td className="py-2 px-4 text-center text-muted-foreground">6–8</td>
              <td className="py-2 px-4 text-center">3 項</td>
              <td className="py-2 px-4 text-muted-foreground">照護需求評估、整合性照顧、品質監測指標</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">C、環境設施與安全維護</td>
              <td className="py-2 px-4 text-center text-muted-foreground">9–12</td>
              <td className="py-2 px-4 text-center">4 項</td>
              <td className="py-2 px-4 text-muted-foreground">災害應變計畫、疏散避難動線、個別化疏散策略、情境演練</td>
            </tr>
            <tr className="bg-muted/10">
              <td className="py-2 px-4 text-muted-foreground">D、特別事項</td>
              <td className="py-2 px-4 text-center text-muted-foreground">13–15</td>
              <td className="py-2 px-4 text-center text-muted-foreground">3 項</td>
              <td className="py-2 px-4 text-muted-foreground">創新政策執行（＋）、口腔健康照護、試評扣分項</td>
            </tr>
            <tr className="border-t bg-muted/20 font-semibold">
              <td className="py-2 px-4">合計</td>
              <td className="py-2 px-4 text-center">1–15</td>
              <td className="py-2 px-4 text-center">15 項</td>
              <td className="py-2 px-4 text-xs text-muted-foreground font-normal">A、行政組織項目最多（5 項）</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {sectionMeta.map((sec) => {
          const section = generalNursingHomeProfile.sections.find((s) => s.shortCode === sec.shortCode);
          const Icon = sec.icon;
          return (
            <Link
              key={sec.href}
              href={sec.href}
              className="group rounded-xl border bg-card p-5 hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 rounded-lg p-2 ${sec.bgClass}`}>
                  <Icon className={`h-5 w-5 ${sec.textClass}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                    {sec.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">{sec.itemRange}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {section?.items.slice(0, 4).map((item) => (
                      <span
                        key={item.id}
                        className="text-xs bg-muted rounded px-1.5 py-0.5 text-muted-foreground"
                      >
                        {item.title}
                      </span>
                    ))}
                    {(section?.items.length ?? 0) > 4 && (
                      <span className="text-xs text-muted-foreground px-1.5 py-0.5">
                        +{(section?.items.length ?? 0) - 4} 項
                      </span>
                    )}
                  </div>
                  <ArrowRightIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Full item list */}
      <div>
        <h2 className="text-lg font-semibold mb-4">全部 15 項評鑑項目</h2>
        <div className="space-y-6">
          {generalNursingHomeProfile.sections.map((section) => {
            const slug = sectionMeta.find((s) => s.shortCode === section.shortCode)?.href.split("/").at(-1);
            if (!slug) return null;
            return (
              <div key={section.shortCode}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.name}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/school/general-nursing-home/${slug}#item-${item.id}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors group"
                    >
                      <span className="shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-mono font-semibold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {item.id}
                      </span>
                      <span className="text-sm group-hover:text-primary transition-colors">
                        {item.title}
                      </span>
                      <Badge variant="outline" className="ml-auto text-xs shrink-0">
                        {item.responsible}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Download CTA */}
      <div className="mt-10 rounded-xl border border-dashed border-primary/30 bg-muted/50 p-5 text-center">
        <p className="text-sm font-semibold mb-1">📋 免費下載自我檢查表</p>
        <p className="text-sm text-muted-foreground mb-3">
          下載「一般護理之家」評鑑自我檢查表（Excel），對照評鑑基準逐項自我檢核。
        </p>
        <a
          href="/downloads/general-nursing-home.xlsx"
          download
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <DownloadIcon className="h-4 w-4" />
          免費下載 Excel 檢查表 →
        </a>
      </div>

      {/* Import CTA */}
      <div className="mt-10 rounded-xl bg-primary/5 border border-primary/20 p-5">
        <p className="text-sm font-semibold mb-1">看完評鑑基準了嗎？</p>
        <p className="text-sm text-muted-foreground mb-3">
          到報告汪一鍵匯入「一般護理之家」評鑑範本，包含 4 個標籤和 15 份報告範本，省去手動建立的時間。
        </p>
        <Link
          href="/docs/import-templates"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          了解如何匯入評鑑範本 →
        </Link>
      </div>

      <SchoolFaqSection items={FAQ_ITEMS} />
    </>
  );
}
