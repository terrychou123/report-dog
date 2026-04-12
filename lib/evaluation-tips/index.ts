/**
 * 評鑑準備要訣查詢入口
 *
 * 使用方式：
 *   import { getEvaluationTip, getEvaluationTips } from "@/lib/evaluation-tips";
 *
 *   const tip = getEvaluationTip("daycare", 6);
 *   const tips = getEvaluationTips("nursing-home");
 */

import type { EvaluationTip, EvaluationTipsMap } from "./types";

import { daycareTips } from "./daycare";
import { homeCareTips } from "./home-care";
import { nursingHomeTips } from "./nursing-home";
import { hospitalTips } from "./hospital";
import { disabilityWelfareTips } from "./disability-welfare";
import { babycareTips } from "./babycare";
import { homeNursingTips } from "./home-nursing";
import { generalNursingHomeTips } from "./general-nursing-home";
import { youthCareTips } from "./youth-care";
import { elderlyWelfareTips } from "./elderly-welfare";
import { psychiatricNursingHomeTips } from "./psychiatric-nursing-home";
import { infantDaycareTips } from "./infant-daycare";
import { psychiatricRehabilitationDayTips } from "./psychiatric-rehabilitation-day";
import { psychiatricRehabilitationResidentialTips } from "./psychiatric-rehabilitation-residential";

export type { EvaluationTip, EvaluationTipsMap };

/** 機構類型字串 → 對應的準備要訣 Map */
const registry: Record<string, EvaluationTipsMap> = {
  daycare: daycareTips,
  "home-care": homeCareTips,
  "nursing-home": nursingHomeTips,
  hospital: hospitalTips,
  "disability-welfare": disabilityWelfareTips,
  babycare: babycareTips,
  "home-nursing": homeNursingTips,
  "general-nursing-home": generalNursingHomeTips,
  "youth-care": youthCareTips,
  "elderly-welfare": elderlyWelfareTips,
  "psychiatric-nursing-home": psychiatricNursingHomeTips,
  "infant-daycare": infantDaycareTips,
  "psychiatric-rehabilitation-day": psychiatricRehabilitationDayTips,
  "psychiatric-rehabilitation-residential": psychiatricRehabilitationResidentialTips,
};

/**
 * 取得單一評鑑項目的準備要訣
 *
 * @param facilityType 機構類型字串（見 registry key）
 * @param itemId 評鑑項目 ID（數字）
 * @returns EvaluationTip 或 undefined（該項目無要訣）
 */
export function getEvaluationTip(
  facilityType: string,
  itemId: number,
): EvaluationTip | undefined {
  const tips = registry[facilityType];
  if (!tips) return undefined;
  return tips[itemId];
}

/**
 * 取得某機構類型的全部準備要訣 Map
 *
 * @param facilityType 機構類型字串（見 registry key）
 * @returns EvaluationTipsMap 或 undefined（不存在此類型）
 */
export function getEvaluationTips(
  facilityType: string,
): EvaluationTipsMap | undefined {
  return registry[facilityType];
}
