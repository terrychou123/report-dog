/**
 * Supplementary sheet definitions — barrel export and lookup.
 * Returns the supplementary defs for a given facility type and item id.
 */
import type { SupplementarySheetDef, SupplementaryDefsMap } from '../supplementary-sheet-types';
import { daycareDefs } from './daycare';
import { homeNursingDefs } from './home-nursing';
import { babycareDefs } from './babycare';
import { homeCareDefs } from './home-care';
import { generalNursingHomeDefs } from './general-nursing-home';
import { nursingHomeDefs } from './nursing-home';
import { hospitalDefs } from './hospital';
import { youthCareDefs } from './youth-care';
import { elderlyWelfareDefs } from './elderly-welfare';
import { psychiatricNursingHomeDefs } from './psychiatric-nursing-home';
import { disabilityWelfareDefs } from './disability-welfare';
import { infantDaycareDefs } from './infant-daycare';
import { psychiatricRehabilitationDayDefs } from './psychiatric-rehabilitation-day';
import { psychiatricRehabilitationResidentialDefs } from './psychiatric-rehabilitation-residential';
import { multiFunctionCareDefs } from './multi-function-care';

const registry: Record<string, SupplementaryDefsMap> = {
  daycare: daycareDefs,
  'home-nursing': homeNursingDefs,
  babycare: babycareDefs,
  'home-care': homeCareDefs,
  'general-nursing-home': generalNursingHomeDefs,
  'nursing-home': nursingHomeDefs,
  hospital: hospitalDefs,
  'youth-care': youthCareDefs,
  'elderly-welfare': elderlyWelfareDefs,
  'psychiatric-nursing-home': psychiatricNursingHomeDefs,
  'disability-welfare': disabilityWelfareDefs,
  'infant-daycare': infantDaycareDefs,
  'psychiatric-rehabilitation-day': psychiatricRehabilitationDayDefs,
  'psychiatric-rehabilitation-residential': psychiatricRehabilitationResidentialDefs,
  'multi-function-care': multiFunctionCareDefs,
};

/**
 * Returns the supplementary sheet definitions for a given facility type and item id.
 * Returns an empty array if no definitions exist (item will have checklist only).
 */
export function getSupplementaryDefs(
  facilityType: string,
  itemId: number,
): SupplementarySheetDef[] {
  return registry[facilityType]?.[itemId] ?? [];
}

export { daycareDefs };
export type { SupplementarySheetDef, SupplementaryDefsMap };
