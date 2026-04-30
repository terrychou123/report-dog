/**
 * 產生 115 年度住宿式長期照顧服務機構績效考核指標自我檢核表
 * SSOT：lib/ai/evaluation-profiles/nursing-home.ts
 * 輸出：public/downloads/residential.xlsx（直接覆蓋）
 */
import ExcelJS from "exceljs";
import * as path from "path";
import { nursingHomeProfile } from "../lib/ai/evaluation-profiles/nursing-home";
import { addSheet, type ItemGroup } from "./lib/excel-checklist-builder";

// 從 "A1 工作人員權益保障" 拆成 { code: "A1", name: "工作人員權益保障" }
function splitCode(title: string): { code: string; name: string } {
  const spaceIdx = title.indexOf(" ");
  if (spaceIdx === -1) return { code: title, name: title };
  return { code: title.slice(0, spaceIdx), name: title.slice(spaceIdx + 1) };
}

// 各 section 對映的 sheet 名稱
const SHEET_NAMES: Record<string, string> = {
  "A、經營管理效能": "A 經營管理效能",
  "B、專業照護品質": "B 專業照護品質",
  "C、安全環境設備": "C 安全環境設備",
  "D、個案權益保障": "D 個案權益保障",
  "加減分項目": "加減分項目",
};

const TITLE = "115 年度住宿式長期照顧服務機構績效考核指標自我檢核表";

async function main() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "報告汪";
  workbook.created = new Date();

  for (const section of nursingHomeProfile.sections) {
    const sheetName = SHEET_NAMES[section.name] ?? section.name;

    const groups: ItemGroup[] = section.items.map((item) => {
      const { code, name } = splitCode(item.title);

      // 加減分項目：在 title 加註分數
      let displayName = name;
      if ("bonusPoints" in item && typeof item.bonusPoints === "number") {
        displayName = `${name}（+${item.bonusPoints} 分）`;
      } else if ("deductionPoints" in item && typeof item.deductionPoints === "number") {
        displayName = `${name}（−${item.deductionPoints} 分）`;
      }

      return {
        groupTitle: item.title,
        items: [
          {
            id: code,
            title: displayName,
            criteria: item.criteria,
          },
        ],
      };
    });

    addSheet(workbook, sheetName, TITLE, groups);
  }

  const outputPath = path.join(process.cwd(), "public", "downloads", "residential.xlsx");
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ 已更新：${outputPath}`);
  console.log(
    `   共 ${nursingHomeProfile.sections.reduce((acc, s) => acc + s.items.length, 0)} 條（63 基本項 + 加減分 3 項）`
  );
}

main().catch((err) => {
  console.error("❌ 產生失敗：", err);
  process.exit(1);
});
