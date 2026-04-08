import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

// OG 圖片設定
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 模組層級快取字型，避免每次請求重複讀取 11MB 檔案
let fontCache: Buffer | null = null;
function getFont(): Buffer {
  if (!fontCache) {
    fontCache = readFileSync(
      join(process.cwd(), "fonts", "NotoSansTC-Variable.ttf")
    );
  }
  return fontCache;
}

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
      const svgContent = readFileSync(svgPath, "utf-8");
      const font = getFont();

      const resvg = new Resvg(svgContent, {
        fitTo: { mode: "width", value: 1200 },
        font: {
          fontBuffers: [font],
          loadSystemFonts: false,
        },
      });

      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();

      return new Response(pngBuffer, {
        headers: { "Content-Type": "image/png" },
      });
    } catch {
      // SVG 讀取或渲染失敗時，fallback 到預設圖
    }
  }

  // Fallback：讀取預設 OG 圖片
  const fallback = readFileSync(
    join(process.cwd(), "app", "opengraph-image.png")
  );
  return new Response(fallback, {
    headers: { "Content-Type": "image/png" },
  });
}
