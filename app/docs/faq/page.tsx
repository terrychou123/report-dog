import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "常見問題",
  description: "報告汪常見問題解答：帳號與費用、報告編輯、AI 功能、資料安全，長照機構行政人員最常詢問的問題。",
  alternates: { canonical: "https://reportwang.com/docs/faq" },
  openGraph: {
    title: "常見問題｜報告汪教學",
    description: "報告汪 FAQ：帳號費用、AI 修改、標籤功能、資料安全一次解答。",
    url: "https://reportwang.com/docs/faq",
  },
};

const faqGroups = [
  {
    group: "帳號與費用",
    items: [
      {
        q: "報告汪目前收費嗎？",
        a: "系統目前處於測試階段，完全免費使用。正式版本的定價方案尚在規劃中，費用公告前會提前通知現有用戶。",
      },
      {
        q: "免費版有哪些限制？",
        a: "免費版包含無限報告數量、無限標籤、AI 段落修改、全文搜尋等核心功能。版本歷史保留最近 10 個版本；進階功能（如 AI 評鑑分析批次處理）可能在付費版中提供。",
      },
      {
        q: "可以多人共用同一個帳號空間嗎？",
        a: "可以。前往帳號設定 → 成員管理，輸入同事的電子郵件邀請加入。管理員可設定每位成員的權限範圍。",
      },
      {
        q: "忘記密碼怎麼辦？",
        a: "前往登入頁面 → 點擊「忘記密碼」→ 輸入電子郵件，系統發送重設連結至信箱，點擊連結後設定新密碼即可。",
      },
    ],
  },
  {
    group: "報告編輯",
    items: [
      {
        q: "報告汪支援哪些格式的文件上傳？",
        a: "目前支援 .doc 和 .docx 格式的 Word 文件。PDF 文件請先轉換為 Word 格式再上傳，或直接複製文字內容貼入。",
      },
      {
        q: "報告內容會自動儲存嗎？",
        a: "是的，系統每隔 30 秒自動儲存草稿。你也可以隨時按 Ctrl+S（Windows）或 Cmd+S（Mac）手動儲存。",
      },
      {
        q: "可以匯出報告為 Word 或 PDF 嗎？",
        a: "目前支援匯出表格為 .xlsx 格式，以及列印報告（可存為 PDF）。Word 格式匯出功能正在開發中。",
      },
      {
        q: "標籤可以刪除嗎？刪除後報告會怎樣？",
        a: "可以刪除標籤。刪除後，已套用該標籤的報告不受影響，僅移除標籤關聯。報告本身不會被刪除。",
      },
    ],
  },
  {
    group: "AI 功能",
    items: [
      {
        q: "AI 修改用的是什麼語言模型？",
        a: "報告汪使用 Anthropic Claude 模型，專門針對繁體中文長照行政用語進行最佳化，理解台灣長照情境與法規用語。",
      },
      {
        q: "AI 修改一次要多少時間？",
        a: "一般段落修改在 5-15 秒內完成。段落越長、指令越複雜，所需時間略長。AI 評鑑分析（整份報告）約需 30-60 秒。",
      },
      {
        q: "AI 修改的結果不滿意，可以撤銷嗎？",
        a: "套用前可直接捨棄，不影響原始內容。套用後可至「版本歷史」找到修改前的版本並還原。",
      },
      {
        q: "可以用 AI 直接產生一份全新報告嗎？",
        a: "目前 AI 功能以段落修改為主（修改現有內容）。建立全新報告建議先複製相近的模板，再用 AI 修改各段落。全文生成功能在規劃中。",
      },
    ],
  },
  {
    group: "資料安全",
    items: [
      {
        q: "我的報告資料安全嗎？",
        a: "所有資料傳輸均使用 HTTPS 加密。報告資料儲存在安全的雲端環境，僅你的帳號可以存取（除非你主動邀請成員或分享連結）。",
      },
      {
        q: "AI 修改時，報告內容會被拿去訓練模型嗎？",
        a: "不會。傳送至 AI 的內容僅用於當次修改，不用於模型訓練。詳見我們的隱私政策。",
      },
      {
        q: "可以上傳含有個案個人資料的文件嗎？",
        a: "技術上可以，但建議上傳前先進行去識別化處理（移除或遮蔽個案姓名、身分證字號、地址等個資），以符合個人資料保護法規定。",
      },
      {
        q: "如果我不想用了，資料可以刪除嗎？",
        a: "可以。前往帳號設定 → 帳號管理 → 刪除帳號，選擇刪除所有資料。刪除後資料無法復原，請確認備份重要報告。",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqGroups.flatMap(({ items }) =>
              items.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              }))
            ),
          }),
        }}
      />

      <Badge variant="outline" className="mb-4">進階應用</Badge>
      <h1 className="text-3xl font-bold mb-4">常見問題</h1>
      <p className="text-muted-foreground text-lg mb-10">
        找不到答案？歡迎透過 <Link href="/auth/sign-up" className="underline hover:text-primary">建立帳號後</Link> 聯繫我們的支援團隊。
      </p>

      <div className="space-y-10">
        {faqGroups.map(({ group, items }) => (
          <section key={group}>
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">{group}</h2>
            <div className="space-y-3">
              {items.map(({ q, a }) => (
                <details key={q} className="group border rounded-lg bg-background">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-sm">
                    {q}
                    <svg
                      className="h-4 w-4 text-muted-foreground shrink-0 ml-4 group-open:rotate-180 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-muted-foreground border-t pt-3 mt-1">{a}</div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
