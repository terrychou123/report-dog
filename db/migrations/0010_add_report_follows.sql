CREATE TABLE IF NOT EXISTS "report_follows" (
  "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  "report_id" uuid NOT NULL REFERENCES "reports"("id") ON DELETE CASCADE,
  "frequency" varchar(20) NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "report_follows_user_id_report_id_idx" ON "report_follows" ("user_id", "report_id");
CREATE INDEX IF NOT EXISTS "report_follows_user_id_frequency_idx" ON "report_follows" ("user_id", "frequency");
