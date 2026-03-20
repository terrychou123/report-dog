import { daycareProfile } from "./daycare";

const profiles = [daycareProfile];

export function getProfile(id: string) {
  return profiles.find((p) => p.id === id) ?? null;
}

export function getAllProfiles() {
  return profiles.map(({ id, label, description }) => ({ id, label, description }));
}
