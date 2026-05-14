/**
 * 對 7 篇 PDCA cluster 文章在文末注入：
 * 1. FAQ 段落（3-4 組 H3 Q/A 配對，供 FAQ schema 萃取器使用）
 * 2. 延伸閱讀段（link /blog/pdca hub + 2 篇姊妹文）
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/add-pdca-faq-content.ts          # dry-run（預設）
 *   npx tsx --env-file=.env.local scripts/add-pdca-faq-content.ts --commit  # 寫入 DB
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";
import { getDbUrl } from "../db/index";

const isDryRun = !process.argv.includes("--commit");

// 每篇文章的 FAQ + 延伸閱讀（依機構類型客製化問題）
const PDCA_ARTICLES: Array<{
  slug: string;
  faqHtml: string;
  relatedSlugs: string[];
}> = [
  {
    slug: "home-nursing-pdca-writing-2026",
    relatedSlugs: [
      "nursing-home-pdca-improvement-tracking-2026",
      "postpartum-pdca-quality-2026",
    ],
    faqHtml: `
<h2>常見問題</h2>
<h3>Q：居家護理所 PDCA 範例怎麼寫才能通過評鑑？</h3>
<p>A：重點在於「數字有前後對比」。Plan 階段要設可量化目標（如「壓傷率降低 20%」），Check 階段要呈現實際數據與基準值的比較表，Act 階段要具體寫出因數據落差而採取的改善行動，評鑑委員就能看到真實的 PDCA 循環。</p>
<h3>Q：居家護理所的 PDCA 要針對哪些品質指標？</h3>
<p>A：居家護理所評鑑基準 A5「品質指標監測」要求機構監測以下指標：非預期再住院率、壓傷發生率、跌倒發生率、導尿管相關感染率。建議以這四項為 PDCA 主軸，每項各建一份循環紀錄。</p>
<h3>Q：PDCA 一年要做幾次才符合評鑑要求？</h3>
<p>A：至少每季（每 3 個月）完成一次 Check-Act 循環，並留存書面紀錄或會議記錄作為佐證。若指標異常，應立即啟動短週期改善而非等到下季。</p>
<h3>Q：PDCA 和 SOAP 紀錄的差別是什麼？</h3>
<p>A：SOAP 用於記錄個案單次照護，PDCA 用於記錄機構品質指標的系統性改善循環。評鑑時兩者都需要，SOAP 証明個案照護品質，PDCA 証明機構有持續改善文化。</p>`,
  },
  {
    slug: "nursing-home-pdca-improvement-tracking-2026",
    relatedSlugs: [
      "home-nursing-pdca-writing-2026",
      "nursing-home-continuous-improvement-2026",
    ],
    faqHtml: `
<h2>常見問題</h2>
<h3>Q：住宿型長照機構 PDCA 要追蹤哪些指標？</h3>
<p>A：評鑑基準 A4「缺失改善計畫執行」要求機構針對上次評鑑缺失逐一做 PDCA。常見品質指標包含：身體約束率、吸入性肺炎率、跌倒發生率、壓傷發生率、非預期住院率。建議每項指標維護一份獨立的 PDCA 追蹤表。</p>
<h3>Q：PDCA 改善計畫怎麼跟上次評鑑缺失掛鉤？</h3>
<p>A：在 Plan 階段明確寫出「本次改善目標源自上次評鑑缺失項目 X.X（條號）」，並載明改善期限。Act 階段要確認缺失是否已關閉，若未關閉要說明原因並設新的改善目標，這樣委員才能看到缺失追蹤的連貫性。</p>
<h3>Q：PDCA 紀錄要用什麼格式保存？</h3>
<p>A：可用表格格式（四欄：P/D/C/A）或會議記錄附件。重要的是每次 Check 都要有數據截圖或統計表，Act 要有具體行動項目與負責人。評鑑委員偏好能一眼看出時間序列的格式。</p>`,
  },
  {
    slug: "nursing-home-continuous-improvement-2026",
    relatedSlugs: [
      "nursing-home-pdca-improvement-tracking-2026",
      "home-nursing-pdca-writing-2026",
    ],
    faqHtml: `
<h2>常見問題</h2>
<h3>Q：住宿型機構持續品質改善計畫要包含哪些要素？</h3>
<p>A：計畫應包含：目標指標（含基準值與目標值）、執行期間、負責人員、執行方式（Do）、查核頻率（Check 週期）、及改善行動觸發條件（Act：當指標偏離目標值 X% 時啟動）。評鑑委員在乎的是「計畫有沒有被執行，執行有沒有被追蹤」。</p>
<h3>Q：住宿型機構 PDCA 與持續改善計畫有什麼差別？</h3>
<p>A：持續改善計畫是機構層級的年度文件，PDCA 是其執行工具。一份持續改善計畫通常包含多個 PDCA 循環（每個指標一個循環），計畫是藍圖，PDCA 是執行紀錄。</p>
<h3>Q：如何讓評鑑委員快速看懂持續改善成效？</h3>
<p>A：建議在計畫書首頁加「改善成果摘要表」，以前後對比圖（折線圖或長條圖）呈現 3-5 個關鍵指標的趨勢。數字說話，委員不需要逐頁翻閱詳細紀錄就能判斷機構的改善能力。</p>`,
  },
  {
    slug: "hospital-evaluation-quality-indicators-pdca",
    relatedSlugs: [
      "home-nursing-pdca-writing-2026",
      "nursing-home-pdca-improvement-tracking-2026",
    ],
    faqHtml: `
<h2>常見問題</h2>
<h3>Q：醫院評鑑 PDCA 品質指標要怎麼選？</h3>
<p>A：115年度醫院評鑑基準 2.2.1（必要條文）要求醫院監測「院所層級品質指標」。選指標三原則：可測量（有分子/分母定義）、可改善（有介入空間）、具意義（與病人安全或照護品質直接相關）。建議從 JCI/JCIA 或衛福部核心指標清單選 5-10 項作為起點。</p>
<h3>Q：醫院 PDCA 品質指標的 Check 週期要多長？</h3>
<p>A：一般每月收集一次數據，每季進行一次完整 PDCA 循環分析，重大指標（如手術部位感染率）建議每月分析一次。Act 行動要在 Check 完成後 30 天內啟動並記錄。</p>
<h3>Q：醫院 PDCA 報告格式評鑑委員期待看到什麼？</h3>
<p>A：委員最重視「異常值的後續追蹤」。當某月指標超出管制界線，要能看到：（1）根本原因分析（RCA/魚骨圖）、（2）具體改善行動、（3）下月追蹤結果。格式建議用 A3 問題解決格式，能在一張紙上呈現完整 PDCA 邏輯。</p>`,
  },
  {
    slug: "disability-welfare-quality-improvement-2026",
    relatedSlugs: [
      "home-nursing-pdca-writing-2026",
      "nursing-home-continuous-improvement-2026",
    ],
    faqHtml: `
<h2>常見問題</h2>
<h3>Q：身心障礙福利機構 PDCA 品質改善要針對哪些面向？</h3>
<p>A：109年度評鑑指標 1102「定期管理會議」與 1103「品質改善計畫」要求機構至少每半年召開品質改善會議，並留存 PDCA 紀錄。常見重點：個別化服務計畫達成率、投訴申訴處理時效、環境安全巡查缺失改善率。</p>
<h3>Q：身障機構要達到「評鑑優等」PDCA 要做到什麼程度？</h3>
<p>A：優等機構通常有「第二層 PDCA」——不只追蹤一般品質指標，還會針對 PDCA 本身的執行品質做反省（如：PDCA 計畫完成率、委員指摘項目改善率）。此外，創新服務方案（如輔具適配改善計畫）若有 PDCA 佐證，可獲加分。</p>
<h3>Q：品質改善計畫書要怎麼呈現才能讓委員信服？</h3>
<p>A：三個關鍵：（1）資料來源可追溯（如引用管理會議紀錄頁碼）、（2）數字有具體分母（如「24 位服務對象中 23 位 ISP 按時更新，達成率 95.8%」而非「大部分都有更新」）、（3）未達目標有說明原因並提出下一步行動。</p>`,
  },
  {
    slug: "infant-daycare-improvement-plan-pdca-2026",
    relatedSlugs: [
      "home-nursing-pdca-writing-2026",
      "nursing-home-pdca-improvement-tracking-2026",
    ],
    faqHtml: `
<h2>常見問題</h2>
<h3>Q：托嬰中心 PDCA 改善計畫要針對哪個評鑑指標？</h3>
<p>A：臺北市 114-116 年度托嬰中心評鑑指標中，「健康安全」區塊（40分）要求機構提供事故傷害、疾病預防等改善計畫。PDCA 通常圍繞：跌倒/咬傷發生率、流感/腸病毒感染率、藥物給藥錯誤率等進行。</p>
<h3>Q：托嬰中心 PDCA 和「改善計畫」有什麼關係？</h3>
<p>A：改善計畫是評鑑文件，PDCA 是其執行邏輯框架。評鑑委員查核改善計畫時，會確認：是否有目標值（P）、是否有執行紀錄（D）、是否有定期檢核（C）、是否有因應措施（A）。把改善計畫寫成 PDCA 格式，就是最直接的對應方式。</p>
<h3>Q：托嬰中心 PDCA 紀錄要保存多久？</h3>
<p>A：依托嬰中心設置辦法，相關紀錄至少保存 3 年。評鑑時委員會抽查當年度與上一年度的改善紀錄，建議建立電子資料夾依年份分類，方便快速調閱。</p>`,
  },
  {
    slug: "postpartum-pdca-quality-2026",
    relatedSlugs: [
      "home-nursing-pdca-writing-2026",
      "nursing-home-pdca-improvement-tracking-2026",
    ],
    faqHtml: `
<h2>常見問題</h2>
<h3>Q：產後護理之家 PDCA 品質管理要針對哪些指標？</h3>
<p>A：115年度產後護理之家評鑑基準 A2.3「品質管理機制」要求機構監測照護品質指標。常見重點：產婦母乳哺育率、新生兒黃疸處置及時率、感染發生率、住宿滿意度。建議建立月報表追蹤以上指標，作為 PDCA Check 的數據基礎。</p>
<h3>Q：月子中心 PDCA 怎麼跟滿意度調查結合？</h3>
<p>A：在 Plan 階段設定滿意度目標（如「整體滿意度 ≥ 90 分」），Do 階段執行服務並收集每位住民的意見回饋，Check 階段統計低分項目並與目標比較，Act 階段針對前三名低分項目制定服務改善方案，下一季驗證成效。</p>
<h3>Q：產後護理之家 PDCA 報告評鑑委員會特別看哪些地方？</h3>
<p>A：委員重視「連續性」：一份好的 PDCA 報告要能展示同一指標在 2-3 個循環內的改善軌跡（如：第一季跌倒 3 件 → 改善後第二季 1 件 → 第三季持續 1 件），讓委員看到機構有系統性、持續性的品質管理能力，而非應付評鑑的一次性文件。</p>`,
  },
];

const EXTENDED_READING_TEMPLATE = (currentSlug: string, relatedSlugs: string[]) => `
<h2>延伸閱讀</h2>
<ul>
<li><a href="/blog/pdca">護理 PDCA 範例與寫法總覽 — 8 篇實戰教學</a></li>
${relatedSlugs
  .filter((s) => s !== currentSlug)
  .map((s) => `<li><a href="/blog/${s}">${slugToTitle(s)}</a></li>`)
  .join("\n")}
</ul>`;

function slugToTitle(slug: string): string {
  const TITLES: Record<string, string> = {
    "home-nursing-pdca-writing-2026": "護理 PDCA 怎麼寫？居家護理所 PDCA 範例與 4 步驟模板",
    "nursing-home-pdca-improvement-tracking-2026": "住宿型長照機構 PDCA 改善計畫追蹤指南",
    "nursing-home-continuous-improvement-2026": "住宿型機構持續品質改善計畫撰寫完整教學",
    "hospital-evaluation-quality-indicators-pdca": "醫院評鑑品質指標 PDCA 完整教學",
    "disability-welfare-quality-improvement-2026": "身心障礙機構品質改善計畫 PDCA 教學",
    "infant-daycare-improvement-plan-pdca-2026": "托嬰中心 PDCA 改善計畫撰寫指南",
    "postpartum-pdca-quality-2026": "產後護理之家 PDCA 品質管理完整教學",
  };
  return TITLES[slug] ?? slug;
}

async function main() {
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    let totalUpdated = 0;

    for (const article of PDCA_ARTICLES) {
      const [post] = await db
        .select({ id: blogPosts.id, slug: blogPosts.slug, content: blogPosts.content })
        .from(blogPosts)
        .where(eq(blogPosts.slug, article.slug));

      if (!post) {
        console.warn(`⚠️  找不到 slug: ${article.slug}（可能尚未發佈）`);
        continue;
      }

      const hasExistingFaq = post.content?.includes("<h2>常見問題</h2>");
      const hasExistingExtended = post.content?.includes("延伸閱讀");

      if (hasExistingFaq && hasExistingExtended) {
        console.log(`⏭️  已有 FAQ + 延伸閱讀，跳過：${article.slug}`);
        continue;
      }

      const suffix =
        (!hasExistingFaq ? article.faqHtml : "") +
        (!hasExistingExtended ? EXTENDED_READING_TEMPLATE(article.slug, article.relatedSlugs) : "");

      const newContent = (post.content ?? "") + suffix;

      console.log(`\n📄 ${article.slug}`);
      console.log(`   新增 FAQ：${!hasExistingFaq ? "✓" : "已有，跳過"}`);
      console.log(`   新增延伸閱讀：${!hasExistingExtended ? "✓" : "已有，跳過"}`);
      console.log(`   新增 HTML 長度：${suffix.length} 字元`);

      // 預覽前 2 個 H3 問題
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
      console.log("⚠️  建議重新部署或呼叫 revalidateTag(\"blog-post\") 以清除 cache。\n");
    }
  } finally {
    await client.end();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
