import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { clientReports, clients } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { canEditTag } from "@/lib/auth/tag-permissions";

export async function PUT(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;

  const body = await req.json();
  const { clientId, ids } = body as { clientId: string; ids: string[] };

  if (!clientId || !Array.isArray(ids)) {
    return NextResponse.json({ error: "clientId and ids are required" }, { status: 400 });
  }
  if (ids.length === 0) return NextResponse.json({ ok: true });

  // Verify client is accessible and user can edit it
  const [client] = await db
    .select({ id: clients.id, userId: clients.userId, viewers: clients.viewers, editors: clients.editors })
    .from(clients)
    .where(eq(clients.id, clientId));

  if (!client || !canEditTag(userId, client)) {
    return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });
  }

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
