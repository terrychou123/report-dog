-- Migration: Template system overhaul
-- 1. Remove unique constraint on template_imports to allow unlimited re-imports
-- 2. Add responsible column to report_templates for personnel-based grouping

DROP INDEX IF EXISTS template_imports_user_id_facility_type_idx;

ALTER TABLE report_templates ADD COLUMN IF NOT EXISTS responsible VARCHAR(100);
