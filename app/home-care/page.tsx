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
  SmartphoneIcon,
  ChevronDownIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "居服機構 AI 文書管理系統｜督導標籤追蹤・日誌 AI 撰寫・評鑑查核零補件",
  description:
    "報告汪專為居服機構打造：督導依服員建立標籤分類、AI 輔助日誌撰寫省時省力、評鑑查核零補件。居服員、督導、機構主任在同一平台管理所有報告，文件不再散落。支援行動裝置，隨時隨地記錄與查閱，評鑑備審準備從容不迫。立即免費試用。",
  alternates: { canonical: "/home-care" },
  openGraph: {
    title: "居服機構 AI 文書管理系統｜督導標籤追蹤・日誌 AI 撰寫・評鑑查核零補件",
    description:
      "報告汪專為居服機構打造：督導依服員建立標籤分類、AI 輔助日誌撰寫省時省力、評鑑查核零補件。居服員、督導、機構主任在同一平台管理所有報告，文件不再散落。支援行動裝置，隨時隨地記錄與查閱，評鑑備審準備從容不迫。立即免費試用。",
  },
  twitter: {
    title: "居服機構 AI 文書管理系統｜督導標籤追蹤・日誌 AI 撰寫・評鑑查核零補件",
    description:
      "報告汪專為居服機構打造：督導依服員建立標籤分類、AI 輔助日誌撰寫省時省力、評鑑查核零補件。居服員、督導、機構主任在同一平台管理所有報告，文件不再散落。支援行動裝置，隨時隨地記錄與查閱，評鑑備審準備從容不迫。立即免費試用。",
  },
};

const HOME_CARE_STATS = [
  { value: "↓ 52%", label: "居服員日誌時間" },
  { value: "零補件", label: "主管機關查核" },
  { value: "↑ 4x", label: "督導追蹤效率" },
];

export default function HomeCarePage() {
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
                name: "報告汪適合居服機構哪些角色使用？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "居服員、督導、執行主任都適用。居服員用 AI 輔助撰寫日誌、手機完成文書；督導用標籤追蹤各居服員文件繳交狀況；主任則用送審標籤群組統一備妥查核文件。",
                },
              },
              {
                "@type": "Question",
                name: "如何追蹤居服員的日誌繳交狀況？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "建立「依撰寫者」標籤（例如：居服員：王小明），每位居服員提交的文件自動歸入對應標籤。督導篩選標籤後一眼可見誰的文件缺繳，搭配頻率標籤（每日、每週）還能確認是否按時提交。",
                },
              },
              {
                "@type": "Question",
                name: "如何快速備妥主管機關查核文件？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "建立「送審必備」標籤群組，將個案服務計畫、照顧日誌、異常事件通報等文件貼上此標籤。查核前點一個標籤，所有文件全部列出，拖曳排序按送審順序確認，一份都不漏。",
                },
              },
              {
                "@type": "Question",
                name: "居服員在手機上也能使用嗎？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "可以。報告汪支援行動端操作，居服員在服務結束後即可用手機上傳、編輯並提交服務紀錄，不需等回到辦公室才能完成文書作業。",
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
          居服機構專用
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
          居服機構文書管理系統｜<span className="text-primary">AI報告生成・標籤分類</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          標籤分類管理居服員文件、AI輔助撰寫日誌、一個標籤完成查核備審──
          讓督導省下追文件的時間，把心力還給服務品質。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <StartButton>立即開始 — 免費</StartButton>
          <TrialButton>免費試用（無需註冊）</TrialButton>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/20 py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {HOME_CARE_STATS.map((stat) => (
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">居服機構文書管理這樣做：督導標籤追蹤，居服員日誌 AI 輔助，查核零補件</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              從督導追蹤到查核備審，從 AI 日誌到行動端操作，每個功能都以居服工作流程為中心。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <UsersIcon className="h-6 w-6" />,
                title: "居服員文件集中追蹤",
                desc: "標籤依撰寫者分類，督導一眼看出誰的文件缺繳，不再每天逐一催繳。",
              },
              {
                icon: <TagIcon className="h-6 w-6" />,
                title: "查核備審一鍵備齊",
                desc: "「送審必備」獨立標籤群組，拖曳排序、不漏件，衛生局來查核也從容應對。",
              },
              {
                icon: <BotIcon className="h-6 w-6" />,
                title: "AI 輔助日誌撰寫",
                desc: "居服員填入服務內容，AI 整理成符合機構格式的紀錄，品質提升、時間減半。",
              },
              {
                icon: <SmartphoneIcon className="h-6 w-6" />,
                title: "行動端完成報告",
                desc: "手機上傳、編輯、提交，在外跑也能即時完成文書，不用等回到辦公室。",
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

      {/* Testimonials: 居服機構 */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-border" />
            <h2 className="text-sm font-medium text-muted-foreground whitespace-nowrap tracking-wider uppercase">
              居家服務機構
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* 吳督導 — 精選 */}
            <Card className="border-primary/40 md:col-span-3">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-teal-100 text-teal-800 shrink-0">
                      吳
                    </div>
                    <div>
                      <div className="text-sm font-medium">吳督導</div>
                      <div className="text-xs text-muted-foreground mt-0.5">台中市居家服務中心・督導</div>
                    </div>
                  </div>
                  <Badge variant="secondary">精選評價</Badge>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  居服單位最頭痛的就是「人員分散、文件不統一」。我手下有 30 位居服員，每人負責的個案和撰寫的服務紀錄都不同，以前光是確認誰的日誌有交、誰還沒繳，就要花掉我每天一個小時。
                  <br /><br />
                  <span className="text-foreground font-medium">報告汪</span>的<span className="text-foreground font-medium">標籤依撰寫者分類</span>功能完全解決這個問題——我只要篩「居服員：王小明」，他所有本週的服務紀錄就全部跑出來，缺少哪份一目了然。加上<span className="text-foreground font-medium">依頻率標籤</span>（每日、每週、每月），我不用再一一提醒，執行人員自己就知道今天該完成什麼。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["居家服務紀錄", "居服員文件管理", "督導追蹤", "居服機構報告系統"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 黃主任 */}
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-rose-100 text-rose-800 shrink-0">
                    黃
                  </div>
                  <div>
                    <div className="text-sm font-medium">黃主任</div>
                    <div className="text-xs text-muted-foreground mt-0.5">高雄市居服中心・執行主任</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  居服單位每季都要送主管機關審查，包含個案服務計畫、照顧日誌、異常事件通報等，光是整理就要耗掉行政人員整整一週。
                  <br /><br />
                  現在用<span className="text-foreground font-medium">報告汪的分類標籤</span>，把「送審必備文件」獨立成一個標籤群組，到了送審前只要點一個標籤，所有需要的報告全部列出來，<span className="text-foreground font-medium">拖曳排序</span>讓行政人員按照送審順序逐一確認，一份都不會漏。去年衛生局來查核，我們是第一次做到文件零補件。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["居服查核準備", "照顧計畫文件", "異常事件通報", "長照2.0居服"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 許居服員 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-green-100 text-green-800 shrink-0">
                    許
                  </div>
                  <div>
                    <div className="text-sm font-medium">許居服員</div>
                    <div className="text-xs text-muted-foreground mt-0.5">新竹縣居服單位・資深居服員</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★☆</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  我每天服務 4–5 個家庭，回家還要寫服務日誌，以前常常忘記格式要求。報告汪的<span className="text-foreground font-medium">AI輔助生成</span>讓我只要填入今天做了什麼，系統就幫我整理成符合機構格式的紀錄。
                  <br /><br />
                  督導說我的日誌品質比以前好很多，其實我花的時間反而少了，大概只要以前的<span className="text-foreground font-medium">一半</span>。對我們這種在外跑的工作者來說，手機上就能完成報告，真的省很多力。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["居服日誌", "行動端報告", "AI撰寫輔助", "服務紀錄格式"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 居服 Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            {HOME_CARE_STATS.map((s) => (
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
                q: "報告汪適合居服機構哪些角色使用？",
                a: "居服員、督導、執行主任都適用。居服員用 AI 輔助撰寫日誌、手機完成文書；督導用標籤追蹤各居服員文件繳交狀況；主任則用送審標籤群組統一備妥查核文件。",
              },
              {
                q: "如何追蹤居服員的日誌繳交狀況？",
                a: "建立「依撰寫者」標籤（例如：居服員：王小明），每位居服員提交的文件自動歸入對應標籤。督導篩選標籤後一眼可見誰的文件缺繳，搭配頻率標籤（每日、每週）還能確認是否按時提交。",
              },
              {
                q: "如何快速備妥主管機關查核文件？",
                a: "建立「送審必備」標籤群組，將個案服務計畫、照顧日誌、異常事件通報等文件貼上此標籤。查核前點一個標籤，所有文件全部列出，拖曳排序按送審順序確認，一份都不漏。",
              },
              {
                q: "居服員在手機上也能使用嗎？",
                a: "可以。報告汪支援行動端操作，居服員在服務結束後即可用手機上傳、編輯並提交服務紀錄，不需等回到辦公室才能完成文書作業。",
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/hospital-nursing" title="醫院護理部 AI 文書管理系統介紹" className="block group">
              <Card className="h-full hover:shadow-md transition-shadow group-hover:border-primary/40">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🏥</span>
                    <span className="font-semibold text-sm">醫院護理部</span>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">↓ 60%</div>
                  <p className="text-xs text-muted-foreground mb-2">文書交接時間</p>
                  <p className="text-sm text-muted-foreground">
                    班別標籤管理交接班文書，評鑑備審一鍵備齊，護理長省心省力。
                  </p>
                  <div className="mt-3 text-xs font-medium text-primary group-hover:underline">
                    護理文書管理系統・交班紀錄工具 →
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/nursing-home" title="護理之家多職種文書協作平台介紹" className="block group">
              <Card className="h-full hover:shadow-md transition-shadow group-hover:border-primary/40">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🏡</span>
                    <span className="font-semibold text-sm">護理之家</span>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">4 職類</div>
                  <p className="text-xs text-muted-foreground mb-2">同平台協作管理</p>
                  <p className="text-sm text-muted-foreground">
                    護理師、照服員、社工、營養師同平台協作，夜班文書時間減少 63%。
                  </p>
                  <div className="mt-3 text-xs font-medium text-primary group-hover:underline">
                    護理之家多職類文書協作平台 →
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          準備好讓文書不再拖累服務品質了嗎？
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          加入報告汪，督導追蹤效率提升 4 倍，查核零補件。
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
          <Link href="/auth/sign-up" title="免費試用報告汪居服機構方案" className="hover:text-primary transition-colors">註冊</Link>
        </div>
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
