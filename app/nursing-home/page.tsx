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
  ClipboardListIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "護理之家 AI 文書管理系統｜護理師・照服員・社工・營養師多職種協作平台",
  description:
    "報告汪專為護理之家設計：護理師、照服員、社工師、營養師在同一平台協作，依職類標籤分區管理、AI 輔助照護紀錄，24 小時住民照護文件不遺漏。評鑑備審文件自動彙整，多職種分工清晰，提升整體照護品質。立即免費試用。",
  alternates: { canonical: "/nursing-home" },
  openGraph: {
    title: "護理之家 AI 文書管理系統｜護理師・照服員・社工・營養師多職種協作平台",
    description:
      "報告汪專為護理之家設計：護理師、照服員、社工師、營養師在同一平台協作，依職類標籤分區管理、AI 輔助照護紀錄，24 小時住民照護文件不遺漏。評鑑備審文件自動彙整，多職種分工清晰，提升整體照護品質。立即免費試用。",
  },
  twitter: {
    title: "護理之家 AI 文書管理系統｜護理師・照服員・社工・營養師多職種協作平台",
    description:
      "報告汪專為護理之家設計：護理師、照服員、社工師、營養師在同一平台協作，依職類標籤分區管理、AI 輔助照護紀錄，24 小時住民照護文件不遺漏。評鑑備審文件自動彙整，多職種分工清晰，提升整體照護品質。立即免費試用。",
  },
};

export default function NursingHomePage() {
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
                name: "報告汪適合護理之家哪些職類使用？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "護理師、照服員、社工師、營養師都適用。各職類在同一平台各自的標籤分區撰寫文件，互不干擾；機構主任則可跨標籤彙整月報，一次掌握所有職類文件。",
                },
              },
              {
                "@type": "Question",
                name: "多職種的文件如何在同一平台不互相干擾？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "依撰寫者職類建立獨立標籤（例如：護理師報告、照服員日誌、社工紀錄、營養評估），各職類文件自動歸入對應標籤。主任需要彙整時，透過跨標籤篩選一次取得所有職類的最新文件，不再需要逐一收集。",
                },
              },
              {
                "@type": "Question",
                name: "護理之家的評鑑文書如何準備？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "提前建立「評鑑備審」標籤，並依撰寫頻率設定「每班執行」、「每日一次」、「每週」三層標籤。日常文書直接貼上對應標籤，評鑑前篩選「評鑑備審」即可全數到位，不再漏件。",
                },
              },
              {
                "@type": "Question",
                name: "照服員夜班如何用手機快速完成紀錄？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "使用報告汪手機版，巡房時以語音輸入照護觀察，AI 自動整理成符合機構格式的照護紀錄，照服員只需確認後提交即可。實測夜班文書時間可從 40 分鐘縮短至不到 15 分鐘。",
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
          護理之家專用
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
          護理之家文書管理系統｜<span className="text-primary">多職種同平台協作</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          住民 24 小時都在、報告種類繁多——護理師、照服員、社工、營養師同一平台協作，
          標籤分職類管理、文書不互擾，評鑑文件不再遺漏。
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
            { value: "↓ 63%", label: "夜班文書時間" },
            { value: "4 職類", label: "同平台協作管理" },
            { value: "零遺漏", label: "評鑑文件到位率" },
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">護理之家文書管理這樣做：依職類標籤分區，24小時住民照護不遺漏</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              從多職類標籤分區到跨職類月報，從住民照護計畫追蹤到 AI 輔助紀錄，每個功能都以護理之家工作流程為中心。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <UsersIcon className="h-6 w-6" />,
                title: "多職類標籤分區",
                desc: "護理師、照服員、社工、營養師各自的標籤分區，文件自動歸位，互不干擾，任一職類都能快速找到自己的文件。",
              },
              {
                icon: <TagIcon className="h-6 w-6" />,
                title: "跨職類月報一鍵彙整",
                desc: "主任跨標籤彙整各職類文件，行政月報一次到位。廖主任實測每月行政時間減少三分之一。",
              },
              {
                icon: <ClipboardListIcon className="h-6 w-6" />,
                title: "住民照護計畫追蹤",
                desc: "服藥紀錄、TOCC 量測、壓瘡評估依頻率標籤分層（每班／每日／每週），任務不遺漏，評鑑委員也說文書最完整。",
              },
              {
                icon: <SmartphoneIcon className="h-6 w-6" />,
                title: "AI 輔助照護紀錄撰寫",
                desc: "照服員巡房時語音輸入觀察，AI 自動整理成符合格式的照護紀錄，夜班文書時間從 40 分鐘縮短到不到 15 分鐘。",
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
              護理之家
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* 方護理長 — 精選，全寬 */}
            <Card className="border-primary/40 md:col-span-3">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-blue-100 text-blue-800 shrink-0">
                      方
                    </div>
                    <div>
                      <div className="text-sm font-medium">方護理長</div>
                      <div className="text-xs text-muted-foreground mt-0.5">台北市私立護理之家・護理長</div>
                    </div>
                  </div>
                  <Badge variant="secondary">精選評價</Badge>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  護理之家最特別的地方是「住民 24 小時都在」，報告種類比日照複雜許多——從每日的服藥紀錄、TOCC 體溫量測、壓瘡評估，到每週的生命徵象追蹤、每月的個案照護計畫更新，文件量龐大到讓新進護理師不知從何下手。
                  <br /><br />
                  用了<span className="text-foreground font-medium">報告汪</span>之後，我們依<span className="text-foreground font-medium">撰寫頻率</span>設三層標籤：「每班執行」、「每日一次」、「每週」，每位護理師交班後打開系統，<span className="text-foreground font-medium">拖曳排序</span>當班任務，不會再遺漏壓瘡翻身記錄或夜班的血壓量測。評鑑委員說我們是他今年巡訪中<span className="text-foreground font-medium">文書最完整</span>的護理之家。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["護理之家文書管理", "壓瘡評估記錄", "住民照護計畫", "護理之家評鑑準備"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 廖主任 — 2 欄 */}
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-teal-100 text-teal-800 shrink-0">
                    廖
                  </div>
                  <div>
                    <div className="text-sm font-medium">廖主任</div>
                    <div className="text-xs text-muted-foreground mt-0.5">新北市護理之家・機構主任</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  我們機構有 60 床，護理師、照服員、社工、營養師都要產出自己的報告，過去全部丟在共用硬碟，常常找不到最新版本，交接班時互相覆蓋檔案是家常便飯。
                  <br /><br />
                  <span className="text-foreground font-medium">報告汪</span>讓我們依<span className="text-foreground font-medium">撰寫者職類</span>分標籤——護理師的報告歸護理師，社工的個案紀錄歸社工，營養師的飲食評估單獨一區。主任要做月報時，<span className="text-foreground font-medium">跨標籤彙整</span>一次到位，不用再逐一收集。光是每月行政會議紀錄和追蹤表，我的行政時間就少了將近<span className="text-foreground font-medium">三分之一</span>。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["跨職類文件整合", "照服員工作紀錄", "月報彙整", "護理之家行政管理"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 游社工師 — 1 欄 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-purple-100 text-purple-800 shrink-0">
                    游
                  </div>
                  <div>
                    <div className="text-sm font-medium">游社工師</div>
                    <div className="text-xs text-muted-foreground mt-0.5">桃園市護理之家・專職社工師</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  護理之家的社工要同時處理個案入住評估、家屬溝通紀錄、節慶團體活動（含照片）和申訴案件統計，每種文件格式和送審週期都不同，以前光是管這些就快搞混。
                  <br /><br />
                  現在用<span className="text-foreground font-medium">分類標籤</span>把文件依性質分開，同一份「入住評估表」可以同時掛「入住流程」和「社工紀錄」兩個標籤，不用放兩份。遇到申訴案件，<span className="text-foreground font-medium">報告汪的 AI 輔助</span>幫我把事件描述整理成符合主管機關格式的通報文字，讓我有更多時間陪伴住民家屬。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["社工個案紀錄", "入住評估文件", "申訴案件通報", "AI報告輔助生成"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 盧照服員 — 全寬（第二列） */}
            <Card className="md:col-span-3">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-amber-100 text-amber-800 shrink-0">
                    盧
                  </div>
                  <div>
                    <div className="text-sm font-medium">盧照服員</div>
                    <div className="text-xs text-muted-foreground mt-0.5">台中市護理之家・資深照服員</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★☆</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  我在護理之家做了八年，一直覺得「寫報告」是最麻煩的事——尤其是夜班，住民狀況多，還要趕著把觀察紀錄寫完格式。以前常常寫到凌晨，交班前才匆匆完成。
                  <br /><br />
                  用了<span className="text-foreground font-medium">報告汪</span>的手機版之後，巡房時直接用語音輸入觀察，<span className="text-foreground font-medium">AI 自動整理</span>成照護紀錄格式，我只要確認一遍就好。夜班的文書時間從以前的 40 分鐘縮短到不到 15 分鐘，體力省下來，可以更專注在住民身上。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["照服員工作日誌", "夜班照護紀錄", "語音轉文字報告", "行動端長照紀錄"].map((tag) => (
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
              { value: "↓ 63%", label: "夜班文書時間" },
              { value: "零遺漏", label: "評鑑文件到位率" },
              { value: "↓ 1/3", label: "主任月報行政時間" },
              { value: "4 職類", label: "同平台協作管理" },
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
                q: "報告汪適合護理之家哪些職類使用？",
                a: "護理師、照服員、社工師、營養師都適用。各職類在同一平台各自的標籤分區撰寫文件，互不干擾；機構主任則可跨標籤彙整月報，一次掌握所有職類文件。",
              },
              {
                q: "多職種的文件如何在同一平台不互相干擾？",
                a: "依撰寫者職類建立獨立標籤（例如：護理師報告、照服員日誌、社工紀錄、營養評估），各職類文件自動歸入對應標籤。主任需要彙整時，透過跨標籤篩選一次取得所有職類的最新文件，不再需要逐一收集。",
              },
              {
                q: "護理之家的評鑑文書如何準備？",
                a: "提前建立「評鑑備審」標籤，並依撰寫頻率設定「每班執行」、「每日一次」、「每週」三層標籤。日常文書直接貼上對應標籤，評鑑前篩選「評鑑備審」即可全數到位，不再漏件。",
              },
              {
                q: "照服員夜班如何用手機快速完成紀錄？",
                a: "使用報告汪手機版，巡房時以語音輸入照護觀察，AI 自動整理成符合機構格式的照護紀錄，照服員只需確認後提交即可。實測夜班文書時間可從 40 分鐘縮短至不到 15 分鐘。",
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
              {
                href: "/babycare",
                title: "產後護理之家 AI 文書管理系統介紹",
                emoji: "👶",
                label: "產後護理之家",
                stat: "15 項",
                statLabel: "評鑑基準覆蓋",
                desc: "母嬰照護紀錄集中管理，AI 分析直接標示缺漏，評鑑準備效率大幅提升。",
                cta: "產後護理之家文書管理系統 →",
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
          準備好讓護理之家文書走向多職種協同管理了嗎？
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          加入報告汪，夜班文書時間減少 63%，評鑑文件零遺漏，四職類同平台協作。
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
          <Link href="/auth/sign-up" title="免費試用報告汪護理之家方案" className="hover:text-primary transition-colors">註冊</Link>
        </div>
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
