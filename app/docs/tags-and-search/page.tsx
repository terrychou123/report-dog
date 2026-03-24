import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { techArticleJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "標籤分類與搜尋",
  description: "報告汪標籤分類與全文搜尋教學：建立標籤、為報告加標籤、篩選搜尋，各長照機構標籤策略建議。",
  alternates: { canonical: "https://reportwang.com/docs/tags-and-search" },
  openGraph: {
    title: "標籤分類與搜尋｜報告汪教學",
    description: "用標籤管理長照報告，篩選、搜尋一秒找到目標報告。",
    url: "https://reportwang.com/docs/tags-and-search",
  },
};

const tagStrategies = [
  {
    institution: "居服機構",
    tags: ["居服員姓名", "服務個案", "日誌類型（日誌／週報）", "月份", "繳交狀態（已繳／未繳）"],
    tip: "以居服員名稱為主標籤，快速追蹤每人繳交進度",
  },
  {
    institution: "日照中心",
    tags: ["活動類型（認知／運動／藝術）", "評鑑類別", "送審必備", "個案姓名", "月份"],
    tip: "建立「送審必備」標籤群組，評鑑前一鍵匯整所需文件",
  },
  {
    institution: "住宿型長照機構",
    tags: ["職類（護理／社工／照服）", "報告類型（月報／季報）", "樓層或房間", "月份"],
    tip: "依職類設標籤，協作月報時各職類自行管理分區",
  },
  {
    institution: "醫院護理部",
    tags: ["班別（日班／夜班／小夜）", "病房", "交班類型", "月份"],
    tip: "班別標籤讓護理長一眼看出哪個班的交班紀錄待確認",
  },
];

export default function TagsAndSearchPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: techArticleJsonLd("標籤分類與搜尋｜報告汪教學", "長照機構使用報告汪標籤系統分類與搜尋報告的完整教學", "/docs/tags-and-search") }} />

      <Badge variant="outline" className="mb-4 not-prose">核心功能</Badge>
      <h1>標籤分類與搜尋</h1>
      <p className="lead">
        標籤是報告汪的核心整理工具。透過標籤分類，你可以在幾百份報告中瞬間找到目標文件，不再需要記憶檔名或翻找資料夾。
      </p>

      <h2>建立標籤</h2>
      <ol>
        <li>點擊左側「標籤管理」或頂部標籤圖示</li>
        <li>點擊「新增標籤」輸入標籤名稱（例如：「週報」、「A個案」）</li>
        <li>選擇標籤顏色（可選，方便視覺區分）</li>
        <li>點擊確認完成建立</li>
      </ol>

      <h2>為報告加標籤</h2>
      <ol>
        <li>開啟任一報告</li>
        <li>點擊報告標題旁的「標籤」按鈕或右側標籤區域</li>
        <li>從下拉清單選擇已有標籤，或輸入新標籤名稱</li>
        <li>一份報告可加多個標籤</li>
        <li>標籤即時儲存，無需額外點擊儲存</li>
      </ol>

      <h2>篩選報告</h2>
      <ol>
        <li>在報告列表頁，點擊左側標籤名稱</li>
        <li>系統顯示所有含該標籤的報告</li>
        <li>可同時選擇多個標籤進行交集篩選</li>
        <li>點擊「清除篩選」返回全部報告</li>
      </ol>

      <h2>全文搜尋</h2>
      <ol>
        <li>點擊頂部搜尋欄（或按 Ctrl+K / Cmd+K）</li>
        <li>輸入關鍵字，系統即時搜尋所有報告的標題與內文</li>
        <li>搜尋結果以相關度排序，關鍵字高亮顯示</li>
        <li>可結合標籤篩選進一步縮小範圍</li>
      </ol>

      <h2>各機構標籤策略建議</h2>
      <div className="not-prose grid grid-cols-1 gap-4 my-6">
        {tagStrategies.map(({ institution, tags, tip }) => (
          <Card key={institution} className="p-5">
            <p className="font-semibold text-sm mb-2">{institution}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-normal">{tag}</Badge>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">💡 {tip}</p>
          </Card>
        ))}
      </div>

      <h2>相關教學</h2>
      <ul>
        <li><Link href="/docs/copy-and-templates">複製報告：標籤搭配複製功能建立月報工作流程</Link></li>
        <li><Link href="/docs/scenarios">使用情境：看各機構如何活用標籤管理文書</Link></li>
      </ul>
    </article>
  );
}
