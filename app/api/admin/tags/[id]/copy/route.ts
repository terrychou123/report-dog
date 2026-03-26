import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { templateTags, reportTemplates, templateTagReports } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;

  const [sourceTag] = await db.select().from(templateTags).where(eq(templateTags.id, id));
  if (!sourceTag) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Find max sortOrder in this facility type
  const existing = await db
    .select({ sortOrder: templateTags.sortOrder })
    .from(templateTags)
    .where(eq(templateTags.facilityType, sourceTag.facilityType))
    .orderBy(asc(templateTags.sortOrder));
  const maxOrder = existing.length > 0 ? existing[existing.length - 1].sortOrder : -1;

  // Copy the tag
  const [newTag] = await db
    .insert(templateTags)
    .values({
      facilityType: sourceTag.facilityType,
      name: `${sourceTag.name} (複製)`,
      description: sourceTag.description,
      sortOrder: maxOrder + 1,
    })
    .returning();

  // Copy associated report templates and links
  const links = await db
    .select({ reportTemplateId: templateTagReports.reportTemplateId, sortOrder: templateTagReports.sortOrder })
    .from(templateTagReports)
    .where(eq(templateTagReports.templateTagId, id));

  if (links.length > 0) {
    const sourceReports = await db
      .select()
      .from(reportTemplates)
      .where(eq(reportTemplates.facilityType, sourceTag.facilityType));
    const sourceReportMap = new Map(sourceReports.map((r) => [r.id, r]));

    // Get max sortOrder for reports in this facility
    const existingReports = await db
      .select({ sortOrder: reportTemplates.sortOrder })
      .from(reportTemplates)
      .where(eq(reportTemplates.facilityType, sourceTag.facilityType))
      .orderBy(asc(reportTemplates.sortOrder));
    let nextReportOrder = existingReports.length > 0
      ? existingReports[existingReports.length - 1].sortOrder + 1
      : 0;

    for (const link of links) {
      const src = sourceReportMap.get(link.reportTemplateId);
      if (!src) continue;

      const [newReport] = await db
        .insert(reportTemplates)
        .values({
          facilityType: src.facilityType,
          title: src.title,
          content: src.content,
          fileType: src.fileType,
          responsible: src.responsible,
          sortOrder: nextReportOrder++,
        })
        .returning();

      await db.insert(templateTagReports).values({
        templateTagId: newTag.id,
        reportTemplateId: newReport.id,
        sortOrder: link.sortOrder,
      }).onConflictDoNothing();
    }
  }

  return NextResponse.json(newTag, { status: 201 });
}
