import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import {
  clients,
  reports,
  clientReports,
  templateTags,
  reportTemplates,
  templateTagReports,
  templateImports,
} from "@/db/schema";
import { eq, and, min, inArray } from "drizzle-orm";
import { getAllProfiles } from "@/lib/ai/evaluation-profiles";

// Static allowlist — profiles are compile-time constants, safe at module scope
const VALID_FACILITY_TYPES = new Set(getAllProfiles().map((p) => p.id));

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;
  const body = await request.json();
  const { facilityType } = body;

  if (!facilityType || typeof facilityType !== "string") {
    return NextResponse.json({ error: "facilityType required" }, { status: 400 });
  }

  if (!VALID_FACILITY_TYPES.has(facilityType)) {
    return NextResponse.json({ error: "Invalid facilityType" }, { status: 400 });
  }

  // Fast-path duplicate check (optimistic — DB constraint is the true guard)
  const [existing] = await db
    .select({ id: templateImports.id })
    .from(templateImports)
    .where(and(eq(templateImports.userId, userId), eq(templateImports.facilityType, facilityType)));

  if (existing) {
    return NextResponse.json({ error: "Already imported" }, { status: 409 });
  }

  // Load tags and reports in parallel
  const [tags, tmplReports] = await Promise.all([
    db.select().from(templateTags).where(eq(templateTags.facilityType, facilityType)).orderBy(templateTags.sortOrder),
    db.select().from(reportTemplates).where(eq(reportTemplates.facilityType, facilityType)).orderBy(reportTemplates.sortOrder),
  ]);

  if (tags.length === 0) {
    return NextResponse.json({ error: "No templates found for this facility type" }, { status: 404 });
  }

  // Load template links outside the transaction (system data, never changes during user ops)
  const tagIds = tags.map((t) => t.id);
  const links = await db.select().from(templateTagReports).where(inArray(templateTagReports.templateTagId, tagIds));

  try {
    const result = await db.transaction(async (tx) => {
      // Read min sort orders inside the transaction to prevent sortOrder collisions
      // with concurrent tag/report creation by the same user
      const [[minTagRow], [minReportRow]] = await Promise.all([
        tx.select({ min: min(clients.sortOrder) }).from(clients).where(eq(clients.userId, userId)),
        tx.select({ min: min(reports.sortOrder) }).from(reports).where(eq(reports.userId, userId)),
      ]);

      const nextTagOrder = Number(minTagRow?.min ?? 0) - tags.length;
      const nextReportOrder = Number(minReportRow?.min ?? 0) - tmplReports.length;

      // Bulk-insert clients (tags) — returned rows match input order
      const newClients = await tx
        .insert(clients)
        .values(tags.map((tag, i) => ({
          userId,
          nickname: tag.name,
          description: tag.description ?? undefined,
          sortOrder: nextTagOrder + i,
        })))
        .returning({ id: clients.id });

      // Bulk-insert reports — returned rows match input order
      const newReports = tmplReports.length > 0
        ? await tx
            .insert(reports)
            .values(tmplReports.map((tmpl, i) => ({
              userId,
              title: tmpl.title,
              content: tmpl.content ?? undefined,
              fileType: tmpl.fileType ?? undefined,
              sortOrder: nextReportOrder + i,
            })))
            .returning({ id: reports.id })
        : [];

      // O(1) lookups via Map instead of O(N) Array.find per link
      const clientMap = new Map(tags.map((tag, i) => [tag.id, newClients[i].id]));
      const reportMap = new Map(tmplReports.map((tmpl, i) => [tmpl.id, newReports[i].id]));

      const clientReportValues = links.flatMap((link) => {
        const clientId = clientMap.get(link.templateTagId);
        const reportId = reportMap.get(link.reportTemplateId);
        if (!clientId || !reportId) return [];
        return [{ clientId, reportId, sortOrder: link.sortOrder }];
      });

      if (clientReportValues.length > 0) {
        await tx.insert(clientReports).values(clientReportValues).onConflictDoNothing();
      }

      // Record import (unique constraint is the true duplicate guard)
      await tx.insert(templateImports).values({ userId, facilityType });

      return { tagCount: newClients.length, reportCount: newReports.length };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    // Unique constraint violation — concurrent duplicate import
    if (isUniqueViolation(err)) {
      return NextResponse.json({ error: "Already imported" }, { status: 409 });
    }
    throw err;
  }
}

function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: string }).code === "23505"
  );
}
