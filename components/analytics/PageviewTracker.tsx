"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageviewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    fetch("/api/track-pageview", { method: "POST" }).catch(() => {
      // A failed beacon should never be visible to the visitor.
    });
  }, [pathname]);

  return null;
}
