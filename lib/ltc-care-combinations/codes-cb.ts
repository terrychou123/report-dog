import type { LtcCareCombination } from "./types";

/** CB 群：專業照護（CB01a、CB02–CB04） */
export const cbCodes: LtcCareCombination[] = [
  {
    code: "CB01a",
    category: "CB",
    name: "營養照護",
    rules: [
      {
        label: "一、",
        text: "內容：",
        children: [
          { label: "1.", text: "評估、觀察與確認照護需求。" },
          { label: "2.", text: "指導措施。" },
          { label: "3.", text: "轉介必要之醫療處置。" },
          { label: "4.", text: "紀錄。" },
        ],
      },
      { label: "二、", text: "三次措施（含評估）為一給（支）付單位。" },
      { label: "三、", text: "服務完成指標依衛生福利部公告之長照專業服務手冊規定。" },
    ],
    payment: { kind: "fixed", nt: 4500 },
    remotePayment: { kind: "fixed", nt: 5400 },
  },
  {
    code: "CB02",
    category: "CB",
    name: "進食與吞嚥照護",
    rules: [
      {
        label: "一、",
        text: "內容：",
        children: [
          { label: "1.", text: "評估、觀察與確認照護需求。" },
          { label: "2.", text: "指導措施。" },
          { label: "3.", text: "轉介必要之醫療處置。" },
          { label: "4.", text: "紀錄。" },
        ],
      },
      { label: "二、", text: "六次措施（含評估）為一給（支）付單位。" },
      { label: "三、", text: "服務完成指標依衛生福利部公告之長照專業服務手冊規定。" },
    ],
    payment: { kind: "fixed", nt: 9000 },
    remotePayment: { kind: "fixed", nt: 10800 },
  },
  {
    code: "CB03",
    category: "CB",
    name: "困擾行為照護",
    rules: [
      {
        label: "一、",
        text: "內容：",
        children: [
          { label: "1.", text: "評估、觀察與確認照護需求。" },
          { label: "2.", text: "指導措施。" },
          { label: "3.", text: "轉介必要之醫療處置。" },
          { label: "4.", text: "紀錄。" },
        ],
      },
      { label: "二、", text: "三次措施（含評估）為一給（支）付單位。" },
      { label: "三、", text: "服務完成指標依衛生福利部公告之長照專業服務手冊規定。" },
    ],
    payment: { kind: "fixed", nt: 4500 },
    remotePayment: { kind: "fixed", nt: 5400 },
  },
  {
    code: "CB04",
    category: "CB",
    name: "臥床或長期活動受限照護",
    rules: [
      {
        label: "一、",
        text: "內容：",
        children: [
          { label: "1.", text: "評估、觀察與確認照護需求。" },
          { label: "2.", text: "指導措施。" },
          { label: "3.", text: "轉介必要之醫療處置。" },
          { label: "4.", text: "紀錄。" },
        ],
      },
      { label: "二、", text: "六次措施（含評估）為一給（支）付單位。" },
      { label: "三、", text: "服務完成指標依衛生福利部公告之長照專業服務手冊規定。" },
    ],
    payment: { kind: "fixed", nt: 9000 },
    remotePayment: { kind: "fixed", nt: 10800 },
  },
];
