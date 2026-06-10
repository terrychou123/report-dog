-- /blog 列表查詢用索引：WHERE status='published' ORDER BY published_at DESC
-- 取代原本的全表掃描 + 排序（Seq Scan）
CREATE INDEX IF NOT EXISTS "blog_posts_status_published_at_idx"
  ON "blog_posts" ("status", "published_at" DESC);
