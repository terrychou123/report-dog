/**
 * 台灣長期照顧給付辦法附表四「照顧組合表修正規定」型別定義
 *
 * 來源：衛生福利部公告，修正長期照顧服務申請及給付辦法部分條文及附表
 * 範圍：AA01–GA09 全部代碼（約 84 筆，含法規略過的編號）
 * 詳見：./README.md 與 ./metadata.ts
 */

/** 11 個分類前綴，對應法規章節 */
export type LtcCareCategory =
  | "AA" // 照顧管理服務及政策鼓勵服務
  | "BA" // 照顧及專業服務（居家式）
  | "BB" // 日間照顧
  | "BC" // 家庭托顧
  | "BD" // 社區式服務
  | "CA" // 專業服務
  | "CB" // 專業照護
  | "CC" // 居家無障礙環境改善
  | "CD" // 居家護理
  | "DA" // 交通接送
  | "GA"; // 喘息服務

/** 給付價格，discriminated union 處理多種法規表達 */
type LtcPaymentAmount =
  | { kind: "fixed"; nt: number }               // 固定金額（新臺幣/元）
  | { kind: "local-government"; note?: string } // 由地方主管機關訂定公告（如 DA01）
  | { kind: "not-applicable"; reason: string }; // 法規明示不另計

/** 一條規則，對應原文「一、二、三、…」每分項，含子項「（一）（二）」或數字「1. 2.」 */
interface LtcCareCombinationRule {
  /** 編號標籤，如「一、」「（一）」「1.」 */
  label: string;
  /** 該規則或子項正文，逐字保留 PDF 原文 */
  text: string;
  /** 子規則（最多通常一層） */
  children?: LtcCareCombinationRule[];
}

/** 照顧組合代碼主資料結構 */
export interface LtcCareCombination {
  /** 完整代碼，如 "AA01"、"BA09a"、"BA17d1"、"CB01a" */
  code: string;
  /** 分類前綴 */
  category: LtcCareCategory;
  /** 照顧組合名稱（PDF「照顧組合名稱」欄） */
  name: string;
  /** 結構化規則陣列（PDF「組合內容及說明」欄，逐字保留原文） */
  rules: LtcCareCombinationRule[];
  /** 一般地區給（支）付價格 */
  payment: LtcPaymentAmount;
  /** 原住民族地區及離島地區給（支）付價格 */
  remotePayment: LtcPaymentAmount;
  /** 內文引用的其他代碼（便於 AI 交叉查詢） */
  references?: string[];
  /** 適用機構類型 slug，對齊 lib/ai/evaluation-profiles 的 id */
  applicableTo?: string[];
  /** 備註（如「法規本身略過此編號」） */
  note?: string;
}

/** 以 code 為 key 的完整 registry */
export type LtcCareCombinationMap = Record<string, LtcCareCombination>;

/** 分類顯示名稱字串聯合型別 */
type LtcCareCategoryLabel =
  | "照顧管理服務及政策鼓勵服務"
  | "照顧及專業服務"
  | "日間照顧"
  | "家庭托顧"
  | "社區式服務"
  | "專業服務"
  | "專業照護"
  | "居家無障礙環境改善"
  | "居家護理"
  | "交通接送"
  | "喘息服務";
