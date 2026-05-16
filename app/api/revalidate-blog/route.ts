// CLI 腳本專用：觸發特定 blog post 快取失效
// 鑑權：Authorization: Bearer {CRON_SECRET}
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  revalidateTag(`blog-post-${slug}`, { expire: 0 });
  return NextResponse.json({ ok: true, slug });
}
