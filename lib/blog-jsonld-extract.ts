// render-time 從已清理的 blog HTML 萃取 HowTo / FAQPage schema 資料
// - HowTo：找所有 <h2>，同時為無 id 的 h2 注入 anchor id（輔助導覽）
// - FAQPage：找連續 <h3>Q/問…</h3><p>A/答…</p> 配對

export interface ExtractResult {
  /** 注入了 h2 id 的修改版 HTML（與原 sanitized HTML 同等安全） */
  contentWithIds: string;
  howtoSteps?: Array<{ name: string; url: string }>;
  faqItems?: Array<{ question: string; answer: string }>;
}

/** 將文字 slugify 為合法 anchor id（中文直接保留，移除危險字元） */
function slugify(text: string, index: number): string {
  const cleaned = text
    .replace(/<[^>]+>/g, "") // 去 HTML 標籤
    .trim()
    .toLowerCase()
    .replace(/[^\w一-鿿㐀-䶿-]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
  return cleaned || `section-${index + 1}`;
}

/** 從 HTML 萃取 h2 text list，同時為無 id 的 h2 注入 id */
function extractH2Steps(
  html: string,
  slug: string
): { modified: string; steps: Array<{ name: string; url: string }> } {
  const steps: Array<{ name: string; url: string }> = [];
  let index = 0;
  // 追蹤已用 id，防止相同文字產生重複 anchor（如兩個「注意事項」）
  const usedIds = new Set<string>();

  const modified = html.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    (match, attrs: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (!text) return match;

      // 若已有 id 則直接用
      const existingId = /\bid="([^"]+)"/.exec(attrs)?.[1];
      let id = existingId ?? slugify(text, index);
      index++;

      // 處理重複 id：在末尾加 -2、-3 …
      if (!existingId) {
        let suffix = 2;
        while (usedIds.has(id)) {
          id = `${slugify(text, index - 1)}-${suffix++}`;
        }
      }
      usedIds.add(id);

      steps.push({ name: text, url: `https://reportwang.com/blog/${slug}#${id}` });

      if (existingId) return match;
      return `<h2${attrs} id="${id}">${inner}</h2>`;
    }
  );

  return { modified, steps };
}

// 支援的 Q/A 前綴模式（中英文）
const Q_PREFIX = /^(?:Q[：:]\s*|問[：:]\s*)/i;
const A_PREFIX = /^(?:A[：:]\s*|答[：:]\s*)/i;

/** 從 HTML 找連續 h3+p 配對萃取 FAQ */
function extractFaqPairs(html: string): Array<{ question: string; answer: string }> {
  const pairs: Array<{ question: string; answer: string }> = [];

  // 找所有 <h3>...<\/h3>\s*<p>...<\/p> 配對
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
 * 從已 sanitized 的 blog HTML 萃取 JSON-LD 資料。
 * ≥3 個 h2 → HowTo；≥2 個 Q/A 配對 → FAQPage。
 * 同時為 h2 注入 anchor id（輔助 HowTo step.url）。
 */
export function extractBlogJsonLdData(html: string, slug: string): ExtractResult {
  const { modified, steps } = extractH2Steps(html, slug);
  const faqItems = extractFaqPairs(modified);

  return {
    contentWithIds: modified,
    howtoSteps: steps.length >= 3 ? steps : undefined,
    faqItems: faqItems.length >= 2 ? faqItems : undefined,
  };
}
