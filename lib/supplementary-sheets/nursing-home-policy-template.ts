/**
 * 住宿型照顧機構「政策／規範／作業程序」分頁共用 builder。
 *
 * 採契約族版面（仿 nursing-home-item-5-custom.ts）：
 *   - 2 欄：條文編號（180px）/ 條文內容（680px）
 *   - section-header 底色 #EFEFEF；其餘無底色無框線
 *   - 列高由 estLines() 自動估算
 */
import type { SheetData } from "../excel-template-builder";

const TITLE_ROW_HEIGHT = 32;
const SECTION_HEADER_HEIGHT = 26;
const DATA_ROW_BASE_HEIGHT = 30;

type CellStyleMap = Record<
  string,
  { fc?: string; bg?: string; bold?: boolean; ht?: number; vt?: number; tb?: number }
>;
type MergeMap = Record<string, { r: number; c: number; rs: number; cs: number }>;

function rowH(numLines: number): number {
  return Math.max(DATA_ROW_BASE_HEIGHT, numLines * 20 + 10);
}

function estLines(text: string): number {
  const nl = (text.match(/\n/g) ?? []).length;
  return Math.max(nl + 1, Math.ceil(text.length / 50));
}

export interface PolicyArticle {
  number: string;
  title?: string;
  body: string;
}

export interface PolicyChapter {
  name: string;
  articles: PolicyArticle[];
}

export interface PolicyDocOptions {
  /** 工作頁名稱（顯示於 FortuneSheet 標籤） */
  name: string;
  /** 規範全銜（例：「員工申訴處理辦法」） */
  instTitle: string;
  /** 制定日期／版次說明列（選填，預設填空欄位） */
  metaNote?: string;
  chapters: PolicyChapter[];
  /** 附則最後補充文字列（選填） */
  appendix?: string[];
}

export function buildPolicyDocSheet(opts: PolicyDocOptions): SheetData {
  const NC = 2;
  const data: string[][] = [];
  const cs: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};
  let r = 0;

  const push = (row: string[], height: number) => {
    data.push(row);
    rowlen[String(r)] = height;
    r++;
  };

  const pushMerged = (text: string, height: number) => {
    push([text, ""], height);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, tb: 2 };
    merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  };

  const pushSectionHeader = (text: string) => {
    push([text, ""], SECTION_HEADER_HEIGHT);
    cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, bg: "#EFEFEF" };
    merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };
  };

  // 標題列
  push([`___________（機構全銜）　${opts.instTitle}`, ""], TITLE_ROW_HEIGHT);
  cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true };
  merge[`${r - 1}_0`] = { r: r - 1, c: 0, rs: 1, cs: NC };

  // 制定日期／版次
  const meta =
    opts.metaNote ??
    "制定日期：中華民國　　年　　月　　日　　版次：第 1 版　　核定人：___________（負責人）";
  pushMerged(meta, DATA_ROW_BASE_HEIGHT);

  // 章節與條文
  for (const chapter of opts.chapters) {
    pushSectionHeader(chapter.name);
    for (const article of chapter.articles) {
      const id = article.title ? `${article.number}\n${article.title}` : article.number;
      push([id, article.body], rowH(estLines(article.body)));
      cs[`${r - 1}_0`] = { ht: 0, vt: 0, bold: true, tb: 2 };
      cs[`${r - 1}_1`] = { ht: 0, vt: 0, tb: 2 };
    }
  }

  // 附則補充
  if (opts.appendix) {
    for (const line of opts.appendix) {
      pushMerged(line, DATA_ROW_BASE_HEIGHT);
    }
  }

  // 簽章列
  pushMerged(
    "負責人（院長）簽章：___________　　日期：中華民國　　年　　月　　日",
    DATA_ROW_BASE_HEIGHT,
  );

  return {
    name: opts.name,
    data,
    config: { columnlen: { "0": 180, "1": 680 }, rowlen, merge },
    cellStyles: cs,
  };
}
