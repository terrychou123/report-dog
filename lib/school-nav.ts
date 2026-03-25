import type { LucideIcon } from "lucide-react";
import {
  ShieldCheckIcon,
  HeartPulseIcon,
  SettingsIcon,
  StarIcon,
  HomeIcon,
  SunIcon,
  BuildingIcon,
  HospitalIcon,
} from "lucide-react";

export interface SchoolNavItem {
  href: string;
  label: string;
  title: string;
  icon?: LucideIcon;
  desc?: string;
  comingSoon?: boolean;
}

export interface SchoolNavSection {
  group: string;
  items: SchoolNavItem[];
}

export const schoolNavSections: SchoolNavSection[] = [
  {
    group: "居家服務機構",
    items: [
      {
        href: "/school/home-care",
        label: "評鑑基準總覽",
        title: "居家服務機構評鑑基準總覽",
        icon: HomeIcon,
        desc: "32 項評鑑基準完整說明",
      },
      {
        href: "/school/home-care/client-rights",
        label: "壹、個案權益保障",
        title: "個案權益保障評鑑基準（項目 1–4）",
        icon: ShieldCheckIcon,
        desc: "服務資訊公開、個案權益、隱私保護、申訴機制",
      },
      {
        href: "/school/home-care/professional-quality",
        label: "貳、專業照護品質",
        title: "專業照護品質評鑑基準（項目 5–14）",
        icon: HeartPulseIcon,
        desc: "入案評估、服務計畫、緊急處理、督導訪視",
      },
      {
        href: "/school/home-care/management",
        label: "參、經營管理效能",
        title: "經營管理效能評鑑基準（項目 15–30）",
        icon: SettingsIcon,
        desc: "行政管理、人員配置、財務、品質改善",
      },
      {
        href: "/school/home-care/bonus",
        label: "加分題",
        title: "居家服務機構評鑑加分題（項目 31–32）",
        icon: StarIcon,
        desc: "創新服務、照顧者支持",
      },
    ],
  },
  {
    group: "即將推出",
    items: [
      {
        href: "#",
        label: "日間照顧機構",
        title: "日間照顧機構評鑑基準（即將推出）",
        icon: SunIcon,
        comingSoon: true,
      },
      {
        href: "#",
        label: "住宿型長照機構",
        title: "住宿型長照機構評鑑基準（即將推出）",
        icon: BuildingIcon,
        comingSoon: true,
      },
      {
        href: "#",
        label: "一般護理之家",
        title: "一般護理之家評鑑基準（即將推出）",
        icon: HospitalIcon,
        comingSoon: true,
      },
    ],
  },
];
