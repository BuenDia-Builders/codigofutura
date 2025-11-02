# 🦈 README - Primera Deployment en Soroban Testnet para Clase de Refuerzo 18/10/2025

## 📋 Resumen del Proyecto

Este documento registra el proceso completo de creación, compilación y deployment de un smart contract en Soroban (Stellar blockchain) usando Rust y WebAssembly.

**Fecha:** 18 de Octubre, 2025  
**Proyecto:** Hello World Smart Contract  
**Red:** Stellar Testnet  
**Estudiante:** Código Futura - Clase de refuerzo para RUST

---

## 🎯 Objetivos Completados

- ✅ Crear un proyecto de smart contract con Stellar CLI
- ✅ Compilar código Rust a WebAssembly (WASM)
- ✅ Configurar identidad y wallet en testnet
- ✅ Deployar contrato en blockchain de Stellar
- ✅ Invocar funciones del contrato desplegado
- ✅ Verificar transacciones en el explorador

---

## 🛠️ Herramientas Utilizadas

- **Stellar CLI:** v23.0.1
- **Rust:** Con target `wasm32-unknown-unknown`
- **WSL:** Windows Subsystem for Linux (Ubuntu)
- **VS Code:** Editor de código

---

## 📂 Estructura del Proyecto

```
~/codigofutura/2da-semana-rust-consolidado/
└── 4-Clase/
    ├── proyectos-soroban/
    │   └── hello-tiburona/
    │       ├── contracts/
    │       │   └── hello-world/
    │       │       ├── src/
    │       │       │   ├── lib.rs      # Código del contrato
    │       │       │   └── test.rs     # Tests
    │       │       ├── Cargo.toml
    │       │       └── Makefile
    │       ├── target/
    │       │   └── wasm32v1-none/
    │       │       └── release/
    │       │           └── hello_world.wasm  # Contrato compilado
    │       ├── Cargo.toml
    │       └── README.md
    └── [materiales de clase]
```

---

## 🚀 Proceso Paso a Paso

### 1️⃣ Verificar Instalación de Stellar CLI

```bash
stellar --version
```

**Resultado:**
```
stellar 23.0.1 (44d65c93765ce078232921807f34437ea9fbbddb)
stellar-xdr 23.0.0-rc.2
```

---

### 2️⃣ Crear el Proyecto

```bash
cd ~/codigofutura/2da-semana-rust-consolidado/4-Clase/proyectos-soroban
stellar contract init hello-tiburona
cd hello-tiburona
```

**Archivos creados:**
- Workspace configuration (`Cargo.toml`)
- Contract template en `contracts/hello-world/`
- Código inicial en `src/lib.rs`

---

### 3️⃣ Explorar la Estructura

```bash
ls
# Resultado: Cargo.toml  contracts  README.md

ls contracts/hello-world/src/
# Resultado: lib.rs  test.rs
```

---

### 4️⃣ Abrir en VS Code

```bash
code .
```

**Navegación:**
- Panel izquierdo: Explorador de archivos
- Panel central: Editor
- Panel inferior: Terminal integrada (`Ctrl + ñ`)

---

### 5️⃣ Verificar que Compila

```bash
cargo check
```

**Resultado:**
```
Checking hello-world v0.0.0
Finished `dev` profile [unoptimized + debuginfo] target(s) in 1m 18s
```

✅ El código compila sin errores

---

### 6️⃣ Compilar a WebAssembly

```bash
stellar contract build
```

**Resultado:**
```
Compiling hello-world v0.0.0
Finished `release` profile [optimized] target(s) in 48.53s

ℹ️  Build Summary:
   Wasm File: target/wasm32v1-none/release/hello_world.wasm
   Wasm Hash: 25305b29290ce01e8ae0fedc770c13a9f42dad8a92e309fe467f1e744e718081
   Exported Functions: 2 found
     • _
     • hello
✅ Build Complete
```

---

### 7️⃣ Configurar Identidad (Wallet)

**Crear identidad:**
```bash
stellar keys generate alice --network testnet
```

**Nota:** Si ya existe, verás:
```
❌ error: An identity with the name 'alice' already exists
```
Esto está bien, significa que ya la tenías de sesiones anteriores.

**Fondear con XLM de testnet:**
```bash
stellar keys fund alice --network testnet
```

**Resultado:**
```
✅ alice funded successfully
```

---

### 8️⃣ Deployar en Testnet

```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/hello_world.wasm \
  --source alice \
  --network testnet
```

**Resultado:**
```
ℹ️  Skipping install because wasm already installed
ℹ️  Using wasm hash 25305b29290ce01e8ae0fedc770c13a9f42dad8a92e309fe467f1e744e718081
ℹ️  Simulating deploy transaction…
ℹ️  Transaction hash is bb4d3d53e338b8a97f4744f593b813a62d6b45b0903d787b4157f3fa67c6b6ed
🔗 https://stellar.expert/explorer/testnet/tx/bb4d3d53e338b8a97f4744f593b813a62d6b45b0903d787b4157f3fa67c6b6ed
ℹ️  Signing transaction: bb4d3d53e338b8a97f4744f593b813a62d6b45b0903d787b4157f3fa67c6b6ed
🌎 Submitting deploy transaction…
🔗 https://stellar.expert/explorer/testnet/contract/CBNCOWZAGQW7KDPDLD4KXXV4JS3FRMBZTIZWUBKCPY5H5HFBTMII5GWE
✅ Deployed!
CBNCOWZAGQW7KDPDLD4KXXV4JS3FRMBZTIZWUBKCPY5H5HFBTMII5GWE
```

---

### 9️⃣ Invocar el Contrato

```bash
stellar contract invoke \
  --id CBNCOWZAGQW7KDPDLD4KXXV4JS3FRMBZTIZWUBKCPY5H5HFBTMII5GWE \
  --source alice \
  --network testnet \
  -- \
  hello \
  --to Tiburona
```

**Resultado:**
```
ℹ️  Simulation identified as read-only. Send by rerunning with `--send=yes`.
["Hello","Tiburona"]
```

✅ **El contrato respondió correctamente desde testnet**

---

## 📊 Información del Contrato Deployado

| Propiedad | Valor |
|-----------|-------|
| **CONTRACT_ID** | `CBNCOWZAGQW7KDPDLD4KXXV4JS3FRMBZTIZWUBKCPY5H5HFBTMII5GWE` |
| **Wasm Hash** | `25305b29290ce01e8ae0fedc770c13a9f42dad8a92e309fe467f1e744e718081` |
| **Network** | Stellar Testnet |
| **Deployer** | alice |
| **Funciones** | `hello(to: Symbol) -> Vec<Symbol>` |

**Explorador:**
- Contrato: https://stellar.expert/explorer/testnet/contract/CBNCOWZAGQW7KDPDLD4KXXV4JS3FRMBZTIZWUBKCPY5H5HFBTMII5GWE
- Transacción: https://stellar.expert/explorer/testnet/tx/bb4d3d53e338b8a97f4744f593b813a62d6b45b0903d787b4157f3fa67c6b6ed

---

## 🧪 Pruebas Realizadas

### Test 1: Saludo básico
```bash
stellar contract invoke \
  --id CBNCOWZAGQW7KDPDLD4KXXV4JS3FRMBZTIZWUBKCPY5H5HFBTMII5GWE \
  --source alice \
  --network testnet \
  -- \
  hello \
  --to Tiburona
```
**Resultado:** `["Hello","Tiburona"]` ✅

---

## 💡 Conceptos Aprendidos

### 1. WebAssembly (WASM)
- Formato de código compilado que corre en blockchain
- Resultado de compilar Rust
- Eficiente y portable

### 2. Testnet vs Mainnet
- **Testnet:** Red de prueba con XLM gratuito
- **Mainnet:** Red de producción con XLM real
- Siempre probar en testnet primero

### 3. Contract ID
- Dirección única del contrato en blockchain
- Funciona como un "dominio" para invocar funciones
- Permanente e inmutable

### 4. Read-only Functions
- Funciones que solo leen datos (no modifican estado)
- Se pueden simular sin gastar gas
- Uso de `--send=yes` opcional

### 5. Transaction Hash
- Identificador único de cada operación en blockchain
- Permite rastrear y verificar transacciones
- Visible en exploradores de bloques

---

## 🔧 Comandos Útiles

### Desarrollo
```bash
# Verificar sintaxis
cargo check

# Compilar a WASM
stellar contract build

# Ejecutar tests
cargo test
```

### Deployment
```bash
# Deployar contrato
stellar contract deploy \
  --wasm path/to/contract.wasm \
  --source identity_name \
  --network testnet

# Invocar función (simulación)
stellar contract invoke \
  --id CONTRACT_ID \
  --source identity_name \
  --network testnet \
  -- \
  function_name \
  --param value

# Invocar función (transacción real)
stellar contract invoke \
  --id CONTRACT_ID \
  --source identity_name \
  --network testnet \
  --send=yes \
  -- \
  function_name \
  --param value
```

### Gestión de Identidades
```bash
# Crear identidad
stellar keys generate NAME --network testnet

# Fondear cuenta
stellar keys fund NAME --network testnet

# Ver dirección
stellar keys address NAME

# Listar identidades
stellar keys list
```

---

## ⚠️ Problemas Comunes y Soluciones

### Problema 1: Terminal muestra `>`
**Causa:** Comillas mal cerradas o comando incompleto  
**Solución:** Presionar `Ctrl + C`

### Problema 2: `command not found: stellar`
**Causa:** Stellar CLI no instalado o no en PATH  
**Solución:**
```bash
curl -L https://github.com/stellar/stellar-cli/releases/latest/download/stellar-cli-x86_64-unknown-linux-gnu.tar.gz | tar -xz -C ~/.local/bin
export PATH="$HOME/.local/bin:$PATH"
```

### Problema 3: Identity already exists
**Causa:** La identidad ya fue creada anteriormente  
**Solución:** No es error, continuar con el siguiente paso

### Problema 4: Compilation errors
**Causa:** Error en el código Rust  
**Solución:** Leer el mensaje de error, indica línea y problema exacto

---

## 📚 Recursos Adicionales

- **Documentación Oficial Stellar:** https://developers.stellar.org
- **Stellar Expert (Explorador):** https://stellar.expert
- **Soroban Examples:** https://github.com/stellar/soroban-examples
- **Rust Book:** https://doc.rust-lang.org/book/

---

## 🎯 Próximos Pasos

1. Realizar tarea de la clase 4 y entregarla por Chamverse


---

## 👥 Créditos

**Programa:** Código Futura - Buen Día Builders  

**Clase:** 4 - Rust Avanzado para Soroban  - Clase de refuerzo

**Fecha:** Octubre 2025

---

## 📝 Notas Finales

Este fue nuestro primer smart contract deployado en blockchain. Aunque es un "Hello World" simple, estableció las bases para:

- Entender el flujo completo de desarrollo
- Familiarizarse con las herramientas
- Ganar confianza con Rust y Soroban
- Ver código propio ejecutándose en blockchain

**El viaje de mil millas comienza con un solo paso. Este fue nuestro primer paso.** 🦈⚡

---

## 🔗 Enlaces Importantes

- **Este Proyecto:** `~/codigofutura/2da-semana-rust-consolidado/4-Clase/proyectos-soroban/hello-tiburona`
- **Contrato en Testnet:** https://stellar.expert/explorer/testnet/contract/CBNCOWZAGQW7KDPDLD4KXXV4JS3FRMBZTIZWUBKCPY5H5HFBTMII5GWE
- **Materiales de Clase:** `~/codigofutura/2da-semana-rust-consolidado/4-Clase/`

---

**Última actualización:** 18 de Octubre, 2025  
**Versión:** 1.0  
**Estado:** ✅ Contrato deployado y funcional en testnet