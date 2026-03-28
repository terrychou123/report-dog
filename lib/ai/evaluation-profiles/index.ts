import { daycareProfile } from "./daycare";
import { nursingHomeProfile } from "./nursing-home";
import { homeCareProfile } from "./home-care";
import { hospitalProfile } from "./hospital";
import { disabilityWelfareProfile } from "./disability-welfare";
import { babycareProfile } from "./babycare";
import { homeNursingProfile } from "./home-nursing";
import { generalNursingHomeProfile } from "./general-nursing-home";
import { youthCareProfile } from "./youth-care";
import { elderlyWelfareProfile } from "./elderly-welfare";
import { psychiatricNursingHomeProfile } from "./psychiatric-nursing-home";
import { infantDaycareProfile } from "./infant-daycare";

const profiles = [daycareProfile, homeCareProfile, nursingHomeProfile, hospitalProfile, disabilityWelfareProfile, babycareProfile, homeNursingProfile, generalNursingHomeProfile, youthCareProfile, elderlyWelfareProfile, psychiatricNursingHomeProfile, infantDaycareProfile];
const profileMap = new Map(profiles.map((p) => [p.id, p]));
const allProfilesMeta = profiles.map(({ id, label, description, sections }) => ({
  id, label, description, ready: sections.length > 0,
}));

export function getProfile(id: string) {
  return profileMap.get(id) ?? null;
}

export function getAllProfiles() {
  return allProfilesMeta;
}
