# CLASE 6: TU TOKEN COBRA VIDA
## 02 - Deploy a Testnet

---

## POR QUÉ ESTO IMPORTA

Hasta ahora tu token BDB vivía en "localhost" - tu computadora personal. Eso está perfecto para aprender, pero tiene un problema:

**Solo VOS podés verlo.**

Stellar Testnet es diferente:
- Es una blockchain REAL (misma tecnología que Mainnet)
- Cualquier persona en el mundo puede ver tus transacciones
- Podés compartir el link de tu contrato
- Es gratis (usa XLM de prueba, no dinero real)

> **Piensa en esto como:** Localhost = documento en tu Google Drive privado. Testnet = documento publicado que cualquiera con el link puede ver.

---

## RECORDATORIO: COMPILAR Y OPTIMIZAR TU CONTRATO

Antes de deployar, necesitás preparar tu contrato correctamente.

### PASO 1: Navegar a tu proyecto

```bash
# Andá a la carpeta de tu contrato BDB
cd /ruta/a/tu/contrato-bdb

# Ejemplo:
# cd ~/proyectos/buen-dia-token
```

---

### PASO 2: Compilar con el target correcto

**IMPORTANTE:** Soroban usa un target especial llamado `wasm32v1-none`. Si usás el target antiguo (`wasm32-unknown-unknown`), tu contrato NO funcionará.

```bash
# El comando correcto y más simple
stellar contract build
```

**¿Qué hace este comando?**
- Busca tu archivo `Cargo.toml`
- Compila el código Rust
- Usa automáticamente el target correcto (`wasm32v1-none`)
- Genera el archivo WASM optimizado
- Lo guarda en `target/wasm32v1-none/release/`

**Comando alternativo (manual):**
```bash
cargo build --target wasm32v1-none --release
```

**Qué está pasando:**
- Rust compila tu código
- Lo convierte a WASM (WebAssembly)
- Lo guarda en `target/wasm32v1-none/release/`

**Tiempo estimado:** 30-60 segundos

---

### PASO 3: Verificar el archivo WASM

```bash
# Listar los archivos compilados
ls target/wasm32v1-none/release/
```

**Deberías ver algo como:**
```
buen_dia_token.wasm
```

**IMPORTANTE:** El nombre exacto depende del `name` en tu `Cargo.toml`. Anotá el nombre EXACTO porque lo vas a necesitar.

**¿Cómo saber cuál es tu archivo?**
```bash
# Ver el nombre en Cargo.toml
cat Cargo.toml | grep "name ="
```

Resultado ejemplo:
```toml
name = "buen_dia_token"  ← Este es tu nombre
```

Tu archivo WASM será: `buen_dia_token.wasm`

---

### PASO 4: Optimizar el WASM (Recomendado pero opcional)

Los contratos Soroban tienen límites de tamaño. Optimizar reduce el tamaño y ahorra fees.

#### Instalar wasm-opt (si no lo tenés):

**macOS:**
```bash
brew install binaryen
```

**Ubuntu/Debian:**
```bash
sudo apt-get install binaryen
```

**Verificar instalación:**
```bash
wasm-opt --version
```

#### Optimizar tu WASM:

```bash
wasm-opt -Oz -o optimized.wasm target/wasm32v1-none/release/buen_dia_token.wasm
```

**IMPORTANTE:** Reemplazá `buen_dia_token.wasm` con el nombre real de tu archivo.

**¿Qué hace `-Oz`?**
- `-Oz` = Optimizar para tamaño mínimo
- Puede reducir el archivo 30-50%
- Mantiene toda la funcionalidad
- Es como comprimir un archivo ZIP, pero para WASM

**Resultado:**
- Nuevo archivo: `optimized.wasm`
- Más pequeño = menos costo de storage en blockchain
- Mismo comportamiento que el original

---

### CHECKLIST DE COMPILACIÓN

Antes de continuar, verificá:

- [ ] `stellar contract build` corrió sin errores
- [ ] Archivo WASM existe en `target/wasm32v1-none/release/`
- [ ] Sabés el nombre exacto de tu archivo WASM
- [ ] (Opcional) WASM optimizado creado exitosamente

**Pausa para Troubleshooting:** Si tu compilación falló, revisá la sección de Troubleshooting al final de este archivo o hablanos en Telegram.

---

## DEPLOY A TESTNET

Ahora sí, vamos a poner tu contrato en la blockchain.

### PASO 1: Verificar tu cuenta Testnet

```bash
# Ver tu public key de testnet
stellar keys address testnet
```

**Resultado esperado:**
```
GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Una dirección que empieza con `G` y tiene 56 caracteres.

#### Si NO tenés cuenta testnet configurada:

```bash
stellar keys generate testnet --network testnet --fund
```

**¿Qué hace este comando?**
1. Genera una keypair nueva (public + secret key)
2. Le pide XLM gratis a Friendbot (para pagar fees)
3. La guarda como "testnet" en tu configuración del CLI
4. Ahora podés usar esta cuenta para deployar

---

### PASO 2: Deploy tu contrato

**Opción A - Usar el archivo optimizado (si lo tenés):**

```bash
stellar contract deploy \
  --wasm optimized.wasm \
  --source testnet \
  --network testnet
```

**Opción B - Usar el archivo sin optimizar:**

```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/buen_dia_token.wasm \
  --source testnet \
  --network testnet
```

**IMPORTANTE:** Reemplazá `buen_dia_token.wasm` con el nombre exacto de tu archivo.

**Desglose del comando:**
```bash
stellar contract deploy \        # Comando de deploy
  --wasm optimized.wasm \        # Archivo WASM a deployar
  --source testnet \             # Cuenta que paga el deploy (tu cuenta "testnet")
  --network testnet              # Red destino (testnet, no mainnet)
```

**Qué está pasando:**
1. El CLI sube tu WASM a Stellar Testnet
2. Crea una instancia del contrato en la blockchain
3. Te devuelve un Contract ID único
4. Cobra fees de tu cuenta testnet (muy baratos, ~0.00001 XLM)

**Tiempo estimado:** 10-20 segundos

**Resultado esperado:**
```
Contract deployed successfully with ID: CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

### PASO 3: Guardar tu Contract ID como si fuera oro

Ese Contract ID es CRÍTICO. Lo vas a necesitar constantemente.

**¿Por qué es tan importante?**
- Es la "dirección" de tu contrato en la blockchain
- Lo necesitás para invocar funciones
- Lo necesitás para conectar el frontend
- Es único y permanente
- Si lo perdés, perdés la referencia a tu contrato

**Guardalo en múltiples lugares:**

```bash
# 1. Crear archivo de configuración local
echo "CONTRACT_ID=CXXXXX..." > .env.local

# 2. Copiarlo al portapapeles (macOS)
echo "CXXXXX..." | pbcopy

# 3. Copiarlo al portapapeles (Linux)
echo "CXXXXX..." | xclip -selection clipboard
```

**También anotalo físicamente:**
- Post-it en tu monitor
- Cuaderno
- Archivo de texto en tu escritorio
- Donde sea, pero NO LO PIERDAS

---

### PASO 4: Verificar que funciona

Probemos que el contrato está bien deployado:

```bash
stellar contract invoke \
  --id CXXXXX... \
  --source testnet \
  --network testnet \
  -- \
  --help
```

**IMPORTANTE:** Reemplazá `CXXXXX...` con TU Contract ID real.

**Deberías ver:**
```
Usage: stellar contract invoke --id <CONTRACT_ID> -- <FUNCTION> [OPTIONS]

Available functions:
  balance    Get the balance of an account
  transfer   Transfer tokens between accounts
  mint       Mint new tokens (if authorized)
  ...
```

Si ves la lista de funciones, significa que tu contrato está **perfectamente deployado**.

---

### CHECKLIST DE DEPLOY

Antes de continuar, verificá:

- [ ] Comando corrió sin errores
- [ ] Tengo mi Contract ID (empieza con `C...`)
- [ ] Lo guardé en `.env.local`
- [ ] Lo anoté físicamente también
- [ ] Verifiqué que funciona con `--help`


---

## CELEBRÁ ESTO

**Tu token BDB ahora existe en una blockchain real.**

Ya no está solo en tu computadora. Está en internet. Permanentemente.

Cualquier persona en el mundo puede:
- Ver tu contrato en Stellar Expert
- Invocar sus funciones (si tiene permisos)
- Verificar transacciones
- Auditar el código

**Sos oficialmente una Blockchain Builder.**

---

## TROUBLESHOOTING: PARTE 1

### Error: "WASM file not found"

**Síntomas:**
```
Error: No such file or directory
```

**Solución:**
1. Verificá que corriste `stellar contract build`
2. Verificá la ruta con `ls target/wasm32v1-none/release/`
3. Copiá el nombre EXACTO del archivo (respetá mayúsculas/minúsculas)
4. Asegurate de estar en la carpeta correcta del proyecto

---

### Error: "Invalid WASM file"

**Síntomas:**
```
Error: Invalid WASM module
```

**Solución:**
1. Asegurate de usar `wasm32v1-none` (no `wasm32-unknown-unknown`)
2. Verificá con: `rustup show` que el target está instalado
3. Si usaste el target antiguo:
   ```bash
   rm -rf target/
   stellar contract build
   ```

---

### Error: "Stellar CLI command not found"

**Síntomas:**
```
command not found: stellar
```

**Solución:**
```bash
# Instalar el CLI
cargo install stellar-cli --locked --features opt

# Verificar instalación
stellar --version
```

---

### Error: "Account not funded"

**Síntomas:**
```
Error: Account does not exist or has insufficient balance
```

**Solución:**
```bash
# Pedir XLM testnet gratis
stellar keys fund testnet

# Verificar balance
stellar keys address testnet
```

Después andá a https://stellar.expert/explorer/testnet y buscá tu dirección para ver el balance.

---

### Error: "Network error" al deployar

**Síntomas:**
```
Error: Connection timeout
Error: Network unreachable
```

**Solución:**
1. Verificá tu conexión a internet
2. Verificá que usaste `--network testnet` (no mainnet)
3. A veces Stellar Testnet está lento - esperá 30 segundos e intentá de nuevo
4. Si persiste, probá:
   ```bash
   stellar network status testnet
   ```

---

### Error: "Contract too large"

**Síntomas:**
```
Error: Contract size exceeds limit
```

**Solución:**
1. NECESITÁS optimizar tu WASM:
   ```bash
   wasm-opt -Oz -o optimized.wasm target/wasm32v1-none/release/tu_archivo.wasm
   ```
2. Deployá el archivo optimizado
3. Si sigue siendo muy grande, revisá tu código para reducir dependencias

---

### Tu contrato deployó pero no ves funciones con --help

**Síntomas:**
- Deploy exitoso
- Pero `--help` no muestra funciones

**Solución:**
1. Esperá 10-20 segundos (a veces tarda en propagarse)
2. Verificá que tu contrato tiene funciones públicas en `lib.rs`
3. Intentá invocar una función directamente:
   ```bash
   stellar contract invoke \
     --id TU_CONTRACT_ID \
     --source testnet \
     --network testnet \
     -- balance \
     --id TU_PUBLIC_KEY
   ```

---

## COMANDOS ÚTILES PARA ESTA PARTE

```bash
# Compilar
stellar contract build

# Ver archivo WASM
ls target/wasm32v1-none/release/

# Optimizar (opcional)
wasm-opt -Oz -o optimized.wasm target/wasm32v1-none/release/tu_archivo.wasm

# Ver tu public key
stellar keys address testnet

# Pedir fondos testnet
stellar keys fund testnet

# Deploy
stellar contract deploy \
  --wasm optimized.wasm \
  --source testnet \
  --network testnet

# Verificar funciones
stellar contract invoke \
  --id CONTRACT_ID \
  --source testnet \
  --network testnet \
  -- \
  --help
```

---

## NOTA IMPORTANTE PARA WINDOWS/WSL

Si estás en Windows, usá WSL (Windows Subsystem for Linux) para correr todos los comandos.

**Verificá que Node.js está instalado EN WSL:**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Verificá que Rust está instalado EN WSL:**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

---

## PRÓXIMO PASO

Si tu contrato está deployado exitosamente y tenés el Contract ID guardado, estás lista para la **Parte 2: Scaffold Stellar**.

Ahí vas a:
- Crear el frontend para tu token
- Conectarlo a tu contrato deployado
- Ver tu token en una UI real

**Guardá este archivo como referencia.** Lo vas a necesitar si tenés que deployar otros contratos en el futuro.

**Vamos a construir**

---

**Siguiente:** `03-scaffold-setup.md` - Setup del Frontend