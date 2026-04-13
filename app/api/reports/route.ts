import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reports, clients, clientReports, reportLinks } from "@/db/schema";
import { eq, inArray, max, min, desc, or, sql, asc } from "drizzle-orm";

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;

  const selectFields = {
    id: reports.id,
    title: reports.title,
    fileType: reports.fileType,
    fileUrl: reports.fileUrl,
    sortOrder: reports.sortOrder,
    userId: reports.userId,
    lastEditedByUserId: reports.lastEditedByUserId,
    createdAt: reports.createdAt,
    updatedAt: reports.updatedAt,
  };

  // Own reports
  const ownReports = await db
    .select(selectFields)
    .from(reports)
    .where(eq(reports.userId, userId))
    .orderBy(desc(reports.createdAt));

  // Reports shared via tags (user is viewer or editor)
  // Wrapped in try-catch: clients.viewers/editors columns may not exist if migration 0005 hasn't run yet
  let sharedReports: typeof ownReports = [];
  try {
    sharedReports = await db
      .selectDistinct(selectFields)
      .from(reports)
      .innerJoin(clientReports, eq(clientReports.reportId, reports.id))
      .innerJoin(clients, eq(clientReports.clientId, clients.id))
      .where(
        or(
          sql`${userId} = ANY(${clients.viewers})`,
          sql`${userId} = ANY(${clients.editors})`
        )
      )
      .orderBy(desc(reports.createdAt));
  } catch {
    // Migration 0005 not yet applied — skip shared reports
  }

  // Merge, dedup by id (own reports take priority)
  const seen = new Set<string>(ownReports.map((r) => r.id));
  const reportList = [...ownReports];
  for (const r of sharedReports) {
    if (!seen.has(r.id)) {
      seen.add(r.id);
      reportList.push(r);
    }
  }
  reportList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (reportList.length === 0) return NextResponse.json([]);

  const reportIds = reportList.map((r) => r.id);

  const [tagAssociations, linkRows] = await Promise.all([
    db.select({ reportId: clientReports.reportId, nickname: clients.nickname })
      .from(clientReports)
      .innerJoin(clients, eq(clientReports.clientId, clients.id))
      .where(inArray(clientReports.reportId, reportIds)),
    db.select({ reportId: reportLinks.reportId, name: reportLinks.name, url: reportLinks.url })
      .from(reportLinks)
      .where(inArray(reportLinks.reportId, reportIds))
      .orderBy(asc(reportLinks.sortOrder), asc(reportLinks.createdAt)),
  ]);

  const tagMap = new Map<string, string[]>();
  for (const a of tagAssociations) {
    if (!tagMap.has(a.reportId)) tagMap.set(a.reportId, []);
    tagMap.get(a.reportId)!.push(a.nickname);
  }

  const linkMap = new Map<string, { name: string; url: string }[]>();
  for (const l of linkRows) {
    if (!linkMap.has(l.reportId)) linkMap.set(l.reportId, []);
    linkMap.get(l.reportId)!.push({ name: l.name, url: l.url });
  }

  return NextResponse.json(reportList.map((r) => ({
    ...r,
    tags: tagMap.get(r.id) ?? [],
    links: linkMap.get(r.id) ?? [],
  })));
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;

  const body = await req.json();
  const { title, content, fileType, fileUrl, insertAtTop } = body;

  if (!title?.trim()) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const whereClause = eq(reports.userId, userId);

  let nextOrder: number;
  if (insertAtTop) {
    const [minRow] = await db.select({ min: min(reports.sortOrder) }).from(reports).where(whereClause);
    nextOrder = Number(minRow?.min ?? 0) - 1;
  } else {
    const [maxRow] = await db.select({ max: max(reports.sortOrder) }).from(reports).where(whereClause);
    nextOrder = Number(maxRow?.max ?? -1) + 1;
  }

  const [inserted] = await db
    .insert(reports)
    .values({
      userId,
      title: title.trim(),
      content: content || null,
      fileType: fileType || null,
      fileUrl: fileUrl || null,
      sortOrder: nextOrder,
    })
    .returning();

  return NextResponse.json(inserted, { status: 201 });
}
