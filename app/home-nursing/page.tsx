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
  SparklesIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "居家護理所 AI 文書管理系統｜評鑑備審・個案照護紀錄・經營指標管理平台",
  description:
    "報告汪專為居家護理所設計：115年度居家護理所評鑑 A 經營管理（5 項）、B 照護管理（3 項）共 8 項基準 AI 逐項分析，個案照護紀錄集中管理，護理人員與機構負責人同平台協作。居家護理所文書管理首選。立即免費試用。",
  alternates: { canonical: "/home-nursing" },
  openGraph: {
    title: "居家護理所 AI 文書管理系統｜評鑑備審・個案照護紀錄・經營指標管理平台",
    description:
      "報告汪專為居家護理所設計：115年度居家護理所評鑑 A 經營管理（5 項）、B 照護管理（3 項）共 8 項基準 AI 逐項分析，個案照護紀錄集中管理，護理人員與機構負責人同平台協作。居家護理所文書管理首選。立即免費試用。",
  },
  twitter: {
    title: "居家護理所 AI 文書管理系統｜評鑑備審・個案照護紀錄・經營指標管理平台",
    description:
      "報告汪專為居家護理所設計：115年度居家護理所評鑑 A 經營管理（5 項）、B 照護管理（3 項）共 8 項基準 AI 逐項分析，個案照護紀錄集中管理，護理人員與機構負責人同平台協作。居家護理所文書管理首選。立即免費試用。",
  },
};

export default function HomeNursingPage() {
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
                name: "報告汪如何協助居家護理所的評鑑準備？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "報告汪內建「115年度居家護理所評鑑基準」評鑑 profile，上傳機構文件與訪視紀錄後，AI 自動對應 A 經營管理（5 項）、B 照護管理（3 項）共 8 項基準，逐項標示哪些符合項目文件不足，讓評鑑準備不再是逐項手動比對的苦工。",
                },
              },
              {
                "@type": "Question",
                name: "居家護理所的個案照護紀錄（B2）如何用報告汪管理？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "依 B2 個案照護管理基準建立標籤：收案評估記錄、全人評估（每 6 個月）、個別化照護計畫（問題/目標/措施/評值）。護理人員完成訪視紀錄後直接貼上對應標籤，評鑑前 AI 分析直接標示哪位個案的照護計畫文件不完整，一目了然。",
                },
              },
              {
                "@type": "Question",
                name: "護理人員與機構負責人如何在同一平台分工協作？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "依職類建立獨立標籤：護理人員負責 B 區個案照護紀錄與訪視記錄，機構負責人負責 A 區經營管理文件（感染管制手冊、訪視人員安全辦法、緊急事件處理辦法等）。各職類在各自標籤區撰寫文件，負責人彙整評鑑備審時，跨標籤篩選一次取得所有最新文件。",
                },
              },
              {
                "@type": "Question",
                name: "居家護理所的 5 項經營指標（A5）如何用報告汪追蹤？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "建立「經營指標 A5」標籤，定期將 5 項以上機構經營品質指標的統計分析報告上傳至該標籤。評鑑前 AI 直接分析指標趨勢與改善措施記錄，確認每項指標均有持續監測及閾值修訂紀錄，符合 A5 基準要求。",
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
              itemUrl: "https://reportwang.com/home-nursing",
              ratingValue: 5.0,
              reviewCount: 3,
              reviews: [
              { author: "張護理師", ratingValue: 5, reviewBody: "依個案標籤化收案、全人評估、照護計畫，B2 個案照護管理 AI 評鑑分析省時近一半。" },
              { author: "李負責人", ratingValue: 5, reviewBody: "依評鑑構面分區標籤管理感染管制與經營指標等文件，再不用臨時補件。" },
              { author: "陳訪視人員", ratingValue: 5, reviewBody: "A3 訪視人員安全管理事件記錄與改善追蹤標籤化，AI 自動檢核完整度。" },
              ],
            })
          ),
        }}
      />
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center text-center py-24 px-6 bg-gradient-to-b from-background to-muted/30">
        <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
          居家護理所專用
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
          居家護理所文書管理系統｜<span className="text-primary">評鑑 AI 分析・個案照護紀錄管理</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          115年度評鑑基準 A/B 兩大構面 8 項全覆蓋——AI 逐項對應基準符合項目，直接標示文件缺漏，
          個案照護紀錄集中管理，評鑑準備效率大幅提升。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <StartButton source="home-nursing-hero">立即開始 — 免費</StartButton>
          <TrialButton source="home-nursing-hero">免費試用（無需註冊）</TrialButton>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/20 py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { value: "8 項", label: "評鑑基準全覆蓋" },
            { value: "AI 分析", label: "自動標示文件缺漏" },
            { value: "5 項 KPI", label: "經營指標持續監測" },
          ].map((stat) => (
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              居家護理所文書管理這樣做：評鑑基準逐項對應，個案照護紀錄集中管理
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              從個案收案評估到訪視人員安全管理，從感染管制紀錄到經營指標追蹤，每個功能都以居家護理所工作流程為中心。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <SparklesIcon className="h-6 w-6" />,
                title: "AI 評鑑基準分析",
                desc: "上傳機構文件後，AI 自動對應 115年度評鑑基準 A 經營管理（5 項）、B 照護管理（3 項），逐項標示哪些符合項目文件不足，評鑑前不再逐項手動比對。",
              },
              {
                icon: <ClipboardListIcon className="h-6 w-6" />,
                title: "個案照護紀錄管理",
                desc: "依 B2 個案照護管理基準建立標籤，收案評估、每 6 個月全人評估、個別化照護計畫依個案分類管理，評鑑前 AI 標示哪位個案的照護計畫文件不完整。",
              },
              {
                icon: <TagIcon className="h-6 w-6" />,
                title: "經營指標追蹤（A5）",
                desc: "5 項以上機構經營品質指標建立專屬標籤，定期統計上傳後 AI 分析趨勢，確認每項指標均有持續監測及閾值修訂紀錄，完整符合 A5 評鑑要求。",
              },
              {
                icon: <UsersIcon className="h-6 w-6" />,
                title: "訪視人員安全管理（A3）",
                desc: "A3 居家訪視人員安全辦法、緊急通報記錄、改善追蹤文件依規定分類建檔，評鑑委員要看安全管理文件，直接從標籤調出，不用臨時翻找。",
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
              居家護理所
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* 張護理師 — 精選，全寬 */}
            <Card className="border-primary/40 md:col-span-3">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-pink-100 text-pink-800 shrink-0">
                      張
                    </div>
                    <div>
                      <div className="text-sm font-medium">張護理師</div>
                      <div className="text-xs text-muted-foreground mt-0.5">新北市居家護理所・資深護理師</div>
                    </div>
                  </div>
                  <Badge variant="secondary">精選評價</Badge>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  居家護理所最麻煩的文書就是「個案照護計畫太分散」——收案評估、每 6 個月全人評估、照護計畫各放各的，評鑑委員要看 B2 個案照護管理，我要從三個地方找資料。
                  <br /><br />
                  用了<span className="text-foreground font-medium">報告汪</span>之後，我依個案建立標籤，每次訪視記錄寫完直接貼標，評鑑前<span className="text-foreground font-medium"> AI 評鑑分析</span>直接告訴我哪位個案的照護計畫文件不完整，不用再逐項手動比對，準備時間省了將近一半。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["居家護理評鑑", "個案照護計畫", "居家護理文書", "護理所評鑑準備"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 李負責人 — 2 欄 */}
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-sky-100 text-sky-800 shrink-0">
                    李
                  </div>
                  <div>
                    <div className="text-sm font-medium">李負責人</div>
                    <div className="text-xs text-muted-foreground mt-0.5">台北市居家護理所・機構負責人</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  我們評鑑前最怕 A 區經營管理文件不齊——感染管制手冊、訪視人員安全辦法、緊急事件處理辦法、經營指標分析報告，每次都要臨時補件，壓力很大。
                  <br /><br />
                  用了<span className="text-foreground font-medium">報告汪</span>的標籤依<span className="text-foreground font-medium">評鑑構面分區</span>後，A 區、B 區各有對應標籤，平時文件寫完直接貼上，評鑑前 AI 一次告訴我哪個構面缺件，再也不用臨時補件了。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["居家護理所評鑑", "感染管制文件", "經營指標追蹤", "居家護理行政管理"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 陳訪視人員 — 1 欄 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-emerald-100 text-emerald-800 shrink-0">
                    陳
                  </div>
                  <div>
                    <div className="text-sm font-medium">陳訪視人員</div>
                    <div className="text-xs text-muted-foreground mt-0.5">桃園市居家護理所・護理師</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  A3 訪視人員安全管理是我以前最頭痛的——車禍、人身安全、動物咬傷的緊急通報記錄和改善追蹤，每次評鑑要翻出來對照，光找資料就要花很多時間。
                  <br /><br />
                  現在用<span className="text-foreground font-medium">報告汪</span>建立安全管理標籤，事件記錄上傳後<span className="text-foreground font-medium"> AI 自動分析</span>改善追蹤是否完整，評鑑前每個安全事件都有完整記錄，委員問起來立刻就能找到。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["訪視安全管理", "居家護理文書", "緊急事件記錄"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: "↓ 50%", label: "評鑑準備時間" },
              { value: "8 項", label: "評鑑基準覆蓋" },
              { value: "5 項", label: "KPI 指標追蹤" },
              { value: "A+B 全覆蓋", label: "照護紀錄集中管理" },
            ].map((s) => (
              <div key={s.label} className="bg-background rounded-xl py-4 px-3 text-center border">
                <div className="text-xl font-semibold">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6" aria-label="常見問題">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">常見問題</h2>
          <div className="space-y-4">
            {[
              {
                q: "報告汪如何協助居家護理所的評鑑準備？",
                a: "報告汪內建「115年度居家護理所評鑑基準」評鑑 profile，上傳機構文件與訪視紀錄後，AI 自動對應 A 經營管理（5 項）、B 照護管理（3 項）共 8 項基準，逐項標示哪些符合項目文件不足，讓評鑑準備不再是逐項手動比對的苦工。",
              },
              {
                q: "居家護理所的個案照護紀錄（B2）如何用報告汪管理？",
                a: "依 B2 個案照護管理基準建立標籤：收案評估記錄、全人評估（每 6 個月）、個別化照護計畫（問題/目標/措施/評值）。護理人員完成訪視紀錄後直接貼上對應標籤，評鑑前 AI 分析直接標示哪位個案的照護計畫文件不完整，一目了然。",
              },
              {
                q: "護理人員與機構負責人如何在同一平台分工協作？",
                a: "依職類建立獨立標籤：護理人員負責 B 區個案照護紀錄與訪視記錄，機構負責人負責 A 區經營管理文件（感染管制手冊、訪視人員安全辦法、緊急事件處理辦法等）。各職類在各自標籤區撰寫文件，負責人彙整評鑑備審時，跨標籤篩選一次取得所有最新文件。",
              },
              {
                q: "居家護理所的 5 項經營指標（A5）如何用報告汪追蹤？",
                a: "建立「經營指標 A5」標籤，定期將 5 項以上機構經營品質指標的統計分析報告上傳至該標籤。評鑑前 AI 直接分析指標趨勢與改善措施記錄，確認每項指標均有持續監測及閾值修訂紀錄，符合 A5 基準要求。",
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
                statLabel: "活動紀錄時間",
                desc: "個案服務計畫和活動紀錄用標籤分類後，評鑑前不再手忙腳亂。",
                cta: "日照中心文書管理系統 →",
              },
              {
                href: "/residential",
                title: "住宿型長照機構 AI 文書管理系統介紹",
                emoji: "🏡",
                label: "住宿型長照機構",
                stat: "4 職類",
                statLabel: "協作管理",
                desc: "主任月報行政時間少了三分之一，各職類文件不再混在一起找不到。",
                cta: "住宿型長照機構多職類文書協作平台 →",
              },
              {
                href: "/general-nursing-home",
                title: "一般護理之家 AI 文書管理系統介紹",
                emoji: "🏥",
                label: "一般護理之家",
                stat: "15 項",
                statLabel: "評鑑基準覆蓋",
                desc: "A/B/C/D 四大構面 15 項基準全覆蓋，住民照護計畫集中管理，AI 分析直接標示缺漏。",
                cta: "一般護理之家文書管理系統 →",
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
          準備好讓居家護理所文書走向 AI 輔助了嗎？
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          加入報告汪，評鑑 AI 分析、個案照護紀錄集中管理、經營指標持續追蹤。
        </p>
        <StartButton source="home-nursing-bottom">免費開始使用</StartButton>
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
          <Link href="/auth/sign-up" title="免費試用報告汪居家護理所方案" className="hover:text-primary transition-colors">註冊</Link>
        </div>
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
