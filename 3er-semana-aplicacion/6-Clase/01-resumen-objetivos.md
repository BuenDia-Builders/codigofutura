# CLASE 6: TU TOKEN COBRA VIDA
## 01 - Resumen y Objetivos

**Duración:** 60 minutos a full + clase de refuerzo del sábado  
**Fecha:** Jueves 23 octubre | 18:30 - 20:00  
**Modalidad:** Hands-on + Tarea para casa

---

## GLOSARIO RÁPIDO (léelo antes de empezar)

Estos términos van a aparecer TODO EL TIEMPO hoy:

**WASM:** Es tu código Rust compilado en un formato que la blockchain puede ejecutar. Piensa en ello como traducir tu código de español a un idioma universal que Stellar entiende.

**Contract ID:** El identificador único de tu contrato en la blockchain. Como tu número de DNI, pero para tu contrato. Empieza con "C".

**Network Passphrase:** Define si estás trabajando en Testnet (práctica) o Mainnet (dinero real). Es como elegir "Modo Sandbox" vs "Modo Producción".

**Testnet:** Blockchain de práctica. XLM gratis, transacciones reales pero sin valor monetario.

**Public Key:** Tu dirección pública (empieza con G). Como tu email.

**Secret Key:** Tu contraseña privada (empieza con S). NUNCA la compartas.

---

## APERTURA MOTIVACIONAL

Hoy es un día especial, Tiburonas.

En la Clase 5 construiste tu propio token BDB. Pero ese token vivía solo en tu terminal, en líneas de código que solo vos podías ver.

**Hoy eso cambia.**

En los próximos minutos vas a:
- Darle VIDA a tu token con una interfaz real
- Ver tu BDB en una pantalla que cualquier persona puede usar
- Conectar tu wallet y firmar transacciones como una builder profesional
- Deployar tu contrato a testnet REAL (no más localhost)

¿Nerviosa? Es normal. Estás a punto de cruzar del "código invisible" al "producto visible".

¿Emocionada? Deberías estarlo. Porque hoy tu token BDB sale del backend y entra al mundo real.

**Vamos a construir, Tiburonas!**

---

## QUÉ VAS A LOGRAR HOY

Al final de esta clase vas a tener:

- [ ] Tu token BDB corriendo en Stellar Testnet (blockchain REAL)
- [ ] Un frontend profesional conectado a tu contrato
- [ ] Tu Freighter Wallet integrada y firmando transacciones
- [ ] Una aplicación web funcional que puedes compartir

**Esto no es poca cosa.** La mayoría de los cursos de blockchain terminan en teoría. Vos vas a tener un producto funcionando.

---

## DIAGNÓSTICO PRE-SUMERGIDA

Antes de sumergirte, vamos a verificar que tienes todo listo. Abre tu terminal y corré estos comandos:

```bash
# Node.js (necesitas v22.0.0 o superior)
node --version

# Stellar CLI
stellar --version

# Plugin Scaffold
stellar scaffold --version

# Rust y target correcto
rustup show
```

### Resultados esperados:

```bash
node --version
# v22.0.0 o superior (cualquier versión de la serie v22.x funciona)

stellar --version
# stellar 22.x.x o superior

stellar scaffold --version (aca te va a tirar error pero tranqui)
# 0.x.x (cualquier versión)

rustup show
# Debe mostrar wasm32v1-none en los targets instalados
```

---

## SI ALGO FALTA - INSTALAR AHORA

### Node.js desactualizado:

```bash
# Actualizar Node
nvm install 22
nvm use 22
```

### Stellar CLI falta o desactualizado:

```bash
cargo install stellar-cli --locked --features opt
```

### Plugin Scaffold faltante:

```bash
stellar install scaffold
```

**Documentación:** https://github.com/theahaco/scaffold-stellar-frontend

### Target WASM falta (CRÍTICO):

```bash
rustup target add wasm32v1-none
```

**Por qué es crítico:** Soroban usa este target específico. Si usas el antiguo `wasm32-unknown-unknown`, tu contrato NO funcionará.

---

## CHECKLIST DE DIAGNÓSTICO

Antes de continuar, asegurate de tener:

- [ ] Node.js v22.0.0+
- [ ] Stellar CLI instalado
- [ ] Scaffold plugin instalado
- [ ] Target wasm32v1-none instalado

**Si todo está en verde, continuá. Si algo falla, levantá la mano AHORA.**

---

## ESTRUCTURA DE HOY

La clase está dividida en 4 partes principales:

**PARTE 1: Deploy a Testnet**
- Compilar tu contrato correctamente
- Optimizar el WASM
- Deployar a blockchain real
- Guardar tu Contract ID

**PARTE 2: Scaffold Stellar**
- Inicializar proyecto frontend
- Integrar tu contrato BDB
- Generar clientes TypeScript automáticamente
- Levantar el servidor

**PARTE 3: Freighter Wallet**
- Conectar tu wallet al frontend
- Preparar para firmar transacciones
- Verificar fondos testnet

**PARTE 4: Primera Interacción**
- Ver balance desde la UI
- Entender el flujo completo
- Mintear tokens para testing

---

## FILOSOFÍA DE HOY

**Aprender haciendo:** Menos teoría, más código funcionando.

**Debugging es normal:** Los errores son parte del proceso. Por eso incluimos troubleshooting en cada sección.

**Comunidad primero:** Si te trabás, pedí ayuda. Si ya resolviste algo, ayudá a otras.

**Producto sobre perfección:** Hoy el objetivo es que TODO funcione. La belleza viene después (en la tarea).

---

## VISUALIZACIÓN DEL FLUJO COMPLETO

Antes de empezar, entendé cómo todas las piezas encajan:

```
[Tu Código Rust]
       ↓
   (compilar)
       ↓
[Archivo WASM optimizado]
       ↓
   (stellar contract deploy)
       ↓
[Contrato en Stellar Testnet] ← [Contract ID]
       ↑                              ↑
       |                              |
[Frontend React/TypeScript] ←─────────┘
       ↑                    
       |                    
[Freighter Wallet] ← [Firma transacciones]
       ↑
       |
    [VOS] ← [Aprobás cada acción]
```

**En palabras simples:**
1. Escribiste el contrato en Rust
2. Lo compilás a WASM (lenguaje universal)
3. Lo deployás a Stellar Testnet (ahora existe en blockchain)
4. Creás un frontend que se conecta usando el Contract ID
5. Tu wallet (Freighter) firma cada transacción que querés hacer
6. VOS tenés control total (nada pasa sin tu aprobación)

**Esto es arquitectura blockchain real.** No teoría, no tutorial básico. Esto es lo que usan apps como Uniswap, Aave, o cualquier DeFi profesional.

---

## OPCIONAL: DIBUJÁ TU PROPIO FLUJO

Si sos visual y querés entender mejor la arquitectura, usá una herramienta como Excalidraw (https://excalidraw.com/) para dibujar el flujo de tu dApp.

**Algunos elementos que podés incluir:**
- Tu computadora (donde escribís Rust)
- El proceso de compilación (Rust → WASM)
- Stellar Testnet (la blockchain)
- Tu frontend (React o en si el Scalfold)
- Freighter Wallet
- Las flechas mostrando cómo se comunican

Compartir tu diagrama en el grupo es opcional pero ayuda a solidificar el conocimiento.

---

## RECORDATORIO DE SEGURIDAD

A lo largo de la clase vas a manejar información sensible:

**NUNCA compartas:**
- Tu Secret Key (empieza con S)
- Contraseñas de Freighter
- Seeds/mnemonics

**SÍ podés compartir:**
- Tu Public Key (empieza con G)
- Contract ID (empieza con C)
- Links a Stellar Expert
- Screenshots de tu UI (sin mostrar secret keys)

**Regla de oro:** Si empieza con S, es SECRETO. No lo compartás NUNCA.

---

## MENTALIDAD TIBURONA PARA HOY

Como las tiburonas reales:
- **Persistente:** Si algo falla, debuggeás y lo intentás de nuevo
- **Adaptable:** Cada error es una oportunidad de aprender
- **Colaborativa:** Ayudás a otras Tiburonas cuando pueden
- **Valiente:** No tenés miedo de hacer deploy a una blockchain real

Hoy no estás "jugando" con código. Estás construyendo algo REAL que va a vivir en una blockchain pública.

**Eso no es poca cosa.**

---

## LISTOS PARA EMPEZAR

Si completaste el diagnóstico y todo está en verde, estás lista para la Parte 1: Deploy a Testnet.

**Recordá:**
- No hay preguntas tontas
- Debugging juntas es más rápido
- Cada Tiburona profesional empezó donde estás vos ahora

**Vamos a construir**

---

**Siguiente:** `02-deploy-testnet.md` - Compilación y Deploy del Contrato