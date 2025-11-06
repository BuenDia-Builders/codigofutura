# Non-Fungible Token (Minimal)

Sequential minting, owner_of, and transfer.

## Build
```bash
stellar contract build
```
Output: `target/wasm32v1-none/release/non_fungible_token.wasm`

## Test
```bash
cargo test
```

## Deploy (Testnet)
```bash
CONTRACT_ID=$(stellar contract deploy \
  --wasm target/wasm32v1-none/release/non_fungible_token.wasm \
  --network testnet \
  --source S_YOUR_SECRET_KEY | tail -n 1)
```

## Invoke
- Mint (admin auth required):
```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --network testnet \
  --source S_ADMIN_SECRET_KEY \
  -- \
  mint \
  --admin G_ADMIN_PUBLIC_KEY \
  --to G_ALICE_PUBLIC_KEY
```
- Owner Of:
```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --network testnet \
  --source S_ANY_SECRET \
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

## Reference
- Non-Fungible Token example: https://developers.stellar.org/docs/build/smart-contracts/example-contracts/non-fungible-token
