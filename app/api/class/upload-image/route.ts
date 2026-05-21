import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "class-images";

export async function POST(req: NextRequest) {
  const result = await requireAdminApi();
  if (result instanceof NextResponse) return result;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }

  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File size must be under 5MB" }, { status: 400 });
  }

  try {
    const adminClient = createAdminClient();

    const { error: bucketError } = await adminClient.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: MAX_SIZE,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    });
    if (bucketError && !bucketError.message.includes("already exists")) {
      throw new Error(`Bucket 建立失敗：${bucketError.message}`);
    }

    const ext = file.name.split(".").pop() ?? "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await adminClient.storage
      .from(BUCKET)
      .upload(filename, buffer, { contentType: file.type, upsert: false });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = adminClient.storage.from(BUCKET).getPublicUrl(filename);

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error("[class/upload-image] error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
