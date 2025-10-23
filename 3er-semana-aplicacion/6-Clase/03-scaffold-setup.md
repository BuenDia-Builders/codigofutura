# CLASE 6: TU TOKEN COBRA VIDA
## 03 - Scaffold Stellar Setup


## QUÉ ES SCAFFOLD STELLAR

Imagina que querés construir una casa. Podés:

**Opción A:** Comprar cada ladrillo, mezclar el cemento, cortar la madera... (3 meses)

**Opción B:** Llegar a un terreno con estructura pre-armada y solo personalizar (3 días)

**Scaffold Stellar es la Opción B para frontends blockchain.**

### Te da automáticamente:

- React + TypeScript ya configurado
- Conexión a Stellar ya funcionando
- Componentes de ejemplo para copiar/pegar
- Hot reload (cambiás código, se actualiza al instante)
- **Clientes TypeScript generados desde tus contratos** (¡MAGIA!)

### NO tenés que:

- Configurar webpack
- Instalar 40 librerías manualmente
- Pelear con CORS
- Debuggear conexiones RPC
- Escribir código boilerplate

---

## PASO 1: CREAR TU PROYECTO

### Salir de la carpeta del contrato

```bash
# Salí de la carpeta del contrato
cd ..

# Verificá dónde estás
pwd
```

### Crear el proyecto Scaffold

```bash
# Crear proyecto nuevo
stellar scaffold init mi-token-bdb
```

**¿Qué hace este comando?**
1. Crea una carpeta nueva `mi-token-bdb/`
2. Instala React + Vite + TypeScript
3. Configura la estructura de carpetas
4. Descarga dependencias base
5. Crea archivos de ejemplo


**Mientras esperás, vas a ver:**
```
Creating new Scaffold Stellar project...
Installing dependencies...
Setting up development environment...
```

### Entrar a la carpeta

```bash
cd mi-token-bdb
```

---

## PASO 2: INTEGRAR TU CONTRATO BDB

Ahora vas a traer tu contrato al proyecto scaffold.

### Opción A - Copiar desde otra carpeta:

```bash
# Desde mi-token-bdb/
cp -r ../tu-contrato-bdb ./contracts/buen_dia_token
```

**Reemplazá:**
- `../tu-contrato-bdb` = ruta a tu carpeta del contrato
- `buen_dia_token` = nombre que querés darle (sin espacios)

### Opción B - Si está en Git:

```bash
cd contracts
git clone [URL-de-tu-repo-BDB] buen_dia_token
cd ..
```

### Estructura esperada:

```
mi-token-bdb/
├── contracts/
│   └── buen_dia_token/    ← Tu contrato aquí
│       ├── src/
│       │   └── lib.rs     ← Tu código Rust
│       └── Cargo.toml     ← Configuración del contrato
├── src/
│   ├── App.tsx            ← Código del frontend
│   └── main.tsx
├── package.json
├── .env.example
└── environments.toml
```

### Verificar que funcionó:

```bash
ls contracts/buen_dia_token/src/lib.rs
```

**Deberías ver:**
```
contracts/buen_dia_token/src/lib.rs
```

Si ves ese archivo, significa que tu contrato está correctamente integrado.

---

## PASO 3: CONFIGURAR EL ENTORNO

### Copiar archivo de ejemplo

```bash
# Crear tu archivo .env desde el ejemplo
cp .env.example .env
```

### Editar el archivo .env

```bash
# Abrir con tu editor favorito
nano .env

# O con vim
vim .env

# O con VS Code
code .env
```

### Configuración completa:

```bash
# ===================================
# CONFIGURACIÓN DE RED
# ===================================

# Red de Stellar (testnet para práctica, mainnet para producción)
VITE_STELLAR_NETWORK=testnet

# URL del servidor RPC de Stellar
# Testnet: https://soroban-testnet.stellar.org
# Mainnet: https://soroban-mainnet.stellar.org
VITE_STELLAR_RPC_URL=https://soroban-testnet.stellar.org

# ===================================
# TU CONTRATO BDB
# ===================================

# Contract ID que obtuviste en el deploy (empieza con C)
# IMPORTANTE: Reemplazá con TU Contract ID real
VITE_BDB_CONTRACT_ID=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**CRÍTICO:** Reemplazá `CXXXXXXXXX...` con TU Contract ID real (el que guardaste en la Parte 2).

**¿Dónde está mi Contract ID?**
- En tu `.env.local` de la Parte 2
- En tu post-it
- En tu cuaderno
- En el output del comando `deploy`

### Guardar y cerrar

**Si usaste nano:**
- Presioná `Ctrl + X`
- Luego `Y` (yes)
- Luego `Enter`

**Si usaste vim:**
- Presioná `Esc`
- Escribí `:wq`
- Presioná `Enter`

---

## PASO 4: INSTALAR DEPENDENCIAS

### Dependencias base

```bash
npm install
```

**¿Qué hace esto?**
- Lee `package.json`
- Descarga todas las librerías necesarias
- Las instala en `node_modules/`
- Prepara tu proyecto para correr

**Tiempo:** 30-60 segundos

**Si ves warnings (amarillo):** No te preocupes, son normales.

**Si ves errors (rojo):** Levantá la mano o revisá Troubleshooting.

---

### Dependencias adicionales (IMPORTANTE)

Scaffold Stellar no siempre incluye TODAS las dependencias que necesitamos. Instalá estas manualmente:

```bash
npm install @stellar/freighter-api @stellar/stellar-sdk
```

**¿Qué son?**

**@stellar/freighter-api:**
- Para conectar con la wallet Freighter
- Permite firmar transacciones
- Obtiene la public key del usuario

**@stellar/stellar-sdk:**
- SDK oficial de Stellar
- Para interactuar con la blockchain
- Enviar transacciones, leer datos, etc.

### Verificar instalación:

```bash
npm list @stellar/freighter-api @stellar/stellar-sdk
```

**Deberías ver:**
```
mi-token-bdb@1.0.0
├── @stellar/freighter-api@X.X.X
└── @stellar/stellar-sdk@X.X.X
```

Si ambas librerías aparecen sin errores, estás lista.

---

## PASO 5: GENERAR EL CLIENTE TYPESCRIPT (MAGIA)

Esto es lo más épico del Scaffold. Va a leer tu contrato Rust y crear automáticamente código TypeScript para interactuar con él.

```bash
npm run build:contracts
```

**¿Qué está pasando? (desglose técnico)**

1. **Lee tu contrato:**
   - Abre `contracts/buen_dia_token/src/lib.rs`
   - Analiza todas las funciones públicas

2. **Encuentra funciones:**
   - `balance` - Ver balance de una cuenta
   - `transfer` - Transferir tokens
   - `mint` - Crear nuevos tokens
   - Cualquier otra función que hayas definido

3. **Genera código TypeScript:**
   - Crea una clase `BuenDiaTokenClient`
   - Cada función Rust se convierte en un método TypeScript
   - Con tipos seguros (TypeScript sabe qué parámetros esperar)

4. **Guarda el cliente:**
   - En `packages/buen_dia_token/`
   - Listo para importar en tu frontend

**Resultado esperado:**
```
✓ Built contract: buen_dia_token
✓ Generated TypeScript client
```

### Verificar que funcionó:

```bash
ls packages/buen_dia_token/
```

**Deberías ver:**
```
index.ts
package.json
README.md
```

**Ejemplo de lo que se generó:**

```typescript
// Este código fue GENERADO AUTOMÁTICAMENTE
// Vos NO tuviste que escribirlo

export class BuenDiaTokenClient {
  // Función para ver balance
  async balance(args: { id: string }): Promise<bigint> {
    // Código que se conecta a tu contrato
  }

  // Función para transferir
  async transfer(args: {
    from: string;
    to: string;
    amount: bigint;
  }): Promise<void> {
    // Código que se conecta a tu contrato
  }

  // ... más funciones
}
```

**Esto es MAGIA porque:**
- No escribiste este código
- Está perfectamente tipado
- Se actualizará si cambiás tu contrato Rust
- Te ahorra horas de trabajo manual

---

## PASO 6: ARRANCAR EL SERVIDOR

Momento de la verdad. Levantemos el frontend:

```bash
npm run dev
```

**Deberías ver:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Abrir en el navegador:

1. Abrí tu navegador (Chrome o Firefox)
2. Andá a: **http://localhost:5173/**
3. Deberías ver una página web

**¿Qué deberías ver?**
- Una página web (puede ser básica o tener ejemplos del scaffold)
- Tal vez un logo de Stellar
- Tal vez ejemplos de contratos

**Lo importante:** Que NO haya pantalla en blanco ni errores.

---

### CHECKLIST DE VERIFICACIÓN

Antes de continuar:

- [ ] El servidor arrancó sin errores
- [ ] Veo una página web en el navegador
- [ ] No hay mensajes de error rojos en la consola del navegador (F12)

**Para abrir la consola del navegador:**
- Presioná `F12`
- O click derecho → Inspeccionar
- Andá a la pestaña "Console"

**Pausa para Troubleshooting (1-2 min):** Si tu servidor no arrancó o ves errores, revisá la sección de Troubleshooting o levantá la mano.

---

## CELEBRÁ ESTO

**Acabás de levantar tu primer frontend conectado a blockchain.**

La página que estás viendo puede hablar directamente con Stellar. Puede leer tu contrato. Puede invocar funciones.

Esto no es un mockup. Es una aplicación real.

---

## TROUBLESHOOTING: PARTE 2

### Error: "Cannot find module 'buen_dia_token'"

**Síntomas:**
```
Error: Cannot find module '../packages/buen_dia_token'
```

**Solución:**

1. Verificá que corriste `npm run build:contracts`
2. Verificá que la carpeta existe:
   ```bash
   ls packages/buen_dia_token/
   ```
3. Si no existe, verificá que el contrato está en `contracts/`:
   ```bash
   ls contracts/buen_dia_token/src/lib.rs
   ```
4. Intentá borrar y regenerar:
   ```bash
   rm -rf packages/
   npm run build:contracts
   ```

---

### Error: "Network error" o "RPC error" en el navegador

**Síntomas:**
- Página carga pero hay errores en consola
- Mensajes sobre "Failed to fetch" o "Network error"

**Solución:**

1. Abrí la consola del navegador (F12)
2. Verificá tu `.env` tiene la URL correcta:
   ```bash
   cat .env | grep VITE_STELLAR_RPC_URL
   ```
   Debería mostrar: `https://soroban-testnet.stellar.org`

3. Verificá que tu Contract ID es correcto:
   ```bash
   cat .env | grep VITE_BDB_CONTRACT_ID
   ```

4. Reiniciá el servidor:
   ```bash
   # Ctrl+C para parar
   npm run dev
   ```

---

### La página está en blanco

**Síntomas:**
- El servidor arranca
- Pero el navegador muestra página en blanco

**Solución:**

1. Abrí la consola del navegador (F12)
2. Leé el error específico (usualmente está en rojo)
3. Problemas comunes:
   - Falta una variable en `.env`
   - Variable sin prefijo `VITE_`
   - Sintaxis incorrecta en `.env`

4. Verificá todas las variables:
   ```bash
   cat .env
   ```

   Todas deben empezar con `VITE_`:
   ```bash
   VITE_STELLAR_NETWORK=testnet           ← Correcto
   STELLAR_NETWORK=testnet                ← Incorrecto (falta VITE_)
   ```

---

### Error: "npm install" falla

**Síntomas:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solución:**

1. Verificá tu versión de Node:
   ```bash
   node --version
   ```
   Debe ser v22.0.0 o superior.

2. Si es menor, actualizá:
   ```bash
   nvm install 22
   nvm use 22
   ```

3. Borrá archivos y reiniciá:
   ```bash
   rm -rf node_modules/
   rm package-lock.json
   npm install
   ```

---

### Error: "Port 5173 is already in use"

**Síntomas:**
```
Error: Port 5173 is already in use
```

**Solución:**

**Opción A - Usar otro puerto:**
```bash
npm run dev -- --port 5174
```

**Opción B - Matar el proceso que usa el puerto:**
```bash
# macOS/Linux
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID [número] /F
```

---

### Error: "build:contracts" no genera nada

**Síntomas:**
- Comando corre sin errores
- Pero no aparece carpeta `packages/`

**Solución:**

1. Verificá que tu contrato tiene funciones públicas en `lib.rs`:
   ```rust
   #[contractimpl]
   impl Token {
       pub fn balance(env: Env, id: Address) -> i128 {
           // ...
       }
   }
   ```

2. Verificá que el `Cargo.toml` tiene configuración correcta:
   ```toml
   [lib]
   crate-type = ["cdylib"]
   ```

3. Intentá compilar el contrato manualmente:
   ```bash
   cd contracts/buen_dia_token
   stellar contract build
   cd ../..
   npm run build:contracts
   ```

---

### NOTA PARA USUARIOS DE WINDOWS/WSL

Si estás en Windows, usá WSL (Windows Subsystem for Linux) para correr todos los comandos.

**Verificá que Node.js está instalado EN WSL (no en Windows):**

```bash
# En WSL
which node
# Debería mostrar: /usr/bin/node o similar

# NO debería mostrar: /mnt/c/... (eso sería Node de Windows)
```

**Si Node está en Windows en lugar de WSL:**

```bash
# Desinstalar Node de Windows
# Instalar en WSL:
sudo apt update
sudo apt install nodejs npm

# Verificar
node --version
npm --version
```

---

## COMANDOS ÚTILES PARA ESTA PARTE

```bash
# Crear proyecto
stellar scaffold init mi-token-bdb
cd mi-token-bdb

# Copiar contrato
cp -r ../tu-contrato ./contracts/buen_dia_token

# Configurar
cp .env.example .env
nano .env

# Instalar dependencias
npm install
npm install @stellar/freighter-api @stellar/stellar-sdk

# Generar cliente TypeScript
npm run build:contracts

# Arrancar servidor
npm run dev

# Ver en navegador
open http://localhost:5173/
```

---

## ESTRUCTURA DE CARPETAS EXPLICADA

```
mi-token-bdb/
│
├── contracts/               # Tus contratos Rust
│   └── buen_dia_token/
│       ├── src/
│       │   └── lib.rs       # Tu código del token
│       └── Cargo.toml
│
├── packages/                # Clientes generados (NO editar)
│   └── buen_dia_token/
│       └── index.ts         # Cliente TypeScript auto-generado
│
├── src/                     # Tu código frontend
│   ├── App.tsx              # Componente principal (ACA VAS A TRABAJAR)
│   ├── main.tsx             # Entry point
│   └── components/          # Componentes reutilizables
│
├── .env                     # Variables de entorno (NO subir a Git)
├── .env.example             # Ejemplo de variables
├── package.json             # Dependencias
└── vite.config.ts           # Configuración de Vite
```

**Dónde vas a trabajar:**
- `src/App.tsx` - Tu código principal
- `src/components/` - Componentes que crees
- `.env` - Configuración local

**NO tocar:**
- `packages/` - Se regenera automáticamente
- `node_modules/` - Dependencias instaladas
- `dist/` - Build de producción

---

## PRÓXIMO PASO

Si tu servidor está corriendo y ves la página en el navegador sin errores, estás lista para la **Parte 3: Freighter Wallet**.

Ahí vas a:
- Conectar tu wallet al frontend
- Prepararte para firmar transacciones
- Ver tu identidad blockchain en la UI

**Guardá este archivo como referencia.** Lo vas a necesitar cada vez que crees un frontend nuevo.

**Vamos a construir**

---

**Siguiente:** `04-wallet-integracion.md` - Freighter Wallet + Primera Interacción