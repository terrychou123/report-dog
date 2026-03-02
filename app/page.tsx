import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";
import { StartButton } from "@/components/start-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BotIcon,
  FolderIcon,
  ShieldIcon,
  ZapIcon,
  CheckIcon,
  UsersIcon,
  FileTextIcon,
  SparklesIcon,
  ChevronDownIcon,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
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
          AI 智能報告助手
        </Badge>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 leading-tight">
          智能報告編輯，<br className="hidden md:block" />
          <span className="text-primary">效率提升 3 倍</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          報告汪結合先進 AI 技術，讓社工、心理師、顧問快速管理個案、精準修改報告。
          保護隱私，提升專業品質。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <StartButton>立即開始 — 免費</StartButton>
          <Button variant="ghost" size="lg" asChild className="text-base">
            <Link href="/pricing">了解更多</Link>
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/20 py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { value: "10 倍", label: "報告修改速度" },
            { value: "100%", label: "資料本地加密" },
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">專為助人工作者設計</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              從個案管理到 AI 輔助修改，每一個功能都以您的需求為中心。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <BotIcon className="h-6 w-6" />,
                title: "AI 段落修改",
                desc: "點擊任意段落，輸入修改指令，AI 立即給出專業建議。不滿意可反覆調整，直到達到預期效果。",
              },
              {
                icon: <FolderIcon className="h-6 w-6" />,
                title: "個案集中管理",
                desc: "以服務對象為單位管理所有相關報告，一目瞭然查看歷史記錄，不再在散亂文件中迷失。",
              },
              {
                icon: <ShieldIcon className="h-6 w-6" />,
                title: "隱私優先設計",
                desc: "我們建議使用化名代替真實姓名，有效保護個資。您的數據安全儲存，不會對外分享。",
              },
              {
                icon: <ZapIcon className="h-6 w-6" />,
                title: "快速上傳報告",
                desc: "直接貼上報告文字，系統自動儲存並與對象關聯，無需繁複的操作流程。",
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">完整工作流程</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="md:col-span-2 p-6 flex flex-col gap-4 border-primary/20">
              <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                <FileTextIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold">段落級 AI 對話修改</h3>
              <p className="text-muted-foreground">
                每個段落都是獨立的編輯單元。點擊後進入 AI 對話模式，以自然語言指揮修改。
                AI 記住上下文，多輪對話直到您滿意為止。
              </p>
              <div className="mt-auto pt-4 border-t space-y-2">
                {["點擊段落", "輸入修改指令", "一鍵套用"].map((step, i) => (
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
                <UsersIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold">個案中心視圖</h3>
              <p className="text-muted-foreground">
                所有對象的報告集中呈現，按時間排序，追蹤進度更清晰。
              </p>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                <ShieldIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold">化名保護機制</h3>
              <p className="text-muted-foreground">
                內建化名提示，建立對象時即提醒避免填入真實姓名，輕鬆符合個資保護要求。
              </p>
            </Card>
            <Card className="md:col-span-2 p-6 flex flex-col gap-4 bg-primary text-primary-foreground">
              <SparklesIcon className="h-7 w-7" />
              <h3 className="text-xl font-semibold">由 Claude AI 驅動</h3>
              <p className="opacity-80">
                報告汪使用 Anthropic Claude 模型，理解繁體中文語境，提供符合台灣專業用語的修改建議。
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
                "無限服務對象",
                "無限報告數量",
                "AI 段落修改",
                "個案管理系統",
                "資料安全儲存",
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
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">常見問題</h2>
          <div className="space-y-4">
            {[
              {
                q: "報告汪適合哪些職業使用？",
                a: "社工、心理師、諮商師、輔導老師、醫療照護工作者、顧問等需要撰寫個案報告的專業人士。",
              },
              {
                q: "我的個案資料安全嗎？",
                a: "系統採用 Supabase 加密儲存，資料不會對外分享。我們也建議使用化名，避免填入個案真實姓名。",
              },
              {
                q: "AI 修改是如何運作的？",
                a: "您在報告中點選任意段落，輸入自然語言指令（例如：「改得更正式一些」），AI 立即提供修改版本供您確認或繼續調整。",
              },
              {
                q: "目前收費嗎？",
                a: "系統目前處於測試階段，完全免費使用。正式版本的定價方案尚在規劃中。",
              },
              {
                q: "支援繁體中文嗎？",
                a: "完全支援！報告汪專為繁體中文使用者設計，AI 理解台灣專業語境，提供符合本地習慣的修改建議。",
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4">準備好提升報告效率了嗎？</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          加入報告汪，讓 AI 成為您最得力的寫作助手。
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
