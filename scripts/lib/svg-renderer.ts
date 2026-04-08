// SVG 插圖渲染器 — 從 SvgPlanItem 直接輸出 SVG 字串
// 1:1 移植自 gen-article-svgs.py 的 7 種模板，設計 Token 完全對齊

import type { SvgPlanItem } from "./keypoints-to-svg-plan";
import type { ArticleKeypoints } from "./article-keypoints-extractor";

// ─── 設計 Token（對齊 Python 版） ─────────────────────────────────────────────

const BG = "#f0efe8";
const FONT = `font-family="'Noto Sans TC', sans-serif"`;

const COLORS: [string, string][] = [
  ["#d97706", "#fef3c7"], // 琥珀 amber-600
  ["#78716c", "#f5f5f4"], // 暖灰 stone-500
  ["#57534e", "#f5f0eb"], // 深棕 stone-600
  ["#a8a29e", "#f5f5f4"], // 淺灰 stone-400
  ["#94a3b8", "#f1f5f9"], // 藍灰 slate-400
];

const WM_INLINE = `<text x="760" y="480" font-size="16" fill="#d97706" text-anchor="end" font-weight="400" ${FONT}>報告汪 reportwang.com</text>`;
const WM_COVER  = `<text x="1140" y="590" font-size="24" fill="#c4bfb8" text-anchor="end" font-weight="400" ${FONT}>報告汪 reportwang.com</text>`;

function color(i: number): [string, string] {
  return COLORS[i % COLORS.length];
}

// ─── 模板 1：直列清單（支援 3 / 4 / 5 項） ─────────────────────────────────

interface ListRow {
  label: string;    // 粗體標題
  desc: string;     // 說明文字
  s1: string;       // 右側標籤行1
  s2: string;       // 右側標籤行2
}

/**
 * renderList — 對應 Python list3 / list4 / list5
 * @param title   圖表主標題
 * @param rows    最多 5 項，各含 label/desc/s1/s2
 */
export function renderList(title: string, rows: ListRow[]): string {
  if (rows.length < 3) throw new Error(`renderList requires at least 3 rows, got ${rows.length}`);
  const n = Math.min(rows.length, 5);

  // 依項目數決定佈局參數
  type Layout = { headerY: number; headerH: number; titleFontSize: number; titleY: number; rowYs: number[]; cardH: number; labelFs: number; descFs: number; pillH: number; circleR: number };
  const layouts: Record<number, Layout> = {
    3: { headerY: 38, headerH: 90, titleFontSize: 32, titleY: 97, rowYs: [166, 269, 372], cardH: 90, labelFs: 28, descFs: 18, pillH: 52, circleR: 20 },
    4: { headerY: 50, headerH: 76, titleFontSize: 36, titleY: 104, rowYs: [160, 235, 310, 385], cardH: 62, labelFs: 22, descFs: 16, pillH: 46, circleR: 16 },
    5: { headerY: 29, headerH: 60, titleFontSize: 28, titleY: 70, rowYs: [118, 191, 264, 337, 410], cardH: 60, labelFs: 20, descFs: 16, pillH: 44, circleR: 16 },
  };
  const L = layouts[Math.max(3, Math.min(5, n))];

  const parts: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" ${FONT}>`,
    `<rect width="800" height="500" fill="${BG}"/>`,
    `<rect x="0" y="${L.headerY}" width="800" height="${L.headerH}" fill="white"/>`,
    `<rect x="0" y="${L.headerY}" width="6" height="${L.headerH}" fill="#d97706"/>`,
    `<text x="28" y="${L.titleY}" font-size="${L.titleFontSize}" fill="#1e293b" font-weight="700">${esc(title)}</text>`,
  ];

  rows.slice(0, n).forEach((row, i) => {
    const [c] = color(i);
    const y = L.rowYs[i];
    const cy = y + Math.floor(L.cardH / 2);
    parts.push(
      `<rect x="28" y="${y}" width="744" height="${L.cardH}" rx="12" fill="white" stroke="#e8e6de" stroke-width="1"/>`,
      `<rect x="28" y="${y}" width="6" height="${L.cardH}" rx="2" fill="${c}"/>`,
      `<circle cx="66" cy="${cy}" r="${L.circleR}" fill="${c}" opacity="0.15"/>`,
      `<text x="66" y="${cy + 7}" font-size="${L.circleR - 2}" fill="${c}" text-anchor="middle" font-weight="900">${i + 1}</text>`,
      `<text x="100" y="${y + Math.round(L.cardH * 0.48)}" font-size="${L.labelFs}" fill="#1e293b" font-weight="700">${esc(row.label)}</text>`,
      `<text x="100" y="${y + Math.round(L.cardH * 0.75)}" font-size="${L.descFs}" fill="#57534e">${esc(row.desc)}</text>`,
      `<rect x="620" y="${y + 8}" width="136" height="${L.pillH}" rx="8" fill="${c}" opacity="0.12"/>`,
      `<text x="688" y="${y + Math.round(L.pillH * 0.4) + 8}" font-size="${L.descFs}" fill="${c}" text-anchor="middle">${esc(row.s1)}</text>`,
      `<text x="688" y="${y + Math.round(L.pillH * 0.75) + 8}" font-size="${L.descFs}" fill="${c}" text-anchor="middle">${esc(row.s2)}</text>`,
    );
  });

  parts.push(WM_INLINE, `</svg>`);
  return parts.join("\n");
}

// ─── 模板 2：流程圖（3 / 4 步驟） ────────────────────────────────────────────

interface FlowStep {
  title: string;  // 步驟標題
  d1: string;     // 說明行1
  d2: string;     // 說明行2
  pill: string;   // 底部標籤
}

/**
 * renderFlow — 對應 Python flow3 / flow4
 */
export function renderFlow(title: string, subtitle: string, steps: FlowStep[]): string {
  const n = Math.min(steps.length, 4);

  // 卡片 x 起點 + 中心 x
  const cardConfigs3 = [[129, 214], [315, 400], [501, 586]];
  const cardConfigs4 = [[28, 115], [218, 305], [408, 495], [598, 685]];
  const cards = n === 4 ? cardConfigs4 : cardConfigs3;
  const CW = n === 4 ? 174 : 170;
  const lineX1 = n === 4 ? 28 : 129;
  const lineX2 = n === 4 ? 772 : 671;

  const CY_TOP = 108; const CH = 342;
  const R = n === 4 ? 44 : 43;
  const CY = 194; const STEP_Y = 183; const NUM_Y = 211;
  const H_Y = 297; const J1_Y = 324; const J2_Y = 346;
  const PILL_Y = 381; const PTY = 405; const PW = 148;
  const AY = 279;

  const titleFs = n === 4 ? 28 : 32;
  const stepFs  = n === 4 ? 17 : 16;
  const headFs  = n === 4 ? 18 : 20;
  const descFs  = n === 4 ? 14 : 15;
  const pillFs  = n === 4 ? 15 : 16;

  const parts: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" ${FONT}>`,
    `<rect width="800" height="500" fill="${BG}"/>`,
    `<text x="400" y="48" text-anchor="middle" font-size="${titleFs}" fill="#1e293b" font-weight="700">${esc(title)}</text>`,
    `<text x="400" y="78" text-anchor="middle" font-size="22" fill="#57534e">${esc(subtitle)}</text>`,
    `<line x1="${lineX1}" y1="94" x2="${lineX2}" y2="94" stroke="#dedad3" stroke-width="1"/>`,
  ];

  // 箭頭
  for (let i = 0; i < cards.length - 1; i++) {
    const ax1 = cards[i][0] + CW;
    const ax2 = cards[i + 1][0];
    parts.push(
      `<line x1="${ax1}" y1="${AY}" x2="${ax2 - 8}" y2="${AY}" stroke="#c4bfb8" stroke-width="2"/>`,
      `<polygon points="${ax2 - 8},${AY - 5} ${ax2},${AY} ${ax2 - 8},${AY + 5}" fill="#c4bfb8"/>`,
    );
  }

  // 卡片
  steps.slice(0, n).forEach((step, i) => {
    const [c, bg] = color(i);
    const [cx_x, cx] = cards[i];
    const px = cx - Math.floor(PW / 2);
    parts.push(
      `<rect x="${cx_x}" y="${CY_TOP}" width="${CW}" height="${CH}" rx="12" fill="white" stroke="#e8e6de" stroke-width="1"/>`,
      `<rect x="${cx_x}" y="${CY_TOP}" width="${CW}" height="8" rx="4" fill="${c}"/>`,
      `<rect x="${cx_x}" y="${CY_TOP + 4}" width="${CW}" height="4" fill="${c}"/>`,
      `<circle cx="${cx}" cy="${CY}" r="${R}" fill="${bg}"/>`,
      `<text x="${cx}" y="${STEP_Y}" text-anchor="middle" font-size="${stepFs}" fill="${c}" font-weight="700">STEP</text>`,
      `<text x="${cx}" y="${NUM_Y}" text-anchor="middle" font-size="28" fill="${c}" font-weight="700">${String(i + 1).padStart(2, "0")}</text>`,
      `<text x="${cx}" y="${H_Y}" text-anchor="middle" font-size="${headFs}" fill="#1e293b" font-weight="700">${esc(step.title)}</text>`,
    );
    if (step.d1) parts.push(`<text x="${cx}" y="${J1_Y}" text-anchor="middle" font-size="${descFs}" fill="#57534e">${esc(step.d1)}</text>`);
    if (step.d2) parts.push(`<text x="${cx}" y="${J2_Y}" text-anchor="middle" font-size="${descFs}" fill="#57534e">${esc(step.d2)}</text>`);
    parts.push(
      `<rect x="${px}" y="${PILL_Y}" width="${PW}" height="36" rx="18" fill="${bg}"/>`,
      `<text x="${cx}" y="${PTY}" text-anchor="middle" font-size="${pillFs}" fill="${c}" font-weight="600">${esc(step.pill)}</text>`,
    );
  });

  parts.push(WM_INLINE, `</svg>`);
  return parts.join("\n");
}

// ─── 模板 3：自查清單（雙欄） ──────────────────────────────────────────────

interface ChecklistItem {
  done: boolean;
  text: string;
}

/**
 * renderChecklist — 對應 Python checklist()
 * leftItems + rightItems 各最多 6 項
 */
export function renderChecklist(title: string, subtitle: string, leftItems: ChecklistItem[], rightItems: ChecklistItem[]): string {
  const parts: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" ${FONT}>`,
    `<rect width="800" height="500" fill="${BG}"/>`,
    `<text x="400" y="48" text-anchor="middle" font-size="32" fill="#1e293b" font-weight="700">${esc(title)}</text>`,
    `<text x="400" y="78" text-anchor="middle" font-size="22" fill="#57534e">${esc(subtitle)}</text>`,
    `<line x1="40" y1="94" x2="760" y2="94" stroke="#dedad3" stroke-width="1"/>`,
    `<line x1="400" y1="98" x2="400" y2="432" stroke="#dedad3" stroke-width="1"/>`,
  ];

  function drawItems(items: ChecklistItem[], cbX: number) {
    let y = 118;
    for (const { done, text } of items.slice(0, 6)) {
      const tx = cbX + 28;
      parts.push(`<rect x="${cbX}" y="${y}" width="20" height="20" rx="3" fill="${BG}" stroke="#a8a29e" stroke-width="1"/>`);
      if (done) {
        parts.push(`<path d="M${cbX + 4},${y + 10} L${cbX + 8},${y + 15} L${cbX + 17},${y + 3}" fill="none" stroke="#78716c" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`);
      }
      parts.push(`<text x="${tx}" y="${y + 15}" font-size="17" fill="#1e293b">${esc(text)}</text>`);
      y += 32;
    }
  }

  drawItems(leftItems, 64);
  drawItems(rightItems, 420);

  parts.push(
    `<line x1="40" y1="433" x2="760" y2="433" stroke="#dedad3" stroke-width="1"/>`,
    // 圖例
    `<rect x="75" y="443" width="18" height="18" rx="3" fill="${BG}" stroke="#a8a29e" stroke-width="1"/>`,
    `<path d="M78,453 L82,458 L91,446" fill="none" stroke="#78716c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    `<text x="102" y="458" font-size="17" fill="#57534e">已確認完成</text>`,
    `<rect x="220" y="443" width="18" height="18" rx="3" fill="none" stroke="#a8a29e" stroke-width="1.5"/>`,
    `<text x="247" y="458" font-size="17" fill="#57534e">待確認項目</text>`,
    WM_INLINE, `</svg>`,
  );
  return parts.join("\n");
}

// ─── 模板 4：2×2 分類卡片 ────────────────────────────────────────────────────

interface CategoryCard {
  color: string;
  bg: string;
  title: string;
  items: string[];  // 最多 3 項
  chip: string;     // 底部標籤
}

/**
 * renderCategories — 對應 Python categories()
 */
export function renderCategories(title: string, subtitle: string, cards: CategoryCard[]): string {
  const pos: [number, number, number, number][] = [
    [40, 104, 346, 168],
    [414, 104, 346, 168],
    [40, 288, 346, 162],
    [414, 288, 346, 162],
  ];

  const parts: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" ${FONT}>`,
    `<rect width="800" height="500" fill="${BG}"/>`,
    `<text x="400" y="48" text-anchor="middle" font-size="32" fill="#1e293b" font-weight="700">${esc(title)}</text>`,
    `<text x="400" y="78" text-anchor="middle" font-size="22" fill="#57534e">${esc(subtitle)}</text>`,
    `<line x1="40" y1="94" x2="760" y2="94" stroke="#dedad3" stroke-width="1"/>`,
  ];

  cards.slice(0, 4).forEach((card, i) => {
    const [x, y, w, h] = pos[i];
    const midX = x + Math.floor(w / 2);
    parts.push(
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="white"/>`,
      `<rect x="${x}" y="${y}" width="${w}" height="40" rx="12" fill="${card.color}"/>`,
      `<rect x="${x}" y="${y + 20}" width="${w}" height="20" fill="${card.color}"/>`,
      `<text x="${midX}" y="${y + 26}" text-anchor="middle" font-size="16" fill="white" font-weight="700">${esc(card.title)}</text>`,
    );
    card.items.slice(0, 3).forEach((item, j) => {
      parts.push(`<text x="${x + 16}" y="${y + 62 + j * 24}" font-size="15" fill="#57534e">• ${esc(item)}</text>`);
    });
    const cw = Math.min(card.chip.length * 18 + 24, w - 32);
    const chipX = x + Math.floor(w / 2) - Math.floor(cw / 2);
    parts.push(
      `<rect x="${chipX}" y="${y + h - 26}" width="${cw}" height="20" rx="10" fill="${card.bg}"/>`,
      `<text x="${midX}" y="${y + h - 12}" text-anchor="middle" font-size="14" fill="${card.color}" font-weight="600">${esc(card.chip)}</text>`,
    );
  });

  parts.push(WM_INLINE, `</svg>`);
  return parts.join("\n");
}

// ─── 模板 5：封面圖 1200×630 ─────────────────────────────────────────────────

interface CoverCard {
  title: string;
  subtitle: string;
  color: string;
}

interface CoverOpts {
  t1: string;           // 主標題行1（深色）
  t2: string;           // 主標題行2（琥珀）
  subtitle: string;
  tags: Array<{ text: string; color: string; bg: string }>;
  bottomText: string;
  bigNum: string;
  numLabel: string;
  rightCards: CoverCard[];  // 最多 4 張
}

/**
 * renderCover — 對應 Python cover()，1200×630
 */
export function renderCover(opts: CoverOpts): string {
  const { t1, t2, subtitle, tags, bottomText, bigNum, numLabel, rightCards } = opts;

  const t1Sz = Math.max(80, 120 - Math.max(0, t1.length - 4) * 8);
  const t2Sz = Math.max(80, 120 - Math.max(0, t2.length - 4) * 8);
  const t1Y = 200;
  const t2Y = t1Y + t1Sz + 18;
  const divY = t2Y + t2Sz + 14;
  const subY = divY + 46;
  const tagY = subY + 54;

  const cardConfigs: [number, number, number, number][] = [
    [840, 299, 155, 86], [1005, 299, 155, 86],
    [840, 395, 155, 86], [1005, 395, 155, 86],
  ];

  const parts: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" ${FONT}>`,
    `<rect width="1200" height="630" fill="${BG}"/>`,
    `<rect x="820" y="0" width="380" height="630" fill="#e8e6de"/>`,
    `<text x="1010" y="239" font-size="180" font-weight="900" fill="#d97706" text-anchor="middle" opacity="0.85">${esc(bigNum)}</text>`,
    `<text x="1010" y="281" font-size="28" fill="#78716c" text-anchor="middle" font-weight="600">${esc(numLabel)}</text>`,
  ];

  // 右側小卡片（2×2）
  rightCards.slice(0, 4).forEach((card, i) => {
    const [cx_r, cy_r, cw, ch] = cardConfigs[i];
    const midX = cx_r + Math.floor(cw / 2);
    parts.push(
      `<rect x="${cx_r}" y="${cy_r}" width="${cw}" height="${ch}" rx="10" fill="white" stroke="#e8e6de" stroke-width="1"/>`,
      `<text x="${midX}" y="${cy_r + 29}" font-size="26" fill="${card.color}" text-anchor="middle" font-weight="700">${esc(card.title)}</text>`,
      `<text x="${midX}" y="${cy_r + 60}" font-size="20" fill="#a8a29e" text-anchor="middle">${esc(card.subtitle)}</text>`,
    );
  });

  // 右下 AI 標語 pill
  parts.push(
    `<rect x="840" y="491" width="320" height="52" rx="10" fill="#d97706" opacity="0.12"/>`,
    `<text x="1000" y="527" font-size="26" fill="#d97706" text-anchor="middle" font-weight="700">AI 輔助撰寫 × 報告汪</text>`,
  );

  // 左側主標題
  parts.push(
    `<text x="60" y="${t1Y}" font-size="${t1Sz}" font-weight="900" fill="#1e293b">${esc(t1)}</text>`,
    `<text x="60" y="${t2Y}" font-size="${t2Sz}" font-weight="900" fill="#d97706">${esc(t2)}</text>`,
    `<line x1="60" y1="${divY}" x2="780" y2="${divY}" stroke="#dedad3" stroke-width="2"/>`,
    `<text x="60" y="${subY}" font-size="36" fill="#57534e" font-weight="400">${esc(subtitle)}</text>`,
  );

  // 標籤 pills
  let tx = 60;
  tags.forEach((tag) => {
    const tw = tag.text.length * 24 + 24;
    parts.push(
      `<rect x="${tx}" y="${tagY}" width="${tw}" height="50" rx="10" fill="${tag.bg}"/>`,
      `<text x="${tx + Math.floor(tw / 2)}" y="${tagY + 32}" font-size="26" fill="${tag.color}" text-anchor="middle" font-weight="600">${esc(tag.text)}</text>`,
    );
    tx += tw + 14;
  });

  const btY = Math.min(tagY + 80, 558);
  parts.push(
    `<text x="60" y="${btY}" font-size="26" fill="#94a3b8">${esc(bottomText)}</text>`,
    WM_COVER, `</svg>`,
  );
  return parts.join("\n");
}

// ─── 橋接函式：SvgPlanItem → SVG 字串 ─────────────────────────────────────

/**
 * 從 SvgPlanItem 的 labels / descriptions / pills 自動組裝對應模板的參數，
 * 渲染並回傳完整 SVG 字串。
 */
export function renderSvgPlanItem(item: SvgPlanItem, kp: ArticleKeypoints): string {
  const { template, labels, descriptions, svgTitle, svgSubtitle, pills } = item;

  switch (template) {
    case "list3":
    case "list4":
    case "list5": {
      const rows: ListRow[] = labels.map((label, i) => ({
        label: label.slice(0, 18),
        desc: (descriptions[i] ?? "").slice(0, 28),
        s1: (pills?.[i] ?? label.match(/第(\d+條)/)?.[1] ?? `第${i + 1}項`),
        s2: (item.responsibles?.[i] ?? ""),
      }));
      return renderList(svgTitle ?? kp.title.slice(0, 20), rows);
    }

    case "flow3":
    case "flow4": {
      const steps: FlowStep[] = labels.map((label, i) => {
        const desc = descriptions[i] ?? "";
        // 說明最多拆 2 行（每行約 12 字）
        const d1 = desc.slice(0, 12);
        const d2 = desc.length > 12 ? desc.slice(12, 24) : "";
        return {
          title: label.slice(0, 10),
          d1,
          d2,
          pill: pills?.[i] ?? `步驟 ${i + 1}`,
        };
      });
      return renderFlow(svgTitle ?? kp.title.slice(0, 20), svgSubtitle ?? "", steps);
    }

    case "checklist": {
      // 將 labels 平均分左右欄
      const half = Math.ceil(labels.length / 2);
      const leftItems: ChecklistItem[] = labels.slice(0, half).map((text, i) => ({
        done: i === 0, // 示範第一項已勾選
        text: text.slice(0, 20),
      }));
      const rightItems: ChecklistItem[] = labels.slice(half).map((text) => ({
        done: false,
        text: text.slice(0, 20),
      }));
      return renderChecklist(
        svgTitle ?? `${kp.category}評鑑自查清單`,
        svgSubtitle ?? "評鑑前必備確認項目",
        leftItems,
        rightItems,
      );
    }

    case "categories": {
      // 最多 4 張卡片
      const catCards: CategoryCard[] = labels.slice(0, 4).map((label, i) => {
        const [c, bg] = color(i);
        const desc = descriptions[i] ?? "";
        // 把說明拆成 ≤3 個 bullet
        const bullets = desc.split(/[。，；]/).filter(Boolean).slice(0, 3);
        return {
          color: c, bg,
          title: label.slice(0, 10),
          items: bullets.map((b) => b.slice(0, 18)),
          chip: pills?.[i] ?? `第${i + 1}項`,
        };
      });
      return renderCategories(svgTitle ?? kp.title.slice(0, 20), svgSubtitle ?? "", catCards);
    }

    case "cover": {
      // 封面：從 kp 資訊自動組裝
      const [line1, line2] = labels[0]?.includes("\n")
        ? labels[0].split("\n")
        : [kp.category, kp.title.slice(0, 10)];
      const tagColors = [
        { text: kp.tags[0] ?? kp.category, color: "#d97706", bg: "#fef3c7" },
        { text: kp.tags[1] ?? "評鑑準備", color: "#78716c", bg: "#f5f5f4" },
      ];
      // 從 keyPoints 取前 4 項作為右側 card
      const allKps = kp.sections.flatMap((s) => s.keyPoints).slice(0, 4);
      const rCards: CoverCard[] = allKps.length > 0
        ? allKps.map((p, i) => ({ title: p.articleRef ?? `第${i + 1}項`, subtitle: p.title.slice(0, 8), color: color(i)[0] }))
        : [
            { title: "評鑑基準", subtitle: "逐條解析", color: "#d97706" },
            { title: "準備策略", subtitle: "實戰指引", color: "#78716c" },
          ];
      return renderCover({
        t1: line1 ?? kp.category,
        t2: line2 ?? "評鑑指南",
        subtitle: kp.excerpt.slice(0, 30),
        tags: tagColors,
        bottomText: `適用：${kp.category}評鑑準備團隊`,
        bigNum: String(kp.stats.keyPointCount || kp.stats.sectionCount),
        numLabel: "大重點",
        rightCards: rCards,
      });
    }

    default:
      return renderList(item.svgTitle ?? "重點整理", labels.slice(0, 3).map((l, i) => ({
        label: l.slice(0, 18),
        desc: (descriptions[i] ?? "").slice(0, 28),
        s1: "", s2: "",
      })));
  }
}

// ─── XML 安全字元轉義 ───────────────────────────────────────────────────────

function esc(text: string): string {
  return text
    // XML 1.0 不允許 U+0000–U+0008、U+000B、U+000C、U+000E–U+001F 控制字元
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
