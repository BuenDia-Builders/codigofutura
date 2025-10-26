# 💻 CÓDIGO COMPLETO: dApp de Assets Nativos

## ¡HORA DE CONSTRUIR, TIBURONA! 🦈⚡

Esta es la sección más importante. Aquí vas a construir una dApp COMPLETA que maneja Assets Nativos.

No vamos a copiar y pegar sin entender. Cada línea tiene comentarios que explican QUÉ hace y POR QUÉ lo hace.

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Una dApp con estas funcionalidades:

✅ **Conectar Wallet** (Freighter)  
✅ **Ver Balance** de USDC  
✅ **Crear Trustline** para USDC  
✅ **Guardar datos** en Supabase  
✅ **Deploy** en Vercel  

**Resultado final:** Una URL pública donde cualquiera puede probar tu dApp.

---

## ⚠️ PREGUNTA CRÍTICA: ¿POR QUÉ NO USAMOS CONTRATOS SOROBAN?

Esta es LA pregunta que todas se hacen. Vamos a resolverla ahora:

### La Confusión Común

**Pensamiento típico:**
> "Para crear tokens, necesito un contrato inteligente como en Ethereum (ERC-20)"

**Realidad en Stellar:**
> "Los Assets Nativos NO necesitan contratos. Están en el protocolo mismo."

### Comparación: Ethereum vs Stellar

#### ETHEREUM (ERC-20 Tokens)

```solidity
// Necesitas escribir un contrato en Solidity
contract MyToken {
    mapping(address => uint256) balances;
    
    function transfer(address to, uint256 amount) public {
        // 50+ líneas de código
        // Validaciones
        // Event logs
        // etc.
    }
}

// Luego:
// - Compilar contrato
// - Auditar código
// - Pagar gas para deploy ($50-500)
// - Pagar gas por cada transacción ($5-50)
```

**Complejidad:** ALTA  
**Costo:** ALTO  
**Mantenimiento:** Necesitas actualizar contratos

#### STELLAR (Assets Nativos)

```javascript
// No necesitas contrato
// Solo defines el asset:
const USDC = new Asset(
  'USDC',  // código
  'GA5ZSE...'  // issuer
);

// Listo. Ya existe.
// El protocolo maneja todo.
```

**Complejidad:** BAJA  
**Costo:** $0.000005 por transacción  
**Mantenimiento:** Ninguno (protocolo lo maneja)

### ¿Cuándo SÍ Necesitas Soroban?

**Solo cuando necesitas lógica CUSTOM que no existe en el protocolo:**

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

### Nuestra dApp: Solo Assets Nativos

**Lo que hace:**
1. Conecta wallet → **No necesita contrato**
2. Muestra balance de USDC → **No necesita contrato**
3. Crea trustline → **No necesita contrato**
4. Guarda datos en Supabase → **Backend normal**

**¿Dónde está la lógica blockchain?**
En el **protocolo de Stellar**. Tu código solo llama operaciones que ya existen.

**Analogía:**
- ❌ Ethereum: Construyes tu propia casa desde cero
- ✅ Stellar: Usas un edificio ya construido, solo eliges tu apartamento

---

## 🏗️ ARQUITECTURA DE LA DAPP

```
┌─────────────────────────────────────────┐
│         USUARIO (Navegador)             │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │   Frontend (Next.js + Vercel)    │  │
│  │                                  │  │
│  │  • WalletConnect Component       │  │
│  │  • AssetBalance Component        │  │
│  │  • CreateTrustline Component     │  │
│  └──────────────────────────────────┘  │
│            ↓                  ↑         │
└────────────┼──────────────────┼─────────┘
             │                  │
        (1) Firma          (4) Confirmación
             ↓                  ↑
    ┌────────────────────────────────┐
    │   Freighter Wallet             │
    │   (Extensión del navegador)    │
    └────────────────────────────────┘
             │                  ↑
        (2) Transacción    (3) Respuesta
             ↓                  ↑
    ┌────────────────────────────────┐
    │    STELLAR NETWORK             │
    │    (Testnet o Mainnet)         │
    │                                │
    │  • Protocolo de Assets Nativos │
    │  • DEX integrado               │
    │  • Trustlines                  │
    └────────────────────────────────┘
             │                  ↑
        (5) Metadata      (6) Query
             ↓                  ↑
    ┌────────────────────────────────┐
    │    SUPABASE (Backend)          │
    │                                │
    │  • Tabla: trustlines           │
    │  • Tabla: transactions         │
    └────────────────────────────────┘
```

### Flujo de una Transacción

**Ejemplo: Crear Trustline**

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

---

## 📦 PARTE 1: SETUP INICIAL

### Requisitos Previos

Antes de empezar, asegúrate de tener:

- [ ] **Node.js** instalado (v18 o superior)
- [ ] **VS Code** instalado
- [ ] **Freighter Wallet** (extensión de Chrome/Firefox)
- [ ] **Cuenta de Supabase** (gratis)
- [ ] **Cuenta de Vercel** (gratis)

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

**¿Qué acabas de hacer?**
- ✅ Creaste un proyecto Next.js (framework de React)
- ✅ Configuraste Tailwind (para estilos bonitos)
- ✅ Estructura `/src` (código más organizado)

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

**Verificar instalación:**
```bash
# Ver las dependencias instaladas
npm list --depth=0

# Deberías ver:
# ├── stellar-sdk@12.x.x
# ├── @supabase/supabase-js@2.x.x
# └── @stellar/freighter-api@2.x.x
```

### Paso 3: Estructura de Carpetas

En VS Code, crea esta estructura:

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
│   │   ├── PathPayment.jsx    # ← Path payments (opcional)
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

**Crear carpetas:**
```bash
# En terminal de VS Code
mkdir -p src/components src/lib
```

---

## 🗄️ PARTE 2: CONFIGURAR SUPABASE

### Paso 1: Crear Proyecto en Supabase

1. Ve a **https://supabase.com**
2. Click en **"Start your project"**
3. Crea una cuenta (GitHub recomendado)
4. Click en **"New Project"**
5. Configuración:
   - **Name:** `dapp-stellar-assets`
   - **Database Password:** (genera una fuerte, guárdala)
   - **Region:** South America (más cercana)
   - **Plan:** Free
6. Click en **"Create new project"**
7. Espera 1-2 minutos a que se cree

### Paso 2: Obtener Credenciales

1. En tu proyecto, ve a **Settings** (⚙️) → **API**
2. Copia estos valores:

```
Project URL: https://xxxxxx.supabase.co
anon public key: eyJhbGc...
```

3. En VS Code, crea `.env.local` en la raíz:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**⚠️ IMPORTANTE:**
- NO subas `.env.local` a GitHub
- Agrega a `.gitignore` (ya debería estar)

### Paso 3: Crear Tablas

1. En Supabase, ve a **SQL Editor**
2. Click en **"New Query"**
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
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índice para buscar rápido por usuario
CREATE INDEX idx_trustlines_user ON trustlines(user_id);

-- Tabla para guardar transacciones (opcional, para features futuras)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(56) NOT NULL,
  tx_type VARCHAR(50),                 -- Ej: 'payment', 'trustline'
  tx_hash VARCHAR(64),
  source_asset VARCHAR(12),
  dest_asset VARCHAR(12),
  amount DECIMAL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_transactions_user ON transactions(user_id);
```

4. Click en **"Run"**
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

**¿Qué hace este código?**
- ✅ Importa la función para crear cliente de Supabase
- ✅ Lee credenciales del archivo `.env.local`
- ✅ Valida que existan (previene errores)
- ✅ Crea un cliente que podemos usar en toda la app

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

**¿Por qué este archivo?**
- ✅ Centraliza configuración de assets
- ✅ Evita errores de issuer incorrecto
- ✅ Facilita cambio entre testnet/mainnet
- ✅ Documenta qué issuer usar

**⚠️ CRÍTICO:** El issuer de USDC en testnet (`GBBD47...`) es DIFERENTE al de mainnet (`GA5ZSE...`). Usar el incorrecto hará que tu dApp no funcione.

---

## 💻 PARTE 3: COMPONENTES FRONTEND

Ahora vamos a crear los componentes principales. Cada uno tiene comentarios detallados.

### COMPONENTE 0: Spinner.jsx (Helper)

Este es un componente helper para mostrar loading de forma visual.

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

**¿Por qué este componente?**
- ✅ Feedback visual profesional
- ✅ Mejor UX que solo texto "Cargando..."
- ✅ Reutilizable en todos los componentes

---

### COMPONENTE 1: WalletConnect.jsx

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
    async function checkConnection() {
      setLoading(true);
      try {
        // Verificar si Freighter está instalado y conectado
        if (await isConnected()) {
          // Si está conectado, obtener la public key
          const key = await getPublicKey();
          setPublicKey(key);
          // Notificar al componente padre (page.jsx)
          onConnect(key);
        }
      } catch (err) {
        // Si hay error, no hacer nada (usuario probablemente no tiene Freighter)
        console.log('Freighter not connected:', err);
      } finally {
        setLoading(false);
      }
    }
    
    checkConnection();
  }, [onConnect]); // Solo ejecutar una vez al montar

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
        throw new Error('Freighter Wallet no está instalada');
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
          <p className="text-sm text-gray-600 font-mono break-all">
            {formatAddress(publicKey)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Public Key: {publicKey}
          </p>
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

---

### COMPONENTE 2: AssetBalance.jsx

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
 * 
 * MEJORA: Ahora recibe un objeto Asset completo en vez de props separadas
 * Esto hace el componente más flexible y reutilizable
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
      // Usando constante centralizada en vez de hardcodear URL
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
      
      // Buscar el asset específico que queremos
      // IMPORTANTE: Comparamos AMBOS (código Y issuer)
      const assetBalance = account.balances.find(b => 
        b.asset_code === asset.code && 
        b.asset_issuer === asset.issuer
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
      
      {/* Mostrar issuer (primeros 8 caracteres para no saturar) */}
      <p className="text-sm text-gray-500 mb-4">
        Issuer: {asset.issuer.slice(0, 8)}...
      </p>
      
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
3. Busca el asset específico en la lista de balances
4. Muestra el balance o '0' si no tiene
5. Tiene botón para refrescar manualmente
6. **NUEVO:** Usa Spinner para mejor UX
7. **NUEVO:** Usa constantes en vez de hardcodear URLs
8. **NUEVO:** Recibe objeto Asset completo (más flexible)
9. **NUEVO:** Incluye instrucciones para obtener assets en testnet

---

### COMPONENTE 3: CreateTrustline.jsx

Este es el componente más complejo. Crea una trustline usando Freighter, con validación de duplicados.

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
 * 
 * MEJORA: Ahora valida si la trustline ya existe antes de crearla
 */
export default function CreateTrustline({ asset, onSuccess }) {
  // Estado para mostrar loading
  const [loading, setLoading] = useState(false);
  
  // Estado para mensajes de éxito/error
  const [status, setStatus] = useState({ type: '', message: '' });
  
  // Estado para saber si la trustline ya existe
  const [trustlineExists, setTrustlineExists] = useState(false);

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
        b => b.asset_code === asset.code && b.asset_issuer === asset.issuer
      );
      
      if (existsOnChain) {
        return { exists: true, source: 'blockchain' };
      }
      
      // Si no existe en blockchain, verificar en Supabase
      // (por si hubo un error anterior y quedó registrado)
      const { data, error } = await supabase
        .from('trustlines')
        .select('*')
        .eq('user_id', publicKey)
        .eq('asset_code', asset.code)
        .eq('asset_issuer', asset.issuer)
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

    try {
      // ========== PASO 1: OBTENER PUBLIC KEY ==========
      const publicKey = await getPublicKey();
      
      if (!publicKey) {
        throw new Error('No se pudo obtener la public key');
      }

      // ========== PASO 1.5: VERIFICAR SI YA EXISTE ==========
      // MEJORA: Evitar crear trustlines duplicadas
      const { exists, source } = await checkExistingTrustline(publicKey);
      
      if (exists) {
        setTrustlineExists(true);
        setStatus({
          type: 'warning',
          message: `⚠️ Ya tienes una trustline para ${asset.code}. No necesitas crear otra.`
        });
        setLoading(false);
        return; // Salir sin crear
      }

      // ========== PASO 2: CONECTAR A STELLAR ==========
      const server = new Server(HORIZON_URLS.testnet);
      
      // Cargar la cuenta para obtener su sequence number
      const account = await server.loadAccount(publicKey);

      // ========== PASO 3: DEFINIR EL ASSET ==========
      // Crear objeto Asset desde las props
      const stellarAsset = new Asset(asset.code, asset.issuer);

      // ========== PASO 4: CONSTRUIR LA TRANSACCIÓN ==========
      const transaction = new TransactionBuilder(account, {
        // Fee: 100 stroops = 0.00001 XLM
        fee: '100',
        
        // Network: TESTNET (MUY IMPORTANTE)
        networkPassphrase: Networks.TESTNET
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

      // ========== PASO 7: GUARDAR EN SUPABASE ==========
      // Guardar metadata en nuestra base de datos
      const { error: dbError } = await supabase
        .from('trustlines')
        .insert({
          user_id: publicKey,
          asset_code: asset.code,
          asset_issuer: asset.issuer,
          trust_limit: 10000,
          tx_hash: result.hash  // Hash de blockchain
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
      
      setTrustlineExists(true); // Marcar que ya existe
      
      // Llamar callback si existe
      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {
      // ========== MANEJO DE ERRORES ==========
      console.error('Error creating trustline:', err);
      
      // Diferentes tipos de errores
      let errorMessage = 'Error desconocido';
      
      if (err.message.includes('User declined')) {
        errorMessage = 'Rechazaste la transacción en Freighter';
      } else if (err.response && err.response.data) {
        // Errores de Stellar
        const resultCode = err.response.data.extras?.result_codes?.operations?.[0];
        
        if (resultCode === 'op_low_reserve') {
          errorMessage = 'Balance insuficiente. Necesitas al menos 0.5 XLM más.';
        } else if (resultCode === 'op_line_full') {
          errorMessage = 'Ya tienes la trustline creada.';
        } else {
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
1. **NUEVO:** Verifica si la trustline ya existe (previene duplicados)
2. Obtiene la public key del usuario (Freighter)
3. Carga la cuenta desde Stellar
4. Construye una transacción con `ChangeTrust` operation
5. Pide a Freighter que la firme (popup)
6. Envía la transacción firmada a Stellar
7. Espera confirmación (3-5 segundos)
8. Guarda metadata en Supabase (solo si no estaba)
9. Muestra mensaje de éxito/error/warning
10. **NUEVO:** Usa Spinner para mejor feedback visual
11. **NUEVO:** Usa constantes en vez de hardcodear
12. **NUEVO:** Maneja más tipos de errores específicos

---

## 🏠 PARTE 4: PÁGINA PRINCIPAL

Ahora vamos a conectar todo en la página principal.

```javascript
// src/app/page.jsx

'use client';

import { useState } from 'react';
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
    // Incrementar refreshKey para forzar re-render de AssetBalance
    setRefreshKey(prev => prev + 1);
  };

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
                assetCode={USDC_TESTNET.code}
                assetIssuer={USDC_TESTNET.issuer}
                onSuccess={handleTrustlineSuccess}
              />
              
              {/* Componente 3: Ver Balance */}
              <AssetBalance
                key={refreshKey} // Force re-mount cuando cambia refreshKey
                publicKey={publicKey}
                assetCode={USDC_TESTNET.code}
                assetIssuer={USDC_TESTNET.issuer}
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
                href="https://friendbot.stellar.org" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://friendbot.stellar.org
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
1. Coordina los 3 componentes
2. Pasa callbacks entre componentes
3. Muestra/oculta componentes según el estado
4. Incluye instrucciones para el usuario
5. Tiene layout bonito con Tailwind

---

## 🚀 PARTE 5: DEPLOY EN VERCEL

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

1. Ve a **github.com** y crea un repo nuevo
2. Nombre: `dapp-stellar-assets`
3. Descripción: `dApp para Assets Nativos en Stellar - Clase 7`
4. Público o Privado (tú eliges)
5. NO inicialices con README (ya lo tienes)
6. Click en **"Create repository"**

```bash
# En terminal de VS Code

# Agregar remote (reemplaza con TU URL)
git remote add origin https://github.com/TU-USUARIO/dapp-stellar-assets.git

# Push
git branch -M main
git push -u origin main
```

### Paso 3: Deploy en Vercel

**Opción A: Desde el Dashboard**

1. Ve a **https://vercel.com**
2. Login con GitHub
3. Click en **"New Project"**
4. Selecciona tu repo `dapp-stellar-assets`
5. Click en **"Import"**
6. En **Environment Variables**, agrega:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGc...
   ```
7. Click en **"Deploy"**
8. Espera 1-2 minutos
9. ✅ Tu app está en vivo!

**Opción B: Desde la Terminal**

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

## 🧪 PARTE 6: TESTING LOCAL

Antes de deployar, prueba localmente:

```bash
# En terminal de VS Code

# Instalar dependencias (si no lo hiciste)
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir en navegador
# http://localhost:3000
```

**Checklist de testing:**

- [ ] ¿La página carga sin errores?
- [ ] ¿Se puede conectar Freighter?
- [ ] ¿Aparece la public key?
- [ ] ¿El botón "Crear Trustline" funciona?
- [ ] ¿Freighter abre el popup para firmar?
- [ ] ¿Después de confirmar, aparece mensaje de éxito?
- [ ] ¿El balance se actualiza?
- [ ] ¿Los datos se guardan en Supabase?

**Ver datos en Supabase:**
1. Ve a tu proyecto en Supabase
2. Table Editor → `trustlines`
3. Deberías ver los registros creados

---

## 📁 PARTE 7: ESTRUCTURA FINAL DEL PROYECTO

Tu proyecto debería verse así:

```
dapp-stellar-assets/
├── src/
│   ├── app/
│   │   ├── page.jsx              ✅ Página principal
│   │   ├── layout.jsx             (generado por Next.js)
│   │   ├── globals.css            (estilos globales)
│   │   └── favicon.ico
│   │
│   ├── components/
│   │   ├── WalletConnect.jsx      ✅ Componente de conexión
│   │   ├── AssetBalance.jsx       ✅ Componente de balance
│   │   └── CreateTrustline.jsx    ✅ Componente de trustline
│   │
│   └── lib/
│       └── supabase.js            ✅ Cliente de Supabase
│
├── public/
│   └── (imágenes opcionales)
│
├── .env.local                     ✅ Variables de entorno (NO subir a Git)
├── .gitignore                     ✅ Archivos a ignorar
├── package.json                   ✅ Dependencias
├── package-lock.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md                      ✅ Documentación
```

---

## 🎓 RESUMEN: ¿QUÉ CONSTRUISTE?

### Arquitectura completa:

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

### Tecnologías usadas:

- ✅ **Next.js**: Framework de React
- ✅ **Tailwind CSS**: Estilos
- ✅ **Stellar SDK**: Interacción con blockchain
- ✅ **Freighter API**: Wallet connection
- ✅ **Supabase**: Base de datos
- ✅ **Vercel**: Hosting

### Lo más importante:

**NO usaste contratos Soroban porque no los necesitas.** Los Assets Nativos están en el protocolo mismo.

Tu código solo:
1. Llama operaciones que ya existen (ChangeTrust)
2. Firma transacciones con Freighter
3. Consulta datos con Horizon API

**Eso es todo. Simple. Poderoso.**

---

## 🦈 ¡LO LOGRASTE!

Ahora tienes una dApp COMPLETA que:
- ✅ Maneja Assets Nativos (USDC)
- ✅ Se conecta a Freighter
- ✅ Crea trustlines en blockchain
- ✅ Muestra balances en tiempo real
- ✅ Está desplegada en internet

**Eso no es poca cosa.** Eso es ser una Tiburona Builder.

---

**Siguiente:** [📖 SECCIÓN 4: VOCABULARIO Y TROUBLESHOOTING →](./clase7-4-guias.md)

**Anterior:** [← 📖 SECCIÓN 2: TEORÍA CONCEPTUAL](./clase7-2-teoria.md)

---

🦈⚡ **¡Sigue construyendo, Tiburona!** ⚡🦈