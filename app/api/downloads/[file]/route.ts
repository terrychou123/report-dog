import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { isValidDownloadFile } from "@/lib/downloads/catalog";
import { verifyDownloadToken } from "@/lib/downloads/token";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;

  if (!isValidDownloadFile(file)) {
    return NextResponse.json({ error: "檔案不存在" }, { status: 404 });
  }

  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "缺少下載憑證" }, { status: 403 });
  }

  const result = verifyDownloadToken(token, file);
  if (!result.ok) {
    const msg = result.reason === "expired" ? "下載連結已過期，請重新取得" : "無效的下載憑證";
    return NextResponse.json({ error: msg }, { status: 403 });
  }

  const filePath = join(process.cwd(), "private", "downloads", file);
  let fileBuffer: Buffer;
  try {
    fileBuffer = await readFile(filePath);
  } catch {
    return NextResponse.json({ error: "檔案不存在" }, { status: 404 });
  }

  return new NextResponse(Buffer.from(fileBuffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(file)}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
