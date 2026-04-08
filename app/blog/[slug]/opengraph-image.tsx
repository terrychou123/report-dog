import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

// OG 圖片設定
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Next.js ISR：OG 圖片每天重新驗證一次
export const revalidate = 86400;

// 模組載入時同步讀取字型一次，後續請求直接複用（同一 isolate 內）
const fontCache: Buffer = readFileSync(
  join(process.cwd(), "fonts", "NotoSansTC-Variable.ttf")
);

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 取得文章的封面圖路徑
  const [post] = await db
    .select({ coverImageUrl: blogPosts.coverImageUrl })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug));

  const coverUrl = post?.coverImageUrl;

  // 如果有本地 SVG 封面圖，直接渲染成 PNG
  if (coverUrl?.startsWith("/") && coverUrl.endsWith(".svg")) {
    try {
      const svgPath = join(process.cwd(), "public", coverUrl);

      // 路徑穿越防護：確認解析後路徑在 public/ 目錄內
      const publicDir = resolve(process.cwd(), "public");
      if (!resolve(svgPath).startsWith(publicDir + "/")) {
        throw new Error(`coverUrl 路徑超出 public 目錄範圍：${coverUrl}`);
      }

      const svgContent = await readFile(svgPath, "utf-8");

      // 僅渲染 1200×630 封面 SVG（內文插圖 800×500 比例不符 OG 規格，會產生 1200×750）
      const vbMatch = svgContent.match(/viewBox="0 0 (\d+) (\d+)"/);
      if (!vbMatch || vbMatch[1] !== "1200" || vbMatch[2] !== "630") {
        throw new Error(
          `SVG viewBox 非 1200×630（${vbMatch ? `${vbMatch[1]}×${vbMatch[2]}` : "未知"}），跳過渲染`
        );
      }

      const resvg = new Resvg(svgContent, {
        fitTo: { mode: "width", value: size.width },
        font: {
          fontBuffers: [fontCache],
          loadSystemFonts: false,
        },
      });

      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();

      return new Response(pngBuffer, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        },
      });
    } catch (err) {
      // SVG 讀取或渲染失敗時，fallback 到預設圖
      console.error("[og-image] SVG 渲染失敗:", err);
    }
  }

  // Fallback：讀取預設 OG 圖片
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
    console.error("[og-image] fallback 圖片讀取失敗:", err);
    return new Response(null, { status: 404 });
  }
}
