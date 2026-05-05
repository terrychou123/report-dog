import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { isUnsubscribeIntent } from "@/lib/email/unsubscribe-keywords";

interface ResendInboundEvent {
  type: string;
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
  };
}

interface ReceivedEmailContent {
  text?: string;
  html?: string;
}

function parseEmailAddress(from: string): string {
  const match = from.match(/<([^>]+)>/);
  return (match ? match[1] : from).toLowerCase().trim();
}

async function fetchEmailContent(emailId: string): Promise<ReceivedEmailContent> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY 未設定");

  const res = await fetch(`https://api.resend.com/emails/receiving/${emailId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    console.error("[resend-inbound] 取信內容失敗：", res.status, await res.text());
    return {};
  }

  return res.json() as Promise<ReceivedEmailContent>;
}

export async function POST(req: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[resend-inbound] RESEND_WEBHOOK_SECRET 未設定");
    return new NextResponse("configuration error", { status: 500 });
  }

  const raw = await req.text();

  // 驗 svix 簽章（需用 raw body）
  const wh = new Webhook(secret);
  let event: ResendInboundEvent;
  try {
    event = wh.verify(raw, {
      "svix-id": req.headers.get("svix-id") ?? "",
      "svix-timestamp": req.headers.get("svix-timestamp") ?? "",
      "svix-signature": req.headers.get("svix-signature") ?? "",
    }) as ResendInboundEvent;
  } catch {
    return new NextResponse("invalid signature", { status: 400 });
  }

  if (event.type !== "email.received") {
    return NextResponse.json({ ok: true, action: "skipped" });
  }

  // 取完整信件內容（webhook 只帶 metadata）
  const content = await fetchEmailContent(event.data.email_id);

  const fromEmail = parseEmailAddress(event.data.from);

  if (!isUnsubscribeIntent(event.data.subject ?? "", content.text ?? "")) {
    console.log("[resend-inbound] 非退訂意圖，僅記錄", { fromEmail, subject: event.data.subject });
    return NextResponse.json({ ok: true, action: "logged" });
  }

  // 標記退訂（idempotent）
  await db
    .update(leads)
    .set({
      unsubscribedAt: new Date(),
      unsubscribeSource: "reply",
      unsubscribeMessageId: event.data.email_id,
    })
    .where(and(eq(leads.email, fromEmail), isNull(leads.unsubscribedAt)));

  console.log("[resend-inbound] 退訂完成", { fromEmail });
  return NextResponse.json({ ok: true, action: "unsubscribed" });
}
