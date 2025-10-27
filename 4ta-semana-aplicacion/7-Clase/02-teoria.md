# 📖 TEORÍA CONCEPTUAL: ASSETS NATIVOS EN STELLAR

## ¡BIENVENIDA A LA TEORÍA QUE SÍ IMPORTA! 🦈

Esta no es teoría aburrida de libro. Esta es la teoría que te explica **por qué** grandes empresas como Circle, MoneyGram y startups como BeansApp eligieron Stellar.

Vas a entender el POR QUÉ antes de construir el CÓMO. Y créeme, cuando entiendas esto, vas a ver por qué Stellar es tan poderoso.

---

## 🎯 ¿QUÉ VAS A APRENDER EN ESTA SECCIÓN?

- [ ] **Historia:** Por qué se crearon los Assets Nativos
- [ ] **Concepto:** Qué son y cómo funcionan
- [ ] **Casos reales:** USDC, EURC, BeansApp, Palta Labs
- [ ] **Trustlines:** Tu sistema de seguridad
- [ ] **DEX:** El exchange integrado
- [ ] **Path Payments:** La killer feature
- [ ] **Comparación:** Assets Nativos vs Tokens Soroban

**Tiempo estimado:** 20-25 minutos

**¿Por qué leer esto?** Porque cuando entiendas los conceptos, el código va a tener sentido. No vas a estar copiando y pegando sin entender.

---

## 📜 PARTE 1: LA HISTORIA (POR QUÉ EXISTEN)

### El Problema que Stellar Resolvió

Imagina esto: Es 2014. Tu prima en Buenos Aires trabaja duro vendiendo empanadas. Quiere enviar dinero a tu abuela en Paraguay.

**Sus opciones:**

**Opción 1: Western Union**
- 💰 Cobra 8-15% de comisión
- ⏰ Tarda 1-3 días
- 📍 Tu abuela tiene que ir a una sucursal física

**Opción 2: Transferencia bancaria**
- 💰 $25-50 de comisión fija
- ⏰ Tarda 3-5 días hábiles
- 🚫 Ambas necesitan cuenta bancaria

**Opción 3: Bitcoin** (en 2014)
- 💰 Fees impredecibles ($5-20)
- ⏰ Confirmación: 10-60 minutos
- 😵 Volatilidad: el precio cambia 10% en un día
- 🤯 Muy técnico para tu abuela

### La Visión de Stellar

En 2014, Jed McCaleb (cofundador de Ripple) crea Stellar con una misión:

> "Hacer que el dinero se mueva tan fácil como enviar un email, sin importar las fronteras."

**Su solución:** Un protocolo donde:
- ✅ Cualquiera puede crear "dólares digitales" (o euros, pesos, etc.)
- ✅ Las transacciones cuestan $0.000005
- ✅ Se confirman en 3-5 segundos
- ✅ No necesitas contratos inteligentes complejos

Así nacieron los **Assets Nativos**.

---

## 🏦 PARTE 2: ¿QUÉ SON LOS ASSETS NATIVOS?

### La Analogía del Banco Global

**Imagina que Stellar es un banco gigante global.**

En este banco:

**1. La moneda principal es XLM (Lumens)**
- Como si fueran "los dólares del banco"
- Sirve para pagar fees (las comisiones)
- La única moneda que NO necesita trustline

**2. Otras empresas pueden crear sus propias monedas**
- Circle crea "USDC" (dólares digitales)
- Circle crea "EURC" (euros digitales)
- Tu mamá podría crear "EMPANADAS" (puntos de lealtad)

**3. Para usar una moneda nueva, debes confiar en quien la emite**
- Es como abrir una cuenta específica para esa moneda
- Se llama **trustline**
- Esto previene spam: nadie puede mandarte tokens random

### Definición Técnica

**Asset Nativo** = Un token que existe directamente en la blockchain de Stellar, definido por el protocolo base (CAP-40).

**Características:**
- ✅ No necesita contratos inteligentes
- ✅ Se integra automáticamente con el DEX
- ✅ Confirmación: 3-5 segundos
- ✅ Fee: ~$0.000005 por transacción
- ✅ Soporta hasta 7 decimales de precisión

### Anatomía de un Asset

Todo asset (excepto XLM) tiene DOS identificadores:

```
USDC de Circle:
├─ code: "USDC" (hasta 12 caracteres)
└─ issuer: "GA5ZSEJYB37JRC5..." (clave pública del emisor)
```

**IMPORTANTE:** El par `code + issuer` debe ser ÚNICO.

Por ejemplo:
- **Circle USDC:** `USDC:GA5ZSE...`
- **Tu USDC:** `USDC:TU_CLAVE...`

Son diferentes porque tienen different issuers. Tu abuela necesita confiar en Circle (trustline) para recibir el USDC de Circle.

---

## 💰 PARTE 3: CASOS REALES (ESTO YA FUNCIONA HOY)

### CASO 1: USDC - Circle (Global) 🌍

**¿Qué es?**
USDC (USD Coin) es un **dólar digital 1:1** respaldado por Circle. Por cada USDC en circulación, Circle tiene $1 USD en reservas (auditadas).

**¿Por qué en Stellar?**
Circle lanzó USDC en:
- 2018: Ethereum (primero)
- 2020: Algorand
- 2021: **Stellar** (tercera blockchain oficial)

**¿Por qué Stellar como tercera opción?**
1. **Fees bajísimos** - Perfecto para micropagos
2. **Velocidad** - 3-5 segundos vs 15-60 de Ethereum
3. **Built-in DEX** - No necesitas crear un exchange
4. **Enfoque en pagos** - Stellar se diseñó para esto

**Números REALES (2025):**
- 💵 **$83+ millones** en supply en Stellar
- 📊 **$4.2 billones** procesados en pagos totales
- 👥 **500,000+** cuentas con trustlines de USDC
- ⚡ **$200,000 semanales** en off-ramps a fiat

**Casos de uso:**

**A) MoneyGram: Cash-to-Crypto**
- Proceso:
  1. Conectando On y Off-Ramps a Billeteras y Aplicaciones Potenciadas por Stellar
  2. Solucionando el Problema de la Última Milla sin una Cuenta Bancaria
  3. USDC en la red de Stellar para Liquidación Rápida y Fácil

**B) Fonbnk: Airtime-to-Crypto (África)**
- Convierte **saldo de celular** en USDC
- Perfecto para economías cash-based
- Millones sin acceso bancario ahora pueden usar crypto

**C) UNHCR (ONU): Ayuda Humanitaria**
- Envía ayuda a refugiados en Ucrania usando USDC
- Se confirma en segundos
- Fees casi cero
- La gente puede convertir a su moneda local
- Protege contra inflación

**Código del Asset:**
```
Asset Code: USDC
Issuer: GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN
```

---

### CASO 2: EURC - Circle (Europa) 🇪🇺

**¿Qué es?**
EURC (EUR Coin) es un **euro digital 1:1** respaldado por Circle. Lanzado en Stellar en septiembre 2023.

**¿Por qué importa?**
Antes de EURC:
- Europeos tenían que usar USDC (dólar)
- Perdían dinero en conversión EUR ↔ USD

Con EURC:
- Euros nativos digitales
- Sin conversión de moneda
- Mismos beneficios de Stellar

---

### CASO 3: BeansApp - Holanda (Global Impact) 🇳🇱

**¿Qué es?**
BeansApp es una **wallet no custodial** construida en Stellar, fundada por **Wouter Arkink** (emprendedor fintech holandés).

**Origen y regulación:**
- 🏠 Fundada en Holanda
- ⚖️ Regulada bajo ley financiera holandesa (Wft)
- 🌍 Enfoque global: mercados emergentes (Chile, Filipinas, África)
- 💡 Misión: Pagos sin fees, accesibles para todos

**¿Por qué es especial?**
1. **Wallet no custodial** - TÚ controlas tus llaves
2. **Sin fees** para enviar/recibir
3. **UI súper simple** - Diseñada para usuarios no técnicos
4. **Multi-currency** - Soporta múltiples assets nativos

**Impacto en mercados emergentes:**
- 📱 Millones de usuarios sin cuenta bancaria
- 🌍 Remesas internacionales
- 💰 Protección contra inflación local

**¿Cómo funciona?**
```
Usuario en Chile:
1. Descarga BeansApp
2. Crea wallet (sin KYC inicial)
3. Recibe USDC de familiar en Europa
4. Convierte a pesos chilenos cuando necesita
5. Usa para pagos locales o ahorro
```

**¿Por qué Stellar?**
- Fees bajísimos → viable para micropagos
- Velocidad → experiencia fluida
- Assets Nativos → fácil de integrar USDC, EURC, etc.

**Conexión con ecosistema:**
- BeansApp es complementaria (no competencia) con Palta Labs
- Ambos construyen en Stellar
- Diferentes enfoques: BeansApp (wallet), Palta Labs (DeFi)

---

### CASO 4: Palta Labs - Chile (DeFi en Latam) 🥑

**¿Quiénes son?**
Startup chilena de la **Universidad de Chile**, liderada por ingenieros que están revolucionando DeFi en Latinoamérica.

**Proyectos principales:**

#### A) **Soroswap.Finance** - DEX con Agregador

**¿Qué es?**
Un **exchange descentralizado** (DEX) construido con Soroban (contratos inteligentes de Stellar).

**Lo especial:**
- **Agregador inteligente** - Busca el mejor precio entre TODAS las liquidity pools
- **Routing avanzado** - Puede usar paths: XLM → EURC → USDC si da mejor rate
- **Interfaz amigable** - No necesitas ser experto

**Ejemplo de uso:**
```
Quieres cambiar 100 XLM → USDC

Sin agregador:
- Buscarías manualmente el mejor pool
- Pool 1: 1 XLM = 0.10 USDC
- Pool 2: 1 XLM = 0.105 USDC
- Eliges Pool 2 manualmente

Con Soroswap:
- Agregador analiza TODOS los pools automáticamente
- Encuentra que: XLM → EURC → USDC da 0.107 USDC
- Ejecuta la transacción por ti
- Ganas 0.002 USDC más por XLM
```

**Por qué importa:**
- Maximiza ganancias en cada swap
- Elimina arbitraje manual
- Usa Assets Nativos + Soroban

**Links:**
- App: https://soroswap.finance
- Docs: https://docs.soroswap.finance
- GitHub: https://github.com/soroswap

#### B) **DeFindex** - Yield Strategies Automatizadas

**¿Qué es?**
Sistema de **inversión automatizada** que permite a wallets ofrecer "cuentas de ahorro con rendimiento".

**El problema en Latam:**
- 📉 Inflación alta (Argentina: 100%+, Chile: 5-10%)
- 🏦 Bancos pagan 0-3% de interés
- 💸 Tu dinero pierde valor cada día

**La solución DeFindex:**
1. Usuario deposita USDC (asset nativo)
2. DeFindex invierte en estrategias DeFi automáticamente
3. Usuario gana yield (5-15% anual)
4. Todo sin tocar el USDC (sigue siendo USDC estable)

**¿Cómo funciona técnicamente?**
```
DeFindex Vault (Contrato Soroban)
├─ Asset: USDC (asset nativo)
├─ Estrategias:
│   ├─ Liquidity Pool en Soroswap
│   ├─ Lending en protocolo X
│   └─ Staking en protocolo Y
└─ Rebalanceo automático
```

**Para wallets: Integración super fácil**
```javascript
// Solo 3 líneas de código
import { DeFindexVault } from '@defindex/sdk';
const vault = new DeFindexVault();
await vault.deposit(usdc, amount);
```

**Premio:**
🏆 **1er lugar** en Consensus x EasyA Hackathon 2024

**Links:**
- App: https://defindex.io
- Docs: https://docs.defindex.io
- GitHub: https://github.com/paltalabs/defindex

#### C) **Ecosystem Impact**

**Palta Labs en números:**
- 🎓 Equipo de Universidad de Chile
- 🏆 Múltiples hackathons ganados
- 👥 Comunidad activa en Latam
- 🌍 Proyectos open source

**Filosofía:**
> "DeFi no es solo para Silicon Valley. Latinoamérica necesita soluciones locales para problemas locales."

**Links generales:**
- Website: https://paltalabs.io
- GitHub: https://github.com/paltalabs
- Twitter: @PaltaLabs

---

## 🔗 CONEXIÓN: Casos Reales → Tu dApp

Ahora que viste USDC, EURC, BeansApp y Palta Labs, te preguntarás:

> "¿Cómo se relaciona esto con la dApp que voy a construir?"

**Respuesta:** Tu dApp replica funcionalidades REALES de estas empresas.

### Lo que Construyes vs Lo que Ellos Hacen

```
┌─────────────────────────────────────────────────────────────┐
│                    TU DAPP (Clase 7)                        │
├─────────────────────────────────────────────────────────────┤
│ 1. Conectar Wallet (Freighter)                             │
│ 2. Crear Trustlines (USDC)                                 │
│ 3. Ver Balance de Assets                                   │
│ 4. (Opcional) Path Payments                                │
└─────────────────────────────────────────────────────────────┘
         ↓↓↓ REPLICA FUNCIONALIDADES DE ↓↓↓
┌─────────────────────────────────────────────────────────────┐
│                    BEANSAPP (Holanda)                       │
├─────────────────────────────────────────────────────────────┤
│ 1. Wallet no custodial (como Freighter) ✓                  │
│ 2. Trustlines automáticas para USDC/EURC ✓                 │
│ 3. Balance multi-currency ✓                                │
│ 4. Envíos internacionales con conversión ✓                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                SOROSWAP (Palta Labs - Chile)                │
├─────────────────────────────────────────────────────────────┤
│ 1. Usa el DEX de Stellar ✓                                 │
│ 2. Path Payments para mejor precio ✓                       │
│ 3. Maneja Assets Nativos (USDC, EURC) ✓                    │
│ 4. UI amigable para swaps ✓                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    CIRCLE (USDC/EURC)                       │
├─────────────────────────────────────────────────────────────┤
│ 1. Issuer de assets nativos ✓                              │
│ 2. Trustlines para distribución ✓                          │
│ 3. Integración con Stellar Protocol ✓                      │
└─────────────────────────────────────────────────────────────┘
```

### Paralelos Específicos

#### **BeansApp ↔ Tu WalletConnect Component**

**BeansApp:**
```
- Wallet no custodial (usuario controla llaves)
- Conexión simple para usuarios no técnicos
- Trustlines automáticas para USDC/EURC
- Balance en tiempo real
```

**Tu dApp:**
```javascript
// WalletConnect.jsx
- Conecta Freighter (wallet no custodial) ✓
- UI simple para conectar ✓
- CreateTrustline.jsx crea trustlines ✓
- AssetBalance.jsx muestra balance ✓
```

**Lo que aprendes:**
- Cómo funcionan las wallets no custodiales
- Por qué las trustlines son necesarias
- Cómo mostrar balances multi-currency

---

#### **Soroswap ↔ Tu PathPayment Component (Opcional)**

**Soroswap:**
```
- Busca mejores rutas en el DEX
- Usa path payments para conversión automática
- Minimiza slippage con agregador
- Assets Nativos + Soroban
```

**Tu dApp (si implementas PathPayment):**
```javascript
// PathPayment.jsx (Sección 5: Mejoras)
- Usa pathPaymentStrictSend operation ✓
- Convierte XLM → USDC automáticamente ✓
- Aprovecha liquidez del DEX ✓
- Demuestra feature única de Stellar ✓
```

**Lo que aprendes:**
- Cómo funciona el DEX integrado
- Por qué path payments son poderosos
- Cómo se minimiza slippage

---

#### **Circle USDC ↔ Tu CreateTrustline Component**

**Circle:**
```
- Emite USDC como Asset Nativo
- Requiere trustlines para distribución
- Maneja authorization flags (mainnet)
- Supply controlado (mint/burn)
```

**Tu dApp:**
```javascript
// CreateTrustline.jsx
- Crea trustline para USDC ✓
- Usa Asset de Stellar SDK ✓
- Interactúa con issuer (Circle en testnet) ✓
- Guarda metadata en Supabase ✓
```

**Lo que aprendes:**
- Cómo funcionan los assets nativos
- Por qué los issuers necesitan trustlines
- Cómo Circle distribuye USDC globalmente

---

### Tabla Comparativa

| Funcionalidad | BeansApp | Soroswap | Circle | Tu dApp |
|---------------|----------|----------|--------|---------|
| **Wallet Connection** | ✅ | ✅ | N/A | ✅ |
| **Trustlines** | ✅ | ✅ | ✅ (issuer) | ✅ |
| **Asset Balance** | ✅ | ✅ | N/A | ✅ |
| **Path Payments** | ✅ | ✅ | N/A | ⚠️ Opcional |
| **DEX Integration** | ✅ | ✅ | N/A | ⚠️ Opcional |
| **Multi-currency** | ✅ | ✅ | ✅ | ⚠️ Fácil expandir |

**Leyenda:**
- ✅ Implementado
- ⚠️ Opcional o fácil de agregar
- N/A No aplica

---

### ¿Por Qué Importa Esta Conexión?

**1. Validación de lo que aprendes**
- No estás construyendo "juguetes"
- Estás replicando aplicaciones REALES
- Con millones de dólares en volumen

**2. Portfolio-ready**
- Puedes decir: "Mi dApp funciona como BeansApp"
- Puedes explicar: "Usé las mismas operaciones que Circle"
- Impresiona a empleadores/inversores

**3. Expandible**
- Tu MVP es la base
- Agregar features es agregar componentes
- Path → como Soroswap
- Multi-assets → como BeansApp
- Compliance → como Circle

**4. Entiendes el ecosistema**
- Por qué Circle eligió Stellar (Assets Nativos)
- Por qué Soroswap combina Assets + Soroban
- Por qué BeansApp es viable (fees bajos)

---

## 🔑 PARTE 4: TRUSTLINES (EL SISTEMA DE SEGURIDAD)

### ¿Qué es una Trustline?

**Analogía simple:**
Es como **abrir una cuenta bancaria** para un tipo específico de moneda.

**Sin trustline para USDC:**
- ❌ No puedes recibir USDC
- ❌ No puedes ver balance de USDC
- ❌ No puedes enviar USDC

**Con trustline para USDC:**
- ✅ Puedes recibir USDC
- ✅ Ves tu balance
- ✅ Puedes enviar USDC a otros

### ¿Por qué existen?

**1. Prevenir Spam**
Sin trustlines, cualquiera podría enviarte millones de tokens basura.

**2. Seguridad**
TÚ decides explícitamente qué assets aceptar.

**3. Control**
El issuer puede configurar reglas (KYC, freeze, etc.)

### Costo de una Trustline

**Base Reserve:** 0.5 XLM por trustline

**¿Qué significa?**
- Necesitas "congelar" 0.5 XLM para crear la trustline
- Es un depósito, NO un gasto
- Si eliminas la trustline, recuperas los 0.5 XLM

**Ejemplo:**
```
Cuenta nueva:
- Balance mínimo: 1 XLM (base reserve de la cuenta)

Creas trustline para USDC:
- Nuevo mínimo: 1.5 XLM (1 cuenta + 0.5 trustline)

Creas trustline para EURC:
- Nuevo mínimo: 2 XLM (1 cuenta + 0.5 USDC + 0.5 EURC)
```

### Authorization Flags (Control del Issuer)

Los issuers de assets pueden configurar **flags especiales**:

#### 1. **AUTH_REQUIRED** (Autorización Requerida)
**Qué hace:** Solo cuentas aprobadas por el issuer pueden crear trustlines.

**Use case:**
- Compliance KYC/AML
- Securities tokenizados
- Assets regulados

**Flujo Visual:**

```
┌─────────────────────────────────────────┐
│ Usuario quiere recibir USDC             │
│ (asset con AUTH_REQUIRED)               │
└──────────────┬──────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ 1. Usuario crea trustline para USDC     │
│    (transacción enviada a Stellar)      │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ 2. Circle revisa identidad del usuario  │
│    - KYC: Nombre, dirección, ID         │
│    - AML: Verifica origen de fondos     │
│    - Sanciones: Verifica listas negras  │
└──────────────┬───────────────────────────┘
               ↓
        ┌──────┴──────┐
        ↓             ↓
   ✅ Aprobado    ❌ Rechazado
        │             │
        ↓             ↓
 Trustline activa   Trustline bloqueada
        │             │
        ↓             ↓
 Usuario puede     Usuario NO puede
 recibir/enviar    usar USDC
     USDC
```

**Ejemplo Real:**
```
Circle tiene AUTH_REQUIRED en USDC mainnet para:
- Cumplir regulaciones financieras
- Prevenir lavado de dinero
- Bloquear cuentas sancionadas

En testnet NO lo tienen (para facilitar testing)
```

---

#### 2. **AUTH_REVOCABLE** (Autorización Revocable)
**Qué hace:** El issuer puede desactivar trustlines existentes.

**Use case:**
- Fraude detectado
- Orden judicial
- Cuenta comprometida

**Flujo Visual:**

```
┌───────────────────────────────────────┐
│ Usuario tiene trustline de USDC      │
│ Balance: 10,000 USDC                  │
└──────────────┬────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ ⚠️ Circle detecta actividad sospechosa │
│ - Transacciones inusuales               │
│ - Reportes de fraude                    │
│ - Cuenta hackeada                       │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ Circle REVOCA la autorización           │
│ (envía transacción de revocación)       │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ Trustline se desactiva automáticamente  │
│ - Usuario NO puede recibir USDC         │
│ - Usuario NO puede enviar USDC          │
│ - Balance queda "congelado"             │
└───────────────────────────────────────────┘
```

**Ejemplo Real:**
```
Caso: Cuenta comprometida
1. Hacker roba secret key de usuario
2. Usuario reporta a Circle
3. Circle revoca la trustline inmediatamente
4. Hacker NO puede mover los USDC
5. Usuario recupera cuenta y solicita nueva trustline
```

---

#### 3. **AUTH_CLAWBACK_ENABLED** (Clawback Habilitado)
**Qué hace:** El issuer puede **recuperar** assets de cualquier cuenta.

**Use case:**
- Emisión accidental
- Orden judicial
- Recuperar fondos robados

**Flujo Visual:**

```
┌───────────────────────────────────────┐
│ Circle emite USDC por error           │
│ Querían emitir: 100,000 USDC          │
│ Emitieron: 1,000,000 USDC (10x más)  │
└──────────────┬────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ Usuario A recibe: 900,000 USDC (error)  │
│ Usuario B recibe: 100,000 USDC (correcto)│
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ Circle detecta el error                  │
│ Necesita recuperar 900,000 USDC          │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ Circle ejecuta CLAWBACK                  │
│ - Envía transacción especial             │
│ - Recupera 900,000 USDC de Usuario A     │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ Los 900,000 USDC regresan a Circle      │
│ Usuario A queda con 0 USDC               │
│ Usuario B mantiene sus 100,000 USDC     │
│ ✅ Error corregido                       │
└───────────────────────────────────────────┘
```

**Otro Ejemplo: Orden Judicial**

```
┌───────────────────────────────────────┐
│ Orden judicial: Congelar fondos de    │
│ cuenta sospechosa (lavado de dinero)  │
└──────────────┬────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ Circle recibe orden oficial              │
│ Cuenta: GA123...XYZ                      │
│ Monto: 500,000 USDC                      │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ Circle ejecuta clawback                  │
│ 500,000 USDC → Cuenta de custodia legal │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│ Fondos quedan en custodia legal          │
│ (autoridades deciden qué hacer)          │
└───────────────────────────────────────────┘
```

---

#### Comparación Visual de los 3 Flags

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTHORIZATION FLAGS                       │
├──────────────────┬──────────────────┬─────────────────────────┤
│ AUTH_REQUIRED    │ AUTH_REVOCABLE   │ AUTH_CLAWBACK_ENABLED  │
├──────────────────┼──────────────────┼─────────────────────────┤
│ "Permiso previo" │ "Puede cancelar" │ "Puede recuperar"      │
│                  │                  │                         │
│ Antes de dar     │ Después de dar   │ Después de dar         │
│ trustline        │ trustline        │ trustline              │
│                  │                  │                         │
│ Issuer decide    │ Issuer puede     │ Issuer puede quitar    │
│ quién entra      │ echar a alguien  │ assets ya enviados     │
│                  │                  │                         │
│ Use case:        │ Use case:        │ Use case:              │
│ KYC/AML          │ Fraude/Hack      │ Errores/Legal          │
└──────────────────┴──────────────────┴─────────────────────────┘
```

#### ¿Cuándo Usar Cada Uno?

**Para stablecoins regulados (USDC, EURC):**
- ✅ AUTH_REQUIRED: Sí (compliance)
- ✅ AUTH_REVOCABLE: Sí (seguridad)
- ✅ AUTH_CLAWBACK: Sí (errores y legal)
- 
---

### Proceso de Crear una Trustline

**Paso a paso:**

```
1. Usuario decide qué asset quiere aceptar
   Ejemplo: USDC de Circle
   
2. Usuario construye una transacción con:
   - Operation: ChangeTrust
   - Asset: USDC:GA5ZSE...
   - Limit: 10,000 (máximo que quiere tener)
   
3. Usuario firma con su secret key
   (En la práctica: Freighter firma por ti)
   
4. Se envía a la red Stellar
   Fee: ~$0.000005
   Confirmación: 3-5 segundos
   
5. ✅ Trustline creada
   Ahora puede recibir USDC
```

---

## 💱 PARTE 5: DEX (DECENTRALIZED EXCHANGE)

### ¿Qué es el DEX de Stellar?

**NO es un contrato** - Es parte del **protocolo mismo**.

**Analogía:**
Imagina un mercado global gigante donde:
- Todos los assets de Stellar se pueden intercambiar
- Los precios son determinados por oferta/demanda
- Las transacciones son atómicas (o pasa todo o nada)

---

### Liquidez: El Combustible del DEX

Antes de seguir, necesitas entender un concepto CLAVE: **liquidez**.

#### ¿Qué es Liquidez?

**Definición simple:**
Liquidez es cuánto "dinero" (assets) está disponible para comprar o vender en el DEX **sin que el precio cambie mucho**.

**Analogía del Puesto de Empanadas:**

Imagina que vas a un puesto de empanadas en tu barrio:

**Caso 1: Alta Liquidez**
```
El puesto tiene 100 empanadas listas
Precio: $1 cada una

Tú compras 5 empanadas
→ Precio sigue siendo $1
→ El vendedor tiene suficientes
→ ¡Transacción rápida y justa!
```

**Caso 2: Baja Liquidez**
```
El puesto tiene solo 2 empanadas
Precio inicial: $1 cada una

Tú quieres 5 empanadas
→ Compras las 2 primeras a $1
→ El vendedor sube el precio a $2 (escasez)
→ Pagas más por las demás
→ ¡Precio total más alto!
```

#### Liquidez en Stellar

En el DEX de Stellar:
- Cada **par de assets** (XLM/USDC, XLM/EURC, etc.) tiene un **order book**
- El order book es una lista de órdenes de compra/venta
- **Más assets en el order book = Más liquidez = Mejores precios**

**Ejemplo con números:**

```
Order Book XLM/USDC con ALTA LIQUIDEZ:
├─ Alguien vende 10,000 XLM a 0.10 USDC cada uno
├─ Alguien vende 20,000 XLM a 0.101 USDC cada uno
└─ Alguien vende 50,000 XLM a 0.102 USDC cada uno

Si quieres comprar 1,000 XLM:
→ Compras todo a 0.10 USDC
→ Pagas: 100 USDC
→ ¡Precio estable!
```

```
Order Book XLM/USDC con BAJA LIQUIDEZ:
├─ Alguien vende 100 XLM a 0.10 USDC cada uno
└─ Alguien vende 50 XLM a 0.15 USDC cada uno

Si quieres comprar 1,000 XLM:
→ Compras 100 a 0.10 = 10 USDC
→ Compras 50 a 0.15 = 7.5 USDC
→ No hay más disponibles...
→ ¡Transacción puede fallar o pagar mucho más!
```

#### ¿Por Qué Importa la Liquidez?

**1. Determina si tu transacción funciona**
- Sin liquidez, tu swap puede fallar
- Ejemplo: Quieres cambiar 10,000 XLM pero solo hay 100 disponibles

**2. Determina el precio que pagas**
- Alta liquidez = Precio justo
- Baja liquidez = Pagas más (slippage)

**3. Hace que Path Payments sean posibles**
- Stellar busca rutas con alta liquidez
- Combina liquidez de múltiples order books
- Te da el mejor precio posible

#### Diagrama Visual

```
═══════════════════════════════════════════════
         ALTA LIQUIDEZ                BAJA LIQUIDEZ
═══════════════════════════════════════════════

Order Book: $100,000          Order Book: $100
Cambias 1,000 XLM             Cambias 1,000 XLM
    ↓                              ↓
Precio estable: 0.10          Precio sube: 0.10→0.15
    ↓                              ↓
Recibes: 100 USDC             Recibes: 90 USDC
                              (perdiste 10 USDC)
═══════════════════════════════════════════════
```

#### Cómo se Aumenta la Liquidez

**1. Liquidity Pools (Pools de Liquidez)**
```
Usuarios depositan assets en un pool
Ejemplo: Pool XLM/USDC
- Usuario A deposita 10,000 XLM
- Usuario B deposita 1,000 USDC
- Ambos ganan fees por proveer liquidez
```

**2. Market Makers (Creadores de Mercado)**
```
Empresas grandes colocan órdenes masivas
Ejemplo: Circle ofrece 1,000,000 USDC en el order book
→ Garantiza liquidez para todos
```

**3. Path Payments (Multi-ruta)**
```
Combina liquidez de diferentes order books
Ejemplo: XLM → EURC → USDC
- Usa liquidez de XLM/EURC
- Usa liquidez de EURC/USDC
- ¡Más liquidez total!
```

#### Ejemplo Real: Soroswap (Palta Labs)

**El problema:**
- Un usuario quiere cambiar 1,000 XLM por USDC
- El order book directo XLM/USDC tiene poca liquidez
- Precio: 0.08 USDC/XLM (malo)

**La solución de Soroswap:**
```
1. Busca TODAS las rutas posibles:
   - Ruta A: XLM → USDC (directa)
   - Ruta B: XLM → EURC → USDC
   - Ruta C: XLM → BTC → USDC

2. Analiza liquidez en cada ruta:
   - Ruta A: $10,000 liquidez → 0.08 USDC/XLM
   - Ruta B: $100,000 liquidez → 0.10 USDC/XLM ✓
   - Ruta C: $50,000 liquidez → 0.09 USDC/XLM

3. Elige la mejor ruta (B)
   - 1,000 XLM → 900 EURC → 990 USDC
   - ¡Ganaste 90 USDC más que la ruta directa!
```

**Por eso Soroswap es un "agregador"** - encuentra liquidez en múltiples lugares y te da el mejor precio.

#### Conexión con tu dApp

En tu dApp de la Clase 7:
- ✅ Trabajas con USDC (asset con ALTA liquidez en Stellar)
- ✅ Usas trustlines (necesarias para acceder a esa liquidez)
- ✅ Si implementas PathPayment (Sección 5), aprovecharás liquidez del DEX

**BeansApp** hace lo mismo: aprovecha la liquidez de USDC para que usuarios en cualquier país puedan enviar/recibir dinero fácilmente.

### Características Únicas

**1. Built-in (Integrado)**
- No necesitas crear un contrato DEX
- Está en el protocolo desde día 1
- Todos los assets se listan automáticamente

**2. Order Books (Libros de Órdenes)**
- Como exchanges tradicionales (Binance, Coinbase)
- Órdenes limit: "Compro 100 XLM a 0.10 USDC cada uno"
- No como AMM (Automated Market Maker) de Uniswap

**3. Atomic Swaps**
- O toda la transacción se completa, o nada
- No hay "estado intermedio"
- Seguridad máxima

### Cómo Funciona

**Ejemplo: Intercambiar XLM → USDC**

**Método 1: Order Book Direct**
```
1. Hay un order book: XLM/USDC
2. Offers existentes:
   - Alice vende 100 XLM a 0.10 USDC/XLM
   - Bob vende 200 XLM a 0.11 USDC/XLM
   
3. Tú compras 50 XLM:
   - Tomas los primeros 50 de Alice (mejor precio)
   - Pagas: 50 * 0.10 = 5 USDC
   - Alice recibe tu USDC
   - Tú recibes 50 XLM
```

**Método 2: Path Payment (¡Más inteligente!)**
```
Quieres: Enviar USD, pero tienes XLM
Stellar busca automáticamente rutas:

Ruta 1: XLM → USDC (directa)
  Costo: 100 XLM

Ruta 2: XLM → EURC → USDC (indirecta)
  Costo: 98 XLM

Stellar elige Ruta 2 (mejor precio)
Todo en UNA transacción
```

### Ventajas vs DEXs en otras blockchains

| Característica | Stellar DEX | Uniswap (Ethereum) |
|----------------|-------------|---------------------|
| **Tipo** | Order book | AMM (liquidity pools) |
| **Fee** | $0.000005 | $5-50 |
| **Velocidad** | 3-5 segundos | 15-60 segundos |
| **Slippage** | Predecible | Variable (puede ser alto) |
| **Integración** | Nativa | Contrato externo |

---

## 🚀 PARTE 6: PATH PAYMENTS (LA MAGIA)

### ¿Qué son Path Payments?

**Definición simple:**
Una transacción que **convierte automáticamente** un asset en otro mientras lo envía.

**Analogía:**
Es como una **casa de cambio automática dentro de tu pago**.

---

### ¿Qué es Slippage? (Concepto Clave)

Antes de entender path payments, necesitas saber qué es **slippage**.

#### Definición Simple

**Slippage** es la diferencia entre el precio que **esperas** pagar y el precio que **realmente** pagas, causada por **baja liquidez**.

#### Analogía del Cambio de Moneda

Imagina que vas a una casa de cambio para convertir pesos a dólares:

**Sin Slippage (Alta Liquidez):**
```
Cartel dice: $1,000 pesos = $50 USD (rate: 20 pesos/USD)

Tú cambias $10,000 pesos:
→ Rate se mantiene en 20
→ Recibes: $500 USD
→ Todo como esperabas ✓
```

**Con Slippage (Baja Liquidez):**
```
Cartel dice: $1,000 pesos = $50 USD (rate: 20 pesos/USD)

Pero la casa de cambio solo tiene $50 USD disponibles

Tú intentas cambiar $10,000 pesos:
→ Primeros $1,000 a rate 20 = $50 USD
→ Siguientes $9,000... ya no hay USD
→ Te ofrecen rate 25 pesos/USD (peor)
→ Recibes: $50 + $360 = $410 USD total
→ Esperabas $500, recibiste $410
→ Slippage = $90 USD perdidos ✗
```

#### Slippage en Stellar

**Ejemplo numérico:**

```
Quieres cambiar 1,000 XLM por USDC

Order Book XLM/USDC:
├─ 100 XLM disponibles a 0.10 USDC/XLM
├─ 200 XLM disponibles a 0.11 USDC/XLM
└─ 700 XLM disponibles a 0.12 USDC/XLM

Tu expectativa:
1,000 XLM × 0.10 = 100 USDC

Realidad:
- Primeros 100 XLM: 100 × 0.10 = 10 USDC
- Siguientes 200 XLM: 200 × 0.11 = 22 USDC
- Últimos 700 XLM: 700 × 0.12 = 84 USDC
- Total recibido: 116 USDC

Wait... ¿recibiste MÁS? ¡No! Lo calculamos al revés.

Correctamente:
- Para obtener 10 USDC: necesitas 100 XLM (rate 0.10)
- Para obtener 22 USDC: necesitas 200 XLM (rate 0.11)
- Para obtener 68 USDC: necesitas 700 XLM (rate 0.12)
- Total obtenido: 100 USDC esperados
- Pero gastaste TODO: 1,000 XLM cuando esperabas gastar menos

Slippage = Pagaste más XLM por el mismo USDC
```

**Versión más clara:**

```
SIN slippage (alta liquidez):
1,000 XLM → 100 USDC (rate: 0.10)
Perfecto ✓

CON slippage (baja liquidez):
1,000 XLM → 92 USDC (rate promedio: 0.092)
Perdiste 8 USDC de valor ✗
```

#### ¿Por Qué Pasa el Slippage?

**1. Baja liquidez en el order book**
- No hay suficientes órdenes al precio que quieres
- Tienes que "subir" por el order book
- Cada nivel tiene peor precio

**2. Órdenes grandes vs liquidez pequeña**
- Quieres cambiar $10,000
- Order book solo tiene $1,000
- Mueves el precio al consumir toda la liquidez

**3. Volatilidad del mercado**
- Precios cambian rápido
- Entre que envías la transacción y se ejecuta, el precio subió

#### Cómo Minimizar Slippage

**1. Slippage Tolerance (Tolerancia)**
```javascript
// En un swap, defines tu máximo aceptable
Operation.pathPaymentStrictReceive({
  destMin: '95'  // Acepto mínimo 95 USDC
  // Si el slippage te da menos de 95, la transacción falla
})
```

**2. Path Payments (Múltiples Rutas)**
```
En vez de: XLM → USDC (baja liquidez)
Usa: XLM → EURC → USDC (más liquidez combinada)
→ Mejor precio, menos slippage
```

**3. Soroswap Aggregator**
```
Soroswap busca la ruta con menos slippage:
- Analiza liquidez en TODOS los pools
- Divide tu orden en múltiples paths
- Minimiza el impacto en el precio
```

#### Ejemplo Real: BeansApp

Cuando un usuario en Chile quiere enviar USDC a Europa:

**Sin path payment (alto slippage):**
```
Usuario envía: 1,000 XLM
Destino recibe: 85 USDC (slippage 15%)
Fee casa de cambio: 10%
Total pérdido: 25%
```

**Con path payment en Stellar (bajo slippage):**
```
Usuario envía: 1,000 XLM
Path: XLM → USDC (liquidez alta en DEX)
Destino recibe: 98 USDC (slippage 2%)
Fee Stellar: $0.000005
Total pérdido: 2%
```

**BeansApp aprovecha esto** para dar mejores rates que bancos tradicionales.

---

### Problema Tradicional

**Sin Path Payments:**
```
Quieres enviar 100 USD a tu prima, pero solo tienes XLM:

Paso 1: Ir a un exchange
Paso 2: Vender XLM por USDC
Paso 3: Enviar USDC a tu prima

= 2-3 transacciones
= Múltiples fees
= Más tiempo
= Más complejidad
```

**Con Path Payments:**
```
Una SOLA transacción:
1. Stellar recibe tu XLM
2. Encuentra el mejor path a USDC
3. Convierte automáticamente
4. Tu prima recibe USDC

= 1 transacción
= 1 fee ($0.000005)
= 3-5 segundos
= ¡Magia!
```

### Cómo Funciona Internamente

**Stellar busca "paths" (rutas) posibles:**

```
De: XLM
A: USDC

Paths posibles:
1. XLM → USDC (directo)
2. XLM → EURC → USDC
3. XLM → BTC → USDC
4. XLM → EURC → BRL → USDC

Stellar analiza CADA ruta:
- ✅ Liquidez en cada step (cuántos assets hay)
- ✅ Fees en cada step (cuánto cuesta)
- ✅ Slippage en cada step (cuánto pierdes por baja liquidez)
- ✅ Rate final (cuánto USDC obtienes)

Elige: La ruta que te da MÁS USDC con MENOS slippage
```

**Ejemplo con números:**

```
Quieres: Enviar 1,000 XLM, receptor recibe USDC

Ruta 1: XLM → USDC (directa)
- Liquidez: $10,000 en order book
- Rate: 0.09 USDC/XLM
- Slippage: 5% (poca liquidez)
- Recibes: 85.5 USDC

Ruta 2: XLM → EURC → USDC (indirecta)
- Liquidez XLM/EURC: $100,000 (alta)
- Liquidez EURC/USDC: $80,000 (alta)
- Rate combinado: 0.10 USDC/XLM efectivo
- Slippage: 1% (mucha liquidez)
- Recibes: 99 USDC

Stellar elige: Ruta 2
→ Ganaste 13.5 USDC más por elegir mejor path
```

**Esto es AUTOMÁTICO.** Tú solo dices "enviar XLM, receptor recibe USDC" y Stellar hace todo el trabajo.

### Tipos de Path Payments

**1. pathPaymentStrictSend** (Cantidad exacta a enviar)
```
Quiero enviar EXACTAMENTE 100 XLM
No me importa cuánto USDC llegue
(Útil cuando quieres vaciar una cuenta)
```

**2. pathPaymentStrictReceive** (Cantidad exacta a recibir)
```
Quiero que mi prima reciba EXACTAMENTE 100 USDC
No me importa cuánto XLM gaste
(Útil para pagos con monto fijo)
```

### Ejemplo Real: Remesas con Path Payment

**Escenario:**
- Tú en Argentina: Tienes 10,000 XLM
- Tu abuela en Paraguay: Quiere recibir 1,000 USDC

**Solución con Path Payment:**

```
Transacción única:
- Send: 10,000 XLM (tus fondos)
- Destination: Abuela's public key
- Dest Asset: USDC
- Dest Amount: 1,000 USDC

Stellar hace:
1. Encuentra mejor path: XLM → USDC
2. Calcula: 10,000 XLM = ~1,050 USDC
3. Convierte 9,523 XLM → 1,000 USDC
4. Tu abuela recibe exactamente 1,000 USDC
5. Te sobran 477 XLM

Todo en 3-5 segundos
Fee: $0.000005
```

### Path Payments en Acción: Soroswap

**Soroswap Aggregator** usa path payments de forma inteligente:

```
Usuario quiere: 100 USDC
Usuario tiene: XLM

Soroswap analiza:
- Pool 1: XLM/USDC (liquidez: $50k)
- Pool 2: XLM/EURC (liquidez: $200k)
- Pool 3: EURC/USDC (liquidez: $100k)

Decisión:
Path más eficiente: XLM → EURC → USDC
- Más liquidez
- Menos slippage
- Mejor rate

Ejecuta path payment automáticamente
Usuario recibe 100 USDC, mejor precio
```

---

## 🆚 PARTE 7: ASSETS NATIVOS VS TOKENS SOROBAN

Esta es la pregunta que TODAS se hacen. Vamos a resolverla de una vez.

### Tabla Comparativa

| Aspecto | Assets Nativos | Tokens Soroban |
|---------|---------------|----------------|
| **Código necesario** | Minimal (operaciones SDK) | Rust completo |
| **Complejidad** | ⭐ Baja | ⭐⭐⭐⭐ Alta |
| **Fees** | $0.000005 | $0.01-0.05 |
| **Velocidad** | 3-5 segundos | 3-5 segundos |
| **Trustlines** | ✅ Requeridas (seguridad) | ❌ No necesarias |
| **DEX integration** | ✅ Automática (built-in) | ⚠️ Manual (crear logic) |
| **Lógica custom** | ⚠️ Limitada (flags) | ✅ Ilimitada |
| **Ideal para** | Pagos, stablecoins, remesas | DeFi complejo, NFTs, DAOs |
| **Auditoría** | ⚠️ Protocolo (ya auditado) | ⚠️ Tu contrato (auditar) |
| **Mantenimiento** | ✅ Ninguno | ⚠️ Alto (upgrades) |

### ¿Cuándo Usar Assets Nativos?

**✅ Úsalos cuando:**

**1. Stablecoins**
```
Quieres crear un dólar/euro digital
Ejemplo: USDC, EURC, tu propia stablecoin local
```

**2. Pagos y Remesas**
```
Sistema de envío de dinero internacional
Ejemplo: MoneyGram, Fonbnk
```

**3. Tokens de Lealtad**
```
Puntos para clientes de tu negocio
Ejemplo: "EMPANADAS" canjeables por empanadas
```

**4. Representación de Assets Reales**
```
Acciones, bonos, oro tokenizado
Ejemplo: Bienes raíces fraccionados
```

**5. Cuando quieres SIMPLE y RÁPIDO**
```
No necesitas lógica compleja
Quieres lanzar YA
Fees ultra bajos importan
```

### ¿Cuándo Usar Tokens Soroban?

**✅ Úsalos cuando:**

**1. Lógica Compleja**
```
Sistema de votación ponderada
Vesting con cliffs y períodos
Royalties automáticos para NFTs
```

**2. DeFi Avanzado**
```
Lending/borrowing con tasas dinámicas
Yield farming con múltiples pools
Flash loans
```

**3. NFTs con Metadata Dinámica**
```
NFT cuya imagen cambia según eventos
Metadata que se actualiza on-chain
```

**4. DAOs (Organizaciones Descentralizadas)**
```
Gobernanza on-chain
Propuestas y votaciones
Tesorería automática
```

**5. Automatizaciones**
```
Estrategias de inversión automática (como DeFindex)
Rebalanceo de portfolios
Arbitraje automático
```

### Lo Mejor: Combinar Ambos 🔥

**El poder real viene de usar AMBOS juntos.**

**Ejemplo: DeFindex (Palta Labs)**

```
Assets Nativos (USDC, EURC)
    ↓ deposito
Vault (Contrato Soroban)
    ↓ lógica de inversión
Estrategias (Contratos Soroban)
    ↓ generan yield
Withdraw (Asset Nativo + ganancias)
```

**Flujo completo:**
1. Usuario deposita **USDC** (asset nativo)
2. DeFindex **Vault** (Soroban) recibe el depósito
3. Vault invierte en **Estrategias** (Soroban):
   - Liquidity pool en Soroswap
   - Lending en otro protocolo
4. Estrategias usan **Path Payments** (asset nativo)
5. Usuario retira **USDC** (asset nativo) con ganancias

**¿Ves el patrón?**
- Assets Nativos: Para mover valor (simple, rápido, barato)
- Soroban: Para lógica compleja (automatización, DeFi)

### Regla de Oro 🎯

> "Si solo necesitas mover valor de A a B, usa Assets Nativos.  
> Si necesitas lógica entre A y B, usa Soroban.  
> Si necesitas ambos, úsalos juntos."

---

## 💡 PARTE 8: CONCEPTOS CLAVE FINALES

### 1. Immutability (Inmutabilidad)

**Una vez emitido un asset, NO puedes:**
- Cambiar el código
- Cambiar el issuer
- "Recuperar" assets sin clawback flag

**Pero SÍ puedes:**
- Emitir más unidades (minting)
- Quemar unidades (burning)
- Cambiar authorization flags (si los configuraste)

### 2. Supply Management

**Emisión (Minting):**
```
Issuer envía asset a otra cuenta
→ Se crea supply nuevo
→ Total supply aumenta
```

**Quema (Burning):**
```
Asset regresa a la cuenta del issuer
→ Supply desaparece
→ Total supply disminuye
```

**Ejemplo: Circle controla supply de USDC**
```
Nuevo depósito de $1M USD:
→ Circle mint 1M USDC

Retiro de $500k USD:
→ Circle burn 500k USDC

Total supply = Depósitos - Retiros
```

### 3. Precision Decimal

**Todos los assets tienen 7 decimales de precisión:**

```
Representación interna: 64-bit integer
Scaled down por: 10,000,000

Ejemplo:
Internal: 25,123,456
User-facing: 2.5123456

Mínima unidad: 0.0000001 (1 stroop)
Máxima cantidad: 922,337,203,685.4775807
```

### 4. Authorization States

**Una cuenta puede estar en 3 estados para un asset:**

**1. NO_AUTHORIZATION** (Sin autorización)
```
No tiene trustline
No puede recibir/enviar el asset
```

**2. AUTHORIZED** (Autorizado)
```
Tiene trustline aprobada
Puede recibir/enviar libremente
```

**3. AUTHORIZED_TO_MAINTAIN_LIABILITIES** (Mantener pasivos)
```
Tiene trustline pero revocada
NO puede recibir nuevo asset
SÍ puede enviar asset existente
Útil para: Cerrar posiciones sin freezar completamente
```

---

## 🎯 RESUMEN EJECUTIVO

### Lo que aprendiste en esta sección:

✅ **Historia**: Por qué Stellar creó Assets Nativos (resolver remesas caras)

✅ **Concepto**: Son tokens nativos del protocolo, sin contratos necesarios

✅ **Casos reales**:
- USDC: $4.2B en volumen, MoneyGram, UNHCR
- EURC: Remesas Europa-Latam, Ripio
- BeansApp: Wallet holandesa, impacto global
- Palta Labs: Soroswap + DeFindex revolucionando Latam

✅ **Trustlines**: Tu cuenta para cada tipo de asset (previene spam)

✅ **DEX**: Exchange integrado en el protocolo (order books)

✅ **Path Payments**: Conversión automática de assets (la killer feature)

✅ **Assets vs Soroban**:
- Assets = Simple, rápido, barato (pagos)
- Soroban = Complejo, flexible (DeFi)
- Mejor = Combinar ambos

### Números que recordar:

- 💰 Fee: **$0.000005** por transacción
- ⚡ Velocidad: **3-5 segundos**
- 💵 USDC supply en Stellar: **$83M+**
- 📊 Volumen USDC total: **$4.2B+**
- 🏪 MoneyGram locations: **200,000+**
- 🥑 Palta Labs hackathons ganados: **Múltiples** (incluyendo 1er lugar Consensus)

### La gran lección:

**Assets Nativos son perfectos para pagos porque:**
1. Son SIMPLES - No necesitas ser experto en Rust
2. Son BARATOS - Fees 1,000x más bajos que Ethereum
3. Son RÁPIDOS - Confirmación casi instantánea
4. Son PROBADOS - $4.2B movidos exitosamente

**Por eso grandes empresas los usan:**
- Circle (USDC/EURC)
- MoneyGram (cash-to-crypto)
- BeansApp (wallet global)
- Palta Labs (DeFi en Latam)

---

## 🦈 AHORA SÍ, A CONSTRUIR

Ahora que entiendes la teoría, es hora de HACER.

En la siguiente sección vas a construir una dApp completa que:
- ✅ Se conecta a Freighter Wallet
- ✅ Muestra balance de USDC
- ✅ Crea trustlines
- ✅ Funciona en testnet
- ✅ Se despliega en Vercel

**No solo vas a entender Assets Nativos — vas a USARLOS.**

Eso es ser una Tiburona Builder. 🦈⚡

---

**Siguiente:** [💻 SECCIÓN 3: CÓDIGO COMPLETO →](./clase7-3-codigo.md)

**Anterior:** [← 📋 SECCIÓN 1: RESUMEN](./clase7-1-resumen.md)

---

🦈⚡ **¡Sigue nadando, Tiburona!** ⚡🦈
