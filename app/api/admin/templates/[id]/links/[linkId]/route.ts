import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { templateLinks } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; linkId: string }> }
) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id, linkId } = await params;
  const [deleted] = await db
    .delete(templateLinks)
    .where(and(eq(templateLinks.id, linkId), eq(templateLinks.templateId, id)))
    .returning();

  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
