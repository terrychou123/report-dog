import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { techArticleJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "AI 段落修改",
  description: "報告汪 AI 段落修改教學：點擊段落輸入自然語言指令，AI 即時產出修改版本，適合長照文書行政人員。",
  alternates: { canonical: "https://reportwang.com/docs/ai-editing" },
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

      <h2>啟動 AI 修改</h2>
      <ol>
        <li>開啟一份已建立的報告</li>
        <li>點擊任意段落文字</li>
        <li>段落右側或下方出現「AI 修改」按鈕，點擊開啟對話框</li>
        <li>在輸入框輸入修改指令，按 Enter 或點擊「送出」</li>
        <li>AI 在幾秒內產出修改版本，顯示在右側預覽區</li>
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

      <h2>多輪對話修改</h2>
      <p>
        AI 修改支援多輪對話，每次修改都在上一版的基礎上調整，不需要重新描述整個需求：
      </p>
      <ol>
        <li>第一輪：輸入主要修改方向</li>
        <li>查看 AI 產出的修改版本</li>
        <li>如不滿意，繼續輸入微調指令（例如：「再短一點」、「語氣改更柔和」）</li>
        <li>滿意後點擊「套用」，修改版本覆蓋原始段落</li>
      </ol>

      <h2>套用或捨棄修改</h2>
      <ul>
        <li><strong>套用</strong>：點擊「套用」按鈕，AI 修改版本取代原始段落，原版本存入版本歷史</li>
        <li><strong>捨棄</strong>：點擊「取消」或關閉對話框，原始內容保持不變</li>
        <li><strong>版本還原</strong>：套用後後悔了？可至 <Link href="/docs/version-history">版本歷史</Link> 還原</li>
      </ul>

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
