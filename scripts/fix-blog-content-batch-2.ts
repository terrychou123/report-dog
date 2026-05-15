/**
 * Batch 2 內文改造：套用 home-care-case-records 成功模式
 *
 * 3 篇 GA 高流量但 engagement 偏低的文章，補強 4 個元素：
 *   A. 開頭「真實場景」blockquote（棕色底，凸顯痛點）
 *   B. 好/壞範例對比（綠底 vs 紅底 blockquote）×2 組
 *   C. AI 輔助段落（使用者操作→AI→確認，不編造功能）
 *   D. 結尾 CTA 框 + 延伸閱讀
 *
 * 改造方式：在既有正確內容的基礎上「插入」，不覆蓋已正確的評鑑知識
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/fix-blog-content-batch-2.ts
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";
import { getDbUrl } from "../db/index";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// ── 共用 HTML 片段 ───────────────────────────────────────────────────────────

const realSceneStyle =
  "border-left: 4px solid #b5895a; background: #f8f5f0; padding: 1rem 1.25rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;";
const badStyle =
  "background:#fff1f2; border-left: 4px solid #fca5a5; padding: 1rem 1.25rem; margin: 1rem 0; border-radius: 0 8px 8px 0; font-size:0.9rem;";
const goodStyle =
  "background:#f0fdf4; border-left: 4px solid #86efac; padding: 1rem 1.25rem; margin: 1rem 0; border-radius: 0 8px 8px 0; font-size:0.9rem;";
const ctaStyle =
  "margin-top: 2rem; padding: 1.5rem; background: #f0fdf4; border-radius: 12px; border: 1px solid #bbf7d0;";

// ── Article 1：disability-welfare-soap-case-records-2026 ──────────────────────

const soap_realScene = `<blockquote style="${realSceneStyle}"><strong>真實場景：</strong>評鑑委員翻開個案服務紀錄，指著 O 欄說：「這裡每週都寫『個案狀況良好』，請問這次服務和上次有什麼不同？」社工師一時語塞。委員繼續翻：「這份 A 欄寫的是『個案配合度高』，這是評估還是描述？你的 ISP 目標本月進度在哪裡可以看到？」事後社工師說：「我以為有填就好，沒想到委員連每一欄的意義都要核對。」這正是 4103 指標查核的核心——紀錄的<strong>品質</strong>，不只是<strong>頻率</strong>。</blockquote>\n\n`;

const soap_badGood_S = `\n<p><strong>看一個完整的 S 欄對比：</strong></p>
<blockquote style="${badStyle}"><strong>不好的 S 欄：</strong>「今日個案狀況不穩，情緒較差。」（把工作人員的觀察寫成主觀陳述，應寫在 O 欄）</blockquote>
<blockquote style="${goodStyle}"><strong>好的 S 欄：</strong>「個案（王小明）今日上課前以圖卡指向『頭痛』圖示，並搖頭拒絕進入教室。家屬來電表示個案昨晚睡眠不佳，約 23:00 才入睡。」（具體記錄服務對象自身的表達，以及家屬陳述）</blockquote>
`;

const soap_badGood_A = `\n<p><strong>A 欄的好壞對比最能反映社工師的專業深度：</strong></p>
<blockquote style="${badStyle}"><strong>不好的 A 欄：</strong>「今日個案完成職能訓練，狀況良好，繼續觀察。」（只是重複 O 的描述，沒有評估判斷）</blockquote>
<blockquote style="${goodStyle}"><strong>好的 A 欄：</strong>「個案精細動作較上次進步，今日描線偏差縮短至 0.5cm 以內，達成本月 ISP 短期目標進度約 60%（目標：3 個月內格子內描線 5 條≥80%準確）。顯示目前介入策略有效。建議下週提升難度，測試是否能在 3cm 格子內正確描線。」（對應 ISP 目標、有進度量化、有下一步建議）</blockquote>
`;

const soap_aiSection = `\n<h2>AI 如何幫助社工師提升 SOAP 紀錄品質</h2>

<p>SOAP 格式紀錄的難點不在「知道格式」，而在每次服務後都要花時間把口頭觀察轉化為結構化文字。AI 可以輔助這個轉化過程，但必須清楚它能做什麼、不能做什麼。</p>

<h3>三步驟流程（保留社工師的專業判斷）</h3>
<ol>
  <li><strong>社工師先記下關鍵觀察</strong>：服務結束後，用幾句話記下今天的重要觀察（例如：「王小明今天情緒較差，拒絕進教室，後來有說頭痛，完成了 6 條描線，比上週少，S 欄要記家屬說昨晚沒睡好」）</li>
  <li><strong>AI 依 SOAP 格式整理段落</strong>：選取草稿，請 AI「依 SOAP 格式改寫」，AI 依格式把草稿整理成 S/O/A/P 四段，確保每段都有對應內容</li>
  <li><strong>社工師審閱確認細節</strong>：逐段確認 AI 整理的內容是否與實際觀察一致，補充 AI 無從得知的細節（如個案當天的特殊表情、家屬說的原話），完成後親自確認送出</li>
</ol>

<blockquote style="${realSceneStyle}">💡 <strong>AI 段落改寫：</strong>在 <a href="/auth/sign-up">報告汪</a> 中選取已寫好的粗稿，輸入「依 SOAP 格式整理」或「A 欄補上與 ISP 目標的進度對應」，AI 在保留原意的前提下改寫段落，並支援多輪追問調整。社工師只需確認內容正確性，不需每次從空白頁開始。</blockquote>
`;

const soap_cta = `\n<p style="${ctaStyle}">
  <strong>想讓每份 SOAP 紀錄都能讓評鑑委員一看就懂？</strong><br />
  <a href="/auth/sign-up" style="color: #16a34a; font-weight: 600;">免費試用報告汪</a>——輸入服務觀察草稿，AI 依 SOAP 格式整理段落，社工師確認後快速完成符合 4103 評鑑要求的個案紀錄。
</p>`;

const soap_readings = `\n<hr />
<p><strong>延伸閱讀：</strong></p>
<ul>
  <li><a href="/school/disability-welfare">身心障礙福利機構評鑑小教室——109 年度 49 項基準完整解析</a></li>
  <li><a href="/disability-welfare">報告汪身心障礙機構評鑑報告管理功能介紹</a></li>
  <li><a href="/blog/disability-welfare-isp-writing-guide-2026">身心障礙機構 ISP 個別化服務計畫撰寫全攻略</a></li>
</ul>`;

function augmentSoap(original: string): string {
  let content = original;

  // A. 在最開頭插入真實場景（content 以 <h2> 開頭）
  content = soap_realScene + content;

  // B1. 在 S 欄 ul 結尾（"</ul>\n\n<h3>O"）插入好/壞對比
  content = content.replace(
    "</ul>\n\n<h3>O — Objective",
    soap_badGood_S + "\n</ul>\n\n<h3>O — Objective"
  );

  // B2. 在 A 欄 ul 結尾（"</ul>\n\n<h3>P"）插入好/壞對比
  content = content.replace(
    "</ul>\n\n<h3>P — Plan",
    soap_badGood_A + "\n</ul>\n\n<h3>P — Plan"
  );

  // C. 替換既有 AI blockquote（省時提示那段，措辭不精確）為完整 AI 章節
  const oldAiBlock = `<blockquote>\n  💡 <strong>省時提示：</strong>使用 <a href="/auth/sign-up">報告汪</a> 的 AI 文書助理，可以輸入服務場景的關鍵詞，AI 會協助生成符合 SOAP 格式的個案紀錄初稿，工作人員只需確認和調整細節，大幅縮短每次紀錄的時間。\n</blockquote>`;
  content = content.replace(oldAiBlock, soap_aiSection);

  // D. 在延伸閱讀之前，移除既有延伸閱讀並插入 CTA + 新延伸閱讀
  const oldReadings = `<hr />\n<p><strong>延伸閱讀：</strong></p>\n<ul>\n  <li><a href="/blog/disability-welfare-isp-writing-guide-2026">ISP個別化服務計畫撰寫全攻略</a></li>\n  <li><a href="/blog/disability-welfare-paperwork-efficiency-2026">AI輔助文書工作效率化</a></li>\n  <li><a href="/school/disability-welfare">身心障礙福利機構評鑑小教室</a></li>\n</ul>`;
  content = content.replace(oldReadings, soap_cta + "\n" + soap_readings);

  return content;
}

// ── Article 2：general-nursing-home-accident-handling-2026 ────────────────────

const accident_badGood_report = `\n<p><strong>通報紀錄的好壞對比——評鑑委員抽查時立刻看得出來：</strong></p>
<blockquote style="${badStyle}"><strong>不好的通報紀錄：</strong>「2026/3/15 住民跌倒，已通知家屬王先生。」（缺少通報機構主管與主管機關的記錄、缺少確切時間、缺少事件經過）</blockquote>
<blockquote style="${goodStyle}"><strong>好的通報紀錄：</strong>「事件發生時間：2026/3/15 14:22，地點：2樓走廊。住民（張○○，床號 201）如廁返回途中跌倒，右膝擦傷約 2×3cm。立即評估：意識清楚、生命徵象正常、無骨折疑慮。14:30 通知主治醫師陳醫師→醫囑傷口處置；14:45 通知家屬王先生（主要聯絡人），告知事件經過及處置情形；15:00 通報機構主管陳主任。通報主管機關：已於事件發生後 4 小時（18:22）填寫主管機關通報表並送出。後續追蹤計畫：更換防滑拖鞋、走廊加設扶手（負責人：護理長，完成期限：2026/3/22）。」</blockquote>
`;

const accident_cta = `<p style="${ctaStyle}">
  <strong>想讓意外事件記錄從「有填」變成「符合評鑑要求」？</strong><br />
  <a href="/auth/sign-up" style="color: #16a34a; font-weight: 600;">免費試用報告汪</a>——為每件意外事件建立改善任務、設定期限與負責人，確保追蹤改善不漏接。評鑑委員查核時，改善閉環一目了然。
</p>

<hr />
<p><strong>延伸閱讀：</strong></p>
<ul>
  <li><a href="/school/general-nursing-home">一般護理之家評鑑小教室——115 年度基準完整解析</a></li>
  <li><a href="/general-nursing-home">報告汪一般護理之家評鑑報告管理功能介紹</a></li>
  <li><a href="/blog/general-nursing-home-care-plan-writing-2026">護理之家照護計畫怎麼寫？個別化計畫範例與 AI 輔助技巧</a></li>
</ul>`;

function augmentAccident(original: string): string {
  let content = original;

  // B. 在「步驟五」ul 結尾之後、步驟六之前插入好/壞對比
  content = content.replace(
    "<h3>步驟六：後續追蹤與原因分析</h3>",
    accident_badGood_report + "\n<h3>步驟六：後續追蹤與原因分析</h3>"
  );

  // D. 替換結尾 blockquote（含 general-nursing-home 連結那個）為 CTA 框 + 延伸閱讀
  const oldEnding = `<blockquote><p>你的機構有系統地追蹤每一件意外事件的改善進度嗎？<a href="/general-nursing-home">報告汪</a>的追蹤功能讓你為每件意外事件建立改善任務，設定期限與負責人，確保改善措施不漏接。<a href="/school/general-nursing-home">了解護理之家評鑑全貌</a>，評鑑委員查核時讓你有底氣。</p></blockquote>`;
  content = content.replace(oldEnding, "");

  // 替換末尾的舊延伸閱讀
  const oldReadings = `<hr />\n\n<h2>延伸閱讀</h2>\n<ul>\n<li><a href="/school/general-nursing-home">一般護理之家評鑑學習中心——完整基準解析</a></li>\n<li><a href="/general-nursing-home">一般護理之家機構服務介紹</a></li>\n<li><a href="/blog/general-nursing-home-manager-a11-guide-2026">A1.1 負責人管理查核紀錄怎麼寫才能拿高分</a></li>\n<li><a href="/blog/general-nursing-home-quality-indicators-guide">護理之家品質指標完整指南</a></li>\n</ul>`;
  content = content.replace(oldReadings, "\n" + accident_cta);

  return content;
}

// ── Article 3：disability-welfare-isp-multi-need-assessment-2026 ──────────────

const isp_realScene = `<blockquote style="${realSceneStyle}"><strong>真實場景：</strong>評鑑委員翻開一份 ISP，看到「評估工具：自製評估表」，問道：「為什麼選這個工具？它是否適合這位重度智能障礙的成人服務對象？」社工師答：「因為比較簡單……」委員繼續問：「這位服務對象同時有肢體障礙，你的評估裡有沒有評到動作功能？有沒有用 FIM 或 Barthel？」——這是 4101『適齡適性評估工具』最常被挑戰的現場。本文整理跨障別的工具選用邏輯，讓你在評鑑現場能清楚說明為什麼選這個工具。</blockquote>\n\n`;

const isp_badGood_goal = `\n<p><strong>目標設定的好壞對比——委員一眼看出 ISP 品質：</strong></p>
<blockquote style="${badStyle}"><strong>不好的 ISP 目標（4102 最常見失分）：</strong>「短期目標：增進溝通能力。」（太籠統、無法量化、無時間限制，委員無法評估是否達成）</blockquote>
<blockquote style="${goodStyle}"><strong>好的 ISP 目標（SMART 格式）：</strong>「短期目標（3 個月）：個案能在無提示的情況下，使用溝通板主動表達 10 個基本需求（食物、廁所、休息、喜歡/不喜歡）。評量標準：3 次觀察中至少 2 次能自主使用。評量日期：2026/4/10、2026/7/10。負責執行：教保員林老師（每日訓練 15 分鐘）、社工師陳老師（每 2 週記錄進度）。」</blockquote>
`;

const isp_aiSection_new = `<blockquote style="${realSceneStyle}">💡 <strong>AI 評鑑分析輔助：</strong>在 <a href="/auth/sign-up">報告汪</a> 中上傳備審文件後，可選取「評估分析」功能，AI 依身心障礙機構評鑑指標逐條比對，輸出各指標的覆蓋狀況（已符合 / 缺少資料 / 不合理矛盾 / 應追蹤未追蹤），社工師針對 AI 標示的缺口優先補強，評鑑前幾分鐘就能看到需要加強的熱點。</blockquote>`;

const isp_cta = `\n<p style="${ctaStyle}">
  <strong>想讓 ISP 多重需求評估從「有評」到「評鑑委員問得出來」？</strong><br />
  <a href="/auth/sign-up" style="color: #16a34a; font-weight: 600;">免費試用報告汪</a>——AI 輔助比對備審文件與評鑑指標，協助社工師快速找出 4101-4103 的缺口，讓每份 ISP 都能說清楚評估工具選用邏輯與目標依據。
</p>

<hr />
<p><strong>延伸閱讀：</strong></p>
<ul>
  <li><a href="/school/disability-welfare">身心障礙福利機構評鑑小教室——109 年度 49 項基準完整解析</a></li>
  <li><a href="/disability-welfare">報告汪身心障礙機構評鑑報告管理功能介紹</a></li>
  <li><a href="/blog/disability-welfare-isp-writing-guide-2026">身心障礙機構 ISP 個別化服務計畫撰寫全攻略（5 大步驟）</a></li>
</ul>`;

function augmentIspMultiNeed(original: string): string {
  let content = original;

  // A. 在最開頭插入真實場景（content 以 <h2>為什麼多重需求 開頭）
  content = isp_realScene + content;

  // B. 在 SMART 目標 ol 之後插入好/壞對比
  // ol 以 </ol> 結尾，緊接著 <blockquote>（省時提示）
  content = content.replace(
    "</ol>\n\n<blockquote>\n  💡 <strong>省時提示：</strong>",
    "</ol>\n" + isp_badGood_goal + "\n<blockquote>\n  💡 <strong>省時提示：</strong>"
  );

  // C. 替換「AI 評鑑分析」blockquote 為更精確的版本
  const oldAiAnalysis = `<blockquote>💡 <strong>AI 評鑑分析：</strong>把備審文件丟給 <a href="/auth/sign-up">報告汪</a> AI，系統依該機構類型完整評鑑指標逐條比對，輸出「缺少資料 / 不合理矛盾 / 應追蹤未追蹤 / 已符合 / 改善優先順序」清單，評鑑前幾分鐘就能看到熱點。</blockquote>`;
  content = content.replace(oldAiAnalysis, isp_aiSection_new);

  // D. 替換舊延伸閱讀為 CTA 框 + 新延伸閱讀
  const oldReadings = `<hr />\n<p><strong>延伸閱讀：</strong></p>\n<ul>\n  <li><a href="/blog/disability-welfare-isp-writing-guide-2026">身心障礙機構ISP個別化服務計畫撰寫全攻略</a></li>\n  <li><a href="/blog/disability-welfare-soap-case-records-2026">SOAP格式在身心障礙機構的應用</a></li>\n  <li><a href="/school/disability-welfare">身心障礙福利機構評鑑小教室</a></li>\n</ul>`;
  content = content.replace(oldReadings, isp_cta);

  return content;
}

// ── 主流程 ────────────────────────────────────────────────────────────────────

type ContentFix = {
  slug: string;
  jsonFile: string;
  newSeoTitle: string;
  newSeoDescription: string;
  augment: (original: string) => string;
};

const fixes: ContentFix[] = [
  {
    slug: "disability-welfare-soap-case-records-2026",
    jsonFile: "scripts/blog-posts/article-202-disability-welfare-soap-case-records.json",
    newSeoTitle: "身心障礙機構 SOAP 紀錄怎麼寫？4 段格式＋好壞範例對比｜報告汪",
    newSeoDescription:
      "身心障礙機構 SOAP 個案紀錄怎麼寫才能通過評鑑 4103？逐段拆解 Subjective、Objective、Assessment、Plan 四段格式，附「過關紀錄 vs 待改善紀錄」實際對比，並說明如何串連 ISP 目標與每 2 週紀錄頻率要求。",
    augment: augmentSoap,
  },
  {
    slug: "general-nursing-home-accident-handling-2026",
    jsonFile: "scripts/blog-posts/article-103-general-nursing-home-accident-handling.json",
    newSeoTitle: "護理之家意外事件怎麼處理？跌倒壓傷急救 SOP＋通報範例｜報告汪",
    newSeoDescription:
      "護理之家發生意外怎麼辦？依 115 年度 A1.3 評鑑基準，24 小時內通報、追蹤改善是評鑑核心。本文拆解跌倒、壓傷、緊急醫療三大意外的處置 SOP、通報時限、紀錄格式，附「過關通報 vs 失分通報」對比範例，幫機構建立完整意外管理流程。",
    augment: augmentAccident,
  },
  {
    slug: "disability-welfare-isp-multi-need-assessment-2026",
    jsonFile: "scripts/blog-posts/article-197-disability-welfare-isp-multi-need-assessment.json",
    newSeoTitle: "ISP 多重需求怎麼評估？身心障礙跨障別工具選用＋範例｜報告汪",
    newSeoDescription:
      "身心障礙機構 ISP 個案有多重需求時如何評估？本文拆解生理、心理、日常、社交、學習、社區六大需求面向的評估方法，附肢體障礙、智能障礙、自閉症、多重障礙的工具選用建議與評估範例，對應 4101-4103 評鑑指標完整填寫。",
    augment: augmentIspMultiNeed,
  },
];

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    for (const fix of fixes) {
      const jsonPath = join(process.cwd(), fix.jsonFile);
      const data = JSON.parse(readFileSync(jsonPath, "utf-8"));
      const originalContent: string = data.content;

      const newContent = fix.augment(originalContent);

      if (newContent === originalContent) {
        console.error(`⚠️  ${fix.slug}：內容未改變，請確認 anchor 字串是否正確`);
        continue;
      }

      // 更新 DB
      const [updated] = await db
        .update(blogPosts)
        .set({
          content: newContent,
          seoTitle: fix.newSeoTitle,
          seoDescription: fix.newSeoDescription,
        })
        .where(eq(blogPosts.slug, fix.slug))
        .returning({ id: blogPosts.id, slug: blogPosts.slug });

      if (!updated) {
        console.error(`⚠️  找不到 slug: ${fix.slug}（DB 跳過）`);
        continue;
      }
      console.log(`✅ DB: ${updated.slug}（content +${newContent.length - originalContent.length} 字元）`);

      // 同步 JSON 種子檔
      data.content = newContent;
      data.seoTitle = fix.newSeoTitle;
      data.seoDescription = fix.newSeoDescription;
      writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
      console.log(`✅ JSON: ${fix.jsonFile}`);
    }
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
