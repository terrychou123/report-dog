import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { templateLinks } from "@/db/schema";
import { eq, asc, max } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin";
import { isValidUrl } from "@/lib/utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const links = await db
    .select({
      id: templateLinks.id,
      name: templateLinks.name,
      url: templateLinks.url,
      sortOrder: templateLinks.sortOrder,
      createdAt: templateLinks.createdAt,
    })
    .from(templateLinks)
    .where(eq(templateLinks.templateId, id))
    .orderBy(asc(templateLinks.sortOrder), asc(templateLinks.createdAt));

  return NextResponse.json(links);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const body = await request.json();
  const { name, url } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }
  if (!url?.trim()) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }
  if (!isValidUrl(url)) {
    return NextResponse.json({ error: "url must start with http:// or https://" }, { status: 400 });
  }

  const [maxRow] = await db
    .select({ max: max(templateLinks.sortOrder) })
    .from(templateLinks)
    .where(eq(templateLinks.templateId, id));
  const nextOrder = Number(maxRow?.max ?? -1) + 1;

  const [inserted] = await db
    .insert(templateLinks)
    .values({
      templateId: id,
      name: name.trim(),
      url: url.trim(),
      sortOrder: nextOrder,
    })
    .returning();

  return NextResponse.json(inserted, { status: 201 });
}
