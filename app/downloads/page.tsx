import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheetIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { DOWNLOADS } from "@/lib/downloads/catalog";
import { DownloadGateDialog } from "@/components/downloads/download-gate-dialog";

export const metadata: Metadata = {
  title: "各類長照機構評鑑自我檢查表免費下載 | 報告汪",
  description:
    "免費下載各長照機構評鑑 Excel 自我檢核表，包含日間照顧中心、住宿型長照機構、居家護理所、產後護理之家等多種機構類型。",
  alternates: { canonical: "/downloads" },
};

const SCHOOL_LINKS: Record<string, string> = {
  "day-care": "/school/daycare",
  "residential": "/school/nursing-home",
  "general-nursing-home": "/school/general-nursing-home",
  "home-nursing": "/school/home-nursing",
  "home-care": "/school/home-care",
  "babycare": "/school/postpartum-care",
  "hospital": "/school/hospital",
  "psychiatric-nursing-home": "/school/psychiatric-nursing-home",
  "youth-care": "/school/youth-care",
  "elderly-welfare": "/school/elderly-welfare",
  "disability-welfare": "/school/disability-welfare",
  "infant-daycare": "/school/infant-daycare",
  "psychiatric-rehabilitation-institution": "/school/psychiatric-rehabilitation-institution",
};

export default function DownloadsPage() {
  const itemListJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "長照機構評鑑自我檢查表下載清單",
    description: "各類長照機構評鑑 Excel 自我檢核表免費下載",
    url: "https://reportwang.com/downloads",
    numberOfItems: DOWNLOADS.length,
    itemListElement: DOWNLOADS.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${item.name}評鑑自我檢核表`,
      description: item.description,
      url: `https://reportwang.com/downloads`,
    })),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: itemListJsonLd }} />
      <Navbar />
      <main className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            免費資源下載
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            各類長照機構評鑑自我檢查表免費下載
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            此文件由AI參考評鑑準則自動產生 非官方文件 內容僅供參考
          </p>
        </div>

        {/* Download cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DOWNLOADS.map((item) => (
            <Card
              key={item.slug}
              className="flex flex-col border hover:border-primary/50 transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <FileSpreadsheetIcon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{item.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 gap-4">
                <p className="text-sm text-muted-foreground flex-1">
                  {item.description}
                </p>
                {SCHOOL_LINKS[item.slug] && (
                  <Link
                    href={SCHOOL_LINKS[item.slug]}
                    className="text-xs text-primary hover:underline"
                    title={`${item.name}評鑑基準完整教學`}
                  >
                    → {item.name}評鑑基準教學
                  </Link>
                )}
                <DownloadGateDialog
                  file={item}
                  trigger={
                    <button type="button" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-4 py-2 rounded-lg font-medium text-sm w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <FileSpreadsheetIcon className="h-4 w-4" />
                      下載 Excel
                    </button>
                  }
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-muted-foreground mt-10">
          檔案為 .xlsx 格式，可使用 Microsoft Excel 或 Google 試算表開啟。
          <br />
          如有問題或需要其他機構類型，歡迎{" "}
          <Link href="/#contact" className="underline underline-offset-4">
            聯絡我們
          </Link>
          。
        </p>
      </div>
    </main>
    <Footer />
    </>
  );
}
