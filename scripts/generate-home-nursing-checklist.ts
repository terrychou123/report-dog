import ExcelJS from "exceljs";
import * as path from "path";
import { homeNursingProfile } from "../lib/ai/evaluation-profiles/home-nursing";
import { addSheet, type ItemGroup, type CheckItem } from "./lib/excel-checklist-builder";

function sectionToGroups(
  section: (typeof homeNursingProfile.sections)[number]
): ItemGroup[] {
  return section.items.map((item) => {
    const match = item.title.match(/^([A-Z]\d+)\s+(.+?)\s+\(([0-9.]+%)\)$/);
    const code = match?.[1] ?? String(item.id);
    const titleNoCode = match?.[2] ?? item.title;
    const weight = match?.[3] ?? "";

    const checkItem: CheckItem = {
      id: code === "B3" ? "B3（加分）" : code,
      title: titleNoCode,
      criteria: item.criteria,
    };

    return {
      groupTitle: weight ? `${code} ${titleNoCode}（權重 ${weight}）` : `${code} ${titleNoCode}`,
      items: [checkItem],
    };
  });
}

async function main() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "報告汪";
  workbook.created = new Date();

  const title = "115年度居家護理所評鑑自我檢核表";
  const [sectionA, sectionB] = homeNursingProfile.sections;
  addSheet(workbook, "A 經營管理", title, sectionToGroups(sectionA));
  addSheet(workbook, "B 照護管理", title, sectionToGroups(sectionB));

  const outputPath = path.join(
    process.cwd(),
    "public",
    "downloads",
    "home-nursing.xlsx"
  );
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ 已儲存至：${outputPath}`);
}

main().catch((err) => {
  console.error("❌ 產生失敗：", err);
  process.exit(1);
});
