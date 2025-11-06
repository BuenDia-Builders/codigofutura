"use client";

import { useMemo } from "react";
import { useWalletsKitContext } from "@/contexts/WalletsKitContext";

export function useWalletsKit() {
	const ctx = useWalletsKitContext();

	const isConnected = !!ctx.address;
	const shortAddress = useMemo(() => {
		if (!ctx.address) return "";
		const addr = ctx.address;
		if (addr.length <= 10) return addr;
		return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
	}, [ctx.address]);

	return {
		...ctx,
		isConnected,
		shortAddress,
	};
}
