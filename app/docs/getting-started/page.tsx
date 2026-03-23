import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { techArticleJsonLd } from "@/lib/jsonld";
import { DocsTip } from "@/components/docs/docs-tip";

export const metadata: Metadata = {
  title: "快速開始",
  description: "三步驟完成報告汪帳號設定並建立第一份報告，適合長照機構社工、護理師、照服員快速上手。",
  alternates: { canonical: "https://reportwang.com/docs/getting-started" },
  openGraph: {
    title: "快速開始｜報告汪教學",
    description: "三步驟完成報告汪設定，10 分鐘內建立第一份 AI 文書。",
    url: "https://reportwang.com/docs/getting-started",
  },
};

export default function GettingStartedPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: techArticleJsonLd("快速開始｜報告汪教學", "三步驟完成報告汪帳號設定並建立第一份報告", "/docs/getting-started") }} />

      <Badge variant="outline" className="mb-4 not-prose">入門</Badge>
      <h1>快速開始</h1>
      <p className="lead">
        歡迎使用報告汪！這份指南帶你在 10 分鐘內完成帳號設定，並建立第一份 AI 文書報告。
      </p>

      <h2>步驟一：註冊帳號</h2>
      <ol>
        <li>前往 <Link href="/auth/sign-up">報告汪註冊頁面</Link></li>
        <li>輸入電子郵件與密碼，點擊「立即註冊」</li>
        <li>至信箱收取驗證信，點擊驗證連結完成帳號啟用</li>
        <li>返回登入頁，輸入帳號密碼登入</li>
      </ol>

      <h2>步驟二：認識操作介面</h2>
      <p>登入後，你會看到以下主要區域：</p>
      <ul>
        <li><strong>報告列表</strong>：左側或頂部顯示所有報告，可依標籤篩選</li>
        <li><strong>編輯區</strong>：中央主要區域，顯示報告內容，點擊段落可啟動 AI 修改</li>
        <li><strong>標籤面板</strong>：右側或側欄管理標籤分類</li>
        <li><strong>搜尋列</strong>：頂部搜尋欄，支援全文搜尋</li>
      </ul>

      <h2>步驟三：建立第一份報告</h2>
      <ol>
        <li>點擊「新增報告」或「＋」按鈕</li>
        <li>輸入報告標題（例如：「3月份居服日誌」）</li>
        <li>選擇建立方式：
          <ul>
            <li><strong>貼上文字</strong>：將現有文字貼入編輯器</li>
            <li><strong>上傳 .doc 檔</strong>：直接上傳 Word 文件</li>
            <li><strong>手動輸入</strong>：從空白報告開始撰寫</li>
          </ul>
        </li>
        <li>點擊「儲存」完成建立</li>
      </ol>

      <DocsTip variant="neutral" title="💡 小提示" className="mt-8">
        建立報告後，記得加上標籤分類（例如：「週報」、「日照」），方便之後篩選查找。
        詳細說明請見 <Link href="/docs/tags-and-search" className="underline hover:text-primary">標籤分類與搜尋</Link>。
      </DocsTip>

      <h2>下一步</h2>
      <ul>
        <li><Link href="/docs/create-report">建立報告：所有建立方式詳細說明</Link></li>
        <li><Link href="/docs/ai-editing">AI 段落修改：讓 AI 幫你修改報告內容</Link></li>
        <li><Link href="/docs/tags-and-search">標籤分類與搜尋：整理你的報告庫</Link></li>
      </ul>
    </article>
  );
}
