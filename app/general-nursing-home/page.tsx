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
  ClipboardListIcon,
  ChevronDownIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "一般護理之家 AI 文書管理系統｜115年度評鑑備審・住民照護計畫・環境安全管理平台",
  description:
    "報告汪專為一般護理之家設計：115年度評鑑基準 A 行政組織（5 項）、B 專業服務（3 項）、C 環境設施（4 項）、D 特別事項（3 項）共 15 項 AI 逐項分析，住民照護計畫集中管理，護理師、照服員與負責人同平台協作。一般護理之家文書管理首選。立即免費試用。",
  alternates: { canonical: "/general-nursing-home" },
  openGraph: {
    title: "一般護理之家 AI 文書管理系統｜115年度評鑑備審・住民照護計畫・環境安全管理平台",
    description:
      "報告汪專為一般護理之家設計：115年度評鑑基準 A 行政組織（5 項）、B 專業服務（3 項）、C 環境設施（4 項）、D 特別事項（3 項）共 15 項 AI 逐項分析，住民照護計畫集中管理，護理師、照服員與負責人同平台協作。一般護理之家文書管理首選。立即免費試用。",
  },
  twitter: {
    title: "一般護理之家 AI 文書管理系統｜115年度評鑑備審・住民照護計畫・環境安全管理平台",
    description:
      "報告汪專為一般護理之家設計：115年度評鑑基準 A 行政組織（5 項）、B 專業服務（3 項）、C 環境設施（4 項）、D 特別事項（3 項）共 15 項 AI 逐項分析，住民照護計畫集中管理，護理師、照服員與負責人同平台協作。一般護理之家文書管理首選。立即免費試用。",
  },
};

export default function GeneralNursingHomePage() {
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
                name: "報告汪如何協助一般護理之家的評鑑準備？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "報告汪內建「115年度一般護理之家評鑑基準」評鑑 profile，上傳機構文件後，AI 自動對應 A 行政組織（5 項）、B 專業服務（3 項）、C 環境設施（4 項）、D 特別事項（3 項）共 15 項基準，逐項標示哪些符合項目文件不足，讓評鑑準備不再是逐項手動比對的苦工。",
                },
              },
              {
                "@type": "Question",
                name: "一般護理之家的住民照護計畫（B1/B2）如何用報告汪管理？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "依 B1 住民服務需求評估及 B2 提供住民整合性照顧基準建立住民標籤，72 小時整體性評估、個別化照護計畫（問題/目標/措施/評值）依住民分類管理。評鑑前 AI 分析直接標示哪位住民的照護計畫文件不完整、每 3 個月的定期再評估是否有記錄，一目了然。",
                },
              },
              {
                "@type": "Question",
                name: "護理師、照服員與機構負責人如何在同一平台分工協作？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "依職類建立獨立標籤：護理師負責 B1 服務需求評估、B3 品質監測 6 項指標文件；照服員負責 B2 整合性照顧（文康活動紀錄）；行政負責 A 區行政管理（A1.1 負責人管理、A1.2 人員配置）；防火管理人負責 C1～C4 環境安全與演練文件。各職類在各自標籤區撰寫文件，評鑑備審時跨標籤篩選一次取得所有最新文件。",
                },
              },
              {
                "@type": "Question",
                name: "C 區環境設施（C1 災害應變計畫、C2～C4 疏散演練）文件如何用報告汪管理？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "依 C1～C4 基準建立四個標籤：C1 管理每半年 2 次（含夜間）的災害演練腳本與檢討記錄；C2 管理等待救援空間圖面與通道暢通照片；C3 管理防火管理人研習記錄、外籍照服員防火訓練記錄、水平避難策略文件；C4 管理情境演練計畫（含夜間版本）與演練紀錄。評鑑前 AI 自動對應各基準符合項目，標示哪項文件缺漏，不再臨時補件。",
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
              itemUrl: "https://reportwang.com/general-nursing-home",
              ratingValue: 5.0,
              reviewCount: 3,
              reviews: [
              { author: "林護理長", ratingValue: 5, reviewBody: "依住民建立標籤整合 A2.1 服務對象管理文件，AI 評鑑分析自動指出再評估缺漏，準備時間省超過一半。" },
              { author: "黃負責人", ratingValue: 5, reviewBody: "C 區四基準（C1～C4）標籤化管理消防、感染管制、災害應變，評鑑前再無臨時補件。" },
              { author: "陳照服員", ratingValue: 5, reviewBody: "B2 生活照顧紀錄（沐浴、飲食、巡房）標籤化，AI 自動對應基準，每位住民紀錄完整可查。" },
              ],
            })
          ),
        }}
      />
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center text-center py-24 px-6 bg-gradient-to-b from-background to-muted/30">
        <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
          一般護理之家專用
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
          一般護理之家文書管理系統｜<span className="text-primary">評鑑 AI 分析・住民照護計畫管理</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          115年度評鑑基準 A/B/C/D 四大構面 15 項全覆蓋——AI 逐項對應基準符合項目，直接標示文件缺漏，
          住民照護計畫集中管理，評鑑準備效率大幅提升。
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
            { value: "4 大構面", label: "A/B/C/D 全面管理" },
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
              一般護理之家文書管理這樣做：評鑑基準逐項對應，住民照護紀錄集中管理
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              從住民收住評估到感染管制演練紀錄，從照護品質指標到災害應變計畫，每個功能都以護理之家工作流程為中心。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <SparklesIcon className="h-6 w-6" />,
                title: "AI 評鑑基準分析（15 項全覆蓋）",
                desc: "上傳機構文件後，AI 自動對應 115年度評鑑基準 A 行政組織（5 項）、B 專業服務（3 項）、C 環境設施（4 項）、D 特別事項（3 項），逐項標示哪些符合項目文件不足，評鑑前不再逐項手動比對。",
              },
              {
                icon: <ClipboardListIcon className="h-6 w-6" />,
                title: "住民照護計畫管理（B1/B2）",
                desc: "依 B1 服務需求評估基準建立住民標籤，72 小時整體性評估、個別化照護計畫（問題/目標/措施/評值）依住民分類管理，評鑑前 AI 標示哪位住民的照護計畫文件不完整或每 3 個月定期再評估記錄缺漏。",
              },
              {
                icon: <TagIcon className="h-6 w-6" />,
                title: "品質監測指標追蹤（B3）",
                desc: "官方規定 6 項照護品質指標（跌倒、壓力性損傷、約束、感染、非計畫性轉急性住院、非計畫性體重改變）各建專屬標籤，定期統計上傳後 AI 分析趨勢，確認每項指標均有持續監測及超閾值改善記錄，完整符合 B3 評鑑要求。",
              },
              {
                icon: <ShieldCheckIcon className="h-6 w-6" />,
                title: "環境安全與災害應變管理（C1～C4）",
                desc: "消防安全設施檢查、感染管制消毒記錄、災害應變演練計畫依 C1～C4 基準分類建檔，AI 對應各構面符合項目，評鑑委員要看環境安全文件，直接從標籤調出，不用臨時翻找。",
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
              一般護理之家
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* 林護理長 — 精選，全寬 */}
            <Card className="border-primary/40 md:col-span-3">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-pink-100 text-pink-800 shrink-0">
                      林
                    </div>
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
                  用了<span className="text-foreground font-medium">報告汪</span>之後，我依住民建立標籤，照護計畫寫完直接貼標，評鑑前<span className="text-foreground font-medium"> AI 評鑑分析</span>直接告訴我哪位住民的照護計畫每 3 個月再評估紀錄缺失（依 B1 服務需求評估基準），不用再逐項手動比對，準備時間省了超過一半。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["護理之家評鑑", "住民照護計畫", "護理之家文書", "一般護理之家評鑑準備"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 黃負責人 — 2 欄 */}
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-sky-100 text-sky-800 shrink-0">
                    黃
                  </div>
                  <div>
                    <div className="text-sm font-medium">黃負責人</div>
                    <div className="text-xs text-muted-foreground mt-0.5">新北市一般護理之家・機構負責人</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  我們評鑑前最怕 C 區環境設施文件不齊——消防演練紀錄、感染管制手冊、災害應變計畫、疫苗接種記錄，每次都要臨時補件，一到評鑑月份全機構都在趕文件。
                  <br /><br />
                  用了<span className="text-foreground font-medium">報告汪</span>的標籤依<span className="text-foreground font-medium">評鑑構面分區</span>後，C 區四個基準（C1～C4）各有對應標籤，平時文件寫完直接貼上，評鑑前 AI 一次告訴我哪個構面缺件，再也不用臨時補件了。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["護理之家評鑑", "感染管制文件", "消防安全管理", "災害應變管理"].map((tag) => (
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
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-emerald-100 text-emerald-800 shrink-0">
                    陳
                  </div>
                  <div>
                    <div className="text-sm font-medium">陳照服員</div>
                    <div className="text-xs text-muted-foreground mt-0.5">桃園市一般護理之家・照顧服務員</div>
                  </div>
                </div>
                <div className="text-amber-500 text-sm mt-3">★★★★★</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  B2 生活照顧紀錄是我以前最頭痛的——沐浴、飲食、活動、夜間巡房記錄分散在好幾個表格，評鑑要對照護計畫，光找資料就要花很多時間。
                  <br /><br />
                  現在用<span className="text-foreground font-medium">報告汪</span>建立住民照顧標籤，日常紀錄上傳後<span className="text-foreground font-medium"> AI 自動對應</span> B2 基準符合項目，評鑑前每位住民的生活照顧紀錄都完整，委員查起來立刻就能找到。
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {["生活照顧紀錄", "護理之家文書", "照服員日誌"].map((tag) => (
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
              { value: "4 大構面", label: "A/B/C/D 全覆蓋" },
              { value: "6 項", label: "照護品質指標追蹤" },
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
                q: "報告汪如何協助一般護理之家的評鑑準備？",
                a: "報告汪內建「115年度一般護理之家評鑑基準」評鑑 profile，上傳機構文件後，AI 自動對應 A 行政組織（5 項）、B 專業服務（3 項）、C 環境設施（4 項）、D 特別事項（3 項）共 15 項基準，逐項標示哪些符合項目文件不足，讓評鑑準備不再是逐項手動比對的苦工。",
              },
              {
                q: "一般護理之家的住民照護計畫（B1/B2）如何用報告汪管理？",
                a: "依 B1 住民服務需求評估及 B2 提供住民整合性照顧基準建立住民標籤，72 小時整體性評估、個別化照護計畫（問題/目標/措施/評值）依住民分類管理。評鑑前 AI 分析直接標示哪位住民的照護計畫文件不完整、每 3 個月的定期再評估是否有記錄，一目了然。",
              },
              {
                q: "護理師、照服員與機構負責人如何在同一平台分工協作？",
                a: "依職類建立獨立標籤：護理師負責 B1 服務需求評估、B3 品質監測 6 項指標文件；照服員負責 B2 文康活動及整合性照顧紀錄；防火管理人負責 C1～C4 環境安全與演練文件；行政負責 A1 行政制度（負責人管理、人員配置、緊急事件處理）、A2 防疫機制與安寧療護。各職類在各自標籤區撰寫文件，評鑑備審時跨標籤篩選一次取得所有最新文件。",
              },
              {
                q: "C 區環境設施（C1 災害應變計畫、C2～C4 疏散演練）文件如何用報告汪管理？",
                a: "依 C1～C4 基準建立四個標籤：C1 管理每半年 2 次（含夜間）的災害演練腳本與檢討記錄；C2 管理等待救援空間圖面與通道暢通照片；C3 管理防火管理人研習記錄、外籍照服員防火訓練、水平避難策略文件；C4 管理情境演練計畫（含夜間版本）與演練紀錄。評鑑前 AI 自動對應各基準符合項目，標示哪項文件缺漏，不再臨時補件。",
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
                href: "/day-care",
                title: "日照中心 AI 文書管理系統介紹",
                emoji: "🏢",
                label: "日照中心",
                stat: "↓ 48%",
                statLabel: "活動紀錄時間",
                desc: "個案服務計畫和活動紀錄用標籤分類後，評鑑前不再手忙腳亂。",
                cta: "日照中心文書管理系統 →",
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
          準備好讓一般護理之家文書走向 AI 輔助了嗎？
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          加入報告汪，評鑑 AI 分析、住民照護計畫集中管理、環境安全文件持續建檔。
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
          <Link href="/auth/sign-up" title="免費試用報告汪一般護理之家方案" className="hover:text-primary transition-colors">註冊</Link>
        </div>
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
