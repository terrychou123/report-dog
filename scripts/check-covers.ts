import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { inArray } from "drizzle-orm";
import { blogPosts } from "../db/schema";
import { getDbUrl } from "../db/index";

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
  try {
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
  } finally {
    await client.end();
  }
}
main().catch(console.error);
