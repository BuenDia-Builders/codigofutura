# Wiring the Web App to Contracts (Hello World Example)

This short guide shows how to connect the Next.js app to a deployed contract using generated TypeScript bindings, following Stellar docs.

Reference: Build a Hello World Frontend — https://developers.stellar.org/docs/build/smart-contracts/getting-started/hello-world-frontend
See also: Build a Dapp Frontend — https://developers.stellar.org/docs/build/apps/dapp-frontend

## 1) Prereqs
- Stellar CLI v23+ (`cargo install --locked stellar-cli --features opt`)
- Node 20+
- A deployed contract on Testnet (e.g., the hello-world contract from `contracts/contracts/hello-world`)

## 2) Generate TypeScript bindings
From the repository root (replace alias/ID as needed):
```bash
# If you deployed with alias `hello_world` in your .stellar context
stellar contract bindings typescript \
  --network testnet \
  --contract-id hello_world \
  --output-dir packages/hello_world

# Or, if you have a literal contract ID
stellar contract bindings typescript \
  --network testnet \
  --contract-id CCJGT...JY3 \
  --output-dir packages/hello_world
```
Then build the generated package:
```bash
cd packages/hello_world
npm install
npm run build
cd ../../
```

## 3) Point the web app at the bindings
Set an env variable the API route will use to load the bindings package at runtime. For local dev, you can use `.env.local` in `apps/web`:
```env
# apps/web/.env.local
HELLO_WORLD_BINDING=packages/hello_world
NEXT_PUBLIC_STELLAR_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
```
Note: We purposely use a dynamic import so you can locate the package anywhere (monorepo path or published NPM name).

## 4) Try the API endpoint
We added a reusable API endpoint:
- POST /api/hello-world with JSON body `{ "to": "Devs!" }`
- GET /api/hello-world?to=Devs!

If bindings are found, the endpoint will call the contract and return:
```json
{ "ok": true, "greeting": "Hello Devs!" }
```
If not, it returns a helpful 501 error describing how to generate and wire the bindings.

## 5) Use it from the UI (optional)
Use the provided hook:
```ts
import { useHelloWorld } from "@/hooks/useHelloWorld";

const { sayHello, greeting, loading, error } = useHelloWorld();
await sayHello("Devs!");
```

### Write calls with wallet signing (Increment)
We also include a `useIncrement` hook that demonstrates a state-changing call using a generated client with wallet signing.

Setup an env var to locate your increment binding package (e.g., `packages/increment`):
```env
NEXT_PUBLIC_INCREMENT_BINDING=packages/increment
```
Then in your component:
```ts
import { useIncrement } from "@/hooks/useIncrement";

const { increment, loading, error } = useIncrement();
await increment();
```
This mirrors the flow described in the Dapp Frontend guide: simulate, then `signAndSend` using the connected wallet.

## 6) Extending to other contracts
- Repeat steps for other contracts (e.g., `increment`) and add matching API routes like `/api/increment`.
- Keep bindings per contract under `packages/<alias>` and set matching env variables (e.g., `INCREMENT_BINDING=packages/increment`).
- For wallet-required calls, wire signing through `WalletsKitContext` and send signed XDR to the RPC.

Tips:
- Generated bindings expose `networks.testnet` with the deployed contract id; we override `rpcUrl` from `NEXT_PUBLIC_STELLAR_SOROBAN_RPC_URL`.
- For full Dapp patterns and frontends, see the docs linked above.
