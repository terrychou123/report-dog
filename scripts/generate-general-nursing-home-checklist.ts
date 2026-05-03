import ExcelJS from "exceljs";
import * as path from "path";
import { generalNursingHomeProfile } from "../lib/ai/evaluation-profiles/general-nursing-home";
import { addSheet, type ItemGroup, type CheckItem } from "./lib/excel-checklist-builder";

// 從 profile item 的 title 解析出代碼與標題文字
// 格式範例："A1.1 機構負責人實際管理行政作業與照護品質" / "B1 住民服務需求評估..."
function sectionToGroups(
  section: (typeof generalNursingHomeProfile.sections)[number]
): ItemGroup[] {
  return section.items.map((item) => {
    const match = item.title.match(/^([A-Z]\d+(?:\.\d+)?)\s+(.+)$/);
    if (!match) console.warn(`⚠️  標題格式不符 regex，改用數字代碼：「${item.title}」`);
    const code = match?.[1] ?? String(item.id);
    const titleNoCode = match?.[2] ?? item.title;

    const checkItem: CheckItem = {
      // D3 是試評扣分項，在代碼欄標示
      id: (item as { isTrialDeduction?: boolean }).isTrialDeduction ? `${code}（試評扣分）` : code,
      title: titleNoCode,
      criteria: item.criteria,
    };

    return {
      groupTitle: `${code} ${titleNoCode}`,
      items: [checkItem],
    };
  });
}

async function main() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "報告汪";
  workbook.created = new Date();

  const title = "115年度一般護理之家評鑑自我檢核表";
  const [sectionA, sectionB, sectionC, sectionD] = generalNursingHomeProfile.sections;
  addSheet(workbook, "A 行政組織", title, sectionToGroups(sectionA));
  addSheet(workbook, "B 專業服務", title, sectionToGroups(sectionB));
  addSheet(workbook, "C 環境設施", title, sectionToGroups(sectionC));
  addSheet(workbook, "D 特別事項", title, sectionToGroups(sectionD));

  const outputPath = path.join(
    process.cwd(),
    "public",
    "downloads",
    "general-nursing-home.xlsx"
  );
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ 已儲存至：${outputPath}`);
}

main().catch((err) => {
  console.error("❌ 產生失敗：", err);
  process.exit(1);
});
