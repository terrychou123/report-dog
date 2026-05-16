/**
 * Round 3：對 5 篇 GA 熱門 × GSC 沒入榜文章注入 FAQ + 延伸閱讀。
 *
 * 背景：
 *   GA4 顯示這 5 篇 28 天 PV 介於 365–666，但 GSC top 30 沒入榜（API 隱私 threshold 過濾）。
 *   Round 2 的 home-care-case-records-guide-2026 範本驗證：加 H3 Q/A 後可獲 FAQ rich snippet。
 *
 * FAQ 事實依據：
 *   - daycare：對應 lib/ai/evaluation-profiles/daycare.ts（4 區塊 43+2 項）
 *   - elderly-welfare：對應 lib/ai/evaluation-profiles/elderly-welfare.ts（6 區塊 77 項）
 *   - home-nursing：對應 lib/ai/evaluation-profiles/home-nursing.ts（A 經營管理 5 項 + B 照護管理 3 項）
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/add-blog-faq-round3-2026-05.ts          # dry-run（預設）
 *   npx tsx --env-file=.env.local scripts/add-blog-faq-round3-2026-05.ts --commit  # 寫入 DB
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";
import { getDbUrl } from "../db/index";

const isDryRun = !process.argv.includes("--commit");

const ARTICLES: Array<{
  slug: string;
  faqHtml: string;
  hubLink: { href: string; label: string };
  relatedSlugs: string[];
}> = [
  {
    slug: "daycare-care-plan-complete-example-2026",
    hubLink: { href: "/school/daycare", label: "日照中心評鑑小教室｜45 項基準完整解析" },
    relatedSlugs: ["daycare-evaluation-45-items-guide-2026"],
    faqHtml: `
<h2>常見問題</h2>
<h3>Q：日照中心個別化照顧計畫一定要寫什麼項目？</h3>
<p>A：依 115 年度臺北市日照評鑑基準第 5–7 條，照顧計畫至少需涵蓋：個案基本資料、入住前評估（生理、心理、社會三面向）、照顧目標（短期與長期）、具體照顧措施、定期評值週期。實務上建議在計畫書首頁列出「評估摘要 + 目標 + 措施對應表」，讓委員一眼看出計畫邏輯。</p>
<h3>Q：日照照顧計畫多久要重新評值一次？</h3>
<p>A：評鑑基準要求至少每 3 個月（每季）進行一次評值，並在個案狀況有重大變化（如住院出院、認知功能退化、家庭支持改變）時主動重評。每次評值需留存書面紀錄與簽名，作為複評時的佐證。</p>
<h3>Q：初評、期中評值、複評有什麼不同？</h3>
<p>A：初評是入住後 7 個工作天內完成的全人評估，建立 baseline；期中評值是每季依目標達成度做的進度追蹤；複評則是個案結案、轉介或重大變化時的綜合回顧。三階段一條龍才能展示完整的 PDCA 循環。</p>
<h3>Q：日照照顧計畫常見的扣分點有哪些？</h3>
<p>A：委員最常扣分的三類：（1）目標不可量化（如「改善精神狀況」應改為「每週參與團體活動 ≥ 3 次」）；（2）評值與計畫脫節（沒對應原本設定的目標）；（3）家屬參與紀錄不足（評鑑要求個案/家屬參與計畫制定，需簽名留存）。</p>`,
  },
  {
    slug: "daycare-evaluation-45-items-guide-2026",
    hubLink: { href: "/school/daycare", label: "日照中心評鑑小教室｜45 項基準完整解析" },
    relatedSlugs: ["daycare-care-plan-complete-example-2026"],
    faqHtml: `
<h2>常見問題</h2>
<h3>Q：日照中心評鑑 45 項是怎麼分區的？</h3>
<p>A：115 年度臺北市日照評鑑分 5 大區塊：壹、個案權益保障（項目 1–4）、貳、專業照護品質（5–22）、參、經營管理效能（23–37）、肆、安全環境設備（38–43），加上伍、加分題（44–45）共 45 項。其中貳區（18 項）為配分最重的核心區塊，貫穿全部評鑑得分權重的近一半。</p>
<h3>Q：哪幾項是日照評鑑的扣分重災區？</h3>
<p>A：從歷年評鑑回饋，最常見扣分集中在：照顧計畫評值頻率不足（項目 5–7）、感染管制紀錄不完整（項目 12 附近）、緊急應變演練未落實（項目 35–37）、定型化契約版本不符（項目 3，需採衛福部「社區式服務類長期照顧服務機構定型化契約範本」）。</p>
<h3>Q：日照評鑑採什麼計分制？</h3>
<p>A：評分採 A–E 五等制（部分項目為 A–B–E 三等或特殊計分）。A 為完全符合、B 為大致符合、C 部分符合、D 待改進、E 未符合。一級必要項目須達 B 以上才算通過，C 等以下視為缺失，需於規定期限內提改善計畫。</p>
<h3>Q：日照評鑑前 3 個月應該做什麼準備？</h3>
<p>A：三步走：（1）對照 45 項基準逐條建立佐證資料清單（建議用 Excel 自評表打勾）；（2）召開全體員工說明會釐清角色分工（社工/護理師/照服員/行政）；（3）邀請外部顧問或同業夥伴做一次模擬評鑑找出弱點。建議於評鑑前 6–8 週完成第一輪內部自評。</p>`,
  },
  {
    slug: "elderly-welfare-eval-grade-strategy",
    hubLink: { href: "/school/elderly-welfare", label: "老人福利機構評鑑小教室｜115 年度 77 項完整解析" },
    relatedSlugs: [],
    faqHtml: `
<h2>常見問題</h2>
<h3>Q：老人福利機構評鑑分哪些等第？</h3>
<p>A：115 年度老人福利機構評鑑分為「優等」「合格」「待改進」三等。優等須總分達 90 分以上、一級必要指標全數達標、二級加強指標多數達標；合格須 70 分以上且一級必要全數通過；任一一級必要失分即無法進入合格以上等第。</p>
<h3>Q：老人福利機構評鑑哪個區塊配分最高？</h3>
<p>A：B 區「專業照護品質」（項目 16–46 共 31 項）占總分 40%，是衝高總分的核心區塊。其次為 C 區「安全環境設備」占 25%、A 區「經營管理效能」占 20%、D 區「個案權益保障」占 13%、E 區「服務改進創新」占 2%，F 區「加分題」最高可加 2 分。</p>
<h3>Q：想拚優等該怎麼配置資源？</h3>
<p>A：三個槓桿：（1）守住一級必要指標，任一失分即無法進入優等，須以最高規格準備；（2）衝刺 B 區 40% 配分，建議成立跨專業 ICP（社工/護理/照服）會議制度，每月召開個案討論；（3）善用 E 區創新與 F 區加分題，用智慧照護導入或在地安老方案做機構差異化。</p>
<h3>Q：評鑑前該做哪些自我查核？</h3>
<p>A：建議三輪查核：第一輪（前 3 個月）以 77 項指標逐條核對佐證資料；第二輪（前 1 個月）做模擬評鑑找出灰色地帶；第三輪（前 1 週）演練委員實地查訪動線與訪談題目。可搭配 AI 工具做初步缺失偵測，提早補強。</p>`,
  },
  {
    slug: "home-nursing-eval-prep-guide-2026",
    hubLink: { href: "/school/home-nursing", label: "居家護理所評鑑小教室｜115 年度 8 項基準完整解析" },
    relatedSlugs: ["home-nursing-soap-b2-evaluation-records"],
    faqHtml: `
<h2>常見問題</h2>
<h3>Q：居家護理所 115 年度評鑑共幾項？</h3>
<p>A：共 8 項，分 2 大區塊：A、經營管理（5 項：A1 社區資源、A2 感染管制、A3 訪視安全、A4 緊急事件、A5 品質指標）+ B、照護管理（3 項：B1 機構資訊、B2 個案照護、B3 加分項目）。其中 B2 個案照護管理單項占 45%，是評鑑核心。</p>
<h3>Q：A5 機構經營指標監測要追蹤哪 5 項指標？</h3>
<p>A：A5 要求機構固定監測 5 項指標：（1）平均個案管理人數、（2）護理人員離職率、（3）個案非計畫性住院率、（4）個案急診使用率、（5）皮膚損傷發生率。需定期統計分析、超閾值改善、必要時修訂閾值。指標名稱為官方固定，不可自行替換。</p>
<h3>Q：B2 個案照護管理為什麼占比這麼高？</h3>
<p>A：B2 占總分 45%，因為居家護理的核心價值在「個案管理品質」。評鑑日前 1 年內需有 10 位以上個案（含未結案及結案）、收案時及每 6 個月全人評估、依需求變化即時重評。委員會抽看完整個案紀錄與照護計畫對應度。</p>
<h3>Q：B3 加分項目要怎麼準備？</h3>
<p>A：B3 任一達成即可加分：創新/實證照護、全國或縣市競賽獲獎、國際交流、照護特色標竿、學會或協會口頭或海報發表。建議從機構日常照護中找出一個「有差異化的做法」（如導入特殊敷料、跨域合作案例），整理為發表稿或競賽提案即可。</p>`,
  },
  {
    slug: "home-nursing-soap-b2-evaluation-records",
    hubLink: { href: "/school/home-nursing", label: "居家護理所評鑑小教室｜115 年度 8 項基準完整解析" },
    relatedSlugs: ["home-nursing-eval-prep-guide-2026"],
    faqHtml: `
<h2>常見問題</h2>
<h3>Q：B2 評鑑指標和 SOAP 是什麼關係？</h3>
<p>A：居家護理所 115 年度評鑑 B2 個案照護管理（占 45%）要求照護計畫需含「問題、目標、措施、評值」四要素，與 SOAP 的 Subjective/Objective、Assessment、Plan、Evaluation 完全對應。把每次訪視紀錄寫成 SOAP 格式，就是直接對應 B2 的最快方式。</p>
<h3>Q：SOAP 中的 A（Assessment）怎麼寫才算到位？</h3>
<p>A：Assessment 是評鑑委員最看重的欄位。要寫出「整合判斷」而非複述 S/O 內容：例如「依血壓 158/95 + 主訴頭暈 + 上週起合併新藥 X，懷疑藥物副作用導致姿勢性低血壓，需衛教改變姿勢動作與監測 7 天」。重點是把 S 與 O 的訊息收斂為一個臨床判斷。</p>
<h3>Q：SOAP 紀錄常見格式錯誤有哪些？</h3>
<p>A：三大錯誤：（1）Plan 寫得太籠統（如「衛教個案」應改為「衛教個案 5 項用藥安全要點，附書面衛教單」）；（2）缺少評值欄（沒對應上次的 Plan）；（3）四要素同時擠在一個段落沒分欄。委員偏好分欄表格格式，能一眼看出 SOAP 四元素的對應關係。</p>
<h3>Q：一份 B2 完整照護計畫需要包含哪些紀錄？</h3>
<p>A：完整 B2 計畫包含：收案評估表（全人評估）、照護問題清單、月度照護計畫（含目標 + 措施）、每次訪視 SOAP 紀錄、每 6 個月再評估紀錄、結案摘要（如適用）。整套紀錄需能追溯個案 1 年內的照護軌跡，並能回應委員對「個案如何因照護計畫改善」的提問。</p>`,
  },
];

const FAQ_MARKER = "<!-- round3-faq-injected -->";
const EXTENDED_MARKER = "<!-- round3-extended-reading-injected -->";

function buildExtendedReading(article: (typeof ARTICLES)[number]): string {
  const TITLES: Record<string, string> = {
    "daycare-care-plan-complete-example-2026": "日照中心個別化照顧計畫完整範例",
    "daycare-evaluation-45-items-guide-2026": "日照中心評鑑 45 題全攻略",
    "elderly-welfare-eval-grade-strategy": "老人福利機構評鑑等第策略",
    "home-nursing-eval-prep-guide-2026": "115 年度居家護理所評鑑 8 項基準懶人包",
    "home-nursing-soap-b2-evaluation-records": "居家護理 SOAP B2 評鑑紀錄寫法",
  };
  const relatedLinks = article.relatedSlugs
    .filter((s) => s !== article.slug)
    .map((s) => `<li><a href="/blog/${s}">${TITLES[s] ?? s}</a></li>`)
    .join("\n");
  return `
${EXTENDED_MARKER}
<h2>延伸閱讀</h2>
<ul>
<li><a href="${article.hubLink.href}">${article.hubLink.label}</a></li>
${relatedLinks}
</ul>`;
}

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    let totalUpdated = 0;

    for (const article of ARTICLES) {
      const [post] = await db
        .select({ id: blogPosts.id, slug: blogPosts.slug, content: blogPosts.content })
        .from(blogPosts)
        .where(eq(blogPosts.slug, article.slug));

      if (!post) {
        console.warn(`⚠️  找不到 slug: ${article.slug}`);
        continue;
      }

      const hasFaq = post.content?.includes(FAQ_MARKER);
      const hasExtended = post.content?.includes(EXTENDED_MARKER);

      if (hasFaq && hasExtended) {
        console.log(`⏭️  已注入 FAQ + 延伸閱讀，跳過：${article.slug}`);
        continue;
      }

      const faqSection = !hasFaq ? `\n${FAQ_MARKER}${article.faqHtml}` : "";
      const extendedSection = !hasExtended ? buildExtendedReading(article) : "";
      const suffix = faqSection + extendedSection;
      const newContent = (post.content ?? "") + suffix;

      console.log(`\n📄 ${article.slug}`);
      console.log(`   FAQ：${!hasFaq ? "✓ 注入" : "已有，跳過"}`);
      console.log(`   延伸閱讀：${!hasExtended ? "✓ 注入" : "已有，跳過"}`);
      console.log(`   新增 HTML：${suffix.length} 字元`);

      // 預覽前 2 題
      const q3Matches = [...suffix.matchAll(/<h3>Q：(.*?)<\/h3>/g)];
      if (q3Matches.length > 0) {
        console.log(`   FAQ 預覽（前 2 題）：`);
        q3Matches.slice(0, 2).forEach((m, i) => {
          console.log(`     ${i + 1}. ${m[1]}`);
        });
      }

      if (!isDryRun) {
        await db
          .update(blogPosts)
          .set({ content: newContent, updatedAt: new Date() })
          .where(eq(blogPosts.slug, article.slug));
        totalUpdated++;
      }
    }

    if (isDryRun) {
      console.log("\n⚡ dry-run 模式 — 未寫入 DB。加 --commit 執行實際更新。\n");
    } else {
      console.log(`\n✅ 已更新 ${totalUpdated} 篇文章\n`);
      console.log("⚠️  建議重新部署或呼叫 revalidateTag(\"blog-post\") 清除 cache。\n");
    }
  } finally {
    await client.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
