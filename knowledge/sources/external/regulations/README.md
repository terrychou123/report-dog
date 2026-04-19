---
title: 長照法規資料庫索引
type: index
last_updated: 2026-04-19
---

# 長照法規資料庫

本目錄收錄與**長照機構設立、管理及評鑑**直接相關之法規，結構化整理供 AI 評鑑分析使用。

## 目錄結構

```
regulations/
├── README.md                        # 本索引
├── ltc-service-act.md               # 長期照顧服務法（母法）
├── ltc-permit-management.md         # 長照機構設立許可及管理辦法
├── ltc-institution-standards-core.md # 設立標準主文（負責人資格、通則）
└── standards/
    ├── home-care.md                 # 附件一：居家式設立標準表
    ├── community.md                 # 附件二：社區式設立標準表
    └── residential.md               # 附件三：住宿式設立標準表
```

## 適用對象對照

| 資料檔 | 適用機構類型 |
|--------|------------|
| `ltc-service-act.md` | 全機構類型 |
| `ltc-permit-management.md` | 全機構類型 |
| `ltc-institution-standards-core.md` | 全機構類型（負責人資格通則） |
| `standards/home-care.md` | 居家式（居家照顧、居家護理等） |
| `standards/community.md` | 社區式：日間照顧、小規模多機能、家庭托顧、團體家屋 |
| `standards/residential.md` | 住宿式：護理之家、老人養護、安養、身障住宿等 |

## 未收錄（建議補充）

| 法規 | 狀態 |
|------|------|
| 長期照顧服務機構法人條例 | 已摘要於 `ltc-service-act.md`，可擴充 |
| 長期照顧服務人員訓練認證繼續教育及登錄辦法 | 未收錄 |
| 各縣市地方評鑑基準差異 | 未收錄 |
| 消防法相關規定 | 未收錄 |

## 使用說明

評鑑合規查核時，建議依以下順序引用：
1. 確認機構類型 → 對應 `standards/` 下的設立標準
2. 確認設立標準主文（負責人資格）→ `ltc-institution-standards-core.md`
3. 確認管理義務（紀錄保存、醫療契約等）→ `ltc-permit-management.md`
4. 確認法定服務項目 → `ltc-service-act.md`
