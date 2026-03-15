import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";
import { StartButton } from "@/components/start-button";
import { BotIcon, CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/theme-switcher";

export const metadata: Metadata = {
  title: "價格方案｜報告汪",
  description:
    "報告汪目前處於公開測試階段，所有功能完全免費開放。歡迎試用並提供回饋，正式版本定價方案規劃中。",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "價格方案｜報告汪" },
  twitter: { title: "價格方案｜報告汪" },
};

export default function PricingPage() {
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
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                首頁
              </Link>
              <Link href="/pricing" className="font-medium hover:text-primary transition-colors">
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

      {/* Pricing Content */}
      <section className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center">
        <Badge variant="secondary" className="mb-6">價格方案</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          系統測試中，<span className="text-primary">暫不收費</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mb-12">
          報告汪目前處於公開測試階段。在正式版本推出前，所有功能完全免費開放，歡迎試用並提供回饋。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-12">
          {/* Free Plan */}
          <Card className="p-6 border-primary/40 shadow-lg md:col-span-3 flex flex-col items-center text-center">
            <div className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">測試方案</div>
            <div className="text-6xl font-extrabold mb-1">$0</div>
            <div className="text-muted-foreground mb-6">/ 月，測試期間完全免費</div>
            <ul className="text-left space-y-3 mb-8 max-w-xs">
              {[
                "無限服務對象管理",
                "無限報告上傳與儲存",
                "AI 段落智能修改",
                "多輪對話調整",
                "個案報告關聯管理",
                "安全加密儲存",
                "繁體中文 AI 優化",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <StartButton>免費開始使用</StartButton>
          </Card>
        </div>

        <div className="text-center max-w-lg">
          <p className="text-sm text-muted-foreground">
            測試結束後，我們將提前通知所有用戶並給予充分的過渡時間。
            正式版本的定價方案仍在規劃中，目標是對助人工作者保持友善。
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <BotIcon className="h-4 w-4 text-primary" />
          報告汪
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-primary transition-colors">首頁</Link>
          <Link href="/auth/login" className="hover:text-primary transition-colors">登入</Link>
          <Link href="/auth/sign-up" className="hover:text-primary transition-colors">註冊</Link>
        </div>
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
