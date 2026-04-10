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

// ─── 垂直置中檢查相關 ──────────────────────────────────────────────────────────

const VCENTER_TOL = 2; // 垂直置中容差 ±2px

interface ContainerRect { x: number; y: number; w: number; h: number; el: string }
interface TextEl { x: number; y: number; fs: number; content: string; el: string; idx: number }

/** 精確索引替換，避免相同元素只修正第一次出現 */
function replaceAt(str: string, idx: number, oldStr: string, newStr: string): string {
  return str.slice(0, idx) + newStr + str.slice(idx + oldStr.length);
}

/** 解析容器 rect（排除背景、色條、Row 主框、無圓角填充延伸條） */
function parseContainers(svg: string, svgW: number): ContainerRect[] {
  const out: ContainerRect[] = [];
  for (const m of svg.matchAll(/<rect([^>]*)>/g)) {
    const el = m[0];
    const w = parseFloat(attr(el, "width") ?? "0");
    const h = parseFloat(attr(el, "height") ?? "0");
    // 排除：背景大色塊、色條、裝飾線、Row 主框
    // h <= 28 排除所有裝飾性色條（h=8 頂部色條、h=20 填充延伸條等）
    if (w >= svgW * 0.9 || w <= 10 || h <= 28) continue;
    // 排除寬 Row 主框（w >= svgW*0.6），但保留封面右側窄卡片（w=155~320）
    if (attr(el, "stroke") === "#e8e6de" && w >= svgW * 0.6) continue;
    // 排除：無 rx 的裝飾性填充延伸條
    const rx = attr(el, "rx");
    if (!rx || rx === "0") continue;
    out.push({
      x: parseFloat(attr(el, "x") ?? "0"),
      y: parseFloat(attr(el, "y") ?? "0"),
      w, h, el,
    });
  }
  return out;
}

/** 解析文字元素（排除浮水印），記錄原始索引供精確替換使用 */
function parseTexts(svg: string): TextEl[] {
  const out: TextEl[] = [];
  for (const m of svg.matchAll(/<text([^>]*)>([^<]*)<\/text>/g)) {
    const el = m[0]; const content = m[2].trim();
    if (content.includes("報告汪") || content.includes("reportwang")) continue;
    out.push({
      x: parseFloat(attr(el, "x") ?? "0"),
      y: parseFloat(attr(el, "y") ?? "0"),
      fs: parseFloat(attr(el, "font-size") ?? "16"),
      content, el, idx: m.index!,
    });
  }
  return out;
}

/** 文字 baseline 是否落在 rect 內 */
function textInRect(t: TextEl, r: ContainerRect): boolean {
  return t.x >= r.x - 5 && t.x <= r.x + r.w + 5 &&
         t.y >= r.y + t.fs * 0.15 && t.y <= r.y + r.h + 2;
}

/** 單行垂直置中預期 y */
function vcY1(ry: number, rh: number, fs: number): number {
  return Math.round(ry + rh / 2 + fs * 0.35);
}

/** 雙行垂直置中預期 title_y（保留既有 gap，整組置中）
 *  公式：rect 中心 - gap/2 + title_fs*0.35（title baseline 偏移）
 */
function vcY2(ry: number, rh: number, tfs: number, sfs: number, gap: number): number {
  // sfs 參數保留供呼叫端傳入，但計算只需 tfs（title baseline 決定整體置中）
  void sfs;
  return Math.round(ry + rh / 2 - gap / 2 + tfs * 0.35);
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

function isTimeline(svg: string): boolean {
  return /<!--\s*@template:\s*timeline\s*-->/.test(svg);
}

function fixSvg(svg: string): { result: string; fixes: string[] } {
  // 若 XML 不 well-formed，拒絕自動修正（破損結構不安全改寫）
  const wfCheck = checkWellFormed(svg);
  if (wfCheck.some(r => r.level === "FAIL")) {
    return {
      result: svg,
      fixes: ["⚠ 跳過自動修正：SVG XML 不 well-formed，請先手動修復標籤/屬性"],
    };
  }

  let out = svg;
  const fixes: string[] = [];
  const timeline = isTimeline(out);

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

  // ── 3. Circle：深色 fill（ROW_COLORS）才加 opacity="0.15" ─────────────────
  // 淺色 fill（如 #fef3c7、#f5f5f4）本身已是淡色，加透明度後在白底上會消失
  // @template: timeline 的 SVG 圓圈保持實心（實心圓+白色數字），跳過不改
  if (!timeline) {
    out = out.replace(/<circle([^>]+)>/g, (match, attrs) => {
      const full = `<circle${attrs}>`;
      const fillColor = attr(full, "fill");
      if (!fillColor || !ROW_COLORS.includes(fillColor)) {
        // 淺色 circle：若被錯誤加上 opacity="0.15"，移除它
        const op = attr(full, "opacity");
        if (op === "0.15") {
          fixes.push(`淺色 Circle (fill=${fillColor}) 移除錯誤 opacity="0.15"`);
          return full.replace(/\s*opacity="0\.15"/, "");
        }
        return full;
      }
      // 深色 ROW_COLORS fill：確保有 opacity="0.15"
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
  }

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
  // timeline 模板保持實心圓+白色文字，跳過此修正
  if (!timeline) {
    out = out.replace(
      /(<circle[^>]+fill="(#[^"]+)"[^>]*>)\s*\n(\s*)(<text[^>]+)fill="#ffffff"([^>]*>)/g,
      (match, circle, circleColor, indent, textPre, textPost) => {
        fixes.push(`Circle 內文字色 #ffffff → ${circleColor}`);
        return `${circle}\n${indent}${textPre}fill="${circleColor}"${textPost}`;
      }
    );
  }

  // ── 7. 文字垂直置中修正 ──────────────────────────────────────────────────────
  const fSvgW = parseFloat(attr(svgRootAttrs(out), "width") ?? "800");
  const fContainers = parseContainers(out, fSvgW);
  const fTexts = parseTexts(out);

  // 收集所有替換，再以索引降序套用（避免提前替換偏移後續索引）
  const pending: { idx: number; old: string; next: string; msg: string }[] = [];

  for (const rect of fContainers) {
    const inner = fTexts.filter(t => textInRect(t, rect));
    if (inner.length === 1) {
      const t = inner[0];
      const ey = vcY1(rect.y, rect.h, t.fs);
      if (Math.abs(t.y - ey) > VCENTER_TOL) {
        pending.push({ idx: t.idx, old: t.el, next: setAttr(t.el, "y", String(ey)), msg: `文字「${t.content.slice(0, 6)}」y=${t.y}→${ey}（垂直置中）` });
      }
    } else if (inner.length === 2) {
      const [a, b] = [...inner].sort((x, y) => x.y - y.y);
      const gap = b.y - a.y;
      const ey = vcY2(rect.y, rect.h, a.fs, b.fs, gap);
      if (Math.abs(a.y - ey) > VCENTER_TOL) {
        const ey2 = ey + gap;
        pending.push({ idx: a.idx, old: a.el, next: setAttr(a.el, "y", String(ey)), msg: `雙行「${a.content.slice(0, 6)}」y=${a.y}→${ey}（垂直置中）` });
        pending.push({ idx: b.idx, old: b.el, next: setAttr(b.el, "y", String(ey2)), msg: "" });
      }
    }
  }

  // 從字串尾端往頭替換，確保索引不受前方替換影響
  pending.sort((a, b) => b.idx - a.idx);
  for (const p of pending) {
    out = replaceAt(out, p.idx, p.old, p.next);
    if (p.msg) fixes.push(p.msg);
  }

  // ── 8. 補 width / height（從 viewBox 提取）─────────────────────────────────
  {
    const rootNow = svgRootAttrs(out);
    const vb = attr(rootNow, "viewBox");
    const hasW = attr(rootNow, "width") !== null;
    const hasH = attr(rootNow, "height") !== null;
    if (vb && (!hasW || !hasH)) {
      const parts = vb.trim().split(/\s+/);
      if (parts.length === 4) {
        const [,, vbW, vbH] = parts;
        out = out.replace(/<svg([^>]*)>/, (match, attrs) => {
          let a = attrs;
          if (!hasW) a += ` width="${vbW}"`;
          if (!hasH) a += ` height="${vbH}"`;
          return `<svg${a}>`;
        });
        fixes.push(`補上 width="${vbW}" height="${vbH}"（來自 viewBox）`);
      }
    }
  }

  // ── 9. 補背景 rect fill="#f0efe8" ──────────────────────────────────────────
  if (!/<rect[^>]*fill="#f0efe8"/.test(out) && !/<rect[^>]*fill='#f0efe8'/.test(out)) {
    const rootNow2 = svgRootAttrs(out);
    const bgW = attr(rootNow2, "width") ?? "800";
    const bgH = attr(rootNow2, "height") ?? "500";
    out = out.replace(/(<svg[^>]*>)/, `$1\n  <rect width="${bgW}" height="${bgH}" fill="#f0efe8"/>`);
    fixes.push("補上背景 rect fill=\"#f0efe8\"");
  }

  // ── 10. 補浮水印 ─────────────────────────────────────────────────────────────
  if (!/報告汪[^<]*reportwang/.test(out)) {
    const rootNow3 = svgRootAttrs(out);
    const isCoverNow = attr(rootNow3, "width") === "1200";
    const wmX = isCoverNow ? 1140 : 760;
    const wmY = isCoverNow ? 590 : 480;
    const wmFs = isCoverNow ? 24 : 16;
    const wmColor = isCoverNow ? "#c4bfb8" : "#d97706";
    const wmLine = `  <text x="${wmX}" y="${wmY}" font-size="${wmFs}" fill="${wmColor}" text-anchor="end">報告汪 reportwang.com</text>\n`;
    out = out.replace(/<\/svg>/, `${wmLine}</svg>`);
    fixes.push("補上品牌浮水印「報告汪 reportwang.com」");
  }

  // ── 11. 字級 < 14px → 14px ──────────────────────────────────────────────────
  {
    let smallFontFixed = false;
    out = out.replace(/font-size="(\d+(?:\.\d+)?)"/g, (match, size) => {
      if (parseFloat(size) < 14) {
        smallFontFixed = true;
        return 'font-size="14"';
      }
      return match;
    });
    if (smallFontFixed) fixes.push("字級 < 14px 改為 14px");
  }

  // ── 12. R 說明文（x=100 fill=#57534e）font-size → 16px ──────────────────────
  {
    let rFontFixed = false;
    // 處理 x="100" 在 fill="#57534e" 之前的情況
    out = out.replace(/<text([^>]*)x="100"([^>]*)fill="#57534e"([^>]*)>/g, (match) => {
      if (/font-weight="700"/.test(match)) return match; // Q 標題不改
      const fs = attr(match, "font-size");
      if (fs && fs !== "16") {
        rFontFixed = true;
        return setAttr(match, "font-size", "16");
      }
      return match;
    });
    // 處理 fill="#57534e" 在 x="100" 之前的情況
    out = out.replace(/<text([^>]*)fill="#57534e"([^>]*)x="100"([^>]*)>/g, (match) => {
      if (/font-weight="700"/.test(match)) return match;
      const fs = attr(match, "font-size");
      if (fs && fs !== "16") {
        rFontFixed = true;
        return setAttr(match, "font-size", "16");
      }
      return match;
    });
    if (rFontFixed) fixes.push("R 說明文 font-size → 16px");
  }

  // ── 13. Emoji / Unicode 符號替換（僅替換 <text> 內容）──────────────────────
  {
    let emojiFixed = false;
    out = out.replace(/(<text[^>]*>)([\s\S]*?)(<\/text>)/g, (match, open, content, close) => {
      // 只跳過真正的浮水印元素（同時包含「報告汪」和「reportwang.com」）
      if (content.includes("reportwang.com")) return match;
      let fixed2 = content;
      // 常見箭頭與方向符號
      fixed2 = fixed2.replace(/\u2192/g, "-");  // → (U+2192)
      fixed2 = fixed2.replace(/\u2190/g, "-");  // ← (U+2190)
      fixed2 = fixed2.replace(/\u2193/g, "|");  // ↓ (U+2193)
      fixed2 = fixed2.replace(/\u21B3/g, "|_"); // ↳ (U+21B3)
      fixed2 = fixed2.replace(/→/g, "-");
      fixed2 = fixed2.replace(/←/g, "-");
      fixed2 = fixed2.replace(/↓/g, "|");
      fixed2 = fixed2.replace(/↳/g, "|_");
      // 方框與勾選
      fixed2 = fixed2.replace(/\u25A1/g, "[ ]"); // □ (U+25A1 White Square)
      fixed2 = fixed2.replace(/\u2610/g, "[ ]"); // ☐ (U+2610 Ballot Box)
      fixed2 = fixed2.replace(/[□☐]/g, "[ ]");
      fixed2 = fixed2.replace(/\u2713/g, "[v]"); // ✓ (U+2713)
      fixed2 = fixed2.replace(/\u2714/g, "[v]"); // ✔ (U+2714)
      fixed2 = fixed2.replace(/\u2611/g, "[v]"); // ☑ (U+2611)
      fixed2 = fixed2.replace(/[✓✔☑]/g, "[v]");
      fixed2 = fixed2.replace(/[✗✘❌]/g, "[x]");
      fixed2 = fixed2.replace(/[✅]/g, "[v]");
      fixed2 = fixed2.replace(/[○●◎]/g, "");
      fixed2 = fixed2.replace(/[▶▸►]/g, ">");
      fixed2 = fixed2.replace(/[◆◇]/g, "*");
      fixed2 = fixed2.replace(/[★☆✦]/g, "*");
      fixed2 = fixed2.replace(/[▼▽]/g, "v");
      fixed2 = fixed2.replace(/[△▲]/g, "^");
      fixed2 = fixed2.replace(/[▪▫]/g, "-");
      fixed2 = fixed2.replace(/⚠/g, "(!)");
      fixed2 = fixed2.replace(/[①②③④⑤⑥⑦⑧⑨⑩]/g, (c) => {
        const n = "①②③④⑤⑥⑦⑧⑨⑩".indexOf(c) + 1;
        return String(n);
      });
      fixed2 = fixed2.replace(/≤/g, "<=");
      fixed2 = fixed2.replace(/≥/g, ">=");
      fixed2 = fixed2.replace(/─/g, "-");
      // Miscellaneous Technical（U+2300~U+23FF）
      fixed2 = fixed2.replace(/[\u2300-\u23FF]/g, "");
      // Miscellaneous Symbols（U+2600~U+26FF）
      fixed2 = fixed2.replace(/[\u2600-\u26FF]/g, "");
      // Dingbats（U+2700~U+27BF）
      fixed2 = fixed2.replace(/[\u2700-\u27BF]/g, "");
      // Emoji（U+1F000~U+1FFFF）
      fixed2 = fixed2.replace(/[\u{1F000}-\u{1FFFF}]/gu, "");
      // 清理連續空白
      fixed2 = fixed2.replace(/  +/g, " ").trim();
      if (fixed2 !== content.replace(/  +/g, " ").trim()) {
        emojiFixed = true;
        return `${open}${fixed2}${close}`;
      }
      return match;
    });
    if (emojiFixed) fixes.push("Emoji/Unicode 符號替換為純文字");
  }

  // ── 14. Row rect fill 錯誤修正（stroke=#e8e6de 應為 fill=white）────────────
  {
    let rowFillFixed = false;
    out = out.replace(/<rect([^>]+)stroke="#e8e6de"([^>]*)>/g, (match) => {
      const fill = attr(match, "fill");
      if (fill && fill !== "white" && fill !== "#ffffff") {
        rowFillFixed = true;
        return setAttr(match, "fill", "white");
      }
      return match;
    });
    if (rowFillFixed) fixes.push("Row rect fill → white");
  }

  // ── 15. 色彩順序修正（左色條依 y 排序後重新指定 ROW_COLORS）──────────────────
  {
    // 語義色：不強制換色（這些是故意用於特定分類的顏色）
    const SEMANTIC_COLORS = ["#2563eb", "#16a34a", "#ea580c", "#9333ea", "#0d9488", "#4f46e5"];

    // 收集所有左色條（width=6, rx=2）的位置與顏色
    // 用 attr() 檢查而非 regex 屬性順序，避免因工具輸出順序不同而漏掉
    const allBarMatches: { idx: number; el: string; y: number; fill: string }[] = [];
    for (const m of out.matchAll(/<rect([^>]*)>/g)) {
      const el = m[0];
      if (attr(el, "width") !== "6" || attr(el, "rx") !== "2") continue;
      const fill = attr(el, "fill") ?? "";
      if (!fill) continue;
      // 遇到語義色（醫院/精神科等刻意用色）→ 跳過整個 SVG 的色彩重排
      if (SEMANTIC_COLORS.includes(fill)) { allBarMatches.length = 0; break; }
      const y = parseFloat(attr(el, "y") ?? "0");
      allBarMatches.push({ idx: m.index!, el, y, fill });
    }
    allBarMatches.sort((a, b) => a.y - b.y);
    const N = allBarMatches.length;

    if (N >= 3 && N <= 6) {
      // list template 左色條一律使用大地色系順序
      const expectedColors = ROW_COLORS.slice(0, N);
      const wrongOrder = allBarMatches.some((b, i) => b.fill !== expectedColors[i]);
      if (wrongOrder) {
        const reversed = [...allBarMatches].reverse();
        for (let i = 0; i < reversed.length; i++) {
          const b = reversed[i];
          const correctIdx = N - 1 - i;
          const newEl = setAttr(b.el, "fill", expectedColors[correctIdx]);
          if (newEl !== b.el) {
            out = replaceAt(out, b.idx, b.el, newEl);
          }
        }
        fixes.push(`色彩順序修正（${N} 個左色條 → 大地色系）`);
      }
    }
  }

  // 去重 fixes 訊息
  const uniqueFixes = [...new Set(fixes)];

  return { result: out, fixes: uniqueFixes };
}

// ─── XML Well-formedness 檢查 ────────────────────────────────────────────────

/** 取得字串 idx 位置的行號（用於錯誤訊息） */
function svgLineOf(svg: string, idx: number): number {
  return svg.slice(0, idx).split("\n").length;
}

/** 找出標籤 <...> 的結束 > 位置，正確跳過屬性中的引號 */
function findTagEnd(svg: string, start: number): number {
  let i = start + 1;
  while (i < svg.length) {
    const c = svg[i];
    if (c === '"' || c === "'") {
      const q = c; i++;
      while (i < svg.length && svg[i] !== q) i++;
      if (i < svg.length) i++;
    } else if (c === ">") {
      return i;
    } else {
      i++;
    }
  }
  return -1;
}

/** 屬性字串解析：檢查屬性值必須加引號、不得重複 */
function checkXmlAttributes(attrStr: string, tag: string, line: number, out: CheckResult[]): void {
  const s = attrStr.trim();
  if (!s) return;

  const seen = new Set<string>();
  let i = 0;

  while (i < s.length) {
    // 跳過空白
    while (i < s.length && /\s/.test(s[i])) i++;
    if (i >= s.length) break;

    // 讀屬性名稱（到 = / > / 空白為止）
    const nameStart = i;
    while (i < s.length && !/[\s=/>]/.test(s[i])) i++;
    const attrName = s.slice(nameStart, i);
    if (!attrName) { i++; continue; }

    // 跳過空白
    while (i < s.length && /\s/.test(s[i])) i++;

    if (i >= s.length || s[i] !== "=") {
      // XML 不允許無值的布林屬性
      out.push(fail(`<${tag}> 屬性 "${attrName}" 缺少值（XML 要求所有屬性必須有值）（行 ${line}）`));
      continue;
    }

    i++; // 跳過 '='
    while (i < s.length && /\s/.test(s[i])) i++;

    if (i >= s.length) {
      out.push(fail(`<${tag}> 屬性 "${attrName}" 缺少值（行 ${line}）`));
      break;
    }

    const q = s[i];
    if (q !== '"' && q !== "'") {
      // 屬性值未加引號
      out.push(fail(`<${tag}> 屬性 "${attrName}" 的值未加引號（XML 要求用 " 或 ' 包覆）（行 ${line}）`));
      // 跳到空白或結尾
      while (i < s.length && !/\s/.test(s[i])) i++;
    } else {
      i++; // 跳過開頭引號
      while (i < s.length && s[i] !== q) i++;
      if (i >= s.length) {
        out.push(fail(`<${tag}> 屬性 "${attrName}" 的引號未閉合（行 ${line}）`));
        break;
      }
      i++; // 跳過結尾引號
    }

    // 重複屬性
    if (seen.has(attrName)) {
      out.push(fail(`<${tag}> 重複屬性 "${attrName}"（行 ${line}）`));
    }
    seen.add(attrName);
  }
}

/** 文字節點：偵測未跳脫的裸 & */
function checkXmlTextEntities(text: string, line: number, out: CheckResult[]): void {
  // 合法實體：&amp; &lt; &gt; &quot; &apos; &#NNN; &#xHH;
  const bareAmp = /&(?!amp;|lt;|gt;|quot;|apos;|#[0-9]+;|#x[0-9A-Fa-f]+;)/g;
  const m = bareAmp.exec(text);
  if (m) {
    const preview = text.slice(m.index, m.index + 20).replace(/\n/g, "\\n");
    out.push(fail(`文字內容含未跳脫的 "&"，應改為 "&amp;"（行 ${line}）：「${preview}」`));
  }
}

/** 主要 XML well-formedness 驗證 */
function checkWellFormed(svg: string): CheckResult[] {
  const out: CheckResult[] = [];
  const stack: { name: string; line: number }[] = [];
  let pos = 0;
  let rootSeen = false;

  while (pos < svg.length) {
    // ── 非 < 開頭：文字節點 ──────────────────────────────────────────────────
    if (svg[pos] !== "<") {
      const next = svg.indexOf("<", pos);
      const end = next >= 0 ? next : svg.length;
      checkXmlTextEntities(svg.slice(pos, end), svgLineOf(svg, pos), out);
      pos = end;
      continue;
    }

    const ln = svgLineOf(svg, pos);

    // ── XML 宣告 / 處理指令 <?...?> ──────────────────────────────────────────
    if (svg.startsWith("<?", pos)) {
      const end = svg.indexOf("?>", pos + 2);
      if (end < 0) {
        out.push(fail(`未閉合的 XML 處理指令 <?（行 ${ln}）`));
        break;
      }
      const piContent = svg.slice(pos + 2, end);
      if (/^xml\b/i.test(piContent.trim()) && svg.slice(0, pos).trim().length > 0) {
        out.push(fail(`<?xml?> 宣告必須位於檔案最前段（行 ${ln}）`));
      }
      pos = end + 2;
      continue;
    }

    // ── 註解 <!--...-->(─────────────────────────────────────────────────────
    if (svg.startsWith("<!--", pos)) {
      const end = svg.indexOf("-->", pos + 4);
      if (end < 0) {
        out.push(fail(`未閉合的 XML 註解 <!--（行 ${ln}）`));
        break;
      }
      const content = svg.slice(pos + 4, end);
      if (content.includes("--")) {
        out.push(fail(`XML 註解內容含 "--"，違反 XML 規範（行 ${ln}）`));
      }
      pos = end + 3;
      continue;
    }

    // ── CDATA <![CDATA[...]]> ─────────────────────────────────────────────────
    if (svg.startsWith("<![CDATA[", pos)) {
      const end = svg.indexOf("]]>", pos + 9);
      if (end < 0) {
        out.push(fail(`未閉合的 CDATA 區塊（行 ${ln}）`));
        break;
      }
      pos = end + 3;
      continue;
    }

    // ── DOCTYPE 或其他 <!...> 宣告（跳過不報錯）────────────────────────────
    if (svg.startsWith("<!", pos)) {
      const end = svg.indexOf(">", pos);
      if (end < 0) {
        out.push(fail(`未閉合的標記宣告 <!（行 ${ln}）`));
        break;
      }
      pos = end + 1;
      continue;
    }

    // ── 結束標籤 </tag> ──────────────────────────────────────────────────────
    if (svg.startsWith("</", pos)) {
      const end = svg.indexOf(">", pos);
      if (end < 0) {
        out.push(fail(`未閉合的結束標籤（行 ${ln}）`));
        break;
      }
      const inner = svg.slice(pos + 2, end).trim();
      const nameMatch = inner.match(/^([A-Za-z_:][\w.\-:]*)\s*$/);
      if (!nameMatch) {
        out.push(fail(`結束標籤語法無效：</${inner}>（行 ${ln}）`));
      } else {
        const name = nameMatch[1];
        const top = stack.pop();
        if (!top) {
          out.push(fail(`</${name}> 沒有對應的開始標籤（行 ${ln}）`));
        } else if (top.name !== name) {
          out.push(fail(`</${name}>（行 ${ln}）與 <${top.name}>（行 ${top.line}）不匹配，標籤嵌套錯誤`));
        }
      }
      pos = end + 1;
      continue;
    }

    // ── 開始標籤或自閉合標籤 <tag .../> ─────────────────────────────────────
    {
      const end = findTagEnd(svg, pos);
      if (end < 0) {
        out.push(fail(`未閉合的開始標籤（行 ${ln}）`));
        break;
      }
      const tagFull = svg.slice(pos, end + 1);
      const selfClose = svg[end - 1] === "/";

      const nameMatch = tagFull.match(/^<([A-Za-z_:][\w.\-:]*)/);
      if (!nameMatch) {
        out.push(fail(`無效的標籤語法（行 ${ln}）：${tagFull.slice(0, 40)}`));
        pos = end + 1;
        continue;
      }
      const name = nameMatch[1];

      // 提取屬性字串（去除 < tagName 前綴與 > 或 /> 後綴）
      const attrStr = selfClose
        ? tagFull.slice(nameMatch[0].length, -2)
        : tagFull.slice(nameMatch[0].length, -1);

      checkXmlAttributes(attrStr, name, ln, out);

      // 根元素必須是 <svg>
      if (!rootSeen) {
        if (name !== "svg") {
          out.push(fail(`根元素應為 <svg>，實際為 <${name}>（行 ${ln}）`));
        }
        rootSeen = true;
      } else if (stack.length === 0 && !selfClose) {
        // 頂層已有 root，又出現非自閉合頂層元素
        out.push(fail(`偵測到第二個根元素 <${name}>（行 ${ln}）`));
      }

      if (!selfClose) {
        stack.push({ name, line: ln });
      }

      pos = end + 1;
    }
  }

  // 結束時 stack 必須清空（所有開始標籤都要有對應結束標籤）
  for (const open of stack) {
    out.push(fail(`未閉合標籤 <${open.name}>（行 ${open.line}）`));
  }

  if (out.length === 0) {
    out.push(pass("XML well-formed"));
  }
  return out;
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

  // ── 0.5. XML well-formedness（破損 XML 先攔下） ────────────────────────────
  results.push(...checkWellFormed(svg));
  // 不 early return：仍跑後續風格檢查，讓使用者一次看到所有問題

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

  // ── 3. 文字垂直置中 ─────────────────────────────────────────────────────────
  validateVerticalCenter(svg, results);

  return { file: filePath, results };
}

/** 驗證所有容器內文字是否垂直置中 */
function validateVerticalCenter(svg: string, results: CheckResult[]) {
  const svgW = parseFloat(attr(svgRootAttrs(svg), "width") ?? "800");
  const containers = parseContainers(svg, svgW);
  const texts = parseTexts(svg);
  const issues: string[] = [];

  for (const rect of containers) {
    const inner = texts.filter(t => textInRect(t, rect));
    if (inner.length === 1) {
      const t = inner[0];
      const ey = vcY1(rect.y, rect.h, t.fs);
      if (Math.abs(t.y - ey) > VCENTER_TOL) {
        issues.push(`「${t.content.slice(0, 8)}」y=${t.y}（預期 ${ey}，容器 y=${rect.y} h=${rect.h}）`);
      }
    } else if (inner.length === 2) {
      const [a, b] = [...inner].sort((x, y) => x.y - y.y);
      const gap = b.y - a.y;
      const ey = vcY2(rect.y, rect.h, a.fs, b.fs, gap);
      if (Math.abs(a.y - ey) > VCENTER_TOL) {
        issues.push(`雙行「${a.content.slice(0, 8)}」title_y=${a.y}（預期 ${ey}，容器 y=${rect.y} h=${rect.h}）`);
      }
    }
  }

  if (issues.length === 0) {
    results.push(pass("文字垂直置中正確"));
  } else {
    for (const issue of issues) {
      results.push(fail(`文字未垂直置中：${issue}`));
    }
  }
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
  // 只檢查深色 ROW_COLORS fill 的 circle，淺色 fill 不在此限
  // @template: timeline 的 SVG 圓圈應為實心，跳過此檢查
  if (isTimeline(svg)) {
    results.push(pass("Circle（timeline 模板，實心圓正確）"));
  } else {
    const circles = [...svg.matchAll(/<circle[^>]+>/g)];
    const darkCircles = circles.filter(m => {
      const fill = attr(m[0], "fill");
      return fill && ROW_COLORS.includes(fill);
    });
    const solidCircles = darkCircles.filter(m => {
      const el = m[0];
      const op = attr(el, "opacity");
      return op === null || parseFloat(op) >= 0.5;
    });
    if (solidCircles.length === 0) {
      results.push(pass("Circle opacity=0.15（深色圓已設透明度）"));
    } else {
      results.push(fail(`${solidCircles.length} 個深色 Circle 未設 opacity=0.15（舊式實心圓）`));
    }
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
  // 掃描有 fill 且符合 ROW_COLORS 的左色條
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
