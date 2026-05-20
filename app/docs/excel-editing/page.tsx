import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { techArticleJsonLd, howToJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { DocsTip } from "@/components/docs/docs-tip";

export const metadata: Metadata = {
  title: "Excel 表格編輯",
  description: "報告汪 Excel 式表格編輯教學：在報告中插入表格、欄列操作、公式計算，並匯出 .xlsx 檔案。",
  alternates: { canonical: "/docs/excel-editing" },
  openGraph: {
    title: "Excel 表格編輯｜報告汪教學",
    description: "在長照報告中插入 Excel 式表格，支援公式計算與 .xlsx 匯出。",
    url: "https://reportwang.com/docs/excel-editing",
  },
};

export default function ExcelEditingPage() {
  const steps = [
    { name: "插入表格", text: "在報告編輯器中，將游標移至要插入表格的位置，點擊工具列「插入表格」按鈕，選擇初始行列數後表格自動插入。" },
    { name: "編輯表格內容", text: "點擊儲存格開始輸入，可用右鍵新增或刪除欄列、合併儲存格，Tab 鍵移至下一格，Enter 鍵移至下一列。" },
    { name: "使用公式計算", text: "在儲存格輸入 = 開頭的公式（如 =SUM(A1:A10)）自動計算統計數據，支援 SUM、COUNT、AVERAGE 等常用函式。" },
    { name: "匯出 .xlsx", text: "編輯完成後，點擊右上角「匯出」→「下載 Excel (.xlsx)」，下載的檔案可直接在 Microsoft Excel 或 Google Sheets 開啟。" },
  ];
  const jsonLd = mergeJsonLdGraph(
    techArticleJsonLd("Excel 表格編輯｜報告汪教學", "報告汪內嵌 Excel 式表格編輯功能的完整使用教學", "/docs/excel-editing"),
    howToJsonLd({ name: "如何在報告汪使用 Excel 表格編輯功能", description: "四步驟完成 Excel 式表格操作：插入表格、編輯內容、使用公式、匯出 .xlsx", path: "/docs/excel-editing", steps }),
  );
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <Badge variant="outline" className="mb-4 not-prose">核心功能</Badge>
      <h1>Excel 表格編輯</h1>
      <p className="lead">
        報告汪支援在文字報告中嵌入表格，操作方式類似 Excel，適合需要呈現統計數據、個案清單或服務紀錄表的長照文書。
      </p>

      <figure className="my-6 not-prose">
        <Image
          src="/docs/excel-editing-step1-grid.svg"
          alt="報告汪試算表編輯器示意圖：工具列含 B/I/U 格式按鈕與公式列（顯示 =SUM(B2:B13)），表格有月份、服務人次、出席率三欄，合計列儲存格已選取（藍色高亮），右上角「匯出 .xlsx」按鈕"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          試算表編輯器支援公式計算，編輯完成後可一鍵匯出 .xlsx
        </figcaption>
      </figure>

      <h2>插入表格</h2>
      <ol>
        <li>在報告編輯器中，將游標移至要插入表格的位置</li>
        <li>點擊工具列「插入表格」按鈕（表格圖示）</li>
        <li>選擇初始行列數（例如：5 欄 × 10 列）</li>
        <li>表格插入後，點擊儲存格開始輸入</li>
      </ol>

      <h2>Excel 式編輯操作</h2>
      <ul>
        <li><strong>選取儲存格</strong>：點擊單格，或 Shift+點擊選取範圍</li>
        <li><strong>新增欄列</strong>：右鍵點擊欄標頭或列標頭 → 插入欄／列</li>
        <li><strong>刪除欄列</strong>：右鍵 → 刪除欄／列</li>
        <li><strong>調整欄寬</strong>：拖曳欄標頭邊界</li>
        <li><strong>合併儲存格</strong>：選取多個儲存格 → 右鍵 → 合併儲存格</li>
        <li><strong>鍵盤導航</strong>：Tab 鍵移至下一格，Enter 鍵移至下一列</li>
      </ul>

      <h2>公式計算</h2>
      <p>在儲存格中輸入 <code>=</code> 開頭的公式：</p>
      <ul>
        <li><code>=SUM(A1:A10)</code> — 加總 A1 到 A10</li>
        <li><code>=COUNT(B1:B20)</code> — 計算非空白儲存格數量</li>
        <li><code>=AVERAGE(C1:C5)</code> — 計算平均值</li>
        <li><code>=A1+B1</code> — 兩格相加</li>
      </ul>

      <DocsTip variant="neutral" title="💡 適合的使用場景" className="my-4">
        <ul className="space-y-1 mt-1">
          <li>• 居服員服務時數統計表</li>
          <li>• 個案基本資料清單</li>
          <li>• 活動參與人次統計</li>
          <li>• 月度服務量一覽表</li>
        </ul>
      </DocsTip>

      <h2>匯出 .xlsx</h2>
      <ol>
        <li>開啟含有表格的報告</li>
        <li>點擊右上角「匯出」→「下載 Excel (.xlsx)」</li>
        <li>系統將表格內容匯出為標準 Excel 格式</li>
        <li>匯出的檔案可直接在 Microsoft Excel 或 Google Sheets 開啟</li>
      </ol>

      <DocsTip variant="neutral" className="my-4">
        注意：匯出 .xlsx 時，報告的文字段落部分不會包含在 Excel 檔案中，僅匯出表格資料。
        若需完整報告，請使用「列印」或「匯出 PDF」功能。
      </DocsTip>

      <h2>相關教學</h2>
      <ul>
        <li><Link href="/docs/create-report">建立報告：從 Word 檔匯入含表格的報告</Link></li>
        <li><Link href="/docs/ai-editing">AI 段落修改：讓 AI 幫你摘要表格中的數據</Link></li>
      </ul>
    </article>
  );
}
