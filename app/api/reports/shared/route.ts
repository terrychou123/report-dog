import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { db } from "@/db";
import { reports, clients, clientReports } from "@/db/schema";
import { eq, inArray, desc, sql } from "drizzle-orm";

type SharedReport = {
  id: string;
  title: string;
  fileType: string | null;
  fileUrl: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  ownerEmail: string;
  tags: string[];
};

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
    userId: reports.userId,
    createdAt: reports.createdAt,
    updatedAt: reports.updatedAt,
  };

  type RawReport = {
    id: string;
    title: string;
    fileType: string | null;
    fileUrl: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  };

  let editableReports: RawReport[] = [];
  let viewableReports: RawReport[] = [];

  try {
    editableReports = (await db
      .selectDistinct(selectFields)
      .from(reports)
      .innerJoin(clientReports, eq(clientReports.reportId, reports.id))
      .innerJoin(clients, eq(clientReports.clientId, clients.id))
      .where(sql`${userId} = ANY(${clients.editors})`)
      .orderBy(desc(reports.createdAt))) as RawReport[];
  } catch {
    // Migration 0005 not yet applied — skip
  }

  try {
    const editableIds = new Set(editableReports.map((r) => r.id));
    const allViewable = (await db
      .selectDistinct(selectFields)
      .from(reports)
      .innerJoin(clientReports, eq(clientReports.reportId, reports.id))
      .innerJoin(clients, eq(clientReports.clientId, clients.id))
      .where(sql`${userId} = ANY(${clients.viewers})`)
      .orderBy(desc(reports.createdAt))) as RawReport[];

    viewableReports = allViewable.filter((r) => !editableIds.has(r.id));
  } catch {
    // Migration 0005 not yet applied — skip
  }

  // Resolve owner emails
  const allReports = [...editableReports, ...viewableReports];
  const ownerIds = [...new Set(allReports.map((r) => r.userId))];
  const ownerEmailMap: Record<string, string> = {};

  if (ownerIds.length > 0) {
    try {
      const adminClient = createAdminClient();
      const results = await Promise.all(ownerIds.map((id) => adminClient.auth.admin.getUserById(id)));
      for (const { data: userData } of results) {
        if (userData.user?.email) ownerEmailMap[userData.user.id] = userData.user.email;
      }
    } catch {
      // Admin client unavailable — omit emails
    }
  }

  // Attach tags
  const allIds = allReports.map((r) => r.id);
  const tagMap = new Map<string, string[]>();
  if (allIds.length > 0) {
    const tagAssociations = await db
      .select({ reportId: clientReports.reportId, nickname: clients.nickname })
      .from(clientReports)
      .innerJoin(clients, eq(clientReports.clientId, clients.id))
      .where(inArray(clientReports.reportId, allIds));

    for (const a of tagAssociations) {
      if (!tagMap.has(a.reportId)) tagMap.set(a.reportId, []);
      tagMap.get(a.reportId)!.push(a.nickname);
    }
  }

  const enrich = (r: RawReport): SharedReport => ({
    ...r,
    ownerEmail: ownerEmailMap[r.userId] ?? "(未知)",
    tags: tagMap.get(r.id) ?? [],
  });

  return NextResponse.json({
    editable: editableReports.map(enrich),
    viewable: viewableReports.map(enrich),
  });
}
