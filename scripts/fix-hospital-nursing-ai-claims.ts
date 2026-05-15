/**
 * 修正 hospital-nursing-care-plan-evaluation 文章中
 * 虛構的「輸入病人資訊 → AI 生成評估初稿」工作流描述，
 * 改為符合事實的「護理師寫草稿 → AI 段落改寫精修」模式。
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/fix-hospital-nursing-ai-claims.ts          # dry-run
 *   npx tsx --env-file=.env.local scripts/fix-hospital-nursing-ai-claims.ts --apply  # 寫入 DB
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { getDbUrl } from "../db/index";
import { eq } from "drizzle-orm";

const SLUG = "hospital-nursing-care-plan-evaluation";

// 新 section：H2 標題 + 兩段內文 + figure（保留原始 figure style）
const NEW_SECTION = `<h2>AI 段落改寫：護理文書草稿的快速精修</h2>

<p>護理師面對 2.3 章的入院評估、照護計畫、SBAR 交班記錄，每天打字量驚人。但 AI 不是要取代護理師的臨床判斷或代寫評估——病人狀況的個別化只有護理師能掌握。<a href="/auth/sign-up">報告汪</a> AI 文書助理採用「<strong>護理師寫草稿、AI 協助精修</strong>」模式：護理師先寫出護理評估或照護計畫的粗稿，選取需要改寫的段落，輸入指令（如「補上跌倒壓傷量表評估」「整合跨科照護銜接」「改寫為 SOAP 格式」），AI 在保留原意的前提下改寫並支援多輪追問，協助快速完成符合評鑑期待的書寫風格。</p>

<p>此外，評鑑備審階段已完成的護理文書可整批匯入<a href="/auth/sign-up">報告汪</a>，使用「評鑑分析」功能讓 AI 依醫院評鑑 124 項基準逐項比對，從五個面向（缺少資料／矛盾／應追蹤未追蹤／符合項目／改善建議）產出檢核清單，協助護理長在現場查核前完成自評。</p>

<figure style="margin:2rem 0">
  <img src="/blog/hospital-nursing-care-ai-workflow.svg" alt="AI 段落改寫護理文書流程：護理師撰寫草稿、選取段落輸入指令、AI 在保留原意下改寫、護理師確認簽名" style="width:100%;border-radius:12px" loading="lazy" decoding="async">
  <figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:0.5rem">圖：AI 段落改寫護理文書流程</figcaption>
</figure>`;

async function main() {
  const apply = process.argv.includes("--apply");
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    const [post] = await db
      .select({ id: blogPosts.id, content: blogPosts.content })
      .from(blogPosts)
      .where(eq(blogPosts.slug, SLUG));

    if (!post) {
      console.error(`❌ 找不到 slug="${SLUG}" 的文章`);
      process.exit(1);
    }

    const content = post.content ?? "";

    // 確認 anchor 存在
    if (!content.includes("AI 輔助護理文書")) {
      console.error("❌ 找不到「AI 輔助護理文書」anchor，可能已被改過");
      process.exit(1);
    }

    // 匹配整個 section：從 <h2>AI 輔助護理文書 到下一個 <h2> 之前
    const OLD_SECTION_RE =
      /<h2[^>]*>AI 輔助護理文書[\s\S]*?(?=<h2)/;

    const match = content.match(OLD_SECTION_RE);
    if (!match) {
      console.error("❌ Regex 無法匹配 section，請手動確認 HTML 結構");
      const idx = content.indexOf("AI 輔助護理文書");
      console.log("\n--- 周圍 HTML（供診斷）---");
      console.log(content.slice(Math.max(0, idx - 20), idx + 800));
      process.exit(1);
    }

    const oldSection = match[0];

    // 確認唯一
    const occurrences = content.split(oldSection).length - 1;
    if (occurrences !== 1) {
      console.error(`❌ OLD section 出現 ${occurrences} 次（預期 1 次）`);
      process.exit(1);
    }

    console.log("=== OLD (要替換的 section) ===");
    console.log(oldSection);
    console.log("\n=== NEW (替換後的 section) ===");
    console.log(NEW_SECTION);

    if (!apply) {
      console.log("\n✅ Dry-run 完成。加上 --apply 參數以寫入 DB。");
      return;
    }

    const newContent = content.replace(oldSection, NEW_SECTION + "\n\n");
    await db
      .update(blogPosts)
      .set({ content: newContent, updatedAt: new Date() })
      .where(eq(blogPosts.slug, SLUG));

    console.log("\n✅ DB 已更新。請 commit + push 觸發 Vercel 重新部署以清除 cache。");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
