import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "開始使用報告汪",
  description: "設定你的帳號，幾分鐘內完成報告汪的初始化設定。",
  alternates: { canonical: "/onboarding" },
  robots: { index: false, follow: false },
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      {children}
    </div>
  );
}
