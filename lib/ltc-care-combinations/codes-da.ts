import type { LtcCareCombination } from "./types";

/** DA 群：交通接送（DA01） */
export const daCodes: LtcCareCombination[] = [
  {
    code: "DA01",
    category: "DA",
    name: "交通接送",
    rules: [
      {
        label: "一、",
        text: "內容：",
        children: [
          { label: "1.", text: "往（返）居家至醫療院所就醫、定期式復健或透析治療之交通接送。" },
          { label: "2.", text: "基於就醫、定期式復健或透析治療之目的，必要交通路程中之轉乘或接駁，經地方主管機關核認，起迄任有一端不限於居家或醫療院所。" },
        ],
      },
      { label: "二、", text: "本組合以一次為一給（支）付單位。" },
    ],
    payment: { kind: "local-government", note: "依地方主管機關訂定公告" },
    remotePayment: { kind: "local-government", note: "依地方主管機關訂定公告" },
  },
];
