/**
 * 住宿型照顧機構評鑑項目 43「污物及廢棄物處理」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 感染性廢棄物處理辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildInfectiousWastePolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "感染性廢棄物處理辦法",
    instTitle: "感染性廢棄物及污物分類處理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保感染性廢棄物及污物之安全分類、儲存及清運，防止環境污染及感染擴散，依《醫療廢棄物管理辦法》及相關規定制定本辦法。",
          },
          {
            number: "第二條",
            title: "（廢棄物分類）",
            body: "廢棄物應依下列類別分類收集：\n一、感染性廢棄物（感染性廢棄物專用標示紅色袋）：沾有血液、體液、分泌物之物品（敷料、手套、尿布）、廢棄注射器、廢棄針頭（銳器桶）\n二、一般廢棄物：無感染風險之廢棄物\n三、資源回收物：紙張、塑膠、玻璃（分類桶）",
          },
        ],
      },
      {
        name: "第二章　感染性廢棄物處理",
        articles: [
          {
            number: "第三條",
            title: "（收集容器）",
            body: "感染性廢棄物應使用：\n一、符合規定之感染性廢棄物容器（有蓋、紅色標示）\n二、銳器（針頭、刀片）：放入硬質不穿透之銳器收集桶，不得回帽，七分滿時更換\n三、液態廢棄物：需加蓋密封",
          },
          {
            number: "第四條",
            title: "（貯存及清運）",
            body: "感染性廢棄物暫存區應：\n一、設置於服務對象不易接觸之區域（上鎖或限制進入）\n二、通風良好、防蟲鼠\n三、清運頻率：至少每週清運一次，或達容量七成時即清運\n四、委請合格感染性廢棄物清除業者清運，並保存清運紀錄（包括日期、重量、清運業者）",
          },
          {
            number: "第五條",
            title: "（工作人員防護）",
            body: "處理感染性廢棄物時，工作人員應配戴手套及必要之防護裝備。如發生針扎意外：\n一、立即以流動清水沖洗傷口五至十分鐘\n二、通報護理長\n三、依機構針扎事故處理程序辦理（就醫評估、愛滋病毒預防性投藥評估）",
          },
        ],
      },
      {
        name: "第三章　污物處理",
        articles: [
          {
            number: "第六條",
            title: "（污物間管理）",
            body: "污物間應保持：\n一、定期清潔消毒\n二、污染衣物及床單以密封袋裝運至洗衣間，不得在走廊抖動\n三、污物處理後工作人員立即執行手部衛生",
          },
        ],
      },
      {
        name: "第四章　附則",
        articles: [
          {
            number: "第七條",
            title: "（施行日期）",
            body: "本辦法自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem43CustomSheets(): SheetData[] {
  return [buildInfectiousWastePolicy()];
}
