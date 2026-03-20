CREATE INDEX IF NOT EXISTS "reports_user_id_idx" ON "reports" ("user_id");
CREATE INDEX IF NOT EXISTS "reports_user_id_created_at_idx" ON "reports" ("user_id", "created_at" DESC);
CREATE INDEX IF NOT EXISTS "client_reports_report_id_idx" ON "client_reports" ("report_id");
CREATE INDEX IF NOT EXISTS "clients_user_id_idx" ON "clients" ("user_id");
