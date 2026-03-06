import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reports } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const list = await db
    .select()
    .from(reports)
    .where(eq(reports.userId, data.claims.sub))
    .orderBy(desc(reports.createdAt));

  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, content, fileType, fileUrl } = body;

  if (!title?.trim()) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const [inserted] = await db
    .insert(reports)
    .values({
      userId: data.claims.sub,
      title: title.trim(),
      content: content || null,
      fileType: fileType || null,
      fileUrl: fileUrl || null,
    })
    .returning();

  return NextResponse.json(inserted, { status: 201 });
}
