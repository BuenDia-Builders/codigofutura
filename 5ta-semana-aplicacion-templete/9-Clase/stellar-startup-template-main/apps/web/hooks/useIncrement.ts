"use client";
import { useCallback, useState } from "react";
import { getConfig } from "@/lib/config";
import { useWalletsKitContext } from "@/contexts/WalletsKitContext";

// Uses a generated TS binding for the increment contract.
// Set INCREMENT_BINDING (or NEXT_PUBLIC_INCREMENT_BINDING) to the module id, e.g. "packages/increment".

async function loadIncrementClient(rpcUrl: string) {
  const moduleId = process.env.NEXT_PUBLIC_INCREMENT_BINDING;
  if (!moduleId) {
    throw new Error(
      "NEXT_PUBLIC_INCREMENT_BINDING is not set. Generate TS bindings (stellar contract bindings typescript) and set this env var to the binding package id. See apps/web/CONTRACTS_GUIDE.md."
    );
  }
  const dynamicImport: (s: string) => Promise<any> = (0, eval)("import");
  const mod: any = await dynamicImport(moduleId as string);
  const networks = mod.networks ?? {};
  const base = networks?.testnet ?? {};
  const client = new mod.Client({ ...base, rpcUrl });
  return client;
}

export function useIncrement() {
  const cfg = getConfig();
  const { signTransaction, refreshAddress } = useWalletsKitContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const increment = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const client: any = await loadIncrementClient(cfg.sorobanRpcUrl);
      const publicKey = await refreshAddress();
      if (!publicKey) throw new Error("Connect a wallet first");

      // Provide wallet/signing to the generated client
      client.options = client.options || {};
      client.options.publicKey = publicKey;
      client.options.signTransaction = signTransaction;

      // Build and simulate, then sign and send
      const tx = await client.increment();
      const { result } = await tx.signAndSend();
      return result as unknown;
    } catch (e) {
      const msg = (e as Error).message;
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cfg.sorobanRpcUrl, refreshAddress, signTransaction]);

  return { loading, error, increment };
}


