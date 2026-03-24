import type { Metadata } from "next";
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
  title: "產後護理之家 AI 文書管理系統｜評鑑備審・母嬰照護紀錄・品質管理平台",
  description:
    "報告汪專為產後護理之家（月子中心）設計：115年度產後護理之家評鑑 A/B/C/D 四大構面 15 項基準 AI 逐項分析，母嬰照護紀錄集中管理，護產人員、嬰兒照顧人員、機構負責人同平台協作。產後護理機構文書管理首選。立即免費試用。",
  alternates: { canonical: "/babycare" },
  openGraph: {
    title: "產後護理之家 AI 文書管理系統｜評鑑備審・母嬰照護紀錄・品質管理平台",
    description:
      "報告汪專為產後護理之家（月子中心）設計：115年度產後護理之家評鑑 A/B/C/D 四大構面 15 項基準 AI 逐項分析，母嬰照護紀錄集中管理，護產人員、嬰兒照顧人員、機構負責人同平台協作。產後護理機構文書管理首選。立即免費試用。",
  },
  twitter: {
    title: "產後護理之家 AI 文書管理系統｜評鑑備審・母嬰照護紀錄・品質管理平台",
    description:
      "報告汪專為產後護理之家（月子中心）設計：115年度產後護理之家評鑑 A/B/C/D 四大構面 15 項基準 AI 逐項分析，母嬰照護紀錄集中管理，護產人員、嬰兒照顧人員、機構負責人同平台協作。產後護理機構文書管理首選。立即免費試用。",
  },
};

export default function BabycarePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "報告汪如何協助產後護理之家（月子中心）的評鑑準備？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "報告汪內建「115年度產後護理之家評鑑基準」評鑑 profile，上傳機構照護紀錄與行政文件後，AI 自動對應 A 行政組織（5 項）、B 專業照護（8 項）、C 環境設施（2 項）、D 特別事項（2 項）共 15 項基準，逐項標示哪些符合項目文件不足，讓評鑑準備不再是逐項手動比對的苦工。",
                },
              },
              {
                "@type": "Question",
                name: "產後護理之家的母嬰照護紀錄（B 區 8 項）如何用報告汪管理？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "依 B 區 8 項基準建立子標籤：產婦入住評估（B1.1）、產婦護理照護（B1.2）、產後衛教（B1.3）、嬰兒護理（B1.4）、緊急處理（B1.5）、感染管制（B1.6）、品質指標（B1.7）、嬰兒安全（B1.8）。護產人員寫完紀錄直接貼上對應標籤，評鑑前 AI 分析直接標示哪個 B 項符合文件不足，一目了然。",
                },
              },
              {
                "@type": "Question",
                name: "護產人員、嬰兒照顧人員、機構負責人如何在同一平台分工協作？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "依職類建立獨立標籤：護產人員負責 B 區照護紀錄，嬰兒照顧人員負責嬰兒照護紀錄，機構負責人負責 A 區行政文件、C 區環境設施記錄。各職類在各自標籤區撰寫文件，互不干擾。負責人需要彙整評鑑備審時，透過跨標籤篩選一次取得所有職類的最新文件。",
                },
              },
              {
                "@type": "Question",
                name: "產後護理之家的品質指標（紅臀率、乳腺炎率等 6 項）如何用報告汪追蹤？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "建立「品質指標 B1.7」標籤，每月將 6 項品質指標（嬰兒紅臀發生率、產婦乳腺炎率、嬰兒體重回升率、純母乳哺育率、嬰兒黃疸照光率、服務對象滿意度）的統計分析報告上傳至該標籤。評鑑前 AI 直接分析指標趨勢與改善措施，確認每項指標均有持續監測紀錄。",
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
        }}
      />
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center text-center py-24 px-6 bg-gradient-to-b from-background to-muted/30">
        <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
          產後護理之家專用
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
          產後護理之家文書管理系統｜<span className="text-primary">評鑑 AI 分析・母嬰照護紀錄管理</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          115年度評鑑基準 A/B/C/D 四大構面全覆蓋——AI 逐項對應 15 項基準符合項目，直接標示文件缺漏，
          母嬰照護紀錄集中管理，評鑑準備效率大幅提升。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <StartButton>立即開始 — 免費</StartButton>
          <TrialButton>免費試用（無需註冊）</TrialButton>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/20 py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { value: "15 項", label: "評鑑基準全覆蓋" },
            { value: "AI 分析", label: "自動標示文件缺漏" },
            { value: "母嬰照護", label: "專業紀錄集中管理" },
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
              產後護理之家文書管理這樣做：評鑑基準逐項對應，母嬰照護紀錄集中管理
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              從產婦入住評估到嬰兒安全管理，從感染管制紀錄到品質指標追蹤，每個功能都以產後護理之家工作流程為中心。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <SparklesIcon className="h-6 w-6" />,
                title: "AI 評鑑基準分析",
                desc: "上傳機構文件後，AI 自動對應 115年度評鑑基準 A 行政（5 項）、B 專業照護（8 項）、C 環境設施（2 項），逐項標示哪些符合項目文件不足，評鑑前不再逐項手動比對。",
              },
              {
                icon: <ClipboardListIcon className="h-6 w-6" />,
                title: "母嬰照護紀錄管理",
                desc: "依 B 區 8 項基準建立子標籤（產婦入住評估、護理照護、產後衛教、嬰兒護理等），護產人員與嬰兒照顧人員寫完直接貼標，評鑑前 AI 標示哪個 B 項文件量不足。",
              },
              {
                icon: <UsersIcon className="h-6 w-6" />,
                title: "多角色分工協作",
                desc: "護產人員、嬰兒照顧人員、機構負責人各自的標籤分區，文件自動歸位。負責人跨職類彙整評鑑備審時，所有職類最新文件一次到位，不再四處收集。",
              },
              {
                icon: <TagIcon className="h-6 w-6" />,
                title: "品質指標追蹤",
                desc: "紅臀率、乳腺炎率、嬰兒體重回升率、純母乳哺育率等 6 項 B1.7 品質指標建立專屬標籤，每月統計上傳後 AI 分析趨勢，評鑑前確認每項均有持續監測記錄。",
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
              產後護理之家
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* 王護理師 — 精選，全寬 */}
            <Card className="border-primary/40 md:col-span-3">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-pink-100 text-pink-800 shrink-0">
                      王
                    </div>
                    <div>
                      <div className="text-sm font-medium">王護理師</div>
                      <div className="text-xs text-muted-foreground mt-0.5">台北市產後護理之家・資深護理師</div>
                    </div>
                  </div>
                  <Badge variant="secondary">精選評價</Badge>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  產後護理之家最麻煩的文書就是「母嬰照護紀錄太分散」——產婦傷口護理記錄、乳房評估紀錄、嬰兒黃疸監測、哺乳衛教記錄各放各的，評鑑委員要看 B1.2 乳房護理，我要從四個地方找資料。
                  <br /><br />
                  用了<span className="text-foreground font-medium">報告汪</span>之後，我依 B 區 8 項基準各建一個標籤，每天護理紀錄寫完直接貼標，評鑑前<span className="text-foreground font-medium"> AI 評鑑分析</span>直接告訴我哪個 B 項符合文件不足，不用再逐項手動比對，評鑑準備時間省了將近一半。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["產後護理評鑑", "母嬰照護紀錄", "月子中心文書", "護理之家評鑑準備"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 陳負責人 — 2 欄 */}
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-sky-100 text-sky-800 shrink-0">
                    陳
                  </div>
                  <div>
                    <div className="text-sm font-medium">陳負責人</div>
                    <div className="text-xs text-muted-foreground mt-0.5">新北市產後護理之家・機構負責人</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  我們有護產人員和嬰兒照顧人員兩個職類，以前評鑑前最怕的就是A 區行政文件不齊——感染管制計畫、品質管理會議記錄、消防演練記錄，每次都要臨時補件，壓力很大。
                  <br /><br />
                  用了<span className="text-foreground font-medium">報告汪</span>的標籤依<span className="text-foreground font-medium">評鑑構面分區</span>後，A 區、B 區、C 區各有對應標籤，平時文件寫完直接貼上，評鑑前 AI 一次告訴我哪個構面缺件，再也不用臨時補件了。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["產後護理之家評鑑", "行政管理文件", "感染管制記錄", "月子中心品質管理"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 林護產人員 — 1 欄 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-emerald-100 text-emerald-800 shrink-0">
                    林
                  </div>
                  <div>
                    <div className="text-sm font-medium">林護產人員</div>
                    <div className="text-xs text-muted-foreground mt-0.5">桃園市產後護理之家・助產師</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  B1.7 品質指標是我以前最頭痛的——紅臀率、乳腺炎率、純母乳率，每月要手動統計再做成報表，光整理就要花半天。
                  <br /><br />
                  現在用<span className="text-foreground font-medium">報告汪</span>建立品質指標標籤，每月統計上傳後<span className="text-foreground font-medium"> AI 自動分析趨勢</span>，評鑑前每個指標都有完整監測記錄，委員問起來立刻就能找到。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["品質指標監測", "母乳哺育率", "嬰兒紅臀管理", "產後護理文書"].map((tag) => (
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
              { value: "15 項", label: "評鑑基準覆蓋" },
              { value: "6 項", label: "品質指標追蹤" },
              { value: "母嬰全覆蓋", label: "照護紀錄集中管理" },
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
                q: "報告汪如何協助產後護理之家（月子中心）的評鑑準備？",
                a: "報告汪內建「115年度產後護理之家評鑑基準」評鑑 profile，上傳機構照護紀錄與行政文件後，AI 自動對應 A 行政組織（5 項）、B 專業照護（8 項）、C 環境設施（2 項）、D 特別事項（2 項）共 15 項基準，逐項標示哪些符合項目文件不足，讓評鑑準備不再是逐項手動比對的苦工。",
              },
              {
                q: "產後護理之家的母嬰照護紀錄（B 區 8 項）如何用報告汪管理？",
                a: "依 B 區 8 項基準建立子標籤：產婦入住評估（B1.1）、產婦護理照護（B1.2）、產後衛教（B1.3）、嬰兒護理（B1.4）、緊急處理（B1.5）、感染管制（B1.6）、品質指標（B1.7）、嬰兒安全（B1.8）。護產人員寫完紀錄直接貼上對應標籤，評鑑前 AI 分析直接標示哪個 B 項符合文件不足，一目了然。",
              },
              {
                q: "護產人員、嬰兒照顧人員、機構負責人如何在同一平台分工協作？",
                a: "依職類建立獨立標籤：護產人員負責 B 區照護紀錄，嬰兒照顧人員負責嬰兒照護紀錄，機構負責人負責 A 區行政文件、C 區環境設施記錄。各職類在各自標籤區撰寫文件，互不干擾。負責人需要彙整評鑑備審時，透過跨標籤篩選一次取得所有職類的最新文件。",
              },
              {
                q: "產後護理之家的品質指標（紅臀率、乳腺炎率等 6 項）如何用報告汪追蹤？",
                a: "建立「品質指標 B1.7」標籤，每月將 6 項品質指標（嬰兒紅臀發生率、產婦乳腺炎率、嬰兒體重回升率、純母乳哺育率、嬰兒黃疸照光率、服務對象滿意度）的統計分析報告上傳至該標籤。評鑑前 AI 直接分析指標趨勢與改善措施，確認每項指標均有持續監測紀錄。",
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
                href: "/nursing-home",
                title: "護理之家 AI 文書管理系統介紹",
                emoji: "🏡",
                label: "護理之家",
                stat: "4 職類",
                statLabel: "協作管理",
                desc: "主任月報行政時間少了三分之一，各職類文件不再混在一起找不到。",
                cta: "護理之家多職類文書協作平台 →",
              },
              {
                href: "/disability",
                title: "身心障礙福利機構 AI 文書管理系統介紹",
                emoji: "♿",
                label: "身心障礙機構",
                stat: "32 項",
                statLabel: "自我檢核覆蓋",
                desc: "自我檢核項目逐項對應，AI 分析直接標示缺漏，評鑑準備效率大幅提升。",
                cta: "身心障礙機構文書管理系統 →",
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
          準備好讓產後護理之家文書走向 AI 輔助了嗎？
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          加入報告汪，評鑑 AI 分析、母嬰照護紀錄集中管理、品質指標持續追蹤。
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
          <Link href="/auth/sign-up" title="免費試用報告汪產後護理之家方案" className="hover:text-primary transition-colors">註冊</Link>
        </div>
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
