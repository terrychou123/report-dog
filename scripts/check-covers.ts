import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { inArray } from "drizzle-orm";
import { blogPosts } from "../db/schema";

function getDbUrl(raw = process.env.DATABASE_URL) {
  if (!raw) throw new Error("DATABASE_URL 未設定");
  const match = raw.match(/^(postgresql:\/\/[^:]+):([^@]+)@(.+)$/);
  if (match) {
    const [, prefix, password, suffix] = match;
    return `${prefix}:${encodeURIComponent(password)}@${suffix}`;
  }
  return raw;
}

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);
  const slugs = [
    "daycare-evaluation-inspector-perspective-2026",
    "daycare-evaluation-faq-15-questions-2026",
    "daycare-evaluation-3month-timeline-2026",
    "daycare-quality-indicator-setup-guide-2026",
    "daycare-post-evaluation-action-plan-2026",
  ];
  const rows = await db.select({
    slug: blogPosts.slug,
    status: blogPosts.status,
    coverImageUrl: blogPosts.coverImageUrl,
  }).from(blogPosts).where(inArray(blogPosts.slug, slugs));
  for (const r of rows) {
    console.log(`slug: ${r.slug}`);
    console.log(`  status: ${r.status}`);
    console.log(`  coverImageUrl: ${r.coverImageUrl}`);
    console.log();
  }
  await client.end();
}
main().catch(console.error);
