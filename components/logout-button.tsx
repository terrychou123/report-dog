"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

export function LogoutButton({ email }: { email?: string }) {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={logout} variant="outline" size="sm">登出</Button>
        </TooltipTrigger>
        {email && <TooltipContent side="bottom">{email}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}
