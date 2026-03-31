---
name: ltc-social-writer
description: |
  長照社群寫作大師：協助撰寫長照評鑑相關的部落格文章與社群媒體內容。
  當使用者要建立或修改 blog 文章、撰寫社群貼文、或產生評鑑相關行銷內容時觸發。
  融合 SEO（搜尋引擎優化）、GEO（生成式引擎優化）與實用性三大面向，
  產出適合台灣長照機構管理者閱讀的高品質繁體中文內容。
metadata:
  filePattern:
    - "app/blog/**"
    - "app/blog-admin/**"
    - "app/api/blog/**"
  priority: 85
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# 長照社群寫作大師

## 角色定義

**核心原則**：此 skill 負責「怎麼寫」；評鑑知識來自 `lib/ai/evaluation-profiles/` — 寫文章前必須讀取對應機構的 profile，絕對不自行編造評鑑條文。

**目標受眾**：
- 主要：長照機構管理者、社工師、護理師、照服員主管
- 次要：搜尋台灣長照評鑑資訊的潛在用戶

**語調規範**：
- 使用「您」（正式）
- 專業但親切，像資深同業分享經驗，不像教科書
- 使用政府官方術語（「服務對象」、「評鑑委員」、「基準」）
- 語言：繁體中文（zh-TW）

---

## 評鑑知識交叉引用

### 機構類型 → Profile ID 對照表

| 機構類型 | Profile 檔案路徑 | 著陸頁 | school 路徑 |
|---------|----------------|--------|-----------|
| 日間照顧中心 / 日照 | `lib/ai/evaluation-profiles/daycare.ts` | `/day-care` | `/school/daycare` |
| 住宿型照顧機構 / 護理之家 | `lib/ai/evaluation-profiles/nursing-home.ts` | `/residential` | `/school/nursing-home` |
| 居家服務 / 居服 | `lib/ai/evaluation-profiles/home-care.ts` | `/home-care` | `/school/home-care` |
| 醫院 | `lib/ai/evaluation-profiles/hospital.ts` | `/hospital` | `/school/hospital` |
| 身心障礙福利機構 | `lib/ai/evaluation-profiles/disability-welfare.ts` | `/disability-welfare` | `/school/disability-welfare` |
| 產後護理之家 | `lib/ai/evaluation-profiles/babycare.ts` | `/babycare` | `/school/postpartum-care` |
| 居家護理所 | `lib/ai/evaluation-profiles/home-nursing.ts` | `/home-nursing` | `/school/home-nursing` |
| 一般護理之家 | `lib/ai/evaluation-profiles/general-nursing-home.ts` | — | `/school/general-nursing-home` |
| 兒少教養機構 | `lib/ai/evaluation-profiles/youth-care.ts` | — | `/school/youth-care` |
| 老人福利機構 | `lib/ai/evaluation-profiles/elderly-welfare.ts` | — | `/school/elderly-welfare` |
| 精神護理之家 | `lib/ai/evaluation-profiles/psychiatric-nursing-home.ts` | — | `/school/psychiatric-nursing-home` |
| 托嬰中心 | `lib/ai/evaluation-profiles/infant-daycare.ts` | `/infant-daycare` | `/school/infant-daycare` |

### 資料轉化規則

從 profile 的原始資料轉換為讀者友善的文章內容：

| Profile 欄位 | 轉化為文章內容 |
|------------|-------------|
| `item.criteria[]` | 讀者友善的檢核清單（每項加上實務說明） |
| `item.reviewMethod` | 「評鑑委員怎麼看」段落（告訴讀者會被如何查核） |
| `item.responsible` | 「誰該負責準備」（以角色分工呈現） |
| `item.title` | H3 小標題（加上 emoji 增加可讀性） |
| `section.name` | H2 大標題（對應評鑑大章節） |

---

## 六大文章類型模板

### A. 評鑑準備攻略（整體備審策略）

**適用場景**：「如何準備 [機構類型] 評鑑」、「評鑑前 X 個月必做清單」

**關鍵字模式**：`[機構類型]評鑑準備`、`[年度][機構類型]評鑑重點`

**JSON-LD 類型**：`HowTo`

**文章骨架**：
```html
<blockquote><strong>重點摘要：</strong>[1-2 句含主關鍵字的核心承諾，告訴讀者本文提供什麼價值]</blockquote>

<h2>評鑑前必須了解的基本架構</h2>
<p>[評鑑總覽：幾大章節、幾項基準、評分制度]</p>

<h2>壹、[第一章節名稱]準備策略</h2>
<p>[概述]</p>
<ul>
  <li><strong>[評鑑項目名稱]：</strong>[具體準備行動，從 criteria[] 轉化]</li>
</ul>

<!-- 每章節重複上方結構 -->

<h2>常見失分陷阱</h2>
<ol>
  <li><strong>[陷阱1]：</strong>[說明與解法]</li>
</ol>

<h2>評鑑準備時間軸</h2>
<ul>
  <li><strong>評鑑前 3 個月：</strong>[行動]</li>
  <li><strong>評鑑前 1 個月：</strong>[行動]</li>
  <li><strong>評鑑前 1 週：</strong>[行動]</li>
</ul>

<h2>常見問題 FAQ</h2>
<h3>Q1：[讀者最常問的問題]？</h3>
<p>[直接、具體的回答，含引用來源]</p>
<h3>Q2：[問題2]？</h3>
<p>[回答]</p>
<h3>Q3：[問題3]？</h3>
<p>[回答]</p>

<hr />
<p><strong>延伸閱讀：</strong></p>
<ul>
  <li><a href="/school/{type}">[機構類型]評鑑小教室 — 完整基準解析</a></li>
  <li><a href="/{landing-page}">[機構類型]評鑑報告管理功能介紹</a></li>
  <li><a href="/downloads">免費下載評鑑備審文件模板</a></li>
</ul>
```

---

### B. 逐條解析（單一評鑑項目深度分析）

**適用場景**：「第 X 條怎麼準備」、「[項目名稱] 評鑑基準解析」

**關鍵字模式**：`[機構類型]評鑑第[N]條`、`[項目名稱]評鑑基準`

**JSON-LD 類型**：`Article`

**文章骨架**：
```html
<blockquote><strong>本文重點：</strong>深入解析 [機構類型] 評鑑第 [N] 條「[項目名稱]」，
說明評鑑委員查核重點、必備文件清單，與常見缺失案例。</blockquote>

<h2>官方基準原文</h2>
<blockquote>[從 criteria[] 轉化的完整條文，加上原始資料來源標注]</blockquote>

<h2>評鑑委員怎麼看</h2>
<p>依據 reviewMethod 欄位，評鑑委員主要透過<strong>[查核方式]</strong>來評核此項目。</p>
<p>[轉化為實務說明：哪些會被翻查、哪些會被訪談]</p>

<h2>必備文件清單</h2>
<ul>
  <li>[文件1]</li>
  <li>[文件2]</li>
</ul>

<h2>常見缺失案例</h2>
<ol>
  <li><strong>[缺失類型]：</strong>[說明與改善方式]</li>
</ol>

<h2>負責準備的角色分工</h2>
<p>依據 responsible 欄位，本條主要由 <strong>[角色]</strong> 負責準備。</p>

<h2>常見問題 FAQ</h2>
<h3>Q1：[針對此項目的疑問]？</h3>
<p>[回答]</p>

<hr />
<p><strong>延伸閱讀：</strong></p>
<ul>
  <li><a href="/school/{type}/{section-slug}">查看完整 [章節名稱] 解析</a></li>
</ul>
```

---

### C. 比較分析（跨機構或跨年度比較）

**適用場景**：「[機構A] 與 [機構B] 評鑑差異」、「[年度] 評鑑修訂重點」

**關鍵字模式**：`[機構]評鑑[主題]差異`、`[年度]評鑑基準修訂`

**JSON-LD 類型**：`Article`（with `mentions` 陣列）

**文章骨架**：
```html
<blockquote><strong>重點摘要：</strong>[本文比較什麼、幫讀者省去什麼麻煩]</blockquote>

<h2>兩者/新舊制比較總覽</h2>
<table>
<tr><th>比較項目</th><th>[A]</th><th>[B]</th></tr>
<tr><td>[項目1]</td><td>[A值]</td><td>[B值]</td></tr>
</table>

<h2>關鍵差異深度解析</h2>
<h3>[差異點1]</h3>
<p>[說明與影響]</p>

<h2>共同準備策略</h2>
<ul>
  <li>[兩者皆適用的準備方式]</li>
</ul>

<h2>常見問題 FAQ</h2>
<!-- 至少 3 題 Q&A -->

<hr />
<p><strong>延伸閱讀：</strong></p>
```

---

### D. 常見問答 FAQ（回答常見疑問）

**適用場景**：「[機構類型] 評鑑常見問題整理」

**關鍵字模式**：`[機構類型]評鑑常見問題`、`[主題] FAQ`

**JSON-LD 類型**：`FAQPage`（GEO 最高優先的格式）

**文章骨架**：
```html
<blockquote><strong>本文整理 [N] 個 [機構類型] 評鑑最常見問題，</strong>
從基礎制度到實務準備，幫助您快速釐清評鑑疑慮。</blockquote>

<h2>關於評鑑制度</h2>

<h3>Q1：[機構類型]評鑑幾年辦一次？</h3>
<p>[直接回答 + 引用來源]</p>

<h3>Q2：評鑑委員組成與查核方式為何？</h3>
<p>[回答]</p>

<h2>關於文件準備</h2>

<h3>Q3：[文件相關問題]？</h3>
<p>[回答]</p>

<!-- 建議 5-8 題，分 2-3 個主題分類 -->

<hr />
<p><strong>想了解更多？</strong></p>
<ul>
  <li><a href="/school/{type}">前往 [機構類型] 評鑑小教室，查看完整基準解析</a></li>
</ul>
```

---

### E. 政策更新（新制度/基準修訂）

**適用場景**：「[年度] 評鑑新制發布」、「[機構類型] 評鑑基準修訂重點」

**關鍵字模式**：`[年度]評鑑新制`、`[機構類型]評鑑基準修訂`

**JSON-LD 類型**：`NewsArticle`

**文章骨架**：
```html
<blockquote><strong>重點速覽：</strong>[年度][機構類型]評鑑基準 [X 月] 正式公告，
本文整理 [N] 項關鍵修訂，並提供機構因應策略。</blockquote>

<h2>修訂背景與時程</h2>
<p>[政府公告來源、生效時間]</p>

<h2>修訂重點整理</h2>
<ol>
  <li><strong>[修訂項目1]：</strong>[修訂前 vs 修訂後的對比說明]</li>
</ol>

<h2>機構因應行動建議</h2>
<ul>
  <li>[立即要做的事]</li>
  <li>[中期規劃]</li>
</ul>

<h2>常見問題 FAQ</h2>
<!-- 至少 3 題 Q&A -->

<hr />
<p><strong>延伸閱讀：</strong></p>
```

---

### F. 實用檢核表（可直接使用的清單）

**適用場景**：「[機構類型] 評鑑自評檢核表」、「評鑑備審文件清單」

**關鍵字模式**：`[機構類型]評鑑檢核表`、`評鑑自評表`、`備審文件清單`

**JSON-LD 類型**：`HowTo`

**文章骨架**：
```html
<blockquote><strong>本清單依據 [年度] [機構類型] 評鑑官方基準整理，</strong>
建議評鑑前 1 個月開始逐項檢核，確保準備完整。</blockquote>

<h2>使用說明</h2>
<p>[如何使用此清單、適用對象]</p>

<h2>壹、[章節名稱] 檢核項目</h2>
<ul>
  <li>□ <strong>[項目名稱]（第 N 條）：</strong>[具體應備文件或行動]</li>
</ul>

<!-- 每章節重複 -->

<h2>常見問題 FAQ</h2>
<h3>Q1：這份清單適用哪個年度的評鑑？</h3>
<p>[回答]</p>

<hr />
<p><strong>延伸閱讀：</strong></p>
<ul>
  <li><a href="/downloads">下載更多免費評鑑備審文件模板</a></li>
  <li><a href="/school/{type}">查看 [機構類型] 評鑑小教室完整說明</a></li>
</ul>
```

---

## SEO 指引

### 標題公式（seoTitle ≤ 60 字）

1. `[年度][機構類型]評鑑準備完全指南｜報告汪`
2. `[機構類型]評鑑第[N]條「[項目名稱]」深度解析`
3. `[機構類型]評鑑 [N] 大常見問題全解答`
4. `[年度]評鑑新制重點整理：[機構類型]篇｜報告汪`

### Meta 描述模板（120–155 字）

```
[痛點描述]？本文依據 [年度] [政府單位] 官方基準，提供 [具體承諾]。
涵蓋 [關鍵內容1]、[關鍵內容2] 與 [關鍵內容3]，幫助長照機構工作人員 [價值主張]。
```

範例：
```
日照中心評鑑準備不知從何開始？本文依據 115 年度臺北市社會局官方基準，
提供完整備審策略。涵蓋個案權益、專業照護、經營管理與安全環境四大章節重點，
幫助日照機構工作人員有系統地完成評鑑準備。
```

### 關鍵字策略

| 層次 | 格式 | 範例 |
|------|------|------|
| 主關鍵字 | `[機構類型]評鑑` | 護理之家評鑑、日照評鑑 |
| 次關鍵字 | `[年度]+[機構]+評鑑` | 115年日照評鑑、114年護理之家評鑑 |
| 長尾關鍵字 | `[機構]評鑑[具體主題]` | 護理之家評鑑感染管制、日照評鑑文件準備 |
| 產品關鍵字 | 功能描述 | 評鑑報告管理系統、AI 評鑑文書 |

### 關鍵字佈局規則

每篇文章主關鍵字必須出現在：
- `seoTitle`（最前方）
- `title`（主標題）
- 文章第一段
- 至少一個 `<h2>`
- `seoDescription`

### 內部連結規則（每篇必備）

| 必連目標 | 時機 | 錨點文字範例 |
|---------|------|-----------|
| `/school/{type}` | 每篇必連（深度資料） | `[機構類型]評鑑小教室` |
| 機構著陸頁 | 提到機構功能時 | `[機構類型]評鑑報告管理` |
| `/downloads` | 提到模板、清單時 | `免費下載備審文件模板` |
| `/docs/getting-started` | 介紹平台時 | `報告汪使用入門` |
| `/pricing` | 提到費用時 | `查看方案與價格` |

連結錨點文字必須描述性（禁用「點此」、「這裡」、「按我」）。

### slug 命名規則

格式：`{facility-type}-{topic}-{year}`

範例：
- `daycare-evaluation-prep-115`
- `nursing-home-infection-control-faq`
- `home-care-new-standards-115`

---

## GEO（生成式引擎優化）技巧

GEO 的目標是讓文章內容被 ChatGPT、Gemini、Claude 等 AI 系統在回答相關問題時引用或參考。

### 1. 定義區塊

當引入重要術語或概念時，用 `<blockquote>` 包裹清晰定義：

```html
<blockquote>
  <strong>[術語]</strong>是指[清晰的一句話定義]。
  依據[來源機構]《[法規/文件名稱]》規定，[補充說明]。
</blockquote>
```

### 2. 權威引用格式

引用評鑑基準時，必須明確標注來源：

```
依據衛生福利部社家署《[文件名稱]》（[年度]）第 [N] 條規定，[引用內容]。
```

或：

```
依據臺北市政府社會局 [年度] 度日間照顧機構評鑑基準，[項目名稱] 評分標準為[...]。
```

### 3. FAQ 區塊（GEO 最高優先）

**每篇文章必須包含 FAQ 區塊**，格式要求：
- 使用 `<h3>` 作為問題標題（不要加 `Q:`，直接寫問題）
- 每個問題的回答必須在 `<p>` 內自成完整答案（不依賴上下文即可理解）
- 建議 3–5 題，覆蓋讀者最常搜尋的疑問
- 問題本身就包含關鍵字

範例：
```html
<h2>常見問題 FAQ</h2>
<h3>日間照顧中心評鑑幾年辦理一次？</h3>
<p>依據現行規定，日間照顧中心評鑑每 [N] 年辦理一次，由地方主管機關（如臺北市政府社會局）負責辦理。機構應在評鑑通知下達後積極準備備審文件。</p>
```

### 4. 開頭摘要區塊

文章開頭第一個元素必須是重點摘要 `<blockquote>`：

```html
<blockquote><strong>重點摘要：</strong>[2-3 句，包含主關鍵字，直接說明本文提供什麼具體價值]</blockquote>
```

AI 系統通常擷取文章前幾段作為摘要，開頭摘要確保被正確引用。

### 5. 結構化清單原則

每個 `<li>` 項目必須：
- 以 `<strong>[類別/名稱]：</strong>` 開頭
- 不依賴上下文即可理解
- 包含足夠的具體細節

**錯誤示範**：`<li>準備相關文件</li>`

**正確示範**：`<li><strong>照顧計畫書：</strong>每位服務對象入住後 7 個工作天內完成，由社工師或照顧管理員填寫，需有主管簽核。</li>`

### 6. 避免 AI 腔的開場白

**禁用**以下類型開場：
- 「在當今社會中...」
- 「隨著高齡化社會的到來...」
- 「長照機構在面對挑戰的同時...」
- 任何超過 1 句話的背景介紹

**正確做法**：第一段直接切入主題，告訴讀者本文解決什麼問題。

---

## HTML 內容模式

### 相容說明

Blog 內容以 HTML 儲存，透過 `sanitize-html` 渲染，使用 `.blog-content` CSS 樣式（`globals.css:96-111`）。

**支援的 HTML 元素**：`h1`, `h2`, `h3`, `p`, `ul`, `ol`, `li`, `blockquote`, `strong`, `em`, `a`, `hr`, `img`, `table`, `tr`, `th`, `td`, `code`, `pre`

**禁止使用**：
- `<div class="...">` — sanitize-html 會移除 class 屬性
- `<table style="...">` — 不支援行內樣式
- 任何自訂 CSS class

### 圖片格式

```html
<img src="[URL]" alt="[描述性替代文字，包含關鍵字]" />
```

### 連結格式

站內連結使用相對路徑：
```html
<a href="/school/daycare">日間照顧中心評鑑小教室</a>
```

---

## CTA 整合規則

Blog 頁面（`app/blog/[slug]/page.tsx:157-168`）已有硬編碼的文末 CTA 區塊，**文章內容不需在最後重複放 CTA**。

### 文中軟 CTA（建議 1 次，放在文章中段痛點後）

```html
<blockquote>
  💡 <strong>省時提示：</strong>使用 <a href="/auth/sign-up">報告汪</a> 的 AI 文書助理，
  可自動依據評鑑基準生成備審文件初稿，節省 50% 以上的文書作業時間。
</blockquote>
```

### 下載 CTA

```html
<p>📥 <a href="/downloads">免費下載報告汪提供的評鑑備審文件模板</a>，開始準備前先掌握必備格式。</p>
```

---

## 部落格欄位速查表

建立文章時（透過 `/api/blog` API 或 blog-admin 介面），需填寫以下欄位：

| 欄位 | 格式 | 說明 | 範例 |
|------|------|------|------|
| `slug` | kebab-case | URL 路徑，SEO 關鍵 | `daycare-evaluation-prep-115` |
| `title` | 字串 | 顯示標題（可比 seoTitle 長） | `115 年度日間照顧中心評鑑準備完全指南：從零開始的備審策略` |
| `excerpt` | 1-2 句 | 顯示於標題下方（italic 樣式） | 評鑑季將至，本文整理 115 年度日照評鑑四大章節準備策略... |
| `content` | HTML 字串 | 文章完整 HTML 內容 | 見上方各模板 |
| `category` | 字串 | 分類標籤 | `評鑑準備`、`政策更新`、`實務技巧`、`常見問答` |
| `tags` | 字串陣列 | 標籤（用於篩選） | `["日照評鑑", "115年度", "備審文件"]` |
| `seoTitle` | ≤60 字 | Meta title | `115年日照評鑑準備完全指南｜報告汪` |
| `seoDescription` | 120-155 字 | Meta description | 見上方模板 |
| `coverImageUrl` | URL | OpenGraph 封面圖 | 有圖才填，沒有可留空 |
| `status` | `draft`/`published` | 初稿設為 draft | `draft` |

---

## 發布前品質檢核表

每篇文章發布前，逐項確認：

**SEO**
- [ ] 主關鍵字出現在：title、seoTitle、第一段、至少一個 h2、seoDescription
- [ ] seoTitle ≤ 60 字，seoDescription 120–155 字
- [ ] 至少 2 個內部連結指向 `/school/` 頁面
- [ ] 至少 1 個內部連結指向機構著陸頁
- [ ] slug 符合 `{facility-type}-{topic}-{year}` 格式

**GEO**
- [ ] 文章開頭有摘要 blockquote（含主關鍵字）
- [ ] 有 FAQ 區塊（至少 3 題，每題回答自成完整句子）
- [ ] 重要術語有定義區塊（blockquote 格式）
- [ ] 評鑑基準有明確引用政府來源
- [ ] 清單項目格式正確（每項以 `<strong>類別：</strong>` 開頭，自成完整句）

**內容品質**
- [ ] 評鑑條文來自實際讀取 `lib/ai/evaluation-profiles/` 檔案（非自行編造）
- [ ] 明確標注評鑑年度（如「115 年度」）
- [ ] 文章長度 1,500–3,000 中文字
- [ ] 沒有「在當今」「隨著」等 AI 腔開場
- [ ] HTML 結構符合 `.blog-content` 渲染限制（無 class div，無行內 style）
- [ ] CTA 自然融入內文，文末不重複放 CTA

---

## 插圖指引

SVG 插圖風格由 `svg-illustration` skill 管理（`public/blog/*.svg`），撰寫文章時請一併規劃插圖。

### 每篇文章建議插圖配置

| 插圖類型 | 數量 | 用途 |
|---------|------|------|
| 封面圖（cover） | 1 | `coverImageUrl` 欄位，用於 OG 社群分享卡 |
| 內文插圖 | 7–8 | 每 300–500 字配 1 張，穿插於各段落結束後 |

### 內文插圖密度

- 每 300–500 字配 1 張 SVG 內文插圖（詳見 `svg-illustration` skill）
- 插入點：每個 `<h2>` 或 `<h3>` 段落結束後、下一段落開始前
- 新文章建立時同步規劃插圖清單（檔名、類型、插入位置）

| 文章字數 | 建議插圖數（不含封面） |
|---------|---------------------|
| 2,000–2,500 字 | 5–6 張 |
| 3,000–3,500 字 | 7–8 張 |
| 4,000–5,000 字 | 8–10 張 |

### 插圖類型選擇

| 文章內容 | 建議插圖類型 |
|---------|------------|
| 評鑑流程、步驟說明 | 流程圖（template-flow.svg） |
| 準備時程、甘特圖 | 時程圖（template-timeline.svg） |
| 訪視重點、確認清單 | 檢核表（template-checklist.svg） |
| 面向分類、概念對比 | 分類卡片（template-categories.svg） |
| 品質改善、循環概念 | PDCA 圖（template-pdca.svg） |

### 插圖引用格式（HTML 內文）

```html
<figure style="margin: 2rem 0;">
  <img src="/blog/{facility-type}-{topic}-{diagram-type}.svg" alt="[描述性替代文字，包含關鍵字]" style="width:100%;border-radius:12px;" />
  <figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:0.5rem;">圖：[說明文字]</figcaption>
</figure>
```

命名規則：`{機構類型}-{文章主題}-{圖表類型}.svg`，例如：`daycare-checklist-flow.svg`
