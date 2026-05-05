import Link from "next/link";
import { BotIcon } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { NewsletterForm } from "@/components/newsletter-form";

export function Footer() {
  return (
    <footer className="border-t py-8 px-6 flex flex-col gap-6 text-sm text-muted-foreground">
      {/* 電子報訂閱 */}
      <div className="w-full max-w-md mx-auto text-center">
        <p className="text-xs mb-2">訂閱長照評鑑電子報，每月收到評鑑準備提醒</p>
        <NewsletterForm />
      </div>

      {/* 底部導航 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <BotIcon className="h-4 w-4 text-primary" />
          報告汪
        </div>
        <div className="flex items-center gap-6">
          <Link href="/docs" title="報告汪使用教學" className="hover:text-primary transition-colors">教學</Link>
          <Link href="/pricing" title="查看報告汪各方案價格" className="hover:text-primary transition-colors">價格</Link>
          <Link href="/testimonial" title="長照從業人員對報告汪的評價" className="hover:text-primary transition-colors">評價</Link>
          <Link href="/auth/login" title="登入報告汪帳戶" className="hover:text-primary transition-colors">登入</Link>
          <Link href="/auth/sign-up" title="免費註冊報告汪帳戶" className="hover:text-primary transition-colors">註冊</Link>
        </div>
        <ThemeSwitcher />
      </div>
    </footer>
  );
}
