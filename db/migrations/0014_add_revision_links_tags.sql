-- 補強版本歷史快照：加入連結、標籤、負責人
ALTER TABLE "template_revisions" ADD COLUMN IF NOT EXISTS "responsible" varchar(100);
ALTER TABLE "template_revisions" ADD COLUMN IF NOT EXISTS "links" text;
ALTER TABLE "template_revisions" ADD COLUMN IF NOT EXISTS "tags" text;
