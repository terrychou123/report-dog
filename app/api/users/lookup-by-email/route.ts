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
  } catch (err) {
    console.error("[lookup-by-email] createAdminClient error:", err);
    return NextResponse.json({ error: "伺服器設定錯誤，請聯絡管理員" }, { status: 500 });
  }

  try {
    // Paginate through all users to find the matching email
    let page = 1;
    while (true) {
      const { data, error } = await adminClient.auth.admin.listUsers({ page, perPage: 1000 });
      if (error) {
        console.error("[lookup-by-email] listUsers error:", error);
        // 401/403 通常代表 SUPABASE_SERVICE_ROLE_KEY 無效或未授權，而非查無此人
        const message =
          error.status === 401 || error.status === 403
            ? "帳號查詢服務未授權，請聯絡管理員檢查伺服器設定"
            : "查詢失敗，請稍後再試";
        return NextResponse.json(
          { error: message, detail: error.message, status: error.status },
          { status: 500 }
        );
      }

      const found = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
      if (found) return NextResponse.json({ userId: found.id, email: found.email });

      if (data.users.length < 1000) break;
      page++;
    }

    return NextResponse.json({ error: "找不到此 Email 的使用者" }, { status: 404 });
  } catch (err) {
    // listUsers 若拋出例外（而非回傳 error 物件），避免整支 route 500 且回非 JSON body
    console.error("[lookup-by-email] unexpected error:", err);
    return NextResponse.json({ error: "查詢失敗，請稍後再試" }, { status: 500 });
  }
}
