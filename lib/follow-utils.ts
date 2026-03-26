export type Frequency = 'irregular' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual';

export type FollowItem = {
  followId: string;
  frequency: string;
  reportId: string;
  reportTitle: string;
  reportUpdatedAt: string;
  fileType: string | null;
};

export const FREQUENCY_ORDER: Frequency[] = [
  'irregular', 'daily', 'weekly', 'monthly', 'quarterly', 'semi_annual', 'annual'
];

export const FREQUENCY_LABELS: Record<Frequency, string> = {
  irregular: '不定期追蹤',
  daily: '每日追蹤',
  weekly: '每週追蹤',
  monthly: '每月追蹤',
  quarterly: '每季追蹤',
  semi_annual: '每半年追蹤',
  annual: '每年追蹤',
};

// Thresholds in milliseconds
const FREQUENCY_THRESHOLDS: Partial<Record<Frequency, number>> = {
  daily: 24 * 60 * 60 * 1000,
  weekly: 168 * 60 * 60 * 1000,
  monthly: 730 * 60 * 60 * 1000,
  quarterly: 2190 * 60 * 60 * 1000,
  semi_annual: 4380 * 60 * 60 * 1000,
  annual: 8760 * 60 * 60 * 1000,
};

export function isOverdue(frequency: string, updatedAt: Date): boolean {
  const threshold = FREQUENCY_THRESHOLDS[frequency as Frequency];
  if (!threshold) return false;
  return Date.now() - updatedAt.getTime() > threshold;
}

export function isValidFrequency(value: string): value is Frequency {
  return FREQUENCY_ORDER.includes(value as Frequency);
}
