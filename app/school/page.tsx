import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import {
  HomeIcon,
  SunIcon,
  BuildingIcon,
  HospitalIcon,
  StethoscopeIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "評鑑小教室｜長照機構評鑑準備教學",
  description:
    "報告汪評鑑小教室：提供長照機構評鑑準備教學，涵蓋居家服務機構 32 項、日間照顧機構 43 項、住宿型照顧機構 75 項、居家護理所 8 項、一般護理之家 15 項評鑑基準完整解說。幫助機構管理人員快速掌握評鑑重點。",
  keywords: ["長照機構評鑑", "評鑑準備", "評鑑小教室", "居家服務評鑑", "日間照顧評鑑", "住宿型長照評鑑", "居家護理所評鑑", "一般護理之家評鑑", "長照評鑑基準"],
  alternates: { canonical: "https://reportwang.com/school" },
  openGraph: {
    title: "評鑑小教室｜長照機構評鑑準備教學｜報告汪",
    description: "居家服務機構 32 項、日間照顧機構 43 項、住宿型照顧機構 75 項、居家護理所 8 項、一般護理之家 15 項評鑑基準完整解說，快速掌握評鑑重點。",
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
    desc: "113 年度臺北市政府社會局日間照顧機構評鑑基準，共 43 項目、4 大區塊完整解說。",
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
];

const jsonLd = educationalContentJsonLd({
  type: "ItemList",
  name: "長照機構評鑑小教室",
  description: "報告汪評鑑小教室：長照機構評鑑準備教學系列，涵蓋居家服務、日照、住宿型、護理之家等機構類型。",
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

      {/* CTA */}
      <div className="mt-12 rounded-xl bg-primary/5 border border-primary/20 p-6">
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
