/**
 * 評鑑準備要訣的型別定義
 * 從 app/school 各頁面提取後存放於 lib/evaluation-tips/ 供範本建構器使用
 */

export type EvaluationTip = {
  content: string;
  variant?: "neutral" | "info" | "warning";
};

/** 以評鑑項目 ID（數字）為 key 的準備要訣 Map */
export type EvaluationTipsMap = Record<number, EvaluationTip>;
