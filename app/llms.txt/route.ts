import { NextResponse } from "next/server";
import { schoolNavSections } from "@/lib/school-nav";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const base = "https://reportwang.com";

  const lines: string[] = [
    "# 報告汪 (reportwang.com)",
    "",
    "> 報告汪是台灣長照機構與醫院評鑑報告管理平台。提供評鑑小教室（12 種機構類型、91 個評鑑基準教學頁面）、AI 輔助評鑑分析、自評表下載等服務。語言：繁體中文（zh-TW）。",
    "",
    "## 評鑑小教室（/school）",
    "",
    `- [評鑑小教室總覽](${base}/school)`,
  ];

  for (const section of schoolNavSections) {
    const [overview, ...subs] = section.items;
    lines.push(`- [${section.group}](${base}${overview.href})${overview.desc ? " — " + overview.desc : ""}`);
    for (const sub of subs) {
      lines.push(`  - [${sub.label}](${base}${sub.href})${sub.desc ? " — " + sub.desc : ""}`);
    }
  }

  lines.push(
    "",
    "## 部落格（/blog）",
    "",
    `- [長照評鑑部落格](${base}/blog) — 評鑑準備技巧、最新評鑑資訊、機構管理實務`,
    "",
    "## 自評表下載（/downloads）",
    "",
    `- [評鑑自評表下載](${base}/downloads) — 各機構類型評鑑自評 Excel 表免費下載`,
    "",
    "## 產品",
    "",
    `- [報告汪](${base}) — AI 評鑑報告管理平台，適用長照機構管理人員`,
    `- [功能與方案](${base}/pricing) — 產品功能介紹與定價`,
    `- [線上示範](${base}/onboarding) — 免費試用與操作教學`,
  );

  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
