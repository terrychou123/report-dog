import ExcelJS from "exceljs";
import * as path from "path";
import * as os from "os";
import { addSheet, type ItemGroup } from "./lib/excel-checklist-builder";
import { daycareProfile } from "../lib/ai/evaluation-profiles/daycare";

// 壹、個案權益保障（項目 1–4）
const sheetAGroups: ItemGroup[] = [
  {
    groupTitle: "壹、個案權益保障（項目 1–4）",
    items: (daycareProfile.sections.find((s) => s.shortCode === "權")?.items ?? []).map(
      (item) => ({
        id: String(item.id),
        title: `${item.title}（${item.responsible}）`,
        criteria: item.criteria,
      })
    ),
  },
];

// 貳、專業照護品質（項目 5–22），依子分類分群
const subCatB = [
  { label: "（一）評估與處遇", ids: [5, 6, 7, 8, 9, 10] },
  { label: "（二）健康生活照顧", ids: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] },
  { label: "（三）品質監測", ids: [22] },
];
const sectionB = daycareProfile.sections.find((s) => s.shortCode === "專");
const sheetBGroups: ItemGroup[] = subCatB.map((cat) => ({
  groupTitle: `貳、專業照護品質 ${cat.label}`,
  items: (sectionB?.items ?? [])
    .filter((item) => cat.ids.includes(item.id))
    .map((item) => ({
      id: String(item.id),
      title: `${item.title}（${item.responsible}）`,
      criteria: item.criteria,
    })),
}));

// 參、經營管理效能（項目 23–37），依子分類分群
const subCatC = [
  { label: "（一）行政制度", ids: [23, 24, 25, 26, 27] },
  { label: "（二）服務人員管理", ids: [28, 29, 30, 31, 32, 33] },
  { label: "（三）財務管理", ids: [34] },
  { label: "（四）緊急事件管理", ids: [35, 36, 37] },
];
const sectionC = daycareProfile.sections.find((s) => s.shortCode === "管");
const sheetCGroups: ItemGroup[] = subCatC.map((cat) => ({
  groupTitle: `參、經營管理效能 ${cat.label}`,
  items: (sectionC?.items ?? [])
    .filter((item) => cat.ids.includes(item.id))
    .map((item) => ({
      id: String(item.id),
      title: `${item.title}（${item.responsible}）`,
      criteria: item.criteria,
    })),
}));

// 肆、安全環境設備（項目 38–43）
const sheetDGroups: ItemGroup[] = [
  {
    groupTitle: "肆、安全環境設備（一）硬體環境設施（項目 38–43）",
    items: (daycareProfile.sections.find((s) => s.shortCode === "安")?.items ?? []).map(
      (item) => ({
        id: String(item.id),
        title: `${item.title}（${item.responsible}）`,
        criteria: item.criteria,
      })
    ),
  },
];

// 伍、加分題（項目 44–45）
const bonusSection = daycareProfile.sections.find((s) => s.shortCode === "加");
const sheetEGroups: ItemGroup[] = bonusSection
  ? [
      {
        groupTitle: "伍、加分題（最多加 3 分）",
        items: bonusSection.items.map((item) => ({
          id: `加${item.id - 43}`,
          title: `${item.title}（${item.responsible}）`,
          criteria: item.criteria,
        })),
      },
    ]
  : [];

async function main() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "報告汪";
  workbook.created = new Date();

  const title = "115年度臺北市日間照顧機構評鑑自我檢核表";
  addSheet(workbook, "壹 個案權益保障", title, sheetAGroups);
  addSheet(workbook, "貳 專業照護品質", title, sheetBGroups);
  addSheet(workbook, "參 經營管理效能", title, sheetCGroups);
  addSheet(workbook, "肆 安全環境設備", title, sheetDGroups);
  if (sheetEGroups.length > 0) {
    addSheet(workbook, "伍 加分題", title, sheetEGroups);
  }

  // 輸出到 Desktop（本地執行用）
  const desktopPath = path.join(os.homedir(), "Desktop", "日間照顧機構評鑑自我檢核表.xlsx");
  await workbook.xlsx.writeFile(desktopPath);
  console.log(`✅ 已儲存至 Desktop：${desktopPath}`);

  // 同時輸出到 public/downloads（供網站下載）
  const publicPath = path.join(process.cwd(), "public", "downloads", "day-care.xlsx");
  await workbook.xlsx.writeFile(publicPath);
  console.log(`✅ 已更新 public/downloads/day-care.xlsx`);
}

main().catch((err) => {
  console.error("❌ 產生失敗：", err);
  process.exit(1);
});
