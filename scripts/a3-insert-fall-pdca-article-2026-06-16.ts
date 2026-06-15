/**
 * 一次性腳本：A3 winning cluster 擴充
 * 新增「護理跌倒事件 PDCA 改善計畫實例」深度文章
 *
 * 依據：GSC 數據顯示「護理pdca實例跌倒」position 5.6 / CTR 37.5%、
 *       「跌倒pdca範例」position 6.6 / CTR 20%——兩者均由 /blog/pdca 概覽頁承接，
 *       缺乏專屬深度文。本文提供完整 P/D/C/A 四段填寫實例，補足此缺口。
 *
 * 用法：npx dotenv -e .env.local -- npx tsx scripts/a3-insert-fall-pdca-article-2026-06-16.ts
 */
import { db } from "../db/index";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";

const SLUG = "nursing-fall-pdca-improvement-plan-2026";

const CONTENT = `<blockquote><strong>本文重點：</strong>跌倒事件是護理之家、醫院與居家護理機構最常被評鑑委員抽查的品質指標之一。本文以一間護理之家「月跌倒件數從 8 件降至 3 件」為主軸，逐段拆解 P（計畫）、D（執行）、C（查核）、A（行動）四步驟的填寫邏輯——包括根因分析框架、量化目標設定、介入措施清單、追蹤數據表格，以及評鑑委員最常挑剔的 5 大填寫錯誤，幫助你在備審前產出一份經得起委員提問的完整 PDCA 改善報告。</blockquote>

<h2>為什麼跌倒是護理機構 PDCA 最高頻的主題？</h2>

<p>在護理機構的品質指標管理中，跌倒事件幾乎年年出現在評鑑委員的重點查核清單。原因直接：</p>

<ul>
  <li><strong>數量可量化</strong>：跌倒件數、跌倒率（件/千住民日）、有無傷害，都是明確的量化指標，委員可立即比對不同季度的趨勢。</li>
  <li><strong>改善措施具體可核查</strong>：環境改善、高風險篩選工具、教育訓練紀錄——每一項都有實物佐證，委員可以逐項翻閱。</li>
  <li><strong>PDCA 閉環容易斷裂在 C 和 A</strong>：多數機構有 P 有 D，卻在「查核數據」和「標準化」留下空白，恰好是委員鎖定的缺失點。</li>
</ul>

<p>這也是為什麼搜尋「跌倒 PDCA 範例」的人，通常不是在找制度性說明，而是需要一份可以直接對照的完整格式——從問題描述到改善結果，清楚交代「我們做了什麼、數字如何變化」。</p>

<h2>跌倒事件 PDCA 完整實例（護理之家版）</h2>

<p>以下以一間 60 床中型護理之家為例，呈現一份可對照套用的 PDCA 改善計畫實例。所有數字均為典型案例情境，可依機構實際數據調整。</p>

<h3>背景說明（填報前必要的脈絡設定）</h3>

<p>評鑑委員看 PDCA 報告的第一步，通常是確認「問題從哪裡來」——是例行統計發現，還是重大事件後的被動反應？主動管理的機構通常從每月品質指標監測中發現異常，再啟動 PDCA 改善流程。</p>

<blockquote>📋 <strong>案例背景：</strong>本機構 2026 年 1 月品質指標檢討會議中發現，Q4（10–12 月）單月跌倒件數平均為 8.0 件，較上半年同期（4.3 件/月）明顯增加。追蹤後發現主要集中在夜間（21:00–06:00）、如廁動線，以及認知障礙合併步態不穩的住民族群。據此啟動跌倒預防 PDCA 改善計畫，執行期間 2026 年 1–3 月（單一季度週期）。</blockquote>

<h3>P（Plan）：問題分析 × 量化目標 × 改善計畫</h3>

<p>「P」是整份 PDCA 報告的核心，評鑑委員最在意三件事：<strong>根因有沒有系統性分析、目標有沒有量化、計畫有沒有明確時程與負責人</strong>。</p>

<p><strong>根因分析（以 4M1E 架構為例）：</strong></p>
<ul>
  <li><strong>人員（Man）</strong>：夜班人力 1 人照顧 20 床，協助如廁等待時間過長，住民自行起身；高風險住民清單未納入夜班交班項目。</li>
  <li><strong>環境（Environment）</strong>：走廊及廁所夜間照明不足（照度低於建議 100 lux）；4 間衛浴扶手高度與現行住民平均移位高度不符。</li>
  <li><strong>方法（Method）</strong>：新入住住民的 Morse 跌倒評估量表初始評估後，未即時更新床邊預防措施卡；措施執行率無定期查核機制。</li>
  <li><strong>物料（Machine/Material）</strong>：防滑地墊老化翹起，夜間如廁動線未設感應夜燈。</li>
</ul>

<p><strong>量化目標（SMART 原則）：</strong></p>
<ul>
  <li>主目標：2026 年 1–3 月單月跌倒件數 ≤ 4 件（較 Q4 基線 8.0 件降低 50%）。</li>
  <li>次目標：跌倒造成傷害率（擦傷以上）維持在 25% 以下；高風險住民（Morse ≥ 45 分）措施執行率達 90%。</li>
</ul>

<p><strong>改善計畫（負責人 × 時程）：</strong></p>
<table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
  <thead style="background:#f0fdf4;">
    <tr><th style="padding:8px;border:1px solid #d1fae5;text-align:left;">改善項目</th><th style="padding:8px;border:1px solid #d1fae5;">負責人</th><th style="padding:8px;border:1px solid #d1fae5;">完成時程</th></tr>
  </thead>
  <tbody>
    <tr><td style="padding:8px;border:1px solid #d1fae5;">更換走廊及衛浴夜間 LED 感應燈（目標照度 ≥ 150 lux）</td><td style="padding:8px;border:1px solid #d1fae5;text-align:center;">護理長 / 行政組</td><td style="padding:8px;border:1px solid #d1fae5;text-align:center;">1 月第 2 週前</td></tr>
    <tr><td style="padding:8px;border:1px solid #d1fae5;">調整 4 間衛浴扶手高度 + 更換老化防滑地墊（共 8 張）</td><td style="padding:8px;border:1px solid #d1fae5;text-align:center;">行政組 / 廠商</td><td style="padding:8px;border:1px solid #d1fae5;text-align:center;">1 月第 3 週前</td></tr>
    <tr><td style="padding:8px;border:1px solid #d1fae5;">夜班交班表新增「當日高風險住民清單及預防措施確認」欄位</td><td style="padding:8px;border:1px solid #d1fae5;text-align:center;">護理長</td><td style="padding:8px;border:1px solid #d1fae5;text-align:center;">1 月第 1 週</td></tr>
    <tr><td style="padding:8px;border:1px solid #d1fae5;">辦理跌倒預防教育訓練 2 場（Morse 量表重新評估 + 措施核查操作）</td><td style="padding:8px;border:1px solid #d1fae5;text-align:center;">護理督導</td><td style="padding:8px;border:1px solid #d1fae5;text-align:center;">1 月第 2 週前</td></tr>
    <tr><td style="padding:8px;border:1px solid #d1fae5;">每週抽查高風險住民措施執行率（護理長，抽查 ≥ 3 名）</td><td style="padding:8px;border:1px solid #d1fae5;text-align:center;">護理長</td><td style="padding:8px;border:1px solid #d1fae5;text-align:center;">每週持續至 3 月底</td></tr>
  </tbody>
</table>

<h3>D（Do）：執行措施 × 佐證文件對應</h3>

<p>「D」的填寫重點是：<strong>每項措施都要有對應的執行紀錄</strong>，讓委員可以逐項核對「有說要做」和「真的有做到」。沒有佐證文件的 D，等同於空白。</p>

<p>常見佐證文件對應方式：</p>
<ul>
  <li><strong>環境改善（燈具、扶手、地墊）</strong> → 施工前後比對照片 + 施工廠商驗收單（日期、修繕項目、驗收人簽名）。</li>
  <li><strong>教育訓練</strong> → 課程大綱 + 全體護理人員簽到表 + 訓練現場照片 2 張以上。</li>
  <li><strong>交班表格修改</strong> → 新版交班表範本（標示修訂日期與版本號），與舊版比對說明變動欄位。</li>
  <li><strong>高風險措施週查核</strong> → 每週查核紀錄表（護理長簽名，記載抽查名單、措施符合情形、缺失與處理）。</li>
  <li><strong>Morse 量表重新評估</strong> → 12 名高風險住民的更新評估紀錄，各附前後對照（原始評分 vs. 重評評分）。</li>
</ul>

<p>本案例執行期間共識別高風險住民（Morse ≥ 45 分）12 名，均已在入住後 24 小時內更新床邊預防措施卡，夜班護理師於交班時確認落實情形並簽名。</p>

<h3>C（Check）：查核成效數據 × 月別趨勢</h3>

<p>「C」是最多機構填得草率的一段——只寫「跌倒次數下降」，沒有具體月別數字。評鑑委員查核的重點是：<strong>數字有沒有和目標對照、有沒有逐月列示趨勢、有傷害的事件有沒有獨立記載</strong>。</p>

<table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
  <thead style="background:#f0fdf4;">
    <tr>
      <th style="padding:8px;border:1px solid #d1fae5;text-align:left;">月份</th>
      <th style="padding:8px;border:1px solid #d1fae5;text-align:center;">跌倒件數</th>
      <th style="padding:8px;border:1px solid #d1fae5;text-align:center;">有傷害件數（擦傷以上）</th>
      <th style="padding:8px;border:1px solid #d1fae5;text-align:center;">傷害率</th>
      <th style="padding:8px;border:1px solid #d1fae5;text-align:center;">高風險措施執行率</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#fef9c3;">
      <td style="padding:8px;border:1px solid #d1fae5;">基線（Q4 月均）</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">8.0 件</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">2.7 件</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">33.7%</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">未追蹤</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #d1fae5;">2026 年 1 月</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">5 件</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">1 件</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">20.0%</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">78%</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #d1fae5;">2026 年 2 月</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">4 件</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">0 件</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">0.0%</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">88%</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #d1fae5;">2026 年 3 月</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">3 件</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">0 件</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">0.0%</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">92%</td>
    </tr>
    <tr style="background:#f0fdf4;font-weight:600;">
      <td style="padding:8px;border:1px solid #d1fae5;">目標值</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">≤ 4 件</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">—</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">≤ 25%</td>
      <td style="padding:8px;border:1px solid #d1fae5;text-align:center;">≥ 90%</td>
    </tr>
  </tbody>
</table>

<p><strong>查核結論：</strong>2 月起跌倒件數達標（≤ 4 件），3 月進一步降至 3 件，較基線下降 62.5%；傷害率 2 月起歸零，優於目標；高風險住民措施執行率 3 月達 92%，通過目標閾值。整體改善計畫成效良好，3 個月改善期各項指標均達標。</p>

<h3>A（Act）：標準化 × 下一輪 PDCA</h3>

<p>「A」是最常被機構填得草率的環節——許多報告的 A 只寫「繼續執行改善措施」，這是評鑑委員一眼就能識別的格式缺失。<strong>正確的 A 應該包含兩個要素：①有效措施寫進 SOP、②未解決問題或新問題規劃下一輪</strong>。</p>

<p><strong>① 標準化（寫入機構 SOP / 作業規範）：</strong></p>
<ul>
  <li>夜班交班表「高風險住民清單及預防措施確認」欄位正式列入固定項目（修訂版本：SOP-NRS-003 v2.0，生效日 2026.04.01）。</li>
  <li>新入住住民於入住 24 小時內完成 Morse 跌倒評估，高風險（≥ 45 分）者即時更新床邊措施卡，列入護理交班核查項目（修訂 SOP-NRS-007 跌倒預防作業規範 v3.1，生效日 2026.04.01）。</li>
  <li>護理長每月月底進行高風險住民措施執行率抽查（≥ 3 名），結果記入品質指標月報，並於月會報告。</li>
</ul>

<p><strong>② 未竟問題（下一輪 PDCA 規劃）：</strong></p>
<ul>
  <li>3 月 3 件跌倒中，1 件發生在沐浴協助過程；下一輪 PDCA 聚焦「沐浴安全」，計畫 Q2（4–6 月）啟動。</li>
  <li>夜班人力不足問題（根因之一）屬人員編制議題，另案提報主管評估，非 PDCA 可單獨解決。</li>
</ul>

<h2>跌倒事件 PDCA 範例（居家護理版）</h2>

<p>居家護理所的跌倒 PDCA 在結構上與護理之家相同，但執行環境在案家，有幾個填寫重點需要調整：</p>

<ul>
  <li><strong>P（計畫）</strong>：根因分析需涵蓋「案家環境」（地板材質、浴室、照明、動線）和「照護者照顧能力」兩個面向。非機構內可直接修繕的環境，需記錄「已建議家屬改善」和「下次訪視跟進評估時間」。</li>
  <li><strong>D（執行）</strong>：每次訪視的跌倒預防衛教紀錄（含家屬說明確認簽名）、居家環境評估表（標記危險因子項目）作為佐證。</li>
  <li><strong>C（查核）</strong>：以「個案層級」追蹤各高風險個案跌倒件數，同時彙整全機構月別跌倒統計，兩層次分開呈現。</li>
  <li><strong>A（行動）</strong>：有效措施列入個別服務計畫修訂紀錄（記錄版本與修訂日期）；下次訪視時重新評估措施是否仍適用，尤其在個案身體功能狀況改變後。</li>
</ul>

<h2>PDCA 報告 5 大常見錯誤（評鑑委員最常挑剔的點）</h2>

<ol>
  <li>
    <strong>P 的目標沒有量化</strong><br />
    「減少跌倒」不是目標，「月跌倒件數 ≤ 4 件（降低 50%）」才是。沒有量化目標，C 的查核就無法與目標對照，整份 PDCA 的邏輯鏈斷裂，委員無從判斷「是否達成改善」。
  </li>
  <li>
    <strong>D 的措施沒有佐證文件</strong><br />
    寫了「辦理教育訓練」但沒有附簽到表；寫了「更換照明設備」但沒有施工前後照片。委員說「我怎麼知道你真的做了」時，正是因為 D 缺佐證。每項措施至少對應一份具體文件。
  </li>
  <li>
    <strong>C 只有總數，沒有月別趨勢</strong><br />
    「三個月總計跌倒 12 件，比前期少了 12 件」——但前期是哪幾個月？哪個月開始改善？某月是否回升又下降？缺乏月別細項，委員無法判斷改善是否穩定持續。
  </li>
  <li>
    <strong>A 只寫「繼續執行」</strong><br />
    沒有說明哪些措施被寫進 SOP、哪些問題留待下一輪。「繼續執行」等同於說「我沒有真正從這輪 PDCA 學到什麼並讓組織進步」，委員一眼識別。
  </li>
  <li>
    <strong>根因分析停在表面現象</strong><br />
    「跌倒原因：住民走路不穩」是現象，不是根因。根因分析需回答：「為什麼現有的預防措施沒有擋住這次跌倒」——是評估工具沒確實執行？是夜班交班沒傳遞高風險資訊？是環境因素沒被排除？沒有到這一層，A 的改善措施就會流於表面。
  </li>
</ol>

<h2>常見問題（FAQ）</h2>

<h3>跌倒 PDCA 一定要用 Morse 跌倒評估量表嗎？</h3>
<p>不一定。台灣護理機構常見工具包含 Morse 跌倒評估量表（醫院、護理之家廣泛使用）、Johns Hopkins 跌倒風險評估表，以及部分機構自行開發的量表。評鑑委員關注的是「有使用系統性評估工具」「高風險者有對應措施且有記錄」，而非特定工具。選定後一致使用，並確保評估結果連結到措施執行即可。</p>

<h3>PDCA 改善期間發生重大跌倒傷害，要怎麼在報告裡處理？</h3>
<p>重大傷害事件（如骨折、頭部外傷）應獨立進行事件分析（RCA 或 5-Why 逐案報告），不能只在 PDCA 月報中帶過。但 PDCA 不需中斷——在 C 查核欄位中說明「本月發生 1 件重大事件，另案進行 RCA，見 [日期] 版本事件報告」，兩份文件相互參照即可，委員會分開評核。</p>

<h3>PDCA 報告一定要護理長自己撰寫嗎？</h3>
<p>不必，品質小組可以分工撰寫，但報告上要有明確的「主辦人員」和「核准主管」簽名。委員常問的是：「這份報告是誰主導的？措施是怎麼決定的？」——若護理師答不出來，即使格式完整也容易被標記為「形式大於實質」。建議在月會中向全體說明改善內容，確保第一線人員都知道在做什麼。</p>

<h3>跌倒 PDCA 週期要多長才算完整？</h3>
<p>多數機構以 3 個月（一個季度）為一輪，對應季別品質指標週期。若 3 個月後主要目標達成，進入 A（標準化）結案此輪，未解決問題進下一輪；若未達標，在 A 說明原因並修訂計畫後繼續下一輪。委員在意的是「有持續追蹤、有根據數據調整」，不是週期長短本身。</p>

<hr />
<p><strong>延伸閱讀：</strong></p>
<ul>
  <li><a href="/blog/pdca">PDCA 報告範例全攻略：護理長照品質改善計畫完整寫法</a></li>
  <li><a href="/blog/nursing-pdca-template-full-guide-2026">護理 PDCA 怎麼寫？5 個完整範例範本（感染管制、跌倒、用藥、壓瘡、滿意度）</a></li>
  <li><a href="/blog/nursing-pdca-quality-improvement-examples-2026">護理 PDCA 完整攻略：住宿型、居家護理、日照三大實戰範例</a></li>
</ul>

<p style="margin-top: 2rem; padding: 1.5rem; background: #f0fdf4; border-radius: 12px; border: 1px solid #bbf7d0;">
  <strong>PDCA 改善報告從 4 小時壓縮到 30 分鐘？</strong><br />
  <a href="/auth/sign-up" style="color: #16a34a; font-weight: 600;">免費試用報告汪</a>——AI 輔助依四步驟架構產出 PDCA 初稿，根因分析框架自動帶入，月別數據表格直接填入，讓 Check 和 Act 不再是評鑑前才補出來的空洞文字。
</p>`;

async function main() {
  // 確認 slug 尚未存在
  const existing = await db
    .select({ id: blogPosts.id })
    .from(blogPosts)
    .where(eq(blogPosts.slug, SLUG));

  if (existing.length > 0) {
    console.log(`⏭ ${SLUG} 已存在，略過插入`);
    process.exit(0);
  }

  await db.insert(blogPosts).values({
    slug: SLUG,
    title: "護理跌倒事件 PDCA 改善計畫實例：P/D/C/A 完整寫法 2026",
    excerpt:
      "以護理之家月跌倒件數從 8 件降至 3 件為主軸，逐段拆解 PDCA 四步驟填寫格式、量化目標設定、佐證文件對應與 5 大常見錯誤，居家護理版本同步收錄。",
    content: CONTENT,
    category: "實務技巧",
    tags: ["跌倒PDCA", "PDCA範例", "護理PDCA", "跌倒預防", "品質改善計畫", "報告汪"],
    status: "published",
    seoTitle: "跌倒PDCA範例｜護理機構跌倒事件改善計畫完整寫法 2026",
    seoDescription:
      "以護理之家月跌倒件數從8件降至3件為主軸，逐段拆解PDCA四步驟填寫格式、量化目標設定、佐證文件對應與5大常見錯誤，居家護理版本同步收錄。",
    author: "報告汪",
    publishedAt: new Date(),
  });

  console.log(`✅ ${SLUG} 已插入`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
