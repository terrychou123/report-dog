import mammoth from "mammoth";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await mammoth.convertToHtml({ buffer });
    return NextResponse.json({ html: result.value });
  } catch (err) {
    console.error("[parse-doc] mammoth error:", err);
    return NextResponse.json({ error: "Failed to parse document" }, { status: 500 });
  }
}
