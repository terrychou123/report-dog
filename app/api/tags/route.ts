import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { clients, clientReports } from "@/db/schema";
import { eq, max, count, inArray, or, sql } from "drizzle-orm";

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;

  // Own tags + tags shared with the user (viewer or editor)
  // Wrapped in try-catch: clients.viewers/editors columns may not exist if migration 0005 hasn't run yet
  type TagRow = {
    id: string;
    userId: string;
    nickname: string;
    description: string | null;
    viewers: string[] | null;
    editors: string[] | null;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
  };
  let list: TagRow[] = [];
  try {
    list = await db
      .select({
        id: clients.id,
        userId: clients.userId,
        nickname: clients.nickname,
        description: clients.description,
        viewers: clients.viewers,
        editors: clients.editors,
        sortOrder: clients.sortOrder,
        createdAt: clients.createdAt,
        updatedAt: clients.updatedAt,
      })
      .from(clients)
      .where(
        or(
          eq(clients.userId, userId),
          sql`${userId} = ANY(${clients.viewers})`,
          sql`${userId} = ANY(${clients.editors})`
        )
      )
      .orderBy(clients.sortOrder) as TagRow[];
  } catch {
    // Migration 0005 not yet applied — fall back to own tags only, without viewers/editors columns
    const rows = await db
      .select({
        id: clients.id,
        userId: clients.userId,
        nickname: clients.nickname,
        description: clients.description,
        sortOrder: clients.sortOrder,
        createdAt: clients.createdAt,
        updatedAt: clients.updatedAt,
      })
      .from(clients)
      .where(eq(clients.userId, userId))
      .orderBy(clients.sortOrder);
    list = rows.map((r) => ({ ...r, viewers: null, editors: null }));
  }

  let countMap = new Map<string, number>();
  if (list.length > 0) {
    const counts = await db
      .select({ clientId: clientReports.clientId, cnt: count() })
      .from(clientReports)
      .where(inArray(clientReports.clientId, list.map((c) => c.id)))
      .groupBy(clientReports.clientId);
    countMap = new Map(counts.map((c) => [c.clientId, Number(c.cnt)]));
  }

  return NextResponse.json(list.map((c) => ({ ...c, reportCount: countMap.get(c.id) ?? 0 })));
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;

  const body = await req.json();
  const { nickname, description } = body;

  if (!nickname?.trim()) {
    return NextResponse.json({ error: "nickname is required" }, { status: 400 });
  }

  const [maxRow] = await db
    .select({ max: max(clients.sortOrder) })
    .from(clients)
    .where(eq(clients.userId, userId));
  const nextOrder = Number(maxRow?.max ?? -1) + 1;

  const [inserted] = await db
    .insert(clients)
    .values({
      userId,
      nickname: nickname.trim(),
      description: description?.trim() || null,
      sortOrder: nextOrder,
    })
    .returning();

  return NextResponse.json(inserted, { status: 201 });
}
