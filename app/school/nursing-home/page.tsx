import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { nursingHomeProfile, meta as nursingHomeMeta } from "@/lib/ai/evaluation-profiles/nursing-home";
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
  ArrowRightIcon,
} from "lucide-react";
import { SchoolDownloadButton } from "@/components/school/school-download-button";

export const metadata: Metadata = {
  title: "住宿式長照機構 115 年評鑑指標｜63 項基準＋加分題完整解析",
  description:
    "115 年衛福部住宿式長照機構評鑑指標 63 項＋加減分 3 題逐條解析，涵蓋行政管理、專業照護品質、安全環境設備、個案權益保障四大區塊，地雷項目特別標示，免費 Excel 自評表下載。",
  keywords: [
    "住宿式長照機構評鑑",
    "住宿型長照評鑑",
    "115年住宿式長照機構評鑑指標",
    "長照機構評鑑基準",
    "住宿式長期照顧評鑑",
    "安養機構評鑑",
    "老人安養評鑑",
  ],
  alternates: { canonical: "/school/nursing-home" },
  openGraph: {
    title: "住宿式長照機構評鑑 63 項完整攻略｜115 年基準＋免費檢核表",
    description: "115 年衛福部住宿式長照評鑑 63 項基準逐條解析，四大區塊備評策略＋地雷提醒，免費 Excel 備評檢核表一鍵下載。",
    url: "https://reportwang.com/school/nursing-home",
  },
};

const sectionMeta = [
  {
    href: "/school/nursing-home/management",
    icon: SettingsIcon,
    name: "A、經營管理效能",
    shortCode: "管",
    itemRange: "項目 1–9（9項）",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/nursing-home/professional-quality",
    icon: HeartPulseIcon,
    name: "B、專業照護品質",
    shortCode: "專",
    itemRange: "項目 10–38（29項）",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/nursing-home/safety-environment",
    icon: ShieldIcon,
    name: "C、安全環境設備",
    shortCode: "安",
    itemRange: "項目 39–54（16項）",
    bgClass: "bg-teal-500/10",
    textClass: "text-teal-600 dark:text-teal-400",
  },
  {
    href: "/school/nursing-home/client-rights",
    icon: ShieldCheckIcon,
    name: "D、個案權益保障",
    shortCode: "權",
    itemRange: "項目 55–63（9項）",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/nursing-home/innovation",
    icon: StarIcon,
    name: "加減分項目",
    shortCode: "創",
    itemRange: "項目 64–66（3項）",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-600 dark:text-purple-400",
  },
];

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "住宿型照顧機構評鑑基準",
  description:
    "115 年度住宿式長期照顧服務機構績效考核指標，共 63 項目 + 加減分 3 項，4 大區塊完整解說。",
  path: "/school/nursing-home",
  hasPart: [
    {
      name: "A、經營管理效能（項目 1–9）",
      url: "https://reportwang.com/school/nursing-home/management",
    },
    {
      name: "B、專業照護品質（項目 10–38）",
      url: "https://reportwang.com/school/nursing-home/professional-quality",
    },
    {
      name: "C、安全環境設備（項目 39–54）",
      url: "https://reportwang.com/school/nursing-home/safety-environment",
    },
    {
      name: "D、個案權益保障（項目 55–63）",
      url: "https://reportwang.com/school/nursing-home/client-rights",
    },
    {
      name: "加減分項目（項目 64–66）",
      url: "https://reportwang.com/school/nursing-home/innovation",
    },
  ],
});

const regularItemCount = nursingHomeProfile.sections
  .filter((s) => s.shortCode !== "創")
  .flatMap((s) => s.items).length;
const bonusItemCount = nursingHomeProfile.sections
  .filter((s) => s.shortCode === "創")
  .flatMap((s) => s.items).length;

const FAQ_ITEMS = [
  {
    question: "住宿型照顧機構評鑑分哪幾大區塊、共幾項？",
    answer: `分 4 大區塊（A 經營管理效能、B 專業照護品質、C 安全環境設備、D 個案權益保障）共 ${regularItemCount} 項正式評鑑項目，另有加減分 3 項（加分 2 項、扣分 1 項）。適用 115 年度衛生福利部全國版基準，相對 114 年度大幅精簡合併。`,
  },
  {
    question: "住宿型機構評鑑中最需要注意的文件是哪些？",
    answer: "重點文件包括：工作手冊與員工申訴辦法（A1/A2）、業務計畫書及前次評鑑缺失改善記錄（A3/A4）、護理師及照服員設置資格佐證（A8）、在職教育訓練出席記錄（A9）；護理照護及用藥安全紀錄（B 區塊）；消防設備檢修報告及 EOP 演練記錄（C9/C11）；入住契約（審閱期至少 5 天，D2）及申訴機制紀錄（D4）。",
  },
  {
    question: "多職類協作下，評鑑文件如何分工管理？",
    answer: "依護理師、照服員、社工師、營養師分別建立標籤，各職類文件自動歸位，機構主任可跨標籤彙整。評鑑前篩選「評鑑備審」標籤，避免文件散落找不到。",
  },
  {
    question: "如何用報告汪準備住宿型機構評鑑備審？",
    answer: `一鍵匯入住宿型評鑑範本後，可按 A/B/C/D 四大區塊分標籤管理，AI 逐項對應 ${regularItemCount} 項基準分析文件缺漏，直接標示哪個區塊需要補件，大幅減少評鑑前的臨時補件壓力。`,
  },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/nursing-home"));

export default function NursingHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">住宿型照顧機構</Badge>
        <h1 className="text-2xl font-bold mb-3">115 年住宿式長期照顧服務機構評鑑指標總覽</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${nursingHomeMeta.year} 年度` },
            { label: "資料來源", value: nursingHomeMeta.agency },
            { label: "評鑑項目", value: `共 ${regularItemCount} 正式項 + 加減分 ${bonusItemCount} 項` },
            { label: "評鑑區塊", value: "4 大區塊" },
          ]}
        />
        <SourceCallout meta={nursingHomeMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed mt-2">
          以下為 115 年度住宿式長期照顧服務機構績效考核指標（衛生福利部全國版），共 63 個評鑑項目 + 加減分 3 項，分為 4 大區塊。
          點擊各區塊可查看詳細說明、準備要訣與實用提示。
        </p>
      </div>

      {/* 各區塊項目數對照 */}
      <div className="not-prose mb-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <caption className="py-2.5 px-4 text-left font-semibold text-foreground border-b bg-muted/30">
            住宿型照顧機構評鑑各區塊概覽
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
              <td className="py-2 px-4 text-center text-muted-foreground">1–9</td>
              <td className="py-2 px-4 text-center">9 項</td>
              <td className="py-2 px-4 text-muted-foreground">人員配置、工作手冊、訓練計畫、勞動條件</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">B、專業照護品質</td>
              <td className="py-2 px-4 text-center text-muted-foreground">10–38</td>
              <td className="py-2 px-4 text-center">29 項</td>
              <td className="py-2 px-4 text-muted-foreground">照護計畫、醫療服務、感染管制、膳食復健</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">C、安全環境設備</td>
              <td className="py-2 px-4 text-center text-muted-foreground">39–54</td>
              <td className="py-2 px-4 text-center">16 項</td>
              <td className="py-2 px-4 text-muted-foreground">空間設備、消防安全、無障礙設施、緊急應變</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">D、個案權益保障</td>
              <td className="py-2 px-4 text-center text-muted-foreground">55–63</td>
              <td className="py-2 px-4 text-center">9 項</td>
              <td className="py-2 px-4 text-muted-foreground">服務契約、申訴機制、臨終照護</td>
            </tr>
            <tr className="bg-muted/10">
              <td className="py-2 px-4 text-muted-foreground">加減分項目</td>
              <td className="py-2 px-4 text-center text-muted-foreground">64–66</td>
              <td className="py-2 px-4 text-center text-muted-foreground">3 項</td>
              <td className="py-2 px-4 text-muted-foreground">創新服務（＋）、空氣品質（＋）、違規及重大負面事件（－）</td>
            </tr>
            <tr className="border-t bg-muted/20 font-semibold">
              <td className="py-2 px-4">合計</td>
              <td className="py-2 px-4 text-center">1–66</td>
              <td className="py-2 px-4 text-center">63 項 ＋ 3 加減分</td>
              <td className="py-2 px-4 text-xs text-muted-foreground font-normal">B、專業照護品質條文最多（29 項）</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {sectionMeta.map((sec) => {
          const section = nursingHomeProfile.sections.find((s) => s.shortCode === sec.shortCode);
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
        <h2 className="text-lg font-semibold mb-4">全部 {regularItemCount} 項評鑑項目 + 加減分</h2>
        <div className="space-y-6">
          {nursingHomeProfile.sections.map((section) => {
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
                      href={`/school/nursing-home/${slug}#item-${item.id}`}
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
          下載「住宿型長照機構」評鑑自我檢查表（Excel），對照評鑑基準逐項自我檢核。
        </p>
        <SchoolDownloadButton catalogSlug="residential" />
      </div>

      {/* Import CTA */}
      <div className="mt-10 rounded-xl bg-primary/5 border border-primary/20 p-5">
        <p className="text-sm font-semibold mb-1">看完評鑑基準了嗎？</p>
        <p className="text-sm text-muted-foreground mb-3">
          到報告汪一鍵匯入「住宿型照顧機構」評鑑範本，包含 4 個標籤和 {regularItemCount} 份報告範本，省去手動建立的時間。
        </p>
        <Link
          href="/docs/import-templates"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          了解如何匯入評鑑範本 →
        </Link>
      </div>

      {/* /residential 互連 */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        想了解住宿型長照機構的文書管理系統？{" "}
        <Link href="/residential" className="text-primary hover:underline font-medium">
          前往住宿型機構服務介紹 →
        </Link>
      </p>

      
      {/* 評鑑準備流程圖 */}
      <div className="not-prose my-6">
        <Image
          src="/school/nursing-home-prep-flow.svg"
          alt="住宿型長照機構評鑑準備 4 大步驟：自評診斷、文件整備、模擬預演、正式評鑑"
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
            <span className="text-muted-foreground">項目 C11・緊急應變演練（EOP）</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱演練紀錄，發現機構全年僅辦理 2 次疏散演練且均為白天一般火災情境，未包含複合式災害及夜間演練，不符合 115 年度新增「每年至少 4 次（含複合式 1 次＋夜間 1 次）」規定，評量結果為「E」。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            訂定年度演練計畫書（Q1 日間、Q2 夜間、Q3 複合式、Q4 日間），每場留存「演練照片＋人員簽到表＋檢討記錄」，次月完成改善追蹤，並納入年度品質指標監控。
          </p>
        </div>

        <div className="rounded-xl border overflow-hidden text-sm">
          <div className="flex items-center gap-2 bg-amber-500/10 border-b px-4 py-2.5">
            <span className="font-semibold text-amber-700 dark:text-amber-400">缺失情境</span>
            <span className="text-muted-foreground">項目 D2（id 56）・入住契約審閱期</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員審閱入住契約範本，發現「審閱期」欄位填寫「3 日」，不符合 115 年度 D2 新增的「至少 5 天」規定；部分個案簽約記錄顯示當日完成簽約，缺少審閱期確認機制，被認定為「B」缺失。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            修訂契約範本，將審閱期改為「不少於 5 個工作日」，新增「個案/家屬已審閱確認」簽名欄（含日期），入住流程標準化為「寄送契約→5 日後回簽」，並留存快遞/通訊紀錄備查。
          </p>
        </div>
      </div>
      <SchoolFaqSection items={FAQ_ITEMS} />
    </>
  );
}
