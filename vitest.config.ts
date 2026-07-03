import { defineConfig } from "vitest/config";
import path from "node:path";

// 只測 lib/ 純函數（node 環境、無 DOM）；component/route 測試目前不在範圍
export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
  resolve: {
    // 對齊 tsconfig 的 @/ path alias
    alias: { "@": path.resolve(__dirname) },
  },
});
