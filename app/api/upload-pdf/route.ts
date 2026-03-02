import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { reports } from "@/db/schema";
import { PDFParse } from "pdf-parse";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = data.claims.sub;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const clientId = formData.get("clientId") as string | null;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const filePath = `${userId}/${crypto.randomUUID()}.pdf`;
  const { error: uploadError } = await supabase.storage
    .from("pdfs")
    .upload(filePath, file);

  if (uploadError) {
    console.error("[upload-pdf] storage upload error:", uploadError);
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from("pdfs").getPublicUrl(filePath);
  const fileUrl = urlData.publicUrl;
  const title = file.name.replace(/\.pdf$/i, "");

  let extractedContent: string | null = null;
  try {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const parser = new PDFParse({ data: fileBuffer });
    const pdfData = await parser.getText();
    await parser.destroy();
    extractedContent = pdfData.text
      .split(/\n{2,}/)
      .filter((p: string) => p.trim())
      .map((p: string) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
      .join("");
  } catch (parseErr) {
    console.warn("[upload-pdf] pdf text extraction failed (non-fatal):", parseErr);
  }

  try {
    const [inserted] = await db
      .insert(reports)
      .values({
        userId,
        clientId: clientId || null,
        title,
        content: extractedContent,
        fileType: "pdf",
        fileUrl,
      })
      .returning();

    return NextResponse.json(inserted, { status: 201 });
  } catch (dbErr) {
    console.error("[upload-pdf] db insert error:", dbErr);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
