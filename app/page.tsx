import type { Metadata } from "next";
import Link from "next/link";
import { StartButton } from "@/components/start-button";
import { TrialButton } from "@/components/trial-button";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BotIcon,
  TagIcon,
  CopyIcon,
  ZapIcon,
  CheckIcon,
  SearchIcon,
  FileTextIcon,
  SparklesIcon,
  ChevronDownIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "報告汪｜長照機構 AI 文書管理・報告生成・評鑑備審，居服・日照・護理之家・醫院護理部適用" },
  description:
    "報告汪是專為長照與社福機構設計的 AI 文書管理系統，支援居服機構、日照中心、醫院護理部、護理之家、身心障礙福利機構五大族群。透過智慧標籤分類、拖曳排序、AI 輔助撰寫，快速整理日誌、評鑑報告與個案記錄。多職類協作，評鑑備審文件一鍵彙整，不再臨時找不到報告。立即免費試用。",
  keywords: ["長照報告管理", "居家服務機構", "日照中心文書", "護理之家文書", "醫院護理部", "身心障礙福利機構", "AI報告輔助", "定期報告", "社工報告", "個管師"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "報告汪｜長照與社福機構 AI 文書管理・報告生成・評鑑備審，居服・日照・護理之家・醫院・身心障礙機構適用",
    description:
      "報告汪是專為長照與社福機構設計的 AI 文書管理系統，支援居服機構、日照中心、醫院護理部、護理之家、身心障礙福利機構五大族群。透過智慧標籤分類、拖曳排序、AI 輔助撰寫，快速整理日誌、評鑑報告與個案記錄。多職類協作，評鑑備審文件一鍵彙整，不再臨時找不到報告。立即免費試用。",
  },
  twitter: {
    title: "報告汪｜長照與社福機構 AI 文書管理・報告生成・評鑑備審，居服・日照・護理之家・醫院・身心障礙機構適用",
    description:
      "報告汪是專為長照與社福機構設計的 AI 文書管理系統，支援居服機構、日照中心、醫院護理部、護理之家、身心障礙福利機構五大族群。透過智慧標籤分類、拖曳排序、AI 輔助撰寫，快速整理日誌、評鑑報告與個案記錄。多職類協作，評鑑備審文件一鍵彙整，不再臨時找不到報告。立即免費試用。",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "報告汪",
            url: "https://reportwang.com",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
            description:
              "複製上期報告當模板，讓 AI 修改差異段落，再用標籤與搜尋管理所有報告。社工、個管師、行政人員的定期報告幫手。",
          }),
        }}
      />
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center text-center py-24 px-6 bg-gradient-to-b from-background to-muted/30">
        <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
          <SparklesIcon className="h-3.5 w-3.5 mr-1.5" />
          行政效率工具
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
          長照機構文書管理系統<br className="hidden md:block" />
          <span className="text-primary">AI報告生成・標籤分類・評鑑備審</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          複製上期報告當模板，AI 幫你修改差異段落，再用標籤與搜尋輕鬆管理所有報告。
          每天例行報告，1 分鐘完成。
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
            { value: "1 分鐘", label: "定期報告產出時間" },
            { value: "標籤＋搜尋", label: "快速找到任何報告" },
            { value: "免費", label: "測試期間全功能開放" },
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">長照定期報告生成工具：複製上期・AI修改差異・評鑑一鍵備審</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              從複製舊報告到 AI 修改、標籤分類到全文搜尋，每一個功能都以行政效率為中心。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <BotIcon className="h-6 w-6" />,
                title: "AI 段落修改",
                desc: "點擊任意段落，輸入修改指令，AI 立即給出符合本次格式的版本。不滿意可反覆調整，直到達到預期效果。",
              },
              {
                icon: <TagIcon className="h-6 w-6" />,
                title: "標籤分類，快速找報告",
                desc: "用標籤標記報告類型（日報、週報、月報、專案名稱），搭配全文搜尋，一秒定位任何一份報告。",
              },
              {
                icon: <CopyIcon className="h-6 w-6" />,
                title: "一鍵複製舊報告",
                desc: "直接複製上期報告當模板，保留原有格式與段落結構，只需修改差異內容，省去重複排版的時間。",
              },
              {
                icon: <ZapIcon className="h-6 w-6" />,
                title: "快速建立報告",
                desc: "直接貼上報告文字，系統自動儲存並支援手動輸入或上傳 .doc 檔，立即建立可編輯的報告。",
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

      {/* Bento Grids */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">三步驟完成長照定期報告</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="md:col-span-2 p-6 flex flex-col gap-4 border-primary/20">
              <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                <FileTextIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold">複製上期報告，AI 修改差異段落</h3>
              <p className="text-muted-foreground">
                不必每次從零開始。複製上一期報告後，針對有異動的段落下指令給 AI，
                AI 依照本次情況產出修改版本，多輪對話直到您滿意為止。
              </p>
              <div className="mt-auto pt-4 border-t space-y-2">
                {["複製上期報告為模板", "點選要修改的段落，輸入指令", "AI 產出修改版，一鍵套用"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                <SearchIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold">標籤分類＋全文搜尋</h3>
              <p className="text-muted-foreground">
                用標籤標記日報、週報、月報或專案名稱，所有報告集中管理，全文搜尋秒速定位。
              </p>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                <CopyIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold">報告不怕散落</h3>
              <p className="text-muted-foreground">
                所有報告集中儲存、拖曳排序，配合標籤一目瞭然，再也不用在資料夾堆裡翻找。
              </p>
            </Card>
            <Card className="md:col-span-2 p-6 flex flex-col gap-4 bg-primary text-primary-foreground">
              <SparklesIcon className="h-7 w-7" />
              <h3 className="text-xl font-semibold">由 Claude AI 驅動</h3>
              <p className="opacity-80">
                報告汪使用 Anthropic Claude 模型，理解繁體中文語境，提供符合台灣行政用語的修改建議。
              </p>
              <div className="mt-auto">
                <StartButton>免費體驗</StartButton>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">使用教學</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">從零開始，輕鬆上手報告汪</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              圖文教學帶你快速掌握每個功能，從建立第一份報告到 AI 評鑑分析。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                href: "/docs/getting-started",
                title: "快速開始",
                desc: "三步驟完成帳號設定並建立第一份報告，10 分鐘上手。",
                step: "01",
              },
              {
                href: "/docs/ai-editing",
                title: "AI 段落修改",
                desc: "點擊段落輸入自然語言指令，AI 即時產出修改版本。",
                step: "02",
              },
              {
                href: "/docs/tags-and-search",
                title: "標籤分類與搜尋",
                desc: "建立標籤、篩選報告，幾百份文件瞬間找到目標。",
                step: "03",
              },
            ].map(({ href, title, desc, step }) => (
              <Link key={href} href={href} title={title}>
                <Card className="p-6 h-full hover:border-primary/50 hover:shadow-sm transition-all group">
                  <p className="text-4xl font-bold text-primary/20 mb-4 group-hover:text-primary/40 transition-colors">{step}</p>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
                  <p className="text-muted-foreground text-sm">{desc}</p>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/docs"
              title="報告汪使用教學"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              查看完整教學 →
            </Link>
          </div>
        </div>
      </section>

      {/* Long-term Care Industry Solutions */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">長照產業解決方案</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">居服、日照、護理、社工各職類都說好</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              {
                emoji: "🏠",
                badge: "居服機構",
                href: "/home-care",
                linkTitle: "居服機構 AI 文書管理系統介紹",
                stat: "↓ 52%",
                statLabel: "文書時間",
                quote: "標籤功能讓我一眼看出誰的日誌有交、誰還沒繳，不用再每天逐一催繳。",
                author: "吳督導・台中市居家服務中心",
                cta: "居服機構文書管理系統 →",
              },
              {
                emoji: "🏢",
                badge: "日照中心",
                href: "/day-care",
                linkTitle: "日照中心 AI 文書管理系統介紹",
                stat: "↓ 48%",
                statLabel: "活動紀錄時間",
                quote: "個案服務計畫和活動紀錄用標籤分類後，評鑑前不再手忙腳亂。",
                author: "陳社工・台北市日照中心",
                cta: "日照中心文書管理系統 →",
              },
              {
                emoji: "🏥",
                badge: "醫院",
                href: "/hospital",
                linkTitle: "醫院 AI 文書管理系統介紹",
                stat: "↓ 60%",
                statLabel: "交接時間",
                quote: "班別標籤讓護理師交接後就知道當班該完成哪些文書，文書焦慮大幅減少。",
                author: "蔡護理長・台北某區域醫院",
                cta: "護理文書管理系統・交班紀錄工具 →",
              },
              {
                emoji: "🏡",
                badge: "護理之家",
                href: "/nursing-home",
                linkTitle: "護理之家多職種文書協作平台介紹",
                stat: "4 職類",
                statLabel: "協作管理",
                quote: "主任月報行政時間少了三分之一，各職類文件不再混在一起找不到。",
                author: "廖主任・新北市護理之家",
                cta: "護理之家多職類文書協作平台 →",
              },
              {
                emoji: "♿",
                badge: "身心障礙機構",
                href: "/disability",
                linkTitle: "身心障礙福利機構 AI 文書管理系統介紹",
                stat: "32 項",
                statLabel: "自我檢核覆蓋",
                quote: "自我檢核項目逐項對應，AI 分析直接標示缺漏，評鑑準備效率大幅提升。",
                author: "張社工・新北市身心障礙福利機構",
                cta: "身心障礙機構文書管理系統 →",
              },
            ].map((item) => (
              <Link key={item.href} href={item.href} title={item.linkTitle} className="block group">
                <Card className="h-full hover:shadow-md transition-shadow group-hover:border-primary/40">
                  <CardContent className="pt-6 pb-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">{item.emoji}</span>
                      <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                    </div>
                    <div className="text-4xl font-extrabold text-primary mb-0.5">{item.stat}</div>
                    <div className="text-xs text-muted-foreground mb-4">{item.statLabel}</div>
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-3">
                      「{item.quote}」
                    </p>
                    <div className="text-xs text-muted-foreground mb-4">{item.author}</div>
                    <div className="text-xs font-medium text-primary group-hover:underline mt-auto">
                      {item.cta}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Free Download — 日照機構備審文件 */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4">免費資源下載</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">日照機構備審文件 &amp; 工作記錄表｜免費模板下載</h2>
          </div>
          <Card className="border-dashed border-2 border-primary/30 bg-background">
            <CardContent className="pt-8 pb-8 px-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="p-4 rounded-xl bg-primary/10 text-primary shrink-0">
                  <DownloadIcon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground mb-4">
                    評鑑季來了，用這份模板把文件一次整理好。適用日間照護機構督導、社工、護理師使用。
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["日照機構適用", "評鑑備審", "工作記錄表", "免費"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <ul className="space-y-1.5 mb-6 text-sm text-muted-foreground">
                    {[
                      "評鑑備審必備文件清單",
                      "工作記錄表格式（可直接複製使用）",
                      "適用日照機構評鑑相關查核項目",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckIcon className="h-3.5 w-3.5 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <a
                      href="https://docs.google.com/spreadsheets/d/1Vm10sjWs8zhE7zufBF0hvNoFZkTr5E_5/edit?usp=sharing"
                      title="免費下載日照機構備審文件與工作記錄表 Google 試算表"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-5 py-2.5 rounded-lg font-medium text-sm"
                    >
                      <DownloadIcon className="h-4 w-4" />
                      免費開啟試算表 →
                    </a>
                    <span className="text-xs text-muted-foreground">無需登入，開啟後點「檔案 → 複製」即可使用</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-6" id="pricing">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">價格</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">現在完全免費</h2>
          <p className="text-muted-foreground text-lg mb-8">
            系統目前處於測試階段，所有功能完全免費開放。
          </p>
          <Card className="p-8 max-w-md mx-auto shadow-lg border-primary/30">
            <div className="text-5xl font-extrabold mb-2">$0</div>
            <div className="text-muted-foreground mb-8">/ 月，測試期間</div>
            <ul className="text-left space-y-3 mb-8">
              {[
                "無限報告數量",
                "無限標籤分類",
                "AI 段落修改",
                "一鍵複製舊報告",
                "全文搜尋",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <StartButton>立即免費開始</StartButton>
          </Card>
          <p className="mt-4 text-sm text-muted-foreground">
            <Link href="/pricing" title="查看報告汪各方案價格" className="underline hover:text-primary">查看完整價格說明</Link>
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
                q: "報告汪適合哪些行政工作使用？",
                a: "適合需要定期產出報告的行政人員，例如：撰寫日報、週報、月報、專案進度報告、會議紀錄等重複性高的文書工作。",
              },
              {
                q: "如何快速產出每週 / 每月的定期報告？",
                a: "複製上一期的報告作為模板，針對有異動的段落輸入 AI 修改指令（例如：「更新本週進度數字」），AI 立即產出修改版本，確認後套用，全程不需重新排版。",
              },
              {
                q: "AI 修改報告是如何運作的？",
                a: "點擊報告中的任意段落，進入 AI 對話模式，以自然語言下指令（例如：「這段改得更簡潔」、「加入本週新增的事項」），AI 提供修改版本，不滿意可繼續調整。",
              },
              {
                q: "標籤功能怎麼用？",
                a: "建立標籤後（例如：週報、A 專案、財務部），將報告關聯至對應標籤。之後可透過標籤篩選或全文搜尋快速找到特定報告，不再需要在資料夾中翻找。",
              },
              {
                q: "目前收費嗎？",
                a: "系統目前處於測試階段，完全免費使用。正式版本的定價方案尚在規劃中。",
              },
            ].map((item) => (
              <details key={item.q} className="group border rounded-lg bg-background">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium">
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

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">準備好告別重複文書工作了嗎？</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          加入報告汪，讓 AI 幫你搞定定期報告，把時間還給真正重要的事。
        </p>
        <StartButton>免費開始使用</StartButton>
      </section>

      <Footer />
    </main>
  );
}
