import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { techArticleJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "AI 段落修改",
  description: "報告汪 AI 段落修改教學：點擊段落輸入自然語言指令，AI 即時產出修改版本，適合長照文書行政人員。",
  alternates: { canonical: "/docs/ai-editing" },
  openGraph: {
    title: "AI 段落修改｜報告汪教學",
    description: "一句話指令讓 AI 修改長照報告段落，支援多輪對話調整直到滿意為止。",
    url: "https://reportwang.com/docs/ai-editing",
  },
};

const exampleInstructions = [
  { label: "更新數據", example: "「這段的個案人數改成 23 人，服務時數改成 147 小時」" },
  { label: "精簡文字", example: "「這段太長，改得更簡潔，保留重點就好」" },
  { label: "調整語氣", example: "「改成比較正式的行政公文語氣」" },
  { label: "補充內容", example: "「在結尾加上本月活動成效的小結」" },
  { label: "格式調整", example: "「改成條列式，每點不超過兩行」" },
  { label: "多輪修改", example: "（套用後）「前面那段再短一點，大概縮短三分之一」" },
];

export default function AiEditingPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: techArticleJsonLd("AI 段落修改｜報告汪教學", "使用自然語言指令讓 AI 修改長照報告段落的完整教學", "/docs/ai-editing") }} />

      <Badge variant="outline" className="mb-4 not-prose">核心功能</Badge>
      <h1>AI 段落修改</h1>
      <p className="lead">
        報告汪讓你用自然語言下指令，AI 即時修改報告中的任意段落。不需要學習特殊語法，用說話的方式就能完成文書修改。
      </p>

      <h2>步驟一：圈選段落</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/ai-editing-step1-select.svg"
          alt="報告汪報告編輯頁示意圖：TipTap 編輯器中一段文字被選取（藍色高亮），標題下方提示文字「圈選文字段落，使用 AI 修改」"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          步驟一：在編輯器中拖曳選取要修改的段落文字，自動開啟 AI 修改視窗
        </figcaption>
      </figure>
      <ol>
        <li>開啟一份已建立的報告（進入報告編輯頁）</li>
        <li>在編輯器中<strong>拖曳選取</strong>要修改的段落文字（可選一句或整段）</li>
        <li>選取後「<strong>AI 修改助手</strong>」對話框自動彈出</li>
      </ol>

      <h2>步驟二：輸入修改指令</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/ai-editing-step2-input.svg"
          alt="報告汪「AI 修改助手」對話框示意圖：上方顯示圈選段落內容，下方「修改指令」文字區，右下角有 SOAP 模式勾選框與「送出」按鈕"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          步驟二：確認圈選段落，填入修改指令，點擊「送出」
        </figcaption>
      </figure>
      <ol>
        <li>對話框上方顯示你選取的原始段落，確認無誤</li>
        <li>在「<strong>修改指令</strong>」欄輸入需求（見下方範例）</li>
        <li>如需改寫為 SOAP 格式，勾選右側「<strong>SOAP</strong>」選項</li>
        <li>點擊「<strong>送出</strong>」，AI 在幾秒內產出修改版本</li>
      </ol>

      <h2>步驟三：套用或繼續調整</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/ai-editing-step3-apply.svg"
          alt="報告汪「AI 修改助手」對話框示意圖：AI 建議修改區塊（淺青底）顯示改寫結果，下方有「套用修改」與「繼續調整」兩個按鈕"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          步驟三：查看 AI 建議，點擊「套用修改」套用，或「繼續調整」重新輸入指令
        </figcaption>
      </figure>
      <ol>
        <li>查看「<strong>AI 建議修改</strong>」區塊的改寫結果</li>
        <li>滿意時點擊「<strong>套用修改</strong>」，AI 版本覆蓋原始段落，原版存入版本歷史</li>
        <li>不滿意時點擊「<strong>繼續調整</strong>」，回到指令輸入再微調（例如：「再短一點」、「語氣改更柔和」）</li>
        <li>點擊「取消」或關閉對話框，原始內容保持不變</li>
      </ol>

      <h2>有效指令寫法範例</h2>
      <p>以下是常用的指令類型，用自然語言描述你想要的修改：</p>

      <div className="not-prose grid grid-cols-1 gap-3 my-6">
        {exampleInstructions.map(({ label, example }) => (
          <Card key={label} className="p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
            <p className="text-sm font-mono bg-muted/60 rounded px-3 py-2">{example}</p>
          </Card>
        ))}
      </div>

      <h2>使用技巧</h2>
      <ul>
        <li><strong>指令要具體</strong>：「改短一點」不如「縮短到 60 字以內」效果好</li>
        <li><strong>一次改一段</strong>：每次對話針對單一段落，避免同時修改太多範圍</li>
        <li><strong>善用數字</strong>：數字更新請直接說明，例如「服務人次從 18 改成 21」</li>
        <li><strong>繁體中文優先</strong>：指令用繁體中文，AI 回應也會以繁體中文為主</li>
      </ul>

      <h2>相關教學</h2>
      <ul>
        <li><Link href="/docs/soap-writing">SOAP 寫法 AI 改寫：一鍵將個案紀錄改寫為四段式專業格式</Link></li>
        <li><Link href="/docs/version-history">版本歷史：查看與還原 AI 修改前的版本</Link></li>
        <li><Link href="/docs/copy-and-templates">複製報告：複製上期報告再用 AI 更新差異</Link></li>
        <li><Link href="/docs/evaluation">AI 評鑑分析：用 AI 分析整份報告的評鑑合規度</Link></li>
      </ul>
    </article>
  );
}
