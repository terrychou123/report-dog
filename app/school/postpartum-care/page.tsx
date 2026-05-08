import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { babycareProfile, meta as babycareMeta } from "@/lib/ai/evaluation-profiles/babycare";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import {
  SettingsIcon,
  HeartPulseIcon,
  ShieldIcon,
  StarIcon,
  ArrowRightIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "產後護理之家評鑑基準總覽",
  description:
    "115年度產後護理之家評鑑基準完整解說，共4大區塊17項目，幫助月子中心、產後護理之家管理人員掌握評鑑重點、提升評鑑通過率。",
  keywords: [
    "產後護理之家評鑑",
    "月子中心評鑑",
    "115年度評鑑",
    "產後護理之家評鑑基準",
    "評鑑小教室",
    "長照機構評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/postpartum-care" },
  openGraph: {
    title: "產後護理之家評鑑小教室｜評鑑小教室｜報告汪",
    description: "17 項產後護理之家評鑑基準完整解說，掌握評鑑重點，提升評鑑通過率。",
    url: "https://reportwang.com/school/postpartum-care",
  },
};

const sectionMeta = [
  {
    href: "/school/postpartum-care/administration",
    icon: SettingsIcon,
    name: "A、行政組織、經營管理與服務對象權益保障",
    shortCode: "A",
    itemRange: "項目 1–5",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/postpartum-care/professional-quality",
    icon: HeartPulseIcon,
    name: "B、專業服務與生活照顧",
    shortCode: "B",
    itemRange: "項目 6–13",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/postpartum-care/safety-environment",
    icon: ShieldIcon,
    name: "C、環境設施與安全維護",
    shortCode: "C",
    itemRange: "項目 14–15",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/postpartum-care/special-items",
    icon: StarIcon,
    name: "D、特別事項",
    shortCode: "D",
    itemRange: "項目 16–17",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-600 dark:text-purple-400",
  },
];

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "產後護理之家評鑑基準",
  description:
    "115 年度產後護理之家評鑑基準，共 17 項目、4 大區塊完整解說。",
  path: "/school/postpartum-care",
  hasPart: [
    {
      name: "A、行政組織、經營管理與服務對象權益保障（項目 1–5）",
      url: "https://reportwang.com/school/postpartum-care/administration",
    },
    {
      name: "B、專業服務與生活照顧（項目 6–13）",
      url: "https://reportwang.com/school/postpartum-care/professional-quality",
    },
    {
      name: "C、環境設施與安全維護（項目 14–15）",
      url: "https://reportwang.com/school/postpartum-care/safety-environment",
    },
    {
      name: "D、特別事項（項目 16–17）",
      url: "https://reportwang.com/school/postpartum-care/special-items",
    },
  ],
});

const FAQ_ITEMS = [
  { question: "產後護理之家評鑑分幾大區塊、共幾項？", answer: "4 大區塊（行政管理、專業護理照護、安全環境設施、特別事項）共 17 項評鑑基準。" },
  { question: "產後護理之家評鑑中最重視的文件是哪些？", answer: "母嬰評估紀錄（含 APGAR 評分、黃疸監測、哺乳評估）、護理人員資格與執照文件、感染管制措施記錄，以及緊急醫療轉送計畫。" },
  { question: "母嬰照護紀錄如何符合評鑑標準？", answer: "依母親與嬰兒分別建立個案標籤，護理師入住時完成初次評估並建檔，每日照護紀錄持續更新。AI 輔助確認紀錄格式符合評鑑基準要求。" },
  { question: "如何用報告汪管理產後護理之家文書？", answer: "匯入產後護理之家評鑑範本，依 4 大區塊建立標籤，評鑑前 AI 直接標示哪項基準的文件不足，不再臨時補件。" },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/postpartum-care"));

export default function PostpartumCarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">產後護理之家</Badge>
        <h1 className="text-2xl font-bold mb-3">產後護理之家評鑑基準總覽</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${babycareMeta.year} 年度` },
            { label: "主管機關", value: babycareMeta.agency },
            { label: "評鑑項目", value: `共 ${babycareMeta.totalItems} 項` },
            { label: "評鑑區塊", value: "4 大區塊（A–D）" },
          ]}
        />
        <SourceCallout meta={babycareMeta} />
        <div className="space-y-3 mt-2">
          <p className="text-muted-foreground text-sm leading-relaxed">
            115 年度產後護理之家評鑑依衛生福利部《護理人員法》及《產後護理機構設置標準》辦理，針對全台提供坐月子照護服務的產後護理之家（月子中心）進行定期品質考核。評鑑效期 4 年，是機構申請各類認證補助、強化市場信譽的重要依據。評鑑委員採資料查核、現場觀察、個案紀錄查閱三管齊下的方式進行，共設 17 個評鑑項目，分為 A 行政組織、B 專業服務、C 環境設施、D 特別事項 4 大區塊。
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            <strong className="text-foreground font-semibold">A 行政組織、經營管理與服務對象權益保障（項目 1–5）</strong>審查護產人員日班照護比例不超過 1.4 倍、NRP 新生兒急救及 BLS 基本救命術訓練資格、每年母乳哺育教育訓練 8 小時及機構外研習 8 小時，以及流感疫苗接種率達 80%。另須訂定 7 類意外事件標準作業程序，並建立品質管理委員會，每季彙整分析 6 項品質指標：嬰兒紅臀發生率、產婦乳腺炎發生率、純母乳哺育率、嬰兒體重回升達出生體重比率、嬰兒黃疸（需照光）發生率及服務對象滿意度；指標異常時須提出改善計畫並持續追蹤。
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            <strong className="text-foreground font-semibold">B 專業服務與生活照顧（項目 6–13）</strong>涵蓋產婦傷口護理、子宮復原評估、乳房護理與產後憂鬱篩查，嬰兒體重監測、黃疸評估與手腳環身分辨識，以及母嬰肌膚接觸指導、個別化哺乳計畫、母乳收集與貯存標準作業程序。<strong className="text-foreground font-semibold">C 環境設施與安全維護（項目 14–15）</strong>包含消防疏散系統、嬰兒室溫度維持 24–26°C、照護設備定期校正及天災緊急應變計畫。<strong className="text-foreground font-semibold">D 特別事項（項目 16–17）</strong>中，D1 加分項目獎勵積極推動母嬰親善認證及導入電子化照護記錄等創新服務，D2 試評扣分項目針對重大違規或照護疏失。
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            評鑑準備建議從三面向切入：（一）<strong className="text-foreground font-semibold">資料查核</strong>——護理人員執照效期與訓練紀錄、6 項品質指標季報、意外事件書面報告；（二）<strong className="text-foreground font-semibold">現場觀察</strong>——手部衛生五時機落實、嬰兒室溫濕度記錄、訪客管制登記、嬰兒手腳環身分辨識；（三）<strong className="text-foreground font-semibold">個案紀錄查閱</strong>——產婦護理評估紀錄、嬰兒餵食與體重紀錄、衛教回覆示教簽名。點擊下方各區塊可查看每項評鑑基準的詳細說明與準備要訣。
          </p>
        </div>
      </div>

      {/* 各區塊項目數對照 */}
      <div className="not-prose mb-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <caption className="py-2.5 px-4 text-left font-semibold text-foreground border-b bg-muted/30">
            115 年度產後護理之家評鑑各區塊概覽
          </caption>
          <thead>
            <tr className="border-b bg-muted/20 text-muted-foreground">
              <th className="py-2 px-4 text-left font-medium">評鑑區塊</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">項目範圍</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">項目數</th>
              <th className="py-2 px-4 text-left font-medium">主要查核重點</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 px-4 font-medium">A、行政組織、經營管理與服務對象權益保障</td>
              <td className="py-2 px-4 text-center text-muted-foreground">1–5</td>
              <td className="py-2 px-4 text-center">5 項</td>
              <td className="py-2 px-4 text-muted-foreground">人員配置、教育訓練、感染管制、意外事件、品質管理</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">B、專業服務與生活照顧</td>
              <td className="py-2 px-4 text-center text-muted-foreground">6–13</td>
              <td className="py-2 px-4 text-center">8 項</td>
              <td className="py-2 px-4 text-muted-foreground">產婦照護、嬰兒照護、哺乳、出住院評估、親子關係、緊急應變</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">C、環境設施與安全維護</td>
              <td className="py-2 px-4 text-center text-muted-foreground">14–15</td>
              <td className="py-2 px-4 text-center">2 項</td>
              <td className="py-2 px-4 text-muted-foreground">疏散避難系統、嬰兒疏散 SOP、天災緊急應變</td>
            </tr>
            <tr className="bg-muted/10">
              <td className="py-2 px-4 text-muted-foreground">D、特別事項</td>
              <td className="py-2 px-4 text-center text-muted-foreground">16–17</td>
              <td className="py-2 px-4 text-center text-muted-foreground">2 項</td>
              <td className="py-2 px-4 text-muted-foreground">配合政策加分、重大異常情事試評扣分</td>
            </tr>
            <tr className="border-t bg-muted/20 font-semibold">
              <td className="py-2 px-4">合計</td>
              <td className="py-2 px-4 text-center">1–17</td>
              <td className="py-2 px-4 text-center">17 項</td>
              <td className="py-2 px-4 text-xs text-muted-foreground font-normal">B、專業服務與生活照顧項目最多（8 項）</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {sectionMeta.map((sec) => {
          const section = babycareProfile.sections.find((s) => s.shortCode === sec.shortCode);
          const Icon = sec.icon;
          return (
            <Link
              key={sec.href}
              href={sec.href}
              className="group rounded-xl border bg-card p-5 hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 rounded-lg p-2 ${sec.bgClass}`}>
                  <Icon className={`h-5 w-5 ${sec.textClass}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                    {sec.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">{sec.itemRange}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {section?.items.slice(0, 4).map((item) => (
                      <span
                        key={item.id}
                        className="text-xs bg-muted rounded px-1.5 py-0.5 text-muted-foreground"
                      >
                        {item.title}
                      </span>
                    ))}
                    {(section?.items.length ?? 0) > 4 && (
                      <span className="text-xs text-muted-foreground px-1.5 py-0.5">
                        +{(section?.items.length ?? 0) - 4} 項
                      </span>
                    )}
                  </div>
                  <ArrowRightIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Full item list */}
      <div>
        <h2 className="text-lg font-semibold mb-4">全部 17 項評鑑項目</h2>
        <div className="space-y-6">
          {babycareProfile.sections.map((section) => {
            const slug = sectionMeta.find((s) => s.shortCode === section.shortCode)?.href.split("/").at(-1);
            if (!slug) return null;
            return (
              <div key={section.shortCode}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.name}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/school/postpartum-care/${slug}#item-${item.id}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors group"
                    >
                      <span className="shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-mono font-semibold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {item.id}
                      </span>
                      <span className="text-sm group-hover:text-primary transition-colors">
                        {item.title}
                      </span>
                      <Badge variant="outline" className="ml-auto text-xs shrink-0">
                        {item.responsible}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Download CTA */}
      <div className="mt-10 rounded-xl border border-dashed border-primary/30 bg-muted/50 p-5 text-center">
        <p className="text-sm font-semibold mb-1">📋 免費下載自我檢查表</p>
        <p className="text-sm text-muted-foreground mb-3">
          下載「產後護理之家」評鑑自我檢查表（Excel），對照評鑑基準逐項自我檢核。
        </p>
        <a
          href="/downloads/babycare.xlsx"
          download
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <DownloadIcon className="h-4 w-4" />
          免費下載 Excel 檢查表 →
        </a>
      </div>

      {/* Import CTA */}
      <div className="mt-10 rounded-xl bg-primary/5 border border-primary/20 p-5">
        <p className="text-sm font-semibold mb-1">看完評鑑基準了嗎？</p>
        <p className="text-sm text-muted-foreground mb-3">
          到報告汪一鍵匯入「產後護理之家」評鑑範本，包含 4 個標籤和 17 份報告範本，省去手動建立的時間。
        </p>
        <Link
          href="/docs/import-templates"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          了解如何匯入評鑑範本 →
        </Link>
      </div>

      
      {/* 評鑑準備流程圖 */}
      <div className="not-prose my-6">
        <Image
          src="/school/postpartum-care-prep-flow.svg"
          alt="產後護理之家評鑑準備 4 大步驟：自評診斷、文件整備、模擬預演、正式評鑑"
          className="w-full rounded-xl"
          width={800}
          height={500}
          loading="lazy"
        />
      </div>

      {/* 評鑑常見缺失案例 */}
      <div className="not-prose my-8 space-y-4">
        <h2 className="text-base font-semibold text-foreground">評鑑常見缺失案例</h2>

        <div className="rounded-xl border overflow-hidden text-sm">
          <div className="flex items-center gap-2 bg-amber-500/10 border-b px-4 py-2.5">
            <span className="font-semibold text-amber-700 dark:text-amber-400">缺失情境</span>
            <span className="text-muted-foreground">項目 B5・母乳哺育及母乳貯存</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱母乳貯存記錄，發現母乳標籤僅記錄姓名與日期，缺少「擠奶時間」及「使用期限」；冷凍保存的母乳超過建議保存期限未予丟棄，無定期清查記錄。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            統一採用標準化母乳標籤（含：姓名/日期/擠奶時間/使用期限），建立母乳清查週記錄表，護理師每週盤點冷凍母乳，標籤超期前一日主動提醒產婦並記錄處置結果。
          </p>
        </div>

        <div className="rounded-xl border overflow-hidden text-sm">
          <div className="flex items-center gap-2 bg-amber-500/10 border-b px-4 py-2.5">
            <span className="font-semibold text-amber-700 dark:text-amber-400">缺失情境</span>
            <span className="text-muted-foreground">項目 C1・疏散避難（含嬰兒疏散 SOP）</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱緊急疏散計畫，發現疏散路線圖未標示「嬰兒室疏散路線」，且演練記錄顯示嬰兒疏散僅使用空床模擬，未以嬰兒模型測試實際搬運效率，演練完成時間超過安全目標。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            更新疏散路線圖（分別標示產婦路線與嬰兒室路線），採用嬰兒模型每季演練嬰兒疏散流程，記錄完成時間並訂定改善目標（每嬰兒 ≤30 秒完成疏散），逐次提升達標率。
          </p>
        </div>
      </div>
      <SchoolFaqSection items={FAQ_ITEMS} />
    </>
  );
}
