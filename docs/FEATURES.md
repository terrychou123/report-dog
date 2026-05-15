# 報告汪 (reportwang.com) 實際功能清單 — SSOT

**最後盤點日期**：2026-05-15
**用途**：寫部落格、landing、行銷文案、產品介紹時的事實依據。**禁止寫入未列於本清單的功能**。

---

## 維護規則

1. 修改產品功能時，**必須同步更新本檔**（新增 / 刪除 / 修改功能皆然）。
2. 寫「報告汪如何/能/支援...」段落前，必須先讀本檔；引用功能時用本檔的措辭。
3. 若本檔某項功能與 codebase 不符（例如已重構），優先**修正本檔**，並標記檢查日期。
4. 「不存在」清單同樣權威——禁用清單中的詞彙描述產品。

---

## A. AI 功能

> **核心定位**：報告汪的 AI **修改既有文件**（編輯、改寫、分析、評分），**不從零生成**完整計畫書或評估表。

### A1. 段落改寫 AI（含 SOAP 結構化）

| 項目 | 說明 |
|---|---|
| 路由 | `app/api/reports/[id]/ai/route.ts` |
| 功能 | 接收一個段落 + 自由指令 → 改寫；可開啟 `soap: true` 改寫為 SOAP 四段式（主觀／客觀／評估／計畫） |
| 輸入 | `{ paragraph: string ≤ 10000 字, instruction: string, soap?: boolean }` |
| 輸出 | JSON（**非 streaming**） |
| 模型 | `anthropic/claude-sonnet-4.6` via OpenRouter |
| 限額 | 此 endpoint 不消耗每日配額，僅需登入 |
| 行銷可寫 | 「AI 改寫既有段落」「一鍵 SOAP 結構化」「資料不足會自動標註待補」 |
| 行銷不可寫 | 「AI 從零起稿」「AI 自動生成計畫」「streaming 即時」 |

### A2. 評鑑五面向分析（跨報告）

| 項目 | 說明 |
|---|---|
| 路由 | `app/api/reports/evaluation/route.ts` |
| 五面向 | (1) 缺少資料 / (2) 不合理或矛盾 / (3) 應追蹤未追蹤 / (4) 符合項目 / (5) 改善建議 |
| 第六面向 | 報告數 ≥ 2 時自動加上「報告間一致性檢查」 |
| 輸入 | `{ reportIds: string[1..50], profileId: string }` |
| 輸出 | text streaming |
| 限額 | 消耗每日 AI 配額（free tier = 1 次／天，UTC 日切，與 A3 共用額度） |
| Prompt 注入 | 自動拉取對應機構類型評鑑指標 + wiki 補充（preparation-guide / scoring-rubric / 歷年常見缺失最多 8 項）+ 法規依據 |
| 行銷可寫 | 「上傳既有報告 → AI 比對 X 機構類型 N 項評鑑指標 → 五面向逐項分析」 |
| 行銷不可寫 | 「AI 自動填寫評鑑表」「AI 從零生成評估報告」「跨報告即時監控」 |

### A3. 文件 AI（4 個 action）

| 路由 | `app/api/documents/[id]/ai/route.ts` |
|---|---|
| Action | `analyze` / `improve` / `summarize` / `extract-data`（**四個固定 action，無其他**） |
| analyze | 找 key insights / strengths / weaknesses / improvement suggestions |
| improve | 改寫整份文件、保留原意（**改寫，非從零生成**） |
| summarize | 3–5 段 executive summary |
| extract-data | 抽出 numbers / dates / entities / keyFacts 結構化 JSON |
| 輸出 | streaming |
| 限額 | 消耗每日 AI 配額（與 A2 共用） |

### A4. SOAP 公開 Demo

| 路由 | `app/api/demo/soap/route.ts` |
|---|---|
| 公開／登入 | 公開（不需登入） |
| 限額 | 3 次／IP／UTC 日 |
| 範例資料 | `lib/ai/soap-demo-examples.ts` 內建 3 個（home-nursing、general-nursing-home、daycare） |
| 行銷可寫 | 「試用無需登入，每日 3 次免費」 |

### A5. 評鑑 Profile（15 個 profile id，對應 12 種機構類型大類）

| Profile ID | 機構類型 | 項目數 |
|---|---|---|
| `daycare` | 日間照顧中心 | 45 |
| `nursing-home` | 住宿型照顧機構 | 66 |
| `home-care` | 居家服務機構 | 33 |
| `hospital` | 醫院評鑑 | 124 |
| `disability-welfare` | 身心障礙福利機構 | 49 |
| `babycare` | 產後護理之家 | 17 |
| `home-nursing` | 居家護理所 | 8 |
| `general-nursing-home` | 一般護理之家 | 15 |
| `youth-care` | 兒少安置機構 | 35 |
| `elderly-welfare` | 老人福利機構 | 77 |
| `psychiatric-nursing-home` | 精神護理之家 | 36 |
| `infant-daycare` | 托嬰中心 | 60 |
| `psychiatric-rehabilitation-day` | 精神復健機構（日間） | 36 |
| `psychiatric-rehabilitation-residential` | 精神復健機構（住宿） | 40 |
| `multi-function-care` | 小規模多機能 | 47 |

### A6. AI 用量限額

| 規則 | 所有使用者目前 tier 寫死為 `free` = **1 次／天／使用者**（UTC 日切） |
|---|---|
| 共用 | A2 + A3 共用同一額度（A1 不消耗） |
| 機制 | `ai_usage` 表 `(userId, dateBucket)` unique index 原子鎖 |

---

## B. 報告與文件管理

| 功能 | 實作 |
|---|---|
| Rich text 編輯器 | TipTap（用於 report 編輯、admin 範本編輯、blog 編輯） |
| Excel 編輯器 | FortuneSheet（`components/fortune-editor-inner.tsx`） |
| .docx 上傳解析 | `mammoth` via `/api/parse-doc`、`/api/convert-docx` |
| .xlsx 解析 / 匯出 | `exceljs` via `/api/excel/parse`、`/api/excel/export` |
| .docx 匯出 | `html-to-docx` |
| 版本歷史 | `revisions`（documents）／`report_revisions`（reports）／`template_revisions`（範本，最多 5 筆） |
| 報告排序 | `/api/reports/reorder`、`/api/tags/reorder`、`/api/tag-reports/reorder` |
| 複製報告 | `/api/reports/[id]/copy` |

---

## C. 範本與評鑑

| 功能 | 實作 |
|---|---|
| 範本匯入 | `/api/templates/import`（一鍵複製整套 tags + reports 到使用者帳號） |
| 範本標籤 | `template_tags`、`report_templates`、`template_tag_reports` |
| 自我檢核 xlsx 下載 | `lib/downloads/catalog.ts` 定義；實體於 `private/downloads/` |
| 補充工作表 | `lib/supplementary-sheets/`（程序書、SOP、表單細部分頁） |
| 範本外部連結 | `template_links`、`report_links` |

---

## D. 協作與分享

| 功能 | 實作 | 說明 |
|---|---|---|
| 標籤分享 | `clients.viewers[]`、`clients.editors[]` | **以分組為單位**分享給其他登入者；非即時協同 |
| 邀請使用者 | `/api/users/invite`（Supabase Admin `inviteUserByEmail`） | 可附 `tagId` 控制 redirect |
| 追蹤報告 | `/api/follows` + `report_follows` 表 | 個人可追蹤他人分享的報告 |
| 通知 | `/api/notifications`、`notifications` 表 | 站內紅點通知 |

**重要**：分享 = 共享存取（讀／寫權限），**不是 Google Docs 那種即時協同編輯**。多位使用者各自編輯後存檔，`lastEditedByUserId` 標示最後編輯者。

---

## E. 內容與行銷

| 功能 | 實作 |
|---|---|
| Blog | `blog_posts` 表，路由 `/blog`、`/blog/[slug]`、`/blog/category`、`/blog/tag`、`/blog/pdca` |
| 評鑑小教室 | `/school/[facilityType]/*`（涵蓋 12 種機構） |
| 產品 Docs | `/docs/*`（getting-started、create-report、ai-editing 等 14 個區） |
| Lead capture | `/api/leads`（download gate）+ `/api/newsletter`（訂閱） |
| 退訂機制 | `/api/newsletter/unsubscribe`（一鍵 + 回信） |
| 下載 gate | HMAC 簽 token → `/api/downloads/[file]?token=`（15 分鐘 TTL） |

---

## F. 帳號與認證

| 功能 | 實作 |
|---|---|
| Email + 密碼 | Supabase Auth |
| Google OAuth | `components/auth/google-auth-button.tsx` + `/auth/oauth-callback` |
| Email 驗證 | `/auth/confirm` |
| 匿名試用 | `supabase.auth.signInAnonymously()` + `/api/trial/cleanup` |
| 付費方案 | **目前不存在**。`getUserTier()` 寫死 `free`，無 Stripe／subscription 實作 |

---

## ❌ 不存在的功能（行銷文案禁用）

以下功能在 codebase 中**完全不存在**，禁止寫入任何行銷內容、blog、landing、社群貼文：

| 不存在的功能 | 禁用詞彙 |
|---|---|
| 從零生成計畫書（ISP / SOAP / PDCA / 評估報告） | 「AI 自動生成 X」「AI 起稿 X」「AI 從零撰寫 X」「快速起稿 X 初稿」 |
| 障別／障礙類型分流（智能障礙／自閉症／肢體障礙／多重障礙） | 「多元障別適配」「障別自動分流」「智能障礙專用框架」 |
| 自動分類／自動標注評鑑條項 | 「AI 自動將文件對應評鑑項目」「自動分類佐證文件」 |
| 即時協同編輯（Google Docs 式） | 「即時協同編輯」「多人同時編輯同一文件」「即時 cursor」 |
| 自動填寫／自動帶入評鑑表單欄位 | 「AI 自動填表」「自動帶入評鑑欄位」 |
| 品質指標自動監測 / 閾值警示 / PBS 行為圖表 | 「品質指標自動監測」「閾值警示」「PBS 自動繪圖」（皆為機構管理系統廠商功能，非報告汪） |
| 付費方案 / 訂閱 / Stripe | 「Pro 方案」「進階訂閱」「無限額度」「企業方案」 |
| AI streaming（A1 endpoint） | 「報告段落 AI 即時 streaming」（A1 是 JSON 回應；A2/A3 才是 streaming） |

---

## 用詞對照表（替換建議）

| ❌ 編造／誇大用詞 | ✅ 真實對應用詞 |
|---|---|
| 「AI 自動生成 ISP 初稿」 | 「上傳既有 ISP，AI 依評鑑指標分析缺漏並建議補強」 |
| 「AI 從零撰寫評估報告」 | 「AI 改寫既有段落，協助轉為符合評鑑期待的書寫風格」 |
| 「智能障別適配」 | 「依機構類型套用對應評鑑 profile」（不依障別細分） |
| 「自動分類評鑑條項」 | 「使用者手動標注後，AI 依評鑑指標分析缺漏」 |
| 「即時協同編輯」 | 「以標籤為單位分享給多位使用者共同編輯（非即時）」 |
| 「AI 自動填表」 | 「AI 分析現有文件指出缺漏項目」 |

---

## 出處與驗證

本檔內容基於 codebase 盤點（2026-05-15）。如需驗證某項功能：

- **AI 路由**：`app/api/{reports,documents}/[id]/ai/route.ts`、`app/api/reports/evaluation/route.ts`、`app/api/demo/soap/route.ts`
- **AI profile**：`lib/ai/evaluation-profiles/index.ts`
- **限額**：`lib/ai/usage-limit.ts`、`lib/ai/public-usage-limit.ts`
- **資料庫**：`db/schema.ts`
- **下載 catalog**：`lib/downloads/catalog.ts`
- **分享權限**：`lib/auth/tag-permissions.ts`
