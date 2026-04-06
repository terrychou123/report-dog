import Link from "next/link";
import type { Metadata } from "next";
import { educationalContentJsonLd } from "@/lib/jsonld";
import { disabilityWelfareProfile } from "@/lib/ai/evaluation-profiles/disability-welfare";
import { DocsTip, type DocsTipVariant } from "@/components/docs/docs-tip";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title:
    "三、專業服務（項目 32–49）｜身心障礙福利機構評鑑｜109年度",
  description:
    "109年度身心障礙福利機構評鑑「專業服務」18 項評鑑指標詳細說明：ISP個別化服務計畫、專業團隊、輔具器材、健康管理、膳食服務、社區資源與家庭訪視等，含準備要訣。",
  keywords: [
    "身心障礙福利機構評鑑專業服務",
    "身心障礙機構ISP",
    "身心障礙機構個別化服務計畫",
    "身心障礙機構評鑑專業團隊",
    "身心障礙福利機構評鑑",
    "109年度評鑑準備",
  ],
  alternates: {
    canonical:
      "https://reportwang.com/school/disability-welfare/professional",
  },
  openGraph: {
    title:
      "三、專業服務（項目 32–49）｜身心障礙福利機構評鑑｜報告汪",
    description:
      "109年度身心障礙福利機構評鑑專業服務區塊 18 項指標詳細說明與準備要訣。",
    url: "https://reportwang.com/school/disability-welfare/professional",
  },
};

const section = (() => {
  const s = disabilityWelfareProfile.sections.find(
    (s) => s.shortCode === "專",
  );
  if (!s)
    throw new Error("disabilityWelfareProfile: section 專 not found");
  return s;
})();

const tips: Record<number, { content: string; variant?: DocsTipVariant }> = {
  32: {
    content:
      "ISP擬訂是專業服務的核心（4分）。每位服務對象每年需召開服務計畫會議，新進者2個月內完成（生活重建機構1個月）。評估工具需適齡適性，且須納入服務對象及家屬意見。建議依不同障礙類型（兒童、成人、長期臥床、精神障礙）調整評估向度。",
    variant: "warning",
  },
  33: {
    content:
      "服務目標需根據評估結果擬定，重點在於目標的具體可行性。短期目標須「可觀察、可評量且具功能性」。計畫中需包含長短期目標及家庭期待。生活重建機構僅需短期目標。",
    variant: "warning",
  },
  34: {
    content:
      "服務目標執行需有具體紀錄（至少每2週1次），並每半年檢討1次（生活重建每3個月）。修正結果需告知本人或家屬。建議建立系統化的紀錄表單，方便定期追蹤與檢討。",
    variant: "info",
  },
  35: {
    content:
      "專業團隊運作需有合作規劃要點、個案研討（每年至少2次）、督導紀錄（每月至少1次）。督導形式不拘但每年至少1次邀請外部專家。個案研討需有相關專業人員參加。",
    variant: "warning",
  },
  36: {
    content:
      "輔具及活動器材需符合服務對象需求且安全性良好。重點：定期檢查維護紀錄、輔具擺放位置需方便取用（考量高度、動線等）。活動器材亦需符合使用者特性。",
    variant: "info",
  },
  37: {
    content:
      "特殊支持措施包含三大面向：(1)行為情緒支持（觀察及策略紀錄）；(2)衛教規劃（傳染病預防、手部衛生等）；(3)性平教育。建議將這些內容納入ISP，並有執行紀錄。",
    variant: "info",
  },
  38: {
    content:
      "體能活動每週至少2小時，另需規劃多元休閒活動，內容需適齡適性。重度失能機構另需評估4204-B：每日下床活動、被動式肢體活動及感官認知刺激。意識不清者每天至少下床1次。",
    variant: "warning",
  },
  39: {
    content:
      "空間規劃需有清楚的功能區隔，服務對象每天需轉換2個以上活動空間。活動內容及時段需配置相關服務人員。住宿機構活動空間應含客廳或起居室。",
    variant: "info",
  },
  40: {
    content:
      "清潔服務為重度失能機構適評項目。重點：每週至少洗滌2次（夏天每2天1次）、失禁者至少每2小時協助如廁、觀察並記錄失禁情形、可控制如廁者需有訓練計畫。",
    variant: "info",
  },
  41: {
    content:
      "壓力性損傷預防為重度失能機構適評。需有預防評估措施及處理辦法、至少每2小時翻身拍背、擺位正確。發生壓力性損傷案件需每季分析檢討。",
    variant: "info",
  },
  42: {
    content:
      "定期健檢重點：6歲以上服務前3個月內需提供體檢文件；學齡前需提供兒童健康手冊；在職每年健檢並追蹤處遇。協助供應者需加做A肝及糞便檢查。",
    variant: "info",
  },
  43: {
    content:
      "口腔照護為基本服務項目。每位服務對象每年至少1次口腔檢查，視需要安排塗氟、洗牙、治療等支持服務，並保留完整紀錄。",
    variant: "info",
  },
  44: {
    content:
      "膳食服務涵蓋面向廣泛（4303-A＋4303-B共8項標準）。重點：菜色15天不重複、菜單需營養師簽名、食物檢體獨立盛裝冷藏48小時、特殊生理狀況需個別化飲食。管灌餵食需注意灌食技術正確及服務對象感受。",
    variant: "warning",
  },
  45: {
    content:
      "用藥安全管理：依醫囑給藥且藥物未逾期、藥物放置需上鎖且有清楚標示（姓名、服用時間）。這是現場實查重點，務必確保藥物盒標示完整且儲櫃上鎖。",
    variant: "warning",
  },
  46: {
    content:
      "意外傷害處理需有完整的處理要點（含紀錄表單、處理流程、緊急聯絡管道），處理過程有紀錄且包含檢討及改善方案。建議建立事件通報SOP及追蹤表單。",
    variant: "info",
  },
  47: {
    content:
      "傳染病防治重點：(1)每日監視體溫健康紀錄（自109年起工作人員亦需）；(2)訂定傳染病預防及處理措施；(3)落實手部衛生稽核。需定期更新感染管制手冊。",
    variant: "warning",
  },
  48: {
    content:
      "社區資源需建立資源網絡並每年盤點更新。每位服務對象每月至少1次外出參與社區活動（無法參與者需造冊說明）。標準3為新增標準，需協助有交通需求的服務對象。",
    variant: "info",
  },
  49: {
    content:
      "家庭訪視：新進者2個月內完成，之後每2年至少1次。成人需進行家庭評估並擬訂支持計畫；學齡前需家庭需求評估及綜合摘述。每年應重新評估。無法家訪者需造冊說明原因。",
    variant: "info",
  },
};

const jsonLd = educationalContentJsonLd({
  type: "LearningResource",
  name: "三、專業服務（109年度身心障礙福利機構評鑑指標項目 32–49）",
  description:
    "109年度身心障礙福利機構評鑑指標「專業服務」18 個評鑑項目詳細說明、準備要訣與實用提示。",
  path: "/school/disability-welfare/professional",
});

export default function DisabilityWelfareProfessionalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-0 hover:bg-purple-500/20">
          三、專業服務
        </Badge>
        <h1 className="text-2xl font-bold mb-3">
          專業服務（項目 32–49）
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本區塊共 18 個評鑑項目，涵蓋個別化服務/支持計畫（ISP）擬訂與執行、專業團隊服務、
          輔具器材、體能休閒活動、健康管理、膳食服務、用藥安全、傳染病防治、社區資源運用及家庭訪視等面向。
        </p>
      </div>

      {/* Mini TOC */}
      <nav className="not-prose mb-8 rounded-lg bg-muted/40 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          本頁內容
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {section.items.map((item) => (
            <li key={item.id}>
              <a
                href={`#item-${item.id}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-background border flex items-center justify-center text-xs font-mono">
                  {item.id}
                </span>
                <span className="truncate">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Items */}
      <div className="space-y-12">
        {section.items.map((item) => (
          <section
            key={item.id}
            id={`item-${item.id}`}
            aria-labelledby={`heading-${item.id}`}
            className="scroll-mt-20"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400 font-mono">
                {item.id}
              </span>
              <h2
                id={`heading-${item.id}`}
                className="text-lg font-bold"
              >
                {item.title}
              </h2>
              <Badge variant="outline" className="text-xs">
                {item.indicatorCode}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {item.score}分
              </Badge>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">評鑑標準</p>
              <ol role="list" className="space-y-1.5 list-none pl-0">
                {item.criteria.map((criterion, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-sm text-muted-foreground"
                  >
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-mono text-foreground">
                      {i + 1}
                    </span>
                    {criterion}
                  </li>
                ))}
              </ol>
            </div>

            {item.reviewBasis && (
              <div className="mb-4">
                <p className="text-sm font-semibold mb-1">
                  評鑑實施方式：{item.reviewMethod}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.reviewBasis}
                </p>
              </div>
            )}

            {item.note && (
              <div className="mb-4 rounded-md bg-muted/50 border p-3">
                <p className="text-xs text-muted-foreground whitespace-pre-line">
                  📌 {item.note}
                </p>
              </div>
            )}

            {tips[item.id] && (
              <DocsTip
                variant={tips[item.id].variant ?? "neutral"}
                title="準備要訣"
              >
                {tips[item.id].content}
              </DocsTip>
            )}
          </section>
        ))}
      </div>

      {/* Prev / Next navigation */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link
          href="/school/disability-welfare/environment"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          二、環境設施及安全維護
        </Link>
        <Link
          href="/school/disability-welfare"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          返回總覽
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
