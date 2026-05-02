/**
 * 住宿型照顧機構評鑑項目 54「輔具與移位設備安全管理」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 輔具管理辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildAssistiveDevicePolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "輔具管理辦法",
    instTitle: "輔具與移位設備安全管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保輔具及移位設備之安全使用，預防使用不當造成服務對象或工作人員傷害，制定本辦法。",
          },
          {
            number: "第二條",
            title: "（適用範圍）",
            body: "本辦法適用於機構內所有輔具及移位設備，包含：\n一、移位設備（移位機、移位滑板、移位腰帶、電動升降照護機）\n二、輪椅（手動及電動）\n三、助行器（四腳拐、助行架、輪型助行器）\n四、電動床\n五、特殊輔具（個案自備）",
          },
        ],
      },
      {
        name: "第二章　輔具清單管理",
        articles: [
          {
            number: "第三條",
            title: "（輔具清冊）",
            body: "行政組應建立「輔具設備清冊」，記錄：\n一、輔具種類及型號\n二、購入日期及預估使用年限\n三、使用狀態（正常/修繕中/報廢）\n四、借用個案及歸還紀錄（機構借用輔具）\n清冊每季更新一次。",
          },
        ],
      },
      {
        name: "第三章　定期保養檢查",
        articles: [
          {
            number: "第四條",
            title: "（保養週期）",
            body: "各類輔具保養週期：\n一、移位機：每月定期檢查吊臂、吊帶、固定扣及電氣系統；每年委請廠商專業保養\n二、輪椅：每月確認煞車、腳踏板固定、輪胎充氣\n三、電動床：每季確認電動升降功能、護欄鎖扣、緊急降低開關\n四、助行器：每月確認腳墊防滑功能及結構穩固\n保養紀錄填入「輔具設備維護保養紀錄表」。",
          },
          {
            number: "第五條",
            title: "（吊帶管理）",
            body: "移位機吊帶應：\n一、每次使用前目視檢查（無破損、縫線鬆脫、扣件損壞）\n二、每位服務對象專屬一套吊帶（預防交叉感染）\n三、定期清洗（每週或污染後立即）\n四、發現損壞立即停用並更換",
          },
        ],
      },
      {
        name: "第四章　移位技術訓練",
        articles: [
          {
            number: "第六條",
            title: "（工作人員訓練）",
            body: "照顧服務員應接受移位技術訓練，包含：\n一、人工輔助移位（協助翻身、坐起、床輪椅轉位）\n二、移位設備操作（移位機、移位滑板）\n三、預防工作人員下背傷害之正確姿勢\n新進照顧服務員於到職三個月內完成，並每年複訓一次。",
          },
        ],
      },
      {
        name: "第五章　附則",
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

export function buildNursingHomeItem54CustomSheets(): SheetData[] {
  return [buildAssistiveDevicePolicy()];
}
