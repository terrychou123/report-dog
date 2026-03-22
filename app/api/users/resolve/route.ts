import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userIds } = await req.json();
  if (!Array.isArray(userIds) || userIds.length === 0) return NextResponse.json({});

  let adminClient;
  try {
    adminClient = createAdminClient();
  } catch {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const mapping: Record<string, string> = {};
  const results = await Promise.all(userIds.map((id: string) => adminClient.auth.admin.getUserById(id)));
  for (const { data } of results) {
    if (data.user?.email) mapping[data.user.id] = data.user.email;
  }

  return NextResponse.json(mapping);
}
