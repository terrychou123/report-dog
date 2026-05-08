export type DownloadItem = {
  slug: string;
  name: string;
  description: string;
  file: string;
};

export const DOWNLOADS: DownloadItem[] = [
  {
    slug: "day-care",
    name: "日間照顧中心",
    description: "日照機構評鑑自我檢核，含備審文件清單與查核項目。",
    file: "day-care.xlsx",
  },
  {
    slug: "residential",
    name: "住宿型長照機構",
    description: "115 年度衛福部全國版住宿式長照機構評鑑自我檢核表，A–D 共 63 項 + 加減分 3 項。",
    file: "residential.xlsx",
  },
  {
    slug: "general-nursing-home",
    name: "一般護理之家",
    description: "一般護理之家評鑑自我檢核表，含完整評分指標與說明。",
    file: "general-nursing-home.xlsx",
  },
  {
    slug: "home-nursing",
    name: "居家護理所",
    description: "115 年度居家護理所評鑑自我檢核，2 大區塊（A 經營管理、B 照護管理）共 8 項指標含 1 項加分。",
    file: "home-nursing.xlsx",
  },
  {
    slug: "home-care",
    name: "居家長照機構",
    description: "居家長照服務機構評鑑自我檢核，含服務流程與文件查核。",
    file: "home-care.xlsx",
  },
  {
    slug: "babycare",
    name: "產後護理之家",
    description: "產後護理之家評鑑自我檢核表，適用母嬰照護品質評估。",
    file: "babycare.xlsx",
  },
  {
    slug: "hospital",
    name: "醫院評鑑",
    description: "115 年度醫院評鑑自我檢核表，涵蓋醫療品質與病人安全查核項目。",
    file: "hospital.xlsx",
  },
  {
    slug: "psychiatric-nursing-home",
    name: "精神護理之家",
    description: "115年度精神護理之家評鑑自我檢核表，共5大面向36條指標。",
    file: "psychiatric-nursing-home.xlsx",
  },
  {
    slug: "youth-care",
    name: "兒少教養機構",
    description: "111年度兒童及少年安置及教養機構評鑑自我檢核表，含行政、環境、專業服務及權益保障。",
    file: "youth-care.xlsx",
  },
  {
    slug: "elderly-welfare",
    name: "老人福利機構",
    description: "115年度老人福利機構評鑑自我檢核表，涵蓋經營管理、專業照護與住民權益保障。",
    file: "elderly-welfare.xlsx",
  },
  {
    slug: "disability-welfare",
    name: "身心障礙福利機構",
    description: "身心障礙福利機構評鑑自我檢核表，含權益保障、個別化支持計畫與行政管理。",
    file: "disability-welfare.xlsx",
  },
  {
    slug: "infant-daycare",
    name: "托嬰中心",
    description: "114-116年度臺北市托嬰中心評鑑自我檢核表，共60項基準，含行政管理、托育活動、健康安全三大區塊。",
    file: "infant-daycare.xlsx",
  },
  {
    slug: "psychiatric-rehabilitation-institution",
    name: "精神復健機構",
    description: "115年度精神復健機構評鑑自我檢核表，涵蓋日間型及住宿型機構評鑑基準。",
    file: "psychiatric-rehabilitation-institution.xlsx",
  },
];

const VALID_FILES = new Set(DOWNLOADS.map((d) => d.file));

export function isValidDownloadFile(file: string): boolean {
  return VALID_FILES.has(file);
}
