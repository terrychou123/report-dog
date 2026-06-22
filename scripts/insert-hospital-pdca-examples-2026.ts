/**
 * Track C — 新文章：醫院 PDCA 改善計畫範例
 * 目標查詢：「醫院pdca範例」（GSC 排名 9.4，53 曝光）
 * SSOT：hospital-evaluation skill（115年度，124條）
 * 同步修正：hospital-evaluation-quality-indicators-pdca 的 114→115 年份錯誤
 */
import { db } from "../db/index";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";

const SLUG = "hospital-pdca-examples-2026";

const CONTENT = `<p>評鑑委員翻開品質委員會紀錄，問了這句話：「跌倒率這個月有改善，但你們 PDCA 的 Act 階段追蹤到哪裡？」這是 2.2 章節最常見的失分場景——數字有，但循環沒閉合。</p>

<blockquote>
  <strong>醫院評鑑中的 PDCA 是什麼？</strong>依據衛生福利部《115 年度醫院評鑑基準及評量項目》，醫院應建立全院性品管及病人安全制度，設有委員會，有系統地收集與分析醫療異常事件，研擬系統性對策（2.2.1）。PDCA（Plan-Do-Check-Act）是這套制度的核心執行架構，重點不在於「有沒有做」，而在於「Act 之後有沒有閉環驗證」。
</blockquote>

<h2>115 年度評鑑哪幾條對應到 PDCA？</h2>
<ul>
  <li><strong>2.2.1 醫品病安計畫：</strong>全院品管制度、委員會架構、不良事件通報系統——PDCA 的制度基礎</li>
  <li><strong>2.2.2 醫療不良事件：</strong>根本原因分析（RCA）與預防措施改善——對應 PDCA 的 Check／Act 層</li>
  <li><strong>2.2.3 品質會議：</strong>每季追蹤上次決議執行情形——PDCA 的閉環驗證機制</li>
  <li><strong>2.7.1 感染管制（重點）：</strong>持續監測醫療照護相關感染，訂具體改善方案並確實執行</li>
  <li><strong>2.5.3 防止用藥錯誤：</strong>藥品識別機制、高警訊藥品管理——用藥安全 PDCA 的制度依據</li>
</ul>

<h2>範例一：感染管制 PDCA（對應 2.7.1 重點條文）</h2>

<p>2.7.1 是重點條文，評鑑委員會實際查閱感管會會議紀錄，確認你有完整的 PDCA 循環，而不只是「有開會」「有監測數字」。</p>

<h3>Plan — 設定有依據的目標值</h3>
<ul>
  <li><strong>指標：</strong>中央靜脈導管相關血流感染（CLABSI）發生率，以每千導管日感染件數計算</li>
  <li><strong>目標設定：</strong>參考台灣醫院感染控制學會（TAMIC）公布的全國基準值，或採「比去年同期降低 20%」的相對目標；任一種都需在 Plan 文件中說明設定依據</li>
  <li><strong>負責單位：</strong>感染管制委員會（主委）＋ 感管護理師（執行）</li>
  <li><strong>備妥文件：</strong>感管年度工作計畫書、指標定義說明（分子分母計算方式）</li>
</ul>

<h3>Do — 執行組合式照護 SOP</h3>
<ul>
  <li><strong>CLABSI 組合式照護：</strong>置管前手部衛生確認、最大無菌障蔽、葡萄糖酸氯己定消毒皮膚、鎖骨下靜脈優先、每日評估拔管必要性（五項缺一不可，依感管手冊執行）</li>
  <li><strong>稽核：</strong>感管護理師每週抽查置管操作記錄表，確認五項確核步驟完成率</li>
  <li><strong>人員訓練：</strong>新進護理師感控入職訓、年度感控教育，有完成紀錄備查</li>
</ul>

<h3>Check — 每月監測與感管會報告</h3>
<ul>
  <li><strong>月報格式：</strong>月份 ／ 導管留置日數（分母）／ 感染件數（分子）／ 感染率（每千導管日）／ 與目標值比較 ／ 趨勢</li>
  <li><strong>感管會報告：</strong>依 2.7.1，至少每季向感管會報告監測成果，出具會議紀錄備查</li>
  <li><strong>注意：</strong>評鑑委員會確認你是否持續追蹤，且達標後有否修正目標值（而非永遠維持同一目標）</li>
</ul>

<h3>Act — 改善追蹤與閉環驗證</h3>
<ul>
  <li><strong>改善措施記錄：</strong>感染事件根本原因（如置管操作不符規範、人員輪替未交接感管措施）、改善行動、責任人、完成日期</li>
  <li><strong>跨部門追蹤：</strong>依 2.2.3，每次品質委員會需追蹤上次決議執行情形，感管 PDCA 結果要進品質委員會紀錄</li>
  <li><strong>閉環驗證：</strong>改善後連續 3 個月感染率低於目標值，記錄為「改善驗證成功」；修訂相關 SOP，進入下一循環</li>
</ul>

<h2>範例二：住院跌倒 PDCA（對應 2.2.1 品質指標管理）</h2>

<p>跌倒率是醫院最常選的品質安全指標，也是評鑑委員最常確認 PDCA 閉環是否完整的主題。</p>

<h3>Plan — 設定外部基準比較的目標值</h3>
<ul>
  <li><strong>指標：</strong>住院病人跌倒率，以每千住院人日的跌倒件數計算</li>
  <li><strong>目標設定依據：</strong>參考台灣病人安全資訊網（TPSNet）公布的全國住院跌倒率中位數；可訂目標「≤ 全國 50 百分位」或「比去年降低 15%」，需說明依據來源</li>
  <li><strong>三面向確認：</strong>跌倒率屬「安全面向」指標，需搭配「臨床面向」（如感染率）與「效率面向」（如平均住院天數）才符合 2.2.1 的三面向要求</li>
</ul>

<h3>Do — 全院落實跌倒風險評估</h3>
<ul>
  <li><strong>入院評估：</strong>24 小時內完成跌倒風險評估量表（如 Morse Fall Scale），高風險者立即執行床邊安全措施</li>
  <li><strong>高風險措施：</strong>黃色手圈識別、床頭警示貼紙、家屬衛教、床欄確認、防滑拖鞋提供</li>
  <li><strong>再評估時機：</strong>病況改變、轉床、術後返回病房時重新評估，紀錄於護理照護計畫（對應 2.3.4 護理過程完整性）</li>
</ul>

<h3>Check — 月報統計與不良事件通報</h3>
<ul>
  <li><strong>月報：</strong>本月住院人日數 ／ 跌倒件數 ／ 跌倒率，與目標值及前 3 個月平均比較，並呈現科別分布</li>
  <li><strong>不良事件通報：</strong>跌倒事件 24 小時內通報（依 2.2.2），紀錄傷害等級（Severity Level）</li>
  <li><strong>季報：</strong>每季呈報品質委員會（依 2.2.3），確認改善措施執行狀況</li>
</ul>

<h3>Act — 根本原因分析與系統改善</h3>
<ul>
  <li><strong>嚴重跌倒 RCA：</strong>跌倒後骨折等嚴重事件啟動根本原因分析，完成分析報告（依 2.2.2 要求）</li>
  <li><strong>系統性改善：</strong>數據顯示跌倒集中在夜班或特定科別時，針對性加強夜班人力或環境改善（如走廊夜燈、廁所扶手加裝）</li>
  <li><strong>驗證成效：</strong>改善後連續 2 個月跌倒率低於目標 → 呈報品質委員會確認，並修訂護理照護 SOP</li>
</ul>

<h2>範例三：用藥安全 PDCA（對應 2.5.3 防止用藥錯誤）</h2>

<p>用藥安全 PDCA 有一點特別：通報件數增加是文化改變的訊號，不是失分點。依 2.2.1，醫院應建置「不以懲罰為原則」的通報系統，品質委員會應正面肯定通報行為。</p>

<h3>Plan — 指標定義與目標設定</h3>
<ul>
  <li><strong>指標：</strong>用藥錯誤率（每千住院人日）；嚴重用藥錯誤件數（Severity E 級以上）單獨列計</li>
  <li><strong>目標：</strong>嚴重用藥錯誤（Severity E 以上）= 0；整體用藥錯誤率依醫院歷史趨勢逐年下降</li>
  <li><strong>高警訊藥品：</strong>依 2.5.3，高警訊藥品明顯標示、與一般藥品區隔存放；建立高警訊藥品的專屬錯誤率監控</li>
</ul>

<h3>Do — 三讀五對 SOP 與系統防護</h3>
<ul>
  <li><strong>三讀五對：</strong>取藥時讀、調劑前讀、給藥前讀；核對病人姓名、藥物、劑量、給藥途徑、給藥時間（依 2.5.3 操作基準）</li>
  <li><strong>處方系統警示：</strong>依 2.5.3，處方醫令系統應設有防止用藥錯誤及不適當之機制——確認 HIS 已設藥物交互作用警示、劑量上限警示</li>
  <li><strong>LASA 藥品管理：</strong>依 2.5.3，定期檢討外觀或名稱相似藥品（LASA）清單，相似藥品異位存放並加特殊標記</li>
</ul>

<h3>Check — 用藥錯誤事件月報</h3>
<ul>
  <li><strong>月報：</strong>用藥錯誤件數（按 Severity 分級）／ 住院人日（分母）／ 錯誤率；呈現科別分布與反覆出錯藥物</li>
  <li><strong>通報文化：</strong>通報件數上升反映文化改變；依 2.2.1 的不懲罰原則，品委會應正面肯定通報，而非將通報數視為負面指標</li>
  <li><strong>高警訊藥品單獨追蹤：</strong>是否有反覆出錯的特定高警訊藥物？需個別列出</li>
</ul>

<h3>Act — 系統優化與標準化</h3>
<ul>
  <li><strong>針對性改善：</strong>特定藥物反覆出錯 → 更新存放標籤、調整藥袋設計或加入特殊提醒列印</li>
  <li><strong>警示升級：</strong>HIS 警示被頻繁忽略時，評估啟動「強制確認」機制（需輸入原因才能覆蓋警示）</li>
  <li><strong>SOP 修訂：</strong>改善有效後，將做法納入藥品調劑作業準則修訂版（依 2.5.1），修訂紀錄備查</li>
</ul>

<h2>評鑑委員最常問的 PDCA 問題</h2>

<blockquote>
  💡 <strong>準備提示：</strong>在報告汪建立品質改善報告後，可使用 AI 分析功能，比對文件中是否缺少「目標設定依據」「根本原因分析」「閉環驗證」等常見缺漏，由品管人員確認後補強。詳見 <a href="/hospital">醫院評鑑報告管理介紹</a>。
</blockquote>

<ol>
  <li><strong>「目標值是怎麼設的？有沒有參考外部基準？」：</strong>必須說出依據——TAMIC 全國感染基準值、TPSNet 跌倒率百分位，或自身歷史趨勢下降比例。三種都可以，但評鑑委員要聽到「來源」，不能只說「我們自己訂的」。</li>
  <li><strong>「上一季提出的改善措施，這一季追蹤到什麼結果？」：</strong>對應 2.2.3「追蹤上次決議執行情形」。PDCA 有沒有真正閉環，在這一題最清楚。</li>
  <li><strong>「改善成效確認後，有沒有把做法寫進 SOP？」：</strong>Act 階段最常被忽略的是「標準化」——改善成功要修訂 SOP，評鑑委員才認定 PDCA 循環完整。</li>
</ol>

<h2>常見問題 FAQ</h2>

<h3>醫院 PDCA 要選幾個指標才符合 115 年評鑑要求？</h3>
<p>依據衛生福利部《115 年度醫院評鑑基準》2.2.1 規定，品質指標須涵蓋臨床、效率、安全三面向，沒有明定最低數量。實務上評鑑委員期待看到至少 5–8 個跨面向指標，且每個指標都有完整的目標值設定依據與 PDCA 追蹤紀錄。只選單一面向或指標意義重疊，都可能被要求補充說明。</p>

<h3>感染管制 PDCA 和用藥安全 PDCA 可以合併成一份改善報告嗎？</h3>
<p>可以。許多醫院採「年度品質改善報告」格式，一份報告收錄多個改善主題，每個主題各有完整 PDCA 四步驟。依 2.2.3，每季品質委員會紀錄必須追蹤每個改善項目的進度，合併報告中各主題的 Plan／Do／Check／Act 必須個別清楚呈現，不能混在一起。</p>

<h3>PDCA 的 Act 階段要寫什麼才算完整？</h3>
<p>Act 階段需包含三件事：① 根據 Check 數據提出具體改善措施（非「加強督導」這類模糊描述）；② 明定責任人與完成時間；③ 確認改善成效並決定「標準化（修訂 SOP）」或「進入下一循環」。最常見的缺失是「改善後沒有驗證」或「驗證有效但沒有修訂 SOP」，兩者都會讓評鑑委員認定循環未閉合。</p>

<h3>115 年度醫院評鑑感染管制有什麼新要求？</h3>
<p>115 年度評鑑基準擴大為 15 章 124 條，感染管制章節（2.7）新增「試評」條文：2.7.1 增加陪病人員管理（資訊化或實名制登錄）及全院員工感控教育訓練，抗生素管理（2.7.3）要求每年至少開會 2 次且須院長或副院長擔任主席。感管 PDCA 的 Do 階段需同步更新相關 SOP 以反映新規定。詳見 <a href="/blog/hospital-eval-115-criteria-reform-2026">115 年醫院評鑑新制改革重點解析</a>。</p>

<hr />
<p><strong>延伸閱讀：</strong></p>
<ul>
  <li><a href="/school/hospital">醫院評鑑小教室 — 115 年 124 條基準逐章解析</a></li>
  <li><a href="/blog/hospital-evaluation-quality-indicators-pdca">醫院品質指標管理完整攻略：如何選定指標、設定目標值與追蹤</a></li>
  <li><a href="/blog/hospital-eval-115-criteria-reform-2026">115 年醫院評鑑新制改革重點解析</a></li>
  <li><a href="/downloads">免費下載醫院評鑑備審文件模板</a></li>
</ul>`;

async function main() {
  // 1. 修正既有文章：移除錯誤的「必要條文」標籤 + 114→115
  const existing = await db
    .select({ seoTitle: blogPosts.seoTitle, seoDescription: blogPosts.seoDescription })
    .from(blogPosts)
    .where(eq(blogPosts.slug, "hospital-evaluation-quality-indicators-pdca"));

  if (existing.length) {
    console.log("修正既有文章 seoDescription（114→115，移除錯誤「必要條文」標籤）...");
    console.log("原 seoDescription:", existing[0].seoDescription);
    await db
      .update(blogPosts)
      .set({
        seoTitle: "醫院品質指標PDCA管理完整攻略｜115年評鑑2.2基準備審指南｜報告汪",
        seoDescription:
          "醫院評鑑 2.2.1 品質指標管理（115年度基準）：如何選定有臨床意義的指標、設定目標值、進行 PDCA 持續改善追蹤，讓評鑑委員在訪談時說得清楚。涵蓋指標選定原則、目標值設定方法、品質委員會閉環驗證，幫助品管人員完整準備備審文件。",
      })
      .where(eq(blogPosts.slug, "hospital-evaluation-quality-indicators-pdca"));
    console.log("✅ 既有文章已修正");
  }

  // 2. 確認新文章是否已存在
  const exists = await db
    .select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(eq(blogPosts.slug, SLUG));

  if (exists.length) {
    console.log(`⚠️  文章 ${SLUG} 已存在，跳過新增`);
    process.exit(0);
  }

  // 3. 插入新文章（draft，人工審核後再改 published）
  await db.insert(blogPosts).values({
    slug: SLUG,
    title: "醫院 PDCA 改善計畫範例：感染管制、跌倒、用藥安全三大完整寫法（115年評鑑）",
    excerpt:
      "醫院品質改善 PDCA 範例怎麼寫？本文提供感染管制（CLABSI）、跌倒預防、用藥安全三大實戰範例，每個範例含 Plan 設目標、Do 執行 SOP、Check 月報指標、Act 閉環驗證，對應 115 年度醫院評鑑 2.2、2.5、2.7 基準，幫助品管人員直接套用評鑑文件。",
    content: CONTENT,
    category: "評鑑準備",
    tags: ["醫院評鑑", "PDCA範例", "115年度", "感染管制", "用藥安全", "品質改善"],
    seoTitle: "醫院PDCA改善計畫範例｜感染管制、跌倒、用藥安全115年完整寫法",
    seoDescription:
      "115 年醫院評鑑 PDCA 改善計畫實戰範例：感染管制（CLABSI）、跌倒預防、用藥安全三大類型，每個範例含 Plan 目標設定、Do 執行方法、Check 評值指標、Act 閉環驗證，對應 2.2、2.5、2.7 評鑑基準，幫助品管人員直接套用評鑑文件。",
    status: "draft", // 人工確認內容後再 publish
    publishedAt: new Date(),
  });

  console.log(`✅ 新文章已插入（status: draft）：${SLUG}`);
  console.log("請至 /blog-admin 或 /blog/" + SLUG + "/edit 確認內容後改為 published");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
