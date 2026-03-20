import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq, and, or, sql } from "drizzle-orm";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;
  const { id } = await params;

  const [client] = await db
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
      and(
        eq(clients.id, id),
        or(
          eq(clients.userId, userId),
          sql`${userId} = ANY(${clients.viewers})`,
          sql`${userId} = ANY(${clients.editors})`
        )
      )
    );

  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(client);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;
  const { id } = await params;

  // Only owner can edit a tag (including setting viewers/editors)
  const [existing] = await db
    .select({ userId: clients.userId })
    .from(clients)
    .where(eq(clients.id, id));

  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.userId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { nickname, description, viewers, editors } = body;

  const [updated] = await db
    .update(clients)
    .set({
      ...(nickname && { nickname: nickname.trim() }),
      ...(description !== undefined && { description: description?.trim() || null }),
      ...(viewers !== undefined && { viewers }),
      ...(editors !== undefined && { editors }),
      updatedAt: new Date(),
    })
    .where(and(eq(clients.id, id), eq(clients.userId, userId)))
    .returning({
      id: clients.id,
      userId: clients.userId,
      nickname: clients.nickname,
      description: clients.description,
      viewers: clients.viewers,
      editors: clients.editors,
      sortOrder: clients.sortOrder,
      createdAt: clients.createdAt,
      updatedAt: clients.updatedAt,
    });

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;
  const { id } = await params;

  // Only owner can delete a tag
  const deleted = await db
    .delete(clients)
    .where(and(eq(clients.id, id), eq(clients.userId, userId)))
    .returning({ id: clients.id });

  if (deleted.length === 0) return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });
  return NextResponse.json({ success: true });
}
