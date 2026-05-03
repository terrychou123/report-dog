// Blog HTML 後處理工具
// 1. 為 h2/h3 注入 anchor id 並萃取 TOC 樹
// 2. 為 <img> 注入 loading/decoding 以啟用延遲載入

/** 將文字 slugify 為合法 anchor id（中文直接保留，移除危險字元） */
export function slugify(text: string, index: number): string {
  const cleaned = text
    .replace(/<[^>]+>/g, "") // 去 HTML 標籤
    .trim()
    .toLowerCase()
    .replace(/[^\w一-鿿㐀-䶿-]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
  return cleaned || `section-${index + 1}`;
}

/** TOC 節點：h2 為頂層，h3 收進 children */
export interface TocNode {
  id: string;
  text: string;
  level: 2 | 3;
  children?: TocNode[];
}

/**
 * 一次掃描 HTML，為 h2 與 h3 注入 id，並萃取巢狀 TOC 樹。
 * - 已有 id 的 heading 保留原 id
 * - 重複文字以 -2 / -3 後綴避免衝突
 * - 無前置 h2 的孤立 h3 升為頂層節點
 */
export function injectHeadingIdsAndExtractToc(
  html: string,
): { html: string; toc: TocNode[] } {
  const toc: TocNode[] = [];
  const usedIds = new Set<string>();
  let h2Index = 0;
  let h3Index = 0;
  let currentH2Node: TocNode | null = null;

  // 同時處理 h2 與 h3，依出現順序維持文章邏輯
  const result = html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (match, tag: string, attrs: string, inner: string) => {
      const level = parseInt(tag[1], 10) as 2 | 3;
      const rawText = inner.replace(/<[^>]+>/g, "").trim();
      if (!rawText) return match;

      // 若已有 id 則保留
      const existingId = /\bid="([^"]+)"/.exec(attrs)?.[1];
      let id: string;

      if (existingId) {
        id = existingId;
        usedIds.add(id);
      } else {
        // 產生 id 並防重複
        const baseId = slugify(rawText, level === 2 ? h2Index : h3Index);
        id = baseId;
        let suffix = 2;
        while (usedIds.has(id)) {
          id = `${baseId}-${suffix++}`;
        }
        usedIds.add(id);
      }

      if (level === 2) {
        h2Index++;
        const node: TocNode = { id, text: rawText, level: 2 };
        toc.push(node);
        currentH2Node = node;
      } else {
        h3Index++;
        const node: TocNode = { id, text: rawText, level: 3 };
        if (currentH2Node) {
          // 收進最近的 h2 children
          currentH2Node.children = currentH2Node.children ?? [];
          currentH2Node.children.push(node);
        } else {
          // 無前置 h2，升為頂層
          toc.push(node);
        }
      }

      // 已有 id 則不改動原始 HTML
      if (existingId) return match;
      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
    },
  );

  return { html: result, toc };
}

/**
 * 為缺少 loading 屬性的 <img> 注入 loading/decoding。
 * firstImageEager: 第一張用 eager（通常在折頁附近），其餘 lazy。
 */
export function injectImageLoadingAttrs(
  html: string,
  opts: { firstImageEager?: boolean } = {},
): string {
  const { firstImageEager = false } = opts;
  let imgCount = 0;

  return html.replace(/<img(\s[^>]*)?>/gi, (match, attrs: string = "") => {
    // 已有 loading 屬性則保留原樣
    if (/\bloading\s*=/.test(attrs)) return match;

    imgCount++;
    const loadingValue = firstImageEager && imgCount === 1 ? "eager" : "lazy";

    // 加在屬性字串尾端（保留原有屬性不動）
    // 去掉 XHTML 自閉合尾端的 /（如 <img ... />），避免 / 插在屬性中間
    const cleanAttrs = attrs.replace(/\s*\/$/, "");
    const extra = ` loading="${loadingValue}" decoding="async"`;
    return `<img${cleanAttrs}${extra}>`;
  });
}
