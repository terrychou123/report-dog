import type { Metadata } from "next";
import { Geist, Noto_Serif_TC } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { organizationJsonLd, websiteWithSearchJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://reportwang.com"),
  title: {
    default: "報告汪｜定期報告神器，1 分鐘完成例行報告",
    template: "%s｜報告汪",
  },
  description:
    "複製上期報告當模板，讓 AI 修改差異段落，再用標籤與搜尋管理所有報告。社工、個管師、行政人員的定期報告幫手，現在完全免費。",
  keywords: ["定期報告", "報告模板", "AI 報告", "社工報告工具", "個管師", "行政效率", "報告汪"],
  authors: [{ name: "報告汪" }],
  creator: "報告汪",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://reportwang.com",
    siteName: "報告汪",
    title: "報告汪｜定期報告神器，1 分鐘完成例行報告",
    description:
      "複製上期報告當模板，讓 AI 修改差異段落，再用標籤與搜尋管理所有報告。現在完全免費。",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "報告汪 - 定期報告神器" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "報告汪｜定期報告神器，1 分鐘完成例行報告",
    description: "複製上期報告當模板，AI 修改差異，標籤管理。現在完全免費。",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "https://reportwang.com" },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

// 中文襯線標題字體 — see DESIGN.md
// CJK 字體不支援 latin subset 預載，用 preload: false 讓瀏覽器完整使用字形集
const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  display: "swap",
  preload: false,
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={`${geistSans.className} ${notoSerifTC.variable} antialiased`}>
        {/* JSON-LD 結構化資料 — 放 body 內符合 HTML 規範，Google 爬蟲仍可讀取 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: mergeJsonLdGraph(organizationJsonLd(), websiteWithSearchJsonLd()),
          }}
        />
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HVVZ9LQR8F"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HVVZ9LQR8F');
          `}
        </Script>
        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4360751609946942"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
