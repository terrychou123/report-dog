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
  ShieldIcon,
  StethoscopeIcon,
  BabyIcon,
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
    group: "日間照顧機構",
    items: [
      {
        href: "/school/daycare",
        label: "評鑑基準總覽",
        title: "日間照顧機構評鑑基準總覽",
        icon: SunIcon,
        desc: "43 項評鑑基準完整說明",
      },
      {
        href: "/school/daycare/client-rights",
        label: "壹、個案權益保障",
        title: "個案權益保障評鑑基準（項目 1–4）",
        icon: ShieldCheckIcon,
        desc: "服務資訊公開、個案權益、隱私保護、申訴機制",
      },
      {
        href: "/school/daycare/professional-quality",
        label: "貳、專業照護品質",
        title: "專業照護品質評鑑基準（項目 5–22）",
        icon: HeartPulseIcon,
        desc: "入案評估、照顧計畫、活動設計、健康管理、用藥、飲食、復健",
      },
      {
        href: "/school/daycare/management",
        label: "參、經營管理效能",
        title: "經營管理效能評鑑基準（項目 23–37）",
        icon: SettingsIcon,
        desc: "行政管理、人員配置、財務、感染管制、品質監測",
      },
      {
        href: "/school/daycare/safety-environment",
        label: "肆、安全環境設備",
        title: "安全環境設備評鑑基準（項目 38–43）",
        icon: ShieldIcon,
        desc: "空間環境、消防安全、設備維護、無障礙、交通接送",
      },
    ],
  },
  {
    group: "住宿型照顧機構",
    items: [
      {
        href: "/school/nursing-home",
        label: "評鑑基準總覽",
        title: "住宿型照顧機構評鑑基準總覽",
        icon: BuildingIcon,
        desc: "75 項評鑑基準完整說明",
      },
      {
        href: "/school/nursing-home/management",
        label: "A、經營管理效能",
        title: "經營管理效能評鑑基準（項目 1–15）",
        icon: SettingsIcon,
        desc: "人員配置、工作手冊、訓練計畫、勞動條件",
      },
      {
        href: "/school/nursing-home/professional-quality",
        label: "B、專業照護品質",
        title: "專業照護品質評鑑基準（項目 16–47）",
        icon: HeartPulseIcon,
        desc: "照護計畫、醫療服務、感染管制、膳食、復健",
      },
      {
        href: "/school/nursing-home/safety-environment",
        label: "C、安全環境設備",
        title: "安全環境設備評鑑基準（項目 48–63）",
        icon: ShieldIcon,
        desc: "空間設備、消防安全、無障礙設施、緊急應變",
      },
      {
        href: "/school/nursing-home/client-rights",
        label: "D、個案權益保障",
        title: "個案權益保障評鑑基準（項目 64–72）",
        icon: ShieldCheckIcon,
        desc: "個案資料、服務契約、申訴機制、臨終照護",
      },
      {
        href: "/school/nursing-home/innovation",
        label: "E、服務改進創新",
        title: "服務改進創新評鑑基準（項目 73–75）",
        icon: StarIcon,
        desc: "前次評鑑改善、創新服務、違規事件",
      },
    ],
  },
  {
    group: "居家護理所",
    items: [
      {
        href: "/school/home-nursing",
        label: "評鑑基準總覽",
        title: "居家護理所評鑑基準總覽",
        icon: StethoscopeIcon,
        desc: "8 項評鑑基準完整說明",
      },
      {
        href: "/school/home-nursing/management",
        label: "A、經營管理",
        title: "經營管理評鑑基準（項目 1–5）",
        icon: SettingsIcon,
        desc: "社區資源、感染管制、人員安全、緊急事件、品質監測",
      },
      {
        href: "/school/home-nursing/care-management",
        label: "B、照護管理",
        title: "照護管理評鑑基準（項目 6–8）",
        icon: HeartPulseIcon,
        desc: "機構資訊管理、個案照護管理、加分項目",
      },
    ],
  },
  {
    group: "產後護理之家",
    items: [
      {
        href: "/school/postpartum-care",
        label: "評鑑基準總覽",
        title: "產後護理之家評鑑基準總覽",
        icon: BabyIcon,
        desc: "17 項評鑑基準完整說明",
      },
      {
        href: "/school/postpartum-care/administration",
        label: "A、行政組織、經營管理與服務對象權益保障",
        title: "行政組織、經營管理與服務對象權益保障（項目 1–5）",
        icon: SettingsIcon,
        desc: "人員配置、教育訓練、感染管制、意外事件、品質管理",
      },
      {
        href: "/school/postpartum-care/professional-care",
        label: "B、專業服務與生活照顧",
        title: "專業服務與生活照顧（項目 6–13）",
        icon: HeartPulseIcon,
        desc: "產婦照護、嬰兒照護、親子關係、衛教課程、出住院評估、緊急狀況、哺乳、母乳貯存",
      },
      {
        href: "/school/postpartum-care/safety-environment",
        label: "C、環境設施與安全維護",
        title: "環境設施與安全維護（項目 14–15）",
        icon: ShieldIcon,
        desc: "疏散避難系統、嬰兒疏散SOP、天災緊急應變",
      },
      {
        href: "/school/postpartum-care/special-items",
        label: "D、特別事項",
        title: "特別事項（項目 16–17）",
        icon: StarIcon,
        desc: "配合政策加分、重大異常情事試評扣分項",
      },
    ],
  },
  {
    group: "一般護理之家",
    items: [
      {
        href: "/school/general-nursing-home",
        label: "評鑑基準總覽",
        title: "一般護理之家評鑑基準總覽",
        icon: HospitalIcon,
        desc: "15 項評鑑基準完整說明",
      },
      {
        href: "/school/general-nursing-home/administration",
        label: "A、行政組織、經營管理與服務對象權益保障",
        title: "行政組織、經營管理與服務對象權益保障（項目 1–5）",
        icon: SettingsIcon,
        desc: "負責人管理、人員配置、緊急事件、防疫機制、安寧療護",
      },
      {
        href: "/school/general-nursing-home/professional-care",
        label: "B、專業服務與生活照顧",
        title: "專業服務與生活照顧（項目 6–8）",
        icon: HeartPulseIcon,
        desc: "照護需求評估、整合性照顧、品質監測指標",
      },
      {
        href: "/school/general-nursing-home/safety-environment",
        label: "C、環境設施與安全維護",
        title: "環境設施與安全維護（項目 9–12）",
        icon: ShieldIcon,
        desc: "災害應變計畫、疏散避難、個別化疏散策略、情境演練",
      },
      {
        href: "/school/general-nursing-home/special-items",
        label: "D、特別事項",
        title: "特別事項（項目 13–15）",
        icon: StarIcon,
        desc: "創新政策執行、口腔健康照護、試評扣分項",
      },
    ],
  },
];
