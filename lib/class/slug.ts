// slug 格式：小寫英數字 + 連字號，不可首尾 -
export const SLUG_RE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/;
export const SLUG_ERROR = "slug 只能包含小寫英數字與連字號，且不可以連字號開頭或結尾";

export function validateSlug(slug: string): boolean {
  return SLUG_RE.test(slug);
}

// 嘗試將任意字串 sanitize 為合法 slug；無法修復時回傳 null
export function sanitizeSlug(raw: string): string | null {
  const s = raw
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
  return validateSlug(s) ? s : null;
}
