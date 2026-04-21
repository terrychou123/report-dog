import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireEnv } from "@/lib/utils";

export async function requireAdmin(): Promise<void> {
  const supabase = await createClient(); // cookies() 呼叫讓 Next.js 標記此路由為 dynamic，prerender 提前放棄
  const adminEmail = requireEnv("ADMIN_EMAIL");
  await supabase.auth.getClaims(); // refresh session before getUser per CLAUDE.md
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user?.email || user.email !== adminEmail) {
    redirect("/");
  }
}

export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const adminEmail = requireEnv("ADMIN_EMAIL");
    await supabase.auth.getClaims();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user?.email) return false;
    return user.email === adminEmail;
  } catch {
    return false;
  }
}

/** For use in API route handlers — returns userId or a 403 JSON response */
export async function requireAdminApi(): Promise<{ userId: string } | NextResponse> {
  const supabase = await createClient();
  const adminEmail = requireEnv("ADMIN_EMAIL");
  await supabase.auth.getClaims();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user?.email || user.email !== adminEmail) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return { userId: user.id };
}
