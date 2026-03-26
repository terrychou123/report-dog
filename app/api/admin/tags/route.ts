import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { templateTags } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { requireAdminApi } from "@/lib/admin";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(request.url);
  const facilityType = searchParams.get("facilityType");
  if (!facilityType) return NextResponse.json({ error: "facilityType required" }, { status: 400 });

  const tags = await db
    .select()
    .from(templateTags)
    .where(eq(templateTags.facilityType, facilityType))
    .orderBy(asc(templateTags.sortOrder));

  return NextResponse.json(tags);
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const { facilityType, name, description } = body;
  if (!facilityType || !name) {
    return NextResponse.json({ error: "facilityType and name required" }, { status: 400 });
  }

  // Place new tag at the end
  const existing = await db
    .select({ sortOrder: templateTags.sortOrder })
    .from(templateTags)
    .where(eq(templateTags.facilityType, facilityType))
    .orderBy(asc(templateTags.sortOrder));
  const maxOrder = existing.length > 0 ? existing[existing.length - 1].sortOrder : -1;

  const [newTag] = await db
    .insert(templateTags)
    .values({ facilityType, name, description: description ?? null, sortOrder: maxOrder + 1 })
    .returning();

  return NextResponse.json(newTag, { status: 201 });
}
