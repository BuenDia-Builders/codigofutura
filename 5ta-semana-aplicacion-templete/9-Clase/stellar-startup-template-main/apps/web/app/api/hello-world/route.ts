import { NextRequest } from "next/server";
import { getConfig } from "@/lib/config";

type HelloRequest = { to?: string };

async function getClient() {
  const cfg = getConfig();
  const moduleId = process.env.HELLO_WORLD_BINDING || process.env.NEXT_PUBLIC_HELLO_WORLD_BINDING;
  if (!moduleId) {
    throw new Error(
      "HELLO_WORLD_BINDING is not set. Generate TS bindings and set HELLO_WORLD_BINDING (or NEXT_PUBLIC_HELLO_WORLD_BINDING). See apps/web/CONTRACTS_GUIDE.md."
    );
  }
  try {
    // Expect a generated TS binding package. See CONTRACTS_GUIDE.md for setup.
    const dynamicImport: (s: string) => Promise<any> = (0, eval)("import");
    const Client = await dynamicImport(moduleId as string);
    const networks = (Client as any).networks ?? {};
    const base = networks?.testnet ?? {};
    const client = new (Client as any).Client({ ...base, rpcUrl: cfg.sorobanRpcUrl });
    return client;
  } catch (e) {
    throw new Error(
      `Hello World binding not found (module: ${String(moduleId)}). Generate TS bindings and set HELLO_WORLD_BINDING env. See apps/web/CONTRACTS_GUIDE.md.\nOriginal error: ${(e as Error).message}`
    );
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const to = url.searchParams.get("to") ?? "Devs!";
  try {
    const client = await getClient();
    const { result } = await client.hello({ to });
    return Response.json({ ok: true, greeting: Array.isArray(result) ? result.join(" ") : result });
  } catch (e) {
    return Response.json({ ok: false, error: (e as Error).message }, { status: 501 });
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as HelloRequest;
  const to = body.to ?? "Devs!";
  try {
    const client = await getClient();
    const { result } = await client.hello({ to });
    return Response.json({ ok: true, greeting: Array.isArray(result) ? result.join(" ") : result });
  } catch (e) {
    return Response.json({ ok: false, error: (e as Error).message }, { status: 501 });
  }
}


