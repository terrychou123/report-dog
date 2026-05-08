import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd , buildSchoolSubpageFaqItems } from "@/lib/school-jsonld";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SourceCallout } from "@/components/school/source-callout";
import { SchoolFaqSection } from "@/components/school/school-faq-section";
import { youthCareProfile, meta as youthCareMeta } from "@/lib/ai/evaluation-profiles/youth-care";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "財務管理（項目 29）｜兒少安置機構評鑑",
  description:
    "112年度兒少安置機構評鑑：肆、財務管理（20分），依衛生福利部社家署109年及地方政府110年、111年、112年財務查核結果計分，共4次查核，每次合格得20分，函文補件合格每次扣2分。",
  keywords: [
    "兒少安置機構評鑑",
    "安置機構財務管理評鑑",
    "112年度評鑑",
    "兒少機構財務查核",
    "安置機構財務評鑑基準",
  ],
  alternates: { canonical: "https://reportwang.com/school/youth-care/finance" },
  openGraph: {
    title: "財務管理（項目 29）｜兒少安置機構評鑑｜報告汪",
    description: "兒少安置機構評鑑肆、財務管理（20分）完整說明，依4次財務查核結果計分，掌握財務查核重點提升得分。",
    url: "https://reportwang.com/school/youth-care/finance",
  },
};

const section = youthCareProfile.sections[3];

const jsonLd = schoolSubpageJsonLd({
  type: "youth-care",
  subpage: "finance",
  section,
  name: "兒少安置機構評鑑：肆、財務管理",
  description: "112年度兒少安置機構評鑑財務管理說明，依衛福部社家署及地方政府財務查核結果計分，共4次查核，20分。",
});

export default function YouthCareFinancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20">
            {section.shortCode}
          </Badge>
          <span className="text-sm text-muted-foreground">項目 29・20分</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{section.name}</h1>
        <KeyTakeaways
          items={[
            { label: "適用年度", value: `${youthCareMeta.year} 年度` },
            { label: "主管機關", value: youthCareMeta.agency },
            { label: "本區塊項目", value: `共 ${section.items.length} 項` },
            { label: "區塊名稱", value: section.name },
          ]}
        />
        <SourceCallout meta={youthCareMeta} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共1項基準（20分），依衛生福利部社會及家庭署及地方政府財務查核結果計分。
          不同於其他區塊由評鑑委員實地評分，財務管理分數由歷年財務查核成績直接決定。
        </p>
      </div>

      {/* 計分說明 */}
      <div className="mb-8 rounded-xl border bg-green-500/5 p-6">
        <h2 className="text-base font-semibold mb-4 text-green-700 dark:text-green-400">計分方式說明</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-xs font-bold text-green-600 dark:text-green-400 shrink-0">1</span>
            <p className="text-sm text-muted-foreground">共4次財務查核：衛生福利部社家署109年查核、地方政府110年查核、111年查核、112年查核</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-xs font-bold text-green-600 dark:text-green-400 shrink-0">2</span>
            <p className="text-sm text-muted-foreground">每次財務查核皆合格：可得滿分 <strong>20分</strong></p>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0">!</span>
            <p className="text-sm text-muted-foreground">函文補件合格（有缺失但補正後通過）：每次扣 <strong>2分</strong></p>
          </div>
        </div>

        {/* 扣分範例 */}
        <div className="mt-4 rounded-lg bg-card border p-4">
          <p className="text-xs font-medium text-muted-foreground mb-3">扣分範例</p>
          <div className="grid sm:grid-cols-4 gap-2 text-center text-xs">
            {[
              { label: "4次全部合格", score: "20分", color: "text-green-600 dark:text-green-400" },
              { label: "1次補件合格", score: "18分", color: "text-amber-600 dark:text-amber-400" },
              { label: "2次補件合格", score: "16分", color: "text-amber-600 dark:text-amber-400" },
              { label: "4次均補件", score: "12分", color: "text-red-600 dark:text-red-400" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-muted/40 p-2.5">
                <div className={`text-sm font-bold ${item.color}`}>{item.score}</div>
                <div className="text-muted-foreground mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Item */}
      <div className="space-y-10">
        {section.items.map((item) => (
          <div key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold text-green-600 dark:text-green-400 font-mono shrink-0">
                {item.id}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
                  {"score" in item && (
                    <Badge variant="secondary" className="text-xs">{(item as { score: number }).score}分</Badge>
                  )}
                  <Badge variant="outline" className="text-xs text-amber-600 border-amber-400">
                    依查核結果計分
                  </Badge>
                </div>
              </div>
            </div>

            <div className="ml-11">
              <p className="text-xs text-muted-foreground mb-2 font-medium">評鑑基準：</p>
              <ol className="space-y-1.5 list-decimal list-inside mb-4">
                {item.criteria.map((c, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                    {c}
                  </li>
                ))}
              </ol>

              <DocsTip variant="warning">
                財務管理分數由歷年查核紀錄直接決定，無法在評鑑當天補救。機構應每年主動配合衛福部及地方政府的財務查核，財務制度須確實落實（如會計出納分工、帳冊完整性、捐款徵信公開等），避免因函文補件而扣分。如曾有缺失應確實改善，並保存改善紀錄以利下次查核。
              </DocsTip>
            </div>
          </div>
        ))}
      </div>

      {/* 財務準備重點 */}
      <div className="mt-8 rounded-xl border bg-card p-5">
        <h3 className="text-sm font-semibold mb-3">財務查核常見重點</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            "會計制度建立且確實執行（含日記帳、總分類帳）",
            "會計與出納職務明確分工",
            "各項支出取得合法憑證（發票或收據）",
            "政府補助款及指定用途捐款專款專用",
            "捐款開立收據並辦理公開徵信",
            "有價證券及印鑑分層管理",
            "財務報表經適當審議並函報主管機關",
            "目的事業支出比例符合規定",
          ].map((point) => (
            <div key={point} className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 rounded p-2.5">
              <span className="shrink-0 text-green-500 mt-0.5">✓</span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next */}
      <SchoolFaqSection items={buildSchoolSubpageFaqItems({ section })} />

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/youth-care/professional"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          參、專業服務
        </Link>
        <Link
          href="/school/youth-care/innovation"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          伍、特殊事項或措施
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
