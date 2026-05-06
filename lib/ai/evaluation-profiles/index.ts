import { daycareProfile, meta as daycareMeta } from "./daycare";
import { nursingHomeProfile, meta as nursingHomeMeta } from "./nursing-home";
import { homeCareProfile, meta as homeCareMeta } from "./home-care";
import { hospitalProfile, meta as hospitalMeta } from "./hospital";
import { disabilityWelfareProfile, meta as disabilityWelfareMeta } from "./disability-welfare";
import { babycareProfile, meta as babycareMeta } from "./babycare";
import { homeNursingProfile, meta as homeNursingMeta } from "./home-nursing";
import { generalNursingHomeProfile, meta as generalNursingHomeMeta } from "./general-nursing-home";
import { youthCareProfile, meta as youthCareMeta } from "./youth-care";
import { elderlyWelfareProfile, meta as elderlyWelfareMeta } from "./elderly-welfare";
import { psychiatricNursingHomeProfile, meta as psychiatricNursingHomeMeta } from "./psychiatric-nursing-home";
import { infantDaycareProfile, meta as infantDaycareMeta } from "./infant-daycare";
import {
  psychiatricRehabilitationDayProfile,
  psychiatricRehabilitationResidentialProfile,
  meta as psychiatricRehabilitationDayMeta,
  residentialMeta as psychiatricRehabilitationResidentialMeta,
} from "./psychiatric-rehabilitation-institution";

export type EvaluationProfileMeta = {
  year: string;
  agency: string;
  facilityName: string;
  totalItems: number;
  legalBasis?: string;
  publishedDate?: string;
  sourceUrl?: string;
};

const profiles = [
  daycareProfile,
  homeCareProfile,
  nursingHomeProfile,
  hospitalProfile,
  disabilityWelfareProfile,
  babycareProfile,
  homeNursingProfile,
  generalNursingHomeProfile,
  youthCareProfile,
  elderlyWelfareProfile,
  psychiatricNursingHomeProfile,
  infantDaycareProfile,
  psychiatricRehabilitationDayProfile,
  psychiatricRehabilitationResidentialProfile,
];
const profileMap = new Map(profiles.map((p) => [p.id, p]));
const allProfilesMeta = profiles.map(({ id, label, description, sections }) => ({
  id, label, description, ready: sections.length > 0,
}));

const metaMap = new Map<string, EvaluationProfileMeta>([
  ["daycare", daycareMeta],
  ["home-care", homeCareMeta],
  ["nursing-home", nursingHomeMeta],
  ["hospital", hospitalMeta],
  ["disability-welfare", disabilityWelfareMeta],
  ["babycare", babycareMeta],
  ["home-nursing", homeNursingMeta],
  ["general-nursing-home", generalNursingHomeMeta],
  ["youth-care", youthCareMeta],
  ["elderly-welfare", elderlyWelfareMeta],
  ["psychiatric-nursing-home", psychiatricNursingHomeMeta],
  ["infant-daycare", infantDaycareMeta],
  ["psychiatric-rehabilitation-day", psychiatricRehabilitationDayMeta],
  ["psychiatric-rehabilitation-residential", psychiatricRehabilitationResidentialMeta],
]);

export function getProfile(id: string) {
  return profileMap.get(id) ?? null;
}

export function getAllProfiles() {
  return allProfilesMeta;
}

export function getProfileMeta(id: string): EvaluationProfileMeta | null {
  return metaMap.get(id) ?? null;
}
