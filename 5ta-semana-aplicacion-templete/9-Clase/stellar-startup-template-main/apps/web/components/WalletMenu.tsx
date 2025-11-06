"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { useWalletsKit } from "@/hooks/useWalletsKit";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import { useStellarAccount } from "@/hooks/useStellarAccount";

function truncateAddress(addr: string) {
  if (!addr) return "";
  if (addr.length <= 12) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function WalletMenu() {
  const { address, network, disconnect } = useWalletsKit();
  const { lumensBalance, isLoading, refresh } = useStellarAccount(address);
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => {
    // refresh balance when menu opens
    if (open) refresh();
  }, [open, refresh]);

  if (!address) return null;

  const explorerNetwork = network === WalletNetwork.PUBLIC ? "public" : "testnet";
  const explorerUrl = `https://stellar.expert/explorer/${explorerNetwork}/account/${address}`;

  return (
    <div className="relative" ref={popoverRef}>
      <Button variant="outline" onClick={() => setOpen((v) => !v)}>
        {truncateAddress(address)}
      </Button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-md border bg-white p-3 shadow-md">
          <div className="mb-2 flex items-center justify-between">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{address}</div>
              <div className="text-xs text-gray-500">Network: {network}</div>
            </div>
            <CopyButton value={address} />
          </div>

          <div className="mb-3 rounded-md border p-2">
            <div className="text-xs text-gray-500">Balance (XLM)</div>
            <div className="text-lg font-semibold">{isLoading ? "…" : lumensBalance}</div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <a
              href={explorerUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              View on Explorer
            </a>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={refresh}>
                Refresh
              </Button>
              <Button variant="outline" onClick={() => { setOpen(false); disconnect(); }}>
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
