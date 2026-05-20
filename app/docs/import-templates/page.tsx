import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { techArticleJsonLd, howToJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { DocsTip } from "@/components/docs/docs-tip";

export const metadata: Metadata = {
  title: "一鍵匯入評鑑範本",
  description: "報告汪一鍵匯入評鑑範本教學：支援 8 種機構類型，自動建立評鑑標籤與報告範本，省去手動建立的時間。",
  alternates: { canonical: "/docs/import-templates" },
  openGraph: {
    title: "一鍵匯入評鑑範本｜報告汪教學",
    description: "支援居服、日照、護理之家、醫院等 8 種機構類型，一鍵匯入對應評鑑標籤與報告範本。",
    url: "https://reportwang.com/docs/import-templates",
  },
};

export default function ImportTemplatesPage() {
  const steps = [
    { name: "選擇機構類型", text: "在 Onboarding 流程或標籤／報告頁面，點擊「匯入評鑑範本」按鈕，在對話框中選擇對應的機構類型（可多選）。" },
    { name: "確認匯入", text: "點擊「確認匯入」，系統自動建立對應的評鑑標籤與報告範本；已匯入過的機構類型不會重複建立。" },
    { name: "搭配 AI 填寫準備內容", text: "用標籤篩選評鑑區塊，逐一開啟報告範本，點擊「準備內容」段落後輸入 AI 指令，描述機構實際情況，AI 即時產出評鑑格式說明。" },
  ];
  const jsonLd = mergeJsonLdGraph(
    techArticleJsonLd("一鍵匯入評鑑範本｜報告汪教學", "支援 8 種長照機構類型，一鍵匯入對應的評鑑標籤與報告範本，省去手動建立的時間。", "/docs/import-templates"),
    howToJsonLd({ name: "如何匯入評鑑範本並開始準備評鑑", description: "三步驟完成評鑑範本匯入：選擇機構類型、確認匯入、搭配 AI 填寫準備內容", path: "/docs/import-templates", steps }),
  );
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <Badge variant="outline" className="mb-4 not-prose">核心功能</Badge>
      <h1>一鍵匯入評鑑範本</h1>
      <p className="lead">
        評鑑季來了，不必從零建立報告框架。選擇機構類型後，系統自動匯入對應的評鑑標籤與報告範本，每份範本已包含評鑑基準、審查方式與準備內容欄位，讓你立即開始用 AI 填寫內容。
      </p>

      <h2>支援的機構類型</h2>
      <p>目前支援 8 種機構類型，匯入後自動建立對應的標籤分類與報告範本：</p>
      <table>
        <thead>
          <tr>
            <th>機構類型</th>
            <th>標籤數</th>
            <th>報告範本數</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>居家服務機構</td>
            <td>4 個</td>
            <td>32 份</td>
          </tr>
          <tr>
            <td>日間照顧機構</td>
            <td>4 個</td>
            <td>43 份</td>
          </tr>
          <tr>
            <td>住宿型照顧機構</td>
            <td>5 個</td>
            <td>75 份</td>
          </tr>
          <tr>
            <td>居家護理所</td>
            <td>2 個</td>
            <td>8 份</td>
          </tr>
          <tr>
            <td>一般護理之家</td>
            <td>4 個</td>
            <td>15 份</td>
          </tr>
          <tr>
            <td>產後護理之家</td>
            <td>4 個</td>
            <td>17 份</td>
          </tr>
          <tr>
            <td>身心障礙福利機構</td>
            <td>6 個</td>
            <td>35 份</td>
          </tr>
          <tr>
            <td>醫院</td>
            <td>15 個</td>
            <td>124 份</td>
          </tr>
        </tbody>
      </table>

      <h2>如何匯入</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/import-templates-step1-dialog.svg"
          alt="報告汪「匯入評鑑範本」對話框示意圖：2 欄網格顯示 8 種機構類型選項，日間照顧機構已被選取（藍色外框＋勾選），下方顯示「將為您建立 4 個標籤、43 份報告範本」，右下角「確認匯入」按鈕"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          選擇機構類型後，點擊「確認匯入」即自動建立對應標籤與報告範本
        </figcaption>
      </figure>
      <p>有兩種方式可以匯入評鑑範本：</p>

      <h3>方式一：新用戶 Onboarding（推薦）</h3>
      <ol>
        <li>完成帳號註冊後，系統會引導你選擇機構類型</li>
        <li>選擇你的機構類型（可多選）</li>
        <li>點擊「匯入範本」，系統自動建立對應的標籤與報告</li>
        <li>完成後即可在標籤頁看到新建立的評鑑分類，在報告頁看到對應的報告範本</li>
      </ol>

      <h3>方式二：從標籤頁或報告頁匯入</h3>
      <ol>
        <li>登入後，前往「標籤」頁面或「報告」頁面</li>
        <li>點擊頁面頂部的「匯入評鑑範本」按鈕</li>
        <li>在對話框中選擇機構類型</li>
        <li>點擊確認，系統自動建立標籤與報告範本</li>
      </ol>

      <h2>匯入後的內容</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/import-templates-step2-result.svg"
          alt="報告汪標籤頁面示意圖：匯入日間照顧範本後，自動建立「個案權益保障」「專業照護品質」「活動品質管理」「環境設備管理」四個標籤卡片，每張卡片顯示報告數量"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          匯入後自動建立評鑑分類標籤（左側 Sidebar「標籤」頁查看）
        </figcaption>
      </figure>
      <p>匯入完成後，系統會自動建立以下內容：</p>
      <ul>
        <li><strong>標籤</strong>：依評鑑區塊建立分類標籤（例如：個案權益保障、專業照護品質、經營管理效能），可在「標籤」頁面查看與管理</li>
        <li><strong>報告範本</strong>：每個評鑑項目對應一份報告範本，包含評鑑基準條文、審查方式說明，以及待填寫的準備內容欄位</li>
        <li><strong>標籤連結</strong>：所有報告範本已自動關聯至對應的評鑑區塊標籤，方便篩選查詢</li>
      </ul>
      <p>匯入後，你可以直接點開任一報告範本，用 AI 在「準備內容」欄位填寫你的機構實際情況。</p>

      <DocsTip variant="info" title="💡 不會重複匯入" className="my-6">
        已匯入過的機構類型不會重複建立。如果你選擇同一機構類型再次匯入，系統會跳過已存在的內容，避免產生重複資料。
      </DocsTip>

      <h2>搭配 AI 使用</h2>
      <p>匯入範本只是第一步。建議的工作流程：</p>
      <ol>
        <li>匯入對應機構類型的評鑑範本</li>
        <li>用標籤篩選出某一評鑑區塊的報告（例如：只看「個案權益保障」）</li>
        <li>逐一開啟報告，點擊「準備內容」段落</li>
        <li>輸入 AI 指令，例如：「我們機構有個案意見申訴信箱和每月召開服務檢討會議，請依此撰寫準備內容」</li>
        <li>AI 即時產出符合評鑑格式的說明，確認後套用</li>
        <li>完成後可用 AI 評鑑分析功能，五維度檢視報告的完整性</li>
      </ol>

      <DocsTip variant="neutral" className="my-6">
        建議在評鑑前 2–3 個月開始匯入範本，逐步完成各項準備內容，避免臨時趕工。
      </DocsTip>

      <h2>相關教學</h2>
      <ul>
        <li><Link href="/docs/tags-and-search">標籤分類與搜尋：用標籤快速篩選評鑑區塊</Link></li>
        <li><Link href="/docs/ai-editing">AI 段落修改：用 AI 填寫報告準備內容</Link></li>
        <li><Link href="/docs/evaluation">AI 評鑑分析：五維度分析報告完整性</Link></li>
        <li><Link href="/school">評鑑小教室：各機構類型評鑑基準說明</Link></li>
      </ul>
    </article>
  );
}
