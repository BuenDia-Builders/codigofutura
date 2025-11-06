import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getConfig } from "@/lib/config";

export function getSupabaseServerClient(): any {
  const { supabaseUrl, supabaseAnonKey } = getConfig();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return (cookies() as any).get(name)?.value;
      },
      set(name: string, value: string, options: { domain?: string; path?: string; maxAge?: number; httpOnly?: boolean; secure?: boolean; sameSite?: "lax" | "strict" | "none" }) {
        (cookies() as any).set({ name, value, ...options });
      },
      remove(name: string, options: { domain?: string; path?: string; httpOnly?: boolean; secure?: boolean; sameSite?: "lax" | "strict" | "none" }) {
        (cookies() as any).set({ name, value: "", ...options, maxAge: 0 });
      },
    },
  } as any);
}


