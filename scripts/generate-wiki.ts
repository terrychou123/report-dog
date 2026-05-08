/**
 * Wiki 頁面生成腳本（Phase 2）
 *
 * 讀取 knowledge/sources/ 的原始資料，生成：
 * - wiki/facility-types/{id}/overview.md          機構概覽
 * - wiki/facility-types/{id}/items/{n}-{slug}.md  每個評鑑指標的深度頁面
 * - wiki/index.md                                  全域目錄
 * - wiki/log.md                                    操作紀錄
 *
 * 使用方式：npx tsx scripts/generate-wiki.ts
 */

import * as fs from "fs";
import * as path from "path";
import { ensureDir, today } from "./lib/fs-utils";

type WikiItem = { id: number; title: string; responsible: string; reviewMethod: string; criteria: string[] };
type WikiSection = { name: string; shortCode: string; items: WikiItem[] };
type WikiProfile = { id: string; label: string; description: string; sections: WikiSection[] };

const ROOT = path.resolve(__dirname, "..");
const WIKI_BASE = path.join(ROOT, "knowledge", "wiki");
const SOURCES_BASE = path.join(ROOT, "knowledge", "sources");

// ─── 工具函數 ────────────────────────────────────────────────────────────────

function write(filePath: string, content: string) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
}

/** 將中文/英文標題轉成檔案名稱（保留中文字，移除特殊符號） */
function slugify(text: string): string {
  return text
    .replace(/[\/\\:*?"<>|]/g, "")  // 移除檔案系統不允許的字元
    .replace(/\s+/g, "-")            // 空白換連字號
    .replace(/-+/g, "-")             // 合併多個連字號
    .trim()
    || "item";
}

/** 取得主題標籤（依關鍵詞配對） */
function inferTags(text: string): string[] {
  const tagMap: [string, string][] = [
    ["infection-control",      "感染|消毒|隔離|防疫|CLABSI|CAUTI"],
    ["fire-safety",            "消防|逃生|演練|滅火|煙霧"],
    ["privacy-data-protection","個人資料|保密|肖像權|個資|隱私"],
    ["complaint-mechanisms",   "申訴|意見反應|投訴|陳情"],
    ["staff-training",         "教育訓練|在職訓練|研習|課程|訓練紀錄"],
    ["care-plans",             "照顧計畫|服務計畫|個別化|ADL|IADL"],
    ["emergency-management",   "緊急|事故|跌倒|意外|通報|CPR"],
    ["nutrition-diet",         "飲食|營養|餐食|特殊飲食|熱量"],
    ["medication-management",  "藥物|用藥|備藥|服藥|處方"],
    ["documentation",          "紀錄|表單|檔案|文件|記錄|報告"],
    ["quality-monitoring",     "品質|自評|督導|檢核|改善|PDCA"],
    ["financial-management",   "財務|收費|費用|帳務|財報"],
    ["physical-environment",   "環境|空間|設施|設備|無障礙|安全"],
    ["client-rights",          "權益|自主|尊嚴|知情|同意|申訴"],
  ];

  const tags: string[] = [];
  for (const [tag, keywords] of tagMap) {
    const re = new RegExp(keywords.split("|").join("|"), "g");
    if (re.test(text)) {
      tags.push(tag);
    }
  }
  return [...new Set(tags)]; // 去重
}

// ─── 載入 Sources ─────────────────────────────────────────────────────────────

interface TipEntry {
  variant: "neutral" | "info" | "warning";
  content: string;
  page: string;
}

function loadTips(facilityType: string): Record<number, TipEntry> {
  const tipsFile = path.join(SOURCES_BASE, "tips", `${facilityType}-tips.md`);
  if (!fs.existsSync(tipsFile)) return {};

  const content = fs.readFileSync(tipsFile, "utf-8");
  const tips: Record<number, TipEntry> = {};

  // 解析 ## 指標 N 區塊
  const blocks = content.split(/^## 指標 (\d+)/m);
  for (let i = 1; i < blocks.length; i += 2) {
    const id = parseInt(blocks[i]);
    const block = blocks[i + 1] || "";

    const variantMatch = block.match(/\*\*(neutral|info|warning)\*\*/);
    const pageMatch = block.match(/頁面：([^\)]+)\)/);
    const contentLines = block
      .replace(/^>.*$/gm, "")          // 移除 blockquote 行（> 開頭）
      .replace(/^\*.*$/gm, "")         // 移除 list 行（* 開頭）
      .replace(/^\s*$/gm, "")          // 移除空行
      .replace(/\n{2,}/g, "\n")        // 合併多個空行
      .trim();

    tips[id] = {
      variant: (variantMatch?.[1] as TipEntry["variant"]) ?? "neutral",
      content: contentLines,
      page: pageMatch?.[1] ?? "",
    };
  }
  return tips;
}

interface SheetEntry {
  sheetName: string;
  archetype: string;
  columns: string[];
}

function loadSheets(facilityType: string): Record<number, SheetEntry[]> {
  const sheetsFile = path.join(SOURCES_BASE, "supplementary-sheets", `${facilityType}-sheets.md`);
  if (!fs.existsSync(sheetsFile)) return {};

  const content = fs.readFileSync(sheetsFile, "utf-8");
  const sheets: Record<number, SheetEntry[]> = {};

  // 解析 ## 指標 N 區塊
  const itemBlocks = content.split(/^## 指標 (\d+)/m);
  for (let i = 1; i < itemBlocks.length; i += 2) {
    const id = parseInt(itemBlocks[i]);
    const block = itemBlocks[i + 1] || "";
    sheets[id] = [];

    // 每個 ### 是一個 sheet
    const sheetBlocks = block.split(/^### /m).slice(1);
    for (const sb of sheetBlocks) {
      const sheetName = sb.split("\n")[0].trim();
      const archetypeMatch = sb.match(/\*\*文件類型\*\*：(\S+)/);
      const columnsMatch = sb.match(/\*\*欄位\*\*：(.+)/);

      sheets[id].push({
        sheetName,
        archetype: archetypeMatch?.[1] ?? "",
        columns: columnsMatch?.[1]?.split("、") ?? [],
      });
    }
  }
  return sheets;
}

// ─── 生成機構概覽頁 ───────────────────────────────────────────────────────────

function generateOverview(profile: WikiProfile): string {
  const totalItems = profile.sections.reduce(
    (sum: number, s: WikiSection) => sum + s.items.length,
    0
  );

  let md = `---
type: overview
facility_type: ${profile.id}
title: ${profile.label}評鑑概覽
year: ${profile.description.match(/(\d{3})年/) ?.[1] ?? ""}
total_items: ${totalItems}
source_refs: [profiles/${profile.id}.md]
last_updated: ${today()}
---

# ${profile.label}評鑑概覽

> ${profile.description}

## 評鑑概要

本評鑑共 **${totalItems} 個指標**，分為 ${profile.sections.length} 個區塊。

## 區塊結構

| 短碼 | 區塊名稱 | 指標數 |
|------|---------|--------|
`;

  for (const section of profile.sections) {
    md += `| ${section.shortCode} | ${section.name} | ${section.items.length} |\n`;
  }

  md += `
## 評分方式

依各指標評分，評鑑委員透過文件檢閱、現場訪談、實地觀察等方式評核。

## 準備要點

- 提前整理每個指標所需文件，建立完整書面紀錄
- 注意帶有 ⚠️ 警告的指標，這些是常見扣分點
- 確保所有表單版本符合當年度規定

## 年度重點變更

（待更新）

## 相關資源

- [完整準備指南](./preparation-guide.md)
- [評分細則](./scoring-rubric.md)
`;

  return md;
}

// ─── 生成指標頁面 ────────────────────────────────────────────────────────────

function generateItemPage(
  profile: WikiProfile,
  section: WikiSection,
  item: WikiItem,
  tip: TipEntry | undefined,
  itemSheets: SheetEntry[]
): string {
  const tags = inferTags(
    [item.title, ...item.criteria, tip?.content ?? ""].join(" ")
  );

  let md = `---
type: item
facility_type: ${profile.id}
item_id: ${item.id}
title: ${item.title}
section: ${section.name}
short_code: ${section.shortCode}
responsible: ${item.responsible}
review_method: "${item.reviewMethod}"
tags: [${tags.join(", ")}]
source_refs:
  - profiles/${profile.id}.md${tip ? `\n  - tips/${profile.id}-tips.md` : ""}${itemSheets.length > 0 ? `\n  - supplementary-sheets/${profile.id}-sheets.md` : ""}
last_updated: ${today()}
---

# ${section.shortCode}${item.id}. ${item.title}

> **負責**：${item.responsible}　**審查**：${item.reviewMethod}

## 評鑑基準（WHAT）

`;

  for (let i = 0; i < item.criteria.length; i++) {
    md += `${i + 1}. ${item.criteria[i]}\n`;
  }

  // 額外欄位（部分機構）
  if (item.score !== undefined) {
    md += `\n> 配分：**${item.score} 分**\n`;
  }
  if (item.category !== undefined) {
    md += `\n> 類別：**${item.category}**\n`;
  }

  // 準備方式
  if (tip?.content) {
    const variantEmoji =
      tip.variant === "warning" ? "⚠️" : tip.variant === "info" ? "ℹ️" : "📝";
    md += `
## 準備方式（HOW）

${variantEmoji} ${tip.content}
`;
  } else {
    md += `
## 準備方式（HOW）

（尚無準備提示）
`;
  }

  // 所需文件
  if (itemSheets.length > 0) {
    md += `
## 所需文件（WITH WHAT）

`;
    for (const sheet of itemSheets) {
      md += `### ${sheet.sheetName}\n\n`;
      md += `- **文件類型**：\`${sheet.archetype}\`\n`;
      if (sheet.columns.length > 0) {
        md += `- **欄位**：${sheet.columns.join("、")}\n`;
      }
      md += "\n";
    }
  }

  // 常見缺失（只有 warning 才單獨提示）
  if (tip?.variant === "warning") {
    md += `## 常見缺失

> ⚠️ ${tip.content}
`;
  } else {
    md += `## 常見缺失

（待整理）
`;
  }

  // 相關主題
  if (tags.length > 0) {
    md += `
## 相關主題

`;
    for (const tag of tags) {
      md += `- [${tag}](../../../topics/${tag}.md)\n`;
    }
  }

  return md;
}

// ─── 生成 index.md ────────────────────────────────────────────────────────────

function generateIndex(entries: string[]): string {
  return `---
generated_at: ${today()}
total_pages: ${entries.length}
---

# 評鑑知識庫目錄

${entries.join("\n")}
`;
}

// ─── 主程式 ──────────────────────────────────────────────────────────────────

async function main() {
  console.log("📚 開始生成 Wiki 頁面...\n");

  const { getAllProfiles, getProfile } = await import(
    "../lib/ai/evaluation-profiles/index"
  );

  const allMeta = getAllProfiles();
  const indexEntries: string[] = [];
  let totalItems = 0;
  let totalOverviews = 0;

  for (const meta of allMeta) {
    const profile = getProfile(meta.id) as WikiProfile | null;
    if (!profile || profile.sections.length === 0) continue;

    console.log(`\n🏥 ${profile.label}（${profile.id}）`);

    const facilityDir = path.join(WIKI_BASE, "facility-types", profile.id);
    const itemsDir = path.join(facilityDir, "items");
    ensureDir(itemsDir);

    // 載入 tips & sheets
    const tips = loadTips(profile.id);
    const sheets = loadSheets(profile.id);

    // 生成概覽頁
    const overviewMd = generateOverview(profile);
    write(path.join(facilityDir, "overview.md"), overviewMd);
    indexEntries.push(
      `- [facility-types/${profile.id}/overview.md](facility-types/${profile.id}/overview.md) — ${profile.label}，概覽，${profile.description}`
    );
    totalOverviews++;
    console.log(`  ✓ overview.md`);

    // 生成各指標頁
    let sectionItemCount = 0;
    for (const section of profile.sections) {
      for (const item of section.items) {
        const tip = tips[item.id];
        const itemSheets = sheets[item.id] ?? [];
        const itemMd = generateItemPage(profile, section, item, tip, itemSheets);

        const paddedId = String(item.id).padStart(2, "0");
        const slug = slugify(item.title);
        const fileName = `${paddedId}-${slug}.md`;

        write(path.join(itemsDir, fileName), itemMd);
        indexEntries.push(
          `- [facility-types/${profile.id}/items/${fileName}](facility-types/${profile.id}/items/${fileName}) — ${profile.label} ${section.shortCode}${item.id}：${item.title}`
        );
        sectionItemCount++;
        totalItems++;
      }
    }

    console.log(`  ✓ items/ (${sectionItemCount} 個指標頁)`);

    // 生成準備指南佔位頁
    const prepMd = `---
type: preparation-guide
facility_type: ${profile.id}
title: ${profile.label}評鑑準備完整指南
source_refs: [profiles/${profile.id}.md, tips/${profile.id}-tips.md]
last_updated: ${today()}
---

# ${profile.label}評鑑準備完整指南

> 本頁面為 AI 維護的知識頁面，內容持續更新。

## 準備時程建議

（待整理）

## 優先準備項目

（待整理）

## 常見錯誤

（待整理）

## 文件清單

（待整理）

## 評鑑當天注意

（待整理）
`;
    write(path.join(facilityDir, "preparation-guide.md"), prepMd);

    // 生成評分細則佔位頁
    const rubricMd = `---
type: scoring-rubric
facility_type: ${profile.id}
title: ${profile.label}評分細則
last_updated: ${today()}
---

# ${profile.label}評分細則

> 本頁面為 AI 維護的知識頁面，內容持續更新。

## 評分方式

（待整理，通常為 A-E 五等制）

## 各等第說明

| 等第 | 說明 |
|------|------|
| A | 完全符合，且有創新或超越標準 |
| B | 大致符合，少數細節待改善 |
| C | 部分符合，有明顯缺失 |
| D | 大多不符合，需大幅改善 |
| E | 完全不符合或無相關資料 |

## 各區塊評分重點

（待整理）
`;
    write(path.join(facilityDir, "scoring-rubric.md"), rubricMd);
  }

  // 生成 index.md
  write(path.join(WIKI_BASE, "index.md"), generateIndex(indexEntries));
  console.log("\n  ✓ wiki/index.md");

  // 生成 log.md（若已存在則 append）
  const logPath = path.join(WIKI_BASE, "log.md");
  const logEntry = `\n## [${today()}] generate | 重新生成所有頁面\n\n- 涵蓋機構：${allMeta.length} 種\n- 指標頁面：${totalItems} 頁\n- 概覽頁面：${totalOverviews} 頁\n`;

  if (fs.existsSync(logPath)) {
    fs.appendFileSync(logPath, logEntry, "utf-8");
  } else {
    write(logPath, `# 操作紀錄${logEntry}`);
  }
  console.log("  ✓ wiki/log.md");

  // 建立 topics/ 佔位頁（Phase 3 會填充）
  const topicsToCreate = [
    "infection-control",
    "fire-safety",
    "privacy-data-protection",
    "complaint-mechanisms",
    "staff-training",
    "care-plans",
    "emergency-management",
    "nutrition-diet",
    "medication-management",
    "documentation",
    "quality-monitoring",
    "financial-management",
    "physical-environment",
    "client-rights",
  ];

  for (const topic of topicsToCreate) {
    const topicPath = path.join(WIKI_BASE, "topics", `${topic}.md`);
    if (!fs.existsSync(topicPath)) {
      write(topicPath, `---
type: topic
topic_id: ${topic}
title: ${topic}
tags: [${topic}]
last_updated: ${today()}
---

# ${topic}

（待整理 — 執行 wiki:generate --topics 後自動填充）
`);
    }
  }

  // 建立 glossary.md 佔位
  const glossaryPath = path.join(WIKI_BASE, "glossary.md");
  if (!fs.existsSync(glossaryPath)) {
    write(glossaryPath, `---
type: glossary
title: 評鑑術語表
last_updated: ${today()}
---

# 評鑑術語表

## 基本術語

| 術語 | 說明 |
|------|------|
| 評鑑基準 | 評鑑委員審查機構服務品質的標準項目 |
| 服務對象 | 接受機構服務的個案 |
| 加分題 | 超越基本要求的優良表現項目 |
| 短碼 | 評鑑基準區塊的簡稱（如「權」代表個案權益保障） |
| A-E 五等制 | 五個等第的評分制度 |
| 照顧計畫 | 針對個別服務對象訂定的服務方案 |
`);
  }

  console.log(`\n✅ Wiki 生成完成！`);
  console.log(`   指標頁面：${totalItems} 頁`);
  console.log(`   概覽頁面：${totalOverviews} 頁`);
  console.log(`   主題頁面：${topicsToCreate.length} 頁（佔位）`);
  console.log(`\n請執行 npm run wiki:lint 檢查品質`);
}

main().catch((err) => {
  console.error("❌ 生成失敗：", err);
  process.exit(1);
});
