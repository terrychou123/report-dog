// Instagram 輪播圖生成系統 — SVG → JPG 轉換 + 檔案輸出

import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import type { CarouselSlide, CarouselConfig } from "./carousel-types";

/** 建立輸出目錄（~/Desktop/carousel-{slug}/） */
export function makeOutputDir(slug: string): string {
  const dir = path.join(os.homedir(), "Desktop", `carousel-${slug}`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

/** 將單張 SVG 字串轉為 JPG 檔案 */
async function svgToJpg(
  svgContent: string,
  outputPath: string,
  config: CarouselConfig
): Promise<void> {
  const buffer = Buffer.from(svgContent, "utf-8");
  await sharp(buffer)
    .resize(config.width, config.height)
    .jpeg({ quality: config.quality })
    .toFile(outputPath);
}

/** 建立整組輪播圖並寫入 caption.txt */
export async function buildCarousel(
  slides: CarouselSlide[],
  config: CarouselConfig,
  caption: string
): Promise<void> {
  // 確保輸出目錄存在
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  console.log(`\n輸出目錄：${config.outputDir}`);
  console.log(`開始生成 ${slides.length} 張輪播圖...\n`);

  // 依序轉換每張 SVG
  for (const slide of slides) {
    const outputPath = path.join(config.outputDir, slide.filename);
    await svgToJpg(slide.svgContent, outputPath, config);
    console.log(`  ✓ ${slide.filename}`);
  }

  // 寫入 caption.txt
  const captionPath = path.join(config.outputDir, "caption.txt");
  fs.writeFileSync(captionPath, caption, "utf-8");
  console.log(`  ✓ caption.txt`);

  console.log(`\n完成！共 ${slides.length} 張圖片 + 1 份貼文文案`);
  console.log(`位置：${config.outputDir}\n`);
}

/** 預設 Instagram 4:5 設定 */
export const INSTAGRAM_CONFIG: Omit<CarouselConfig, "outputDir"> = {
  width: 1080,
  height: 1350,
  quality: 90,
};
