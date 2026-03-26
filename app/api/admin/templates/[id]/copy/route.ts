import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { reportTemplates } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const [src] = await db.select().from(reportTemplates).where(eq(reportTemplates.id, id));
  if (!src) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const existing = await db
    .select({ sortOrder: reportTemplates.sortOrder })
    .from(reportTemplates)
    .where(eq(reportTemplates.facilityType, src.facilityType))
    .orderBy(asc(reportTemplates.sortOrder));
  const maxOrder = existing.length > 0 ? existing[existing.length - 1].sortOrder : -1;

  const [newTemplate] = await db
    .insert(reportTemplates)
    .values({
      facilityType: src.facilityType,
      title: `${src.title} (複製)`,
      content: src.content,
      fileType: src.fileType,
      responsible: src.responsible,
      sortOrder: maxOrder + 1,
    })
    .returning();

  return NextResponse.json(newTemplate, { status: 201 });
}
