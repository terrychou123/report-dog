import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd, requireSection , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { homeNursingProfile, meta as homeNursingMeta } from "@/lib/ai/evaluation-profiles/home-nursing";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { homeNursingTips } from "@/lib/evaluation-tips/home-nursing";

export const metadata: Metadata = {
  title: "A2 感染管制與器材維護（8%）｜居家護理所評鑑",
  description:
    "115年度居家護理所評鑑 A2 感染管制作業與器材維護管理（8%）完整說明：感染管制手冊四大必備內容（傳染病/肺結核/疥瘡/手部衛生）、感染性醫療廢棄物處理、醫材儀器定期盤點校正要求，含評鑑準備要訣。",
  keywords: [
    "居家護理感染管制評鑑",
    "居家護理所感染管制手冊",
    "居家護理醫材維護評鑑",
    "115年度居家護理所評鑑",
    "居家護理感染管制作業",
    "感染性醫療廢棄物處理",
  ],
  alternates: {
    canonical: "/school/home-nursing/infection-control",
  },
  openGraph: {
    title: "A2 感染管制與器材維護（8%）｜居家護理所評鑑｜報告汪",
    description: "居家護理所評鑑 A2 感染管制手冊規範、廢棄物處理與器材維護全攻略。",
    url: "https://reportwang.com/school/home-nursing/infection-control",
  },
};

const sectionA = requireSection(homeNursingProfile.sections, "A");
// A2 感染管制作業與器材維護管理（id=2）
const a2Item = sectionA.items.find((i) => i.id === 2)!;
const section = { ...sectionA, items: [a2Item] };

const tips = homeNursingTips;

const jsonLd = schoolSubpageJsonLd({
  type: "home-nursing",
  subpage: "infection-control",
  section,
  name: "A2 感染管制作業與器材維護管理（居家護理所評鑑）",
  description:
    "115年度居家護理所評鑑 A2 感染管制作業與器材維護管理（8%）：手冊規範、廢棄物處理要求、器材校正制度完整說明。",
  extraFaq: [
    {
      question: "A2 感染管制手冊必須包含哪 4 項內容？",
      answer:
        "依疾管署指引，手冊至少須包含：（1）傳染病、（2）肺結核、（3）疥瘡、（4）手部衛生等訪視作業規範，且需落實相關管制措施。",
    },
    {
      question: "居家護理所的感染性醫療廢棄物如何處理？",
      answer:
        "機構須訂定居家照護感染性醫療廢棄物的處理方式，包含分類、包裝、暫存及委託清除規範。評鑑時查核書面規定及實際執行記錄。",
    },
    {
      question: "醫材及儀器設備需要多久盤點一次？",
      answer:
        "評鑑基準要求定期盤點、維修、保養及校正，並留有紀錄，同時設有專人管理及維護。具體頻率由機構自定，但須在紀錄中呈現一致性。",
    },
    {
      question: "A2 有試評項目，如何處理？",
      answer:
        "評鑑基準第 2 點（流感疫苗接種率達 80%）為【試評，本年度不計分】。建議仍備妥相關紀錄，以利日後正式計分時直接使用；接種率低若有說明書面排除禁忌症者，可計入分母外。",
    },
  ],
});

export default function HomeNursingInfectionControlPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-0 hover:bg-orange-500/20">
          A、經營管理
        </Badge>
        <h1 className="text-2xl font-bold mb-3">A2 感染管制作業與器材維護管理（8%）</h1>
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
          居家護理的感染管制比機構照護更複雜，因為訪視地點分散、環境不可控。A2 要求機構建立完整的感控作業手冊，並落實醫材維護管理，是評鑑中最容易因「手冊內容不完整」或「紀錄缺失」而失分的項目之一。
        </p>
      </div>

      {/* 評鑑標準 */}
      <section id={`item-${a2Item.id}`} className="mb-10 scroll-mt-20">
        <h2 className="text-base font-bold mb-3">評鑑標準（A2，項目 2）</h2>
        <ol className="space-y-2">
          {a2Item.criteria.map((criterion, i) => (
            <li key={i} className="flex gap-2.5 text-sm">
              <span className="shrink-0 mt-0.5 w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-mono text-foreground">
                {i + 1}
              </span>
              <span className={criterion.startsWith("【試評") ? "text-amber-700 dark:text-amber-400" : "text-muted-foreground"}>
                {criterion}
              </span>
            </li>
          ))}
        </ol>

        {a2Item.criteria.some((c) => c.startsWith("【試評")) && (
          <div className="mt-3 flex items-start gap-2 px-3 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm">
            <span className="text-amber-600 dark:text-amber-400 font-semibold shrink-0">⚠ 試評注意</span>
            <span className="text-amber-700 dark:text-amber-400">
              流感疫苗接種率（本年度不計分），建議仍備妥工作人員接種紀錄，以利日後正式計分使用。
              排除經評估具接種禁忌症不宜接種者後計算比率。
            </span>
          </div>
        )}
      </section>

      {/* 感控手冊四大必備 */}
      <section className="mb-10">
        <h2 className="text-base font-bold mb-4">感染管制手冊四大必備內容</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {["傳染病訪視作業規範", "肺結核訪視作業規範", "疥瘡訪視作業規範", "手部衛生訪視作業規範"].map((item, i) => (
            <div key={i} className="rounded-lg border p-3 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center text-xs font-bold text-orange-600 dark:text-orange-400 shrink-0">
                {i + 1}
              </span>
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
        <DocsTip variant="info" title="手冊審查重點">
          評鑑委員會逐一確認手冊是否包含上述 4 項，且內容是否與疾管署最新指引一致。
          建議直接引用疾管署指引原文並說明機構適用方式，勿自行簡化或重寫標準。
        </DocsTip>
      </section>

      {/* 廢棄物與醫材 */}
      <section className="mb-10">
        <h2 className="text-base font-bold mb-4">感染性廢棄物 × 醫材維護</h2>
        <div className="space-y-3">
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-semibold mb-1">感染性醫療廢棄物處理</h3>
            <p className="text-sm text-muted-foreground">
              須訂有書面處理規定，涵蓋分類（紅袋/黃袋）、包裝密封、暫存地點、委託清除頻率與廠商資訊。
              每次廢棄物清除需留存清除聯單或紀錄。
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-semibold mb-1">醫材及儀器設備管理</h3>
            <p className="text-sm text-muted-foreground">
              評鑑查核重點：① 財產盤點紀錄（設備清冊+盤點日期）；② 維修保養紀錄（故障報修→維修完成）；
              ③ 校正紀錄（血壓計、血糖機等需定期校正之設備）；④ 專人管理之指派文件。
            </p>
          </div>
        </div>

        <DocsTip variant="warning" title="常見扣分原因">
          ① 感控手冊缺少肺結核或疥瘡章節；② 廢棄物清除無聯單紀錄；
          ③ 血壓計等儀器僅有採購紀錄，無定期校正紀錄；④ 無指定感控負責人或責任不明確。
        </DocsTip>
      </section>

      {tips[2] && (
        <DocsTip variant={tips[2].variant ?? "neutral"} title="準備要訣">
          {tips[2].content}
        </DocsTip>
      )}

      {/* Prev / Next */}
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/home-nursing/management"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          A、經營管理（全部項目）
        </Link>
        <Link
          href="/school/home-nursing/quality-indicators"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          A5 品質指標監測
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
