/**
 * 評鑑知識庫原始資料萃取腳本
 *
 * 從現有程式碼萃取評鑑知識，輸出到 knowledge/sources/ 目錄：
 * - profiles/      ← lib/ai/evaluation-profiles/*.ts
 * - tips/          ← app/school/** /page.tsx 的 tips 物件
 * - supplementary-sheets/ ← lib/supplementary-sheets/*.ts
 * - skills/        ← .claude/skills/ * /SKILL.md
 *
 * 使用方式：npx tsx scripts/extract-wiki-sources.ts
 */

import * as fs from "fs";
import * as path from "path";
import { ensureDir, today } from "./lib/fs-utils";

const ROOT = path.resolve(__dirname, "..");
const OUT_BASE = path.join(ROOT, "knowledge", "sources");

// ─── 工具函數 ────────────────────────────────────────────────────────────────

function write(filePath: string, content: string) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`  ✓ ${path.relative(ROOT, filePath)}`);
}

// ─── 第一步：萃取 Evaluation Profiles ─────────────────────────────────────────

async function extractProfiles() {
  console.log("\n📋 萃取 Evaluation Profiles...");

  const { getAllProfiles, getProfile } = await import(
    "../lib/ai/evaluation-profiles/index"
  );

  const allMeta = getAllProfiles();

  for (const meta of allMeta) {
    const profile = getProfile(meta.id);
    if (!profile) continue;

    let md = `---
type: source
source_type: profile
facility_type: ${profile.id}
label: ${profile.label}
description: ${profile.description}
extracted_at: ${today()}
---

# ${profile.label} 評鑑基準

> ${profile.description}

`;

    for (const section of profile.sections) {
      md += `## ${section.name}（${section.shortCode}）\n\n`;

      for (const item of section.items as any[]) {
        md += `### ${section.shortCode}${item.id}. ${item.title}\n\n`;
        md += `- **負責職務**：${item.responsible}\n`;
        md += `- **審查方式**：${item.reviewMethod}\n\n`;

        // 評分細則（部分機構有 score 欄位）
        if (item.score !== undefined) {
          md += `- **配分**：${item.score} 分\n`;
        }
        if (item.category !== undefined) {
          md += `- **類別**：${item.category}\n`;
        }
        if (item.isOptional) {
          md += `- **可免評**：是\n`;
        }
        if (item.articleNumber) {
          md += `- **條文**：${item.articleNumber}\n`;
        }

        md += `\n**評鑑基準：**\n\n`;
        for (let i = 0; i < item.criteria.length; i++) {
          md += `${i + 1}. ${item.criteria[i]}\n`;
        }
        md += "\n";
      }
    }

    write(path.join(OUT_BASE, "profiles", `${profile.id}.md`), md);
  }
}

// ─── 第二步：萃取 School Pages 的 Tips ───────────────────────────────────────

/**
 * 從 TSX 檔案中用 regex 萃取 tips 物件。
 * 尋找形如 `const tips: Record<...> = { ... }` 的區塊。
 */
function extractTipsFromTsx(tsxContent: string): Record<number, { content: string; variant?: string }> {
  // 找到 `const tips` 開始位置
  const startMatch = tsxContent.match(/const tips[^=]*=\s*\{/);
  if (!startMatch || startMatch.index === undefined) return {};

  const startIdx = startMatch.index + startMatch[0].length - 1; // 指向第一個 {

  // 平衡大括號，找到物件結尾
  let depth = 0;
  let endIdx = startIdx;
  for (let i = startIdx; i < tsxContent.length; i++) {
    if (tsxContent[i] === "{") depth++;
    else if (tsxContent[i] === "}") {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }

  const objectStr = tsxContent.slice(startIdx, endIdx + 1);

  // 將 JS 物件轉成 JSON：
  // 1. 移除 trailing commas
  // 2. 將 key: 轉成 "key":
  try {
    const jsonStr = objectStr
      // 移除單行/多行注解
      .replace(/\/\/[^\n]*/g, "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // 把所有未加引號的 key（數字或識別字）轉成 "key":
      .replace(/([{,]\s*)(\d+)(\s*):/g, '$1"$2"$3:')
      .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)(\s*):/g, '$1"$2"$3:')
      // 移除 trailing commas（, 後面跟著 } 或 ] 的）
      .replace(/,(\s*[}\]])/g, "$1")
      // 單引號字串轉雙引號
      .replace(/'([^']*)'/g, '"$1"');

    return JSON.parse(jsonStr);
  } catch {
    // 若 JSON 解析失敗，用更保守的 regex 逐行萃取
    const tips: Record<number, { content: string; variant?: string }> = {};
    const itemRegex = /"?(\d+)"?\s*:\s*\{[\s\S]*?content:\s*["'`]([\s\S]*?)["'`][\s\S]*?(?:variant:\s*["'](\w+)["'])?[\s\S]*?\}/g;
    let match;
    while ((match = itemRegex.exec(objectStr)) !== null) {
      const id = parseInt(match[1]);
      const content = match[2].replace(/\\n/g, "\n").replace(/\\"/g, '"');
      const variant = match[3] as "neutral" | "info" | "warning" | undefined;
      tips[id] = { content, variant };
    }
    return tips;
  }
}

async function extractTips() {
  console.log("\n💡 萃取 School Pages Tips...");

  // facilityType → school 資料夾對應表（school 資料夾名稱有時不同）
  const schoolDirToFacilityType: Record<string, string> = {
    daycare: "daycare",
    "home-care": "home-care",
    "nursing-home": "nursing-home",
    hospital: "hospital",
    "disability-welfare": "disability-welfare",
    "postpartum-care": "babycare",
    "home-nursing": "home-nursing",
    "general-nursing-home": "general-nursing-home",
    "youth-care": "youth-care",
    "elderly-welfare": "elderly-welfare",
    "psychiatric-nursing-home": "psychiatric-nursing-home",
    "infant-daycare": "infant-daycare",
    "psychiatric-rehabilitation-institution": "psychiatric-rehabilitation-day",
  };

  const schoolBase = path.join(ROOT, "app", "school");

  for (const [schoolDir, facilityType] of Object.entries(schoolDirToFacilityType)) {
    const facilitySchoolDir = path.join(schoolBase, schoolDir);
    if (!fs.existsSync(facilitySchoolDir)) continue;

    // 收集該機構所有 section page 的 tips
    const allTips: Record<number, { content: string; variant?: string; page: string }> = {};

    const subDirs = fs
      .readdirSync(facilitySchoolDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const subDir of subDirs) {
      const pagePath = path.join(facilitySchoolDir, subDir, "page.tsx");
      if (!fs.existsSync(pagePath)) continue;

      const content = fs.readFileSync(pagePath, "utf-8");
      const pageTips = extractTipsFromTsx(content);

      for (const [idStr, tip] of Object.entries(pageTips)) {
        const id = parseInt(idStr);
        allTips[id] = { ...tip, page: subDir };
      }
    }

    if (Object.keys(allTips).length === 0) continue;

    // 依 item id 排序輸出
    const sortedIds = Object.keys(allTips)
      .map(Number)
      .sort((a, b) => a - b);

    let md = `---
type: source
source_type: tips
facility_type: ${facilityType}
extracted_at: ${today()}
---

# ${schoolDir} 評鑑準備提示

> 從 app/school/${schoolDir}/** 的 DocsTip 元件萃取

`;

    for (const id of sortedIds) {
      const tip = allTips[id];
      const variantEmoji =
        tip.variant === "warning" ? "⚠️" : tip.variant === "info" ? "ℹ️" : "📝";

      md += `## 指標 ${id}\n\n`;
      md += `> ${variantEmoji} **${tip.variant ?? "neutral"}**（頁面：${tip.page}）\n\n`;
      md += `${tip.content}\n\n`;
    }

    write(path.join(OUT_BASE, "tips", `${facilityType}-tips.md`), md);
  }
}

// ─── 第三步：萃取 Supplementary Sheets ───────────────────────────────────────

async function extractSupplementarySheets() {
  console.log("\n📄 萃取 Supplementary Sheets...");

  // 直接從 registry 讀取（和 index.ts 中的對應相同）
  const facilityTypes = [
    "daycare",
    "home-nursing",
    "babycare",
    "home-care",
    "general-nursing-home",
    "nursing-home",
    "hospital",
    "youth-care",
    "elderly-welfare",
    "psychiatric-nursing-home",
    "disability-welfare",
    "infant-daycare",
  ];

  const { getSupplementaryDefs } = await import("../lib/supplementary-sheets/index");
  const { getProfile } = await import("../lib/ai/evaluation-profiles/index");

  for (const facilityType of facilityTypes) {
    const profile = getProfile(facilityType);
    if (!profile) continue;

    // 收集所有 item id
    const allItemIds: number[] = [];
    for (const section of profile.sections) {
      for (const item of section.items as any[]) {
        allItemIds.push(item.id);
      }
    }

    const entries: { id: number; sheets: any[] }[] = [];
    for (const id of allItemIds) {
      const defs = getSupplementaryDefs(facilityType, id);
      if (defs && defs.length > 0) {
        entries.push({ id, sheets: defs });
      }
    }

    if (entries.length === 0) continue;

    let md = `---
type: source
source_type: supplementary-sheets
facility_type: ${facilityType}
extracted_at: ${today()}
---

# ${profile.label} 附件表單定義

> 從 lib/supplementary-sheets/${facilityType}.ts 萃取

`;

    for (const { id, sheets } of entries) {
      md += `## 指標 ${id}\n\n`;
      for (const sheet of sheets) {
        md += `### ${sheet.sheetName}\n\n`;
        md += `- **文件類型**：${sheet.archetype}\n`;
        if (sheet.criteriaIndex !== undefined) {
          md += `- **對應基準**：第 ${sheet.criteriaIndex + 1} 條\n`;
        }
        md += `- **欄位**：${sheet.columns.map((c: any) => c.header).join("、")}\n\n`;
      }
    }

    write(path.join(OUT_BASE, "supplementary-sheets", `${facilityType}-sheets.md`), md);
  }
}

// ─── 第四步：複製 Claude Skills ──────────────────────────────────────────────

async function copySkills() {
  console.log("\n🎯 複製 Claude Skills...");

  const skillsBase = path.join(ROOT, ".claude", "skills");
  if (!fs.existsSync(skillsBase)) {
    console.log("  （找不到 .claude/skills/，跳過）");
    return;
  }

  const skillDirs = fs
    .readdirSync(skillsBase, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const skillDir of skillDirs) {
    const skillFile = path.join(skillsBase, skillDir, "SKILL.md");
    if (!fs.existsSync(skillFile)) continue;

    const content = fs.readFileSync(skillFile, "utf-8");
    write(path.join(OUT_BASE, "skills", `${skillDir}.md`), content);
  }
}

// ─── 主程式 ──────────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀 開始萃取評鑑知識庫原始資料...\n");
  console.log(`  輸出目錄：${path.relative(ROOT, OUT_BASE)}`);

  try {
    await extractProfiles();
    await extractTips();
    await extractSupplementarySheets();
    await copySkills();

    console.log("\n✅ 萃取完成！");
    console.log(`\n請執行 npm run wiki:generate 生成 wiki 頁面`);
  } catch (err) {
    console.error("\n❌ 萃取失敗：", err);
    process.exit(1);
  }
}

main();
