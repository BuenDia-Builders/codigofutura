# 🦈 CLASE 7: ASSETS NATIVOS EN STELLAR

## ¡BUEN DÍA, TIBURONAS! ⚡

Hoy es un día especial. Hoy vas a **construir con dinero REAL** en blockchain.

No vamos a quedarnos en teoría. En los próximos 60 minutos vas a:
- ✅ Entender qué son los Assets Nativos (el poder real de Stellar)
- ✅ Crear tu primera trustline (abrir tu cuenta para recibir dólares digitales)
- ✅ Ver cómo empresas REALES mueven millones de dólares por centavos
- ✅ Construir una dApp que maneja stablecoins como USDC

¿Nerviosa? Es normal. ¿Emocionada? Deberías estarlo. 

**Esto no es poca cosa.** Mientras otros blockchains cobran $50 de gas, Stellar cobra $0.000005. Mientras otros tardan minutos, Stellar confirma en 3 segundos. Y hoy vas a ver por qué.

---

## 🎯 ¿QUÉ VAS A LOGRAR HOY?

Al final de esta clase, vas a ser parte del **0.1% de personas** que realmente entienden cómo funcionan los pagos digitales del futuro.

### Lo que vas a dominar:

**1. ASSETS NATIVOS** 💰
- Qué son y por qué son diferentes a todo lo demás
- Por qué USDC eligió Stellar (y no Ethereum)
- Cómo BeansApp (Holanda) y Palta Labs (Chile) los usan

**2. TRUSTLINES** 🔑
- Tu "cuenta bancaria" para cada tipo de dinero digital
- Por qué esto previene spam y te protege
- Cómo crear una en segundos

**3. DEX Y PATH PAYMENTS** 💱
- El exchange que está EN el protocolo
- Cómo enviar USD pero pagar con XLM (en una sola transacción)
- Por qué esto revoluciona las remesas

**4. TU PRIMERA DAPP** 🚀
- Frontend en Vercel
- Backend en Supabase
- Wallet con Freighter
- Todo conectado y funcionando

---

## 📚 ESTRUCTURA DE LA CLASE

Esta clase tiene 4 secciones. Si algo no queda claro en una, salta a la siguiente y vuelve después:

### 📖 [SECCIÓN 2: TEORÍA CONCEPTUAL](https://github.com/BuenDia-Builders/codigofutura/blob/main/4ta-semana-aplicacion/7-Clase/02-teoria.md)
**Lo que necesitas saber antes de construir**

Aquí vas a entender:
- 🏦 Qué son los Assets Nativos (la analogía del banco global)
- 💵 Ejemplos reales: USDC, EURC, BeansApp, Palta Labs
- 🔑 Trustlines: tu sistema de seguridad
- 💱 DEX y Path Payments: la magia de Stellar
- 🆚 Assets Nativos vs Tokens Soroban (cuándo usar cada uno)

**¿Para quién?** Para TODAS. Incluso si ya sabes programar, esta sección te da el contexto del POR QUÉ estamos haciendo lo que vamos a hacer.

---

### 💻 [SECCIÓN 3: CÓDIGO COMPLETO](https://github.com/BuenDia-Builders/codigofutura/blob/main/4ta-semana-aplicacion/7-Clase/03-codigo.md)
**La dApp paso a paso**

Aquí vas a construir:
- 🔌 Componente para conectar wallet
- 💰 Componente para ver tu balance de USDC
- ✅ Componente para crear trustlines
- 🗄️ Backend con Supabase
- 🚀 Deploy en Vercel
- 📱 Todo funcionando en testnet

**¿Para quién?** Para las que quieren HACER. Cada línea de código tiene comentarios explicando qué hace y por qué.

**IMPORTANTE:** No necesitas contratos en Soroban para esto. Los Assets Nativos funcionan directo en el protocolo de Stellar. Por eso es tan simple y tan poderoso.

---

### 📖 [SECCIÓN 4: VOCABULARIO Y TROUBLESHOOTING](https://github.com/BuenDia-Builders/codigofutura/blob/main/4ta-semana-aplicacion/7-Clase/04-guias.md)
**Tu guía de rescate**

Aquí está:
- 📚 Diccionario de términos clave
- 🔧 Errores comunes y cómo resolverlos
- 💡 Tips para debugging
- 🆘 Qué hacer si algo no funciona


**¿Para quién?** Para TODAS, en cualquier momento que algo no funcione o no entiendas un término.

---

## 🔥 LO QUE HACE ESTA CLASE DIFERENTE

### 1. CASOS REALES, NO JUGUETES
No vamos a crear un "token de mentiras". Vamos a trabajar con:
- **USDC:** $4.2 BILLONES en volumen real
- **BeansApp:** Wallet holandesa con impacto global en mercados emergentes
- **Palta Labs:** Startups chilenas que están revolucionando DeFi en Latam
- **MoneyGram:** 200,000+ locaciones usando esto HOY

### 2. SIN CONTRATOS = MÁS SIMPLE
Los Assets Nativos NO necesitan contratos en Soroban. Esto significa:
- ✅ Menos código
- ✅ Menos bugs
- ✅ Fees ultra bajos
- ✅ Más rápido

**¿Cuándo SÍ necesitas Soroban?**
- Cuando quieres lógica compleja (como DeFindex: yield automático)
- Cuando necesitas NFTs con metadata dinámica
- Cuando construyes un DEX como Soroswap

Pero para pagos, stablecoins, remesas → **Assets Nativos son perfectos**.

### 3. CONSTRUYES ALGO QUE FUNCIONA
Al final de esta clase, vas a tener:
- ✅ Una dApp desplegada en internet (URL real)
- ✅ Conectada a tu wallet
- ✅ Mostrando balance de USDC
- ✅ Creando trustlines que quedan en blockchain

No es un tutorial de YouTube. Es TU proyecto funcionando.

---

## 📊 NÚMEROS QUE IMPORTAN

Estos no son números inventados. Son datos REALES de hoy:

| Métrica | Stellar | Ethereum |
|---------|---------|----------|
| **Fee promedio** | $0.000005 | $15-50 |
| **Tiempo de confirmación** | 3-5 segundos | 15-60 segundos |
| **USDC en circulación** | $83M+ | $20B+ |
| **Transacciones por segundo** | 1,000+ | 15-30 |

**¿Ves el patrón?** Ethereum tiene más volumen (por ahora), pero Stellar es MUCHO mejor para pagos.

Por eso Circle (creadores de USDC) eligió Stellar como su tercera blockchain oficial.

---

## ⚠️ IMPORTANTE: TESTNET VS MAINNET

Durante toda esta clase vamos a usar **TESTNET**:
- 🟢 **Testnet** = Red de prueba (XLM gratis, sin valor real)
- 🔴 **Mainnet** = Red real (XLM con valor, transacciones reales)

**¿Por qué testnet?**
- Puedes experimentar sin miedo
- Los errores no cuestan dinero
- Practicas buenos hábitos desde el inicio

**¿Cuándo usar mainnet?**
- Cuando ya probaste TODO en testnet
- Cuando vas a lanzar tu producto real
- Cuando manejas dinero de verdad

**Practica aquí, perfecciona allá.** 🎯

---

## 🦈 ANTES DE EMPEZAR: CHECKLIST

Asegúrate de tener esto listo:

- [ ] **Freighter Wallet** instalada (testnet activado)
- [ ] **XLM de testnet** (consigue gratis en friendbot)
- [ ] **VS Code** instalado
- [ ] **Node.js** instalado (v18 o superior)
- [ ] **Cuenta de Supabase** (gratis)
- [ ] **Cuenta de Vercel** (gratis)
- [ ] **Ganas de romperla** 🔥

---

## 🚀 ¿LISTA PARA EMPEZAR?

Esta no es una clase más. Hoy vas a entender por qué Stellar está revolucionando los pagos globales.

Hoy vas a construir algo que podría ser la base de tu próxima startup.

Hoy vas a ser parte del futuro de las finanzas.

**No solo vas a aprender sobre Assets Nativos — vas a USARLOS.**

---

## 🎯 OBJETIVO DE HOY

**Al terminar esta clase, vas a poder decir:**

> "Creé una dApp que maneja USDC. Entiendo cómo funcionan los Assets Nativos. Sé por qué Stellar es perfecto para pagos. Y lo construí TODO desde cero."

**Eso no es poca cosa.** Eso es ser una Tiburona Builder.

Ahora sí, ¡vamos a construir! 🦈⚡

---

**Siguiente:** [📖 SECCIÓN 2: TEORÍA CONCEPTUAL →](https://github.com/BuenDia-Builders/codigofutura/blob/main/4ta-semana-aplicacion/7-Clase/02-teoria.md)

---

🦈⚡ **¡Vamos a construir, Tiburonas!** ⚡🦈
