import type { LtcCareCombination } from "./types";

/** CA 群：專業服務（CA07、CA08） */
export const caCodes: LtcCareCombination[] = [
  {
    code: "CA07",
    category: "CA",
    name: "IADLs 復能、ADLs 復能照護",
    rules: [
      {
        label: "一、",
        text: "內容：",
        children: [
          { label: "1.", text: "評估，並與長照給付對象及家屬討論 IADLs、ADLs 復能之項目及期待。" },
          { label: "2.", text: "擬訂復能計畫。" },
          { label: "3.", text: "指導措施及記錄。" },
        ],
      },
      { label: "二、", text: "三次措施（含評估）為一給（支）付單位。" },
      { label: "三、", text: "復能目標：", children: [
        { label: "1.", text: "協助善用潛能。" },
        { label: "2.", text: "維持生活參與能力不退化。" },
      ]},
      { label: "四、", text: "服務完成指標依衛生福利部公告之長照專業服務手冊規定。" },
    ],
    payment: { kind: "fixed", nt: 4500 },
    remotePayment: { kind: "fixed", nt: 5400 },
  },
  {
    code: "CA08",
    category: "CA",
    name: "「個別化服務計畫（ISP）擬定與執行」",
    rules: [
      {
        label: "一、",
        text: "內容：",
        children: [
          { label: "1.", text: "領有身心障礙證明之慢性精神病患者、自閉症者、智能障礙者及失智症者之生活自理能力增進、人際關係及社交技巧訓練、休閒生活服務、健康促進服務、社區適應服務之評估，並與長照給付對象及家屬討論個別化服務計畫之項目及期待。" },
          { label: "2.", text: "經確診失智症者之生活自理能力增進、人際關係及社交技巧訓練、休閒生活服務、健康促進服務、社區適應服務之評估，並與長照給付對象及家屬討論個別化服務計畫之項目及期待。" },
          { label: "3.", text: "擬訂個別化服務計畫（含執行策略）。" },
          { label: "4.", text: "執行紀錄。" },
        ],
      },
      { label: "二、", text: "四次措施（含評估及個別化服務計畫之擬訂）為一給（支）付單位。" },
      { label: "三、", text: "訓練目標：", children: [
        { label: "1.", text: "提升生活自理能力。" },
        { label: "2.", text: "促進社會參與。" },
        { label: "3.", text: "減緩退化。" },
      ]},
      { label: "四、", text: "服務完成指標依衛生福利部公告之長照專業服務手冊規定。" },
    ],
    payment: { kind: "fixed", nt: 6000 },
    remotePayment: { kind: "fixed", nt: 7200 },
  },
];
