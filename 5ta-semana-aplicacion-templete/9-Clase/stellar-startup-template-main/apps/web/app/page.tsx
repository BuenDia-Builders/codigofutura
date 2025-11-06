"use client";
import { Button } from "@/components/ui/button";
import { useSoroban } from "@/hooks/useSoroban";
import { useState } from "react";
import Onboarding from "@/components/Onboarding";

export default function HomePage() {
  const { checkHealth, isHealthy } = useSoroban();
  const [healthChecked, setHealthChecked] = useState(false);

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col gap-8 px-5 py-10">
      {/* Hero */}
      <section className="rounded-2xl border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <h1 className="bg-gradient-to-r from-indigo-600 via-blue-600 to-fuchsia-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          Build Stellar apps faster
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-600">
          Next.js + shadcn/ui + Supabase + Soroban RPC + Stellar Wallets Kit, prewired with
          read/write contract examples and wallet signing.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white shadow-sm hover:from-indigo-500 hover:to-fuchsia-500"
            onClick={async () => {
              await checkHealth();
              setHealthChecked(true);
            }}
          >
            Check Soroban RPC
          </Button>
          {healthChecked && (
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${isHealthy ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {isHealthy ? "RPC: Healthy" : "RPC: Unavailable"}
            </span>
          )}
          <a
            href="https://developers.stellar.org/docs/build/apps/dapp-frontend"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-700 underline-offset-4 hover:underline"
          >
            Read the Dapp frontend guide ↗
          </a>
        </div>
      </section>

      {/* Onboarding Card */}
      <Onboarding />
    </main>
  );
}


