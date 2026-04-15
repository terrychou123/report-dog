-- 新增評鑑範本歷史版本表（最多保留 5 筆）
CREATE TABLE IF NOT EXISTS "template_revisions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text,
	"file_type" varchar(10) DEFAULT 'excel' NOT NULL,
	"version_number" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "template_revisions"
  ADD CONSTRAINT "template_revisions_template_id_report_templates_id_fk"
  FOREIGN KEY ("template_id")
  REFERENCES "report_templates"("id")
  ON DELETE cascade;

-- 加速以 template_id 查詢版本的索引
CREATE INDEX "template_revisions_template_id_idx" ON "template_revisions" ("template_id");

-- 防止並發儲存產生重複版本號
ALTER TABLE "template_revisions"
  ADD CONSTRAINT "template_revisions_template_id_version_number_unique"
  UNIQUE ("template_id", "version_number");
