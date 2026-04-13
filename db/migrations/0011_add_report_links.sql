CREATE TABLE IF NOT EXISTS "report_links" (
  "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  "report_id" uuid NOT NULL REFERENCES "reports"("id") ON DELETE CASCADE,
  "name" varchar(255) NOT NULL,
  "url" text NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "report_links_report_id_idx" ON "report_links" ("report_id");
