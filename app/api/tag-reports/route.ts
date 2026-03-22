import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { clientReports, reports, clients } from "@/db/schema";
import { eq, and, max, or, sql } from "drizzle-orm";
import { canViewTag, canEditTag } from "@/lib/auth/tag-permissions";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;

  const clientId = req.nextUrl.searchParams.get("clientId");
  const reportId = req.nextUrl.searchParams.get("reportId");

  if (clientId) {
    const [client] = await db
      .select({ id: clients.id, userId: clients.userId, viewers: clients.viewers, editors: clients.editors })
      .from(clients)
      .where(eq(clients.id, clientId));

    if (!client || !canViewTag(userId, client)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const rows = await db
      .select({
        relationId: clientReports.id,
        reportId: reports.id,
        title: reports.title,
        fileType: reports.fileType,
        createdAt: reports.createdAt,
        updatedAt: reports.updatedAt,
        sortOrder: clientReports.sortOrder,
      })
      .from(clientReports)
      .innerJoin(reports, eq(clientReports.reportId, reports.id))
      .where(eq(clientReports.clientId, clientId))
      .orderBy(clientReports.sortOrder);

    return NextResponse.json(rows);
  }

  if (reportId) {
    // Verify report is accessible
    const [report] = await db
      .select({ id: reports.id, userId: reports.userId })
      .from(reports)
      .where(eq(reports.id, reportId));

    if (!report) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const isOwner = report.userId === userId;
    if (!isOwner) {
      // Check if user has access via any shared tag
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
      if (!sharedTag) return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const rows = await db
      .select({
        relationId: clientReports.id,
        clientId: clients.id,
        nickname: clients.nickname,
        description: clients.description,
      })
      .from(clientReports)
      .innerJoin(clients, eq(clientReports.clientId, clients.id))
      .where(
        and(
          eq(clientReports.reportId, reportId),
          or(
            eq(clients.userId, userId),
            sql`${userId} = ANY(${clients.viewers})`,
            sql`${userId} = ANY(${clients.editors})`
          )
        )
      );

    return NextResponse.json(rows);
  }

  return NextResponse.json({ error: "clientId or reportId is required" }, { status: 400 });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;

  const body = await req.json();
  const { clientId, reportId } = body;

  if (!clientId || !reportId) {
    return NextResponse.json({ error: "clientId and reportId are required" }, { status: 400 });
  }

  // Verify client is accessible and user can edit it
  const [client] = await db
    .select({ id: clients.id, userId: clients.userId, viewers: clients.viewers, editors: clients.editors })
    .from(clients)
    .where(eq(clients.id, clientId));

  if (!client || !canEditTag(userId, client)) {
    return NextResponse.json({ error: "Client not found or forbidden" }, { status: 404 });
  }

  // Verify report is accessible to user
  const [report] = await db
    .select({ id: reports.id, userId: reports.userId })
    .from(reports)
    .where(eq(reports.id, reportId));

  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  const isReportOwner = report.userId === userId;
  if (!isReportOwner) {
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
    if (!sharedTag) return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  // Check if already associated
  const [existing] = await db
    .select()
    .from(clientReports)
    .where(and(eq(clientReports.clientId, clientId), eq(clientReports.reportId, reportId)));

  if (existing) return NextResponse.json(existing, { status: 200 });

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
