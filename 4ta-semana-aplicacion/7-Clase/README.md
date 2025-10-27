# 🦈 CLASE 7: ASSETS NATIVOS EN STELLAR

## ¡BUEN DÍA, TIBURONAS! ⚡

Esta es tu guía completa para dominar Assets Nativos en Stellar. Está dividida en 4 secciones diseñadas para llevarte de cero a builder en 60 minutos.

---

## 📚 ESTRUCTURA DE LA CLASE

### 📋 [SECCIÓN 1: RESUMEN Y BIENVENIDA](https://github.com/BuenDia-Builders/codigofutura/blob/main/4ta-semana-aplicacion/7-Clase/01-resumen.md)

Tu punto de partida. Aquí descubrirás:
- 🎯 Qué vas a lograr hoy
- 🗺️ Cómo está organizada la clase
- ✅ Checklist de requisitos previos
- 🔥 Por qué esto es importante

**¿Para quién?** TODAS, sin excepción. Lee esto primero.

---

### 📖 [SECCIÓN 2: TEORÍA CONCEPTUAL](https://github.com/BuenDia-Builders/codigofutura/blob/main/4ta-semana-aplicacion/7-Clase/02-teoria.md)

El fundamento que necesitas antes de construir. Incluye:
- 📜 Historia: Por qué se crearon los Assets Nativos
- 🏦 Concepto: Qué son y cómo funcionan (la analogía del banco global)
- 💵 Casos reales: USDC, EURC, BeansApp (Holanda), Palta Labs (Chile)
- 🔑 Trustlines: Tu sistema de seguridad explicado a fondo
- 💱 DEX y Path Payments: La killer feature de Stellar
- 🆚 Comparación: Assets Nativos vs Tokens Soroban (cuándo usar cada uno)

**¿Para quién?** Para TODAS. Incluso si ya programas, necesitas entender el contexto.

**Lo que vas a entender:**
- Por qué USDC eligió Stellar (números reales: $4.2B en volumen)
- Cómo MoneyGram mueve dinero en 200,000+ locaciones
- Por qué BeansApp (wallet holandesa) usa Stellar para impacto global
- Cómo Palta Labs revoluciona DeFi en Latinoamérica

---

### 💻 [SECCIÓN 3: CÓDIGO COMPLETO](https://github.com/BuenDia-Builders/codigofutura/blob/main/4ta-semana-aplicacion/7-Clase/03-codigo.md)

Aquí construyes la dApp paso a paso. Incluye:
- ⚠️ **Aclaración crítica:** Por qué NO usas contratos Soroban
- 🏗️ Arquitectura completa de la dApp
- 📦 Setup en Visual Studio Code (desde cero)
- 🗄️ Configuración de Supabase (backend)
- 💻 Componentes Frontend:
  - WalletConnect.jsx (conectar Freighter)
  - AssetBalance.jsx (ver balance de USDC)
  - CreateTrustline.jsx (crear trustlines)
- 🚀 Deploy en Vercel (paso a paso)

**Cada línea de código tiene comentarios** explicando:
- ✅ QUÉ hace
- ✅ POR QUÉ lo hace
- ✅ CÓMO funciona

**¿Para quién?** Para las que quieren CONSTRUIR. No es copy-paste, es entender.

**Resultado:** Una URL pública donde tu dApp funciona (ej: `https://tu-dapp.vercel.app`)

---

### 📖 [SECCIÓN 4: VOCABULARIO Y TROUBLESHOOTING](https://github.com/BuenDia-Builders/codigofutura/blob/main/4ta-semana-aplicacion/7-Clase/04-guias.md)

Tu guía de rescate. Incluye:
- 📚 **Vocabulario completo** (A-Z)
  - Cada término explicado de forma simple
  - Ejemplos concretos
  - Analogías comprensibles
  
- 🔧 **Troubleshooting detallado**
  - 10+ errores comunes con soluciones
  - Debugging tips
  - Checklist de verificación
  - Recursos adicionales

**¿Para quién?** Para TODAS, en cualquier momento que algo no funcione.

**Casos cubiertos:**
- ❌ "Freighter is not installed"
- ❌ "Account not found"
- ❌ "Insufficient balance"
- ❌ "Transaction failed"
- ❌ Y 6 errores más...

---

### 🔥 [SECCIÓN 5: MEJORAS AVANZADAS (OPCIONAL)](https://github.com/BuenDia-Builders/codigofutura/blob/main/4ta-semana-aplicacion/7-Clase/5-mejoras-avanzadas.md)
**⏱️ Tiempo: 1-2 horas (según mejoras elegidas)**

**¡NUEVO!** Para tiburonas que quieren llevar su dApp al siguiente nivel.

Incluye 6 mejoras opcionales:
1. **Constants.js** - Issuer consistente (evita confusión testnet/mainnet)
2. **Spinner** - Loading animado profesional
3. **Validación de duplicados** - UX mejorada
4. **Instrucciones para USDC** - Guía completa para testnet
5. **PathPayment** - Componente avanzado (DEX y conversiones)
6. **Warnings mejorados** - Seguridad reforzada

**¿Para quién?** Para las que YA completaron la clase básica y quieren:
- Código más profesional
- Prepararse para mainnet
- Impresionar en portfolios
- Dominar Stellar a fondo

**Cada mejora incluye:**
- 📝 Problema que resuelve
- ✅ Solución con código completo
- 💡 Beneficios
- ⏱️ Tiempo estimado

**Recomendación:** Haz la clase básica primero (Secciones 1-4), LUEGO vuelve a la Sección 5.

---

## 🎯 ¿POR DÓNDE EMPEZAR?

### Si eres NUEVA en blockchain:
```
1. 📋 Lee SECCIÓN 1 (resumen)
2. 📖 Lee SECCIÓN 2 (teoría) completa
3. 💻 Sigue SECCIÓN 3 (código) paso a paso
4. 📖 Ten SECCIÓN 4 (guías) abierta por si necesitas
```

### Si ya programaste en Stellar:
```
1. 📋 Vistazo rápido a SECCIÓN 1
2. 📖 Skim SECCIÓN 2 (enfócate en casos reales)
3. 💻 Directo a SECCIÓN 3 (código)
4. 📖 Usa SECCIÓN 4 como referencia
```

### Si tienes un error ahora mismo:
```
1. 📖 Ve directo a SECCIÓN 4 (troubleshooting)
2. Busca tu error específico
3. Sigue la solución
4. Si no está, busca en vocabulario
```

---

## 🔥 LO QUE HACE ESTA CLASE ÚNICA

### 1. **Sin Contratos Soroban = Más Simple**
Los Assets Nativos NO necesitan contratos inteligentes. Esto significa:
- ✅ Menos código
- ✅ Menos bugs
- ✅ Fees ultra bajos ($0.000005 vs $5-50 en Ethereum)
- ✅ Más rápido (3-5 segundos)

**En la SECCIÓN 3** explicamos a fondo por qué y cuándo SÍ necesitarías Soroban.

### 2. **Casos REALES, No Juguetes**
No vamos a crear tokens de mentiras. Trabajamos con:
- **USDC de Circle:** $4.2 billones en volumen (REAL)
- **BeansApp:** Wallet holandesa con impacto global en mercados emergentes
- **Palta Labs:** Startups chilenas revolucionando DeFi en Latam
- **MoneyGram:** 200,000+ locaciones usando esto HOY

**En la SECCIÓN 2** profundizamos en cada caso con números reales y ejemplos concretos.

### 3. **Código Totalmente Comentado**
Cada componente tiene:
- 📝 Comentarios línea por línea
- 🎯 Explicación del "por qué"
- ✅ Tips de mejores prácticas
- ⚠️ Advertencias importantes

**En la SECCIÓN 3** encuentras 3 componentes completos listos para usar.

### 4. **Troubleshooting Exhaustivo**
10+ errores comunes con:
- 🔍 Síntoma (cómo se ve el error)
- 🎯 Causa (por qué pasa)
- ✅ Solución (paso a paso)
- 💡 Prevención (cómo evitarlo)

**En la SECCIÓN 4** cada error tiene soluciones probadas.

---

## 📊 NÚMEROS QUE IMPORTAN

Estos son datos REALES (2025):

### Stellar vs Ethereum (Pagos)
| Métrica | Stellar | Ethereum |
|---------|---------|----------|
| **Fee promedio** | $0.000005 | $15-50 |
| **Confirmación** | 3-5 segundos | 15-60 segundos |
| **TPS** | 1,000+ | 15-30 |

### USDC en Stellar
- 💵 Supply: **$83M+**
- 📊 Volumen total: **$4.2B+**
- 👥 Cuentas: **500,000+**
- 💰 Off-ramps semanales: **$200,000**

### Palta Labs (Ecosystem Latam)
- 🏆 1er lugar Consensus Hackathon 2024
- 🥑 Proyectos: Soroswap + DeFindex
- 🌎 Impacto: Soluciones para inflación en Latam

**Ver detalles en SECCIÓN 2**

---

## 🦈 ¿QUÉ VAS A LOGRAR?

Al terminar esta clase, vas a:

### Entender
- ✅ Qué son los Assets Nativos y por qué son poderosos
- ✅ Por qué grandes empresas (Circle, MoneyGram) los usan
- ✅ Cómo funcionan trustlines (tu seguridad)
- ✅ Qué es el DEX y path payments (la magia)
- ✅ Cuándo usar Assets Nativos vs Soroban

### Construir
- ✅ Una dApp completa con Next.js
- ✅ 3 componentes funcionales (Wallet, Balance, Trustline)
- ✅ Backend con Supabase
- ✅ Deploy en Vercel (URL pública)

### Saber
- ✅ Debuggear errores comunes
- ✅ Usar Stellar Laboratory
- ✅ Consultar Horizon API
- ✅ Leer códigos de error

**Resultado final:** Un proyecto funcionando que puedes agregar a tu portfolio.

---

## ⚠️ IMPORTANTE: TESTNET VS MAINNET

**Durante toda la clase usamos TESTNET:**
- 🟢 Red de prueba (sin valor real)
- 💰 XLM gratis de friendbot
- ⚡ Misma funcionalidad que mainnet
- 🔒 Seguro para experimentar

**Configuración de Freighter:**
```
1. Abre Freighter
2. Settings (⚙️)
3. Network
4. Selecciona: Testnet
```

**Obtener XLM de prueba:**
```
1. Copia tu public key de Freighter
2. Ve a https://friendbot.stellar.org
3. Pega tu key
4. Click en "Get test network lumens"
5. ¡Listo! Tienes 10,000 XLM para probar
```

**⚠️ NUNCA uses mainnet sin probar TODO en testnet primero.**

---

## 🛠️ REQUISITOS PREVIOS

Antes de empezar, asegúrate de tener:

### Software
- [ ] **Node.js** (v18 o superior)
- [ ] **VS Code** (u otro editor)
- [ ] **Git** (para deploy)

### Cuentas (todas gratis)
- [ ] **Freighter Wallet** (extensión de navegador)
- [ ] **Supabase** (backend)
- [ ] **Vercel** (hosting)
- [ ] **GitHub** (código fuente)

### Preparación
- [ ] XLM en testnet (de friendbot)
- [ ] Freighter configurado en testnet
- [ ] Ganas de construir 🔥

**Ver checklist completo en SECCIÓN 1**

---

## 🎬 ESTRUCTURA DE 60 MINUTOS

### Minutos 0-5: Bienvenida
- 📋 Leer SECCIÓN 1 (Resumen)
- ✅ Verificar requisitos
- 🎯 Entender qué vamos a lograr

### Minutos 5-25: Teoría
- 📖 Leer SECCIÓN 2 (Teoría)
- 🏦 Entender Assets Nativos
- 💵 Ver casos reales (USDC, BeansApp, Palta Labs)
- 🔑 Comprender trustlines y DEX

### Minutos 25-55: Construcción
- 💻 Seguir SECCIÓN 3 (Código)
- 🔧 Setup de VS Code
- 🗄️ Configurar Supabase
- 💻 Escribir componentes
- 🚀 Deploy en Vercel

### Minutos 55-60: Testing
- ✅ Probar la dApp
- 🦈 Celebrar logro
- 📖 Marcar SECCIÓN 4 para referencia

**Tiempo flexible:** Puedes tomarte más si necesitas. Lo importante es entender, no apurarse.

---

## 💡 TIPS PARA APROVECHAR AL MÁXIMO

### 1. Lee en Orden
```
NO saltes directo al código
SÍ lee la teoría primero
```
Entender el "por qué" hace que el "cómo" sea más fácil.

### 2. Ten Dos Monitores/Tabs
```
Tab 1: Documentación (esta guía)
Tab 2: VS Code
Tab 3: Freighter + dApp
```

### 3. No Copies y Pegues Sin Entender
```
Lee los comentarios del código
Entiende QUÉ hace cada línea
Pregunta si algo no está claro
```

### 4. Usa la Sección 4
```
¿Error? → Ve a Troubleshooting
¿Término raro? → Ve a Vocabulario
¿Stuck? → Lee Debugging Tips
```

### 5. Celebra los Pequeños Logros
```
✅ Conectaste wallet → ¡Celebra!
✅ Creaste trustline → ¡Celebra!
✅ Desplegaste en Vercel → ¡CELEBRA!
```
---

## 🆘 ¿NECESITAS AYUDA?

### Durante la Clase
1. 📖 Revisa SECCIÓN 4 (Troubleshooting)
2. 💬 Pregunta en el grupo
3. 🔍 Busca en Stack Overflow [stellar] tag

### Después de la Clase
- **Discord de Stellar:** https://discord.gg/stellardev
- **Documentación oficial:** https://developers.stellar.org
- **Stellar Laboratory:** https://laboratory.stellar.org
- **Tu comunidad de Tiburonas**

---

## 🦈 MENTALIDAD TIBURONA

Antes de empezar, recuerda:

### Las tiburonas reales:
- 🦈 Nadan hacia adelante (nunca se quedan atascadas)
- 🦈 Son precisas (una mordida certera)
- 🦈 Son persistentes (si algo no funciona, prueban otro ángulo)
- 🦈 Son antiguas y efectivas (evolucionaron por millones de años)

### Tú como Tiburona Builder:
- 🦈 Avanzas aunque no entiendas el 100%
- 🦈 Preguntas sin miedo
- 🦈 Debuggeas con paciencia
- 🦈 Construyes cosas que duran

---

## 🎯 TU OBJETIVO HOY

Al terminar, vas a poder decir:

> "Creé una dApp que maneja USDC real. Entiendo cómo funcionan los Assets Nativos. Sé por qué Stellar es perfecto para pagos. Lo construí TODO desde cero. Y está desplegado en internet."

**Eso no es poca cosa.**

Eso es ser parte del **0.1% de personas** que realmente entienden blockchain de pagos.

Eso es ser una **Tiburona Builder**. 🦈⚡

---

## 📝 DESPUÉS DE LA CLASE

Cosas que puedes hacer:

### Nivel 1: Experimentar
- [ ] Crea trustlines para otros assets (EURC, etc.)
- [ ] Modifica los límites de trustlines
- [ ] Prueba con diferentes issuers

### Nivel 2: Expandir
- [ ] Agrega más assets a tu dApp
- [ ] Implementa path payments
- [ ] Crea historial de transacciones

### Nivel 3: Crear
- [ ] Crea TU propio asset
- [ ] Construye una wallet simple
- [ ] Integra con DeFindex de Palta Labs

### Nivel Tiburón 🦈
- [ ] Combina Assets Nativos + Soroban
- [ ] Crea un MVP de producto real
- [ ] Lanza en mainnet (con precaución)

---

Esta clase se inspira en proyectos reales:

- **Circle:** Por USDC en Stellar
- **BeansApp:** Por democratizar pagos globales
- **Palta Labs:** Por revolucionar DeFi en Latam
- **Stellar Development Foundation:** Por el protocolo
- **Todas las Tiburonas:** Por construir el futuro

---

## 📣 COMPARTE TU PROGRESO

Cuando termines:

- 📸 Toma screenshot de tu dApp funcionando
- 🔗 Comparte tu URL de Vercel
- 💬 Cuenta qué aprendiste
- 🦈 Usa #TiburonasBuilders

**Tus compañeras quieren celebrar contigo.** 🎉

---

## 🦈⚡ ¡VAMOS A CONSTRUIR, TIBURONAS! ⚡🦈

El futuro de los pagos se construye hoy.

Y tú eres parte de él.

---

*Clase 7: Assets Nativos en Stellar*  
*Construida con 💙 por Tiburonas para Tiburonas*  
*Octubre 2025*
