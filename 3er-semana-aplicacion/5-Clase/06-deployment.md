# 🚀 Deployment - Deploy en Testnet (Windows con WSL)

## 🤔 ¿Por qué usar WSL en lugar de PowerShell?

### **TL;DR: WSL es el estándar de la industria para desarrollo blockchain en Windows**

Aunque PowerShell funciona para comandos básicos, **WSL (Windows Subsystem for Linux)** es la opción recomendada por estas razones críticas:

#### ✅ **Ventajas de WSL para Desarrollo Blockchain**

1. **📚 Compatibilidad con Documentación**
   - La mayoría de documentación de Stellar/Soroban usa sintaxis Bash/Linux
   - Tutoriales, ejemplos y guías funcionan sin modificación
   - Copy-paste directo de la documentación oficial

2. **🛠️ Herramientas Nativas**
   - `curl`, `grep`, `awk`, `sed` funcionan nativamente
   - Scripts de deploy de la comunidad funcionan directamente
   - Herramientas de desarrollo (Docker, Node.js) más estables

3. **🚀 Ecosistema Completo**
   - Acceso completo al ecosistema Linux (apt, brew, etc.)
   - Compatibilidad con todas las librerías de desarrollo
   - Mejor integración con VS Code y herramientas modernas

4. **⚡ Performance**
   - Más rápido que PowerShell para operaciones de archivo
   - Menos overhead que una VM completa
   - Acceso directo a archivos de Windows

5. **🌍 Preparación para Producción**
   - Servidores usan Linux (AWS, Google Cloud, Azure)
   - Mismos comandos en desarrollo y producción
   - Evita problemas de "funciona en mi máquina"

#### ❌ **Problemas con PowerShell Puro**

- Sintaxis diferente (`` ` `` vs `\`, `$env:` vs `$`, etc.)
- Comandos no compatibles con documentación oficial
- Difícil colaborar con la comunidad (todos usan Bash)
- Scripts de deploy de terceros no funcionan
- Más fricción en el desarrollo día a día

---

### 💡 Analogía Simple

**PowerShell es como conducir un auto en un país con reglas de tránsito diferentes:**
- Funciona, pero constantemente tienes que traducir las señales
- Los mapas (documentación) están en otro idioma
- Es más difícil pedir ayuda porque todos manejan del otro lado

**WSL es como tener las reglas estándar:**
- Todo funciona como esperas
- La documentación coincide con tu entorno
- La comunidad habla tu mismo idioma

---

## 📥 Instalación de WSL (Una Sola Vez)

### Paso 1: Instalar WSL2

Abre **PowerShell como Administrador** y ejecuta:

```powershell
# Instalar WSL2 con Ubuntu (1 comando, toma 5-10 minutos)
wsl --install
```

**Esto instala:**
- WSL2 (la versión moderna)
- Ubuntu (distribución Linux recomendada)
- Windows Terminal (opcional pero recomendado)

**Después de la instalación:**
1. Reinicia tu computadora
2. Ubuntu se abrirá automáticamente
3. Te pedirá crear un usuario y contraseña Linux

```bash
# Ejemplo:
Enter new UNIX username: alice
New password: ****
Retype new password: ****
```

💡 **Tip:** Esta contraseña es SOLO para Ubuntu dentro de WSL, no afecta Windows.

---

### Paso 2: Verificar Instalación

```bash
# Verificar versión de WSL
wsl --version

# Verificar que Ubuntu está corriendo
wsl -l -v
# Expected: Ubuntu Running 2
```

---

### Paso 3: Actualizar Ubuntu

```bash
# Dentro de Ubuntu (WSL), actualizar paquetes
sudo apt update && sudo apt upgrade -y
```

---

## 🔧 Configurar Entorno de Desarrollo

### Paso 1: Instalar Rust en WSL

```bash
# Instalar Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Cargar Rust en la sesión actual
source $HOME/.cargo/env

# Verificar instalación
rustc --version
cargo --version
```

---

### Paso 2: Instalar Stellar CLI

```bash
# Instalar Stellar CLI
cargo install --locked stellar-cli

# Verificar instalación
stellar --version
# Expected: stellar 21.0.0 o superior
```

---

### Paso 3: Instalar Target WASM

```bash
# Agregar target para compilar a WebAssembly
rustup target add wasm32v1-none:bash

# Verificar
rustup target list | grep wasm32
# Expected: wasm32v1-none
 (installed)
```

---

## 📁 Acceder a tus Archivos de Windows desde WSL

WSL puede acceder a todos tus archivos de Windows:

```bash
# Navegar a tu carpeta de Windows
# Formato: /mnt/<letra-de-disco>/ruta/

# Ejemplo 1: Documentos
cd /mnt/c/Users/TuUsuario/Documents

# Ejemplo 2: Escritorio
cd /mnt/c/Users/TuUsuario/Desktop

# Ejemplo 3: Carpeta del proyecto
cd /mnt/c/Users/TuUsuario/Documents/token_bdb
```

💡 **Tip:** Puedes usar Tab para autocompletar rutas.

---

## 🚀 Deploy del Token BDB

### Pre-requisitos

```bash
# Navegar a tu proyecto (ajusta la ruta según tu caso)
cd /mnt/c/Users/TuUsuario/Documents/token_bdb

# Verificar que estás en la carpeta correcta
ls -la
# Expected: Cargo.toml, src/, etc.
```

---

### Paso 1: Configurar Cuenta en Testnet

```bash
# Crear identidad
stellar keys generate alice --network testnet

# Ver dirección pública
stellar keys address alice

# Fondear con Friendbot
curl "https://friendbot.stellar.org?addr=$(stellar keys address alice)"

# Verificar balance
stellar account balance alice --network testnet
# Expected: Balance: 10000.0000000 XLM
```

---

### Paso 2: Compilar el Contrato

```bash
# Limpiar builds anteriores (opcional)
cargo clean

# Compilar a WASM
stellar contract build

# Verificar que se generó el archivo
ls -lh target/wasm32v1-none
/release/token_bdb.wasm
# Expected: ~50-100 KB
```

---

### Paso 3: Deploy en Testnet

```bash
# Deploy y guardar CONTRACT_ID
# Instalar target correcto
rustup target add wasm32v1-none
# Verificar
rustup target list | grep wasm32
# Expected: wasm32v1-none (installed)
# Compilar
stellar contract build
ls -lh target/wasm32v1-none/release/token_bdb.wasm
# Deploy
stellar contract deploy \
    --wasm target/wasm32v1-none/release/token_bdb.wasm \
    --source alice \
    --network testnet

# Mostrar CONTRACT_ID
echo "Contract deployado: $CONTRACT_ID"

# Guardar en archivo para uso futuro
mkdir -p .soroban
echo $CONTRACT_ID > .soroban/token_id

# También exportar como variable de entorno
export TOKEN_CONTRACT_ID=$CONTRACT_ID
```

💡 **Nota:** En Bash, `\` al final de línea continúa el comando en la siguiente línea.

---

### Paso 4: Inicializar el Token

```bash
# Inicializar con metadatos
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --source alice \
    --network testnet \
    -- initialize \
    --admin $(stellar keys address alice) \
    --name "Buen Dia Token" \
    --symbol "BDB" \
    --decimals 7
```

---

### Paso 5: Verificar Inicialización

```bash
# Consultar metadatos
echo "Nombre:"
stellar contract invoke --id $TOKEN_CONTRACT_ID --network testnet -- name

echo -e "\nSímbolo:"
stellar contract invoke --id $TOKEN_CONTRACT_ID --network testnet -- symbol

echo -e "\nDecimales:"
stellar contract invoke --id $TOKEN_CONTRACT_ID --network testnet -- decimals

echo -e "\nTotal Supply:"
stellar contract invoke --id $TOKEN_CONTRACT_ID --network testnet -- total_supply
```

**✅ Resultados esperados:**
```
Nombre: "Buen Dia Token"
Símbolo: "BDB"
Decimales: 7
Total Supply: 0
```

---

## 💰 Operaciones Básicas

### 📌 Entendiendo Stroops

En Stellar, los montos se expresan en **stroops**:

- **1 token = 10^decimals stroops**
- Con `decimals = 7`: **1 token = 10,000,000 stroops**

**Tabla de conversión:**

| Tokens | Stroops (decimals=7) |
|--------|----------------------|
| 1 | 10,000,000 |
| 100 | 1,000,000,000 |
| 1,000 | 10,000,000,000 |
| 1,000,000 | 10,000,000,000,000 |

---

### Mintear Tokens

```bash
# Mintear 1,000,000 tokens
# Cálculo: 1,000,000 * 10^7 = 10,000,000,000,000 stroops
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --source alice \
    --network testnet \
    -- mint \
    --to $(stellar keys address alice) \
    --amount 10000000000000

# Verificar balance
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- balance \
    --account $(stellar keys address alice)
```

---

### Transferir Tokens

```bash
# Crear segunda cuenta (Bob)
stellar keys generate bob --network testnet
curl "https://friendbot.stellar.org?addr=$(stellar keys address bob)"

# Transferir 100 tokens a Bob
# Cálculo: 100 * 10^7 = 1,000,000,000 stroops
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --source alice \
    --network testnet \
    -- transfer \
    --from $(stellar keys address alice) \
    --to $(stellar keys address bob) \
    --amount 1000000000

# Verificar balances
echo "Balance Alice:"
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- balance \
    --account $(stellar keys address alice)

echo -e "\nBalance Bob:"
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- balance \
    --account $(stellar keys address bob)
```

---

### Sistema de Allowances

```bash
# Alice aprueba a Bob para gastar 50 tokens
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --source alice \
    --network testnet \
    -- approve \
    --from $(stellar keys address alice) \
    --spender $(stellar keys address bob) \
    --amount 500000000

# Verificar allowance
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- allowance \
    --from $(stellar keys address alice) \
    --spender $(stellar keys address bob)

# Crear tercera cuenta (Charlie)
stellar keys generate charlie --network testnet
curl "https://friendbot.stellar.org?addr=$(stellar keys address charlie)"

# Bob transfiere 25 tokens de Alice a Charlie
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --source bob \
    --network testnet \
    -- transfer_from \
    --spender $(stellar keys address bob) \
    --from $(stellar keys address alice) \
    --to $(stellar keys address charlie) \
    --amount 250000000
```

---

### Burn de Tokens

```bash
# Bob quema 10 tokens
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --source bob \
    --network testnet \
    -- burn \
    --from $(stellar keys address bob) \
    --amount 100000000

# Verificar nuevo supply
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- total_supply
```

---

## 🔍 Monitoreo y Debugging

### Ver en Explorer

```bash
# Construir URL y abrir en navegador de Windows
echo "https://stellar.expert/explorer/testnet/contract/$TOKEN_CONTRACT_ID"

# O copiar y pegar manualmente en tu navegador
```

### Ver Eventos

```bash
# Ver eventos recientes
stellar events \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    --start-ledger 1000000 \
    --output json | jq '.'
```

💡 **Instalar jq para formatear JSON:**
```bash
sudo apt install jq
```

---

## 📜 Script de Deploy Completo

Crea un archivo `deploy.sh`:

```bash
#!/bin/bash
# deploy.sh - Script de deploy completo para Token BDB

set -e  # Salir si hay error

echo "🚀 Iniciando deploy de Token BDB..."

# Build
echo -e "\n📦 Building contract..."
stellar contract build

# Deploy
echo -e "\n🌐 Deploying to testnet..."
CONTRACT_ID=$(stellar contract deploy \
    --wasm target/wasm32-none/release/token_bdb.wasm \
    --source alice \
    --network testnet)

echo "✅ Contract deployed at: $CONTRACT_ID"

# Guardar CONTRACT_ID
mkdir -p .soroban
echo $CONTRACT_ID > .soroban/token_id
export TOKEN_CONTRACT_ID=$CONTRACT_ID

# Initialize
echo -e "\n🎯 Initializing token..."
stellar contract invoke \
    --id $CONTRACT_ID \
    --source alice \
    --network testnet \
    -- initialize \
    --admin $(stellar keys address alice) \
    --name "Buen Dia Token" \
    --symbol "BDB" \
    --decimals 7

# Mint initial supply (10,000,000 tokens)
echo -e "\n💰 Minting initial supply..."
stellar contract invoke \
    --id $CONTRACT_ID \
    --source alice \
    --network testnet \
    -- mint \
    --to $(stellar keys address alice) \
    --amount 100000000000000

# Verify
echo -e "\n🔍 Verifying deployment..."
NAME=$(stellar contract invoke --id $CONTRACT_ID --network testnet -- name)
SYMBOL=$(stellar contract invoke --id $CONTRACT_ID --network testnet -- symbol)
SUPPLY=$(stellar contract invoke --id $CONTRACT_ID --network testnet -- total_supply)

echo -e "\n✅ Token Details:"
echo "  Name: $NAME"
echo "  Symbol: $SYMBOL"
echo "  Total Supply: $SUPPLY stroops"
echo "  Contract ID: $CONTRACT_ID"

echo -e "\n🎉 Deployment complete!"
echo -e "\n🔗 View in explorer:"
echo "https://stellar.expert/explorer/testnet/contract/$CONTRACT_ID"
```

### Ejecutar el Script

```bash
# Dar permisos de ejecución
chmod +x deploy.sh

# Ejecutar
./deploy.sh
```

---

## 🛠️ Troubleshooting

### Error: "Contract already initialized"

**Solución:** Deploy un nuevo contrato
```bash
stellar contract deploy \
    --wasm target/wasm32v1-none
/release/token_bdb.wasm \
    --source alice \
    --network testnet
```

---

### Error: "command not found: stellar"

**Solución:** Asegúrate de cargar Rust en tu sesión
```bash
source $HOME/.cargo/env
stellar --version
```

---

### Variables de Entorno No Persisten

**Problema:** Al cerrar WSL, pierdes `$TOKEN_CONTRACT_ID`

**Solución:** Siempre lee del archivo
```bash
export TOKEN_CONTRACT_ID=$(cat .soroban/token_id)
echo "CONTRACT_ID cargado: $TOKEN_CONTRACT_ID"
```

---

## 💡 Tips Pro de WSL

### 1. Abrir WSL desde cualquier carpeta

En el Explorador de Windows:
1. Navega a tu carpeta del proyecto
2. Escribe `wsl` en la barra de direcciones
3. Presiona Enter
4. WSL se abre directamente en esa carpeta

### 2. Editar archivos con VS Code

```bash
# Abrir VS Code en la carpeta actual
code .

# VS Code detecta automáticamente que estás en WSL
```

### 3. Copiar archivos entre Windows y WSL

```bash
# Copiar de Windows a WSL
cp /mnt/c/Users/TuUsuario/Desktop/archivo.txt ./

# Copiar de WSL a Windows
cp archivo.txt /mnt/c/Users/TuUsuario/Desktop/
```

---

## 🎓 ¿Necesitas Ayuda con WSL?

### Recursos Oficiales
- [Documentación de WSL](https://learn.microsoft.com/en-us/windows/wsl/)
- [Tutorial de WSL](https://learn.microsoft.com/en-us/windows/wsl/install)
- [Troubleshooting WSL](https://learn.microsoft.com/en-us/windows/wsl/troubleshooting)

### Comandos Útiles
```bash
# Ver todas las distribuciones instaladas
wsl -l -v

# Reiniciar WSL
wsl --shutdown

# Actualizar WSL
wsl --update
```

---

## 🎉 ¡Felicidades!

Has deployado exitosamente tu token usando WSL, el entorno profesional para desarrollo blockchain en Windows.

### Próximos Pasos:

-  🖥️ **Clase 6:** Crear frontend con Scaffold Stellar


---

*"WSL: Donde Windows conoce Linux, y las desarrolladoras tienen lo mejor de ambos mundos 🦈"*
