// 從 blog post 的 category / tags 推導出對應的 /school 路徑與 Excel 下載
export interface FacilityInfo {
  schoolPath: string;
  schoolName: string;
  downloadPath: string;
  downloadName: string;
  /** 對應 lib/downloads/catalog.ts DOWNLOADS[].slug；null 表示尚無 gated 下載 */
  catalogSlug: string | null;
  subPages: Array<{ href: string; label: string }>;
}

export const FACILITY_MAP: Record<string, FacilityInfo> = {
  daycare: {
    schoolPath: "/school/daycare",
    schoolName: "日間照顧機構評鑑小教室",
    downloadPath: "/downloads/day-care.xlsx",
    downloadName: "日照中心評鑑自評表",
    catalogSlug: "day-care",
    subPages: [
      { href: "/school/daycare/client-rights", label: "個案權益保障" },
      { href: "/school/daycare/professional-quality", label: "專業照護品質" },
      { href: "/school/daycare/management", label: "經營管理效能" },
      { href: "/school/daycare/safety-environment", label: "安全環境設備" },
    ],
  },
  "multi-function-care": {
    schoolPath: "/school/multi-function-care",
    schoolName: "小規模多機能機構評鑑小教室",
    downloadPath: "/downloads/multi-function-care.xlsx",
    downloadName: "小規機評鑑自評表",
    catalogSlug: null, // phase 2 TODO：尚無 Excel 檔
    subPages: [
      { href: "/school/multi-function-care/client-rights", label: "個案權益保障" },
      { href: "/school/multi-function-care/professional-quality", label: "專業照護品質" },
      { href: "/school/multi-function-care/management", label: "經營管理效能" },
      { href: "/school/multi-function-care/safety-environment", label: "安全環境設備" },
    ],
  },
  "home-nursing": {
    schoolPath: "/school/home-nursing",
    schoolName: "居家護理所評鑑小教室",
    downloadPath: "/downloads/home-nursing.xlsx",
    downloadName: "居家護理所評鑑自評表",
    catalogSlug: "home-nursing",
    subPages: [
      { href: "/school/home-nursing/management", label: "A、經營管理" },
      { href: "/school/home-nursing/care-management", label: "B、照護管理" },
      { href: "/school/home-nursing/infection-control", label: "感染管制與器材維護" },
      { href: "/school/home-nursing/quality-indicators", label: "品質指標監測（A5）" },
      { href: "/school/home-nursing/bonus", label: "加分項目" },
    ],
  },
  "home-care": {
    schoolPath: "/school/home-care",
    schoolName: "居家服務機構評鑑小教室",
    downloadPath: "/downloads/home-care.xlsx",
    downloadName: "居家長照評鑑自評表",
    catalogSlug: "home-care",
    subPages: [
      { href: "/school/home-care/client-rights", label: "服務對象權益" },
      { href: "/school/home-care/professional-quality", label: "專業照護品質" },
      { href: "/school/home-care/management", label: "經營管理" },
    ],
  },
  "elderly-welfare": {
    schoolPath: "/school/elderly-welfare",
    schoolName: "老人福利機構評鑑小教室",
    downloadPath: "/downloads/elderly-welfare.xlsx",
    downloadName: "老人福利機構評鑑自評表",
    catalogSlug: "elderly-welfare",
    subPages: [
      { href: "/school/elderly-welfare/client-rights", label: "服務對象權益" },
      { href: "/school/elderly-welfare/professional-quality", label: "專業照護品質" },
      { href: "/school/elderly-welfare/management", label: "經營管理" },
      { href: "/school/elderly-welfare/safety-environment", label: "安全環境設備" },
    ],
  },
  "nursing-home": {
    schoolPath: "/school/nursing-home",
    schoolName: "住宿型長照機構評鑑小教室",
    downloadPath: "/downloads/residential.xlsx",
    downloadName: "住宿型機構評鑑自評表",
    catalogSlug: "residential", // 注意：catalog slug 與 facility key 不同
    subPages: [
      { href: "/school/nursing-home/client-rights", label: "服務對象權益" },
      { href: "/school/nursing-home/professional-quality", label: "專業照護品質" },
      { href: "/school/nursing-home/management", label: "經營管理" },
      { href: "/school/nursing-home/safety-environment", label: "安全環境設備" },
    ],
  },
  "general-nursing-home": {
    schoolPath: "/school/general-nursing-home",
    schoolName: "一般護理之家評鑑小教室",
    downloadPath: "/downloads/general-nursing-home.xlsx",
    downloadName: "一般護理之家評鑑自評表",
    catalogSlug: "general-nursing-home",
    subPages: [
      { href: "/school/general-nursing-home/administration", label: "行政管理" },
      { href: "/school/general-nursing-home/professional-care", label: "專業照護" },
      { href: "/school/general-nursing-home/safety-environment", label: "安全環境" },
      { href: "/school/general-nursing-home/special-items", label: "特別事項" },
    ],
  },
  "postpartum-care": {
    schoolPath: "/school/postpartum-care",
    schoolName: "產後護理之家評鑑小教室",
    downloadPath: "/downloads/babycare.xlsx",
    downloadName: "產後護理之家評鑑自評表",
    catalogSlug: "babycare", // 注意：catalog slug 與 facility key 不同
    subPages: [
      { href: "/school/postpartum-care/administration", label: "行政組織管理" },
      { href: "/school/postpartum-care/professional-care", label: "專業服務與照顧" },
      { href: "/school/postpartum-care/safety-environment", label: "環境設施安全" },
    ],
  },
  hospital: {
    schoolPath: "/school/hospital",
    schoolName: "醫院評鑑小教室",
    downloadPath: "/downloads/hospital.xlsx",
    downloadName: "醫院評鑑自評表",
    catalogSlug: "hospital",
    subPages: [
      { href: "/school/hospital/patient-rights", label: "病人權益" },
      { href: "/school/hospital/care-quality", label: "照護品質" },
      { href: "/school/hospital/infection-control", label: "感染管控" },
      { href: "/school/hospital/medication-safety", label: "用藥安全" },
    ],
  },
  "infant-daycare": {
    schoolPath: "/school/infant-daycare",
    schoolName: "托嬰中心評鑑小教室",
    downloadPath: "/downloads/infant-daycare.xlsx",
    downloadName: "托嬰中心評鑑自評表",
    catalogSlug: "infant-daycare",
    subPages: [
      { href: "/school/infant-daycare/administration", label: "行政管理" },
      { href: "/school/infant-daycare/childcare-activities", label: "保育活動" },
      { href: "/school/infant-daycare/health-safety", label: "健康安全" },
    ],
  },
  "disability-welfare": {
    schoolPath: "/school/disability-welfare",
    schoolName: "身心障礙福利機構評鑑小教室",
    downloadPath: "/downloads/disability-welfare.xlsx",
    downloadName: "身心障礙機構評鑑自評表",
    catalogSlug: "disability-welfare",
    subPages: [
      { href: "/school/disability-welfare/administration", label: "行政組織及經營管理" },
      { href: "/school/disability-welfare/environment", label: "環境設施及安全維護" },
      { href: "/school/disability-welfare/professional", label: "專業服務" },
      { href: "/school/disability-welfare/finance", label: "財務管理" },
      { href: "/school/disability-welfare/individual-care", label: "個別化服務計畫" },
      { href: "/school/disability-welfare/health-management", label: "健康管理與安全" },
    ],
  },
  "youth-care": {
    schoolPath: "/school/youth-care",
    schoolName: "兒少教養機構評鑑小教室",
    downloadPath: "/downloads/youth-care.xlsx",
    downloadName: "兒少教養機構評鑑自評表",
    catalogSlug: "youth-care",
    subPages: [
      { href: "/school/youth-care/administration", label: "行政管理" },
      { href: "/school/youth-care/professional", label: "專業服務" },
      { href: "/school/youth-care/environment", label: "環境設施" },
    ],
  },
  "psychiatric-nursing-home": {
    schoolPath: "/school/psychiatric-nursing-home",
    schoolName: "精神護理之家評鑑小教室",
    downloadPath: "/downloads/psychiatric-nursing-home.xlsx",
    downloadName: "精神護理之家評鑑自評表",
    catalogSlug: "psychiatric-nursing-home",
    subPages: [
      { href: "/school/psychiatric-nursing-home/management", label: "行政管理" },
      { href: "/school/psychiatric-nursing-home/professional-care", label: "專業照護" },
      { href: "/school/psychiatric-nursing-home/resident-rights", label: "住民權益" },
    ],
  },
  "psychiatric-rehabilitation-institution": {
    schoolPath: "/school/psychiatric-rehabilitation-institution",
    schoolName: "精神復健機構評鑑小教室",
    downloadPath: "/downloads/psychiatric-rehabilitation-institution.xlsx",
    downloadName: "精神復健機構評鑑自評表",
    catalogSlug: "psychiatric-rehabilitation-institution",
    subPages: [
      { href: "/school/psychiatric-rehabilitation-institution/management", label: "行政管理" },
      { href: "/school/psychiatric-rehabilitation-institution/rehabilitation", label: "復健服務" },
      { href: "/school/psychiatric-rehabilitation-institution/service-quality", label: "服務品質" },
    ],
  },
};

// 關鍵字 → facility key 對照表
const KEYWORD_MAP: Record<string, string> = {
  日照: "daycare",
  日間照顧: "daycare",
  日間照護: "daycare",
  居家護理: "home-nursing",
  居家護理所: "home-nursing",
  居家長照: "home-care",
  居家服務: "home-care",
  老人福利: "elderly-welfare",
  老人安養: "elderly-welfare",
  住宿型: "nursing-home",
  // 精確詞須排在子字串之前（如「一般護理之家」含「護理之家」，必須先比對長詞）
  精神復健機構: "psychiatric-rehabilitation-institution",
  精神復健: "psychiatric-rehabilitation-institution",
  一般護理之家: "general-nursing-home",
  精神護理之家: "psychiatric-nursing-home",
  產後護理之家: "postpartum-care",
  護理之家: "nursing-home",
  產後護理: "postpartum-care",
  月子中心: "postpartum-care",
  坐月子: "postpartum-care",
  醫院評鑑: "hospital",
  醫院: "hospital",
  托嬰中心: "infant-daycare",
  托嬰: "infant-daycare",
  身心障礙: "disability-welfare",
  兒少: "youth-care",
  兒童: "youth-care",
  精神護理: "psychiatric-nursing-home",
};

// 長詞優先排序，確保子字串不會搶先比對（e.g. 「護理之家」不搶「一般護理之家」）
export const SORTED_KEYWORD_ENTRIES = Object.entries(KEYWORD_MAP).sort(
  (a, b) => b[0].length - a[0].length
);

export function getFacilityInfoFromPost(
  category?: string | null,
  tags?: string[] | null,
  slug?: string
): FacilityInfo | null {
  // 1. 從 category 直接比對 facility key
  if (category) {
    const direct = FACILITY_MAP[category];
    if (direct) return direct;

    // 2. 從 category 文字找關鍵字（長詞優先，避免短詞搶先）
    for (const [kw, key] of SORTED_KEYWORD_ENTRIES) {
      if (category.includes(kw)) {
        return FACILITY_MAP[key] ?? null;
      }
    }
  }

  // 3. 從 tags 找關鍵字（長詞優先）
  if (tags) {
    for (const tag of tags) {
      for (const [kw, key] of SORTED_KEYWORD_ENTRIES) {
        if (tag.includes(kw)) {
          return FACILITY_MAP[key] ?? null;
        }
      }
    }
  }

  // 4. 從 slug 找 facility key（長 key 優先，避免 nursing-home 搶先 general-nursing-home）
  if (slug) {
    const sortedFacilityKeys = Object.keys(FACILITY_MAP).sort((a, b) => b.length - a.length);
    for (const key of sortedFacilityKeys) {
      if (slug.startsWith(key)) {
        return FACILITY_MAP[key];
      }
    }
    // 再嘗試關鍵字
    for (const [kw, key] of SORTED_KEYWORD_ENTRIES) {
      const kwSlug = kw.toLowerCase().replace(/\s+/g, "-");
      if (slug.includes(kwSlug) || slug.includes(key)) {
        return FACILITY_MAP[key] ?? null;
      }
    }
  }

  return null;
}
