import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { techArticleJsonLd } from "@/lib/jsonld";
import { DocsTip } from "@/components/docs/docs-tip";

export const metadata: Metadata = {
  title: "複製報告與模板",
  description: "報告汪複製報告與模板教學：一鍵複製上期報告、修改差異段落工作流程、建立個人模板庫。",
  alternates: { canonical: "/docs/copy-and-templates" },
  openGraph: {
    title: "複製報告與模板｜報告汪教學",
    description: "複製上期報告再用 AI 更新差異，長照月報從 2 小時縮短到 15 分鐘。",
    url: "https://reportwang.com/docs/copy-and-templates",
  },
};

export default function CopyAndTemplatesPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: techArticleJsonLd("複製報告與模板｜報告汪教學", "一鍵複製長照報告並用 AI 更新差異段落的完整工作流程", "/docs/copy-and-templates") }} />

      <Badge variant="outline" className="mb-4 not-prose">核心功能</Badge>
      <h1>複製報告與模板</h1>
      <p className="lead">
        定期報告（週報、月報、季報）的結構大同小異。複製上期報告後，只需用 AI 修改有異動的段落，大幅節省重複排版的時間。
      </p>

      <h2>一鍵複製上期報告</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/copy-and-templates-step1-copy.svg"
          alt="報告汪報告列表示意圖：「2025年3月 居服月報」卡片右側的複製圖示按鈕以橘色虛線框高亮，下方出現「2025年3月 居服月報（副本）」藍色虛線卡片，顯示「✓ 複製完成，可修改標題與內容」"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          點擊報告卡片右側的複製圖示，系統立即建立一份內容相同的副本
        </figcaption>
      </figure>
      <ol>
        <li>在報告列表找到上期報告（可用標籤篩選快速定位）</li>
        <li>點擊報告卡片右側的複製圖示按鈕（📋），系統立即建立一份相同內容的副本</li>
        <li>開啟副本，修改報告標題（例如：「4月份居服月報」）</li>
        <li>為新報告加上對應月份的標籤</li>
      </ol>

      <h2>修改差異段落工作流程</h2>
      <p>複製後的報告，只需更新有變動的部分：</p>
      <ol>
        <li>找到需要更新的段落（例如：本月服務人次、活動場次）</li>
        <li>點擊該段落，啟動 AI 修改</li>
        <li>輸入指令：「服務人次從 18 改成 21，服務時數從 135 改成 148」</li>
        <li>確認 AI 修改結果後套用</li>
        <li>重複步驟，逐段更新有變動的內容</li>
        <li>完成後儲存新月報</li>
      </ol>

      <DocsTip variant="info" title="📊 時間效益" className="my-6">
        複製上期報告 + AI 更新差異，月報撰寫時間從平均 2 小時縮短到 15 分鐘。
        詳見 <Link href="/docs/scenarios" className="underline hover:text-primary">使用情境：社工月報產出</Link>。
      </DocsTip>

      <h2>建立個人模板庫</h2>
      <p>對於格式固定的報告類型，可建立專用模板：</p>
      <ol>
        <li>建立一份填好通用內容的報告（留下可替換的佔位文字，例如：「【本月服務人次】」）</li>
        <li>為此報告加上「模板」標籤，方便識別</li>
        <li>每次需要時，複製這份模板報告</li>
        <li>用 AI 修改替換佔位文字為實際數據</li>
      </ol>

      <h2>模板命名建議</h2>
      <ul>
        <li><strong>加上「模板」字樣</strong>：「居服月報模板 2025」「個案服務計畫模板」</li>
        <li><strong>加上版本日期</strong>：避免新舊版模板混淆</li>
        <li><strong>固定標籤</strong>：所有模板加「模板」標籤，方便統一管理</li>
      </ul>

      <h2>相關教學</h2>
      <ul>
        <li><Link href="/docs/ai-editing">AI 段落修改：複製後如何用 AI 更新差異段落</Link></li>
        <li><Link href="/docs/tags-and-search">標籤分類：用標籤快速找到上期報告</Link></li>
        <li><Link href="/docs/scenarios">使用情境：實際案例中的複製報告工作流程</Link></li>
      </ul>
    </article>
  );
}
