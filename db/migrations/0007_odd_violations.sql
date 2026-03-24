-- Create notifications table (if not yet applied via standalone SQL)
CREATE TABLE IF NOT EXISTS "notifications" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL,
  "type" varchar(50) NOT NULL,
  "title" varchar(255) NOT NULL,
  "message" text,
  "link" text,
  "read" boolean DEFAULT false NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "notifications_user_id_read_idx" ON "notifications" ("user_id", "read");

--> statement-breakpoint

-- Create ai_usage table (new table with date_bucket from the start)
CREATE TABLE IF NOT EXISTS "ai_usage" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL,
  "route" varchar(100) NOT NULL,
  "date_bucket" varchar(10) NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

-- If table already existed without date_bucket, add and backfill it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ai_usage' AND column_name = 'date_bucket'
  ) THEN
    ALTER TABLE "ai_usage" ADD COLUMN "date_bucket" varchar(10);
    -- Backfill from created_at (UTC date)
    UPDATE "ai_usage"
    SET "date_bucket" = TO_CHAR("created_at" AT TIME ZONE 'UTC', 'YYYY-MM-DD');
    -- Remove duplicate rows per user per day, keep the earliest
    DELETE FROM "ai_usage" a
    USING "ai_usage" b
    WHERE a.user_id = b.user_id
      AND a.date_bucket = b.date_bucket
      AND a.created_at > b.created_at;
    ALTER TABLE "ai_usage" ALTER COLUMN "date_bucket" SET NOT NULL;
  END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS "ai_usage_user_id_created_at_idx" ON "ai_usage" ("user_id", "created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "ai_usage_user_id_date_bucket_idx" ON "ai_usage" ("user_id", "date_bucket");
