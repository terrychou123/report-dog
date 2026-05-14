import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { homeNursingProfile, meta as homeNursingMeta } from "@/lib/ai/evaluation-profiles/home-nursing";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon } from "lucide-react";
import { SoapCta } from "@/components/school/soap-cta";
import { SchoolDownloadButton } from "@/components/school/school-download-button";

export const metadata: Metadata = {
  title: "B3、加分項目（5%）｜居家護理所評鑑",
  description:
    "115年度居家護理所評鑑 B3 加分項目（5%）完整說明：創新照護成效、全國或縣市競賽獲獎、國際交流、照護特色標竿、學會發表五項加分方向，含準備策略與加分機制說明。",
  keywords: [
    "居家護理所評鑑加分",
    "居家護理加分題",
    "居家護理創新照護",
    "115年度居家護理所評鑑",
    "居家護理評鑑準備",
    "居家護理評鑑加分項目",
  ],
  alternates: { canonical: "https://reportwang.com/school/home-nursing/bonus" },
  openGraph: {
    title: "B3、加分項目（5%）｜居家護理所評鑑｜報告汪",
    description: "115年度居家護理所評鑑 B3 加分項目五項方向完整說明與準備策略。",
    url: "https://reportwang.com/school/home-nursing/bonus",
  },
};

const sectionB = requireSection(homeNursingProfile.sections, "B");
// B3 加分項目為 section B 的第 3 個 item（id=8）
const bonusItem = sectionB.items.find((i) => i.id === 8)!;
// 包裝為 section 形式以符合 schoolSubpageJsonLd 介面
const section = { ...sectionB, items: [bonusItem] };

const jsonLd = schoolSubpageJsonLd({
  type: "home-nursing",
  subpage: "bonus",
  section,
  name: "B3、加分項目（居家護理所評鑑）",
  description: "115年度居家護理所評鑑 B3 加分項目五項方向完整說明，包含創新照護、競賽獲獎、國際交流等。",
  extraFaq: [
    {
      question: "B3 加分項目佔居家護理所評鑑幾分？",
      answer: "B3 加分項目佔 B 區塊（照護管理，55%）中的 5%，為浮動分數，符合任一項目即可取得。",
    },
    {
      question: "加分項目需要準備哪些佐證資料？",
      answer: "依不同加分方向：創新照護需提供成效紀錄；競賽獲獎須附獎狀或公文；國際交流附相關證明文件；照護特色標竿需說明具體成效；學會或協會發表附摘要或受理通知。",
    },
    {
      question: "「實證照護成效措施」如何認定？",
      answer: "實證照護指基於臨床實證（Evidence-Based Practice）設計的照護介入措施，且能以前後比較或成效資料呈現改善結果，例如導入傷口照護新技術後壓傷發生率下降。",
    },
  ],
});

export default function HomeNursingBonusPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-green-500/10 text-green-600 dark:text-green-400 border-0 hover:bg-green-500/20">
          B、照護管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">B3、加分項目（5%）</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${homeNursingMeta.year} 年度` },
            { label: "資料來源", value: homeNursingMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={homeNursingMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          B3 為加分項目，佔 B 區塊照護管理的 <strong>5%</strong>，符合以下任一項目即可獲得加分。
          雖非必要，但對爭取優等或特優機構認定具關鍵影響，建議積極備妥相關佐證資料。
        </p>
      </div>

      {/* 五項加分方向 */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-4">B3 加分評鑑標準（符合任一即可）</h3>
          <ol className="space-y-3">
            {bonusItem.criteria.map((criterion, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-xs font-bold text-green-600 dark:text-green-400">
                  {i + 1}
                </span>
                <div>
                  <span className="text-foreground">{criterion}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* 準備策略 */}
        <div>
          <h2 className="text-base font-bold mb-3">準備策略與建議</h2>
          <DocsTip variant="info" title="加分策略">
            加分項目無硬性要求，但建議評估機構現有優勢，優先選擇最容易呈現佐證的方向。若機構已有相關成果（如曾投稿學術研討會、參與跨縣市競賽），務必在評鑑前整理好相關文件。
          </DocsTip>
        </div>

        {/* 各項方向說明 */}
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-semibold mb-2">① 創新或應用實證照護之成效措施</h3>
            <p className="text-sm text-muted-foreground">
              需能提供前後成效對比資料，例如：引入新式換藥技術後感染率下降、
              導入科技輔具後個案移位安全事件減少。具體量化數據最具說服力。
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-semibold mb-2">② 全國性或縣市政府競賽獲獎</h3>
            <p className="text-sm text-muted-foreground">
              包含衛生局或衛福部主辦的護理品質競賽、長照機構評選等。
              獎狀、公告文件為主要佐證，名次不限，入選即可。
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-semibold mb-2">③ 參與國際交流</h3>
            <p className="text-sm text-muted-foreground">
              包含出席國際護理或長照相關會議、接待國際參訪、跨國合作計畫等，
              附相關照片、紀錄或邀請函即可。
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-semibold mb-2">④ 經營照護特色、活動設計之具體成效（標竿學習典範）</h3>
            <p className="text-sm text-muted-foreground">
              機構若有獨特的照護模式或活動設計（如客製化居家復能計畫、多元跨域照護合作），
              且能呈現具體成效與他機構學習參考，即符合此項。
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-semibold mb-2">⑤ 學會或協會口頭或海報發表</h3>
            <p className="text-sm text-muted-foreground">
              護理師公會、台灣長照協會、護理學會等相關學術研討會的口頭報告或海報發表，
              附受理通知或論文摘要即可。
            </p>
          </div>
        </div>

        <DocsTip variant="warning" title="注意">
          加分項目的審查方式為「資料查核」，評鑑委員會實際檢視佐證文件，口頭說明不足以取分。
          請確保所有相關文件在評鑑當天備齊，並在自評表中清楚標示對應的佐證資料頁碼。
        </DocsTip>

        <SoapCta facility="home-nursing" />
      </div>

      {/* Prev / Next */}
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/home-nursing"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回總覽
        </Link>
        <SchoolDownloadButton catalogSlug="home-nursing" />
      </div>
    </>
  );
}
