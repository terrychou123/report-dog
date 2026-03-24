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
  title: "身心障礙福利機構 AI 文書管理系統｜自我檢核・ISP・服務品質評鑑備審平台",
  description:
    "報告汪專為身心障礙福利機構設計：ISP 個別化支持計畫、服務品質自我檢核、人權保障文件，AI 逐項分析缺漏，評鑑準備不再手忙腳亂。社工師、照顧人員、機構主任同平台協作，文書效率大幅提升。立即免費試用。",
  alternates: { canonical: "/disability" },
  openGraph: {
    title: "身心障礙福利機構 AI 文書管理系統｜自我檢核・ISP・服務品質評鑑備審平台",
    description:
      "報告汪專為身心障礙福利機構設計：ISP 個別化支持計畫、服務品質自我檢核、人權保障文件，AI 逐項分析缺漏，評鑑準備不再手忙腳亂。社工師、照顧人員、機構主任同平台協作，文書效率大幅提升。立即免費試用。",
  },
  twitter: {
    title: "身心障礙福利機構 AI 文書管理系統｜自我檢核・ISP・服務品質評鑑備審平台",
    description:
      "報告汪專為身心障礙福利機構設計：ISP 個別化支持計畫、服務品質自我檢核、人權保障文件，AI 逐項分析缺漏，評鑑準備不再手忙腳亂。社工師、照顧人員、機構主任同平台協作，文書效率大幅提升。立即免費試用。",
  },
};

export default function DisabilityPage() {
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
                name: "報告汪如何協助身心障礙福利機構的自我檢核準備？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "報告汪內建「身心障礙福利機構專業服務品質與經營管理自我檢核項目」評鑑 profile，上傳機構報告後，AI 自動對應壹、專業服務品質（權益保障 8 大項、適切照顧與支持 9 大項）與貳、經營管理（行政、服務、員工、財務）等檢核面向，直接標示哪些項目文件不足，省去逐項比對的時間。",
                },
              },
              {
                "@type": "Question",
                name: "ISP 個別化支持計畫的文件如何用報告汪管理？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "建立「ISP」標籤，將每位服務使用者的個別化支持計畫、半年評值紀錄、跨專業研討紀錄歸入同一標籤。評鑑前篩選「ISP」標籤，所有個案計畫一次到位，社工師不再需要在資料夾中逐一翻找。",
                },
              },
              {
                "@type": "Question",
                name: "機構中的社工師、照顧人員、主任如何在同一平台分工使用？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "依職類建立獨立標籤（社工紀錄、照顧日誌、行政管理、ISP 計畫等），各職類在各自標籤區撰寫文件，互不干擾。主任需要跨職類彙整月報或評鑑備審時，透過跨標籤篩選一次取得所有職類的最新文件。",
                },
              },
              {
                "@type": "Question",
                name: "身心障礙福利機構的人權保障文件如何確保不遺漏？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "建立「人權保障」標籤，依自我檢核的生存權、健康權、安全權、選擇權、隱私權、參與權、人際社交、申訴權等八大面向設立子標籤。日常文書寫完直接掛上對應標籤，評鑑前 AI 分析直接標示哪個面向的文件量不足，一目了然。",
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
          身心障礙福利機構專用
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
          身心障礙機構文書管理系統｜<span className="text-primary">自我檢核 AI 分析・ISP 計畫管理</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          壹、專業服務品質 + 貳、經營管理全面覆蓋——AI 逐項對應自我檢核表，直接標示文件缺漏，
          評鑑準備效率大幅提升。
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
            { value: "32 項", label: "自我檢核面向全覆蓋" },
            { value: "AI 分析", label: "自動標示文件缺漏" },
            { value: "ISP + 人權", label: "兩大核心文件集中管理" },
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
              身心障礙福利機構文書管理這樣做：自我檢核逐項對應，ISP 集中管理
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              從 ISP 計畫追蹤到人權保障文件，從正向行為支持紀錄到財務管理，每個功能都以身心障礙福利機構工作流程為中心。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <SparklesIcon className="h-6 w-6" />,
                title: "AI 自我檢核分析",
                desc: "上傳機構報告後，AI 自動對應「專業服務品質」與「經營管理」兩大部分的檢核項目，逐項標示文件是否齊全，讓評鑑準備不再是臨時抱佛腳。",
              },
              {
                icon: <ClipboardListIcon className="h-6 w-6" />,
                title: "ISP 計畫集中管理",
                desc: "每位服務使用者的個別化支持計畫、半年評值、跨專業研討紀錄歸入同一標籤。評鑑前篩選 ISP 標籤，所有個案計畫一次到位，不再漏件。",
              },
              {
                icon: <UsersIcon className="h-6 w-6" />,
                title: "多職類標籤分區協作",
                desc: "社工師、照顧人員、護理師、主任各自的標籤分區，文件自動歸位，互不干擾。主任跨標籤彙整時一次到位，行政會議前文件即時備齊。",
              },
              {
                icon: <TagIcon className="h-6 w-6" />,
                title: "人權保障文件標籤分類",
                desc: "生存權、健康權、安全權、選擇權、隱私權、參與權等八大面向各設標籤，日常文書寫完直接貼標，評鑑前 AI 標示哪個面向文件不足。",
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
            {/* 張社工師 — 精選，全寬 */}
            <Card className="border-primary/40 md:col-span-3">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-indigo-100 text-indigo-800 shrink-0">
                      張
                    </div>
                    <div>
                      <div className="text-sm font-medium">張社工師</div>
                      <div className="text-xs text-muted-foreground mt-0.5">新北市身心障礙福利機構・專職社工師</div>
                    </div>
                  </div>
                  <Badge variant="secondary">精選評價</Badge>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  身心障礙福利機構的文書最難的地方是「每個服務使用者的需求差異極大」——有的需要 AAC 溝通輔具，有的有情緒行為支持計畫，有的正在辦理轉銜，ISP 個別化支持計畫的版本管理光用 Word 就快崩潰了。
                  <br /><br />
                  用了<span className="text-foreground font-medium">報告汪</span>之後，我幫每位個案建立專屬標籤，ISP 計畫、半年評值、跨專業研討紀錄都集中在同一個地方。評鑑前最讓我感謝的是<span className="text-foreground font-medium"> AI 自我檢核分析</span>——上傳報告後直接告訴我哪些自我檢核項目文件不足，不用再一項一項手動比對，評鑑準備時間少了將近一半。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["身心障礙 ISP 管理", "自我檢核評鑑準備", "個別化支持計畫", "身心障礙機構文書"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 林主任 — 2 欄 */}
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-emerald-100 text-emerald-800 shrink-0">
                    林
                  </div>
                  <div>
                    <div className="text-sm font-medium">林主任</div>
                    <div className="text-xs text-muted-foreground mt-0.5">台中市私立身心障礙福利機構・機構主任</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  我們機構有社工師、照顧服務員、物理治療師三種職類，過去文件全部混在一個共用資料夾，每次評鑑前找文件都是一場噩夢，甚至有一次被評鑑委員問到「ISP 執行紀錄在哪」，我翻了二十分鐘才找到。
                  <br /><br />
                  現在用<span className="text-foreground font-medium">報告汪</span>的標籤依<span className="text-foreground font-medium">職類分區</span>管理，加上「評鑑備審」總標籤，每類文件都在對應位置。上次評鑑委員問問題，我<span className="text-foreground font-medium">三秒內</span>就把文件找出來，委員說是他今年巡訪中資料管理最清楚的機構。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["身心障礙機構評鑑", "跨職類文件管理", "評鑑備審文件", "機構行政管理"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 陳照服員 — 1 欄 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-rose-100 text-rose-800 shrink-0">
                    陳
                  </div>
                  <div>
                    <div className="text-sm font-medium">陳照服員</div>
                    <div className="text-xs text-muted-foreground mt-0.5">桃園市身心障礙福利機構・照顧服務員</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  照顧服務員要寫的紀錄其實很多——照顧日誌、情緒行為記錄、活動參與紀錄，以前全部手寫再輸入電腦，下班後還要多花半小時整理文件。
                  <br /><br />
                  用了<span className="text-foreground font-medium">報告汪</span>的 AI 輔助之後，我把當天照顧觀察大概說一遍，<span className="text-foreground font-medium">AI 自動整理</span>成正式格式，我只需確認一遍，每天文書時間省下超過半小時。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["照顧日誌記錄", "情緒行為紀錄", "AI輔助文書", "身心障礙照顧"].map((tag) => (
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
              { value: "32 項", label: "自我檢核面向覆蓋" },
              { value: "3 秒", label: "評鑑文件查找速度" },
              { value: "ISP 全覆蓋", label: "個案計畫集中管理" },
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
                q: "報告汪如何協助身心障礙福利機構的自我檢核準備？",
                a: "報告汪內建「身心障礙福利機構專業服務品質與經營管理自我檢核項目」評鑑 profile，上傳機構報告後，AI 自動對應壹、專業服務品質（權益保障 8 大項、適切照顧與支持 9 大項）與貳、經營管理（行政、服務、員工、財務）等檢核面向，直接標示哪些項目文件不足，省去逐項比對的時間。",
              },
              {
                q: "ISP 個別化支持計畫的文件如何用報告汪管理？",
                a: "建立「ISP」標籤，將每位服務使用者的個別化支持計畫、半年評值紀錄、跨專業研討紀錄歸入同一標籤。評鑑前篩選「ISP」標籤，所有個案計畫一次到位，社工師不再需要在資料夾中逐一翻找。",
              },
              {
                q: "機構中的社工師、照顧人員、主任如何在同一平台分工使用？",
                a: "依職類建立獨立標籤（社工紀錄、照顧日誌、行政管理、ISP 計畫等），各職類在各自標籤區撰寫文件，互不干擾。主任需要跨職類彙整月報或評鑑備審時，透過跨標籤篩選一次取得所有職類的最新文件。",
              },
              {
                q: "身心障礙福利機構的人權保障文件如何確保不遺漏？",
                a: "建立「人權保障」標籤，依自我檢核的生存權、健康權、安全權、選擇權、隱私權、參與權、人際社交、申訴權等八大面向設立子標籤。日常文書寫完直接掛上對應標籤，評鑑前 AI 分析直接標示哪個面向的文件量不足，一目了然。",
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
                href: "/home-nursing",
                title: "居家護理所 AI 文書管理系統介紹",
                emoji: "🩺",
                label: "居家護理所",
                stat: "8 項",
                statLabel: "評鑑基準覆蓋",
                desc: "個案照護紀錄和經營指標用標籤分類後，評鑑前 AI 分析直接標示缺漏。",
                cta: "居家護理所文書管理系統 →",
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
                href: "/nursing-home",
                title: "護理之家 AI 文書管理系統介紹",
                emoji: "🏡",
                label: "護理之家",
                stat: "4 職類",
                statLabel: "協作管理",
                desc: "主任月報行政時間少了三分之一，各職類文件不再混在一起找不到。",
                cta: "護理之家多職類文書協作平台 →",
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
          準備好讓身心障礙機構文書走向 AI 輔助了嗎？
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          加入報告汪，自我檢核 AI 分析、ISP 集中管理、評鑑文件不再遺漏。
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
          <Link href="/auth/sign-up" title="免費試用報告汪身心障礙機構方案" className="hover:text-primary transition-colors">註冊</Link>
        </div>
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
