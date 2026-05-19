import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { techArticleJsonLd } from "@/lib/jsonld";
import { DocsTip } from "@/components/docs/docs-tip";

export const metadata: Metadata = {
  title: "版本歷史與共享",
  description: "報告汪版本歷史與報告共享教學：查看歷史版本、還原版本、產生唯讀分享連結與成員管理。",
  robots: { index: false, follow: false },
  alternates: { canonical: "/docs/version-history" },
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
        每次手動儲存與 AI 修改都會記錄一個版本。儲存時可選填一句修改摘要，方便日後在版本歷史中快速辨認每個版本的差異，並隨時還原到特定時間點。
        同時支援產生唯讀分享連結，讓主管或同事快速查閱報告。
      </p>

      <h2>儲存版本（填寫修改摘要）</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/version-history-step0-save.svg"
          alt="報告汪「儲存版本」對話框示意圖：標題列顯示磁碟圖示與「儲存版本」文字，下方說明「簡述本次修改重點，方便日後辨認版本（選填）」，輸入框 placeholder「例：新增個案意見反映機制說明」，底部「取消」與「儲存」按鈕"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          儲存時可選填一句修改摘要，會顯示在版本歷史卡片，幫你回想每個版本改了什麼
        </figcaption>
      </figure>
      <ol>
        <li>編輯報告後，點擊編輯器右上角的「<strong>儲存</strong>」按鈕</li>
        <li>對話框彈出「儲存版本」，於輸入框填寫一句修改重點（200 字內），例如「新增個案意見反映機制說明」</li>
        <li>按 Enter 或點擊「<strong>儲存</strong>」即完成；摘要留白也可以儲存（卡片會顯示「（未填寫摘要）」）</li>
      </ol>

      <DocsTip variant="info" title="💡 摘要寫什麼最好？" className="my-6">
        建議用一句話描述「這次主要動了什麼」，例如「修正服務人次數據」、「依督導意見補充活動辦理情形」。
        日後翻歷史版本時，光看摘要就能找到要還原的時點，不必逐版開啟比對。
      </DocsTip>

      <h2>查看版本歷史</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/version-history-step1-dialog.svg"
          alt="報告汪「版本歷史」對話框示意圖：標題列顯示時鐘圖示與「版本歷史」文字，副標「免費用戶僅保存最新的五筆資料」，列出版本 #3、版本 #2、版本 #1 三張卡片，每張顯示版本號與時間（同一行）、修改摘要與「還原此版本」按鈕（藍色外框）"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          版本歷史依時間倒序列出，每張卡片顯示版本號、儲存時間與修改摘要
        </figcaption>
      </figure>
      <ol>
        <li>開啟任一報告</li>
        <li>點擊右上角時鐘圖示（版本歷史）</li>
        <li>對話框彈出，每張卡片由上而下顯示：版本號＋儲存時間 → 修改摘要 → 還原此版本按鈕</li>
        <li>版本列表依時間倒序排列（最新在上）</li>
      </ol>

      <h2>還原版本</h2>
      <ol>
        <li>在版本歷史面板中找到要還原的版本（依摘要文字辨識）</li>
        <li>點擊該版本的「<strong>還原此版本</strong>」按鈕</li>
        <li>報告內容立即還原至選取的歷史版本，記得隨即點「儲存」並填寫摘要（例如「還原至 03/28 版本」）以保留還原紀錄</li>
      </ol>

      <DocsTip variant="info" title="💡 免費版版本保留說明" className="my-6">
        免費版本僅保留最新 5 個版本，較舊的版本會自動清除。如需更長的版本歷史，請升級至付費方案。
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
