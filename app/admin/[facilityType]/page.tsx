import { db } from "@/db";
import { templateTags, reportTemplates, templateTagReports } from "@/db/schema";
import { eq, asc, inArray } from "drizzle-orm";
import { AdminTemplateManager } from "@/components/admin-template-manager";
import { notFound } from "next/navigation";
import { getAllProfiles, getProfile } from "@/lib/ai/evaluation-profiles";

const VALID_FACILITY_TYPES = new Set(getAllProfiles().map((p) => p.id));

export default async function AdminFacilityPage({
  params,
}: {
  params: Promise<{ facilityType: string }>;
}) {
  const { facilityType } = await params;

  if (!VALID_FACILITY_TYPES.has(facilityType)) notFound();

  const [tags, templates] = await Promise.all([
    db.select().from(templateTags).where(eq(templateTags.facilityType, facilityType)).orderBy(asc(templateTags.sortOrder)),
    db.select().from(reportTemplates).where(eq(reportTemplates.facilityType, facilityType)).orderBy(asc(reportTemplates.sortOrder)),
  ]);
  const tagIds = tags.map((t) => t.id);
  const links = tagIds.length > 0
    ? await db.select().from(templateTagReports).where(inArray(templateTagReports.templateTagId, tagIds))
    : [];

  const displayLabel = getProfile(facilityType)?.label ?? facilityType;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{displayLabel}</h1>
        <p className="text-muted-foreground mt-1">管理評鑑標籤與報告範本</p>
      </div>
      <AdminTemplateManager
        facilityType={facilityType}
        initialTags={tags}
        initialTemplates={templates}
        initialLinks={links}
      />
    </div>
  );
}
