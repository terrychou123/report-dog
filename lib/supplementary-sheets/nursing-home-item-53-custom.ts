/**
 * 住宿型照顧機構評鑑項目 53「物理環境安全及無障礙設施」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 物理環境安全管理辦法
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildPhysicalEnvironmentPolicy(): SheetData {
  return buildPolicyDocSheet({
    name: "物理環境安全管理辦法",
    instTitle: "物理環境安全及無障礙設施管理辦法",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為確保機構物理環境安全，提供服務對象無障礙且安全之生活空間，依 115 年度評鑑基準 C15 制定本辦法。",
          },
        ],
      },
      {
        name: "第二章　無障礙設施",
        articles: [
          {
            number: "第二條",
            title: "（無障礙設施清單）",
            body: "機構應設置並維護以下無障礙設施：\n一、主要出入口坡道（坡度符合規定，兩側設扶手）\n二、走廊及公共空間輪椅迴轉空間（至少 150 cm × 150 cm）\n三、各樓層扶手（雙側連續扶手，高度 80–90 cm）\n四、無障礙廁所（至少每層一間）\n五、電梯（輪椅可進出，按鈕高度符合規定）",
          },
          {
            number: "第三條",
            title: "（無障礙設施巡查）",
            body: "防火管理人每月巡查無障礙設施，確認：\n一、坡道及扶手無損壞鬆動\n二、無障礙空間無堆放障礙物\n三、無障礙廁所設備功能正常",
          },
        ],
      },
      {
        name: "第三章　防跌環境管理",
        articles: [
          {
            number: "第四條",
            title: "（地板防滑）",
            body: "機構地板應：\n一、採防滑材質或貼防滑條（走廊、浴廁、樓梯踏面）\n二、每日確認地板乾燥，濕滑時立即放置警示標誌並清乾\n三、地毯（如有）邊緣固定，無翻起或捲邊",
          },
          {
            number: "第五條",
            title: "（照度管理）",
            body: "機構各區域應維持足夠照度（依台灣無障礙規範）：\n一、走廊：至少 100 lux\n二、樓梯：至少 150 lux\n三、浴廁：至少 100 lux\n夜間走廊應有常夜燈維持基本照明。每半年以照度計抽測，不足時更換燈具。",
          },
        ],
      },
      {
        name: "第四章　戶外活動空間",
        articles: [
          {
            number: "第六條",
            title: "（戶外空間安全）",
            body: "戶外活動空間（如庭院、天台）應確保：\n一、地面平坦防滑，無裂縫或高低落差\n二、有適當圍欄（認知障礙服務對象防走失）\n三、遮陽設施（防止日曬中暑）\n四、定期修剪植栽，確認無危險枝枒",
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

export function buildNursingHomeItem53CustomSheets(): SheetData[] {
  return [buildPhysicalEnvironmentPolicy()];
}
