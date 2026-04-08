// Instagram 輪播圖生成系統 — SVG 模板函式
// 尺寸：1080x1350px（4:5 直式），對齊 blog SVG 視覺風格

import type { CarouselArticleData, DeficiencyItem } from "./carousel-types";

// ─── 設計 Token（對齊 blog SVG 大地色系）────────────────────────────────────
const C = {
  bg: "#f0efe8",        // blog 暖米黃背景
  panel: "#e8e4dc",     // blog 表頭背景
  divider: "#dedad3",   // blog 分隔線
  cardBorder: "#e8e6de", // blog 卡片邊框
  cardBg: "#ffffff",    // 卡片底色
  primary: "#d97706",   // blog 琥珀色（amber-600）主色
  accent: "#78716c",    // blog 暖灰（stone-500）次強調
  title: "#1e293b",     // blog 標題色
  content: "#57534e",   // blog 內文色（stone-600）
  muted: "#a8a29e",     // blog stone-400 次要文字
  watermark: "#c4bfb8", // blog 浮水印色
};

// blog SVG 大地色系順序（5 項循環）
const STEP_COLORS = [
  { main: "#d97706", bg: "#fef3c7" }, // 琥珀（amber-600）
  { main: "#78716c", bg: "#f5f5f4" }, // 暖灰（stone-500）
  { main: "#57534e", bg: "#f5f0eb" }, // 深棕（stone-600）
  { main: "#a8a29e", bg: "#f5f5f4" }, // 淺灰（stone-400）
  { main: "#94a3b8", bg: "#f1f5f9" }, // 藍灰（slate-400）
];

function stepColor(rank: number) {
  return STEP_COLORS[(rank - 1) % STEP_COLORS.length];
}

/** 截斷文字至 max 個字元，超出加省略號 */
function truncate(text: string, max = 28): string {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

// ─── 共用元件 ────────────────────────────────────────────────────────────────

/** 浮水印（右下角） */
function watermark(): string {
  return `<text x="1050" y="1320" font-size="24" fill="${C.watermark}" text-anchor="end" font-weight="400">報告汪 reportwang.com</text>`;
}

/** SVG 外框（全部用 Noto Sans TC，不混 Serif） */
function svgWrap(content: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" font-family="'Noto Sans TC', sans-serif">
  <rect width="1080" height="1350" fill="${C.bg}"/>
  ${content}
  ${watermark()}
</svg>`;
}

/** 置中標題 + 分隔線（取代舊的 sectionHeader 色條） */
function slideTitle(title: string, subtitle?: string): string {
  const subSvg = subtitle
    ? `<text x="540" y="80" font-size="30" fill="${C.content}" text-anchor="middle">${subtitle}</text>`
    : "";
  const divY = subtitle ? 100 : 72;
  return `
  <text x="540" y="52" font-size="56" font-weight="700" fill="${C.title}" text-anchor="middle">${title}</text>
  ${subSvg}
  <line x1="60" y1="${divY}" x2="1020" y2="${divY}" stroke="${C.divider}" stroke-width="1"/>`;
}

/** 純文字編號「1.」（取代舊的 rankCircle） */
function rankNumber(x: number, y: number, rank: number, color: string): string {
  return `<text x="${x}" y="${y}" font-size="36" font-weight="700" fill="${color}">${rank}.</text>`;
}

/** Blog 風格卡片（頂部色條 + 白底 + 邊框） */
function blogCard(x: number, y: number, w: number, h: number, color: string): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="white" stroke="${C.cardBorder}" stroke-width="1"/>
  <rect x="${x}" y="${y}" width="${w}" height="8" rx="4" fill="${color}"/>
  <rect x="${x}" y="${y + 4}" width="${w}" height="4" fill="${color}"/>`;
}

// ─── Slide 1：封面 ────────────────────────────────────────────────────────────

export function renderCoverSlide(data: CarouselArticleData): string {
  const [line1, line2] = data.title.split("\n");
  const panelY = 960;

  // 最多 3 個 tag pill
  const tagPills = data.tags.slice(0, 3).map((tag, i) => {
    const color = STEP_COLORS[i].main;
    return `
    <rect x="${60 + i * 200}" y="620" width="180" height="52" rx="26" fill="${color}" opacity="0.13"/>
    <text x="${60 + i * 200 + 90}" y="653" font-size="28" fill="${color}" text-anchor="middle" font-weight="600">${tag}</text>`;
  }).join("\n");

  return svgWrap(`
  <!-- 分類 pill -->
  <rect x="60" y="60" width="160" height="52" rx="26" fill="${C.primary}" opacity="0.13"/>
  <text x="140" y="93" font-size="28" fill="${C.primary}" text-anchor="middle" font-weight="700">${data.category}</text>

  <!-- 主標題：行1 深色、行2 琥珀 -->
  <text x="60" y="240" font-size="100" font-weight="900" fill="${C.title}">${line1 ?? ""}</text>
  <text x="60" y="360" font-size="100" font-weight="900" fill="${C.primary}">${line2 ?? ""}</text>

  <!-- 分隔線 -->
  <line x1="60" y1="400" x2="1020" y2="400" stroke="${C.divider}" stroke-width="2"/>

  <!-- 副標題 -->
  <text x="60" y="460" font-size="36" fill="${C.content}" font-weight="400">${data.subtitle}</text>

  <!-- 適用對象 -->
  <text x="60" y="510" font-size="30" fill="${C.muted}">${data.audience}</text>

  <!-- Tag pills -->
  ${tagPills}

  <!-- 底部裝飾 panel -->
  <rect x="0" y="${panelY}" width="1080" height="390" fill="${C.panel}"/>

  <!-- 大數字裝飾（琥珀，低透明） -->
  <text x="840" y="${panelY + 210}" font-size="280" font-weight="900" fill="${C.primary}" text-anchor="middle" opacity="0.15">${data.highlightNumber}</text>
  <text x="840" y="${panelY + 250}" font-size="30" fill="${C.primary}" text-anchor="middle" font-weight="600" opacity="0.5">${data.highlightLabel}</text>

  <!-- 2 張 info card -->
  ${blogCard(80, panelY + 40, 440, 100, C.primary)}
  <text x="300" y="${panelY + 85}" font-size="30" fill="${C.title}" text-anchor="middle" font-weight="700">前 5 項深度解析</text>
  <text x="300" y="${panelY + 120}" font-size="24" fill="${C.muted}" text-anchor="middle">常見缺失原因 + 解法情境</text>

  ${blogCard(80, panelY + 160, 440, 100, C.accent)}
  <text x="300" y="${panelY + 205}" font-size="30" fill="${C.title}" text-anchor="middle" font-weight="700">後 5 項快速補強</text>
  <text x="300" y="${panelY + 240}" font-size="24" fill="${C.muted}" text-anchor="middle">多年度真實扣分紀錄</text>

  <!-- 底部標語 -->
  <text x="540" y="${panelY + 330}" font-size="28" fill="${C.primary}" text-anchor="middle" font-weight="600">評鑑前必看整合指南</text>
  `);
}

// ─── Slides 2-3：5 項總覽（單欄）────────────────────────────────────────────

export function renderOverviewSlide(items: DeficiencyItem[], label: string): string {
  const CARD_H = 160;
  const CARD_GAP = 20;
  const START_Y = 130;

  const cards = items.map((item, i) => {
    const y = START_Y + i * (CARD_H + CARD_GAP);
    const color = stepColor(item.rank).main;

    return `
    <!-- 項目 #${item.rank} -->
    ${blogCard(60, y, 960, CARD_H, color)}
    ${rankNumber(92, y + 68, item.rank, color)}
    <text x="148" y="${y + 60}" font-size="36" font-weight="700" fill="${C.title}">${item.title}</text>
    <text x="148" y="${y + 100}" font-size="28" fill="${C.content}">${item.articleRef}・負責：${item.responsible}</text>
    <text x="148" y="${y + 135}" font-size="24" fill="${C.muted}">${truncate(item.shortDesc)}</text>
    `;
  });

  return svgWrap(`
  ${slideTitle("10 大常見缺失", label)}
  ${cards.join("")}
  <line x1="60" y1="1240" x2="1020" y2="1240" stroke="${C.divider}" stroke-width="1"/>
  <text x="540" y="1290" font-size="28" fill="${C.primary}" text-anchor="middle" font-weight="600">左右滑動查看詳細說明 →</text>
  `);
}

// ─── Slides 4-7：缺失詳解（每張 2-3 項）────────────────────────────────────

export function renderDetailSlide(items: DeficiencyItem[], slideLabel: string): string {
  const count = items.length;
  // 3 項：card h=320；2 項：card h=470
  const CARD_H = count <= 2 ? 470 : 320;
  const CARD_GAP = 28;
  const START_Y = 130;

  const cards = items.map((item, i) => {
    const y = START_Y + i * (CARD_H + CARD_GAP);
    const color = stepColor(item.rank).main;

    // 說明文字：每行最多約 28 個中文字，拆最多 2 行
    const desc = item.shortDesc;
    const line1 = truncate(desc);
    const line2 = desc.length > 28 ? truncate(desc.slice(28), 28) : "";
    const line1Y = count <= 2 ? y + 200 : y + 175;
    const line2Y = line1Y + 40;
    const responsibleY = count <= 2 ? y + 290 : y + 255;
    const titleY = count <= 2 ? y + 140 : y + 120;
    const divY = count <= 2 ? y + 160 : y + 140;
    const headerY = count <= 2 ? y + 80 : y + 68;

    return `
    <!-- 缺失 #${item.rank} -->
    ${blogCard(60, y, 960, CARD_H, color)}
    <text x="92" y="${headerY}" font-size="30" font-weight="700" fill="${color}">${item.rank}. ${item.articleRef}</text>
    <text x="92" y="${titleY}" font-size="42" font-weight="700" fill="${C.title}">${item.title}</text>
    <line x1="92" y1="${divY}" x2="988" y2="${divY}" stroke="${C.divider}" stroke-width="1"/>
    <text x="92" y="${line1Y}" font-size="30" fill="${C.content}">${line1}</text>
    ${line2 ? `<text x="92" y="${line2Y}" font-size="30" fill="${C.content}">${line2}</text>` : ""}
    <rect x="92" y="${responsibleY}" width="220" height="44" rx="22" fill="${color}" opacity="0.13"/>
    <text x="202" y="${responsibleY + 30}" font-size="24" fill="${color}" text-anchor="middle" font-weight="600">負責：${item.responsible}</text>
    `;
  });

  return svgWrap(`
  ${slideTitle("常見缺失詳解", slideLabel)}
  ${cards.join("")}
  <line x1="60" y1="1240" x2="1020" y2="1240" stroke="${C.divider}" stroke-width="1"/>
  <text x="540" y="1290" font-size="28" fill="${C.primary}" text-anchor="middle" font-weight="600">完整文章含快速解法 → reportwang.com/blog</text>
  `);
}

// ─── Slides 8-9：自查清單（單欄 5 項）──────────────────────────────────────

export function renderChecklistSlide(items: string[], label: string): string {
  const ROW_H = 120;
  const START_Y = 150;
  const BOX = 44;

  function checkRow(y: number, text: string, checked: boolean, color: string) {
    const checkmark = checked
      ? `<path d="M${80 + 8},${y + BOX / 2} L${80 + 16},${y + BOX / 2 + 10} L${80 + 34},${y + BOX / 2 - 10}" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`
      : "";
    return `
    <rect x="80" y="${y}" width="${BOX}" height="${BOX}" rx="8" fill="${C.bg}" stroke="${C.muted}" stroke-width="1.5"/>
    ${checkmark}
    <text x="${80 + BOX + 24}" y="${y + BOX * 0.72}" font-size="32" fill="${C.title}">${text}</text>`;
  }

  const CHECKED_IDX = 1; // 第 2 項預設勾選（示範）
  const checkedColor = STEP_COLORS[CHECKED_IDX % STEP_COLORS.length].main;

  const rows = items.map((text, i) => {
    const y = START_Y + i * ROW_H;
    const color = STEP_COLORS[i % STEP_COLORS.length].main;
    return checkRow(y, text, i === CHECKED_IDX, color);
  });

  return svgWrap(`
  ${slideTitle("評鑑前自查清單", label)}
  ${rows.join("")}
  <line x1="60" y1="1200" x2="1020" y2="1200" stroke="${C.divider}" stroke-width="1"/>

  <!-- 圖例說明 -->
  <rect x="80" y="1225" width="${BOX}" height="${BOX}" rx="8" fill="${C.bg}" stroke="${C.muted}" stroke-width="1.5"/>
  <path d="M${80 + 8},${1225 + BOX / 2} L${80 + 16},${1225 + BOX / 2 + 10} L${80 + 34},${1225 + BOX / 2 - 10}" fill="none" stroke="${checkedColor}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="${80 + BOX + 24}" y="${1225 + BOX * 0.72}" font-size="28" fill="${C.content}">已確認</text>
  <rect x="340" y="1225" width="${BOX}" height="${BOX}" rx="8" fill="none" stroke="${C.muted}" stroke-width="1.5"/>
  <text x="${340 + BOX + 24}" y="${1225 + BOX * 0.72}" font-size="28" fill="${C.content}">待確認</text>

  <text x="540" y="1310" font-size="28" fill="${C.primary}" text-anchor="middle" font-weight="600">評鑑前逐項確認，避免扣分！</text>
  `);
}

// ─── Slide 10：CTA ───────────────────────────────────────────────────────────

export function renderCtaSlide(data: CarouselArticleData): string {
  return svgWrap(`
  <!-- 頂部暖色 panel -->
  <rect x="0" y="0" width="1080" height="420" fill="${C.panel}"/>

  <!-- 主標語 -->
  <text x="540" y="150" font-size="64" font-weight="900" fill="${C.title}" text-anchor="middle">備考不再迷茫</text>
  <text x="540" y="240" font-size="64" font-weight="900" fill="${C.primary}" text-anchor="middle">讓 AI 幫你比對</text>
  <text x="540" y="310" font-size="32" fill="${C.content}" text-anchor="middle">評鑑基準 × 你的機構文件</text>
  <text x="540" y="360" font-size="30" fill="${C.content}" text-anchor="middle">自動找出缺漏、補強重點</text>

  <!-- 分隔線 -->
  <line x1="80" y1="445" x2="1000" y2="445" stroke="${C.divider}" stroke-width="2"/>

  <!-- 完整文章 card -->
  ${blogCard(60, 475, 960, 150, C.primary)}
  <text x="96" y="528" font-size="36" font-weight="700" fill="${C.title}">完整文章</text>
  <text x="96" y="572" font-size="28" fill="${C.content}">${data.blogUrl}</text>
  <text x="96" y="607" font-size="24" fill="${C.muted}">含 10 大缺失逐條解析 + 快速解法情境</text>

  <!-- AI 工具 card -->
  ${blogCard(60, 645, 960, 150, C.accent)}
  <text x="96" y="698" font-size="36" font-weight="700" fill="${C.title}">報告汪 AI 評鑑助手</text>
  <text x="96" y="742" font-size="28" fill="${C.content}">reportwang.com</text>
  <text x="96" y="777" font-size="24" fill="${C.muted}">上傳報告 → AI 自動比對評鑑基準 → 找缺漏</text>

  <!-- 品牌區 -->
  <line x1="80" y1="840" x2="1000" y2="840" stroke="${C.divider}" stroke-width="1"/>
  <text x="540" y="940" font-size="72" font-weight="900" fill="${C.primary}" text-anchor="middle">報告汪</text>
  <text x="540" y="1000" font-size="32" fill="${C.content}" text-anchor="middle">長照機構評鑑報告管理平台</text>

  <!-- 追蹤提示 -->
  <text x="540" y="1120" font-size="40" fill="${C.title}" text-anchor="middle" font-weight="700">追蹤帳號，每週分享評鑑技巧</text>
  <text x="540" y="1175" font-size="28" fill="${C.muted}" text-anchor="middle">更多評鑑機構類型 · 陸續更新中</text>

  <!-- Tag pill -->
  <rect x="360" y="1220" width="360" height="64" rx="32" fill="${C.primary}" opacity="0.13"/>
  <text x="540" y="1261" font-size="30" fill="${C.primary}" text-anchor="middle" font-weight="600">日照評鑑備考首選</text>
  `);
}
