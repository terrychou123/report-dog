import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { kindReports, kinds } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  // Verify the relation exists and the kind belongs to user
  const [relation] = await db.select().from(kindReports).where(eq(kindReports.id, id));
  if (!relation) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [kind] = await db
    .select()
    .from(kinds)
    .where(and(eq(kinds.id, relation.kindId), eq(kinds.userId, data.claims.sub)));
  if (!kind) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  await db.delete(kindReports).where(eq(kindReports.id, id));

  return NextResponse.json({ success: true });
}
