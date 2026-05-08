import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import { psychiatricNursingHomeProfile, meta as psychiatricNursingHomeMeta } from "@/lib/ai/evaluation-profiles/psychiatric-nursing-home";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { Button } from "@/components/ui/button";
import {
  SettingsIcon,
  HeartPulseIcon,
  ShieldIcon,
  UsersIcon,
  SparklesIcon,
  ArrowRightIcon,
  DownloadIcon,
  FileTextIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "精神護理之家評鑑小教室｜報告汪",
  description:
    "115年度精神護理之家評鑑基準完整解說，共5大面向36條指標。涵蓋經營管理效能（9條）、專業照護品質（21條）、安全維護及設施設備（3條）、住民權益保障（2條）及創新及改革（1條）。",
  keywords: [
    "精神護理之家評鑑",
    "115年度評鑑",
    "精神護理機構",
    "精神衛生法",
    "評鑑基準",
    "護理之家評鑑",
    "精神障礙者照護",
  ],
  alternates: {
    canonical: "https://reportwang.com/school/psychiatric-nursing-home",
  },
  openGraph: {
    title: "精神護理之家評鑑小教室｜報告汪",
    description:
      "115年度精神護理之家評鑑基準完整解說，共5大面向36條指標。",
    url: "https://reportwang.com/school/psychiatric-nursing-home",
  },
};

const sectionMeta = [
  {
    shortCode: "A",
    label: "A、經營管理效能",
    icon: SettingsIcon,
    color: "blue",
    href: "/school/psychiatric-nursing-home/management",
    range: "A1.1–A5.1",
    count: 9,
    desc: "業務計畫、人員配置、工作人員權益、教育訓練、資料管理",
  },
  {
    shortCode: "B",
    label: "B、專業照護品質",
    icon: HeartPulseIcon,
    color: "green",
    href: "/school/psychiatric-nursing-home/professional-quality",
    range: "B1.1–B3.2",
    count: 21,
    desc: "住民服務計畫、防疫機制、跨專業照護、藥品管理、品質監測、膳食服務",
  },
  {
    shortCode: "C",
    label: "C、安全維護及設施設備",
    icon: ShieldIcon,
    color: "orange",
    href: "/school/psychiatric-nursing-home/safety-facilities",
    range: "C1.1–C1.3",
    count: 3,
    desc: "疏散避難系統、火災應變計畫、夜間演練（含1項重點項目）",
  },
  {
    shortCode: "D",
    label: "D、住民權益保障",
    icon: UsersIcon,
    color: "purple",
    href: "/school/psychiatric-nursing-home/resident-rights",
    range: "D1.1–D1.2",
    count: 2,
    desc: "尊重住民信仰、推動安寧緩和療護及病人自主權利",
  },
  {
    shortCode: "E",
    label: "E、創新及改革",
    icon: SparklesIcon,
    color: "rose",
    href: "/school/psychiatric-nursing-home/innovation",
    range: "E1.1",
    count: 1,
    desc: "創新或特色措施具有成效並公開分享",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  green: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
  orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800",
};

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "精神護理之家評鑑小教室",
  description:
    "115年度精神護理之家評鑑基準完整解說，共5大面向36條指標。",
  path: "/school/psychiatric-nursing-home",
});

const FAQ_ITEMS = [
  { question: "精神護理之家評鑑分幾大面向、共幾條？", answer: "5 大面向（A 經營管理、B 專業照護、C 安全設施、D 住民權益、E 創新改革）共 36 條評鑑基準。" },
  { question: "B 區專業照護最重視哪些文件？", answer: "住民服務計畫（含精神狀態評估、職能復健目標）、跨專業團隊會議記錄（護理師、職能治療師、社工師參與）、危機介入記錄與約束使用評估文件。" },
  { question: "精神護理之家如何管理住民服務計畫？", answer: "依住民建立個人標籤，護理師、職能治療師各自在對應標籤撰寫評估與計畫。評鑑前 AI 分析哪位住民的計畫文件不完整或未按期更新。" },
  { question: "如何用報告汪準備精神護理之家評鑑？", answer: "匯入精神護理之家評鑑範本，AI 自動對應 36 條基準，標示哪個面向的文件缺漏，讓護理長與職能治療師分工補件效率提升。" },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/psychiatric-nursing-home"));

export default function PsychiatricNursingHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="mb-6">
        <Badge className="mb-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0 hover:bg-blue-500/20">
          精神護理之家
        </Badge>
        <h1 className="text-2xl font-bold mb-3">精神護理之家評鑑小教室</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${psychiatricNursingHomeMeta.year} 年度` },
            { label: "主管機關", value: psychiatricNursingHomeMeta.agency },
            { label: "評鑑項目", value: `共 ${psychiatricNursingHomeMeta.totalItems} 條` },
            { label: "評鑑面向", value: "5 大面向" },
          ]}
        />
        <SourceCallout meta={psychiatricNursingHomeMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed mt-2">
          115年度精神護理之家評鑑基準共分為 5 大面向 36 條指標，包含一般項目 32 條、可選項目 2 條（B1.9 侵入性照護、B3.2 管灌）及重點項目 2 條（A2.2 人員設置、C1.1 疏散避難）。依據衛生福利部公告之評鑑基準及精神衛生法規範辦理。
        </p>
      </div>

      {/* 各面向條數對照 */}
      <div className="not-prose mb-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <caption className="py-2.5 px-4 text-left font-semibold text-foreground border-b bg-muted/30">
            115 年度精神護理之家評鑑 5 大面向概覽
          </caption>
          <thead>
            <tr className="border-b bg-muted/20 text-muted-foreground">
              <th className="py-2 px-4 text-left font-medium">評鑑面向</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">指標範圍</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">條數</th>
              <th className="py-2 px-4 text-left font-medium">主要查核重點</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 px-4 font-medium">A、經營管理效能</td>
              <td className="py-2 px-4 text-center text-muted-foreground">A1.1–A5.1</td>
              <td className="py-2 px-4 text-center">9 條</td>
              <td className="py-2 px-4 text-muted-foreground">業務計畫、人員設置（重點）、工作人員權益、教育訓練、資料管理</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">B、專業照護品質</td>
              <td className="py-2 px-4 text-center text-muted-foreground">B1.1–B3.2</td>
              <td className="py-2 px-4 text-center">21 條</td>
              <td className="py-2 px-4 text-muted-foreground">住民服務計畫、防疫機制、跨專業照護、品質監測、膳食服務（含可選 2 條）</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">C、安全維護及設施設備</td>
              <td className="py-2 px-4 text-center text-muted-foreground">C1.1–C1.3</td>
              <td className="py-2 px-4 text-center">3 條</td>
              <td className="py-2 px-4 text-muted-foreground">疏散避難系統（重點）、火災應變計畫、夜間演練</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">D、住民權益保障</td>
              <td className="py-2 px-4 text-center text-muted-foreground">D1.1–D1.2</td>
              <td className="py-2 px-4 text-center">2 條</td>
              <td className="py-2 px-4 text-muted-foreground">尊重住民信仰、推動安寧緩和療護及病人自主權利</td>
            </tr>
            <tr className="bg-muted/10">
              <td className="py-2 px-4 text-muted-foreground">E、創新及改革</td>
              <td className="py-2 px-4 text-center text-muted-foreground">E1.1</td>
              <td className="py-2 px-4 text-center text-muted-foreground">1 條</td>
              <td className="py-2 px-4 text-muted-foreground">創新或特色措施具有成效並公開分享</td>
            </tr>
            <tr className="border-t bg-muted/20 font-semibold">
              <td className="py-2 px-4">合計</td>
              <td className="py-2 px-4 text-center">A–E</td>
              <td className="py-2 px-4 text-center">36 條</td>
              <td className="py-2 px-4 text-xs text-muted-foreground font-normal">一般 32 條、可選 2 條（B1.9/B3.2）、重點 2 條（A2.2/C1.1）</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {sectionMeta.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.shortCode}
              href={section.href}
              className="group border rounded-lg p-4 hover:border-foreground/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-md ${colorMap[section.color].split(" ").slice(0, 2).join(" ")}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{section.label}</span>
                    <Badge variant="secondary" className="text-xs py-0 h-4">
                      {section.count} 條
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {section.desc}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    <span>{section.range}</span>
                    <ArrowRightIcon className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* All Items List */}
      <div className="mb-8">
        <h2 className="text-base font-semibold mb-3">全部 36 條指標一覽</h2>
        <div className="space-y-1">
          {psychiatricNursingHomeProfile.sections.map((section) => (
            <div key={section.shortCode}>
              <div className="text-xs font-medium text-muted-foreground px-2 py-1.5 mt-2">
                {section.name}
              </div>
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 px-2 py-1.5 rounded hover:bg-muted/50 transition-colors"
                >
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${colorMap[sectionMeta.find((s) => s.shortCode === section.shortCode)?.color ?? "blue"].split(" ").slice(0, 2).join(" ")}`}
                  >
                    {item.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.title}</span>
                      {"isTrialDeduction" in item && item.isTrialDeduction && (
                        <Badge variant="destructive" className="text-xs py-0 h-4">
                          重點
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {item.responsible}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="border rounded-lg p-4 mb-4 bg-muted/30">
        <h3 className="font-medium text-sm mb-1">下載自我檢核表</h3>
        <p className="text-xs text-muted-foreground mb-3">
          下載精神護理之家評鑑自我檢核表（Excel），逐項確認評鑑準備進度。
        </p>
        <Button variant="outline" size="sm" asChild>
          <a href="/downloads/psychiatric-nursing-home.xlsx" download>
            <DownloadIcon className="h-3.5 w-3.5 mr-1.5" />
            下載 Excel 檢核表
          </a>
        </Button>
      </div>

      <div className="border rounded-lg p-4 bg-muted/30">
        <h3 className="font-medium text-sm mb-1">匯入評鑑報告範本</h3>
        <p className="text-xs text-muted-foreground mb-3">
          將精神護理之家評鑑報告範本匯入報告汪，由 AI 協助分析撰寫。
        </p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/docs/import-templates">
            <FileTextIcon className="h-3.5 w-3.5 mr-1.5" />
            了解如何匯入範本
          </Link>
        </Button>
      </div>

      
      {/* 評鑑準備流程圖 */}
      <div className="not-prose my-6">
        <Image
          src="/school/psychiatric-nursing-home-prep-flow.svg"
          alt="精神護理之家評鑑準備 4 大步驟：自評診斷、文件整備、模擬預演、正式評鑑"
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
            <span className="text-muted-foreground">B、專業照護品質・住民服務計畫整合（B1.1–B1.5）</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查閱住民服務計畫，發現精神狀態評估工具僅入住時施測一次，未按季度重新評估；護理師、職能治療師、社工師雖各有紀錄，但分散存放，未整合為統一的跨專業計畫書。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            建立「住民服務計畫年曆」（標記每季評估時間），設計跨專業整合計畫書格式（三專業人員同頁簽章），每季召開跨專業個案研討並留存會議記錄，由護理長督導執行率。
          </p>
        </div>

        <div className="rounded-xl border overflow-hidden text-sm">
          <div className="flex items-center gap-2 bg-amber-500/10 border-b px-4 py-2.5">
            <span className="font-semibold text-amber-700 dark:text-amber-400">缺失情境</span>
            <span className="text-muted-foreground">C1・疏散避難系統（重點項目）</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            委員查察疏散設備，發現緊急照明燈電池長期未維護、實際亮度不足；且演練記錄顯示精神科病房的個別化疏散方案未涵蓋「拒絕疏散之個案的處置程序」，夜間演練缺失。
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border-t px-4 py-2.5">
            <span className="font-semibold text-green-700 dark:text-green-400">改善後做法</span>
          </div>
          <p className="px-4 py-3 text-muted-foreground leading-relaxed">
            建立緊急照明設備月度點檢制度，訂定精神科病房特殊疏散 SOP（含拒絕疏散個案的二人協助流程），每年辦理 1 次夜間演練並留存影像記錄，演練後召開缺失改善會議。
          </p>
        </div>
      </div>
      <SchoolFaqSection items={FAQ_ITEMS} />
    </>
  );
}
