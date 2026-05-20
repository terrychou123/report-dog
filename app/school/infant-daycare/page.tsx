import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { infantDaycareProfile, meta as infantDaycareMeta } from "@/lib/ai/evaluation-profiles/infant-daycare";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import {
  SettingsIcon,
  BabyIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "114-116年度托嬰中心評鑑指標｜60項基準完整說明",
  description:
    "臺北市 114-116 年度托嬰中心評鑑指標 60 項，3 大區塊：行政管理（20分）、托育活動（40分）、健康安全（40分），附免費自評表下載。",
  keywords: [
    "托嬰中心評鑑",
    "臺北市托嬰中心評鑑",
    "114年托嬰中心評鑑",
    "114-116年度托嬰中心評鑑指標",
    "托嬰中心評鑑基準",
    "托嬰中心自評表",
    "嬰幼兒照護評鑑",
    "托育評鑑準備",
  ],
  alternates: { canonical: "/school/infant-daycare" },
  openGraph: {
    title: "114-116年度托嬰中心評鑑指標｜60項基準完整說明",
    description:
      "臺北市114-116年度托嬰中心評鑑指標60項完整解說，行政管理、托育活動、健康安全三大區塊，快速掌握評鑑重點。",
    url: "https://reportwang.com/school/infant-daycare",
  },
};

const sectionMeta = [
  {
    href: "/school/infant-daycare/administration",
    icon: SettingsIcon,
    name: "一、行政管理",
    itemRange: "項目 1–11",
    score: "20 分",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
    sectionIndices: [0, 1, 2, 3, 4],
  },
  {
    href: "/school/infant-daycare/childcare-activities",
    icon: BabyIcon,
    name: "二、托育活動",
    itemRange: "項目 12–36",
    score: "40 分",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
    sectionIndices: [5, 6, 7, 8],
  },
  {
    href: "/school/infant-daycare/health-safety",
    icon: ShieldCheckIcon,
    name: "三、健康安全",
    itemRange: "項目 37–60",
    score: "40 分",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
    sectionIndices: [9, 10, 11, 12, 13],
  },
];

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "托嬰中心評鑑基準",
  description:
    "臺北市114-116年度托嬰中心評鑑指標，共60項目、3大區塊完整解說。",
  path: "/school/infant-daycare",
  hasPart: sectionMeta.map((s) => ({
    name: s.name,
    url: `https://reportwang.com${s.href}`,
    description: `${s.itemRange}，配分 ${s.score}`,
  })),
});

const FAQ_ITEMS = [
  { question: "托嬰中心評鑑分幾大區塊、共幾項？", answer: "3 大區塊（行政管理、托育活動及環境、健康安全管理）共 60 項評鑑基準，是評鑑項目數較多的類型之一。" },
  { question: "健康安全管理的評鑑重點是什麼？", answer: "給藥委託書管理（含家長簽名、藥品保存）、食物樣品保留（留樣 48 小時）、傳染病通報記錄、意外事件及危機處理記錄，以及定期環境消毒紀錄。" },
  { question: "嬰幼兒日常照護紀錄如何符合評鑑標準？", answer: "每位嬰幼兒每日需記錄飲食（哺乳/配方奶次數）、睡眠、排泄、健康狀況。建議依嬰幼兒建立個人標籤，保育員每日更新，方便評鑑委員查閱。" },
  { question: "如何用報告汪準備托嬰中心評鑑文書？", answer: "匯入托嬰中心評鑑範本（60 項基準），AI 逐項對應三大區塊，自動標示哪些文件不足，評鑑前確認每項基準均有完整紀錄。" },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/infant-daycare"));

// Color mapping by section index
function getSectionColor(idx: number) {
  if (idx <= 4) return { bgClass: "bg-orange-500/10", textClass: "text-orange-600 dark:text-orange-400" };
  if (idx <= 8) return { bgClass: "bg-blue-500/10", textClass: "text-blue-600 dark:text-blue-400" };
  return { bgClass: "bg-green-500/10", textClass: "text-green-600 dark:text-green-400" };
}

function getMajorHref(idx: number) {
  if (idx <= 4) return "/school/infant-daycare/administration";
  if (idx <= 8) return "/school/infant-daycare/childcare-activities";
  return "/school/infant-daycare/health-safety";
}

export default function InfantDaycareSchoolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="prose prose-sm dark:prose-invert max-w-none mb-8">
        <h1 className="text-2xl font-bold mb-2">114-116 年度托嬰中心評鑑指標總覽</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${infantDaycareMeta.year} 年度` },
            { label: "資料來源", value: infantDaycareMeta.agency },
            { label: "評鑑項目", value: `共 ${infantDaycareMeta.totalItems} 項` },
            { label: "評鑑區塊", value: "3 大區塊" },
          ]}
        />
        <SourceCallout meta={infantDaycareMeta} />
        <p className="text-muted-foreground mt-2">
          臺北市114-116年度托嬰中心評鑑指標，共 60 項目、3 大區塊。涵蓋行政管理（20分）、托育活動（40分）及健康安全（40分），幫助托嬰中心負責人、托育人員及行政人員系統性備戰評鑑。
        </p>
      </div>

      {/* 各區塊配分對照 */}
      <div className="not-prose mb-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <caption className="py-2.5 px-4 text-left font-semibold text-foreground border-b bg-muted/30">
            114–116 年度托嬰中心評鑑各區塊配分對照
          </caption>
          <thead>
            <tr className="border-b bg-muted/20 text-muted-foreground">
              <th className="py-2 px-4 text-left font-medium">評鑑區塊</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">項目範圍</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">項目數</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">配分</th>
              <th className="py-2 px-4 text-left font-medium">主要查核重點</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 px-4 font-medium">一、行政管理</td>
              <td className="py-2 px-4 text-center text-muted-foreground">1–11</td>
              <td className="py-2 px-4 text-center">11 項</td>
              <td className="py-2 px-4 text-center font-medium">20 分</td>
              <td className="py-2 px-4 text-muted-foreground">立案行政、員工訓練、人事管理、財務安全、兒童權益保障</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">二、托育活動</td>
              <td className="py-2 px-4 text-center text-muted-foreground">12–36</td>
              <td className="py-2 px-4 text-center">25 項</td>
              <td className="py-2 px-4 text-center font-bold text-primary">40 分</td>
              <td className="py-2 px-4 text-muted-foreground">關係建立與互動、環境規劃、活動設計、寶寶日誌、親師交流</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">三、健康安全</td>
              <td className="py-2 px-4 text-center text-muted-foreground">37–60</td>
              <td className="py-2 px-4 text-center">24 項</td>
              <td className="py-2 px-4 text-center font-bold text-primary">40 分</td>
              <td className="py-2 px-4 text-muted-foreground">健康管理、飲食衛生、給藥委託、衛生設備、感染管制</td>
            </tr>
            <tr className="border-t bg-muted/20 font-semibold">
              <td className="py-2 px-4">合計</td>
              <td className="py-2 px-4 text-center">1–60</td>
              <td className="py-2 px-4 text-center">60 項</td>
              <td className="py-2 px-4 text-center">100 分</td>
              <td className="py-2 px-4 text-xs text-muted-foreground font-normal">二、托育活動與三、健康安全各佔 40 分</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {sectionMeta.map((section) => {
          const Icon = section.icon;
          const items = section.sectionIndices.flatMap(
            (i) => infantDaycareProfile.sections[i].items
          );
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group relative rounded-xl border bg-card p-5 hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 rounded-lg ${section.bgClass} p-2`}>
                  <Icon className={`h-5 w-5 ${section.textClass}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                    {section.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {section.itemRange}
                  </p>
                  {/* Item chips preview */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {items.slice(0, 3).map((item) => (
                      <span
                        key={item.id}
                        className={`text-xs px-2 py-0.5 rounded-full ${section.bgClass} ${section.textClass}`}
                      >
                        {item.id}. {item.title.length > 8 ? item.title.slice(0, 8) + "…" : item.title}
                      </span>
                    ))}
                    {items.length > 3 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        +{items.length - 3} 項
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {items.length} 項 ／ {section.score}
                    </Badge>
                    <ArrowRightIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Full item list */}
      <div className="mt-10 space-y-6">
        <h2 className="text-lg font-semibold">所有評鑑項目</h2>
        {infantDaycareProfile.sections.map((section, sIdx) => {
          const { bgClass, textClass } = getSectionColor(sIdx);
          const href = getMajorHref(sIdx);
          return (
            <div key={section.name}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${bgClass} ${textClass}`}>
                  {section.shortCode}
                </span>
                <span className="text-sm font-medium">{section.name}</span>
              </div>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {section.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`${href}#item-${item.id}`}
                    className="flex items-center gap-2.5 rounded-lg border bg-card px-3 py-2 hover:border-primary/40 hover:bg-muted/40 transition-colors"
                  >
                    <span className={`w-7 h-7 rounded-full ${bgClass} flex items-center justify-center text-xs font-bold ${textClass} font-mono shrink-0`}>
                      {item.id}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.responsible}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Import Templates CTA */}
      <div className="mt-10 rounded-xl bg-primary/5 border border-primary/20 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="shrink-0 rounded-xl bg-primary/10 p-3">
            <DownloadIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold mb-1">一鍵匯入托嬰中心評鑑範本</h2>
            <p className="text-sm text-muted-foreground">
              學完評鑑基準後，到報告汪一鍵匯入托嬰中心的標籤與報告範本（60 個評鑑項目，含寶寶日誌、健康紀錄、給藥委託單、食物樣品管理表等），AI 協助填寫內容，省去手動建立的時間。
            </p>
          </div>
        </div>
      </div>

      
      {/* 評鑑準備流程圖 */}
      <div className="not-prose my-6">
        <Image
          src="/school/infant-daycare-prep-flow.svg"
          alt="托嬰中心評鑑準備 4 大步驟：自評診斷、文件整備、模擬預演、正式評鑑"
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
            <span className="text-muted-foreground">二、托育活動・寶寶日誌記錄完整性</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱寶寶日誌，發現部分嬰幼兒的每日記錄缺少「哺乳/配方奶次數及奶量」「如廁次數」等量化資料，且日誌以批次填寫為主，無法反映即時照護狀況，家長確認欄空白。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            建立電子化寶寶日誌系統（含哺乳/睡眠/如廁/活動四大即時記錄欄位），每日結束後發送電子版給家長確認，紙本存檔至學年末；保育員每日完成率列入月考核指標。
          </p>
        </div>

        <div className="rounded-xl border overflow-hidden text-sm">
          <div className="flex items-center gap-2 bg-amber-500/10 border-b px-4 py-2.5">
            <span className="font-semibold text-amber-700 dark:text-amber-400">缺失情境</span>
            <span className="text-muted-foreground">三、健康安全・給藥委託書管理</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱給藥記錄，發現部分給藥委託書缺少「藥品完整名稱」「劑量」「給藥頻次」等必填欄位，且藥品保存未依冷藏/常溫分類，退藥記錄不完整，無家長簽收。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            重新設計給藥委託書（含藥品名稱/劑量/頻次/保存方式/委託期限等欄位），設置冷藏/常溫獨立藥品區，每日雙人核對給藥記錄，退藥時完成退藥記錄表並請家長當場簽收。
          </p>
        </div>
      </div>
      <SchoolFaqSection items={FAQ_ITEMS} />
    </>
  );
}
