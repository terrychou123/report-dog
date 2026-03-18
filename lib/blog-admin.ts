import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireBlogAdmin(): Promise<void> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email = data?.claims?.email;
  if (!email || email !== process.env.BLOG_ADMIN_EMAIL) {
    redirect("/");
  }
}

export async function isBlogAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    const email = data?.claims?.email;
    return !!email && email === process.env.BLOG_ADMIN_EMAIL;
  } catch {
    return false;
  }
}
