// Instagram 輪播圖生成系統 — SVG 模板函式
// 尺寸：1080x1350px（4:5 直式），沿用現有部落格 SVG 風格

import type { CarouselArticleData, DeficiencyItem } from "./carousel-types";

// ─── 設計 Token（與現有部落格 SVG 一致）───────────────────────────────────────
const C = {
  bg: "#f0efe8",        // 暖米色背景
  panel: "#e8e6de",     // 右側/底部裝飾區
  divider: "#dedad3",   // 分隔線
  cardBorder: "#e8e6de",
  cardBg: "white",
  amber: "#d97706",     // 主色調 amber
  title: "#1e293b",     // 標題文字
  content: "#57534e",   // 內文文字
  light: "#94a3b8",     // 淡色文字
  muted: "#a8a29e",     // 次要文字
  warmGray: "#78716c",
  watermark: "#d97706", // 內容圖浮水印色
};

// earth tone 順序色（10 項循環使用）
const STEP_COLORS = [
  { main: "#d97706", bg: "#fef3c7" },
  { main: "#78716c", bg: "#f5f5f4" },
  { main: "#57534e", bg: "#f5f0eb" },
  { main: "#a8a29e", bg: "#f5f5f4" },
  { main: "#94a3b8", bg: "#f1f5f9" },
];

function stepColor(rank: number) {
  return STEP_COLORS[(rank - 1) % STEP_COLORS.length];
}

// ─── 共用元件 ────────────────────────────────────────────────────────────────

/** 浮水印（右下角） */
function watermark(y = 1320): string {
  return `<text x="1050" y="${y}" font-size="26" fill="${C.watermark}" text-anchor="end" font-weight="400" font-family="'Noto Sans TC', sans-serif">報告汪 reportwang.com</text>`;
}

/** SVG 外框 */
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

/** 帶左側色條的橫排區塊 header */
function sectionHeader(y: number, color: string, text: string, subText = ""): string {
  return `<rect x="0" y="${y}" width="1080" height="80" fill="${color}" opacity="0.08"/>
  <rect x="0" y="${y}" width="8" height="80" rx="2" fill="${color}"/>
  <text x="36" y="${y + 50}" font-size="34" font-weight="700" fill="${C.title}">${text}</text>
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
  <!-- 右下裝飾區 -->
  <rect x="0" y="${panelY}" width="1080" height="370" fill="${C.panel}"/>

  <!-- 大數字裝飾 -->
  <text x="840" y="${panelY + 170}" font-size="240" font-weight="900" fill="${C.amber}" text-anchor="middle" opacity="0.85">${data.highlightNumber}</text>
  <text x="840" y="${panelY + 220}" font-size="36" fill="${C.warmGray}" text-anchor="middle" font-weight="600">${data.highlightLabel}</text>

  <!-- 分類 pill -->
  <rect x="60" y="60" width="160" height="52" rx="26" fill="${C.amber}" opacity="0.15"/>
  <text x="140" y="93" font-size="28" fill="${C.amber}" text-anchor="middle" font-weight="700">${data.category}</text>

  <!-- 主標題 -->
  <text x="60" y="220" font-size="108" font-weight="900" fill="${C.title}">${line1 ?? ""}</text>
  <text x="60" y="360" font-size="108" font-weight="900" fill="${C.amber}">${line2 ?? ""}</text>

  <!-- 分隔線 -->
  <line x1="60" y1="400" x2="1020" y2="400" stroke="${C.divider}" stroke-width="2"/>

  <!-- 副標題 -->
  <text x="60" y="460" font-size="36" fill="${C.content}" font-weight="400">${data.subtitle}</text>

  <!-- 特色標籤列 -->
  ${tagPills}

  <!-- 適用對象 -->
  <text x="60" y="930" font-size="30" fill="${C.light}">${data.audience}</text>

  <!-- 底部面板：4 個資訊卡 -->
  <rect x="60" y="${panelY + 30}" width="215" height="90" rx="10" fill="white" stroke="${C.cardBorder}" stroke-width="1"/>
  <text x="168" y="${panelY + 72}" font-size="30" fill="${C.amber}" text-anchor="middle" font-weight="700">前 5 項</text>
  <text x="168" y="${panelY + 103}" font-size="22" fill="${C.muted}" text-anchor="middle">深度解析</text>

  <rect x="295" y="${panelY + 30}" width="215" height="90" rx="10" fill="white" stroke="${C.cardBorder}" stroke-width="1"/>
  <text x="403" y="${panelY + 72}" font-size="30" fill="${C.warmGray}" text-anchor="middle" font-weight="700">後 5 項</text>
  <text x="403" y="${panelY + 103}" font-size="22" fill="${C.muted}" text-anchor="middle">快速補強</text>

  <rect x="530" y="${panelY + 30}" width="215" height="90" rx="10" fill="white" stroke="${C.cardBorder}" stroke-width="1"/>
  <text x="638" y="${panelY + 72}" font-size="30" fill="${C.warmGray}" text-anchor="middle" font-weight="700">多年度</text>
  <text x="638" y="${panelY + 103}" font-size="22" fill="${C.muted}" text-anchor="middle">真實扣分紀錄</text>

  <rect x="765" y="${panelY + 30}" width="215" height="90" rx="10" fill="white" stroke="${C.cardBorder}" stroke-width="1"/>
  <text x="873" y="${panelY + 72}" font-size="30" fill="${C.amber}" text-anchor="middle" font-weight="700">快速解法</text>
  <text x="873" y="${panelY + 103}" font-size="22" fill="${C.muted}" text-anchor="middle">每項附情境</text>

  <!-- 底部標語 -->
  <rect x="60" y="${panelY + 145}" width="960" height="60" rx="10" fill="${C.amber}" opacity="0.13"/>
  <text x="540" y="${panelY + 185}" font-size="30" fill="${C.amber}" text-anchor="middle" font-weight="700">評鑑前必看整合指南 · 整合多年度扣分紀錄</text>
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
  <!-- 標題區 -->
  <rect x="0" y="0" width="1080" height="96" fill="${C.amber}" opacity="0.10"/>
  <rect x="0" y="0" width="10" height="96" fill="${C.amber}"/>
  <text x="540" y="58" font-size="40" font-weight="900" fill="${C.title}" text-anchor="middle">10 大常見缺失 一覽</text>
  <text x="540" y="84" font-size="24" fill="${C.content}" text-anchor="middle">日照中心評鑑 · 多年度整合扣分紀錄</text>

  ${rows.join("")}

  <!-- 左欄標題 -->
  <text x="280" y="1150" font-size="22" fill="${C.muted}" text-anchor="middle"># 1 – 5</text>
  <!-- 右欄標題 -->
  <text x="820" y="1150" font-size="22" fill="${C.muted}" text-anchor="middle"># 6 – 10</text>

  <line x1="40" y1="1170" x2="1040" y2="1170" stroke="${C.divider}" stroke-width="1"/>
  <text x="540" y="1210" font-size="26" fill="${C.amber}" text-anchor="middle" font-weight="600">左右滑動查看各項詳細說明 →</text>
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

    <!-- 標題 -->
    <text x="270" y="${y + 53}" font-size="34" font-weight="900" fill="${C.title}">${item.title}</text>

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
  <!-- 頁面標題 -->
  <rect x="0" y="0" width="1080" height="88" fill="${C.amber}" opacity="0.10"/>
  <rect x="0" y="0" width="10" height="88" fill="${C.amber}"/>
  <text x="540" y="52" font-size="36" font-weight="900" fill="${C.title}" text-anchor="middle">常見缺失詳解</text>
  <text x="540" y="80" font-size="22" fill="${C.content}" text-anchor="middle">${slideLabel}</text>

  ${cards.join("")}

  <line x1="40" y1="1250" x2="1040" y2="1250" stroke="${C.divider}" stroke-width="1"/>
  <text x="540" y="1295" font-size="26" fill="${C.amber}" text-anchor="middle" font-weight="600">完整文章含快速解法 → reportwang.com/blog</text>
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
  <!-- 標題 -->
  <rect x="0" y="0" width="1080" height="120" fill="${C.amber}" opacity="0.10"/>
  <rect x="0" y="0" width="10" height="120" fill="${C.amber}"/>
  <text x="540" y="60" font-size="44" font-weight="900" fill="${C.title}" text-anchor="middle">評鑑前自查清單</text>
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

  <text x="540" y="1310" font-size="28" fill="${C.amber}" text-anchor="middle" font-weight="600">評鑑前逐項確認，避免扣分！</text>
  `);
}

// ─── Slide 7：CTA ────────────────────────────────────────────────────────────

export function renderCtaSlide(data: CarouselArticleData): string {
  return svgWrap(`
  <!-- 上方色塊 -->
  <rect x="0" y="0" width="1080" height="480" fill="${C.amber}" opacity="0.12"/>
  <rect x="0" y="0" width="10" height="480" fill="${C.amber}"/>

  <!-- 主標語 -->
  <text x="540" y="160" font-size="56" font-weight="900" fill="${C.title}" text-anchor="middle">備考不再迷茫</text>
  <text x="540" y="240" font-size="56" font-weight="900" fill="${C.amber}" text-anchor="middle">讓 AI 幫你比對</text>
  <text x="540" y="320" font-size="36" fill="${C.content}" text-anchor="middle">評鑑基準 × 你的機構文件</text>
  <text x="540" y="380" font-size="34" fill="${C.content}" text-anchor="middle">自動找出缺漏、補強重點</text>

  <!-- 分隔線 -->
  <line x1="80" y1="500" x2="1000" y2="500" stroke="${C.divider}" stroke-width="2"/>

  <!-- 完整文章區塊 -->
  <rect x="40" y="540" width="1000" height="130" rx="12" fill="white" stroke="${C.cardBorder}" stroke-width="1"/>
  <rect x="40" y="540" width="8" height="130" rx="2" fill="${C.amber}"/>
  <text x="80" y="590" font-size="28" font-weight="700" fill="${C.title}">完整文章</text>
  <text x="80" y="626" font-size="24" fill="${C.content}">${data.blogUrl}</text>
  <text x="80" y="658" font-size="22" fill="${C.muted}">含 10 大缺失逐條解析 + 快速解法情境</text>

  <!-- AI 工具區塊 -->
  <rect x="40" y="700" width="1000" height="130" rx="12" fill="${C.amber}" opacity="0.10" stroke="${C.amber}" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="40" y="700" width="8" height="130" rx="2" fill="${C.amber}"/>
  <text x="80" y="750" font-size="28" font-weight="700" fill="${C.amber}">報告汪 AI 評鑑助手</text>
  <text x="80" y="786" font-size="24" fill="${C.content}">reportwang.com</text>
  <text x="80" y="818" font-size="22" fill="${C.muted}">上傳報告 → AI 自動比對評鑑基準 → 找缺漏</text>

  <!-- 品牌 logo 區 -->
  <line x1="80" y1="880" x2="1000" y2="880" stroke="${C.divider}" stroke-width="1"/>
  <text x="540" y="950" font-size="52" font-weight="900" fill="${C.title}" text-anchor="middle">報告汪</text>
  <text x="540" y="1010" font-size="30" fill="${C.content}" text-anchor="middle">長照機構評鑑報告管理平台</text>

  <!-- 分類標籤 -->
  ${pill(360, 1050, 360, 64, C.amber, "日照評鑑備考首選", 30)}

  <!-- 追蹤提示 -->
  <text x="540" y="1180" font-size="32" fill="${C.title}" text-anchor="middle" font-weight="700">追蹤帳號，每週分享評鑑技巧</text>
  <text x="540" y="1230" font-size="26" fill="${C.muted}" text-anchor="middle">更多評鑑機構類型 · 陸續更新中</text>
  `);
}
