import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">註冊成功！</CardTitle>
              <CardDescription>請前往信箱完成驗證</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                驗證信已寄出，請點擊信件中的連結以啟用帳號。
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                若沒有收到信，請檢查垃圾郵件資料夾。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
