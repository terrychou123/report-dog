import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { homeCareProfile, meta as homeCareMeta } from "@/lib/ai/evaluation-profiles/home-care";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import {
  ShieldCheckIcon,
  HeartPulseIcon,
  SettingsIcon,
  StarIcon,
  ArrowRightIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "居家服務機構評鑑基準總覽",
  description:
    "115 年度臺北市政府社會局居家服務機構評鑑基準完整說明，共 32 項目、4 大區塊：個案權益保障、專業照護品質、經營管理效能與加分題。",
  keywords: [
    "居家服務機構評鑑基準",
    "居服評鑑項目",
    "居家服務評鑑準備",
    "臺北市居家服務評鑑",
    "115年度評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/home-care" },
  openGraph: {
    title: "居家服務機構評鑑基準總覽｜評鑑小教室｜報告汪",
    description: "32 項居家服務機構評鑑基準完整解說，掌握評鑑重點，提升評鑑通過率。",
    url: "https://reportwang.com/school/home-care",
  },
};

const sectionMeta = [
  {
    href: "/school/home-care/client-rights",
    icon: ShieldCheckIcon,
    name: "壹、個案權益保障",
    shortCode: "權",
    itemRange: "項目 1–4",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/home-care/professional-quality",
    icon: HeartPulseIcon,
    name: "貳、專業照護品質",
    shortCode: "專",
    itemRange: "項目 5–14",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/home-care/management",
    icon: SettingsIcon,
    name: "參、經營管理效能",
    shortCode: "管",
    itemRange: "項目 15–30",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/home-care/bonus",
    icon: StarIcon,
    name: "加分題",
    shortCode: "加",
    itemRange: "項目 31–32",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
];

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "居家服務機構評鑑基準",
  description:
    "115 年度臺北市政府社會局居家服務機構評鑑基準，共 32 項目、4 大區塊完整解說。",
  path: "/school/home-care",
  hasPart: [
    {
      name: "壹、個案權益保障（項目 1–4）",
      url: "https://reportwang.com/school/home-care/client-rights",
    },
    {
      name: "貳、專業照護品質（項目 5–14）",
      url: "https://reportwang.com/school/home-care/professional-quality",
    },
    {
      name: "參、經營管理效能（項目 15–30）",
      url: "https://reportwang.com/school/home-care/management",
    },
    {
      name: "加分題（項目 31–32）",
      url: "https://reportwang.com/school/home-care/bonus",
    },
  ],
});

const FAQ_ITEMS = [
  { question: "居家服務機構評鑑分幾大區塊、共幾項？", answer: "4 大區塊（個案服務品質、督導管理、行政管理、安全管理）共 32 項正式評鑑項目，另有加分題。" },
  { question: "居服機構評鑑最常見的缺失是什麼？", answer: "常見缺失為督導記錄不完整（督導未按規定頻率進行）、居服員訓練時數文件缺漏，以及緊急應變計畫未每年更新。建議提前逐項自我檢核。" },
  { question: "居服員的服務紀錄如何符合評鑑要求？", answer: "服務紀錄需包含日期、服務項目、時數及居服員簽名，並須與個案 ICP 目標相對應。建議依個案建立標籤集中管理，評鑑前 AI 分析對應情形。" },
  { question: "如何用報告汪管理居服督導日誌與個案紀錄？", answer: "依個案建立標籤，居服員完成服務後直接上傳紀錄，督導篩選個案標籤一次掌握所有服務紀錄，AI 輔助確認紀錄格式符合評鑑基準要求。" },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/home-care"));

export default function HomeCarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">居家服務機構</Badge>
        <h1 className="text-2xl font-bold mb-3">居家服務機構評鑑基準總覽</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${homeCareMeta.year} 年度` },
            { label: "主管機關", value: homeCareMeta.agency },
            { label: "評鑑項目", value: `共 ${homeCareMeta.totalItems} 項` },
            { label: "評鑑區塊", value: "4 大區塊" },
          ]}
        />
        <SourceCallout meta={homeCareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed mt-2">
          以下為 115 年度臺北市政府社會局居家服務機構評鑑基準，共 32 個評鑑項目，分為 4 大區塊。
          點擊各區塊可查看詳細說明、準備要訣與實用提示。
        </p>
      </div>

      {/* 各區塊項目數對照 */}
      <div className="not-prose mb-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <caption className="py-2.5 px-4 text-left font-semibold text-foreground border-b bg-muted/30">
            115 年度居家服務機構評鑑各區塊概覽
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
              <td className="py-2 px-4 font-medium">壹、個案權益保障</td>
              <td className="py-2 px-4 text-center text-muted-foreground">1–4</td>
              <td className="py-2 px-4 text-center">4 項</td>
              <td className="py-2 px-4 text-muted-foreground">服務資訊公開、申訴機制、服務契約、個資保護</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">貳、專業照護品質</td>
              <td className="py-2 px-4 text-center text-muted-foreground">5–14</td>
              <td className="py-2 px-4 text-center">10 項</td>
              <td className="py-2 px-4 text-muted-foreground">入案評估、服務計畫、緊急處理、督導訪視</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">參、經營管理效能</td>
              <td className="py-2 px-4 text-center text-muted-foreground">15–30</td>
              <td className="py-2 px-4 text-center">16 項</td>
              <td className="py-2 px-4 text-muted-foreground">行政管理、人員配置、財務管理、品質改善</td>
            </tr>
            <tr className="bg-muted/10">
              <td className="py-2 px-4 text-muted-foreground">加分題</td>
              <td className="py-2 px-4 text-center text-muted-foreground">31–32</td>
              <td className="py-2 px-4 text-center text-muted-foreground">2 項</td>
              <td className="py-2 px-4 text-muted-foreground">創新服務、照顧者支持</td>
            </tr>
            <tr className="border-t bg-muted/20 font-semibold">
              <td className="py-2 px-4">合計</td>
              <td className="py-2 px-4 text-center">1–32</td>
              <td className="py-2 px-4 text-center">32 項</td>
              <td className="py-2 px-4 text-xs text-muted-foreground font-normal">參、經營管理效能項目最多（16 項）</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {sectionMeta.map((sec) => {
          const section = homeCareProfile.sections.find((s) => s.shortCode === sec.shortCode);
          const Icon = sec.icon;
          return (
            <Link
              key={sec.href}
              href={sec.href}
              className="group rounded-xl border bg-card p-5 hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 rounded-lg p-2 ${sec.color.split(" ")[0]}`}>
                  <Icon className={`h-5 w-5 ${sec.iconColor}`} />
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
        <h2 className="text-lg font-semibold mb-4">全部 32 項評鑑項目</h2>
        <div className="space-y-6">
          {homeCareProfile.sections.map((section) => {
            return (
              <div key={section.shortCode}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.name}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const slugMap: Record<string, string> = {
                      "權": "client-rights",
                      "專": "professional-quality",
                      "管": "management",
                      "加": "bonus",
                    };
                    const slug = slugMap[section.shortCode];
                    return (
                      <Link
                        key={item.id}
                        href={`/school/home-care/${slug}#item-${item.id}`}
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
                    );
                  })}
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
          下載「居家長照機構」評鑑自我檢查表（Excel），對照評鑑基準逐項自我檢核。
        </p>
        <a
          href="/downloads/home-care.xlsx"
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
          到報告汪一鍵匯入「居家服務機構」評鑑範本，包含 4 個標籤和 32 份報告範本，省去手動建立的時間。
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
          src="/school/home-care-prep-flow.svg"
          alt="居家服務機構評鑑準備 4 大步驟：自評診斷、文件整備、模擬預演、正式評鑑"
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
            <span className="text-muted-foreground">項目 6・照服員服務執行記錄</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員抽查到宅服務記錄，發現部分照服員的服務時間記錄與個案家屬描述不符，且未記錄每次服務的起訖時間；督導訪視記錄缺少個案 ADL 變化的量化評估，僅有文字描述。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            導入電子打卡系統（到宅服務起訖時間自動記錄），設計標準服務記錄表（含 ADL 評估欄位），督導每月抽查 5% 服務記錄並簽章確認，異常情形須於 3 日內說明原因。
          </p>
        </div>

        <div className="rounded-xl border overflow-hidden text-sm">
          <div className="flex items-center gap-2 bg-amber-500/10 border-b px-4 py-2.5">
            <span className="font-semibold text-amber-700 dark:text-amber-400">缺失情境</span>
            <span className="text-muted-foreground">項目 26–28・在職訓練計畫</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱年度在職訓練計畫，發現訓練課程未涵蓋法定「緊急事件處理」及「個案權益保障」兩類，且部分照服員的繼續教育學分未達規定時數，訓練台帳記錄不完整。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            預先訂定含法定六大類課程的年度訓練計畫並公告，每次訓練後建立「課程大綱＋簽到表＋考核記錄」三件套，年底完成個人訓練台帳彙整，督導每季核對學分達成狀況。
          </p>
        </div>
      </div>
      <SchoolFaqSection items={FAQ_ITEMS} />
    </>
  );
}
