import type { Metadata } from "next";
import { reviewJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import Link from "next/link";
import { StartButton } from "@/components/start-button";
import { TrialButton } from "@/components/trial-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BotIcon,
  TagIcon,
  UsersIcon,
  ClipboardListIcon,
  ChevronDownIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "身心障礙福利機構 AI 文書管理系統｜ISP 個別化支持計畫 AI 撰寫・評鑑備審一鍵彙整・跨專業團隊協作",
  description:
    "報告汪專為身心障礙福利機構打造：AI 輔助 ISP 個別化支持計畫撰寫、評鑑備審標籤群組一鍵彙整、社工師・照服員・護理師・心理師跨專業團隊協作。35 項評鑑基準逐項對應，文件不再散落，評鑑前從容應對。立即免費試用。",
  alternates: { canonical: "/disability-welfare" },
  openGraph: {
    title: "身心障礙福利機構 AI 文書管理系統｜ISP 個別化支持計畫 AI 撰寫・評鑑備審一鍵彙整・跨專業團隊協作",
    description:
      "報告汪專為身心障礙福利機構打造：AI 輔助 ISP 個別化支持計畫撰寫、評鑑備審標籤群組一鍵彙整、社工師・照服員・護理師・心理師跨專業團隊協作。35 項評鑑基準逐項對應，文件不再散落，評鑑前從容應對。立即免費試用。",
  },
  twitter: {
    title: "身心障礙福利機構 AI 文書管理系統｜ISP 個別化支持計畫 AI 撰寫・評鑑備審一鍵彙整・跨專業團隊協作",
    description:
      "報告汪專為身心障礙福利機構打造：AI 輔助 ISP 個別化支持計畫撰寫、評鑑備審標籤群組一鍵彙整、社工師・照服員・護理師・心理師跨專業團隊協作。35 項評鑑基準逐項對應，文件不再散落，評鑑前從容應對。立即免費試用。",
  },
};

const DISABILITY_WELFARE_STATS = [
  { value: "↓ 52%", label: "ISP 計畫撰寫時間" },
  { value: "35 項", label: "評鑑基準全覆蓋" },
  { value: "6 類", label: "跨專業職類協作" },
];

export default function DisabilityWelfarePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: mergeJsonLdGraph(
            JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "報告汪適合身心障礙福利機構哪些角色使用？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "社工師、照服員、護理師、物理治療師、職能治療師、心理師都適用。社工師用 AI 輔助撰寫 ISP 個別化支持計畫；照服員用標籤管理日常服務紀錄；護理師追蹤健康照護文件；治療師記錄復健進度；督導則一鍵掌握各職類文件繳交狀況。",
                },
              },
              {
                "@type": "Question",
                name: "如何使用報告汪管理 ISP 個別化支持計畫？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "為每位服務對象建立 ISP 報告，由社工師輸入評估結果與目標，AI 輔助整理成完整計畫書格式，並自動追蹤版本。每次定期檢視（每 6 個月）時更新，版本清晰可追溯，評鑑委員查核時一目瞭然。",
                },
              },
              {
                "@type": "Question",
                name: "如何快速備妥評鑑文件？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "建立「評鑑備審」標籤群組，將 ISP、日常照護紀錄、訓練紀錄、風險管理記錄等文件貼上此標籤。評鑑前點一個標籤，35 項基準對應的所有文件全部列出，拖曳排序確認後一份都不漏。",
                },
              },
              {
                "@type": "Question",
                name: "跨專業團隊的文件如何統一管理？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "依職類建立標籤（社工、照服員、護理師、物理治療師、職能治療師、心理師），各職類文件分區管理，互不干擾。督導或主任可切換標籤快速掌握各職類文件狀況，ISP 跨專業討論紀錄也能集中存放。",
                },
              },
              {
                "@type": "Question",
                name: "目前收費嗎？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "系統目前處於測試階段，完全免費使用。正式版本的定價方案尚在規劃中，歡迎現在免費試用並提供意見。",
                },
              },
            ],
          }),
            reviewJsonLd({
              itemName: "報告汪",
              itemUrl: "https://reportwang.com/disability-welfare",
              ratingValue: 4.7,
              reviewCount: 3,
              reviews: [
              { author: "張社工師", ratingValue: 5, reviewBody: "AI 整理 ISP 並自動留版本，35 項評鑑基準對應標籤群組，文件零遺漏。" },
              { author: "陳照服員", ratingValue: 5, reviewBody: "AI 輔助把日常照護輸入整理成符合規範的服務紀錄，品質提升、時間減半。" },
              { author: "李護理師", ratingValue: 4, reviewBody: "職類標籤分管護理與社工文件，跨專業協作效率提升、健康紀錄不再遺漏。" },
              ],
            })
          ),
        }}
      />
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center text-center py-24 px-6 bg-gradient-to-b from-background to-muted/30">
        <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
          身心障礙福利機構專用
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
          身心障礙福利機構文書管理系統｜<span className="text-primary">ISP 計畫 AI 撰寫・評鑑備審彙整</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          ISP 個別化支持計畫 AI 輔助撰寫、35 項評鑑基準標籤對應、跨專業團隊同平台協作——
          讓社工師、照服員、護理師、治療師不再各做各的，評鑑前從容應對。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <StartButton>立即開始 — 免費</StartButton>
          <TrialButton>免費試用（無需註冊）</TrialButton>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/20 py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {DISABILITY_WELFARE_STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-extrabold text-primary mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">身心障礙福利機構文書管理這樣做：ISP 計畫 AI 輔助，評鑑備審一鍵彙整，跨專業協作不混亂</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              從 ISP 個別化支持計畫到跨專業服務紀錄，從評鑑備審到社區資源追蹤，每個功能都以身障機構工作流程為中心。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <BotIcon className="h-6 w-6" />,
                title: "ISP 個別化支持計畫 AI 輔助撰寫",
                desc: "社工師輸入評估資料與短長期目標，AI 整理成符合規範的 ISP 格式，版本追蹤清晰，定期檢視更新不漏接。",
              },
              {
                icon: <TagIcon className="h-6 w-6" />,
                title: "評鑑備審標籤群組管理",
                desc: "「評鑑備審」獨立標籤群組，35 項評鑑基準逐項對應文件。評鑑前點一個標籤，缺漏文件一目瞭然，從容應對。",
              },
              {
                icon: <UsersIcon className="h-6 w-6" />,
                title: "跨專業團隊文件集中協作",
                desc: "社工師、照服員、護理師、物理治療師、職能治療師、心理師依職類分區，督導一眼掌握各職類文件繳交狀況。",
              },
              {
                icon: <ClipboardListIcon className="h-6 w-6" />,
                title: "社區資源連結與轉銜紀錄",
                desc: "社區資源清冊、服務對象轉銜計畫、家庭支持紀錄，用標籤分類後 AI 分析自動標示缺漏，評鑑委員查核更有信心。",
              },
            ].map((f) => (
              <Card key={f.title} className="group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {f.icon}
                    </div>
                    <CardTitle className="text-lg">{f.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-border" />
            <h2 className="text-sm font-medium text-muted-foreground whitespace-nowrap tracking-wider uppercase">
              身心障礙福利機構
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* 張社工 — 精選 */}
            <Card className="border-primary/40 md:col-span-3">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200 shrink-0">
                      張
                    </div>
                    <div>
                      <div className="text-sm font-medium">張社工師</div>
                      <div className="text-xs text-muted-foreground mt-0.5">新北市身心障礙福利機構・社工師</div>
                    </div>
                  </div>
                  <Badge variant="secondary">精選評價</Badge>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  身障機構最複雜的文書工作是 ISP 個別化支持計畫——每位服務對象都要有短期和長期目標，每半年還要重新檢視。我負責 15 位服務對象，光是每次更新 ISP 就要花上整個下午，跨專業團隊討論的紀錄更是散落在各處。
                  <br /><br />
                  用了<span className="text-foreground font-medium">報告汪</span>之後，我把評估資料輸入，<span className="text-foreground font-medium">AI 幫我整理成完整的 ISP 格式</span>，版本也自動留存。評鑑前建立「評鑑備審」標籤群組，35 項基準對應的文件一個一個貼標籤，<span className="text-foreground font-medium">評鑑委員來那天，什麼文件都沒漏</span>，主任說是近年來準備最從容的一次。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["ISP個別化支持計畫", "評鑑備審管理", "身障機構社工文書", "身心障礙福利機構評鑑"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 陳照服員 */}
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200 shrink-0">
                    陳
                  </div>
                  <div>
                    <div className="text-sm font-medium">陳照服員</div>
                    <div className="text-xs text-muted-foreground mt-0.5">台中市身心障礙福利機構・資深照服員</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  我每天要照顧多位有不同障礙程度的服務對象，日常照護紀錄寫起來很耗時，每個人的需求又不一樣，以前常常不知道怎麼描述才符合規範，督導要一直退回來改。
                  <br /><br />
                  現在用<span className="text-foreground font-medium">報告汪的 AI 輔助</span>，我把今天協助了哪些日常活動、服務對象的反應輸入進去，系統就幫我整理成符合格式的服務紀錄，<span className="text-foreground font-medium">品質比以前好很多，時間也少了一半</span>，督導說我的紀錄現在拿去評鑑直接能用。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["日常照護紀錄", "AI文書輔助", "身障照服員", "服務對象紀錄"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 李護理師 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 shrink-0">
                    李
                  </div>
                  <div>
                    <div className="text-sm font-medium">李護理師</div>
                    <div className="text-xs text-muted-foreground mt-0.5">桃園市身心障礙福利機構・護理師</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★☆</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  身障機構的護理師要管健康紀錄、用藥記錄、特殊照護計畫，還要配合社工的 ISP 提供健康面的評估，文件散落四處很難追蹤。
                  <br /><br />
                  報告汪讓我用<span className="text-foreground font-medium">職類標籤</span>把護理文件和社工文件分開管理，需要跨職類查閱時又能一起看，<span className="text-foreground font-medium">跨專業協作效率明顯提升</span>，健康紀錄也不再遺漏。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["特殊照護計畫", "多職類協作", "身障護理文書", "健康紀錄管理"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            {DISABILITY_WELFARE_STATS.map((s) => (
              <div key={s.label} className="bg-background rounded-xl py-4 px-3 text-center border">
                <div className="text-xl font-semibold">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-muted/20" aria-label="常見問題">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">常見問題</h2>
          <div className="space-y-4">
            {[
              {
                q: "報告汪適合身心障礙福利機構哪些角色使用？",
                a: "社工師、照服員、護理師、物理治療師、職能治療師、心理師都適用。社工師用 AI 輔助撰寫 ISP 個別化支持計畫；照服員用標籤管理日常服務紀錄；護理師追蹤健康照護文件；治療師記錄復健進度；督導則一鍵掌握各職類文件繳交狀況。",
              },
              {
                q: "如何使用報告汪管理 ISP 個別化支持計畫？",
                a: "為每位服務對象建立 ISP 報告，由社工師輸入評估結果與目標，AI 輔助整理成完整計畫書格式，並自動追蹤版本。每次定期檢視（每 6 個月）時更新，版本清晰可追溯，評鑑委員查核時一目瞭然。",
              },
              {
                q: "如何快速備妥評鑑文件？",
                a: "建立「評鑑備審」標籤群組，將 ISP、日常照護紀錄、訓練紀錄、風險管理記錄等文件貼上此標籤。評鑑前點一個標籤，35 項基準對應的所有文件全部列出，拖曳排序確認後一份都不漏。",
              },
              {
                q: "跨專業團隊的文件如何統一管理？",
                a: "依職類建立標籤（社工、照服員、護理師、物理治療師、職能治療師、心理師），各職類文件分區管理，互不干擾。督導或主任可切換標籤快速掌握各職類文件狀況，ISP 跨專業討論紀錄也能集中存放。",
              },
              {
                q: "目前收費嗎？",
                a: "系統目前處於測試階段，完全免費使用。正式版本的定價方案尚在規劃中，歡迎現在免費試用並提供意見。",
              },
            ].map((item) => (
              <details key={item.q} className="group border rounded-lg bg-background">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium list-none">
                  {item.q}
                  <ChevronDownIcon className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-4 text-muted-foreground text-sm border-t pt-3 mt-1">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section className="py-14 px-6 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">
              其他長照產業解決方案
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                href: "/day-care",
                title: "日照中心 AI 文書管理系統介紹",
                emoji: "🏢",
                label: "日照中心",
                stat: "↓ 48%",
                statLabel: "活動紀錄撰寫時間",
                desc: "活動紀錄 AI 輔助撰寫，評鑑備審標籤一鍵彙整，社工、照服員、護理師同平台協作。",
                cta: "日照中心文書管理系統 →",
              },
              {
                href: "/home-care",
                title: "居服機構 AI 文書管理系統介紹",
                emoji: "🏠",
                label: "居服機構",
                stat: "↓ 52%",
                statLabel: "居服員日誌時間",
                desc: "標籤依撰寫者分類，督導一眼看出誰的文件缺繳，查核零補件。",
                cta: "居服機構文書管理系統 →",
              },
              {
                href: "/residential",
                title: "住宿型長照機構多職種文書協作平台介紹",
                emoji: "🏡",
                label: "住宿型長照機構",
                stat: "4 職類",
                statLabel: "同平台協作管理",
                desc: "護理師、照服員、社工、營養師同平台協作，夜班文書時間減少 63%。",
                cta: "住宿型長照機構多職類文書協作平台 →",
              },
              {
                href: "/school/disability-welfare",
                title: "身心障礙福利機構評鑑小教室",
                emoji: "📚",
                label: "評鑑小教室",
                stat: "35 項",
                statLabel: "評鑑基準解析",
                desc: "深入解析身心障礙福利機構評鑑 35 項基準，備審要點逐項說明。",
                cta: "身障機構評鑑準則解析 →",
              },
            ].map((item) => (
              <Link key={item.href} href={item.href} title={item.title} className="block group">
                <Card className="h-full hover:shadow-md transition-shadow group-hover:border-primary/40">
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{item.emoji}</span>
                      <span className="font-semibold text-sm">{item.label}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">{item.stat}</div>
                    <p className="text-xs text-muted-foreground mb-2">{item.statLabel}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    <div className="mt-3 text-xs font-medium text-primary group-hover:underline">
                      {item.cta}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          準備好讓身心障礙福利機構文書走向智慧管理了嗎？
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          加入報告汪，ISP 計畫撰寫時間減少 52%，35 項評鑑基準全覆蓋，跨專業團隊同平台協作。
        </p>
        <StartButton>免費開始使用</StartButton>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <BotIcon className="h-4 w-4 text-primary" />
          報告汪
        </div>
        <div className="flex items-center gap-6">
          <Link href="/pricing" title="查看報告汪各方案價格" className="hover:text-primary transition-colors">價格</Link>
          <Link href="/auth/login" title="登入報告汪帳戶" className="hover:text-primary transition-colors">登入</Link>
          <Link href="/auth/sign-up" title="免費試用報告汪身心障礙福利機構方案" className="hover:text-primary transition-colors">註冊</Link>
        </div>
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
