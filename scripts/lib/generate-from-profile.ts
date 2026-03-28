import ExcelJS from "exceljs";
import * as path from "path";
import * as os from "os";
import { addSheet, type ItemGroup } from "./excel-checklist-builder";

type ProfileSection = {
  name: string;
  items: { id: number; title: string; criteria: string[] }[];
};

export async function generateChecklistFromProfile(
  profile: { sections: ProfileSection[] },
  title: string,
  outputFilename: string
) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "報告汪";
  workbook.created = new Date();

  for (const section of profile.sections) {
    const groups: ItemGroup[] = [
      {
        groupTitle: section.name,
        items: section.items.map((item) => ({
          id: String(item.id),
          title: item.title,
          criteria: item.criteria,
        })),
      },
    ];
    addSheet(workbook, section.name.substring(0, 31), title, groups); // Excel sheet names capped at 31 chars
  }

  const outputPath = path.join(os.homedir(), "Desktop", outputFilename);
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ 已儲存至：${outputPath}`);
}
