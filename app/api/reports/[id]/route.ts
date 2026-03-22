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

async function canEditReport(reportId: string, userId: string): Promise<boolean> {
  const [report] = await db
    .select({ userId: reports.userId })
    .from(reports)
    .where(eq(reports.id, reportId));
  if (!report) return false;
  if (report.userId === userId) return true;

  const [editableTag] = await db
    .select({ id: clients.id })
    .from(clientReports)
    .innerJoin(clients, eq(clientReports.clientId, clients.id))
    .where(
      and(
        eq(clientReports.reportId, reportId),
        sql`${userId} = ANY(${clients.editors})`
      )
    );
  return !!editableTag;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;
  const { id } = await params;

  const [report] = await db
    .select({
      id: reports.id,
      userId: reports.userId,
      lastEditedByUserId: reports.lastEditedByUserId,
      title: reports.title,
      content: reports.content,
      fileType: reports.fileType,
      fileUrl: reports.fileUrl,
      sortOrder: reports.sortOrder,
      createdAt: reports.createdAt,
      updatedAt: reports.updatedAt,
    })
    .from(reports)
    .where(eq(reports.id, id));

  if (!report) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (report.userId !== userId) {
    const hasAccess = await canAccessReport(id, userId);
    if (!hasAccess) return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isOwner = report.userId === userId;
  const canEdit = isOwner || await canEditReport(id, userId);
  return NextResponse.json({ ...report, canEdit, isOwner });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;
  const { id } = await params;

  const canEdit = await canEditReport(id, userId);
  if (!canEdit) return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });

  const body = await req.json();
  const { title, content } = body;

  // 儲存前先建立版本快照（內容有變更時才建立）
  const [current] = await db
    .select({ title: reports.title, content: reports.content, fileType: reports.fileType })
    .from(reports)
    .where(eq(reports.id, id));
  const newTitle = title?.trim() ?? current?.title;
  const newContent = content !== undefined ? content : current?.content;
  const hasChanges = current && (newTitle !== current.title || newContent !== current.content);
  if (hasChanges) {
    const [lastRevision] = await db
      .select({ versionNumber: reportRevisions.versionNumber })
      .from(reportRevisions)
      .where(eq(reportRevisions.reportId, id))
      .orderBy(desc(reportRevisions.versionNumber))
      .limit(1);
    const nextVersion = (lastRevision?.versionNumber ?? 0) + 1;
    await db.insert(reportRevisions).values({
      reportId: id,
      userId,
      title: current.title,
      content: current.content,
      fileType: current.fileType,
      versionNumber: nextVersion,
    });
  }

  const [updated] = await db
    .update(reports)
    .set({
      ...(title && { title: title.trim() }),
      ...(content !== undefined && { content }),
      lastEditedByUserId: userId,
      updatedAt: new Date(),
    })
    .where(eq(reports.id, id))
    .returning();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;
  const { id } = await params;

  // Only owner can delete
  const [report] = await db
    .select({ id: reports.id, userId: reports.userId })
    .from(reports)
    .where(and(eq(reports.id, id), eq(reports.userId, userId)));

  if (!report) return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });

  await db.delete(reports).where(eq(reports.id, id));
  return NextResponse.json({ success: true });
}
