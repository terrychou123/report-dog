ALTER TABLE "blog_posts"
  ADD COLUMN IF NOT EXISTS "author" TEXT,
  ADD COLUMN IF NOT EXISTS "cover_image_alt" TEXT;
