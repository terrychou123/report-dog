import { elderlyWelfareProfile } from "../lib/ai/evaluation-profiles/elderly-welfare";
import { generateChecklistFromProfile } from "./lib/generate-from-profile";

generateChecklistFromProfile(
  elderlyWelfareProfile,
  "115年度老人福利機構評鑑自我檢核表",
  "老人福利機構評鑑自我檢核表.xlsx"
).catch((err) => {
  console.error("❌ 產生失敗：", err);
  process.exit(1);
});
