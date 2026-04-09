# 分類標籤表（Taxonomy）

## 14 種機構類型

| Profile ID | 中文名稱 | 評鑑年度 | 備註 |
|-----------|---------|---------|------|
| `daycare` | 日間照顧中心 | 115 | 43 項 + 2 加分題 |
| `home-care` | 居家服務機構 | 115 | 32 項 |
| `nursing-home` | 住宿型照顧機構 | 114 | 75 項 |
| `hospital` | 醫院 | 114 | 124 項 |
| `disability-welfare` | 身心障礙福利機構 | 109 | 35 項 |
| `babycare` | 產後護理之家 | 115 | 17 項 |
| `home-nursing` | 居家護理所 | 115 | 8 項 |
| `general-nursing-home` | 一般護理之家 | 115 | 15 項 |
| `youth-care` | 兒少安置機構 | 112 | 35 項 |
| `elderly-welfare` | 老人福利機構 | 115 | 77 項 |
| `psychiatric-nursing-home` | 精神護理之家 | 115 | 36 項 |
| `infant-daycare` | 托嬰中心 | 114-116 | 60 項 |
| `psychiatric-rehabilitation-day` | 精神復健機構（日間型） | 115 | 36 項 |
| `psychiatric-rehabilitation-residential` | 精神復健機構（住宿型） | 115 | 36 項 |

## 區塊短碼（Section Short Codes）

各機構類型的區塊短碼，用於指標引用格式（如「權1」、「專5」）：

| 機構 | 短碼清單 |
|------|---------|
| daycare | 權、專、管、安、加 |
| home-care | 權、專、管、環 |
| nursing-home | 依各區塊 shortCode 欄位 |
| hospital | A、B、C... |
| 其他 | 依 profile.sections[n].shortCode |

## 主題標籤（Topic Tags）

用於交叉引用跨機構共通主題：

| Tag | 說明 | 常見中文關鍵詞 |
|-----|------|-------------|
| `infection-control` | 感染控制 | 感染、消毒、隔離、防疫 |
| `fire-safety` | 消防安全 | 消防、逃生、演練、滅火器 |
| `privacy-data-protection` | 隱私與個資保護 | 個人資料、保密、肖像權、個資法 |
| `complaint-mechanisms` | 申訴與意見反應 | 申訴、意見反應、投訴、陳情 |
| `staff-training` | 人員訓練 | 教育訓練、在職訓練、研習、課程 |
| `care-plans` | 照顧計畫 | 個別化、照顧計畫、服務計畫、評估 |
| `emergency-management` | 緊急事件處理 | 緊急、事故、跌倒、意外、通報 |
| `nutrition-diet` | 營養與飲食 | 飲食、營養、餐食、特殊飲食 |
| `medication-management` | 藥物管理 | 藥物、用藥、備藥、服藥 |
| `documentation` | 文件紀錄 | 紀錄、表單、檔案、文件、記錄 |
| `quality-monitoring` | 品質監控 | 品質、自評、督導、檢核、改善 |
| `financial-management` | 財務管理 | 財務、收費、費用、帳務 |
| `physical-environment` | 環境設施 | 環境、空間、設施、設備、無障礙 |
| `client-rights` | 個案權益 | 權益、自主、尊嚴、知情、同意 |
