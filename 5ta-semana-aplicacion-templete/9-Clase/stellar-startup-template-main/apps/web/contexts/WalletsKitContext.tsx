"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
	StellarWalletsKit,
	WalletNetwork,
	allowAllModules,
	XBULL_ID,
} from "@creit.tech/stellar-wallets-kit";
import type { ISupportedWallet } from "@creit.tech/stellar-wallets-kit";
import { getConfig } from "@/lib/config";

export type WalletsKitContextValue = {
	kit: StellarWalletsKit | null;
	address: string | null;
	selectedWalletId: string | null;
	network: WalletNetwork;
	openModalAndConnect: () => Promise<void>;
	setWallet: (walletId: string) => Promise<void>;
	refreshAddress: () => Promise<string | null>;
	signTransaction: (xdr: string, opts?: { address?: string; networkPassphrase?: WalletNetwork | string }) => Promise<string>;
	disconnect: () => void;
};

const WalletsKitContext = createContext<WalletsKitContextValue | undefined>(undefined);

function mapNetwork(env: string | undefined): WalletNetwork {
	if (!env) return WalletNetwork.TESTNET;
	const v = env.toLowerCase();
	if (v === "public" || v === "mainnet") return WalletNetwork.PUBLIC;
	return WalletNetwork.TESTNET;
}

export function WalletsKitProvider({ children }: { children: ReactNode }) {
	const cfg = getConfig();
	const network = useMemo(() => mapNetwork(cfg.stellarNetwork), [cfg.stellarNetwork]);
	const kitRef = useRef<StellarWalletsKit | null>(null);
	const [address, setAddress] = useState<string | null>(null);
	const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);

	// Lazily initialize the kit once
	const kit = useMemo(() => {
		if (typeof window === "undefined") return null;
		if (!kitRef.current) {
			kitRef.current = new StellarWalletsKit({
				network,
				selectedWalletId: XBULL_ID,
				modules: allowAllModules(),
			});
		}
		return kitRef.current;
	}, [network]);

	const setWallet = useCallback(async (walletId: string) => {
		if (!kit) return;
		await kit.setWallet(walletId);
		setSelectedWalletId(walletId);
		try {
			if (typeof window !== "undefined") {
				localStorage.setItem("stellar.wallet.selected", walletId);
			}
		} catch (_e) {
			// ignore storage errors
		}
	}, [kit]);

	const refreshAddress = useCallback(async () => {
		if (!kit) return null;
		try {
			const { address: addr } = await kit.getAddress();
			setAddress(addr);
			try {
				if (typeof window !== "undefined") {
					localStorage.setItem("stellar.wallet.address", addr);
				}
			} catch (_e) {
				// ignore storage errors
			}
			return addr;
		} catch (_e) {
			setAddress(null);
			try {
				if (typeof window !== "undefined") {
					localStorage.removeItem("stellar.wallet.address");
				}
			} catch (_e) {
				// ignore storage errors
			}
			return null;
		}
	}, [kit]);

	const openModalAndConnect = useCallback(async () => {
		if (!kit) return;
		await kit.openModal({
			onWalletSelected: async (option: ISupportedWallet) => {
				await setWallet(option.id);
				await refreshAddress();
			},
		});
	}, [kit, refreshAddress, setWallet]);

	const signTransaction = useCallback(
		async (
			xdr: string,
			opts?: { address?: string; networkPassphrase?: WalletNetwork | string }
		) => {
			if (!kit) throw new Error("Wallet kit not initialized");
			const addr = opts?.address ?? address ?? (await refreshAddress());
			if (!addr) throw new Error("No wallet connected");
			const networkPassphrase = opts?.networkPassphrase ?? network;
			const { signedTxXdr } = await kit.signTransaction(xdr, {
				address: addr,
				networkPassphrase,
			});
			return signedTxXdr;
		},
		[kit, address, network, refreshAddress]
	);

	// Auto-connect on mount if a previous wallet selection exists
	useEffect(() => {
		if (!kit) return;
		try {
			const lastWallet = typeof window !== "undefined" ? localStorage.getItem("stellar.wallet.selected") : null;
			if (lastWallet) {
				(async () => {
					await setWallet(lastWallet);
					const storedAddr = localStorage.getItem("stellar.wallet.address");
					if (storedAddr) setAddress(storedAddr);
					await refreshAddress();
				})();
			}
		} catch (_e) {
			// ignore storage errors
		}
	}, [kit, setWallet, refreshAddress]);

	const disconnect = useCallback(() => {
		setAddress(null);
		setSelectedWalletId(null);
		try {
			if (typeof window !== "undefined") {
				localStorage.removeItem("stellar.wallet.selected");
				localStorage.removeItem("stellar.wallet.address");
			}
		} catch (_e) {
			// ignore storage errors
		}
	}, []);

	const value: WalletsKitContextValue = {
		kit,
		address,
		selectedWalletId,
		network,
		openModalAndConnect,
		setWallet,
		refreshAddress,
		signTransaction,
		disconnect,
	};

	return <WalletsKitContext.Provider value={value}>{children}</WalletsKitContext.Provider>;
}

export function useWalletsKitContext(): WalletsKitContextValue {
	const ctx = useContext(WalletsKitContext);
	if (!ctx) throw new Error("useWalletsKitContext must be used within WalletsKitProvider");
	return ctx;
}

// Auto-connect effect kept inside file to avoid extra exports; runs within provider via useEffect below
export function WalletsKitAutoConnector() {
	return null;
}


