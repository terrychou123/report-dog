import Link from "next/link";
import type { Metadata } from "next";
import { schoolSubpageJsonLd } from "@/lib/school-jsonld";
import { psychiatricNursingHomeProfile } from "@/lib/ai/evaluation-profiles/psychiatric-nursing-home";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "E、創新及改革（E1.1）｜精神護理之家評鑑",
  description:
    "115年度精神護理之家評鑑基準 E 面向：創新及改革，共 1 條指標。說明創新或特色措施具有成效並公開分享之評核要求。",
  keywords: ["精神護理之家評鑑", "115年度評鑑", "創新及改革", "特色措施"],
  alternates: {
    canonical: "https://reportwang.com/school/psychiatric-nursing-home/innovation",
  },
  openGraph: {
    title: "E、創新及改革（E1.1）｜精神護理之家評鑑",
    description: "115年度精神護理之家評鑑 E 面向 1 條指標完整解說。",
    url: "https://reportwang.com/school/psychiatric-nursing-home/innovation",
  },
};

const section = psychiatricNursingHomeProfile.sections.find(
  (s) => s.shortCode === "E"
)!;

const jsonLd = schoolSubpageJsonLd({
  type: "psychiatric-nursing-home",
  subpage: "innovation",
  section,
  name: "精神護理之家評鑑 E、創新及改革",
  description: "115年度精神護理之家評鑑基準 E 面向 1 條指標完整解說。",
});

export default function InnovationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="mb-6">
        <Badge className="mb-3 bg-rose-500/10 text-rose-600 dark:text-rose-400 border-0 hover:bg-rose-500/20">
          E、創新及改革
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          E、創新及改革（E1.1）
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本面向共 1 條指標，鼓勵機構發展具有創新性或特色之服務措施，並將成效公開分享。創新措施係指以服務模式、策略、資源整合等方式，促進住民生活品質提升及社區融合。
        </p>
      </div>

      <div className="space-y-8">
        {section.items.map((item) => (
          <div key={item.id} id={`item-${item.id}`} className="scroll-mt-16">
            <div className="flex items-start gap-3 mb-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-sm font-medium">
                {item.id}
              </span>
              <div>
                <h2 className="font-semibold text-base">{item.title}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  負責人：{item.responsible}
                </p>
              </div>
            </div>

            <div className="ml-11">
              <p className="text-xs font-medium text-muted-foreground mb-2">評核要點</p>
              <ul className="space-y-1.5 mb-3">
                {item.criteria.map((criterion, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{criterion}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs font-medium text-muted-foreground mb-1">評核方式</p>
              <p className="text-sm text-muted-foreground mb-3">{item.reviewMethod}</p>
              <DocsTip variant="info">
                創新措施係指以服務模式、策略、資源整合等方式，促進住民生活品質提升及社區融合之作為。公開分享方式包含：獲獎、發表論文、接受參訪或於相關活動或會議中報告等。建議機構平時就收集創新措施的執行紀錄及成效佐證資料。
              </DocsTip>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-10 pt-6 border-t">
        <Link
          href="/school/psychiatric-nursing-home/resident-rights"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          D、住民權益保障
        </Link>
        <Link
          href="/school/psychiatric-nursing-home"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          返回總覽
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
