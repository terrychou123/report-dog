import type { Metadata } from "next";
import Link from "next/link";
import { StartButton } from "@/components/start-button";
import { TrialButton } from "@/components/trial-button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BotIcon,
  TagIcon,
  ChevronDownIcon,
  CalendarIcon,
  ClipboardCheckIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "醫院護理部 AI 文書管理｜病房報告整合・交接班標籤・評鑑備審｜報告汪",
  description:
    "報告汪專為醫院護理部設計：班別標籤交接班、多標籤文件分類、評鑑備審一鍵備齊，護理師、護理長、副護理長同平台管理，病房報告不再散落、交班不再遺漏。支援護理師行動記錄，大量文件快速彙整，JCI、SNQ 評鑑準備更從容。立即免費試用。",
  alternates: { canonical: "/hospital" },
  openGraph: {
    title: "醫院護理部 AI 文書管理｜病房報告整合・交接班標籤・評鑑備審｜報告汪",
    description:
      "報告汪專為醫院護理部設計：班別標籤交接班、多標籤文件分類、評鑑備審一鍵備齊，護理師、護理長、副護理長同平台管理，病房報告不再散落、交班不再遺漏。支援護理師行動記錄，大量文件快速彙整，JCI、SNQ 評鑑準備更從容。立即免費試用。",
  },
  twitter: {
    title: "醫院護理部 AI 文書管理｜病房報告整合・交接班標籤・評鑑備審｜報告汪",
    description:
      "報告汪專為醫院護理部設計：班別標籤交接班、多標籤文件分類、評鑑備審一鍵備齊，護理師、護理長、副護理長同平台管理，病房報告不再散落、交班不再遺漏。支援護理師行動記錄，大量文件快速彙整，JCI、SNQ 評鑑準備更從容。立即免費試用。",
  },
};

const HOSPITAL_NURSING_STATS = [
  { value: "↓ 60%", label: "文書交接時間" },
  { value: "30 秒", label: "當班文件確認" },
  { value: "評鑑零補件", label: "護理文書到位率" },
];

export default function HospitalNursingPage() {
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
                name: "報告汪適合護理部哪些角色使用？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "護理師、護理長、副護理長都適用。護理師用班別標籤確認當班文書、AI 輔助撰寫護理紀錄；護理長用標籤追蹤各班文件完成狀況；副護理長則用評鑑備審標籤群組統一備齊評鑑文件。",
                },
              },
              {
                "@type": "Question",
                name: "如何用班別標籤管理交接班文書？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "建立「白班」、「小夜」、「大夜」獨立標籤，並搭配頻率標籤（每班必做、每日一次、每週）做雙重分類。護理師交接完畢後篩選當班標籤，即可一眼看出本班應完成哪些文書，並可拖曳調整執行順序。",
                },
              },
              {
                "@type": "Question",
                name: "同一份文件需要跨多個標籤分類怎麼辦？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "報告汪支援多標籤功能，同一份文件可同時貼上「感控必備」、「設備維護」、「個案追蹤」等多個標籤，不需搬移或複製文件。各部門或需求篩選對應標籤，30 秒內確認文件狀態。",
                },
              },
              {
                "@type": "Question",
                name: "如何準備醫院評鑑的護理文書？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "提前建立「評鑑備審」標籤群組，日常產出的護理品質指標報告、病房文件直接貼上此標籤。評鑑前只需篩選該標籤，所有文件全部到位，無需重新整理，達到零補件目標。",
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
          護理部專用
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
          護理文書管理系統｜<span className="text-primary">病房報告整合</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          班別標籤管理交接班文書、多標籤分類不重複搬移、評鑑備審標籤一鍵到位──
          讓護理長省下追文件的時間，把心力還給病房照護品質。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <StartButton>立即開始 — 免費</StartButton>
          <TrialButton>免費試用（無需註冊）</TrialButton>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/20 py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {HOSPITAL_NURSING_STATS.map((stat) => (
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">醫院護理文書管理這樣做：班別標籤交接班，評鑑備審一鍵備齊</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              從班別標籤到評鑑備審，從多標籤分類到 AI 文書輔助，每個功能都以護理工作流程為中心。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <CalendarIcon className="h-6 w-6" />,
                title: "班別標籤自動分類",
                desc: "白班、小夜、大夜獨立標籤，護理師交接後即知當班該完成哪些文書。",
              },
              {
                icon: <TagIcon className="h-6 w-6" />,
                title: "多標籤文件不重複搬移",
                desc: "同一份文件貼多個標籤，感控、設備、個案追蹤各自篩選，30 秒確認文件狀態。",
              },
              {
                icon: <ClipboardCheckIcon className="h-6 w-6" />,
                title: "評鑑備審一鍵備齊",
                desc: "「評鑑備審」標籤群組提前建好，評鑑前篩一個標籤全部到位，零補件。",
              },
              {
                icon: <BotIcon className="h-6 w-6" />,
                title: "AI 輔助護理文書撰寫",
                desc: "輸入照護重點，AI 整理成符合護理格式的紀錄，節省文書時間。",
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
              醫院護理部
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* 蔡護理長 — 精選 */}
            <Card className="border-primary/40 md:col-span-3">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-blue-100 text-blue-800 shrink-0">
                      蔡
                    </div>
                    <div>
                      <div className="text-sm font-medium">蔡護理長</div>
                      <div className="text-xs text-muted-foreground mt-0.5">台北某區域醫院・內科病房護理長</div>
                    </div>
                  </div>
                  <Badge variant="secondary">精選評價</Badge>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  一個病房每天要跑的護理文書種類繁多：交班紀錄、護理評估、感染管制記錄、跌倒風險評估……班班不同，輪班護理師常常不確定自己該先完成哪份。
                  <br /><br />
                  導入<span className="text-foreground font-medium">報告汪</span>後，我們把文件依<span className="text-foreground font-medium">班別標籤</span>（白班、小夜、大夜）和<span className="text-foreground font-medium">頻率標籤</span>（每班必做、每日一次、每週）做雙重分類，護理師交接完就能拖曳調整當班的執行順序。護理部主任說這是她看過最有條理的<span className="text-foreground font-medium">護理文書管理系統</span>，已經推薦給其他病房。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["護理文書管理", "交班紀錄系統", "病房報告管理", "護理部行政效率"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 羅護理師 */}
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-purple-100 text-purple-800 shrink-0">
                    羅
                  </div>
                  <div>
                    <div className="text-sm font-medium">羅護理師</div>
                    <div className="text-xs text-muted-foreground mt-0.5">台南市立醫院・加護病房資深護理師</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  加護病房的文書壓力特別大，感控報表、儀器維護紀錄、病人生命徵象追蹤……每樣都急。過去同事各自建資料夾，找文件要問一圈。
                  <br /><br />
                  現在用<span className="text-foreground font-medium">分類標籤</span>把「感控必備」、「設備維護」、「個案追蹤」分開，每份報告不必搬到三個地方，同一份文件<span className="text-foreground font-medium">貼多個標籤</span>就好。交接班只要篩當下標籤，30 秒內就能確認所有文件狀態，大幅減少 ICU 的文書焦慮。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["加護病房文書", "感染管制報表", "ICU護理紀錄", "多標籤文件分類"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 鄭副護理長 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-amber-100 text-amber-800 shrink-0">
                    鄭
                  </div>
                  <div>
                    <div className="text-sm font-medium">鄭副護理長</div>
                    <div className="text-xs text-muted-foreground mt-0.5">桃園某醫學中心・外科病房副護理長</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★☆</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  評鑑年最麻煩的就是把散落各處的護理品質指標報告集中起來。以前要花將近兩週重新整理，還怕漏項目。
                  <br /><br />
                  今年我們提前三個月就用<span className="text-foreground font-medium">報告汪</span>建好「評鑑備審」標籤，每次產出的文件直接貼上去，到了評鑑前夕只需要<span className="text-foreground font-medium">篩一個標籤</span>就全部到位。評審委員翻閱文件時直接說「這間病房的文件是整個醫院最整齊的」，護理長當場感動快哭出來。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["醫院評鑑準備", "護理品質指標", "病房文件整理", "評鑑文件管理系統"].map((tag) => (
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
            {HOSPITAL_NURSING_STATS.map((s) => (
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
                q: "報告汪適合護理部哪些角色使用？",
                a: "護理師、護理長、副護理長都適用。護理師用班別標籤確認當班文書、AI 輔助撰寫護理紀錄；護理長用標籤追蹤各班文件完成狀況；副護理長則用評鑑備審標籤群組統一備齊評鑑文件。",
              },
              {
                q: "如何用班別標籤管理交接班文書？",
                a: "建立「白班」、「小夜」、「大夜」獨立標籤，並搭配頻率標籤（每班必做、每日一次、每週）做雙重分類。護理師交接完畢後篩選當班標籤，即可一眼看出本班應完成哪些文書，並可拖曳調整執行順序。",
              },
              {
                q: "同一份文件需要跨多個標籤分類怎麼辦？",
                a: "報告汪支援多標籤功能，同一份文件可同時貼上「感控必備」、「設備維護」、「個案追蹤」等多個標籤，不需搬移或複製文件。各部門或需求篩選對應標籤，30 秒內確認文件狀態。",
              },
              {
                q: "如何準備醫院評鑑的護理文書？",
                a: "提前建立「評鑑備審」標籤群組，日常產出的護理品質指標報告、病房文件直接貼上此標籤。評鑑前只需篩選該標籤，所有文件全部到位，無需重新整理，達到零補件目標。",
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
                href: "/home-nursing",
                title: "居家護理所 AI 文書管理系統介紹",
                emoji: "🩺",
                label: "居家護理所",
                stat: "8 項",
                statLabel: "評鑑基準覆蓋",
                desc: "個案照護紀錄和經營指標用標籤分類後，評鑑前 AI 分析直接標示缺漏。",
                cta: "居家護理所文書管理系統 →",
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
      <section className="py-24 px-6 text-center bg-muted/20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          準備好讓文書不再拖累病房照護品質了嗎？
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          加入報告汪，護理文書交接時間減少 60%，評鑑零補件。
        </p>
        <StartButton>免費開始使用</StartButton>
      </section>

      <Footer />
    </main>
  );
}
