import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Stellar App",
  description: "Stellar + Supabase + Soroban starter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        {/* decorative background accent */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(600px_300px_at_50%_-10%,rgba(99,102,241,0.18),transparent)]" />
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}


