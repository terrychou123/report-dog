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
  if (!slug || !/^[a-z0-9][a-z0-9-]{0,199}$/.test(slug)) {
    return NextResponse.json({ error: "Missing or invalid slug" }, { status: 400 });
  }

  revalidateTag(`blog-post-${slug}`, { expire: 0 }); // expire:0 = 立即失效（Next.js CacheLifeConfig）
  revalidateTag("blog-list", { expire: 0 });          // blog 列表快取同步失效
  return NextResponse.json({ ok: true, slug });
}
