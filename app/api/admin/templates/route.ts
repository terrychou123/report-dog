import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { reportTemplates } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin";
import { getAllProfiles } from "@/lib/ai/evaluation-profiles";

const VALID_FACILITY_TYPES = new Set(getAllProfiles().map((p) => p.id));

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(request.url);
  const facilityType = searchParams.get("facilityType");
  if (!facilityType) return NextResponse.json({ error: "facilityType required" }, { status: 400 });

  const templatesRaw = await db
    .select()
    .from(reportTemplates)
    .where(eq(reportTemplates.facilityType, facilityType))
    .orderBy(asc(reportTemplates.title));

  // 以 title 自然數字排序（1, 2, 3, ... 10, 11...）；明確指定 'zh-TW' locale 確保跨環境一致
  const templates = [...templatesRaw].sort((a, b) =>
    a.title.localeCompare(b.title, 'zh-TW', { numeric: true })
  );

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
  if (!VALID_FACILITY_TYPES.has(facilityType)) {
    return NextResponse.json({ error: `Invalid facilityType: ${facilityType}` }, { status: 400 });
  }

  const [newTemplate] = await db
    .insert(reportTemplates)
    .values({
      facilityType,
      title,
      content: content ?? null,
      fileType: fileType === "docx" ? "docx" : "excel",
      responsible: responsible ?? null,
    })
    .returning();

  return NextResponse.json(newTemplate, { status: 201 });
}
