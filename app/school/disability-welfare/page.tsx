import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { disabilityWelfareProfile, meta as disabilityWelfareMeta } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import {
  SettingsIcon,
  ShieldCheckIcon,
  HeartPulseIcon,
  ArrowRightIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "身心障礙福利機構評鑑小教室｜109年度｜報告汪",
  description:
    "109年度身心障礙福利機構評鑑指標完整解說，共3大區塊49項目，涵蓋行政組織及經營管理、環境設施及安全維護、專業服務，幫助身心障礙機構管理人員掌握評鑑重點。",
  keywords: [
    "身心障礙福利機構評鑑",
    "身心障礙機構評鑑基準",
    "109年度身障機構評鑑",
    "身心障礙機構",
    "身心障礙福利機構",
    "評鑑小教室",
    "長照機構評鑑",
    "社家署評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/disability-welfare" },
  openGraph: {
    title: "身心障礙福利機構評鑑小教室｜109年度｜報告汪",
    description:
      "49 項身心障礙福利機構評鑑指標完整解說，掌握評鑑重點，提升評鑑通過率。",
    url: "https://reportwang.com/school/disability-welfare",
  },
};

// 區塊頁面對應設定
const sectionMeta = [
  {
    href: "/school/disability-welfare/administration",
    icon: SettingsIcon,
    name: "一、行政組織及經營管理（含會計及財務管理）",
    shortCode: "行",
    itemRange: "項目 1–11",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/disability-welfare/environment",
    icon: ShieldCheckIcon,
    name: "二、環境設施及安全維護",
    shortCode: "環",
    itemRange: "項目 12–31（含5項不計分）",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/disability-welfare/professional-quality",
    icon: HeartPulseIcon,
    name: "三、專業服務",
    shortCode: "專",
    itemRange: "項目 32–49",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-600 dark:text-purple-400",
  },
];

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "109年度身心障礙福利機構評鑑指標",
  description:
    "109年度身心障礙福利機構評鑑指標，共 49 項目、3 大區塊完整解說。",
  path: "/school/disability-welfare",
  hasPart: [
    {
      name: "一、行政組織及經營管理（項目 1–11）",
      url: "https://reportwang.com/school/disability-welfare/administration",
    },
    {
      name: "二、環境設施及安全維護（項目 12–31）",
      url: "https://reportwang.com/school/disability-welfare/environment",
    },
    {
      name: "三、專業服務（項目 32–49）",
      url: "https://reportwang.com/school/disability-welfare/professional-quality",
    },
  ],
});

const FAQ_ITEMS = [
  { question: "身心障礙福利機構評鑑分幾大區塊、共幾項？", answer: "6 大區塊（行政組織管理、個別化服務計畫、專業服務品質、財務管理、環境設施、健康管理）共 35 項評鑑項目。" },
  { question: "ISP 個別化服務計畫最常見的缺失是什麼？", answer: "常見缺失為 ISP 目標與實際服務紀錄脫節、跨專業團隊會議記錄不完整、家屬參與紀錄缺漏，以及每年定期評估更新未落實。" },
  { question: "跨專業團隊的文件如何集中管理？", answer: "依職類（社工師、職能治療師、物理治療師、心理師）建立獨立標籤，各自管理對應的評估與紀錄文件，主任可跨標籤彙整備審資料。" },
  { question: "如何用報告汪準備身心障礙機構評鑑？", answer: "匯入身心障礙福利機構評鑑範本，依 6 大區塊建立標籤，AI 逐項分析文件是否符合基準，評鑑前直接篩選標籤確認備審文件完整。" },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/disability-welfare"));

export default function DisabilityWelfarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">
          身心障礙福利機構｜109年度
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          身心障礙福利機構評鑑指標總覽
        </h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${disabilityWelfareMeta.year} 年度` },
            { label: "主管機關", value: disabilityWelfareMeta.agency },
            { label: "評鑑項目", value: `共 ${disabilityWelfareMeta.totalItems} 項` },
            { label: "評鑑區塊", value: "3 大區塊" },
          ]}
        />
        <SourceCallout meta={disabilityWelfareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed mt-2">
          以下為衛福部社家署「109年度身心障礙福利機構評鑑指標」，共 49
          個評鑑項目（含 5 項不計分新增指標），分為 3
          大區塊。點擊各區塊可查看詳細說明、準備要訣與實用提示。
        </p>
      </div>

      {/* 各區塊項目數對照 */}
      <div className="not-prose mb-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <caption className="py-2.5 px-4 text-left font-semibold text-foreground border-b bg-muted/30">
            109 年度身心障礙福利機構評鑑各區塊概覽
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
              <td className="py-2 px-4 font-medium">一、行政組織及經營管理</td>
              <td className="py-2 px-4 text-center text-muted-foreground">1–11</td>
              <td className="py-2 px-4 text-center">11 項</td>
              <td className="py-2 px-4 text-muted-foreground">董事會運作、機構管理、員工管理、專業人力、財務</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">二、環境設施及安全維護</td>
              <td className="py-2 px-4 text-center text-muted-foreground">12–31</td>
              <td className="py-2 px-4 text-center">20 項</td>
              <td className="py-2 px-4 text-muted-foreground">浴廁設施、無障礙、消防安全、緊急應變、環境衛生（含 5 項不計分新增指標）</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">三、專業服務</td>
              <td className="py-2 px-4 text-center text-muted-foreground">32–49</td>
              <td className="py-2 px-4 text-center">18 項</td>
              <td className="py-2 px-4 text-muted-foreground">個別支持計畫（ISP）、專業團隊、輔具、健康管理、膳食、社區及家庭</td>
            </tr>
            <tr className="border-t bg-muted/20 font-semibold">
              <td className="py-2 px-4">合計</td>
              <td className="py-2 px-4 text-center">1–49</td>
              <td className="py-2 px-4 text-center">49 項</td>
              <td className="py-2 px-4 text-xs text-muted-foreground font-normal">二、環境設施項目最多（20 項，含 5 項不計分）</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {sectionMeta.map((sec) => {
          const section = disabilityWelfareProfile.sections.find(
            (s) => s.shortCode === sec.shortCode,
          );
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
                  <p className="text-xs text-muted-foreground mb-3">
                    {sec.itemRange}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {section?.items.slice(0, 4).map((item) => (
                      <span
                        key={item.id}
                        className="text-xs bg-muted rounded px-1.5 py-0.5 text-muted-foreground"
                      >
                        {item.title.length > 10
                          ? item.title.slice(0, 10) + "…"
                          : item.title}
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
        <h2 className="text-lg font-semibold mb-4">全部 49 項評鑑項目</h2>
        <div className="space-y-6">
          {disabilityWelfareProfile.sections.map((section) => {
            const meta = sectionMeta.find(
              (s) => s.shortCode === section.shortCode,
            );
            if (!meta) return null;
            return (
              <div key={section.shortCode}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.name}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.id}
                      href={`${meta.href}#item-${item.id}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors group"
                    >
                      <span className="shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-mono font-semibold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {item.id}
                      </span>
                      <span className="text-sm group-hover:text-primary transition-colors flex-1 min-w-0 truncate">
                        {item.score === 0 && (
                          <Badge
                            variant="outline"
                            className="text-xs mr-1.5 shrink-0"
                          >
                            不計分
                          </Badge>
                        )}
                        {item.title}
                      </span>
                      <Badge
                        variant="outline"
                        className="ml-auto text-xs shrink-0"
                      >
                        {item.score > 0 ? `${item.score}分` : "不計分"}
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
        <p className="text-sm font-semibold mb-1">
          📋 免費下載自我檢查表
        </p>
        <p className="text-sm text-muted-foreground mb-3">
          下載「身心障礙福利機構」評鑑自我檢查表（Excel），對照 109
          年度評鑑指標逐項自我檢核。
        </p>
        <a
          href="/downloads/disability-welfare.xlsx"
          download
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <DownloadIcon className="h-4 w-4" />
          免費下載 Excel 檢查表 →
        </a>
      </div>

      {/* Import CTA */}
      <div className="mt-10 rounded-xl bg-primary/5 border border-primary/20 p-5">
        <p className="text-sm font-semibold mb-1">看完評鑑指標了嗎？</p>
        <p className="text-sm text-muted-foreground mb-3">
          到報告汪一鍵匯入「身心障礙福利機構」評鑑範本，包含 3 個標籤和 49
          份報告範本，省去手動建立的時間。
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
          src="/school/disability-welfare-prep-flow.svg"
          alt="身心障礙機構評鑑準備 4 大步驟：自評診斷、文件整備、模擬預演、正式評鑑"
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
            <span className="text-muted-foreground">三、專業服務・ISP 個別支持計畫</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱 ISP 計畫書，發現缺少跨專業團隊會議記錄，目標設定過於籠統（如「提升社區參與」），未具體化為可量測的短中長期目標，且未記錄個案本人及家屬對計畫的意見。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            建立 ISP 跨專業會議記錄表（各專業人員簽章），採 SMART 原則重新設計目標格式（含頻次/達成標準/評估日期），加入「個案/家屬意見確認欄位」，每年至少召開 2 次正式跨專業會議。
          </p>
        </div>

        <div className="rounded-xl border overflow-hidden text-sm">
          <div className="flex items-center gap-2 bg-amber-500/10 border-b px-4 py-2.5">
            <span className="font-semibold text-amber-700 dark:text-amber-400">缺失情境</span>
            <span className="text-muted-foreground">二、環境設施・消防安全演練（身障使用者）</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱演練紀錄，發現演練僅包含一般人員疏散，未針對行動不便的身障服務使用者制訂「個別化緊急應變計畫」，演練頻率也未達每半年一次的規定。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            為每位行動能力受限的服務使用者建立「個人緊急應變卡」（含輔助方式/疏散路線/所需輔具），每半年辦理含身障者的實際疏散演練，記錄各個案疏散所需時間並設定改善目標。
          </p>
        </div>
      </div>
      <SchoolFaqSection items={FAQ_ITEMS} />
    </>
  );
}
