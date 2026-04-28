import type { Metadata } from "next";
import Image from "next/image";
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
      <figure className="my-6 not-prose">
        <Image
          src="/docs/getting-started-step1-signup.svg"
          alt="報告汪註冊頁示意圖：表單包含電子郵件、密碼、再次輸入密碼三個欄位，填寫後點擊「註冊」按鈕完成建立"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          步驟一：填入三個欄位後點擊「註冊」完成帳號建立
        </figcaption>
      </figure>
      <ol>
        <li>前往 <Link href="/auth/sign-up">報告汪註冊頁面</Link></li>
        <li>輸入電子郵件與密碼，點擊「<strong>註冊</strong>」</li>
        <li>至信箱收取驗證信，點擊驗證連結完成帳號啟用</li>
        <li>返回登入頁，輸入帳號密碼登入</li>
      </ol>

      <h2>步驟二：認識操作介面</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/getting-started-step2-dashboard.svg"
          alt="報告汪「我的報告」頁面示意圖：左側為通知、報告、標籤、追蹤、與我分享五個分頁，主內容為標題列、搜尋框與右上角「+ 上傳報告」、「匯入評鑑範本」按鈕"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          步驟二：登入後主畫面，右上角「+ 上傳報告」新增第一份報告
        </figcaption>
      </figure>
      <p>登入後，你會看到「我的報告」頁面，主要區域如下：</p>
      <ul>
        <li><strong>左側功能列</strong>：通知、報告、標籤、追蹤、與我分享，點擊切換不同分頁</li>
        <li><strong>右上工具列</strong>：「<strong>+ 上傳報告</strong>」開啟上傳 Modal、「匯入評鑑範本」可一鍵套用機構範本</li>
        <li><strong>搜尋列</strong>：依關鍵字搜尋報告標題或標籤</li>
        <li><strong>報告卡片</strong>：每張卡片顯示標題、字數、上傳日期與相關標籤；點擊卡片進入編輯</li>
      </ul>

      <h2>步驟三：建立第一份報告</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/getting-started-step3-create.svg"
          alt="報告汪「上傳報告」Modal 示意圖：含「上傳檔案」與「手動輸入」兩個 Tab，上傳區支援 .doc / .docx (Word) 及 .xlsx / .xls (Excel) 多檔同時上傳，底部「上傳並建立報告」按鈕"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          步驟三：選擇輸入方式後點擊「上傳並建立報告」完成建立
        </figcaption>
      </figure>
      <ol>
        <li>點擊右上角「<strong>+ 上傳報告</strong>」開啟上傳 Modal</li>
        <li>選擇輸入方式：
          <ul>
            <li><strong>上傳檔案</strong>（預設）：拖曳或點擊上傳 <strong>.doc / .docx</strong>（Word）或 <strong>.xlsx / .xls</strong>（Excel）檔案，支援多檔同時上傳，標題會自動帶入檔名</li>
            <li><strong>手動輸入</strong>：填寫「報告標題」與「報告內容」欄位，從空白開始撰寫</li>
          </ul>
        </li>
        <li>點擊「<strong>上傳並建立報告</strong>」（檔案模式）或「<strong>儲存報告</strong>」（手動模式）完成建立，系統自動跳轉至報告編輯頁</li>
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
