import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd, faqPageJsonLd, mergeJsonLdGraph } from "@/lib/jsonld";
import {
  psychiatricRehabilitationDayProfile,
  psychiatricRehabilitationResidentialProfile,
  meta as psychiatricRehabDayMeta,
} from "@/lib/ai/evaluation-profiles/psychiatric-rehabilitation-institution";
import { Badge } from "@/components/ui/badge";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { Button } from "@/components/ui/button";
import {
  SettingsIcon,
  HeartHandshakeIcon,
  ClipboardCheckIcon,
  ArrowRightIcon,
  DownloadIcon,
  FileTextIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "精神復健機構評鑑小教室｜報告汪",
  description:
    "115年度精神復健機構評鑑基準完整解說，含日間型（3章36條）與住宿型（3章40條）。涵蓋經營管理、復健服務、服務品質三大章節，協助機構做好評鑑準備。",
  keywords: [
    "精神復健機構評鑑",
    "日間型精神復健機構",
    "住宿型精神復健機構",
    "115年度評鑑",
    "精神衛生法",
    "評鑑基準",
    "社區復健",
    "精神復健",
  ],
  alternates: {
    canonical: "https://reportwang.com/school/psychiatric-rehabilitation-institution",
  },
  openGraph: {
    title: "精神復健機構評鑑小教室｜報告汪",
    description:
      "115年度精神復健機構評鑑基準完整解說，含日間型36條與住宿型40條。",
    url: "https://reportwang.com/school/psychiatric-rehabilitation-institution",
  },
};

// 章節資訊（含日間型/住宿型條數）
const sectionMeta = [
  {
    shortCode: "1",
    label: "第1章、經營管理",
    icon: SettingsIcon,
    color: "blue",
    href: "/school/psychiatric-rehabilitation-institution/management",
    dayCount: 10,
    residentialCount: 12,
    dayRange: "1.1–1.10",
    residentialRange: "1.1–1.12",
    desc: "負責人經營管理、人力穩定性、督導訓練、健康檢查、社區便利性、復健資源與空間設施",
  },
  {
    shortCode: "2",
    label: "第2章、復健服務",
    icon: HeartHandshakeIcon,
    color: "green",
    href: "/school/psychiatric-rehabilitation-institution/rehabilitation",
    dayCount: 14,
    residentialCount: 14,
    dayRange: "2.1–2.14",
    residentialRange: "2.1–2.14",
    desc: "復健評估與計畫、社區生活訓練、就業輔導、生活諮詢、社區融合、同儕支持",
  },
  {
    shortCode: "3",
    label: "第3章、服務品質",
    icon: ClipboardCheckIcon,
    color: "orange",
    href: "/school/psychiatric-rehabilitation-institution/service-quality",
    dayCount: 12,
    residentialCount: 14,
    dayRange: "3.1–3.12",
    residentialRange: "3.1–3.14",
    desc: "工作手冊、收結案標準、紀錄管理、權益維護、緊急應變、品質管理",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  green: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
  orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800",
};

const courseJsonLd = educationalContentJsonLd({
  type: "Course",
  name: "精神復健機構評鑑小教室",
  description:
    "115年度精神復健機構評鑑基準完整解說，含日間型36條與住宿型40條。",
  path: "/school/psychiatric-rehabilitation-institution",
});

const FAQ_ITEMS = [
  { question: "精神復健機構評鑑分哪幾大面向？", answer: "分為行政管理、專業服務品質、住民/個案權益保障三大面向，日間型與住宿型各有對應評鑑基準，條文數各有不同。" },
  { question: "職能復健服務計畫如何準備評鑑文件？", answer: "個別化復健計畫（IRHP）需包含功能評估、復健目標、介入措施與定期評值，職能治療師需記錄每次治療的出席狀況與功能進展。" },
  { question: "精神復健機構如何管理跨專業團隊的服務記錄？", answer: "依精神科醫師、護理師、職能治療師、社工師建立職類標籤，各自管理服務紀錄，個案管理師跨標籤彙整，評鑑前篩選個案備審文件。" },
  { question: "如何用報告汪準備精神復健機構評鑑？", answer: "匯入精神復健機構評鑑範本，AI 對應各項基準分析文件完整性，跨專業團隊同一平台協作，評鑑前直接標示缺漏項目。" },
];

const jsonLd = mergeJsonLdGraph(courseJsonLd, faqPageJsonLd(FAQ_ITEMS, "/school/psychiatric-rehabilitation-institution"));

export default function PsychiatricRehabilitationInstitutionPage() {
  const dayProfile = psychiatricRehabilitationDayProfile;
  const residentialProfile = psychiatricRehabilitationResidentialProfile;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="mb-6">
        <Badge className="mb-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 border-0 hover:bg-teal-500/20">
          精神復健機構
        </Badge>
        <h1 className="text-2xl font-bold mb-3">精神復健機構評鑑小教室</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${psychiatricRehabDayMeta.year} 年度` },
            { label: "主管機關", value: psychiatricRehabDayMeta.agency },
            { label: "日間型項目", value: `共 ${psychiatricRehabDayMeta.totalItems} 條` },
            { label: "住宿型項目", value: "共 40 條" },
          ]}
        />
        <SourceCallout meta={psychiatricRehabDayMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed mt-2">
          115年度精神復健機構評鑑基準包含兩種機構類型：<strong>日間型</strong>（3章36條）與<strong>住宿型</strong>（3章40條）。日間型機構服務對象為「學員」，住宿型機構服務對象為「住民」。評鑑採五級（A、B、C、D、E）及三級（A、C、E）評量方式。住宿型唯一重點項目為 3.11 維護住民出入自由。
        </p>
      </div>

      {/* 雙類型對比摘要 */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="border rounded-lg p-3 bg-sky-500/5">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-sky-500/10 text-sky-600 dark:text-sky-400 border-0 text-xs py-0 h-5">
              日間型
            </Badge>
            <span className="text-xs text-muted-foreground">學員</span>
          </div>
          <p className="text-lg font-bold">36 <span className="text-sm font-normal text-muted-foreground">條</span></p>
          <p className="text-xs text-muted-foreground">一般33 · 可選2 · 試評2</p>
        </div>
        <div className="border rounded-lg p-3 bg-violet-500/5">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-violet-500/10 text-violet-600 dark:text-violet-400 border-0 text-xs py-0 h-5">
              住宿型
            </Badge>
            <span className="text-xs text-muted-foreground">住民</span>
          </div>
          <p className="text-lg font-bold">40 <span className="text-sm font-normal text-muted-foreground">條</span></p>
          <p className="text-xs text-muted-foreground">一般34 · 可選3 · 重點1 · 試評3</p>
        </div>
      </div>

      {/* 章節條數對照：日間型 vs 住宿型 */}
      <div className="not-prose mb-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <caption className="py-2.5 px-4 text-left font-semibold text-foreground border-b bg-muted/30">
            115 年度精神復健機構評鑑 3 章條數：日間型 vs 住宿型
          </caption>
          <thead>
            <tr className="border-b bg-muted/20 text-muted-foreground">
              <th className="py-2 px-4 text-left font-medium">章節</th>
              <th className="py-2 px-4 text-left font-medium">主要評鑑主題</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">日間型</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">住宿型</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 px-4 font-medium whitespace-nowrap">第 1 章</td>
              <td className="py-2 px-4 text-muted-foreground">經營管理：負責人管理、人力穩定性、督導訓練、環境設施</td>
              <td className="py-2 px-4 text-center">10 條</td>
              <td className="py-2 px-4 text-center">12 條</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium whitespace-nowrap">第 2 章</td>
              <td className="py-2 px-4 text-muted-foreground">復健服務：復健評估、社區生活訓練、就業輔導、社區融合</td>
              <td className="py-2 px-4 text-center">14 條</td>
              <td className="py-2 px-4 text-center">14 條</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium whitespace-nowrap">第 3 章</td>
              <td className="py-2 px-4 text-muted-foreground">服務品質：工作手冊、收結案標準、權益維護、緊急應變</td>
              <td className="py-2 px-4 text-center">12 條</td>
              <td className="py-2 px-4 text-center">14 條（含重點項目 1 條）</td>
            </tr>
            <tr className="border-t bg-muted/20 font-semibold">
              <td className="py-2 px-4">合計</td>
              <td className="py-2 px-4 text-muted-foreground text-xs font-normal">評量採五級（A–E）或三級（A/C/E）方式</td>
              <td className="py-2 px-4 text-center">36 條</td>
              <td className="py-2 px-4 text-center">40 條</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 章節卡片 */}
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
                  </div>
                  <div className="flex gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs py-0 h-4">
                      日間 {section.dayCount} 條
                    </Badge>
                    <Badge variant="secondary" className="text-xs py-0 h-4">
                      住宿 {section.residentialCount} 條
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {section.desc}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    <span>{section.dayRange}</span>
                    <ArrowRightIcon className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 日間型 / 住宿型 條目並排 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 日間型全部條目列表 */}
        <div>
          <h2 className="text-base font-semibold mb-3">日間型 36 條指標一覽</h2>
          <div className="space-y-1">
            {dayProfile.sections.map((section) => (
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
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm">{item.title}</span>
                        {"isOptional" in item && item.isOptional && (
                          <Badge variant="secondary" className="text-xs py-0 h-4">
                            可選
                          </Badge>
                        )}
                        {"isTrial" in item && item.isTrial && (
                          <Badge variant="outline" className="text-xs py-0 h-4">
                            試評
                          </Badge>
                        )}
                        {"isPfm" in item && item.isPfm && (
                          <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0 text-xs py-0 h-4">
                            PFM
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

        {/* 住宿型全部條目列表 */}
        <div>
          <h2 className="text-base font-semibold mb-3">住宿型 40 條指標一覽</h2>
          <div className="space-y-1">
            {residentialProfile.sections.map((section) => (
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
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm">{item.title}</span>
                        {"isTrialDeduction" in item && item.isTrialDeduction && (
                          <Badge variant="destructive" className="text-xs py-0 h-4">
                            重點
                          </Badge>
                        )}
                        {"isOptional" in item && item.isOptional && (
                          <Badge variant="secondary" className="text-xs py-0 h-4">
                            可選
                          </Badge>
                        )}
                        {"isTrial" in item && item.isTrial && (
                          <Badge variant="outline" className="text-xs py-0 h-4">
                            試評
                          </Badge>
                        )}
                        {"isPfm" in item && item.isPfm && (
                          <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0 text-xs py-0 h-4">
                            PFM
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
      </div>

      {/* 下載自我檢核表 */}
      <div className="border rounded-lg p-4 bg-muted/30">
        <h3 className="font-medium text-sm mb-1">下載自我檢核表</h3>
        <p className="text-xs text-muted-foreground mb-3">
          下載精神復健機構評鑑自我檢核表（Excel），含日間型與住宿型共 6 個工作表，逐項確認評鑑準備進度。
        </p>
        <Button variant="outline" size="sm" asChild>
          <a href="/downloads/psychiatric-rehabilitation-institution.xlsx" download>
            <DownloadIcon className="h-3.5 w-3.5 mr-1.5" />
            下載 Excel 檢核表
          </a>
        </Button>
      </div>

      {/* CTA */}
      <div className="border rounded-lg p-4 bg-muted/30">
        <h3 className="font-medium text-sm mb-1">匯入評鑑報告範本</h3>
        <p className="text-xs text-muted-foreground mb-3">
          將精神復健機構評鑑報告範本匯入報告汪，由 AI 協助分析撰寫。
        </p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/docs/import-templates">
            <FileTextIcon className="h-3.5 w-3.5 mr-1.5" />
            了解如何匯入範本
          </Link>
        </Button>
      </div>

      <SchoolFaqSection items={FAQ_ITEMS} />
    </>
  );
}
