import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";

async function Content({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  if (!token) {
    return (
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          退訂連結無效，請直接回覆電子報告知退訂。
        </p>
      </CardContent>
    );
  }
  return (
    <CardContent className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        確認後，您將不再收到報告汪電子報。
      </p>
      <form action={`/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`} method="POST">
        <button
          type="submit"
          className="w-full rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
        >
          確認退訂
        </button>
      </form>
    </CardContent>
  );
}

export default function UnsubscribeConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">退訂電子報</CardTitle>
            </CardHeader>
            <Suspense>
              <Content searchParams={searchParams} />
            </Suspense>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                不打算退訂？歡迎{" "}
                <Link
                  href="/"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  返回首頁
                </Link>
                繼續瀏覽評鑑資源。
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
