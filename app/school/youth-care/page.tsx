import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { youthCareProfile, meta as youthCareMeta } from "@/lib/ai/evaluation-profiles/youth-care";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import {
  SettingsIcon,
  BuildingIcon,
  HeartPulseIcon,
  FileTextIcon,
  StarIcon,
  ArrowRightIcon,
  DownloadIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "112年度兒少安置機構評鑑指標｜35項完整解說｜兒少評鑑準備",
  description:
    "112年度兒童及少年安置機構評鑑指標完整說明，共35項目、5大區塊：行政組織與經營管理（10分）、建築物環境及設施設備（10分）、專業服務（60分）、財務管理（20分）及特殊事項或措施（±10分）。幫助機構社工、生輔人員、行政主管快速掌握評鑑重點。",
  keywords: [
    "兒少安置機構評鑑",
    "兒童及少年安置機構",
    "112年度評鑑",
    "兒童及少年福利機構評鑑",
    "安置機構評鑑基準",
    "兒少評鑑準備",
    "安置機構評鑑指標",
  ],
  alternates: { canonical: "https://reportwang.com/school/youth-care" },
  openGraph: {
    title: "112年度兒少安置機構評鑑指標｜35項完整解說｜報告汪",
    description: "112年度兒少安置機構評鑑基準完整解說，掌握5大區塊評鑑重點，提升評鑑通過率。",
    url: "https://reportwang.com/school/youth-care",
  },
};

const sectionMeta = [
  {
    href: "/school/youth-care/administration",
    icon: SettingsIcon,
    name: "壹、行政組織與經營管理",
    shortCode: "管",
    itemRange: "項目 1–6・10分",
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  {
    href: "/school/youth-care/environment",
    icon: BuildingIcon,
    name: "貳、建築物環境及設施設備",
    shortCode: "環",
    itemRange: "項目 7–14・10分",
    bgClass: "bg-teal-500/10",
    textClass: "text-teal-600 dark:text-teal-400",
  },
  {
    href: "/school/youth-care/professional-quality",
    icon: HeartPulseIcon,
    name: "參、專業服務",
    shortCode: "專",
    itemRange: "項目 15–28・60分",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/school/youth-care/finance",
    icon: FileTextIcon,
    name: "肆、財務管理",
    shortCode: "財",
    itemRange: "項目 29・20分",
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
  },
  {
    href: "/school/youth-care/innovation",
    icon: StarIcon,
    name: "伍、特殊事項或措施（含創新服務方案）",
    shortCode: "特",
    itemRange: "項目 30–35・±10分",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-600 dark:text-purple-400",
  },
];

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "兒少安置機構評鑑基準",
  description:
    "112年度兒童及少年安置機構評鑑指標，共35項目、5大區塊完整解說。",
  path: "/school/youth-care",
  hasPart: sectionMeta.map((s) => ({
    name: s.name,
    url: `https://reportwang.com${s.href}`,
    description: s.itemRange,
  })),
});

const FAQ_ITEMS = [
  { question: "兒少教養機構評鑑分幾大區塊、共幾項？", answer: "5 大區塊（行政管理、環境設施、個別化服務計畫、服務品質、財務管理）共 35 項評鑑項目。" },
  { question: "個別化服務計畫（ISP）在評鑑中如何準備？", answer: "ISP 需包含個案背景評估、輔導目標（短中長期）、服務措施與評估結果，並須有家長/監護人參與確認記錄，每年至少更新一次。" },
  { question: "資源連結與社區融合的文件如何整理？", answer: "依資源類型（教育、職訓、心理、醫療）建立標籤，記錄轉介日期、服務機構、個案參與情形，評鑑前篩選對應標籤提供佐證。" },
  { question: "如何用報告汪管理兒少機構的個案紀錄與評鑑文書？", answer: "匯入兒少安置機構評鑑範本，依 5 大區塊分標籤，AI 輔助個案輔導記錄撰寫，評鑑前直接篩選備審文件，省去手動彙整的時間。" },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/youth-care"));

export default function YouthCareSchoolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="prose prose-sm dark:prose-invert max-w-none mb-8">
        <h1 className="text-2xl font-bold mb-2">兒少安置機構評鑑基準</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${youthCareMeta.year} 年度` },
            { label: "資料來源", value: youthCareMeta.agency },
            { label: "評鑑項目", value: `共 ${youthCareMeta.totalItems} 項` },
            { label: "評鑑區塊", value: "5 大區塊" },
          ]}
        />
        <SourceCallout meta={youthCareMeta} />
        <p className="text-muted-foreground mt-2">
          112年度兒童及少年安置機構評鑑指標，共 35 項目、5 大區塊。專業服務配分最重（60分），另含財務管理（20分）及特殊事項加減分（±10分），幫助機構人員系統性準備評鑑。
        </p>
      </div>

      {/* 配分總覽 */}
      <div className="mb-8 rounded-xl border bg-muted/20 p-4">
        <p className="text-xs font-semibold text-muted-foreground mb-3">各區塊配分</p>
        <div className="grid grid-cols-5 gap-2 text-center">
          {[
            { label: "壹 行政管理", score: "10分", color: "text-orange-600 dark:text-orange-400" },
            { label: "貳 環境設備", score: "10分", color: "text-teal-600 dark:text-teal-400" },
            { label: "參 專業服務", score: "60分", color: "text-blue-600 dark:text-blue-400" },
            { label: "肆 財務管理", score: "20分", color: "text-green-600 dark:text-green-400" },
            { label: "伍 特殊事項", score: "±10分", color: "text-purple-600 dark:text-purple-400" },
          ].map((item) => (
            <div key={item.label} className="rounded-lg bg-card border p-2.5">
              <div className={`text-base font-bold ${item.color}`}>{item.score}</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-tight">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 各區塊配分對照 */}
      <div className="not-prose mb-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <caption className="py-2.5 px-4 text-left font-semibold text-foreground border-b bg-muted/30">
            112 年度兒少安置機構評鑑各區塊配分對照
          </caption>
          <thead>
            <tr className="border-b bg-muted/20 text-muted-foreground">
              <th className="py-2 px-4 text-left font-medium">評鑑區塊</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">項目範圍</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">項目數</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">配分</th>
              <th className="py-2 px-4 text-left font-medium">主要查核重點</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 px-4 font-medium">壹、行政組織與經營管理</td>
              <td className="py-2 px-4 text-center text-muted-foreground">1–6</td>
              <td className="py-2 px-4 text-center">6 項</td>
              <td className="py-2 px-4 text-center font-medium">10 分</td>
              <td className="py-2 px-4 text-muted-foreground">董事會功能、組織運作、人員資格、訓練進修、勞動條件</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">貳、建築物環境及設施設備</td>
              <td className="py-2 px-4 text-center text-muted-foreground">7–14</td>
              <td className="py-2 px-4 text-center">8 項</td>
              <td className="py-2 px-4 text-center font-medium">10 分</td>
              <td className="py-2 px-4 text-muted-foreground">整體環境衛生、公共安全、飲食衛生、健康醫療設備</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">參、專業服務</td>
              <td className="py-2 px-4 text-center text-muted-foreground">15–28</td>
              <td className="py-2 px-4 text-center">14 項</td>
              <td className="py-2 px-4 text-center font-bold text-primary">60 分</td>
              <td className="py-2 px-4 text-muted-foreground">個案紀錄、輔導目標、服務品質（2歲以下/以上）、權益保障</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">肆、財務管理</td>
              <td className="py-2 px-4 text-center text-muted-foreground">29</td>
              <td className="py-2 px-4 text-center">1 項</td>
              <td className="py-2 px-4 text-center font-medium">20 分</td>
              <td className="py-2 px-4 text-muted-foreground">財務查核結果計分（4次查核，每次 5 分）</td>
            </tr>
            <tr className="bg-muted/10">
              <td className="py-2 px-4 text-muted-foreground">伍、特殊事項或措施</td>
              <td className="py-2 px-4 text-center text-muted-foreground">30–35</td>
              <td className="py-2 px-4 text-center text-muted-foreground">6 項</td>
              <td className="py-2 px-4 text-center text-muted-foreground">±10 分</td>
              <td className="py-2 px-4 text-muted-foreground">違規扣分、服務學習、社工薪資、創新服務方案</td>
            </tr>
            <tr className="border-t bg-muted/20 font-semibold">
              <td className="py-2 px-4">合計</td>
              <td className="py-2 px-4 text-center">1–35</td>
              <td className="py-2 px-4 text-center">35 項</td>
              <td className="py-2 px-4 text-center">100 分 ±10</td>
              <td className="py-2 px-4 text-xs text-muted-foreground font-normal">參、專業服務配分最重（60 分）</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {sectionMeta.map((section) => {
          const Icon = section.icon;
          const profileSection = youthCareProfile.sections.find(
            (s) => s.shortCode === section.shortCode
          );
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group relative rounded-xl border bg-card p-5 hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 rounded-lg ${section.bgClass} p-2`}>
                  <Icon className={`h-5 w-5 ${section.textClass}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                    {section.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {section.itemRange}
                  </p>
                  {/* Item chips preview */}
                  {profileSection && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {profileSection.items.slice(0, 4).map((item) => (
                        <span
                          key={item.id}
                          className={`text-xs px-2 py-0.5 rounded-full ${section.bgClass} ${section.textClass}`}
                        >
                          {item.id}. {item.title.length > 10 ? item.title.slice(0, 10) + "…" : item.title}
                        </span>
                      ))}
                      {profileSection.items.length > 4 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          +{profileSection.items.length - 4} 項
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {profileSection?.items.length ?? 0} 項基準
                    </Badge>
                    <ArrowRightIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Full item list */}
      <div className="mt-10 space-y-6">
        <h2 className="text-lg font-semibold">所有評鑑項目</h2>
        {youthCareProfile.sections.map((section) => {
          const meta = sectionMeta.find((m) => m.shortCode === section.shortCode);
          if (!meta) return null;
          return (
            <div key={section.name}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${meta.bgClass} ${meta.textClass}`}>
                  {section.shortCode}
                </span>
                <span className="text-sm font-medium">{section.name}</span>
              </div>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {section.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`${meta.href}#item-${item.id}`}
                    className="flex items-center gap-2.5 rounded-lg border bg-card px-3 py-2 hover:border-primary/40 hover:bg-muted/40 transition-colors"
                  >
                    <span className={`w-7 h-7 rounded-full ${meta.bgClass} flex items-center justify-center text-xs font-bold ${meta.textClass} font-mono shrink-0`}>
                      {item.id}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.responsible}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Import Templates CTA */}
      <div className="mt-10 rounded-xl bg-primary/5 border border-primary/20 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="shrink-0 rounded-xl bg-primary/10 p-3">
            <DownloadIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold mb-1">一鍵匯入兒少安置機構評鑑範本</h2>
            <p className="text-sm text-muted-foreground">
              學完評鑑基準後，到報告汪一鍵匯入兒少安置機構的標籤與報告範本（含個案輔導目標、服務品質、資源結合等評鑑項目），AI 協助填寫內容，省去手動建立的時間。
            </p>
          </div>
        </div>
      </div>

      
      {/* 評鑑準備流程圖 */}
      <div className="not-prose my-6">
        <Image
          src="/school/youth-care-prep-flow.svg"
          alt="兒少安置機構評鑑準備 4 大步驟：自評診斷、文件整備、模擬預演、正式評鑑"
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
            <span className="text-muted-foreground">參、專業服務・個案輔導目標（雙版本）</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱個案輔導計畫，發現輔導目標缺乏依年齡（2 歲以下/2 歲以上）分版本的評估工具記錄，且長期目標超過一年未更新，未反映個案近期發展狀況變化。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            採用分版本評估工具（2 歲以下用嬰兒期評量、2 歲以上用兒童發展評量），每半年召開個案評估會議，更新輔導目標並記錄個案具體進步指標，生輔員與社工師共同簽章確認。
          </p>
        </div>

        <div className="rounded-xl border overflow-hidden text-sm">
          <div className="flex items-center gap-2 bg-amber-500/10 border-b px-4 py-2.5">
            <span className="font-semibold text-amber-700 dark:text-amber-400">缺失情境</span>
            <span className="text-muted-foreground">肆、財務管理・帳務分類與查核</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員進行財務查核時，發現機構營運費用與個案生活費混帳，零用金管理未設立雙重授權機制，每月結算記錄不完整，導致財務查核 4 次中有 2 次扣分。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委託會計師事務所進行帳務重整，設立「營運費用」與「個案生活費」獨立帳冊，零用金設立雙重授權制（社工主任＋財務主任），每月完成收支報表並存檔，每季報主管審閱簽核。
          </p>
        </div>
      </div>
      <SchoolFaqSection items={FAQ_ITEMS} />
    </>
  );
}
