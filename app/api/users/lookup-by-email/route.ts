import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email } = await req.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "缺少 email 參數" }, { status: 400 });
  }

  let adminClient;
  try {
    adminClient = createAdminClient();
  } catch {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  // Paginate through all users to find the matching email
  let page = 1;
  while (true) {
    const { data, error } = await adminClient.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) {
      console.error("[lookup-by-email] listUsers error:", error);
      return NextResponse.json({ error: "查詢失敗" }, { status: 500 });
    }

    const found = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (found) return NextResponse.json({ userId: found.id, email: found.email });

    if (data.users.length < 1000) break;
    page++;
  }

  return NextResponse.json({ error: "找不到此 Email 的使用者" }, { status: 404 });
}
