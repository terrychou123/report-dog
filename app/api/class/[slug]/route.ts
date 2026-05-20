import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { classes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { requireAdminApi } from "@/lib/admin";

const SLUG_RE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/;

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const [row] = await db.select().from(classes).where(eq(classes.slug, slug));
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (row.status !== "published") {
    const result = await requireAdminApi();
    if (result instanceof NextResponse) return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(row);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const result = await requireAdminApi();
  if (result instanceof NextResponse) return result;

  const { slug } = await params;
  const body = await req.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: Record<string, any> = {
    title: body.title,
    excerpt: body.excerpt ?? null,
    content: body.content ?? null,
    coverImageUrl: body.coverImageUrl ?? null,
    category: body.category ?? null,
    tags: body.tags ?? null,
    status: body.status,
    seoTitle: body.seoTitle ?? null,
    seoDescription: body.seoDescription ?? null,
    updatedAt: new Date(),
  };

  if (body.slug && body.slug !== slug) {
    if (!SLUG_RE.test(body.slug)) {
      return NextResponse.json(
        { error: "slug 只能包含小寫英數字與連字號，且不可以連字號開頭或結尾" },
        { status: 400 }
      );
    }
    updateData.slug = body.slug;
  }

  if (body.status === "published") {
    const [existing] = await db.select().from(classes).where(eq(classes.slug, slug));
    if (!existing?.publishedAt) {
      updateData.publishedAt = new Date();
    }
  }

  const [updated] = await db
    .update(classes)
    .set(updateData)
    .where(eq(classes.slug, slug))
    .returning();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidateTag(`class-post-${slug}`, { expire: 0 });

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const result = await requireAdminApi();
  if (result instanceof NextResponse) return result;

  const { slug } = await params;
  await db.delete(classes).where(eq(classes.slug, slug));

  revalidateTag(`class-post-${slug}`, { expire: 0 });

  return NextResponse.json({ success: true });
}
