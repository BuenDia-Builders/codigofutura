"use client";
import { useSupabaseContext } from "@/contexts/SupabaseContext";

export function useSupabase() {
  const { client } = useSupabaseContext();
  return client;
}


