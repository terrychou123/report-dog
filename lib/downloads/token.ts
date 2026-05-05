import { createHmac, timingSafeEqual } from "node:crypto";

function getSecret(): string {
  const s = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!s) throw new Error("DOWNLOAD_TOKEN_SECRET 環境變數未設定");
  return s;
}

function toBase64Url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function sign(payload: string): string {
  return toBase64Url(createHmac("sha256", getSecret()).update(payload).digest());
}

// token 格式：<expEpochSec>.<base64urlSig>
export function signDownloadToken(file: string, ttlSeconds = 900): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payload = `${exp}.${file}`;
  return `${exp}.${sign(payload)}`;
}

export function verifyDownloadToken(
  token: string,
  file: string
): { ok: boolean; reason?: "expired" | "invalid" } {
  const dotIdx = token.indexOf(".");
  if (dotIdx === -1) return { ok: false, reason: "invalid" };

  const expStr = token.slice(0, dotIdx);
  const exp = parseInt(expStr, 10);
  if (isNaN(exp)) return { ok: false, reason: "invalid" };

  const now = Math.floor(Date.now() / 1000);
  if (exp < now) return { ok: false, reason: "expired" };

  const payload = `${exp}.${file}`;
  const expected = sign(payload);
  const actual = token.slice(dotIdx + 1);

  try {
    const expBuf = Buffer.from(expected, "utf8");
    const actBuf = Buffer.from(actual.padEnd(expected.length, " "), "utf8");
    if (expBuf.length !== actBuf.length) return { ok: false, reason: "invalid" };
    if (!timingSafeEqual(expBuf, actBuf)) return { ok: false, reason: "invalid" };
  } catch {
    return { ok: false, reason: "invalid" };
  }

  return { ok: true };
}
