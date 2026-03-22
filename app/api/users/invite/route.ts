import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email, tagId } = await req.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "缺少 email 參數" }, { status: 400 });
  }

  let adminClient;
  try {
    adminClient = createAdminClient();
  } catch {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const origin = req.nextUrl.origin;
  const redirectTo = tagId ? `${origin}/tag/${tagId}` : `${origin}/protected`;

  const { data, error } = await adminClient.auth.admin.inviteUserByEmail(email, { redirectTo });
  if (error) {
    console.error("[invite] inviteUserByEmail error:", error);
    return NextResponse.json({ error: "發送邀請失敗" }, { status: 500 });
  }

  return NextResponse.json({ userId: data.user.id, email: data.user.email });
}
