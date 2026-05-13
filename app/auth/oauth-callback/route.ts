import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Server route handler — OAuth (Google) 結束後 Supabase 會把 code 帶到這裡
// 在 server 端 exchangeCodeForSession（從 cookie 讀 code_verifier），寫入 session cookie，
// 再 302 轉到 /auth/oauth-success 由瀏覽器端 fire GA 事件
export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const oauthError =
    url.searchParams.get("error_description") ?? url.searchParams.get("error");
  const source = url.searchParams.get("source") ?? "";
  const slug = url.searchParams.get("slug") ?? "";
  // 不再採用 client 傳來的 next；由 server 端依 isNew 強制決定（避免既有使用者誤入 onboarding）

  const origin = url.origin;

  // 失敗：使用者取消、Google 回傳錯誤
  if (oauthError) {
    return NextResponse.redirect(
      `${origin}/auth/error?error=${encodeURIComponent(oauthError)}`,
    );
  }
  if (!code) {
    return NextResponse.redirect(
      `${origin}/auth/error?error=${encodeURIComponent("缺少授權 code")}`,
    );
  }

  const supabase = await createClient();
  const { data, error: exchangeErr } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeErr || !data.user) {
    return NextResponse.redirect(
      `${origin}/auth/error?error=${encodeURIComponent(
        exchangeErr?.message ?? "OAuth 驗證失敗",
      )}`,
    );
  }

  // 判斷新使用者：created_at 與 last_sign_in_at 差距 < 60s
  // last_sign_in_at 在第一次 OAuth 登入時可能尚未寫入（null）；
  // fallback 用 createdAt 使 delta = 0，確保新使用者被正確識別，避免誤送到 /report
  const createdAt = data.user.created_at
    ? new Date(data.user.created_at).getTime()
    : 0;
  const lastSignIn = data.user.last_sign_in_at
    ? new Date(data.user.last_sign_in_at).getTime()
    : createdAt;
  const isNew = Math.abs(lastSignIn - createdAt) < 60_000;

  const provider = data.user.app_metadata?.provider ?? "google";

  // 新使用者導向 onboarding（匯入範本流程），既有使用者一律直送 /report
  // 不採用 client 傳的 next，避免既有使用者從 sign-up 表單登入時重做 onboarding
  const next = isNew ? "/onboarding" : "/report";

  // 中轉到 client page 由瀏覽器端 fire GA 事件，再 router.replace(next)
  const successUrl = new URL("/auth/oauth-success", origin);
  successUrl.searchParams.set("next", next);
  successUrl.searchParams.set("provider", provider);
  successUrl.searchParams.set("new_user", isNew ? "1" : "0");
  if (source) successUrl.searchParams.set("source", source);
  if (slug) successUrl.searchParams.set("slug", slug);

  return NextResponse.redirect(successUrl.toString());
}
