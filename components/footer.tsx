import Link from "next/link";
import { BotIcon } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Footer() {
  return (
    <footer className="border-t py-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <BotIcon className="h-4 w-4 text-primary" />
        報告汪
      </div>
      <div className="flex items-center gap-6">
        <Link href="/docs" title="報告汪使用教學" className="hover:text-primary transition-colors">教學</Link>
        <Link href="/pricing" title="查看報告汪各方案價格" className="hover:text-primary transition-colors">價格</Link>
        <Link href="/auth/login" title="登入報告汪帳戶" className="hover:text-primary transition-colors">登入</Link>
        <Link href="/auth/sign-up" title="免費註冊報告汪帳戶" className="hover:text-primary transition-colors">註冊</Link>
      </div>
      <ThemeSwitcher />
    </footer>
  );
}
