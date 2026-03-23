import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { techArticleJsonLd } from "@/lib/jsonld";
import { DocsTip } from "@/components/docs/docs-tip";

export const metadata: Metadata = {
  title: "建立報告",
  description: "報告汪建立報告教學：貼上文字、上傳 .doc 檔案、手動輸入三種方式，適合長照機構各類行政文書。",
  alternates: { canonical: "https://reportwang.com/docs/create-report" },
  openGraph: {
    title: "建立報告｜報告汪教學",
    description: "三種方式建立長照文書報告：貼上文字、上傳 Word 檔、或從空白開始。",
    url: "https://reportwang.com/docs/create-report",
  },
};

export default function CreateReportPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: techArticleJsonLd("建立報告｜報告汪教學", "報告汪建立報告三種方式詳細說明", "/docs/create-report") }} />

      <Badge variant="outline" className="mb-4 not-prose">入門</Badge>
      <h1>建立報告</h1>
      <p className="lead">
        報告汪支援三種方式建立報告，無論你手邊的資料是什麼格式，都能快速匯入。
      </p>

      <h2>方式一：貼上文字</h2>
      <p>最快速的建立方式，適合已有現成文字內容的情況：</p>
      <ol>
        <li>點擊「新增報告」</li>
        <li>在標題欄輸入報告名稱</li>
        <li>在編輯區直接貼上（Ctrl+V / Cmd+V）文字內容</li>
        <li>系統會自動依照段落分段，方便後續 AI 修改</li>
        <li>點擊「儲存」完成建立</li>
      </ol>

      <h2>方式二：上傳 .doc 檔案</h2>
      <p>適合有現成 Word 文件的情況：</p>
      <ol>
        <li>點擊「新增報告」→「上傳檔案」</li>
        <li>選擇 .doc 或 .docx 格式的 Word 文件</li>
        <li>系統自動解析文件內容，轉換為可編輯的報告格式</li>
        <li>確認內容後點擊「儲存」</li>
      </ol>

      <DocsTip variant="warning" title="⚠️ 個人資料提醒" className="my-4">
        上傳含有個案個人資料的文件前，請確認已取得必要授權或進行去識別化處理。
      </DocsTip>

      <h2>方式三：手動輸入</h2>
      <p>從空白開始撰寫，適合新格式或全新文件：</p>
      <ol>
        <li>點擊「新增報告」→「空白報告」</li>
        <li>在標題欄輸入報告名稱</li>
        <li>在編輯區直接輸入內容，可隨時使用 AI 協助撰寫</li>
        <li>點擊「儲存」</li>
      </ol>

      <h2>設定標題與儲存</h2>
      <ul>
        <li><strong>標題命名建議</strong>：包含機構名稱、報告類型、時間區間，例如「2025年3月 A個案服務計畫」</li>
        <li><strong>自動儲存</strong>：編輯中系統每隔 30 秒自動儲存草稿</li>
        <li><strong>手動儲存</strong>：點擊「儲存」按鈕或使用 Ctrl+S / Cmd+S</li>
      </ul>

      <h2>相關教學</h2>
      <ul>
        <li><Link href="/docs/ai-editing">AI 段落修改：建立報告後讓 AI 幫你潤稿</Link></li>
        <li><Link href="/docs/tags-and-search">標籤分類：為報告加上分類標籤</Link></li>
        <li><Link href="/docs/copy-and-templates">複製報告：從現有報告快速建立新報告</Link></li>
      </ul>
    </article>
  );
}
