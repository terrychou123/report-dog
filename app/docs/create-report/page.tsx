import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { techArticleJsonLd } from "@/lib/jsonld";
import { DocsTip } from "@/components/docs/docs-tip";

export const metadata: Metadata = {
  title: "建立報告",
  description: "報告汪建立報告教學：上傳 Word／Excel 檔案或手動輸入兩種方式，適合長照機構各類行政文書。",
  alternates: { canonical: "https://reportwang.com/docs/create-report" },
  openGraph: {
    title: "建立報告｜報告汪教學",
    description: "兩種方式建立長照文書報告：上傳 Word／Excel 檔，或手動填寫標題與內容。",
    url: "https://reportwang.com/docs/create-report",
  },
};

export default function CreateReportPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: techArticleJsonLd("建立報告｜報告汪教學", "報告汪建立報告兩種方式詳細說明", "/docs/create-report") }} />

      <Badge variant="outline" className="mb-4 not-prose">入門</Badge>
      <h1>建立報告</h1>
      <p className="lead">
        點擊右上角「<strong>+ 上傳報告</strong>」即可開啟建立視窗，支援兩種方式：上傳現有檔案或手動輸入內容。
      </p>

      <h2>方式一：上傳檔案</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/create-report-step1-upload.svg"
          alt="報告汪「上傳報告」Modal 示意圖：上傳檔案 Tab，虛線拖曳區支援 .doc / .docx（Word）及 .xlsx / .xls（Excel），可多檔同時上傳，底部「上傳並建立報告」按鈕"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          方式一：拖曳或點擊上傳 Word／Excel 檔，可多檔同時上傳
        </figcaption>
      </figure>
      <p>適合有現成 Word 或 Excel 文件的情況：</p>
      <ol>
        <li>點擊右上角「<strong>+ 上傳報告</strong>」，選擇「<strong>上傳檔案</strong>」分頁（預設）</li>
        <li>拖曳或點擊上傳區，選取 <strong>.doc / .docx</strong>（Word）或 <strong>.xlsx / .xls</strong>（Excel）檔案，支援多檔同時上傳，標題會自動帶入檔名</li>
        <li>確認檔案清單後點擊「<strong>上傳並建立報告</strong>」，系統自動解析並建立報告</li>
      </ol>

      <DocsTip variant="warning" title="⚠️ 個人資料提醒" className="my-4">
        上傳含有個案個人資料的文件前，請確認已取得必要授權或進行去識別化處理。本平台不負任何法律責任。
      </DocsTip>

      <h2>方式二：手動輸入</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/create-report-step2-manual.svg"
          alt="報告汪「上傳報告」Modal 示意圖：手動輸入 Tab，含「報告標題」輸入框（placeholder：例如：初始評估報告、追蹤記錄 2024/01）與「報告內容」文字區，底部「儲存報告」按鈕"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          方式二：填寫標題與內容（可貼上現有文字），點擊「儲存報告」完成建立
        </figcaption>
      </figure>
      <p>適合從空白開始撰寫，或想直接貼上現有文字的情況：</p>
      <ol>
        <li>點擊右上角「<strong>+ 上傳報告</strong>」，切換至「<strong>手動輸入</strong>」分頁</li>
        <li>在「<strong>報告標題</strong>」欄填入名稱（建議包含報告類型與時間，例如「2025年3月 A個案服務計畫」）</li>
        <li>在「<strong>報告內容</strong>」區貼上或輸入文字內容</li>
        <li>點擊「<strong>儲存報告</strong>」完成建立</li>
      </ol>

      <h2>相關教學</h2>
      <ul>
        <li><Link href="/docs/ai-editing">AI 段落修改：建立報告後讓 AI 幫你潤稿</Link></li>
        <li><Link href="/docs/tags-and-search">標籤分類：為報告加上分類標籤</Link></li>
        <li><Link href="/docs/copy-and-templates">複製報告：從現有報告快速建立新報告</Link></li>
      </ul>
    </article>
  );
}
