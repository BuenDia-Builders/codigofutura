"use client";
import { useSupabaseContext } from "@/contexts/SupabaseContext";

export function useSupabaseAuth() {
  const { auth, session, user, isAuthReady } = useSupabaseContext();
  return { ...auth, session, user, isAuthReady };
}


