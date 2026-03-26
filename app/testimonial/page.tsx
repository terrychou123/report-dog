import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StartButton } from "@/components/start-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDownIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "用戶評價｜29+ 位長照從業人員推薦報告汪｜居服・日照・護理之家・醫院",
  description:
    "29+ 位居家服務、日照中心、醫院、住宿型機構、身障機構、產後護理之家、居家護理所、一般護理之家從業人員的真實評價。報告汪平均評分 4.9 顆星，追蹤功能、逾期提醒、AI 文書輔助廣獲 8 種機構類型長照與社福從業人員推薦。",
  keywords: [
    "報告汪評價",
    "長照文書管理推薦",
    "長照機構報告系統評價",
    "居服機構文書系統推薦",
    "日照中心文書管理評價",
    "護理之家報告系統推薦",
    "醫院文書管理評價",
    "身心障礙機構文書推薦",
    "追蹤報告逾期提醒",
    "定期報告管理",
  ],
  alternates: { canonical: "https://reportwang.com/testimonial" },
  openGraph: {
    title: "用戶評價｜29+ 位長照從業人員推薦報告汪｜居服・日照・護理之家・醫院",
    description:
      "29+ 位長照與社福從業人員的真實評價，涵蓋 8 種機構類型。報告汪平均評分 4.9 顆星，追蹤功能逾期提醒廣受好評。",
    url: "https://reportwang.com/testimonial",
  },
  twitter: {
    title: "用戶評價｜29+ 位長照從業人員推薦報告汪｜居服・日照・護理之家・醫院",
    description:
      "29+ 位長照與社福從業人員的真實評價，涵蓋 8 種機構類型。報告汪平均評分 4.9 顆星，追蹤功能逾期提醒廣受好評。",
  },
};

const appJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "報告汪",
  url: "https://reportwang.com",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
  description: "專為長照與社福機構設計的 AI 文書管理系統，支援居服、日照、醫院、護理之家等 8 種機構類型。",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "29",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    { "@type": "Review", author: { "@type": "Person", "name": "吳督導" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "報告汪的標籤依撰寫者分類功能完全解決人員分散的問題，督導追蹤居服員文件繳交狀況更輕鬆。" },
    { "@type": "Review", author: { "@type": "Person", "name": "黃主任" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "用報告汪的分類標籤建立送審必備文件群組，去年衛生局查核第一次做到文件零補件。" },
    { "@type": "Review", author: { "@type": "Person", "name": "許居服員" }, reviewRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" }, reviewBody: "報告汪的 AI 輔助生成讓服務紀錄時間減少一半，督導說日誌品質比以前好很多。" },
    { "@type": "Review", author: { "@type": "Person", "name": "陳社工" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "用報告汪的標籤群組管理個案服務計畫和評鑑備審文件，評鑑委員那天是中心裡最不緊張的人。" },
    { "@type": "Review", author: { "@type": "Person", "name": "林照服員" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "AI 輔助讓活動紀錄時間從 20 分鐘縮短到 8 分鐘，督導說品質也比以前好很多。" },
    { "@type": "Review", author: { "@type": "Person", "name": "張護理師（日照）" }, reviewRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" }, reviewBody: "職類標籤把護理文件和社工文件分開管理，跨職類協作效率明顯提升。" },
    { "@type": "Review", author: { "@type": "Person", "name": "蔡護理長" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "班別標籤和頻率標籤雙重分類，護理部主任說這是她看過最有條理的護理文書管理系統。" },
    { "@type": "Review", author: { "@type": "Person", "name": "羅護理師" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "多標籤文件分類讓 ICU 交接班 30 秒內確認所有文件狀態，大幅減少文書焦慮。" },
    { "@type": "Review", author: { "@type": "Person", "name": "鄭副護理長" }, reviewRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" }, reviewBody: "評鑑備審標籤讓評審委員說這間病房的文件是整個醫院最整齊的。" },
    { "@type": "Review", author: { "@type": "Person", "name": "方護理長" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "三層頻率標籤讓住宿型長照機構文書管理更完整，評鑑委員說是今年巡訪中文書最完整的機構。" },
    { "@type": "Review", author: { "@type": "Person", "name": "廖主任" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "依職類分標籤管理，每月行政時間少了將近三分之一。" },
    { "@type": "Review", author: { "@type": "Person", "name": "游社工師" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "多標籤一份文件，AI 輔助申訴案件格式整理，有更多時間陪伴住民家屬。" },
    { "@type": "Review", author: { "@type": "Person", "name": "盧照服員" }, reviewRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" }, reviewBody: "手機語音輸入觀察，AI 自動整理成照護紀錄格式，夜班文書時間從 40 分鐘縮短到不到 15 分鐘。" },
    { "@type": "Review", author: { "@type": "Person", "name": "張社工師" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "AI 自我檢核分析直接標示缺漏項目，身心障礙機構評鑑準備時間少了將近一半。" },
    { "@type": "Review", author: { "@type": "Person", "name": "林主任（身障）" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "評鑑委員問問題三秒內就找到文件，說是他今年巡訪中資料管理最清楚的機構。" },
    { "@type": "Review", author: { "@type": "Person", "name": "陳照服員（身障）" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "AI 輔助每天文書時間省下超過半小時。" },
    { "@type": "Review", author: { "@type": "Person", "name": "王護理師" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "依評鑑基準各建標籤，AI 評鑑分析直接告訴哪項文件不足，產後護理之家評鑑準備時間省了近一半。" },
    { "@type": "Review", author: { "@type": "Person", "name": "陳負責人" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "評鑑構面分區標籤讓產後護理之家再也不用臨時補件。" },
    { "@type": "Review", author: { "@type": "Person", "name": "林護產人員" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "品質指標標籤加 AI 分析趨勢，每個指標都有完整監測記錄。" },
    { "@type": "Review", author: { "@type": "Person", "name": "張護理師（居護）" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "依個案建立標籤，AI 評鑑分析直接標示照護計畫文件不完整之處，居家護理所評鑑準備時間省了近一半。" },
    { "@type": "Review", author: { "@type": "Person", "name": "李負責人" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "評鑑構面分區標籤讓居家護理所再也不用臨時補件。" },
    { "@type": "Review", author: { "@type": "Person", "name": "陳訪視人員" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "安全管理標籤加 AI 自動分析改善追蹤，評鑑前每個安全事件都有完整記錄。" },
    { "@type": "Review", author: { "@type": "Person", "name": "林護理長" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "依住民建立標籤，AI 評鑑分析直接標示照護計畫缺失，一般護理之家評鑑準備時間省了超過一半。" },
    { "@type": "Review", author: { "@type": "Person", "name": "黃負責人" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "C 區四個構面各有標籤，評鑑前 AI 一次告知缺件，再也不用臨時補件。" },
    { "@type": "Review", author: { "@type": "Person", "name": "陳照服員（護理之家）" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "住民照顧標籤加 AI 對應 B2 基準，評鑑前每位住民生活照顧紀錄都完整。" },
    { "@type": "Review", author: { "@type": "Person", "name": "劉督導" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "報告汪的追蹤功能讓我設定每日追蹤，哪位居服員的日誌逾期一目了然。打開追蹤頁面，紅色標示的就是還沒交的人，督導效率直接翻倍。" },
    { "@type": "Review", author: { "@type": "Person", "name": "周社工" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "每月追蹤評鑑文件，超過一個月沒更新就會亮紅燈。評鑑準備從臨時抱佛腳變成日常管理，再也不用等評鑑前才發現文件過期。" },
    { "@type": "Review", author: { "@type": "Person", "name": "吳護理長" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "護理品質指標月報設每月追蹤，感控報告設每週追蹤，一進追蹤頁面就看到哪些報告超時了。逾期紅色標示比任何提醒都有效。" },
    { "@type": "Review", author: { "@type": "Person", "name": "陳主任（住宿型）" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "四個職類的季度報告用每季追蹤，行政月報用每月追蹤。追蹤頁面集中管理，逾期的馬上看到，督導追蹤再也不怕遺漏。" },
  ],
});

const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "報告汪的用戶評價如何？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "報告汪目前收集了 29 則真實用戶評價，平均評分 4.9 顆星（滿分 5 顆星），涵蓋居家服務機構、日照中心、醫院、住宿型長照機構、身心障礙福利機構、產後護理之家、居家護理所、一般護理之家等 8 種機構類型。追蹤功能的逾期提醒廣受督導與主任好評。",
      },
    },
    {
      "@type": "Question",
      name: "哪些長照機構類型使用報告汪？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "報告汪目前支援 8 種機構類型：居家服務機構、日照中心（日間照顧中心）、醫院護理部、住宿型長照機構、身心障礙福利機構、產後護理之家、居家護理所、一般護理之家。各機構類型均有對應的評鑑範本可一鍵匯入。",
      },
    },
    {
      "@type": "Question",
      name: "報告汪適合哪些職類使用？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "報告汪適合長照與社福機構中各類需要定期產出文書的職類，包括：社工師、個管師、護理師、護理長、照顧服務員、督導、機構主任、負責人、物理治療師、助產師（護產人員）等。",
      },
    },
    {
      "@type": "Question",
      name: "報告汪如何幫助評鑑準備？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "報告汪提供三項評鑑備審功能：一、依評鑑基準建立標籤，讓每份文件對應正確的評鑑項目；二、AI 評鑑分析自動標示哪些基準文件不足，不需逐項手動比對；三、一鍵匯入各機構類型的評鑑範本，涵蓋 8 種機構類型，省去手動建立的時間。",
      },
    },
    {
      "@type": "Question",
      name: "報告汪目前收費嗎？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "報告汪目前處於測試階段，所有功能完全免費開放，包括無限報告數量、AI 段落修改、標籤分類、評鑑範本匯入等完整功能。正式版本的定價方案尚在規劃中。",
      },
    },
  ],
});

export default function TestimonialPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: appJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      <main className="min-h-screen flex flex-col">
        <Navbar />

        {/* Hero */}
        <section className="flex flex-col items-center text-center py-20 px-6 bg-gradient-to-b from-background to-muted/30">
          <Badge variant="outline" className="mb-5 px-4 py-1.5 text-sm">用戶評價</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
            29+ 位長照從業人員<br className="hidden md:block" />
            <span className="text-primary">真實推薦報告汪</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-10">
            居服機構、日照中心、醫院、護理之家、身障機構、產後護理之家、居家護理所——
            8 種機構類型、各種職類的真實使用心得。
          </p>
          <div className="grid grid-cols-3 gap-8 max-w-md">
            {[
              { value: "29+", label: "則用戶評價" },
              { value: "4.9", label: "平均評分（滿分 5）" },
              { value: "8", label: "種機構類型" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Anchor Nav */}
        <nav
          className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-y"
          aria-label="機構類型導覽"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="overflow-x-auto flex gap-2 py-3 whitespace-nowrap">
              {[
                { href: "#", label: "全部" },
                { href: "#home-care", label: "🏠 居服機構" },
                { href: "#day-care", label: "🏢 日照中心" },
                { href: "#hospital", label: "🏥 醫院" },
                { href: "#residential", label: "🏡 住宿型機構" },
                { href: "#disability", label: "♿ 身障機構" },
                { href: "#babycare", label: "👶 產後護理之家" },
                { href: "#home-nursing", label: "🩺 居家護理所" },
                { href: "#general-nursing-home", label: "🏥 一般護理之家" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border px-4 py-1.5 text-sm hover:bg-muted hover:border-primary/30 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* ─── 居服機構 ─── */}
        <section id="home-care" className="py-20 px-6 bg-muted/20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
              <h2 className="text-2xl font-bold">🏠 居服機構</h2>
              <Link href="/home-care" className="text-sm text-primary hover:underline">
                了解居服機構方案 →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 吳督導 — 精選 */}
              <Card className="border-primary/40 md:col-span-3">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 shrink-0">吳</div>
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
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 黃主任 */}
              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200 shrink-0">黃</div>
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
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 許居服員 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 shrink-0">許</div>
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
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 劉督導 — 追蹤功能 */}
              <Card className="md:col-span-3">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 shrink-0">劉</div>
                    <div>
                      <div className="text-sm font-medium">劉督導</div>
                      <div className="text-xs text-muted-foreground mt-0.5">台南市居家服務中心・督導</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    我管理 25 位居服員，每人每天都該繳日誌，以前要一個一個打電話催繳，光是確認哪些人沒交就佔掉我大半個上午。
                    <br /><br />
                    報告汪的<span className="text-foreground font-medium">追蹤功能</span>讓我幫每位居服員的日誌設定「<span className="text-foreground font-medium">每日追蹤</span>」，哪份日誌超過 24 小時沒更新就自動標為逾期。打開追蹤頁面，<span className="text-foreground font-medium">紅色標示的就是還沒繳的人</span>，一目了然，不用再逐一詢問，督導效率直接翻倍。評鑑委員問我怎麼做到日誌零漏繳，我說靠系統自動提醒，他說這才是現代化管理。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["追蹤功能", "逾期提醒", "居服員日誌管理", "督導追蹤效率"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ─── 日照中心 ─── */}
        <section id="day-care" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
              <h2 className="text-2xl font-bold">🏢 日照中心</h2>
              <Link href="/day-care" className="text-sm text-primary hover:underline">
                了解日照中心方案 →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 陳社工 — 精選 */}
              <Card className="border-primary/40 md:col-span-3">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 shrink-0">陳</div>
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
                    用了<span className="text-foreground font-medium">報告汪的標籤群組功能</span>，我把「個案服務計畫」、「活動紀錄」、「健康評估」各自建立標籤，每次更新文件就貼標籤，評鑑前點一下「評鑑備審」群組，所有要提交的文件全部跑出來。評鑑委員那天，<span className="text-foreground font-medium">我是中心裡最不緊張的人</span>。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["個案服務計畫", "評鑑備審管理", "日照社工文書", "日間照顧機構評鑑"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 林照服員 */}
              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200 shrink-0">林</div>
                    <div>
                      <div className="text-sm font-medium">林照服員</div>
                      <div className="text-xs text-muted-foreground mt-0.5">新北市日照中心・資深照服員</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    我每天要帶 10 幾位長輩做活動，活動結束後還要寫紀錄，以前常常不知道該怎麼描述，寫得又慢又不好看，督導還要一直退回來修改。
                    <br /><br />
                    現在用報告汪的 <span className="text-foreground font-medium">AI 輔助</span>，我只要把今天做了什麼活動、長輩反應怎樣輸入進去，系統就幫我整理成完整的活動紀錄格式，以前要花 20 分鐘，現在 <span className="text-foreground font-medium">8 分鐘就搞定</span>，督導說我的紀錄品質也比以前好很多。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["活動紀錄撰寫", "AI文書輔助", "日照照服員", "長輩活動記錄"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 張護理師 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 shrink-0">張</div>
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
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 周社工 — 追蹤功能 */}
              <Card className="md:col-span-3">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200 shrink-0">周</div>
                    <div>
                      <div className="text-sm font-medium">周社工</div>
                      <div className="text-xs text-muted-foreground mt-0.5">新竹市日照中心・社工師</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    日照中心的評鑑文件更新週期各不相同，有的每月、有的每季，以前全靠自己記，常常等到評鑑前才發現某份文件已經三個月沒更新了，臨時補件手忙腳亂。
                    <br /><br />
                    現在用報告汪的<span className="text-foreground font-medium">追蹤功能</span>，評鑑文件設「<span className="text-foreground font-medium">每月追蹤</span>」，活動紀錄設「<span className="text-foreground font-medium">每週追蹤</span>」，超過時限沒更新就自動亮紅燈。以前評鑑準備是一年一次的焦慮衝刺，現在變成<span className="text-foreground font-medium">每天的日常管理</span>，完全不怕評鑑委員突然來查。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["追蹤功能", "評鑑備審日常管理", "逾期提醒", "日照中心評鑑"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ─── 醫院 ─── */}
        <section id="hospital" className="py-20 px-6 bg-muted/20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
              <h2 className="text-2xl font-bold">🏥 醫院</h2>
              <Link href="/hospital" className="text-sm text-primary hover:underline">
                了解醫院方案 →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 蔡護理長 — 精選 */}
              <Card className="border-primary/40 md:col-span-3">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 shrink-0">蔡</div>
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
                    導入報告汪後，我們把文件依<span className="text-foreground font-medium">班別標籤</span>（白班、小夜、大夜）和<span className="text-foreground font-medium">頻率標籤</span>（每班必做、每日一次、每週）做雙重分類，護理師交接完就能拖曳調整當班的執行順序。護理部主任說這是她看過<span className="text-foreground font-medium">最有條理的護理文書管理系統</span>，已經推薦給其他病房。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["護理文書管理", "交班紀錄系統", "病房報告管理", "護理部行政效率"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 羅護理師 */}
              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 shrink-0">羅</div>
                    <div>
                      <div className="text-sm font-medium">羅護理師</div>
                      <div className="text-xs text-muted-foreground mt-0.5">台南市立醫院・加護病房資深護理師</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    加護病房的文書壓力特別大，感控報表、儀器維護紀錄、病人生命徵象追蹤……每樣都急。過去同事各自建資料夾，找文件要問一圈。
                    <br /><br />
                    現在用分類標籤把「感控必備」、「設備維護」、「個案追蹤」分開，每份報告不必搬到三個地方，<span className="text-foreground font-medium">同一份文件貼多個標籤就好</span>。交接班只要篩當下標籤，<span className="text-foreground font-medium">30 秒內就能確認所有文件狀態</span>，大幅減少 ICU 的文書焦慮。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["加護病房文書", "感染管制報表", "ICU護理紀錄", "多標籤文件分類"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 鄭副護理長 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 shrink-0">鄭</div>
                    <div>
                      <div className="text-sm font-medium">鄭副護理長</div>
                      <div className="text-xs text-muted-foreground mt-0.5">桃園某醫學中心・外科病房副護理長</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★☆</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    評鑑年最麻煩的就是把散落各處的護理品質指標報告集中起來。以前要花將近兩週重新整理，還怕漏項目。
                    <br /><br />
                    今年我們提前三個月就用報告汪建好「評鑑備審」標籤，每次產出的文件直接貼上去，到了評鑑前夕只需要篩一個標籤就全部到位。評審委員直接說<span className="text-foreground font-medium">「這間病房的文件是整個醫院最整齊的」</span>。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["醫院評鑑準備", "護理品質指標", "病房文件整理", "評鑑文件管理系統"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 吳護理長 — 追蹤功能 */}
              <Card className="md:col-span-3">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 shrink-0">吳</div>
                    <div>
                      <div className="text-sm font-medium">吳護理長</div>
                      <div className="text-xs text-muted-foreground mt-0.5">台北某醫學中心・內科加護病房護理長</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    加護病房每月要彙整護理品質指標，感控報告每週要更新，以前全靠個人筆記追蹤，常常漏掉一份才在截止前一天發現。
                    <br /><br />
                    現在用報告汪的<span className="text-foreground font-medium">追蹤功能</span>，品質指標月報設「<span className="text-foreground font-medium">每月追蹤</span>」，感控報告設「<span className="text-foreground font-medium">每週追蹤</span>」，超過時限系統自動標為逾期。一進追蹤頁面就看到哪些報告超時了，<span className="text-foreground font-medium">比任何提醒工具都有效</span>，護理師再也不需要記哪份報告什麼時候到期，全交給系統管。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["追蹤功能", "品質指標管理", "感控報告追蹤", "逾期提醒"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ─── 住宿型機構 ─── */}
        <section id="residential" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
              <h2 className="text-2xl font-bold">🏡 住宿型長照機構</h2>
              <Link href="/residential" className="text-sm text-primary hover:underline">
                了解住宿型機構方案 →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 方護理長 — 精選 */}
              <Card className="border-primary/40 md:col-span-3">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 shrink-0">方</div>
                      <div>
                        <div className="text-sm font-medium">方護理長</div>
                        <div className="text-xs text-muted-foreground mt-0.5">台北市私立住宿型長照機構・護理長</div>
                      </div>
                    </div>
                    <Badge variant="secondary">精選評價</Badge>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    住宿型長照機構最特別的地方是「住民 24 小時都在」，報告種類比日照複雜許多——從每日的服藥紀錄、TOCC 體溫量測、壓瘡評估，到每週的生命徵象追蹤、每月的個案照護計畫更新，文件量龐大到讓新進護理師不知從何下手。
                    <br /><br />
                    用了報告汪之後，我們依撰寫頻率設<span className="text-foreground font-medium">三層標籤</span>：「每班執行」、「每日一次」、「每週」，每位護理師交班後打開系統，拖曳排序當班任務，不會再遺漏壓瘡翻身記錄或夜班的血壓量測。評鑑委員說我們是他今年巡訪中<span className="text-foreground font-medium">文書最完整的住宿型長照機構</span>。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["住宿型長照機構文書管理", "壓瘡評估記錄", "住民照護計畫", "住宿型長照機構評鑑準備"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 廖主任 */}
              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 shrink-0">廖</div>
                    <div>
                      <div className="text-sm font-medium">廖主任</div>
                      <div className="text-xs text-muted-foreground mt-0.5">新北市住宿型長照機構・機構主任</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    我們機構有 60 床，護理師、照服員、社工、營養師都要產出自己的報告，過去全部丟在共用硬碟，常常找不到最新版本，交接班時互相覆蓋檔案是家常便飯。
                    <br /><br />
                    報告汪讓我們依撰寫者職類分標籤——護理師的報告歸護理師，社工的個案紀錄歸社工，營養師的飲食評估單獨一區。主任要做月報時，<span className="text-foreground font-medium">跨標籤彙整一次到位</span>，不用再逐一收集。光是每月行政會議紀錄和追蹤表，我的行政時間就少了<span className="text-foreground font-medium">將近三分之一</span>。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["跨職類文件整合", "照服員工作紀錄", "月報彙整", "住宿型長照機構行政管理"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 游社工師 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 shrink-0">游</div>
                    <div>
                      <div className="text-sm font-medium">游社工師</div>
                      <div className="text-xs text-muted-foreground mt-0.5">桃園市住宿型長照機構・專職社工師</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    住宿型長照機構的社工要同時處理個案入住評估、家屬溝通紀錄、節慶團體活動（含照片）和申訴案件統計，每種文件格式和送審週期都不同。
                    <br /><br />
                    現在用分類標籤把文件依性質分開，<span className="text-foreground font-medium">同一份「入住評估表」可以同時掛兩個標籤</span>，不用放兩份。遇到申訴案件，報告汪的 AI 輔助幫我把事件描述整理成符合主管機關格式的通報文字，讓我有更多時間陪伴住民家屬。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["社工個案紀錄", "入住評估文件", "申訴案件通報", "AI報告輔助生成"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 盧照服員 */}
              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 shrink-0">盧</div>
                    <div>
                      <div className="text-sm font-medium">盧照服員</div>
                      <div className="text-xs text-muted-foreground mt-0.5">台中市住宿型長照機構・資深照服員</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★☆</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    我在住宿型長照機構做了八年，一直覺得「寫報告」是最麻煩的事——尤其是夜班，住民狀況多，還要趕著把觀察紀錄寫完格式。以前常常寫到凌晨，交班前才匆匆完成。
                    <br /><br />
                    用了報告汪的手機版之後，巡房時直接用<span className="text-foreground font-medium">語音輸入</span>觀察，AI 自動整理成照護紀錄格式，我只要確認一遍就好。夜班的文書時間從以前的 40 分鐘縮短到<span className="text-foreground font-medium">不到 15 分鐘</span>，體力省下來，可以更專注在住民身上。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["照服員工作日誌", "夜班照護紀錄", "語音轉文字報告", "行動端長照紀錄"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 陳主任 — 追蹤功能 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200 shrink-0">陳</div>
                    <div>
                      <div className="text-sm font-medium">陳主任</div>
                      <div className="text-xs text-muted-foreground mt-0.5">新北市住宿型長照機構・機構主任</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    我們有護理、社工、照服、營養四個職類，各自的季度報告繳交期限不一樣，以前每到繳件時間才發現有人忘了，主任每次都要臨時催繳搞得大家都很緊張。
                    <br /><br />
                    現在用<span className="text-foreground font-medium">追蹤功能</span>，季度報告設「<span className="text-foreground font-medium">每季追蹤</span>」，月報設「每月追蹤」，<span className="text-foreground font-medium">逾期直接紅燈</span>，沒有人能說不知道。督導追蹤再也不怕遺漏。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["追蹤功能", "多職類定期報告", "逾期紅燈提醒", "機構主任管理"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ─── 身障機構 ─── */}
        <section id="disability" className="py-20 px-6 bg-muted/20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
              <h2 className="text-2xl font-bold">♿ 身心障礙福利機構</h2>
              <Link href="/disability" className="text-sm text-primary hover:underline">
                了解身障機構方案 →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 張社工師 — 精選 */}
              <Card className="border-primary/40 md:col-span-3">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 shrink-0">張</div>
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
                    用了報告汪之後，我幫每位個案建立<span className="text-foreground font-medium">專屬標籤</span>，ISP 計畫、半年評值、跨專業研討紀錄都集中在同一個地方。評鑑前最讓我感謝的是<span className="text-foreground font-medium">AI 自我檢核分析</span>——上傳報告後直接告訴我哪些自我檢核項目文件不足，不用再一項一項手動比對，評鑑準備時間少了將近一半。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["身心障礙 ISP 管理", "自我檢核評鑑準備", "個別化支持計畫", "身心障礙機構文書"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 林主任 */}
              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 shrink-0">林</div>
                    <div>
                      <div className="text-sm font-medium">林主任</div>
                      <div className="text-xs text-muted-foreground mt-0.5">台中市私立身心障礙福利機構・機構主任</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    我們機構有社工師、照顧服務員、物理治療師三種職類，過去文件全部混在一個共用資料夾，每次評鑑前找文件都是一場噩夢，甚至有一次被評鑑委員問到「ISP 執行紀錄在哪」，我翻了二十分鐘才找到。
                    <br /><br />
                    現在用報告汪的<span className="text-foreground font-medium">標籤依職類分區管理</span>，加上「評鑑備審」總標籤，每類文件都在對應位置。上次評鑑委員問問題，<span className="text-foreground font-medium">我三秒內就把文件找出來</span>，委員說是他今年巡訪中資料管理最清楚的機構。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["身心障礙機構評鑑", "跨職類文件管理", "評鑑備審文件", "機構行政管理"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 陳照服員 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200 shrink-0">陳</div>
                    <div>
                      <div className="text-sm font-medium">陳照服員</div>
                      <div className="text-xs text-muted-foreground mt-0.5">桃園市身心障礙福利機構・照顧服務員</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    照顧服務員要寫的紀錄其實很多——照顧日誌、情緒行為記錄、活動參與紀錄，以前全部手寫再輸入電腦，下班後還要多花半小時整理文件。
                    <br /><br />
                    用了報告汪的 <span className="text-foreground font-medium">AI 輔助</span>之後，我把當天照顧觀察大概說一遍，AI 自動整理成正式格式，只需確認一遍，每天文書時間<span className="text-foreground font-medium">省下超過半小時</span>。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["照顧日誌記錄", "情緒行為紀錄", "AI輔助文書", "身心障礙照顧"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ─── 產後護理之家 ─── */}
        <section id="babycare" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
              <h2 className="text-2xl font-bold">👶 產後護理之家</h2>
              <Link href="/babycare" className="text-sm text-primary hover:underline">
                了解產後護理之家方案 →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 王護理師 — 精選 */}
              <Card className="border-primary/40 md:col-span-3">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 shrink-0">王</div>
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
                    用了報告汪之後，我依<span className="text-foreground font-medium">B 區 8 項基準各建一個標籤</span>，每天護理紀錄寫完直接貼標，評鑑前 AI 評鑑分析直接告訴我哪個 B 項符合文件不足，不用再逐項手動比對，<span className="text-foreground font-medium">評鑑準備時間省了將近一半</span>。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["產後護理評鑑", "母嬰照護紀錄", "月子中心文書", "護理之家評鑑準備"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 陳負責人 */}
              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200 shrink-0">陳</div>
                    <div>
                      <div className="text-sm font-medium">陳負責人</div>
                      <div className="text-xs text-muted-foreground mt-0.5">新北市產後護理之家・機構負責人</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    我們有護產人員和嬰兒照顧人員兩個職類，以前評鑑前最怕的就是 A 區行政文件不齊——感染管制計畫、品質管理會議記錄、消防演練記錄，每次都要臨時補件，壓力很大。
                    <br /><br />
                    用了報告汪的<span className="text-foreground font-medium">標籤依評鑑構面分區</span>後，A 區、B 區、C 區各有對應標籤，平時文件寫完直接貼上，評鑑前 AI 一次告訴我哪個構面缺件，<span className="text-foreground font-medium">再也不用臨時補件了</span>。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["產後護理之家評鑑", "行政管理文件", "感染管制記錄", "月子中心品質管理"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 林護產人員 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 shrink-0">林</div>
                    <div>
                      <div className="text-sm font-medium">林護產人員</div>
                      <div className="text-xs text-muted-foreground mt-0.5">桃園市產後護理之家・助產師</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    B1.7 品質指標是我以前最頭痛的——紅臀率、乳腺炎率、純母乳率，每月要手動統計再做成報表，光整理就要花半天。
                    <br /><br />
                    現在用報告汪建立<span className="text-foreground font-medium">品質指標標籤</span>，每月統計上傳後 AI 自動分析趨勢，評鑑前每個指標都有完整監測記錄，委員問起來立刻就能找到。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["品質指標監測", "母乳哺育率", "嬰兒紅臀管理", "產後護理文書"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ─── 居家護理所 ─── */}
        <section id="home-nursing" className="py-20 px-6 bg-muted/20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
              <h2 className="text-2xl font-bold">🩺 居家護理所</h2>
              <Link href="/home-nursing" className="text-sm text-primary hover:underline">
                了解居家護理所方案 →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 張護理師 — 精選 */}
              <Card className="border-primary/40 md:col-span-3">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 shrink-0">張</div>
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
                    用了報告汪之後，我<span className="text-foreground font-medium">依個案建立標籤</span>，每次訪視記錄寫完直接貼標，評鑑前 AI 評鑑分析直接告訴我哪位個案的照護計畫文件不完整，不用再逐項手動比對，<span className="text-foreground font-medium">準備時間省了將近一半</span>。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["居家護理評鑑", "個案照護計畫", "居家護理文書", "護理所評鑑準備"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 李負責人 */}
              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200 shrink-0">李</div>
                    <div>
                      <div className="text-sm font-medium">李負責人</div>
                      <div className="text-xs text-muted-foreground mt-0.5">台北市居家護理所・機構負責人</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    我們評鑑前最怕 A 區經營管理文件不齊——感染管制手冊、訪視人員安全辦法、緊急事件處理辦法、經營指標分析報告，每次都要臨時補件，壓力很大。
                    <br /><br />
                    用了報告汪的<span className="text-foreground font-medium">標籤依評鑑構面分區</span>後，A 區、B 區各有對應標籤，平時文件寫完直接貼上，評鑑前 AI 一次告訴我哪個構面缺件，<span className="text-foreground font-medium">再也不用臨時補件了</span>。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["居家護理所評鑑", "感染管制文件", "經營指標追蹤", "居家護理行政管理"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 陳訪視人員 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 shrink-0">陳</div>
                    <div>
                      <div className="text-sm font-medium">陳訪視人員</div>
                      <div className="text-xs text-muted-foreground mt-0.5">桃園市居家護理所・護理師</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    A3 訪視人員安全管理是我以前最頭痛的——車禍、人身安全、動物咬傷的緊急通報記錄和改善追蹤，每次評鑑要翻出來對照，光找資料就要花很多時間。
                    <br /><br />
                    現在用報告汪建立<span className="text-foreground font-medium">安全管理標籤</span>，事件記錄上傳後 AI 自動分析改善追蹤是否完整，評鑑前每個安全事件都有完整記錄，委員問起來立刻就能找到。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["訪視安全管理", "居家護理文書", "緊急事件記錄"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ─── 一般護理之家 ─── */}
        <section id="general-nursing-home" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
              <h2 className="text-2xl font-bold">🏥 一般護理之家</h2>
              <Link href="/general-nursing-home" className="text-sm text-primary hover:underline">
                了解一般護理之家方案 →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 林護理長 — 精選 */}
              <Card className="border-primary/40 md:col-span-3">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 shrink-0">林</div>
                      <div>
                        <div className="text-sm font-medium">林護理長</div>
                        <div className="text-xs text-muted-foreground mt-0.5">台中市一般護理之家・護理長</div>
                      </div>
                    </div>
                    <Badge variant="secondary">精選評價</Badge>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    一般護理之家最難準備的就是「住民照護計畫太分散」——收住評估、全人評估、個別化照護計畫各放各的，評鑑委員要看 A2.1 服務對象管理，我要從三個地方找資料，每次評鑑前都很崩潰。
                    <br /><br />
                    用了報告汪之後，我<span className="text-foreground font-medium">依住民建立標籤</span>，照護計畫寫完直接貼標，評鑑前 AI 評鑑分析直接告訴我哪位住民的照護計畫每 6 個月評估紀錄缺失，不用再逐項手動比對，<span className="text-foreground font-medium">準備時間省了超過一半</span>。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["護理之家評鑑", "住民照護計畫", "護理之家文書", "一般護理之家評鑑準備"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 黃負責人 */}
              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200 shrink-0">黃</div>
                    <div>
                      <div className="text-sm font-medium">黃負責人</div>
                      <div className="text-xs text-muted-foreground mt-0.5">新北市一般護理之家・機構負責人</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    我們評鑑前最怕 C 區環境設施文件不齊——消防演練紀錄、感染管制手冊、災害應變計畫、疫苗接種記錄，每次都要臨時補件，一到評鑑月份全機構都在趕文件。
                    <br /><br />
                    用了報告汪的<span className="text-foreground font-medium">標籤依評鑑構面分區</span>後，C 區四個基準（C1～C4）各有對應標籤，平時文件寫完直接貼上，評鑑前 AI 一次告訴我哪個構面缺件，<span className="text-foreground font-medium">再也不用臨時補件了</span>。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["護理之家評鑑", "感染管制文件", "消防安全管理", "災害應變管理"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 陳照服員 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 shrink-0">陳</div>
                    <div>
                      <div className="text-sm font-medium">陳照服員</div>
                      <div className="text-xs text-muted-foreground mt-0.5">桃園市一般護理之家・照顧服務員</div>
                    </div>
                  </div>
                  <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    B2 生活照顧紀錄是我以前最頭痛的——沐浴、飲食、活動、夜間巡房記錄分散在好幾個表格，評鑑要對照護計畫，光找資料就要花很多時間。
                    <br /><br />
                    現在用報告汪建立<span className="text-foreground font-medium">住民照顧標籤</span>，日常紀錄上傳後 AI 自動對應 B2 基準符合項目，評鑑前每位住民的生活照顧紀錄都完整，委員查起來立刻就能找到。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["生活照顧紀錄", "護理之家文書", "照服員日誌"].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Summary Stats */}
        <section className="py-20 px-6 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-primary-foreground/20 text-primary-foreground border-0">
              匯總數據
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">長照從業人員普遍推薦報告汪</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "25+", label: "則真實用戶評價" },
                { value: "4.9", label: "顆星平均評分" },
                { value: "8", label: "種機構類型覆蓋" },
                { value: "15+", label: "種職類使用者" },
              ].map((s) => (
                <div key={s.label} className="bg-primary-foreground/10 rounded-xl py-6 px-4">
                  <div className="text-4xl font-extrabold mb-1">{s.value}</div>
                  <div className="text-sm opacity-80">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-sm opacity-70 max-w-2xl mx-auto">
              涵蓋居家服務機構・日照中心・醫院護理部・住宿型長照機構・身心障礙福利機構・
              產後護理之家・居家護理所・一般護理之家，社工師・護理師・照服員・督導・主任等職類。
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 bg-muted/20" aria-label="常見問題">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">常見問題</h2>
            <div className="space-y-4">
              {[
                {
                  q: "報告汪的用戶評價如何？",
                  a: "報告汪目前收集了 25 則真實用戶評價，平均評分 4.9 顆星（滿分 5 顆星），涵蓋居家服務機構、日照中心、醫院、住宿型長照機構、身心障礙福利機構、產後護理之家、居家護理所、一般護理之家等 8 種機構類型。",
                },
                {
                  q: "哪些長照機構類型使用報告汪？",
                  a: "報告汪目前支援 8 種機構類型：居家服務機構、日照中心（日間照顧中心）、醫院護理部、住宿型長照機構、身心障礙福利機構、產後護理之家、居家護理所、一般護理之家。各機構類型均有對應的評鑑範本可一鍵匯入。",
                },
                {
                  q: "報告汪適合哪些職類使用？",
                  a: "報告汪適合長照與社福機構中各類需要定期產出文書的職類，包括：社工師、個管師、護理師、護理長、照顧服務員、督導、機構主任、負責人、物理治療師、助產師（護產人員）等。",
                },
                {
                  q: "報告汪如何幫助評鑑準備？",
                  a: "報告汪提供三項評鑑備審功能：一、依評鑑基準建立標籤，讓每份文件對應正確的評鑑項目；二、AI 評鑑分析自動標示哪些基準文件不足，不需逐項手動比對；三、一鍵匯入各機構類型的評鑑範本，涵蓋 8 種機構類型，省去手動建立的時間。",
                },
                {
                  q: "報告汪目前收費嗎？",
                  a: "報告汪目前處於測試階段，所有功能完全免費開放，包括無限報告數量、AI 段落修改、標籤分類、評鑑範本匯入等完整功能。正式版本的定價方案尚在規劃中。",
                },
              ].map((item) => (
                <details key={item.q} className="group border rounded-lg bg-background">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium">
                    {item.q}
                    <ChevronDownIcon className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform shrink-0" />
                  </summary>
                  <div className="px-5 pb-4 text-muted-foreground text-sm border-t pt-3 mt-1">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">準備好加入他們了嗎？</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            免費開始使用報告汪，加入 25+ 位長照從業人員的行列。
          </p>
          <StartButton>免費開始使用</StartButton>
        </section>

        <Footer />
      </main>
    </>
  );
}
