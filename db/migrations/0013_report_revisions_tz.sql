-- 修正 report_revisions.created_at 為 timestamptz（若尚未轉型）
-- 既有資料原本以 UTC 牆鐘時間存入（timestamp without time zone），
-- 用 AT TIME ZONE 'UTC' 補上正確時區資訊，數值不變
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'report_revisions'
      AND column_name = 'created_at'
      AND data_type = 'timestamp without time zone'
  ) THEN
    ALTER TABLE "report_revisions"
      ALTER COLUMN "created_at" TYPE timestamptz
      USING "created_at" AT TIME ZONE 'UTC';
  END IF;
END $$;

-- 修正 template_revisions.created_at 為 timestamptz（若尚未轉型）
-- migration 宣告為 timestamptz，但實際 DB 欄位仍為 timestamp without time zone
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'template_revisions'
      AND column_name = 'created_at'
      AND data_type = 'timestamp without time zone'
  ) THEN
    ALTER TABLE "template_revisions"
      ALTER COLUMN "created_at" TYPE timestamptz
      USING "created_at" AT TIME ZONE 'UTC';
  END IF;
END $$;
