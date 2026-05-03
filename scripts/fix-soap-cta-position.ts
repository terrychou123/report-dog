/**
 * 把 SOAP 系列文章 body 開頭的 ⚡ CTA 移到第一個 H2 後面
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import { blogPosts } from "../db/schema";
import { getDbUrl } from "../db/index";

const POSTS_DIR = join(__dirname, "blog-posts");
const SOAP_SLUGS = new Set([
  "home-nursing-soap-b2-evaluation-records",
  "general-nursing-home-soap-b1-care-plan",
  "nursing-home-soap-b2-interprofessional-records",
  "psychiatric-nursing-home-soap-dar-records",
  "hospital-soap-interprofessional-care-plan",
  "home-care-simplified-soap-service-records",
]);

async function main() {
  const sql = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(sql);
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
  let updated = 0;

  for (const file of files) {
    const filepath = join(POSTS_DIR, file);
    const post = JSON.parse(readFileSync(filepath, "utf-8"));
    if (!SOAP_SLUGS.has(post.slug)) continue;

    const content: string = post.content;
    // 找 ⚡ 開頭的 <p> 或 <blockquote>
    const ctaRe = /<(?:p|blockquote)[^>]*>\s*⚡[\s\S]*?<\/(?:p|blockquote)>/i;
    const ctaMatch = ctaRe.exec(content);
    if (!ctaMatch) {
      console.log(`  跳過 ${post.slug}：無 ⚡ 元素`);
      continue;
    }

    // 確認 ⚡ 在第一個 </h2> 之前（才需要移）
    const firstH2End = content.indexOf("</h2>");
    if (firstH2End === -1 || ctaMatch.index > firstH2End) {
      console.log(`  跳過 ${post.slug}：⚡ 已在 H2 之後`);
      continue;
    }

    // 移除原位、插到第一個 </h2> 後
    const withoutCta = content.replace(ctaMatch[0], "").replace(/\n{3,}/g, "\n\n");
    const insertAt = withoutCta.indexOf("</h2>") + "</h2>".length;
    const newContent =
      withoutCta.slice(0, insertAt) + "\n\n" + ctaMatch[0] + "\n\n" + withoutCta.slice(insertAt).replace(/^\n+/, "");

    writeFileSync(filepath, JSON.stringify({ ...post, content: newContent }, null, 2) + "\n");
    await db
      .update(blogPosts)
      .set({ content: newContent, updatedAt: new Date() })
      .where(eq(blogPosts.slug, post.slug));

    console.log(`  ✅ ${post.slug}`);
    updated++;
  }

  console.log(`\n移動 ⚡ CTA 完成：${updated} 篇`);
  await sql.end();
}

main().catch((err) => { console.error(err); process.exit(1); });
