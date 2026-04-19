/**
 * Wiki Context 模組
 *
 * 在評鑑 AI 分析時，從知識庫讀取相關的準備指南、常見缺失等資訊，
 * 附加到 system prompt 中，提升分析品質。
 *
 * 設計原則：
 * - 純粹讀取 knowledge/wiki/ 目錄的 Markdown 檔案
 * - 不呼叫資料庫，不需要任何 async IO（同步讀取，文件小）
 * - 截斷到 context budget 以避免 token 超量
 * - 找不到檔案時靜默降級（return ""），不拋出錯誤
 * - 結果依 profileId 快取，避免每次請求重複讀取磁碟
 */

import * as fs from 'fs';
import * as path from 'path';

// 知識庫根目錄（相對於專案根）
const WIKI_BASE = path.join(process.cwd(), 'knowledge', 'wiki');

// 外部法規資料目錄
const REGULATIONS_BASE = path.join(process.cwd(), 'knowledge', 'sources', 'external', 'regulations');

// 法規注入的字元預算（4000 總預算內保留 2000 給法規）
const REGULATION_BUDGET = 2000;

/** 預設 context budget（字元數），約 ~1000 tokens */
const DEFAULT_BUDGET = 4000;

/** 標記「尚未整理」的佔位字串，統一管理避免各處不一致 */
const INCOMPLETE_MARKER = '（待整理）';

/** 快取：每個 profileId 的 wiki context，部署後內容不變所以永久快取 */
const wikiCache = new Map<string, string>();

/**
 * 讀取一個 wiki 頁面，移除 frontmatter 後回傳內容。
 * frontmatter 包含 title/date 等中繼資料，不應送進 AI context。
 * 找不到檔案時回傳空字串。
 */
function readWikiPage(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.replace(/^---[\s\S]*?---\n/, '').trim();
  } catch {
    return '';
  }
}

/**
 * 從 wiki item pages 收集帶有 ⚠️ 警告的常見缺失。
 * 最多取前 maxItems 個。
 */
function collectWarnings(facilityType: string, maxItems = 8): string {
  const itemsDir = path.join(WIKI_BASE, 'facility-types', facilityType, 'items');
  const warnings: string[] = [];

  try {
    const files = fs.readdirSync(itemsDir).filter(f => f.endsWith('.md')).sort();
    for (const file of files) {
      if (warnings.length >= maxItems) break;

      const content = fs.readFileSync(path.join(itemsDir, file), 'utf-8');

      const match = content.match(/## 常見缺失\n\n([\s\S]*?)(?=\n## |$)/);
      if (!match) continue;

      const warningText = match[1].trim();
      if (warningText && !warningText.includes(INCOMPLETE_MARKER)) {
        const shortCodeMatch = content.match(/short_code: (.+)/);
        const itemIdMatch = content.match(/item_id: (\d+)/);
        const titleMatch = content.match(/title: (.+)/);

        const label = shortCodeMatch && itemIdMatch
          ? `${shortCodeMatch[1].trim()}${itemIdMatch[1]}`
          : file.replace('.md', '');
        const title = titleMatch?.[1]?.trim() ?? '';

        warnings.push(`**${label} ${title}**\n${warningText.replace(/^> ⚠️\s*/m, '')}`);
      }
    }
  } catch {
    // 靜默降級（目錄不存在或讀取失敗均視為無資料）
  }

  return warnings.length > 0
    ? `## 歷年常見缺失（前 ${warnings.length} 項）\n\n${warnings.join('\n\n')}`
    : '';
}

/**
 * 解析法規 Markdown 的 YAML frontmatter，回傳 meta 鍵值與正文。
 * 不引入外部依賴，用 regex 處理。
 */
function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z_]+):\s*(.+)$/i);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  return { meta, body: m[2].trim() };
}

/**
 * 解析 applicable_to 欄位，支援 "[all]" 或 "[a, b, c]" 格式。
 */
function parseApplicableTo(value: string | undefined): string[] {
  if (!value) return [];
  return value.replace(/^\[|\]$/g, '').split(',').map(s => s.trim()).filter(Boolean);
}

/**
 * 遞迴掃描 REGULATIONS_BASE，找出 applicable_to 包含 profileId（或 all）的法規檔，
 * 組合成「## 法規合規依據」區塊，截斷至 budget 字元後回傳。
 */
function collectRegulations(profileId: string, budget = REGULATION_BUDGET): string {
  const files: string[] = [];

  const walk = (dir: string) => {
    let entries: fs.Dirent[];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile() && e.name.endsWith('.md') && e.name !== 'README.md') files.push(full);
    }
  };
  walk(REGULATIONS_BASE);
  files.sort(); // 確保每次輸出順序一致

  // 區分 type-specific（完全匹配）與通用（[all]）—— type-specific 優先
  const specific: string[] = [];
  const generic: string[] = [];

  for (const f of files) {
    let raw: string;
    try { raw = fs.readFileSync(f, 'utf-8'); } catch { continue; }
    const { meta, body } = parseFrontmatter(raw);
    if (meta.type === 'index') continue;
    const applicable = parseApplicableTo(meta.applicable_to);
    if (applicable.includes(profileId)) {
      const title = meta.title ?? path.basename(f, '.md');
      specific.push(`### ${title}\n\n${body}`);
    } else if (applicable.includes('all')) {
      const title = meta.title ?? path.basename(f, '.md');
      generic.push(`### ${title}\n\n${body}`);
    }
  }

  const sections = [...specific, ...generic];
  if (sections.length === 0) return '';

  let combined = `## 法規合規依據\n\n${sections.join('\n\n---\n\n')}`;
  if (combined.length > budget) {
    combined = combined.slice(0, budget) + '\n\n（法規內容已截斷，請參照原始檔案）';
  }
  return combined;
}

/**
 * 取得指定機構類型的 wiki context，供注入到 system prompt。
 * 結果會快取到 module 層級，同一 profileId 只讀磁碟一次。
 *
 * @param profileId  機構類型 ID（如 "daycare", "nursing-home"）
 * @param budget     最大字元數（預設 4000）
 * @returns          Markdown 字串，若知識庫不存在則回傳空字串
 */
export function getWikiContext(profileId: string, budget = DEFAULT_BUDGET): string {
  if (wikiCache.has(profileId)) {
    return wikiCache.get(profileId)!;
  }

  const facilityDir = path.join(WIKI_BASE, 'facility-types', profileId);
  const parts: string[] = [];

  const prepGuide = readWikiPage(path.join(facilityDir, 'preparation-guide.md'));
  if (prepGuide && !prepGuide.includes(INCOMPLETE_MARKER)) {
    parts.push(`# 評鑑準備指南\n\n${prepGuide}`);
  }

  const warnings = collectWarnings(profileId);
  if (warnings) parts.push(warnings);

  const rubric = readWikiPage(path.join(facilityDir, 'scoring-rubric.md'));
  if (rubric && !rubric.includes(INCOMPLETE_MARKER)) {
    parts.push(`# 評分細則\n\n${rubric}`);
  }

  // wiki 內容依 budget 截斷（法規在外，不擠壓 wiki 預算）
  let result = '';
  if (parts.length > 0) {
    let combined = `\n\n---\n## 評鑑知識庫補充資訊\n\n${parts.join('\n\n---\n\n')}`;
    if (combined.length > budget) {
      combined = combined.slice(0, budget) + '\n\n（知識庫內容已截斷）';
    }
    result = combined;
  }

  // 法規合規依據單獨附加，自有 REGULATION_BUDGET，不受 wiki budget 限制
  const regulations = collectRegulations(profileId);
  if (regulations) result += `\n\n---\n${regulations}`;

  wikiCache.set(profileId, result);
  return result;
}
