import { infantDaycareProfile } from "../lib/ai/evaluation-profiles/infant-daycare";
import { generateChecklistFromProfile } from "./lib/generate-from-profile";

generateChecklistFromProfile(
  infantDaycareProfile,
  "114-116年度托嬰中心評鑑自我檢核表",
  "infant-daycare.xlsx"
).catch((err) => {
  console.error("--- 產生失敗：", err);
  process.exit(1);
});
