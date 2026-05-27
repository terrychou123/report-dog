-- nurture 序列狀態欄位
-- nurture_stage: 0=未開始, 1=Email1已送, 2=Email2已送, 3=序列完成
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS nurture_stage smallint NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS nurture_sent_at timestamptz;
