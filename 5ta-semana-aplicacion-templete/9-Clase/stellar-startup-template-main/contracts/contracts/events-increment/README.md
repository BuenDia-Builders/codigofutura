# Events Increment (Storage + Events)

Counter that emits an event on each increment.

## Build
```bash
echo "Use Stellar CLI v23+"
stellar contract build
```
Output: `target/wasm32v1-none/release/events_increment.wasm`

## Test
```bash
cargo test
```

## Deploy (Testnet)
```bash
CONTRACT_ID=$(stellar contract deploy \
  --wasm target/wasm32v1-none/release/events_increment.wasm \
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
- Events example: https://developers.stellar.org/docs/build/smart-contracts/example-contracts/events
