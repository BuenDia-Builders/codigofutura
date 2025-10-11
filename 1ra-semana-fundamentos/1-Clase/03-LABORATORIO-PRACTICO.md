# 🔬 LABORATORIO PRÁCTICO

## 🎯 Objetivo
Al terminar este laboratorio, vas a lograr enviar dinero real (de prueba) en una blockchain real.

---

## 🚀 ACTIVIDAD 1: CREAR TU CUENTA STELLAR

### PASO 1: Acceder a Stellar Laboratory

1. Abre tu navegador
2. Ve a: https://laboratory.stellar.org
3. Espera a que cargue completamente

---

### PASO 2: VERIFICAR RED (⚠️ MUY IMPORTANTE)

```
┌─────────────────────────────────────┐
│ Esquina superior derecha:           │
│ Network: [Testnet ▼]                │
└─────────────────────────────────────┘
```

✅ **DEBE decir "Testnet"**

Si dice "Mainnet":
1. Click en "Mainnet"
2. Seleccionar "Testnet" del dropdown

> ⚠️ **CRÍTICO**: Mainnet = dinero real. Testnet = dinero de prueba gratis. SIEMPRE usa Testnet para aprender.

---

### PASO 3: Generar Tu Par de Llaves

#### Checklist:
- [ ] Click en "Account"
- [ ] Click en "Create New Account"
- [ ] Click en botón "Generate keypair"
- [ ] Esperar 1 segundo
- [ ] Ver tus llaves en pantalla

<img width="1265" height="435" alt="image" src="https://github.com/user-attachments/assets/d19365ce-b81f-4072-a33b-4073a4008ad8" />


#### Resultado esperado:

```
✅ Keypair Generated Successfully!

📧 PUBLIC KEY
GBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
[Copy]

🔐 SECRET KEY
SBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
⚠️ NEVER share your secret key
[Copy]
```

---

### PASO 4: Guardar Tus Llaves SEGURAMENTE

#### Opción A: Archivo de Texto (Recomendado)

1. Abrir Notepad / TextEdit / VS Code
2. Usar la plantilla del documento "01-PREPARACION-PREVIA.md"
3. Pegar tus llaves en los lugares indicados
4. Guardar como: `stellar-clase1-llaves.txt`
5. Ubicación: Escritorio/Stellar-Clase1/

#### Opción B: USB (Más seguro)

1. Seguir pasos de Opción A
2. Copiar archivo a USB
3. Eliminar del escritorio

#### ⚠️ Verificación Rápida:

- [ ] Public Key tiene 56 caracteres
- [ ] Public Key empieza con "G"
- [ ] Secret Key tiene 56 caracteres
- [ ] Secret Key empieza con "S"
- [ ] Guardaste el archivo
- [ ] Sabes dónde está el archivo

---

### PASO 5: Fondear con Friendbot

#### ¿Qué es Friendbot?

Un robot amigable que te regala 10,000 XLM de prueba GRATIS. Solo funciona en Testnet.

#### Método A: Desde Laboratory (Más Fácil)

1. En la misma pantalla de "Create Account"
2. Buscar sección "Fund account with Friendbot"
3. Tu public key debe estar visible
4. Click en "Fund account with Friendbot"
5. Esperar 5-10 segundos

#### Mensaje esperado:

```
✅ Account funded successfully!

Your account now has: 10,000.0000000 XLM

[View account in Laboratory]
[View on StellarExpert]
```

#### Método B: URL Directa (Si falla el Método A)

1. Ir a: `https://friendbot.stellar.org/?addr=TU_PUBLIC_KEY`
2. Reemplaza `TU_PUBLIC_KEY` con tu public key real
3. Presionar Enter
4. Ver respuesta de éxito

---

### PASO 6: Verificar Tu Cuenta

1. Menú superior: "Account"
2. Click "View Account Details"
3. Pegar tu public key
4. Click "Load account"

#### Debes ver:

```
✅ CONFIRMACIÓN DE ÉXITO

💰 Balance: 10,000.0000000 XLM
🔢 Sequence: [número grande]
💎 Available: 9,999.5 XLM
```

> 💡 Los 0.5 XLM están bloqueados como depósito de la cuenta (reserve).

🎉 **¡FELICIDADES! Tu cuenta está activa.**

---

## 💸 ACTIVIDAD 2: TU PRIMERA TRANSACCIÓN

### Preparación: Formar Parejas

1. Forma pareja con una compañera
2. Intercambien sus **PUBLIC KEYS** (NO secret keys)
3. Anoten:

```
═══════════════════════════════════════════
MIS DATOS DE PAREJA

YO:
Nombre: [Tu nombre]
Public Key: GBXXX...

MI COMPAÑERA:
Nombre: [Nombre de compañera]
Public Key: GBYYY...
═══════════════════════════════════════════
```

---

### FASE 1: Configuración Básica

#### PASO 1: Ir a Transaction Builder

1. Menú superior: "Transaction Builder"
2. Click en "Build Transaction"
3. Verificar: Network = **Testnet** ✓

#### PASO 2: Source Account

```
┌────────────────────────────────────┐
│ SOURCE ACCOUNT                     │
│ [Pegar TU public key aquí]         │
└────────────────────────────────────┘
```

1. Copiar **tu** public key
2. Pegar en campo "Source Account"
3. Click "Fetch next sequence number from the network"
4. Esperar 2 segundos
5. Ver: "Sequence number fetched: [número]"

#### PASO 3: Agregar Memo (Opcional)

```
┌────────────────────────────────────┐
│ MEMO                               │
│ Type: [Text ▼]                     │
│ Mi primer pago Stellar 🚀          │
└────────────────────────────────────┘
```

Ideas de memos:
- "Mi primera transacción blockchain"
- "Pago a [nombre] - Clase 1"
- "¡Hola [nombre]!"

---

### FASE 2: Agregar Operación de Pago

#### PASO 4: Agregar Operation

1. Scroll hasta "Operations"
2. Click "Add Operation"
3. Seleccionar "Payment"

#### PASO 5: Configurar el Payment

```
┌────────────────────────────────────────────┐
│ OPERATION #1: PAYMENT                      │
│                                            │
│ 👤 Destination                             │
│ [Public key de tu compañera]               │
│                                            │
│ 💰 Asset                                   │
│ ◉ Native (XLM) ← DEJAR SELECCIONADO       │
│                                            │
│ 💵 Amount                                  │
│ 25                                         │
└────────────────────────────────────────────┘
```

Completar:
- **Destination**: Public key de tu compañera
- **Asset**: Dejar en "Native (XLM)"
- **Amount**: 25

#### PASO 6: Revisar Resumen

```
📊 RESUMEN DE TRANSACCIÓN

Source: GBXXX... (tú)
Operations: 1 (Payment)
Fee: 100 stroops = $0.000001 USD
Memo: "Tu mensaje aquí"
```

✅ Verificar:
- [ ] Source account correcto
- [ ] Destination correcta
- [ ] Amount = 25 XLM
- [ ] Fee = 100 stroops
- [ ] Memo visible

> ⚠️ Si algo no se ve bien, NO continues. Pide ayuda.

---

### FASE 3: Firmar y Enviar

#### PASO 7: Firmar la Transacción

1. Click "Sign in Transaction Signer"
2. Pegar tu **SECRET KEY** (empieza con S)
3. Click "Add Signer"
4. Ver: "✅ Signature added!"

> ⚠️ **Nota de Seguridad**: Laboratory es herramienta oficial de Stellar y estamos en testnet. En producción usarías hardware wallets.

#### PASO 8: Enviar a la Red

1. Click dropdown "Submit to Stellar Network"
2. Seleccionar "Submit to Testnet"
3. Esperar 3-10 segundos

#### Resultado Esperado:

```
┌────────────────────────────────────────────┐
│ ✅ TRANSACTION SUCCESSFUL!                 │
│                                            │
│ Hash: a1b2c3d4e5f6789...                   │
│ Ledger: #1,234,567                         │
│ Fee: 100 stroops                           │
│                                            │
│ [View on StellarExpert]                    │
└────────────────────────────────────────────┘
```

🎉 **¡FELICIDADES! Completaste tu primera transacción blockchain.**

---

#### PASO 9: Guardar Transaction Hash

Copia el hash y pégalo en tu archivo de notas:

```
═══════════════════════════════════════════
MI PRIMERA TRANSACCIÓN

De: Mi cuenta (GBXXX...)
Para: [Nombre compañera] (GBYYY...)
Monto: 25 XLM
Memo: "[tu memo]"
Transaction Hash: a1b2c3d4e5f6789...
Estado: ✅ CONFIRMADA
Fecha: [fecha/hora]
═══════════════════════════════════════════
```

---

## ✅ VERIFICACIÓN FINAL

- [ ] Creaste tu cuenta Stellar
- [ ] Fondeaste con Friendbot (10,000 XLM)
- [ ] Formaste pareja con compañera
- [ ] Construiste transacción de pago
- [ ] Firmaste con tu secret key
- [ ] Enviaste a la red Testnet
- [ ] Recibiste confirmación de éxito
- [ ] Guardaste tu transaction hash

**Si marcaste TODO** ✅: ¡Excelente trabajo!

---

**Siguiente paso**: Ve al documento **04-EXPLORANDO-BLOCKCHAIN.md** para entender qué sucedió con tu transacción.

🚀
