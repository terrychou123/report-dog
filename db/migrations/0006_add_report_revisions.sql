CREATE TABLE IF NOT EXISTS "report_revisions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "report_id" uuid NOT NULL REFERENCES "reports"("id") ON DELETE CASCADE,
  "user_id" text NOT NULL,
  "title" varchar(255) NOT NULL,
  "content" text,
  "file_type" varchar(10),
  "version_number" integer NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);
