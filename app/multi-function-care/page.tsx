import type { Metadata } from "next";
import { meta as multiFunctionCareMeta } from "@/lib/ai/evaluation-profiles/multi-function-care";
import { reviewJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import Link from "next/link";
import { StartButton } from "@/components/start-button";
import { TrialButton } from "@/components/trial-button";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BotIcon,
  TagIcon,
  UsersIcon,
  ClipboardListIcon,
  HomeIcon,
  SunIcon,
  BedDoubleIcon,
  ArrowRightIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "小規機 AI 文書管理系統｜日照+居服+夜宿三合一・評鑑備審一鍵彙整・多職類協作",
  description:
    `報告汪專為小規模多機能機構打造：AI 輔助服務紀錄撰寫、日照/居服/夜宿三類個案文件統一管理、評鑑備審標籤群組一鍵彙整。對應 115 年度臺北市小規模多機能機構評鑑基準（${multiFunctionCareMeta.totalItems - 2} 項正式 + 2 加分題），社工、照服員、護理師在同一平台協作。立即免費試用。`,
  alternates: { canonical: "/multi-function-care" },
  openGraph: {
    title: "小規機 AI 文書管理系統｜日照+居服+夜宿三合一・評鑑備審一鍵彙整",
    description: "報告汪專為小規機打造：三類服務文件統一管理，評鑑備審一鍵彙整。對應 115 年度評鑑基準。",
  },
};

const STATS = [
  { value: "三合一", label: "日照+居服+夜宿統一平台" },
  { value: "45 項", label: "115 年度評鑑基準覆蓋" },
  { value: "零遺漏", label: "評鑑文件備審" },
];

export default function MultiFunctionCareLandingPage() {
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
                  name: "小規機有哪些服務類型的文件需要管理？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "小規機同時經營日間照顧、居家服務（到府）、臨時住宿（夜宿）三類服務，每類都有獨立的服務紀錄、照顧計畫與評鑑備審需求。報告汪透過標籤系統，讓三類服務文件在同一平台統一管理，評鑑前依標籤分類備審，不再混淆。",
                  },
                },
                {
                  "@type": "Question",
                  name: "小規機評鑑有哪些自評表特殊欄位？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "小規機自評表需分別填寫日照、居服、夜宿三類服務的人日數，各需填寫 114 年 12 月 31 日及 115 年 4 月 30 日兩個時點。建議提前在系統中建立三類服務的統計記錄，方便自評表填寫。",
                  },
                },
                {
                  "@type": "Question",
                  name: "小規機評鑑與日照中心評鑑有何不同？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "小規機比日照中心多 2 個評鑑項目：第 11 項「照顧服務員之服務執行（居服）」與第 29 項「訂有寢室管理規範（夜宿）」，分別對應居家服務和夜宿服務的管理面向。此外工作手冊需涵蓋居服員與夜宿輪值人員，自評表也需三類分別統計。",
                  },
                },
                {
                  "@type": "Question",
                  name: "居服員到府服務的查核記錄如何管理？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "第 11 項評鑑要求機構有居服員查核與評估機制、服務員依計畫執行、準時到班及即時通報的紀錄。報告汪可讓居服員在到府後記錄服務內容，督導在平台上確認執行狀況，不需手動彙整紙本紀錄。",
                  },
                },
              ],
            }),
            reviewJsonLd({
              itemName: "報告汪",
              itemUrl: "https://reportwang.com/multi-function-care",
              ratingValue: 4.7,
              reviewCount: 3,
              reviews: [
                { author: "黃業負", ratingValue: 5, reviewBody: "日照、居服、夜宿文件統一在一個平台管理，評鑑前依標籤分類備審，大幅減少漏件。" },
                { author: "林社工", ratingValue: 5, reviewBody: "三類服務的個案照顧計畫各自建立標籤，跨服務查閱清晰，評鑑委員查文件時不再手忙腳亂。" },
                { author: "陳照服員", ratingValue: 4, reviewBody: "AI 輔助把居服到府的口述紀錄整理成標準格式，到府服務紀錄時間從 15 分鐘縮短至 5 分鐘。" },
              ],
            }),
          ),
        }}
      />

      <Navbar />

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <Badge variant="secondary" className="mb-4">小規模多機能機構（小規機）</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 max-w-2xl">
          小規機文書管理<br />
          <span className="text-primary">日照・居服・夜宿三合一</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-6 max-w-xl">
          AI 輔助服務紀錄撰寫，三類服務文件統一管理，
          對應 115 年度評鑑基準 {multiFunctionCareMeta.totalItems - 2} 項，評鑑備審一鍵彙整。
        </p>
        <div className="flex gap-3 flex-wrap justify-center mb-10">
          <StartButton source="multi-function-care-cta" />
          <TrialButton source="multi-function-care-cta" />
        </div>
        <div className="grid grid-cols-3 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 三合一服務說明 */}
      <section className="px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">三種服務模式，一個平台管理</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg p-2 bg-orange-500/10">
                    <SunIcon className="h-5 w-5 text-orange-600" />
                  </div>
                  <CardTitle className="text-base">日間照顧</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  活動紀錄 AI 撰寫、個案服務計畫管理、健康紀錄追蹤，
                  對應評鑑壹～肆大區塊共用核心。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg p-2 bg-green-500/10">
                    <HomeIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle className="text-base">居家服務</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  居服員到府紀錄管理、服務計畫執行追蹤、到府查核機制，
                  對應第 11 項評鑑重點。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg p-2 bg-purple-500/10">
                    <BedDoubleIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-base">臨時住宿</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  夜宿服務紀錄、寢室管理規範文件、夜間輪值記錄，
                  對應第 29 項評鑑重點。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 功能特色 */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">專為小規機設計的文書管理</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex gap-4">
              <div className="shrink-0 rounded-lg p-2 bg-primary/10 h-fit">
                <BotIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">AI 輔助服務紀錄撰寫</h3>
                <p className="text-sm text-muted-foreground">
                  日照活動紀錄、居服執行記錄、夜宿服務日誌，AI 協助整理格式，縮短撰寫時間。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 rounded-lg p-2 bg-primary/10 h-fit">
                <TagIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">三類服務標籤分類</h3>
                <p className="text-sm text-muted-foreground">
                  建立「日照」「居服」「夜宿」標籤，三類文件清楚區分，自評表人日數統計不再混淆。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 rounded-lg p-2 bg-primary/10 h-fit">
                <ClipboardListIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">評鑑備審一鍵彙整</h3>
                <p className="text-sm text-muted-foreground">
                  建立「115 年評鑑」標籤群組，45 項評鑑對應文件統一管理，評鑑前一個標籤全部列出。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 rounded-lg p-2 bg-primary/10 h-fit">
                <UsersIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">多職類同平台協作</h3>
                <p className="text-sm text-muted-foreground">
                  社工師、照服員（日照/居服）、護理師、夜宿輪值人員在同一平台協作，文件不再分散。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 評鑑小教室 CTA */}
      <section className="px-4 py-12 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-3">想深入了解評鑑基準？</h2>
          <p className="text-muted-foreground mb-6">
            查看小規機評鑑小教室，115 年度 45 項評鑑基準逐項說明，含準備要訣與備審文件指引。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/school/multi-function-care"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border hover:bg-muted transition-colors text-sm font-medium"
            >
              小規機評鑑小教室 <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/school/daycare"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border hover:bg-muted transition-colors text-sm font-medium text-muted-foreground"
            >
              日照中心評鑑基準（對照用）
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">立即免費試用</h2>
        <p className="text-muted-foreground mb-6">
          不需信用卡，即刻開始整理小規機文書
        </p>
        <div className="flex gap-3 justify-center">
          <StartButton source="multi-function-care-cta" />
          <TrialButton source="multi-function-care-cta" />
        </div>
      </section>
    </main>
  );
}
