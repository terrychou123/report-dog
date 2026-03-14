import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { clientReports, reports, clients } from "@/db/schema";
import { eq, and, max } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const clientId = req.nextUrl.searchParams.get("clientId");
  const reportId = req.nextUrl.searchParams.get("reportId");

  if (clientId) {
    // Verify client belongs to user
    const [client] = await db
      .select()
      .from(clients)
      .where(and(eq(clients.id, clientId), eq(clients.userId, data.claims.sub)));
    if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const rows = await db
      .select({
        relationId: clientReports.id,
        reportId: reports.id,
        title: reports.title,
        fileType: reports.fileType,
        createdAt: reports.createdAt,
        sortOrder: clientReports.sortOrder,
      })
      .from(clientReports)
      .innerJoin(reports, eq(clientReports.reportId, reports.id))
      .where(eq(clientReports.clientId, clientId))
      .orderBy(clientReports.sortOrder);

    return NextResponse.json(rows);
  }

  if (reportId) {
    // Verify report belongs to user
    const [report] = await db
      .select()
      .from(reports)
      .where(and(eq(reports.id, reportId), eq(reports.userId, data.claims.sub)));
    if (!report) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const rows = await db
      .select({
        relationId: clientReports.id,
        clientId: clients.id,
        nickname: clients.nickname,
        description: clients.description,
      })
      .from(clientReports)
      .innerJoin(clients, eq(clientReports.clientId, clients.id))
      .where(and(eq(clientReports.reportId, reportId), eq(clients.userId, data.claims.sub)));

    return NextResponse.json(rows);
  }

  return NextResponse.json({ error: "clientId or reportId is required" }, { status: 400 });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { clientId, reportId } = body;

  if (!clientId || !reportId) {
    return NextResponse.json({ error: "clientId and reportId are required" }, { status: 400 });
  }

  // Verify client belongs to user
  const [client] = await db
    .select()
    .from(clients)
    .where(and(eq(clients.id, clientId), eq(clients.userId, data.claims.sub)));
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  // Verify report belongs to user
  const [report] = await db
    .select()
    .from(reports)
    .where(and(eq(reports.id, reportId), eq(reports.userId, data.claims.sub)));
  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  // Check if already associated
  const [existing] = await db
    .select()
    .from(clientReports)
    .where(and(eq(clientReports.clientId, clientId), eq(clientReports.reportId, reportId)));

  if (existing) return NextResponse.json(existing, { status: 200 });

  // Calculate next sortOrder for this client
  const [maxRow] = await db
    .select({ max: max(clientReports.sortOrder) })
    .from(clientReports)
    .where(eq(clientReports.clientId, clientId));
  const nextOrder = Number(maxRow?.max ?? -1) + 1;

  const [inserted] = await db
    .insert(clientReports)
    .values({ clientId, reportId, sortOrder: nextOrder })
    .returning();

  return NextResponse.json(inserted, { status: 201 });
}
