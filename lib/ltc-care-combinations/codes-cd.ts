import type { LtcCareCombination } from "./types";

/** CD 群：居家護理（CD02） */
export const cdCodes: LtcCareCombination[] = [
  {
    code: "CD02",
    category: "CD",
    name: "居家護理指導與諮詢",
    rules: [
      { label: "一、", text: "評估、失能者護理照護需求評估及家庭評估。" },
      { label: "二、", text: "擬定家庭護理計畫，確立個案及照顧者之照護需求與決定。" },
      { label: "三、", text: "護理照護問題處理。" },
      {
        label: "四、",
        text: "居家護理指導與諮詢：",
        children: [
          { label: "1.", text: "個案及照顧者照顧措施之專業指導及回覆示教。" },
          { label: "2.", text: "個案及照顧者跨領域社區資源協調、轉介及追蹤。" },
          { label: "3.", text: "照顧者及家庭之護理計畫諮詢。" },
          { label: "4.", text: "過程及結果成效評值與紀錄。" },
        ],
      },
      { label: "五、", text: "三次措施（含評估）加一次評值為一給（支）付單位。" },
      { label: "六、", text: "護理目標：", children: [
        { label: "1.", text: "個案及照顧者照護問題之改善。" },
        { label: "2.", text: "個案及照顧者自我照顧知識與技巧之增能。" },
        { label: "3.", text: "改善個案及照顧者之生活品質。" },
      ]},
      { label: "七、", text: "本組合應由完成衛生福利部認可訓練之居家護理機構、居家式（或含居家式之綜合式）長照機構之護理人員提供。" },
      { label: "八、", text: "服務完成指標依衛生福利部公告之長照專業服務手冊規定。" },
    ],
    payment: { kind: "fixed", nt: 6000 },
    remotePayment: { kind: "fixed", nt: 7200 },
    applicableTo: ["home-nursing"],
  },
];
