import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { techArticleJsonLd } from "@/lib/jsonld";
import { DocsTip } from "@/components/docs/docs-tip";

export const metadata: Metadata = {
  title: "AI 評鑑分析",
  description: "報告汪 AI 評鑑分析教學：上傳長照報告資料，AI 五維度評鑑分析，協助居服、日照、住宿型長照機構評鑑備審。",
  alternates: { canonical: "/docs/evaluation" },
  openGraph: {
    title: "AI 評鑑分析｜報告汪教學",
    description: "AI 自動分析長照評鑑報告五大維度，評鑑季備審更有把握。",
    url: "https://reportwang.com/docs/evaluation",
  },
};

const dimensions = [
  { name: "服務品質", desc: "分析服務紀錄的完整性、一致性與專業用語合規度" },
  { name: "個案管理", desc: "評估個案資料記錄的完整程度與更新頻率" },
  { name: "活動規劃", desc: "檢視活動設計多樣性、紀錄完整度與成效記載" },
  { name: "文書完整性", desc: "確認必填欄位、簽名、日期等格式要求" },
  { name: "法規合規", desc: "對照長照法規要求，標記可能不符規範的內容" },
];

const institutions = [
  { name: "居服機構", items: ["服務紀錄完整度", "個案評估更新頻率", "居服員簽名完整性"] },
  { name: "日照中心", items: ["活動紀錄多樣性", "個案參與紀錄", "評鑑指標文件完整度"] },
  { name: "住宿型長照機構", items: ["護理評估記錄", "跨職類服務計畫", "住民權益保障記載"] },
  { name: "醫院護理部", items: ["交班紀錄完整度", "護理指導記錄", "病安事件紀錄格式"] },
];

export default function EvaluationPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: techArticleJsonLd("AI 評鑑分析｜報告汪教學", "長照機構使用報告汪 AI 評鑑分析功能的完整教學", "/docs/evaluation") }} />

      <Badge variant="outline" className="mb-4 not-prose">核心功能</Badge>
      <h1>AI 評鑑分析</h1>
      <p className="lead">
        評鑑季來臨前，用 AI 評鑑分析快速盤點文件完整度，找出可能扣分的弱點，讓備審工作更有方向。
      </p>

      <h2>什麼是 AI 評鑑分析</h2>
      <p>
        AI 評鑑分析是報告汪的進階功能，可上傳長照機構的服務紀錄、計畫書等文件，
        AI 依照長照服務法規與評鑑標準，從五個維度分析文件品質，並給出具體改善建議。
      </p>

      <h2>如何使用</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/evaluation-step1-panel.svg"
          alt="報告汪「報告 AI 分析」對話框示意圖：頂部橘色警告橫幅（AI 分析僅供參考），下方顯示已選取的報告標籤（3 份），機構類型下拉選單選取「日間照顧機構」，底部「開始分析」按鈕以橘色虛線框高亮，下方串流輸出分析結果"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          從報告列表點擊「報告分析」開啟分析對話框，選擇機構類型後 AI 即時串流輸出結果
        </figcaption>
      </figure>
      <ol>
        <li>在「報告」列表頁點擊右側「報告分析」按鈕，開啟 AI 分析對話框</li>
        <li>在對話框中選擇要分析的報告（支援選取多份）</li>
        <li>選擇機構類型（居服、日照、住宿型長照機構、醫院等），套用對應評鑑準則</li>
        <li>點擊「開始分析」，AI 以串流方式即時輸出分析結果</li>
        <li>查看分析建議，找出需要補強的文件項目</li>
        <li>依建議回到報告編輯，使用 AI 修改改善弱項</li>
      </ol>

      <h2>五維度分析結果</h2>
      <div className="not-prose grid grid-cols-1 gap-3 my-6">
        {dimensions.map(({ name, desc }, i) => (
          <Card key={name} className="p-4 flex items-start gap-4">
            <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {i + 1}
            </div>
            <div>
              <p className="font-semibold text-sm">{name}</p>
              <p className="text-muted-foreground text-sm mt-0.5">{desc}</p>
            </div>
          </Card>
        ))}
      </div>

      <DocsTip variant="warning" title="⚠️ 免責聲明" className="my-6">
        AI 評鑑分析結果僅供參考，不代表實際評鑑結果。正式評鑑由主管機關依據最新法規進行，
        請以衛生福利部公告之評鑑基準為準。建議搭配專業督導人員共同審閱分析結果。
      </DocsTip>

      <h2>各機構適用分析項目</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {institutions.map(({ name, items }) => (
          <Card key={name} className="p-4">
            <p className="font-semibold text-sm mb-2">{name}</p>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <h2>相關教學</h2>
      <ul>
        <li><Link href="/docs/ai-editing">AI 段落修改：根據評鑑建議改善報告內容</Link></li>
        <li><Link href="/docs/scenarios">使用情境：日照中心評鑑季備審文件彙整</Link></li>
        <li><Link href="/docs/tags-and-search">標籤分類：用「送審必備」標籤管理評鑑文件</Link></li>
      </ul>
    </article>
  );
}
