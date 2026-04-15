import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { templateRevisions } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin";

// GET /api/admin/templates/[id]/revisions — 列出版本歷史（不含 content）
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;

  const revisions = await db
    .select({
      id: templateRevisions.id,
      versionNumber: templateRevisions.versionNumber,
      title: templateRevisions.title,
      userId: templateRevisions.userId,
      createdAt: templateRevisions.createdAt,
    })
    .from(templateRevisions)
    .where(eq(templateRevisions.templateId, id))
    .orderBy(desc(templateRevisions.versionNumber));

  return NextResponse.json(revisions);
}

// POST /api/admin/templates/[id]/revisions — 取得指定版本內容（供前端套用後再儲存）
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const { versionId } = await req.json();

  // 驗證 versionId 為標準 UUID 格式（8-4-4-4-12），避免非法值導致 Postgres 型別錯誤
  if (!versionId || typeof versionId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(versionId)) {
    return NextResponse.json({ error: "versionId required" }, { status: 400 });
  }

  const [revision] = await db
    .select()
    .from(templateRevisions)
    .where(
      and(
        eq(templateRevisions.id, versionId),
        eq(templateRevisions.templateId, id)
      )
    );

  if (!revision) return NextResponse.json({ error: "Revision not found" }, { status: 404 });

  return NextResponse.json({ title: revision.title, content: revision.content });
}
