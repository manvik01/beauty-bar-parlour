"use client";
import { useMindbodyScript } from "@/hooks/use-mindbody-script";

export function MindbodyScriptProvider({ children }: { children: React.ReactNode }) {
  useMindbodyScript();
  return <>{children}</>;
} 