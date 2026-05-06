#!/usr/bin/env bash
# PostToolUse hook：偵測評鑑 SSOT 檔案修改，注入下游同步提醒
# 觸發條件：Edit/Write 命中 evaluation-profiles、supplementary-sheets、evaluation-tips 或 *-evaluation/SKILL.md

FILE=$(python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path',''))" 2>/dev/null || echo "")

case "$FILE" in
  */lib/ai/evaluation-profiles/*.ts|\
  */lib/supplementary-sheets/*.ts|\
  */lib/evaluation-tips/*.ts|\
  *-evaluation/SKILL.md)
    EVAL_FILE="$FILE" python3 -c "
import json, os
file_path = os.environ.get('EVAL_FILE', '(unknown)')
msg = (
    '[評鑑 SSOT 變更] 偵測到修改：' + file_path + '\n\n'
    '請確認下游已同步：\n'
    '[A] lib/supplementary-sheets/{facility}.ts — itemId 必須對應 profile.items[].id\n'
    '[B] lib/evaluation-tips/{facility}.ts — key 為 itemId，新增/移除項目時同步\n'
    '[C] .claude/skills/{facility}-evaluation/SKILL.md — 年度、區塊表、項目數\n'
    '[D] app/school/{facility}/**/page.tsx + app/{facility}/page.tsx landing 頁（年度字串）\n'
    '[E] 產出物：npm run evaluation:sync <facility>\n'
    '    （自動跑 drift check + generate-checklist，不會跑 db:seed-templates）\n'
    '[F] DB 範本：npm run db:seed-templates --force\n'
    '    ⚠️  會覆蓋手動編輯的 system 範本，請與使用者確認後再跑\n\n'
    'drift 快速檢查：npm run check:evaluation-drift -- --facility=<facility>'
)
print(json.dumps({
    'hookSpecificOutput': {
        'hookEventName': 'PostToolUse',
        'additionalContext': msg
    }
}))
"
    ;;
esac
