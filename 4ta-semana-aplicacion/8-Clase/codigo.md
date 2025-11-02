# 🦈 GUÍA COMPLETA: Assets Nativos en Stellar - Clase 

**Versión:** 2.0 
**Autor:** Tiburonas Builders  
**Fecha:** 2025

---

## 📋 TABLA DE CONTENIDOS

1. [Introducción](#1-introducción)
2. [La Gran Confusión: Ethereum vs Stellar](#2-la-gran-confusión-ethereum-vs-stellar)
3. [¿Qué Son los Assets Nativos?](#3-qué-son-los-assets-nativos)
4. [Arquitectura de la dApp](#4-arquitectura-de-la-dapp)
5. [¿Qué es una Trustline?](#5-qué-es-una-trustline)
6. [Setup Inicial del Proyecto](#6-setup-inicial-del-proyecto)
7. [Configuración de Supabase](#7-configuración-de-supabase)
8. [Componentes Frontend](#8-componentes-frontend)
9. [Página Principal](#9-página-principal)
10. [Deploy en Vercel](#10-deploy-en-vercel)
11. [Las 3 Mejoras de Oro](#11-las-3-mejoras-de-oro)
12. [Manejo de Errores Completo](#12-manejo-de-errores-completo)
13. [Testing y Debugging](#13-testing-y-debugging)
14. [FAQ y Troubleshooting](#14-faq-y-troubleshooting)
15. [Recursos y Links Útiles](#15-recursos-y-links-útiles)

---

## 1. INTRODUCCIÓN

### ¿Qué vas a construir?

Una dApp completa que maneja Assets Nativos en Stellar con estas funcionalidades:

✅ Conectar Wallet (Freighter)  
✅ Ver Balance de USDC  
✅ Crear Trustline para USDC  
✅ Guardar datos en Supabase  
✅ Deploy en Vercel  

**Resultado final:** Una URL pública donde cualquiera puede probar tu dApp.

### ¿Por qué NO usamos contratos Soroban?

Esta es LA pregunta que todas se hacen. La respuesta:

> **Los Assets Nativos NO necesitan contratos. Están en el protocolo mismo.**

Comparación rápida:

| Característica | Ethereum (ERC-20) | Stellar (Assets Nativos) |
|----------------|-------------------|--------------------------|
| Líneas de código | 100-200 | 3 |
| Compilación | ✅ Necesaria | ❌ No existe |
| Auditoría | ✅ Necesaria | ❌ Protocolo lo maneja |
| Costo inicial | $500-5000 | < $0.01 |
| Mantenimiento | ✅ Upgrades | ❌ Ninguno |

---

## 2. LA GRAN CONFUSIÓN: ETHEREUM VS STELLAR

### La Confusión Común

**Pensamiento típico:**
> "Para crear tokens, necesito un contrato inteligente como en Ethereum (ERC-20)"

**Realidad en Stellar:**
> "Los Assets Nativos NO necesitan contratos. Están en el protocolo mismo."

### Comparación Detallada

#### ETHEREUM (ERC-20 Tokens)

```solidity
// Solidity: Necesitas escribir TODO este código
contract MyToken {
    // 1. Almacenar balances
    mapping(address => uint256) balances;
    
    // 2. Total supply
    uint256 public totalSupply;
    
    // 3. Función de transferencia
    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }
    
    // 4. Función approve
    function approve(address spender, uint256 amount) public {
        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
    }
    
    // 5. Más funciones: allowance, transferFrom...
    // Total: 100-200 líneas de código
}
```

**Costos Ethereum:**
```
├── Deploy del contrato:  $50-500 USD
├── Cada transacción:     $5-50 USD
└── TOTAL inicial:        $500-5,000 USD
```

**Complejidad:** ALTA  
**Mantenimiento:** Necesitas actualizar contratos

#### STELLAR (Assets Nativos)

```javascript
// JavaScript: Solo defines el asset
const USDC = new Asset(
  'USDC',  // código
  'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5'  // issuer
);

// ¡Ya existe! El protocolo lo maneja todo.
```

**Costos Stellar:**
```
├── Crear asset:       $0 (no hay contrato)
├── Crear trustline:   $0.000005 USD
├── Cada transacción:  $0.000005 USD
└── TOTAL inicial:     < $0.01 USD
```

**Complejidad:** BAJA  
**Mantenimiento:** Ninguno (protocolo lo maneja)

### ¿Cuándo SÍ Necesitas Soroban?

Solo cuando necesitas lógica CUSTOM que no existe en el protocolo:

❌ **NO necesitas Soroban para:**
- Crear un stablecoin (usa Asset Nativo)
- Enviar pagos (usa Asset Nativo)
- Intercambiar assets (usa DEX nativo)
- Crear trustlines (operación nativa)

✅ **SÍ necesitas Soroban para:**
- Yield automático (como DeFindex)
- Votaciones con reglas complejas
- NFTs con metadata dinámica
- Lending con tasas variables

### Analogía Visual

```
❌ Ethereum: Construyes tu propia casa desde cero
   ├── Contratas arquitecto
   ├── Compras materiales
   ├── Construyes todo
   └── Mantienes la casa

✅ Stellar: Usas un edificio ya construido
   ├── Solo eliges tu departamento
   ├── Todo está listo
   └── Sin mantenimiento
```

---

## 3. ¿QUÉ SON LOS ASSETS NATIVOS?

### Definición Técnica

> Los Assets Nativos son tokens que existen a nivel de protocolo en Stellar. No son contratos inteligentes, son un tipo de dato primitivo del sistema operativo blockchain.

### Componentes de un Asset Nativo

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  [ASSET CODE] + [ISSUER] = IDENTIFICADOR ÚNICO     │
│       ↓              ↓                              │
│     USDC    +   GA5ZSE... = USDC de Circle         │
│     USDC    +   GBBD47... = USDC de otro emisor    │
│                                                     │
│  ⚡ MÚLTIPLES USDC POSIBLES                         │
│     (Circle, Tether, Banco X, etc.)                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### 1. Asset Code

- Máximo 12 caracteres alfanuméricos
- Ejemplos: `USDC`, `EURC`, `BRL`, `GOLD`, `AAPL`
- Case-sensitive: `USDC` ≠ `usdc`

#### 2. Issuer (Public Key)

- Cuenta de Stellar que crea el asset
- Formato: 56 caracteres (G...)
- Ejemplo testnet: `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5`
- Ejemplo mainnet: `GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN`

### Punto Crítico

> **La combinación (código + issuer) es ÚNICA.** Pueden existir 1000 'USDC' diferentes, cada uno con un issuer distinto. Es como bancos diferentes emitiendo su propio dólar digital.

### Comparación con el Mundo Real

```
ASSET CODE = Tipo de moneda (USD, EUR)
ISSUER     = Banco emisor (Chase, BoA)
TRUSTLINE  = Abrir cuenta en ese banco
```

---

## 4. ARQUITECTURA DE LA DAPP

### Diagrama General

```
┌────────────────────────────────────────────────────────┐
│  USUARIO (Navegador)                                   │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │  FRONTEND (Next.js + Vercel)                    │  │
│  │                                                 │  │
│  │  ├── WalletConnect.jsx                         │  │
│  │  ├── AssetBalance.jsx                          │  │
│  │  └── CreateTrustline.jsx                       │  │
│  └─────────────────────────────────────────────────┘  │
│         ↓ (1) Firma                    ↑ (7) result   │
└─────────┼──────────────────────────────┼──────────────┘
          ↓                              ↑
     ┌────────────────────────────────────────┐
     │  FREIGHTER WALLET                      │
     │  (Extensión del navegador)             │
     └────────────────────────────────────────┘
          ↓ (2) TX firmada    ↑ (6) Confirmación
          ↓                   ↑
     ┌────────────────────────────────────────┐
     │  STELLAR NETWORK                       │
     │  (Testnet o Mainnet)                   │
     │                                        │
     │  • Assets Nativos (protocolo)          │
     │  • DEX integrado                       │
     │  • Trustlines                          │
     └────────────────────────────────────────┘
          ↓ (3) TX hash            ↑ (5) Query
          ↓                        ↑
     ┌────────────────────────────────────────┐
     │  SUPABASE (Backend)                    │
     │                                        │
     │  • Tabla: trustlines                   │
     │  • Tabla: transactions                 │
     │  • RLS: Row Level Security             │
     └────────────────────────────────────────┘
          ↓ (4) Metadata guardada
          
     [hash: abc123...]  ← Este hash se guarda en DB
                        ← Y se muestra al usuario
```

### Flujo de una Transacción

Ejemplo: Crear Trustline

```
1. Usuario click en "Crear Trustline"
   ↓
2. Frontend construye transacción con Stellar SDK
   ↓
3. Freighter Wallet se abre (pop-up)
   ↓
4. Usuario confirma con su secret key (Freighter lo tiene)
   ↓
5. Transacción firmada se envía a Stellar Network
   ↓
6. Stellar valida y ejecuta (3-5 segundos)
   ↓
7. Confirmación regresa al frontend
   ↓
8. Frontend guarda metadata en Supabase
   ↓
9. ✅ Usuario ve "Trustline creada!"
```

### Tecnologías Usadas

```
FRONTEND (Vercel)
├── Next.js: Framework de React
├── Tailwind CSS: Estilos
├── Stellar SDK: Interacción con blockchain
├── Freighter API: Wallet connection
└── Supabase Client: Base de datos

BACKEND (Supabase)
├── PostgreSQL: Base de datos
├── RLS: Row Level Security
└── Real-time subscriptions

BLOCKCHAIN (Stellar)
└── Assets Nativos (protocolo)
```

---

## 5. ¿QUÉ ES UNA TRUSTLINE?

### Concepto Fundamental

> En Stellar, antes de recibir cualquier asset que NO sea XLM nativo, debes crear una "trustline" que indica que confías en el emisor de ese asset.

### Analogía del Mundo Real

```
XLM     = Efectivo que todos aceptan (moneda nativa)
USDC    = Cheque de un banco específico
         
Trustline = Abrir una cuenta en ese banco
            para poder recibir sus cheques
```

### Componentes Técnicos

```javascript
Operation.changeTrust({
  asset: stellarAsset,    // Qué asset vas a recibir
  limit: '10000'          // Cuánto máximo quieres tener
})
```

### Costo de Trustlines (IMPORTANTE)

```
┌──────────────────────────────────────────────┐
│  COSTO REAL DE TRUSTLINES                   │
├──────────────────────────────────────────────┤
│                                              │
│  Base Reserve (cuenta activa):  1.0 XLM     │
│  Por cada trustline:          + 0.5 XLM     │
│  ─────────────────────────────────────────   │
│  Total para 1 trustline:      ~ 1.5 XLM     │
│                                              │
│  ⚠️ Importante:                              │
│  • Mínimo 1 XLM para que la cuenta exista   │
│  • +0.5 XLM por cada trustline adicional    │
│  • ES RECUPERABLE si eliminas la trustline  │
│                                              │
└──────────────────────────────────────────────┘
```

### Ejemplo Práctico

```
Tienes:  10 XLM
Creas:   1 trustline para USDC
Quedas:  9.5 XLM disponibles
         0.5 XLM "congelados" (recuperables)

Si eliminas trustline: Regresas a 10 XLM
```

---

## 6. SETUP INICIAL DEL PROYECTO

### Requisitos Previos

Antes de empezar, asegúrate de tener:

- ✅ Node.js instalado (v18 o superior)
- ✅ VS Code instalado
- ✅ Freighter Wallet (extensión de Chrome/Firefox)
- ✅ Cuenta de Supabase (gratis)
- ✅ Cuenta de Vercel (gratis)

### Paso 1: Crear el Proyecto en VS Code

```bash
# Abre tu terminal en VS Code (Ctrl + ~ o Cmd + ~)

# Navega a donde quieres crear el proyecto
cd ~/Documentos  # o donde prefieras

# Crea el proyecto Next.js
npx create-next-app@latest dapp-stellar-assets

# Opciones recomendadas:
# ✅ TypeScript? → NO (más simple para empezar)
# ✅ ESLint? → YES (detecta errores)
# ✅ Tailwind CSS? → YES (estilos fáciles)
# ✅ `src/` directory? → YES (más organizado)
# ✅ App Router? → YES (nueva arquitectura de Next.js)
# ❌ Customize default import alias? → NO

# Entra al proyecto
cd dapp-stellar-assets

# Abre en VS Code
code .
```

### Paso 2: Instalar Dependencias

```bash
# En la terminal de VS Code

# Instalar paquetes de Stellar y Supabase
npm install stellar-sdk @supabase/supabase-js @stellar/freighter-api

# ¿Qué instalamos?
# - stellar-sdk: Para interactuar con Stellar
# - @supabase/supabase-js: Base de datos
# - @stellar/freighter-api: Para conectar wallet
```

### Paso 3: Estructura de Carpetas

Crea esta estructura:

```
dapp-stellar-assets/
├── src/
│   ├── app/
│   │   ├── page.jsx          # ← Página principal
│   │   ├── layout.jsx         # Layout global
│   │   └── globals.css        # Estilos globales
│   │
│   ├── components/
│   │   ├── WalletConnect.jsx  # ← Conectar wallet
│   │   ├── AssetBalance.jsx   # ← Ver balance
│   │   ├── CreateTrustline.jsx # ← Crear trustline
│   │   └── Spinner.jsx        # ← Loading spinner
│   │
│   └── lib/
│       ├── supabase.js        # ← Cliente de Supabase
│       └── constants.js       # ← Constantes (assets, issuers)
│
├── public/
│   └── (imágenes si quieres)
│
├── .env.local                 # ← Variables de entorno
├── package.json
├── next.config.js
└── README.md
```

Crear carpetas:

```bash
# En terminal de VS Code
mkdir -p src/components src/lib
```

---

## 7. CONFIGURACIÓN DE SUPABASE

### Paso 1: Crear Proyecto en Supabase

1. Ve a https://supabase.com
2. Click en "Start your project"
3. Crea una cuenta (GitHub recomendado)
4. Click en "New Project"
5. Configuración:
   - **Name:** dapp-stellar-assets
   - **Database Password:** (genera una fuerte, guárdala)
   - **Region:** South America (más cercana)
   - **Plan:** Free
6. Click en "Create new project"
7. Espera 1-2 minutos a que se cree

### Paso 2: Obtener Credenciales

1. En tu proyecto, ve a **Settings** (⚙️) → **API**
2. Copia estos valores:
   - **Project URL:** `https://xxxxxx.supabase.co`
   - **anon public key:** `eyJhbGc...`

3. En VS Code, crea `.env.local` en la raíz:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

⚠️ **IMPORTANTE:**
- NO subas `.env.local` a GitHub
- Agrega a `.gitignore` (ya debería estar)

### Paso 3: Crear Tablas

1. En Supabase, ve a **SQL Editor**
2. Click en "New Query"
3. Pega este código:

```sql
-- Tabla para guardar trustlines creadas
CREATE TABLE trustlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(56) NOT NULL,        -- Public key del usuario
  asset_code VARCHAR(12) NOT NULL,     -- Ej: USDC
  asset_issuer VARCHAR(56) NOT NULL,   -- Ej: GA5ZSE...
  trust_limit DECIMAL DEFAULT 10000,   -- Límite de la trustline
  tx_hash VARCHAR(64),                 -- Hash de la transacción
  status TEXT DEFAULT 'active',        -- Estado: active, removed
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para buscar rápido por usuario
CREATE INDEX idx_trustlines_user ON trustlines(user_id);
CREATE INDEX idx_asset_code ON trustlines(asset_code);
CREATE INDEX idx_status ON trustlines(status);

-- Tabla para guardar transacciones (opcional, para features futuras)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(56) NOT NULL,
  tx_type VARCHAR(50),                 -- Ej: 'payment', 'trustline'
  tx_hash VARCHAR(64),
  source_asset VARCHAR(12),
  dest_asset VARCHAR(12),
  amount DECIMAL,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_tx_type ON transactions(tx_type);

-- Habilitar RLS (Row Level Security)
ALTER TABLE trustlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Política: Usuarios pueden ver sus propios datos
CREATE POLICY "Users can view own trustlines"
ON trustlines FOR SELECT
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own trustlines"
ON trustlines FOR INSERT
WITH CHECK (auth.uid()::text = user_id);
```

4. Click en "Run"
5. Verifica que las tablas se crearon: **Table Editor** → deberías ver `trustlines` y `transactions`

### Paso 4: Cliente de Supabase

Crea `src/lib/supabase.js`:

```javascript
// src/lib/supabase.js

// Importar cliente de Supabase
import { createClient } from '@supabase/supabase-js';

// Obtener credenciales de variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validar que las credenciales existen
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials in .env.local');
}

// Crear y exportar cliente
// Este cliente se usará en todos los componentes
export const supabase = createClient(supabaseUrl, supabaseKey);
```

### Paso 5: Archivo de Constantes

Crea `src/lib/constants.js`:

```javascript
// src/lib/constants.js

/**
 * Constantes de Assets para la dApp
 * 
 * IMPORTANTE: Estos issuers son para TESTNET
 * Para mainnet, debes cambiar los issuers
 */

// ⚠️ IMPORTANTE: Este es el issuer CORRECTO de USDC para TESTNET
export const USDC_TESTNET = {
  code: 'USDC',
  issuer: 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5'
};

// Para referencia: USDC en MAINNET (NO usar en esta clase)
export const USDC_MAINNET = {
  code: 'USDC',
  issuer: 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'
};

// Otros assets útiles en testnet
export const EURC_TESTNET = {
  code: 'EURC',
  issuer: 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5'
};

// Horizon endpoints
export const HORIZON_URLS = {
  testnet: 'https://horizon-testnet.stellar.org',
  mainnet: 'https://horizon.stellar.org'
};

// Network passphrases
export const NETWORK_PASSPHRASES = {
  testnet: 'Test SDF Network ; September 2015',
  mainnet: 'Public Global Stellar Network ; September 2015'
};
```

---

## 8. COMPONENTES FRONTEND

### 8.1 Spinner.jsx (Helper)

Este componente muestra un indicador de carga animado.

```javascript
// src/components/Spinner.jsx

/**
 * Componente Spinner
 * 
 * Propósito: Mostrar un indicador de carga animado
 * 
 * No recibe props - es un componente puro
 */
export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      {/* 
        Spinner animado con Tailwind:
        - w-6 h-6: Tamaño 24px
        - border-4: Borde grueso
        - border-blue-500: Color azul
        - border-t-transparent: Top transparente (crea efecto de rotación)
        - rounded-full: Círculo perfecto
        - animate-spin: Animación de rotación (built-in de Tailwind)
      */}
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
```

---

### 8.2 WalletConnect.jsx

Este componente conecta la wallet Freighter del usuario.

```javascript
// src/components/WalletConnect.jsx

'use client'; // Necesario para Next.js App Router (componente del cliente)

import { useState, useEffect } from 'react';
// Importar funciones de Freighter API
import { isConnected, getPublicKey } from '@stellar/freighter-api';

/**
 * Componente WalletConnect
 * 
 * Propósito: Conectar la wallet Freighter del usuario
 * 
 * Props:
 * - onConnect: Función callback que se llama cuando la wallet se conecta
 *   Recibe la public key como argumento
 */
export default function WalletConnect({ onConnect }) {
  // Estado para guardar la public key del usuario
  const [publicKey, setPublicKey] = useState('');
  
  // Estado para mostrar loading
  const [loading, setLoading] = useState(false);
  
  // Estado para mostrar errores
  const [error, setError] = useState(null);

  /**
   * useEffect: Se ejecuta cuando el componente se monta
   * Verifica si Freighter ya está conectado automáticamente
   */
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Verificar si Freighter está instalado y conectado
        if (await isConnected()) {
          const key = await getPublicKey();
          setPublicKey(key);
          onConnect(key);
        }
      } catch (err) {
        // No mostrar error si simplemente no está conectado
        console.error('Freighter no disponible o no conectado', err);
      }
    };
    
    checkConnection();
  }, [onConnect]); // Dependencia correcta

  /**
   * Función para conectar la wallet manualmente
   * Se ejecuta cuando el usuario hace click en el botón
   */
  const connectWallet = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Verificar que window.freighter existe (extensión instalada)
      if (!window.freighter) {
        throw new Error(
          'Freighter Wallet no está instalada. Descárgala desde https://freighter.app'
        );
      }
      
      // Solicitar acceso a la public key
      // Esto abre un popup de Freighter pidiendo permiso
      const key = await getPublicKey();
      
      // Guardar public key en el estado
      setPublicKey(key);
      
      // Notificar al componente padre
      onConnect(key);
      
    } catch (err) {
      // Manejar error y mostrarlo al usuario
      setError(err.message);
      console.error('Error connecting wallet:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Función helper para formatear la public key
   * Muestra solo primeros 4 y últimos 4 caracteres
   * Ejemplo: GABC...XYZ9
   */
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  // 🌟 MEJORA DE ORO #3: Copiar Public Key
  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicKey);
    // Opcional: Mostrar mensaje de confirmación
    alert('Public key copiada al portapapeles!');
  };

  // ========== RENDER DEL COMPONENTE ==========
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Título */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        🔗 Conectar Wallet
      </h2>
      
      {/* Mostrar error si existe */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded">
          <p className="text-red-700 text-sm">❌ {error}</p>
        </div>
      )}
      
      {/* Condicional: ¿Ya está conectado? */}
      {!publicKey ? (
        /* NO conectado: Mostrar botón */
        <div>
          <button
            onClick={connectWallet}
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg 
                       hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed
                       transition-colors"
          >
            {loading ? '⏳ Conectando...' : '🔗 Conectar Freighter'}
          </button>
          
          {/* Link para descargar Freighter si no la tiene */}
          <p className="text-sm text-gray-500 mt-3 text-center">
            ¿No tienes Freighter?{' '}
            <a 
              href="https://www.freighter.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Descárgala aquí
            </a>
          </p>
        </div>
      ) : (
        /* SÍ conectado: Mostrar public key */
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-green-800 font-bold mb-2">
            ✅ Wallet Conectada
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-mono break-all">
                {formatAddress(publicKey)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Public Key: {publicKey}
              </p>
            </div>
            {/* 🌟 MEJORA DE ORO #3: Botón Copiar */}
            <button
              onClick={copyToClipboard}
              className="ml-2 px-3 py-1 text-xs text-blue-600 hover:bg-blue-100 rounded"
              title="Copiar public key"
            >
              📋 Copiar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

**¿Qué hace este componente?**

1. Verifica si Freighter está instalado
2. Pide permiso para acceder a la public key
3. Guarda la public key en el estado
4. Notifica al componente padre (page.jsx) con `onConnect`
5. Muestra si está conectado o no
6. 🌟 **MEJORA DE ORO:** Permite copiar la public key con un click

---

### 8.3 AssetBalance.jsx

Este componente muestra el balance de un asset (USDC).

```javascript
// src/components/AssetBalance.jsx

'use client';

import { useState, useEffect } from 'react';
// Importar Stellar SDK para consultar la red
import { Server } from 'stellar-sdk';
// Importar constantes
import { HORIZON_URLS } from '../lib/constants';
// Importar Spinner
import Spinner from './Spinner';

/**
 * Componente AssetBalance
 * 
 * Propósito: Mostrar el balance de un asset nativo
 * 
 * Props:
 * - publicKey: Public key del usuario
 * - asset: Objeto con { code, issuer } del asset a consultar
 */
export default function AssetBalance({ publicKey, asset }) {
  // Estado para guardar el balance
  const [balance, setBalance] = useState(null);
  
  // Estado para mostrar loading
  const [loading, setLoading] = useState(false);
  
  // Estado para errores
  const [error, setError] = useState(null);

  /**
   * Función para consultar el balance desde Stellar
   */
  const fetchBalance = async () => {
    // Si no hay public key, no hacer nada
    if (!publicKey) {
      setError('Conecta tu wallet primero');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Crear conexión al servidor de Stellar (testnet)
      const server = new Server(HORIZON_URLS.testnet);
      
      // Cargar la cuenta desde la red
      // Esto trae TODOS los datos de la cuenta
      const account = await server.loadAccount(publicKey);
      
      // account.balances es un array con todos los assets que la cuenta tiene
      // Ejemplo:
      // [
      //   { asset_type: 'native', balance: '100.0000000' },  // XLM
      //   { asset_code: 'USDC', asset_issuer: 'GBBD47...', balance: '50.0000000' },
      //   { asset_code: 'EURC', asset_issuer: 'GBBD47...', balance: '25.0000000' }
      // ]
      
      // ⚠️ CORRECCIÓN CRÍTICA: Excluir native (XLM)
      // Buscar el asset específico que queremos
      const assetBalance = account.balances.find(b => 
        b.asset_code === asset.code && 
        b.asset_issuer === asset.issuer &&
        b.asset_type !== 'native'  // ← NUNCA olvidar esto
      );
      
      // Si encontramos el balance, guardarlo
      // Si no, poner '0' (no tiene trustline o balance vacío)
      setBalance(assetBalance ? assetBalance.balance : '0');
      
    } catch (err) {
      // Manejar diferentes tipos de errores
      if (err.response && err.response.status === 404) {
        // Cuenta no existe (no está fondeada)
        setError('Cuenta no encontrada. ¿Tienes XLM en testnet?');
      } else {
        // Otro error
        setError(`Error: ${err.message}`);
      }
      console.error('Error fetching balance:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * useEffect: Consultar balance automáticamente cuando cambia publicKey o asset
   */
  useEffect(() => {
    if (publicKey) {
      fetchBalance();
    }
  }, [publicKey, asset.code, asset.issuer]); // Dependencias: recarga si cambia el asset

  // ========== RENDER DEL COMPONENTE ==========
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Título */}
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        💰 Balance de {asset.code}
      </h2>
      
      {/* 🌟 MEJORA DE ORO #2: Mostrar issuer con tooltip */}
      <div className="mb-4 relative group">
        <p className="text-sm text-gray-500">
          Issuer: <span className="font-mono text-xs">{asset.issuer.slice(0, 8)}...</span>
        </p>
        {/* Tooltip con información completa */}
        <div className="hidden group-hover:block absolute z-10 bg-black text-white text-xs p-2 rounded mt-1 max-w-xs break-all">
          {asset.code} Testnet - Circle (Oficial)
          <br />
          <span className="text-gray-300">{asset.issuer}</span>
        </div>
      </div>
      
      {/* Mostrar error si existe */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded">
          <p className="text-red-700 text-sm">❌ {error}</p>
        </div>
      )}
      
      {/* Botón para refrescar balance */}
      <button
        onClick={fetchBalance}
        disabled={loading || !publicKey}
        className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg 
                   hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed
                   transition-colors mb-4 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Spinner />
            <span>Cargando...</span>
          </>
        ) : (
          '🔄 Actualizar Balance'
        )}
      </button>
      
      {/* Mostrar balance */}
      {balance !== null && (
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <p className="text-4xl font-bold text-blue-600 text-center">
            {balance} {asset.code}
          </p>
          
          {/* Mensaje si el balance es 0 */}
          {balance === '0' && (
            <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
              <p className="text-sm text-gray-600 text-center">
                No tienes {asset.code}. 
              </p>
              <p className="text-xs text-gray-500 text-center mt-2">
                💡 Tip: Crea una trustline primero, luego usa Stellar Laboratory 
                para enviar {asset.code} de prueba a tu cuenta.
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Info adicional */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>💡 ¿Cómo obtener {asset.code} en testnet?</strong>
        </p>
        <ol className="text-xs text-gray-600 mt-2 space-y-1 list-decimal list-inside">
          <li>Ve a <a href="https://laboratory.stellar.org" target="_blank" className="text-blue-500 underline">Stellar Laboratory</a></li>
          <li>Crea otra cuenta de prueba con Friendbot</li>
          <li>Crea trustline para {asset.code} en esa cuenta</li>
          <li>Usa "Build Transaction" para enviar {asset.code} a tu cuenta</li>
        </ol>
      </div>
    </div>
  );
}
```

**¿Qué hace este componente?**

1. Se conecta a Stellar Horizon API (testnet)
2. Carga la cuenta del usuario con su public key
3. ⚠️ **CRÍTICO:** Filtra el asset específico excluyendo XLM nativo
4. Muestra el balance o '0' si no tiene
5. Tiene botón para refrescar manualmente
6. 🌟 **MEJORA DE ORO:** Muestra tooltip con información del issuer

---

### 8.4 CreateTrustline.jsx

Este es el componente más complejo. Crea una trustline usando Freighter.

```javascript
// src/components/CreateTrustline.jsx

'use client';

import { useState } from 'react';
// Importar clases necesarias de Stellar SDK
import { 
  Server,           // Para conectar a Stellar
  TransactionBuilder, // Para construir transacciones
  Operation,        // Para operaciones (ChangeTrust)
  Asset,            // Para definir assets
  Networks          // Para especificar red (testnet/mainnet)
} from 'stellar-sdk';
// Importar Freighter API para firmar
import { signTransaction, getPublicKey } from '@stellar/freighter-api';
// Importar cliente de Supabase
import { supabase } from '../lib/supabase';
// Importar constantes
import { HORIZON_URLS } from '../lib/constants';
// Importar Spinner
import Spinner from './Spinner';

/**
 * Componente CreateTrustline
 * 
 * Propósito: Crear una trustline para un asset nativo
 * 
 * Props:
 * - asset: Objeto { code, issuer } del asset
 * - onSuccess: Callback cuando trustline se crea exitosamente
 */
export default function CreateTrustline({ asset, onSuccess }) {
  // Estado para mostrar loading
  const [loading, setLoading] = useState(false);
  
  // Estado para mensajes de éxito/error
  const [status, setStatus] = useState({ type: '', message: '' });
  
  // Estado para saber si la trustline ya existe
  const [trustlineExists, setTrustlineExists] = useState(false);
  
  // Estado para guardar el hash de la transacción
  const [txHash, setTxHash] = useState('');

  /**
   * Función para verificar si la trustline ya existe
   * Se llama antes de intentar crearla
   */
  const checkExistingTrustline = async (publicKey) => {
    try {
      // Verificar en Stellar Network
      const server = new Server(HORIZON_URLS.testnet);
      const account = await server.loadAccount(publicKey);
      
      // Buscar si ya existe el asset en los balances
      const existsOnChain = account.balances.some(
        b => b.asset_code === asset.code && 
             b.asset_issuer === asset.issuer &&
             b.asset_type !== 'native'  // ← Importante
      );
      
      if (existsOnChain) {
        return { exists: true, source: 'blockchain' };
      }
      
      // Si no existe en blockchain, verificar en Supabase
      const { data, error } = await supabase
        .from('trustlines')
        .select('*')
        .eq('user_id', publicKey)
        .eq('asset_code', asset.code)
        .eq('asset_issuer', asset.issuer)
        .eq('status', 'active')
        .limit(1);
      
      if (error) {
        console.error('Error checking Supabase:', error);
        return { exists: false, source: null };
      }
      
      if (data && data.length > 0) {
        return { exists: true, source: 'database' };
      }
      
      return { exists: false, source: null };
      
    } catch (err) {
      console.error('Error checking trustline:', err);
      return { exists: false, source: null };
    }
  };

  /**
   * Función principal para crear la trustline
   */
  const createTrustline = async () => {
    setLoading(true);
    setStatus({ type: '', message: '' });
    setTxHash('');

    try {
      // ========== PASO 1: OBTENER PUBLIC KEY ==========
      const publicKey = await getPublicKey();
      
      if (!publicKey) {
        throw new Error('No se pudo obtener la public key');
      }

      // ========== PASO 1.5: VERIFICAR SI YA EXISTE ==========
      const { exists, source } = await checkExistingTrustline(publicKey);
      
      if (exists) {
        setTrustlineExists(true);
        setStatus({
          type: 'warning',
          message: `⚠️ Ya tienes una trustline para ${asset.code}. No necesitas crear otra.`
        });
        setLoading(false);
        return;
      }

      // ========== PASO 2: CONECTAR A STELLAR ==========
      const server = new Server(HORIZON_URLS.testnet);
      
      // Cargar la cuenta para obtener su sequence number
      const account = await server.loadAccount(publicKey);

      // ========== PASO 3: DEFINIR EL ASSET ==========
      const stellarAsset = new Asset(asset.code, asset.issuer);

      // ========== PASO 4: CONSTRUIR LA TRANSACCIÓN ==========
      const transaction = new TransactionBuilder(account, {
        // Fee: 100 stroops = 0.00001 XLM
        fee: '100',
        
        // Network: TESTNET (MUY IMPORTANTE)
        // ⚠️ CRÍTICO: Network passphrase correcto
        networkPassphrase: Networks.TESTNET
        // Networks.TESTNET = "Test SDF Network ; September 2015"
        // Networks.PUBLIC  = "Public Global Stellar Network ; September 2015"
      })
        // Agregar la operación ChangeTrust
        .addOperation(
          Operation.changeTrust({
            asset: stellarAsset,    // El asset para crear trustline
            limit: '10000'          // Límite: máximo que quieres tener
          })
        )
        // Timeout: Transacción expira en 30 segundos
        .setTimeout(30)
        // Construir (prepara para firmar)
        .build();

      // ========== PASO 5: FIRMAR CON FREIGHTER ==========
      // Convertir a XDR (formato que Freighter entiende)
      const xdr = transaction.toXDR();
      
      // Pedir a Freighter que firme (abre popup)
      const signedXDR = await signTransaction(xdr, {
        network: 'TESTNET',
        networkPassphrase: Networks.TESTNET
      });

      // ========== PASO 6: ENVIAR A STELLAR ==========
      // Reconstruir transacción desde XDR firmado
      const signedTransaction = TransactionBuilder.fromXDR(
        signedXDR,
        Networks.TESTNET
      );
      
      // Enviar a la red (3-5 segundos)
      const result = await server.submitTransaction(signedTransaction);

      // Guardar hash de la transacción
      setTxHash(result.hash);

      // ========== PASO 7: GUARDAR EN SUPABASE ==========
      const { error: dbError } = await supabase
        .from('trustlines')
        .insert({
          user_id: publicKey,
          asset_code: asset.code,
          asset_issuer: asset.issuer,
          trust_limit: 10000,
          tx_hash: result.hash,
          status: 'active'
        });

      if (dbError) {
        console.error('Error saving to Supabase:', dbError);
        // No lanzamos error porque la trustline SÍ se creó en Stellar
      }

      // ========== PASO 8: NOTIFICAR ÉXITO ==========
      setStatus({
        type: 'success',
        message: `✅ Trustline creada exitosamente! Ahora puedes recibir ${asset.code}.`
      });
      
      setTrustlineExists(true);
      
      // Llamar callback si existe
      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {
      // ========== MANEJO DE ERRORES ==========
      console.error('Error creating trustline:', err);
      
      let errorMessage = 'Error desconocido';
      
      if (err.message.includes('User declined')) {
        errorMessage = 'Rechazaste la transacción en Freighter';
      } else if (err.response && err.response.data) {
        const resultCode = err.response.data.extras?.result_codes?.operations?.[0];
        
        switch (resultCode) {
          case 'op_low_reserve':
            errorMessage = 'Balance insuficiente. Necesitas al menos 0.5 XLM más para la trustline.';
            break;
          case 'op_line_full':
            errorMessage = 'Ya tienes esta trustline creada.';
            setTrustlineExists(true);
            break;
          case 'op_no_issuer':
            errorMessage = 'El issuer no existe o es inválido. Verifica el issuer en stellar.expert';
            break;
          case 'op_no_trust':
            errorMessage = 'No tienes trustline para este asset. Créala primero.';
            break;
          case 'op_underfunded':
            errorMessage = 'Fondos insuficientes para pagar la comisión (fee).';
            break;
          default:
            errorMessage = `Error de Stellar: ${resultCode || 'Desconocido'}`;
        }
      } else {
        errorMessage = err.message;
      }
      
      setStatus({
        type: 'error',
        message: `❌ ${errorMessage}`
      });
      
    } finally {
      setLoading(false);
    }
  };

  // ========== RENDER DEL COMPONENTE ==========
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Título */}
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        ✅ Crear Trustline
      </h2>
      
      <p className="text-sm text-gray-600 mb-4">
        Esto te permitirá recibir y enviar <strong>{asset.code}</strong>
      </p>
      
      {/* Warning sobre el costo */}
      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-4">
        <p className="text-sm text-yellow-800">
          ⚠️ <strong>Costo:</strong> 0.5 XLM de base reserve (recuperable si eliminas la trustline)
        </p>
      </div>
      
      {/* Mostrar mensaje de status */}
      {status.message && (
        <div className={`p-3 rounded-lg mb-4 ${
          status.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-800'
            : status.type === 'warning'
            ? 'bg-yellow-100 border border-yellow-400 text-yellow-800'
            : 'bg-red-100 border border-red-400 text-red-800'
        }`}>
          <p className="text-sm">{status.message}</p>
          
          {/* 🌟 MEJORA DE ORO #1: Link a Stellar Expert */}
          {status.type === 'success' && txHash && (
            <a
              href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-xs mt-2 inline-block"
            >
              🔍 Ver transacción en Stellar Expert
            </a>
          )}
        </div>
      )}
      
      {/* Botón para crear trustline */}
      <button
        onClick={createTrustline}
        disabled={loading || trustlineExists}
        className="w-full px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg 
                   hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed
                   transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Spinner />
            <span>Creando...</span>
          </>
        ) : trustlineExists ? (
          '✅ Trustline Ya Existe'
        ) : (
          '✅ Crear Trustline'
        )}
      </button>
      
      {/* Información adicional */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>¿Qué pasa cuando creas una trustline?</strong>
        </p>
        <ul className="text-xs text-gray-600 mt-2 space-y-1 list-disc list-inside">
          <li>Se "congela" 0.5 XLM (base reserve)</li>
          <li>Puedes recibir hasta 10,000 {asset.code}</li>
          <li>La transacción se registra en blockchain</li>
          <li>Freighter te pedirá confirmar (con tu secret key)</li>
          <li>El sistema verifica que no exista una trustline duplicada</li>
        </ul>
      </div>
    </div>
  );
}
```

**¿Qué hace este componente?**

1. Verifica si la trustline ya existe (previene duplicados)
2. Obtiene la public key del usuario (Freighter)
3. Carga la cuenta desde Stellar
4. Construye una transacción con `ChangeTrust` operation
5. Pide a Freighter que la firme (popup)
6. Envía la transacción firmada a Stellar
7. Espera confirmación (3-5 segundos)
8. Guarda metadata en Supabase
9. Muestra mensaje de éxito/error/warning
10. 🌟 **MEJORA DE ORO:** Link directo a Stellar Expert para ver la transacción

---

## 9. PÁGINA PRINCIPAL

Ahora vamos a conectar todo en la página principal.

```javascript
// src/app/page.jsx

'use client';

import { useState, useEffect } from 'react';
// Importar nuestros componentes
import WalletConnect from '../components/WalletConnect';
import AssetBalance from '../components/AssetBalance';
import CreateTrustline from '../components/CreateTrustline';

/**
 * Página Principal de la dApp
 * 
 * Esta página coordina todos los componentes
 */
export default function Home() {
  // Estado para guardar la public key cuando el usuario conecta
  const [publicKey, setPublicKey] = useState('');
  
  // Estado para forzar refresh del balance después de crear trustline
  const [refreshKey, setRefreshKey] = useState(0);

  // Configuración del asset USDC en testnet
  // IMPORTANTE: Este issuer es para TESTNET, no mainnet
  const USDC_TESTNET = {
    code: 'USDC',
    issuer: 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5'
  };

  /**
   * Callback cuando la wallet se conecta
   * Se pasa al componente WalletConnect
   */
  const handleWalletConnect = (key) => {
    setPublicKey(key);
    console.log('Wallet connected:', key);
  };

  /**
   * Callback cuando la trustline se crea exitosamente
   * Fuerza un refresh del balance
   */
  const handleTrustlineSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  /**
   * useEffect: Refresh automático del balance cada 10 segundos
   * Solo si hay wallet conectada
   */
  useEffect(() => {
    if (publicKey) {
      const interval = setInterval(() => {
        setRefreshKey(prev => prev + 1);
      }, 10000);  // 10 segundos
      
      return () => clearInterval(interval);  // Cleanup
    }
  }, [publicKey]);

  // ========== RENDER ==========
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🚀 Assets Nativos en Stellar
          </h1>
          <p className="text-gray-600">
            Tu primera dApp de stablecoins en blockchain
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Grid de componentes */}
        <div className="space-y-6">
          
          {/* Componente 1: Conectar Wallet */}
          <WalletConnect onConnect={handleWalletConnect} />
          
          {/* Componentes 2 y 3: Solo mostrar si hay wallet conectada */}
          {publicKey && (
            <>
              {/* Componente 2: Crear Trustline */}
              <CreateTrustline
                asset={USDC_TESTNET}
                onSuccess={handleTrustlineSuccess}
              />
              
              {/* Componente 3: Ver Balance */}
              <AssetBalance
                key={refreshKey} // Force re-mount cuando cambia refreshKey
                publicKey={publicKey}
                asset={USDC_TESTNET}
              />
            </>
          )}
        </div>

        {/* Instrucciones para el usuario */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-lg border-2 border-yellow-200">
          <h3 className="font-bold text-lg mb-3 text-gray-800">
            📝 Instrucciones:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>
              <strong>Instala Freighter:</strong>{' '}
              <a 
                href="https://www.freighter.app" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://www.freighter.app
              </a>
            </li>
            <li>
              <strong>Configura Freighter en testnet</strong> (Settings → Network → Testnet)
            </li>
            <li>
              <strong>Obtén XLM gratis:</strong>{' '}
              <a 
                href="https://laboratory.stellar.org/#account-creator" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://laboratory.stellar.org/#account-creator
              </a>
            </li>
            <li><strong>Conecta tu wallet</strong> con el botón de arriba</li>
            <li><strong>Crea una trustline</strong> para USDC</li>
            <li><strong>Verifica tu balance</strong> (debería aparecer 0 USDC)</li>
          </ol>
          
          <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-xs text-blue-800">
              💡 <strong>Tip:</strong> Puedes usar{' '}
              <a 
                href="https://laboratory.stellar.org" 
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Stellar Laboratory
              </a>
              {' '}para enviar USDC de testnet a tu cuenta y probar que funciona.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto px-6 py-8 text-center text-sm text-gray-500">
        <p>Construido con 💙 por Tiburonas Builders</p>
        <p className="mt-2">
          Clase 7: Assets Nativos en Stellar
        </p>
      </div>
    </main>
  );
}
```

**¿Qué hace esta página?**

1. Coordina los 3 componentes principales
2. Pasa callbacks entre componentes
3. Muestra/oculta componentes según el estado
4. Incluye instrucciones para el usuario
5. Tiene layout bonito con Tailwind
6. **MEJORA:** Refresh automático del balance cada 10 segundos

---

## 10. DEPLOY EN VERCEL

### Paso 1: Preparar para Deploy

```bash
# En terminal de VS Code

# Crear archivo .gitignore (si no existe)
echo "node_modules/
.next/
.env.local
.DS_Store" > .gitignore

# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Hacer primer commit
git commit -m "Initial commit: dApp Assets Nativos"
```

### Paso 2: Subir a GitHub

1. Ve a github.com y crea un repo nuevo
2. **Nombre:** dapp-stellar-assets
3. **Descripción:** dApp para Assets Nativos en Stellar - Clase 7
4. Público o Privado (tú eliges)
5. NO inicialices con README (ya lo tienes)
6. Click en "Create repository"

```bash
# En terminal de VS Code

# Agregar remote (reemplaza con TU URL)
git remote add origin https://github.com/TU-USUARIO/dapp-stellar-assets.git

# Push
git branch -M main
git push -u origin main
```

### Paso 3: Deploy en Vercel

#### Opción A: Desde el Dashboard

1. Ve a https://vercel.com
2. Login con GitHub
3. Click en "New Project"
4. Selecciona tu repo `dapp-stellar-assets`
5. Click en "Import"
6. En **Environment Variables**, agrega:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGc...
   ```
7. Click en "Deploy"
8. Espera 1-2 minutos
9. ✅ Tu app está en vivo!

#### Opción B: Desde la Terminal

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Seguir instrucciones:
# - Link to existing project? No
# - Project name? dapp-stellar-assets
# - Directory? ./
# - Override settings? No

# Después de deployment, agregar env vars:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Redeploy con las vars
vercel --prod
```

### Paso 4: Verificar que Funciona

1. Abre la URL que Vercel te dio (ej: `https://dapp-stellar-assets.vercel.app`)
2. Conecta tu wallet
3. Crea trustline
4. Verifica balance

**Si algo no funciona:**

- Revisa la consola del navegador (F12)
- Revisa los logs en Vercel Dashboard
- Verifica que las env vars estén correctas

---

## 11. LAS 3 MEJORAS DE ORO

Estas mejoras opcionales llevan tu dApp al siguiente nivel de profesionalismo.

### 🌟 MEJORA #1: Link a Stellar Expert

**Propósito:** Dar credibilidad instantánea mostrando la transacción en el explorador oficial.

**Implementación:**

Ya está integrada en `CreateTrustline.jsx`. Cuando la transacción es exitosa, se muestra un link:

```jsx
{status.type === 'success' && txHash && (
  <a
    href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline text-xs mt-2 inline-block"
  >
    🔍 Ver transacción en Stellar Expert
  </a>
)}
```

**Beneficios:**
- ✅ Transparencia total
- ✅ Usuario puede verificar la transacción
- ✅ Credibilidad profesional

---

### 🌟 MEJORA #2: Tooltip de Issuer

**Propósito:** Evitar errores de issuer mostrando información oficial.

**Implementación:**

Ya está integrada en `AssetBalance.jsx`:

```jsx
<div className="mb-4 relative group">
  <p className="text-sm text-gray-500">
    Issuer: <span className="font-mono text-xs">{asset.issuer.slice(0, 8)}...</span>
  </p>
  {/* Tooltip con información completa */}
  <div className="hidden group-hover:block absolute z-10 bg-black text-white text-xs p-2 rounded mt-1 max-w-xs break-all">
    {asset.code} Testnet - Circle (Oficial)
    <br />
    <span className="text-gray-300">{asset.issuer}</span>
  </div>
</div>
```

**Beneficios:**
- ✅ Usuario sabe que es el issuer oficial
- ✅ Previene errores de issuer incorrecto
- ✅ UX profesional con hover states

---

### 🌟 MEJORA #3: Botón Copiar Public Key

**Propósito:** UX impecable permitiendo copiar la dirección con un click.

**Implementación:**

Ya está integrada en `WalletConnect.jsx`:

```jsx
const copyToClipboard = () => {
  navigator.clipboard.writeText(publicKey);
  alert('Public key copiada al portapapeles!');
};

// En el render:
<button
  onClick={copyToClipboard}
  className="ml-2 px-3 py-1 text-xs text-blue-600 hover:bg-blue-100 rounded"
  title="Copiar public key"
>
  📋 Copiar
</button>
```

**Mejora opcional:** Usar un toast en vez de `alert()`:

```bash
npm install react-hot-toast
```

```jsx
import toast from 'react-hot-toast';

const copyToClipboard = () => {
  navigator.clipboard.writeText(publicKey);
  toast.success('Public key copiada!');
};
```

**Beneficios:**
- ✅ Usuario puede copiar fácilmente su dirección
- ✅ Útil para compartir o pegar en otras apps
- ✅ Evita errores de tipeo manual

---

## 12. MANEJO DE ERRORES COMPLETO

### Tabla de Errores Comunes

| Código | Significado | Solución |
|--------|-------------|----------|
| `op_low_reserve` | Balance < 1.5 XLM | Obtén más XLM del faucet |
| `op_line_full` | Trustline ya existe | No crear otra |
| `op_no_issuer` | Issuer inválido | Verifica issuer en stellar.expert |
| `op_no_trust` | Sin trustline | Crea trustline primero |
| `op_underfunded` | Sin XLM para fee | Obtén 0.01 XLM mínimo |
| `tx_bad_seq` | Sequence incorrecto | Refresca y reintenta |
| `User declined` | Usuario rechazó en Freighter | Intentar de nuevo |

### Código Completo de Manejo de Errores

Este código ya está implementado en `CreateTrustline.jsx`:

```javascript
catch (err) {
  console.error('Error creating trustline:', err);
  
  let errorMessage = 'Error desconocido';
  
  // Error 1: Usuario rechazó en Freighter
  if (err.message.includes('User declined')) {
    errorMessage = '❌ Rechazaste la transacción en Freighter';
  } 
  
  // Error 2: Errores de Stellar Network
  else if (err.response && err.response.data) {
    const resultCode = err.response.data.extras?.result_codes?.operations?.[0];
    
    switch (resultCode) {
      case 'op_low_reserve':
        errorMessage = '❌ Balance insuficiente. Necesitas al menos 0.5 XLM más.';
        break;
      case 'op_line_full':
        errorMessage = '⚠️ Ya tienes esta trustline creada.';
        setTrustlineExists(true);
        break;
      case 'op_no_issuer':
        errorMessage = '❌ El issuer no existe o es inválido. Verifica en stellar.expert';
        break;
      case 'op_no_trust':
        errorMessage = '❌ No tienes trustline para este asset. Créala primero.';
        break;
      case 'op_underfunded':
        errorMessage = '❌ Fondos insuficientes para pagar la comisión.';
        break;
      default:
        errorMessage = `❌ Error de Stellar: ${resultCode || 'Desconocido'}`;
    }
  } 
  
  // Error 3: Otros errores
  else {
    errorMessage = `❌ ${err.message}`;
  }
  
  setStatus({
    type: 'error',
    message: errorMessage
  });
}
```

---

## 13. TESTING Y DEBUGGING

### Checklist de Testing

```
□ La página carga sin errores
□ Se puede conectar Freighter
□ Aparece la public key
□ El botón "Crear Trustline" funciona
□ Freighter abre el popup para firmar
□ Después de confirmar, aparece mensaje de éxito
□ El balance se actualiza
□ Los datos se guardan en Supabase
□ El link a Stellar Expert funciona
□ El botón copiar funciona
□ El tooltip del issuer funciona
```

### Ver Datos en Supabase

1. Ve a tu proyecto en Supabase
2. **Table Editor** → **trustlines**
3. Deberías ver los registros creados con:
   - `user_id`: Tu public key
   - `asset_code`: USDC
   - `asset_issuer`: GBBD47...
   - `tx_hash`: Hash de la transacción
   - `status`: active

### Debugging Común

#### Problema: "Freighter not found"

**Solución:**
1. Verifica que Freighter esté instalado
2. Recarga la página
3. Verifica en extensiones del navegador

#### Problema: "Account not found"

**Solución:**
1. Ve a https://laboratory.stellar.org/#account-creator
2. Pega tu public key
3. Click "Get test network lumens"
4. Espera 10 segundos
5. Intenta de nuevo

#### Problema: "op_low_reserve"

**Solución:**
1. Necesitas al menos 1.5 XLM total
2. Ve al faucet y obtén más XLM
3. Verifica tu balance en Freighter

#### Problema: "Network error"

**Solución:**
1. Verifica que estés en testnet (no mainnet)
2. Verifica el `networkPassphrase` en el código
3. Revisa la consola del navegador (F12)

---

## 14. FAQ Y TROUBLESHOOTING

### Q1: ¿Por qué no usar MetaMask?

**A:** MetaMask es para Ethereum/EVM chains. Stellar usa su propio sistema de cuentas. Freighter es el "MetaMask de Stellar".

---

### Q2: ¿Puedo crear mi propio stablecoin?

**A:** ¡Sí! Solo necesitas:

1. Una cuenta emisora
2. Definir `Asset('MiToken', 'GXXX...')`
3. Otros crean trustline
4. Tú envías tokens

Sin contrato, sin deployment.

---

### Q3: ¿Cómo paso de testnet a mainnet?

**A:** Cambiar 3 cosas:

1. Horizon URL → `horizon.stellar.org`
2. Network → `Networks.PUBLIC`
3. Issuer → El de mainnet (verificar en stellar.expert)

**Ejemplo:**

```javascript
// TESTNET
const server = new Server('https://horizon-testnet.stellar.org');
networkPassphrase: Networks.TESTNET
issuer: 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5'

// MAINNET
const server = new Server('https://horizon.stellar.org');
networkPassphrase: Networks.PUBLIC
issuer: 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'
```

---

### Q4: ¿Cuánto cuesta en mainnet?

**A:** Igual que testnet en proporción:

- 0.00001 XLM por transacción
- 0.5 XLM de reserve por trustline

**Ejemplo:** Con 10 XLM puedes hacer ~999,900 transacciones

---

### Q5: ¿Esto funciona con cualquier asset?

**A:** Sí, con CUALQUIER Asset Nativo de Stellar:

- USDC (Circle)
- EURC (Circle)
- Cualquier token custom

Solo cambia el código y issuer.

---

### Q6: ¿Qué pasa si elimino una trustline?

**A:** Recuperas los 0.5 XLM que estaban congelados. PERO:

- ⚠️ Debes tener balance 0 del asset
- ⚠️ No podrás recibir ese asset hasta crear trustline de nuevo

---

### Q7: ¿Puedo tener múltiples trustlines?

**A:** Sí, puedes tener tantas como quieras. Cada una cuesta 0.5 XLM adicional.

**Ejemplo:**
```
1 XLM base + 0.5 XLM (USDC) + 0.5 XLM (EURC) + 0.5 XLM (BRL) = 2.5 XLM total
```

---

### Q8: ¿Los Assets Nativos tienen gas fees variables?

**A:** NO. En Stellar, el fee es **fijo**:

- 0.00001 XLM por operación
- No importa el monto
- No importa la congestión de red

**Comparación:**

```
Ethereum: $5-$50 por transacción (variable)
Stellar:  $0.000005 por transacción (fijo)
```

---

### Q9: ¿Qué es el "sequence number"?

**A:** Es un contador de transacciones de tu cuenta:

- Empieza en 0
- Se incrementa +1 por cada transacción
- Previene ataques de replay
- Se obtiene automáticamente con `server.loadAccount()`

---

### Q10: ¿Puedo usar esto en producción?

**A:** Sí, pero considera:

1. ✅ Audita el código
2. ✅ Usa mainnet (no testnet)
3. ✅ Maneja errores robustamente
4. ✅ Agrega autenticación si guardas datos sensibles
5. ✅ Usa HTTPS siempre
6. ✅ No expongas claves privadas nunca

---

## 15. RECURSOS Y LINKS ÚTILES

### Documentación Oficial

- **Stellar Developers:** https://developers.stellar.org
- **Stellar SDK Docs:** https://stellar.github.io/js-stellar-sdk/
- **Freighter Docs:** https://docs.freighter.app

### Herramientas

- **Stellar Laboratory:** https://laboratory.stellar.org
  - Build transactions
  - Test endpoints
  - Create accounts

- **Stellar Expert:** https://stellar.expert
  - Explorador de blockchain
  - Ver transacciones
  - Verificar assets

- **Friendbot (Testnet):** https://laboratory.stellar.org/#account-creator
  - Obtener XLM gratis en testnet

### Assets Oficiales

- **USDC Mainnet:**
  - Code: `USDC`
  - Issuer: `GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN`

- **USDC Testnet:**
  - Code: `USDC`
  - Issuer: `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5`

### Comunidad

- **Stellar Discord:** https://discord.gg/stellardev
- **Stellar Stack Exchange:** https://stellar.stackexchange.com
- **GitHub Discussions:** https://github.com/stellar/stellar-protocol/discussions

### Tutoriales Adicionales

- **Issue Assets:** https://developers.stellar.org/docs/issuing-assets
- **Build Apps:** https://developers.stellar.org/docs/building-apps
- **Anchor Integration:** https://developers.stellar.org/docs/anchoring-assets

### Video Tutoriales

- **Stellar Quest:** https://quest.stellar.org

---

## 🎓 CONCLUSIÓN

### ¿Qué Construiste?

Una dApp COMPLETA que:

✅ Maneja Assets Nativos (USDC)  
✅ Se conecta a Freighter  
✅ Crea trustlines en blockchain  
✅ Muestra balances en tiempo real  
✅ Está desplegada en internet  
✅ Tiene las 3 mejoras de oro implementadas  

### Arquitectura Completa

```
FRONTEND (Vercel)
├── WalletConnect → Freighter → Public Key
├── CreateTrustline → Stellar SDK → Transacción → Freighter (firma) → Stellar Network
└── AssetBalance → Stellar SDK → Horizon API → Balance

BACKEND (Supabase)
└── Tablas: trustlines, transactions

BLOCKCHAIN (Stellar)
└── Assets Nativos (protocolo)
```

### Tecnologías Usadas

✅ Next.js: Framework de React  
✅ Tailwind CSS: Estilos  
✅ Stellar SDK: Interacción con blockchain  
✅ Freighter API: Wallet connection  
✅ Supabase: Base de datos  
✅ Vercel: Hosting  

### Lo Más Importante

> **NO usaste contratos Soroban porque no los necesitas.**  
> Los Assets Nativos están en el protocolo mismo.

Tu código solo:

1. Llama operaciones que ya existen (`ChangeTrust`)
2. Firma transacciones con Freighter
3. Consulta datos con Horizon API

Eso es todo. **Simple. Poderoso. Profesional.**

---

## 🦈 ¡LO LOGRASTE!

Ahora eres capaz de:

✅ Explicar qué son los Assets Nativos  
✅ Comparar Ethereum vs Stellar  
✅ Crear trustlines programáticamente  
✅ Integrar Freighter Wallet  
✅ Desplegar dApps en producción  
✅ Manejar errores robustamente  
✅ Implementar mejoras de UX profesionales  

**Eso no es poca cosa. Eso es ser una Tiburona Builder.** 🦈⚡

---

**Versión del documento:** 2.0  
**Última actualización:** 2025  
**Licencia:** MIT  
**Autor:** Tiburonas Builders

---

## APÉNDICE: COMANDOS RÁPIDOS

### Setup Inicial

```bash
npx create-next-app@latest dapp-stellar-assets
cd dapp-stellar-assets
npm install stellar-sdk @supabase/supabase-js @stellar/freighter-api
mkdir -p src/components src/lib
```

### Desarrollo

```bash
npm run dev          # Iniciar servidor desarrollo
npm run build        # Build para producción
npm run start        # Iniciar producción local
npm run lint         # Linter
```

### Git

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin [URL]
git push -u origin main
```

### Vercel

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

---
