/**
 * 住宿型照顧機構評鑑項目 34「身體清潔及翻身照護」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 翻身擺位作業 SOP
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildRepositioningSop(): SheetData {
  return buildPolicyDocSheet({
    name: "翻身擺位作業 SOP",
    instTitle: "身體清潔及翻身擺位照護標準作業程序（SOP）",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為提供服務對象適切之身體清潔照護，並透過定時翻身擺位預防壓力性損傷，制定本 SOP。",
          },
        ],
      },
      {
        name: "第二章　翻身擺位",
        articles: [
          {
            number: "第二條",
            title: "（翻身頻率）",
            body: "臥床服務對象原則每兩小時翻身一次。如使用壓力分散床墊且服務對象皮膚完整，經醫師評估後可延長為三至四小時，但須有書面醫囑及護理評估支持，並更嚴密監測皮膚狀況。",
          },
          {
            number: "第三條",
            title: "（擺位原則）",
            body: "翻身擺位應遵守：\n一、三十度側臥（避免直接壓迫薦骨及大轉子）\n二、骨突處（薦骨、腳跟、枕骨）以減壓輔具保護\n三、翻身後確認擺位穩定，肢體自然排列，避免關節過度屈曲\n四、翻身時順帶進行皮膚評估及被動關節運動（腳踝、膝、肘等）",
          },
          {
            number: "第四條",
            title: "（翻身記錄）",
            body: "每次翻身後填寫「翻身拍背護理紀錄表」，記錄時間、翻身方向及皮膚觀察結果。發現皮膚發紅或壓傷徵兆立即通報護理師。",
          },
        ],
      },
      {
        name: "第三章　身體清潔照護",
        articles: [
          {
            number: "第五條",
            title: "（沐浴頻率）",
            body: "依服務對象能力及意願，每週至少二至三次全身清潔（淋浴或床上擦浴）。高度失能個案（無法坐起）採床上擦浴。每日口腔清潔至少兩次。",
          },
          {
            number: "第六條",
            title: "（沐浴安全）",
            body: "沐浴時應：\n一、確認水溫（不超過 42°C，先測溫再接觸皮膚）\n二、防止跌倒（使用浴椅、扶手）\n三、保護隱私（拉簾或關門）\n四、觀察全身皮膚狀況（紅腫、潰瘍、異常體表變化）",
          },
        ],
      },
      {
        name: "第四章　附則",
        articles: [
          {
            number: "第七條",
            title: "（施行日期）",
            body: "本 SOP 自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem34CustomSheets(): SheetData[] {
  return [buildRepositioningSop()];
}
