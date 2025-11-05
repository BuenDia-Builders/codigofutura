"use client";
import { useSupabaseContext } from "@/contexts/SupabaseContext";

export function useSupabaseStorage() {
  const { storage } = useSupabaseContext();
  return storage;
}


