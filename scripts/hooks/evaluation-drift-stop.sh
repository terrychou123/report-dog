#!/usr/bin/env bash
# Stop hook：偵測本 session 是否修改了評鑑 SSOT，若有則自動跑 drift check 並注入結果
# 只有在 SSOT 路徑有 git 變更時才執行（避免每次 stop 都跑）

CHANGED=$(git status --porcelain 2>/dev/null \
  | grep -v '^?' \
  | awk '{print $NF}' \
  | grep -E 'lib/ai/evaluation-profiles/|lib/supplementary-sheets/|lib/evaluation-tips/|-evaluation/SKILL\.md' \
  || true)

[ -z "$CHANGED" ] && exit 0

# 跑 drift check（--json 輸出）
RESULT=$(npx tsx scripts/check-evaluation-drift.ts --json 2>&1 || echo '{"error":"drift check 執行失敗，請手動跑 npm run check:evaluation-drift"}')

DRIFT_RESULT="$RESULT" python3 -c "
import json, os, sys

raw = os.environ.get('DRIFT_RESULT', '')
try:
    data = json.loads(raw)
    # 只列出有 drift 的機構
    drifted = [r for r in data.get('results', []) if not r.get('ok', True)]
    if drifted:
        lines = []
        for r in drifted:
            lines.append('  [' + r['facilitySlug'] + '] DRIFT')
            for oid in r.get('orphanInSupp', []):
                lines.append('    ↳ supp 孤兒 itemId: ' + str(oid))
            for mid in r.get('missingInSupp', []):
                lines.append('    ↳ profile 有但 supp 無: ' + str(mid))
            for cf in r.get('orphanCustomFiles', []):
                lines.append('    ↳ 孤兒 custom 檔: ' + cf)
        summary = '\n'.join(lines)
        has_drift = True
    else:
        summary = '  全部 OK（無 drift）'
        has_drift = False
except Exception as e:
    summary = raw
    has_drift = True

action = '請執行 npm run evaluation:sync <facility> 後再確認' if has_drift else '無需額外操作'
msg = '[評鑑 drift check] 本 session 修改了評鑑 SSOT。\n\n結果：\n' + summary + '\n\n' + action
print(json.dumps({
    'hookSpecificOutput': {
        'hookEventName': 'Stop',
        'additionalContext': msg
    }
}))
"
