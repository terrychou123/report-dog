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

### 法規檔案（自動載入，免手動 ingest）

`knowledge/sources/external/regulations/**/*.md` 由 `lib/ai/wiki-context.ts` 在 AI 評鑑時**直接載入**，不需執行 ingest 步驟。

**必要 frontmatter 欄位：**

```yaml
---
title: 法規名稱（用作 H3 標題）
source: 法規原始 URL
type: 法律 | 辦法 | 標準 | index
applicable_to: [profile-id-1, profile-id-2]  # 或 [all] 代表全機構類型
---
```

**排除規則：**
- `README.md` 一律跳過
- frontmatter `type: index` 的檔案跳過

**有效的 profileId**：babycare, daycare, daycare, disability-welfare, elderly-welfare, general-nursing-home, home-care, home-nursing, hospital, infant-daycare, nursing-home, psychiatric-nursing-home, psychiatric-rehabilitation-day, psychiatric-rehabilitation-residential, youth-care

修法時只需更新 `sources/external/regulations/` 內容即可，法規區塊（`## 法規合規依據`）會在下次 AI 評鑑呼叫時自動更新，預算上限 2000 字元。

## 與 AI 評鑑功能的整合

`lib/ai/wiki-context.ts` 會在 `/api/reports/evaluation` 呼叫時自動讀取相關 wiki 頁面，補充到系統提示中，讓 AI 分析更精準。法規依據（`## 法規合規依據`）附加於 system prompt 末段，預算 2000 字元，依 `applicable_to` frontmatter 匹配機構類型自動注入。
