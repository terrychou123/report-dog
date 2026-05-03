// render-time 從已清理的 blog HTML 萃取 HowTo / FAQPage schema 資料
// - HowTo：讀取 injectHeadingIdsAndExtractToc 已注入的 h2 id，組 step.url
// - FAQPage：找連續 <h3>Q/問…</h3><p>A/答…</p> 配對
// slugify 已移至 lib/blog-html-postprocess.ts 統一管理

export interface ExtractResult {
  /** 與傳入的 HTML 相同（id 已由 injectHeadingIdsAndExtractToc 注入） */
  contentWithIds: string;
  howtoSteps?: Array<{ name: string; url: string }>;
  faqItems?: Array<{ question: string; answer: string }>;
}

/** 讀取 h2 的既有 id（由 injectHeadingIdsAndExtractToc 注入），組 HowTo step.url */
function readH2Steps(
  html: string,
  slug: string,
): Array<{ name: string; url: string }> {
  const steps: Array<{ name: string; url: string }> = [];

  const re = /<h2([^>]*)>([\s\S]*?)<\/h2>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const attrs = m[1];
    const inner = m[2];
    const text = inner.replace(/<[^>]+>/g, "").trim();
    if (!text) continue;

    const id = /\bid="([^"]+)"/.exec(attrs)?.[1];
    if (!id) continue; // id 應已由前置步驟注入，無 id 則略過

    steps.push({ name: text, url: `https://reportwang.com/blog/${slug}#${id}` });
  }

  return steps;
}

// 支援的 Q/A 前綴模式（中英文）
const Q_PREFIX = /^(?:Q[：:]\s*|問[：:]\s*)/i;
const A_PREFIX = /^(?:A[：:]\s*|答[：:]\s*)/i;

/** 從 HTML 找連續 h3+p 配對萃取 FAQ */
function extractFaqPairs(html: string): Array<{ question: string; answer: string }> {
  const pairs: Array<{ question: string; answer: string }> = [];

  const re = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const rawQ = m[1].replace(/<[^>]+>/g, "").trim();
    const rawA = m[2].replace(/<[^>]+>/g, "").trim();
    if (Q_PREFIX.test(rawQ)) {
      const question = rawQ.replace(Q_PREFIX, "").trim();
      const answer = A_PREFIX.test(rawA) ? rawA.replace(A_PREFIX, "").trim() : rawA;
      if (question && answer) pairs.push({ question, answer });
    }
  }

  return pairs;
}

/**
 * 從已處理（h2/h3 id 已注入）的 blog HTML 萃取 JSON-LD 資料。
 * ≥3 個 h2 → HowTo；≥2 個 Q/A 配對 → FAQPage。
 * HTML 本身不再修改，直接回傳。
 */
export function extractBlogJsonLdData(html: string, slug: string): ExtractResult {
  const steps = readH2Steps(html, slug);
  const faqItems = extractFaqPairs(html);

  return {
    contentWithIds: html,
    howtoSteps: steps.length >= 3 ? steps : undefined,
    faqItems: faqItems.length >= 2 ? faqItems : undefined,
  };
}
