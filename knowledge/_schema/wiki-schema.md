# Wiki 頁面規範（Wiki Schema）

## 頁面類型與 Frontmatter

每個 wiki Markdown 檔案**必須**有 YAML frontmatter，依頁面類型填寫對應欄位：

### 類型 `item`（指標頁面）

```yaml
---
type: item
facility_type: daycare          # 必填：機構 profile ID（見 taxonomy.md）
item_id: 1                       # 必填：數字，對應 profile 中的 item.id
title: 服務資訊公開                # 必填：繁體中文
section: 壹、個案權益保障          # 必填：所屬區塊名稱
short_code: 權                   # 必填：區塊短碼（如「權」）
responsible: 行政                 # 負責職務
review_method: 文件檢閱、現場訪談  # 評鑑審查方式
tags: [documentation, client-rights]  # 主題標籤（見 taxonomy.md）
source_refs:                      # 資料來源（相對於 knowledge/sources/）
  - profiles/daycare.md
  - tips/daycare-tips.md
last_updated: 2026-04-09
---
```

**必填章節：**

1. `## 評鑑基準（WHAT）`  — 條列式基準，來自 profile.criteria
2. `## 準備方式（HOW）`   — 實務準備建議，來自 DocsTip
3. `## 所需文件（WITH WHAT）` — 表單名稱與欄位，來自 supplementary-sheets（無則省略）
4. `## 常見缺失`          — ⚠️ 警告型 tip 或已知常見錯誤
5. `## 相關主題`          — 連結到 `../../../topics/` 下的主題頁

---

### 類型 `overview`（機構概覽頁）

```yaml
---
type: overview
facility_type: daycare
title: 日間照顧中心評鑑概覽
year: 115
total_items: 43
bonus_items: 2
source_refs: [profiles/daycare.md]
last_updated: 2026-04-09
---
```

**必填章節：**
1. `## 評鑑概要`    — 機構類型說明、主辦機關、年度
2. `## 區塊結構`    — 各區塊名稱、短碼、項目數、連結
3. `## 評分方式`    — A-E 五等制或其他評分說明
4. `## 準備要點`    — 高優先、常被扣分的項目提示
5. `## 年度重點變更` — 與上一年度的差異（初版可留空）

---

### 類型 `preparation-guide`（準備指南）

```yaml
---
type: preparation-guide
facility_type: daycare
title: 日間照顧中心評鑑準備完整指南
tags: [documentation, quality-monitoring]
source_refs: [profiles/daycare.md, tips/daycare-tips.md]
last_updated: 2026-04-09
---
```

**必填章節：**
1. `## 準備時程建議`  — 評鑑前 N 個月/週/天的工作清單
2. `## 優先準備項目`  — 最容易被扣分、最值得投資的指標
3. `## 常見錯誤`      — 歷年評鑑常見缺失（條列，附指標編號）
4. `## 文件清單`      — 依區塊列出所有需備齊的文件
5. `## 評鑑當天注意`  — 現場訪談、文件抽查的應對技巧

---

### 類型 `topic`（跨機構主題頁）

```yaml
---
type: topic
topic_id: infection-control
title: 感染控制
tags: [infection-control]
facility_types_affected: [daycare, nursing-home, hospital, elderly-welfare]
last_updated: 2026-04-09
---
```

**必填章節：**
1. `## 概念說明`          — 主題的定義與重要性
2. `## 涉及機構對照表`     — 表格：機構類型 | 指標編號 | 具體基準
3. `## 共通最佳實踐`       — 跨機構適用的準備建議
4. `## 常見問題`           — Q&A 格式
5. `## 相關指標`           — 連結到各機構的具體指標頁

---

### 類型 `faq`（常見問答）

```yaml
---
type: faq
facility_type: daycare      # 或 general（跨機構）
title: 日間照顧中心評鑑常見問答
last_updated: 2026-04-09
---
```

格式：
```markdown
## Q: 問題標題？

**A：** 回答內容。

> 📌 相關指標：[權1 服務資訊公開](../items/01-service-info.md)
```

---

## 檔案命名規範

| 類型 | 命名格式 | 範例 |
|------|---------|------|
| 指標頁 | `{id:02d}-{english-slug}.md` | `01-service-info.md` |
| 概覽頁 | `overview.md` | `overview.md` |
| 準備指南 | `preparation-guide.md` | `preparation-guide.md` |
| 評分細則 | `scoring-rubric.md` | `scoring-rubric.md` |
| 主題頁 | `{topic-id}.md` | `infection-control.md` |
| FAQ | `{facility-type}.md` 或 `general.md` | `daycare.md` |

- 資料夾名稱使用 `kebab-case`（英文小寫加連字號）
- 內容使用繁體中文
- 指標 ID 補零為 2 位數（如 `01`、`09`、`10`）

---

## 交叉引用格式

```markdown
<!-- 連結到其他指標頁 -->
[01 服務資訊公開](./items/01-service-info.md)

<!-- 連結到主題頁 -->
[感染控制](../../topics/infection-control.md)

<!-- 引用原始資料 -->
> 來源：[profiles/daycare.md](../../../sources/profiles/daycare.md)
```

---

## index.md 格式

`knowledge/wiki/index.md` 為全域目錄，每條目一行：

```markdown
- [daycare/overview.md](facility-types/daycare/overview.md) — 日間照顧中心，43 項，115 年度
- [daycare/items/01-service-info.md](facility-types/daycare/items/01-service-info.md) — 日照 權1：服務資訊公開
```

## log.md 格式

```markdown
## [2026-04-09] generate | 初版生成

- 生成來源：extract-wiki-sources.ts + generate-wiki.ts
- 涵蓋機構：14 種
- 指標頁面：600+ 頁
- 主題頁面：15 頁
```
