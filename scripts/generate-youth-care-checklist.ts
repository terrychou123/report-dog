import { youthCareProfile } from "../lib/ai/evaluation-profiles/youth-care";
import { generateChecklistFromProfile } from "./lib/generate-from-profile";

generateChecklistFromProfile(
  youthCareProfile,
  "112年度兒童及少年安置機構評鑑自我檢核表",
  "兒少安置機構評鑑自我檢核表.xlsx"
).catch((err) => {
  console.error("❌ 產生失敗：", err);
  process.exit(1);
});
