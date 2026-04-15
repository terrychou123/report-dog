import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const URL_HTTPS_REGEX = /^https?:\/\//i;
export function isValidUrl(url: string): boolean {
  return URL_HTTPS_REGEX.test(url.trim());
}

export function formatZhTWDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("zh-TW", {
    timeZone: "Asia/Taipei", // 固定台灣時區，避免跨日凌晨日期偏移
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function hasEnvVars() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}
