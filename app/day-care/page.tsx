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
  title: "日照中心 AI 文書管理系統｜活動紀錄 AI 撰寫・評鑑備審一鍵彙整・多職類協作",
  description:
    "報告汪專為日照中心打造：AI 輔助活動紀錄撰寫、個案服務計畫即時更新、評鑑備審標籤群組一鍵彙整。社工、照服員、護理師、職能治療師在同一平台協作，文件不再散落，評鑑前不再手忙腳亂。立即免費試用。",
  alternates: { canonical: "/day-care" },
  openGraph: {
    title: "日照中心 AI 文書管理系統｜活動紀錄 AI 撰寫・評鑑備審一鍵彙整・多職類協作",
    description:
      "報告汪專為日照中心打造：AI 輔助活動紀錄撰寫、個案服務計畫即時更新、評鑑備審標籤群組一鍵彙整。社工、照服員、護理師、職能治療師在同一平台協作，文件不再散落，評鑑前不再手忙腳亂。立即免費試用。",
  },
  twitter: {
    title: "日照中心 AI 文書管理系統｜活動紀錄 AI 撰寫・評鑑備審一鍵彙整・多職類協作",
    description:
      "報告汪專為日照中心打造：AI 輔助活動紀錄撰寫、個案服務計畫即時更新、評鑑備審標籤群組一鍵彙整。社工、照服員、護理師、職能治療師在同一平台協作，文件不再散落，評鑑前不再手忙腳亂。立即免費試用。",
  },
};

const DAY_CARE_STATS = [
  { value: "↓ 48%", label: "活動紀錄撰寫時間" },
  { value: "零遺漏", label: "評鑑文件備審" },
  { value: "3 職類", label: "同平台協作" },
];

export default function DayCarePage() {
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
                name: "報告汪適合日照中心哪些角色使用？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "社工師、照服員、護理師、職能治療師都適用。社工師用標籤管理個案服務計畫與評鑑文件；照服員用 AI 輔助撰寫活動紀錄；護理師管理健康紀錄與用藥記錄；職能治療師追蹤復健進度文件。",
                },
              },
              {
                "@type": "Question",
                name: "如何管理每日活動紀錄？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "照服員填入當日活動內容，AI 整理成符合機構格式的活動紀錄，大幅縮短撰寫時間。搭配頻率標籤（每日、每週），督導可即時確認紀錄繳交狀況，不再逐一催繳。",
                },
              },
              {
                "@type": "Question",
                name: "如何快速備妥評鑑文件？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "建立「評鑑備審」標籤群組，將個案服務計畫、活動紀錄、健康評估等文件貼上此標籤。評鑑前點一個標籤，所有需要的報告全部列出，拖曳排序確認後一份都不漏。",
                },
              },
              {
                "@type": "Question",
                name: "不同職類的文件如何統一管理？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "依職類建立標籤（社工、照服員、護理師、職能治療師），每個職類的文件分區管理，互不干擾。督導或主任可切換標籤快速掌握各職類文件狀況，跨職類協作更有效率。",
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
              itemUrl: "https://reportwang.com/day-care",
              ratingValue: 4.7,
              reviewCount: 3,
              reviews: [
              { author: "陳社工", ratingValue: 5, reviewBody: "標籤群組將個案計畫、活動、健康評估分類，評鑑備審一鍵列出，是中心裡最不緊張的人。" },
              { author: "林照服員", ratingValue: 5, reviewBody: "AI 輔助把口述觀察整理成活動紀錄，撰寫從 20 分鐘縮為 8 分鐘且品質提升。" },
              { author: "張護理師", ratingValue: 4, reviewBody: "職類標籤分開管理護理與社工文件，跨職類查閱仍便利，協作效率提升、無遺漏。" },
              ],
            })
          ),
        }}
      />
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center text-center py-24 px-6 bg-gradient-to-b from-background to-muted/30">
        <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
          日照中心專用
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
          日照中心文書管理系統｜<span className="text-primary">AI報告生成・標籤分類</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          活動紀錄 AI 輔助撰寫、個案服務計畫標籤管理、評鑑備審一鍵彙整——
          讓社工、照服員、護理師在同一平台協作，評鑑前不再手忙腳亂。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <StartButton>立即開始 — 免費</StartButton>
          <TrialButton>免費試用（無需註冊）</TrialButton>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/20 py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {DAY_CARE_STATS.map((stat) => (
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">日照中心文書管理這樣做：活動紀錄 AI 輔助，評鑑備審一鍵彙整，多職類協作不混亂</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              從活動紀錄到個案服務計畫，從評鑑備審到跨職類協作，每個功能都以日照工作流程為中心。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <BotIcon className="h-6 w-6" />,
                title: "活動紀錄 AI 輔助撰寫",
                desc: "照服員填入當日活動內容，AI 整理成符合機構格式的紀錄，品質提升、時間減半。",
              },
              {
                icon: <TagIcon className="h-6 w-6" />,
                title: "評鑑備審標籤群組管理",
                desc: "「評鑑備審」獨立標籤群組，個案服務計畫、活動紀錄、健康評估一鍵列出，評鑑前從容應對。",
              },
              {
                icon: <UsersIcon className="h-6 w-6" />,
                title: "多職類文件集中追蹤",
                desc: "社工、照服員、護理師、職能治療師依職類分區，督導一眼掌握各職類文件繳交狀況。",
              },
              {
                icon: <ClipboardListIcon className="h-6 w-6" />,
                title: "個案服務計畫即時更新",
                desc: "社工師直接在平台更新個案服務計畫，版本清晰可追溯，評鑑委員來查核也從容應對。",
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

      {/* Testimonials: 日照中心 */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-border" />
            <h2 className="text-sm font-medium text-muted-foreground whitespace-nowrap tracking-wider uppercase">
              日間照顧中心
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* 陳社工 — 精選 */}
            <Card className="border-primary/40 md:col-span-3">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-teal-100 text-teal-800 shrink-0">
                      陳
                    </div>
                    <div>
                      <div className="text-sm font-medium">陳社工</div>
                      <div className="text-xs text-muted-foreground mt-0.5">台北市日照中心・社工師</div>
                    </div>
                  </div>
                  <Badge variant="secondary">精選評價</Badge>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  日照中心文書最複雜的地方在於「多職類、多個案、文件類型多」。我負責 20 幾位個案的服務計畫，還要協調照服員的活動紀錄和護理師的健康評估，以前每到評鑑季就焦頭爛額，根本不知道誰的文件有沒有到位。
                  <br /><br />
                  用了<span className="text-foreground font-medium">報告汪</span>的<span className="text-foreground font-medium">標籤群組功能</span>，我把「個案服務計畫」、「活動紀錄」、「健康評估」各自建立標籤，每次更新文件就貼標籤，評鑑前點一下「評鑑備審」群組，所有要提交的文件全部跑出來。<span className="text-foreground font-medium">評鑑委員那天，我是中心裡最不緊張的人。</span>
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["個案服務計畫", "評鑑備審管理", "日照社工文書", "日間照顧機構評鑑"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 林照服員 */}
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-rose-100 text-rose-800 shrink-0">
                    林
                  </div>
                  <div>
                    <div className="text-sm font-medium">林照服員</div>
                    <div className="text-xs text-muted-foreground mt-0.5">新北市日照中心・資深照服員</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  我每天要帶 10 幾位長輩做活動，活動結束後還要寫紀錄，以前常常不知道該怎麼描述，寫得又慢又不好看，督導還要一直退回來修改。
                  <br /><br />
                  現在用<span className="text-foreground font-medium">報告汪的 AI 輔助</span>，我只要把今天做了什麼活動、長輩反應怎樣輸入進去，系統就幫我整理成完整的活動紀錄格式，<span className="text-foreground font-medium">以前要花 20 分鐘，現在 8 分鐘就搞定</span>，督導說我的紀錄品質也比以前好很多。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["活動紀錄撰寫", "AI文書輔助", "日照照服員", "長輩活動記錄"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 張護理師 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-green-100 text-green-800 shrink-0">
                    張
                  </div>
                  <div>
                    <div className="text-sm font-medium">張護理師</div>
                    <div className="text-xs text-muted-foreground mt-0.5">桃園市日照中心・護理師</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★☆</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  日照中心的護理師要管健康紀錄、用藥記錄、還要跟社工確認個案狀況，文件散落在各處很難追蹤。
                  <br /><br />
                  報告汪讓我用<span className="text-foreground font-medium">職類標籤</span>把護理文件和社工文件分開管理，但需要跨職類查閱時又能一起看，<span className="text-foreground font-medium">協作效率明顯提升</span>，健康紀錄也不再遺漏。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["健康紀錄管理", "多職類協作", "日照護理文書", "用藥紀錄"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 日照 Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            {DAY_CARE_STATS.map((s) => (
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
                q: "報告汪適合日照中心哪些角色使用？",
                a: "社工師、照服員、護理師、職能治療師都適用。社工師用標籤管理個案服務計畫與評鑑文件；照服員用 AI 輔助撰寫活動紀錄；護理師管理健康紀錄與用藥記錄；職能治療師追蹤復健進度文件。",
              },
              {
                q: "如何管理每日活動紀錄？",
                a: "照服員填入當日活動內容，AI 整理成符合機構格式的活動紀錄，大幅縮短撰寫時間。搭配頻率標籤（每日、每週），督導可即時確認紀錄繳交狀況，不再逐一催繳。",
              },
              {
                q: "如何快速備妥評鑑文件？",
                a: "建立「評鑑備審」標籤群組，將個案服務計畫、活動紀錄、健康評估等文件貼上此標籤。評鑑前點一個標籤，所有需要的報告全部列出，拖曳排序確認後一份都不漏。",
              },
              {
                q: "不同職類的文件如何統一管理？",
                a: "依職類建立標籤（社工、照服員、護理師、職能治療師），每個職類的文件分區管理，互不干擾。督導或主任可切換標籤快速掌握各職類文件狀況，跨職類協作更有效率。",
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
                href: "/hospital",
                title: "醫院 AI 文書管理系統介紹",
                emoji: "🏥",
                label: "醫院",
                stat: "↓ 60%",
                statLabel: "文書交接時間",
                desc: "班別標籤管理交接班文書，評鑑備審一鍵備齊，護理長省心省力。",
                cta: "護理文書管理系統・交班紀錄工具 →",
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
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          準備好讓日照中心文書走向智慧管理了嗎？
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          加入報告汪，活動紀錄時間減少 48%，評鑑文件零遺漏，多職類同平台協作。
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
          <Link href="/auth/sign-up" title="免費試用報告汪日照中心方案" className="hover:text-primary transition-colors">註冊</Link>
        </div>
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
