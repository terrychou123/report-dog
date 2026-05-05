import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { getClientIpHash } from "@/lib/ai/public-usage-limit";
import { isValidDownloadFile } from "@/lib/downloads/catalog";
import { signDownloadToken } from "@/lib/downloads/token";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "無效的請求格式" }, { status: 400 });
  }

  const { email, source, file } = body as {
    email?: string;
    source?: string;
    file?: string;
  };

  if (!email || typeof email !== "string" || email.length > 320 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "請輸入有效的 Email 地址" }, { status: 400 });
  }

  if (!source || (source !== "download" && source !== "newsletter")) {
    return NextResponse.json({ error: "無效的來源" }, { status: 400 });
  }

  if (source === "download") {
    if (!file || !isValidDownloadFile(file)) {
      return NextResponse.json({ error: "不存在的檔案" }, { status: 404 });
    }
  }

  let ipHash: string | null = null;
  try {
    ipHash = getClientIpHash(req);
  } catch {
    // PUBLIC_DEMO_SALT 未設定時 fallback null，不阻斷流程
  }

  const sourceMetadata = source === "download" && file
    ? { file }
    : undefined;

  await db
    .insert(leads)
    .values({
      email: email.toLowerCase().trim(),
      source,
      sourceMetadata,
      ipHash,
      userAgent: req.headers.get("user-agent") ?? undefined,
    })
    .onConflictDoUpdate({
      target: [leads.email, leads.source],
      set: {
        sourceMetadata,
        ipHash,
        userAgent: req.headers.get("user-agent") ?? undefined,
      },
    });

  if (source === "download" && file) {
    const token = signDownloadToken(file);
    const downloadUrl = `/api/downloads/${encodeURIComponent(file)}?token=${encodeURIComponent(token)}`;
    return NextResponse.json({ ok: true, downloadUrl });
  }

  return NextResponse.json({ ok: true });
}
