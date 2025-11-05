# Hello World

Simple greeting example.

## Build
```bash
stellar contract build
```
Output: `target/wasm32v1-none/release/hello_world.wasm`

## Test
```bash
cargo test
```

## Deploy (Testnet)
```bash
CONTRACT_ID=$(stellar contract deploy \
  --wasm target/wasm32v1-none/release/hello_world.wasm \
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
  hello \
  --to "World"
```

## Reference
- Getting started: https://developers.stellar.org/docs/build/smart-contracts/getting-started
