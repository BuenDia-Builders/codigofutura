export type AppConfig = {
  supabaseUrl: string;
  supabaseAnonKey: string;
  stellarNetwork: "testnet" | "public" | string;
  horizonUrl: string;
  sorobanRpcUrl: string;
  walletConnectProjectId?: string;
  appName?: string;
  appUrl?: string;
};

export function getConfig(): AppConfig {
  const cfg: AppConfig = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    stellarNetwork: process.env.NEXT_PUBLIC_STELLAR_NETWORK || "testnet",
    horizonUrl: process.env.NEXT_PUBLIC_STELLAR_HORIZON_URL || "https://horizon-testnet.stellar.org",
    sorobanRpcUrl:
      process.env.NEXT_PUBLIC_STELLAR_SOROBAN_RPC_URL || "https://soroban-testnet.stellar.org",
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    appName: process.env.NEXT_PUBLIC_APP_NAME || "Stellar App",
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  };

  return cfg;
}


