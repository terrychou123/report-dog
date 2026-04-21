import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireEnv } from "@/lib/utils";

export async function requireBlogAdmin(): Promise<void> {
  const blogAdminEmail = requireEnv("BLOG_ADMIN_EMAIL");
  const supabase = await createClient();
  await supabase.auth.getClaims();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user?.email || user.email !== blogAdminEmail) {
    redirect("/");
  }
}

export async function isBlogAdmin(): Promise<boolean> {
  const blogAdminEmail = requireEnv("BLOG_ADMIN_EMAIL");
  try {
    const supabase = await createClient();
    await supabase.auth.getClaims();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user?.email) return false;
    return user.email === blogAdminEmail;
  } catch {
    return false;
  }
}
