/**
 * 住宿型照顧機構評鑑項目 22「壓力性損傷預防及處理」自訂補充分頁
 *
 * 新增 2 個工作分頁：
 *   1. 壓傷預防與處置 SOP
 *   2. Braden 壓傷風險評估表（依 PDF 附件 8 翻譯為繁體中文）
 */
import type { SheetData } from "../excel-template-builder";
import { buildPolicyDocSheet } from "./nursing-home-policy-template";
import type { CellStyleMap, MergeMap } from "./sheet-style-kit";
import {
  TITLE_ROW_HEIGHT,
  NOTE_ROW_HEIGHT,
  HEADER_ROW_HEIGHT,
  setTitleRow,
  setNoteRow,
  setHeaderRow,
  setDataRow,
} from "./sheet-style-kit";

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

function buildBradenAssessmentSheet(): SheetData {
  const NUM_COLS = 5;
  const data: string[][] = [];
  const cellStyles: CellStyleMap = {};
  const merge: MergeMap = {};
  const rowlen: Record<string, number> = {};

  // Row 0：主標題
  data.push(["Braden 壓傷風險評估表", "", "", "", ""]);
  setTitleRow(cellStyles, merge, 0, NUM_COLS);
  rowlen["0"] = TITLE_ROW_HEIGHT;

  // Row 1：來源備註
  data.push([
    "資料來源：附件 8《Braden 壓傷風險評估表》｜評鑑 B13 壓力性損傷預防及處理參考工具｜總分範圍 6–23 分，分數越低風險越高",
    "", "", "", "",
  ]);
  setNoteRow(cellStyles, merge, 1, NUM_COLS);
  rowlen["1"] = NOTE_ROW_HEIGHT;

  // Row 2：表頭
  data.push(["項目", "1 分", "2 分", "3 分", "4 分"]);
  setHeaderRow(cellStyles, 2, NUM_COLS);
  rowlen["2"] = HEADER_ROW_HEIGHT;

  let r = 3;

  // 設定等級名稱列樣式（col 0 粗體靠左、col 1–4 粗體置中）
  function setGradeRow(rowIndex: number) {
    cellStyles[`${rowIndex}_0`] = { bold: true, ht: 1, vt: 0 };
    for (let c = 1; c < NUM_COLS; c++) {
      cellStyles[`${rowIndex}_${c}`] = { bold: true, ht: 0, vt: 0 };
    }
  }

  // ── 感覺 ─────────────────────────────────────────────────────────────────
  data.push(["感覺", "完全受限", "非常受限", "輕度受限", "未受損"]);
  setGradeRow(r);
  rowlen[String(r)] = 26;
  r++;

  data.push([
    "對壓力相關的不適做有意義反應的能力",
    "接受到疼痛刺激時，患者無法做出呻吟、退縮或抓握的反應（也可能是由於使用鎮定藥物或意識改變），絕大部分體表無法感知到疼痛刺激",
    "當接受到疼痛刺激時，只能以呻吟或躁動不安表示，全身有 1/2 以上的體表無法自覺到不適或疼痛刺激",
    "對言語指令有反應，但總是無法在感受到不適時表達其不適，或須由他人協助翻身；一至兩個肢體無法知覺到不適或疼痛刺激",
    "對言語指令有反應，對不適與疼痛刺激的知覺能力正常",
  ]);
  setDataRow(cellStyles, r, NUM_COLS);
  rowlen[String(r)] = 90;
  r++;

  // ── 潮濕 ─────────────────────────────────────────────────────────────────
  data.push(["潮濕", "持續潮濕", "潮濕", "有時潮濕", "很少潮濕"]);
  setGradeRow(r);
  rowlen[String(r)] = 26;
  r++;

  data.push([
    "皮膚暴露在潮濕環境中的程度",
    "皮膚幾乎一直處於潮濕狀態，每次移動患者時，患者的皮膚都是潮濕的",
    "皮膚時常是潮濕的，每班至少更換床單一次",
    "大約每天須更換床單兩次",
    "皮膚通常是乾燥的，依常規更換床單即可",
  ]);
  setDataRow(cellStyles, r, NUM_COLS);
  rowlen[String(r)] = 60;
  r++;

  // ── 活動力 ───────────────────────────────────────────────────────────────
  data.push(["活動力", "限制臥床", "可以坐椅子", "偶爾行走", "經常行走"]);
  setGradeRow(r);
  rowlen[String(r)] = 26;
  r++;

  data.push([
    "身體活動的程度",
    "活動範圍限制在床上",
    "無行走能力或行走能力嚴重受限，無法承受自己的體重，或須協助才能坐進椅子或輪椅",
    "每個班的大多數時間是在床上或椅上，但在白天偶然可在協助下，或不需要協助自行走動",
    "每天至少走出病室兩次，醒著時至少每 2 小時會在病房內走動",
  ]);
  setDataRow(cellStyles, r, NUM_COLS);
  rowlen[String(r)] = 70;
  r++;

  // ── 移動力 ───────────────────────────────────────────────────────────────
  data.push(["移動力", "完全無法移動", "嚴重受限", "輕度受限", "未受限"]);
  setGradeRow(r);
  rowlen[String(r)] = 26;
  r++;

  data.push([
    "改變或控制體位的能力",
    "無法憑自己的能力對身體或肢體位置做調整，即使是輕微的調整",
    "偶爾能輕微地調整身體或肢體位置，無法憑自己的能力做經常或大幅度肢體位置調整",
    "時常能憑自己的能力小幅度地自由調整身體或肢體位置",
    "能憑自己的能力時常改變體位及做大幅度的體位調整",
  ]);
  setDataRow(cellStyles, r, NUM_COLS);
  rowlen[String(r)] = 70;
  r++;

  // ── 營養 ─────────────────────────────────────────────────────────────────
  data.push(["營養", "非常差", "可能不足", "足夠", "非常好"]);
  setGradeRow(r);
  rowlen[String(r)] = 26;
  r++;

  data.push([
    "通常的進食型態",
    "從未吃完送來的正餐，很少吃超過送來的 1/3，水分攝取差，未食用液體營養補充品（如太空飲食），每天吃兩份或兩份以下蛋白質（肉、蛋、奶製品等）；無論個案是否接受靜脈營養補充，持續以下任意情況 5 天以上：禁食或進食清流質飲食",
    "很少吃完送來的正餐，一般來說只能吃完送來的 1/2，偶爾食用液體營養補充品，每天吃三份蛋白質（肉或豆、奶製品），所攝取的液態食物或管灌未達到理想需要量（如每日灌食量少於 1500 kcal）",
    "一般能吃完每餐的 1/2 以上，每日吃四餐含肉或奶製品的食物，偶爾拒絕吃一餐，或採管餵或腸外營養",
    "每頓正餐都吃完，從不拒絕用餐，在兩餐間偶爾還吃點心，不需要營養補充品；通常食用四份或以上的蛋白質（肉或豆、奶製品）",
  ]);
  setDataRow(cellStyles, r, NUM_COLS);
  rowlen[String(r)] = 180;
  r++;

  // ── 摩擦力和剪切力（僅 1–3 分，4 分欄留空）────────────────────────────
  data.push(["摩擦力和剪切力", "有問題", "有潛在問題", "無明顯問題", ""]);
  setGradeRow(r);
  rowlen[String(r)] = 26;
  r++;

  data.push([
    "",
    "須中度到極大的協助才能移動身體，且無法將身體完全抬起，在床單上不能滑動；臥床或坐輪椅時，時常會向下滑動，須極大協助；痙攣或躁動不安，使個案皮表幾乎持續受到摩擦",
    "不能有效移動，或只需些許協助；在移動過程中，皮膚可能在床單、椅子、約束帶等設備上出現一些滑動；大多數時候能在床或椅子上維持相當好的姿勢，但偶爾會滑下來",
    "能憑自己的能力在床上或椅上移動；在移動時可將自己完全抬起，總是能在床上或椅子上維持良好的姿勢",
    "",
  ]);
  setDataRow(cellStyles, r, NUM_COLS);
  rowlen[String(r)] = 120;
  r++;

  // ── 風險等級判定 ─────────────────────────────────────────────────────────
  data.push(["風險等級判定", "", "", "", ""]);
  cellStyles[`${r}_0`] = { bold: true, ht: 0, vt: 0, bg: "#F5F5F5" };
  for (let c = 1; c < NUM_COLS; c++) {
    cellStyles[`${r}_${c}`] = { bg: "#F5F5F5" };
  }
  merge[`${r}_0`] = { r, c: 0, rs: 1, cs: NUM_COLS };
  rowlen[String(r)] = 26;
  r++;

  data.push([
    "總分 ≤ 18 分，提示個案有發生壓傷的危險，建議採取預防措施。\n其中：評分 ≤ 9 分為極高風險；9 分 < 評分 ≤ 12 分為高風險；12 分 < 評分 ≤ 14 分為中風險；14 分 < 評分 ≤ 18 分為低風險。",
    "", "", "", "",
  ]);
  cellStyles[`${r}_0`] = { ht: 1, vt: 1, tb: 2 };
  merge[`${r}_0`] = { r, c: 0, rs: 1, cs: NUM_COLS };
  rowlen[String(r)] = 54;

  return {
    name: "Braden 壓傷風險評估表",
    data,
    config: {
      columnlen: { "0": 120, "1": 210, "2": 210, "3": 210, "4": 210 },
      rowlen,
      merge,
    },
    cellStyles,
  };
}

export function buildNursingHomeItem22CustomSheets(): SheetData[] {
  return [buildPressureInjurySop(), buildBradenAssessmentSheet()];
}
