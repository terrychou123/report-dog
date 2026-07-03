# MAINTENANCE.md — handbook 與 CLAUDE.md 的維護協議

> 讀者：未來要更新這些檔案的任何模型。原則：**這套制度的價值在於精簡與一致，
> 加東西比刪東西容易，所以加東西的門檻要高。**

## §1 權限分級

| 動作 | 權限 |
|---|---|
| 更新 REFERENCE.md 使其跟上程式碼現況（env var 增減、路由增減） | 自行改，commit message 說明 |
| 在 memory（`~/.claude/projects/...-with-supabase-app/memory/`）新增教訓 | 自行改（本來就是你的記憶） |
| 修正 handbook 中**事實錯誤**（路徑失效、工具改名、指令變了） | 自行改，改前留 backup（§4） |
| 在 JUDGMENT.md / DISPATCH.md **新增**規則或範例 | 先問使用者，附「為什麼現有規則不夠」 |
| 改 CLAUDE.md 任何內容 | 先問使用者（它每 session 載入，是成本最高的檔案） |
| 刪除或推翻 handbook 的既有規則 | 先問使用者，附具體反例 |
| 動 backup/ 目錄、動 `.claude/settings*.json` | 先問使用者 |

## §2 踩坑後教訓寫到哪（決策樹）

1. 教訓是「這個 repo 的事實」（某 lib 的怪癖、某流程的正確順序）
   → memory 目錄，格式照該目錄現有檔案（frontmatter + Why + How to apply），並更新 MEMORY.md 索引
2. 教訓是「工作方法」（派工方式、驗證方式、判斷失誤）
   → 候選寫入 JUDGMENT.md 或 DISPATCH.md，但走 §1 的「先問使用者」流程；
   等不到回覆就先寫進 memory，標 `候選晉升 handbook`
3. 教訓是「每個 session 一開始就必須知道，晚知道就會犯錯」
   → 才有資格進 CLAUDE.md，同樣先問使用者
4. 只跟這次任務有關、下次不會再遇到 → 哪裡都不寫

## §3 長度預算（超標就必須先刪再加）

| 檔案 | 上限 | 超標時 |
|---|---|---|
| CLAUDE.md | 160 行 | 把「只有特定任務才需要」的段落移到 REFERENCE.md 或對應 handbook 檔（優先移：長清單、單一功能的細節） |
| DISPATCH.md / JUDGMENT.md / PROMPTS.md | 各 200 行 | 合併重複規則；刪掉從未被引用過的規則（問使用者） |
| REFERENCE.md | 無硬上限 | 但每節要能獨立讀懂；過時內容直接更新而非追加 |
| memory 單檔 | 一個事實一檔 | 同主題更新既有檔，不開新檔 |

「精簡」的操作定義：兩條規則若一條被違反時另一條必然也被違反 → 它們是同一條，合併。

## §4 改檔安全程序（每次都做，不分大小）

1. 改 CLAUDE.md 或 handbook 前：`cp <檔> .claude/handbook/backup/<檔名>.bak-<YYYY-MM-DD>`
   （同日已有備份就不用重複）
2. 改完自檢：新舊規則有沒有互相矛盾？路徑、指令、工具名是否真的存在（跑一下驗證）？
3. 改動超過 20 行 → 派 fresh-context agent read-back（PROMPTS.md 模板 5 的文件版）
4. backup/ 目錄只進不出；要清理時問使用者

## §5 過時偵測（每次 session 開頭順手做，不用專門排程）

- 引用的路徑 404（如 `lib/xxx` 被改名）→ 依 §1 修正事實錯誤
- handbook 說「本專案沒有測試框架」但 repo 出現 vitest/jest 設定 → 這句要更新，
  且 JUDGMENT.md §2 / DISPATCH.md §6 的驗證方式要跟著改（先問使用者）
- LETTER.md 的風險項已被解決 → 在該項標 `✅ 已解決（日期）`，不刪原文

## §6 禁止事項

- 禁止把長清單、逐次工作紀錄寫進 CLAUDE.md（那是 memory 或 REFERENCE.md 的事）
- 禁止新增「不可執行的規則」——判準：模型當下能否用可觀察事實檢查自己有沒有違反？
  不能（例：「注意品質」「省 token」）就不准寫，改寫成行為規則（例：「>3 檔搜尋派 Explore」）
- 禁止用追加方式「修正」規則（新舊並存會打架）；要改就改原文，衝突當場解決
- 禁止刪 backup、禁止改動 `.claude/handbook/backup/` 內任何檔案
