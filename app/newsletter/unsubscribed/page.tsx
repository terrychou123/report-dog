import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";

async function Content({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  if (ok === "1") {
    return (
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          您已成功退訂報告汪電子報，我們不會再寄送電子報給您。
        </p>
      </CardContent>
    );
  }
  return (
    <CardContent>
      <p className="text-sm text-muted-foreground leading-relaxed">
        退訂連結已失效或無效。若需協助，請直接回覆電子報告知退訂。
      </p>
    </CardContent>
  );
}

export default function UnsubscribedPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
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
                歡迎隨時{" "}
                <Link
                  href="/"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  重新訂閱
                </Link>
                ，或瀏覽{" "}
                <Link
                  href="/downloads"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  免費評鑑資源
                </Link>
                。
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
