import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireBlogAdmin(): Promise<void> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user?.email || user.email !== process.env.BLOG_ADMIN_EMAIL) {
    redirect("/");
  }
}

export async function isBlogAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user?.email) return false;
    return user.email === process.env.BLOG_ADMIN_EMAIL;
  } catch {
    return false;
  }
}
