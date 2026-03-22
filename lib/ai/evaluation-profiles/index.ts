import { daycareProfile } from "./daycare";
import { nursingHomeProfile } from "./nursing-home";
import { hospitalNursingProfile } from "./hospital-nursing";

const profiles = [daycareProfile, nursingHomeProfile, hospitalNursingProfile];

export function getProfile(id: string) {
  return profiles.find((p) => p.id === id) ?? null;
}

export function getAllProfiles() {
  return profiles.map(({ id, label, description, sections }) => ({
    id, label, description, ready: sections.length > 0,
  }));
}
