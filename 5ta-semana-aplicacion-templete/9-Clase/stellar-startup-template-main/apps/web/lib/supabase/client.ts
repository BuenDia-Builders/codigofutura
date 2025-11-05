"use client";
import { createBrowserClient } from "@supabase/ssr";
// Avoid strict generic typing conflicts; keep client loosely typed
import { getConfig } from "@/lib/config";

let browserClient: any | null = null;

export function getSupabaseBrowserClient(): any {
  if (browserClient) return browserClient;
  const { supabaseUrl, supabaseAnonKey } = getConfig();
  browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return browserClient;
}


