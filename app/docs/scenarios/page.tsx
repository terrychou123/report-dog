import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { techArticleJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "四大機構實戰情境",
  description: "報告汪在居服機構、日照中心、住宿型長照機構、醫院護理部的實際使用情境，含具體成效數據。",
  alternates: { canonical: "https://reportwang.com/docs/scenarios" },
  openGraph: {
    title: "四大機構實戰情境｜報告汪教學",
    description: "六個真實情境說明長照機構如何用報告汪解決文書問題。",
    url: "https://reportwang.com/docs/scenarios",
  },
};

const institutionLinks = [
  { href: "/home-care", label: "🏠 居服機構" },
  { href: "/day-care", label: "🏢 日照中心" },
  { href: "/hospital", label: "🏥 醫院護理部" },
  { href: "/residential", label: "🏡 住宿型長照機構" },
];

const scenarios = [
  {
    id: 1,
    institution: "居服機構",
    institutionHref: "/home-care",
    emoji: "🏠",
    title: "督導追蹤居服員日誌繳交",
    role: "吳督導・台中市居家服務中心",
    pain: "管理 15 名居服員，每月月底要催繳日誌，逐一確認誰交了、誰沒交，光催繳就要花 30 分鐘以上。",
    solution: "為每位居服員建立姓名標籤，所有日誌上傳時加上對應標籤。月底直接用標籤篩選，未繳的居服員名字欄空白一目瞭然。",
    result: "催繳確認時間從 30 分鐘縮短至 5 分鐘，居服員繳交率提升至 98%。",
    features: ["標籤分類", "篩選搜尋"],
  },
  {
    id: 2,
    institution: "日照中心",
    institutionHref: "/day-care",
    emoji: "🏢",
    title: "評鑑季備審文件彙整",
    role: "陳社工・台北市日照中心",
    pain: "評鑑前要從散落各處的資料夾中找出評鑑委員要求的文件，每次都要花好幾天整理，還會有遺漏。",
    solution: "平時為每份文件加上評鑑相關標籤（例如：「評鑑A類」「送審必備」），評鑑前點選「送審必備」標籤，所有要準備的文件一次列出，逐一確認勾選。",
    result: "評鑑備審文件整理時間從 3 天縮短至半天，文件零遺漏。",
    features: ["標籤分類", "篩選搜尋", "AI 評鑑分析"],
  },
  {
    id: 3,
    institution: "住宿型長照機構",
    institutionHref: "/residential",
    emoji: "🏡",
    title: "多職類月報協作",
    role: "廖主任・新北市住宿型長照機構",
    pain: "每月各職類（護理、社工、照服）要分別提交月報，格式不統一，主任彙整時需要大量編輯，耗時耗力。",
    solution: "各職類使用相同模板，上個月的月報一鍵複製後，只用 AI 修改有異動的段落（服務人次、活動場次等數字）。主任僅需確認彙整，不用再重新排版。",
    result: "月報彙整時間減少三分之一，各職類月報格式更一致。",
    features: ["複製報告", "AI 段落修改", "標籤分類"],
  },
  {
    id: 4,
    institution: "醫院護理部",
    institutionHref: "/hospital",
    emoji: "🏥",
    title: "交班紀錄標準化",
    role: "蔡護理長・台中市立醫院",
    pain: "不同護理師的交班紀錄格式落差大，護理長每天都要花時間修改格式，確保紀錄符合醫院標準。",
    solution: "建立標準交班紀錄模板，每班複製前一班模板，用 AI 指令修改差異（病人狀況更新、用藥調整等），加上班別標籤後儲存。",
    result: "交班紀錄格式一致性提升，護理長審閱時間減少 60%。",
    features: ["複製報告", "AI 段落修改", "標籤分類"],
  },
  {
    id: 5,
    institution: "各類機構通用",
    institutionHref: null,
    emoji: "📋",
    title: "社工月報快速產出",
    role: "林社工・桃園市居家服務中心",
    pain: "每月月底社工月報要從零開始撰寫，格式要符合公所規定，撰寫加上反覆修改要 2 小時以上。",
    solution: "複製上個月月報，針對有變動的段落（本月服務人次、個案異動、活動辦理情形）各下一次 AI 指令更新，最後統整格式確認後儲存。",
    result: "月報產出時間從 2 小時縮短至 15 分鐘。",
    features: ["複製報告", "AI 段落修改"],
  },
  {
    id: 6,
    institution: "各類機構通用",
    institutionHref: null,
    emoji: "🎓",
    title: "新進人員文書交接",
    role: "新進照服員・高雄市居家服務",
    pain: "剛到職的新進照服員不熟悉機構的文書格式，撰寫日誌時常常格式不正確，需要前輩花時間一對一指導。",
    solution: "建立報告庫「範本」標籤，將優良的日誌報告標記為範本，新進人員直接瀏覽範本學習格式，撰寫時參考同類報告的用詞與結構。",
    result: "新進人員一週內獨立完成合規日誌，前輩指導時間大幅減少。",
    features: ["標籤分類", "複製報告"],
  },
];

export default function ScenariosPage() {
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: techArticleJsonLd("四大機構實戰情境｜報告汪教學", "長照機構使用報告汪的六個真實使用情境與成效", "/docs/scenarios") }} />

      <Badge variant="outline" className="mb-4">進階應用</Badge>
      <h1 className="text-3xl font-bold mb-4">四大機構實戰情境</h1>
      <p className="text-muted-foreground text-lg mb-10">
        看看其他長照機構如何用報告汪解決日常文書問題。六個真實情境，對應不同職類與機構類型。
      </p>

      <div className="space-y-6">
        {scenarios.map(({ id, institution, institutionHref, emoji, title, role, pain, solution, result, features }) => (
          <Card key={id} className="p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl shrink-0">{emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {institutionHref ? (
                    <Link href={institutionHref}>
                      <Badge variant="outline" className="text-xs hover:border-primary/50">{institution}</Badge>
                    </Link>
                  ) : (
                    <Badge variant="outline" className="text-xs">{institution}</Badge>
                  )}
                  <div className="flex gap-1.5 flex-wrap">
                    {features.map((f) => (
                      <Badge key={f} variant="secondary" className="text-xs font-normal">{f}</Badge>
                    ))}
                  </div>
                </div>
                <h2 className="text-lg font-semibold mt-2 mb-1">{title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{role}</p>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">痛點</p>
                    <p className="text-sm">{pain}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">解法</p>
                    <p className="text-sm">{solution}</p>
                  </div>
                  <div className="rounded-md bg-primary/5 border border-primary/20 px-4 py-2.5">
                    <p className="text-xs font-semibold text-primary mb-0.5">成效</p>
                    <p className="text-sm font-medium">{result}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 rounded-lg bg-muted/40 border p-6">
        <h2 className="font-semibold text-lg mb-3">深入了解各機構解決方案</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {institutionLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-md border bg-background px-4 py-3 text-sm font-medium text-center hover:border-primary/50 hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
