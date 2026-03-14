ALTER TABLE "client_reports" ADD COLUMN "sort_order" integer DEFAULT 0 NOT NULL;

-- Backfill: assign sequential sort_order per client, ordered by created_at
UPDATE client_reports cr
SET sort_order = sub.rn - 1
FROM (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY created_at) AS rn
  FROM client_reports
) sub
WHERE cr.id = sub.id;
