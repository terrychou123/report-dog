/**
 * 稽核既有 blog 文章中是否含有編造的產品功能描述。
 *
 * 掃描 `blog_posts.content`，找出含有「黑名單詞彙」的段落，
 * 產出 markdown 報告供人工 review。
 *
 * 黑名單詞彙清單來自 `docs/FEATURES.md` 的「禁用詞彙」與
 * `.claude/skills/ltc-social-writer/SKILL.md` 的產品功能準確性段。
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/audit-blog-fabricated-claims.ts
 *   npx tsx --env-file=.env.local scripts/audit-blog-fabricated-claims.ts --json   # 輸出 JSON
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogPosts } from "../db/schema";
import { getDbUrl } from "../db/index";
import { eq } from "drizzle-orm";

type Severity = "high" | "medium" | "low";

interface Rule {
  pattern: RegExp;
  severity: Severity;
  reason: string;
}

// 黑名單規則（與 docs/FEATURES.md「禁用詞彙」對齊）
const RULES: Rule[] = [
  // High：典型編造詞彙
  { pattern: /AI\s*自動生成\s*(ISP|計畫書|評估報告|報告書|個別化服務計畫)/, severity: "high", reason: "AI 從零生成（不存在）" },
  { pattern: /(快速)?起稿\s*(ISP|計畫|個別化)/, severity: "high", reason: "AI 起稿（不存在）" },
  { pattern: /(從零|空白頁)\s*(撰寫|生成|產生|開始)/, severity: "high", reason: "從零生成（不存在）" },
  { pattern: /AI\s*(會|可)?(自動)?(生成|產生|撰寫|起草)\s*(?:符合|完整|整份|一份)?\s*(計畫|報告|評估|文件|表單)/, severity: "high", reason: "AI 從零生成文件" },
  { pattern: /(多元)?障別\s*(適配|分流|對應)/, severity: "high", reason: "障別分流（不存在）" },
  { pattern: /針對\s*(智能障礙|自閉症|肢體障礙|多重障礙)[^，。]*?(框架|範本|模板)/, severity: "high", reason: "障別客製框架（不存在）" },
  { pattern: /AI\s*自動\s*(填表|帶入|填寫)/, severity: "high", reason: "自動填表（不存在）" },
  { pattern: /(即時|同步)\s*協同編輯/, severity: "high", reason: "即時協同編輯（不存在）" },
  { pattern: /多人\s*(同時|即時)\s*編輯/, severity: "high", reason: "即時多人編輯（不存在）" },

  // Medium：可能誇大
  { pattern: /自動\s*分類\s*(評鑑|條項|文件)/, severity: "medium", reason: "自動分類條項（不存在）" },
  { pattern: /自動\s*標注\s*(評鑑條項|佐證)/, severity: "medium", reason: "自動標注（不存在）" },
  { pattern: /品質指標\s*自動\s*監測/, severity: "medium", reason: "品質指標監測（廠商功能）" },
  { pattern: /閾值\s*警示/, severity: "medium", reason: "閾值警示（廠商功能）" },
  { pattern: /PBS[^，。]*?(自動|圖表|趨勢)/, severity: "medium", reason: "PBS 自動圖表（廠商功能）" },
  { pattern: /(Pro|進階|企業|專業)\s*方案/, severity: "medium", reason: "付費方案不存在" },
  { pattern: /(無限|無限制)\s*(額度|次數|使用)/, severity: "medium", reason: "目前全 free tier 1 次/天" },
  { pattern: /每月\s*\d+\s*次\s*AI/, severity: "medium", reason: "目前是每日 1 次，非每月" },

  // Low：模糊用詞，建議人工檢視
  { pattern: /智能\s*(適配|分流|匹配)/, severity: "low", reason: "「智能 X」常為編造修飾語" },
  { pattern: /AI\s*(會|可)?\s*(智能|聰明地?|自動|主動)?\s*推薦/, severity: "low", reason: "「AI 自動推薦」需驗證是否真有此功能" },
];

interface Hit {
  rule: Rule;
  excerpt: string;
}

interface PostAudit {
  slug: string;
  title: string;
  status: string;
  hits: Hit[];
  maxSeverity: Severity;
}

function severityRank(s: Severity): number {
  return s === "high" ? 3 : s === "medium" ? 2 : 1;
}

function maxOf(severities: Severity[]): Severity {
  return severities.reduce<Severity>((acc, s) =>
    severityRank(s) > severityRank(acc) ? s : acc, "low");
}

function extractExcerpt(content: string, matchIdx: number, matchLen: number): string {
  const start = Math.max(0, matchIdx - 80);
  const end = Math.min(content.length, matchIdx + matchLen + 80);
  return content.slice(start, end).replace(/\s+/g, " ").trim();
}

async function main() {
  const asJson = process.argv.includes("--json");
  const client = postgres(getDbUrl(), { prepare: false });
  const db = drizzle(client);

  try {
    const posts = await db
      .select({
        slug: blogPosts.slug,
        title: blogPosts.title,
        status: blogPosts.status,
        content: blogPosts.content,
      })
      .from(blogPosts);

    const audits: PostAudit[] = [];

    for (const post of posts) {
      if (!post.content) continue;
      const hits: Hit[] = [];
      for (const rule of RULES) {
        const globalRe = new RegExp(rule.pattern.source, rule.pattern.flags.includes("g") ? rule.pattern.flags : rule.pattern.flags + "g");
        let m: RegExpExecArray | null;
        while ((m = globalRe.exec(post.content)) !== null) {
          hits.push({ rule, excerpt: extractExcerpt(post.content, m.index, m[0].length) });
          if (m[0].length === 0) globalRe.lastIndex++; // 防無限迴圈
        }
      }
      if (hits.length === 0) continue;
      audits.push({
        slug: post.slug,
        title: post.title,
        status: post.status ?? "",
        hits,
        maxSeverity: maxOf(hits.map((h) => h.rule.severity)),
      });
    }

    // 排序：high > medium > low；同 severity 內按 hit 數量
    audits.sort((a, b) => {
      const sv = severityRank(b.maxSeverity) - severityRank(a.maxSeverity);
      if (sv !== 0) return sv;
      return b.hits.length - a.hits.length;
    });

    if (asJson) {
      console.log(JSON.stringify(audits, null, 2));
      return;
    }

    // Markdown 報告
    const total = posts.length;
    const flagged = audits.length;
    const highCount = audits.filter((a) => a.maxSeverity === "high").length;
    const mediumCount = audits.filter((a) => a.maxSeverity === "medium").length;
    const lowCount = audits.filter((a) => a.maxSeverity === "low").length;

    console.log(`# Blog 編造產品功能稽核報告\n`);
    console.log(`掃描總篇數：${total}　|　命中：${flagged}　|　🔴 high: ${highCount}　🟡 medium: ${mediumCount}　🟢 low: ${lowCount}\n`);
    console.log(`> 規則來源：\`docs/FEATURES.md\` 禁用詞彙清單。發現命中 ≠ 一定錯誤，仍需人工 review。\n`);

    if (audits.length === 0) {
      console.log("✅ 無命中。");
      return;
    }

    for (const audit of audits) {
      const icon = audit.maxSeverity === "high" ? "🔴" : audit.maxSeverity === "medium" ? "🟡" : "🟢";
      console.log(`---\n`);
      console.log(`## ${icon} ${audit.title}`);
      console.log(`- slug: \`${audit.slug}\` (${audit.status})`);
      console.log(`- 命中數：${audit.hits.length}`);
      console.log(`- URL: https://reportwang.com/blog/${audit.slug}\n`);
      const grouped = new Map<string, Hit[]>();
      for (const h of audit.hits) {
        const key = `${h.rule.severity}|${h.rule.reason}`;
        if (!grouped.has(key)) grouped.set(key, []);
        grouped.get(key)!.push(h);
      }
      for (const [key, group] of grouped) {
        const [sev, reason] = key.split("|");
        console.log(`### [${sev}] ${reason}（×${group.length}）`);
        for (const h of group.slice(0, 3)) {
          console.log(`  > ...${h.excerpt}...`);
        }
        if (group.length > 3) {
          console.log(`  > （另 ${group.length - 3} 處）`);
        }
        console.log();
      }
    }
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("執行失敗：", err);
  process.exit(1);
});
