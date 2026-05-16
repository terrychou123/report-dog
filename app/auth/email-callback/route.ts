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
//   Supabase 驗證失敗（token 過期/已被消耗）→ /auth/error?error=...&flow=signup
//   OTP (token_hash) → pass-through to /auth/confirm（手動點擊，防 email scanner）
//   PKCE (code)      → exchangeCodeForSession server-side → /auth/email-success
//
// 注意：iOS Apple Mail 等 email client 會 pre-fetch 連結消耗 PKCE token，
// Supabase 回傳 ?error=access_denied&error_code=otp_expired 時我們必須讀取並顯示
// 有意義的錯誤訊息，而不是 fall-through 到無資訊的「缺少驗證參數」。

// 將 Supabase error_code 轉換為繁體中文友善訊息
function mapSupabaseAuthError(errorCode: string, errorDescription?: string | null): string {
  switch (errorCode) {
    case "otp_expired":
      return "驗證連結已過期，請重新申請";
    case "access_denied":
      return "驗證連結已被使用過或失效，請重新申請";
    case "flow_state_expired":
      return "驗證流程已過期，請重新註冊";
    case "flow_state_not_found":
      return "找不到驗證流程，請重新註冊";
    case "validation_failed":
      return "驗證失敗，請重新申請";
    default:
      return errorDescription ? `驗證失敗：${errorDescription}` : `驗證失敗（${errorCode}）`;
  }
}

// PKCE exchangeCodeForSession 回傳的 JS Error 物件，錯誤訊息比對
function mapExchangeError(message: string): string {
  const lower = message.toLowerCase();
  // 跨裝置/瀏覽器開啟驗證信導致 code_verifier 遺失
  if (lower.includes("pkce") || lower.includes("code verifier") || lower.includes("code_verifier")) {
    return "此驗證連結需在原本的瀏覽器（電腦）開啟。請回到電腦點擊信件中的連結，或點下方「重寄驗證信」重新申請。";
  }
  // token / code 已過期或被消耗
  if (lower.includes("expired") || lower.includes("invalid") || lower.includes("already been used")) {
    return "驗證連結已失效或被使用過，請重新申請";
  }
  return message;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const next = url.searchParams.get("next") ?? "/onboarding";
  const origin = url.origin;

  // Supabase 驗證失敗分支：token 過期、已被消耗（email scanner pre-fetch）、已點過二次
  // Supabase 在這些情況下會在 redirect_to 後面附加 ?error=xxx&error_code=xxx&error_description=xxx
  const errorParam = url.searchParams.get("error");
  const errorCode = url.searchParams.get("error_code");
  const errorDescription = url.searchParams.get("error_description");

  if (errorParam || errorCode) {
    const friendly = mapSupabaseAuthError(errorCode ?? errorParam ?? "", errorDescription);
    console.error("[email-callback] supabase auth error", {
      error: errorParam,
      error_code: errorCode,
      error_description: errorDescription,
      url: req.url,
      userAgent: req.headers.get("user-agent"),
    });
    return NextResponse.redirect(
      `${origin}/auth/error?error=${encodeURIComponent(friendly)}&flow=signup&reason=${encodeURIComponent(errorCode ?? errorParam ?? "")}`,
    );
  }

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
      const friendly = mapExchangeError(error.message);
      const lower = error.message.toLowerCase();
      const reason = lower.includes("pkce") || lower.includes("code verifier") ? "pkce_mismatch"
        : lower.includes("expired") || lower.includes("already been used") ? "expired"
        : "exchange_failed";
      return NextResponse.redirect(
        `${origin}/auth/error?error=${encodeURIComponent(friendly)}&flow=signup&reason=${reason}`,
      );
    }

    const successUrl = new URL("/auth/email-success", origin);
    successUrl.searchParams.set("next", next);
    return NextResponse.redirect(successUrl.toString());
  }

  // 真正的 fall-through：code、token_hash、error 都缺席
  console.error("[email-callback] fall-through: no auth params", {
    url: req.url,
    searchParams: Object.fromEntries(url.searchParams),
    referer: req.headers.get("referer"),
    userAgent: req.headers.get("user-agent"),
  });
  return NextResponse.redirect(
    `${origin}/auth/error?error=${encodeURIComponent("缺少驗證參數")}&flow=signup`,
  );
}
