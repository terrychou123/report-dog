import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireEnv } from "@/lib/utils";

export async function requireAdmin(): Promise<void> {
  const adminEmail = requireEnv("ADMIN_EMAIL");
  const supabase = await createClient();
  await supabase.auth.getClaims(); // refresh session before getUser per CLAUDE.md
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user?.email || user.email !== adminEmail) {
    redirect("/");
  }
}

export async function isAdmin(): Promise<boolean> {
  const adminEmail = requireEnv("ADMIN_EMAIL");
  try {
    const supabase = await createClient();
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
  const adminEmail = requireEnv("ADMIN_EMAIL");
  const supabase = await createClient();
  await supabase.auth.getClaims();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user?.email || user.email !== adminEmail) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return { userId: user.id };
}
