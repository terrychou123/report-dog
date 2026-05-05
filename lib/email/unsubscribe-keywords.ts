const KEYWORDS = [
  "退訂", "取消訂閱", "取消訂阅", "不再收", "停止訂閱", "停止接收",
  "unsubscribe", "opt out", "opt-out", "stop", "remove me", "remove", "cancel",
];

// 判斷回信是否為退訂意圖（主旨或純文字內文含白名單關鍵字）
// 僅看最新回信段落（>= 第一個 ">" 引言符號之前），降低 quoted reply 造成的 false positive
export function isUnsubscribeIntent(subject: string, text: string): boolean {
  // 取 quoted reply 之前的內容（大多數 email client 用 ">" 或 "On ... wrote:" 分隔）
  const latest = text.split(/\n[>]|\nOn .+wrote:/)[0] ?? "";
  const haystack = `${subject ?? ""}\n${latest}`.toLowerCase();
  return KEYWORDS.some((k) => haystack.includes(k.toLowerCase()));
}
