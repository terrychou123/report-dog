import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { techArticleJsonLd } from "@/lib/jsonld";
import { SoapDemo } from "@/components/demo/soap-demo";

export const metadata: Metadata = {
  title: "SOAP 寫法 AI 改寫",
  description: "報告汪 SOAP 模式教學：勾選 SOAP checkbox，AI 自動將個案紀錄改寫為主觀、客觀、評估、計畫四段式專業格式，適合護理、居服、長照機構評鑑備審。",
  alternates: { canonical: "/docs/soap-writing" },
  openGraph: {
    title: "SOAP 寫法 AI 改寫｜報告汪教學",
    description: "一鍵將個案紀錄改寫成 SOAP 四段式格式，加速長照評鑑備審。",
    url: "https://reportwang.com/docs/soap-writing",
  },
};

const soapSections = [
  {
    label: "S — 主觀（Subjective）",
    desc: "個案或家屬親口表述的主觀感受，盡量逐字引述並加引號。無法言語者標注「個案無法表達」，改由家屬或行為觀察補充。",
    example: "「個案主訴：『晚上都睡不著，翻來覆去到天亮』」",
  },
  {
    label: "O — 客觀（Objective）",
    desc: "可被第三人重複測得或觀察到的事實，包含生命徵象、量表分數、傷口測量、服藥記錄等，需含數值、單位、時間。",
    example: "「BP 148/92 mmHg（07:30），Braden 13 分，左踝外側紅疹 2×3 cm，皮膚完整。」",
  },
  {
    label: "A — 評估（Assessment）",
    desc: "整合主客觀資料後的專業判斷，包含護理診斷或問題判定、嚴重程度、與目標的差距，禁止只重抄 O 的數值。",
    example: "「睡眠型態紊亂（r/t 日夜節律混亂），皮膚完整性有受損風險（Braden 13 分屬中風險）。」",
  },
  {
    label: "P — 計畫（Plan）",
    desc: "依問題擬定診斷性、治療性、衛教性、評值性四類措施，需說明執行者、頻率與下次評值時點。",
    example: "「每 2 小時翻身；每週測量傷口；衛教家屬翻身手法並回示教；兩週後評估皮膚改善情形。」",
  },
];

const fitFacilities = [
  { name: "居家護理所", href: "/blog/home-nursing-soap-b2-evaluation-records", note: "B2 明文要求「問題、目標、措施、評值」四要素" },
  { name: "一般護理之家", href: "/blog/general-nursing-home-soap-b1-care-plan", note: "B1 72hr 完整評估 + 每 3 月修訂照護計畫" },
  { name: "住宿型長照機構", href: "/blog/nursing-home-soap-b2-interprofessional-records", note: "B2 二級加強，72hr 個別化評估 + 跨專業計畫" },
  { name: "精神護理之家", href: "/blog/psychiatric-nursing-home-soap-dar-records", note: "每半年評值 + 評鑑委員實地抽查個案紀錄" },
  { name: "醫院（護理紀錄）", href: "/blog/hospital-soap-interprofessional-care-plan", note: "入院評估、個別化照護計畫、臨終計畫、NICU" },
  { name: "居家服務", href: "/blog/home-care-simplified-soap-service-records", note: "服務紀錄需結構化，評鑑委員文件檢閱查核" },
  { name: "身心障礙福利機構", href: "/blog/disability-welfare-soap-case-records-2024", note: "指標 4103：服務目標執行，每 2 週記錄 1 次" },
];

export default function SoapWritingPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: techArticleJsonLd(
            "SOAP 寫法 AI 改寫｜報告汪教學",
            "使用報告汪 AI 助手一鍵將個案紀錄改寫為 SOAP 四段式格式的完整教學",
            "/docs/soap-writing"
          ),
        }}
      />

      <Badge variant="outline" className="mb-4 not-prose">核心功能</Badge>
      <h1>SOAP 寫法 AI 改寫</h1>
      <p className="lead">
        在 AI 修改助手中勾選「SOAP」，即可讓 AI 自動將個案紀錄改寫為主觀（S）、客觀（O）、評估（A）、計畫（P）四段式專業格式，
        提升評鑑備審文件品質，不需要自行拆解結構。
      </p>

      <h2>什麼是 SOAP？</h2>
      <p>
        SOAP 是 Lawrence Weed 提出的「問題導向式醫療紀錄（POMR）」核心書寫法，廣泛用於台灣護理、社工、居服、復健等領域的個案紀錄。
        評鑑委員抽查個案紀錄時，會重點確認紀錄是否「完整且有脈絡」——SOAP 四段式結構正好呼應這項要求。
      </p>

      <div className="not-prose grid grid-cols-1 gap-3 my-6">
        {soapSections.map(({ label, desc, example }) => (
          <Card key={label} className="p-4">
            <p className="text-sm font-semibold mb-1">{label}</p>
            <p className="text-sm text-muted-foreground mb-2">{desc}</p>
            <p className="text-sm font-mono bg-muted/60 rounded px-3 py-2">{example}</p>
          </Card>
        ))}
      </div>

      <p>
        長照實務常用進階版本 <strong>SOAPIE</strong>（多加 Implementation 執行、Evaluation 評值）或 <strong>SOAPIER</strong>（再加 Revision 修訂），
        適合評鑑週期長（每 3∼6 個月一評）的住宿型與居家服務情境。
      </p>

      {/* 互動 demo：讓讀者在繼續閱讀前直接體驗 */}
      <div className="not-prose my-8">
        <SoapDemo variant="hero" defaultExampleId="home-nursing" />
      </div>

      <h2>哪些機構評鑑指標適合用 SOAP？</h2>
      <p>以下機構的評鑑指標要求「個案評估 + 照護計畫 + 定期評值」，天然符合 SOAP 四段迴圈：</p>

      <div className="not-prose grid grid-cols-1 gap-3 my-6">
        {fitFacilities.map(({ name, href, note }) => (
          <Card key={name} className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{note}</p>
              </div>
              <Link href={href} className="text-xs text-primary underline whitespace-nowrap shrink-0">
                範例文章
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <h2>如何在報告汪用 AI 一鍵套用 SOAP</h2>
      <figure className="my-6 not-prose">
        <Image
          src="/docs/soap-writing-step1-dialog.svg"
          alt="報告汪 AI 修改助手對話框示意圖：「修改指令」標題右側的 SOAP 勾選框已勾選（藍色勾選），輸入框 placeholder 顯示「改寫成：主觀S、客觀O、評估A、計畫P 四段結構…」，右下角「送出」按鈕以橘色虛線框高亮"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          勾選 SOAP 模式後，AI 自動將段落改寫為四段式專業格式
        </figcaption>
      </figure>
      <ol>
        <li>開啟報告並選取（圈選）一段個案紀錄文字</li>
        <li>點擊「AI 修改助手」開啟對話框</li>
        <li>在「修改指令」右側找到 <strong>SOAP</strong> 勾選框，勾選它</li>
        <li>若有額外要求（例如「精簡一些」），可在輸入框補充；若只要 SOAP 結構，直接點「送出」即可</li>
        <li>AI 回傳 S／O／A／P 四段改寫版本，確認後點「套用修改」</li>
      </ol>

      <h2>進階：SOAP + 自由指令疊加</h2>
      <p>
        SOAP checkbox 可與自由指令同時使用。勾選後輸入框 placeholder 會直接帶入
        「改寫成：主觀S、客觀O、評估A、計畫P 四段結構。若還有其他需求，可在此對話框說明…」，
        代表這次的指令是「先套 SOAP 結構，再按你補充的需求調整」。
      </p>
      <ul>
        <li>「勾 SOAP + 輸入：加入具體量表數值範例」→ AI 在 O 段補充建議的量表格式</li>
        <li>「勾 SOAP + 輸入：精簡，每段不超過 3 行」→ AI 保持四段但縮短每段內容</li>
        <li>「勾 SOAP + 不輸入任何指令」→ AI 純粹執行 SOAP 四段改寫</li>
      </ul>

      <h2>常見錯誤與校稿要點</h2>
      <ul>
        <li><strong>S 段錯誤</strong>：把護理師的判斷寫進 S（應放 A）；只寫「個案表示不適」而無具體描述</li>
        <li><strong>O 段錯誤</strong>：缺少數值單位與時間（例如只寫「血壓偏高」，應寫「BP 156/94 mmHg，08:10」）</li>
        <li><strong>A 段錯誤</strong>：只重抄 O 的數值，沒有整合判斷；只寫「個案狀況穩定」而無推論</li>
        <li><strong>P 段錯誤</strong>：只寫措施，沒有寫下次評值時點；未說明執行頻率</li>
        <li><strong>資料不足時</strong>：AI 會以「（資料不足，待補充）」標示，請補入實際資料，不可留空送審</li>
      </ul>

      <h2>相關教學</h2>
      <ul>
        <li><Link href="/docs/ai-editing">AI 段落修改：自然語言指令修改任意段落</Link></li>
        <li><Link href="/docs/evaluation">AI 評鑑分析：分析整份報告的評鑑合規度</Link></li>
        <li><Link href="/docs/excel-editing">Excel 表格編輯：試算表型報告的 AI 修改方式</Link></li>
      </ul>
    </article>
  );
}
