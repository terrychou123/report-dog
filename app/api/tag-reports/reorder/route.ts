import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { clientReports, clients } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function PUT(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { clientId, ids } = body as { clientId: string; ids: string[] };

  if (!clientId || !Array.isArray(ids)) {
    return NextResponse.json({ error: "clientId and ids are required" }, { status: 400 });
  }
  if (ids.length === 0) {
    return NextResponse.json({ ok: true });
  }

  // Verify client belongs to user
  const [client] = await db
    .select()
    .from(clients)
    .where(and(eq(clients.id, clientId), eq(clients.userId, data.claims.sub)));
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await Promise.all(
    ids.map((relationId, index) =>
      db
        .update(clientReports)
        .set({ sortOrder: index })
        .where(and(eq(clientReports.id, relationId), eq(clientReports.clientId, clientId)))
    )
  );

  return NextResponse.json({ ok: true });
}
