import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { nursingHomeProfile } from "@/lib/ai/evaluation-profiles/nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "C、安全環境設備（項目 48–63）｜住宿型照顧機構評鑑",
  description:
    "住宿型照顧機構評鑑「安全環境設備」16 項評鑑基準詳細說明：採光通風、無障礙設施、消防安全、緊急疏散、廚房衛生、隔離空間、飲用水安全等，含準備要訣。",
  keywords: [
    "住宿型長照評鑑安全環境",
    "安養機構消防安全評鑑",
    "長照機構無障礙設施評鑑",
    "護理之家疏散演練評鑑",
    "114年度住宿型長照評鑑",
    "臺北市安養機構環境評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/nursing-home/safety-environment" },
  openGraph: {
    title: "C、安全環境設備（項目 48–63）｜住宿型照顧機構評鑑｜報告汪",
    description: "住宿型照顧機構評鑑安全環境設備 16 項基準詳細說明與準備要訣。",
    url: "https://reportwang.com/school/nursing-home/safety-environment",
  },
};

const section = nursingHomeProfile.sections.find((s) => s.shortCode === "安")!;

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  48: {
    content:
      "評鑑委員會實地察看每間寢室的採光、照明及通風情形。確認每間寢室有自然採光及可調整光度的照明燈具，並可依住民需求調整冷暖設備。公共空間（走道、活動區）的照明充足度也在查核範圍內。",
    variant: "info",
  },
  49: {
    content:
      "儲藏空間查核重點：易燃或可燃性物品（被褥、床單、雜物）的儲藏空間需密閉且隨時上鎖，儲藏室內需建置適用的火警探測器或自動撒水設備。各儲存空間需有分類標示、擺放整齊，並有定期盤點記錄。",
    variant: "warning",
  },
  50: {
    content:
      "日常活動空間（餐廳、閱覽區、活動區、會客區）需符合住民使用的便利性，且每層樓均應有活動空間。每週至少 1 次清潔環境並有紀錄。評鑑委員會實地察看各樓層的活動空間設置及動線是否符合住民需求。",
    variant: "neutral",
  },
  51: {
    content:
      "緊急呼叫系統為一級必要項目。浴室、廁所及寢室均需設有緊急呼叫設備，且功能正常、位置適當。評鑑委員會現場測試——浴室廁所測試需在關門情況下按鈴，確認工作人員能即時反應處理。",
    variant: "warning",
  },
  52: {
    content:
      "電梯為二級加強項目。2 層樓以上建築物至少設置 1 座無障礙昇降機，門淨寬度不得小於 90 公分，機廂深度不得小於 135 公分。未設置昇降機者，需確認無障礙通路可到達的房間數超過總房間數 50%。",
    variant: "info",
  },
  53: {
    content:
      "無障礙浴廁為二級加強項目。查核重點：出入口無高差（或設坡道）、扶手設置適當、輪椅迴轉空間足夠、至少設置 2 處求助鈴。多人使用的浴廁需有隔間或門簾，無障礙浴廁合併設置者需有隔間且不可上鎖。",
    variant: "warning",
  },
  54: {
    content:
      "廚房為二級加強項目。食物檢體留存（每樣食物 150 公克）需分開封裝、標示日期及餐次，冷藏存放 48 小時。自辦伙食需注意生熟食分開儲存，冷凍（-18℃以下）及冷藏（7℃以下）設備溫度合規。供膳外包需有 GHP 稽查紀錄或 HACCP 合格證明。",
    variant: "warning",
  },
  55: {
    content:
      "污物處理空間需獨立設置，且動線不可直接穿越用餐區和備膳空間。機構內外環境每 3 個月至少消毒 1 次並有記錄，廢棄物需定時清理、定點存放，每半年委外合格病媒防治業辦理防治（需有佐證文件）。",
    variant: "info",
  },
  56: {
    content:
      "消防安全設備為一級必要項目。每半年委託消防設備師或消防設備士定期檢修，結果需報請消防機關備查，現場需備有前 2 次完整申報記錄。防火管理人需為管理或監督層次人員（非社工、醫事、照服員），且機構每月自主檢查用電設備。",
    variant: "warning",
  },
  57: {
    content:
      "疏散避難系統為一級必要項目。逃生路徑需雙向（至少 1 座安全梯及 2 個以上避難途徑），防火門需往避難方向開啟且隨時關閉，不需鑰匙即可雙向開啟。走道、樓梯間、出入口需保持暢通，防火門周圍 1.5 公尺需淨空。",
    variant: "warning",
  },
  58: {
    content:
      "緊急災害應變計畫（EOP）為一級必要項目。每年需實施 2 次演練（含 1 次複合型及 1 次夜間演練），並有演練過程、照片及事後檢討改善記錄。EOP 需涵蓋火災、風災、水災、地震、停電、停水等緊急情況，並納入 119 通報裝置的因應方式。",
    variant: "warning",
  },
  59: {
    content:
      "各樓層出入口需張貼緊急避難平面圖（至少 A3 尺寸），標示所在位置且與現場方向、方位符合，並有比例尺。防火管理人、照服員（含外籍）、護理人員均需接受防救災教育訓練，評鑑委員可能現場抽測工作人員的疏散操作能力。",
    variant: "warning",
  },
  60: {
    content:
      "隔離空間需在立案面積內，且具有獨立空調、衛浴設備及緊急呼叫設備。適用對象需明確規範（新入住、出院或疑似感染個案），各類隔離措施 SOP（含消毒等）需書面化，評鑑委員會實地察看隔離空間的動線及設備。",
    variant: "info",
  },
  61: {
    content:
      "設備儀器需有廠商定期維護及校正機制，並有記錄（含維護日期、項目）。新購設備及日常教育訓練中需安排操作課程，並有出席記錄。評鑑委員可能現場抽測工作人員操作床、輪椅、抽痰機、血壓計、製氧機等設備。",
    variant: "neutral",
  },
  62: {
    content:
      "護理站設備為一級必要項目，需備有完整急救設備（氧氣、人工氣道、甦醒袋、常備急救藥品等），且各項設備定期維護、功能正常、藥品在效期內（注意氧氣鋼瓶期限）。每層樓需設護理站或簡易護理工作站，機構至少設 1 處護理站。",
    variant: "warning",
  },
  63: {
    content:
      "飲用水安全為二級加強項目。自來水塔每半年定期清潔保養（需有記錄），水質每 3 個月檢測大腸桿菌群（需委託主管機關認可的業者）。飲水機每月定期檢查保養，使用濾芯者需定期更換，評鑑委員會核查水質檢驗報告及清潔保養紀錄。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "C、安全環境設備（住宿型照顧機構評鑑基準項目 48–63）",
  description:
    "住宿型照顧機構評鑑基準「安全環境設備」16 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/nursing-home/safety-environment",
});

export default function NursingHomeSafetyEnvironmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 border-0 hover:bg-teal-500/20">
          C、安全環境設備
        </Badge>
        <h1 className="text-2xl font-bold mb-3">安全環境設備（項目 48–63）</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 16 個評鑑項目，著重在機構實體環境的安全性與無障礙可及性。評鑑委員通常以現場觀察及設備測試為主要審查方式，
          包含多個「一級必要」項目，不達標將直接影響評鑑等級。
        </p>
      </div>

      {/* Mini TOC */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          本頁內容
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {section.items.map((item) => (
            <li key={item.id}>
              <a
                href={`#item-${item.id}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-background border flex items-center justify-center text-xs font-mono">
                  {item.id}
                </span>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Items */}
      <div className="space-y-12">
        {section.items.map((item) => (
          <section key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center text-sm font-bold text-teal-600 dark:text-teal-400 font-mono">
                {item.id}
              </span>
              <h2 className="text-lg font-bold">{item.title}</h2>
              <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
              <Badge variant="secondary" className="text-xs">{item.reviewMethod}</Badge>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">評鑑標準</h3>
              <ol className="space-y-1.5 list-none pl-0">
                {item.criteria.map((criterion, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-mono text-foreground">
                      {i + 1}
                    </span>
                    {criterion}
                  </li>
                ))}
              </ol>
            </div>

            {tips[item.id] && (
              <DocsTip variant={tips[item.id].variant ?? "neutral"} title="準備要訣">
                {tips[item.id].content}
              </DocsTip>
            )}
          </section>
        ))}
      </div>

      {/* Prev / Next navigation */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/nursing-home/professional-quality"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          B、專業照護品質
        </Link>
        <Link
          href="/school/nursing-home/client-rights"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          D、個案權益保障
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
