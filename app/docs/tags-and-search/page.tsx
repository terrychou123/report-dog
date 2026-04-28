import type { Metadata } from "next";
import Image from "next/image";
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

      <h2>標籤頁面</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/tags-and-search-step1-tags.svg"
          alt="報告汪標籤頁面示意圖：左側 Sidebar 標籤項目為 active，主區顯示標籤卡片列表，每張卡片有 TagIcon、標籤名稱、報告數量徽章，展開後顯示屬於該標籤的報告清單"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          標籤頁面：點擊左側「標籤」進入，可新建標籤或展開查看各標籤下的報告
        </figcaption>
      </figure>

      <h3>建立標籤</h3>
      <ol>
        <li>點擊左側 Sidebar「<strong>標籤</strong>」進入標籤管理頁</li>
        <li>點擊右上角「<strong>+ 新建標籤</strong>」，輸入標籤名稱（例如：「週報」、「個案A」）</li>
        <li>點擊確認完成建立</li>
      </ol>

      <h3>為報告加標籤</h3>
      <ol>
        <li>開啟任一報告，點擊標題下方的「<strong>+ 標籤</strong>」pill</li>
        <li>從清單選擇已有標籤，關聯即時儲存</li>
        <li>一份報告可加多個標籤</li>
      </ol>

      <h3>查看標籤下的報告</h3>
      <ol>
        <li>在標籤頁點擊任一標籤卡片右側的數字徽章，展開該標籤下的所有報告</li>
        <li>或點擊標籤卡片本身進入標籤詳情頁，查看完整報告清單</li>
      </ol>

      <h2>搜尋報告</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/tags-and-search-step2-search.svg"
          alt="報告汪報告頁面搜尋示意圖：搜尋框輸入「週報」，下方顯示含有「週報」關鍵字的報告卡片列表，每張卡片顯示標題、標籤與日期"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          搜尋框支援報告標題與標籤名稱關鍵字搜尋
        </figcaption>
      </figure>
      <ol>
        <li>前往「<strong>報告</strong>」頁面，點擊頁面頂部搜尋列</li>
        <li>輸入關鍵字，系統即時搜尋所有報告的<strong>標題</strong>與<strong>標籤名稱</strong></li>
        <li>清空搜尋列返回全部報告</li>
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
