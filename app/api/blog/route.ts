import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { isBlogAdmin } from "@/lib/blog-admin";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const includeAll = searchParams.get("all") === "true";

  if (includeAll) {
    const isAdmin = await isBlogAdmin();
    if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    return NextResponse.json(posts);
  }

  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));

  return NextResponse.json(posts);
}

const SLUG_RE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/;

export async function POST(req: NextRequest) {
  const isAdmin = await isBlogAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const slug = body.slug || `draft-${Date.now()}`;

  if (!SLUG_RE.test(slug)) {
    return NextResponse.json(
      { error: "slug 只能包含小寫英數字與連字號，且不可以連字號開頭或結尾" },
      { status: 400 }
    );
  }

  const [post] = await db
    .insert(blogPosts)
    .values({
      slug,
      title: body.title || "新文章",
      excerpt: body.excerpt || null,
      content: body.content || null,
      coverImageUrl: body.coverImageUrl || null,
      category: body.category || null,
      tags: body.tags || null,
      status: "draft",
      seoTitle: body.seoTitle || null,
      seoDescription: body.seoDescription || null,
    })
    .returning();

  return NextResponse.json(post, { status: 201 });
}
