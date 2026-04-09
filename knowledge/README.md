# 報告汪評鑑知識庫

基於 Andrej Karpathy 的 LLM Wiki 模式，將 14 種長照機構評鑑的知識編譯成結構化的 Markdown 維基百科。

## 架構說明

```
knowledge/
├── _schema/          # 第三層：規則書（告訴 AI 如何整理知識）
├── sources/          # 第一層：原始資料（只讀，不得手動修改）
└── wiki/             # 第二層：AI 維護的知識百科
```

## 三層角色

| 層級 | 資料夾 | 說明 | 可修改？ |
|------|--------|------|--------|
| 規則書 | `_schema/` | 頁面格式、命名規範、分類標籤 | 人工維護 |
| 原始資料 | `sources/` | 從程式碼萃取的評鑑基準、準備提示、附件表 | **只讀**，用腳本更新 |
| 維基 | `wiki/` | AI 整合、交叉引用、深度分析的知識頁面 | AI 維護 |

## 常用指令

```bash
# 從程式碼萃取原始資料到 sources/
npm run wiki:extract

# 生成/更新 wiki 頁面
npm run wiki:generate

# 健康檢查（斷連結、遺漏覆蓋、矛盾）
npm run wiki:lint
```

## 維護流程

### 新增評鑑年度資料（例如 115 → 116 年）

1. 更新 `lib/ai/evaluation-profiles/{type}.ts`
2. 執行 `npm run wiki:extract`（重新萃取 sources）
3. 執行 `npm run wiki:generate`（更新 wiki 頁面）
4. 執行 `npm run wiki:lint`（確認無問題）

### 新增外部資料（政府公文、法規更新）

1. 將資料放入 `knowledge/sources/external/`
2. 用 Claude Code 執行 ingest：「請吸收這份新資料到評鑑知識庫」

## 與 AI 評鑑功能的整合

`lib/ai/wiki-context.ts` 會在 `/api/reports/evaluation` 呼叫時自動讀取相關 wiki 頁面，補充到系統提示中，讓 AI 分析更精準。
