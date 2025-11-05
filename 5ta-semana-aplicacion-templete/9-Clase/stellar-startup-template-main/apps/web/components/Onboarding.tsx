"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useHelloWorld } from "@/hooks/useHelloWorld";
import { useIncrement } from "@/hooks/useIncrement";
import { useWalletsKitContext } from "@/contexts/WalletsKitContext";

export default function Onboarding() {
  const { greeting, loading: helloLoading, error: helloError, sayHello } = useHelloWorld();
  const { loading: incLoading, error: incError, increment } = useIncrement();
  const { address, openModalAndConnect } = useWalletsKitContext();
  const [to, setTo] = useState("Devs!");

  return (
    <section className="flex flex-col gap-6 rounded-xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <header className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Onboarding</h2>
        <p className="text-sm text-gray-600">
          Use these examples to interact with your contracts, then swap in your own components.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-900">Read via RPC (Hello World)</h3>
        <div className="flex flex-wrap items-center gap-2">
          <input
            className="w-56 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Recipient"
          />
          <Button
            variant="outline"
            disabled={helloLoading}
            onClick={() => sayHello(to)}
          >
            {helloLoading ? "Calling…" : "Say Hello"}
          </Button>
        </div>
        {helloError && <p className="text-xs text-red-600">{helloError}</p>}
        {greeting && (
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            Greeting: {greeting}
          </p>
        )}
        <p className="text-xs text-gray-500">
          Uses the generated TypeScript bindings through a reusable API route.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-900">Write with Wallet Signing (Increment)</h3>
        <div className="flex flex-wrap items-center gap-2">
          {!address ? (
            <Button className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white shadow-sm hover:from-indigo-500 hover:to-fuchsia-500" onClick={openModalAndConnect}>Connect Wallet</Button>
          ) : (
            <span className="truncate rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">Connected: {address}</span>
          )}
          <Button
            disabled={incLoading}
            onClick={() => increment()}
          >
            {incLoading ? "Incrementing…" : "Increment"}
          </Button>
        </div>
        {incError && <p className="text-xs text-red-600">{incError}</p>}
        <p className="text-xs text-gray-500">
          Builds, simulates, then sign-and-send with your connected wallet.
        </p>
      </div>

      <footer className="text-xs text-gray-500">
        When you are ready, you can remove this Onboarding component import from the home page and
        replace it with your own components.
      </footer>
    </section>
  );
}


