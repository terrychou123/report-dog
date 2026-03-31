import { NextRequest, NextResponse } from "next/server";
import { isBlogAdmin } from "@/lib/blog-admin";
import { createAdminClient } from "@/lib/supabase/admin";

// Supabase Storage bucket 名稱（公開讀取）
const BUCKET = "blog-images";

export async function POST(req: NextRequest) {
  // 驗證是否為部落格管理員
  const isAdmin = await isBlogAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // 驗證檔案類型
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }

  // 限制檔案大小 5MB
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File size must be under 5MB" }, { status: 400 });
  }

  try {
    const adminClient = createAdminClient();

    // 確保 bucket 存在（若已存在則忽略錯誤）
    const { error: bucketError } = await adminClient.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: MAX_SIZE,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"],
    });
    if (bucketError && !bucketError.message.includes("already exists")) {
      console.error("[upload-image] bucket error:", bucketError);
    }

    // 產生唯一檔名，避免衝突
    const ext = file.name.split(".").pop() ?? "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await adminClient.storage
      .from(BUCKET)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // 取得公開 URL
    const {
      data: { publicUrl },
    } = adminClient.storage.from(BUCKET).getPublicUrl(filename);

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error("[upload-image] error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
