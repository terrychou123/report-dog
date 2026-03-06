import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { clientReports, clients } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  // Verify the relation exists and the client belongs to this user
  const [relation] = await db
    .select({ id: clientReports.id })
    .from(clientReports)
    .innerJoin(clients, eq(clientReports.clientId, clients.id))
    .where(and(eq(clientReports.id, id), eq(clients.userId, data.claims.sub)));

  if (!relation) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.delete(clientReports).where(eq(clientReports.id, id));

  return NextResponse.json({ success: true });
}
