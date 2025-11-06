"use client";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { getConfig } from "@/lib/config";

type JsonRpcRequest = {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: unknown[] | Record<string, unknown>;
};

type SorobanContextValue = {
  rpcUrl: string;
  call<T = unknown>(method: string, params?: unknown[] | Record<string, unknown>): Promise<T>;
  isHealthy: boolean | null;
  checkHealth: () => Promise<boolean>;
};

const SorobanContext = createContext<SorobanContextValue | undefined>(undefined);

async function jsonRpc<T>(endpoint: string, body: JsonRpcRequest): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`RPC ${body.method} failed: ${res.status}`);
  const data = (await res.json()) as { result?: T; error?: { message: string } };
  if (data.error) throw new Error(data.error.message);
  return data.result as T;
}

export function SorobanProvider({ children }: { children: React.ReactNode }) {
  const { sorobanRpcUrl } = getConfig();
  const idRef = useRef(0);
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);

  const call = useCallback< SorobanContextValue["call"] >(
    async (method, params) => {
      idRef.current += 1;
      return jsonRpc(sorobanRpcUrl, { jsonrpc: "2.0", id: idRef.current, method, params });
    },
    [sorobanRpcUrl]
  );

  const checkHealth = useCallback(async () => {
    try {
      // Common method on Soroban RPC nodes
      await call("getHealth");
      setIsHealthy(true);
      return true;
    } catch {
      setIsHealthy(false);
      return false;
    }
  }, [call]);

  const value = useMemo(() => ({ rpcUrl: sorobanRpcUrl, call, isHealthy, checkHealth }), [sorobanRpcUrl, call, isHealthy, checkHealth]);

  return <SorobanContext.Provider value={value}>{children}</SorobanContext.Provider>;
}

export function useSorobanContext(): SorobanContextValue {
  const ctx = useContext(SorobanContext);
  if (!ctx) throw new Error("useSorobanContext must be used within SorobanProvider");
  return ctx;
}


