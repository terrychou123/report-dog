import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { elderlyWelfareProfile, meta as elderlyWelfareMeta } from "@/lib/ai/evaluation-profiles/elderly-welfare";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import {
  ShieldCheckIcon,
  HeartPulseIcon,
  SettingsIcon,
  StarIcon,
  ShieldIcon,
  SparklesIcon,
  ArrowRightIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "老人福利機構評鑑基準總覽｜115年度老人福利機構評鑑指標",
  description:
    "115 年度老人福利機構評鑑指標完整說明，共 77 項目、6 大區塊：經營管理效能、專業照護品質、安全環境設備、個案權益保障、服務改進創新與加分題。",
  keywords: [
    "老人福利機構評鑑",
    "老人福利機構評鑑指標",
    "115年度老人福利機構",
    "長照機構評鑑基準",
    "老人安養機構評鑑",
    "老人照顧機構評鑑",
    "老人福利機構評鑑準備",
  ],
  alternates: { canonical: "https://reportwang.com/school/elderly-welfare" },
  openGraph: {
    title: "老人福利機構評鑑基準總覽｜評鑑小教室｜報告汪",
    description: "77 項老人福利機構評鑑基準完整解說，掌握評鑑重點，提升評鑑通過率。",
    url: "https://reportwang.com/school/elderly-welfare",
  },
};

const sectionMeta = [
  {
    href: "/school/elderly-welfare/management",
    icon: SettingsIcon,
    name: "A、經營管理效能",
    shortCode: "管",
    itemRange: "項目 1–15",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/elderly-welfare/professional-quality",
    icon: HeartPulseIcon,
    name: "B、專業照護品質",
    shortCode: "專",
    itemRange: "項目 16–46",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/elderly-welfare/safety-environment",
    icon: ShieldIcon,
    name: "C、安全環境設備",
    shortCode: "安",
    itemRange: "項目 47–62",
    bgClass: "bg-teal-500/10",
    textClass: "text-teal-600 dark:text-teal-400",
  },
  {
    href: "/school/elderly-welfare/client-rights",
    icon: ShieldCheckIcon,
    name: "D、個案權益保障",
    shortCode: "權",
    itemRange: "項目 63–71",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/elderly-welfare/innovation",
    icon: StarIcon,
    name: "E、服務改進創新",
    shortCode: "創",
    itemRange: "項目 72–74",
    bgClass: "bg-indigo-500/10",
    textClass: "text-indigo-600 dark:text-indigo-400",
  },
  {
    href: "/school/elderly-welfare/bonus",
    icon: SparklesIcon,
    name: "F、加分題",
    shortCode: "加",
    itemRange: "項目 75–77",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-600 dark:text-purple-400",
  },
];

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "老人福利機構評鑑基準",
  description:
    "115 年度老人福利機構評鑑指標，共 77 項目、6 大區塊完整解說。",
  path: "/school/elderly-welfare",
  hasPart: [
    {
      name: "A、經營管理效能（項目 1–15）",
      url: "https://reportwang.com/school/elderly-welfare/management",
    },
    {
      name: "B、專業照護品質（項目 16–46）",
      url: "https://reportwang.com/school/elderly-welfare/professional-quality",
    },
    {
      name: "C、安全環境設備（項目 47–62）",
      url: "https://reportwang.com/school/elderly-welfare/safety-environment",
    },
    {
      name: "D、個案權益保障（項目 63–71）",
      url: "https://reportwang.com/school/elderly-welfare/client-rights",
    },
    {
      name: "E、服務改進創新（項目 72–74）",
      url: "https://reportwang.com/school/elderly-welfare/innovation",
    },
    {
      name: "F、加分題（項目 75–77）",
      url: "https://reportwang.com/school/elderly-welfare/bonus",
    },
  ],
});

const FAQ_ITEMS = [
  { question: "老人福利機構評鑑分幾大區塊、共幾項？", answer: "6 大區塊（個案服務、專業照護品質、人力資源、行政管理、安全環境設施、創新服務）共 77 項評鑑項目，另有加分題。" },
  { question: "個案服務區塊的評鑑重點是什麼？", answer: "入住評估（CGA 老年綜合評估）完整性、個別照顧計畫（ICP）是否每季更新、服務紀錄與 ICP 目標的對應性，以及家屬溝通紀錄。" },
  { question: "老人福利機構如何管理多職類評鑑文件？", answer: "依護理師、照服員、社工師、營養師建立職類標籤，各自管理對應文件，機構主任跨標籤彙整月報，評鑑前篩選備審標籤一次到位。" },
  { question: "如何用報告汪準備老人福利機構評鑑？", answer: "匯入老人福利機構評鑑範本，依 77 項基準分類建檔，AI 評鑑分析直接標示哪個區塊缺件，大幅減少評鑑前補件壓力。" },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/elderly-welfare"));

export default function ElderlyWelfarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">老人福利機構</Badge>
        <h1 className="text-2xl font-bold mb-3">老人福利機構評鑑基準總覽</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${elderlyWelfareMeta.year} 年度` },
            { label: "資料來源", value: elderlyWelfareMeta.agency },
            { label: "評鑑項目", value: `共 ${elderlyWelfareMeta.totalItems} 項` },
            { label: "評鑑區塊", value: "6 大區塊（含加分題）" },
          ]}
        />
        <SourceCallout meta={elderlyWelfareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed mt-2">
          以下為 115 年度老人福利機構評鑑指標，共 77 個評鑑項目，分為 6 大區塊（含加分題）。
          點擊各區塊可查看詳細說明、準備要訣與實用提示。
        </p>
      </div>

      {/* 各區塊項目數對照 */}
      <div className="not-prose mb-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <caption className="py-2.5 px-4 text-left font-semibold text-foreground border-b bg-muted/30">
            115 年度老人福利機構評鑑各區塊概覽
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
              <td className="py-2 px-4 font-medium">A、經營管理效能</td>
              <td className="py-2 px-4 text-center text-muted-foreground">1–15</td>
              <td className="py-2 px-4 text-center">15 項</td>
              <td className="py-2 px-4 text-muted-foreground">工作手冊、人員配置、訓練、感染管制、危機管理</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">B、專業照護品質</td>
              <td className="py-2 px-4 text-center text-muted-foreground">16–46</td>
              <td className="py-2 px-4 text-center">31 項</td>
              <td className="py-2 px-4 text-muted-foreground">社工服務、護理照護、用藥管理、復能活動、品質監測</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">C、安全環境設備</td>
              <td className="py-2 px-4 text-center text-muted-foreground">47–62</td>
              <td className="py-2 px-4 text-center">16 項</td>
              <td className="py-2 px-4 text-muted-foreground">建築安全、消防設備、無障礙設施、緊急應變</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">D、個案權益保障</td>
              <td className="py-2 px-4 text-center text-muted-foreground">63–71</td>
              <td className="py-2 px-4 text-center">9 項</td>
              <td className="py-2 px-4 text-muted-foreground">服務資訊公開、服務契約、個資保護、申訴機制、滿意度調查</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">E、服務改進創新</td>
              <td className="py-2 px-4 text-center text-muted-foreground">72–74</td>
              <td className="py-2 px-4 text-center">3 項</td>
              <td className="py-2 px-4 text-muted-foreground">前次評鑑缺失改善、創新服務、違規事件改善</td>
            </tr>
            <tr className="bg-muted/10">
              <td className="py-2 px-4 text-muted-foreground">F、加分題</td>
              <td className="py-2 px-4 text-center text-muted-foreground">75–77</td>
              <td className="py-2 px-4 text-center text-muted-foreground">3 項</td>
              <td className="py-2 px-4 text-muted-foreground">人才培育、智慧照護、在地安老服務</td>
            </tr>
            <tr className="border-t bg-muted/20 font-semibold">
              <td className="py-2 px-4">合計</td>
              <td className="py-2 px-4 text-center">1–77</td>
              <td className="py-2 px-4 text-center">77 項</td>
              <td className="py-2 px-4 text-xs text-muted-foreground font-normal">B、專業照護品質條文最多（31 項）</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {sectionMeta.map((sec) => {
          const section = elderlyWelfareProfile.sections.find((s) => s.shortCode === sec.shortCode);
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
        <h2 className="text-lg font-semibold mb-4">全部 77 項評鑑項目</h2>
        <div className="space-y-6">
          {elderlyWelfareProfile.sections.map((section) => {
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
                      href={`/school/elderly-welfare/${slug}#item-${item.id}`}
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
          下載「老人福利機構」評鑑自我檢查表（Excel），對照評鑑基準逐項自我檢核。
        </p>
        <a
          href="/downloads/elderly-welfare.xlsx"
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
          到報告汪一鍵匯入「老人福利機構」評鑑範本，包含 6 個標籤和 77 份報告範本，省去手動建立的時間。
        </p>
        <Link
          href="/docs/import-templates"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          了解如何匯入評鑑範本 →
        </Link>
      </div>

      
      {/* 評鑑準備流程圖 */}
      <div className="not-prose my-6">
        <Image
          src="/school/elderly-welfare-prep-flow.svg"
          alt="老人福利機構評鑑準備 4 大步驟：自評診斷、文件整備、模擬預演、正式評鑑"
          className="w-full rounded-xl"
          width={800}
          height={500}
          loading="lazy"
        />
      </div>

      {/* 評鑑常見缺失案例 */}
      <div className="not-prose my-8 space-y-4">
        <h2 className="text-base font-semibold text-foreground">評鑑常見缺失案例</h2>

        <div className="rounded-xl border overflow-hidden text-sm">
          <div className="flex items-center gap-2 bg-amber-500/10 border-b px-4 py-2.5">
            <span className="font-semibold text-amber-700 dark:text-amber-400">缺失情境</span>
            <span className="text-muted-foreground">項目 B9–B24・護理照護（壓傷評估）</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱高壓傷風險個案記錄，發現 Braden 評分僅入住時評估一次，未依規定每兩週重新評估；已有皮膚損傷的個案傷口記錄缺少尺寸測量數據及照片，評量結果定為「B」。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            建立壓傷風險評估週期提醒（Braden ≤16 分者每兩週自動提醒），設計標準傷口記錄表（含圖示、尺寸、處置方式及週期追蹤），由傷口護理師每月查核並在月報留存統計數字。
          </p>
        </div>

        <div className="rounded-xl border overflow-hidden text-sm">
          <div className="flex items-center gap-2 bg-amber-500/10 border-b px-4 py-2.5">
            <span className="font-semibold text-amber-700 dark:text-amber-400">缺失情境</span>
            <span className="text-muted-foreground">項目 A4・查核缺失改善（二級加強）</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱前次評鑑缺失改善記錄，發現機構僅填寫「已改善」，缺少具體佐證文件（改善前後對比照片、修訂後表單、人員知悉記錄），被認定改善不完整，計為本次評鑑缺失。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            建立「缺失改善追蹤三件套」：①改善前後對比照片、②修訂後的作業程序書或表單、③相關人員知悉確認簽名；每項缺失設獨立資料夾歸檔，由主管每季複查並在追蹤表上簽章。
          </p>
        </div>
      </div>
      <SchoolFaqSection items={FAQ_ITEMS} />
    </>
  );
}
