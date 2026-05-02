import type { LtcCareCombination } from "./types";

/** BD 群：社區式服務（BD01–BD03） */
export const bdCodes: LtcCareCombination[] = [
  {
    code: "BD01",
    category: "BD",
    name: "社區式協助沐浴",
    rules: [
      { label: "一、", text: "內容：協助或引導至浴間、穿脫衣服、全身淋浴或坐浴（或洗頭）、刷牙洗臉、浴間使用後之清理。" },
      { label: "二、", text: "本組合係指於日間照顧中心（含小規模多機能）或托顧家庭之浴間執行之項目。" },
    ],
    payment: { kind: "fixed", nt: 200 },
    remotePayment: { kind: "fixed", nt: 240 },
    applicableTo: ["daycare"],
  },
  {
    code: "BD02",
    category: "BD",
    name: "社區式晚餐",
    rules: [
      { label: "一、", text: "內容：準備晚餐、協助進食（或餵食）及飯後口腔清潔。" },
      { label: "二、", text: "本組合係指於日間照顧中心（含小規模多機能）或托顧家庭執行之項目。" },
    ],
    payment: { kind: "fixed", nt: 150 },
    remotePayment: { kind: "fixed", nt: 180 },
    applicableTo: ["daycare"],
  },
  {
    code: "BD03",
    category: "BD",
    name: "社區式服務交通接送",
    rules: [
      { label: "一、", text: "內容：接（送）長照給付對象居家至社區式服務類長照機構（日間照顧中心、小規模多機能、托顧家庭）、巷弄長照站、文化健康站、失智社區服務據點、輔具中心或身心障礙日間照顧服務（含社區式日間照顧服務據點、身心障礙者托顧家庭及提供日間照顧服務之身心障礙福利機構）。" },
      { label: "二、", text: "本組合以長照給付對象住家與社區式服務類長照機構之距離十公里以內者，適用本組合，超過十公里所需費用由長照給付對象自行負擔。" },
      { label: "三、", text: "以一趟為給（支）付單位。" },
      { label: "四、", text: "本組合應由持有職業駕照之駕駛員提供。" },
    ],
    payment: { kind: "fixed", nt: 115 },
    remotePayment: { kind: "fixed", nt: 140 },
    applicableTo: ["daycare"],
  },
];
