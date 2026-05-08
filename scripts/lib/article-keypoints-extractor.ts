// 文章重點抓取器 — 從文章 HTML 解析出結構化重點
// 使用 cheerio 進行 DOM 解析，不依賴 AI/LLM

import * as cheerio from "cheerio";

// ─── 輸出介面定義 ──────────────────────────────────────────────────────────────

export interface KeyPoint {
  /** 重點標題（≤10 中文字，供 carousel shortTitle 使用） */
  title: string;
  /** 完整說明文字（≤56 中文字，供 carousel shortDesc 使用，2行×28字） */
  description: string;
  /** 負責職類，e.g. "社工", "護理師" */
  responsible?: string;
  /** 評鑑條文參考，e.g. "第6條" */
  articleRef?: string;
  /** 缺失排名（TOP N 缺失文章才有） */
  rank?: number;
}

export interface ArticleSection {
  title: string;
  keyPoints: KeyPoint[];
}

export interface ArticleKeypoints {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  /** 開頭 blockquote 的重點摘要文字 */
  summary: string;
  sections: ArticleSection[];
  faqs: { question: string; answer: string }[];
  tableData: { headers: string[]; rows: string[][] }[];
  /** 自查清單項目（從 ☐ 清單抓取，≤20 中文字） */
  checklistItems: string[];
  stats: {
    charCount: number;
    sectionCount: number;
    keyPointCount: number;
    /** 建議插圖數量（charCount / 400） */
    estimatedSvgCount: number;
  };
}

// ─── 字數工具函式 ──────────────────────────────────────────────────────────────

/** 截斷到指定字元數，超出加 … */
function truncate(text: string, maxLen: number): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLen) return cleaned;
  return cleaned.slice(0, maxLen) + "…";
}

/** 從純文字中取第一句（。！？!? 為句尾） */
function firstSentence(text: string): string {
  const match = text.match(/^[^。！？!?\n]+[。！？!?]?/);
  return match ? match[0].trim() : text.trim();
}

// ─── H2 標題解析：判斷是否為「缺失 #N」格式 ────────────────────────────────

interface DeficiencyMeta {
  rank: number;
  articleRef: string;  // e.g. "第8條"
  title: string;
  responsible?: string;
}

/**
 * 解析 H2 標題，嘗試抓取「缺失 #N — 第X條：title（responsible）」格式
 * 例如："缺失 #6 — 第 8 條：個案研討紀錄不完整（社工 / 照服員）"
 */
function parseDeficiencyH2(h2: string): DeficiencyMeta | null {
  // 格式一：缺失 #N — 第X條：title（responsible）
  const m1 = h2.match(/缺失\s*#(\d+)[^第]*第\s*(\d+)\s*條[：:]\s*(.+?)(?:（([^）]+)）)?$/);
  if (m1) {
    return {
      rank: parseInt(m1[1]),
      articleRef: `第${m1[2]}條`,
      title: m1[3].trim(),
      responsible: m1[4]?.trim(),
    };
  }
  // 格式二：#N — 第X條：title
  const m2 = h2.match(/#(\d+)[^第]*第\s*(\d+)\s*條[：:]\s*(.+)/);
  if (m2) {
    return {
      rank: parseInt(m2[1]),
      articleRef: `第${m2[2]}條`,
      title: m2[3].trim(),
    };
  }
  return null;
}

/**
 * 解析 li>strong 中「缺失 #N — 第X條：title（responsible）」格式
 * 例如："缺失 #1 — 第 6 條：照顧計畫超過 7 個工作天（社工）"
 */
function parseDeficiencyLi(strong: string): DeficiencyMeta | null {
  const m = strong.match(/缺失\s*#(\d+)[^第]*第\s*(\d+)\s*條[：:]\s*(.+?)(?:（([^）]+)）)?[，。]?$/);
  if (!m) return null;
  return {
    rank: parseInt(m[1]),
    articleRef: `第${m[2]}條`,
    title: m[3].trim(),
    responsible: m[4]?.trim(),
  };
}

/**
 * 解析 h2 標題中的負責人括號，e.g. "（社工）" → "社工"
 */
function extractResponsible(text: string): string | undefined {
  const m = text.match(/（([^）]+)）\s*$/);
  return m ? m[1].trim() : undefined;
}

// ─── 主解析函式 ────────────────────────────────────────────────────────────────

export interface ArticleJson {
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  content: string;
}

export function extractKeypoints(article: ArticleJson): ArticleKeypoints {
  const $ = cheerio.load(article.content);

  // ── 1. 摘要：優先使用 article.excerpt（TL;DR 卡同源），fallback 至 body 第一個非「基準說明」blockquote
  // 註：自 2026-05 後文章 body 不再放 重點摘要 blockquote，summary 由 excerpt 承擔
  let summary = truncate(article.excerpt?.trim() ?? "", 200);
  if (!summary) {
    $("blockquote").each((_, el) => {
      if (summary) return;
      const text = $(el).text().trim();
      if (!text.match(/^第\s*\d+\s*條基準說明/)) {
        summary = truncate(text.replace(/^重點摘要[：:]\s*/, ""), 200);
      }
    });
  }

  // ── 2. FAQ：從「常見問題 FAQ」H2 後的 H3+P 配對抓取 ─────────────────────────
  const faqs: { question: string; answer: string }[] = [];
  let inFaq = false;
  $("h2, h3, p").each((_, el) => {
    const tag = el.tagName?.toLowerCase();
    const text = $(el).text().trim();
    if (tag === "h2" && text.includes("FAQ")) {
      inFaq = true;
      return;
    }
    if (tag === "h2" && inFaq) {
      inFaq = false;
      return;
    }
    if (tag === "h3" && inFaq && text.length > 0) {
      // 下一個 P 是答案
      const nextP = $(el).next("p");
      if (nextP.length) {
        faqs.push({
          question: text.replace(/^Q[：:]\s*/, ""),
          answer: truncate(nextP.text().trim(), 100),
        });
      }
    }
  });

  // ── 3. 表格資料 ─────────────────────────────────────────────────────────────
  const tableData: { headers: string[]; rows: string[][] }[] = [];
  $("table").each((_, table) => {
    const headers: string[] = [];
    const rows: string[][] = [];
    $(table).find("thead tr th").each((_, th) => {
      headers.push($(th).text().trim());
    });
    $(table).find("tbody tr").each((_, tr) => {
      const row: string[] = [];
      $(tr).find("td").each((_, td) => {
        row.push($(td).text().trim());
      });
      if (row.length > 0) rows.push(row);
    });
    if (headers.length > 0 || rows.length > 0) {
      tableData.push({ headers, rows });
    }
  });

  // ── 4. 自查清單：從 ☐ 或 □ 開頭的 li 抓取 ───────────────────────────────────
  const checklistItems: string[] = [];
  $("li").each((_, el) => {
    const text = $(el).text().trim();
    // 格式：☐ #N 第X條（title）：...
    if (text.startsWith("☐") || text.startsWith("□")) {
      // 取 strong 的文字（e.g. "#1 第 6 條（照顧計畫）："）
      const strong = $(el).find("strong").first().text().trim();
      if (strong) {
        // 移除開頭的 ☐/#序號，保留核心描述
        const cleaned = strong.replace(/^[☐□#\d\s]+/, "").replace(/[：:]\s*$/, "").trim();
        checklistItems.push(truncate(cleaned, 20));
      } else {
        // 沒有 strong，直接取文字
        const cleaned = text.replace(/^[☐□]\s*/, "").trim();
        checklistItems.push(truncate(cleaned, 20));
      }
    }
  });

  // ── 5. H2 章節 + 各章節的重點抓取 ──────────────────────────────────────────
  const sections: ArticleSection[] = [];

  // 找出所有 h2，依照 DOM 順序處理
  $("h2").each((_, h2el) => {
    const h2Text = $(h2el).text().trim();

    // 跳過 FAQ 和自查清單和延伸閱讀章節
    if (
      h2Text.includes("FAQ") ||
      h2Text.includes("常見問題") ||
      h2Text.includes("延伸閱讀") ||
      h2Text.includes("自查清單")
    ) return;

    const keyPoints: KeyPoint[] = [];

    // 先嘗試解析為「缺失 #N」格式
    const defMeta = parseDeficiencyH2(h2Text);
    if (defMeta) {
      // 從 H2 後面的第一個 P 取說明（不包含強調的子標題）
      const nextEls = $(h2el).nextAll();
      let desc = "";
      nextEls.each((_, el) => {
        const tag = el.tagName?.toLowerCase();
        if (tag === "h2") return false; // 遇到下一個 h2 停止
        if (tag === "p") {
          const pText = $(el).text().trim();
          // 跳過只含連結的 P
          if (pText && !pText.startsWith("①") && !pText.startsWith("②") && !pText.startsWith("③")) {
            desc = truncate(firstSentence(pText), 56);
            return false;
          }
        }
      });

      // 如果第一個 P 是小標開頭（①②③），改取 blockquote
      if (!desc) {
        $(h2el).nextAll("blockquote").first().each((_, bq) => {
          const bqText = $(bq).text().trim().replace(/第\d+條基準說明[：:]\s*/, "");
          desc = truncate(firstSentence(bqText), 56);
        });
      }

      keyPoints.push({
        rank: defMeta.rank,
        articleRef: defMeta.articleRef,
        title: truncate(defMeta.title, 10),
        description: desc || truncate(h2Text, 56),
        responsible: defMeta.responsible,
      });

      sections.push({
        title: h2Text,
        keyPoints,
      });
      return;
    }

    // 非「缺失 #N」格式：從 h2 後面的 li>strong 抓取重點條目
    $(h2el).nextAll().each((_, el) => {
      const tag = el.tagName?.toLowerCase();
      if (tag === "h2") return false; // 遇到下一個 h2 停止
      if (tag === "ul" || tag === "ol") {
        $(el).find("li").each((_, li) => {
          const liText = $(li).text().trim();
          if (liText.startsWith("☐") || liText.startsWith("□")) return; // 跳過清單

          const strong = $(li).find("strong").first().text().trim();
          if (!strong || strong.length < 2) return;

          // 嘗試解析缺失格式
          const defLi = parseDeficiencyLi(strong);
          if (defLi) {
            // 取 strong 後面的文字作為說明
            const fullText = liText.replace(strong, "").trim();
            const desc = truncate(firstSentence(fullText.replace(/^[：:\s]+/, "")), 56);
            keyPoints.push({
              rank: defLi.rank,
              articleRef: defLi.articleRef,
              title: truncate(defLi.title, 10),
              description: desc,
              responsible: defLi.responsible,
            });
          } else {
            // 一般重點條目：strong 為標題，後面文字為說明
            const fullText = liText.replace(strong, "").trim();
            const responsible = extractResponsible(strong);
            const cleanTitle = strong.replace(/（[^）]+）\s*$/, "").replace(/[：:]\s*$/, "").trim();
            const desc = truncate(firstSentence(fullText.replace(/^[：:\s]+/, "")), 56);
            if (cleanTitle.length > 0) {
              keyPoints.push({
                title: truncate(cleanTitle, 10),
                description: desc,
                responsible,
              });
            }
          }
        });
      }
    });

    if (h2Text.length > 0) {
      sections.push({ title: h2Text, keyPoints });
    }
  });

  // ── 6. 統計數字 ─────────────────────────────────────────────────────────────
  // 移除 HTML 標籤後計算字元數
  const plainText = $.text().replace(/\s+/g, "");
  const charCount = plainText.length;
  const allKeyPoints = sections.flatMap((s) => s.keyPoints);

  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    tags: article.tags,
    summary,
    sections,
    faqs,
    tableData,
    checklistItems,
    stats: {
      charCount,
      sectionCount: sections.length,
      keyPointCount: allKeyPoints.length,
      estimatedSvgCount: Math.round(charCount / 400),
    },
  };
}
