'use client';

interface Entity {
  name: string;
  type?: string;
}

interface RelationshipGraphProps {
  entities?: Entity[] | string[] | null;
}

const TYPE_COLORS: Record<string, string> = {
  person: '#6366f1',
  org: '#10b981',
  location: '#f59e0b',
  default: '#8b5cf6',
};

export function RelationshipGraph({ entities }: RelationshipGraphProps) {
  const items: Entity[] =
    entities && entities.length > 0
      ? (entities as (Entity | string)[]).map((e) =>
          typeof e === 'string' ? { name: e, type: 'default' } : e
        )
      : [{ name: 'Run "Extract Data" in AI panel', type: 'default' }];

  const cx = 250;
  const cy = 180;
  const r = 120;

  return (
    <svg
      viewBox="0 0 500 360"
      className="w-full max-w-xl mx-auto"
      style={{ fontFamily: 'inherit' }}
    >
      {/* Center node */}
      <circle cx={cx} cy={cy} r={30} fill="#6366f1" opacity={0.15} />
      <circle cx={cx} cy={cy} r={30} fill="none" stroke="#6366f1" strokeWidth={2} />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize={11} fill="currentColor">
        Document
      </text>

      {/* Satellite nodes */}
      {items.slice(0, 8).map((entity, i) => {
        const angle = (i / Math.min(items.length, 8)) * 2 * Math.PI - Math.PI / 2;
        const nx = cx + r * Math.cos(angle);
        const ny = cy + r * Math.sin(angle);
        const color = TYPE_COLORS[entity.type ?? 'default'] ?? TYPE_COLORS.default;
        const label = entity.name.length > 14 ? entity.name.slice(0, 12) + '…' : entity.name;

        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#e5e7eb" strokeWidth={1.5} />
            <circle cx={nx} cy={ny} r={22} fill={color} opacity={0.15} />
            <circle cx={nx} cy={ny} r={22} fill="none" stroke={color} strokeWidth={1.5} />
            <text x={nx} y={ny} textAnchor="middle" dominantBaseline="middle" fontSize={9} fill="currentColor">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
