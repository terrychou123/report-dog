import { disabilityWelfareProfile } from "../lib/ai/evaluation-profiles/disability-welfare";
import { generateChecklistFromProfile } from "./lib/generate-from-profile";

generateChecklistFromProfile(
  disabilityWelfareProfile,
  "身心障礙福利機構評鑑自我檢核表",
  "身心障礙福利機構評鑑自我檢核表.xlsx"
).catch((err) => {
  console.error("❌ 產生失敗：", err);
  process.exit(1);
});
