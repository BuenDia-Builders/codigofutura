"use client";
import { useSupabaseContext } from "@/contexts/SupabaseContext";

export function useSupabaseProfile() {
  const { profile } = useSupabaseContext();
  return profile;
}


