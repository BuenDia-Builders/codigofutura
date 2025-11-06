"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getConfig } from "@/lib/config";

export type HorizonBalance = {
  balance: string;
  asset_type: string; // "native" means XLM
  asset_code?: string;
  asset_issuer?: string;
};

export type HorizonAccount = {
  id: string;
  account_id: string;
  balances: HorizonBalance[];
};

export function useStellarAccount(address: string | null) {
  const { horizonUrl } = getConfig();
  const [data, setData] = useState<HorizonAccount | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAccount = useCallback(async () => {
    if (!address) {
      setData(null);
      setError(null);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`${horizonUrl}/accounts/${address}`);
      if (!res.ok) throw new Error(`Horizon error: ${res.status}`);
      const json: HorizonAccount = await res.json();
      setData(json);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to fetch account";
      setError(message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [address, horizonUrl]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  const lumensBalance = useMemo(() => {
    if (!data) return "0";
    const native = data.balances.find((b) => b.asset_type === "native");
    return native?.balance ?? "0";
  }, [data]);

  return {
    account: data,
    isLoading,
    error,
    refresh: fetchAccount,
    lumensBalance,
  };
}
