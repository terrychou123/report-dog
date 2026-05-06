export interface ReferenceTable {
  headers: string[];
  rows: string[][];
}

export interface ReferenceSection {
  /** 區塊標題（條文標題或欄位說明標題）。 */
  heading?: string;
  /** 標示為章節層級分隔線；用於把同一份 doc 內的多條條文按章歸組。 */
  divider?: boolean;
  /** 引文／說明段落（位於 list/table 之前）。 */
  paragraphs?: string[];
  /** 條列清單。可與 paragraphs 同存於同一 section，paragraphs 作為 list 的引文。 */
  list?: string[];
  listType?: "ordered" | "unordered";
  /** 表格內容。 */
  table?: ReferenceTable;
  /** 結語段落（位於 list/table 之後）。 */
  closing?: string[];
}

export interface ReferenceDoc {
  title: string;
  summary: string;
  sections: ReferenceSection[];
}

// key 對應 evaluation-profiles 裡的 item.id（數字）
export type EvaluationReferences = Partial<Record<number, ReferenceDoc[]>>;
