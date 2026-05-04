-- Migration: add public_ai_usage table for unauthenticated demo rate limiting
CREATE TABLE IF NOT EXISTS "public_ai_usage" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "ip_hash" varchar(64) NOT NULL,
  "route" varchar(100) NOT NULL,
  "date_bucket" varchar(10) NOT NULL,
  "count" integer DEFAULT 1 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "public_ai_usage_ip_date_route_idx"
  ON "public_ai_usage" ("ip_hash", "date_bucket", "route");
