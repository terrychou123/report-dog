import ExcelJS from "exceljs";
import * as os from "os";
import * as path from "path";

import {
  HEADER_FILL,
  HEADER_FONT,
  SUBHEADER_FILL,
  SUBHEADER_FONT,
  THIN_BORDER,
} from "./lib/excel-checklist-builder";

// ── 共用法規連結庫（各評鑑類型會引用） ──

const LAWS = {
  // 長照相關
  長照服務法: {
    name: "長期照顧服務法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070040",
    status: "✅ 已確認",
  },
  長照機構設立標準: {
    name: "長期照顧服務機構設立標準（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070048",
    status: "✅ 已確認",
  },
  長照機構設立許可管理辦法: {
    name: "長期照顧服務機構設立許可及管理辦法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070044",
    status: "✅ 已確認",
  },
  長照人員訓練辦法: {
    name: "長期照顧服務人員訓練認證繼續教育及登錄辦法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070045",
    status: "✅ 已確認",
  },
  長照服務申請給付辦法: {
    name: "長期照顧服務申請及給付辦法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070051",
    status: "✅ 已確認",
  },
  長照機構評鑑辦法: {
    name: "長期照顧服務機構評鑑辦法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0070042",
    status: "✅ 已確認",
  },
  長照定型化契約彙整: {
    name: "長照機構定型化契約範本彙整（1966 長照專區）",
    url: "https://1966.gov.tw/LTC/cp-6440-78036-207.html",
    status: "⚠️ 需驗證",
  },
  社區式定型化契約: {
    name: "社區式服務類長照機構定型化契約範本（衛福部）",
    url: "https://www.mohw.gov.tw/dl-87924-07e8a8ab-0ba1-4853-81f1-6734317e1a1f.html",
    status: "⚠️ 需驗證",
  },
  居家式定型化契約: {
    name: "居家式服務類長照機構定型化契約範本（衛福部）",
    url: "https://www.mohw.gov.tw/dl-87923-c9451cbc-7da0-4f5c-b877-6a721844bc3c.html",
    status: "⚠️ 需驗證",
  },
  住宿式定型化契約: {
    name: "機構住宿式服務類長照機構定型化契約範本（衛福部）",
    url: "https://www.mohw.gov.tw/dl-87925-04624480-8e1e-49b6-bf03-e4ad351c75cf.html",
    status: "⚠️ 需驗證",
  },
  定型化契約彙整頁: {
    name: "護理及健康照護司－定型化契約範本彙整頁",
    url: "https://dep.mohw.gov.tw/DONAHC/lp-3862-104.html",
    status: "⚠️ 需驗證",
  },
  長照操作指引: {
    name: "長照專業服務操作指引共通操作指引（衛福部）",
    url: "https://www.mohw.gov.tw/dl-78070-2ee0d1d0-44f0-4f7f-88a5-49e246165693.html",
    status: "⚠️ 需驗證",
  },
  長照評鑑基準: {
    name: "長期照顧服務機構評鑑基準（衛福部）",
    url: "https://www.mohw.gov.tw/cp-18-77178-1.html",
    status: "⚠️ 需驗證",
  },

  // 老人福利
  老人福利法: {
    name: "老人福利法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0050037",
    status: "✅ 已確認",
  },
  老人福利機構設立標準: {
    name: "老人福利機構設立標準（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=D0050039",
    status: "✅ 已確認",
  },
  老人福利機構評鑑辦法: {
    name: "衛生福利部辦理老人福利機構評鑑及獎勵辦法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=d0050041",
    status: "✅ 已確認",
  },
  老福機構評鑑專區: {
    name: "老人福利機構評鑑專區（社家署）",
    url: "https://www.sfaa.gov.tw/SFAA/Pages/List.aspx?nodeid=463",
    status: "⚠️ 需驗證",
  },

  // 護理相關
  護理人員法: {
    name: "護理人員法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0020166",
    status: "✅ 已確認",
  },
  護理機構分類設置標準: {
    name: "護理機構分類設置標準（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=L0020035",
    status: "✅ 已確認",
  },
  護理機構評鑑辦法: {
    name: "護理機構評鑑辦法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0020184",
    status: "✅ 已確認",
  },

  // 醫療
  醫療法: {
    name: "醫療法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=L0020021",
    status: "✅ 已確認",
  },
  病人自主權利法: {
    name: "病人自主權利法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0020189",
    status: "✅ 已確認",
  },
  醫院評鑑基準醫事司: {
    name: "醫院評鑑基準（衛福部醫事司）",
    url: "https://dep.mohw.gov.tw/DOMA/lp-948-106.html",
    status: "⚠️ 需驗證",
  },
  醫策會評鑑: {
    name: "醫策會 醫院評鑑及教學醫院評鑑",
    url: "https://www.jct.org.tw/np-37-1.html",
    status: "⚠️ 需驗證",
  },

  // 精神衛生
  精神衛生法: {
    name: "精神衛生法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0020030",
    status: "✅ 已確認",
  },
  精神復健機構管理辦法: {
    name: "精神復健機構設立擴充許可及管理辦法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0010006",
    status: "✅ 已確認",
  },
  精神復健機構評鑑基準: {
    name: "精神復健機構評鑑基準（衛福部心理健康司）",
    url: "https://dep.mohw.gov.tw/DOMHAOH/cp-372-82089-107.html",
    status: "⚠️ 需驗證",
  },

  // 兒少
  兒少法: {
    name: "兒童及少年福利與權益保障法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=D0050001",
    status: "✅ 已確認",
  },
  兒少機構設置標準: {
    name: "兒童及少年福利機構設置標準（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0050015",
    status: "✅ 已確認",
  },

  // 身心障礙
  身障法: {
    name: "身心障礙者權益保障法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0050046",
    status: "✅ 已確認",
  },
  身障機構設施人員標準: {
    name: "身心障礙福利機構設施及人員配置標準（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=D0050048",
    status: "✅ 已確認",
  },
  身障機構評鑑專區: {
    name: "身心障礙福利機構評鑑專區（社家署）",
    url: "https://www.sfaa.gov.tw/SFAA/Pages/List.aspx?nodeid=1193",
    status: "⚠️ 需驗證",
  },

  // 通用法規
  個資法: {
    name: "個人資料保護法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=I0050021",
    status: "✅ 已確認",
  },
  個資法施行細則: {
    name: "個人資料保護法施行細則（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=I0050022",
    status: "✅ 已確認",
  },
  性騷擾防治法: {
    name: "性騷擾防治法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0050074",
    status: "✅ 已確認",
  },
  性騷擾防治準則: {
    name: "性騷擾防治準則（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0050136",
    status: "✅ 已確認",
  },
  性侵害犯罪防治法: {
    name: "性侵害犯罪防治法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0080079",
    status: "✅ 已確認",
  },
  傳染病防治法: {
    name: "傳染病防治法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0050001",
    status: "✅ 已確認",
  },
  感染管制指引: {
    name: "長期照護機構感染管制措施指引（疾管署）",
    url: "https://at.cdc.gov.tw/HBY71i",
    status: "✅ 已確認",
  },
  感染管制指引PDF: {
    name: "長期照護機構感染管制措施指引 PDF（疾管署）",
    url: "https://www.cdc.gov.tw/Uploads/88eb4738-ccb8-467b-bb95-b85ec1d40206.pdf",
    status: "✅ 已確認",
  },
  食安法: {
    name: "食品安全衛生管理法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0040001",
    status: "✅ 已確認",
  },
  食品GHP: {
    name: "食品良好衛生規範準則 GHP（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=L0040122",
    status: "✅ 已確認",
  },
  建築法: {
    name: "建築法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=D0070109",
    status: "✅ 已確認",
  },
  消防法: {
    name: "消防法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=D0120001",
    status: "✅ 已確認",
  },
  勞基法: {
    name: "勞動基準法（全國法規資料庫）",
    url: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0030001",
    status: "✅ 已確認",
  },
  長者防跌: {
    name: "長者防跌專區（國民健康署）",
    url: "https://www.hpa.gov.tw/Pages/List.aspx?nodeid=4624",
    status: "⚠️ 需驗證",
  },

  // 評鑑專區
  產後護理評鑑專區: {
    name: "產後護理之家評鑑專區（護理及健康照護司）",
    url: "https://dep.mohw.gov.tw/DONAHC/np-3855-104.html",
    status: "⚠️ 需驗證",
  },
  一般護理之家評鑑專區: {
    name: "一般護理之家評鑑專區（護理及健康照護司）",
    url: "https://dep.mohw.gov.tw/DONAHC/np-3848-104.html",
    status: "⚠️ 需驗證",
  },
  一般護理之家評鑑基準: {
    name: "114年度一般護理之家評鑑基準（護理及健康照護司）",
    url: "https://dep.mohw.gov.tw/DONAHC/cp-3850-80949-104.html",
    status: "⚠️ 需驗證",
  },
  居家護理所評鑑專區: {
    name: "居家護理所評鑑專區（護理及健康照護司）",
    url: "https://dep.mohw.gov.tw/donahc/np-3858-104.html",
    status: "⚠️ 需驗證",
  },
  托嬰評鑑指標: {
    name: "臺北市托育機構評鑑指標（社會局）",
    url: "https://dosw.gov.taipei/News_Content.aspx?n=2A8D0B016E99A745&s=EF83EFC3BD3A315F",
    status: "⚠️ 需驗證",
  },
  托嬰專區社家署: {
    name: "托嬰機構專區（社家署）",
    url: "https://www.sfaa.gov.tw/SFAA/Pages/Detail.aspx?nodeid=970&pid=9442",
    status: "⚠️ 需驗證",
  },
} as const;

type LawKey = keyof typeof LAWS;

// ── 各評鑑類型的資料定義 ──

interface EvalItem {
  itemNo: string; // 評鑑項目編號
  itemName: string; // 評鑑項目名稱
  lawKeys: LawKey[]; // 引用的法規 key
}

interface EvalType {
  sheetName: string; // Excel 工作表名稱（最多 31 字元）
  title: string; // 工作表標題
  items: EvalItem[];
}

const evaluationTypes: EvalType[] = [
  // ── 1. 居家服務機構 ──
  {
    sheetName: "居家服務機構",
    title: "居家服務機構評鑑法規參考連結",
    items: [
      { itemNo: "第3項", itemName: "服務契約", lawKeys: ["居家式定型化契約", "定型化契約彙整頁", "長照定型化契約彙整"] },
      { itemNo: "第4項", itemName: "個案資料保密", lawKeys: ["個資法", "個資法施行細則"] },
      { itemNo: "第9項", itemName: "服務員身分認證及保險", lawKeys: ["長照服務法", "長照人員訓練辦法", "勞基法"] },
      { itemNo: "第10項", itemName: "收結案辦法", lawKeys: ["長照服務法", "長照服務申請給付辦法", "長照機構設立許可管理辦法"] },
      { itemNo: "第13項", itemName: "協助服藥", lawKeys: ["護理人員法", "長照操作指引", "長照機構設立標準"] },
      { itemNo: "第14項", itemName: "緊急事件處理", lawKeys: ["長照機構設立許可管理辦法", "長照服務法"] },
      { itemNo: "第19項", itemName: "人力配置", lawKeys: ["長照機構設立標準", "長照機構設立許可管理辦法"] },
      { itemNo: "第20項", itemName: "年度教育訓練", lawKeys: ["長照人員訓練辦法", "長照服務法"] },
      { itemNo: "第22項", itemName: "督導人員資格", lawKeys: ["長照機構設立標準", "長照人員訓練辦法"] },
      { itemNo: "第23項", itemName: "健康檢查", lawKeys: ["傳染病防治法", "勞基法"] },
      { itemNo: "第25項", itemName: "財務帳冊", lawKeys: ["長照服務法", "長照機構設立許可管理辦法"] },
      { itemNo: "第26項", itemName: "意外事件SOP及通報", lawKeys: ["長照機構設立許可管理辦法", "長照服務法"] },
      { itemNo: "第27項", itemName: "急救物品及CPR證照", lawKeys: ["護理人員法", "長照操作指引"] },
      { itemNo: "第28項", itemName: "性騷擾防治", lawKeys: ["性騷擾防治法", "性騷擾防治準則", "性侵害犯罪防治法"] },
    ],
  },

  // ── 2. 住宿型照顧機構 ──
  {
    sheetName: "住宿型照顧機構",
    title: "住宿型照顧機構評鑑法規參考連結",
    items: [
      { itemNo: "A1", itemName: "工作規則", lawKeys: ["勞基法", "長照服務法"] },
      { itemNo: "A2", itemName: "收住管理", lawKeys: ["長照服務法", "長照機構設立許可管理辦法", "住宿式定型化契約"] },
      { itemNo: "A5", itemName: "保護通報及虐待防治", lawKeys: ["老人福利法", "身障法", "性騷擾防治法", "性侵害犯罪防治法"] },
      { itemNo: "A6", itemName: "申訴處理", lawKeys: ["長照服務法", "長照機構設立許可管理辦法"] },
      { itemNo: "A7", itemName: "主任資格", lawKeys: ["長照機構設立標準", "長照人員訓練辦法"] },
      { itemNo: "A8", itemName: "社工人力", lawKeys: ["長照機構設立標準", "老人福利機構設立標準"] },
      { itemNo: "A9", itemName: "護理人力", lawKeys: ["護理人員法", "護理機構分類設置標準", "長照機構設立標準"] },
      { itemNo: "A11", itemName: "照顧服務員", lawKeys: ["長照人員訓練辦法", "長照機構設立標準"] },
      { itemNo: "A12", itemName: "教育訓練", lawKeys: ["長照人員訓練辦法"] },
      { itemNo: "A13", itemName: "健康檢查", lawKeys: ["傳染病防治法", "勞基法"] },
      { itemNo: "A14", itemName: "財務管理", lawKeys: ["長照服務法", "長照機構設立許可管理辦法"] },
      { itemNo: "B19", itemName: "膳食營養", lawKeys: ["食安法", "食品GHP"] },
      { itemNo: "B24", itemName: "用藥管理", lawKeys: ["護理人員法", "長照操作指引"] },
      { itemNo: "B25", itemName: "感染管制", lawKeys: ["傳染病防治法", "感染管制指引", "感染管制指引PDF"] },
      { itemNo: "B28", itemName: "約束使用", lawKeys: ["長照服務法", "長照操作指引"] },
      { itemNo: "C", itemName: "建築安全/消防設備/無障礙設施", lawKeys: ["建築法", "消防法", "身障法"] },
    ],
  },

  // ── 3. 老人福利機構 ──
  {
    sheetName: "老人福利機構",
    title: "老人福利機構評鑑法規參考連結",
    items: [
      { itemNo: "整體", itemName: "立案設置依據", lawKeys: ["老人福利法", "老人福利機構設立標準", "老人福利機構評鑑辦法"] },
      { itemNo: "A", itemName: "工作規則/勞動條件", lawKeys: ["勞基法", "老人福利法"] },
      { itemNo: "A", itemName: "收住管理/服務契約", lawKeys: ["住宿式定型化契約", "定型化契約彙整頁", "長照定型化契約彙整"] },
      { itemNo: "A", itemName: "保護通報及虐待防治", lawKeys: ["老人福利法", "性騷擾防治法", "性侵害犯罪防治法"] },
      { itemNo: "A", itemName: "人力配置（主任/社工/護理/照服員）", lawKeys: ["老人福利機構設立標準", "護理人員法", "長照人員訓練辦法"] },
      { itemNo: "A", itemName: "教育訓練", lawKeys: ["長照人員訓練辦法", "老人福利法"] },
      { itemNo: "A", itemName: "健康檢查", lawKeys: ["傳染病防治法", "勞基法"] },
      { itemNo: "A", itemName: "財務管理", lawKeys: ["老人福利法", "老人福利機構設立標準"] },
      { itemNo: "B", itemName: "膳食營養", lawKeys: ["食安法", "食品GHP"] },
      { itemNo: "B", itemName: "用藥管理", lawKeys: ["護理人員法", "長照操作指引"] },
      { itemNo: "B", itemName: "感染管制", lawKeys: ["傳染病防治法", "感染管制指引", "感染管制指引PDF"] },
      { itemNo: "B", itemName: "跌倒監測/預防", lawKeys: ["長者防跌", "長照操作指引"] },
      { itemNo: "B", itemName: "約束使用", lawKeys: ["老人福利法", "長照操作指引"] },
      { itemNo: "B", itemName: "個案資料保密", lawKeys: ["個資法", "個資法施行細則"] },
      { itemNo: "C", itemName: "建築安全/消防/無障礙設施", lawKeys: ["建築法", "消防法", "身障法"] },
    ],
  },

  // ── 4. 醫院評鑑 ──
  {
    sheetName: "醫院評鑑",
    title: "醫院評鑑法規參考連結",
    items: [
      { itemNo: "整體", itemName: "醫院評鑑基準依據", lawKeys: ["醫療法", "醫院評鑑基準醫事司", "醫策會評鑑"] },
      { itemNo: "1.1", itemName: "組織架構/經營", lawKeys: ["醫療法", "勞基法"] },
      { itemNo: "1.2-1.3", itemName: "醫事人員人力資源", lawKeys: ["醫療法", "護理人員法"] },
      { itemNo: "1.4", itemName: "病歷管理/資訊安全", lawKeys: ["醫療法", "個資法"] },
      { itemNo: "1.5", itemName: "建築安全/消防/感染管制", lawKeys: ["建築法", "消防法", "傳染病防治法", "感染管制指引"] },
      { itemNo: "1.6", itemName: "病人服務/知情同意", lawKeys: ["醫療法", "病人自主權利法"] },
      { itemNo: "1.7", itemName: "風險管理/異常事件通報", lawKeys: ["醫療法", "長照服務法"] },
      { itemNo: "2.1", itemName: "病人權利保障", lawKeys: ["病人自主權利法", "醫療法", "個資法"] },
      { itemNo: "", itemName: "性騷擾/性侵害防治", lawKeys: ["性騷擾防治法", "性騷擾防治準則", "性侵害犯罪防治法"] },
      { itemNo: "", itemName: "食品安全（膳食供應）", lawKeys: ["食安法", "食品GHP"] },
    ],
  },

  // ── 5. 產後護理之家 ──
  {
    sheetName: "產後護理之家",
    title: "產後護理之家評鑑法規參考連結",
    items: [
      { itemNo: "整體", itemName: "評鑑基準依據", lawKeys: ["護理機構評鑑辦法", "護理機構分類設置標準", "產後護理評鑑專區"] },
      { itemNo: "A1", itemName: "設置標準", lawKeys: ["護理機構分類設置標準", "護理人員法"] },
      { itemNo: "A2", itemName: "人力配置", lawKeys: ["護理機構分類設置標準", "護理人員法"] },
      { itemNo: "A4", itemName: "財務管理", lawKeys: ["護理人員法", "護理機構分類設置標準"] },
      { itemNo: "A5", itemName: "教育訓練", lawKeys: ["護理人員法", "長照人員訓練辦法"] },
      { itemNo: "B8", itemName: "新生兒照護", lawKeys: ["兒少法", "護理人員法"] },
      { itemNo: "B10", itemName: "感染管制", lawKeys: ["傳染病防治法", "感染管制指引"] },
      { itemNo: "B11", itemName: "緊急處理", lawKeys: ["護理人員法", "醫療法"] },
      { itemNo: "B12", itemName: "用藥管理", lawKeys: ["護理人員法", "長照操作指引"] },
      { itemNo: "C14", itemName: "建築安全/消防", lawKeys: ["建築法", "消防法"] },
      { itemNo: "", itemName: "個案資料保密", lawKeys: ["個資法", "個資法施行細則"] },
      { itemNo: "", itemName: "服務契約", lawKeys: ["定型化契約彙整頁", "長照定型化契約彙整"] },
    ],
  },

  // ── 6. 居家護理所 ──
  {
    sheetName: "居家護理所",
    title: "居家護理所評鑑法規參考連結",
    items: [
      { itemNo: "整體", itemName: "評鑑基準依據", lawKeys: ["護理機構評鑑辦法", "護理機構分類設置標準", "居家護理所評鑑專區"] },
      { itemNo: "A1", itemName: "設置標準", lawKeys: ["護理機構分類設置標準", "護理人員法"] },
      { itemNo: "A2", itemName: "人力配置", lawKeys: ["護理機構分類設置標準", "護理人員法"] },
      { itemNo: "A4", itemName: "教育訓練", lawKeys: ["護理人員法", "長照人員訓練辦法"] },
      { itemNo: "A5", itemName: "財務管理", lawKeys: ["護理人員法"] },
      { itemNo: "B8", itemName: "感染管制", lawKeys: ["傳染病防治法", "感染管制指引", "感染管制指引PDF"] },
      { itemNo: "", itemName: "個案資料保密", lawKeys: ["個資法", "個資法施行細則"] },
      { itemNo: "", itemName: "服務契約", lawKeys: ["居家式定型化契約", "定型化契約彙整頁"] },
    ],
  },

  // ── 7. 一般護理之家 ──
  {
    sheetName: "一般護理之家",
    title: "一般護理之家評鑑法規參考連結",
    items: [
      { itemNo: "整體", itemName: "評鑑基準依據", lawKeys: ["護理機構評鑑辦法", "護理機構分類設置標準", "一般護理之家評鑑專區"] },
      { itemNo: "A1", itemName: "設置標準", lawKeys: ["護理機構分類設置標準", "護理人員法"] },
      { itemNo: "A2", itemName: "人力配置", lawKeys: ["護理機構分類設置標準", "護理人員法"] },
      { itemNo: "A4", itemName: "教育訓練", lawKeys: ["護理人員法", "長照人員訓練辦法"] },
      { itemNo: "A5", itemName: "財務管理", lawKeys: ["護理人員法"] },
      { itemNo: "B8", itemName: "感染管制", lawKeys: ["傳染病防治法", "感染管制指引", "感染管制指引PDF"] },
      { itemNo: "C9", itemName: "建築安全", lawKeys: ["建築法"] },
      { itemNo: "C10", itemName: "消防安全", lawKeys: ["消防法"] },
      { itemNo: "C11", itemName: "無障礙設施", lawKeys: ["身障法", "建築法"] },
      { itemNo: "", itemName: "服務契約", lawKeys: ["住宿式定型化契約", "定型化契約彙整頁"] },
      { itemNo: "", itemName: "個案資料保密", lawKeys: ["個資法"] },
      { itemNo: "", itemName: "性騷擾防治", lawKeys: ["性騷擾防治法", "性侵害犯罪防治法"] },
      { itemNo: "", itemName: "膳食營養/廚房衛生", lawKeys: ["食安法", "食品GHP"] },
    ],
  },

  // ── 8. 精神護理之家 ──
  {
    sheetName: "精神護理之家",
    title: "精神護理之家評鑑法規參考連結",
    items: [
      { itemNo: "A1", itemName: "立案設置", lawKeys: ["護理機構分類設置標準", "精神衛生法", "護理人員法"] },
      { itemNo: "A2", itemName: "人力配置", lawKeys: ["護理機構分類設置標準", "護理人員法", "精神衛生法"] },
      { itemNo: "A3", itemName: "組織管理", lawKeys: ["精神衛生法", "護理人員法"] },
      { itemNo: "A4", itemName: "工作規則", lawKeys: ["勞基法"] },
      { itemNo: "A5", itemName: "教育訓練", lawKeys: ["護理人員法", "長照人員訓練辦法"] },
      { itemNo: "A6", itemName: "財務管理", lawKeys: ["護理人員法", "精神衛生法"] },
      { itemNo: "B12", itemName: "藥物管理", lawKeys: ["護理人員法", "精神衛生法"] },
      { itemNo: "B15", itemName: "感染管制", lawKeys: ["傳染病防治法", "感染管制指引"] },
      { itemNo: "C31", itemName: "建築安全", lawKeys: ["建築法"] },
      { itemNo: "C32", itemName: "消防安全", lawKeys: ["消防法"] },
      { itemNo: "D34", itemName: "住民權益保障", lawKeys: ["精神衛生法", "病人自主權利法", "個資法"] },
      { itemNo: "D35", itemName: "申訴機制", lawKeys: ["精神衛生法", "護理人員法"] },
      { itemNo: "", itemName: "性騷擾防治", lawKeys: ["性騷擾防治法", "性侵害犯罪防治法"] },
    ],
  },

  // ── 9. 精神復健機構 ──
  {
    sheetName: "精神復健機構",
    title: "精神復健機構（日間型/住宿型）評鑑法規參考連結",
    items: [
      { itemNo: "整體", itemName: "評鑑基準依據", lawKeys: ["精神衛生法", "精神復健機構管理辦法", "精神復健機構評鑑基準"] },
      { itemNo: "第1章", itemName: "立案設置/人力配置", lawKeys: ["精神復健機構管理辦法", "精神衛生法"] },
      { itemNo: "第1章", itemName: "工作規則/勞動條件", lawKeys: ["勞基法"] },
      { itemNo: "第1章", itemName: "教育訓練", lawKeys: ["精神衛生法", "長照人員訓練辦法"] },
      { itemNo: "第2章", itemName: "藥物管理", lawKeys: ["精神衛生法", "護理人員法"] },
      { itemNo: "第2章", itemName: "感染管制", lawKeys: ["傳染病防治法", "感染管制指引"] },
      { itemNo: "第3章", itemName: "建築安全/消防", lawKeys: ["建築法", "消防法"] },
      { itemNo: "第3章", itemName: "住民/學員權益保障", lawKeys: ["精神衛生法", "病人自主權利法", "個資法"] },
      { itemNo: "第3章", itemName: "性騷擾防治", lawKeys: ["性騷擾防治法", "性侵害犯罪防治法"] },
      { itemNo: "", itemName: "膳食營養/廚房衛生", lawKeys: ["食安法", "食品GHP"] },
    ],
  },

  // ── 10. 托嬰中心 ──
  {
    sheetName: "托嬰中心",
    title: "托嬰中心評鑑法規參考連結",
    items: [
      { itemNo: "整體", itemName: "評鑑指標依據", lawKeys: ["兒少法", "兒少機構設置標準", "托嬰評鑑指標"] },
      { itemNo: "一", itemName: "立案行政", lawKeys: ["兒少法", "兒少機構設置標準"] },
      { itemNo: "一", itemName: "人事領導/人力配置", lawKeys: ["兒少機構設置標準", "勞基法"] },
      { itemNo: "一", itemName: "財務管理", lawKeys: ["兒少法"] },
      { itemNo: "一", itemName: "兒童權益保障", lawKeys: ["兒少法", "個資法"] },
      { itemNo: "三", itemName: "健康管理/傳染病通報", lawKeys: ["傳染病防治法", "兒少法"] },
      { itemNo: "三", itemName: "健康安全飲食", lawKeys: ["食安法", "食品GHP"] },
      { itemNo: "三", itemName: "安全維護/建築消防", lawKeys: ["建築法", "消防法", "兒少機構設置標準"] },
      { itemNo: "", itemName: "性騷擾/性侵害防治", lawKeys: ["性騷擾防治法", "性侵害犯罪防治法", "兒少法"] },
      { itemNo: "", itemName: "服務契約", lawKeys: ["定型化契約彙整頁", "托嬰專區社家署"] },
    ],
  },

  // ── 11. 兒少安置機構 ──
  {
    sheetName: "兒少安置機構",
    title: "兒少安置機構（教養機構）評鑑法規參考連結",
    items: [
      { itemNo: "壹1", itemName: "立案管理", lawKeys: ["兒少法", "兒少機構設置標準"] },
      { itemNo: "壹2", itemName: "人力配置", lawKeys: ["兒少機構設置標準", "兒少法"] },
      { itemNo: "壹4", itemName: "工作規則", lawKeys: ["勞基法"] },
      { itemNo: "壹5", itemName: "教育訓練", lawKeys: ["兒少法", "長照人員訓練辦法"] },
      { itemNo: "壹6", itemName: "權益保障", lawKeys: ["兒少法", "個資法"] },
      { itemNo: "貳", itemName: "建築安全/消防", lawKeys: ["建築法", "消防法"] },
      { itemNo: "貳", itemName: "無障礙設施", lawKeys: ["身障法", "建築法"] },
      { itemNo: "參", itemName: "感染管制/健康管理", lawKeys: ["傳染病防治法", "感染管制指引"] },
      { itemNo: "肆", itemName: "財務管理", lawKeys: ["兒少法"] },
      { itemNo: "", itemName: "性騷擾/性侵害防治", lawKeys: ["性騷擾防治法", "性侵害犯罪防治法", "兒少法"] },
      { itemNo: "", itemName: "膳食營養/廚房衛生", lawKeys: ["食安法", "食品GHP"] },
    ],
  },

  // ── 12. 身心障礙福利機構 ──
  {
    sheetName: "身心障礙福利機構",
    title: "身心障礙福利機構評鑑法規參考連結",
    items: [
      { itemNo: "整體", itemName: "評鑑依據", lawKeys: ["身障法", "身障機構設施人員標準", "身障機構評鑑專區"] },
      { itemNo: "一", itemName: "立案管理", lawKeys: ["身障法", "身障機構設施人員標準"] },
      { itemNo: "一", itemName: "人力配置", lawKeys: ["身障機構設施人員標準", "身障法"] },
      { itemNo: "一", itemName: "工作規則/勞動條件", lawKeys: ["勞基法"] },
      { itemNo: "一", itemName: "教育訓練", lawKeys: ["身障法", "長照人員訓練辦法"] },
      { itemNo: "一", itemName: "財務管理", lawKeys: ["身障法"] },
      { itemNo: "二", itemName: "建築安全/消防", lawKeys: ["建築法", "消防法"] },
      { itemNo: "二", itemName: "無障礙設施", lawKeys: ["身障法", "建築法"] },
      { itemNo: "二", itemName: "生活環境設備", lawKeys: ["身障機構設施人員標準"] },
      { itemNo: "三", itemName: "照顧計畫/專業服務", lawKeys: ["身障法", "身障機構設施人員標準"] },
      { itemNo: "三", itemName: "感染管制", lawKeys: ["傳染病防治法", "感染管制指引"] },
      { itemNo: "三", itemName: "用藥管理", lawKeys: ["護理人員法", "長照操作指引"] },
      { itemNo: "三", itemName: "權益保障", lawKeys: ["身障法", "個資法"] },
      { itemNo: "", itemName: "性騷擾/性侵害防治", lawKeys: ["性騷擾防治法", "性侵害犯罪防治法"] },
      { itemNo: "", itemName: "膳食營養/廚房衛生", lawKeys: ["食安法", "食品GHP"] },
      { itemNo: "", itemName: "服務契約", lawKeys: ["住宿式定型化契約", "定型化契約彙整頁"] },
    ],
  },
];

// ── 產出 Excel ──

async function main() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "報告汪";
  workbook.created = new Date();

  for (const evalType of evaluationTypes) {
    const ws = workbook.addWorksheet(evalType.sheetName);

    // 設定欄寬
    ws.getColumn("A").width = 12;
    ws.getColumn("B").width = 36;
    ws.getColumn("C").width = 52;
    ws.getColumn("D").width = 70;
    ws.getColumn("E").width = 12;

    // 標題列
    const titleRow = ws.addRow([evalType.title, "", "", "", ""]);
    ws.mergeCells("A1:E1");
    titleRow.height = 28;
    titleRow.getCell(1).fill = HEADER_FILL;
    titleRow.getCell(1).font = { ...HEADER_FONT, size: 13 };
    titleRow.getCell(1).alignment = { horizontal: "center", vertical: "middle" };

    // 表頭列
    const headerRow = ws.addRow(["評鑑項目編號", "評鑑項目名稱", "連結名稱", "URL", "狀態"]);
    headerRow.height = 22;
    headerRow.eachCell((cell) => {
      cell.fill = HEADER_FILL;
      cell.font = HEADER_FONT;
      cell.border = THIN_BORDER;
      cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
    });

    // 資料列
    for (const item of evalType.items) {
      // 項目子標題列
      const label = item.itemNo
        ? `${item.itemNo}　${item.itemName}`
        : item.itemName;
      const subRow = ws.addRow([label, "", "", "", ""]);
      ws.mergeCells(`A${subRow.number}:E${subRow.number}`);
      subRow.height = 24;
      const subCell = subRow.getCell(1);
      subCell.fill = SUBHEADER_FILL;
      subCell.font = SUBHEADER_FONT;
      subCell.border = THIN_BORDER;
      subCell.alignment = { vertical: "middle", wrapText: true, indent: 1 };

      // 各法規連結
      for (const key of item.lawKeys) {
        const law = LAWS[key];
        const dataRow = ws.addRow([
          item.itemNo,
          item.itemName,
          law.name,
          law.url,
          law.status,
        ]);
        dataRow.height = 36;
        dataRow.eachCell((cell, colNumber) => {
          cell.border = THIN_BORDER;
          cell.alignment = { vertical: "top", wrapText: true };
          if (colNumber === 4) {
            cell.value = { text: law.url, hyperlink: law.url };
            cell.font = { color: { argb: "FF0563C1" }, underline: true };
          }
          if (colNumber === 5) {
            cell.alignment = { horizontal: "center", vertical: "middle" };
          }
        });
      }
    }

    // 凍結前兩列
    ws.views = [{ state: "frozen", xSplit: 0, ySplit: 2 }];
  }

  const desktopPath = path.join(
    os.homedir(),
    "Desktop",
    "各類評鑑法規參考連結（除日照中心）.xlsx"
  );
  await workbook.xlsx.writeFile(desktopPath);
  console.log(`✅ 已儲存至：${desktopPath}`);
  console.log(`   共 ${evaluationTypes.length} 個工作表（評鑑類型）`);
}

main().catch((err) => {
  console.error("❌ 產生失敗：", err);
  process.exit(1);
});
