import { NextRequest, NextResponse } from "next/server";
import { runLeadNurtureSequence } from "@/lib/email/sequences/lead-nurture";

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runLeadNurtureSequence();
    console.log("[cron/lead-nurture] 完成", result);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("[cron/lead-nurture] 失敗", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
