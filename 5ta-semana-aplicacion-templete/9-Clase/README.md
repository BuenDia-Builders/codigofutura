# 🦈 Clase 9: De Producto a Código - Construyendo tu MVP en Stellar
## Código Futura - Martes 4 de Noviembre 2025

---

## 🎯 ¡Bienvenida, Tiburona Builder! 
El sábado en la clase de producto aprendiste a:
- ✅ Validar si tu idea necesita blockchain
- ✅ Identificar a tu persona usuaria
- ✅ Definir qué construir en un MVP

**Hoy vas a CONVERTIR esa validación en CÓDIGO REAL.**

En los próximos 90 minutos, no vamos a quedarnos en teoría. Vas a:
1. 🏗️ Estructurar tu proyecto usando el **Stellar Startup Template**
2. 🎨 Traducir tu flujo de producto a componentes de código
3. 🔗 Conectar tu frontend con Stellar Network
4. ⚡ Hacer tu primera transacción desde TU app

¿Nerviosa porque parece mucho? Es normal. ¿Emocionada porque vas a ver tu idea funcionando? Deberías estarlo.

**Recuerda:** No estás aprendiendo a copiar código. Estás aprendiendo a **construir soluciones reales** para **problemas reales** de **personas reales**.

¡Vamos a construir, Tiburonas! 🦈⚡

---

## 📋 Objetivos de Aprendizaje

Al finalizar esta clase, vas a poder:

### 1. 🗂️ Estructurar un proyecto Web3
Organizarás tu código usando arquitectura de monorepo con frontend (Next.js) y smart contracts (Soroban).

### 2. 🎨 Del diseño al código
Traducirás tu flujo de usuario (lo que diseñaste en producto) a componentes React funcionales.

### 3. 🔌 Integrar Stellar en tu app
Conectarás wallets, harás transacciones y trabajarás con assets directamente desde tu frontend.

### 4. ✅ Validar con usuarios reales
Probarás tu MVP con alguien que NO sabe de crypto y ajustarás según feedback.

---

## 🧠 Recap: ¿Qué validamos el sábado?

Antes de escribir código, recordemos **QUÉ validamos**:

### ✅ Test de Validación Blockchain (lo que hiciste el sábado)

Respondiste 4 preguntas críticas:

**1. ¿El problema existe sin blockchain?**
- ✅ Es un problema real del mundo físico
- ❌ No es un "problema" inventado del ecosistema crypto

**2. ¿Las alternativas actuales fallan?**
- ✅ Soluciones existentes son caras, lentas, o excluyen a personas
- ❌ No hay alternativas que "más o menos funcionan"

**3. ¿Blockchain lo mejora 10x?**
- ✅ Mejora dramática en velocidad, costo, acceso o transparencia
- ❌ No es solo "un poco mejor"

**4. ¿Stellar es la mejor opción?**
- ✅ Las ventajas técnicas de Stellar (velocidad, costo, simplicidad) importan para TU caso de uso
- ❌ No elegiste Stellar "porque sí"

### 🎭 Tu Proto-Persona

También definiste **para QUIÉN** estás construyendo:

Identificaste si tu usuario principal es:
- **👤 Usuario final no-técnico:** María que envía remesas
- **👩‍💻 Developer que integra:** Alex que agrega pagos crypto a su app
- **🏢 Empresa/Institución:** Fintech que evalúa usar Stellar

> 💡 **CRÍTICO:** En tu MVP, te enfocas en UNO de estos usuarios. No puedes ser para los 3 al mismo tiempo.

---

## 🏗️ Parte 1: Arquitectura del Stellar Startup Template

### ¿Qué es este template?

Es un **monorepo production-ready** que creamos específicamente para que TÚ puedas enfocarte en **CONSTRUIR tu idea**, no en configurar webpack, typescript, o mil cosas más.

Ya viene con:
- ✅ Frontend en Next.js 16 (React)
- ✅ Backend con Supabase (base de datos, auth, storage)
- ✅ Smart contracts en Soroban (Rust)
- ✅ Integración con wallets de Stellar
- ✅ TypeScript, Tailwind CSS, ESLint configurados

**Analogía simple:**
Es como cuando vas a cocinar. Puedes:
- ❌ Empezar desde cero: sembrar el trigo, moler la harina, criar la gallina para los huevos...
- ✅ Usar un kit pre-armado: ya tienes ingredientes medidos, horno precalentado, receta clara

Este template es el kit pre-armado para construir en Stellar.

---

### 🗂️ Estructura del proyecto

Cuando clones el template, verás esta estructura:

```
stellar-startup-template/
├── apps/
│   ├── web/              # 🎨 Tu frontend (Next.js + React)
│   │   ├── app/          # Páginas y rutas
│   │   ├── components/   # Componentes reutilizables
│   │   ├── contexts/     # Estado global (wallets, usuario)
│   │   └── lib/          # Utilidades y helpers
│   │
│   └── backend/          # 💾 Tu backend (Supabase)
│       ├── supabase/     # Configuración de base de datos
│       └── migrations/   # Cambios en la estructura de datos
│
├── contracts/            # 📜 Smart contracts (Soroban en Rust)
│   ├── hello_world/      # Ejemplo de contrato
│   └── increment/        # Otro ejemplo
│
└── packages/             # 📦 Código compartido
    └── tsconfig/         # Configuración de TypeScript
```

### 🎯 ¿Dónde vas a trabajar principalmente?

Para tu MVP, te enfocarás en **2 carpetas principales**:

**1. `apps/web/` - Tu interfaz de persona usuaria**
Aquí vive todo lo que la persona usuaria VE y con lo que INTERACTÚA:
- Pantallas y páginas
- Formularios
- Botones y flujos
- Conexión de wallet
- Visualización de transacciones

**2. `contracts/` - Tu lógica de negocio en blockchain**
Aquí vive la lógica que se ejecuta en Stellar:
- Reglas de tu aplicación
- Manejo de assets/tokens
- Lógica de smart contracts

> 💡 **Para un MVP simple** (como el que harás en la hackathon), es MUY posible que NO necesites crear smart contracts complejos. Stellar ya trae muchas funcionalidades nativas (payments, assets, DEX) que puedes usar directamente.

---

### ⚡ Actividad 1: Setup del Template

Vamos a clonar y configurar el template AHORA. Todas hacemos esto juntas.

#### 📋 Checklist: Instalación

**Paso 1: Clonar el repositorio**

- [ ] ✅ Repositorio clonado
- [ ] ✅ Estás dentro de la carpeta `stellar-startup-template/`

**Paso 2: Instalar dependencias**

```bash
npm install
```

⏱️ Esto tarda 2-3 minutos. Mientras se instala, lee la siguiente sección.

- [ ] ✅ Instalación completada sin errores
- [ ] ✅ Ves la carpeta `node_modules/` creada

**Paso 3: Configurar variables de entorno del frontend**

```bash
cd apps/web
cp .env.local.example .env.local
```

Ahora abre el archivo `.env.local` y configura:

```bash
# Stellar Network
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_STELLAR_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org

# App Info
NEXT_PUBLIC_APP_NAME=Mi App Tiburona
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (opcional por ahora, lo veremos después)
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

- [ ] ✅ Archivo `.env.local` creado
- [ ] ✅ Variables configuradas con testnet

**Paso 4: Levantar el servidor de desarrollo**

```bash
npm run dev
```

**Resultado esperado:**
```
✓ Ready in 2.3s
○ Local:        http://localhost:3000
```

- [ ] ✅ Servidor corriendo
- [ ] ✅ Puedes abrir http://localhost:3000 en tu navegador
- [ ] ✅ Ves la pantalla de inicio del template

#### 🔧 Troubleshooting

**Problema:** "Error: Cannot find module..."
**Solución:** Vuelve a la raíz del proyecto (`cd ../..`) y ejecuta `npm install` de nuevo.

**Problema:** "Puerto 3000 ya está en uso"
**Solución:** Cambia el puerto: `PORT=3001 npm run dev`

**Problema:** Página en blanco o error 404
**Solución:** Asegúrate de estar en la carpeta `apps/web/` antes de hacer `npm run dev`

---

## 🎨 Parte 2: Del Flujo de Persona Usuaria al Código

### 🧭 Recordatorio: Tu flujo de producto

El sábado en producto, definiste el **flujo principal** de tu aplicación. Algo como:

```
Usuario llega → Ve problema que resuelves → Se registra/conecta wallet
→ Realiza acción principal → Ve confirmación → Celebra
```

**Ejemplo concreto (app de remesas):**
```
María abre app → Ve "Enviar dinero rápido y barato"
→ Conecta wallet → Ingresa monto y destinatario
→ Confirma transacción → Ve que llegó instantáneamente
```

### 🏗️ Traduciendo flujo → código

Cada **paso del flujo** se convierte en una **página o componente** en tu código:

| Paso del flujo | Se convierte en | Ubicación en el código |
|----------------|-----------------|------------------------|
| Landing page | Página de inicio | `apps/web/app/page.tsx` |
| Conectar wallet | Componente + Context | `components/WalletConnect.tsx` |
| Acción principal | Página de la app | `apps/web/app/dashboard/page.tsx` |
| Confirmar transacción | Modal o página | `components/TransactionModal.tsx` |
| Ver resultado | Componente de estado | `components/TransactionStatus.tsx` |

---

### 🎯 Tu MVP en 3 pantallas esenciales

Para un MVP funcional en la hackathon, **necesitas mínimo 3 pantallas**:

#### **Pantalla 1: Landing Page** 🏠
**Objetivo:** Explicar QUÉ haces y POR QUÉ importa en menos de 5 segundos.

**Debe incluir:**
- ✅ Headline claro (qué problema resuelves)
- ✅ Subheadline (para quién)
- ✅ CTA principal: "Conectar Wallet" o "Empezar"
- ✅ Opcional: Screenshot o demo visual

**Archivo:** `apps/web/app/page.tsx`

#### **Pantalla 2: App Principal** ⚡
**Objetivo:** Permitir que el usuario haga LA ACCIÓN PRINCIPAL de tu app.

**Ejemplos según tu caso de uso:**
- Remesas: Formulario para enviar dinero
- Micropagos: Botón de propina/pago
- Tokenización: Crear o transferir asset
- Voting: Ver propuestas y votar

**Debe incluir:**
- ✅ Estado de conexión de wallet visible
- ✅ Formulario/interfaz clara para la acción
- ✅ Feedback en tiempo real (loading, success, error)
- ✅ Información de la transacción resultante

**Archivo:** `apps/web/app/dashboard/page.tsx` o similar

#### **Pantalla 3: Confirmación/Historial** ✅
**Objetivo:** Demostrar que la acción se completó exitosamente.

**Debe incluir:**
- ✅ Estado claro: "Transacción exitosa ✅"
- ✅ Detalles: monto, destinatario, hash de transacción
- ✅ Link al explorer de Stellar (para auditoría)
- ✅ Opción para hacer otra acción

**Puede estar en:** Un modal, una sección de la app principal, o una página dedicada

---

### ⚡ Actividad 2: Mapea tu flujo a código (10 minutos)

Vas a tomar el flujo que definiste el sábado y mapearlo a archivos concretos.

#### 📋 Template para completar:

Abre tu FigJam/Miro y completa esto:

```
MI FLUJO DE PRODUCTO → CÓDIGO

┌─────────────────────────────────────────┐
│ PANTALLA 1: LANDING PAGE                │
├─────────────────────────────────────────┤
│ Paso del flujo que representa:          │
│ [Tu respuesta]                          │
│                                         │
│ Elementos que debe tener:               │
│ - [ ] [Elemento 1]                      │
│ - [ ] [Elemento 2]                      │
│ - [ ] [Elemento 3]                      │
│                                         │
│ Archivo: apps/web/app/page.tsx         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ PANTALLA 2: APP PRINCIPAL               │
├─────────────────────────────────────────┤
│ Paso del flujo que representa:          │
│ [Tu respuesta]                          │
│                                         │
│ Acción principal del usuario:           │
│ [Describe la acción en 1 frase]         │
│                                         │
│ Elementos que debe tener:               │
│ - [ ] [Elemento 1]                      │
│ - [ ] [Elemento 2]                      │
│ - [ ] [Elemento 3]                      │
│                                         │
│ Archivo: apps/web/app/dashboard/page.tsx│
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ PANTALLA 3: CONFIRMACIÓN                │
├─────────────────────────────────────────┤
│ Paso del flujo que representa:          │
│ [Tu respuesta]                          │
│                                         │
│ ¿Qué debe ver el usuario?               │
│ [Tu respuesta]                          │
│                                         │
│ Elementos que debe tener:               │
│ - [ ] [Elemento 1]                      │
│ - [ ] [Elemento 2]                      │
│ - [ ] [Elemento 3]                      │
│                                         │
│ Archivo: [Decides tú dónde]             │
└─────────────────────────────────────────┘
```

**Ejemplo completo (app de remesas):**

```
MI FLUJO DE PRODUCTO → CÓDIGO

┌─────────────────────────────────────────┐
│ PANTALLA 1: LANDING PAGE                │
├─────────────────────────────────────────┤
│ Paso del flujo: Usuario llega y entiende│
│ qué hacemos en 5 segundos               │
│                                         │
│ Elementos que debe tener:               │
│ - [x] Headline: "Envía dinero a Venezuela│
│       en 5 segundos por $0.00001"       │
│ - [x] Subheadline: "Sin bancos, sin fees│
│       ocultos, solo tú y tu familia"    │
│ - [x] Botón: "Enviar Ahora"             │
│ - [x] Screenshot de la app              │
│                                         │
│ Archivo: apps/web/app/page.tsx         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ PANTALLA 2: APP PRINCIPAL               │
├─────────────────────────────────────────┤
│ Paso del flujo: Usuario envía dinero    │
│                                         │
│ Acción principal: Ingresar monto,       │
│ destinatario y confirmar envío          │
│                                         │
│ Elementos que debe tener:               │
│ - [x] Input: Monto en USD               │
│ - [x] Input: Public key del destinatario│
│ - [x] Botón: "Enviar Ahora"             │
│ - [x] Preview: "Recibirá X XLM/USDC"    │
│                                         │
│ Archivo: apps/web/app/send/page.tsx    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ PANTALLA 3: CONFIRMACIÓN                │
├─────────────────────────────────────────┤
│ Paso del flujo: Usuario ve que el dinero│
│ llegó exitosamente                      │
│                                         │
│ ¿Qué debe ver el usuario?               │
│ "✅ $100 enviados exitosamente"         │
│                                         │
│ Elementos que debe tener:               │
│ - [x] Icono de éxito (✅ o 🎉)          │
│ - [x] Monto enviado                     │
│ - [x] Destinatario                      │
│ - [x] Link a Stellar Explorer           │
│ - [x] Botón: "Enviar más dinero"        │
│                                         │
│ Archivo: components/SuccessModal.tsx   │
└─────────────────────────────────────────┘
```

💡 **Comparte con tu equipo:** Todos deben estar de acuerdo en este mapeo antes de escribir código.

---

## 🔗 Parte 3: Integrando Stellar en tu Frontend

### 🌟 Lo que el template YA trae configurado

Buenas noticias, Tiburona: **NO tienes que configurar TODO desde cero**. El template ya incluye:

#### ✅ **1. Stellar SDK instalado**
El paquete `@stellar/stellar-sdk` ya está en tus dependencias. No necesitas instalarlo.

#### ✅ **2. Context de Wallets**
Ya hay un `WalletsKitContext` que maneja:
- Conexión con múltiples wallets (Freighter, Albedo, xBull)
- Persistencia (recuerda la wallet conectada)
- Estado global accesible desde cualquier componente

**Ubicación:** `apps/web/contexts/WalletsKitContext.tsx`

#### ✅ **3. Componentes base**
- `WalletConnect.tsx` - Botón para conectar wallet
- Layout con navegación básica
- Estilos con Tailwind CSS

---

### 🔌 Cómo conectar una wallet en tu app

En cualquier componente, puedes acceder al estado de la wallet usando el hook:

```typescript
'use client'

import { useWalletsKit } from '@/contexts/WalletsKitContext'

export default function MiComponente() {
  const { address, isConnected, connect, disconnect } = useWalletsKit()

  if (!isConnected) {
    return (
      <button onClick={connect}>
        Conectar Wallet 🦈
      </button>
    )
  }

  return (
    <div>
      <p>Conectada: {address}</p>
      <button onClick={disconnect}>Desconectar</button>
    </div>
  )
}
```

**¿Qué está pasando aquí?**
- `useWalletsKit()` - Hook que te da acceso al estado de la wallet
- `address` - Public key del usuario conectado
- `isConnected` - Boolean: ¿hay wallet conectada?
- `connect()` - Función para mostrar el modal de conexión
- `disconnect()` - Función para desconectar

> 💡 **Esto es TAN simple como usar `useState()` de React.** El template hizo la parte difícil por ti.

---

### 💸 Cómo hacer una transacción de pago

Vamos a ver el código más importante: **enviar XLM o un asset de una cuenta a otra**.

#### Ejemplo: Enviar 10 XLM

```typescript
'use client'

import { useState } from 'react'
import { useWalletsKit } from '@/contexts/WalletsKitContext'
import * as StellarSdk from '@stellar/stellar-sdk'

export default function SendPayment() {
  const { address, connector } = useWalletsKit()
  const [destination, setDestination] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [txHash, setTxHash] = useState('')

  const handleSend = async () => {
    if (!address || !connector) return
    
    setLoading(true)
    
    try {
      // 1. Conectar con Stellar Network
      const server = new StellarSdk.Horizon.Server(
        'https://horizon-testnet.stellar.org'
      )
      
      // 2. Cargar la cuenta origen
      const sourceAccount = await server.loadAccount(address)
      
      // 3. Crear la transacción
      const transaction = new StellarSdk.TransactionBuilder(
        sourceAccount,
        {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase: StellarSdk.Networks.TESTNET,
        }
      )
        .addOperation(
          StellarSdk.Operation.payment({
            destination: destination,
            asset: StellarSdk.Asset.native(), // XLM
            amount: amount,
          })
        )
        .setTimeout(180)
        .build()
      
      // 4. Firmar con la wallet del usuario
      const { signedTxXdr } = await connector.signTransaction(
        transaction.toXDR()
      )
      
      const signedTransaction = StellarSdk.TransactionBuilder
        .fromXDR(signedTxXdr, StellarSdk.Networks.TESTNET)
      
      // 5. Enviar a la red
      const result = await server.submitTransaction(signedTransaction)
      
      setTxHash(result.hash)
      alert('¡Pago enviado exitosamente! 🎉')
      
    } catch (error) {
      console.error('Error:', error)
      alert('Error al enviar pago')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Enviar XLM</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Destinatario
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="GXXX..."
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Monto (XLM)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="10"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <button
          onClick={handleSend}
          disabled={loading || !destination || !amount}
          className="w-full bg-blue-600 text-white py-2 rounded
                     hover:bg-blue-700 disabled:bg-gray-300"
        >
          {loading ? 'Enviando...' : 'Enviar Pago 🦈'}
        </button>
        
        {txHash && (
          <div className="mt-4 p-3 bg-green-50 rounded">
            <p className="text-sm text-green-800">
              ✅ Transacción exitosa!
            </p>
            <a
              href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
              target="_blank"
              className="text-blue-600 text-sm break-all"
            >
              Ver en explorer
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
```

#### 🔍 Desglose del código (qué hace cada parte)

**Paso 1: Conectar con Stellar Network**
```typescript
const server = new StellarSdk.Horizon.Server(
  'https://horizon-testnet.stellar.org'
)
```
Esto crea la conexión con el servidor de Stellar. Es como conectarte a una API.

**Paso 2: Cargar la cuenta origen**
```typescript
const sourceAccount = await server.loadAccount(address)
```
Necesitamos saber el `sequence number` actual de la cuenta. Es un contador de transacciones.

**Paso 3: Construir la transacción**
```typescript
const transaction = new StellarSdk.TransactionBuilder(...)
  .addOperation(StellarSdk.Operation.payment({...}))
  .build()
```
Aquí defines QUÉ quieres hacer: en este caso, un pago.

**Paso 4: Firmar con la wallet**
```typescript
const { signedTxXdr } = await connector.signTransaction(...)
```
La wallet del usuario firma la transacción con su clave privada. **TÚ nunca ves esa clave.**

**Paso 5: Enviar a la red**
```typescript
const result = await server.submitTransaction(signedTransaction)
```
La transacción firmada se envía a la red Stellar y se confirma en ~5 segundos.

---

### ⚡ Actividad 3: Tu primera transacción desde la app (20 minutos)

Vamos a implementar el componente de pago en TU proyecto.

#### 📋 Checklist: Implementar pago

**Paso 1: Crear el componente**

```bash
# En apps/web/components/
touch SendPayment.tsx
```

**Paso 2: Copiar el código base**
- [ ] Copia el código de ejemplo anterior
- [ ] Pégalo en `SendPayment.tsx`
- [ ] Ajusta los textos a tu caso de uso

**Paso 3: Importar en tu página principal**

```typescript
// En apps/web/app/dashboard/page.tsx
import SendPayment from '@/components/SendPayment'

export default function Dashboard() {
  return (
    <div>
      <h1>Mi App Tiburona</h1>
      <SendPayment />
    </div>
  )
}
```

**Paso 4: Probar con una compañera**

Forma parejas. Una envía, otra recibe:

- [ ] Tiburona A: Conecta su wallet
- [ ] Tiburona B: Comparte su public key
- [ ] Tiburona A: Envía 5 XLM a Tiburona B
- [ ] Ambas: Verifican en Stellar Expert que llegó

**Paso 5: Celebrar 🎉**

- [ ] ✅ Hiciste una transacción desde TU app
- [ ] ✅ Entiendes el flujo de pago
- [ ] ✅ Puedes modificarlo para tu caso de uso

#### 🔧 Troubleshooting

**Error: "Account not found"**
- La cuenta destino no existe o no tiene fondos
- Solución: Usa el friendbot para crear/fondear la cuenta

**Error: "Transaction failed"**
- Revisa que el monto sea > 0
- Verifica que tienes suficiente XLM en tu wallet
- Chequea que el destination sea una public key válida

**Error: "User rejected"**
- El usuario canceló en la wallet
- Es comportamiento normal, maneja el error con un mensaje amable

---

## 🧪 Parte 4: Del Código a la Persona Usuaria Real

### 🎯 Validación de MVP: ¿Funciona para tu persona usuaria?

Recuerda: el sábado definiste tu **proto-persona**. Ahora que tienes código funcionando, necesitas **validar** con alguien REAL.

#### ¿Por qué validar?

- ❌ **Riesgo:** Construyes algo que nadie entiende o necesita
- ✅ **Validación:** Confirmas que resuelves un problema real de forma clara

### 🧪 Test de Usuario No-Técnico

Si tu usuario principal es **no-técnico** (como María de las remesas), necesitas probar con alguien que:
- ❌ NO sabe qué es blockchain
- ❌ NO tiene experiencia con crypto
- ✅ SÍ tiene el problema que intentas resolver

#### 📋 Protocolo de testing:

**Antes del test:**
- [ ] Prepara tu app en localhost funcionando
- [ ] Ten una wallet de prueba con fondos
- [ ] Define la tarea específica que quieres que hagan

**Durante el test:**

**NO hagas esto ❌:**
- "Haz click aquí, luego aquí, luego aquí..."
- "Esto es un payment de Stellar que va a la blockchain..."
- "¿Entendiste? ¿Alguna duda?"

**SÍ haz esto ✅:**
- Dale el contexto: "Imagina que necesitas enviar dinero a tu familia"
- Dale el dispositivo: "Aquí está. Intenta hacerlo"
- **CÁLLATE y OBSERVA:** No les ayudes, solo mira qué hacen
- Pregunta en voz alta: "¿Qué estás pensando ahora?"
- Toma notas de DÓNDE se confunden

**Preguntas post-test:**

1. **"¿Qué crees que acabas de hacer?"**
   - Si NO pueden explicarlo claramente, tu UX falla
   
2. **"¿En qué parte te sentiste confundida?"**
   - Toma nota de estos puntos de fricción
   
3. **"¿Usarías esto en lugar de [alternativa actual]?"**
   - Si dicen "no sé" o "tal vez", tienes trabajo por hacer

4. **"¿Qué cambiarías?"**
   - Los usuarios son buenos diagnosticando problemas

**Después del test:**
- [ ] Lista 3 cosas que funcionaron bien
- [ ] Lista 3 cosas que confundieron al usuario
- [ ] Prioriza: ¿qué arreglas primero?

---

### 🎨 Mejoras rápidas basadas en feedback común

Basado en testing con usuarios reales, estas son mejoras que SIEMPRE ayudan:

#### 1. **Ocultar jerga técnica** 🚫

**❌ Antes:**
```
Public Key: GBXYZ...ABC
Transaction Hash: 0x1234...
Sequence: 12847298
```

**✅ Después:**
```
Enviaste a: María Rodriguez
Estado: ✅ Completado
Ver detalles →
```

#### 2. **Estados claros de loading** ⏳

**❌ Antes:**
```
[Botón deshabilitado, sin feedback]
```

**✅ Después:**
```
Enviando dinero... 
⏳ Confirmando en la red Stellar (5 seg)
```

#### 3. **Errores en español y accionables** 🔴

**❌ Antes:**
```
Error: tx_bad_seq
```

**✅ Después:**
```
Oops, algo salió mal.
Intenta de nuevo en unos segundos.
Si el problema persiste, contacta soporte.
```

#### 4. **Confirmar antes de acciones irreversibles** ⚠️

```typescript
<button onClick={() => {
  if (confirm('¿Enviar $100 a María Rodriguez?')) {
    handleSend()
  }
}}>
  Enviar Ahora
</button>
```

#### 5. **Feedback visual inmediato** ✅

Cuando algo sale bien, CELÉBRAL:

```typescript
{success && (
  <div className="bg-green-100 border-green-500 p-4 rounded">
    <p className="text-green-800 font-bold">
      🎉 ¡Dinero enviado exitosamente!
    </p>
    <p className="text-green-600 text-sm">
      María recibirá $100 en su wallet en los próximos segundos
    </p>
  </div>
)}
```

---

### ⚡ Actividad 4: User Testing con tu equipo 

Ahora tú pruebas tu MVP con feedback real.

#### 📋 Instrucciones:

**Formar grupos de 3:**
- 1 persona es "Builder" (presenta su app)
- 1 persona es "Usuario" (prueba la app SIN ayuda)
- 1 persona es "Observador" (toma notas)

**Rotan 3 veces** para que todas sean Builder.

**Como Builder:**
- [ ] Presenta tu app en 1 minuto: qué problema resuelve
- [ ] Dale el dispositivo al Usuario
- [ ] No hables más. Solo observa y toma notas

**Como Persona Usuaria:**
- [ ] Intenta completar la tarea principal
- [ ] Piensa en voz alta: "Ahora voy a... creo que esto es..."
- [ ] Di en voz alta si algo te confunde

**Como Persona Observadora:**
- [ ] Anota DÓNDE la persona usuaria se confunde (qué pantalla, qué elemento)
- [ ] Anota QUÉ dice la persona usuaria en voz alta
- [ ] No ayudes ni des hints

**Al terminar cada ronda:**
- [ ] Builder pregunta las 4 preguntas post-test
- [ ] Persona observadora comparte sus notas
- [ ] Builder anota 1-3 mejoras prioritarias

---

## 🚀 Parte 5: De MVP a Presentación de Hackathon

### 📊 Qué mostrar en tu demo

Tienes 5 minutos para presentar. No puedes mostrar todo. **Prioriza**:

#### ✅ **Qué SÍ mostrar:**

**1. El problema (30 segundos)**
- Usa tu proto-persona: "María trabaja en Miami y envía dinero a Venezuela..."
- Cuantifica el dolor: "Pierde $25 de cada $100 en fees + 3 días de espera"

**2. Tu solución (30 segundos)**
- "Con nuestra app, María envía $100 en 5 segundos por $0.00001"
- Muestra la comparación lado a lado

**3. Demo EN VIVO (2 minutos)**
- Muestra el flujo completo: conectar wallet → hacer acción → ver confirmación
- **CRUCIAL:** Usa Testnet pero con datos que parezcan reales
- Narra mientras haces: "María ingresa el monto... confirma... y listo, el dinero ya llegó"

**4. Prueba social (30 segundos)**
- "Lo probamos con 5 usuarios reales y el 80% pudo completar el flujo sin ayuda"
- Muestra un screenshot de feedback o testimonio

**5. Tracción técnica (1 minuto)**
- "En 2 semanas construimos..."
- Muestra métricas: # de transacciones, # de usuarios testeando, código en GitHub
- "Esto es Stellar porque..." (justifica por qué no usaste otra blockchain)

**6. Próximos pasos (30 segundos)**
- "Necesitamos $X para..." o "En los próximos 3 meses vamos a..."
- Sé específica: features concretos, no vagos

#### ❌ **Qué NO mostrar:**

- ❌ Código fuente (a nadie le importa tu React component)
- ❌ Explicaciones técnicas de Stellar (asume que los jueces saben)
- ❌ Roadmap con 20 features (enfócate en lo próximo)
- ❌ Pitch de "podría" o "queremos" (muestra lo que YA hiciste)

---

### 🎬 Script de Demo de 5 minutos

Usa esta estructura probada:

```
[0:00-0:30] PROBLEMA
"María es trabajadora doméstica en Miami. 
Envía $200/mes a su mamá en Venezuela.
Con Western Union: paga $25 de fee + espera 3 días.
Esto es 12.5% de su dinero. Insostenible."

[0:30-1:00] SOLUCIÓN
"Con RemesaXLM, María envía los mismos $200:
- Fee: $0.00001 (básicamente gratis)
- Tiempo: 5 segundos
- Su mamá recibe USDC que puede cambiar local"

[1:00-3:00] DEMO EN VIVO
"Déjenme mostrarles cómo funciona.
[Abres la app]
María abre la app, conecta su wallet Freighter.
[Click en conectar]
Ingresa $200 y la public key de su mamá.
[Completa el formulario]
Presiona 'Enviar'...
[Confirma en wallet]
Y listo. En 5 segundos, su mamá puede ver el dinero.
[Muestra confirmación + link a explorer]"

[3:00-3:30] VALIDACIÓN
"Lo probamos con 5 trabajadoras domésticas reales.
4 de 5 completaron el envío sin ayuda.
La feedback: 'Es como usar Venmo pero internacional'"

[3:30-4:30] POR QUÉ STELLAR
"Elegimos Stellar porque:
1. Velocidad: 5 seg vs 15-60 seg de Ethereum
2. Costo: $0.00001 vs $5-50 de Ethereum
3. USDC nativo: María envía USD, mamá recibe USD
4. Compliance: diseñado para casos de uso financieros

Esto NO sería viable en otra blockchain."

[4:30-5:00] TRACCIÓN Y PRÓXIMOS PASOS
"En 2 semanas:
- 50 transacciones de prueba
- Código open source en GitHub
- Roadmap: integrar con plataformas de cambio local

Buscamos $50k para:
- Licencia de remesas en 2 países
- Partnership con 3 casas de cambio
- Marketing para alcanzar 1,000 usuarios en 6 meses"
```

---

### 📸 Tip: Graba tu demo como backup

**Por qué:**
- El WiFi de la hackathon puede fallar
- Tu laptop puede crashear
- La demo en vivo puede salir mal

**Cómo:**
- Graba tu pantalla haciendo el flujo completo
- Narra mientras grabas (explica qué estás haciendo)
- Ten el video listo por si acaso

**Herramientas:**
- Mac: QuickTime Player (gratis)
- Windows: OBS Studio (gratis)
- Cualquier OS: Loom (gratis, sube a la nube)

> 💡 "Permítanme mostrarles un video de la demo porque [razón]" es 1000 veces mejor que "Ups, no funciona".

---

## 🎓 Parte 6: Checklist Pre-Hackathon

### ✅ 48 horas antes del demo

**Producto:**
- [ ] Tienes tu proto-persona documentada
- [ ] Pasaste el test de validación blockchain (4/4 ✅)
- [ ] Probaste tu app con mínimo 3 usuarios reales
- [ ] Tienes 1-3 testimonios o feedback escrito

**Técnico:**
- [ ] Tu app corre en localhost sin errores
- [ ] Puedes conectar wallet y hacer transacciones
- [ ] Todas las features del MVP funcionan
- [ ] Código subido a GitHub (público)
- [ ] README.md con instrucciones claras de setup

**Demo:**
- [ ] Script de 5 minutos escrito
- [ ] Practicaste el pitch 3+ veces
- [ ] Grabaste video backup de la demo
- [ ] Screenshots de la app y flujos principales
- [ ] Slides (máximo 5, con mucho visual)

**Datos:**
- [ ] Sabes cuántas transacciones hiciste (testnet)
- [ ] Tienes métricas: tiempo promedio de uso, % de éxito, etc
- [ ] Puedes mostrar link a Stellar Explorer con tu actividad

---

### ✅ El día de la presentación

**Mañana:**
- [ ] Verifica que tu app funciona (haz 1 transacción de prueba)
- [ ] Carga tus wallets de Testnet con fondos
- [ ] Descarga video backup a USB/local

**Antes de tu slot:**
- [ ] Conéctate al WiFi y verifica conectividad
- [ ] Cierra todas las pestañas innecesarias
- [ ] Pon tu laptop en modo presentación (no disturb)
- [ ] Ten el Stellar Explorer abierto en otra pestaña

**Durante tu presentación:**
- [ ] Respira. Sonríe. Eres una Tiburona 🦈
- [ ] Sigue tu script pero sé natural
- [ ] Si algo falla, usa el video backup sin pánico
- [ ] Termina con tu ask claro: "Buscamos $X para..."

---

## 🦈 Cierre: De Idea a Realidad

### 🎉 Celebra lo que lograste HOY

Hoy no solo aprendiste a usar un template. Hoy **cerraste el círculo** entre:

- **Sábado:** Validaste tu idea, definiste tu persona usuaria
- **Hoy:** Convertiste esa idea en código funcional
- **El jueves:** Vas a refinarlo, vas a levantarlo y vas a traer tus dudas

Esto no es poca cosa.

La mayoría de la gente se queda en:
- "Tengo una idea..." (pero nunca la valida)
- "Voy a aprender a programar..." (pero nunca construye nada)
- "Algún día..." (pero ese día nunca llega)

**TÚ no eres "la mayoría".**

En menos de una semana:
- ✅ Validaste una idea blockchain
- ✅ Definiste tu usuario y flujo de producto
- ✅ Estructuraste un proyecto completo
- ✅ Hiciste transacciones reales en Stellar desde TU app
- ✅ Probaste con usuarios y ajustaste según feedback

Ahora eres oficialmente una **Builder** que no solo piensa, sino que **CONSTRUYE**.

---

### 🌊 El verdadero poder de una Tiburona

Las tiburonas reales no nadan en círculos. Se mueven con propósito, precisión y persistencia.

Como una Tiburona Builder, tú:
- **Identificas problemas reales** (no inventados)
- **Validas antes de construir** (no pierdes tiempo)
- **Construyes para personas reales** (no para impresionar técnicamente)
- **Ajustas según feedback** (no te enamoras de tu código)
- **Presentas con claridad** (no te escondes detrás de jerga)

Esto es lo que separa a las Builders ganadoras de las que solo participan.

---

### 📚 Recursos para seguir construyendo

**Documentación oficial:**
- [Stellar Docs](https://developers.stellar.org/) - Referencia técnica
- [Soroban Docs](https://soroban.stellar.org/docs) - Smart contracts
- [Stellar SDK Guide](https://developers.stellar.org/docs/building-apps) - Integración frontend

**Comunidad:**
- Discord de Stellar Developers
- Stack Overflow (tag: stellar)
- GitHub Discussions del template

**Testing:**
- [Stellar Laboratory](https://laboratory.stellar.org/) - Herramienta visual
- [Stellar Expert](https://stellar.expert/explorer/testnet) - Block explorer
- [Friendbot](https://laboratory.stellar.org/#account-creator?network=test) - Fondear cuentas de testnet

**Próximas clases:**
- Clase 10: Optimización y debugging del código
- Clase 11: Dudas, consultas y pre hackathon STELLAR


---


Nos vemos en la Clase 10. Sigue nadando, sigue construyendo.

🦈⚡ **¡Vamos a construir, Tiburonas!** ⚡🦈

---

## 📎 Anexo: Comandos útiles de referencia rápida

```bash
# Levantar el servidor de desarrollo
cd apps/web
npm run dev

# Ver logs en tiempo real
npm run dev -- --turbo

# Build para producción
npm run build

# Limpiar cache si algo falla
rm -rf .next
rm -rf node_modules
npm install

# Ver qué puerto está usando
lsof -i :3000

# Matar proceso en puerto 3000
kill -9 $(lsof -t -i:3000)

# Formatear código
npm run format

# Lint
npm run lint
```

---

**Si necesitas inspiración:**
- [Showcase de proyectos Stellar](https://stellar.org/ecosystem/projects)
- [Hackathon winners anteriores en DoraHacks]

---

**¿Preguntas? ¿Bloqueada en algo? ¡Levanta la mano en Telegram!**

**¡Vamos a construir, Tiburonas!** 🦈⚡