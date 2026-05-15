import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Server-side email 驗證 callback（仿照 /auth/oauth-callback 模式）
//
// 為什麼需要 server route：
// PKCE 模式下 Supabase 將 code_verifier 儲存在瀏覽器 localStorage。
// 若用戶在不同裝置/瀏覽器開啟驗證信，client-side exchangeCodeForSession 會因
// 找不到 code_verifier 而失敗。Server route 使用 cookie-based session，不依賴 localStorage。
//
// 流程：
//   PKCE (code)      → exchangeCodeForSession server-side → /auth/email-success
//   OTP (token_hash) → pass-through to /auth/confirm（手動點擊，防 email scanner）
export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const next = url.searchParams.get("next") ?? "/onboarding";
  const origin = url.origin;

  // OTP / token_hash 流程：pass-through 到 confirm page 顯示手動按鈕（防 email scanner）
  if (token_hash && type) {
    const confirmUrl = new URL("/auth/confirm", origin);
    confirmUrl.searchParams.set("token_hash", token_hash);
    confirmUrl.searchParams.set("type", type);
    confirmUrl.searchParams.set("next", next);
    return NextResponse.redirect(confirmUrl.toString());
  }

  // PKCE code 流程：server-side exchange
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        `${origin}/auth/error?error=${encodeURIComponent(error.message)}&flow=signup`,
      );
    }

    const successUrl = new URL("/auth/email-success", origin);
    successUrl.searchParams.set("next", next);
    return NextResponse.redirect(successUrl.toString());
  }

  return NextResponse.redirect(
    `${origin}/auth/error?error=${encodeURIComponent("缺少驗證參數")}&flow=signup`,
  );
}
