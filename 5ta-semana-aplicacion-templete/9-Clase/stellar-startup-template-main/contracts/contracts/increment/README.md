# Increment (Storage Example)

Minimal counter using instance storage and TTL.

## Build
```bash
stellar contract build
```
Output: `target/wasm32v1-none/release/increment.wasm`

## Test
```bash
cargo test
```

## Deploy (Testnet)
```bash
CONTRACT_ID=$(stellar contract deploy \
  --wasm target/wasm32v1-none/release/increment.wasm \
  --network testnet \
  --source S_YOUR_SECRET_KEY | tail -n 1)
```

## Invoke
```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --network testnet \
  --source S_YOUR_SECRET_KEY \
  -- \
  increment
```

## Reference
- Storage example: https://developers.stellar.org/docs/build/smart-contracts/example-contracts/storage
