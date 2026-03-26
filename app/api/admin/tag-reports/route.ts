import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { templateTagReports } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin";

/** GET /api/admin/tag-reports?tagId=<id>  — list template IDs linked to a tag */
export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(request.url);
  const tagId = searchParams.get("tagId");
  if (!tagId) return NextResponse.json({ error: "tagId required" }, { status: 400 });

  const rows = await db
    .select({ reportTemplateId: templateTagReports.reportTemplateId, sortOrder: templateTagReports.sortOrder })
    .from(templateTagReports)
    .where(eq(templateTagReports.templateTagId, tagId));

  return NextResponse.json(rows);
}

/** POST /api/admin/tag-reports — link a template to a tag */
export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const { tagId, reportTemplateId } = body;
  if (!tagId || !reportTemplateId) {
    return NextResponse.json({ error: "tagId and reportTemplateId required" }, { status: 400 });
  }

  const [link] = await db
    .insert(templateTagReports)
    .values({ templateTagId: tagId, reportTemplateId, sortOrder: 0 })
    .onConflictDoNothing()
    .returning();

  return NextResponse.json(link ?? { message: "already linked" }, { status: 201 });
}

/** DELETE /api/admin/tag-reports?tagId=<id>&reportTemplateId=<id> — unlink */
export async function DELETE(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(request.url);
  const tagId = searchParams.get("tagId");
  const reportTemplateId = searchParams.get("reportTemplateId");
  if (!tagId || !reportTemplateId) {
    return NextResponse.json({ error: "tagId and reportTemplateId required" }, { status: 400 });
  }

  await db
    .delete(templateTagReports)
    .where(
      and(
        eq(templateTagReports.templateTagId, tagId),
        eq(templateTagReports.reportTemplateId, reportTemplateId)
      )
    );

  return new NextResponse(null, { status: 204 });
}
