"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export function StartButton({ children = "立即開始", source }: { children?: React.ReactNode; source?: string }) {
  const router = useRouter();

  const handleStart = async () => {
    trackEvent("cta_click", { source: source ?? "start-button" });
    const supabase = createClient();
    const { data } = await supabase.auth.getClaims();
    if (data?.claims) {
      router.push("/report");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <Button size="lg" variant="accent" onClick={handleStart} className="text-base px-8 py-6">
      {children}
    </Button>
  );
}
