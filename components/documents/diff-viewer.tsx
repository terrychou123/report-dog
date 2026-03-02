'use client';

type DiffLine = {
  type: 'same' | 'added' | 'removed';
  content: string;
  lineNo: number;
};

function computeDiff(
  original: string,
  current: string
): { left: DiffLine[]; right: DiffLine[] } {
  const aLines = original.split('\n');
  const bLines = current.split('\n');

  // Build LCS table
  const m = aLines.length;
  const n = bLines.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (aLines[i - 1] === bLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to produce diff
  const left: DiffLine[] = [];
  const right: DiffLine[] = [];
  let leftLineNo = 1;
  let rightLineNo = 1;

  function backtrack(i: number, j: number) {
    if (i === 0 && j === 0) return;
    if (i > 0 && j > 0 && aLines[i - 1] === bLines[j - 1]) {
      backtrack(i - 1, j - 1);
      left.push({ type: 'same', content: aLines[i - 1], lineNo: leftLineNo++ });
      right.push({ type: 'same', content: bLines[j - 1], lineNo: rightLineNo++ });
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      backtrack(i, j - 1);
      left.push({ type: 'added', content: '', lineNo: -1 });
      right.push({ type: 'added', content: bLines[j - 1], lineNo: rightLineNo++ });
    } else {
      backtrack(i - 1, j);
      left.push({ type: 'removed', content: aLines[i - 1], lineNo: leftLineNo++ });
      right.push({ type: 'removed', content: '', lineNo: -1 });
    }
  }

  backtrack(m, n);
  return { left, right };
}

function lineClass(type: DiffLine['type'], side: 'left' | 'right') {
  if (type === 'same') return 'bg-transparent';
  if (type === 'added' && side === 'right') return 'bg-green-100/30 dark:bg-green-900/20';
  if (type === 'removed' && side === 'left') return 'bg-red-100/30 dark:bg-red-900/20';
  return 'bg-muted/10';
}

function textClass(type: DiffLine['type'], side: 'left' | 'right') {
  if (type === 'added' && side === 'right') return 'text-green-700 dark:text-green-400';
  if (type === 'removed' && side === 'left') return 'text-red-700 dark:text-red-400';
  return '';
}

function DiffColumn({
  lines,
  side,
  label,
}: {
  lines: DiffLine[];
  side: 'left' | 'right';
  label: string;
}) {
  return (
    <div className="flex-1 min-w-0 overflow-hidden">
      <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground border-b bg-muted/30">
        {label}
      </div>
      <div className="overflow-auto font-mono text-xs">
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 px-2 py-0 leading-5 min-h-[1.25rem] ${lineClass(line.type, side)}`}
          >
            <span className="select-none w-8 shrink-0 text-right text-muted-foreground/50 pr-2 border-r border-border/40">
              {line.lineNo > 0 ? line.lineNo : ''}
            </span>
            <span className={`whitespace-pre-wrap break-all ${textClass(line.type, side)}`}>
              {line.content}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface DiffViewerProps {
  original: string;
  current: string;
}

export function DiffViewer({ original, current }: DiffViewerProps) {
  const { left, right } = computeDiff(original, current);

  const added = right.filter((l) => l.type === 'added').length;
  const removed = left.filter((l) => l.type === 'removed').length;

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden">
      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-2 text-xs border-b bg-muted/20">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-green-500/40 inline-block" />
          <span className="text-green-700 dark:text-green-400">+{added} added</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-red-500/40 inline-block" />
          <span className="text-red-700 dark:text-red-400">-{removed} removed</span>
        </span>
      </div>

      {/* Side-by-side columns */}
      <div className="flex flex-1 overflow-hidden divide-x">
        <DiffColumn lines={left} side="left" label="Original" />
        <DiffColumn lines={right} side="right" label="Current" />
      </div>
    </div>
  );
}
