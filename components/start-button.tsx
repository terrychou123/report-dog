"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function StartButton({ children = "立即開始" }: { children?: React.ReactNode }) {
  const router = useRouter();

  const handleStart = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getClaims();
    if (data?.claims) {
      router.push("/client");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <Button size="lg" onClick={handleStart} className="text-base px-8 py-6">
      {children}
    </Button>
  );
}
