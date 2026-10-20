"use client";

import Link from "next/link";
import { ArcProvider } from "@/components/arc/lib/arc-provider";

export function ArcLinkProvider({ children }: { children: React.ReactNode }) {
  return <ArcProvider link={Link}>{children}</ArcProvider>;
}
