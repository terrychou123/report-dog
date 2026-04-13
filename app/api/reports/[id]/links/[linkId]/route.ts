import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reportLinks } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { canEditReport } from "@/lib/auth/report-permissions";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; linkId: string }> }
) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;
  const { id, linkId } = await params;

  // 確認使用者可編輯此報告
  const editable = await canEditReport(id, userId);
  if (!editable) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const [deleted] = await db
    .delete(reportLinks)
    .where(and(eq(reportLinks.id, linkId), eq(reportLinks.reportId, id)))
    .returning();

  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
