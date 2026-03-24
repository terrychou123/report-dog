import ExcelJS from "exceljs";
import * as path from "path";
import * as os from "os";

const HEADER_FILL: ExcelJS.Fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FF4472C4" },
};

const HEADER_FONT: Partial<ExcelJS.Font> = {
  bold: true,
  color: { argb: "FFFFFFFF" },
  size: 11,
};

const SUBHEADER_FILL: ExcelJS.Fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FFD9E1F2" },
};

const SUBHEADER_FONT: Partial<ExcelJS.Font> = {
  bold: true,
  size: 11,
};

const THIN_BORDER: Partial<ExcelJS.Borders> = {
  top: { style: "thin" },
  left: { style: "thin" },
  bottom: { style: "thin" },
  right: { style: "thin" },
};

interface CheckItem {
  id: string;
  content: string;
}

interface ItemGroup {
  groupTitle: string;
  items: CheckItem[];
}

function addSheet(
  workbook: ExcelJS.Workbook,
  sheetName: string,
  title: string,
  groups: ItemGroup[]
) {
  const ws = workbook.addWorksheet(sheetName);

  // Column widths
  ws.getColumn("A").width = 10;
  ws.getColumn("B").width = 52;
  ws.getColumn("C").width = 10;
  ws.getColumn("D").width = 10;
  ws.getColumn("E").width = 10;
  ws.getColumn("F").width = 10;
  ws.getColumn("G").width = 18;
  ws.getColumn("H").width = 18;
  ws.getColumn("I").width = 22;

  // Title row
  const titleRow = ws.addRow([title, "", "", "", "", "", "", "", ""]);
  ws.mergeCells(`A${titleRow.number}:I${titleRow.number}`);
  titleRow.getCell("A").font = { bold: true, size: 13 };
  titleRow.getCell("A").alignment = { horizontal: "center", vertical: "middle" };
  titleRow.height = 24;

  // Header row
  const headerRow = ws.addRow(["項次", "檢核項目內容", "完全符合", "部分符合", "不符合", "困難", "優勢", "劣勢", "待改進事項"]);
  headerRow.eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
    cell.border = THIN_BORDER;
  });
  headerRow.height = 20;

  // Data rows
  for (const group of groups) {
    // Group header
    const groupRow = ws.addRow([group.groupTitle, "", "", "", "", "", "", "", ""]);
    ws.mergeCells(`A${groupRow.number}:I${groupRow.number}`);
    groupRow.getCell("A").fill = SUBHEADER_FILL;
    groupRow.getCell("A").font = SUBHEADER_FONT;
    groupRow.getCell("A").border = THIN_BORDER;
    groupRow.height = 18;

    // Items
    for (const item of group.items) {
      const dataRow = ws.addRow([item.id, item.content, "", "", "", "", "", "", ""]);
      dataRow.getCell("A").alignment = { horizontal: "center", vertical: "middle" };
      dataRow.getCell("B").alignment = { wrapText: true, vertical: "middle" };
      dataRow.eachCell((cell) => {
        cell.border = THIN_BORDER;
      });
      dataRow.height = 18;
    }
  }
}

// ─── 壹-1 權益保障 ───────────────────────────────────────────
const sheet1Groups: ItemGroup[] = [
  {
    groupTitle: "一、生存權（確保服務使用者基本生活需求）",
    items: [
      { id: "一-1", content: "確保服務使用者得到日常生活所需的營養餐食，且符合個別飲食需求（如軟食、流質、宗教飲食等）" },
      { id: "一-2", content: "提供乾淨、安全的飲用水，並確保服務使用者隨時可取得" },
      { id: "一-3", content: "提供符合個人尊嚴的個人衛生照顧（如沐浴、口腔清潔、如廁協助）" },
      { id: "一-4", content: "依服務使用者需求提供適當的輔具（如輪椅、助行器、溝通輔具），並定期維護" },
      { id: "一-5", content: "確保服務使用者居住環境溫度、採光與通風符合舒適與健康標準" },
    ],
  },
  {
    groupTitle: "二、健康權（維護服務使用者身心健康）",
    items: [
      { id: "二-1", content: "定期評估服務使用者健康狀況，並依評估結果提供適切的健康照護" },
      { id: "二-2", content: "建立用藥管理機制，確保服務使用者按時、正確服藥，並有記錄" },
      { id: "二-3", content: "當服務使用者出現健康異常時，有即時通報家屬/監護人及醫療轉介的處理流程" },
    ],
  },
  {
    groupTitle: "三、安全權（保障服務使用者人身安全）",
    items: [
      { id: "三-1", content: "機構環境無障礙設施完善，地板防滑，走道淨空，防止跌倒事故" },
      { id: "三-2", content: "訂有緊急事故處理標準作業程序，工作人員熟知且定期演練" },
      { id: "三-3", content: "機構門禁及安全監控措施完善，防止服務使用者發生走失或外來人員任意進入" },
      { id: "三-4", content: "無對服務使用者施以身體約束、不當隔離或懲罰等不當照顧情事" },
      { id: "三-5", content: "定期對工作人員進行防範虐待、不當對待之教育訓練，並有通報機制" },
    ],
  },
  {
    groupTitle: "四、選擇權（尊重服務使用者的自主決定）",
    items: [
      { id: "四-1", content: "尊重服務使用者對日常生活的選擇（如起床時間、飲食偏好、休閒活動等），並給予合理的選擇機會" },
      { id: "四-2", content: "在服務契約簽訂、照顧計畫制訂等重要決策時，確認服務使用者本人或其法定代理人的知情同意" },
      { id: "四-3", content: "服務使用者有權利拒絕特定服務項目，機構尊重其決定並做好記錄" },
      { id: "四-4", content: "提供服務使用者認識自身權益的管道（如簡明易懂的圖文說明、影音媒材等）" },
    ],
  },
  {
    groupTitle: "五、隱私權（保護服務使用者個人資訊與私人空間）",
    items: [
      { id: "五-1", content: "訂有個人資料保護相關規定，並確實執行" },
      { id: "五-2", content: "服務使用者的個人資料（健康、家庭、財務等）僅供業務需要之人員取得，不得任意洩漏" },
      { id: "五-3", content: "拍攝服務使用者照片、影音時，取得本人或法定代理人書面同意" },
      { id: "五-4", content: "服務使用者有個人私人空間（個人置物區、隱私更衣空間等）" },
      { id: "五-5", content: "提供個人照顧（更衣、如廁、沐浴等）時，確保隱私（拉簾、關門等措施）" },
      { id: "五-6", content: "外來參訪或實習人員進入服務區域前，取得服務使用者同意，並做好個資保護" },
      { id: "五-7", content: "個人資料銷毀作業依法規規定辦理，有相關紀錄" },
    ],
  },
  {
    groupTitle: "六、參與權（促進服務使用者參與機構活動及決策）",
    items: [
      { id: "六-1", content: "定期召開服務使用者（或其代表）參與的會議，讓其表達意見，並有書面記錄" },
      { id: "六-2", content: "照顧計畫（ISP）制訂過程有服務使用者本人（或其代表）參與" },
      { id: "六-3", content: "鼓勵服務使用者參與機構各項活動設計或規劃" },
      { id: "六-4", content: "提供多元參與形式（如圖卡溝通、輔助溝通系統、手語等），確保溝通障礙者能有效表達意見" },
      { id: "六-5", content: "服務使用者提出的意見或建議，機構有回應機制並告知處理結果" },
    ],
  },
  {
    groupTitle: "七、人際社交（支持服務使用者維持社會連結）",
    items: [
      { id: "七-1", content: "支持服務使用者與家人、朋友保持聯繫（如提供通訊設備、協助家屬探視）" },
      { id: "七-2", content: "提供服務使用者與同儕互動的機會（如團體活動、餐食共享等）" },
      { id: "七-3", content: "支持服務使用者參與社區活動，促進社會融合" },
      { id: "七-4", content: "當服務使用者出現人際困難或衝突時，有專業人員協助調解與輔導" },
      { id: "七-5", content: "尊重服務使用者的友誼與親密關係，不設置不必要的限制" },
    ],
  },
  {
    groupTitle: "八、申訴權（建立有效的申訴機制）",
    items: [
      { id: "八-1", content: "訂有申訴處理辦法，並以簡明易懂的方式告知服務使用者及家屬/監護人" },
      { id: "八-2", content: "設有多元申訴管道（書面、電話、意見箱等），且申訴者資訊保密" },
      { id: "八-3", content: "申訴案件有書面記錄、處理流程及期限規定" },
      { id: "八-4", content: "申訴處理結果有回覆申訴人，並進行後續追蹤" },
      { id: "八-5", content: "定期統計申訴案件，作為服務改善依據" },
    ],
  },
];

// ─── 壹-2 適切照顧與支持 ────────────────────────────────────
const sheet2Groups: ItemGroup[] = [
  {
    groupTitle: "一、個人想望（了解並回應服務使用者的個人期望）",
    items: [
      { id: "一-1", content: "入住/入案時進行個人背景、生活史、興趣與目標之評估，並有書面記錄" },
      { id: "一-2", content: "照顧計畫中納入服務使用者的個人想望與生活目標" },
      { id: "一-3", content: "工作人員了解每位服務使用者的個人偏好，並在日常照顧中體現" },
      { id: "一-4", content: "定期（至少每年）重新確認服務使用者的個人想望，依需求調整計畫" },
    ],
  },
  {
    groupTitle: "二、個別化支持計畫（ISP）",
    items: [
      { id: "二-1", content: "每位服務使用者均有書面個別化支持計畫（ISP），由跨專業團隊共同制訂" },
      { id: "二-2", content: "ISP 包含長期目標、短期目標、支持策略及負責人員，目標具體可測量" },
      { id: "二-3", content: "ISP 制訂有服務使用者本人（或其法定代理人）參與，並簽署同意" },
      { id: "二-4", content: "定期（至少每半年）評值 ISP 執行情形，依評值結果調整計畫" },
      { id: "二-5", content: "ISP 執行紀錄完整，可反映目標達成進度" },
    ],
  },
  {
    groupTitle: "三、特殊照顧需求（因應身心障礙特殊照護）",
    items: [
      { id: "三-1", content: "依服務使用者的障礙類別與程度提供適切的輔具支持及環境改善" },
      { id: "三-2", content: "對有醫療照護需求（如管路照護、癲癇處理等）的服務使用者，有標準作業程序及執行記錄" },
      { id: "三-3", content: "對有吞嚥困難的服務使用者，有評估、飲食調整及餵食協助紀錄" },
      { id: "三-4", content: "工作人員接受與服務使用者障礙類別相關的專業訓練" },
    ],
  },
  {
    groupTitle: "四、情緒行為支持（正向行為支持策略）",
    items: [
      { id: "四-1", content: "對有情緒行為問題的服務使用者，進行功能行為評估，並制訂正向行為支持計畫" },
      { id: "四-2", content: "工作人員了解並落實正向行為支持策略，不採用懲罰或隔離等不當方式處理行為問題" },
      { id: "四-3", content: "情緒行為事件有書面記錄、分析及後續追蹤" },
      { id: "四-4", content: "定期由跨專業團隊檢討情緒行為支持計畫的成效，並視需求調整" },
    ],
  },
  {
    groupTitle: "五、多元支持服務（跨領域整合支持）",
    items: [
      { id: "五-1", content: "依服務使用者需求連結物理治療、職能治療、語言治療等復健服務，並有執行紀錄" },
      { id: "五-2", content: "提供心理輔導或諮商服務（或連結外部資源），支持服務使用者的心理健康" },
      { id: "五-3", content: "定期召開跨專業個案研討，協同討論並調整支持策略" },
    ],
  },
  {
    groupTitle: "六、社區資源連結（促進社區融合）",
    items: [
      { id: "六-1", content: "依服務使用者需求連結社區資源（如日間照顧、職業重建、休閒活動等），並有紀錄" },
      { id: "六-2", content: "支持服務使用者參與社區融合活動，有計畫及執行紀錄" },
      { id: "六-3", content: "與社區相關機構（學校、庇護工場、社福中心等）建立合作或轉介關係" },
      { id: "六-4", content: "評估服務使用者社區參與情形，並持續改善支持措施" },
    ],
  },
  {
    groupTitle: "七、家庭支持（強化家庭照顧能力）",
    items: [
      { id: "七-1", content: "入住/入案時完成家庭評估，了解家庭支持系統與需求" },
      { id: "七-2", content: "定期（至少每半年）與家屬/監護人召開個案研討或家庭會議，並有書面記錄" },
      { id: "七-3", content: "提供家屬照顧技巧指導或訓練（如行為支持、輔具使用等）" },
      { id: "七-4", content: "提供家屬喘息服務資源的資訊與轉介" },
      { id: "七-5", content: "對家庭功能較弱的服務使用者，有加強支持的計畫與執行紀錄" },
      { id: "七-6", content: "家屬提出的意見與需求有書面回應與追蹤" },
      { id: "七-7", content: "支持家屬了解服務使用者的障礙特質及照顧知能" },
      { id: "七-8", content: "提供家庭危機介入服務或轉介，有處理紀錄" },
    ],
  },
  {
    groupTitle: "八、轉銜支持（協助服務轉換或生命轉型）",
    items: [
      { id: "八-1", content: "訂有轉銜服務計畫，評估服務使用者的轉銜需求（如轉至其他機構、返家、就業等）" },
      { id: "八-2", content: "轉銜計畫由跨專業團隊共同制訂，並有服務使用者或其代理人參與" },
      { id: "八-3", content: "轉銜時提供完整的個案資料移交，確保服務連續性" },
      { id: "八-4", content: "轉銜後有追蹤服務使用者適應情形的機制，並有記錄" },
      { id: "八-5", content: "與接續服務的機構或資源建立合作關係，協助順利銜接" },
    ],
  },
  {
    groupTitle: "九、生命教育（支持服務使用者尊嚴生死）",
    items: [
      { id: "九-1", content: "依服務使用者年齡與需求提供適切的生命教育活動，尊重其對生命意義的探索" },
      { id: "九-2", content: "對有安寧或緩和醫療需求的服務使用者，有相關資訊提供與轉介機制" },
      { id: "九-3", content: "尊重服務使用者的宗教信仰與文化背景，並在照顧中體現" },
      { id: "九-4", content: "當服務使用者或其家屬面對死亡議題時，有專業人員提供陪伴與支持" },
      { id: "九-5", content: "訂有服務使用者往生後的遺體處理及家屬關懷的處理程序" },
    ],
  },
];

// ─── 貳 經營管理 ─────────────────────────────────────────────
const sheet3Groups: ItemGroup[] = [
  {
    groupTitle: "第一節 行政管理",
    items: [
      { id: "一-1", content: "訂有機構組織章程、各項行政管理規定及標準作業程序，並定期更新" },
      { id: "一-2", content: "行政文件分類管理，查閱方便，保存年限符合規定" },
      { id: "一-3", content: "定期召開行政會議（含主管會報、工作人員會議），並有書面記錄" },
      { id: "一-4", content: "訂有機構年度工作計畫，並按計畫執行，定期檢討進度" },
      { id: "一-5", content: "依法辦理各項申報（如服務量、評鑑資料、政府補助核銷等），無逾期或錯誤申報" },
      { id: "一-6", content: "訂有危機管理計畫（如災害應變、火災、疫情等），定期演練並有記錄" },
    ],
  },
  {
    groupTitle: "第二節 服務管理",
    items: [
      { id: "二-1", content: "訂有服務對象資格審查及接案程序，有書面記錄" },
      { id: "二-2", content: "服務契約完整，包含服務內容、費用、雙方權利義務，並有服務使用者或代理人簽署" },
      { id: "二-3", content: "訂有結案標準及程序，結案時完成結案摘要並告知服務使用者及家屬" },
      { id: "二-4", content: "服務記錄格式統一、完整，由負責人員填寫並簽名，不得事後補登" },
      { id: "二-5", content: "每年至少辦理一次服務使用者（及家屬）滿意度調查，調查結果有書面分析與改善計畫" },
      { id: "二-6", content: "訂有服務品質自我評核機制，定期辦理並有書面報告及改善追蹤" },
      { id: "二-7", content: "設有品質指標監測系統（如事故率、申訴率、轉介數），定期彙整分析" },
      { id: "二-8", content: "訂有委外服務管理辦法，委外廠商資格符合規定，服務品質定期查核" },
      { id: "二-9", content: "感染管制計畫完善，工作人員落實手部衛生，感染事件有通報及處理紀錄" },
      { id: "二-10", content: "物料及設備管理有完整記錄，損壞設備有即時修繕機制" },
      { id: "二-11", content: "資訊系統有權限管控，個案資料即時更新，定期備份，配合政府申報要求" },
    ],
  },
  {
    groupTitle: "第三節 員工管理",
    items: [
      { id: "三-1", content: "依法令規定配置各類專業及照顧人員，人力符合最低標準" },
      { id: "三-2", content: "各類人員具備法令規定的資格證書，資格證書建檔保存" },
      { id: "三-3", content: "訂有年度教育訓練計畫，涵蓋身心障礙照顧知能、人權維護、緊急處理等核心議題" },
      { id: "三-4", content: "新進人員有職前訓練，內容包含服務對象特質、人權保障、緊急處理等，並有記錄" },
      { id: "三-5", content: "全體工作人員每年完成規定時數的在職訓練，有訓練紀錄" },
      { id: "三-6", content: "訂有人員考核制度，定期辦理考核，考核結果有書面記錄" },
      { id: "三-7", content: "訂有員工申訴及保護機制，確保工作人員不因通報不當對待而遭受報復" },
      { id: "三-8", content: "班表排定合理，符合服務使用者照顧需求，假日及夜間人力配置符合規定" },
    ],
  },
  {
    groupTitle: "第四節 會計財務",
    items: [
      { id: "四-1", content: "財務收支有完整帳冊記錄，收支憑證妥善保存" },
      { id: "四-2", content: "定期編製財務報表，依規定向主管機關或董事會報告" },
      { id: "四-3", content: "收費標準公開且符合政府規定，開立收費憑據給付費者" },
      { id: "四-4", content: "訂有退費規定並告知服務使用者及家屬，退費爭議有書面處理記錄" },
      { id: "四-5", content: "公設民營機構財務獨立核算，政府補助款項目明確，核銷符合規定" },
      { id: "四-6", content: "財務管理符合相關法規（如非營利組織財務管理要點等）" },
      { id: "四-7", content: "採購作業有申請及核准程序，金額超過規定者依採購法規辦理" },
      { id: "四-8", content: "財務有內部審核機制（如主管核章、定期盤點）或接受外部會計師查核" },
    ],
  },
];

async function main() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "報告汪";
  workbook.created = new Date();

  const title = "身心障礙福利機構專業服務品質與經營管理自我檢核表";
  addSheet(workbook, "壹-1 權益保障", title, sheet1Groups);
  addSheet(workbook, "壹-2 適切照顧與支持", title, sheet2Groups);
  addSheet(workbook, "貳 經營管理", title, sheet3Groups);

  const outputPath = path.join(os.homedir(), "Desktop", "身心障礙福利機構自我檢核表.xlsx");
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ 已儲存至：${outputPath}`);
}

main().catch((err) => {
  console.error("❌ 產生失敗：", err);
  process.exit(1);
});
