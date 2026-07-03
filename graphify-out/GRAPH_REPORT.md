# Graph Report - with-supabase-app  (2026-07-04)

## Corpus Check
- 776 files · ~660,029 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2074 nodes · 2555 edges · 71 communities detected
- Extraction: 81% EXTRACTED · 19% INFERRED · 0% AMBIGUOUS · INFERRED: 484 edges (avg confidence: 0.8)
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
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 87|Community 87]]
- [[_COMMUNITY_Community 97|Community 97]]
- [[_COMMUNITY_Community 99|Community 99]]
- [[_COMMUNITY_Community 102|Community 102]]
- [[_COMMUNITY_Community 103|Community 103]]
- [[_COMMUNITY_Community 204|Community 204]]
- [[_COMMUNITY_Community 219|Community 219]]
- [[_COMMUNITY_Community 220|Community 220]]
- [[_COMMUNITY_Community 465|Community 465]]
- [[_COMMUNITY_Community 466|Community 466]]
- [[_COMMUNITY_Community 467|Community 467]]
- [[_COMMUNITY_Community 468|Community 468]]
- [[_COMMUNITY_Community 469|Community 469]]
- [[_COMMUNITY_Community 470|Community 470]]
- [[_COMMUNITY_Community 471|Community 471]]
- [[_COMMUNITY_Community 472|Community 472]]

## God Nodes (most connected - your core abstractions)
1. `buildPolicyDocSheet()` - 88 edges
2. `getDbUrl()` - 59 edges
3. `createClient()` - 56 edges
4. `buildTableSheet()` - 34 edges
5. `requireAdminApi()` - 26 edges
6. `trackEvent()` - 22 edges
7. `process_article()` - 17 edges
8. `fixSvg()` - 12 edges
9. `main()` - 12 edges
10. `serializeSheetData()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `handleResend()` --calls--> `createClient()`  [INFERRED]
  app/auth/sign-up-success/page.tsx → lib/supabase/server.ts
- `handleManualVerify()` --calls--> `createClient()`  [INFERRED]
  app/auth/confirm/page.tsx → lib/supabase/server.ts
- `GET()` --calls--> `createClient()`  [INFERRED]
  app/auth/oauth-callback/route.ts → lib/supabase/server.ts
- `AdminGuard()` --calls--> `requireAdmin()`  [INFERRED]
  app/admin/layout.tsx → lib/admin.ts
- `AdminFacilityPage()` --calls--> `getProfile()`  [INFERRED]
  app/admin/[facilityType]/page.tsx → lib/ai/evaluation-profiles/index.ts

## Hyperedges (group relationships)
- **Excel 雙產線共同樣式 SSOT 體系** — excel_pipeline_a, excel_pipeline_b, sheet_style_kit, excel_checklist_builder, excel_template_builder [EXTRACTED 0.95]
- **LTC 照顧組合代碼 → 知識文件 → AI 注入管線** — ltc_care_combinations_index, ltc_payment_schedule_iv_md, wiki_context_ts [EXTRACTED 1.00]
- **報告汪各 facility 頁面 OG 圖共用品牌系統** — og_image_root, og_image_day_care, og_image_home_care, og_image_hospital, og_image_residential, reportwang_brand_identity [EXTRACTED 0.95]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.02
Nodes (105): getDbUrl(), getEvaluationTip(), buildItemMultiSheetData(), buildItemSheetData(), buildSupplementarySheetData(), serializeSheetData(), truncateSheetName(), buildExtendedReading() (+97 more)

### Community 1 - "Community 1"
Cohesion: 0.02
Nodes (122): buildEvacuationStrategyPolicy(), buildFireSeedTrainingPlan(), buildGeneralNursingHomeItem11CustomSheets(), buildGeneralNursingHomeItem12CustomSheets(), buildNightDrillPlan(), buildScenarioDrillPlan(), buildScenarioDrillRecordSheet(), buildGeneralNursingHomeItem4CustomSheets() (+114 more)

### Community 2 - "Community 2"
Cohesion: 0.02
Nodes (77): AdminGuard(), canAccessReport(), canEditReport(), canEditTag(), canViewTag(), GET(), POST(), GET() (+69 more)

### Community 3 - "Community 3"
Cohesion: 0.03
Nodes (96): build補_個資保護政策Sheet(), buildAttendanceSheet(), buildBenefitsSheet(), buildDaycareItem24CustomSheets(), buildDutyDescSheet(), buildHiringSheet(), buildIncidentSOPSheet(), buildOrgChartSheet() (+88 more)

### Community 4 - "Community 4"
Cohesion: 0.04
Nodes (30): handleAsk(), handleResend(), handleSubmit(), handleCopyLink(), handleOpenExternal(), handleAiSubmit(), handleSignUp(), fetchTemplates() (+22 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (57): _build_article_index(), calc_cjk_x(), cjk_width(), derive_audience_from_slug(), derive_person_info(), derive_pills_from_tags(), derive_quote_lines(), derive_vs_content() (+49 more)

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (36): excelJsonToText(), processContent(), stripHtml(), createOpenRouterClient(), checkAndRecordPublicUsage(), getClientIpHash(), getUtcDateBucket(), POST() (+28 more)

### Community 7 - "Community 7"
Cohesion: 0.05
Nodes (14): dismissAiIntro(), escapeHtml(), handleAddMember(), handleAiSubmit(), handleDownload(), handleEditorMouseUp(), handleRemoveMember(), handleUpdatePermission() (+6 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (26): AiEditingPage(), RootLayout(), BlogContent(), BlogListPage(), buildConditions(), getCategories(), getPosts(), getPostsCount() (+18 more)

### Community 9 - "Community 9"
Cohesion: 0.09
Nodes (26): extractKeypoints(), truncate(), detectHighlight(), generateHashtags(), isDeficiencyType(), keypointsToCarousel(), makeBlogUrl(), selectTagPills() (+18 more)

### Community 10 - "Community 10"
Cohesion: 0.13
Nodes (25): getAllProfiles(), getProfile(), AdminFacilityPage(), ensureDir(), today(), copySkills(), extractProfiles(), extractSupplementarySheets() (+17 more)

### Community 12 - "Community 12"
Cohesion: 0.12
Nodes (13): injectHeadingIdsAndExtractToc(), injectImageLoadingAttrs(), splitHtmlAtNthH2(), splitHtmlForMidNewsletter(), escapeRegex(), injectFacilityInlineLinks(), extractBlogJsonLdData(), extractFaqPairs() (+5 more)

### Community 13 - "Community 13"
Cohesion: 0.23
Nodes (23): attr(), checkWellFormed(), checkXmlAttributes(), checkXmlTextEntities(), expectedQFont(), fail(), findTagEnd(), fixSvg() (+15 more)

### Community 14 - "Community 14"
Cohesion: 0.19
Nodes (16): buildCarousel(), makeOutputDir(), svgToJpg(), blogCard(), esc(), renderChecklistSlide(), renderCoverSlide(), renderCtaSlide() (+8 more)

### Community 15 - "Community 15"
Cohesion: 0.12
Nodes (11): addSheet(), generateChecklistFromProfile(), main(), main(), main(), sectionToGroups(), main(), sectionToGroups() (+3 more)

### Community 16 - "Community 16"
Cohesion: 0.29
Nodes (15): buildDaycareItem35CustomSheets(), buildAnnex1Sheet(), buildAnnex2Sheet(), buildAnnex3Sheet(), buildAnnex4Sheet(), buildAnnex5Sheet(), buildDaycareItem3CustomSheets(), buildMainContractSheet() (+7 more)

### Community 17 - "Community 17"
Cohesion: 0.47
Nodes (15): buildAnnex1ImageRightSheet(), buildAnnex2PersonalDataSheet(), buildAnnex3DelegationSheet(), buildAnnex4ServiceItemsSheet(), buildAnnex5RestraintSheet(), buildAnnex6EmergencySheet(), buildContractTextLowerSheet(), buildContractTextUpperSheet() (+7 more)

### Community 18 - "Community 18"
Cohesion: 0.21
Nodes (14): categories(), checklist(), cover(), flow3(), flow4(), list3(), list4(), list5() (+6 more)

### Community 19 - "Community 19"
Cohesion: 0.53
Nodes (13): buildContractAttachment1Sheet(), buildContractAttachment2Sheet(), buildContractAttachment3Sheet(), buildContractAttachment4Sheet(), buildContractAttachment5Sheet(), buildHomeCareItem2CustomSheets(), buildRightsPolicySheet(), buildRightsStatementSheet() (+5 more)

### Community 20 - "Community 20"
Cohesion: 0.26
Nodes (12): GET(), buildEmail1(), buildEmail2(), buildEmail3(), buildHeaders(), FROM(), getResend(), REPLY_TO() (+4 more)

### Community 22 - "Community 22"
Cohesion: 0.44
Nodes (9): authorize(), byPage(), dateRange(), lowCtr(), main(), sitemapStatus(), topPages(), topQueries() (+1 more)

### Community 23 - "Community 23"
Cohesion: 0.56
Nodes (9): buildAcuteIllnessSopSheet(), buildEmergencyContactSheet(), buildFallSopSheet(), buildHomeCareItem10CustomSheets(), buildMissingSopSheet(), rowH(), setMergedData(), setSectionHeader() (+1 more)

### Community 24 - "Community 24"
Cohesion: 0.44
Nodes (8): buildFluVaccinationRecord(), buildHomeNursingInfectionControlManual(), buildHomeNursingItem2CustomSheets(), buildInfectionManualVersionLog(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 25 - "Community 25"
Cohesion: 0.56
Nodes (8): buildAdminRulesSheet(), buildAdminSopIndexSheet(), buildHomeCareItem15CustomSheets(), buildOrganizationCharterSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 26 - "Community 26"
Cohesion: 0.56
Nodes (8): buildHomeCareItem26CustomSheets(), buildInfectionControlPlanSheet(), buildInfectionControlSopSheet(), buildPPETableSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 27 - "Community 27"
Cohesion: 0.36
Nodes (7): col_letter_to_index(), extract_sheet(), main(), parse_merge_range(), 從 Numbers 檔案提取日照中心評鑑相關資料，輸出為 JSON。 用途：提供給 import-numbers-daycare.ts 匯入至資料庫。  執行方, 將 Excel 欄位字母（A、B、AA 等）轉換為 0-based 索引。, 將 Excel 範圍字串（如 'A1:F1'）解析為 {r, c, rs, cs}。     Numbers 的列號為 1-based，轉為 0-based。

### Community 28 - "Community 28"
Cohesion: 0.5
Nodes (7): buildHomeCareItem27CustomSheets(), buildQualityImprovementPlanSheet(), buildQualityIndicatorsTableSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 29 - "Community 29"
Cohesion: 0.5
Nodes (7): buildAnnualTrainingPlanSheet(), buildHomeCareItem18CustomSheets(), buildOrientationTrainingSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 30 - "Community 30"
Cohesion: 0.54
Nodes (7): buildNursingHomeItem5CustomSheets(), buildPolicySheet(), buildProcedureSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 31 - "Community 31"
Cohesion: 0.5
Nodes (7): buildHomeCareItem20CustomSheets(), buildPerformanceCriteriaSheet(), buildPerformanceSystemSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 32 - "Community 32"
Cohesion: 0.5
Nodes (7): buildHomeCareItem29CustomSheets(), buildMetricsListSheet(), buildQualityMonitoringSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 33 - "Community 33"
Cohesion: 0.5
Nodes (7): buildHomeCareItem30CustomSheets(), buildSelfAssessmentImprovementSheet(), buildSelfAssessmentProcedureSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 35 - "Community 35"
Cohesion: 0.38
Nodes (3): clearSelection(), handleBatchCopy(), handleBatchDelete()

### Community 38 - "Community 38"
Cohesion: 0.48
Nodes (4): computeStats(), countPattern(), mainH2Count(), textLength()

### Community 39 - "Community 39"
Cohesion: 0.52
Nodes (6): buildCaseClosure(), buildHomeCareItem14CustomSheets(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 40 - "Community 40"
Cohesion: 0.52
Nodes (6): buildHomeCareItem12CustomSheets(), buildSupervisionSystemSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 41 - "Community 41"
Cohesion: 0.52
Nodes (6): buildHomeCareItem3CustomSheets(), buildPrivacyPolicySheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 42 - "Community 42"
Cohesion: 0.52
Nodes (6): buildHomeCareItem22CustomSheets(), buildRefundPolicySheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 43 - "Community 43"
Cohesion: 0.52
Nodes (6): buildHomeCareItem9CustomSheets(), buildServiceScopeSheet(), rowH(), setMergedData(), setSectionHeader(), setTitleRow()

### Community 44 - "Community 44"
Cohesion: 0.33
Nodes (7): 報告汪 OG 圖（日間照顧頁）, 報告汪 OG 圖（居家照顧頁）, 報告汪 OG 圖（醫院頁）, 報告汪 OG 圖（住宿型機構頁）, 報告汪 OG 圖（根路由）, 報告汪品牌識別：白底、藍黑大標、橘紅強調色、清晰 CTA, 報告汪 Twitter Card 圖（根路由）

### Community 45 - "Community 45"
Cohesion: 0.47
Nodes (4): isUnsubscribeIntent(), fetchEmailContent(), parseEmailAddress(), POST()

### Community 46 - "Community 46"
Cohesion: 0.47
Nodes (3): clearSelection(), handleBatchCopy(), handleBatchDelete()

### Community 49 - "Community 49"
Cohesion: 0.6
Nodes (4): buildOverviewSheet(), buildSectionSheet(), main(), styleHeaderRow()

### Community 50 - "Community 50"
Cohesion: 0.53
Nodes (5): main(), makeCell(), makeSheet(), renderLabel(), renderSvg()

### Community 51 - "Community 51"
Cohesion: 0.6
Nodes (2): GET(), rfc822()

### Community 52 - "Community 52"
Cohesion: 0.4
Nodes (1): cn()

### Community 55 - "Community 55"
Cohesion: 0.6
Nodes (3): getFacilitySlug(), getSchoolReviewDate(), getSchoolReviewer()

### Community 56 - "Community 56"
Cohesion: 0.5
Nodes (3): getFacilityInfoFromPost(), detectContentType(), main()

### Community 58 - "Community 58"
Cohesion: 0.83
Nodes (3): doUnsubscribe(), GET(), POST()

### Community 68 - "Community 68"
Cohesion: 0.67
Nodes (2): BlogToc(), flatten()

### Community 70 - "Community 70"
Cohesion: 0.83
Nodes (3): main(), rescueHomeNursingPdca(), rescuePsychiatricCarePlan()

### Community 71 - "Community 71"
Cohesion: 0.83
Nodes (3): improveDaycarePostEval(), improveElderlyWelfareInterview(), main()

### Community 72 - "Community 72"
Cohesion: 0.83
Nodes (3): addDemoLink(), addDownloadsLink(), main()

### Community 78 - "Community 78"
Cohesion: 0.67
Nodes (1): Image()

### Community 81 - "Community 81"
Cohesion: 0.67
Nodes (1): DashboardLayout()

### Community 87 - "Community 87"
Cohesion: 1.0
Nodes (2): handleConfirm(), handleKeyDown()

### Community 97 - "Community 97"
Cohesion: 1.0
Nodes (2): main(), pct()

### Community 99 - "Community 99"
Cohesion: 1.0
Nodes (2): generate(), getCategoryFromCriteria()

### Community 102 - "Community 102"
Cohesion: 1.0
Nodes (2): classify(), main()

### Community 103 - "Community 103"
Cohesion: 1.0
Nodes (2): addSheet(), main()

### Community 204 - "Community 204"
Cohesion: 1.0
Nodes (1): 一次性：透過 OAuth Desktop App + GA Admin API 把 reportwang-ga-reader SA 加為 GA4 propert

### Community 219 - "Community 219"
Cohesion: 1.0
Nodes (2): Excel 產線 A：下載 xlsx（exceljs）, Excel 產線 B：DB FortuneSheet JSON

### Community 220 - "Community 220"
Cohesion: 1.0
Nodes (2): knowledge/sources/external/regulations/ltc-payment-schedule-iv.md, LTC 照顧組合表 README

### Community 465 - "Community 465"
Cohesion: 1.0
Nodes (1): 補充分頁 Excel 排版規範 README

### Community 466 - "Community 466"
Cohesion: 1.0
Nodes (1): 補充分頁風格族群 A：Kit 標準族

### Community 467 - "Community 467"
Cohesion: 1.0
Nodes (1): 補充分頁風格族群 B：契約族

### Community 468 - "Community 468"
Cohesion: 1.0
Nodes (1): 長期照顧服務申請及給付辦法附表四（照顧組合表）

### Community 469 - "Community 469"
Cohesion: 1.0
Nodes (1): LTC 分類 AA：照顧管理服務及政策鼓勵服務（AA01–AA12）

### Community 470 - "Community 470"
Cohesion: 1.0
Nodes (1): LTC 分類 BA：照顧及專業服務（居家式）（BA01–BA24）

### Community 471 - "Community 471"
Cohesion: 1.0
Nodes (1): LTC 分類 BB：日間照顧（BB01–BB14）

### Community 472 - "Community 472"
Cohesion: 1.0
Nodes (1): LTC 分類 GA：喘息服務（GA03–GA07, GA09）

## Knowledge Gaps
- **47 isolated node(s):** `rows = [(label, desc, s1, s2), ...]  3 rows`, `steps = [(title, d1, d2, pill), ...]  3 steps`, `cards = [(color, bg, card_title, items[3], chip), ...]  4 cards`, `left/right_items = [(done:bool, text), ...]`, `right_cards = [(title, subtitle_text, color), ...] up to 4` (+42 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 51`** (5 nodes): `route.ts`, `route.ts`, `GET()`, `rfc822()`, `xmlEscape()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 52`** (5 nodes): `edit-form.tsx`, `edit-form.tsx`, `BlogEditForm()`, `ClassEditForm()`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 68`** (4 nodes): `BlogToc()`, `flatten()`, `TocItem()`, `blog-toc.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (3 nodes): `opengraph-image.tsx`, `opengraph-image.tsx`, `Image()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (3 nodes): `layout.tsx`, `layout.tsx`, `DashboardLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 87`** (3 nodes): `handleConfirm()`, `handleKeyDown()`, `save-report-dialog.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 97`** (3 nodes): `main()`, `pct()`, `audit-blog-seo-meta.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 99`** (3 nodes): `generate()`, `getCategoryFromCriteria()`, `generate-hospital-eval-excel.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 102`** (3 nodes): `classify()`, `main()`, `classify-blog-covers.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 103`** (3 nodes): `addSheet()`, `main()`, `generate-psychiatric-nursing-home-checklist.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 204`** (2 nodes): `grant-sa-ga4-access.py`, `一次性：透過 OAuth Desktop App + GA Admin API 把 reportwang-ga-reader SA 加為 GA4 propert`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 219`** (2 nodes): `Excel 產線 A：下載 xlsx（exceljs）`, `Excel 產線 B：DB FortuneSheet JSON`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 220`** (2 nodes): `knowledge/sources/external/regulations/ltc-payment-schedule-iv.md`, `LTC 照顧組合表 README`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 465`** (1 nodes): `補充分頁 Excel 排版規範 README`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 466`** (1 nodes): `補充分頁風格族群 A：Kit 標準族`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 467`** (1 nodes): `補充分頁風格族群 B：契約族`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 468`** (1 nodes): `長期照顧服務申請及給付辦法附表四（照顧組合表）`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 469`** (1 nodes): `LTC 分類 AA：照顧管理服務及政策鼓勵服務（AA01–AA12）`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 470`** (1 nodes): `LTC 分類 BA：照顧及專業服務（居家式）（BA01–BA24）`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 471`** (1 nodes): `LTC 分類 BB：日間照顧（BB01–BB14）`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 472`** (1 nodes): `LTC 分類 GA：喘息服務（GA03–GA07, GA09）`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `createClient()` connect `Community 2` to `Community 4`, `Community 6`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `extractSupplementarySheets()` connect `Community 10` to `Community 0`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 85 inferred relationships involving `buildPolicyDocSheet()` (e.g. with `buildCommunityResourcePolicy()` and `buildTrainingPlanPolicy()`) actually correct?**
  _`buildPolicyDocSheet()` has 85 INFERRED edges - model-reasoned connections that need verification._
- **Are the 58 inferred relationships involving `getDbUrl()` (e.g. with `main()` and `main()`) actually correct?**
  _`getDbUrl()` has 58 INFERRED edges - model-reasoned connections that need verification._
- **Are the 55 inferred relationships involving `createClient()` (e.g. with `handleResend()` and `handleManualVerify()`) actually correct?**
  _`createClient()` has 55 INFERRED edges - model-reasoned connections that need verification._
- **Are the 29 inferred relationships involving `buildTableSheet()` (e.g. with `buildTrainingNeedsSheet()` and `buildOrgChartSheet()`) actually correct?**
  _`buildTableSheet()` has 29 INFERRED edges - model-reasoned connections that need verification._
- **Are the 25 inferred relationships involving `requireAdminApi()` (e.g. with `GET()` and `POST()`) actually correct?**
  _`requireAdminApi()` has 25 INFERRED edges - model-reasoned connections that need verification._