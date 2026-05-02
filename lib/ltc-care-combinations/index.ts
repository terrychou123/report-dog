/**
 * 照顧組合代碼查詢入口
 *
 * 來源：長期照顧服務申請及給付辦法附表四「照顧組合表修正規定」
 *
 * 使用方式：
 *   import {
 *     getCareCombination,
 *     getCareCombinationsByCategory,
 *     getAllCareCombinations,
 *     formatCareCombinationForPrompt,
 *   } from "@/lib/ltc-care-combinations";
 *
 *   const ba15 = getCareCombination("BA15");
 *   const aaCodes = getCareCombinationsByCategory("AA");
 */

import type {
  LtcCareCombination,
  LtcCareCategory,
  LtcCareCombinationMap,
  LtcCareCategoryLabel,
} from "./types";

import { aaCodes } from "./codes-aa";
import { baCodes } from "./codes-ba";
import { bbCodes } from "./codes-bb";
import { bcCodes } from "./codes-bc";
import { bdCodes } from "./codes-bd";
import { caCodes } from "./codes-ca";
import { cbCodes } from "./codes-cb";
import { ccCodes } from "./codes-cc";
import { cdCodes } from "./codes-cd";
import { daCodes } from "./codes-da";
import { gaCodes } from "./codes-ga";

export type {
  LtcCareCombination,
  LtcCareCategory,
  LtcCareCombinationMap,
  LtcCareCategoryLabel,
};
export { metadata } from "./metadata";

const allCombinations: LtcCareCombination[] = [
  ...aaCodes,
  ...baCodes,
  ...bbCodes,
  ...bcCodes,
  ...bdCodes,
  ...caCodes,
  ...cbCodes,
  ...ccCodes,
  ...cdCodes,
  ...daCodes,
  ...gaCodes,
];

const codeMap: LtcCareCombinationMap = Object.fromEntries(
  allCombinations.map((c) => [c.code, c]),
);

/** 分類顯示名稱 */
export const categoryLabels: Record<LtcCareCategory, string> = {
  AA: "照顧管理服務及政策鼓勵服務",
  BA: "照顧及專業服務",
  BB: "日間照顧",
  BC: "家庭托顧",
  BD: "社區式服務",
  CA: "專業服務",
  CB: "專業照護",
  CC: "居家無障礙環境改善",
  CD: "居家護理",
  DA: "交通接送",
  GA: "喘息服務",
};

/** 取得單一代碼資料；找不到回 undefined */
export function getCareCombination(code: string): LtcCareCombination | undefined {
  return codeMap[code];
}

/** 取得某分類全部代碼，按 code 自然排序 */
export function getCareCombinationsByCategory(
  category: LtcCareCategory,
): LtcCareCombination[] {
  return allCombinations
    .filter((c) => c.category === category)
    .sort((a, b) => a.code.localeCompare(b.code));
}

/** 取得全部代碼（按 code 自然排序） */
export function getAllCareCombinations(): LtcCareCombination[] {
  return [...allCombinations].sort((a, b) => a.code.localeCompare(b.code));
}

/** 取得分類顯示名稱 */
export function getCategoryLabel(category: LtcCareCategory): string {
  return categoryLabels[category];
}

/**
 * 關鍵字搜尋，在 code、name、rules.text 中做 case-insensitive substring。
 * 供公開查詢頁與後台搜尋使用。
 */
export function searchCareCombinations(keyword: string): LtcCareCombination[] {
  const k = keyword.trim().toLowerCase();
  if (!k) return [];
  return allCombinations.filter((c) => {
    if (c.code.toLowerCase().includes(k)) return true;
    if (c.name.toLowerCase().includes(k)) return true;
    return c.rules.some(
      (r) =>
        r.text.toLowerCase().includes(k) ||
        r.children?.some((child) => child.text.toLowerCase().includes(k)),
    );
  });
}

/**
 * 將代碼格式化為 AI prompt 可注入的純文字段落。
 * 供 app/api/reports/evaluation/route.ts 等 AI 路由使用。
 */
export function formatCareCombinationForPrompt(code: string): string {
  const c = codeMap[code];
  if (!c) return "";

  const formatRule = (r: LtcCareCombination["rules"][number], indent = "", depth = 0): string => {
    const children = r.children?.length && depth < 5
      ? "\n" + r.children.map((ch) => formatRule(ch, indent + "  ", depth + 1)).join("\n")
      : "";
    return `${indent}${r.label} ${r.text}${children}`;
  };

  const rulesText = c.rules.map((r) => formatRule(r)).join("\n");

  const fmtPayment = (p: LtcCareCombination["payment"]): string => {
    switch (p.kind) {
      case "fixed":
        return `新臺幣 ${p.nt} 元`;
      case "local-government":
        return `由地方主管機關訂定公告${p.note ? `（${p.note}）` : ""}`;
      case "not-applicable":
        return `不適用（${p.reason}）`;
    }
  };

  const refs =
    c.references?.length ? `相關代碼：${c.references.join("、")}` : "";

  return [
    `【${c.code}】${c.name}（${categoryLabels[c.category]}）`,
    `組合內容：\n${rulesText}`,
    `一般地區給付：${fmtPayment(c.payment)}`,
    `原民／離島給付：${fmtPayment(c.remotePayment)}`,
    refs,
  ]
    .filter(Boolean)
    .join("\n");
}
