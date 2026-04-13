CREATE TABLE IF NOT EXISTS "template_links" (
  "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  "template_id" uuid NOT NULL REFERENCES "report_templates"("id") ON DELETE CASCADE,
  "name" varchar(255) NOT NULL,
  "url" text NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "template_links_template_id_idx" ON "template_links" ("template_id");
