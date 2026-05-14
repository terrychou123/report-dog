// 首次提及機構名時自動注入 /school 內連結
// 每個關鍵字每篇只 link 一次，不在 <a>/<h1>/<h2>/<h3> 內重複 link
import { FACILITY_MAP, SORTED_KEYWORD_ENTRIES } from "./blog-facility-map";

const PROTECTED_RE = /(<(?:a|h[123])[^>]*>[\s\S]*?<\/(?:a|h[123])>)/gi;

/**
 * 在文章 HTML 中，每個機構關鍵字首次出現時注入 /school 內連結。
 * - 每個關鍵字全篇最多 link 一次
 * - 不改動 <a>/<h1>/<h2>/<h3> 內已有的文字
 * - 不改動 blog slug 本身所屬 facility 的關鍵字（避免過度自我引用）
 */
export function injectFacilityInlineLinks(html: string, slug: string): string {
  // 找出本文所屬 facility，避免對其過度自我 link
  const selfFacilityKey = SORTED_KEYWORD_ENTRIES.find(([kw]) =>
    slug.startsWith(kw.toLowerCase().replace(/\s+/g, "-"))
  )?.[1];

  // 把 protected 區段（<a>、<h1-3>）替換為佔位符，避免改動它們
  const placeholders: string[] = [];
  const stripped = html.replace(PROTECTED_RE, (match) => {
    placeholders.push(match);
    return `\x00P${placeholders.length - 1}\x00`;
  });

  const linked = new Set<string>(); // 已 link 的 facility key

  // 依長詞優先順序逐一替換
  let result = stripped;
  for (const [kw, facilityKey] of SORTED_KEYWORD_ENTRIES) {
    if (linked.has(facilityKey)) continue; // 同 facility 只 link 一次
    if (facilityKey === selfFacilityKey) continue; // 跳過自身 facility

    const facility = FACILITY_MAP[facilityKey];
    if (!facility) continue;

    const re = new RegExp(kw, "");
    if (!re.test(result)) continue;

    result = result.replace(re, (match) => {
      linked.add(facilityKey);
      return `<a href="${facility.schoolPath}" class="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary">${match}</a>`;
    });
  }

  // 還原佔位符
  return result.replace(/\x00P(\d+)\x00/g, (_, i) => placeholders[Number(i)]);
}
