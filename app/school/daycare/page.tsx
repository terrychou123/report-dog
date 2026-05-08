import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { daycareProfile, meta as daycareMeta } from "@/lib/ai/evaluation-profiles/daycare";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import {
  ShieldCheckIcon,
  HeartPulseIcon,
  SettingsIcon,
  ShieldIcon,
  ArrowRightIcon,
  DownloadIcon,
  StarIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "日間照顧機構評鑑基準總覽",
  description:
    "115 年度臺北市政府社會局日間照顧機構法定評鑑基準完整說明，共 43 正式項目、4 大區塊：個案權益保障、專業照護品質、經營管理效能與安全環境設備，另含 2 項加分題。",
  keywords: [
    "日間照顧機構評鑑基準",
    "日照中心評鑑",
    "日間照顧評鑑準備",
    "臺北市日照評鑑",
    "日間照顧中心評鑑基準",
    "115年度評鑑",
    "日照評鑑指標",
  ],
  alternates: { canonical: "https://reportwang.com/school/daycare" },
  openGraph: {
    title: "日間照顧機構評鑑基準總覽｜評鑑小教室｜報告汪",
    description: "43 項日間照顧機構法定評鑑基準完整解說，掌握評鑑重點，提升評鑑通過率。",
    url: "https://reportwang.com/school/daycare",
  },
};

// 四大正式區塊設定
const sectionMeta = [
  {
    href: "/school/daycare/client-rights",
    icon: ShieldCheckIcon,
    name: "壹、個案權益保障",
    shortCode: "權",
    itemRange: "項目 1–4",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/daycare/professional-quality",
    icon: HeartPulseIcon,
    name: "貳、專業照護品質",
    shortCode: "專",
    itemRange: "項目 5–22",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/daycare/management",
    icon: SettingsIcon,
    name: "參、經營管理效能",
    shortCode: "管",
    itemRange: "項目 23–37",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/daycare/safety-environment",
    icon: ShieldIcon,
    name: "肆、安全環境設備",
    shortCode: "安",
    itemRange: "項目 38–43",
    bgClass: "bg-teal-500/10",
    textClass: "text-teal-600 dark:text-teal-400",
  },
];

// 取得加分題區塊
const bonusSection = daycareProfile.sections.find((s) => s.shortCode === "加");

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "日間照顧機構評鑑基準",
  description:
    "115 年度臺北市政府社會局日間照顧機構法定評鑑基準，共 43 正式項目、4 大區塊完整解說。",
  path: "/school/daycare",
  hasPart: [
    {
      name: "壹、個案權益保障（項目 1–4）",
      url: "https://reportwang.com/school/daycare/client-rights",
    },
    {
      name: "貳、專業照護品質（項目 5–22）",
      url: "https://reportwang.com/school/daycare/professional-quality",
    },
    {
      name: "參、經營管理效能（項目 23–37）",
      url: "https://reportwang.com/school/daycare/management",
    },
    {
      name: "肆、安全環境設備（項目 38–43）",
      url: "https://reportwang.com/school/daycare/safety-environment",
    },
    {
      name: "伍、加分題（項目 44–45）",
      url: "https://reportwang.com/school/daycare/bonus",
    },
  ],
});

const FAQ_ITEMS = [
  { question: "日間照顧機構評鑑分哪幾大區塊、共幾項？", answer: "4 大區塊（壹、個案權益保障；貳、專業照護品質；參、經營管理效能；肆、安全環境設備）共 43 項正式評鑑項目，另有 2 項加分題。" },
  { question: "日照機構評鑑最常見的缺失是哪些？", answer: "常見缺失集中在貳區的個別服務計畫文件不完整（項目 5–7）、服務紀錄與 ICP 目標脫節，以及參區的人員資格證書未定期更新。建議提前 3 個月逐項自我檢核。" },
  { question: "評鑑前需要準備哪些核心文件？", answer: "主要包括：個案 IOA 評估表與 ICP 個別服務計畫、照服員及社工師資格證書、建築消防安全檢查記錄、品質管理會議紀錄，以及每季照護品質指標統計分析。" },
  { question: "如何用報告汪準備日照中心評鑑文書？", answer: "匯入日照評鑑範本後，依 4 大區塊建立標籤，AI 輔助逐項分析文件是否符合 115 年度評鑑基準。評鑑前直接篩選對應標籤備齊備審文件，不再臨時找不到資料。" },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/daycare"));

export default function DaycarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* 頁首 */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">日間照顧機構</Badge>
        <h1 className="text-2xl font-bold mb-3">日間照顧機構評鑑基準總覽</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${daycareMeta.year} 年度` },
            { label: "主管機關", value: daycareMeta.agency },
            { label: "評鑑項目", value: `共 ${daycareMeta.totalItems} 項（43 正式 + 2 加分題）` },
            { label: "評鑑區塊", value: "4 大區塊" },
          ]}
        />
        <p className="text-muted-foreground text-sm leading-relaxed">
          以下為 115 年度臺北市政府社會局日間照顧機構法定評鑑基準，共 43 個評鑑項目，分為 4 大區塊，另含 2 項加分題。
          點擊各區塊可查看詳細說明、準備要訣與實用提示。
        </p>
        <SourceCallout meta={daycareMeta} />
      </div>

      {/* 各區塊項目數對照 */}
      <div className="not-prose mb-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <caption className="py-2.5 px-4 text-left font-semibold text-foreground border-b bg-muted/30">
            115 年度日間照顧機構評鑑各區塊概覽
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
              <td className="py-2 px-4 text-center text-muted-foreground">5–22</td>
              <td className="py-2 px-4 text-center">18 項</td>
              <td className="py-2 px-4 text-muted-foreground">服務評估、照顧計畫、活動辦理、協助服藥、健康管理</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">參、經營管理效能</td>
              <td className="py-2 px-4 text-center text-muted-foreground">23–37</td>
              <td className="py-2 px-4 text-center">15 項</td>
              <td className="py-2 px-4 text-muted-foreground">業務計畫、人力配置、訓練留任率、財務管理、緊急事件</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">肆、安全環境設備</td>
              <td className="py-2 px-4 text-center text-muted-foreground">38–43</td>
              <td className="py-2 px-4 text-center">6 項</td>
              <td className="py-2 px-4 text-muted-foreground">高齡友善環境、盥洗衛生、飲用水、廚房衛生、病媒防治</td>
            </tr>
            <tr className="bg-muted/10">
              <td className="py-2 px-4 text-muted-foreground">加分題</td>
              <td className="py-2 px-4 text-center text-muted-foreground">44–45</td>
              <td className="py-2 px-4 text-center text-muted-foreground">2 項</td>
              <td className="py-2 px-4 text-muted-foreground">原住民族文化敏感度、監視錄影設備（最多加 3 分）</td>
            </tr>
            <tr className="border-t bg-muted/20 font-semibold">
              <td className="py-2 px-4">合計</td>
              <td className="py-2 px-4 text-center">1–43</td>
              <td className="py-2 px-4 text-center">43 項 ＋ 2 加分</td>
              <td className="py-2 px-4 text-xs text-muted-foreground font-normal">貳、專業照護品質項目最多（18 項）</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 四大區塊卡片 */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {sectionMeta.map((sec) => {
          const section = daycareProfile.sections.find((s) => s.shortCode === sec.shortCode);
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

      {/* 全部 43 項正式評鑑項目 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">全部 43 項正式評鑑項目</h2>
        <div className="space-y-6">
          {daycareProfile.sections
            .filter((s) => s.shortCode !== "加")
            .map((section) => {
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
                        href={`/school/daycare/${slug}#item-${item.id}`}
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

      {/* 加分題區塊 */}
      {bonusSection && (
        <div className="mb-8 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <StarIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <h3 className="text-base font-semibold text-yellow-600 dark:text-yellow-400">
              伍、加分題（2 項）
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            加分題不計入正式評鑑項次，由評鑑委員共議給分，總計最多加分 3 分。
          </p>
          <div className="space-y-1">
            {bonusSection.items.map((item) => (
              <Link
                key={item.id}
                href={`/school/daycare/bonus#item-${item.id}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 bg-background/50 hover:bg-yellow-500/10 transition-colors group"
              >
                <StarIcon className="shrink-0 h-4 w-4 text-yellow-500" />
                <span className="text-sm group-hover:text-yellow-700 dark:group-hover:text-yellow-300 transition-colors">{item.title}</span>
                <Badge variant="outline" className="ml-auto text-xs shrink-0">
                  {item.responsible}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 下載 CTA */}
      <div className="mt-6 rounded-xl border border-dashed border-primary/30 bg-muted/50 p-5 text-center">
        <p className="text-sm font-semibold mb-1">📋 免費下載自我檢查表</p>
        <p className="text-sm text-muted-foreground mb-3">
          下載「日間照顧中心」評鑑自我檢查表（Excel），對照 115 年度評鑑基準逐項自我檢核。
        </p>
        <a
          href="/downloads/day-care.xlsx"
          download
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <DownloadIcon className="h-4 w-4" />
          免費下載 Excel 檢查表 →
        </a>
      </div>

      {/* 匯入 CTA */}
      <div className="mt-6 rounded-xl bg-primary/5 border border-primary/20 p-5">
        <p className="text-sm font-semibold mb-1">看完評鑑基準了嗎？</p>
        <p className="text-sm text-muted-foreground mb-3">
          到報告汪一鍵匯入「日間照顧機構」評鑑範本，依 115 年度最新基準，省去手動建立的時間。
        </p>
        <Link
          href="/docs/import-templates"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          了解如何匯入評鑑範本 →
        </Link>
      </div>

      {/* 小規機交叉導引 */}
      <div className="mt-6 rounded-xl border border-dashed p-5">
        <p className="text-sm font-semibold mb-1">🏠 提供居家服務或夜宿服務？</p>
        <p className="text-sm text-muted-foreground mb-3">
          若您的機構在日照基礎上擴充「到府居家服務」或「臨時住宿（夜宿）」功能，屬於小規模多機能機構（小規機），
          評鑑基準另有 2 項獨有項目。
        </p>
        <Link
          href="/school/multi-function-care"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          查看小規機評鑑基準（含居服+夜宿獨有項目）→
        </Link>
      </div>

      <SchoolFaqSection items={FAQ_ITEMS} />
    </>
  );
}
