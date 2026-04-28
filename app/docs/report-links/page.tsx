import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DocsTip } from "@/components/docs/docs-tip";
import { techArticleJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "報告連結｜在報告中附加超連結｜報告汪操作手冊",
  description:
    "了解如何在報告汪中為報告和範本附加超連結，串連參考資料、法規文件、雲端相簿，敏感資料不進系統更安全。",
  alternates: { canonical: "https://reportwang.com/docs/report-links" },
};

export default function ReportLinksDocsPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: techArticleJsonLd(
            "報告連結：在報告中附加超連結",
            "了解如何在報告汪中為報告和範本附加超連結，串連參考資料、法規文件、雲端相簿，敏感資料不進系統更安全。",
            "/docs/report-links"
          ),
        }}
      />
      <Badge variant="outline" className="mb-4 not-prose">核心功能</Badge>
      <h1>報告連結</h1>
      <p className="lead">
        在報告或範本中附加 http(s) 連結，讓一份報告就能串連參考資料、法規文件、雲端相簿；敏感資料留在自己的雲端硬碟，不經過報告汪更安全。
      </p>

      <h2>什麼是報告連結？</h2>
      <p>
        報告連結讓你在每份報告或範本下方附上任意數量的超連結。連結以標籤片的方式顯示在報告標題旁，點擊後在新分頁開啟目標網址。連結只儲存網址與名稱，<strong>檔案本身不會上傳到報告汪</strong>，不佔用系統空間，也不增加資料外洩風險。
      </p>

      <h2>如何新增連結？</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/report-links-step1-add.svg"
          alt="報告汪「新增連結」對話框示意圖：名稱欄填入「衛福部評鑑基準公告」（藍色邊框，已選取），網址欄填入 https://www.mohw.gov.tw/...，右下角「新增」按鈕以橘色虛線框高亮；背景可見報告標題列下方已有連結 Pill 與虛線「+ 連結」按鈕"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          填入連結名稱與網址後點擊「新增」，連結即出現在報告標題列下方
        </figcaption>
      </figure>
      <ol>
        <li>開啟任一報告，進入編輯頁面。</li>
        <li>在報告標題下方，找到帶有虛線外框的「<strong>＋ 連結</strong>」按鈕，點擊它。</li>
        <li>在彈出視窗中填入<strong>名稱</strong>（例如：衛福部公告）與<strong>網址</strong>（須以 https:// 或 http:// 開頭）。</li>
        <li>確認無誤後點擊「<strong>新增</strong>」。</li>
        <li>連結出現在標題列，點擊名稱可開啟，點擊 ✕ 可刪除。</li>
        <li>範本連結的新增方式相同，進入管理員範本頁面操作即可。</li>
      </ol>

      <h2>如何刪除連結？</h2>
      <ol>
        <li>找到要刪除的連結標籤，點擊標籤右側的「<strong>✕</strong>」圖示。</li>
        <li>連結即時移除，無需另行儲存。</li>
      </ol>

      <h2>10 大實用情境</h2>
      <p>以下是長照與社福機構從業人員最常用的十種連結應用情境：</p>
      <ol>
        <li>
          <strong>參考與佐證資料</strong>——將其他報告、現場照片或影片的雲端連結附在報告下方，讓文件脈絡一目了然，評鑑委員查閱時無須另行搜尋。
        </li>
        <li>
          <strong>敏感資料保護</strong>——個案個資、家屬聯絡資訊等敏感資料留在機構自有 Google Drive 或 OneDrive，報告只放連結，大幅降低外洩風險，資料主權留在機構手中。
        </li>
        <li>
          <strong>交辦事項與範例指引</strong>——督導在評鑑範本中附上優良案例連結，新人複製範本後直接參考，省去口頭說明的時間，交辦內容有跡可循。
        </li>
        <li>
          <strong>法規與評鑑基準</strong>——附上衛福部公告、評鑑基準 PDF、長照服務法全書，執行人員撰寫報告時隨手查閱，不再靠記憶。
        </li>
        <li>
          <strong>教育訓練資料</strong>——連結教育訓練影片、SOP 文件、新進人員手冊，範本一匯入，所有學習資源同步到位。
        </li>
        <li>
          <strong>外部表單與問卷</strong>——附上 Google Forms 家屬滿意度問卷、事件通報表單，讓相關人員從報告頁面直接填寫，提升回收率。
        </li>
        <li>
          <strong>會議與溝通紀錄</strong>——連結 Google Docs 會議紀錄或 LINE 群組討論截圖，讓會議決議和對應報告一起被追蹤。
        </li>
        <li>
          <strong>跨機構合作文件</strong>——附上轉介文件、合作機構資源連結，跨單位協作時一個連結跳轉，不再反覆傳送附件。
        </li>
        <li>
          <strong>評鑑改善追蹤</strong>——連結改善行動計畫、委員回饋後的後續追蹤文件，讓每份報告的改善歷程有完整記錄。
        </li>
        <li>
          <strong>雲端相簿與影片</strong>——附上 Google Photos 環境照片相簿、活動影片連結，不佔用報告汪空間，評鑑委員也能看到真實現場。
        </li>
      </ol>

      <DocsTip variant="info" title="配合評鑑範本效果更好">
        在評鑑範本中預先設好連結（如法規文件、SOP 影片），機構成員匯入範本後連結一起帶入。新人一開始工作就能找到所有參考資料，不再靠口耳相傳。
      </DocsTip>

      <DocsTip variant="warning" title="僅支援 http / https 連結">
        目前只接受以 <code>http://</code> 或 <code>https://</code> 開頭的標準網址。本機路徑（如 <code>file:///</code>）或私有網路網址在外部無法開啟，不建議使用。
      </DocsTip>

      <h2>常見問題</h2>
      <div className="not-prose space-y-3">
        {[
          {
            q: "連結數量有上限嗎？",
            a: "目前沒有數量上限，一份報告可以附加任意數量的連結。",
          },
          {
            q: "連結刪除後還能復原嗎？",
            a: "刪除後無法復原，若需要保留請先記下網址再進行刪除。",
          },
          {
            q: "連結的顯示順序可以調整嗎？",
            a: "目前連結按新增時間排序顯示，尚未支援拖曳排序。若有此需求，歡迎透過回饋管道告知我們。",
          },
          {
            q: "其他人能看到我附加的連結嗎？",
            a: "擁有報告讀取權限的人（例如透過標籤分享）都可以看到連結並點擊開啟，但連結指向的外部資源若需要登入，對方仍需具備相應的雲端硬碟權限。",
          },
          {
            q: "範本連結和報告連結有什麼差別？",
            a: "範本連結由管理員在範本頁面設定，供整個機構共用。報告連結是個別報告的補充資料，兩者各自獨立管理。",
          },
        ].map((item) => (
          <details key={item.q} className="group border rounded-lg bg-background">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer font-medium text-sm">
              {item.q}
              <span className="text-muted-foreground group-open:hidden ml-2">▸</span>
              <span className="text-muted-foreground hidden group-open:inline ml-2">▾</span>
            </summary>
            <div className="px-4 pb-3 text-muted-foreground text-sm border-t pt-3">{item.a}</div>
          </details>
        ))}
      </div>

      <h2>延伸閱讀</h2>
      <ul>
        <li>
          <Link href="/docs/copy-and-templates">複製報告與模板</Link>——了解如何複製報告與建立模板庫，搭配連結功能讓範本更完整。
        </li>
        <li>
          <Link href="/docs/version-history">版本歷史與共享</Link>——了解如何查看報告歷史版本，以及產生唯讀分享連結。
        </li>
        <li>
          <Link href="/docs/evaluation">AI 評鑑分析</Link>——了解如何上傳報告進行 AI 五維度評鑑分析。
        </li>
      </ul>

      <div className="not-prose mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
        <p className="text-sm font-medium mb-3">立即試用報告連結功能</p>
        <p className="text-sm text-muted-foreground mb-4">
          登入報告汪，開啟任一報告，點擊「＋ 連結」即可開始使用。
        </p>
        <Link
          href="/report"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-5 py-2.5 rounded-lg font-medium text-sm"
        >
          前往我的報告 →
        </Link>
      </div>
    </article>
  );
}
