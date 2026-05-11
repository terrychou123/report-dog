import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; flow?: string }>;
}) {
  const params = await searchParams;
  const isSignupFlow = params?.flow === "signup";

  return (
    <>
      <p className="text-sm text-muted-foreground">
        {params?.error ?? "發生未知錯誤，請稍後再試。"}
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        {isSignupFlow ? (
          <>
            驗證連結可能已被使用或過期。請{" "}
            <Link
              href="/auth/login"
              className="underline underline-offset-4 hover:text-foreground"
            >
              嘗試直接登入
            </Link>
            （若驗證已完成），或{" "}
            <Link
              href="/auth/sign-up"
              className="underline underline-offset-4 hover:text-foreground"
            >
              重新註冊
            </Link>
            。
          </>
        ) : (
          <>
            請{" "}
            <Link
              href="/auth/forgot-password"
              className="underline underline-offset-4 hover:text-foreground"
            >
              重新申請密碼重設連結
            </Link>
            ，連結僅在 1 小時內有效。
          </>
        )}
      </p>
    </>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; flow?: string }>;
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
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
