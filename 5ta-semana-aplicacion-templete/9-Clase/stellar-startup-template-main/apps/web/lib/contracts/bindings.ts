import { getConfig } from "@/lib/config";

export type BindingModuleId = string;

export async function loadBinding(moduleId: BindingModuleId) {
  const cfg = getConfig();
  const dynamicImport: (s: string) => Promise<any> = (0, eval)("import");
  const Client = await dynamicImport(moduleId);
  const networks = (Client as any).networks ?? {};
  const base = networks?.testnet ?? {};
  const client = new (Client as any).Client({ ...base, rpcUrl: cfg.sorobanRpcUrl });
  return client;
}


