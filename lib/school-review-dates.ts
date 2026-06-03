// 各機構評鑑頁內容最後審閱日期與主管機關對照表
// 每次更新評鑑基準內容時同步更新此處，sitemap 的 lastModified 也讀取自此

export const schoolReviewDates: Record<string, string> = {
  "home-care":                              "2026-05-08", // 115年度
  "daycare":                                "2026-05-08", // 115年度
  "multi-function-care":                    "2026-05-08", // 115年度
  "nursing-home":                           "2026-05-08", // 114年度
  "home-nursing":                           "2026-05-08", // 115年度
  "postpartum-care":                        "2026-05-08", // 115年度
  "general-nursing-home":                   "2026-05-08", // 115年度
  "hospital":                               "2026-05-08", // 115年度（5/8 完整重寫）
  "elderly-welfare":                        "2026-05-08", // 115年度
  "psychiatric-nursing-home":               "2026-05-08", // 115年度
  "psychiatric-rehabilitation-institution": "2026-05-08", // 115年度
  "infant-daycare":                         "2025-09-01", // 114年度
  "disability-welfare":                     "2021-09-01", // 109年度
  "youth-care":                             "2023-09-01", // 112年度
};

/** 各機構主管機關對照表（用於 JSON-LD citation + 視覺 E-E-A-T 顯示） */
export const schoolReviewerMap: Record<string, { name: string; url: string }> = {
  "home-care":                              { name: "臺北市政府社會局",             url: "https://dosw.gov.taipei" },
  "daycare":                                { name: "臺北市政府社會局",             url: "https://dosw.gov.taipei" },
  "multi-function-care":                    { name: "臺北市政府社會局",             url: "https://dosw.gov.taipei" },
  "nursing-home":                           { name: "臺北市政府社會局",             url: "https://dosw.gov.taipei" },
  "home-nursing":                           { name: "衛生福利部護理及健康照護司",   url: "https://dep.mohw.gov.tw/DOHN" },
  "postpartum-care":                        { name: "衛生福利部護理及健康照護司",   url: "https://dep.mohw.gov.tw/DOHN" },
  "general-nursing-home":                   { name: "衛生福利部護理及健康照護司",   url: "https://dep.mohw.gov.tw/DOHN" },
  "hospital":                               { name: "衛生福利部醫事司",             url: "https://dep.mohw.gov.tw/DOMA" },
  "elderly-welfare":                        { name: "衛生福利部社會及家庭署",       url: "https://www.sfaa.gov.tw" },
  "disability-welfare":                     { name: "衛生福利部社會及家庭署",       url: "https://www.sfaa.gov.tw" },
  "youth-care":                             { name: "衛生福利部社會及家庭署",       url: "https://www.sfaa.gov.tw" },
  "infant-daycare":                         { name: "臺北市政府社會局",             url: "https://dosw.gov.taipei" },
  "psychiatric-nursing-home":               { name: "衛生福利部護理及健康照護司",   url: "https://dep.mohw.gov.tw/DOHN" },
  "psychiatric-rehabilitation-institution": { name: "衛生福利部心理及口腔健康司",   url: "https://dep.mohw.gov.tw/DOMHAOH" },
};

/** 各機構評鑑年度（民國年）—— SSOT，metadata title 與 sitemap lastModified 共用此值 */
export const schoolReviewYears: Record<string, number> = {
  "home-care":                              115,
  "daycare":                                115,
  "multi-function-care":                    115,
  "nursing-home":                           114,
  "home-nursing":                           115,
  "postpartum-care":                        115,
  "general-nursing-home":                   115,
  "hospital":                               115,
  "elderly-welfare":                        115,
  "psychiatric-nursing-home":               115,
  "psychiatric-rehabilitation-institution": 115,
  "infant-daycare":                         114,
  "disability-welfare":                     109,
  "youth-care":                             112,
};

/**
 * 回傳機構的評鑑民國年度。
 * 用於 school page metadata title，避免年度更新時各頁 title 失同步。
 * @param facilityKey  "nursing-home" | "elderly-welfare" | ...
 */
export function getReviewYear(facilityKey: string): number {
  return schoolReviewYears[facilityKey] ?? 115;
}

/** 從 /school/{facility}/{sub} 路徑取出 facility slug */
function getFacilitySlug(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  // segments[0] = "school", segments[1] = facility slug
  return segments[1] ?? "";
}

/** 回傳 YYYY-MM-DD 格式的審閱日期，找不到回傳 undefined */
export function getSchoolReviewDate(pathname: string): string | undefined {
  return schoolReviewDates[getFacilitySlug(pathname)];
}

/** 回傳該機構的主管機關資訊，找不到回傳 undefined */
export function getSchoolReviewer(pathname: string): { name: string; url: string } | undefined {
  return schoolReviewerMap[getFacilitySlug(pathname)];
}
