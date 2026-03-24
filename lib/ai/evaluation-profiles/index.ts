import { daycareProfile } from "./daycare";
import { nursingHomeProfile } from "./nursing-home";
import { homeCareProfile } from "./home-care";
import { hospitalProfile } from "./hospital";
import { disabilityProfile } from "./disability";
import { babycareProfile } from "./babycare";

const profiles = [daycareProfile, homeCareProfile, nursingHomeProfile, hospitalProfile, disabilityProfile, babycareProfile];
const profileMap = new Map(profiles.map((p) => [p.id, p]));

export function getProfile(id: string) {
  return profileMap.get(id) ?? null;
}

export function getAllProfiles() {
  return profiles.map(({ id, label, description, sections }) => ({
    id, label, description, ready: sections.length > 0,
  }));
}
