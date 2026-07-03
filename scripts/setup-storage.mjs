import postgres from "postgres";

// 連線字串一律走環境變數，禁止硬編碼（本檔曾因硬編碼密碼造成外洩，2026-07-04 修復）
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("缺少 DATABASE_URL 環境變數。用法：npx dotenv -e .env.local -- node scripts/setup-storage.mjs");
  process.exit(1);
}

const sql = postgres(DATABASE_URL);
console.log("Connected to database");

// 1. 建立 pdfs bucket（若已存在則設為 public）
await sql`
  INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  VALUES ('pdfs', 'pdfs', true, 52428800, ARRAY['application/pdf'])
  ON CONFLICT (id) DO UPDATE SET public = true
`;
console.log("✓ pdfs bucket created / updated to public");

// 2. INSERT policy：已登入使用者只能上傳至自己的資料夾
await sql`DROP POLICY IF EXISTS "Users can upload to own folder" ON storage.objects`;
await sql`
  CREATE POLICY "Users can upload to own folder"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'pdfs'
    AND auth.uid()::text = (storage.foldername(name))[1]
  )
`;
console.log("✓ INSERT policy set");

// 3. SELECT policy：公開讀取（因為 bucket 是 public）
await sql`DROP POLICY IF EXISTS "Public read pdfs" ON storage.objects`;
await sql`
  CREATE POLICY "Public read pdfs"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'pdfs')
`;
console.log("✓ SELECT policy set");

// 確認
const buckets = await sql`
  SELECT id, name, public FROM storage.buckets WHERE id = 'pdfs'
`;
console.log("\nBucket status:", buckets[0]);

const policies = await sql`
  SELECT policyname, cmd FROM pg_policies
  WHERE schemaname = 'storage' AND tablename = 'objects'
  AND policyname IN ('Users can upload to own folder', 'Public read pdfs')
`;
console.log("Policies:", policies);

await sql.end();
console.log("\nDone.");
