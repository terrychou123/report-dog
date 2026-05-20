import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { techArticleJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "追蹤報告更新",
  description: "報告汪追蹤功能教學：設定 7 種追蹤頻率（每日到每年），系統自動判斷報告是否逾期未更新，紅色標示提醒督導催繳。居服、日照、醫院、住宿型機構追蹤策略建議。",
  alternates: { canonical: "/docs/follow-tracking" },
  openGraph: {
    title: "追蹤報告更新｜報告汪教學",
    description: "設定追蹤頻率，系統自動判斷報告是否逾期，紅色標示一目了然。7 種頻率支援各機構定期報告管理需求。",
    url: "https://reportwang.com/docs/follow-tracking",
  },
};

const trackingStrategies = [
  {
    institution: "居服機構",
    suggestions: [
      { report: "居服員日誌", frequency: "每日追蹤", reason: "每日應繳，逾期隔天立即顯示，督導可快速確認繳交狀況" },
      { report: "督導週報", frequency: "每週追蹤", reason: "督導自我追蹤，確保每週週報按時完成" },
      { report: "個案服務計畫（季更新）", frequency: "每季追蹤", reason: "季更新提醒，確保個案計畫不超過三個月未修訂" },
    ],
  },
  {
    institution: "日照中心",
    suggestions: [
      { report: "活動紀錄", frequency: "每週追蹤", reason: "每週活動結束後應完成紀錄，超過七天自動提醒" },
      { report: "評鑑備審文件", frequency: "每月追蹤", reason: "每月確認評鑑文件更新狀態，避免評鑑前臨時補件" },
      { report: "個案評估表", frequency: "每季追蹤", reason: "季度評估提醒，確保個案紀錄持續完整" },
    ],
  },
  {
    institution: "醫院護理部",
    suggestions: [
      { report: "交班紀錄", frequency: "每日追蹤", reason: "每日交班紀錄必須完成，逾期即時標示" },
      { report: "品質指標月報", frequency: "每月追蹤", reason: "每月品質指標應按時彙整，超過一個月提醒補件" },
      { report: "護理人員教育訓練紀錄", frequency: "每季追蹤", reason: "季度教育訓練紀錄追蹤，確保評鑑合規" },
    ],
  },
  {
    institution: "住宿型長照機構",
    suggestions: [
      { report: "安全事件報告", frequency: "每月追蹤", reason: "每月應完成安全事件彙整，超過一個月即提醒" },
      { report: "住民照護計畫", frequency: "每季追蹤", reason: "照護計畫每季應評估更新，追蹤確保不遺漏任何住民" },
      { report: "職類月報（護理／社工／照服）", frequency: "每月追蹤", reason: "多職類各自追蹤，主任一頁看出哪個職類月報逾期" },
    ],
  },
];

export default function FollowTrackingPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: techArticleJsonLd(
            "追蹤報告更新｜報告汪教學",
            "設定 7 種追蹤頻率，系統自動判斷長照機構報告是否逾期未更新，紅色標示督導催繳提醒",
            "/docs/follow-tracking"
          ),
        }}
      />

      <Badge variant="outline" className="mb-4 not-prose">核心功能</Badge>
      <h1>追蹤報告更新</h1>
      <p className="lead">
        設定報告的追蹤頻率，系統自動判斷是否逾期未更新，紅色標示告訴你哪份報告該催繳了。
        從居服員日誌到住民照護計畫，每種定期文書都有適合的追蹤週期。
      </p>

      <h2>什麼是追蹤功能？</h2>
      <p>
        長照機構的定期報告種類繁多——有每日的交班紀錄、每週的活動紀錄、每月的品質指標，還有每季更新的個案計畫。
        手動追蹤哪份報告是否按時完成，既耗時又容易遺漏。
      </p>
      <p>
        報告汪的追蹤功能讓你為每份報告設定更新頻率，系統根據報告的最後更新時間自動計算：
      </p>
      <ul>
        <li><strong>7 種頻率</strong>：不定期、每日、每週、每月、每季、每半年、每年</li>
        <li><strong>逾期判斷</strong>：超過設定頻率未更新，報告自動標為逾期</li>
        <li><strong>紅色提醒</strong>：逾期報告以紅色左邊框 + 紅色「逾期」標籤醒目標示</li>
        <li><strong>不定期例外</strong>：設為「不定期追蹤」的報告不計算逾期，僅作分類用途</li>
      </ul>

      <figure className="my-6 not-prose">
        <Image
          src="/docs/follow-tracking-step1-page.svg"
          alt="報告汪追蹤頁面示意圖：左側 Sidebar「追蹤」項目為 Active 狀態（鈴鐺圖示），主內容區顯示「每週追蹤」分組，第一張卡片有紅色左邊框與「逾期」Badge（已超過 3 天），第二張卡片正常；下方「每月追蹤」分組各有下拉頻率選單"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          追蹤頁面依頻率分組顯示，逾期報告以紅色左邊框醒目標示
        </figcaption>
      </figure>

      <h2>從報告編輯頁追蹤</h2>
      <p>最快速的追蹤方式，在查看或編輯報告時直接設定：</p>
      <ol>
        <li>開啟任一報告</li>
        <li>在報告標題下方找到鈴鐺圖示的「追蹤」按鈕</li>
        <li>點擊後從下拉選單選擇追蹤頻率（例如「每週追蹤」）</li>
        <li>設定完成後，按鈕變為目前頻率標籤（如 <code>每週追蹤</code>）</li>
        <li>需要變更頻率時，點擊頻率標籤即可重新選擇</li>
        <li>點擊頻率標籤旁的靜音圖示（🔕）即可取消追蹤</li>
      </ol>

      <h2>從追蹤頁面管理</h2>
      <p>
        集中管理所有追蹤報告，一頁看清哪些逾期、哪些正常：
      </p>
      <ol>
        <li>點擊左側側邊欄的「追蹤」圖示（🔔）</li>
        <li>進入追蹤頁面，所有追蹤報告依頻率分組顯示（不定期 → 每日 → 每週 → 每月 → 每季 → 每半年 → 每年）</li>
        <li>逾期報告以<strong>紅色左邊框</strong>標示，卡片右側顯示紅色「逾期」標籤</li>
        <li>點擊報告卡片即可開啟報告進行更新</li>
        <li>點擊卡片右側的下拉箭頭可變更追蹤頻率，報告會自動移至對應區段</li>
        <li>點擊 ✕ 按鈕取消追蹤，報告從列表中移除</li>
        <li>點擊右上角「新增追蹤」，可從報告列表中選擇要追蹤的報告並設定頻率</li>
      </ol>

      <h2>各機構追蹤策略建議</h2>
      <p>根據機構類型，以下是常見的追蹤設定方式：</p>

      <div className="not-prose space-y-6 my-6">
        {trackingStrategies.map((strategy) => (
          <Card key={strategy.institution} className="p-5">
            <h3 className="font-semibold text-base mb-3">{strategy.institution}</h3>
            <div className="space-y-3">
              {strategy.suggestions.map((s) => (
                <div key={s.report} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 text-sm">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-primary/10 text-primary font-medium text-xs whitespace-nowrap">
                      {s.frequency}
                    </span>
                    <span className="font-medium text-foreground">{s.report}</span>
                  </div>
                  <span className="text-muted-foreground">{s.reason}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <h2>逾期時間門檻</h2>
      <p>各頻率的逾期計算標準如下：</p>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left py-2 px-3 font-medium">追蹤頻率</th>
              <th className="text-left py-2 px-3 font-medium">逾期門檻</th>
              <th className="text-left py-2 px-3 font-medium">適用情境</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              { freq: "不定期", threshold: "不計算逾期", usage: "無固定週期的報告，僅作分類" },
              { freq: "每日", threshold: "超過 24 小時未更新", usage: "交班紀錄、居服員日誌" },
              { freq: "每週", threshold: "超過 7 天未更新", usage: "週報、活動紀錄" },
              { freq: "每月", threshold: "超過 30 天未更新", usage: "月報、品質指標、評鑑文件" },
              { freq: "每季", threshold: "超過 91 天未更新", usage: "個案計畫、季度評估" },
              { freq: "每半年", threshold: "超過 182 天未更新", usage: "半年度成效報告" },
              { freq: "每年", threshold: "超過 365 天未更新", usage: "年度評鑑備審、年度計畫" },
            ].map((row) => (
              <tr key={row.freq} className="hover:bg-muted/30">
                <td className="py-2 px-3 font-medium">{row.freq}</td>
                <td className="py-2 px-3 text-muted-foreground">{row.threshold}</td>
                <td className="py-2 px-3 text-muted-foreground">{row.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>常見問題</h2>
      <div className="not-prose space-y-3 my-4">
        {[
          {
            q: "追蹤功能會寄通知信嗎？",
            a: "目前追蹤功能以頁面紅色標示提醒為主，開啟追蹤頁面即可看到所有逾期報告。Email 通知功能規劃於後續版本推出。",
          },
          {
            q: "「不定期追蹤」不會顯示逾期嗎？",
            a: "正確。設為「不定期追蹤」的報告不計算逾期，不會出現紅色標示，僅作為分類與提醒用途。適合無固定週期但需要集中管理的報告。",
          },
          {
            q: "可以同時追蹤幾份報告？",
            a: "無上限，可追蹤所有報告。建議優先追蹤定期應更新的文書，不定期或已封存的報告可不追蹤。",
          },
          {
            q: "逾期判斷的時間以什麼為基準？",
            a: "以報告的「最後更新時間」為基準，與現在時間比較。只要在報告中進行任何編輯並儲存，更新時間就會刷新，逾期狀態會即時解除。",
          },
          {
            q: "追蹤的報告被刪除了會怎樣？",
            a: "報告刪除後，對應的追蹤記錄會自動清除，不會殘留在追蹤列表中。",
          },
        ].map((item) => (
          <details key={item.q} className="group border rounded-lg bg-background">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer font-medium text-sm">
              {item.q}
              <span className="text-muted-foreground group-open:hidden ml-2">▸</span>
              <span className="text-muted-foreground hidden group-open:inline ml-2">▾</span>
            </summary>
            <div className="px-4 pb-3 text-muted-foreground text-sm border-t pt-3">
              {item.a}
            </div>
          </details>
        ))}
      </div>

      <h2>延伸閱讀</h2>
      <ul>
        <li>
          <Link href="/docs/tags-and-search">標籤分類與搜尋</Link>
          —— 搭配標籤使用，讓追蹤分類更精確
        </li>
        <li>
          <Link href="/docs/evaluation">AI 評鑑分析</Link>
          —— 評鑑文件設為追蹤，AI 分析不遺漏任何基準
        </li>
      </ul>

      <div className="not-prose mt-10 p-5 rounded-xl border border-primary/20 bg-primary/5">
        <p className="text-sm font-medium mb-1">準備好開始追蹤了嗎？</p>
        <p className="text-sm text-muted-foreground mb-3">
          登入報告汪，在任一報告標題下方點擊「追蹤」按鈕，選擇頻率，立即啟動逾期提醒。
        </p>
        <Link
          href="/follow"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          前往追蹤頁面 →
        </Link>
      </div>
    </article>
  );
}
