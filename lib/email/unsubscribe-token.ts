import { createHmac, timingSafeEqual } from "node:crypto";

// 退訂 token TTL（秒）
const DEFAULT_TTL = 90 * 24 * 60 * 60; // 90 天

function getSecret(): string {
  const s = process.env.UNSUBSCRIBE_TOKEN_SECRET;
  if (!s) throw new Error("UNSUBSCRIBE_TOKEN_SECRET 環境變數未設定");
  return s;
}

function toBase64Url(input: string | Buffer): string {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function sign(payload: string): string {
  return toBase64Url(createHmac("sha256", getSecret()).update(payload).digest());
}

// token 格式：<expEpochSec>.<b64urlEmail>.<source>.<sig>
export function signUnsubscribeToken(email: string, source: string, ttlSeconds = DEFAULT_TTL): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const b64Email = toBase64Url(email);
  const payload = `${exp}|${email}|${source}`;
  return `${exp}.${b64Email}.${source}.${sign(payload)}`;
}

export function verifyUnsubscribeToken(token: string): { email: string; source: string } | null {
  const parts = token.split(".");
  // 至少 4 段（source 本身不含 dot，sig 可能含 dot 但僅最後一段）
  if (parts.length < 4) return null;

  const [expStr, b64Email, source, ...sigParts] = parts;
  const sig = sigParts.join(".");

  const exp = parseInt(expStr, 10);
  if (isNaN(exp)) return null;

  if (exp < Math.floor(Date.now() / 1000)) return null; // 已過期

  let email: string;
  try {
    email = Buffer.from(b64Email.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
  } catch {
    return null;
  }

  const payload = `${exp}|${email}|${source}`;
  const expected = sign(payload);

  try {
    const expBuf = Buffer.from(expected, "utf8");
    const actBuf = Buffer.from(sig.padEnd(expected.length, " "), "utf8");
    if (expBuf.length !== actBuf.length) return null;
    if (!timingSafeEqual(expBuf, actBuf)) return null;
  } catch {
    return null;
  }

  return { email, source };
}
