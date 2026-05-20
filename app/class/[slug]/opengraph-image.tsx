import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { db } from "@/db";
import { classes } from "@/db/schema";
import { eq } from "drizzle-orm";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;

const fontDir = join(process.cwd(), "fonts");
const fontFiles = [
  join(fontDir, "NotoSansTC-Regular.ttf"),
  join(fontDir, "NotoSansTC-SemiBold.ttf"),
  join(fontDir, "NotoSansTC-Bold.ttf"),
  join(fontDir, "NotoSansTC-Black.ttf"),
];

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post] = await db
    .select({ coverImageUrl: classes.coverImageUrl })
    .from(classes)
    .where(eq(classes.slug, slug));

  const coverUrl = post?.coverImageUrl;

  if (coverUrl?.startsWith("/") && coverUrl.endsWith(".svg")) {
    try {
      const svgPath = join(process.cwd(), "public", coverUrl);

      const publicDir = resolve(process.cwd(), "public");
      if (!resolve(svgPath).startsWith(publicDir + "/")) {
        throw new Error(`coverUrl 路徑超出 public 目錄範圍：${coverUrl}`);
      }

      const svgContent = await readFile(svgPath, "utf-8");

      const vbMatch = svgContent.match(/viewBox="0 0 (\d+) (\d+)"/);
      if (!vbMatch || vbMatch[1] !== "1200" || vbMatch[2] !== "630") {
        throw new Error(
          `SVG viewBox 非 1200×630（${vbMatch ? `${vbMatch[1]}×${vbMatch[2]}` : "未知"}），跳過渲染`
        );
      }

      const resvg = new Resvg(svgContent, {
        fitTo: { mode: "width", value: size.width },
        font: { fontFiles, loadSystemFonts: false },
      });

      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();

      return new Response(new Uint8Array(pngBuffer), {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        },
      });
    } catch (err) {
      console.error("[class/og-image] SVG 渲染失敗:", err);
    }
  }

  try {
    const fallback = await readFile(
      join(process.cwd(), "app", "opengraph-image.png")
    );
    return new Response(fallback, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (err) {
    console.error("[class/og-image] fallback 圖片讀取失敗:", err);
    return new Response(null, { status: 404 });
  }
}
