import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DownloadIcon, FileSpreadsheetIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Excel 自我檢核表下載 | 報告汪",
  description:
    "免費下載各長照機構評鑑 Excel 自我檢核表，包含日間照顧中心、住宿型長照機構、居家護理所、產後護理之家等多種機構類型。",
};

type DownloadItem = {
  slug: string;
  name: string;
  description: string;
  file: string;
};

const DOWNLOADS: DownloadItem[] = [
  {
    slug: "day-care",
    name: "日間照顧中心",
    description: "日照機構評鑑自我檢核，含備審文件清單與查核項目。",
    file: "day-care.xlsx",
  },
  {
    slug: "disability",
    name: "身心障礙福利機構",
    description: "身心障礙福利機構評鑑自我檢核表，適用各類評鑑準備作業。",
    file: "disability.xlsx",
  },
  {
    slug: "residential",
    name: "住宿型長照機構",
    description: "住宿型長照機構評鑑自我檢核，涵蓋護理品質與環境安全查核項目。",
    file: "residential.xlsx",
  },
  {
    slug: "general-nursing-home",
    name: "一般護理之家",
    description: "一般護理之家評鑑自我檢核表，含完整評分指標與說明。",
    file: "general-nursing-home.xlsx",
  },
  {
    slug: "home-nursing",
    name: "居家護理所",
    description: "居家護理所評鑑自我檢核，適用居家訪視紀錄與品質管控。",
    file: "home-nursing.xlsx",
  },
  {
    slug: "home-care",
    name: "居家長照機構",
    description: "居家長照服務機構評鑑自我檢核，含服務流程與文件查核。",
    file: "home-care.xlsx",
  },
  {
    slug: "babycare",
    name: "產後護理之家",
    description: "產後護理之家評鑑自我檢核表，適用母嬰照護品質評估。",
    file: "babycare.xlsx",
  },
  {
    slug: "hospital",
    name: "醫院評鑑",
    description: "醫院評鑑自我檢核表，涵蓋醫療品質與病人安全查核項目。",
    file: "hospital.xlsx",
  },
];

export default function DownloadsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            免費資源下載
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Excel 自我檢核表下載
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            提供各類長照機構評鑑 Excel
            自我檢核表，可直接下載使用，協助機構完整準備評鑑作業。
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
                {/* 使用 <a> 而非 <Link>：Next.js Link 不支援 download 屬性 */}
                <a
                  href={`/downloads/${item.file}`}
                  download
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-4 py-2 rounded-lg font-medium text-sm"
                >
                  <DownloadIcon className="h-4 w-4" />
                  下載 Excel
                </a>
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
