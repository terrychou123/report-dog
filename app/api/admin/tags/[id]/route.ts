import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { templateTags } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const body = await request.json();
  const { name, description } = body;
  if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });

  const [updated] = await db
    .update(templateTags)
    .set({ name, description: description ?? null, updatedAt: new Date() })
    .where(eq(templateTags.id, id))
    .returning();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  await db.delete(templateTags).where(eq(templateTags.id, id));
  return new NextResponse(null, { status: 204 });
}
