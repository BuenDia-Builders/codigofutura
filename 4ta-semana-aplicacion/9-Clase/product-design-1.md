# Diseño de Producto para Blockchain - Clase 1
## De la Idea al MVP Validado

### 📚 Código Futura - Buen Día Builders

---

## 🎯 Introducción

Los próximos dos sábados son diferentes a lo que vieron en desarrollo. Aquí no vamos a hablar de código, contratos inteligentes ni Soroban directamente. **Vamos a hablar de PERSONAS.**

Ustedes ya saben construir en Stellar. Ahora necesitan aprender a construir **LO CORRECTO**. 

### ¿Por qué es importante?

En una hackathon, y especialmente al buscar fondeo, **no gana el mejor código**. Gana el equipo que:
- Resuelve el **problema más relevante**
- Lo comunica de la **forma más clara**
- Demuestra **impacto real** en usuarios reales

---

## 📖 Objetivos de Aprendizaje

Al finalizar esta clase, serás capaz de:

### 1. **Validar ideas**
Analizarás si tus ideas realmente necesitan de la tecnología blockchain y específicamente de Stellar.

### 2. **Definir un MVP**
Concretarás qué puedes construir y demostrar en el tiempo limitado de una hackathon.

### 3. **Estructurar el flujo de producto**
Diseñarás el flujo principal de tu producto desde la perspectiva del usuario.

### 4. **Preparación para la próxima clase**
En la Clase 2 trabajaremos: Prototipo, pitch y preparación para presentar.

---

## 🔍 Parte 1: Validación de la Idea Blockchain

### La pregunta incómoda

Antes de empezar a diseñar, necesitamos hacernos **LA pregunta incómoda**:

> **¿Este problema REALMENTE necesita blockchain?**

Esta pregunta es crítica porque:
- Muchos proyectos usan blockchain sin necesidad real
- Blockchain agrega complejidad técnica
- No todos los problemas se benefician de descentralización
- Puede ser más caro y lento que alternativas centralizadas

---

### ❌ Blockchain NO es la solución para:

#### 1. **Problemas que se resuelven con una base de datos normal**
Si puedes resolverlo con PostgreSQL, MySQL o MongoDB de forma efectiva, probablemente no necesites blockchain.

**Ejemplo de cuando NO usar blockchain:**
- Sistema de gestión de inventario interno de una empresa
- Blog personal o sitio web corporativo
- Sistema de reservas de un restaurante
- Aplicación de to-do list personal

**¿Por qué?** Estos casos no requieren:
- Descentralización
- Inmutabilidad pública
- Confianza sin intermediarios
- Transparencia auditable por terceros

#### 2. **Situaciones donde no necesitas descentralización**
Si una autoridad central es aceptable y eficiente, blockchain añade fricción innecesaria.

**Ejemplo de cuando NO usar blockchain:**
- Sistema de nómina interno de una empresa
- Gestor de proyectos de equipo (como Trello, Asana)
- CRM (Customer Relationship Management) corporativo
- Sistema de facturación interna

**¿Por qué?** La empresa o equipo ya tiene autoridad central establecida y confianza entre las partes. No necesitan consenso distribuido ni eliminar intermediarios.

#### 3. **Casos donde la velocidad extrema o privacidad total son críticas**
Blockchain público es inherentemente más lento que bases de datos tradicionales y más transparente.

**Ejemplo de cuando NO usar blockchain:**
- Trading de alta frecuencia (HFT) que requiere microsegundos
- Datos médicos extremadamente sensibles que nunca deben ser públicos
- Información clasificada de defensa nacional
- Datos personales que requieren derecho al olvido (GDPR)

**¿Por qué?** Las blockchains públicas son:
- Más lentas que bases de datos centralizadas (por el consenso distribuido)
- Transparentes por naturaleza (aunque se puede usar encriptación)
- Inmutables (no se puede "borrar" información fácilmente)

---

### ✅ Blockchain SÍ es la solución cuando necesitas:

#### 1. **🔍 Transparencia inmutable (auditoría pública)**
Cuando necesitas que múltiples partes puedan verificar que algo ocurrió sin poder modificarlo.

**Casos de uso:**
- Registros de donaciones caritativas (demostrar que el dinero llegó al destino)
- Cadena de custodia de productos (trazabilidad de alimentos, medicinas)
- Certificados académicos o profesionales verificables
- Votaciones electrónicas con auditoría pública

**Ejemplo real:** Una ONG que recibe donaciones y quiere demostrar transparencia total sobre cómo usa los fondos. Cada transacción queda registrada públicamente en blockchain.

#### 2. **🤝 Eliminación de intermediarios (desintermediación)**
Cuando los intermediarios actuales son costosos, lentos o agregan fricción innecesaria.

**Casos de uso:**
- Remesas internacionales (sin Western Union o bancos)
- Préstamos P2P (sin bancos como intermediarios)
- Venta de arte digital (sin galerías que toman 40-50%)
- Freelancing internacional (sin plataformas que toman 20%)

**Ejemplo real:** María envía $200 de USA a Venezuela. Western Union cobra $25 + mala tasa de cambio (total: 15% de fee). Con Stellar + USDC: $0.00001 de fee.

#### 3. **🌍 Transacciones transfronterizas (pagos internacionales)**
Cuando necesitas mover valor entre países de forma rápida y económica.

**Casos de uso:**
- Remesas familiares
- Pagos a freelancers internacionales
- B2B payments entre empresas de diferentes países
- Comercio internacional con liquidación instantánea

**Ejemplo real:** Una empresa en México que vende a USA puede recibir pagos en USDC vía Stellar en 5 segundos, vs. 3-5 días con transferencia bancaria internacional.

#### 4. **🎨 Propiedad digital verificable (tokens, assets)**
Cuando necesitas probar quién es dueño de algo digital de forma indisputable.

**Casos de uso:**
- NFTs de arte digital
- Tokens de activos del mundo real (tokenización de propiedades, facturas)
- Certificados digitales
- Coleccionables digitales

**Ejemplo real:** Un artista crea una obra digital. Como NFT en blockchain, puede demostrar autenticidad, origen y transferir propiedad sin intermediarios.

#### 5. **⚙️ Confianza sin autoridad central (contratos automáticos)**
Cuando necesitas que las reglas se cumplan automáticamente sin que nadie pueda manipularlas.

**Casos de uso:**
- Escrow automático en transacciones
- Distribución automática de royalties
- Pagos por hitos (milestones) en proyectos
- Programas de lealtad con reglas transparentes

**Ejemplo real:** Un freelancer y un cliente acuerdan un proyecto. El pago queda en escrow en un smart contract. Al completar cada milestone, el contrato libera automáticamente el pago proporcional.

#### 6. **🔗 Interoperabilidad (diferentes sistemas conectándose)**
Cuando necesitas que múltiples sistemas, plataformas o servicios compartan datos o activos sin fricción.

**Casos de uso:**
- Puntos de lealtad intercambiables entre marcas
- Identidad digital portátil entre servicios
- Assets que funcionan en múltiples aplicaciones
- Pagos que funcionan entre diferentes wallets/apps

**Ejemplo real:** Tienes puntos de lealtad de una aerolínea, un hotel y una tarjeta de crédito. Con tokenización en blockchain, puedes intercambiarlos o combinarlos libremente.

---

### 🌟 ¿Por qué Stellar específicamente?

No todas las blockchains son iguales. Stellar tiene características específicas que lo hacen ideal para ciertos casos de uso.

#### Comparativa: Stellar vs. Otras Blockchains

| Aspecto | Stellar | Ethereum | Bitcoin | Otras |
|---------|---------|----------|---------|-------|
| **Gas fees** | ~$0.00001 | $1-50+ | $1-10+ | Variable |
| **Velocidad** | 5 segundos garantizados | 15-60 segundos | 10+ minutos | Variable |
| **Simplicidad** | Más fácil que Solidity | Complejo | Limitado | Variable |
| **Built-in DEX** | Sí, nativo | No (requiere apps) | No | Algunos |
| **Anchors y assets** | Trivial crear tokens | Requiere smart contracts | No nativo | Variable |
| **Compliance** | Diseñado para regulación | Desafíos regulatorios | Desafíos regulatorios | Variable |

#### Las fortalezas clave de Stellar:

**1. Velocidad extrema**
- Confirmaciones en 3-5 segundos
- Perfecto para pagos en punto de venta
- Experiencia de usuario fluida

**2. Costo casi nulo**
- ~$0.00001 por transacción (500,000× más barato que Ethereum)
- Viable para micropagos
- No importa si envías $1 o $1,000,000

**3. Simplicidad técnica**
- Más fácil de desarrollar que Ethereum/Solidity
- Menos propensidad a bugs y vulnerabilidades
- Curva de aprendizaje más suave

**4. DEX built-in**
- Exchange descentralizado nativo
- Conversión de assets sin salir del protocolo
- Path payments (conversión automática)

**5. Creación de assets trivial**
- Crear un token toma minutos, no días
- No necesitas smart contracts complejos
- Flexibilidad para representar cualquier activo

**6. Diseñado para compliance**
- Pensado para casos de uso regulados
- Herramientas para KYC/AML
- Atractivo para instituciones financieras

---

### 🎯 Casos de uso ideales para Stellar:

#### 💸 **Pagos y remesas internacionales**
- Transferencias familiares transfronterizas
- Pagos a freelancers globales
- Liquidación B2B entre países

**¿Por qué Stellar?** Velocidad + bajo costo + estabilidad (usando stablecoins)

#### 🏦 **Tokenización de activos del mundo real**
- Facturas tokenizadas (invoice factoring)
- Bienes raíces fraccionados
- Commodities digitalizados

**¿Por qué Stellar?** Facilidad para crear assets + compliance + velocidad de liquidación

#### 💰 **Micropagos y microtransacciones**
- Propinas para creadores de contenido
- Pay-per-use de servicios
- Pagos en juegos/aplicaciones

**¿Por qué Stellar?** Fees bajísimos hacen viable transacciones de centavos

#### 🌐 **Aplicaciones financieras inclusivas**
- Billeteras para no bancarizados
- Ahorro y préstamos P2P
- Servicios financieros sin requisitos bancarios tradicionales

**¿Por qué Stellar?** Accesibilidad + bajo costo + simplicidad de uso

#### 🏢 **Cross-border B2B payments**
- Pagos internacionales entre empresas
- Liquidación de facturas transfronterizas
- Supply chain finance

**¿Por qué Stellar?** Velocidad + trazabilidad + integración con sistemas empresariales

#### 🎁 **Puntos de lealtad y rewards**
- Programas de lealtad tokenizados
- Puntos intercambiables entre marcas
- Cashback en crypto

**¿Por qué Stellar?** Interoperabilidad + facilidad de crear custom assets

---

## ✅ El Test de Validación

Antes de continuar con tu idea, debe pasar este filtro de 4 preguntas. **Si respondes SÍ a las 4, sigues adelante.**

### Pregunta 1: ¿El problema existe sin blockchain?

**Lo que estamos preguntando:**
¿Es un problema real que existe en el mundo, o es un "problema" que solo existe porque blockchain existe?

**✅ Respuesta correcta:**
El problema existe independientemente de blockchain. Las personas ya lo sufren HOY con las herramientas actuales.

**❌ Red flag:**
El problema solo existe porque "blockchain necesita X" o "los usuarios de crypto quieren Y". Esto es un problema inventado.

**Ejemplos:**

| ✅ Problema real | ❌ Problema inventado |
|-----------------|----------------------|
| "Es difícil enviar dinero a otro país rápido y barato" | "La gente necesita una wallet más fácil" |
| "Los artistas pierden 40% en comisiones de galerías" | "Necesitamos un mejor blockchain explorer" |
| "Las facturas tardan 60 días en cobrarse" | "Los NFTs necesitan mejor metadata" |

**Cómo validar:**
- Habla con personas que NO usan crypto. ¿Tienen este problema?
- Busca en Google el problema + "alternativas". ¿Existe un mercado?
- ¿Hay empresas que intentan resolver esto (aunque sea mal)?

---

### Pregunta 2: ¿Las alternativas actuales fallan?

**Lo que estamos preguntando:**
¿Por qué las soluciones que existen HOY no funcionan bien? ¿Qué está roto?

**✅ Respuesta correcta:**
Las alternativas actuales tienen problemas graves: son muy caras, muy lentas, muy complicadas, excluyen a ciertos usuarios, o no son confiables.

**❌ Red flag:**
"Hay alternativas que funcionan bien, pero nosotros seremos mejor porque usamos blockchain." Esto no es suficiente.

**Ejemplos de por qué alternativas fallan:**

**Remesas con Western Union:**
- ❌ Comisiones del 8-15%
- ❌ Tardan 3-5 días
- ❌ Requieren ir físicamente a un local
- ❌ Horarios limitados

**Venta de arte a través de galerías:**
- ❌ Comisión del 40-50%
- ❌ Pagos demoran meses
- ❌ Acceso solo para artistas "establecidos"
- ❌ Falta de transparencia en ventas

**Factoring tradicional:**
- ❌ Solo accesible para empresas grandes
- ❌ Proceso toma semanas
- ❌ Tasas de descuento altas (15-25%)
- ❌ Mucho papeleo y burocracia

**Cómo documentar:**
- Lista 3-5 fallas específicas de alternativas actuales
- Cuantifica el dolor (tiempo, dinero, frustración)
- Encuentra testimonios o quejas de usuarios reales

---

### Pregunta 3: ¿Blockchain lo mejora significativamente?

**Lo que estamos preguntando:**
¿Blockchain hace tu solución **10x mejor**, no solo 10% mejor?

**✅ Respuesta correcta:**
Con blockchain, hay una mejora dramática en al menos 2 de estas dimensiones:
- **Velocidad:** de días/horas → segundos/minutos
- **Costo:** reducción del 50%+ en fees
- **Acceso:** de exclusivo → universal
- **Transparencia:** de opaco → auditable públicamente
- **Confianza:** de "confía en nosotros" → verificable objetivamente

**❌ Red flag:**
"Será un poco más rápido" o "un poco más barato" o "básicamente igual pero en blockchain."

**Ejemplos de mejoras 10x:**

| Solución actual | Con blockchain/Stellar | Mejora |
|----------------|----------------------|--------|
| Remesa: $200, fee $25 (12.5%), 3 días | $200, fee $0.00001, 5 segundos | **1000x más barato, 50,000x más rápido** |
| Galería toma 40%, pago en 3 meses | Smart contract, 2% de fee, pago instantáneo | **20x más para el artista, instantáneo vs. 90 días** |
| Factoring: solo empresas >$1M, 20% descuento | Tokenización abierta, 5% descuento | **Acceso universal, 4x mejor tasa** |

**Cómo validar:**
- Calcula métricas específicas: tiempo, costo, acceso
- Compara lado a lado con alternativa actual
- Si no es al menos 5x mejor, probablemente no vale la pena la fricción del cambio

---

### Pregunta 4: ¿Stellar es la mejor opción?

**Lo que estamos preguntando:**
¿Por qué elegir Stellar y no Ethereum, Solana, Polygon, Base, u otra blockchain?

**✅ Respuesta correcta:**
Stellar ofrece ventajas técnicas específicas que importan para TU caso de uso:
- **Velocidad crítica:** necesitas confirmación en segundos
- **Costo crítico:** necesitas fees insignificantes para micropagos
- **Facilidad:** tu equipo puede construir más rápido en Stellar
- **Compliance:** necesitas cumplir regulaciones financieras
- **Assets nativos:** necesitas crear/manejar múltiples tokens fácilmente
- **Path payments:** necesitas conversión automática de monedas

**❌ Red flag:**
"Porque nos gusta Stellar" o "porque estamos en este bootcamp" o "porque sí."

**Cuándo elegir Stellar sobre otras blockchains:**

**Stellar vs. Ethereum:**
- ✅ Usa Stellar si: necesitas pagos rápidos y baratos, stablecoins, simplicidad
- ✅ Usa Ethereum si: necesitas DeFi complejo, máxima descentralización, ecosistema más grande

**Stellar vs. Solana:**
- ✅ Usa Stellar si: priorizas estabilidad y fees predecibles
- ✅ Usa Solana si: necesitas throughput extremo (>50k TPS), DeFi de alto rendimiento

**Stellar vs. Bitcoin:**
- ✅ Usa Stellar si: necesitas velocidad, smart contracts, múltiples assets
- ✅ Usa Bitcoin si: solo necesitas store of value, máxima seguridad, simplicidad extrema

**Cómo justificar:**
```
Elegimos Stellar porque:
1. [Ventaja técnica específica de Stellar]
2. [Cómo esa ventaja impacta en nuestro caso de uso]
3. [Alternativas consideradas y por qué no funcionan]
```

**Ejemplo:**
```
Elegimos Stellar para remesas porque:
1. Confirmaciones en 5 segundos (vs. 15-60 seg en Ethereum)
2. Esto permite que María vea el dinero llegar en tiempo real, 
   sin ansiedad de espera
3. Consideramos Ethereum pero los fees de $5-50 eliminan el ahorro
   en remesas pequeñas de $50-200
```

---

## 🎯 Actividad Práctica: Test de Validación

**Tiempo:** 7 minutos en equipos

**Instrucciones:**
Completa este test en tu FigJam/Miro. Al terminar, marca ✅ o ❌ si tu idea pasó el test.

### Template del Test de Validación
```
TEST DE VALIDACIÓN BLOCKCHAIN

1. ¿Qué problema existe HOY? (describe la situación actual)
__________________________________________________
__________________________________________________
__________________________________________________

✅ ¿Es un problema que existe sin blockchain? SÍ / NO
❌ Si NO: replantea tu idea


2. ¿Cómo lo resuelven las personas AHORA? (alternativas actuales)
__________________________________________________
__________________________________________________
__________________________________________________

✅ ¿Estas alternativas tienen fallas graves? SÍ / NO
❌ Si NO: ¿para qué cambiar?


3. ¿Por qué esas alternativas NO funcionan? (fallas específicas)
Lista 3-5 problemas concretos:
- __________________________________________________
- __________________________________________________
- __________________________________________________

✅ ¿Son problemas cuantificables (tiempo, costo, acceso)? SÍ / NO


4. ¿Qué mejora blockchain/Stellar específicamente? (ventaja 10x)
__________________________________________________
__________________________________________________
__________________________________________________

Cuantifica la mejora:
- Velocidad: de _____ → _____
- Costo: de _____ → _____
- Acceso: de _____ → _____

✅ ¿Es al menos 5x mejor? SÍ / NO
❌ Si NO: necesitas replantear


5. ¿Por qué Stellar y no otra blockchain? (justificación técnica)
__________________________________________________
__________________________________________________
__________________________________________________

Considera:
- ¿Necesitas velocidad extrema? (5 seg)
- ¿Necesitas fees casi nulos? ($0.00001)
- ¿Necesitas simplicidad de desarrollo?
- ¿Necesitas compliance/regulación?
- ¿Necesitas crear assets fácilmente?

✅ Stellar ofrece ventajas claras para MI caso de uso: SÍ / NO
```

**Resultado:**
- ✅✅✅✅✅ = **ADELANTE!** Tu idea pasó el test
- ❌ en cualquier pregunta = **REPLANTEAR** Necesitas ajustar tu idea

---

## 👥 Parte 2: Empatizar con la Persona Usuaria

### Los 3 tipos de personas usuarias en blockchain

En productos blockchain, puedes tener 3 tipos de usuarios MUY diferentes. **Es crítico que identifiques cuál es tu usuario principal**, porque diseñarás diferente para cada uno.

---

### TIPO 1: Persona Usuaria final no-técnico 👤

**Perfil:**
- No sabe qué es Stellar (ni le importa)
- Solo quiere resolver su problema
- La palabra "blockchain" lo asusta
- No tiene experiencia con crypto

**Necesita:**
- Simplicidad extrema
- Lenguaje claro (sin jerga técnica)
- UX familiar (como apps que ya conoce)
- Onboarding sin fricción

**Ejemplo:**
María, una persona trabajadora doméstica en USA que quiere enviar dinero a su familia en Venezuela. Nunca ha usado crypto. Solo le importa que sea:
- Rápido
- Barato
- Fácil de usar
- Confiable

**Implicaciones de diseño:**
- ❌ NO mencionar "blockchain", "wallet", "gas fees"
- ✅ SÍ hablar de "enviar dinero", "recibir pago", "instantáneo"
- ❌ NO mostrar direcciones públicas como `GBQW...XYZ`
- ✅ SÍ usar contactos con nombres/fotos
- ❌ NO requerir entender qué es un "seed phrase"
- ✅ SÍ ofrecer recuperación con email/phone/biometría

**Preguntas clave para este usuario:**
1. ¿Puede completar el flujo sin leer documentación?
2. ¿Se parece a algo que ya conoce (WhatsApp, Venmo, etc)?
3. ¿Funciona si NO tiene conocimientos técnicos?
4. ¿Qué pasa si comete un error? ¿Puede deshacerlo?

---

### TIPO 2: Developer que integra 👩‍💻

**Perfil:**
- Sabe programar pero quizás no conoce Stellar
- Está evaluando Stellar vs. otras opciones
- Valora su tiempo (quiere integrar rápido)
- Lee documentación técnica

**Necesita:**
- Docs claras y completas
- SDKs en su lenguaje favorito
- Ejemplos de código funcionales
- Comunidad activa y soporte

**Evalúa:**
- Facilidad de integración (¿cuánto tarda en hacer un "Hello World"?)
- Calidad de la documentación
- Tamaño y actividad de la comunidad
- Herramientas de desarrollo (testnet, explorers, etc)

**Ejemplo:**
Alex, developer de una app de e-commerce que quiere agregar pagos crypto. Está comparando Stellar vs. Stripe vs. Ethereum. Le importa:
- Time to market (¿cuánto tarda en implementar?)
- Confiabilidad (¿se va a caer en producción?)
- Costo (¿cuánto cobran?)
- Developer experience (¿es placentero trabajar con esto?)

**Implicaciones de diseño:**
- ✅ SÍ proporcionar quickstart de 5 minutos
- ✅ SÍ ejemplos de código copy-pasteable
- ✅ SÍ SDKs bien mantenidos en múltiples lenguajes
- ✅ SÍ documentar casos edge y errores comunes
- ✅ SÍ sandbox/testnet con faucet fácil
- ✅ SÍ comunidad en Discord/Stack Overflow activa

**Preguntas clave para este usuario:**
1. ¿Puede hacer una transacción de prueba en <30 minutos?
2. ¿La documentación está actualizada?
3. ¿Hay ejemplos para su stack (React, Python, etc)?
4. ¿Puede hacer preguntas y obtener respuestas rápido?

---

### TIPO 3: Empresa/Institución 🏢

**Perfil:**
- Evalúa costos, regulación, escalabilidad
- Toma decisiones lentas (muchos stakeholders)
- Presupuesto grande pero conservadores
- Priorizan estabilidad sobre innovación

**Necesita:**
- Compliance y regulación claros
- SLAs y garantías de uptime
- Casos de éxito de otras empresas
- Soporte enterprise

**Evalúa:**
- ¿Es legal en nuestra jurisdicción?
- ¿Puede escalar a millones de usuarios?
- ¿Qué pasa si algo sale mal? ¿Hay soporte?
- ¿Otras empresas confían en esto?

**Ejemplo:**
Una fintech en México que quiere usar Stellar para remesas. Antes de decidir, necesitan:
- Hablar con el equipo legal (compliance)
- Ver casos de éxito (MoneyGram + Stellar)
- Entender costos a escala (¿cuánto cuesta 1M de transacciones?)
- Probar en piloto antes de full launch

**Implicaciones de diseño:**
- ✅ SÍ documentar compliance (KYC/AML)
- ✅ SÍ mostrar casos de éxito verificables
- ✅ SÍ ofrecer SLAs y contratos
- ✅ SÍ proporcionar análisis de costos detallado
- ✅ SÍ tener plan de soporte 24/7
- ✅ SÍ roadmap público y comunicación clara

**Preguntas clave para este usuario:**
1. ¿Cumple con regulaciones locales?
2. ¿Otras empresas similares lo usan?
3. ¿Hay contratos y garantías?
4. ¿Qué soporte ofrecen si algo falla?

---

### ⚠️ CRÍTICO: Define tu usuario principal

**No puedes ser para los 3 al mismo tiempo en un MVP.**

Pregúntate:
- ¿Quién es el que PAGA? (usuario final, developer, empresa)
- ¿Quién es el que USA día a día? (usuario final)
- ¿Quién es el que DECIDE adoptar? (empresa, developer)

**Ejemplos de priorización:**

| Proyecto | Usuario Principal | Usuario Secundario | Usuario Terciario |
|----------|-------------------|--------------------|--------------------|
| App de remesas | Usuario final (María) | Ninguno | Eventualmente empresas de remesas |
| SDK de pagos | Developer | Empresas que los contratan | Usuario final de sus apps |
| Plataforma B2B | Empresa | Developers de la empresa | Usuario final empleados |

**Para tu MVP, enfócate en 1 usuario principal.**

---

## 🎭 Proto-Persona para Blockchain

Una **proto-persona** es un perfil semificticio de tu usuario ideal. 

### ¿Por qué "proto" y no "persona"?

- **Proto-persona:** Basada en suposiciones e investigación secundaria (papers, estadísticas, IA)
- **User persona:** Validada con investigación primaria (entrevistas, encuestas a usuarios reales)

En una hackathon, no tienes tiempo para entrevistas profundas. Proto-persona es suficiente, pero **debes validarla después**.

---

### Estructura de Proto-Persona Blockchain

En blockchain, necesitamos agregar capas extras a la persona tradicional:

#### 📋 **BÁSICO**

**Información demográfica:**
- **Nombre y edad:** Dale un nombre real (no "Usuario 1")
- **Ocupación/contexto:** ¿Qué hace? ¿Dónde trabaja?
- **Ubicación geográfica:** Importante para regulación y acceso a servicios

**¿Por qué importa la ubicación?**
- Acceso a banking (bancarizado vs no bancarizado)
- Regulación crypto (legal, ilegal, zona gris)
- Conectividad (internet estable vs intermitente)
- Dispositivos (smartphone vs feature phone)

**Ejemplo:**
```
Nombre: María González
Edad: 34 años
Ocupación: Trabajadora doméstica
Ubicación: Miami, FL (USA) → envía dinero a Caracas, Venezuela
```

---

#### ❗ **PROBLEMA**

**Qué necesitas saber:**
- ¿Qué problema tiene HOY? (situación actual sin tu solución)
- ¿Cuánto le duele? (escala 1-10)
- ¿Cuánto pagaría por resolverlo? (willingness to pay)

**¿Por qué cuantificar el dolor?**
- Dolor 1-3/10: No es prioritario, difícil que adopte algo nuevo
- Dolor 4-6/10: Molesto pero tolerable, necesitas incentivo fuerte
- Dolor 7-10/10: Insoportable, buscará solución activamente

**¿Por qué preguntar cuánto pagaría?**
- Valida que es un problema real (si no pagaría nada, no es tan grave)
- Te ayuda a pensar en modelo de negocio
- Te dice si tu solución es viable económicamente

