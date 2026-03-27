/**
 * Supplementary sheet definitions — barrel export and lookup.
 * Returns the supplementary defs for a given facility type and item id.
 */
import type { SupplementarySheetDef, SupplementaryDefsMap } from '../supplementary-sheet-types';
import { daycareDefs } from './daycare';
import { homeNursingDefs } from './home-nursing';
import { babycareDefs } from './babycare';
import { disabilityDefs } from './disability';
import { homeCareDefs } from './home-care';
import { generalNursingHomeDefs } from './general-nursing-home';
import { nursingHomeDefs } from './nursing-home';
import { hospitalDefs } from './hospital';
import { youthCareDefs } from './youth-care';
import { elderlyWelfareDefs } from './elderly-welfare';

const registry: Record<string, SupplementaryDefsMap> = {
  daycare: daycareDefs,
  'home-nursing': homeNursingDefs,
  babycare: babycareDefs,
  disability: disabilityDefs,
  'home-care': homeCareDefs,
  'general-nursing-home': generalNursingHomeDefs,
  'nursing-home': nursingHomeDefs,
  hospital: hospitalDefs,
  'youth-care': youthCareDefs,
  'elderly-welfare': elderlyWelfareDefs,
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
