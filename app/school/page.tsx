import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import {
  HomeIcon,
  SunIcon,
  BuildingIcon,
  HospitalIcon,
  StethoscopeIcon,
  BabyIcon,
  AccessibilityIcon,
  UsersIcon,
  HeartHandshakeIcon,
  ArrowRightIcon,
  SparklesIcon,
  DownloadIcon,
  BrainCircuitIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KeyTakeaways } from "@/components/school/key-takeaways";
import { SchoolFaqSection } from "@/components/school/school-faq-section";

export const metadata: Metadata = {
  title: "評鑑小教室｜長照機構暨醫院評鑑準備教學",
  description:
    "報告汪評鑑小教室：提供長照機構及醫院評鑑準備教學，涵蓋居家服務機構 32 項、日間照顧機構 43 項、小規模多機能機構 45 項、住宿型照顧機構 75 項、居家護理所 8 項、一般護理之家 15 項、產後護理之家 17 項、身心障礙福利機構 35 項、兒少安置機構 35 項、醫院評鑑 124 條、老人福利機構 77 項、精神護理之家 36 條、托嬰中心 60 項、精神復健機構（日間型）36 條、精神復健機構（住宿型）40 條評鑑基準完整解說。幫助機構管理人員快速掌握評鑑重點。",
  keywords: ["長照機構評鑑", "評鑑準備", "評鑑小教室", "居家服務評鑑", "日間照顧評鑑", "住宿型長照評鑑", "居家護理所評鑑", "一般護理之家評鑑", "產後護理之家評鑑", "月子中心評鑑", "身心障礙福利機構評鑑", "身心障礙機構", "兒少安置機構評鑑", "兒童及少年安置機構", "長照評鑑基準", "醫院評鑑", "區域醫院評鑑", "地區醫院評鑑", "精神護理之家評鑑", "精神護理機構", "托嬰中心評鑑", "114年托嬰中心評鑑", "精神復健機構評鑑", "精神復健機構", "日間型精神復健", "住宿型精神復健"],
  alternates: { canonical: "/school" },
  openGraph: {
    title: "評鑑小教室｜長照機構評鑑準備教學｜報告汪",
    description: "居家服務機構 32 項、日間照顧機構 43 項、住宿型照顧機構 75 項、居家護理所 8 項、一般護理之家 15 項、產後護理之家 17 項、身心障礙福利機構 35 項、兒少安置機構 35 項、醫院評鑑 124 條、老人福利機構 77 項、精神護理之家 36 條、托嬰中心 60 項、精神復健機構（日間型）36 條、精神復健機構（住宿型）40 條評鑑基準完整解說，快速掌握評鑑重點。",
    url: "https://reportwang.com/school",
  },
};

const courses = [
  {
    href: "/school/home-care",
    icon: HomeIcon,
    title: "居家服務機構評鑑基準",
    desc: "115 年度臺北市政府社會局居家服務機構評鑑基準，共 32 項目、4 大區塊完整解說。",
    count: "32 項評鑑基準",
    available: true,
  },
  {
    href: "/school/daycare",
    icon: SunIcon,
    title: "日間照顧機構評鑑基準",
    desc: "115 年度臺北市政府社會局日間照顧機構評鑑基準，共 43 項目、4 大區塊完整解說。",
    count: "43 項評鑑基準",
    available: true,
  },
  {
    href: "/school/multi-function-care",
    icon: SunIcon,
    title: "小規模多機能機構評鑑基準",
    desc: "115 年度臺北市政府社會局小規模多機能機構評鑑基準，日照+居服+夜宿三合一，共 45 項目、4 大區塊完整解說。",
    count: "45 項評鑑基準",
    available: true,
  },
  {
    href: "/school/nursing-home",
    icon: BuildingIcon,
    title: "住宿型照顧機構評鑑基準",
    desc: "114 年度臺北市老人安養暨長期照顧機構評鑑指標，共 75 項目、5 大區塊完整解說。",
    count: "75 項評鑑基準",
    available: true,
  },
  {
    href: "/school/home-nursing",
    icon: StethoscopeIcon,
    title: "居家護理所評鑑基準",
    desc: "115 年度居家護理所評鑑基準，共 8 項目、2 大區塊完整解說。",
    count: "8 項評鑑基準",
    available: true,
  },
  {
    href: "/school/general-nursing-home",
    icon: HospitalIcon,
    title: "一般護理之家評鑑基準",
    desc: "115 年度一般護理之家評鑑基準，共 15 項目、4 大區塊完整解說。",
    count: "15 項評鑑基準",
    available: true,
  },
  {
    href: "/school/postpartum-care",
    icon: BabyIcon,
    title: "產後護理之家評鑑基準",
    desc: "115 年度產後護理之家評鑑基準，共 17 項目、4 大區塊完整解說。",
    count: "17 項評鑑基準",
    available: true,
  },
  {
    href: "/school/disability-welfare",
    icon: AccessibilityIcon,
    title: "身心障礙福利機構評鑑基準",
    desc: "衛福部社家署身心障礙福利機構專業服務品質與經營管理標準指引，共 35 項目、6 大區塊完整解說。",
    count: "35 項評鑑基準",
    available: true,
  },
  {
    href: "/school/hospital",
    icon: HospitalIcon,
    title: "醫院評鑑基準",
    desc: "115 年度衛生福利部醫院評鑑基準（區域醫院、地區醫院適用），共 124 條、15 章完整解說。",
    count: "124 條評鑑基準",
    available: true,
  },
  {
    href: "/school/youth-care",
    icon: UsersIcon,
    title: "兒少安置機構評鑑基準",
    desc: "112 年度兒童及少年安置機構評鑑指標，共 35 項目、5 大區塊完整解說。",
    count: "35 項評鑑基準",
    available: true,
  },
  {
    href: "/school/elderly-welfare",
    icon: HeartHandshakeIcon,
    title: "老人福利機構評鑑基準",
    desc: "115 年度老人福利機構評鑑指標，共 77 項目、6 大區塊（含加分題）完整解說。",
    count: "77 項評鑑基準",
    available: true,
  },
  {
    href: "/school/infant-daycare",
    icon: BabyIcon,
    title: "托嬰中心評鑑基準",
    desc: "臺北市114-116年度托嬰中心評鑑指標，共60項目、3大區塊：行政管理（20分）、托育活動（40分）、健康安全（40分）。",
    count: "60 項評鑑基準",
    available: true,
  },
  {
    href: "/school/psychiatric-nursing-home",
    icon: BrainCircuitIcon,
    title: "精神護理之家評鑑",
    desc: "115 年度精神護理之家評鑑基準，共 5 大面向 36 條指標，含一般項目 32 條、可選項目 2 條及重點項目 2 條。",
    count: "36 條指標",
    available: true,
  },
  {
    href: "/school/psychiatric-rehabilitation-institution",
    icon: BrainCircuitIcon,
    title: "精神復健機構評鑑基準",
    desc: "115 年度精神復健機構評鑑基準，含日間型（36 條）及住宿型（40 條），共 3 大章：經營管理、復健服務、服務品質。",
    count: "36/40 條評鑑基準",
    available: true,
  },
];

const jsonLd = educationalContentJsonLd({
  type: "ItemList",
  name: "長照機構評鑑小教室",
  description: "報告汪評鑑小教室：長照機構及醫院評鑑準備教學系列，涵蓋居家服務、日照、住宿型、護理之家、醫院等機構類型。",
  path: "/school",
  itemListElement: courses
    .filter((c) => c.available)
    .map((c) => ({
      name: c.title,
      url: `https://reportwang.com${c.href}`,
      description: c.desc,
    })),
});

export default function SchoolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="prose prose-sm dark:prose-invert max-w-none mb-10">
        <h1 className="text-2xl font-bold mb-2">長照機構評鑑小教室｜14 類機構評鑑基準完整教學</h1>
        <p className="text-muted-foreground mb-3">
          長照機構評鑑不再陌生。我們整理 14 類長照機構的評鑑基準，逐項說明評鑑標準、準備要訣與實用提醒，幫助機構人員有條不紊地備戰評鑑。
        </p>
        <p className="text-muted-foreground mb-3">
          從居家服務機構、日間照顧中心、住宿型長照機構、護理之家，到醫院護理部、身心障礙福利機構、托嬰中心，每類機構均有獨立教學頁面，依評鑑基準條號逐項解析審查方法、常見缺失與準備技巧。
        </p>
        <p className="text-muted-foreground">
          所有內容免費閱覽，並可搭配{" "}
          <a href="/downloads" className="text-primary underline underline-offset-4">免費評鑑自我檢核表下載</a>
          {" "}與{" "}
          <a href="/docs/import-templates" className="text-primary underline underline-offset-4">一鍵匯入評鑑範本</a>
          {" "}功能，讓評鑑準備更有效率。
        </p>
      </div>

      {/* 快速摘要 */}
      <KeyTakeaways
        title="評鑑小教室快速摘要"
        items={[
          { label: "涵蓋機構類型", value: "14 類長照機構與醫院" },
          { label: "評鑑基準總數", value: "合計 600+ 條基準逐項解析" },
          { label: "免費工具", value: "自評表下載 + AI 報告輔助" },
          { label: "建議準備時程", value: "評鑑前 3–6 個月開始備戰" },
        ]}
        className="mb-6"
      />

      {/* 評鑑年度對照表 */}
      <div className="not-prose mb-8 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <caption className="py-3 px-4 text-left font-semibold text-foreground border-b bg-muted/30">
            各機構評鑑年度與基準數對照表
          </caption>
          <thead>
            <tr className="border-b bg-muted/20 text-muted-foreground">
              <th className="py-2 px-4 text-left font-medium">機構類型</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">評鑑年度</th>
              <th className="py-2 px-4 text-center font-medium whitespace-nowrap">基準數</th>
              <th className="py-2 px-4 text-left font-medium">主管機關</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              { name: "居家服務機構", year: "115 年度", count: "32 項", agency: "臺北市社會局", href: "/school/home-care" },
              { name: "日間照顧機構", year: "115 年度", count: "43 項", agency: "臺北市社會局", href: "/school/daycare" },
              { name: "小規模多機能機構", year: "115 年度", count: "45 項", agency: "臺北市社會局", href: "/school/multi-function-care" },
              { name: "住宿型照顧機構", year: "114 年度", count: "75 項", agency: "臺北市社會局", href: "/school/nursing-home" },
              { name: "居家護理所", year: "115 年度", count: "8 項", agency: "衛福部護理司", href: "/school/home-nursing" },
              { name: "一般護理之家", year: "115 年度", count: "15 項", agency: "衛福部護理司", href: "/school/general-nursing-home" },
              { name: "產後護理之家", year: "115 年度", count: "17 項", agency: "衛福部護理司", href: "/school/postpartum-care" },
              { name: "醫院（區域/地區）", year: "115 年度", count: "124 條", agency: "衛福部醫事司", href: "/school/hospital" },
              { name: "老人福利機構", year: "115 年度", count: "77 項", agency: "衛福部社家署", href: "/school/elderly-welfare" },
              { name: "身心障礙福利機構", year: "109 年度", count: "49 項", agency: "衛福部社家署", href: "/school/disability-welfare" },
              { name: "托嬰中心", year: "114–116 年度", count: "60 項", agency: "各縣市社會局", href: "/school/infant-daycare" },
              { name: "兒少安置機構", year: "112 年度", count: "35 項", agency: "衛福部社家署", href: "/school/youth-care" },
              { name: "精神護理之家", year: "115 年度", count: "36 條", agency: "衛福部護理司", href: "/school/psychiatric-nursing-home" },
              { name: "精神復健機構", year: "115 年度", count: "36/40 條", agency: "衛福部心口司", href: "/school/psychiatric-rehabilitation-institution" },
            ].map((row) => (
              <tr key={row.href} className="hover:bg-muted/20 transition-colors">
                <td className="py-2 px-4">
                  <Link href={row.href} className="text-primary hover:underline underline-offset-4">
                    {row.name}
                  </Link>
                </td>
                <td className="py-2 px-4 text-center text-muted-foreground">{row.year}</td>
                <td className="py-2 px-4 text-center font-medium">{row.count}</td>
                <td className="py-2 px-4 text-muted-foreground">{row.agency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Course cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {courses.map((course) => {
          const Icon = course.icon;
          return course.available ? (
            <Link
              key={course.href}
              href={course.href}
              className="group relative rounded-xl border bg-card p-5 hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 rounded-lg bg-primary/10 p-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {course.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {course.count}
                    </Badge>
                    <ArrowRightIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div
              key={course.title}
              className="relative rounded-xl border bg-card/50 p-5 opacity-60 cursor-default"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 rounded-lg bg-muted p-2">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold mb-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {course.desc}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {course.count}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <SchoolFaqSection
        title="評鑑準備常見問題"
        items={[
          {
            question: "評鑑要提前多久開始準備？",
            answer: "建議評鑑前 3–6 個月開始，先下載自評表完成機構內部評估，找出缺失後系統改善。書面文件整備至少需要 2–3 個月，現場人員訪談準備則需同步進行。",
          },
          {
            question: "評鑑自評表在哪裡可以下載？",
            answer: "可至報告汪的「下載專區」免費下載各機構類型的評鑑自評 Excel 表，涵蓋居家服務、日照、住宿型、護理之家、身心障礙機構等。下載後可直接在 Excel 勾選逐項完成率。",
          },
          {
            question: "評鑑委員主要查核什麼？",
            answer: "評鑑查核分三大面向：（1）書面文件完整性——各類表單、計畫書、會議記錄是否齊全；（2）現場訪視——環境設備符合法規，服務過程是否規範；（3）人員訪談——工作人員對評鑑基準的了解度與回答一致性。",
          },
          {
            question: "各機構的評鑑年度都一樣嗎？",
            answer: "不同。評鑑年度依主管機關與機構類型而異，例如臺北市社會局社福機構通常在 115 年度評鑑，而兒少安置機構以 112 年度基準為準，托嬰中心採 114–116 年度三年一次。請以各機構主管機關公告為準。",
          },
          {
            question: "評鑑與認證（如 JCI）有何不同？",
            answer: "評鑑（Accreditation）是政府主管機關依法辦理，通過才能合法繼續提供服務，未通過可能面臨限期改善或廢止許可。JCI 或 ISO 屬自願性品質認證，不具強制法律效力，目的在展示品質管理水準。",
          },
          {
            question: "評鑑未通過的後果是什麼？",
            answer: "依機構類型與主管機關不同而異，通常分為「列為待改善」「限期改善後複評」，情節嚴重者可能廢止設立許可或命令停辦。建議每年以自評表進行預演，主動發現並改善缺失。",
          },
        ]}
      />

      {/* 資料來源 */}
      <div className="not-prose mt-8 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-2">資料來源</p>
        <p className="mb-2">本站評鑑小教室內容整理自下列主管機關官方公告，各頁面均標示所屬年度及公告日期：</p>
        <ul className="space-y-1">
          {[
            { label: "衛生福利部社會及家庭署", url: "https://www.sfaa.gov.tw" },
            { label: "衛生福利部護理及健康照護司", url: "https://dep.mohw.gov.tw/DOHN" },
            { label: "衛生福利部醫事司", url: "https://dep.mohw.gov.tw/DOMA" },
            { label: "臺北市政府社會局", url: "https://dosw.gov.taipei" },
          ].map(({ label, url }) => (
            <li key={url} className="flex items-center gap-1">
              <ExternalLinkIcon className="h-3 w-3 shrink-0" />
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Import Templates CTA */}
      <div className="mt-10 rounded-xl bg-primary/5 border border-primary/20 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="shrink-0 rounded-xl bg-primary/10 p-3">
            <DownloadIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold mb-1">一鍵匯入評鑑範本，立即開始準備</h3>
            <p className="text-sm text-muted-foreground">
              學完評鑑基準後，到報告汪一鍵匯入對應機構類型的標籤與報告範本，AI 協助填寫內容，省去手動建立的時間。
            </p>
          </div>
          <Button asChild size="sm" variant="outline" className="shrink-0">
            <Link href="/docs/import-templates">了解匯入教學</Link>
          </Button>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 rounded-xl bg-primary/5 border border-primary/20 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="shrink-0 rounded-xl bg-primary/10 p-3">
            <SparklesIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold mb-1">用報告汪 AI 幫你準備評鑑報告</h3>
            <p className="text-sm text-muted-foreground">
              了解評鑑基準後，讓 AI 協助撰寫、修改報告段落，並針對評鑑基準提供五維度分析，讓報告更有說服力。
            </p>
          </div>
          <Button asChild size="sm" variant="accent" className="shrink-0">
            <Link href="/protected">免費開始使用</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
