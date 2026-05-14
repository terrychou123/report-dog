// 首次提及機構名時自動注入 /school 內連結
// 每個 facility 每篇只 link 一次，不在 <a>/<h1-6>/<code>/<pre> 內重複 link
import { FACILITY_MAP, SORTED_KEYWORD_ENTRIES } from "./blog-facility-map";

// 每種 tag 用獨立的 open/close 對，避免交叉匹配（如 <a>...</code> 錯誤短路）
const PROTECTED_BLOCK_RE = new RegExp(
  [
    "<a\\b[^>]*>[\\s\\S]*?<\\/a>",
    "<pre\\b[^>]*>[\\s\\S]*?<\\/pre>",
    "<code\\b[^>]*>[\\s\\S]*?<\\/code>",
    "<h[1-6]\\b[^>]*>[\\s\\S]*?<\\/h[1-6]>",
  ]
    .map((p) => `(${p})`)
    .join("|"),
  "gi"
);

// 跳脫 RegExp 特殊字元，防止關鍵字含括號等字元時 crash
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * 在文章 HTML 中，每個機構關鍵字首次出現時注入 /school 內連結。
 * - 每個 facility 全篇最多 link 一次
 * - 不改動 <a>/<h1-6>/<code>/<pre> 內已有的文字
 * - 不改動 HTML tag 屬性值（僅替換文字節點）
 * - 不改動 blog slug 本身所屬 facility 的關鍵字
 */
export function injectFacilityInlineLinks(html: string, slug: string): string {
  // 比對 English facility key（如 "home-nursing"）而非中文關鍵字
  const selfFacilityKey = Object.keys(FACILITY_MAP).find((key) =>
    slug.includes(key)
  );

  // Step 1：把受保護區段替換為佔位符
  const placeholders: string[] = [];
  const stripped = html.replace(PROTECTED_BLOCK_RE, (match) => {
    placeholders.push(match);
    return `\x00P${placeholders.length - 1}\x00`;
  });

  const linked = new Set<string>();
  let result = stripped;

  for (const [kw, facilityKey] of SORTED_KEYWORD_ENTRIES) {
    if (linked.has(facilityKey)) continue;
    if (facilityKey === selfFacilityKey) continue;

    const facility = FACILITY_MAP[facilityKey];
    if (!facility) continue;

    const kwRe = new RegExp(escapeRegex(kw));

    // Step 2：僅在文字節點（非 tag markup）中替換，避免污染屬性值
    let matched = false;
    const next = result.replace(/([^<]+)|(<[^>]*>)/g, (_, text, tag) => {
      if (tag) return tag; // HTML tag — 不改
      if (matched || !text || !kwRe.test(text)) return text ?? ""; // 已替換或無匹配
      matched = true;
      linked.add(facilityKey);
      return text.replace(
        kwRe,
        (m: string) =>
          `<a href="${facility.schoolPath}" class="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary">${m}</a>`
      );
    });
    result = next;
  }

  // Step 3：還原佔位符（含越界防護）
  return result.replace(/\x00P(\d+)\x00/g, (fallback, i) => {
    const idx = Number(i);
    return idx < placeholders.length ? placeholders[idx] : fallback;
  });
}
