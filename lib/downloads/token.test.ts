import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { signDownloadToken, verifyDownloadToken } from "./token";

// 這組測試保護下載 gate 的收費/名單邏輯：
// token 綁定「特定檔案 + 期限」，偽造、換檔、過期都必須被擋下，
// 否則任何人可以繞過 email 收集直接拿檔案。

beforeEach(() => {
  vi.stubEnv("DOWNLOAD_TOKEN_SECRET", "test-secret-32bytes-minimum-xxxxxxxx");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("簽發與驗證 roundtrip", () => {
  it("同一檔案、期限內 → ok", () => {
    const token = signDownloadToken("daycare.xlsx");
    expect(verifyDownloadToken(token, "daycare.xlsx")).toEqual({ ok: true });
  });

  it("token 綁定檔名：拿 A 檔的 token 下載 B 檔必須失敗", () => {
    const token = signDownloadToken("daycare.xlsx");
    expect(verifyDownloadToken(token, "nursing-home.xlsx")).toEqual({
      ok: false,
      reason: "invalid",
    });
  });
});

describe("過期", () => {
  it("已過期的 token 回 expired（用負 TTL 直接製造過期）", () => {
    const token = signDownloadToken("daycare.xlsx", -10);
    expect(verifyDownloadToken(token, "daycare.xlsx")).toEqual({
      ok: false,
      reason: "expired",
    });
  });
});

describe("竄改與畸形輸入", () => {
  it("竄改簽章 → invalid", () => {
    const token = signDownloadToken("daycare.xlsx");
    const tampered = token.slice(0, -2) + "zz";
    expect(verifyDownloadToken(tampered, "daycare.xlsx").ok).toBe(false);
  });

  it("竄改期限（延長效期）→ invalid，簽章必須涵蓋 exp", () => {
    const token = signDownloadToken("daycare.xlsx");
    const sig = token.slice(token.indexOf(".") + 1);
    const farFuture = Math.floor(Date.now() / 1000) + 999999;
    expect(verifyDownloadToken(`${farFuture}.${sig}`, "daycare.xlsx")).toEqual({
      ok: false,
      reason: "invalid",
    });
  });

  it.each(["", "no-dot", "abc.def", "123", "..."])(
    "垃圾輸入 %j → 不拋錯、不通過",
    (garbage) => {
      expect(verifyDownloadToken(garbage, "daycare.xlsx").ok).toBe(false);
    }
  );
});

describe("secret 缺失", () => {
  it("未設 DOWNLOAD_TOKEN_SECRET 時簽發直接拋錯（fail loud，不能簽出弱 token）", () => {
    vi.stubEnv("DOWNLOAD_TOKEN_SECRET", "");
    expect(() => signDownloadToken("daycare.xlsx")).toThrow();
  });
});
