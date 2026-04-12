import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { youthCareProfile } from "@/lib/ai/evaluation-profiles/youth-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { youthCareTips } from "@/lib/evaluation-tips/youth-care";
import { AgeQualityTabs } from "./_age-quality-tabs";

export const metadata: Metadata = {
  title: "專業服務（項目 15–28）｜兒少安置機構評鑑",
  description:
    "112年度兒少安置機構評鑑：參、專業服務（60分），共14項基準，包含個案紀錄（1分）、輔導目標（15分）、專業服務品質（32分，含2歲以下及2歲以上兩版本）、權益保障（2分）、資源結合（6分）、專業訓練（4分）完整評鑑說明。",
  keywords: [
    "兒少安置機構評鑑",
    "安置機構專業服務評鑑",
    "112年度評鑑",
    "兒少輔導目標評鑑",
    "安置期間生活輔導評鑑",
    "兒少安置機構社工評鑑",
    "資源結合運用評鑑",
  ],
  alternates: { canonical: "https://reportwang.com/school/youth-care/professional" },
  openGraph: {
    title: "專業服務（項目 15–28）｜兒少安置機構評鑑｜報告汪",
    description: "兒少安置機構評鑑參、專業服務14項基準完整解說，涵蓋個案紀錄、輔導目標、服務品質（含2歲以下/以上雙版本）、資源結合等核心服務評鑑要點。",
    url: "https://reportwang.com/school/youth-care/professional",
  },
};

const section = youthCareProfile.sections[2];

const generalItems = section.items.filter((item) => !("ageGroup" in item && item.ageGroup));
const caseRecordItem = generalItems.find((item) => item.id === 15);
const guidanceItem = generalItems.find((item) => item.id === 16);

const tips = youthCareTips;

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "兒少安置機構評鑑：參、專業服務",
  description: "112年度兒少安置機構評鑑專業服務14項基準完整解說，包含個案紀錄、輔導目標、專業服務品質（2歲以下及2歲以上兩版本）、權益保障、資源結合及專業訓練。",
  path: "/school/youth-care/professional",
});

export default function YouthCareProfessionalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20">
            {section.shortCode}
          </Badge>
          <span className="text-sm text-muted-foreground">項目 15–28・60分</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{section.name}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共14項基準（60分），是整個評鑑配分最重的區塊。評鑑委員透過審閱文件、實地訪談等方式綜合評分。
          「三、兒童少年專業服務品質」依安置兒少年齡分為2歲以下及2歲以上18歲以下兩個版本。
        </p>
      </div>

      {/* 子區塊配分說明 */}
      <div className="mb-6 grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
        {[
          { label: "一 個案紀錄", score: "1分" },
          { label: "二 輔導目標", score: "15分" },
          { label: "三 服務品質", score: "32分" },
          { label: "四 權益保障", score: "2分" },
          { label: "五 資源結合", score: "6分" },
          { label: "六 專業訓練", score: "4分" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-2">
            <div className="font-bold text-blue-600 dark:text-blue-400">{s.score}</div>
            <div className="text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Mini TOC */}
      <div className="mb-8 rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">本頁項目</p>
        <div className="flex flex-wrap gap-2">
          {generalItems.map((item) => (
            <a
              key={item.id}
              href={`#item-${item.id}`}
              className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
            >
              {item.id}. {item.title.length > 12 ? item.title.slice(0, 12) + "…" : item.title}
            </a>
          ))}
          <a href="#service-quality"
            className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-colors">
            17–24. 服務品質（雙版本）
          </a>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-12">

        {/* 一、個案紀錄 */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">參一</span>
            <span className="text-sm font-semibold text-muted-foreground">個案紀錄與交接班紀錄（1分）</span>
          </div>
          {caseRecordItem && (
            <div id={`item-${caseRecordItem.id}`} className="scroll-mt-20">
              <div className="flex items-start gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 font-mono shrink-0">
                  {caseRecordItem.id}
                </span>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold leading-snug">{caseRecordItem.title}</h2>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <Badge variant="outline" className="text-xs">{caseRecordItem.responsible}</Badge>
                    {caseRecordItem.score !== undefined && <Badge variant="secondary" className="text-xs">{caseRecordItem.score}分</Badge>}
                    <Badge variant="outline" className="text-xs text-amber-600 border-amber-400">主管機關評分</Badge>
                  </div>
                </div>
              </div>
              <div className="ml-11">
                <p className="text-xs text-muted-foreground mb-2 font-medium">評鑑基準：</p>
                <ol className="space-y-1.5 list-decimal list-inside mb-4">
                  {caseRecordItem.criteria.map((c, i) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed">{c}</li>
                  ))}
                </ol>
                {tips[caseRecordItem.id] && (
                  <DocsTip variant={tips[caseRecordItem.id].variant ?? "neutral"}>{tips[caseRecordItem.id].content}</DocsTip>
                )}
              </div>
            </div>
          )}
        </section>

        {/* 二、輔導目標 */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">參二</span>
            <span className="text-sm font-semibold text-muted-foreground">兒童少年輔導目標之達成（15分）</span>
          </div>
          {guidanceItem && (
            <div id={`item-${guidanceItem.id}`} className="scroll-mt-20">
              <div className="flex items-start gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 font-mono shrink-0">
                  {guidanceItem.id}
                </span>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold leading-snug">{guidanceItem.title}</h2>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <Badge variant="outline" className="text-xs">{guidanceItem.responsible}</Badge>
                    {guidanceItem.score !== undefined && <Badge variant="secondary" className="text-xs">{guidanceItem.score}分</Badge>}
                  </div>
                </div>
              </div>
              <div className="ml-11">
                <p className="text-xs text-muted-foreground mb-2 font-medium">評鑑基準：</p>
                <ol className="space-y-1.5 list-decimal list-inside mb-4">
                  {guidanceItem.criteria.map((c, i) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed">{c}</li>
                  ))}
                </ol>
                {tips[guidanceItem.id] && (
                  <DocsTip variant={tips[guidanceItem.id].variant ?? "neutral"}>{tips[guidanceItem.id].content}</DocsTip>
                )}
              </div>
            </div>
          )}
        </section>

        {/* 三、專業服務品質（client 雙版本） */}
        <section id="service-quality" className="scroll-mt-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">參三</span>
            <span className="text-sm font-semibold text-muted-foreground">兒童少年專業服務品質（32分）</span>
          </div>
          <AgeQualityTabs allItems={section.items} />
        </section>

        {/* 四～六、其餘通用項目 */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">參四至六</span>
            <span className="text-sm font-semibold text-muted-foreground">權益保障・資源結合・專業訓練（12分）</span>
          </div>
          <div className="space-y-10">
            {generalItems.filter((item) => item.id >= 25).map((item) => (
              <div key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
                <div className="flex items-start gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 font-mono shrink-0">
                    {item.id}
                  </span>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold leading-snug">{item.title}</h2>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
                      {item.score !== undefined && <Badge variant="secondary" className="text-xs">{item.score}分</Badge>}
                      {item.id === 25 && (
                        <Badge variant="outline" className="text-xs text-amber-600 border-amber-400">主管機關評分</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="ml-11">
                  <p className="text-xs text-muted-foreground mb-2 font-medium">評鑑基準：</p>
                  <ol className="space-y-1.5 list-decimal list-inside mb-4">
                    {item.criteria.map((c, i) => (
                      <li key={i} className="text-sm text-muted-foreground leading-relaxed">{c}</li>
                    ))}
                  </ol>
                  {tips[item.id] && (
                    <DocsTip variant={tips[item.id].variant ?? "neutral"}>{tips[item.id].content}</DocsTip>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Prev / Next */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/youth-care/environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          貳、建築物環境及設施設備
        </Link>
        <Link
          href="/school/youth-care/finance"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          肆、財務管理
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
