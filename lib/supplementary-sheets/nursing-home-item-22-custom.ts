/**
 * 住宿型照顧機構評鑑項目 22「壓力性損傷預防及處理」自訂補充分頁
 *
 * 新增 1 個工作分頁：
 *   1. 壓傷預防與處置 SOP
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";

function buildPressureInjurySop(): SheetData {
  return buildPolicyDocSheet({
    name: "壓傷預防與處置 SOP",
    instTitle: "壓力性損傷預防及處置標準作業程序（SOP）",
    chapters: [
      {
        name: "第一章　總則",
        articles: [
          {
            number: "第一條",
            title: "（目的）",
            body: "為預防壓力性損傷（壓瘡）之發生，並對已發生之壓傷提供適切照護，降低壓傷發生率及嚴重度，制定本 SOP。",
          },
        ],
      },
      {
        name: "第二章　風險評估",
        articles: [
          {
            number: "第二條",
            title: "（評估工具及時機）",
            body: "使用「Braden 量表」進行壓傷風險評估：\n一、入住後二十四小時內完成初評\n二、每週重新評估（臥床或高風險個案）\n三、每月定期評估（一般個案）\n四、功能狀態改變時立即重評\nBraden ≤ 18 分列為高風險，應立即實施強化預防措施。",
          },
        ],
      },
      {
        name: "第三章　預防措施",
        articles: [
          {
            number: "第三條",
            title: "（翻身減壓）",
            body: "臥床服務對象應每兩小時翻身一次（夜間可依個案狀況延長為三至四小時，但須有書面醫囑支持），翻身時評估皮膚狀況，記錄於「翻身拍背護理紀錄表」。",
          },
          {
            number: "第四條",
            title: "（輔助器材）",
            body: "高風險個案應：\n一、使用壓力分散床墊（氣墊床或泡棉減壓墊）\n二、使用減壓座墊（輪椅坐姿個案）\n三、骨突處（薦骨、腳跟、枕骨）加用減壓敷料",
          },
          {
            number: "第五條",
            title: "（皮膚評估）",
            body: "護理師應每週至少一次對高風險個案進行全身皮膚評估，尤其關注骨突部位（薦骨、臀部、腳跟、肘部），評估結果記錄於「壓力性損傷監測紀錄表」。",
          },
          {
            number: "第六條",
            title: "（營養支持）",
            body: "皮膚完整性受損風險個案，轉介營養師評估，確保蛋白質及熱量攝取充足，必要時調整飲食計畫。",
          },
        ],
      },
      {
        name: "第四章　壓傷處置",
        articles: [
          {
            number: "第七條",
            title: "（壓傷分期評估）",
            body: "發現壓傷時，護理師應依 NPUAP/EPUAP 分期（第一至第四期及不可分期）評估，通知醫師開立傷口照護醫囑，並擬定「壓傷照護計畫」。",
          },
          {
            number: "第八條",
            title: "（照護紀錄）",
            body: "每次換藥時記錄：傷口大小（長 × 寬 × 深）、分期、傷口基底組織描述、滲液量及氣味、敷料種類。每週以照片記錄傷口變化（取得家屬同意）。",
          },
          {
            number: "第九條",
            title: "（通知家屬）",
            body: "發現第二期以上壓傷（新發生）應於二十四小時內通知家屬，說明傷口現況、照護計畫及預防措施，並記錄於護理紀錄。",
          },
        ],
      },
      {
        name: "第五章　統計與品質改善",
        articles: [
          {
            number: "第十條",
            title: "（月報統計）",
            body: "每月統計壓傷發生率（新發生之第二期以上壓傷 / 每千住民日）及院內壓傷盛行率，提送品質改善會議。連續兩個月壓傷率上升應進行深度原因分析。",
          },
        ],
      },
      {
        name: "第六章　附則",
        articles: [
          {
            number: "第十一條",
            title: "（施行日期）",
            body: "本 SOP 自核定日起施行。",
          },
        ],
      },
    ],
  });
}

export function buildNursingHomeItem22CustomSheets(): SheetData[] {
  return [buildPressureInjurySop()];
}
