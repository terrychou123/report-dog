import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";
import { StartButton } from "@/components/start-button";
import { TrialButton } from "@/components/trial-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
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
} from "lucide-react";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "報告汪適合哪些行政工作使用？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "適合需要定期產出報告的行政人員，例如：撰寫日報、週報、月報、專案進度報告、會議紀錄等重複性高的文書工作。",
                },
              },
              {
                "@type": "Question",
                name: "如何快速產出每週 / 每月的定期報告？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "複製上一期的報告作為模板，針對有異動的段落輸入 AI 修改指令（例如：「更新本週進度數字」），AI 立即產出修改版本，確認後套用，全程不需重新排版。",
                },
              },
              {
                "@type": "Question",
                name: "AI 修改報告是如何運作的？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "點擊報告中的任意段落，進入 AI 對話模式，以自然語言下指令（例如：「這段改得更簡潔」、「加入本週新增的事項」），AI 提供修改版本，不滿意可繼續調整。",
                },
              },
              {
                "@type": "Question",
                name: "標籤功能怎麼用？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "建立標籤後（例如：週報、A 專案、財務部），將報告關聯至對應標籤。之後可透過標籤篩選或全文搜尋快速找到特定報告，不再需要在資料夾中翻找。",
                },
              },
              {
                "@type": "Question",
                name: "目前收費嗎？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "系統目前處於測試階段，完全免費使用。正式版本的定價方案尚在規劃中。",
                },
              },
            ],
          }),
        }}
      />
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <BotIcon className="h-6 w-6 text-primary" />
              報告汪
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/" className="font-medium hover:text-primary transition-colors">
                首頁
              </Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                價格
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Suspense fallback={<div className="h-8 w-20 rounded bg-muted animate-pulse" />}>
              <AuthButton />
            </Suspense>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center py-24 px-6 bg-gradient-to-b from-background to-muted/30">
        <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
          <SparklesIcon className="h-3.5 w-3.5 mr-1.5" />
          行政效率工具
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
          報告汪｜定期報告，<br className="hidden md:block" />
          <span className="text-primary">不再重複造輪子</span>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">專為定期報告設計</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">三步驟完成定期報告</h2>
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
            <Link href="/pricing" className="underline hover:text-primary">查看完整價格說明</Link>
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

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">準備好告別重複文書工作了嗎？</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          加入報告汪，讓 AI 幫你搞定定期報告，把時間還給真正重要的事。
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
          <Link href="/pricing" className="hover:text-primary transition-colors">價格</Link>
          <Link href="/auth/login" className="hover:text-primary transition-colors">登入</Link>
          <Link href="/auth/sign-up" className="hover:text-primary transition-colors">註冊</Link>
        </div>
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
