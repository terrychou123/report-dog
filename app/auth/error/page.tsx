import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";
import { VerifyErrorTracker } from "@/components/auth/verify-error-tracker";
import { ResendVerificationForm } from "@/components/auth/resend-verification-form";

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; flow?: string; reason?: string }>;
}) {
  const params = await searchParams;
  const isSignupFlow = params?.flow === "signup";

  return (
    <>
      <p className="text-sm text-muted-foreground">
        {params?.error ?? "發生未知錯誤，請稍後再試。"}
      </p>
      {isSignupFlow ? (
        <div className="mt-4 flex flex-col gap-3">
          <ResendVerificationForm source="auth_error_page" />
          <p className="text-sm text-muted-foreground">
            已驗證完成？{" "}
            <Link
              href="/auth/login"
              className="underline underline-offset-4 hover:text-foreground"
            >
              直接登入
            </Link>
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          請{" "}
          <Link
            href="/auth/forgot-password"
            className="underline underline-offset-4 hover:text-foreground"
          >
            重新申請密碼重設連結
          </Link>
          ，連結僅在 1 小時內有效。
        </p>
      )}
    </>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; flow?: string; reason?: string }>;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">驗證連結已失效</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense>
                <ErrorContent searchParams={searchParams} />
                <VerifyErrorTracker />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
