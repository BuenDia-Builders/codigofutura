# 🚀 Deployment - Deploy en Testnet

## 📋 Pre-requisitos

### 1. Verificar Instalación de Herramientas

```bash
# Verificar Rust
rustc --version
# Expected: rustc 1.74.0 o superior

# Verificar Stellar CLI
stellar --version
# Expected: stellar 20.0.0 o superior

# Verificar target WASM
rustup target list | grep wasm32
# Expected: wasm32-unknown-unknown (installed)
```

### 2. Configurar Cuenta en Testnet

```bash
# Crear una nueva identidad
stellar keys generate alice --network testnet

# Ver la dirección pública
stellar keys address alice

# Fondear la cuenta con Friendbot
curl "https://friendbot.stellar.org?addr=$(stellar keys address alice)"

# Verificar balance
stellar account balance alice --network testnet
```

---

## 🔨 Build del Contrato

### Paso 1: Compilar el Proyecto

```bash
# Navegar al directorio del proyecto
cd token_bdb

# Limpiar builds anteriores
cargo clean

# Compilar en modo release
stellar contract build

# Verificar que se generó el WASM
ls -la target/wasm32-unknown-unknown/release/
# Deberías ver: token_bdb.wasm
```

### Paso 2: Optimizar el WASM (Opcional)

```bash
# Instalar wasm-opt si no lo tienes
npm install -g wasm-opt

# Optimizar el archivo
wasm-opt -Oz \
  target/wasm32-unknown-unknown/release/token_bdb.wasm \
  -o target/wasm32-unknown-unknown/release/token_bdb_optimized.wasm

# Comparar tamaños
ls -lh target/wasm32-unknown-unknown/release/*.wasm
```

---

## 🌐 Deploy en Testnet

### Paso 1: Deploy del Contrato

```bash
# Deploy básico
stellar contract deploy \
    --wasm target/wasm32-unknown-unknown/release/token_bdb.wasm \
    --source alice \
    --network testnet

# El comando retornará un CONTRACT_ID, guárdalo:
# Ejemplo: CCFZJM2QZX2F5KHXQWHHXDGSZRXXMGCWSL2F7ZDU5HSTWZQSTQEJMNXI
```

### Paso 2: Guardar el Contract ID

```bash
# Exportar como variable de entorno
export TOKEN_CONTRACT_ID="CCFZJM2QZX2F5KHXQWHHXDGSZRXXMGCWSL2F7ZDU5HSTWZQSTQEJMNXI"

# O guardar en archivo
echo $TOKEN_CONTRACT_ID > .soroban/token_id

# Verificar
echo "Token deployado en: $TOKEN_CONTRACT_ID"
```

---

## 🎯 Inicializar el Token

### Paso 1: Preparar los Parámetros

```bash
# Inicializar con tus parámetros
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --source alice \
    --network testnet \
    -- initialize \
    --admin alice \
    --name "BuilderToken" \
    --symbol "BDB" \
    --decimals 7
```

### Paso 2: Verificar Inicialización

```bash
# Consultar nombre
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- name

# Consultar símbolo
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- symbol

# Consultar decimales
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- decimals

# Consultar total supply
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- total_supply
```

---

## 💰 Operaciones Básicas

### Mintear Tokens

```bash
# Mintear 1,000,000 tokens (con 7 decimales = 10000000000000)
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --source alice \
    --network testnet \
    -- mint \
    --to alice \
    --amount 10000000000000

# Verificar balance
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- balance \
    --account alice
```

### Transferir Tokens

```bash
# Crear segunda cuenta
stellar keys generate bob --network testnet
curl "https://friendbot.stellar.org?addr=$(stellar keys address bob)"

# Transferir 100 tokens (1000000 con 7 decimales)
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --source alice \
    --network testnet \
    -- transfer \
    --from alice \
    --to $(stellar keys address bob) \
    --amount 1000000

# Verificar balances
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- balance \
    --account bob
```

### Sistema de Allowances

```bash
# Alice aprueba a Bob para gastar 50 tokens
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --source alice \
    --network testnet \
    -- approve \
    --from alice \
    --spender $(stellar keys address bob) \
    --amount 500000

# Verificar allowance
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- allowance \
    --from alice \
    --spender $(stellar keys address bob)

# Bob transfiere en nombre de Alice
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --source bob \
    --network testnet \
    -- transfer_from \
    --spender bob \
    --from $(stellar keys address alice) \
    --to $(stellar keys address bob) \
    --amount 250000
```

### Burn de Tokens

```bash
# Quemar 10 tokens
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --source alice \
    --network testnet \
    -- burn \
    --from alice \
    --amount 100000

# Verificar nuevo balance y supply
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- balance \
    --account alice

stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- total_supply
```

---

## 🔍 Monitoreo y Debugging

### Ver Transacciones en Explorer

```bash
# Construir URL del explorer
echo "https://stellar.expert/explorer/testnet/contract/$TOKEN_CONTRACT_ID"

# O usar Stellar Laboratory
echo "https://laboratory.stellar.org/#explorer?resource=contract&endpoint=single&network=test&id=$TOKEN_CONTRACT_ID"
```

### Debugging con Logs

```bash
# Ver eventos emitidos
stellar events \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    --start-ledger 1000000 \
    --output json
```

### Verificar Estado del Contrato

```bash
# Ver toda la data del contrato
stellar contract read \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    --output json
```

---

## 🛠️ Troubleshooting Común

### Error: "Contract already initialized"
```bash
# Solución: Deploy un nuevo contrato
stellar contract deploy \
    --wasm target/wasm32-unknown-unknown/release/token_bdb.wasm \
    --source alice \
    --network testnet
```

### Error: "Insufficient balance"
```bash
# Verificar balance antes de transferir
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- balance \
    --account alice
```

### Error: "Not authorized"
```bash
# Asegurarse de usar el --source correcto
# Para mint, debe ser el admin
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- get_admin
```

### Error: "Transaction too large"
```bash
# Reducir el footprint
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --source alice \
    --network testnet \
    --fee 1000000 \
    -- your_function
```

---

## 📊 Script de Deploy Completo

Crea un archivo `deploy.sh`:

```bash
#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando deploy de Token BDB...${NC}"

# Build
echo -e "${BLUE}Building contract...${NC}"
stellar contract build

# Deploy
echo -e "${BLUE}Deploying to testnet...${NC}"
CONTRACT_ID=$(stellar contract deploy \
    --wasm target/wasm32-unknown-unknown/release/token_bdb.wasm \
    --source alice \
    --network testnet)

echo -e "${GREEN}✅ Contract deployed at: $CONTRACT_ID${NC}"

# Initialize
echo -e "${BLUE}Initializing token...${NC}"
stellar contract invoke \
    --id $CONTRACT_ID \
    --source alice \
    --network testnet \
    -- initialize \
    --admin alice \
    --name "BuilderToken" \
    --symbol "BDB" \
    --decimals 7

# Mint initial supply
echo -e "${BLUE}Minting initial supply...${NC}"
stellar contract invoke \
    --id $CONTRACT_ID \
    --source alice \
    --network testnet \
    -- mint \
    --to alice \
    --amount 100000000000000

# Verify
echo -e "${BLUE}Verifying deployment...${NC}"
NAME=$(stellar contract invoke \
    --id $CONTRACT_ID \
    --network testnet \
    -- name)

SYMBOL=$(stellar contract invoke \
    --id $CONTRACT_ID \
    --network testnet \
    -- symbol)

SUPPLY=$(stellar contract invoke \
    --id $CONTRACT_ID \
    --network testnet \
    -- total_supply)

echo -e "${GREEN}✅ Token Details:${NC}"
echo -e "  Name: $NAME"
echo -e "  Symbol: $SYMBOL"
echo -e "  Total Supply: $SUPPLY"
echo -e "  Contract ID: $CONTRACT_ID"
echo -e ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo -e "${BLUE}View in explorer:${NC}"
echo -e "https://stellar.expert/explorer/testnet/contract/$CONTRACT_ID"

# Save contract ID
echo $CONTRACT_ID > .soroban/token_id
echo -e "${GREEN}Contract ID saved to .soroban/token_id${NC}"
```

Ejecutar:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🎉 ¡Felicidades!

Has deployado exitosamente tu token en Stellar Testnet. 

### Próximos Pasos:
1. 📱 Integrar con una wallet (Freighter)
2. 🖥️ Crear un frontend en React
3. 📊 Añadir analytics y monitoring
4. 🔄 Integrar con un DEX

### Recursos Útiles:
- [Stellar Laboratory](https://laboratory.stellar.org)
- [Testnet Explorer](https://stellar.expert/explorer/testnet)
- [Soroban Docs](https://soroban.stellar.org/docs)

---

*"From local development to testnet deployment - You're now a blockchain developer!" 🚀*