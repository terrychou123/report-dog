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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "評鑑小教室｜長照機構暨醫院評鑑準備教學",
  description:
    "報告汪評鑑小教室：提供長照機構及醫院評鑑準備教學，涵蓋居家服務機構 32 項、日間照顧機構 43 項、住宿型照顧機構 75 項、居家護理所 8 項、一般護理之家 15 項、產後護理之家 17 項、身心障礙福利機構 35 項、兒少教養機構 28 項、醫院評鑑 124 條、老人福利機構 77 項、精神護理之家 36 條、托嬰中心 60 項評鑑基準完整解說。幫助機構管理人員快速掌握評鑑重點。",
  keywords: ["長照機構評鑑", "評鑑準備", "評鑑小教室", "居家服務評鑑", "日間照顧評鑑", "住宿型長照評鑑", "居家護理所評鑑", "一般護理之家評鑑", "產後護理之家評鑑", "月子中心評鑑", "身心障礙福利機構評鑑", "身心障礙機構", "兒少教養機構評鑑", "兒童及少年安置教養機構", "長照評鑑基準", "醫院評鑑", "區域醫院評鑑", "地區醫院評鑑", "精神護理之家評鑑", "精神護理機構", "托嬰中心評鑑", "114年托嬰中心評鑑"],
  alternates: { canonical: "https://reportwang.com/school" },
  openGraph: {
    title: "評鑑小教室｜長照機構評鑑準備教學｜報告汪",
    description: "居家服務機構 32 項、日間照顧機構 43 項、住宿型照顧機構 75 項、居家護理所 8 項、一般護理之家 15 項、產後護理之家 17 項、身心障礙福利機構 35 項、兒少教養機構 28 項、醫院評鑑 124 條、老人福利機構 77 項、精神護理之家 36 條、托嬰中心 60 項評鑑基準完整解說，快速掌握評鑑重點。",
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
    desc: "114 年度衛生福利部醫院評鑑基準（區域醫院、地區醫院適用），共 124 條、15 章完整解說。",
    count: "124 條評鑑基準",
    available: true,
  },
  {
    href: "/school/youth-care",
    icon: UsersIcon,
    title: "兒少教養機構評鑑基準",
    desc: "111 年度兒童及少年安置及教養機構聯合評鑑指標，共 28 項目、5 大區塊完整解說。",
    count: "28 項評鑑基準",
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
        <h1 className="text-2xl font-bold mb-2">評鑑小教室</h1>
        <p className="text-muted-foreground">
          長照機構評鑑不再陌生。我們整理各類型長照機構的評鑑基準，逐項說明評鑑標準、準備要訣與實用提醒，幫助機構人員有條不紊地備戰評鑑。
        </p>
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
                  <h2 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                    {course.title}
                  </h2>
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
                  <h2 className="text-base font-semibold mb-1">{course.title}</h2>
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

      {/* Import Templates CTA */}
      <div className="mt-10 rounded-xl bg-primary/5 border border-primary/20 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="shrink-0 rounded-xl bg-primary/10 p-3">
            <DownloadIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold mb-1">一鍵匯入評鑑範本，立即開始準備</h2>
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
            <h2 className="text-base font-semibold mb-1">用報告汪 AI 幫你準備評鑑報告</h2>
            <p className="text-sm text-muted-foreground">
              了解評鑑基準後，讓 AI 協助撰寫、修改報告段落，並針對評鑑基準提供五維度分析，讓報告更有說服力。
            </p>
          </div>
          <Button asChild size="sm" className="shrink-0">
            <Link href="/protected">免費開始使用</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
