"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function TrialButton({ children = "免費試用" }: { children?: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleTrial = async () => {
    setLoading(true);
    const supabase = createClient();

    // If already logged in (including anonymous), go to dashboard
    const { data: claimsData } = await supabase.auth.getClaims();
    if (claimsData?.claims) {
      router.push("/report");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInAnonymously();
    if (!error) {
      router.push("/report");
    } else {
      console.error("Anonymous sign-in failed:", error.message);
      setLoading(false);
    }
  };

  return (
    <Button size="lg" variant="outline" onClick={handleTrial} disabled={loading} className="text-base px-8 py-6">
      {loading ? "載入中…" : children}
    </Button>
  );
}
