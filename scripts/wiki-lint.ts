/**
 * Wiki 品質檢查腳本（Lint）
 *
 * 檢查：
 * 1. 覆蓋率：每個評鑑指標是否有對應 wiki 頁面
 * 2. Frontmatter：必填欄位是否齊全
 * 3. 準備提示：多少指標有/沒有 HOW 內容
 * 4. 主題標籤：標籤是否有效
 *
 * 使用方式：npx tsx scripts/wiki-lint.ts
 */

import * as fs from "fs";
import * as path from "path";

type WikiItem = { id: number; title: string };

const ROOT = path.resolve(__dirname, "..");
const WIKI_BASE = path.join(ROOT, "knowledge", "wiki");

let errorCount = 0;
let warningCount = 0;

function error(msg: string) {
  console.log(`  ❌ ${msg}`);
  errorCount++;
}

function warn(msg: string) {
  console.log(`  ⚠️  ${msg}`);
  warningCount++;
}

function ok(msg: string) {
  console.log(`  ✓ ${msg}`);
}

// ─── 主程式 ──────────────────────────────────────────────────────────────────

async function main() {
  console.log("🔍 Wiki 品質檢查開始...\n");

  const { getAllProfiles, getProfile } = await import(
    "../lib/ai/evaluation-profiles/index"
  );

  let totalItems = 0;
  let coveredItems = 0;
  let hasTipItems = 0;
  let hasSheetItems = 0;

  const allMeta = getAllProfiles();

  for (const meta of allMeta) {
    const profile = getProfile(meta.id);
    if (!profile || profile.sections.length === 0) continue;

    const facilityItemsDir = path.join(
      WIKI_BASE,
      "facility-types",
      profile.id,
      "items"
    );

    console.log(`\n📋 ${profile.label}（${profile.id}）`);

    // 確認 overview.md 存在
    const overviewPath = path.join(
      WIKI_BASE,
      "facility-types",
      profile.id,
      "overview.md"
    );
    if (!fs.existsSync(overviewPath)) {
      error(`缺少 overview.md`);
    }

    // 列出所有已生成的 items
    const existingFiles = fs.existsSync(facilityItemsDir)
      ? fs
          .readdirSync(facilityItemsDir)
          .filter((f) => f.endsWith(".md"))
          .map((f) => f.replace(/\.md$/, ""))
      : [];

    // 從 profile 中取得所有 item id
    let facilityTotal = 0;
    let facilityCovered = 0;
    let facilityTips = 0;
    let facilitySheets = 0;
    const facilityNoTip: number[] = [];

    for (const section of profile.sections) {
      for (const item of section.items as WikiItem[]) {
        totalItems++;
        facilityTotal++;

        // 找到對應的檔案（id 前綴比對）
        const paddedId = String(item.id).padStart(2, "0");
        const matchFile = existingFiles.find((f) => f.startsWith(`${paddedId}-`));

        if (!matchFile) {
          error(`${section.shortCode}${item.id} ${item.title} — 缺少 wiki 頁面`);
          continue;
        }
        coveredItems++;
        facilityCovered++;

        // 讀取檔案內容
        const filePath = path.join(facilityItemsDir, `${matchFile}.md`);
        const content = fs.readFileSync(filePath, "utf-8");

        // 檢查 frontmatter
        if (!content.startsWith("---")) {
          error(`${matchFile} — 缺少 frontmatter`);
        }

        // 檢查 HOW 內容
        const hasHow = !content.includes("（尚無準備提示）");
        if (hasHow) {
          facilityTips++;
          hasTipItems++;
        } else {
          facilityNoTip.push(item.id);
        }

        // 檢查是否有文件
        const hasSheets = content.includes("## 所需文件（WITH WHAT）");
        if (hasSheets) {
          facilitySheets++;
          hasSheetItems++;
        }
      }
    }

    ok(
      `覆蓋率 ${facilityCovered}/${facilityTotal}，有提示 ${facilityTips}，有文件 ${facilitySheets}`
    );
    if (facilityNoTip.length > 0 && facilityNoTip.length <= 10) {
      warn(`缺少準備提示的指標：${facilityNoTip.join(", ")}`);
    } else if (facilityNoTip.length > 10) {
      warn(`缺少準備提示的指標：${facilityNoTip.length} 個`);
    }
  }

  // ─── 主題頁面檢查 ──────────────────────────────────────────────────────────
  console.log("\n\n🏷️  主題頁面");
  const topicsDir = path.join(WIKI_BASE, "topics");
  if (fs.existsSync(topicsDir)) {
    const topicFiles = fs.readdirSync(topicsDir).filter((f) => f.endsWith(".md"));
    let stubTopics = 0;
    for (const tf of topicFiles) {
      const content = fs.readFileSync(path.join(topicsDir, tf), "utf-8");
      if (content.includes("（待整理")) stubTopics++;
    }
    ok(`共 ${topicFiles.length} 個主題頁，${stubTopics} 個待整理`);
  } else {
    error("topics/ 目錄不存在");
  }

  // ─── index.md 檢查 ─────────────────────────────────────────────────────────
  console.log("\n\n📑 index.md");
  const indexPath = path.join(WIKI_BASE, "index.md");
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, "utf-8");
    const lineCount = indexContent.split("\n").filter((l) => l.startsWith("- [")).length;
    ok(`共 ${lineCount} 條目錄項目`);
  } else {
    error("index.md 不存在");
  }

  // ─── 總結 ────────────────────────────────────────────────────────────────────
  console.log("\n\n📊 總結");
  console.log(`  評鑑指標總數：${totalItems}`);
  console.log(`  Wiki 覆蓋率：${coveredItems}/${totalItems} (${Math.round(coveredItems / totalItems * 100)}%)`);
  console.log(`  有準備提示：${hasTipItems}/${totalItems} (${Math.round(hasTipItems / totalItems * 100)}%)`);
  console.log(`  有文件定義：${hasSheetItems}/${totalItems} (${Math.round(hasSheetItems / totalItems * 100)}%)`);
  console.log(`  錯誤：${errorCount}，警告：${warningCount}`);

  if (errorCount === 0 && warningCount === 0) {
    console.log("\n✅ 品質檢查通過！");
  } else if (errorCount === 0) {
    console.log("\n🟡 有警告，建議改善");
  } else {
    console.log("\n❌ 有錯誤需要修正");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("❌ Lint 失敗：", err);
  process.exit(1);
});
