import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reportLinks } from "@/db/schema";
import { eq, asc, max } from "drizzle-orm";
import { canAccessReport, canEditReport } from "@/lib/auth/report-permissions";
import { isValidUrl } from "@/lib/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;
  const { id } = await params;

  // 確認使用者可讀取此報告
  const accessible = await canAccessReport(id, userId);
  if (!accessible) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const links = await db
    .select({
      id: reportLinks.id,
      name: reportLinks.name,
      url: reportLinks.url,
      sortOrder: reportLinks.sortOrder,
      createdAt: reportLinks.createdAt,
    })
    .from(reportLinks)
    .where(eq(reportLinks.reportId, id))
    .orderBy(asc(reportLinks.sortOrder), asc(reportLinks.createdAt));

  return NextResponse.json(links);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;
  const { id } = await params;

  // 確認使用者可編輯此報告
  const editable = await canEditReport(id, userId);
  if (!editable) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { name, url } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }
  if (!url?.trim()) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }
  if (!isValidUrl(url)) {
    return NextResponse.json({ error: "url must start with http:// or https://" }, { status: 400 });
  }

  // 計算下一個 sortOrder
  const [maxRow] = await db
    .select({ max: max(reportLinks.sortOrder) })
    .from(reportLinks)
    .where(eq(reportLinks.reportId, id));
  const nextOrder = Number(maxRow?.max ?? -1) + 1;

  const [inserted] = await db
    .insert(reportLinks)
    .values({
      reportId: id,
      name: name.trim(),
      url: url.trim(),
      sortOrder: nextOrder,
    })
    .returning();

  return NextResponse.json(inserted, { status: 201 });
}
