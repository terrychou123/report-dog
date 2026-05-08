// 評鑑機構對照表：drift check 與 evaluation:sync 共用的唯一 SSOT
// 新增/移除機構時只需改這一個檔案

export type FacilityMeta = {
  /** lib/ai/evaluation-profiles/ 中對應的 profile id（精神復健機構有兩個） */
  profileIds: string[];
  /** lib/supplementary-sheets/ 的 registry key，與 profileIds 1:1 對應 */
  suppKeys: string[];
  /** package.json 中的 npm script 名；檔案存在但 package.json 未列入時也填寫（sync 腳本會補） */
  generateScript: string | null;
  /** .claude/skills/{skillSlug}-evaluation/SKILL.md 的 slug */
  skillSlug: string;
};

export const FACILITIES: Record<string, FacilityMeta> = {
  daycare: {
    profileIds: ['daycare'],
    suppKeys: ['daycare'],
    generateScript: 'generate:daycare-checklist',
    skillSlug: 'daycare',
  },
  'home-care': {
    profileIds: ['home-care'],
    suppKeys: ['home-care'],
    generateScript: null, // 目前無 generate-home-care-checklist.ts
    skillSlug: 'home-care',
  },
  'nursing-home': {
    profileIds: ['nursing-home'],
    suppKeys: ['nursing-home'],
    generateScript: 'generate:nursing-home-checklist',
    skillSlug: 'nursing-home',
  },
  hospital: {
    profileIds: ['hospital'],
    suppKeys: ['hospital'],
    generateScript: null, // 目前無 generate-hospital-checklist.ts
    skillSlug: 'hospital',
  },
  'disability-welfare': {
    profileIds: ['disability-welfare'],
    suppKeys: ['disability-welfare'],
    generateScript: 'generate:disability-welfare-checklist',
    skillSlug: 'disability-welfare',
  },
  babycare: {
    profileIds: ['babycare'],
    suppKeys: ['babycare'],
    generateScript: 'generate:babycare-checklist',
    skillSlug: 'postpartum-care', // skill 目錄是 postpartum-care-evaluation
  },
  'home-nursing': {
    profileIds: ['home-nursing'],
    suppKeys: ['home-nursing'],
    generateScript: 'generate:home-nursing-checklist',
    skillSlug: 'home-nursing',
  },
  'general-nursing-home': {
    profileIds: ['general-nursing-home'],
    suppKeys: ['general-nursing-home'],
    generateScript: 'generate:general-nursing-home-checklist',
    skillSlug: 'general-nursing-home',
  },
  'youth-care': {
    profileIds: ['youth-care'],
    suppKeys: ['youth-care'],
    generateScript: 'generate:youth-care-checklist',
    skillSlug: 'youth-care',
  },
  'elderly-welfare': {
    profileIds: ['elderly-welfare'],
    suppKeys: ['elderly-welfare'],
    generateScript: 'generate:elderly-welfare-checklist',
    skillSlug: 'elderly-welfare',
  },
  'psychiatric-nursing-home': {
    profileIds: ['psychiatric-nursing-home'],
    suppKeys: ['psychiatric-nursing-home'],
    generateScript: 'generate:psychiatric-nursing-home-checklist',
    skillSlug: 'psychiatric-nursing-home',
  },
  'infant-daycare': {
    profileIds: ['infant-daycare'],
    suppKeys: ['infant-daycare'],
    generateScript: 'generate:infant-daycare-checklist',
    skillSlug: 'infant-daycare',
  },
  // 小規模多機能機構（小規機）：日照 + 居服 + 夜宿三合一
  'multi-function-care': {
    profileIds: ['multi-function-care'],
    suppKeys: ['multi-function-care'],
    generateScript: null, // 待第二階段新增 generate-multi-function-care-checklist.ts
    skillSlug: 'multi-function-care',
  },
  // 精神復健有兩個 profile（日間/住宿），共用一個 generate script
  'psychiatric-rehabilitation-institution': {
    profileIds: ['psychiatric-rehabilitation-day', 'psychiatric-rehabilitation-residential'],
    suppKeys: ['psychiatric-rehabilitation-day', 'psychiatric-rehabilitation-residential'],
    generateScript: 'generate:psychiatric-rehabilitation-institution-checklist',
    skillSlug: 'psychiatric-rehabilitation-institution',
  },
};

/** 展開成 (facilitySlug, profileId, suppKey) 三元組，供 drift check 迭代 */
export const PROFILE_SUPP_PAIRS = Object.entries(FACILITIES).flatMap(
  ([facilitySlug, meta]) =>
    meta.profileIds.map((profileId, i) => ({
      facilitySlug,
      profileId,
      suppKey: meta.suppKeys[i],
    })),
);
