import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { notifications, clients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TAG_ROLE_LABELS, type TagRole } from "@/lib/auth/tag-permissions";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = data.claims.sub;

  const { targetUserId, tagName, tagId, role } = await req.json();
  if (!targetUserId || !tagName || !tagId || !role) {
    return NextResponse.json({ error: "缺少必要參數" }, { status: 400 });
  }

  // Verify the calling user owns the tag (only owners can add members)
  const [tag] = await db.select({ userId: clients.userId }).from(clients).where(eq(clients.id, tagId)).limit(1);
  if (!tag || tag.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const roleLabel = TAG_ROLE_LABELS[role as TagRole] ?? role;

  await db.insert(notifications).values({
    userId: targetUserId,
    type: "tag_member_added",
    title: `您已被加入「${tagName}」標籤`,
    message: `您已被加入「${tagName}」標籤的${roleLabel}`,
    link: `/tag/${tagId}`,
  });

  return NextResponse.json({ success: true });
}
