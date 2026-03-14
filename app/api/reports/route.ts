import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reports, clients, clientReports } from "@/db/schema";
import { eq, inArray, max, min, desc } from "drizzle-orm";

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;
  const reportList = await db
    .select()
    .from(reports)
    .where(eq(reports.userId, userId))
    .orderBy(desc(reports.createdAt));

  if (reportList.length === 0) return NextResponse.json([]);

  const reportIds = reportList.map((r) => r.id);
  const tagAssociations = await db
    .select({ reportId: clientReports.reportId, nickname: clients.nickname })
    .from(clientReports)
    .innerJoin(clients, eq(clientReports.clientId, clients.id))
    .where(inArray(clientReports.reportId, reportIds));

  const tagMap = new Map<string, string[]>();
  for (const a of tagAssociations) {
    if (!tagMap.has(a.reportId)) tagMap.set(a.reportId, []);
    tagMap.get(a.reportId)!.push(a.nickname);
  }

  const result = reportList.map((r) => ({ ...r, tags: tagMap.get(r.id) ?? [] }));
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, content, fileType, fileUrl, insertAtTop } = body;

  if (!title?.trim()) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  let nextOrder: number;
  if (insertAtTop) {
    const [minRow] = await db
      .select({ min: min(reports.sortOrder) })
      .from(reports)
      .where(eq(reports.userId, data.claims.sub));
    nextOrder = Number(minRow?.min ?? 0) - 1;
  } else {
    const [maxRow] = await db
      .select({ max: max(reports.sortOrder) })
      .from(reports)
      .where(eq(reports.userId, data.claims.sub));
    nextOrder = Number(maxRow?.max ?? -1) + 1;
  }

  const [inserted] = await db
    .insert(reports)
    .values({
      userId: data.claims.sub,
      title: title.trim(),
      content: content || null,
      fileType: fileType || null,
      fileUrl: fileUrl || null,
      sortOrder: nextOrder,
    })
    .returning();

  return NextResponse.json(inserted, { status: 201 });
}
