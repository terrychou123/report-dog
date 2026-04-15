import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { reportTemplates, templateRevisions } from "@/db/schema";
import { eq, desc, inArray } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const [template] = await db.select().from(reportTemplates).where(eq(reportTemplates.id, id));
  if (!template) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(template);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const body = await request.json();
  const { title, content, responsible } = body;
  if (!title) return NextResponse.json({ error: "title required" }, { status: 400 });

  // 在 transaction 中：先更新範本 → 再以新內容建立快照 → 修剪超過上限的舊版本
  // 這樣「版本 #N」對應的內容 = 使用者這次實際儲存的成果
  // unique constraint 會自動防止並發重複版本號
  const MAX_REVISIONS = 5;

  const [updated] = await db.transaction(async (tx) => {
    // 讀取目前版本以判斷是否有變更
    const [current] = await tx
      .select({ title: reportTemplates.title, content: reportTemplates.content, fileType: reportTemplates.fileType })
      .from(reportTemplates)
      .where(eq(reportTemplates.id, id));

    const newTitle = title?.trim() ?? current?.title;
    const newContent = content !== undefined ? content : current?.content;
    const hasChanges = current && (newTitle !== current.title || newContent !== current.content);

    // 先執行 UPDATE，取得更新後的 row
    const [updatedRow] = await tx
      .update(reportTemplates)
      .set({ title: newTitle, content: newContent ?? null, responsible: responsible ?? null, updatedAt: new Date() })
      .where(eq(reportTemplates.id, id))
      .returning();

    if (hasChanges && updatedRow) {
      // 一次查詢取得所有既有版本（降冪），同時推導下一個版本號與需刪除的舊版本
      const existingRevisions = await tx
        .select({ id: templateRevisions.id, versionNumber: templateRevisions.versionNumber })
        .from(templateRevisions)
        .where(eq(templateRevisions.templateId, id))
        .orderBy(desc(templateRevisions.versionNumber));

      const nextVersion = (existingRevisions[0]?.versionNumber ?? 0) + 1;
      // 以更新後（新）的內容建立快照；unique constraint 確保並發時只有一個成功
      await tx.insert(templateRevisions).values({
        templateId: id,
        userId: auth.userId,
        title: updatedRow.title,
        content: updatedRow.content,
        fileType: updatedRow.fileType ?? "excel",
        versionNumber: nextVersion,
      });

      // 插入後共 existingRevisions.length + 1 筆，超出上限的刪除
      if (existingRevisions.length + 1 > MAX_REVISIONS) {
        const idsToDelete = existingRevisions.slice(MAX_REVISIONS - 1).map((r) => r.id);
        await tx.delete(templateRevisions).where(inArray(templateRevisions.id, idsToDelete));
      }
    }

    return [updatedRow];
  });

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  await db.delete(reportTemplates).where(eq(reportTemplates.id, id));
  return new NextResponse(null, { status: 204 });
}
