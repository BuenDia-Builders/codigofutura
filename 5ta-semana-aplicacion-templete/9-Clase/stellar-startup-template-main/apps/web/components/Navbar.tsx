"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getConfig } from "@/lib/config";
import { useWalletsKit } from "@/hooks/useWalletsKit";
import { WalletMenu } from "@/components/WalletMenu";

export function Navbar() {
  const { appName, stellarNetwork } = getConfig();
  const [open, setOpen] = useState(false);
  const { isConnected, openModalAndConnect } = useWalletsKit();
  const explorerNetwork = stellarNetwork === "public" ? "public" : "testnet";
  const explorerHref = `https://stellar.expert/explorer/${explorerNetwork}`;

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle navigation"
            className="sm:hidden rounded-md border px-2 py-1 text-gray-600 hover:bg-gray-100"
            type="button"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
          <span className="inline-flex items-center gap-2 text-base font-semibold">
            <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
              {appName || "Stellar App"}
            </span>
            <span className="rounded-full bg-gray-900/5 px-2 py-0.5 text-[10px] font-medium text-gray-600">Starter</span>
          </span>
        </div>
        <nav className="hidden items-center gap-1 sm:flex">
          <a href="/" className="rounded px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100">Home</a>
          <a href="/contracts-inspector" className="rounded px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100">Contracts</a>
          <a href={explorerHref} target="_blank" rel="noreferrer" className="rounded px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100">Explorer</a>
          {!isConnected ? (
            <Button onClick={openModalAndConnect} className="ml-2 bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white shadow-sm hover:from-indigo-500 hover:to-fuchsia-500">
              Connect Wallet
            </Button>
          ) : (
            <div className="ml-2">
              <WalletMenu />
            </div>
          )}
        </nav>
      </div>
      {open && (
        <div className="sm:hidden border-t border-black/5 bg-white/70 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-3">
            <a href="/" className="rounded px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100" onClick={() => setOpen(false)}>Home</a>
            <a href={explorerHref} target="_blank" rel="noreferrer" className="rounded px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100" onClick={() => setOpen(false)}>Explorer</a>
            {!isConnected ? (
              <Button onClick={openModalAndConnect} className="mt-2 bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white shadow-sm hover:from-indigo-500 hover:to-fuchsia-500">
                Connect Wallet
              </Button>
            ) : (
              <div className="mt-2">
                <WalletMenu />
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}


