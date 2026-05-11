# 報告汪 UTM 參數規範

**目的**：統一 Facebook / LINE / YouTube 貼文連結的 UTM 參數格式，讓 GA4 能正確分離「自然社群」vs「廣告投放」vs「in-app browser」流量。

## 參數說明

| 參數 | 值 | 說明 |
|---|---|---|
| `utm_source` | `facebook` / `line` / `youtube` | 流量來源平台（小寫） |
| `utm_medium` | `social` / `paid-social` / `event` | 自然貼文用 `social`；廣告投放用 `paid-social`；線下 QR 碼 / 活動用 `event` |
| `utm_campaign` | `{post-slug}` 或 `{campaign-name}` | 對應 blog 文章 slug，或廣告活動代號（kebab-case） |
| `utm_content` | `post-link` / `post-image` / `story` / `comment` / `dm` | 點擊位置 / CTA 類型 |

## 場景範例

### 場景 1：FB 自然貼文分享 blog 文章

```
https://reportwang.com/blog/daycare-care-plan-complete-example-2026
  ?utm_source=facebook
  &utm_medium=social
  &utm_campaign=daycare-care-plan-complete-example-2026
  &utm_content=post-link
```

### 場景 2：FB 廣告投放（帶圖片連結）

```
https://reportwang.com/blog/elderly-welfare-eval-grade-strategy
  ?utm_source=facebook
  &utm_medium=paid-social
  &utm_campaign=eval-grade-strategy-may26
  &utm_content=post-image
```

### 場景 3：LINE 社群貼文

```
https://reportwang.com/downloads
  ?utm_source=line
  &utm_medium=social
  &utm_campaign=downloads-may26
  &utm_content=post-link
```

## 使用清單

貼文上線前確認：

- [ ] `utm_source` 已填，且為 `facebook` / `line` / `youtube` 其一（英文小寫）
- [ ] `utm_medium` 已選：`social`（自然）或 `paid-social`（廣告）
- [ ] `utm_campaign` 值為 kebab-case，不含空格與特殊字元
- [ ] `utm_content` 已標記點擊位置
- [ ] 連結貼到瀏覽器可正常打開（避免打字錯誤）

## GA4 報表查詢

確認 UTM 流量是否記錄正確：

GA4 → Reports → Acquisition → Traffic Acquisition
→ 切換維度「Session source / medium」

應可看到 `facebook / social` 與 `facebook / paid-social` 分開列出，取代目前混在一起的 `facebook.com / referral`、`m.facebook.com / referral` 等多個 source。
