import type { Metadata } from "next";
import { StartButton } from "@/components/start-button";
import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "報告汪｜長照機構 AI 文書管理・報告生成・評鑑備審，居服・住宿型長照機構・醫院護理部適用",
  description:
    "報告汪是專為長照機構設計的 AI 文書管理系統，支援居服機構、醫院護理部、住宿型長照機構三大族群。透過智慧標籤分類、拖曳排序、AI 輔助撰寫，快速整理日誌、評鑑報告與個案記錄。多職類協作，評鑑備審文件一鍵彙整，不再臨時找不到報告。立即免費試用。",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "報告汪｜長照機構 AI 文書管理・報告生成・評鑑備審，居服・住宿型長照機構・醫院護理部適用",
    description: "報告汪是專為長照機構設計的 AI 文書管理系統，支援居服機構、醫院護理部、住宿型長照機構三大族群。透過智慧標籤分類、拖曳排序、AI 輔助撰寫，快速整理日誌、評鑑報告與個案記錄。多職類協作，評鑑備審文件一鍵彙整，不再臨時找不到報告。立即免費試用。",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "報告汪 - 定期報告神器" }],
  },
  twitter: {
    title: "報告汪｜長照機構 AI 文書管理・報告生成・評鑑備審，居服・住宿型長照機構・醫院護理部適用",
    description: "報告汪是專為長照機構設計的 AI 文書管理系統，支援居服機構、醫院護理部、住宿型長照機構三大族群。透過智慧標籤分類、拖曳排序、AI 輔助撰寫，快速整理日誌、評鑑報告與個案記錄。多職類協作，評鑑備審文件一鍵彙整，不再臨時找不到報告。立即免費試用。",
    images: ["/og-image.png"],
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

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

      <Footer />
    </main>
  );
}
