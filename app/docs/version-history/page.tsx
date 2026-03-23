import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { techArticleJsonLd } from "@/lib/jsonld";
import { DocsTip } from "@/components/docs/docs-tip";

export const metadata: Metadata = {
  title: "版本歷史與共享",
  description: "報告汪版本歷史與報告共享教學：查看歷史版本、還原版本、產生唯讀分享連結與成員管理。",
  alternates: { canonical: "https://reportwang.com/docs/version-history" },
  openGraph: {
    title: "版本歷史與共享｜報告汪教學",
    description: "查看報告每次修改的歷史版本，隨時還原，並產生唯讀連結與他人共享。",
    url: "https://reportwang.com/docs/version-history",
  },
};

export default function VersionHistoryPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: techArticleJsonLd("版本歷史與共享｜報告汪教學", "報告汪版本歷史查看、還原與報告共享功能完整教學", "/docs/version-history") }} />

      <Badge variant="outline" className="mb-4 not-prose">核心功能</Badge>
      <h1>版本歷史與共享</h1>
      <p className="lead">
        每次儲存與 AI 修改都會自動記錄版本。你可以隨時查看過去的任何版本，或還原到特定時間點。
        同時支援產生唯讀分享連結，讓主管或同事快速查閱報告。
      </p>

      <h2>查看版本歷史</h2>
      <ol>
        <li>開啟任一報告</li>
        <li>點擊右上角「版本歷史」或時鐘圖示</li>
        <li>右側滑出版本列表，顯示每個版本的時間戳記與修改摘要</li>
        <li>點擊任一版本可預覽該版本的完整內容</li>
        <li>版本列表依時間倒序排列（最新在上）</li>
      </ol>

      <h2>還原版本</h2>
      <ol>
        <li>在版本歷史面板中找到要還原的版本</li>
        <li>點擊該版本的「還原」按鈕</li>
        <li>確認還原操作（目前版本會先自動儲存為新版本，以防誤操作）</li>
        <li>報告內容還原至選取的歷史版本</li>
      </ol>

      <DocsTip variant="info" title="💡 免費版版本保留說明" className="my-6">
        免費版本保留最近 10 個版本。如需更長的版本歷史，請升級至付費方案。
        詳見 <Link href="/pricing" className="underline hover:text-primary">價格方案</Link>。
      </DocsTip>

      <h2>分享報告（唯讀模式）</h2>
      <p>產生唯讀分享連結，讓未登入的人也能查閱報告：</p>
      <ol>
        <li>開啟要分享的報告</li>
        <li>點擊右上角「分享」按鈕</li>
        <li>選擇「產生分享連結」</li>
        <li>複製連結傳給對方</li>
        <li>收到連結的人無需登入即可以唯讀模式查閱（無法編輯）</li>
        <li>可隨時在分享設定中「停用連結」來取消存取權</li>
      </ol>

      <h2>成員管理</h2>
      <p>同一機構的多人可共用報告汪帳號空間：</p>
      <ul>
        <li><strong>邀請成員</strong>：至帳號設定 → 成員管理 → 輸入電子郵件邀請</li>
        <li><strong>權限設定</strong>：管理員可新增／刪除／編輯所有報告；一般成員僅能編輯自己建立的報告</li>
        <li><strong>報告歸屬</strong>：每份報告顯示建立者，方便追蹤責任</li>
      </ul>

      <h2>相關教學</h2>
      <ul>
        <li><Link href="/docs/ai-editing">AI 段落修改：每次 AI 修改都會自動存版本</Link></li>
        <li><Link href="/docs/copy-and-templates">複製報告：複製不影響原報告的版本歷史</Link></li>
      </ul>
    </article>
  );
}
