#!/usr/bin/env tsx
// 一次性 UPDATE 腳本：為 daycare-eval-115-criteria-full-2026 注入 SVG 插圖
// 用法：npx tsx --env-file=.env.local scripts/_tmp-add-svg-daycare-criteria-full.ts
//
// 寫入：
//   - content：在 6 個位置插入 <figure> 圖片標籤
//   - coverImageUrl："/blog/daycare-criteria-full-cover.svg"

import { db } from "../db/index";
import { blogPosts } from "../db/schema";
import { eq } from "drizzle-orm";

const SLUG = "daycare-eval-115-criteria-full-2026";
const COVER = "/blog/daycare-criteria-full-cover.svg";

// ── 圖片 figure 區塊輔助函式 ──────────────────────────────────────────────────

function fig(src: string, alt: string, caption: string): string {
  return `<figure style="margin: 2rem 0;">
  <img src="${src}" alt="${alt}" style="width:100%;border-radius:12px;" />
  <figcaption style="text-align:center;font-size:0.875rem;color:#64748b;margin-top:0.5rem;">${caption}</figcaption>
</figure>`;
}

// ── 六張插圖定義 ──────────────────────────────────────────────────────────────

const FIG_REVIEW_METHODS = fig(
  "/blog/daycare-criteria-full-review-methods.svg",
  "115年度日照中心評鑑委員三大查核方式：文件檢閱、現場訪談、實地查看",
  "圖：評鑑委員三大查核方式（文件檢閱、現場訪談、實地查看）一覽"
);

const FIG_STRUCTURE = fig(
  "/blog/daycare-45-guide-structure.svg",
  "115年度日照中心評鑑五大章節條文分布總覽",
  "圖：115 年度日照中心評鑑五大章節條文分布"
);

const FIG_RIGHTS = fig(
  "/blog/daycare-criteria-full-rights.svg",
  "日照中心評鑑壹個案權益保障四條基準速查（第1-4條）",
  "圖：壹、個案權益保障四大條文（第 1–4 條）速查"
);

const FIG_CARE = fig(
  "/blog/daycare-criteria-full-care.svg",
  "日照中心評鑑貳專業照護品質三大子分類架構（第5-22條）",
  "圖：貳、專業照護品質三大子分類（第 5–22 條）架構"
);

const FIG_MANAGEMENT = fig(
  "/blog/daycare-criteria-full-management.svg",
  "日照中心評鑑參經營管理效能四大子分類（第23-37條）",
  "圖：參、經營管理效能四大子分類（第 23–37 條）一覽"
);

const FIG_SAFETY = fig(
  "/blog/daycare-criteria-full-safety.svg",
  "日照中心評鑑肆安全環境設備六項基準（第38-43條）",
  "圖：肆、安全環境設備六項基準（第 38–43 條）查核要點"
);

// ── 文章 CONTENT（含插圖，分 6 個插入點）────────────────────────────────────

const CONTENT = `
<p>評鑑委員拿著基準表走進日照中心的時候，他們看的不只是環境乾不乾淨——而是要確認每一條基準背後該有的文件、紀錄與流程，機構是否真的到位。本文把 115 年度 43 項正式基準的查核重點全部整理出來，讓你不必反覆翻原版文件，在準備期間隨時對照。</p>

<blockquote>
  <strong>115 年度臺北市日間照顧機構評鑑基準</strong>，由臺北市政府社會局依長期照顧服務法及相關法規訂定，適用於轄區內所有立案日間照顧機構。評鑑採 A–E 五等制計分，委員查核方式包含文件檢閱、現場訪談、實地查看三種形式。
</blockquote>

${FIG_REVIEW_METHODS}

<h2>評鑑架構一覽</h2>
<table>
<tr><th>章節</th><th>項目範圍</th><th>項目數</th><th>主要負責</th></tr>
<tr><td>壹、個案權益保障</td><td>第 1–4 條</td><td>4 項</td><td>行政、社工</td></tr>
<tr><td>貳、專業照護品質</td><td>第 5–22 條</td><td>18 項</td><td>社工、護理師、照服員</td></tr>
<tr><td>參、經營管理效能</td><td>第 23–37 條</td><td>15 項</td><td>主管、行政</td></tr>
<tr><td>肆、安全環境設備</td><td>第 38–43 條</td><td>6 項</td><td>行政</td></tr>
<tr><td>伍、加分題</td><td>第 44–45 條</td><td>2 項</td><td>全體</td></tr>
</table>

${FIG_STRUCTURE}

<h2>壹、個案權益保障（第 1–4 條）</h2>
<p>本章節由評鑑委員以<strong>文件檢閱與現場訪談</strong>查核，重點確認機構是否建立透明的對外溝通與個資保護機制。</p>

<h3>第 1 條：服務資訊公開（行政）</h3>
<ul>
  <li><strong>機構簡介或文宣：</strong>製作完整且內容正確的機構簡介，並隨時更新活動訊息。</li>
  <li><strong>公開網路平台：</strong>設有供民眾查詢服務內容的公開網路平台（官網、粉專等）。</li>
  <li><strong>其他宣傳方式：</strong>另備海報、LINE 帳號、社區公告等其他宣傳佐證。</li>
</ul>

<h3>第 2 條：意見反應/申訴機制（社工）</h3>
<ul>
  <li><strong>書面辦法與流程：</strong>訂有服務對象與家屬的意見反應/申訴辦法及處理流程。</li>
  <li><strong>處理紀錄：</strong>每件意見均有處理過程紀錄，並定期分析檢討。</li>
  <li><strong>改善追蹤：</strong>分析結果擬有改善方案並確實追蹤。</li>
</ul>

<h3>第 3 條：服務契約簽訂（行政/社工）</h3>
<ul>
  <li><strong>法定契約版本：</strong>採用衛生福利部公告「社區式服務類長期照顧服務機構定型化契約範本」（主契約＋附件一至附件五），或社會局核定之版本；自行修改版本不符規定。</li>
  <li><strong>審閱期：</strong>契約書訂有審閱期，讓服務對象或代理人有充分閱讀時間。</li>
  <li><strong>確實告知：</strong>契約內容涵蓋雙方權利義務、申訴管道、收費標準與服務項目，且已向服務對象確實說明。</li>
</ul>

<h3>第 4 條：個人資料管理與保密性（全體人員）</h3>
<ul>
  <li><strong>管理規定：</strong>依個人資料保護法訂定管理規定，含肖像權同意書、借閱規定。</li>
  <li><strong>妥善保管設備：</strong>紙本資料有上鎖保管設備；電子資料設有存取權限管理。</li>
  <li><strong>落實執行：</strong>委員可訪談任一工作人員確認個資保護知識。</li>
</ul>

${FIG_RIGHTS}

<h2>貳、專業照護品質（第 5–22 條）</h2>
<p>本章節為評鑑核心，共 18 項，涵蓋評估與處遇、健康生活照顧、品質監測三大面向，委員以<strong>文件檢閱與訪談並重</strong>。</p>

${FIG_CARE}

<h3>（一）評估與處遇（第 5–10 條）</h3>
<ul>
  <li><strong>第 5 條 服務對象評估（社工）：</strong>新個案需評估身心狀況、家庭照顧者狀況與社會資源；之後每 6 個月評估一次或依需要評估；紀錄完整。</li>
  <li><strong>第 6 條 照顧計畫（社工/照服員）：</strong>評估後 7 個工作天內完成照顧計畫，計畫與評估結果一致，由照顧者共同參與執行。</li>
  <li><strong>第 7 條 追蹤評值（社工）：</strong>定期對目標達成度再評估；未達成目標進行原因分析並修正計畫；評值紀錄完整。</li>
  <li><strong>第 8 條 個案研討（社工/照服員）：</strong>每季辦理跨專業個案討論會，紀錄含前次決議的追蹤情形。</li>
  <li><strong>第 9 條 督導機制（主管）：</strong>每位工作人員每半年至少個督 1 次、每季至少團督 1 次；督導結果有追蹤紀錄。</li>
  <li><strong>第 10 條 開結案辦法（社工）：</strong>訂有開案/收案、轉介、暫停服務、結案標準及處理流程；結案與轉介紀錄至少保存七年。</li>
</ul>

<h3>（二）健康生活照顧（第 11–21 條）</h3>
<ul>
  <li><strong>第 11 條 自我照顧能力（照服員）：</strong>依個別需求安排日常活動，了解執行情形並有紀錄，定期評估改變。</li>
  <li><strong>第 12 條 協助服藥（護理師/照服員）：</strong>訂有協助服藥規定，有執行紀錄；委員可要求出示藥袋等佐證文件確認依處方箋給藥。</li>
  <li><strong>第 13 條 團體活動（社工/照服員）：</strong>訂有年度文康活動計畫（動靜態並重）；每月至少辦理 1 次團體或社區活動；依節慶辦有相關活動，均有照片與紀錄。</li>
  <li><strong>第 14 條 安全看視（照服員）：</strong>訂有預防跌倒、哽噎等安全作業規範；已告知家屬安全須知並留有紀錄；委員訪談工作人員確認熟悉規範。</li>
  <li><strong>第 15 條 個人清潔（照服員）：</strong>委員現場查看服務對象身體是否清潔無異味、進食後口腔是否清潔。</li>
  <li><strong>第 16 條 營養餐點（行政/照服員）：</strong>依個別需要提供適當餐點，且餐點具變化性。</li>
  <li><strong>第 17 條 休閒運動設施（行政）：</strong>提供適當設施且功能正常，有鼓勵長者使用的具體策略。</li>
  <li><strong>第 18 條 社會參與（社工）：</strong>每半年至少辦理 1 次戶外團體活動；辦理並協助服務對象參與社區活動；評估參與及適應狀況。</li>
  <li><strong>第 19 條 家屬支持（社工）：</strong>每年辦理 2 次活動（如家屬座談）；有主動聯繫家屬的具體做法（如聯絡本）。</li>
  <li><strong>第 20 條 健康檢查（護理師）：</strong>服務對象入機構前 6 個月內提供體檢文件，含胸部 X 光；委員查閱報告確認項目完整。</li>
  <li><strong>第 21 條 防疫機制（護理師）：</strong>服務對象每日至少量體溫 1 次，工作人員每週至少量 1 次且有紀錄；設有感染手冊並定期更新；工作人員熟悉傳染病通報流程。</li>
</ul>

<h3>（三）品質監測（第 22 條）</h3>
<ul>
  <li><strong>第 22 條 品管指標（主管）：</strong>自訂至少 2 項需要改善的服務品管指標；訂有處理辦法；異常案件逐案分析；檢討後擬有改善方案。委員特別重視此條，建議提前確立指標並持續記錄。</li>
</ul>

<h2>參、經營管理效能（第 23–37 條）</h2>
<p>本章節共 15 項，由<strong>主管與行政人員</strong>主要負責，委員以文件審閱為主，並訪談業務負責人。</p>

<h3>（一）行政制度（第 23–27 條）</h3>
<ul>
  <li><strong>第 23 條 業務計畫（主管）：</strong>訂有年度業務計畫及短中長程計畫，定期檢視修正，每年撰寫成果報告。</li>
  <li><strong>第 24 條 工作手冊（行政）：</strong>手冊（紙本或電子）涵蓋組織架構、職掌、差勤、申訴流程、個資保護等；每位服務人員可取用；至少每年審閱或修訂一次。</li>
  <li><strong>第 25 條 行政會議（主管）：</strong>每月至少召開 1 次內部會議，含業務負責人、照服員、護理師、社工等；有決議追蹤紀錄。</li>
  <li><strong>第 26 條 器材維護（行政）：</strong>設有專人管理；有電梯、機電器材等定期保養維修紀錄。</li>
  <li><strong>第 27 條 前次評鑑改善（主管）：</strong>針對上次評鑑委員建議，擬定具體改進方案並確實執行，文件可清楚對應委員建議與改善成效。第一次評鑑機構不適用。</li>
</ul>

<h3>（二）服務人員管理（第 28–33 條）</h3>
<ul>
  <li><strong>第 28 條 人力設置（主管）：</strong>人力符合設置標準；各類人員完成執業登錄；服務人員投保勞保並提撥勞退。</li>
  <li><strong>第 29 條 教育訓練（主管）：</strong>新進人員 1 個月內完成至少 16 小時職前訓練（含勞安、感染管制、性別平等、實務操作）；在職訓練每年至少 20 小時，含原住民族文化敏感度與多元族群課程各 1 小時，網路課程最多採計 5 小時。</li>
  <li><strong>第 30 條 留任率（主管）：</strong>以前四年度平均留任率計算（離職率＝當年度離職人數÷（前一年底人數＋當年新進人數））；死亡、退休及 3 個月內離職新進員工不計入。</li>
  <li><strong>第 31 條 業務負責人能力（主管）：</strong>業務負責人每年接受行政或品質管理訓練至少 4 小時；委員訪談時需能說明機構經營問題與解決策略（人力、財務、品質、風險等面向）。</li>
  <li><strong>第 32 條 工作人員健檢（主管/護理師）：</strong>新進人員到職前健檢含胸部 X 光、血液常規、尿液、B 型肝炎抗原抗體；在職人員每年健檢；報告需經醫師判讀核章，效期 6 個月。</li>
  <li><strong>第 33 條 疫苗注射（護理師）：</strong>統計流感疫苗施打率並留有紀錄；未施打者記錄原因；有鼓勵接種的具體策略。</li>
</ul>

<h3>（三）財務管理（第 34 條）</h3>
<ul>
  <li><strong>第 34 條 財務制度（主管/會計）：</strong>有獨立會計制度、帳冊與報稅資料；收費開立正式收據（含發票）；收受捐款者設專戶、公開徵信，並於每年 1 月、7 月報主管機關。公立機構不適用。</li>
</ul>

<h3>（四）緊急事件管理（第 35–37 條）</h3>
<ul>
  <li><strong>第 35 條 緊急事件（主管）：</strong>訂有緊急意外事件處理辦法與流程；工作人員熟悉緊急聯絡管道；發生時依辦法執行，有處理過程及後續追蹤紀錄，並有檢討分析報告。</li>
  <li><strong>第 36 條 急救物品（護理師）：</strong>備有三角巾、固定板、繃帶；急救箱含體溫計、膠帶、止血帶、剪刀、優碘、酒精、口罩、紗布、繃帶、壓舌板、彈性繃帶、清潔手套、生理食鹽水（20cc×5）、潤滑劑；每位工作人員會操作。</li>
  <li><strong>第 37 條 性騷擾/性侵害防治（主管）：</strong>訂有處理辦法、流程（含通報、轉介）並公開揭示；對象涵蓋工作人員間、工作人員與個案間、與家屬間；工作人員熟悉流程。</li>
</ul>

${FIG_MANAGEMENT}

<h2>肆、安全環境設備（第 38–43 條）</h2>
<p>委員以<strong>實地查看</strong>為主，評鑑前須完成環境整備與文件備妥。</p>
<ul>
  <li><strong>第 38 條 高齡友善環境（行政）：</strong>空間配置合理；標示清楚、字體合宜；桌椅傢俱高度適合長者；燈光、顏色符合長者需求。</li>
  <li><strong>第 39 條 盥洗衛生設備（行政）：</strong>衛浴設施符合設立標準（出入口淨寬 80 公分以上、防滑、扶手、緊急呼叫、輪椅使用空間、適當照明）；地面隨時保持乾燥；有保暖設施。</li>
  <li><strong>第 40 條 休息場所（行政）：</strong>依服務對象需求安排適當休息時間及場所；注意個別隱私。</li>
  <li><strong>第 41 條 飲用水（行政）：</strong>使用自來水者每 3 個月檢測大腸桿菌群並有報告；設有水塔者每半年清洗 1 次並留有紀錄。使用包裝水者附水質檢驗合格證明。</li>
  <li><strong>第 42 條 廚房衛生（行政/廚房）：</strong>外部供應餐點需有食物檢體留存（每樣 125 公克、冷藏 48 小時）及分槽洗滌；自行供餐者另需廚房作業標準、進貨紀錄、生熟食分開。</li>
  <li><strong>第 43 條 環境清潔及病媒防治（行政/清潔）：</strong>機構內外清潔無異味；每 3 個月消毒 1 次並有紀錄；有防蚊蟲設施（紗窗、紗門等）；委由專業廠商防治者，需有合約或服務單佐證。</li>
</ul>

${FIG_SAFETY}

<h2>伍、加分題（第 44–45 條）</h2>
<p>加分題由評鑑委員共議決定，最多加總 3 分。</p>
<ul>
  <li><strong>第 44 條 原住民文化敏感度（最多 2 分）：</strong>提供服務對象習慣的語言翻譯或文字說明；浴廁緊急呼叫設備有族語翻譯或清楚圖示。服務原住民族或其他多元族群皆適用。</li>
  <li><strong>第 45 條 監視器權益保障（最多 1 分）：</strong>訂有監視錄影設備設置及資訊管理規定；設有專責人員管理；定期維護並留有一年紀錄；影像保存至少 30 日；查閱時作成紀錄。</li>
</ul>

<blockquote>
  <strong>評鑑前盤點工具：</strong>把機構現有的備審文件上傳至 <a href="/auth/sign-up">報告汪</a>，AI 依日照中心 45 項評鑑指標逐項比對，輸出「缺少資料／應追蹤未追蹤／已符合項目／改善建議」五面向分析，幫助你在評鑑前快速找到文件缺口。
</blockquote>

<h2>常見問題 FAQ</h2>

<h3>115 年度臺北市日照中心評鑑基準共有幾項？</h3>
<p>115 年度臺北市政府社會局日間照顧機構評鑑基準共 43 項正式評鑑項目（第 1–43 條），加上 2 項加分題（第 44–45 條），合計 45 題。正式項目分為壹個案權益保障 4 項、貳專業照護品質 18 項、參經營管理效能 15 項、肆安全環境設備 6 項。</p>

<h3>評鑑委員主要用什麼方式查核？</h3>
<p>依官方基準說明，委員查核方式分三種：（1）<strong>文件檢閱</strong>——翻閱紙本或電子檔文件（如評估紀錄、照顧計畫、會議紀錄、健檢報告等）；（2）<strong>現場訪談</strong>——詢問業務負責人、社工師、護理師或照服員；（3）<strong>實地查看</strong>——現場巡視環境、設備與急救物品。多數條文同時使用兩至三種方式，三者都要準備。</p>

<h3>日照中心評鑑哪一章節最容易失分？</h3>
<p>依實務經驗，貳、專業照護品質（第 5–22 條）失分風險最高，因為它共有 18 項，且多數條文同時要求文件、紀錄與訪談，遺漏任一環節就可能扣分。其中第 12 條協助服藥（需保留藥袋佐證）、第 22 條品管指標（需自訂指標並逐案分析）是最常見的遺漏點。</p>

<h3>第 27 條「前次評鑑建議改善」首次受評機構如何處理？</h3>
<p>官方基準明確標注第 27 條「若為第一次評鑑則不適用」，首次受評機構直接跳過即可。建議準備一份說明文件，標示本機構為首次受評，以便委員查核時不產生疑問。</p>

<h3>第 29 條教育訓練的「網路繼續教育課程」有幾小時上限？</h3>
<p>依官方基準規定，在職訓練每年至少 20 小時中，「網路繼續教育課程」（指事前預先錄製、可隨時上線學習的課程）最多採計 5 小時，其餘 15 小時以上需為實體或同步線上訓練。課程內容須符合長期照顧服務人員繼續教育積分認證之居家服務相關課程。</p>

<hr />
<p><strong>延伸閱讀：</strong></p>
<ul>
  <li><a href="/school/daycare">日間照顧中心評鑑小教室 — 四大章節備審技巧完整解析</a></li>
  <li><a href="/school/daycare/professional-quality">貳、專業照護品質（第 5–22 條）逐條準備要訣</a></li>
  <li><a href="/school/daycare/management">參、經營管理效能（第 23–37 條）逐條準備要訣</a></li>
  <li><a href="/blog/daycare-evaluation-45-items-guide-2026">日照評鑑 45 題生存指南：社工、護理師、照服員的分工攻略</a></li>
  <li><a href="/day-care">日照中心評鑑報告管理功能介紹</a></li>
  <li><a href="/downloads">免費下載日照評鑑自評表（Excel 版）</a></li>
</ul>
`;

async function main() {
  // 確認文章存在
  const [row] = await db
    .select({ id: blogPosts.id, status: blogPosts.status, title: blogPosts.title })
    .from(blogPosts)
    .where(eq(blogPosts.slug, SLUG));

  if (!row) {
    console.error(`❌ 找不到文章：${SLUG}`);
    console.error("   請先執行 _tmp-insert-daycare-criteria-full.ts 插入草稿。");
    process.exit(1);
  }

  console.log(`✅ 找到文章（status: ${row.status}）：${row.title}`);
  console.log("   注入 SVG 插圖...");

  await db
    .update(blogPosts)
    .set({
      content: CONTENT,
      coverImageUrl: COVER,
    })
    .where(eq(blogPosts.slug, SLUG));

  console.log("✅ 已更新 content（含 6 張圖）與 coverImageUrl：");
  console.log(`   coverImageUrl: ${COVER}`);
  console.log("   figures: review-methods / structure(reused) / rights / care / management / safety");
  console.log("");
  console.log("下一步（確認無誤後）：");
  console.log("  npx tsx --env-file=.env.local scripts/_tmp-publish-daycare-criteria-full.ts");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
