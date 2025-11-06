"use client";
import { useSupabaseContext } from "@/contexts/SupabaseContext";

export function useSupabaseRealtime() {
  const { realtime } = useSupabaseContext();
  return realtime;
}


