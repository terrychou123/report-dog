# Graph Report - .  (2026-05-01)

## Corpus Check
- 427 files · ~128,100 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 982 nodes · 1038 edges · 33 communities detected
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 153 edges (avg confidence: 0.8)
- Token cost: 3,200 input · 1,800 output

## Community Hubs (Navigation)
- [[_COMMUNITY_API Routes & Route Handlers|API Routes & Route Handlers]]
- [[_COMMUNITY_Supplementary Sheet Style & Builders|Supplementary Sheet Style & Builders]]
- [[_COMMUNITY_AI Content Processing & API|AI Content Processing & API]]
- [[_COMMUNITY_Admin Layout & OpenRouter Client|Admin Layout & OpenRouter Client]]
- [[_COMMUNITY_Tag Management Dashboard|Tag Management Dashboard]]
- [[_COMMUNITY_Report Editor (Dashboard)|Report Editor (Dashboard)]]
- [[_COMMUNITY_Daycare Custom Evaluation Sheets|Daycare Custom Evaluation Sheets]]
- [[_COMMUNITY_Nursing Home Custom Sheets|Nursing Home Custom Sheets]]
- [[_COMMUNITY_Home Care Contract Sheets|Home Care Contract Sheets]]
- [[_COMMUNITY_Excel & Custom Sheet Builder Registry|Excel & Custom Sheet Builder Registry]]
- [[_COMMUNITY_LTC Care Categories (AA–GA)|LTC Care Categories (AA–GA)]]
- [[_COMMUNITY_Excel Editor Components|Excel Editor Components]]
- [[_COMMUNITY_File Upload & Report Creation|File Upload & Report Creation]]
- [[_COMMUNITY_Home Care Emergency & SOP Sheets|Home Care Emergency & SOP Sheets]]
- [[_COMMUNITY_Home Care Admin Rules Sheets|Home Care Admin Rules Sheets]]
- [[_COMMUNITY_Home Care Infection Control Sheets|Home Care Infection Control Sheets]]
- [[_COMMUNITY_Home Care Quality Improvement Sheets|Home Care Quality Improvement Sheets]]
- [[_COMMUNITY_Home Care Staff Training Sheets|Home Care Staff Training Sheets]]
- [[_COMMUNITY_Home Care Performance System Sheets|Home Care Performance System Sheets]]
- [[_COMMUNITY_Home Care Quality Monitoring Sheets|Home Care Quality Monitoring Sheets]]
- [[_COMMUNITY_Home Care Self-Assessment Sheets|Home Care Self-Assessment Sheets]]
- [[_COMMUNITY_Shared Reports List (Batch Ops)|Shared Reports List (Batch Ops)]]
- [[_COMMUNITY_Excel Template Builder|Excel Template Builder]]
- [[_COMMUNITY_Home Care Case Closure Sheets|Home Care Case Closure Sheets]]
- [[_COMMUNITY_Home Care Supervision Sheets|Home Care Supervision Sheets]]
- [[_COMMUNITY_Home Care Privacy Policy Sheets|Home Care Privacy Policy Sheets]]
- [[_COMMUNITY_Home Care Refund Policy Sheets|Home Care Refund Policy Sheets]]
- [[_COMMUNITY_Home Care Service Scope Sheets|Home Care Service Scope Sheets]]
- [[_COMMUNITY_Brand OG Images|Brand OG Images]]
- [[_COMMUNITY_Draggable Reports List|Draggable Reports List]]
- [[_COMMUNITY_Blog Post Page|Blog Post Page]]
- [[_COMMUNITY_Template Import Dialog|Template Import Dialog]]
- [[_COMMUNITY_Report Dialog Handleconfirm|Report Dialog Handleconfirm]]

## God Nodes (most connected - your core abstractions)
1. `createClient()` - 51 edges
2. `requireAdminApi()` - 19 edges
3. `rowH()` - 11 edges
4. `setTitleRow()` - 11 edges
5. `buildNursingHomeItem56CustomSheets()` - 11 edges
6. `DELETE()` - 10 edges
7. `PUT()` - 10 edges
8. `setTitleRow()` - 10 edges
9. `isBlogAdmin()` - 9 edges
10. `createAdminClient()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `isValidUrl()`  [INFERRED]
  app/api/reports/[id]/links/route.ts → lib/utils.ts
- `補充分頁 Excel 排版規範 README` --references--> `scripts/lib/excel-checklist-builder.ts（下載 xlsx 產線 A 樣式 SSOT）`  [EXTRACTED]
  lib/supplementary-sheets/README.md → scripts/lib/excel-checklist-builder.ts
- `補充分頁 Excel 排版規範 README` --references--> `fortune-editor-inner.tsx（cellStyles 語意轉譯層）`  [EXTRACTED]
  lib/supplementary-sheets/README.md → components/fortune-editor-inner.tsx
- `fortune-editor-inner.tsx（cellStyles 語意轉譯層）` --implements--> `Excel 產線 B：DB FortuneSheet JSON`  [INFERRED]
  components/fortune-editor-inner.tsx → lib/supplementary-sheets/README.md
- `LTC 照顧組合表 README` --references--> `scripts/verify-ltc-care-combinations.ts（驗證腳本）`  [EXTRACTED]
  lib/ltc-care-combinations/README.md → scripts/verify-ltc-care-combinations.ts

## Hyperedges (group relationships)
- **Excel 雙產線共同樣式 SSOT 體系** — excel_pipeline_a, excel_pipeline_b, sheet_style_kit, excel_checklist_builder, excel_template_builder [EXTRACTED 0.95]
- **LTC 照顧組合代碼 → 知識文件 → AI 注入管線** — ltc_care_combinations_index, ltc_payment_schedule_iv_md, wiki_context_ts [EXTRACTED 1.00]
- **報告汪各 facility 頁面 OG 圖共用品牌系統** — og_image_root, og_image_day_care, og_image_home_care, og_image_hospital, og_image_residential, reportwang_brand_identity [EXTRACTED 0.95]

## Communities

### Community 0 - "API Routes & Route Handlers"
Cohesion: 0.02
Nodes (58): canAccessReport(), canEditReport(), canEditTag(), canViewTag(), POST(), GET(), handleUpgrade(), POST() (+50 more)

### Community 1 - "Supplementary Sheet Style & Builders"
Cohesion: 0.17
Nodes (30): build補_個資保護政策Sheet(), buildAttendanceSheet(), buildBenefitsSheet(), buildDaycareItem24CustomSheets(), buildDutyDescSheet(), buildHiringSheet(), buildIncidentSOPSheet(), buildOrgChartSheet() (+22 more)

### Community 2 - "AI Content Processing & API"
Cohesion: 0.1
Nodes (21): excelJsonToText(), processContent(), stripHtml(), POST(), checkAndRecordAiUsage(), countUsageToday(), getAiUsageToday(), getUserTier() (+13 more)

### Community 3 - "Admin Layout & OpenRouter Client"
Cohesion: 0.08
Nodes (15): AdminGuard(), createOpenRouterClient(), GET(), POST(), BlogEditContent(), isAdmin(), requireAdmin(), isBlogAdmin() (+7 more)

### Community 4 - "Tag Management Dashboard"
Cohesion: 0.1
Nodes (7): handleAddMember(), handleRemoveMember(), handleUpdatePermission(), load(), resolveUserEmails(), handleOpenChange(), resolveEmails()

### Community 5 - "Report Editor (Dashboard)"
Cohesion: 0.1
Nodes (5): escapeHtml(), handleDownload(), handleEditorMouseUp(), openAiDialogWithText(), preprocessHtml()

### Community 6 - "Daycare Custom Evaluation Sheets"
Cohesion: 0.29
Nodes (15): buildDaycareItem35CustomSheets(), buildAnnex1Sheet(), buildAnnex2Sheet(), buildAnnex3Sheet(), buildAnnex4Sheet(), buildAnnex5Sheet(), buildDaycareItem3CustomSheets(), buildMainContractSheet() (+7 more)

### Community 7 - "Nursing Home Custom Sheets"
Cohesion: 0.47
Nodes (15): buildAnnex1ImageRightSheet(), buildAnnex2PersonalDataSheet(), buildAnnex3DelegationSheet(), buildAnnex4ServiceItemsSheet(), buildAnnex5RestraintSheet(), buildAnnex6EmergencySheet(), buildContractTextLowerSheet(), buildContractTextUpperSheet() (+7 more)

### Community 8 - "Home Care Contract Sheets"
Cohesion: 0.53
Nodes (13): buildContractAttachment1Sheet(), buildContractAttachment2Sheet(), buildContractAttachment3Sheet(), buildContractAttachment4Sheet(), buildContractAttachment5Sheet(), buildHomeCareItem2CustomSheets(), buildRightsPolicySheet(), buildRightsStatementSheet() (+5 more)

### Community 10 - "Excel & Custom Sheet Builder Registry"
Cohesion: 0.23
Nodes (12): custom-sheet-builders.ts（各 facility 補充分頁統籌入口）, daycare-item-24-custom.ts（Kit 標準族範本起點）, daycare-item-3-custom.ts（契約族範本起點）, scripts/lib/excel-checklist-builder.ts（下載 xlsx 產線 A 樣式 SSOT）, Excel 產線 A：下載 xlsx（exceljs）, Excel 產線 B：DB FortuneSheet JSON, excel-template-builder.ts（FortuneSheet JSON 產線 B）, fortune-editor-inner.tsx（cellStyles 語意轉譯層） (+4 more)

### Community 11 - "LTC Care Categories (AA–GA)"
Cohesion: 0.18
Nodes (12): LTC 分類 AA：照顧管理服務及政策鼓勵服務（AA01–AA12）, LTC 分類 BA：照顧及專業服務（居家式）（BA01–BA24）, LTC 分類 BB：日間照顧（BB01–BB14）, LTC 分類 GA：喘息服務（GA03–GA07, GA09）, lib/ltc-care-combinations/index.ts（registry + 公開 API）, lib/ltc-care-combinations/metadata.ts（法規版本、生效日）, lib/ltc-care-combinations/types.ts（型別 SSOT）, knowledge/sources/external/regulations/ltc-payment-schedule-iv.md (+4 more)

### Community 12 - "Excel Editor Components"
Cohesion: 0.2
Nodes (2): applyAiProposal(), updateCell()

### Community 13 - "File Upload & Report Creation"
Cohesion: 0.33
Nodes (7): getFileType(), handleCreateReport(), handleUploadFiles(), onSuccess(), resetAndClose(), uploadExcelFile(), uploadWordFile()

### Community 15 - "Home Care Emergency & SOP Sheets"
Cohesion: 0.56
Nodes (9): buildAcuteIllnessSopSheet(), buildEmergencyContactSheet(), buildFallSopSheet(), buildHomeCareItem10CustomSheets(), buildMissingSopSheet(), rowH(), setMergedData(), setSectionHeader() (+1 more)

### Community 16 - "Home Care Admin Rules Sheets"
Cohesion: 0.56
Nodes (8): buildAdminRulesSheet(), buildAdminSopIndexSheet(), buildHomeCareItem15CustomSheets(), buildOrganizationCharterSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 17 - "Home Care Infection Control Sheets"
Cohesion: 0.56
Nodes (8): buildHomeCareItem26CustomSheets(), buildInfectionControlPlanSheet(), buildInfectionControlSopSheet(), buildPPETableSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 18 - "Home Care Quality Improvement Sheets"
Cohesion: 0.5
Nodes (7): buildHomeCareItem27CustomSheets(), buildQualityImprovementPlanSheet(), buildQualityIndicatorsTableSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 19 - "Home Care Staff Training Sheets"
Cohesion: 0.5
Nodes (7): buildAnnualTrainingPlanSheet(), buildHomeCareItem18CustomSheets(), buildOrientationTrainingSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 20 - "Home Care Performance System Sheets"
Cohesion: 0.5
Nodes (7): buildHomeCareItem20CustomSheets(), buildPerformanceCriteriaSheet(), buildPerformanceSystemSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 21 - "Home Care Quality Monitoring Sheets"
Cohesion: 0.5
Nodes (7): buildHomeCareItem29CustomSheets(), buildMetricsListSheet(), buildQualityMonitoringSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 22 - "Home Care Self-Assessment Sheets"
Cohesion: 0.5
Nodes (7): buildHomeCareItem30CustomSheets(), buildSelfAssessmentImprovementSheet(), buildSelfAssessmentProcedureSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 24 - "Shared Reports List (Batch Ops)"
Cohesion: 0.38
Nodes (3): clearSelection(), handleBatchCopy(), handleBatchDelete()

### Community 27 - "Excel Template Builder"
Cohesion: 0.38
Nodes (4): buildItemMultiSheetData(), buildItemSheetData(), buildSupplementarySheetData(), truncateSheetName()

### Community 28 - "Home Care Case Closure Sheets"
Cohesion: 0.52
Nodes (6): buildCaseClosure(), buildHomeCareItem14CustomSheets(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 29 - "Home Care Supervision Sheets"
Cohesion: 0.52
Nodes (6): buildHomeCareItem12CustomSheets(), buildSupervisionSystemSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 30 - "Home Care Privacy Policy Sheets"
Cohesion: 0.52
Nodes (6): buildHomeCareItem3CustomSheets(), buildPrivacyPolicySheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 31 - "Home Care Refund Policy Sheets"
Cohesion: 0.52
Nodes (6): buildHomeCareItem22CustomSheets(), buildRefundPolicySheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 32 - "Home Care Service Scope Sheets"
Cohesion: 0.52
Nodes (6): buildHomeCareItem9CustomSheets(), buildServiceScopeSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 34 - "Brand OG Images"
Cohesion: 0.33
Nodes (7): 報告汪 OG 圖（日間照顧頁）, 報告汪 OG 圖（居家照顧頁）, 報告汪 OG 圖（醫院頁）, 報告汪 OG 圖（住宿型機構頁）, 報告汪 OG 圖（根路由）, 報告汪品牌識別：白底、藍黑大標、橘紅強調色、清晰 CTA, 報告汪 Twitter Card 圖（根路由）

### Community 35 - "Draggable Reports List"
Cohesion: 0.47
Nodes (3): clearSelection(), handleBatchCopy(), handleBatchDelete()

### Community 37 - "Blog Post Page"
Cohesion: 0.5
Nodes (2): generateMetadata(), getPost()

### Community 42 - "Template Import Dialog"
Cohesion: 0.67
Nodes (2): fetchTemplates(), handleOpen()

### Community 59 - "Report Dialog Handleconfirm"
Cohesion: 1.0
Nodes (2): handleConfirm(), handleKeyDown()

## Knowledge Gaps
- **14 isolated node(s):** `custom-sheet-builders.ts（各 facility 補充分頁統籌入口）`, `補充分頁風格族群 B：契約族`, `lib/ltc-care-combinations/types.ts（型別 SSOT）`, `lib/ltc-care-combinations/metadata.ts（法規版本、生效日）`, `scripts/verify-ltc-care-combinations.ts（驗證腳本）` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Excel Editor Components`** (11 nodes): `addCol()`, `addRow()`, `applyAiProposal()`, `handleAiSubmit()`, `handleCellMouseUp()`, `handleDownload()`, `handleSave()`, `startColResize()`, `startRowResize()`, `excel-editor.tsx`, `updateCell()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Blog Post Page`** (5 nodes): `page.tsx`, `generateMetadata()`, `generateStaticParams()`, `getPost()`, `isValidImageUrl()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Template Import Dialog`** (4 nodes): `fetchTemplates()`, `handleImport()`, `handleOpen()`, `template-import-dialog.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Report Dialog Handleconfirm`** (3 nodes): `handleConfirm()`, `handleKeyDown()`, `save-report-dialog.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `createClient()` connect `API Routes & Route Handlers` to `AI Content Processing & API`, `Admin Layout & OpenRouter Client`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `POST()` connect `AI Content Processing & API` to `API Routes & Route Handlers`, `Admin Layout & OpenRouter Client`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `requireAdminApi()` connect `API Routes & Route Handlers` to `Admin Layout & OpenRouter Client`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Are the 50 inferred relationships involving `createClient()` (e.g. with `POST()` and `GET()`) actually correct?**
  _`createClient()` has 50 INFERRED edges - model-reasoned connections that need verification._
- **Are the 18 inferred relationships involving `requireAdminApi()` (e.g. with `GET()` and `POST()`) actually correct?**
  _`requireAdminApi()` has 18 INFERRED edges - model-reasoned connections that need verification._
- **What connects `custom-sheet-builders.ts（各 facility 補充分頁統籌入口）`, `補充分頁風格族群 B：契約族`, `lib/ltc-care-combinations/types.ts（型別 SSOT）` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `API Routes & Route Handlers` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._