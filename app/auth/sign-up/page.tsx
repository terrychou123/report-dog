import type { Metadata } from "next";
import { Suspense } from "react";
import { SignUpForm } from "@/components/sign-up-form";

export const metadata: Metadata = {
  title: "註冊｜報告汪",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={null}>
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  );
}
