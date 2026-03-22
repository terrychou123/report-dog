import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reports, clients, clientReports, reportRevisions } from "@/db/schema";
import { eq, and, or, sql, desc } from "drizzle-orm";

async function canAccessReport(reportId: string, userId: string): Promise<boolean> {
  const [report] = await db
    .select({ userId: reports.userId })
    .from(reports)
    .where(eq(reports.id, reportId));
  if (!report) return false;
  if (report.userId === userId) return true;

  const [sharedTag] = await db
    .select({ id: clients.id })
    .from(clientReports)
    .innerJoin(clients, eq(clientReports.clientId, clients.id))
    .where(
      and(
        eq(clientReports.reportId, reportId),
        or(
          sql`${userId} = ANY(${clients.viewers})`,
          sql`${userId} = ANY(${clients.editors})`
        )
      )
    );
  return !!sharedTag;
}

// GET /api/reports/[id]/revisions — list revision history (no content)
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;
  const { id } = await params;

  const hasAccess = await canAccessReport(id, userId);
  if (!hasAccess) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const revisions = await db
    .select({
      id: reportRevisions.id,
      versionNumber: reportRevisions.versionNumber,
      title: reportRevisions.title,
      userId: reportRevisions.userId,
      createdAt: reportRevisions.createdAt,
    })
    .from(reportRevisions)
    .where(eq(reportRevisions.reportId, id))
    .orderBy(desc(reportRevisions.versionNumber));

  return NextResponse.json(revisions);
}

// POST /api/reports/[id]/revisions — restore a revision (owner only)
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;
  const { id } = await params;

  const [report] = await db
    .select({ userId: reports.userId })
    .from(reports)
    .where(eq(reports.id, id));
  if (!report || report.userId !== userId) {
    return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });
  }

  const { versionId } = await req.json();
  const [revision] = await db
    .select()
    .from(reportRevisions)
    .where(and(eq(reportRevisions.id, versionId), eq(reportRevisions.reportId, id)));

  if (!revision) return NextResponse.json({ error: "Revision not found" }, { status: 404 });

  return NextResponse.json({ title: revision.title, content: revision.content });
}
