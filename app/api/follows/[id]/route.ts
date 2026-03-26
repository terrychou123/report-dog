import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reportFollows } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { isValidFrequency } from "@/lib/follow-utils";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = data.claims.sub;
  const { id } = await params;

  const body = await req.json();
  const { frequency } = body;
  if (!frequency || !isValidFrequency(frequency)) {
    return NextResponse.json({ error: "Invalid frequency" }, { status: 400 });
  }

  const [updated] = await db
    .update(reportFollows)
    .set({ frequency })
    .where(and(eq(reportFollows.id, id), eq(reportFollows.userId, userId)))
    .returning();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = data.claims.sub;
  const { id } = await params;

  const [deleted] = await db
    .delete(reportFollows)
    .where(and(eq(reportFollows.id, id), eq(reportFollows.userId, userId)))
    .returning();

  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
