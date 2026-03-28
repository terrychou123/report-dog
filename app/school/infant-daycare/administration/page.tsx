import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { infantDaycareProfile } from "@/lib/ai/evaluation-profiles/infant-daycare";
import { DocsTip } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "行政管理（項目 1–11）｜托嬰中心評鑑 114-116年度",
  description:
    "臺北市114-116年度托嬰中心評鑑：一、行政管理（20分），共11項基準，涵蓋立案行政、人事管理、文書檔案、財務安全及兒童權益保障完整說明與準備要訣。",
  keywords: [
    "托嬰中心評鑑行政管理",
    "托嬰中心人事管理評鑑",
    "托嬰中心在職訓練時數",
    "114年托嬰中心評鑑",
    "托嬰中心兒童權益保障",
    "托嬰中心文書管理",
  ],
  alternates: {
    canonical: "https://reportwang.com/school/infant-daycare/administration",
  },
  openGraph: {
    title: "行政管理（項目 1–11）｜托嬰中心評鑑｜報告汪",
    description:
      "托嬰中心評鑑一、行政管理11項基準完整解說，掌握立案行政、員工在職訓練、人事管理、財務安全等評鑑要點。",
    url: "https://reportwang.com/school/infant-daycare/administration",
  },
};

// Admin sections: indices 0-4 (items 1-11)
const adminSections = infantDaycareProfile.sections.slice(0, 5);
const allItems = adminSections.flatMap((s) => s.items);

const tips: Record<number, { content: string; variant?: "neutral" | "info" | "warning" }> = {
  1: {
    content:
      "廚工體檢週期為每年1次，與其他工作人員（每2年1次）不同，是常見扣分陷阱。另外監視器設備須留有定期保養記錄，評鑑委員會要求查驗，無記錄即無法得分。性騷擾防治辦法需確認有公告並發送給員工。",
    variant: "warning",
  },
  2: {
    content:
      "主管人員及托育人員每年需完成18小時以上在職訓練，線上課程須備有完課截圖及平台證明。評鑑委員現場會核對實際訓練時數紀錄，只有課程表但無出席簽名或完課紀錄將無法得高分。",
    variant: "warning",
  },
  3: {
    content:
      "接送管理需有完整的授權委託書，授權接送人員需事先登記。出缺席紀錄對缺席嬰幼兒須有追蹤聯繫記錄（如聯絡家長的電話紀錄），只填寫缺席但無追蹤記錄視為不完整。",
    variant: "info",
  },
  4: {
    content:
      "每位托育人員須清楚自己照顧哪些嬰幼兒及分工交接方式，評鑑委員會訪談現場托育人員確認。差假辦法需依勞動基準法訂定，評鑑員會核對請假紀錄是否與規定一致。",
    variant: "neutral",
  },
  5: {
    content:
      "任職一年以上托育人員須至少占全體托育人員的2/3，需備有人員名冊及到職日期佐證。專職托育人員第一年投保薪資須達每月30,300元以上，低於此標準將扣分。",
    variant: "warning",
  },
  7: {
    content:
      "會議記錄應含每次會議的出席人員、討論事項及決議內容，並有主持人及記錄人員署名。評鑑委員會比對會議紀錄與實際執行情形，只有書面記錄但無執行證據將扣分。",
    variant: "neutral",
  },
  8: {
    content:
      "財務管理需分項記錄主管機關核定收費項目，收費收據須序號連貫。若有退費案件需留有退費申請書及退費記錄。公共意外責任險及火險的保單須在效期內且保額符合規定。",
    variant: "info",
  },
  11: {
    content:
      "兒童緊急保護或安置通報須有完整的通報紀錄及後續追蹤記錄。服務使用者申訴機制需公告且有申訴信箱或管道，評鑑委員會核查是否有實際運作紀錄。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "托嬰中心評鑑：一、行政管理",
  description:
    "臺北市114-116年度托嬰中心評鑑一、行政管理11項基準完整解說，涵蓋立案行政、員工在職訓練、人事管理、文書檔案、財務安全及兒童權益保障。",
  path: "/school/infant-daycare/administration",
});

export default function InfantDaycareAdministrationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20">
            行政
          </Badge>
          <span className="text-sm text-muted-foreground">項目 1–11 ／ 20 分</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">一、行政管理</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共11項基準（20分），涵蓋立案行政與業務管理、人事領導與管理、文書與檔案管理、財務總務與安全管理，以及兒童權益保障五大面向。
          負責人／主管人員、行政人員及托育人員各有不同評鑑側重，評鑑委員會進行實地觀察、訪談及文件查閱。
        </p>
      </div>

      {/* Mini TOC */}
      <div className="mb-8 rounded-lg border bg-muted/30 p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">本頁項目</p>
        <div className="flex flex-wrap gap-2">
          {allItems.map((item) => (
            <a
              key={item.id}
              href={`#item-${item.id}`}
              className="text-xs px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 transition-colors"
            >
              {item.id}. {item.title}
            </a>
          ))}
        </div>
      </div>

      {/* Items grouped by sub-section */}
      <div className="space-y-12">
        {adminSections.map((section) => (
          <div key={section.name}>
            {/* Sub-section header */}
            <div className="flex items-center gap-2 mb-6 pb-2 border-b">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400">
                {section.shortCode}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">{section.name}</span>
            </div>

            <div className="space-y-10">
              {section.items.map((item) => (
                <div key={item.id} id={`item-${item.id}`} className="scroll-mt-20">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-sm font-bold text-orange-600 dark:text-orange-400 font-mono shrink-0">
                      {item.id}
                    </span>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold leading-snug">{item.title}</h2>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        <Badge variant="outline" className="text-xs">{item.responsible}</Badge>
                        <Badge variant="secondary" className="text-xs">{item.reviewMethod.split("、")[0]}</Badge>
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

                    {tips[item.id] && (
                      <DocsTip variant={tips[item.id].variant ?? "neutral"}>
                        {tips[item.id].content}
                      </DocsTip>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/infant-daycare"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          評鑑基準總覽
        </Link>
        <Link
          href="/school/infant-daycare/childcare-activities"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          二、托育活動
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
