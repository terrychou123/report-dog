import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { psychiatricNursingHomeProfile } from "@/lib/ai/evaluation-profiles/psychiatric-nursing-home";
import { Badge } from "@/components/ui/badge";
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
    href: "/school/psychiatric-nursing-home/professional-care",
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

const jsonLd = educationalContentJsonLd({
  type: "Course",
  name: "精神護理之家評鑑小教室",
  description:
    "115年度精神護理之家評鑑基準完整解說，共5大面向36條指標。",
  path: "/school/psychiatric-nursing-home",
});

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
        <p className="text-muted-foreground text-sm leading-relaxed">
          115年度精神護理之家評鑑基準共分為 5 大面向 36 條指標，包含一般項目 32 條、可選項目 2 條（B1.9 侵入性照護、B3.2 管灌）及重點項目 2 條（A2.2 人員設置、C1.1 疏散避難）。依據衛生福利部公告之評鑑基準及精神衛生法規範辦理。
        </p>
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
    </>
  );
}
