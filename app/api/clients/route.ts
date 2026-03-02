import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const list = await db
    .select()
    .from(clients)
    .where(eq(clients.userId, data.claims.sub))
    .orderBy(desc(clients.createdAt));

  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { nickname, description } = body;

  if (!nickname?.trim()) {
    return NextResponse.json({ error: "nickname is required" }, { status: 400 });
  }

  const [inserted] = await db
    .insert(clients)
    .values({
      userId: data.claims.sub,
      nickname: nickname.trim(),
      description: description?.trim() || null,
    })
    .returning();

  return NextResponse.json(inserted, { status: 201 });
}
