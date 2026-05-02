import type { LtcCareCombination } from "./types";

/** CC 群：居家無障礙環境改善（CC01） */
export const ccCodes: LtcCareCombination[] = [
  {
    code: "CC01",
    category: "CC",
    name: "居家環境安全或無障礙空間規劃",
    rules: [
      {
        label: "一、",
        text: "內容之一：",
        children: [
          { label: "1.", text: "活動及照顧方式與策略建議、現有家具擺設、日常活動所需之輔具使用與復健運動之空間動線規劃及相關服務。" },
          { label: "2.", text: "居家環境檢視、提出居家安全環境改善之方式，以及教導家屬長照給付對象於家中維護安全之方式及注意事項。" },
        ],
      },
      { label: "二、", text: "二次措施（含評估）為一給（支）付單位。" },
      { label: "三、", text: "為達到居家安全或無障礙空間所需之輔具或空間修繕，依輔具服務或居家無障礙環境改善服務之規定另計。" },
      { label: "四、", text: "服務完成指標依衛生福利部公告之長照專業服務手冊規定。" },
    ],
    payment: { kind: "fixed", nt: 2000 },
    remotePayment: { kind: "fixed", nt: 2400 },
  },
];
