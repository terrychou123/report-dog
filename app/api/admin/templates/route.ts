import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { reportTemplates } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(request.url);
  const facilityType = searchParams.get("facilityType");
  if (!facilityType) return NextResponse.json({ error: "facilityType required" }, { status: 400 });

  const templates = await db
    .select()
    .from(reportTemplates)
    .where(eq(reportTemplates.facilityType, facilityType))
    .orderBy(asc(reportTemplates.sortOrder));

  return NextResponse.json(templates);
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const { facilityType, title, content, responsible, fileType } = body;
  if (!facilityType || !title) {
    return NextResponse.json({ error: "facilityType and title required" }, { status: 400 });
  }

  const existing = await db
    .select({ sortOrder: reportTemplates.sortOrder })
    .from(reportTemplates)
    .where(eq(reportTemplates.facilityType, facilityType))
    .orderBy(asc(reportTemplates.sortOrder));
  const maxOrder = existing.length > 0 ? existing[existing.length - 1].sortOrder : -1;

  const [newTemplate] = await db
    .insert(reportTemplates)
    .values({
      facilityType,
      title,
      content: content ?? null,
      fileType: fileType === "docx" ? "docx" : "excel",
      responsible: responsible ?? null,
      sortOrder: maxOrder + 1,
    })
    .returning();

  return NextResponse.json(newTemplate, { status: 201 });
}
