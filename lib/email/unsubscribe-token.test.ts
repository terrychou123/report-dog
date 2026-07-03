import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { signUnsubscribeToken, verifyUnsubscribeToken } from "./unsubscribe-token";

// 這組測試保護退訂連結的正確性與不可偽造性：
// 驗證成功必須還原出「正確的 email + source」（退錯人 = 誤刪訂閱者），
// 偽造 token 必須失敗（否則任何人可以幫別人退訂）。

beforeEach(() => {
  vi.stubEnv("UNSUBSCRIBE_TOKEN_SECRET", "test-unsub-secret-32bytes-xxxxxxxxxx");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("roundtrip", () => {
  it("簽發後驗證，還原出相同的 email 與 source", () => {
    const token = signUnsubscribeToken("user@example.com", "newsletter");
    expect(verifyUnsubscribeToken(token)).toEqual({
      email: "user@example.com",
      source: "newsletter",
    });
  });

  it("email 含 + 與 unicode 也能正確還原（base64url 編碼不可退化）", () => {
    const email = "王小明+test@example.com";
    const token = signUnsubscribeToken(email, "download");
    expect(verifyUnsubscribeToken(token)?.email).toBe(email);
  });
});

describe("過期", () => {
  it("過期 token 回 null（負 TTL 直接製造過期）", () => {
    const token = signUnsubscribeToken("user@example.com", "newsletter", -10);
    expect(verifyUnsubscribeToken(token)).toBeNull();
  });
});

describe("偽造與竄改", () => {
  it("竄改 email 段（幫別人退訂）→ null，簽章必須涵蓋 email", () => {
    const token = signUnsubscribeToken("victim@example.com", "newsletter");
    const parts = token.split(".");
    // 換成攻擊者指定的 email，其餘不動
    parts[1] = Buffer.from("attacker@example.com").toString("base64url");
    expect(verifyUnsubscribeToken(parts.join("."))).toBeNull();
  });

  it("竄改 source → null，簽章必須涵蓋 source", () => {
    const token = signUnsubscribeToken("user@example.com", "newsletter");
    const parts = token.split(".");
    parts[2] = "download";
    expect(verifyUnsubscribeToken(parts.join("."))).toBeNull();
  });

  it("竄改簽章 → null", () => {
    const token = signUnsubscribeToken("user@example.com", "newsletter");
    expect(verifyUnsubscribeToken(token.slice(0, -2) + "zz")).toBeNull();
  });

  it.each(["", "a.b", "a.b.c", "not-a-token", "1.2.3.4.5.6"])(
    "垃圾輸入 %j → 不拋錯、回 null 或驗證失敗",
    (garbage) => {
      expect(verifyUnsubscribeToken(garbage)).toBeNull();
    }
  );
});
