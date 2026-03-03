import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { kindReports, reports, kinds } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const kindId = req.nextUrl.searchParams.get("kindId");
  if (!kindId) return NextResponse.json({ error: "kindId is required" }, { status: 400 });

  // Verify kind belongs to user
  const [kind] = await db
    .select()
    .from(kinds)
    .where(and(eq(kinds.id, kindId), eq(kinds.userId, data.claims.sub)));
  if (!kind) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const rows = await db
    .select({
      relationId: kindReports.id,
      reportId: reports.id,
      title: reports.title,
      fileType: reports.fileType,
      createdAt: reports.createdAt,
    })
    .from(kindReports)
    .innerJoin(reports, eq(kindReports.reportId, reports.id))
    .where(eq(kindReports.kindId, kindId));

  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { kindId, reportId } = body;

  if (!kindId || !reportId) {
    return NextResponse.json({ error: "kindId and reportId are required" }, { status: 400 });
  }

  // Verify kind belongs to user
  const [kind] = await db
    .select()
    .from(kinds)
    .where(and(eq(kinds.id, kindId), eq(kinds.userId, data.claims.sub)));
  if (!kind) return NextResponse.json({ error: "Kind not found" }, { status: 404 });

  // Check if already associated
  const [existing] = await db
    .select()
    .from(kindReports)
    .where(and(eq(kindReports.kindId, kindId), eq(kindReports.reportId, reportId)));

  if (existing) return NextResponse.json(existing, { status: 200 });

  const [inserted] = await db
    .insert(kindReports)
    .values({ kindId, reportId })
    .returning();

  return NextResponse.json(inserted, { status: 201 });
}
