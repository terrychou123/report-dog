import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reports, clients, clientReports, reportRevisions } from "@/db/schema";
import { eq, and, or, sql, desc, inArray } from "drizzle-orm";

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
  const { title, content, changeSummary } = body;

  // 用 transaction 確保 UPDATE + 版本快照 + 修剪的原子性
  const MAX_REVISIONS = 5;
  const [updated] = await db.transaction(async (tx) => {
    const [current] = await tx
      .select({ title: reports.title, content: reports.content, fileType: reports.fileType })
      .from(reports)
      .where(eq(reports.id, id));

    const newTitle = title?.trim() ?? current?.title;
    const newContent = content !== undefined ? content : current?.content;
    const hasChanges = current && (newTitle !== current.title || newContent !== current.content);

    // 先執行 UPDATE，再以更新後的內容建立版本快照
    // 這樣「版本 #N」對應的內容 = 使用者這次實際儲存的成果
    const [updatedRow] = await tx
      .update(reports)
      .set({
        ...(title && { title: title.trim() }),
        ...(content !== undefined && { content }),
        lastEditedByUserId: userId,
        updatedAt: new Date(),
      })
      .where(eq(reports.id, id))
      .returning();

    if (hasChanges && updatedRow) {
      // 一次查詢取得所有既有版本（降冪），同時推導下一個版本號與需刪除的舊版本
      const existingRevisions = await tx
        .select({ id: reportRevisions.id, versionNumber: reportRevisions.versionNumber })
        .from(reportRevisions)
        .where(eq(reportRevisions.reportId, id))
        .orderBy(desc(reportRevisions.versionNumber));

      const nextVersion = (existingRevisions[0]?.versionNumber ?? 0) + 1;
      await tx.insert(reportRevisions).values({
        reportId: id,
        userId,
        title: updatedRow.title,
        content: updatedRow.content,
        fileType: updatedRow.fileType,
        versionNumber: nextVersion,
        changeSummary: typeof changeSummary === 'string'
          ? (changeSummary.trim().slice(0, 200) || null)
          : null,
      });

      // 插入後共 existingRevisions.length + 1 筆，超出上限的刪除
      if (existingRevisions.length + 1 > MAX_REVISIONS) {
        const idsToDelete = existingRevisions.slice(MAX_REVISIONS - 1).map((r) => r.id);
        await tx.delete(reportRevisions).where(inArray(reportRevisions.id, idsToDelete));
      }
    }

    return [updatedRow];
  });

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
