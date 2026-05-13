"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";

const GOOGLE_OAUTH_ENABLED = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED === "true";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const signupSource = searchParams.get("source");
  const signupSlug = searchParams.get("slug");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("兩次密碼不一致");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // next=/onboarding 是 sign_up_complete GA4 事件的觸發依據，異動前請一併更新 confirm/page.tsx
          emailRedirectTo: `${window.location.origin}/auth/confirm?next=/onboarding`,
          data: {
            newsletter_opt_in: subscribeNewsletter,
            signup_source: signupSource ?? null,
            signup_source_slug: signupSlug ?? null,
          },
        },
      });
      if (error) throw error;
      // Supabase 對已存在 email 不回 error，而是回 identities: []（防 user enumeration）
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError("此 Email 已被註冊，請改用登入或重設密碼");
        setIsLoading(false);
        return;
      }
      trackEvent("sign_up", { method: "email", source: signupSource ?? "direct", slug: signupSlug ?? undefined });
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "發生錯誤，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">註冊</CardTitle>
          <CardDescription>建立新帳號</CardDescription>
        </CardHeader>
        <CardContent>
          {GOOGLE_OAUTH_ENABLED && (
            <div className="mb-6 flex flex-col gap-3">
              {/* Google OAuth 主要 CTA — 行動使用者主訴求；email 註冊保留為次要選項 */}
              <GoogleAuthButton mode="sign-up" source={signupSource} slug={signupSlug} />
              <div className="relative flex items-center justify-center text-xs text-muted-foreground">
                <span className="absolute inset-x-0 top-1/2 -z-10 h-px bg-border" />
                <span className="bg-card px-3">或使用 Email 註冊</span>
              </div>
            </div>
          )}
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">電子郵件</Label>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">密碼</Label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                    aria-label={showPassword ? "隱藏密碼" : "顯示密碼"}
                  >
                    {showPassword ? (
                      <>
                        <EyeOffIcon className="h-3.5 w-3.5" />隱藏
                      </>
                    ) : (
                      <>
                        <EyeIcon className="h-3.5 w-3.5" />顯示
                      </>
                    )}
                  </button>
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">再次輸入密碼</Label>
                </div>
                <Input
                  id="repeat-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              <div className="flex items-start gap-2">
                <Checkbox
                  id="subscribe-newsletter"
                  checked={subscribeNewsletter}
                  onCheckedChange={(checked) => setSubscribeNewsletter(checked === true)}
                  className="mt-0.5"
                />
                <Label htmlFor="subscribe-newsletter" className="font-normal text-sm leading-snug cursor-pointer">
                  訂閱報告汪評鑑電子報（不定期，可隨時退訂）
                </Label>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "註冊中..." : "註冊"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              已有帳號？{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                登入
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
