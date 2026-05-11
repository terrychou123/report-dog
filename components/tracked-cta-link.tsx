"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

interface Props {
  href: string;
  source: string;
  className?: string;
  children: React.ReactNode;
}

export function TrackedCtaLink({ href, source, className, children }: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent("cta_click", { source })}
    >
      {children}
    </Link>
  );
}
