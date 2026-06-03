import type { Metadata } from "next";
import Link from "next/link";
import { SoapDemo } from "@/components/demo/soap-demo";
import { SparklesIcon, ArrowRightIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "護理記錄 AI 改寫免費體驗｜SOAP 格式一鍵轉換",
  description:
    "免費體驗報告汪 AI 助手：將護理記錄一鍵改寫成 SOAP 格式（主觀S・客觀O・評估A・計畫P），評鑑文件快速合規，無需註冊即可試用，每日免費體驗次數用完再等隔天。",
  alternates: { canonical: "/demo" },
  openGraph: {
    title: "護理記錄 AI 改寫免費體驗｜SOAP 格式一鍵轉換",
    description:
      "報告汪 AI 免費體驗：護理記錄一鍵改寫成 SOAP 格式，評鑑文件快速合規，無需註冊。",
    url: "https://reportwang.com/demo",
    type: "website",
  },
};

// 免費體驗的亮點清單
const highlights = [
  "無需註冊，即開即用",
  "SOAP 格式：S・O・A・P 四段完整產出",
  "提供日照、居服、護理之家等多種範例",
  "正式版可自訂修改指令，解鎖更多 AI 模式",
];

export default function DemoPage() {
  return (
    <main className="min-h-svh bg-background">
      {/* Hero 區塊 */}
      <section className="border-b bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              <SparklesIcon className="w-3.5 h-3.5" strokeWidth={2} />
              免費 AI 體驗
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            護理記錄 AI 改寫體驗
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            把一段護理記錄貼入，AI 自動改寫成 SOAP 格式（主觀・客觀・評估・計畫）。
            評鑑備審、日常記錄兩用，每日免費體驗次數無需登入。
          </p>

          {/* 亮點 */}
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Demo 主體 */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        <SoapDemo />
      </section>

      {/* 轉換 CTA */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-base font-semibold mb-1">想解鎖完整功能？</p>
          <p className="text-sm text-muted-foreground mb-4">
            免費註冊即可使用 AI 評鑑報告撰寫、PDCA 改善計畫、跨報告評鑑分析等進階功能。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild>
              <Link href="/auth/sign-up?source=demo-cta" className="gap-1.5">
                免費試用 14 天
                <ArrowRightIcon className="w-4 h-4" strokeWidth={2} />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/blog/nursing-pdca-template-full-guide-2026" className="text-muted-foreground">
                閱讀 PDCA 護理報告教學 →
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
