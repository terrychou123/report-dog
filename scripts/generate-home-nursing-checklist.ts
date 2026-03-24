import ExcelJS from "exceljs";
import * as path from "path";
import * as os from "os";
import { addSheet, type ItemGroup } from "./lib/excel-checklist-builder";

// ─── A 經營管理 ──────────────────────────────────────────────────
const sheetAGroups: ItemGroup[] = [
  {
    groupTitle: "A1 社區資源盤點與運用",
    items: [
      {
        id: "A1",
        title: "社區資源盤點與運用",
        criteria: [
          "建立社區資源盤點評估，定期更新資源清單（醫療、社福、長照等相關資源）",
          "有資源連結運用紀錄，個案依需求轉介或連結相關社區資源，有書面記錄",
          "訂有轉介機制及轉介表單，轉介過程完整記錄且有追蹤結果",
        ],
      },
    ],
  },
  {
    groupTitle: "A2 感染管制作業與器材維護管理",
    items: [
      {
        id: "A2",
        title: "感染管制作業與器材維護管理",
        criteria: [
          "訂有感染管制手冊，內容涵蓋手部衛生、消毒滅菌、廢棄物處理等作業程序，並定期更新",
          "【試評】工作人員流感疫苗接種率達 80% 以上，有接種記錄",
          "醫療廢棄物依法分類處理，有廢棄物處理記錄及清除合約",
          "護理器材（血壓計、血糖機、傷口護理器材等）定期盤點維護校正，有盤點維護記錄",
        ],
      },
    ],
  },
  {
    groupTitle: "A3 居家訪視人員安全管理",
    items: [
      {
        id: "A3",
        title: "居家訪視人員安全管理",
        criteria: [
          "訂有居家訪視人員安全管理辦法，涵蓋車禍事故、人身安全、動物咬傷及扎刺傷等緊急應變程序",
          "訪視人員發生安全事件有緊急通報及處理記錄，記錄完整且通報流程明確",
          "安全事件有定期檢討分析及改善追蹤記錄，改善措施有落實執行",
        ],
      },
    ],
  },
  {
    groupTitle: "A4 個案緊急或意外事件處理",
    items: [
      {
        id: "A4",
        title: "個案緊急或意外事件處理",
        criteria: [
          "訂有個案緊急或意外事件預防及處理辦法，涵蓋生命徵象惡化、跌倒、造廔口異常、管路異常等常見狀況",
          "個案發生緊急事件有即時緊急處理及通報記錄，記錄完整包含處置內容與結果",
          "緊急事件有定期檢討分析及改善追蹤，並依結果修訂相關辦法",
        ],
      },
    ],
  },
  {
    groupTitle: "A5 機構經營指標監測與持續改善",
    items: [
      {
        id: "A5",
        title: "機構經營指標監測與持續改善",
        criteria: [
          "訂有 5 項以上機構經營品質指標定義，各指標有明確計算方式及閾值設定",
          "依監測計畫定期統計分析各項指標，有書面統計分析報告（至少每季一次）",
          "依指標監測結果修訂閾值並持續改善，有改善計畫及追蹤記錄",
        ],
      },
    ],
  },
];

// ─── B 照護管理 ──────────────────────────────────────────────────
const sheetBGroups: ItemGroup[] = [
  {
    groupTitle: "B1 機構資訊管理",
    items: [
      {
        id: "B1",
        title: "機構資訊管理",
        criteria: [
          "機構服務項目清單完整，公開揭示且與實際提供服務相符",
          "服務區域範圍明確標示，並定期更新",
          "緊急聯絡方式清楚揭示，24 小時可聯繫到負責人或值班護理人員",
          "工作人員訪視安全相關權益明確告知，訪視流程及個人資料保護有書面說明",
          "有跨域合作機制，與醫療機構、社福機構建立合作或轉介關係，有合作協議或紀錄",
        ],
      },
    ],
  },
  {
    groupTitle: "B2 個案照護管理",
    items: [
      {
        id: "B2",
        title: "個案照護管理",
        criteria: [
          "機構現有服務個案達 10 位以上（評鑑當日），有個案名冊及服務記錄",
          "收案時及每 6 個月進行一次全人評估，評估內容完整涵蓋生理、心理、社會及功能狀況",
          "依評估結果擬定個別化照護計畫，計畫內容包含照護問題、目標、措施及評值",
        ],
      },
    ],
  },
  {
    groupTitle: "B3 加分項目",
    items: [
      {
        id: "B3（加分）",
        title: "加分項目",
        criteria: [
          "推行創新或實證照護模式，有具體執行成效及文件佐證",
          "工作人員於全國或縣市相關競賽獲獎，有獎項證明",
          "參與國際交流活動或與國際機構建立合作關係，有相關紀錄",
          "機構被評定為標竿典範機構或獲主管機關表揚，有相關證明",
          "工作人員於學術研討會或專業學會發表論文或壁報，有發表證明",
        ],
      },
    ],
  },
];

async function main() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "報告汪";
  workbook.created = new Date();

  const title = "115年度居家護理所評鑑自我檢核表";
  addSheet(workbook, "A 經營管理", title, sheetAGroups);
  addSheet(workbook, "B 照護管理", title, sheetBGroups);

  const outputPath = path.join(os.homedir(), "Desktop", "居家護理所評鑑自我檢核表.xlsx");
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ 已儲存至：${outputPath}`);
}

main().catch((err) => {
  console.error("❌ 產生失敗：", err);
  process.exit(1);
});
