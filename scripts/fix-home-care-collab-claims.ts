/**
 * 修正 home-care-evaluation-team-collaboration-2026 文章中兩項虛構功能：
 * - 功能一「多人同時編輯同一份評鑑報告」（無即時協同，非 Google Docs）
 * - 功能三「進度追蹤看板：未開始/進行中/已完成」（reports table 無 status 欄位）
 * 改為符合 codebase 的「標籤分享」、「修訂歷史與追蹤通知」描述。
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/fix-home-care-collab-claims.ts          # dry-run
 *   npx tsx --env-file=.env.local scripts/fix-home-care-collab-claims.ts --apply  # 寫入 DB
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { getDbUrl } from "../db/index";
import { eq } from "drizzle-orm";

const SLUG = "home-care-evaluation-team-collaboration-2026";

const NEW_SECTION = `<p>上述三個痛點，其實都指向同一個根本問題：<strong>沒有一個能讓所有人共用同一份報告、知道誰最近改過、必要時還能回溯歷史的協作平台。</strong></p>

<p>報告汪針對居服評鑑多人協作的三個核心功能：</p>

<h3>功能一：以標籤為單位分享給多位協作者</h3>

<p>每個標籤（評鑑構面或項目主題）可以指派多位「編輯者」與「檢視者」。社工負責項目6（個別服務計畫）對應的標籤、主管負責項目23（專任留任率）對應的標籤、行政負責項目22（收退費）對應的標籤——每個人都看得到自己負責的那組文件。同一份報告在不同人編輯後，「最後編輯者」與編輯時間都會記錄下來，下次打開就知道是誰最近改過，不再需要把 Word 檔傳來傳去。</p>

<h3>功能二：標籤系統分類各構面文件</h3>

<p>用標籤將文件分類為「個案權益保障」、「專業照護品質」、「經營管理效能」三大構面，再細分每個評鑑項目對應的子標籤。需要找項目12（督導訪視）的記錄時，點一個標籤就能看到所有相關文件，不再需要翻資料夾。</p>

<h3>功能三：修訂歷史與報告追蹤通知</h3>

<p>每份報告的編輯都會自動寫入修訂歷史，主管隨時可以回溯「上週社工把項目12改成什麼樣」、「行政上次更新收退費表是哪天」，遇到歧異也能對照前後版本。另外，主管可以對關鍵報告開啟「追蹤」（可選每日／每週／每月頻率），當其他成員有更新時收到站內通知，不必每天逐個點開檢查。</p>

<figure style="margin:2rem 0">
  <img src="/blog/home-care-collab-solution.svg" alt="報告汪解決居服評鑑協作問題：標籤分享編輯、構面標籤分類、修訂歷史與追蹤通知" style="width:100%;border-radius:12px" loading="lazy" decoding="async">
  <figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:0.5rem">圖：報告汪解決方案——標籤分享、構面分類、修訂與追蹤三合一</figcaption>
</figure>`;

async function main() {
  const apply = process.argv.includes("--apply");
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    const [post] = await db
      .select({ content: blogPosts.content })
      .from(blogPosts)
      .where(eq(blogPosts.slug, SLUG));

    if (!post?.content) {
      console.error(`❌ 找不到 slug="${SLUG}"`);
      process.exit(1);
    }

    const content = post.content;

    // 確認兩個錨點存在
    if (!content.includes("上述三個痛點")) {
      console.error("❌ 找不到「上述三個痛點」anchor");
      process.exit(1);
    }
    if (!content.includes("多人同時編輯") && !content.includes("功能一")) {
      console.error("❌ 找不到功能一的 anchor，可能已被修改");
      process.exit(1);
    }

    // 抓取從「上述三個痛點」開頭的 <p> 到最近一個 </figure>
    const OLD_RE = /<p>上述三個痛點[\s\S]*?<\/figure>/;
    const match = content.match(OLD_RE);

    if (!match) {
      console.error("❌ Regex 無法匹配 section，請確認 HTML 結構");
      const idx = content.indexOf("上述三個痛點");
      console.log("\n--- 周圍 HTML（供診斷）---");
      console.log(content.slice(Math.max(0, idx - 30), idx + 1500));
      process.exit(1);
    }

    const oldSection = match[0];
    const occurrences = content.split(oldSection).length - 1;
    if (occurrences !== 1) {
      console.error(`❌ OLD section 出現 ${occurrences} 次（預期 1 次）`);
      process.exit(1);
    }

    console.log("=== OLD ===");
    console.log(oldSection);
    console.log("\n=== NEW ===");
    console.log(NEW_SECTION);

    if (!apply) {
      console.log("\n✅ Dry-run 完成。加上 --apply 寫入 DB。");
      return;
    }

    const newContent = content.replace(oldSection, NEW_SECTION);
    await db
      .update(blogPosts)
      .set({ content: newContent, updatedAt: new Date() })
      .where(eq(blogPosts.slug, SLUG));

    console.log("\n✅ DB 已更新。commit + push 後 Vercel 重新部署即清除 cache。");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
