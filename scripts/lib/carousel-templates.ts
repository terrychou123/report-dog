// Instagram 輪播圖生成系統 — SVG 模板函式
// 尺寸：1080x1350px（4:5 直式），沿用現有部落格 SVG 風格

import type { CarouselArticleData, DeficiencyItem } from "./carousel-types";

// ─── 設計 Token（對齊 DESIGN.md 品牌色系）────────────────────────────────────
const C = {
  bg: "#faf9f6",        // DESIGN.md --background 暖米白
  panel: "#f5f0eb",     // 底部裝飾區（--secondary 暖灰）
  divider: "#e0d8cf",   // DESIGN.md --border 暖邊框
  cardBorder: "#e0d8cf",
  cardBg: "#ffffff",    // DESIGN.md --card
  primary: "#2c7a94",   // DESIGN.md --primary 深青色
  accent: "#e35b24",    // DESIGN.md --accent 赤陶橘
  title: "#302a25",     // DESIGN.md --foreground 暖深棕
  content: "#786f68",   // DESIGN.md --muted-foreground 暖灰
  light: "#a09890",     // 淡色暖灰文字
  muted: "#a09890",     // 次要暖灰文字
  warmGray: "#786f68",
  watermark: "#a09890", // 低調暖灰浮水印
};

// earth tone 順序色（10 項循環使用）
// #1 赤陶橘高亮、#2 深青色、其餘暖灰大地色調
const STEP_COLORS = [
  { main: "#e35b24", bg: "#fdf0eb" }, // 赤陶橘（最高頻缺失）
  { main: "#2c7a94", bg: "#eaf4f7" }, // 深青色
  { main: "#786f68", bg: "#f5f0eb" }, // 暖灰棕
  { main: "#a09890", bg: "#f5f5f4" }, // 淡暖灰
  { main: "#9b8370", bg: "#f7f0eb" }, // 沙棕
];

function stepColor(rank: number) {
  return STEP_COLORS[(rank - 1) % STEP_COLORS.length];
}

// ─── 共用元件 ────────────────────────────────────────────────────────────────

/** 浮水印（右下角） */
function watermark(y = 1320): string {
  return `<text x="1050" y="${y}" font-size="26" fill="${C.watermark}" text-anchor="end" font-weight="400" font-family="'Noto Sans TC', sans-serif">報告汪 reportwang.com</text>`;
}

/** SVG 外框（預設字體 Noto Sans TC，標題另行指定 Noto Serif TC） */
function svgWrap(content: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" font-family="'Noto Sans TC', sans-serif">
  <rect width="1080" height="1350" fill="${C.bg}"/>
  ${content}
  ${watermark()}
</svg>`;
}

/** Pill 標籤 */
function pill(x: number, y: number, w: number, h: number, color: string, text: string, fontSize = 28): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${color}" opacity="0.13"/>
  <text x="${x + w / 2}" y="${y + h / 2 + fontSize * 0.35}" font-size="${fontSize}" fill="${color}" text-anchor="middle" font-weight="600">${text}</text>`;
}

/** 帶左側色條的橫排區塊 header（色條用 primary 深青，標題用 Noto Serif TC） */
function sectionHeader(y: number, color: string, text: string, subText = ""): string {
  return `<rect x="0" y="${y}" width="1080" height="80" fill="${C.primary}" opacity="0.07"/>
  <rect x="0" y="${y}" width="8" height="80" rx="2" fill="${C.primary}"/>
  <text x="36" y="${y + 50}" font-size="34" font-weight="700" fill="${C.primary}" font-family="'Noto Serif TC', serif">${text}</text>
  ${subText ? `<text x="36" y="${y + 76}" font-size="22" fill="${C.content}">${subText}</text>` : ""}`;
}

/** 編號圓圈 */
function rankCircle(cx: number, cy: number, rank: number, color: string, r = 28): string {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="0.15"/>
  <text x="${cx}" y="${cy + r * 0.4}" font-size="${r * 0.9}" font-weight="900" fill="${color}" text-anchor="middle">${rank}</text>`;
}

// ─── Slide 1：封面 ────────────────────────────────────────────────────────────

export function renderCoverSlide(data: CarouselArticleData): string {
  const [line1, line2] = data.title.split("\n");

  // 右側裝飾面板（直式改為底部橫幅）
  const panelY = 980;

  // 標籤 pills
  const tagPills = data.tags.slice(0, 3).map((tag, i) => {
    const color = STEP_COLORS[i].main;
    return pill(60 + i * 180, 820, 165, 56, color, tag, 28);
  }).join("\n");

  return svgWrap(`
  <!-- 底部裝飾區 -->
  <rect x="0" y="${panelY}" width="1080" height="370" fill="${C.panel}"/>

  <!-- 大數字裝飾（調低透明度，改用深青色） -->
  <text x="840" y="${panelY + 170}" font-size="240" font-weight="900" fill="${C.primary}" text-anchor="middle" opacity="0.18" font-family="'Noto Serif TC', serif">${data.highlightNumber}</text>
  <text x="840" y="${panelY + 220}" font-size="36" fill="${C.primary}" text-anchor="middle" font-weight="600" opacity="0.5">${data.highlightLabel}</text>

  <!-- 分類 pill（深青色） -->
  <rect x="60" y="60" width="160" height="52" rx="26" fill="${C.primary}" opacity="0.12"/>
  <text x="140" y="93" font-size="28" fill="${C.primary}" text-anchor="middle" font-weight="700">${data.category}</text>

  <!-- 主標題：行1 暖深棕，行2 赤陶橘（Noto Serif TC） -->
  <text x="60" y="220" font-size="108" font-weight="900" fill="${C.title}" font-family="'Noto Serif TC', serif">${line1 ?? ""}</text>
  <text x="60" y="360" font-size="108" font-weight="900" fill="${C.accent}" font-family="'Noto Serif TC', serif">${line2 ?? ""}</text>

  <!-- 分隔線 -->
  <line x1="60" y1="400" x2="1020" y2="400" stroke="${C.divider}" stroke-width="2"/>

  <!-- 副標題 -->
  <text x="60" y="460" font-size="36" fill="${C.content}" font-weight="400">${data.subtitle}</text>

  <!-- 特色標籤列 -->
  ${tagPills}

  <!-- 適用對象 -->
  <text x="60" y="930" font-size="30" fill="${C.muted}">${data.audience}</text>

  <!-- 底部面板：4 個資訊卡 -->
  <rect x="60" y="${panelY + 30}" width="215" height="90" rx="10" fill="white" stroke="${C.cardBorder}" stroke-width="1"/>
  <text x="168" y="${panelY + 72}" font-size="30" fill="${C.primary}" text-anchor="middle" font-weight="700" font-family="'Noto Serif TC', serif">前 5 項</text>
  <text x="168" y="${panelY + 103}" font-size="22" fill="${C.muted}" text-anchor="middle">深度解析</text>

  <rect x="295" y="${panelY + 30}" width="215" height="90" rx="10" fill="white" stroke="${C.cardBorder}" stroke-width="1"/>
  <text x="403" y="${panelY + 72}" font-size="30" fill="${C.content}" text-anchor="middle" font-weight="700" font-family="'Noto Serif TC', serif">後 5 項</text>
  <text x="403" y="${panelY + 103}" font-size="22" fill="${C.muted}" text-anchor="middle">快速補強</text>

  <rect x="530" y="${panelY + 30}" width="215" height="90" rx="10" fill="white" stroke="${C.cardBorder}" stroke-width="1"/>
  <text x="638" y="${panelY + 72}" font-size="30" fill="${C.content}" text-anchor="middle" font-weight="700" font-family="'Noto Serif TC', serif">多年度</text>
  <text x="638" y="${panelY + 103}" font-size="22" fill="${C.muted}" text-anchor="middle">真實扣分紀錄</text>

  <rect x="765" y="${panelY + 30}" width="215" height="90" rx="10" fill="white" stroke="${C.cardBorder}" stroke-width="1"/>
  <text x="873" y="${panelY + 72}" font-size="30" fill="${C.accent}" text-anchor="middle" font-weight="700" font-family="'Noto Serif TC', serif">快速解法</text>
  <text x="873" y="${panelY + 103}" font-size="22" fill="${C.muted}" text-anchor="middle">每項附情境</text>

  <!-- 底部標語（赤陶橘） -->
  <rect x="60" y="${panelY + 145}" width="960" height="60" rx="10" fill="${C.accent}" opacity="0.10"/>
  <text x="540" y="${panelY + 185}" font-size="30" fill="${C.accent}" text-anchor="middle" font-weight="700">評鑑前必看整合指南 · 整合多年度扣分紀錄</text>
  `);
}

// ─── Slide 2：10 項總覽 ───────────────────────────────────────────────────────

export function renderOverviewSlide(data: CarouselArticleData): string {
  const ITEM_H = 100; // 每列高度
  const START_Y = 120;

  const rows = data.items.map((item, i) => {
    const y = START_Y + i * ITEM_H;
    const col = i < 5 ? "left" : "right";
    const xOffset = col === "left" ? 0 : 540;
    const localY = col === "left" ? y : START_Y + (i - 5) * ITEM_H;
    const color = stepColor(item.rank).main;
    const bgColor = stepColor(item.rank).bg;

    return `
    <!-- 第 ${item.rank} 項 -->
    <rect x="${40 + xOffset}" y="${localY}" width="480" height="${ITEM_H - 8}" rx="8" fill="${bgColor}" stroke="${C.divider}" stroke-width="1"/>
    <rect x="${40 + xOffset}" y="${localY}" width="6" height="${ITEM_H - 8}" rx="2" fill="${color}"/>
    ${rankCircle(78 + xOffset, localY + (ITEM_H - 8) / 2, item.rank, color, 22)}
    <text x="${116 + xOffset}" y="${localY + (ITEM_H - 8) / 2 - 8}" font-size="24" font-weight="700" fill="${C.title}">${item.title}</text>
    <text x="${116 + xOffset}" y="${localY + (ITEM_H - 8) / 2 + 22}" font-size="20" fill="${C.content}">${item.articleRef}・${item.responsible}</text>
    `;
  });

  return svgWrap(`
  <!-- 標題區（深青色色條） -->
  <rect x="0" y="0" width="1080" height="96" fill="${C.primary}" opacity="0.08"/>
  <rect x="0" y="0" width="10" height="96" fill="${C.primary}"/>
  <text x="540" y="58" font-size="40" font-weight="900" fill="${C.primary}" text-anchor="middle" font-family="'Noto Serif TC', serif">10 大常見缺失 一覽</text>
  <text x="540" y="84" font-size="24" fill="${C.content}" text-anchor="middle">日照中心評鑑 · 多年度整合扣分紀錄</text>

  ${rows.join("")}

  <!-- 左欄標題 -->
  <text x="280" y="1150" font-size="22" fill="${C.muted}" text-anchor="middle"># 1 – 5</text>
  <!-- 右欄標題 -->
  <text x="820" y="1150" font-size="22" fill="${C.muted}" text-anchor="middle"># 6 – 10</text>

  <line x1="40" y1="1170" x2="1040" y2="1170" stroke="${C.divider}" stroke-width="1"/>
  <text x="540" y="1210" font-size="26" fill="${C.accent}" text-anchor="middle" font-weight="600">左右滑動查看各項詳細說明 →</text>
  `);
}

// ─── Slide 3-5：缺失詳細說明（每張最多 4 項） ───────────────────────────────

export function renderDetailSlide(
  items: DeficiencyItem[],
  slideLabel: string
): string {
  const CARD_H = 240;
  const CARD_GAP = 20;
  const START_Y = 110;

  const cards = items.map((item, i) => {
    const y = START_Y + i * (CARD_H + CARD_GAP);
    const color = stepColor(item.rank).main;
    const bgColor = stepColor(item.rank).bg;

    return `
    <!-- 缺失 #${item.rank} 卡片 -->
    <rect x="40" y="${y}" width="1000" height="${CARD_H}" rx="12" fill="${bgColor}" stroke="${C.divider}" stroke-width="1"/>
    <rect x="40" y="${y}" width="8" height="${CARD_H}" rx="2" fill="${color}"/>

    <!-- 編號圓圈 -->
    ${rankCircle(96, y + CARD_H / 2, item.rank, color, 30)}

    <!-- 條文 pill -->
    <rect x="142" y="${y + 24}" width="110" height="44" rx="8" fill="${color}" opacity="0.15"/>
    <text x="197" y="${y + 53}" font-size="24" fill="${color}" text-anchor="middle" font-weight="700">${item.articleRef}</text>

    <!-- 標題（Noto Serif TC） -->
    <text x="270" y="${y + 53}" font-size="34" font-weight="900" fill="${C.title}" font-family="'Noto Serif TC', serif">${item.title}</text>

    <!-- 分隔線 -->
    <line x1="142" y1="${y + 82}" x2="1020" y2="${y + 82}" stroke="${C.divider}" stroke-width="1"/>

    <!-- 說明文字 -->
    <text x="142" y="${y + 120}" font-size="26" fill="${C.content}">${item.shortDesc}</text>

    <!-- 負責人 -->
    <rect x="142" y="${y + 162}" width="auto" height="44" rx="8" fill="${color}" opacity="0.12"/>
    <text x="162" y="${y + 191}" font-size="24" fill="${color}" font-weight="600">負責：${item.responsible}</text>
    `;
  });

  return svgWrap(`
  <!-- 頁面標題（深青色色條） -->
  <rect x="0" y="0" width="1080" height="88" fill="${C.primary}" opacity="0.08"/>
  <rect x="0" y="0" width="10" height="88" fill="${C.primary}"/>
  <text x="540" y="52" font-size="36" font-weight="900" fill="${C.primary}" text-anchor="middle" font-family="'Noto Serif TC', serif">常見缺失詳解</text>
  <text x="540" y="80" font-size="22" fill="${C.content}" text-anchor="middle">${slideLabel}</text>

  ${cards.join("")}

  <line x1="40" y1="1250" x2="1040" y2="1250" stroke="${C.divider}" stroke-width="1"/>
  <text x="540" y="1295" font-size="26" fill="${C.accent}" text-anchor="middle" font-weight="600">完整文章含快速解法 → reportwang.com/blog</text>
  `);
}

// ─── Slide 6：自查清單 ───────────────────────────────────────────────────────

export function renderChecklistSlide(data: CarouselArticleData): string {
  const items = data.checklistItems.slice(0, 10);
  const half = Math.ceil(items.length / 2);
  const LEFT = items.slice(0, half);
  const RIGHT = items.slice(half);

  const ROW_H = 64;
  const START_Y = 180;
  const BOX_SIZE = 32;

  function checkRow(x: number, y: number, text: string, checked: boolean, color: string) {
    const checkmark = checked
      ? `<path d="M${x + 6},${y + BOX_SIZE / 2} L${x + 12},${y + BOX_SIZE / 2 + 8} L${x + 26},${y + BOX_SIZE / 2 - 8}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`
      : "";
    return `
    <rect x="${x}" y="${y}" width="${BOX_SIZE}" height="${BOX_SIZE}" rx="5" fill="${C.bg}" stroke="${C.muted}" stroke-width="1.5"/>
    ${checkmark}
    <text x="${x + BOX_SIZE + 16}" y="${y + BOX_SIZE * 0.72}" font-size="26" fill="${C.title}">${text}</text>
    `;
  }

  const leftRows = LEFT.map((text, i) => {
    const y = START_Y + i * ROW_H;
    const color = stepColor(i + 1).main;
    return checkRow(40, y, text, i === 2, color); // 第 3 項預設已勾選（示範用）
  });

  const rightRows = RIGHT.map((text, i) => {
    const y = START_Y + i * ROW_H;
    const color = stepColor(i + half + 1).main;
    return checkRow(560, y, text, i === 0 || i === 1, color); // 第 6-7 項預設已勾選
  });

  return svgWrap(`
  <!-- 標題（深青色色條） -->
  <rect x="0" y="0" width="1080" height="120" fill="${C.primary}" opacity="0.08"/>
  <rect x="0" y="0" width="10" height="120" fill="${C.primary}"/>
  <text x="540" y="60" font-size="44" font-weight="900" fill="${C.primary}" text-anchor="middle" font-family="'Noto Serif TC', serif">評鑑前自查清單</text>
  <text x="540" y="100" font-size="28" fill="${C.content}" text-anchor="middle">10 大缺失對應確認項目</text>

  <!-- 左欄 -->
  ${leftRows.join("")}
  <!-- 右欄 -->
  ${rightRows.join("")}

  <!-- 中間分隔 -->
  <line x1="540" y1="${START_Y}" x2="540" y2="${START_Y + Math.max(LEFT.length, RIGHT.length) * ROW_H}" stroke="${C.divider}" stroke-width="1"/>

  <!-- 底部 legend -->
  <line x1="40" y1="1220" x2="1040" y2="1220" stroke="${C.divider}" stroke-width="1"/>
  <rect x="40" y="1240" width="30" height="30" rx="5" fill="${C.bg}" stroke="${C.muted}" stroke-width="1.5"/>
  <path d="M46,1255 L52,1262 L66,1248" fill="none" stroke="${C.warmGray}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="82" y="1262" font-size="26" fill="${C.content}">已確認</text>
  <rect x="220" y="1240" width="30" height="30" rx="5" fill="none" stroke="${C.muted}" stroke-width="1.5"/>
  <text x="262" y="1262" font-size="26" fill="${C.content}">待確認</text>

  <text x="540" y="1310" font-size="28" fill="${C.accent}" text-anchor="middle" font-weight="600">評鑑前逐項確認，避免扣分！</text>
  `);
}

// ─── Slide 7：CTA ────────────────────────────────────────────────────────────

export function renderCtaSlide(data: CarouselArticleData): string {
  return svgWrap(`
  <!-- 上方色塊（深青色） -->
  <rect x="0" y="0" width="1080" height="480" fill="${C.primary}" opacity="0.10"/>
  <rect x="0" y="0" width="10" height="480" fill="${C.primary}"/>

  <!-- 主標語（標題用深青色+Noto Serif TC，強調行用赤陶橘） -->
  <text x="540" y="160" font-size="56" font-weight="900" fill="${C.primary}" text-anchor="middle" font-family="'Noto Serif TC', serif">備考不再迷茫</text>
  <text x="540" y="240" font-size="56" font-weight="900" fill="${C.accent}" text-anchor="middle" font-family="'Noto Serif TC', serif">讓 AI 幫你比對</text>
  <text x="540" y="320" font-size="36" fill="${C.content}" text-anchor="middle">評鑑基準 × 你的機構文件</text>
  <text x="540" y="380" font-size="34" fill="${C.content}" text-anchor="middle">自動找出缺漏、補強重點</text>

  <!-- 分隔線 -->
  <line x1="80" y1="500" x2="1000" y2="500" stroke="${C.divider}" stroke-width="2"/>

  <!-- 完整文章區塊（深青色色條） -->
  <rect x="40" y="540" width="1000" height="130" rx="12" fill="white" stroke="${C.cardBorder}" stroke-width="1"/>
  <rect x="40" y="540" width="8" height="130" rx="2" fill="${C.primary}"/>
  <text x="80" y="590" font-size="28" font-weight="700" fill="${C.title}" font-family="'Noto Serif TC', serif">完整文章</text>
  <text x="80" y="626" font-size="24" fill="${C.content}">${data.blogUrl}</text>
  <text x="80" y="658" font-size="22" fill="${C.muted}">含 10 大缺失逐條解析 + 快速解法情境</text>

  <!-- AI 工具區塊（赤陶橘色條） -->
  <rect x="40" y="700" width="1000" height="130" rx="12" fill="${C.accent}" opacity="0.07" stroke="${C.accent}" stroke-width="1" stroke-opacity="0.25"/>
  <rect x="40" y="700" width="8" height="130" rx="2" fill="${C.accent}"/>
  <text x="80" y="750" font-size="28" font-weight="700" fill="${C.accent}" font-family="'Noto Serif TC', serif">報告汪 AI 評鑑助手</text>
  <text x="80" y="786" font-size="24" fill="${C.content}">reportwang.com</text>
  <text x="80" y="818" font-size="22" fill="${C.muted}">上傳報告 → AI 自動比對評鑑基準 → 找缺漏</text>

  <!-- 品牌 logo 區 -->
  <line x1="80" y1="880" x2="1000" y2="880" stroke="${C.divider}" stroke-width="1"/>
  <text x="540" y="950" font-size="52" font-weight="900" fill="${C.primary}" text-anchor="middle" font-family="'Noto Serif TC', serif">報告汪</text>
  <text x="540" y="1010" font-size="30" fill="${C.content}" text-anchor="middle">長照機構評鑑報告管理平台</text>

  <!-- 分類標籤（赤陶橘） -->
  ${pill(360, 1050, 360, 64, C.accent, "日照評鑑備考首選", 30)}

  <!-- 追蹤提示 -->
  <text x="540" y="1180" font-size="32" fill="${C.title}" text-anchor="middle" font-weight="700" font-family="'Noto Serif TC', serif">追蹤帳號，每週分享評鑑技巧</text>
  <text x="540" y="1230" font-size="26" fill="${C.muted}" text-anchor="middle">更多評鑑機構類型 · 陸續更新中</text>
  `);
}
