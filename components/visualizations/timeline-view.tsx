'use client';

import { Calendar } from 'lucide-react';

interface TimelineEvent {
  date: string;
  label: string;
}

interface TimelineViewProps {
  events?: TimelineEvent[] | null;
}

export function TimelineView({ events }: TimelineViewProps) {
  const items =
    events && events.length > 0
      ? events
      : [
          { date: 'No dates extracted yet', label: 'Run "Extract Data" in the AI panel to populate this view.' },
        ];

  return (
    <div className="relative pl-6 space-y-4">
      <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />
      {items.map((event, i) => (
        <div key={i} className="relative flex gap-3 items-start">
          <div className="absolute -left-4 mt-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
          <div>
            <p className="text-sm font-medium leading-snug">{event.label}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <Calendar className="h-3 w-3" />
              {event.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
