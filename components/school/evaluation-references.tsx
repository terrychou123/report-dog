import type { ReferenceDoc, ReferenceSection } from "@/lib/evaluation-references/types";

function ReferenceSectionView({ section }: { section: ReferenceSection }) {
  // 章節分隔線（divider 模式只顯示 heading，忽略其他 body）
  if (section.divider) {
    return (
      <div className="border-t border-border/60 pt-3 mt-1 first:mt-0 first:border-t-0 first:pt-0">
        <h4 className="text-sm font-bold text-foreground">{section.heading}</h4>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {section.heading && (
        <h5 className="text-xs font-semibold text-foreground">{section.heading}</h5>
      )}

      {section.paragraphs?.map((p, i) => (
        <p key={`p-${i}`} className="text-muted-foreground leading-relaxed">
          {p}
        </p>
      ))}

      {section.list &&
        (section.listType === "ordered" ? (
          <ol className="space-y-1.5 list-none pl-0">
            {section.list.map((item, i) => (
              <li key={i} className="flex gap-2 text-muted-foreground">
                <span className="shrink-0 mt-0.5 w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-mono text-foreground">
                  {i + 1}
                </span>
                <span className="whitespace-pre-line leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
        ) : (
          <ul className="space-y-1 pl-4 list-disc text-muted-foreground">
            {section.list.map((item, i) => (
              <li key={i} className="whitespace-pre-line leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        ))}

      {section.table && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                {section.table.headers.map((h, i) => (
                  <th
                    key={i}
                    className="border border-border/60 px-2.5 py-1.5 text-left font-semibold text-foreground whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={i} className="even:bg-muted/20">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="border border-border/60 px-2.5 py-1.5 text-muted-foreground align-top"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.closing?.map((p, i) => (
        <p key={`c-${i}`} className="text-muted-foreground leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  );
}

interface EvaluationReferencesProps {
  references?: ReferenceDoc[];
}

export function EvaluationReferences({ references }: EvaluationReferencesProps) {
  if (!references?.length) return null;

  return (
    <div className="not-prose mt-4 space-y-2">
      <p className="text-xs font-medium text-muted-foreground">
        以下為報告汪撰寫的補充資料，非官方文件（{references.length} 份）
      </p>
      {references.map((ref) => (
        <details
          key={ref.title}
          className="group rounded-lg border bg-muted/30 text-sm open:bg-muted/50 transition-colors"
        >
          <summary className="cursor-pointer px-4 py-3 list-none [&::-webkit-details-marker]:hidden flex items-start justify-between gap-2 select-none">
            <div>
              <span className="font-medium text-foreground">{ref.title}</span>
              <span className="block text-xs text-muted-foreground mt-0.5">{ref.summary}</span>
            </div>
            <span aria-hidden="true" className="shrink-0 mt-1 text-muted-foreground group-open:rotate-180 transition-transform text-base leading-none">
              ▾
            </span>
          </summary>
          <div className="px-4 pb-4 pt-3 space-y-3 border-t border-border/40">
            {ref.sections.map((section, j) => (
              <ReferenceSectionView key={j} section={section} />
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
