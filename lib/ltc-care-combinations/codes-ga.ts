import type { LtcCareCombination } from "./types";

/**
 * GA 群：喘息服務（GA03、GA04、GA05、GA06、GA07、GA09）
 * 注意：GA01、GA02、GA08 法規本身略過
 */
export const gaCodes: LtcCareCombination[] = [
  {
    code: "GA03",
    category: "GA",
    name: "日間照顧中心喘息服務--全日",
    rules: [
      { label: "一、", text: "內容：長照給付對象至日間照顧中心接受照顧、停留，包含護理照護、協助沐浴、進食、服藥、活動安排及相關服務。" },
      { label: "二、", text: "含交通接送。" },
      { label: "三、", text: "提供護理照護服務應依護理人員法之規定辦理。" },
    ],
    payment: { kind: "fixed", nt: 1250 },
    remotePayment: { kind: "fixed", nt: 1500 },
    applicableTo: ["daycare"],
  },
  {
    code: "GA04",
    category: "GA",
    name: "日間照顧中心喘息服務--半日",
    rules: [
      { label: "一、", text: "內容：長照給付對象至日間照顧中心接受照顧、停留，包含護理照護、協助沐浴、進食、服藥、活動安排及相關服務。" },
      { label: "二、", text: "含交通接送。" },
      { label: "三、", text: "提供護理照護服務應依護理人員法之規定辦理。" },
    ],
    payment: { kind: "fixed", nt: 625 },
    remotePayment: { kind: "fixed", nt: 750 },
    applicableTo: ["daycare"],
  },
  {
    code: "GA05",
    category: "GA",
    name: "機構住宿式喘息服務",
    rules: [
      { label: "一、", text: "內容：長照給付對象至住宿式長照機構接受短暫照顧、停留，由機構工作人員提供二十四小時之照顧，服務內容包含護理照護、協助沐浴、進食、服藥、活動安排及相關服務。" },
      { label: "二、", text: "本組合以一日（二十四小時）為一給（支）付單位。" },
      { label: "三、", text: "含交通接送。" },
      { label: "四、", text: "提供護理照護服務應依護理人員法之規定辦理。" },
    ],
    payment: { kind: "fixed", nt: 2310 },
    remotePayment: { kind: "fixed", nt: 2775 },
    applicableTo: ["nursing-home", "general-nursing-home"],
  },
  {
    code: "GA06",
    category: "GA",
    name: "小規模多機能服務-夜間喘息",
    rules: [
      { label: "一、", text: "內容：長照給付對象於夜間至小規模多機能服務中心，由機構工作人員提供包含生活照顧、協助沐浴、進食、服藥、活動安排、住宿及相關照顧服務。" },
      { label: "二、", text: "夜間係指每日下午六點至翌日上午八點。" },
      { label: "三、", text: "本組合以一次為一給（支）付單位。" },
      { label: "四、", text: "含交通接送。" },
    ],
    payment: { kind: "fixed", nt: 2000 },
    remotePayment: { kind: "fixed", nt: 2400 },
  },
  {
    code: "GA07",
    category: "GA",
    name: "巷弄長照站喘息服務",
    rules: [
      { label: "一、", text: "內容：長照給付對象至巷弄長照站接受照顧、停留，包含進食、服藥、活動安排及相關服務。" },
      { label: "二、", text: "本組合以小時為給（支）付單位。" },
    ],
    payment: { kind: "fixed", nt: 170 },
    remotePayment: { kind: "fixed", nt: 205 },
  },
  {
    code: "GA09",
    category: "GA",
    name: "居家喘息服務",
    rules: [
      { label: "一、", text: "內容：家庭照顧者與服務單位議定，由照顧服務人員至長照給付對象家中，提供長照給付對象身體照顧服務，包含協助如廁、沐浴、穿換衣服、口腔清潔、進食、服藥、翻身、拍背、簡單被動式肢體關節活動、上下床、陪同運動、協助使用日常生活輔助器具及其他服務，如有陪同就醫需求可加計 BA14；前述陪同運動在安全情況下，得陪同至居家以外之地點及服務，如自家庭院、社區中庭或附近公園或其他場所運動、散步。" },
      { label: "二、", text: "本組合以二小時為一給（支）付單位，單日居家喘息服務以十小時為上限。" },
    ],
    payment: { kind: "fixed", nt: 770 },
    remotePayment: { kind: "fixed", nt: 925 },
    references: ["BA14"],
    note: "GA01、GA02、GA08 法規本身略過，未收錄於附表四。",
  },
];
