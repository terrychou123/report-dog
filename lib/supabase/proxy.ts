import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

const PUBLIC_EXACT = new Set(["/", "/pricing", "/ads.txt", "/sitemap.xml", "/robots.txt"]);
const PUBLIC_PREFIXES = ["/home-care", "/hospital", "/residential", "/day-care", "/blog", "/login", "/auth"];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_EXACT.has(pathname) || PUBLIC_PREFIXES.some((p) => pathname.startsWith(p));
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // If the env vars are not set, skip proxy check. You can remove this
  // once you setup the project.
  if (!hasEnvVars()) {
    return supabaseResponse;
  }

  // 攔截首頁的 auth 參數，轉發到 /auth/confirm
  // 當 Supabase Dashboard 的 Redirect URLs 未包含 /auth/confirm 時，
  // Supabase 會回退到 Site URL（根 /），此處將參數轉發至正確的處理路由。
  if (request.nextUrl.pathname === "/") {
    const sp = request.nextUrl.searchParams;
    const hasCode = sp.has("code");
    const hasTokenHash = sp.has("token_hash") && sp.has("type");
    if (hasCode || hasTokenHash) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/confirm";
      // 若沒有 next 參數，預設導向更新密碼頁
      if (!url.searchParams.has("next")) {
        url.searchParams.set("next", "/auth/update-password");
      }
      return NextResponse.redirect(url);
    }
  }

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (!isPublicPath(request.nextUrl.pathname) && !user) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
