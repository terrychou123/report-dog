import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { classes } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const includeAll = searchParams.get("all") === "true";

  if (includeAll) {
    const result = await requireAdminApi();
    if (result instanceof NextResponse) return result;
    const rows = await db.select().from(classes).orderBy(desc(classes.createdAt));
    return NextResponse.json(rows);
  }

  const rows = await db
    .select()
    .from(classes)
    .where(eq(classes.status, "published"))
    .orderBy(desc(classes.publishedAt));

  return NextResponse.json(rows);
}

const SLUG_RE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/;

export async function POST(req: NextRequest) {
  const result = await requireAdminApi();
  if (result instanceof NextResponse) return result;

  const body = await req.json();
  const slug = body.slug || `draft-${Date.now()}`;

  if (!SLUG_RE.test(slug)) {
    return NextResponse.json(
      { error: "slug 只能包含小寫英數字與連字號，且不可以連字號開頭或結尾" },
      { status: 400 }
    );
  }

  const [row] = await db
    .insert(classes)
    .values({
      slug,
      title: body.title || "新課程",
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

  return NextResponse.json(row, { status: 201 });
}
