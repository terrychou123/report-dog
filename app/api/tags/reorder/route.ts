import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function PUT(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = data.claims.sub;

  const body = await req.json();
  const { ids } = body as { ids: string[] };

  if (!Array.isArray(ids)) return NextResponse.json({ error: "ids must be an array" }, { status: 400 });
  if (ids.length > 500) return NextResponse.json({ error: "Too many ids" }, { status: 400 });

  // Only reorder own tags
  await Promise.all(
    ids.map((id, index) =>
      db
        .update(clients)
        .set({ sortOrder: index, updatedAt: new Date() })
        .where(and(eq(clients.id, id), eq(clients.userId, userId)))
    )
  );

  return NextResponse.json({ success: true });
}
