/**
 * SVG 合規驗證腳本
 *
 * 檢查 public/blog/ 下的 SVG 是否符合報告汪插圖風格規範（template-list-N.svg）
 *
 * 使用方式：
 *   npm run svg:validate                           # 驗證全部非模板 SVG
 *   npm run svg:validate -- public/blog/xxx.svg   # 驗證單一檔案
 *   npm run svg:validate -- --fix                  # 驗證全部並自動修正可修項目
 *   npm run svg:validate -- --fix public/blog/xxx.svg  # 修正單一檔案
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { resolve, basename } from "path";

// ─── 規格常數 ───────────────────────────────────────────────────────────────

/** 直列清單版型各 N 的快查表 */
const LIST_SPEC: Record<
  number,
  { H: number; outerGap: number; headerY: number; rowY: number[]; S_rectH: number }
> = {
  3: { H: 90, outerGap: 38, headerY: 38,  rowY: [166, 269, 372],              S_rectH: 52 },
  4: { H: 62, outerGap: 50, headerY: 50,  rowY: [160, 235, 310, 385],         S_rectH: 46 },
  5: { H: 60, outerGap: 29, headerY: 29,  rowY: [118, 191, 264, 337, 410],    S_rectH: 44 },
  6: { H: 54, outerGap: 31, headerY: 31,  rowY: [95,  159, 223, 287, 351, 415], S_rectH: 38 },
};

/** 大地色系色彩順序 */
const ROW_COLORS = ["#d97706", "#78716c", "#57534e", "#a8a29e", "#94a3b8", "#6b7280"];

/** 允許的文字色 */
const ALLOWED_TEXT_COLORS = new Set([
  "#1e293b", "#57534e", "#d97706",
  "#ffffff", "#fef3c7",           // Header 白色文字（非標準，但常用）
  ...ROW_COLORS,
]);

// ─── 輔助函式 ────────────────────────────────────────────────────────────────

type Level = "PASS" | "WARN" | "FAIL" | "FIXED";
interface CheckResult {
  level: Level;
  msg: string;
}

function pass(msg: string): CheckResult { return { level: "PASS", msg }; }
function warn(msg: string): CheckResult { return { level: "WARN", msg }; }
function fail(msg: string): CheckResult { return { level: "FAIL", msg }; }
function fixed(msg: string): CheckResult { return { level: "FIXED", msg }; }

/** 從 SVG 屬性字串取出指定屬性值 */
function attr(xml: string, attrName: string): string | null {
  const m = xml.match(new RegExp(`${attrName}="([^"]*)"`, "i"));
  return m ? m[1] : null;
}

/** 取出 <svg> 根元素的屬性字串（第一個 > 之前） */
function svgRootAttrs(svg: string): string {
  const m = svg.match(/<svg([^>]*)>/i);
  return m ? m[1] : "";
}

/** 計算 Q_font 預期值：clamp(18, round(H*0.35), 28) */
function expectedQFont(H: number): number {
  return Math.min(28, Math.max(18, Math.round(H * 0.35)));
}

// ─── 自動修正函式 ────────────────────────────────────────────────────────────

/** 在元素字串中設定或替換指定屬性 */
function setAttr(el: string, name: string, value: string): string {
  const re = new RegExp(`${name}="[^"]*"`);
  if (re.test(el)) {
    return el.replace(re, `${name}="${value}"`);
  }
  // 在 > 或 /> 之前插入屬性
  return el.replace(/(\/?>)/, ` ${name}="${value}"$1`);
}

function fixSvg(svg: string): { result: string; fixes: string[] } {
  let out = svg;
  const fixes: string[] = [];

  // ── 1. font-family：從 <text> 移到 <svg> 根元素 ────────────────────────────
  const root = svgRootAttrs(out);
  const hasRootFont = /font-family="[^"]*Noto Sans TC[^"]*"/.test(root);
  const hasTextFont = /<text[^>]*font-family=/.test(out);

  if (!hasRootFont && hasTextFont) {
    // 在 <svg> 標籤加上 font-family
    out = out.replace(/<svg([^>]*)>/, (match, attrs) => {
      return `<svg${attrs} font-family="'Noto Sans TC', sans-serif">`;
    });
    // 移除所有 <text> 上的 font-family
    out = out.replace(/(<text[^>]*)\s*font-family="[^"]*"/g, "$1");
    fixes.push("font-family 移至 <svg> 根元素");
  } else if (!hasRootFont && !hasTextFont) {
    // 完全沒有 font-family，加到根元素
    out = out.replace(/<svg([^>]*)>/, (match, attrs) => {
      return `<svg${attrs} font-family="'Noto Sans TC', sans-serif">`;
    });
    fixes.push("font-family 加到 <svg> 根元素");
  }

  // ── 2. Row rect：rx → 12 ──────────────────────────────────────────────────
  // 目標：有 stroke="#e8e6de" 的 rect，rx 應為 12
  out = out.replace(/<rect([^>]+)stroke="#e8e6de"([^>]*)>/g, (match, pre, post) => {
    const full = `<rect${pre}stroke="#e8e6de"${post}>`;
    const currentRx = attr(full, "rx");
    if (currentRx !== "12") {
      fixes.push(`Row rect rx="${currentRx}" → "12"`);
      return setAttr(full, "rx", "12");
    }
    return full;
  });

  // ── 3. Circle：加上 opacity="0.15" ────────────────────────────────────────
  out = out.replace(/<circle([^>]+)>/g, (match, attrs) => {
    const full = `<circle${attrs}>`;
    const op = attr(full, "opacity");
    if (op === null) {
      fixes.push("Circle 加上 opacity=\"0.15\"");
      return setAttr(full, "opacity", "0.15");
    } else if (parseFloat(op) >= 0.5) {
      fixes.push(`Circle opacity="${op}" → "0.15"`);
      return setAttr(full, "opacity", "0.15");
    }
    return full;
  });

  // ── 4. S 標籤框（width=136 的 rect）：rx → 8, opacity → 0.12 ──────────────
  out = out.replace(/<rect([^>]+)width="136"([^>]*)>/g, (match, pre, post) => {
    let full = `<rect${pre}width="136"${post}>`;
    const currentRx = attr(full, "rx");
    const currentOp = attr(full, "opacity");

    if (currentRx !== "8") {
      fixes.push(`S 標籤框 rx="${currentRx}" → "8"`);
      full = setAttr(full, "rx", "8");
    }
    if (currentOp !== "0.12") {
      // 若有 stroke 或 solid fill，移除 stroke 並改為 opacity 方式
      if (currentOp === null) {
        fixes.push("S 標籤框加上 opacity=\"0.12\"");
      } else {
        fixes.push(`S 標籤框 opacity="${currentOp}" → "0.12"`);
      }
      full = setAttr(full, "opacity", "0.12");
      // 移除 stroke 和 stroke-width（新模板不用 stroke）
      full = full.replace(/\s*stroke="[^"]*"/g, "");
      full = full.replace(/\s*stroke-width="[^"]*"/g, "");
    }
    return full;
  });

  // ── 5. 左色條：rx → 2 ────────────────────────────────────────────────────
  out = out.replace(/<rect([^>]+)width="6"([^>]+)height="\d+"([^>]*)>/g, (match, p1, p2, p3) => {
    const full = match;
    const currentRx = attr(full, "rx");
    // 只修改有 fill 且為 ROW_COLORS 之一的左色條
    const fillColor = attr(full, "fill");
    if (fillColor && ROW_COLORS.includes(fillColor) && currentRx !== "2") {
      fixes.push(`左色條 rx="${currentRx}" → "2"`);
      return setAttr(full, "rx", "2");
    }
    return full;
  });

  // ── 6. Circle 內數字文字：實心圓變半透明後，文字色需從白色改為對應主色 ──────
  // 找到 circle 後緊跟的 <text>，若 fill="#ffffff" 就改為 circle 的主色
  out = out.replace(
    /(<circle[^>]+fill="(#[^"]+)"[^>]*>)\s*\n(\s*)(<text[^>]+)fill="#ffffff"([^>]*>)/g,
    (match, circle, circleColor, indent, textPre, textPost) => {
      fixes.push(`Circle 內文字色 #ffffff → ${circleColor}`);
      return `${circle}\n${indent}${textPre}fill="${circleColor}"${textPost}`;
    }
  );

  // 去重 fixes 訊息
  const uniqueFixes = [...new Set(fixes)];

  return { result: out, fixes: uniqueFixes };
}

// ─── 驗證函式 ────────────────────────────────────────────────────────────────

function validateSvg(filePath: string): { file: string; results: CheckResult[] } {
  const svg = readFileSync(filePath, "utf-8");
  const results: CheckResult[] = [];
  const root = svgRootAttrs(svg);

  // ── 0. @frozen 跳過 ────────────────────────────────────────────────────────
  if (/<!--\s*@frozen/.test(svg)) {
    results.push(warn("@frozen 標記，跳過驗證"));
    return { file: filePath, results };
  }

  // ── 1. 基本結構 ────────────────────────────────────────────────────────────

  // 尺寸
  const w = attr(root, "width");
  const h = attr(root, "height");
  const vb = attr(root, "viewBox");
  if (w === "800" && h === "500" && vb === "0 0 800 500") {
    results.push(pass("尺寸 800×500，viewBox 正確"));
  } else if (w === "1200" && h === "630" && vb === "0 0 1200 630") {
    results.push(pass("尺寸 1200×630（封面），viewBox 正確"));
  } else {
    results.push(fail(`尺寸錯誤：width=${w} height=${h} viewBox="${vb}"（應為 800×500 或 1200×630）`));
  }

  // font-family 在根元素
  if (/font-family="[^"]*Noto Sans TC[^"]*"/.test(root)) {
    results.push(pass("font-family 設定在 <svg> 根元素"));
  } else if (/<text[^>]*font-family=/.test(svg)) {
    results.push(fail("font-family 散落在個別 <text> 元素，應移到 <svg> 根元素"));
  } else {
    results.push(warn("未在 <svg> 根元素偵測到 font-family"));
  }

  // 背景色
  if (/<rect[^>]*fill="#f0efe8"/.test(svg) || /<rect[^>]*fill='#f0efe8'/.test(svg)) {
    results.push(pass("背景色 #f0efe8 正確"));
  } else {
    results.push(fail("未偵測到背景 rect fill=\"#f0efe8\""));
  }

  // 判斷是否為封面圖（1200×630）
  const isCover = w === "1200" && h === "630";

  // 浮水印：找到同時含「報告汪」和「reportwang.com」的 <text> 標籤
  const wmTextMatch = svg.match(/<text[^>]*>[^<]*報告汪[^<]*reportwang\.com[^<]*<\/text>/);
  if (wmTextMatch) {
    results.push(pass("包含品牌浮水印「報告汪 reportwang.com」"));
    const wmY = parseInt(attr(wmTextMatch[0], "y") ?? "0");
    const expectedWmY = isCover ? 590 : 480;
    if (wmY === expectedWmY) {
      results.push(pass(`浮水印 y=${wmY} 正確`));
    } else {
      results.push(warn(`浮水印 y=${wmY}（應為 ${expectedWmY}）`));
    }
  } else {
    results.push(fail("缺少品牌浮水印「報告汪 reportwang.com」"));
  }

  // 禁止 emoji（掃描常見 Unicode 範圍）
  const emojiRe = /[\u2600-\u27BF\u{1F300}-\u{1F9FF}\u2700-\u27BF✓✗○□●▶→]/u;
  if (emojiRe.test(svg)) {
    // 過濾掉出現在 HTML 注釋中的
    const svgNoComments = svg.replace(/<!--[\s\S]*?-->/g, "");
    if (emojiRe.test(svgNoComments)) {
      results.push(fail("偵測到 emoji 或 Unicode 符號字元，應改用 SVG 圖形"));
    } else {
      results.push(pass("無 emoji（僅出現在注釋中）"));
    }
  } else {
    results.push(pass("無 emoji 或 Unicode 符號"));
  }

  // 最小字級 14px
  const allFontSizes = [...svg.matchAll(/font-size="(\d+(?:\.\d+)?)"/g)]
    .map(m => parseFloat(m[1]));
  if (allFontSizes.length === 0) {
    results.push(warn("未偵測到任何 font-size 屬性"));
  } else {
    const minFs = Math.min(...allFontSizes);
    if (minFs < 14) {
      results.push(fail(`最小字級 ${minFs}px 低於 14px 下限`));
    } else {
      results.push(pass(`最小字級 ${minFs}px ≥ 14px`));
    }
  }

  // ── 2. 偵測版型（直列清單） ─────────────────────────────────────────────────

  // 計算主要 Row rect 數（x=28 width=744 的 rect）
  const rowRects = [...svg.matchAll(/<rect[^>]+x="28"[^>]+width="744"/g)];
  const N = rowRects.length - 1; // 減去 Header rect（若 Header 也是 x=28 w=744）

  // 更精確：計算有 stroke="#e8e6de" 的 row rect（主框）
  const rowMainRects = [...svg.matchAll(/<rect[^>]+stroke="#e8e6de"[^>]*>/g)];
  const detectedN = rowMainRects.length;

  if (detectedN >= 3 && detectedN <= 6) {
    results.push(pass(`偵測為直列清單版型 N=${detectedN}`));
    validateListType(svg, detectedN, results);
  } else if (detectedN === 0) {
    // 可能是封面、流程圖等其他版型，只做基本驗證
    results.push(warn(`未偵測到直列清單版型（stroke="#e8e6de" row 數=${detectedN}），跳過版型驗證`));
  } else {
    results.push(warn(`偵測到 ${detectedN} 個 Row rect，不在支援的 N=3~6 範圍，跳過版型驗證`));
  }

  return { file: filePath, results };
}

function validateListType(svg: string, N: number, results: CheckResult[]) {
  const spec = LIST_SPEC[N];
  if (!spec) return;

  const { H, rowY, S_rectH } = spec;
  const expectedQ = expectedQFont(H);

  // ── Row rect 規格（rx=12, fill=white, stroke=#e8e6de）────────────────────
  const rowRectFails: string[] = [];
  for (const m of svg.matchAll(/<rect[^>]+stroke="#e8e6de"[^>]*>/g)) {
    const el = m[0];
    const rx = attr(el, "rx");
    const fill = attr(el, "fill");
    if (rx !== "12") rowRectFails.push(`rx="${rx}"（應為 12）`);
    if (fill !== "white" && fill !== "#ffffff") rowRectFails.push(`fill="${fill}"（應為 white）`);
  }
  if (rowRectFails.length === 0) {
    results.push(pass("Row rect：rx=12, fill=white 正確"));
  } else {
    results.push(fail(`Row rect 規格錯誤：${[...new Set(rowRectFails)].join("，")}`));
  }

  // ── 左色條（width=6, rx=2）──────────────────────────────────────────────
  // 左色條特徵：width="6" rx="2"（或 rx="3"）且 height 等於 H
  const leftBarRe = new RegExp(`<rect[^>]+width="6"[^>]+height="${H}"[^>]*>`, "g");
  const leftBars = [...svg.matchAll(leftBarRe)];
  if (leftBars.length === N) {
    const wrongRx = leftBars.filter(m => attr(m[0], "rx") !== "2");
    if (wrongRx.length === 0) {
      results.push(pass("左色條：width=6, rx=2 正確"));
    } else {
      results.push(fail(`左色條 rx 錯誤（應為 2）：${wrongRx.length} 個`));
    }
  } else if (leftBars.length > 0) {
    results.push(warn(`偵測到 ${leftBars.length} 個左色條（預期 ${N} 個）`));
  }

  // ── Circle opacity=0.15 ─────────────────────────────────────────────────
  const circles = [...svg.matchAll(/<circle[^>]+>/g)];
  const solidCircles = circles.filter(m => {
    const el = m[0];
    const op = attr(el, "opacity");
    return op === null || parseFloat(op) >= 0.5;
  });
  if (solidCircles.length === 0) {
    results.push(pass("Circle opacity=0.15（無實心圓）"));
  } else {
    results.push(fail(`${solidCircles.length} 個 Circle 未設 opacity=0.15（舊式實心圓）`));
  }

  // ── S 標籤框（rx=8, opacity=0.12）──────────────────────────────────────
  // 特徵：width=136, height=S_rectH
  const sRectRe = new RegExp(`<rect[^>]+width="136"[^>]*>`, "g");
  const sRects = [...svg.matchAll(sRectRe)];
  if (sRects.length === N) {
    const sRectIssues: string[] = [];
    for (const m of sRects) {
      const el = m[0];
      const rx = attr(el, "rx");
      const op = attr(el, "opacity");
      if (rx !== "8") sRectIssues.push(`rx="${rx}"（應為 8）`);
      if (op !== "0.12") sRectIssues.push(`opacity="${op}"（應為 0.12）`);
    }
    if (sRectIssues.length === 0) {
      results.push(pass("S 標籤框：rx=8, opacity=0.12 正確"));
    } else {
      results.push(fail(`S 標籤框規格錯誤：${[...new Set(sRectIssues)].join("，")}`));
    }
  } else if (sRects.length > 0) {
    results.push(warn(`偵測到 ${sRects.length} 個 S 標籤框（預期 ${N} 個，width=136）`));
  }

  // ── Q 列標題 font-size ──────────────────────────────────────────────────
  // Q 列標題特徵：x=100, font-weight=700, fill=#1e293b
  const qTexts = [...svg.matchAll(/<text[^>]+x="100"[^>]+font-weight="700"[^>]*>/g)];
  if (qTexts.length > 0) {
    const wrongQ = qTexts.filter(m => {
      const fs = parseInt(attr(m[0], "font-size") ?? "0");
      return fs !== expectedQ;
    });
    if (wrongQ.length === 0) {
      results.push(pass(`Q 列標題 font-size=${expectedQ}px 正確（N=${N}）`));
    } else {
      const sizes = wrongQ.map(m => attr(m[0], "font-size")).join("，");
      results.push(warn(`Q 列標題 font-size 應為 ${expectedQ}px，實際：${sizes}`));
    }
  } else {
    results.push(warn("未偵測到 Q 列標題（x=100 + font-weight=700）"));
  }

  // ── R 說明文 font-size=16px ─────────────────────────────────────────────
  // R 說明文：x=100, fill=#57534e, 無 font-weight=700
  const rTexts = [...svg.matchAll(/<text[^>]+x="100"[^>]+fill="#57534e"[^>]*>/g)];
  if (rTexts.length > 0) {
    const wrongR = rTexts.filter(m => attr(m[0], "font-size") !== "16");
    if (wrongR.length === 0) {
      results.push(pass("R 說明文 font-size=16px 正確"));
    } else {
      const sizes = wrongR.map(m => attr(m[0], "font-size")).join("，");
      results.push(fail(`R 說明文 font-size 應為 16px，實際：${sizes}`));
    }
  }

  // ── Row y 座標 ───────────────────────────────────────────────────────────
  const actualRowYs: number[] = [];
  for (const m of svg.matchAll(/<rect[^>]+stroke="#e8e6de"[^>]*>/g)) {
    const y = attr(m[0], "y");
    if (y) actualRowYs.push(parseInt(y));
  }
  actualRowYs.sort((a, b) => a - b);
  const expectedYs = rowY;
  const yMatch = expectedYs.every((y, i) => actualRowYs[i] === y);
  if (yMatch) {
    results.push(pass(`Row y 座標正確：${actualRowYs.join("/")}（N=${N}）`));
  } else {
    results.push(warn(`Row y 座標：實際 ${actualRowYs.join("/")}，預期 ${expectedYs.join("/")}（N=${N}）`));
  }

  // ── 色彩順序 ─────────────────────────────────────────────────────────────
  // 左色條 fill 順序（依 y 排序）
  const coloredBars: { y: number; color: string }[] = [];
  for (const m of svg.matchAll(/<rect[^>]+width="6"[^>]+height="\d+"[^>]*>/g)) {
    const el = m[0];
    const y = attr(el, "y");
    const fill = attr(el, "fill");
    if (y && fill && fill !== "#d97706" || (fill === "#d97706" && y !== "50")) {
      coloredBars.push({ y: parseInt(y ?? "0"), color: fill ?? "" });
    }
  }
  // 簡化：直接掃描有 fill 且符合 ROW_COLORS 的左色條
  const leftBarColors: { y: number; color: string }[] = [];
  for (const m of svg.matchAll(/<rect[^>]+width="6"[^>]+rx="2"[^>]*>/g)) {
    const el = m[0];
    const y = parseInt(attr(el, "y") ?? "0");
    const fill = attr(el, "fill") ?? "";
    leftBarColors.push({ y, color: fill });
  }
  leftBarColors.sort((a, b) => a.y - b.y);
  if (leftBarColors.length === N) {
    const colorErrors: string[] = [];
    for (let i = 0; i < N; i++) {
      if (leftBarColors[i].color !== ROW_COLORS[i]) {
        colorErrors.push(`Row${i + 1} 應為 ${ROW_COLORS[i]} 實際為 ${leftBarColors[i].color}`);
      }
    }
    if (colorErrors.length === 0) {
      results.push(pass("色彩順序正確（大地色系）"));
    } else {
      results.push(fail(`色彩順序錯誤：${colorErrors.join("；")}`));
    }
  } else if (leftBarColors.length > 0) {
    results.push(warn(`左色條（rx=2）偵測到 ${leftBarColors.length} 個（預期 ${N} 個），色彩順序略過`));
  }
}

// ─── 主程式 ─────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const verbose = args.includes("--verbose");
  const fixMode = args.includes("--fix");
  const fileArgs = args.filter(a => !a.startsWith("--"));
  const blogDir = resolve(process.cwd(), "public/blog");

  // 決定要驗證哪些檔案
  let files: string[];
  if (fileArgs.length > 0) {
    files = fileArgs.map(f => resolve(process.cwd(), f));
  } else {
    files = readdirSync(blogDir)
      .filter(f => f.endsWith(".svg") && !f.startsWith("template-") && !f.startsWith("test-"))
      .map(f => resolve(blogDir, f));
  }

  if (files.length === 0) {
    console.log("沒有找到需要驗證的 SVG 檔案。");
    process.exit(0);
  }

  let totalPass = 0, totalWarn = 0, totalFail = 0, totalFixed = 0;
  const failedFiles: string[] = [];
  const fixedFiles: string[] = [];

  for (const file of files) {
    // ── --fix 模式：先修正再驗證 ──────────────────────────────────────────────
    if (fixMode) {
      const svg = readFileSync(file, "utf-8");
      if (/<!--\s*@frozen/.test(svg)) {
        console.log(`\n📄 ${basename(file)}  ⏩ @frozen，跳過`);
        continue;
      }
      const { result, fixes } = fixSvg(svg);
      if (fixes.length > 0) {
        writeFileSync(file, result, "utf-8");
        fixedFiles.push(basename(file));
        totalFixed += fixes.length;
        console.log(`\n📄 ${basename(file)}  🔧 已修正 ${fixes.length} 項：`);
        for (const f of fixes) console.log(`  🔧 ${f}`);
      }
    }

    // ── 驗證（fix 後的結果）──────────────────────────────────────────────────
    const { results } = validateSvg(file);
    const filePass = results.filter(r => r.level === "PASS").length;
    const fileWarn = results.filter(r => r.level === "WARN").length;
    const fileFail = results.filter(r => r.level === "FAIL").length;

    totalPass += filePass;
    totalWarn += fileWarn;
    totalFail += fileFail;
    if (fileFail > 0) failedFiles.push(basename(file));

    // 只印出有問題的項目（WARN/FAIL），除非 --verbose
    const hasIssues = fileWarn > 0 || fileFail > 0;

    if (hasIssues || verbose) {
      // fix 模式下如果已印過修正結果，不重複印檔名
      if (!fixMode || !fixedFiles.includes(basename(file))) {
        console.log(`\n📄 ${basename(file)}`);
      }
      if (hasIssues) {
        console.log("  ── 驗證結果 ──");
      }
      for (const r of results) {
        if (r.level === "FAIL") {
          console.log(`  ❌ ${r.msg}`);
        } else if (r.level === "WARN") {
          console.log(`  ⚠️  ${r.msg}`);
        } else if (verbose) {
          console.log(`  ✅ ${r.msg}`);
        }
      }
    }
  }

  // 摘要
  console.log("\n" + "─".repeat(60));
  console.log(`驗證 ${files.length} 個檔案`);
  if (fixMode && totalFixed > 0) {
    console.log(`  🔧 FIXED：${totalFixed} 項（${fixedFiles.length} 個檔案）`);
  }
  console.log(`  ✅ PASS：${totalPass}　⚠️  WARN：${totalWarn}　❌ FAIL：${totalFail}`);
  if (failedFiles.length > 0) {
    console.log(`\n仍需手動修正（${failedFiles.length} 個）：`);
    for (const f of failedFiles) console.log(`  - ${f}`);
    process.exit(1);
  } else if (totalWarn > 0) {
    console.log("\n所有 FAIL 已通過，但有警告需留意。");
    process.exit(0);
  } else {
    console.log("\n所有檢查通過！");
    process.exit(0);
  }
}

main();
