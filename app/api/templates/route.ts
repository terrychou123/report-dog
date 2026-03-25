import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { templateTags, reportTemplates, templateImports } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { getAllProfiles } from "@/lib/ai/evaluation-profiles";
import { unstable_cache } from "next/cache";

// System-wide counts are seeded once and rarely change — cache for 5 minutes
const getTemplateCounts = unstable_cache(
  async () => {
    const [tagCounts, reportCounts] = await Promise.all([
      db.select({ facilityType: templateTags.facilityType, total: count() }).from(templateTags).groupBy(templateTags.facilityType),
      db.select({ facilityType: reportTemplates.facilityType, total: count() }).from(reportTemplates).groupBy(reportTemplates.facilityType),
    ]);
    return { tagCounts, reportCounts };
  },
  ["template-counts"],
  { revalidate: 300 }
);

export async function GET() {
  const profiles = getAllProfiles();
  const { tagCounts, reportCounts } = await getTemplateCounts();

  // Check which types the current user has already imported
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  let importedTypes: string[] = [];
  if (userId) {
    const imports = await db
      .select({ facilityType: templateImports.facilityType })
      .from(templateImports)
      .where(eq(templateImports.userId, userId));
    importedTypes = imports.map((i) => i.facilityType);
  }

  const tagCountMap = Object.fromEntries(tagCounts.map((t) => [t.facilityType, Number(t.total)]));
  const reportCountMap = Object.fromEntries(reportCounts.map((r) => [r.facilityType, Number(r.total)]));

  return NextResponse.json(
    profiles.map((p) => ({
      facilityType: p.id,
      label: p.label,
      description: p.description,
      tagCount: tagCountMap[p.id] ?? 0,
      reportCount: reportCountMap[p.id] ?? 0,
      alreadyImported: importedTypes.includes(p.id),
    }))
  );
}
