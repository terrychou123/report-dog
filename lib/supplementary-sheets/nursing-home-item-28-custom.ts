/**
 * 住宿型照顧機構評鑑項目 28「管路移除（鼻胃管及導尿管）」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 管路移除促進計畫（規範類）
 *
 * 115 年度評鑑新增：合併鼻胃管及導尿管移除促進（原 B20+B21）
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildTubeRemovalPlan(): SheetData {
  return buildPolicyDocSheet({
    name: "管路移除促進計畫",
    instTitle: "鼻胃管及導尿管移除促進計畫",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為促進服務對象管路（鼻胃管及導尿管）之安全移除，恢復其自然進食及排尿能力，依 115 年度衛福部住宿型機構評鑑基準 B19 制定本計畫。",
          },
          {
            number: "第二條",
            title: "（適用範圍）",
            body: "本計畫適用於所有使用鼻胃管或留置導尿管之服務對象。",
          },
        ],
      },
      {
        name: "第二章　定期必要性評估",
        articles: [
          {
            number: "第三條",
            title: "（評估頻率）",
            body: "各管路必要性應依下列頻率評估：\n一、入住後三十日內完成首次必要性評估\n二、每月由醫師評估持續使用必要性\n三、服務對象病情改善時（如意識恢復、吞嚥功能改善）應立即評估",
          },
          {
            number: "第四條",
            title: "（評估標準）",
            body: "鼻胃管移除評估：評估吞嚥功能（語言治療師或護理師進行吞嚥篩檢），確認意識狀態改善、具有自主進食意願及能力後，與醫師討論試撤除。\n\n導尿管移除評估：評估是否仍有長期留置之醫療必要性（如尿失禁但無尿路阻塞），無必要性時應嘗試移除，並配合定時如廁計畫。",
          },
        ],
      },
      {
        name: "第三章　移除後照護",
        articles: [
          {
            number: "第五條",
            title: "（鼻胃管移除後）",
            body: "鼻胃管移除後應觀察：\n一、進食情形（食物質地調整：由半流質開始）\n二、有無嗆咳、吸入性肺炎徵象\n三、體重及營養狀態\n四、進食量不足者應補充點心，並監測至穩定",
          },
          {
            number: "第六條",
            title: "（導尿管移除後）",
            body: "導尿管移除後應觀察：\n一、自主排尿情形（第一次排尿時間及量）\n二、有無尿液滯留（移除後六小時未排尿應評估膀胱殘餘尿量）\n三、尿路感染徵象（頻尿、疼痛、尿液混濁）\n四、配合定時如廁計畫（詳見定時如廁計畫書）",
          },
        ],
      },
      {
        name: "第四章　統計與品質",
        articles: [
          {
            number: "第七條",
            title: "（管路移除率統計）",
            body: "每季統計鼻胃管及導尿管移除率，作為品質指標，提送品質改善會議分析趨勢及改善策略。",
          },
        ],
      },
      {
        name: "第五章　附則",
        articles: [
          {
            number: "第八條",
            title: "（施行日期）",
            body: "本計畫自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem28CustomSheets(): SheetData[] {
  return [buildTubeRemovalPlan()];
}
