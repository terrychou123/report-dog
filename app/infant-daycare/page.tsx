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
  ShieldCheckIcon,
  ClipboardListIcon,
  ChevronDownIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "托嬰中心文書管理系統｜寶寶日誌 AI 輔助・60 項評鑑基準全覆蓋・給藥衛生安全追蹤",
  description:
    "報告汪專為托嬰中心打造：寶寶日誌 AI 輔助撰寫、60 項評鑑基準標籤對應、給藥委託單與食物樣品記錄自動提醒。負責人、托育人員、行政人員同平台協作，評鑑前文書不再手忙腳亂。立即免費試用。",
  alternates: { canonical: "/infant-daycare" },
  openGraph: {
    title: "托嬰中心文書管理系統｜寶寶日誌 AI 輔助・60 項評鑑基準全覆蓋・給藥衛生安全追蹤",
    description:
      "報告汪專為托嬰中心打造：寶寶日誌 AI 輔助撰寫、60 項評鑑基準標籤對應、給藥委託單與食物樣品記錄自動提醒。負責人、托育人員、行政人員同平台協作，評鑑前文書不再手忙腳亂。立即免費試用。",
  },
  twitter: {
    title: "托嬰中心文書管理系統｜寶寶日誌 AI 輔助・60 項評鑑基準全覆蓋・給藥衛生安全追蹤",
    description:
      "報告汪專為托嬰中心打造：寶寶日誌 AI 輔助撰寫、60 項評鑑基準標籤對應、給藥委託單與食物樣品記錄自動提醒。負責人、托育人員、行政人員同平台協作，評鑑前文書不再手忙腳亂。立即免費試用。",
  },
};

const INFANT_DAYCARE_STATS = [
  { value: "↓ 50%", label: "寶寶日誌撰寫時間" },
  { value: "60 項", label: "評鑑基準全覆蓋" },
  { value: "3 職類", label: "多角色協作管理" },
];

export default function InfantDaycarePage() {
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
                name: "報告汪適合托嬰中心哪些角色使用？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "托嬰中心負責人、托育人員及行政人員都適用。負責人用 AI 輔助管理行政管理配合事項、員工在職訓練記錄；托育人員用 AI 輔助撰寫寶寶日誌與活動紀錄；行政人員管理嬰幼兒基本資料、家長通知單、接送記錄及評鑑備審文件。",
                },
              },
              {
                "@type": "Question",
                name: "如何使用報告汪管理托嬰中心的寶寶日誌？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "為每位嬰幼兒建立獨立的寶寶日誌報告，托育人員輸入當天的餵食、睡眠、排便、活動觀察、發展表現等要點，AI 自動整理成完整格式的日誌，符合評鑑委員查閱標準。可依嬰幼兒姓名用標籤分類，督導一鍵確認各位嬰幼兒的紀錄是否完整。",
                },
              },
              {
                "@type": "Question",
                name: "如何快速備妥托嬰中心評鑑文件？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "建立「評鑑備審」標籤群組，依行政管理、托育活動、健康安全三大區塊分類標籤。一鍵匯入 60 項評鑑基準對應的報告範本（含體檢紀錄、在職訓練紀錄、給藥委託單、食物樣品記錄、感染管制等），AI 評鑑分析自動標示哪項文件不足，評鑑前不再手忙腳亂。",
                },
              },
              {
                "@type": "Question",
                name: "報告汪如何幫助管理給藥委託單和食物樣品記錄？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "建立「健康安全」標籤，將給藥委託單、食物樣品留存記錄、冰箱溫度記錄等文件統一管理。追蹤功能可設定每日提醒，確保食物樣品記錄不漏填，給藥委託單在有效期內。AI 分析會提醒五對原則記錄是否完整，評鑑委員查核時一份都不漏。",
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
              itemUrl: "https://reportwang.com/infant-daycare",
              ratingValue: 5.0,
              reviewCount: 3,
              reviews: [
              { author: "林主任", ratingValue: 5, reviewBody: "60 項評鑑基準依三大區塊（行政、托育、健康安全）標籤化，AI 評鑑分析助達成文件零補件。" },
              { author: "吳托育人員", ratingValue: 5, reviewBody: "AI 輔助整理 8 位嬰幼兒個別化寶寶日誌，品質提升而撰寫時間僅一半。" },
              { author: "鄭行政人員", ratingValue: 5, reviewBody: "標籤分類加每日提醒讓食物樣品等行政文書零遺漏，評鑑準備時間少超過三分之一。" },
              ],
            })
          ),
        }}
      />
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center text-center py-24 px-6 bg-gradient-to-b from-background to-muted/30">
        <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
          托嬰中心專用
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
          托嬰中心文書管理系統｜<span className="text-primary">寶寶日誌 AI 輔助・評鑑備審一鍵彙整</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          寶寶日誌 AI 輔助撰寫、60 項評鑑基準標籤對應、給藥委託單與健康安全記錄自動追蹤——
          讓負責人、托育人員、行政人員不再各做各的，評鑑前從容應對。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <StartButton source="infant-daycare-hero">立即開始 — 免費</StartButton>
          <TrialButton source="infant-daycare-hero">免費試用（無需註冊）</TrialButton>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/20 py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {INFANT_DAYCARE_STATS.map((stat) => (
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">托嬰中心文書管理這樣做：寶寶日誌 AI 輔助，評鑑備審一鍵彙整，多角色協作不混亂</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              從寶寶日誌到健康安全記錄，從在職訓練到評鑑備審，每個功能都以托嬰中心工作流程為中心。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <BotIcon className="h-6 w-6" />,
                title: "寶寶日誌 AI 輔助撰寫",
                desc: "托育人員輸入今天的餵食、睡眠、排便、活動觀察要點，AI 自動整理成完整格式的個別化日誌，符合評鑑基準第 28 項要求，每位嬰幼兒日誌獨立記錄不混淆。",
              },
              {
                icon: <TagIcon className="h-6 w-6" />,
                title: "60 項評鑑基準標籤對應",
                desc: "依行政管理（11 項）、托育活動（25 項）、健康安全（24 項）三大區塊建立標籤群組，每份文件對應正確的評鑑項目，評鑑前點一個標籤，缺漏文件一目瞭然。",
              },
              {
                icon: <ShieldCheckIcon className="h-6 w-6" />,
                title: "健康安全記錄與給藥追蹤",
                desc: "給藥委託單、五對原則記錄、食物樣品留存、冰箱溫度記錄、感染管制手冊更新——用標籤分類統一管理，追蹤功能每日提醒，確保健康安全類文件不漏填。",
              },
              {
                icon: <ClipboardListIcon className="h-6 w-6" />,
                title: "在職訓練時數與行政文件管理",
                desc: "托育人員每年 18 小時在職訓練、廚工每年體檢記錄、監視器保養紀錄、接送授權書——用標籤分類後 AI 分析自動標示缺漏，評鑑委員查核時從容應對。",
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
              托嬰中心
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* 林主任 — 精選 */}
            <Card className="border-primary/40 md:col-span-3">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 shrink-0">
                      林
                    </div>
                    <div>
                      <div className="text-sm font-medium">林主任</div>
                      <div className="text-xs text-muted-foreground mt-0.5">臺北市托嬰中心・負責人</div>
                    </div>
                  </div>
                  <Badge variant="secondary">精選評價</Badge>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  托嬰中心評鑑 60 項基準散落在三大區塊，以前每次評鑑準備都要翻遍資料夾，廚工體檢、監視器保養記錄、在職訓練截圖、給藥委託單、食物樣品記錄⋯⋯各種文件東一份西一份，評鑑前一週全中心人仰馬翻。
                  <br /><br />
                  用了<span className="text-foreground font-medium">報告汪</span>之後，我依行政管理、托育活動、健康安全三大區塊建立標籤群組，每份文件都有對應的評鑑項目。<span className="text-foreground font-medium">AI 評鑑分析</span>直接告知哪一項基準的文件不完整，評鑑委員那天所有文件三秒就找到，我們是今年臺北市托嬰中心評鑑中<span className="text-foreground font-medium">文件零補件</span>的機構，委員說是今年巡訪中備審文件最整齊的。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["托嬰中心評鑑備審", "60項評鑑基準", "行政管理文件", "托嬰中心文書管理"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 吳托育人員 */}
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 shrink-0">
                    吳
                  </div>
                  <div>
                    <div className="text-sm font-medium">吳托育人員</div>
                    <div className="text-xs text-muted-foreground mt-0.5">臺北市托嬰中心・資深托育人員</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  每天要記錄 8 位嬰幼兒的寶寶日誌，包含餵食次數與量、睡眠時間、排便狀況、活動表現、發展觀察，以前用紙本格式很費時，而且常常寫得很籠統，督導要退回來補充。
                  <br /><br />
                  現在用<span className="text-foreground font-medium">報告汪 AI 輔助</span>，我輸入今天的觀察要點，AI 自動整理成完整的個別化日誌格式，每位寶寶的紀錄都更詳細，督導說品質比以前好很多，但我花的時間卻只有以前的<span className="text-foreground font-medium">一半</span>。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["寶寶日誌記錄", "個別化發展紀錄", "AI撰寫輔助", "托育活動記錄"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 鄭行政人員 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 shrink-0">
                    鄭
                  </div>
                  <div>
                    <div className="text-sm font-medium">鄭行政人員</div>
                    <div className="text-xs text-muted-foreground mt-0.5">臺北市托嬰中心・行政人員</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  托嬰中心行政文書超繁雜，從體檢紀錄、在職訓練時數、接送授權書到食物樣品留存，以前每項都要分開管理，評鑑前一週找文件找到頭昏。
                  <br /><br />
                  報告汪的<span className="text-foreground font-medium">標籤分類</span>讓每份文件一目了然，追蹤功能每日提醒確保食物樣品紀錄不漏填，<span className="text-foreground font-medium">評鑑準備時間少了超過三分之一</span>。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["健康安全記錄", "給藥委託管理", "在職訓練追蹤", "托嬰行政管理"].map((tag) => (
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
            {INFANT_DAYCARE_STATS.map((s) => (
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
                q: "報告汪適合托嬰中心哪些角色使用？",
                a: "托嬰中心負責人、托育人員及行政人員都適用。負責人用 AI 輔助管理行政管理配合事項、員工在職訓練記錄；托育人員用 AI 輔助撰寫寶寶日誌與活動紀錄；行政人員管理嬰幼兒基本資料、家長通知單、接送記錄及評鑑備審文件。",
              },
              {
                q: "如何使用報告汪管理托嬰中心的寶寶日誌？",
                a: "為每位嬰幼兒建立獨立的寶寶日誌報告，托育人員輸入當天的餵食、睡眠、排便、活動觀察、發展表現等要點，AI 自動整理成完整格式的日誌，符合評鑑委員查閱標準。可依嬰幼兒姓名用標籤分類，督導一鍵確認各位嬰幼兒的紀錄是否完整。",
              },
              {
                q: "如何快速備妥托嬰中心評鑑文件？",
                a: "建立「評鑑備審」標籤群組，依行政管理、托育活動、健康安全三大區塊分類標籤。一鍵匯入 60 項評鑑基準對應的報告範本（含體檢紀錄、在職訓練紀錄、給藥委託單、食物樣品記錄、感染管制等），AI 評鑑分析自動標示哪項文件不足，評鑑前不再手忙腳亂。",
              },
              {
                q: "報告汪如何幫助管理給藥委託單和食物樣品記錄？",
                a: "建立「健康安全」標籤，將給藥委託單、五對原則記錄、食物樣品留存記錄、冰箱溫度記錄等文件統一管理。追蹤功能可設定每日提醒，確保食物樣品記錄不漏填，給藥委託單在有效期內。AI 分析會提醒五對原則記錄是否完整，評鑑委員查核時一份都不漏。",
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
                href: "/babycare",
                title: "產後護理之家 AI 文書管理系統介紹",
                emoji: "👶",
                label: "產後護理之家",
                stat: "15 項",
                statLabel: "評鑑基準覆蓋",
                desc: "母嬰照護紀錄 AI 輔助，評鑑前 AI 分析直接標示缺漏，產後護理之家評鑑準備更有系統。",
                cta: "產後護理之家文書管理系統 →",
              },
              {
                href: "/day-care",
                title: "日照中心 AI 文書管理系統介紹",
                emoji: "🏢",
                label: "日照中心",
                stat: "↓ 48%",
                statLabel: "活動紀錄撰寫時間",
                desc: "活動紀錄 AI 輔助撰寫，評鑑備審標籤一鍵彙整，多職類協作同平台管理。",
                cta: "日照中心文書管理系統 →",
              },
              {
                href: "/disability-welfare",
                title: "身心障礙福利機構 AI 文書管理系統介紹",
                emoji: "♿",
                label: "身心障礙福利機構",
                stat: "35 項",
                statLabel: "評鑑基準覆蓋",
                desc: "ISP 計畫 AI 輔助撰寫，35 項評鑑基準逐項對應，評鑑前文書不再手忙腳亂。",
                cta: "身心障礙福利機構文書管理系統 →",
              },
              {
                href: "/school/infant-daycare",
                title: "托嬰中心評鑑小教室",
                emoji: "📚",
                label: "評鑑小教室",
                stat: "60 項",
                statLabel: "評鑑基準解析",
                desc: "深入解析托嬰中心評鑑 60 項基準，行政管理、托育活動、健康安全完整解說。",
                cta: "托嬰中心評鑑準則解析 →",
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
          準備好讓托嬰中心文書走向智慧管理了嗎？
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          加入報告汪，寶寶日誌撰寫時間減少 50%，60 項評鑑基準全覆蓋，負責人・托育人員・行政人員同平台協作。
        </p>
        <StartButton source="infant-daycare-bottom">免費開始使用</StartButton>
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
          <Link href="/auth/sign-up" title="免費試用報告汪托嬰中心方案" className="hover:text-primary transition-colors">註冊</Link>
        </div>
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
