import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { homeNursingProfile, meta as homeNursingMeta } from "@/lib/ai/evaluation-profiles/home-nursing";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import {
  SettingsIcon,
  HeartPulseIcon,
  ArrowRightIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "115年度居家護理所評鑑基準｜8項評鑑教學｜居家護理評鑑準備",
  description:
    "115 年度居家護理所評鑑基準完整說明，共 8 項目、2 大區塊：A 經營管理（45%，含社區資源、感染管制、品質監測 A5 PDCA）與 B 照護管理（55%，含個案照護管理 B2 佔 45%）。適用居家護理所評鑑準備。最後更新：2026 年 5 月。",
  keywords: [
    "居家護理所評鑑",
    "居家護理評鑑基準",
    "115年度評鑑",
    "居家護理機構評鑑",
    "護理所評鑑",
    "居家護理評鑑準備",
    "居家護理評鑑指標",
  ],
  alternates: { canonical: "https://reportwang.com/school/home-nursing" },
  openGraph: {
    title: "115年度居家護理所評鑑基準｜8項完整教學｜評鑑小教室｜報告汪",
    description: "115年度居家護理所 8 項評鑑基準完整解說，掌握評鑑重點，提升通過率。",
    url: "https://reportwang.com/school/home-nursing",
  },
};

const sectionMeta = [
  {
    href: "/school/home-nursing/management",
    icon: SettingsIcon,
    name: "A、經營管理",
    shortCode: "A",
    itemRange: "項目 1–5",
    weight: "45%",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/home-nursing/care-management",
    icon: HeartPulseIcon,
    name: "B、照護管理",
    shortCode: "B",
    itemRange: "項目 6–8",
    weight: "55%",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
];

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "居家護理所評鑑基準",
  description:
    "115 年度居家護理所評鑑基準，共 8 項目、2 大區塊完整解說。",
  path: "/school/home-nursing",
  hasPart: [
    {
      name: "A、經營管理（項目 1–5）",
      url: "https://reportwang.com/school/home-nursing/management",
    },
    {
      name: "B、照護管理（項目 6–8）",
      url: "https://reportwang.com/school/home-nursing/care-management",
    },
  ],
});

const FAQ_ITEMS = [
  { question: "居家護理所評鑑分幾大區塊、共幾項？", answer: "2 大區塊（A 經營管理、B 照護管理）共 8 項，其中含 1 項加分題。是所有長照機構評鑑中項目數最少、準備門檻較低的類型。" },
  { question: "居家護理所評鑑中最常被要求補件的是什麼？", answer: "常見補件為護理人員執照更新記錄、個案訪視紀錄（含訪視頻率符合規定）、感染管制措施記錄，以及緊急應變演練記錄。" },
  { question: "個案訪視紀錄如何管理才符合評鑑要求？", answer: "依個案建立標籤，每次訪視後立即上傳評估紀錄，包含個案狀況、護理措施及衛教內容，確保訪視頻率符合 B1 基準要求。" },
  { question: "如何用報告汪準備居家護理所評鑑文書？", answer: "匯入居家護理所評鑑範本，AI 自動對應 A 經營管理與 B 照護管理 8 項基準，直接標示哪位個案的訪視紀錄或護理計畫文件不足。" },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/home-nursing"));

export default function HomeNursingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">居家護理所</Badge>
        <h1 className="text-2xl font-bold mb-3">居家護理所評鑑基準總覽</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${homeNursingMeta.year} 年度` },
            { label: "資料來源", value: homeNursingMeta.agency },
            { label: "評鑑項目", value: `共 ${homeNursingMeta.totalItems} 項` },
            { label: "評鑑區塊", value: "A 經營管理（45%）+ B 照護管理（55%）" },
          ]}
        />
        <SourceCallout meta={homeNursingMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed mt-2">
          以下為 115 年度居家護理所評鑑基準，共 8 個評鑑項目，分為 A 經營管理（佔 45%）與 B 照護管理（佔 55%）兩大區塊。
          其中 B2 個案照護管理單項即佔 45%，為最高權重項目；B3 加分項目另計 5%，整體配分結構為 105%。
          點擊各區塊可查看詳細說明、準備要訣與實用提示。
        </p>
      </div>

      {/* 各區塊配分對照 */}
      <div className="not-prose mb-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <caption className="py-2.5 px-4 text-left font-semibold text-foreground border-b bg-muted/30">
            115 年度居家護理所評鑑區塊與配分比重
          </caption>
          <thead>
            <tr className="border-b bg-muted/20 text-muted-foreground">
              <th className="py-2 px-4 text-left font-medium">評鑑區塊</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">項目範圍</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">項目數</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">配分比重</th>
              <th className="py-2 px-4 text-left font-medium">主要查核重點</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 px-4 font-medium">A、經營管理</td>
              <td className="py-2 px-4 text-center text-muted-foreground">1–5</td>
              <td className="py-2 px-4 text-center">5 項</td>
              <td className="py-2 px-4 text-center font-medium">45%</td>
              <td className="py-2 px-4 text-muted-foreground">社區資源連結、感染管制、人員安全、緊急事件、品質監測</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">B、照護管理</td>
              <td className="py-2 px-4 text-center text-muted-foreground">6–8</td>
              <td className="py-2 px-4 text-center">3 項</td>
              <td className="py-2 px-4 text-center font-medium">55%</td>
              <td className="py-2 px-4 text-muted-foreground">機構資訊管理（5%）、個案照護管理（45%）、加分項目（5%）</td>
            </tr>
            <tr className="border-t bg-muted/20 font-semibold">
              <td className="py-2 px-4">合計</td>
              <td className="py-2 px-4 text-center">1–8</td>
              <td className="py-2 px-4 text-center">8 項</td>
              <td className="py-2 px-4 text-center">100%（含加分 105%）</td>
              <td className="py-2 px-4 text-xs text-muted-foreground font-normal">B2 個案照護管理為最高權重單項（45%）</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {sectionMeta.map((sec) => {
          const section = homeNursingProfile.sections.find((s) => s.shortCode === sec.shortCode);
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
                  <p className="text-xs text-muted-foreground mb-3">{sec.itemRange}・佔 <span className="font-semibold">{sec.weight}</span></p>
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
        <h2 className="text-lg font-semibold mb-4">全部 8 項評鑑項目</h2>
        <div className="space-y-6">
          {homeNursingProfile.sections.map((section) => {
            const slug = sectionMeta.find((s) => s.shortCode === section.shortCode)?.href.split("/").at(-1);
            if (!slug) return null;
            return (
              <div key={section.shortCode}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.name}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const weightMatch = item.title.match(/\(([0-9.]+%)\)$/);
                    const weight = weightMatch?.[1];
                    const titleDisplay = item.title.replace(/\s*\([0-9.]+%\)$/, "");
                    return (
                      <Link
                        key={item.id}
                        href={`/school/home-nursing/${slug}#item-${item.id}`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors group"
                      >
                        <span className="shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-mono font-semibold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          {item.id}
                        </span>
                        <span className="text-sm group-hover:text-primary transition-colors flex-1 min-w-0">
                          {titleDisplay}
                        </span>
                        {weight && (
                          <Badge variant="secondary" className="text-xs font-mono shrink-0">
                            {weight}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs shrink-0">
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
          下載「居家護理所」評鑑自我檢查表（Excel），對照評鑑基準逐項自我檢核。
        </p>
        <a
          href="/downloads/home-nursing.xlsx"
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
          到報告汪一鍵匯入「居家護理所」評鑑範本，包含 2 個標籤和 8 份報告範本，省去手動建立的時間。
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
          src="/school/home-nursing-prep-flow.svg"
          alt="居家護理所評鑑準備 4 大步驟：自評診斷、文件整備、模擬預演、正式評鑑"
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
            <span className="text-muted-foreground">項目 B2・個案照護管理（45% 配分）</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱個案護理記錄，發現訪視記錄格式不一致，部分記錄缺少「問題清單」與「護理措施」的對應連結；高危個案的追蹤訪視頻率未依評估結果調整，仍維持固定月訪一次。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            統一採用 SOAP 格式撰寫訪視記錄，建立個案問題清單對照護理措施的標準表單，高危個案每月至少訪視 2 次，每次記錄風險指標數值（如傷口尺寸、血壓趨勢）並觸發跨專業通報機制。
          </p>
        </div>

        <div className="rounded-xl border overflow-hidden text-sm">
          <div className="flex items-center gap-2 bg-amber-500/10 border-b px-4 py-2.5">
            <span className="font-semibold text-amber-700 dark:text-amber-400">缺失情境</span>
            <span className="text-muted-foreground">項目 A2・感染管制（8%）</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱感染管制手冊，發現手冊未更新至最新版本，「肺結核接觸者追蹤」及「手部衛生執行監測」等法定章節付之闕如，且醫療廢棄物處理 SOP 未含圖示說明。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            每年 1 月完成手冊年度修訂，加入法定四大感染管制章節（傳染病/肺結核/疥瘡/手部衛生），廢棄物處理 SOP 配合現場照片，新進人員到職後一週內完成感控教育訓練並簽名確認。
          </p>
        </div>
      </div>
      <SchoolFaqSection items={FAQ_ITEMS} />
    </>
  );
}
