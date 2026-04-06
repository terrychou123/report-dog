import ExcelJS from "exceljs";
import * as path from "path";
import * as os from "os";
import { addSheet, type ItemGroup } from "./lib/excel-checklist-builder";
import {
  psychiatricRehabilitationDayProfile,
  psychiatricRehabilitationResidentialProfile,
} from "../lib/ai/evaluation-profiles/psychiatric-rehabilitation-institution";

// 將單一章節 section 轉換為 ItemGroup[]
function sectionToGroups(section: {
  name: string;
  items: { id: number; title: string; responsible: string; criteria: string[] }[];
}): ItemGroup[] {
  return [
    {
      groupTitle: section.name,
      items: section.items.map((item) => ({
        id: String(item.id),
        title: `${item.title}（${item.responsible}）`,
        criteria: item.criteria,
      })),
    },
  ];
}

async function main() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "報告汪";
  workbook.created = new Date();

  const dayTitle = "115年度精神復健機構（日間型）評鑑自我檢核表";
  const residentialTitle = "115年度精神復健機構（住宿型）評鑑自我檢核表";

  // 日間型 3 個工作表
  for (const section of psychiatricRehabilitationDayProfile.sections) {
    const sheetName = `日間型 ${section.name.replace("、", " ")}`.substring(0, 31);
    addSheet(workbook, sheetName, dayTitle, sectionToGroups(section));
  }

  // 住宿型 3 個工作表
  for (const section of psychiatricRehabilitationResidentialProfile.sections) {
    const sheetName = `住宿型 ${section.name.replace("、", " ")}`.substring(0, 31);
    addSheet(workbook, sheetName, residentialTitle, sectionToGroups(section));
  }

  // 輸出到 Desktop（本地執行用）
  const desktopPath = path.join(os.homedir(), "Desktop", "精神復健機構評鑑自我檢核表.xlsx");
  await workbook.xlsx.writeFile(desktopPath);
  console.log(`✅ 已儲存至 Desktop：${desktopPath}`);

  // 同時輸出到 public/downloads（供網站下載）
  const publicPath = path.join(
    process.cwd(),
    "public",
    "downloads",
    "psychiatric-rehabilitation-institution.xlsx"
  );
  await workbook.xlsx.writeFile(publicPath);
  console.log(`✅ 已更新 public/downloads/psychiatric-rehabilitation-institution.xlsx`);
}

main().catch((err) => {
  console.error("❌ 產生失敗：", err);
  process.exit(1);
});
