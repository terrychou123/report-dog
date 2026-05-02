# Graph Report - with-supabase-app  (2026-05-03)

## Corpus Check
- 561 files · ~519,491 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1518 nodes · 1906 edges · 54 communities detected
- Extraction: 82% EXTRACTED · 18% INFERRED · 0% AMBIGUOUS · INFERRED: 340 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 151|Community 151]]
- [[_COMMUNITY_Community 157|Community 157]]
- [[_COMMUNITY_Community 158|Community 158]]
- [[_COMMUNITY_Community 349|Community 349]]
- [[_COMMUNITY_Community 350|Community 350]]
- [[_COMMUNITY_Community 351|Community 351]]
- [[_COMMUNITY_Community 352|Community 352]]
- [[_COMMUNITY_Community 353|Community 353]]
- [[_COMMUNITY_Community 354|Community 354]]
- [[_COMMUNITY_Community 355|Community 355]]
- [[_COMMUNITY_Community 356|Community 356]]

## God Nodes (most connected - your core abstractions)
1. `buildPolicyDocSheet()` - 72 edges
2. `createClient()` - 51 edges
3. `getDbUrl()` - 34 edges
4. `buildTableSheet()` - 24 edges
5. `requireAdminApi()` - 19 edges
6. `process_article()` - 17 edges
7. `fixSvg()` - 12 edges
8. `main()` - 12 edges
9. `main()` - 11 edges
10. `gen_standard_svg()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `AdminFacilityPage()` --calls--> `getProfile()`  [INFERRED]
  app/admin/[facilityType]/page.tsx → lib/ai/evaluation-profiles/index.ts
- `GET()` --calls--> `canViewTag()`  [INFERRED]
  app/api/admin/tag-reports/route.ts → lib/auth/tag-permissions.ts
- `POST()` --calls--> `createClient()`  [INFERRED]
  app/api/excel/parse/route.ts → lib/supabase/server.ts
- `GET()` --calls--> `getAllProfiles()`  [INFERRED]
  app/api/templates/route.ts → lib/ai/evaluation-profiles/index.ts
- `POST()` --calls--> `requireAdminApi()`  [INFERRED]
  app/api/admin/templates/route.ts → lib/admin.ts

## Hyperedges (group relationships)
- **Excel 雙產線共同樣式 SSOT 體系** — excel_pipeline_a, excel_pipeline_b, sheet_style_kit, excel_checklist_builder, excel_template_builder [EXTRACTED 0.95]
- **LTC 照顧組合代碼 → 知識文件 → AI 注入管線** — ltc_care_combinations_index, ltc_payment_schedule_iv_md, wiki_context_ts [EXTRACTED 1.00]
- **報告汪各 facility 頁面 OG 圖共用品牌系統** — og_image_root, og_image_day_care, og_image_home_care, og_image_hospital, og_image_residential, reportwang_brand_identity [EXTRACTED 0.95]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.02
Nodes (107): buildNursingHomeItem10CustomSheets(), buildQualityManagementPolicy(), buildCarePlanPolicy(), buildNursingHomeItem11CustomSheets(), buildAdaptationSop(), buildNursingHomeItem12CustomSheets(), buildInterdisciplinaryPolicy(), buildNursingHomeItem13CustomSheets() (+99 more)

### Community 1 - "Community 1"
Cohesion: 0.02
Nodes (74): AdminGuard(), createOpenRouterClient(), POST(), canAccessReport(), canEditReport(), canEditTag(), canViewTag(), GET() (+66 more)

### Community 2 - "Community 2"
Cohesion: 0.03
Nodes (53): getDbUrl(), getEvaluationTip(), buildItemMultiSheetData(), buildItemSheetData(), buildSupplementarySheetData(), serializeSheetData(), truncateSheetName(), main() (+45 more)

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (74): build補_個資保護政策Sheet(), buildAttendanceSheet(), buildBenefitsSheet(), buildDaycareItem24CustomSheets(), buildDutyDescSheet(), buildHiringSheet(), buildIncidentSOPSheet(), buildOrgChartSheet() (+66 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (57): _build_article_index(), calc_cjk_x(), cjk_width(), derive_audience_from_slug(), derive_person_info(), derive_pills_from_tags(), derive_quote_lines(), derive_vs_content() (+49 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (12): escapeHtml(), handleAddMember(), handleDownload(), handleEditorMouseUp(), handleRemoveMember(), handleUpdatePermission(), load(), openAiDialogWithText() (+4 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (25): extractKeypoints(), detectHighlight(), generateHashtags(), isDeficiencyType(), keypointsToCarousel(), makeBlogUrl(), selectTagPills(), splitTitle() (+17 more)

### Community 7 - "Community 7"
Cohesion: 0.13
Nodes (26): getAllProfiles(), getProfile(), AdminFacilityPage(), ensureDir(), today(), copySkills(), extractProfiles(), extractSupplementarySheets() (+18 more)

### Community 8 - "Community 8"
Cohesion: 0.21
Nodes (23): attr(), checkWellFormed(), checkXmlAttributes(), checkXmlTextEntities(), expectedQFont(), fail(), findTagEnd(), fixSvg() (+15 more)

### Community 9 - "Community 9"
Cohesion: 0.19
Nodes (16): buildCarousel(), makeOutputDir(), svgToJpg(), blogCard(), esc(), renderChecklistSlide(), renderCoverSlide(), renderCtaSlide() (+8 more)

### Community 10 - "Community 10"
Cohesion: 0.15
Nodes (17): excelJsonToText(), processContent(), stripHtml(), checkAndRecordAiUsage(), countUsageToday(), getAiUsageToday(), getUserTier(), getUtcDateBucket() (+9 more)

### Community 11 - "Community 11"
Cohesion: 0.12
Nodes (9): addSheet(), generateChecklistFromProfile(), main(), main(), main(), main(), main(), main() (+1 more)

### Community 12 - "Community 12"
Cohesion: 0.29
Nodes (15): buildDaycareItem35CustomSheets(), buildAnnex1Sheet(), buildAnnex2Sheet(), buildAnnex3Sheet(), buildAnnex4Sheet(), buildAnnex5Sheet(), buildDaycareItem3CustomSheets(), buildMainContractSheet() (+7 more)

### Community 13 - "Community 13"
Cohesion: 0.47
Nodes (15): buildAnnex1ImageRightSheet(), buildAnnex2PersonalDataSheet(), buildAnnex3DelegationSheet(), buildAnnex4ServiceItemsSheet(), buildAnnex5RestraintSheet(), buildAnnex6EmergencySheet(), buildContractTextLowerSheet(), buildContractTextUpperSheet() (+7 more)

### Community 14 - "Community 14"
Cohesion: 0.21
Nodes (14): categories(), checklist(), cover(), flow3(), flow4(), list3(), list4(), list5() (+6 more)

### Community 15 - "Community 15"
Cohesion: 0.53
Nodes (13): buildContractAttachment1Sheet(), buildContractAttachment2Sheet(), buildContractAttachment3Sheet(), buildContractAttachment4Sheet(), buildContractAttachment5Sheet(), buildHomeCareItem2CustomSheets(), buildRightsPolicySheet(), buildRightsStatementSheet() (+5 more)

### Community 17 - "Community 17"
Cohesion: 0.2
Nodes (2): applyAiProposal(), updateCell()

### Community 18 - "Community 18"
Cohesion: 0.33
Nodes (7): getFileType(), handleCreateReport(), handleUploadFiles(), onSuccess(), resetAndClose(), uploadExcelFile(), uploadWordFile()

### Community 20 - "Community 20"
Cohesion: 0.56
Nodes (9): buildAcuteIllnessSopSheet(), buildEmergencyContactSheet(), buildFallSopSheet(), buildHomeCareItem10CustomSheets(), buildMissingSopSheet(), rowH(), setMergedData(), setSectionHeader() (+1 more)

### Community 21 - "Community 21"
Cohesion: 0.56
Nodes (8): buildAdminRulesSheet(), buildAdminSopIndexSheet(), buildHomeCareItem15CustomSheets(), buildOrganizationCharterSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 22 - "Community 22"
Cohesion: 0.56
Nodes (8): buildHomeCareItem26CustomSheets(), buildInfectionControlPlanSheet(), buildInfectionControlSopSheet(), buildPPETableSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 23 - "Community 23"
Cohesion: 0.36
Nodes (7): col_letter_to_index(), extract_sheet(), main(), parse_merge_range(), 從 Numbers 檔案提取日照中心評鑑相關資料，輸出為 JSON。 用途：提供給 import-numbers-daycare.ts 匯入至資料庫。  執行方, 將 Excel 欄位字母（A、B、AA 等）轉換為 0-based 索引。, 將 Excel 範圍字串（如 'A1:F1'）解析為 {r, c, rs, cs}。     Numbers 的列號為 1-based，轉為 0-based。

### Community 24 - "Community 24"
Cohesion: 0.5
Nodes (7): buildHomeCareItem27CustomSheets(), buildQualityImprovementPlanSheet(), buildQualityIndicatorsTableSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 25 - "Community 25"
Cohesion: 0.5
Nodes (7): buildAnnualTrainingPlanSheet(), buildHomeCareItem18CustomSheets(), buildOrientationTrainingSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 26 - "Community 26"
Cohesion: 0.54
Nodes (7): buildNursingHomeItem5CustomSheets(), buildPolicySheet(), buildProcedureSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 27 - "Community 27"
Cohesion: 0.5
Nodes (7): buildHomeCareItem20CustomSheets(), buildPerformanceCriteriaSheet(), buildPerformanceSystemSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 28 - "Community 28"
Cohesion: 0.5
Nodes (7): buildHomeCareItem29CustomSheets(), buildMetricsListSheet(), buildQualityMonitoringSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 29 - "Community 29"
Cohesion: 0.5
Nodes (7): buildHomeCareItem30CustomSheets(), buildSelfAssessmentImprovementSheet(), buildSelfAssessmentProcedureSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 31 - "Community 31"
Cohesion: 0.38
Nodes (3): clearSelection(), handleBatchCopy(), handleBatchDelete()

### Community 34 - "Community 34"
Cohesion: 0.52
Nodes (6): buildCaseClosure(), buildHomeCareItem14CustomSheets(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 35 - "Community 35"
Cohesion: 0.52
Nodes (6): buildHomeCareItem12CustomSheets(), buildSupervisionSystemSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 36 - "Community 36"
Cohesion: 0.52
Nodes (6): buildHomeCareItem3CustomSheets(), buildPrivacyPolicySheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 37 - "Community 37"
Cohesion: 0.52
Nodes (6): buildHomeCareItem22CustomSheets(), buildRefundPolicySheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 38 - "Community 38"
Cohesion: 0.52
Nodes (6): buildHomeCareItem9CustomSheets(), buildServiceScopeSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 40 - "Community 40"
Cohesion: 0.33
Nodes (7): 報告汪 OG 圖（日間照顧頁）, 報告汪 OG 圖（居家照顧頁）, 報告汪 OG 圖（醫院頁）, 報告汪 OG 圖（住宿型機構頁）, 報告汪 OG 圖（根路由）, 報告汪品牌識別：白底、藍黑大標、橘紅強調色、清晰 CTA, 報告汪 Twitter Card 圖（根路由）

### Community 41 - "Community 41"
Cohesion: 0.47
Nodes (3): clearSelection(), handleBatchCopy(), handleBatchDelete()

### Community 43 - "Community 43"
Cohesion: 0.6
Nodes (4): buildOverviewSheet(), buildSectionSheet(), main(), styleHeaderRow()

### Community 44 - "Community 44"
Cohesion: 0.5
Nodes (2): generateMetadata(), getPost()

### Community 49 - "Community 49"
Cohesion: 0.67
Nodes (2): fetchTemplates(), handleOpen()

### Community 66 - "Community 66"
Cohesion: 1.0
Nodes (2): handleConfirm(), handleKeyDown()

### Community 73 - "Community 73"
Cohesion: 1.0
Nodes (2): generate(), getCategoryFromCriteria()

### Community 75 - "Community 75"
Cohesion: 1.0
Nodes (2): classify(), main()

### Community 76 - "Community 76"
Cohesion: 1.0
Nodes (2): addSheet(), main()

### Community 151 - "Community 151"
Cohesion: 1.0
Nodes (1): 一次性：透過 OAuth Desktop App + GA Admin API 把 reportwang-ga-reader SA 加為 GA4 propert

### Community 157 - "Community 157"
Cohesion: 1.0
Nodes (2): Excel 產線 A：下載 xlsx（exceljs）, Excel 產線 B：DB FortuneSheet JSON

### Community 158 - "Community 158"
Cohesion: 1.0
Nodes (2): knowledge/sources/external/regulations/ltc-payment-schedule-iv.md, LTC 照顧組合表 README

### Community 349 - "Community 349"
Cohesion: 1.0
Nodes (1): 補充分頁 Excel 排版規範 README

### Community 350 - "Community 350"
Cohesion: 1.0
Nodes (1): 補充分頁風格族群 A：Kit 標準族

### Community 351 - "Community 351"
Cohesion: 1.0
Nodes (1): 補充分頁風格族群 B：契約族

### Community 352 - "Community 352"
Cohesion: 1.0
Nodes (1): 長期照顧服務申請及給付辦法附表四（照顧組合表）

### Community 353 - "Community 353"
Cohesion: 1.0
Nodes (1): LTC 分類 AA：照顧管理服務及政策鼓勵服務（AA01–AA12）

### Community 354 - "Community 354"
Cohesion: 1.0
Nodes (1): LTC 分類 BA：照顧及專業服務（居家式）（BA01–BA24）

### Community 355 - "Community 355"
Cohesion: 1.0
Nodes (1): LTC 分類 BB：日間照顧（BB01–BB14）

### Community 356 - "Community 356"
Cohesion: 1.0
Nodes (1): LTC 分類 GA：喘息服務（GA03–GA07, GA09）

## Knowledge Gaps
- **47 isolated node(s):** `rows = [(label, desc, s1, s2), ...]  3 rows`, `steps = [(title, d1, d2, pill), ...]  3 steps`, `cards = [(color, bg, card_title, items[3], chip), ...]  4 cards`, `left/right_items = [(done:bool, text), ...]`, `right_cards = [(title, subtitle_text, color), ...] up to 4` (+42 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 17`** (11 nodes): `addCol()`, `addRow()`, `applyAiProposal()`, `handleAiSubmit()`, `handleCellMouseUp()`, `handleDownload()`, `handleSave()`, `startColResize()`, `startRowResize()`, `excel-editor.tsx`, `updateCell()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (5 nodes): `page.tsx`, `generateMetadata()`, `generateStaticParams()`, `getPost()`, `isValidImageUrl()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (4 nodes): `fetchTemplates()`, `handleImport()`, `handleOpen()`, `template-import-dialog.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (3 nodes): `handleConfirm()`, `handleKeyDown()`, `save-report-dialog.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 73`** (3 nodes): `generate()`, `getCategoryFromCriteria()`, `generate-hospital-eval-excel.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 75`** (3 nodes): `classify()`, `main()`, `classify-blog-covers.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (3 nodes): `addSheet()`, `main()`, `generate-psychiatric-nursing-home-checklist.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 151`** (2 nodes): `grant-sa-ga4-access.py`, `一次性：透過 OAuth Desktop App + GA Admin API 把 reportwang-ga-reader SA 加為 GA4 propert`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 157`** (2 nodes): `Excel 產線 A：下載 xlsx（exceljs）`, `Excel 產線 B：DB FortuneSheet JSON`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 158`** (2 nodes): `knowledge/sources/external/regulations/ltc-payment-schedule-iv.md`, `LTC 照顧組合表 README`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 349`** (1 nodes): `補充分頁 Excel 排版規範 README`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 350`** (1 nodes): `補充分頁風格族群 A：Kit 標準族`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 351`** (1 nodes): `補充分頁風格族群 B：契約族`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 352`** (1 nodes): `長期照顧服務申請及給付辦法附表四（照顧組合表）`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 353`** (1 nodes): `LTC 分類 AA：照顧管理服務及政策鼓勵服務（AA01–AA12）`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 354`** (1 nodes): `LTC 分類 BA：照顧及專業服務（居家式）（BA01–BA24）`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 355`** (1 nodes): `LTC 分類 BB：日間照顧（BB01–BB14）`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 356`** (1 nodes): `LTC 分類 GA：喘息服務（GA03–GA07, GA09）`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `createClient()` connect `Community 1` to `Community 10`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `buildPolicyDocSheet()` connect `Community 0` to `Community 3`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `POST()` connect `Community 10` to `Community 1`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 69 inferred relationships involving `buildPolicyDocSheet()` (e.g. with `buildCommunityResourcePolicy()` and `buildTrainingPlanPolicy()`) actually correct?**
  _`buildPolicyDocSheet()` has 69 INFERRED edges - model-reasoned connections that need verification._
- **Are the 50 inferred relationships involving `createClient()` (e.g. with `POST()` and `GET()`) actually correct?**
  _`createClient()` has 50 INFERRED edges - model-reasoned connections that need verification._
- **Are the 33 inferred relationships involving `getDbUrl()` (e.g. with `main()` and `main()`) actually correct?**
  _`getDbUrl()` has 33 INFERRED edges - model-reasoned connections that need verification._
- **Are the 19 inferred relationships involving `buildTableSheet()` (e.g. with `buildTrainingNeedsSheet()` and `buildOrgChartSheet()`) actually correct?**
  _`buildTableSheet()` has 19 INFERRED edges - model-reasoned connections that need verification._