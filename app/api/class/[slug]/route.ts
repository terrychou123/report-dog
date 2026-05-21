import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { classes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { requireAdminApi } from "@/lib/admin";
import { SLUG_RE, SLUG_ERROR } from "@/lib/class/slug";
import { isUniqueViolation } from "@/lib/db-errors";

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
      return NextResponse.json({ error: SLUG_ERROR }, { status: 400 });
    }
    updateData.slug = body.slug;
  }

  if (body.status === "published") {
    const [existing] = await db.select().from(classes).where(eq(classes.slug, slug));
    if (!existing?.publishedAt) {
      updateData.publishedAt = new Date();
    }
  }

  try {
    const [updated] = await db
      .update(classes)
      .set(updateData)
      .where(eq(classes.slug, slug))
      .returning();

    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

    revalidateTag(`class-post-${slug}`, { expire: 0 });

    return NextResponse.json(updated);
  } catch (err) {
    if (isUniqueViolation(err)) {
      const newSlug = body.slug ?? slug;
      return NextResponse.json(
        { error: `網址 "${newSlug}" 已被其他課程使用，請換一個`, code: "SLUG_TAKEN" },
        { status: 409 }
      );
    }
    throw err;
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const result = await requireAdminApi();
  if (result instanceof NextResponse) return result;

  const { slug } = await params;
  await db.delete(classes).where(eq(classes.slug, slug));

  revalidateTag(`class-post-${slug}`, { expire: 0 });

  return NextResponse.json({ success: true });
}
