import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { kinds } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [kind] = await db
    .select()
    .from(kinds)
    .where(and(eq(kinds.id, id), eq(kinds.userId, data.claims.sub)));

  if (!kind) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(kind);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { name, description } = body;

  const [updated] = await db
    .update(kinds)
    .set({
      ...(name && { name: name.trim() }),
      ...(description !== undefined && { description: description?.trim() || null }),
      updatedAt: new Date(),
    })
    .where(and(eq(kinds.id, id), eq(kinds.userId, data.claims.sub)))
    .returning();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db
    .delete(kinds)
    .where(and(eq(kinds.id, id), eq(kinds.userId, data.claims.sub)));

  return NextResponse.json({ success: true });
}
