import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email, tagName, tagId, role } = await req.json();
  if (!email || !tagName || !tagId || !role) {
    return NextResponse.json({ error: "缺少必要參數" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[notify] RESEND_API_KEY not set, skipping email");
    return NextResponse.json({ success: true, skipped: true });
  }

  const resend = new Resend(apiKey);
  const roleLabel = role === "viewer" ? "瀏覽者" : "編輯者";
  const link = `${req.nextUrl.origin}/tag/${tagId}`;

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: `您已被加入「${tagName}」標籤`,
    html: `<p>您好，</p>
<p>您已被加入「<strong>${tagName}</strong>」標籤的${roleLabel}。</p>
<p><a href="${link}">點此查看標籤</a></p>`,
  });

  if (error) {
    console.error("[notify] resend error:", error);
    return NextResponse.json({ error: "發送通知失敗" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
