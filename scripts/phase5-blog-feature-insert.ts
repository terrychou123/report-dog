/**
 * Phase 5 Blog Feature Insertion Script
 * 自動為剩餘 blog 文章插入功能 CTA blockquote
 * 規則：0 CTA → 加 1；1 CTA → 加 1（補充功能）；2+ CTA → 跳過
 *
 * 使用方式：
 *   npx tsx --env-file=.env.local scripts/phase5-blog-feature-insert.ts
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const BLOG_DIR = join(process.cwd(), "scripts/blog-posts");

// 偵測內容中已有哪些功能
function hasFeature(content: string, feat: string): boolean {
  const checks: Record<string, string[]> = {
    F1: ["標籤分類", "標籤分類與搜尋", "標籤分類與權限", "切換標籤就能"],
    F2: ["追蹤報告更新", "追蹤頻率", "逾期自動標紅", "逾期會自動標紅"],
    F3: ["一鍵匯入範本", "匯入完整", "一鍵匯入完整"],
    F4: ["版本歷史", "修訂歷程", "留版本並標記"],
    F5: ["報告連結", "與我分享", "報告連結與共享"],
    F6: ["AI 段落改寫", "選取單段輸入", "可選取單段"],
    F7: ["SOAP 改寫", "SoapDemo", "S/O/A/P 四段", "SOAP 助手"],
    F8: [
      "AI 評鑑分析",
      "AI 自我查核",
      "AI 查核提示",
      "AI 查核缺失",
      "批量自我查核",
    ],
  };
  return (checks[feat] ?? []).some((kw) => content.includes(kw));
}

// 依 slug 判斷文章原型
function getArchetype(slug: string): string {
  if (/top10|deficiencies|common-mistakes/.test(slug)) return "top10";
  if (/self-eval|self-checklist|checklist-download/.test(slug))
    return "self-eval";
  if (/90day|3month-timeline|prep-timeline|countdown/.test(slug))
    return "90day";
  if (/new-director|new-staff|onboarding|small-team|survival/.test(slug))
    return "new-director";
  if (
    /role-division|team-collaboration|interdisciplinary|professional-team/.test(
      slug
    )
  )
    return "role";
  if (
    /inspector|evaluator-perspective|interview-prep|interview-simulation|evidence-preparation|interview-preparation/.test(
      slug
    )
  )
    return "committee";
  if (
    /quality-indicator|pdca|quality-improvement|continuous-improvement|improvement-plan/.test(
      slug
    )
  )
    return "pdca";
  if (/soap|dar-records/.test(slug)) return "soap";
  if (
    /isp-writing|care-plan|treatment-plan|case-records|nursing-records|rehab-plan|record-management|individualized-care/.test(
      slug
    )
  )
    return "case-records";
  if (
    /ai-document|paperwork|ai-tool|baby-diary|ai-efficiency|nursing-records-burden|digital/.test(
      slug
    )
  )
    return "ai-docs";
  if (
    /grade-strategy|bonus|innovation|add-points|d1-bonus|e1\.|e2\.|e-section/.test(
      slug
    )
  )
    return "grade";
  if (
    /ltc30|cycle-reform|mental-health-act|freedom-of-movement|staffing-calculation|staffing-requirements|cpr|法規|legal|reform/.test(
      slug
    )
  )
    return "law";
  if (/faq/.test(slug)) return "faq";
  if (/post-evaluation|post-eval|action-plan/.test(slug)) return "post-eval";
  if (
    /infection-control|hand-hygiene|fire-|evacuation|fall-prevention|nutrition|medication|safety-check|oral-care|restraint|emergency|accident/.test(
      slug
    )
  )
    return "specific";
  if (
    /complete-guide|full-guide|all-guide|items-guide|-guide-2026|懶人包|-prep-guide/.test(
      slug
    )
  )
    return "full-guide";
  if (
    /staff-retention|retention|dementia|staffing|community-resources|discharge|evacuation-system|business-plan|risk-management/.test(
      slug
    )
  )
    return "ops";
  return "other";
}

// 依原型決定功能優先順序（第一個未置入的功能會被選中）
function getFeaturePriority(archetype: string): string[] {
  const map: Record<string, string[]> = {
    top10: ["F8", "F2"],
    "self-eval": ["F3", "F8"],
    "90day": ["F2", "F3"],
    "new-director": ["F3", "F1"],
    role: ["F5", "F1"], // Phase 5: F5 主推角色分工
    committee: ["F4", "F8"],
    pdca: ["F2", "F4"],
    soap: ["F6", "F4"],
    "case-records": ["F6", "F4"],
    "ai-docs": ["F2", "F1"],
    "full-guide": ["F8", "F5"], // Phase 5: 全攻略也補 F5
    grade: ["F6", "F8"],
    law: ["F2", "F5"],
    faq: ["F3", "F8"],
    "post-eval": ["F2", "F6"],
    specific: ["F6", "F2"],
    ops: ["F2", "F6"],
    other: ["F8", "F6"],
  };
  return map[archetype] ?? ["F8"];
}

// 功能 blockquote HTML（未 JSON 轉義，由 JSON.stringify 處理）
function getBlockquote(feat: string): string {
  switch (feat) {
    case "F1":
      return `<blockquote>💡 <strong>標籤分類與搜尋：</strong>備審文件按職類或評鑑區塊建立標籤，並指派各角色為對應標籤的編輯者。在 <a href="/auth/sign-up">報告汪</a> 切換標籤就能展示對應文件，評鑑當天不必再翻 LINE 群組找散落檔案。</blockquote>`;
    case "F2":
      return `<blockquote>💡 <strong>追蹤報告更新：</strong>定期評值、季報、年度修訂等時間性要求，在 <a href="/auth/sign-up">報告汪</a> 對每份文件設定追蹤頻率（每週／每月／每季／每半年），逾期自動標紅，不必再列 Excel 控管表。</blockquote>`;
    case "F3":
      return `<blockquote>💡 <strong>一鍵匯入範本：</strong>新成立或新接手的機構，可在 <a href="/auth/sign-up">報告汪</a> 一鍵匯入完整評鑑指標範本骨架（含每項對應空白報告與標籤分類），1–2 週的範本目錄整理工作壓縮到 30 秒。</blockquote>`;
    case "F4":
      return `<blockquote>💡 <strong>版本歷史與佐證：</strong>每次儲存自動留版本並標記 AI 生成 vs 人工修改、紀錄修改人。評鑑委員若追問「這份文件修訂過幾次？上一版怎麼寫？」可立即在 <a href="/auth/sign-up">報告汪</a> 調出修訂歷程當佐證，被誤改也能一鍵還原。</blockquote>`;
    case "F5":
      return `<blockquote>💡 <strong>報告連結與共享：</strong>把標籤指派給社工、護理長、督導為瀏覽者或編輯者，下屬登入 <a href="/auth/sign-up">報告汪</a> 在「與我分享」就能看到自己被分配到的報告；每份報告也可掛上衛福部公文外部連結，主文件＋法規依據一站可查。</blockquote>`;
    case "F6":
      return `<blockquote>💡 <strong>AI 段落改寫：</strong>寫出粗稿後，可選取單段輸入改寫指令（「擴寫評估分析」「補上具體指標數值」「語氣再委婉一點」），<a href="/auth/sign-up">報告汪</a> AI 在保留原意下改寫並支援多輪追問，不必每次都從頭重寫整份文件。</blockquote>`;
    case "F8":
    default:
      return `<blockquote>💡 <strong>AI 評鑑分析：</strong>把備審文件丟給 <a href="/auth/sign-up">報告汪</a> AI，系統依該機構類型完整評鑑指標逐條比對，輸出「缺少資料 / 不合理矛盾 / 應追蹤未追蹤 / 已符合 / 改善優先順序」清單，評鑑前幾分鐘就能看到熱點。</blockquote>`;
  }
}

// 找最佳插入錨點（回傳第一個命中的 anchor 字串）
function findAnchor(content: string): string | null {
  const candidates = [
    "<h2>常見問題 FAQ</h2>",
    "<h2>常見問題</h2>",
    "<h2>FAQ 常見問題</h2>",
    "<h2>常見 Q&A</h2>",
    "<hr/>",
    "<hr />",
    "<hr>",
  ];
  for (const c of candidates) {
    if (content.includes(c)) return c;
  }
  return null;
}

// 主程式
const files = readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort();

let modified = 0,
  skipped = 0,
  noAnchor = 0;
const modifiedFiles: string[] = [];

for (const filename of files) {
  const filePath = join(BLOG_DIR, filename);
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(readFileSync(filePath, "utf-8"));
  } catch {
    console.error(`❌ Parse error: ${filename}`);
    continue;
  }

  const content = (data.content as string) ?? "";
  const slug = (data.slug as string) ?? filename;
  const ctaCount = (content.match(/\/auth\/sign-up/g) ?? []).length;

  if (ctaCount >= 2) {
    skipped++;
    continue;
  }

  const archetype = getArchetype(slug);
  const priorities = getFeaturePriority(archetype);

  // 選第一個尚未置入的功能
  let selectedFeat: string | null = null;
  for (const feat of priorities) {
    if (!hasFeature(content, feat)) {
      selectedFeat = feat;
      break;
    }
  }

  if (!selectedFeat) {
    skipped++;
    continue;
  }

  const anchor = findAnchor(content);
  if (!anchor) {
    console.log(`⚠️  No anchor: ${filename} (${archetype})`);
    noAnchor++;
    continue;
  }

  const blockquote = getBlockquote(selectedFeat);
  // 只替換第一個 anchor
  const newContent = content.replace(anchor, `${blockquote}\n\n${anchor}`);
  data.content = newContent;

  writeFileSync(filePath, JSON.stringify(data, null, 2));
  modifiedFiles.push(filename);
  modified++;
  console.log(`✅ ${selectedFeat} [${archetype}] → ${filename}`);
}

console.log(
  `\n完成：${modified} 篇已修改，${skipped} 篇跳過（已滿 2 CTA 或功能已有），${noAnchor} 篇找不到錨點`
);
console.log(`\n修改清單（共 ${modifiedFiles.length} 篇）：`);
modifiedFiles.forEach((f) => console.log(`  ${f}`));
