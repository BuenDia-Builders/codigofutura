# 🌟 dApp Stellar - Integración con Freighter Wallet

Una aplicación descentralizada (dApp) construida con Next.js 16 que integra Freighter Wallet para interactuar con la blockchain de Stellar en Testnet.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Prerequisitos](#-prerequisitos)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Integración con Freighter](#-integración-con-freighter)
- [Problemas Comunes y Soluciones](#-problemas-comunes-y-soluciones)
- [Próximos Pasos](#-próximos-pasos)
- [Recursos](#-recursos)

---

## 🎯 Descripción

Este proyecto es una dApp básica que permite a los usuarios conectar su billetera Freighter para interactuar con la red Stellar Testnet. Es el punto de partida para construir aplicaciones más complejas que trabajen con assets nativos de Stellar, stablecoins y otras funcionalidades de la blockchain Stellar.

## 🛠️ Tecnologías Utilizadas

- **Next.js 16** - Framework de React con App Router y Turbopack
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS para estilos
- **Freighter API v5.0.0** - API para conectar con Freighter Wallet
- **React 19** - Biblioteca de UI
- **Supabase** - Base de datos (configurado para futuras funcionalidades)

## 📦 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

### Software necesario:

1. **Node.js** (v18 o superior)
   ```bash
   node --version  # Verifica tu versión
   ```

2. **npm** o **yarn**
   ```bash
   npm --version
   ```

3. **Freighter Wallet** - Extensión del navegador
   - 🔗 Descarga desde: https://freighter.app
   - Disponible para Chrome, Brave, Firefox, Edge

### Configurar Freighter

1. **Instala** la extensión de Freighter en tu navegador
2. **Crea** una nueva wallet o importa una existente
3. **⚠️ IMPORTANTE**: Cambia a la red **TESTNET**
   - Abre Freighter → Settings (⚙️) → Network → Selecciona "Testnet"
4. **(Opcional)** Obtén XLM de prueba:
   - Ve a: https://laboratory.stellar.org/#account-creator
   - O usa: https://friendbot.stellar.org

---

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd dapp-stellar-assets

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

### Variables de Entorno

Este proyecto tiene configurado Supabase, aunque **no se usa en esta versión básica**. Si tienes un archivo `.env.local`, debería verse así:

```env
# Supabase (opcional - no usado en esta versión)
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_publica_de_supabase
```

> ⚠️ **Nota:** Para esta versión de la dApp **NO necesitas** configurar Supabase. Solo se usará en versiones futuras para guardar datos de transacciones o usuarios.

Si no tienes `.env.local`, la aplicación funcionará perfectamente sin él.

---

## 📁 Estructura del Proyecto

```
dapp-stellar-assets/
├── app/
│   ├── favicon.ico
│   ├── globals.css          # Estilos globales de Tailwind
│   ├── layout.tsx           # Layout principal de la app
│   └── page.tsx             # Página principal con interfaz
│
├── src/
│   ├── components/
│   │   └── WalletConnect.tsx   # Componente de conexión a Freighter
│   └── types/
│       └── freighter.d.ts      # Definiciones de tipos personalizadas
│
├── public/                  # Archivos estáticos
├── next.config.ts           # Configuración de Next.js con Turbopack
├── package.json             # Dependencias del proyecto
├── tsconfig.json            # Configuración de TypeScript
└── tailwind.config.ts       # Configuración de Tailwind CSS
```

---

## 🔐 Integración con Freighter

### 1. Instalación de Freighter API

```bash
npm install @stellar/freighter-api
```

**Versión utilizada:** `@stellar/freighter-api@^5.0.0`

### 2. Configuración de Next.js para Turbopack

Como Next.js 16 usa **Turbopack** por defecto (más rápido que Webpack), la configuración en `next.config.ts` es mínima:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {}, // Configuración vacía para Turbopack
};

export default nextConfig;
```

> ⚠️ **Nota:** Si tenías configuraciones de Webpack previas, Turbopack las maneja automáticamente.

### 3. Definiciones de Tipos Personalizadas

La versión 5.0.0 de Freighter API tiene tipos incompletos. Creamos `src/types/freighter.d.ts`:

```typescript
declare module '@stellar/freighter-api' {
  export function isConnected(): Promise<boolean>;
  
  export function getAddress(): Promise<{
    address: string;
    error?: string;
  }>;
  
  export function requestAccess(): Promise<{
    address?: string;
    error?: string;
  }>;
  
  export function signTransaction(
    xdr: string,
    opts?: {
      network?: string;
      networkPassphrase?: string;
      accountToSign?: string;
    }
  ): Promise<{
    signedTransaction: string;
    error?: string;
  }>;

  export function getNetwork(): Promise<{
    network: string;
    networkPassphrase: string;
  }>;

  export function getNetworkDetails(): Promise<{
    network: string;
    networkPassphrase: string;
    networkUrl: string;
    sorobanRpcUrl?: string;
  }>;
}
```

### 4. Componente WalletConnect

El componente `WalletConnect.tsx` maneja toda la lógica de conexión con Freighter.

#### Características principales:

- ✅ Verificación de instalación de Freighter
- ✅ Solicitud de acceso explícita con `requestAccess()`
- ✅ Obtención de la dirección pública con `getAddress()`
- ✅ Manejo de errores y estados de carga
- ✅ Renderizado solo del lado del cliente (evita errores de hidratación SSR)
- ✅ UI responsive con Tailwind CSS

#### Flujo de conexión:

```
1. Usuario hace clic en "Conectar Freighter"
   ↓
2. Verificamos si Freighter está instalado (isConnected)
   ↓
3. Solicitamos acceso (requestAccess) → Abre popup de Freighter
   ↓
4. Usuario aprueba en el popup de Freighter
   ↓
5. Obtenemos la dirección pública (getAddress)
   ↓
6. Mostramos la wallet conectada en la UI
```

#### Código simplificado:

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function WalletConnect({ onConnect }) {
  const [publicKey, setPublicKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Asegurar renderizado solo en cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    try {
      const freighter = await import('@stellar/freighter-api');
      
      // Verificar instalación
      const connected = await freighter.isConnected();
      if (!connected) {
        throw new Error('Instala Freighter desde https://freighter.app');
      }

      // ⭐ PASO CRÍTICO: Solicitar acceso (abre popup)
      const accessResult = await freighter.requestAccess();
      if (accessResult.error) {
        throw new Error(`Acceso denegado: ${accessResult.error}`);
      }

      // Obtener dirección
      const addressResult = await freighter.getAddress();
      if (addressResult.address) {
        setPublicKey(addressResult.address);
        onConnect(addressResult.address);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <button onClick={connectWallet} disabled={loading}>
      {loading ? 'Conectando...' : 'Conectar Freighter'}
    </button>
  );
}
```

### 5. Página Principal (app/page.tsx)

```typescript
'use client';

import { useState } from 'react';
import WalletConnect from '@/components/WalletConnect';

export default function Home() {
  const [publicKey, setPublicKey] = useState('');

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-center">
          Assets Nativos en Stellar
        </h1>
        
        <WalletConnect onConnect={setPublicKey} />
        
        {publicKey && (
          <div className="mt-8 p-6 bg-blue-50 rounded-xl">
            <p><strong>Wallet conectada:</strong></p>
            <p className="font-mono">{publicKey}</p>
          </div>
        )}
      </div>
    </main>
  );
}
```

---

## 🐛 Problemas Comunes y Soluciones

### Problema 1: Error de Turbopack vs Webpack

**Error:**
```
ERROR: This build is using Turbopack, with a `webpack` config and no `turbopack` config.
```

**Solución:**
Actualiza `next.config.ts` para usar Turbopack:
```typescript
const nextConfig: NextConfig = {
  turbopack: {}, // Añade esto
};
```

---

### Problema 2: `requestAccess` no existe en los tipos

**Error:**
```
Property 'requestAccess' does not exist on type...
```

**Solución:**
Crea el archivo `src/types/freighter.d.ts` con las definiciones de tipos completas (ver sección 3).

---

### Problema 3: Dirección vacía (`address: ''`)

**Error:**
```
📦 Resultado completo: { "address": "" }
```

**Causa:** No has autorizado el acceso en Freighter.

**Solución:**
1. Asegúrate de llamar `await freighter.requestAccess()` ANTES de `getAddress()`
2. Verifica que el popup de Freighter se abra
3. Haz clic en "Approve" o "Permitir" en el popup

---

### Problema 4: El popup de Freighter no se abre

**Posibles causas:**

1. **Popups bloqueados**: Verifica la barra de direcciones del navegador
2. **Freighter no está desbloqueado**: Abre Freighter e ingresa tu contraseña
3. **Extensión desactivada**: Verifica que Freighter esté habilitado

**Solución:**
- Permite popups para `localhost:3000`
- Desbloquea tu wallet de Freighter
- Recarga la página

---

### Problema 5: Error de hidratación en Next.js

**Error:**
```
A tree hydrated but some attributes of the server rendered HTML didn't match...
```

**Causa:** Componente intentando renderizar contenido diferente en servidor vs cliente.

**Solución:**
Usa el patrón de `mounted`:
```typescript
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;
```

---

## 🎯 Próximos Pasos

Con Freighter integrado, puedes expandir tu dApp para:

### 1. Integrar APIs de Stellar (Próximo Proyecto - Tarea 7)

En el siguiente proyecto trabajaremos con:

- **Horizon API**: Para consultar datos de la blockchain
  - Obtener información de cuentas
  - Consultar transacciones
  - Ver assets y trustlines
  
- **APIs de terceros**: 
  - Palta Labs
  - StellarExpert API
  - Otros servicios del ecosistema

- **Supabase**: Para guardar y cachear datos
  - Historial de transacciones
  - Datos de usuarios
  - Configuraciones de la app

### 2. Mostrar Balance de la Cuenta
- Usar Horizon API para obtener balances
- Mostrar XLM y otros assets

### 2. Enviar Transacciones
- Crear pagos en XLM
- Firmar transacciones con `signTransaction()`

### 3. Crear y Gestionar Assets Nativos
- Crear stablecoins personalizadas
- Establecer trustlines
- Distribuir assets

### 4. Integrar con Soroban
- Smart contracts en Stellar
- Invocar funciones de contratos

### 5. Conectar con APIs Externas
- **Horizon API**: https://horizon-testnet.stellar.org
- **Stellar Laboratory**: Para testing
- **StellarExpert**: Explorador de blockchain

---

## 📚 Recursos

### Documentación oficial:

- **Freighter Wallet**: https://freighter.app
- **Freighter Docs**: https://docs.freighter.app
- **Stellar Docs**: https://developers.stellar.org
- **Stellar SDK**: https://stellar.github.io/js-stellar-sdk

### APIs y herramientas:

- **Horizon API (Testnet)**: https://horizon-testnet.stellar.org
- **Stellar Laboratory**: https://laboratory.stellar.org
- **Friendbot (XLM gratis)**: https://friendbot.stellar.org
- **StellarExpert**: https://stellar.expert

### Tutoriales:

- [Integrar Freighter en React](https://developers.stellar.org/docs/build/guides/freighter/integrate-freighter-react)
- [Stellar SDK Tutorial](https://developers.stellar.org/docs/tutorials)
- [Next.js 16 Docs](https://nextjs.org/docs)

---

## 👥 Contribuciones

Este es un proyecto educativo. Si encuentras errores o mejoras:

1. Haz un fork del repositorio

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## ✨ Créditos

Desarrollado como parte del curso de desarrollo blockchain con Stellar.

**Stack:**
- Next.js 16 + React 19
- TypeScript
- Tailwind CSS
- Freighter Wallet API
- Stellar Network

---

¡Happy coding! 🚀⭐