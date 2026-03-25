-- Template tags (system-level, not user-owned)
CREATE TABLE template_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_type VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Template reports
CREATE TABLE report_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  file_type VARCHAR(10) DEFAULT 'docx',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Template tag-report associations
CREATE TABLE template_tag_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  template_tag_id UUID REFERENCES template_tags(id) ON DELETE CASCADE NOT NULL,
  report_template_id UUID REFERENCES report_templates(id) ON DELETE CASCADE NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE(template_tag_id, report_template_id)
);

-- User import tracking (prevents duplicate imports + analytics)
CREATE TABLE template_imports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  facility_type VARCHAR(50) NOT NULL,
  imported_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, facility_type)
);

CREATE INDEX idx_template_tags_facility ON template_tags(facility_type);
CREATE INDEX idx_report_templates_facility ON report_templates(facility_type);
CREATE INDEX idx_template_imports_user ON template_imports(user_id);
