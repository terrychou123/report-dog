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
  ChevronDownIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BrainCircuitIcon,
  UsersIcon,
  ClipboardListIcon,
  TagIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "精神護理之家 AI 文書管理系統｜115年度評鑑備審・住民照護計畫・跨專業照護管理平台",
  description:
    "報告汪專為精神護理之家設計：115年度評鑑基準 A 經營管理（9條）、B 專業照護（21條）、C 安全設施（3條）、D 住民權益（2條）、E 創新改革（1條）共 36 條 AI 逐項分析，住民服務計畫集中管理，護理師、職能治療師與負責人同平台協作。精神護理之家文書管理首選。立即免費試用。",
  alternates: { canonical: "/psychiatric" },
  openGraph: {
    title: "精神護理之家 AI 文書管理系統｜115年度評鑑備審・住民照護計畫・跨專業照護管理平台",
    description:
      "報告汪專為精神護理之家設計：115年度評鑑基準 A 經營管理（9條）、B 專業照護（21條）、C 安全設施（3條）、D 住民權益（2條）、E 創新改革（1條）共 36 條 AI 逐項分析，住民服務計畫集中管理，護理師、職能治療師與負責人同平台協作。精神護理之家文書管理首選。立即免費試用。",
  },
  twitter: {
    title: "精神護理之家 AI 文書管理系統｜115年度評鑑備審・住民照護計畫・跨專業照護管理平台",
    description:
      "報告汪專為精神護理之家設計：115年度評鑑基準 A 經營管理（9條）、B 專業照護（21條）、C 安全設施（3條）、D 住民權益（2條）、E 創新改革（1條）共 36 條 AI 逐項分析，住民服務計畫集中管理，護理師、職能治療師與負責人同平台協作。精神護理之家文書管理首選。立即免費試用。",
  },
  keywords: [
    "精神護理之家評鑑",
    "精神護理機構評鑑報告",
    "115年度評鑑",
    "精神衛生法",
    "護理之家評鑑系統",
    "評鑑報告管理",
    "AI評鑑報告",
    "精神障礙者照護",
  ],
};

export default function PsychiatricPage() {
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
                name: "報告汪如何協助精神護理之家的評鑑準備？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "報告汪內建「115年度精神護理之家評鑑基準」評鑑 profile，上傳機構文件後，AI 自動對應 A 經營管理效能（9條）、B 專業照護品質（21條）、C 安全維護及設施設備（3條）、D 住民權益保障（2條）、E 創新及改革（1條）共 36 條指標，逐項標示哪些符合項目文件不足，讓評鑑準備不再是逐項手動比對的苦工。",
                },
              },
              {
                "@type": "Question",
                name: "精神護理之家的住民服務計畫（B1）如何用報告汪管理？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "依 B1 住民服務計畫基準建立住民標籤，入院評估、個別化照護計畫、每月評值紀錄依住民分類管理。評鑑前 AI 分析直接標示哪位住民的服務計畫文件不完整、6 項照護品質監測指標是否有每月蒐集記錄，一目了然。",
                },
              },
              {
                "@type": "Question",
                name: "護理師、職能治療師與機構負責人如何在同一平台分工協作？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "依職類建立獨立標籤：護理師負責 B1 住民服務計畫、B1.7 品質監測文件；職能治療師負責 B1.15 復健作業治療紀錄；臨床心理師負責相關心理評估記錄；行政負責 A 區行政管理文件；負責人負責 C 區安全設施及 D 區住民權益。各職類在各自標籤區撰寫文件，評鑑備審時跨標籤篩選一次取得所有最新文件。",
                },
              },
              {
                "@type": "Question",
                name: "B1.7 品質監測 6 項指標如何用報告汪追蹤？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "建立「品質監測 B1.7」標籤，依跌倒、壓力性損傷、約束使用、感染、不假外出、意外傷害等 6 項指標分別管理每月蒐集資料。AI 自動分析各指標趨勢，確認每月均有資料蒐集、異常有改善措施記錄，完整符合 B1.7 評鑑要求。",
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
          精神護理之家專用
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
          精神護理之家文書管理系統｜<span className="text-primary">評鑑 AI 分析・住民照護計畫管理</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          115年度評鑑基準 A/B/C/D/E 五大面向 36 條指標全覆蓋——AI 逐項對應基準符合項目，直接標示文件缺漏，
          住民服務計畫集中管理，評鑑準備效率大幅提升。
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
            { value: "36 條", label: "評鑑指標全覆蓋" },
            { value: "AI 分析", label: "自動標示文件缺漏" },
            { value: "5 大面向", label: "A/B/C/D/E 全面管理" },
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
              精神護理之家文書管理這樣做：評鑑基準逐項對應，住民服務計畫集中管理
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              從住民入院評估到跨專業照護紀錄，從品質監測指標到疏散避難演練，每個功能都以精神護理之家工作流程為中心。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <SparklesIcon className="h-6 w-6" />,
                title: "AI 評鑑基準分析（36 條全覆蓋）",
                desc: "上傳機構文件後，AI 自動對應 115年度評鑑基準 A 經營管理（9條）、B 專業照護（21條）、C 安全設施（3條）、D 住民權益（2條）、E 創新改革（1條），逐項標示哪些符合項目文件不足，評鑑前不再逐項手動比對。",
              },
              {
                icon: <ClipboardListIcon className="h-6 w-6" />,
                title: "住民服務計畫管理（B1）",
                desc: "依 B1 住民服務計畫基準建立住民標籤，入院評估、個別化照護計畫、每月評值紀錄依住民分類管理，評鑑前 AI 標示哪位住民的服務計畫文件不完整或評值記錄缺漏。",
              },
              {
                icon: <TagIcon className="h-6 w-6" />,
                title: "品質監測 6 項指標追蹤（B1.7）",
                desc: "跌倒、壓力性損傷、約束使用、感染、不假外出、意外傷害等 6 項照護品質指標建立專屬標籤，每月資料上傳後 AI 分析趨勢，確認各指標均有持續監測及異常改善記錄，完整符合 B1.7 評鑑要求。",
              },
              {
                icon: <ShieldCheckIcon className="h-6 w-6" />,
                title: "安全設施與疏散避難管理（C1）",
                desc: "疏散避難系統檢查紀錄、火災應變計畫、夜間演練紀錄依 C1.1～C1.3 基準（含重點項目 C1.1）分類建檔，AI 對應各條符合項目，評鑑委員要看安全文件，直接從標籤調出，不用臨時翻找。",
              },
              {
                icon: <UsersIcon className="h-6 w-6" />,
                title: "跨專業照護協作（A2.2/B1.3）",
                desc: "依職類建立獨立標籤：護理師、職能治療師、臨床心理師各自管理負責的文件，A2.2 人員配置（24小時護理師在班、職能治療師及臨床心理師）符合記錄一目了然，評鑑前不遺漏任何職類文件。",
              },
              {
                icon: <BrainCircuitIcon className="h-6 w-6" />,
                title: "精神衛生法規遵循管理（B1.10）",
                desc: "住民不假外出處理程序、精神衛生法第52條規範相關文件專屬建檔，結合 B1.7 不假外出品質指標追蹤，確保 B1.10 緊急事件處理程序文件完整，精神護理特有法規要求不再遺漏。",
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
              精神護理之家
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* 王護理長 — 精選，全寬 */}
            <Card className="border-primary/40 md:col-span-3">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-violet-100 text-violet-800 shrink-0">
                      王
                    </div>
                    <div>
                      <div className="text-sm font-medium">王護理長</div>
                      <div className="text-xs text-muted-foreground mt-0.5">桃園市精神護理之家・護理長</div>
                    </div>
                  </div>
                  <Badge variant="secondary">精選評價</Badge>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  精神護理之家最難準備的就是「B1.7 品質監測 6 項指標」——跌倒、壓傷、約束、感染、不假外出、意外傷害，每月都要蒐集，但資料分散在各個表格，評鑑前要整合很耗時。
                  <br /><br />
                  用了<span className="text-foreground font-medium">報告汪</span>之後，6 項指標各自建標籤，每月資料上傳後<span className="text-foreground font-medium"> AI 自動分析</span>趨勢，評鑑前直接告訴我哪個月份資料缺漏或哪項指標沒有異常改善紀錄，準備時間省了超過一半。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["精神護理之家評鑑", "品質監測指標", "護理之家文書", "精神護理之家評鑑準備"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 林負責人 — 2 欄 */}
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-sky-100 text-sky-800 shrink-0">
                    林
                  </div>
                  <div>
                    <div className="text-sm font-medium">林負責人</div>
                    <div className="text-xs text-muted-foreground mt-0.5">台北市精神護理之家・機構負責人</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  我們評鑑前最怕 A2.2 人員配置文件不完整——24小時護理師在班紀錄、職能治療師和臨床心理師的排班與服務紀錄，要同時呈現給評鑑委員，以前每次都要從不同系統抓資料。
                  <br /><br />
                  用了<span className="text-foreground font-medium">報告汪</span>的標籤依<span className="text-foreground font-medium">職類分區</span>後，各職類文件各歸其位，評鑑前 AI 一次告訴我哪個職類文件缺件，再也不用臨時補件了。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["精神護理之家評鑑", "人員配置管理", "跨專業照護", "職能治療師紀錄"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 陳職能治療師 — 1 欄 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-emerald-100 text-emerald-800 shrink-0">
                    陳
                  </div>
                  <div>
                    <div className="text-sm font-medium">陳職能治療師</div>
                    <div className="text-xs text-muted-foreground mt-0.5">台中市精神護理之家・職能治療師</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  B1.15 復健作業治療的活動時數紀錄——每週不超過 15 小時且要有獎勵金辦法，以前每次評鑑都要重新整理紀錄表。
                  <br /><br />
                  現在用<span className="text-foreground font-medium">報告汪</span>建立復健活動標籤，日常紀錄上傳後<span className="text-foreground font-medium"> AI 自動對應</span> B1.15 基準符合項目，評鑑前所有復健紀錄都完整，委員查起來立刻就能找到。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["復健作業治療", "護理之家文書", "活動時數紀錄"].map((tag) => (
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
              { value: "36 條", label: "評鑑指標覆蓋" },
              { value: "5 大面向", label: "A/B/C/D/E 全覆蓋" },
              { value: "6 項", label: "品質監測指標追蹤" },
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
                q: "報告汪如何協助精神護理之家的評鑑準備？",
                a: "報告汪內建「115年度精神護理之家評鑑基準」評鑑 profile，上傳機構文件後，AI 自動對應 A 經營管理效能（9條）、B 專業照護品質（21條）、C 安全維護及設施設備（3條）、D 住民權益保障（2條）、E 創新及改革（1條）共 36 條指標，逐項標示哪些符合項目文件不足，讓評鑑準備不再是逐項手動比對的苦工。",
              },
              {
                q: "精神護理之家的住民服務計畫（B1）如何用報告汪管理？",
                a: "依 B1 住民服務計畫基準建立住民標籤，入院評估、個別化照護計畫、每月評值紀錄依住民分類管理。評鑑前 AI 分析直接標示哪位住民的服務計畫文件不完整、6 項照護品質監測指標是否有每月蒐集記錄，一目了然。",
              },
              {
                q: "護理師、職能治療師與機構負責人如何在同一平台分工協作？",
                a: "依職類建立獨立標籤：護理師負責 B1 住民服務計畫、B1.7 品質監測文件；職能治療師負責 B1.15 復健作業治療紀錄；臨床心理師負責相關心理評估記錄；行政負責 A 區行政管理文件；負責人負責 C 區安全設施及 D 區住民權益。各職類在各自標籤區撰寫文件，評鑑備審時跨標籤篩選一次取得所有最新文件。",
              },
              {
                q: "B1.7 品質監測 6 項指標如何用報告汪追蹤？",
                a: "建立「品質監測 B1.7」標籤，依跌倒、壓力性損傷、約束使用、感染、不假外出、意外傷害等 6 項指標分別管理每月蒐集資料。AI 自動分析各指標趨勢，確認每月均有資料蒐集、異常有改善措施記錄，完整符合 B1.7 評鑑要求。",
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
              其他護理機構解決方案
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                href: "/general-nursing-home",
                title: "一般護理之家 AI 文書管理系統介紹",
                emoji: "🏥",
                label: "一般護理之家",
                stat: "15 項",
                statLabel: "評鑑基準覆蓋",
                desc: "住民照護計畫集中管理，護理師與照服員同平台協作，評鑑準備時間省一半。",
                cta: "一般護理之家文書管理系統 →",
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
          準備好讓精神護理之家文書走向 AI 輔助了嗎？
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          加入報告汪，評鑑 AI 分析、住民服務計畫集中管理、品質監測指標持續追蹤。
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
          <Link href="/auth/sign-up" title="免費試用報告汪精神護理之家方案" className="hover:text-primary transition-colors">註冊</Link>
        </div>
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
