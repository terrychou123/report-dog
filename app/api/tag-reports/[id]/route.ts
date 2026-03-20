import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { clientReports, clients } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { canEditTag } from "@/lib/auth/tag-permissions";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;
  const { id } = await params;

  // Verify the relation exists and user can edit the tag
  const [relation] = await db
    .select({
      id: clientReports.id,
      userId: clients.userId,
      viewers: clients.viewers,
      editors: clients.editors,
    })
    .from(clientReports)
    .innerJoin(clients, eq(clientReports.clientId, clients.id))
    .where(eq(clientReports.id, id));

  if (!relation) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (!canEditTag(userId, relation)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await db.delete(clientReports).where(and(eq(clientReports.id, id)));
  return NextResponse.json({ success: true });
}
