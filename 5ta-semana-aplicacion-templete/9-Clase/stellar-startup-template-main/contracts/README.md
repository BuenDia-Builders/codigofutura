# Contracts: Build, Test, Deploy, and Invoke

This guide walks you through building, testing, deploying, and invoking the smart contracts in this workspace using the Stellar CLI (v23+).

Contracts in this folder:
- `contracts/increment`
- `contracts/events-increment`
- `contracts/fungible-token`
- `contracts/non-fungible-token`
- `contracts/hello-world`
- `contracts/starter`

## Prerequisites

- Rust & Cargo
- Stellar CLI (v23+)
  - Install: `cargo install --locked stellar-cli --features opt`
- WASM target
  - New target (recommended for v23): `rustup target add wasm32v1-none`
- Testnet account funded via Friendbot
  - You’ll need a public key `G...` and secret key `S...` on Testnet.

Official docs for reference:
- Storage example (increment, storage TTL): [Stellar Docs: Storage](https://developers.stellar.org/docs/build/smart-contracts/example-contracts/storage)
- Events example: [Stellar Docs: Events](https://developers.stellar.org/docs/build/smart-contracts/example-contracts/events)
- Fungible Token example: [Stellar Docs: Fungible Token](https://developers.stellar.org/docs/build/smart-contracts/example-contracts/fungible-token)
- Non-Fungible Token example: [Stellar Docs: Non-Fungible Token](https://developers.stellar.org/docs/build/smart-contracts/example-contracts/non-fungible-token)

## Environment Setup (Testnet)

1) Set your keys (replace with your values):
```bash
export PUBLIC_KEY=GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
export SECRET_KEY=SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

2) Fund on Testnet (Friendbot):
```bash
curl "https://friendbot.stellar.org?addr=$PUBLIC_KEY"
```

3) Verify balances in Explorer or with your preferred tool.

## Build

You can build contracts individually or all in a loop.

- Build one contract:
```bash
cd contracts/contracts/increment
stellar contract build
```

- Build all contracts in this workspace:
```bash
cd contracts
for d in contracts/*; do (cd "$d" && stellar contract build); done
```

WASM output (v23) is placed under `target/wasm32v1-none/release/<crate_name>.wasm` inside each contract directory.

## Test

- Test one contract:
```bash
cd contracts/contracts/fungible-token
cargo test
```

- Test all contracts:
```bash
cd contracts
for d in contracts/*; do (cd "$d" && cargo test); done
```

## Deploy (Testnet)

General pattern:
```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/<crate_name>.wasm \
  --network testnet \
  --source $SECRET_KEY
```
Copy the resulting Contract ID printed by the CLI for subsequent invocations.

### Examples

- Increment
```bash
cd contracts/contracts/increment
stellar contract build
CONTRACT_ID=$(stellar contract deploy \
  --wasm target/wasm32v1-none/release/increment.wasm \
  --network testnet \
  --source $SECRET_KEY | tail -n 1)
```

- Events Increment
```bash
cd contracts/contracts/events-increment
stellar contract build
CONTRACT_ID=$(stellar contract deploy \
  --wasm target/wasm32v1-none/release/events-increment.wasm \
  --network testnet \
  --source $SECRET_KEY | tail -n 1)
```

- Fungible Token
```bash
cd contracts/contracts/fungible-token
stellar contract build
CONTRACT_ID=$(stellar contract deploy \
  --wasm target/wasm32v1-none/release/fungible-token.wasm \
  --network testnet \
  --source $SECRET_KEY | tail -n 1)
```

- Non-Fungible Token
```bash
cd contracts/contracts/non-fungible-token
stellar contract build
CONTRACT_ID=$(stellar contract deploy \
  --wasm target/wasm32v1-none/release/non-fungible-token.wasm \
  --network testnet \
  --source $SECRET_KEY | tail -n 1)
```

> Note: Capturing `CONTRACT_ID` with `tail -n 1` is a convenience. If the output format differs, copy the printed ID manually.

## Invoke

General pattern:
```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --network testnet \
  --source $SECRET_KEY \
  -- \
  <fn_name> [--arg1 value1] [--arg2 value2] ...
```

### Increment
- Call increment:
```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --network testnet \
  --source $SECRET_KEY \
  -- \
  increment
```

### Events Increment
- Call increment (emits an event):
```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --network testnet \
  --source $SECRET_KEY \
  -- \
  increment
```

### Fungible Token (minimal example)
- Mint (admin auth required):
```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --network testnet \
  --source $SECRET_KEY \
  -- \
  mint \
  --admin $PUBLIC_KEY \
  --to G_ALICE_PUBLIC_KEY \
  --amount 100
```
- Transfer (from auth required):
```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --network testnet \
  --source S_ALICE_SECRET_KEY \
  -- \
  transfer \
  --from G_ALICE_PUBLIC_KEY \
  --to G_BOB_PUBLIC_KEY \
  --amount 40
```
- Balance:
```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --network testnet \
  --source $SECRET_KEY \
  -- \
  balance \
  --id G_ALICE_PUBLIC_KEY
```

### Non-Fungible Token (minimal example)
- Mint (admin auth required):
```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --network testnet \
  --source $SECRET_KEY \
  -- \
  mint \
  --admin $PUBLIC_KEY \
  --to G_ALICE_PUBLIC_KEY
```
- Owner Of:
```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --network testnet \
  --source $SECRET_KEY \
  -- \
  owner_of \
  --id 0
```
- Transfer (from auth required):
```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --network testnet \
  --source S_ALICE_SECRET_KEY \
  -- \
  transfer \
  --from G_ALICE_PUBLIC_KEY \
  --to G_BOB_PUBLIC_KEY \
  --id 0
```

## Optimize (optional, for production)
```bash
# Run from each contract dir after build
stellar contract optimize --wasm target/wasm32v1-none/release/<crate_name>.wasm
```

## Tips & Troubleshooting
- If build fails, ensure `rustup target add wasm32v1-none` is installed and you’re on `soroban-sdk = "23.0.3"`.
- For auth-required methods, the `--source` key must be the account that needs to authorize the call.
- Events: `events-increment` emits an event on each increment. You can inspect events via RPC provider tooling.
- For deeper context on storage TTLs, events, and token interfaces, see the docs linked above.