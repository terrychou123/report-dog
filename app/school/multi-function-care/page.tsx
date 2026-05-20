import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { multiFunctionCareProfile, meta as multiFunctionCareMeta } from "@/lib/ai/evaluation-profiles/multi-function-care";
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
  StarIcon,
  HomeIcon,
  SunIcon,
  BedDoubleIcon,
  InfoIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "115年度小規模多機能機構評鑑指標｜45項＋2加分題",
  description:
    "臺北市 115 年度小規模多機能機構評鑑指標 45 項＋2 加分題，涵蓋日照、居服、夜宿三合一服務，4 大區塊：個案權益、專業照護、經營管理、安全環境。",
  keywords: [
    "小規模多機能機構評鑑",
    "小規機評鑑基準",
    "小規模多機能評鑑準備",
    "臺北市小規機評鑑",
    "115年度小規機評鑑",
    "小規模多機能機構評鑑指標",
    "社區式長照評鑑",
  ],
  alternates: { canonical: "/school/multi-function-care" },
  openGraph: {
    title: "115年度小規模多機能機構評鑑指標｜45項＋2加分題",
    description: "45 項小規模多機能機構評鑑指標完整解說，涵蓋日照、居服、夜宿三合一評鑑重點。",
    url: "https://reportwang.com/school/multi-function-care",
  },
};

// 四大正式區塊設定
const sectionMeta = [
  {
    href: "/school/multi-function-care/client-rights",
    icon: ShieldCheckIcon,
    name: "壹、個案權益保障",
    shortCode: "權",
    itemRange: "項目 1–4",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/multi-function-care/professional-quality",
    icon: HeartPulseIcon,
    name: "貳、專業照護品質",
    shortCode: "專",
    itemRange: "項目 5–23",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/multi-function-care/management",
    icon: SettingsIcon,
    name: "參、經營管理效能",
    shortCode: "管",
    itemRange: "項目 24–39",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/multi-function-care/safety-environment",
    icon: ShieldIcon,
    name: "肆、安全環境設備",
    shortCode: "安",
    itemRange: "項目 40–45",
    bgClass: "bg-teal-500/10",
    textClass: "text-teal-600 dark:text-teal-400",
  },
];

const bonusSection = multiFunctionCareProfile.sections.find((s) => s.shortCode === "加");

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "小規模多機能機構評鑑基準",
  description:
    "115 年度臺北市政府社會局小規模多機能機構法定評鑑基準，共 45 正式項目、4 大區塊完整解說。",
  path: "/school/multi-function-care",
  hasPart: [
    {
      name: "壹、個案權益保障（項目 1–4）",
      url: "https://reportwang.com/school/multi-function-care/client-rights",
    },
    {
      name: "貳、專業照護品質（項目 5–23）",
      url: "https://reportwang.com/school/multi-function-care/professional-quality",
    },
    {
      name: "參、經營管理效能（項目 24–39）",
      url: "https://reportwang.com/school/multi-function-care/management",
    },
    {
      name: "肆、安全環境設備（項目 40–45）",
      url: "https://reportwang.com/school/multi-function-care/safety-environment",
    },
    {
      name: "伍、加分題（項目 46–47）",
      url: "https://reportwang.com/school/multi-function-care/bonus",
    },
  ],
});

const FAQ_ITEMS = [
  {
    question: "小規模多機能機構（小規機）評鑑分哪幾大區塊、共幾項？",
    answer: "4 大區塊共 45 項正式評鑑項目，另有 2 項加分題。四大區塊為：壹、個案權益保障（4 項）；貳、專業照護品質（19 項）；參、經營管理效能（16 項）；肆、安全環境設備（6 項）。計分公式：（原始分 ÷ 112.5）× 100 + 加分題。",
  },
  {
    question: "小規機評鑑與日照中心評鑑的最大差異是什麼？",
    answer: "小規機多了兩個日照中心沒有的獨有項目：第 11 項「照顧服務員之服務執行（居服）」與第 29 項「訂有寢室管理規範（夜宿）」。此外，自評表需分別統計日照、居服、夜宿三類服務人日數，工作手冊涵蓋範圍也需包含居服員與夜宿輪值人員。",
  },
  {
    question: "小規機評鑑前需要準備哪些核心文件？",
    answer: "主要包括：三類服務（日照/居服/夜宿）的個別照顧計畫與服務紀錄、居服員到府查核記錄、夜宿寢室管理規範與更換記錄、各類人員資格證書及訓練記錄、服務契約（採用衛福部 113 年社區式定型化契約範本）、品管指標統計分析，以及環境安全相關的水質檢驗報告。",
  },
  {
    question: "小規機自評表的服務人數要怎麼統計？",
    answer: "自評表需分三類分別填寫：(一)日間照顧服務人數、(二)居家服務人數、(三)夜宿服務人數，每類各需填寫 114 年 12 月 31 日及 115 年 4 月 30 日兩個時點的服務人數與人日數。",
  },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/multi-function-care"));

export default function MultiFunctionCarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* 與日照中心的關聯說明 */}
      <div className="mb-6 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 flex gap-3">
        <InfoIcon className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          小規機核心架構與日間照顧機構相同。若您已熟悉日照評鑑，可直接查看本頁的
          <a href="#diff-table" className="text-primary hover:underline mx-1">與日照中心差異對照表</a>
          掌握新增重點。
          <Link href="/school/daycare" className="text-primary hover:underline ml-1">→ 日照中心評鑑基準</Link>
        </p>
      </div>

      {/* 頁首 */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">小規模多機能機構</Badge>
        <h1 className="text-2xl font-bold mb-3">115 年度小規模多機能機構評鑑指標總覽</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${multiFunctionCareMeta.year} 年度` },
            { label: "資料來源", value: multiFunctionCareMeta.agency },
            { label: "評鑑項目", value: "共 45 正式項目 + 2 加分題" },
            { label: "服務類型", value: "日照 + 居服 + 夜宿三合一" },
          ]}
        />
        <p className="text-muted-foreground text-sm leading-relaxed">
          以下為 115 年度臺北市政府社會局小規模多機能機構法定評鑑基準，共 45 個評鑑項目，分為 4 大區塊，另含 2 項加分題。
          小規機在日間照顧的基礎上，增加居家服務（到府）與臨時住宿（夜宿）功能，評鑑重點亦延伸至三種服務模式。
          點擊各區塊可查看詳細說明、準備要訣與實用提示。
        </p>
        <SourceCallout meta={multiFunctionCareMeta} />
      </div>

      {/* 自評表三類統計提示 */}
      <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">📋 自評表：三類服務人日數分開統計</p>
        <p className="text-sm text-muted-foreground">
          自評表需分別填寫：(一)日間照顧、(二)居家服務、(三)夜宿服務的服務人數與人日數，
          各填寫 114 年 12 月 31 日及 115 年 4 月 30 日兩個時點。請提前確認三類統計口徑一致。
        </p>
      </div>

      {/* 四大區塊卡片 */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {sectionMeta.map((sec) => {
          const section = multiFunctionCareProfile.sections.find((s) => s.shortCode === sec.shortCode);
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

      {/* 全部 45 項正式評鑑項目 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">全部 45 項正式評鑑項目</h2>
        <div className="space-y-6">
          {multiFunctionCareProfile.sections
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
                        href={`/school/multi-function-care/${slug}#item-${item.id}`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors group"
                      >
                        <span className="shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-mono font-semibold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          {item.id}
                        </span>
                        <span className="text-sm group-hover:text-primary transition-colors flex items-center gap-2">
                          {item.title}
                          {item.id === 11 && (
                            <Badge className="text-xs bg-green-500/10 text-green-700 dark:text-green-400 border-0 py-0">居服</Badge>
                          )}
                          {item.id === 29 && (
                            <Badge className="text-xs bg-purple-500/10 text-purple-700 dark:text-purple-400 border-0 py-0">夜宿</Badge>
                          )}
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
            加分題不計入正式 45 項評鑑項次，由評鑑委員共議給分，總計最多加分 3 分。
          </p>
          <div className="space-y-1">
            {bonusSection.items.map((item) => (
              <Link
                key={item.id}
                href={`/school/multi-function-care/bonus#item-${item.id}`}
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

      {/* 與日照中心差異對照表 */}
      <div id="diff-table" className="mb-8 rounded-xl border p-5">
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <SunIcon className="h-4 w-4 text-orange-500" />
          與日間照顧機構（日照中心）的差異
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-2 pr-4 text-muted-foreground font-medium">面向</th>
                <th className="text-left pb-2 pr-4 text-muted-foreground font-medium">
                  <span className="flex items-center gap-1"><SunIcon className="h-3 w-3" />日照中心</span>
                </th>
                <th className="text-left pb-2 text-muted-foreground font-medium">
                  <span className="flex items-center gap-1"><HomeIcon className="h-3 w-3" /><BedDoubleIcon className="h-3 w-3" />小規機</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 pr-4 text-muted-foreground">正式項目數</td>
                <td className="py-2 pr-4">43 項</td>
                <td className="py-2 font-medium">45 項（多 2 項）</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-muted-foreground">第 11 項</td>
                <td className="py-2 pr-4 text-muted-foreground">無居服項目</td>
                <td className="py-2">
                  <span className="inline-flex items-center gap-1">
                    <Badge className="text-xs bg-green-500/10 text-green-700 dark:text-green-400 border-0">居服</Badge>
                    照服員服務執行（居服）
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-muted-foreground">第 29 項</td>
                <td className="py-2 pr-4 text-muted-foreground">無夜宿項目</td>
                <td className="py-2">
                  <span className="inline-flex items-center gap-1">
                    <Badge className="text-xs bg-purple-500/10 text-purple-700 dark:text-purple-400 border-0">夜宿</Badge>
                    寢室管理規範（夜宿）
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-muted-foreground">工作手冊範圍</td>
                <td className="py-2 pr-4">一般人員</td>
                <td className="py-2">涵蓋居服員、夜宿輪值人員</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-muted-foreground">緊急事件</td>
                <td className="py-2 pr-4">機構內場景</td>
                <td className="py-2">需涵蓋到府服務及夜宿場景</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          其餘項目（壹個案權益、大部分貳專業照護、參經營管理、肆安全環境）與日照中心評鑑高度相似。
          <Link href="/school/daycare" className="text-primary hover:underline ml-1">→ 查看日照中心評鑑基準</Link>
        </p>
      </div>

      {/* 匯入 CTA */}
      <div className="mt-6 rounded-xl bg-primary/5 border border-primary/20 p-5">
        <p className="text-sm font-semibold mb-1">看完評鑑基準了嗎？</p>
        <p className="text-sm text-muted-foreground mb-3">
          到報告汪一鍵匯入「小規模多機能機構」評鑑範本，依 115 年度最新基準，省去手動建立的時間。
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
          src="/school/multi-function-care-prep-flow.svg"
          alt="小規模多機能機構評鑑準備 4 大步驟：自評診斷、文件整備、模擬預演、正式評鑑"
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
            <span className="text-muted-foreground">項目 11・居服照服員服務執行（小規機獨有）</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱居服服務記錄，發現到宅服務的起訖時間記錄與 GPS 打卡紀錄有落差，且居服與日照服務記錄混用同一格式，無法清楚區分兩類服務的提供時間與內容。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            分開建立「居服服務記錄表」與「日照服務記錄表」，居服記錄加入 GPS 打卡截圖欄位，每週督導抽查對照，確保記錄與實際服務一致，每月統計居服執行率並與督導目標對比。
          </p>
        </div>

        <div className="rounded-xl border overflow-hidden text-sm">
          <div className="flex items-center gap-2 bg-amber-500/10 border-b px-4 py-2.5">
            <span className="font-semibold text-amber-700 dark:text-amber-400">缺失情境</span>
            <span className="text-muted-foreground">項目 29・夜宿寢室管理（小規機獨有）</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱夜宿服務記錄，發現夜宿人員名冊未即時更新，日夜班照顧者無交接記錄，且夜宿區域的每班次環境巡查表缺失，無法確認夜間安全巡視是否確實執行。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            建立夜宿專用「夜間交接班紀錄表」（含個案狀況、特殊事項、環境巡查欄位），設計夜宿人員每日名冊確認流程，夜宿區域每班次進行環境巡查並簽名記錄，月底由主管彙整查核。
          </p>
        </div>
      </div>
      <SchoolFaqSection items={FAQ_ITEMS} />
    </>
  );
}
