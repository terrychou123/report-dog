import ExcelJS from "exceljs";
import * as os from "os";
import * as path from "path";

import {
  HEADER_FILL,
  HEADER_FONT,
  SUBHEADER_FILL,
  SUBHEADER_FONT,
  THIN_BORDER,
} from "./lib/excel-checklist-builder";

// 各評鑑項目的法規參考連結資料
const lawLinks = [
  {
    itemNo: "第三項",
    itemName: "服務契約簽訂情形",
    links: [
      {
        name: "社區式服務類長期照顧服務機構定型化契約範本說明（衛福部）",
        url: "https://www.mohw.gov.tw/dl-87924-07e8a8ab-0ba1-4853-81f1-6734317e1a1f.html",
        status: "⚠️ 需驗證",
      },
      {
        name: "護理及健康照護司－定型化契約範本彙整頁",
        url: "https://dep.mohw.gov.tw/DONAHC/lp-3862-104.html",
        status: "⚠️ 需驗證",
      },
      {
        name: "長期照顧服務機構設立許可及管理辦法（含契約規定，全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070044",
        status: "✅ 已確認",
      },
    ],
  },
  {
    itemNo: "第四項",
    itemName: "個人資料管理與保密性",
    links: [
      {
        name: "個人資料保護法（全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=I0050021",
        status: "✅ 已確認",
      },
      {
        name: "個人資料保護法施行細則（全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=I0050022",
        status: "✅ 已確認",
      },
      {
        name: "法務部個人資料保護專區",
        url: "https://www.moj.gov.tw/2204/2795/2796/47451/",
        status: "⚠️ 需驗證",
      },
    ],
  },
  {
    itemNo: "第十項",
    itemName: "訂定開案/收案、轉介、暫停服務與結案相關辦法",
    links: [
      {
        name: "長期照顧服務法（全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070040",
        status: "✅ 已確認",
      },
      {
        name: "長期照顧服務申請及給付辦法（全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070051",
        status: "✅ 已確認",
      },
      {
        name: "長期照顧服務機構設立許可及管理辦法（全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070044",
        status: "✅ 已確認",
      },
    ],
  },
  {
    itemNo: "第十二項",
    itemName: "協助服藥－訂有協助服務對象服藥規定",
    links: [
      {
        name: "長照專業服務操作指引共通操作指引（含協助服藥，衛福部）",
        url: "https://www.mohw.gov.tw/dl-78070-2ee0d1d0-44f0-4f7f-88a5-49e246165693.html",
        status: "⚠️ 需驗證",
      },
      {
        name: "長期照顧服務機構設立標準（含給藥規定，全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070048",
        status: "✅ 已確認",
      },
      {
        name: "長期照顧服務機構設立許可及管理辦法（全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070044",
        status: "✅ 已確認",
      },
    ],
  },
  {
    itemNo: "第十四項",
    itemName: "安全看視－有安全作業規範",
    links: [
      {
        name: "長期照顧服務機構設立標準（全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070048",
        status: "✅ 已確認",
      },
      {
        name: "長期照顧服務機構設立許可及管理辦法（全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070044",
        status: "✅ 已確認",
      },
      {
        name: "長照專業服務操作指引共通操作指引（衛福部）",
        url: "https://www.mohw.gov.tw/dl-78070-2ee0d1d0-44f0-4f7f-88a5-49e246165693.html",
        status: "⚠️ 需驗證",
      },
    ],
  },
  {
    itemNo: "第二十一項",
    itemName: "防疫機制建置－手部衛生作業、感染手冊",
    links: [
      {
        name: "長期照護機構感染管制措施指引（疾管署短網址）",
        url: "https://at.cdc.gov.tw/HBY71i",
        status: "✅ 已確認",
      },
      {
        name: "長期照護機構感染管制措施指引 PDF（疾管署）",
        url: "https://www.cdc.gov.tw/Uploads/88eb4738-ccb8-467b-bb95-b85ec1d40206.pdf",
        status: "✅ 已確認",
      },
      {
        name: "疾管署長照感染管制分類頁面",
        url: "https://www.cdc.gov.tw/Category/List/sbu7N0TPqLjKBz65260pdQ",
        status: "⚠️ 需驗證",
      },
    ],
  },
  {
    itemNo: "第三十五項",
    itemName: "意外或緊急事件處理情形－訂有緊急及意外事件處理辦法",
    links: [
      {
        name: "長期照顧服務機構設立許可及管理辦法（第19、36條涉及事故處理，全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070044",
        status: "✅ 已確認",
      },
      {
        name: "強化長期照顧機構公共安全推動方案（衛福部）",
        url: "https://www.mohw.gov.tw/dl-43454-e222dfe6-6623-40a6-b207-bf96aa0ee484.html",
        status: "⚠️ 需驗證",
      },
      {
        name: "長期照顧服務法（全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070040",
        status: "✅ 已確認",
      },
    ],
  },
  {
    itemNo: "第三十七項",
    itemName: "機構性侵害及性騷擾事件防治機制建置情形",
    links: [
      {
        name: "性騷擾防治法（全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0050074",
        status: "✅ 已確認",
      },
      {
        name: "性騷擾防治準則（全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0050136",
        status: "✅ 已確認",
      },
      {
        name: "性侵害犯罪防治法（全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0050031",
        status: "✅ 已確認",
      },
    ],
  },
  {
    itemNo: "第三十九項",
    itemName: "設置盥洗衛生設備－符合社區式長照機構設立標準",
    links: [
      {
        name: "長期照顧服務機構設立標準（含社區式衛浴設備規定，全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070048",
        status: "✅ 已確認",
      },
      {
        name: "長期照顧服務機構設立許可及管理辦法（全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070044",
        status: "✅ 已確認",
      },
      {
        name: "長期照顧服務法（全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070040",
        status: "✅ 已確認",
      },
    ],
  },
  {
    itemNo: "第四十二項",
    itemName: "廚房衛生－訂有廚房作業標準",
    links: [
      {
        name: "食品良好衛生規範準則 GHP（全國法規資料庫）",
        url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0040122",
        status: "✅ 已確認",
      },
      {
        name: "餐飲衛生作業規範（食藥署）",
        url: "https://www.fda.gov.tw/TC/siteContent.aspx?sid=2306",
        status: "⚠️ 需驗證",
      },
      {
        name: "長照專業服務操作指引共通操作指引（衛福部）",
        url: "https://www.mohw.gov.tw/dl-78070-2ee0d1d0-44f0-4f7f-88a5-49e246165693.html",
        status: "⚠️ 需驗證",
      },
    ],
  },
];

async function main() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "報告汪";
  workbook.created = new Date();

  const ws = workbook.addWorksheet("日照中心評鑑法規參考連結");

  // 設定欄寬
  ws.getColumn("A").width = 12;   // 評鑑項目編號
  ws.getColumn("B").width = 36;   // 評鑑項目名稱
  ws.getColumn("C").width = 52;   // 連結名稱
  ws.getColumn("D").width = 70;   // URL
  ws.getColumn("E").width = 12;   // 狀態

  // 標題列
  const titleRow = ws.addRow([
    "日間照顧中心評鑑法規參考連結（供人工審核用）",
    "", "", "", "",
  ]);
  ws.mergeCells("A1:E1");
  titleRow.height = 28;
  titleRow.getCell(1).font = { bold: true, size: 14 };
  titleRow.getCell(1).alignment = { horizontal: "center", vertical: "middle" };
  titleRow.getCell(1).fill = HEADER_FILL;
  titleRow.getCell(1).font = { ...HEADER_FONT, size: 13 };

  // 表頭列
  const headerRow = ws.addRow(["評鑑項目編號", "評鑑項目名稱", "連結名稱", "URL", "狀態"]);
  headerRow.height = 22;
  headerRow.eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.border = THIN_BORDER;
    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });

  // 備註說明列
  const noteRow = ws.addRow([
    "✅ 已確認",
    "= law.moj.gov.tw pcode 經查正確，或疾管署搜尋結果直連",
    "⚠️ 需驗證",
    "= mohw.gov.tw / dep.mohw.gov.tw / fda.gov.tw 頁面需人工點擊確認是否有效",
    "",
  ]);
  ws.mergeCells(`B${noteRow.number}:B${noteRow.number}`);
  ws.mergeCells(`D${noteRow.number}:E${noteRow.number}`);
  noteRow.height = 30;
  noteRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFF2CC" }, // 淡黃色
    };
    cell.font = { italic: true, size: 10 };
    cell.border = THIN_BORDER;
    cell.alignment = { vertical: "middle", wrapText: true };
  });

  // 資料列
  for (const item of lawLinks) {
    // 項目子標題列
    const subRow = ws.addRow([
      item.itemNo,
      item.itemName,
      "", "", "",
    ]);
    ws.mergeCells(`A${subRow.number}:E${subRow.number}`);
    subRow.height = 24;
    const subCell = subRow.getCell(1);
    subCell.value = `${item.itemNo}　${item.itemName}`;
    subCell.fill = SUBHEADER_FILL;
    subCell.font = SUBHEADER_FONT;
    subCell.border = THIN_BORDER;
    subCell.alignment = { vertical: "middle", wrapText: true, indent: 1 };

    // 各連結列
    for (const link of item.links) {
      const dataRow = ws.addRow([
        item.itemNo,
        item.itemName,
        link.name,
        link.url,
        link.status,
      ]);
      dataRow.height = 36;
      dataRow.eachCell((cell, colNumber) => {
        cell.border = THIN_BORDER;
        cell.alignment = { vertical: "top", wrapText: true };
        // URL 欄設定超連結
        if (colNumber === 4) {
          cell.value = {
            text: link.url,
            hyperlink: link.url,
          };
          cell.font = { color: { argb: "FF0563C1" }, underline: true };
        }
        // 狀態欄置中
        if (colNumber === 5) {
          cell.alignment = { horizontal: "center", vertical: "middle" };
        }
      });
    }
  }

  // 凍結前兩列（標題+表頭）
  ws.views = [{ state: "frozen", xSplit: 0, ySplit: 3 }];

  // 輸出到桌面
  const desktopPath = path.join(os.homedir(), "Desktop", "日照中心評鑑法規參考連結.xlsx");
  await workbook.xlsx.writeFile(desktopPath);
  console.log(`✅ 已儲存至：${desktopPath}`);
}

main().catch((err) => {
  console.error("❌ 產生失敗：", err);
  process.exit(1);
});
