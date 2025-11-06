"use client";
import { SupabaseProvider } from "@/contexts/SupabaseContext";
import { SorobanProvider } from "@/contexts/SorobanContext";
import { WalletsKitProvider } from "@/contexts/WalletsKitContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseProvider>
      <SorobanProvider>
       <WalletsKitProvider>
        {children}
       </WalletsKitProvider>
      </SorobanProvider>
    </SupabaseProvider>
  );
}


