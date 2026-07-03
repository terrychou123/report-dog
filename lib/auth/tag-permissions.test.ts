import { describe, it, expect } from "vitest";
import { canViewTag, canEditTag, isTagOwner, type TagWithPermissions } from "./tag-permissions";

// 這組測試保護的是共享模型的安全邊界：
// viewer 只能看不能編、editor 能編不能擁有、非成員什麼都不行。
// 任何一條翻轉都代表權限外洩或功能損壞。

const OWNER = "user-owner";
const VIEWER = "user-viewer";
const EDITOR = "user-editor";
const STRANGER = "user-stranger";

const tag: TagWithPermissions = {
  userId: OWNER,
  viewers: [VIEWER],
  editors: [EDITOR],
};

describe("canViewTag", () => {
  it("owner、viewer、editor 都可看", () => {
    expect(canViewTag(OWNER, tag)).toBe(true);
    expect(canViewTag(VIEWER, tag)).toBe(true);
    expect(canViewTag(EDITOR, tag)).toBe(true); // editor 隱含可看，UI 依賴此行為
  });

  it("非成員不可看", () => {
    expect(canViewTag(STRANGER, tag)).toBe(false);
  });
});

describe("canEditTag", () => {
  it("owner 與 editor 可編", () => {
    expect(canEditTag(OWNER, tag)).toBe(true);
    expect(canEditTag(EDITOR, tag)).toBe(true);
  });

  it("viewer 不可編——viewer 升級成可編即權限外洩", () => {
    expect(canEditTag(VIEWER, tag)).toBe(false);
  });

  it("非成員不可編", () => {
    expect(canEditTag(STRANGER, tag)).toBe(false);
  });
});

describe("isTagOwner", () => {
  it("只有 owner 為真，editor 也不行（刪除/轉移等操作依賴此判斷）", () => {
    expect(isTagOwner(OWNER, tag)).toBe(true);
    expect(isTagOwner(EDITOR, tag)).toBe(false);
    expect(isTagOwner(VIEWER, tag)).toBe(false);
  });
});

describe("null 陣列容錯（DB 欄位可為 null）", () => {
  const nullTag: TagWithPermissions = { userId: OWNER, viewers: null, editors: null };

  it("viewers/editors 為 null 時不拋錯，且只有 owner 有權限", () => {
    expect(canViewTag(OWNER, nullTag)).toBe(true);
    expect(canViewTag(STRANGER, nullTag)).toBe(false);
    expect(canEditTag(STRANGER, nullTag)).toBe(false);
  });
});
