# 📝 TAREA Y PRÓXIMOS PASOS

**Clase 2 - Tu Camino Continúa**

---

## 🎯 TAREA #2: MI PRIMERA DAPP

**Entrega:** Antes del martes 14/10 por medio de Chamverse dejar el link de GitHub, la tarea puede ser entregada en los grupos de 4 o de 6.  
**Tiempo estimado:** 4-5 horas  
**Objetivo:** Consolidar todo lo que aprendiste

---

## 📦 ESTRUCTURA DE ENTREGA

**Crea esta carpeta:**
```
Tarea-2-[TuNombre]/
├── javascript/
│   ├── multi-transaccion.js
│   ├── monitor-pagos.js
│   └── screenshots/
│       ├── multi-tx-explorer.png
│       └── monitor-demo.png
├── cli/
│   ├── deploy.sh
│   ├── mi-cheatsheet-cli.md
│   └── deployed-contract-id.txt
└── essay/
    └── smart-contracts-latam.md
```

---

## 💻 PARTE 1: JAVASCRIPT AVANZADO (50%)

### Desafío A: Multi-Operación (25%)

**Crear:** `multi-transaccion.js`

**Tu misión:**

Escribe un script que hace UNA transacción con TRES operaciones:
1. Crear una nueva cuenta
2. Enviarle 10 XLM
3. Esa nueva cuenta crea trustline para USDC

---

**¿Por qué es útil?**

En vez de 3 transacciones separadas:
- ❌ 3 fees (300 stroops)
- ❌ 15 segundos
- ❌ 3 confirmaciones

Haces UNA transacción:
- ✅ 1 fee (100 stroops)
- ✅ 5 segundos
- ✅ 1 confirmación

**Eficiencia y ahorro.**

---

**Código base para empezar:**

```javascript
import {
  Keypair,
  Server,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  BASE_FEE
} from '@stellar/stellar-sdk';

const server = new Server('https://horizon-testnet.stellar.org');
const SOURCE_SECRET = 'SXXX...'; // Tu secret key

async function multiOperacion() {
  console.log('🚀 Iniciando transacción multi-operación...\n');
  
  // Paso 1: Generar llaves para nueva cuenta
  const nuevaCuenta = Keypair.random();
  console.log(`📧 Nueva cuenta: ${nuevaCuenta.publicKey()}\n`);
  
  // Paso 2: Cargar tu cuenta
  const sourceKeys = Keypair.fromSecret(SOURCE_SECRET);
  const sourceAccount = await server.loadAccount(sourceKeys.publicKey());
  
  // Paso 3: Construir transacción con 3 operations
  console.log('🔨 Construyendo transacción con 3 operaciones...');
  
  const transaction = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
  })
    // Operation 1: Create Account
    .addOperation(Operation.createAccount({
      destination: nuevaCuenta.publicKey(),
      startingBalance: '10' // 10 XLM iniciales
    }))
    
    // Operation 2: Payment
    // TODO: Agregar operación de pago de 5 XLM adicionales
    .addOperation(Operation.payment({
      // COMPLETAR AQUÍ
    }))
    
    // Operation 3: Change Trust para USDC
    // TODO: Agregar trustline para USDC
    .addOperation(Operation.changeTrust({
      // COMPLETAR AQUÍ
    }))
    
    .setTimeout(30)
    .build();
  
  console.log('✅ Transacción construida\n');
  
  // Paso 4: Firmar (necesitas 2 firmas!)
  console.log('✍️  Firmando transacción...');
  transaction.sign(sourceKeys);      // Firma de la cuenta source
  transaction.sign(nuevaCuenta);     // Firma de la nueva cuenta
  console.log('✅ Firmado\n');
  
  // Paso 5: Submit
  console.log('📡 Enviando a blockchain...');
  const result = await server.submitTransaction(transaction);
  
  console.log('🎉 ¡ÉXITO!\n');
  console.log('═══════════════════════════════════════');
  console.log(`📧 Nueva cuenta creada: ${nuevaCuenta.publicKey()}`);
  console.log(`💰 Balance inicial: 15 XLM`);
  console.log(`🔗 Transaction hash: ${result.hash}`);
  console.log(`📊 Operations exitosas: ${result.successful ? 'SÍ' : 'NO'}`);
  console.log('═══════════════════════════════════════\n');
  
  console.log('🔍 Verifica en StellarExpert:');
  console.log(`https://stellar.expert/explorer/testnet/tx/${result.hash}\n`);
}

multiOperacion().catch(console.error);
```

---

**Información importante:**

**USDC Testnet:**
- **Issuer:** `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5`
- **Asset Code:** `USDC`
- **Limit sugerido:** `"1000000"`

**Documentación de Operations:**
- `Operation.payment()`: https://stellar.github.io/js-stellar-sdk/Operation.html#.payment
- `Operation.changeTrust()`: https://stellar.github.io/js-stellar-sdk/Operation.html#.changeTrust

---

**Entregables:**

- [ ] Código completo funcionando
- [ ] Screenshot del transaction hash en StellarExpert
- [ ] Screenshot mostrando las 3 operations claramente

---

### Desafío B: Monitoreo en Tiempo Real (25%)

**Crear:** `monitor-pagos.js`

**Tu misión:**

Script que escucha pagos a tu cuenta EN TIEMPO REAL y te avisa cuando llega uno.

---

**¿Por qué es útil?**

Imagina:
- Tienes una tienda online
- Cliente paga con Stellar
- Tu script detecta el pago automáticamente
- Procesas el pedido al instante
- Sin intervención manual

**Automatización real del mundo real.**

---

**Código base:**

```javascript
import { Server } from '@stellar/stellar-sdk';

const server = new Server('https://horizon-testnet.stellar.org');
const MI_CUENTA = 'GBXXX...'; // Tu public key

console.log('═══════════════════════════════════════');
console.log('👀 MONITOR DE PAGOS STELLAR');
console.log('═══════════════════════════════════════\n');
console.log(`📧 Monitoreando cuenta: ${MI_CUENTA.substring(0, 8)}...`);
console.log('⏳ Esperando transacciones...\n');

let totalRecibido = 0;
let contadorPagos = 0;

// Stream de pagos
const stream = server
  .payments()
  .forAccount(MI_CUENTA)
  .cursor('now') // Solo pagos nuevos (desde ahora)
  .stream({
    onmessage: async (payment) => {
      
      // TODO: Filtrar solo pagos entrantes (type === 'payment' y to === MI_CUENTA)
      // Tip: payment.type y payment.to
      
      if (/* CONDICIÓN PARA PAGO ENTRANTE */) {
        contadorPagos++;
        
        // TODO: Obtener información del pago
        const amount = payment.amount;
        const from = payment.from;
        const asset = payment.asset_type === 'native' ? 'XLM' : payment.asset_code;
        
        // TODO: Actualizar total
        if (asset === 'XLM') {
          totalRecibido += parseFloat(amount);
        }
        
        // TODO: Mostrar notificación bonita
        console.log('═══════════════════════════════════════');
        console.log(`💰 ¡PAGO RECIBIDO! #${contadorPagos}`);
        console.log('═══════════════════════════════════════');
        console.log(`📊 Cantidad: ${amount} ${asset}`);
        console.log(`📧 De: ${from.substring(0, 8)}...`);
        console.log(`🕐 Hora: ${new Date().toLocaleString()}`);
        console.log(`📈 Total recibido hoy: ${totalRecibido.toFixed(2)} XLM`);
        console.log('═══════════════════════════════════════\n');
      }
    },
    
    onerror: (error) => {
      console.error('❌ Error en el stream:', error);
      console.log('🔄 Intentando reconectar...\n');
    }
  });

console.log('ℹ️  El monitor está corriendo...');
console.log('ℹ️  Presiona Ctrl+C para detener\n');
```

---

**Desafío adicional (BONUS +5 puntos):**

Agregar:
1. **Filtro de monto mínimo:** Solo notificar si el pago es mayor a X XLM
2. **Sonido de notificación:** Usar `node-notifier` o similar
3. **Guardar en archivo:** Log de todos los pagos en `pagos.txt`

---

**Entregables:**

- [ ] Código funcionando
- [ ] Screenshot o video del script detectando un pago en vivo
- [ ] Demostración: Pídele a una compañera que te envíe 1 XLM mientras el script corre

---

## ⚡ PARTE 2: CLI MASTERY (30%)

### Desafío C: Script de Deployment Automático (15%)

**Crear:** `deploy.sh`

**Tu misión:**

Automatizar COMPLETAMENTE el proceso de deploy. Un solo comando hace todo.

---

**Código base:**

```bash
#!/bin/bash

# ═══════════════════════════════════════
# STELLAR CONTRACT DEPLOYER v1.0
# ═══════════════════════════════════════

# Colores para output bonito
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════╗"
echo "║   🚀 STELLAR CONTRACT DEPLOYER 🚀    ║"
echo "╚═══════════════════════════════════════╝"
echo -e "${NC}\n"

# ═══════════════════════════════════════
# PASO 1: VERIFICAR ARCHIVO WASM
# ═══════════════════════════════════════

echo -e "${YELLOW}[1/6]${NC} Verificando archivo WASM..."

if [ ! -f "hello.wasm" ]; then
    echo -e "${RED}❌ Error: hello.wasm no encontrado${NC}"
    echo "💡 Descarga primero el archivo WASM"
    exit 1
fi

echo -e "${GREEN}✅ Archivo encontrado${NC}\n"

# ═══════════════════════════════════════
# PASO 2: GENERAR IDENTIDAD
# ═══════════════════════════════════════

echo -e "${YELLOW}[2/6]${NC} Generando identidad de deployer..."

# TODO: Generar identidad llamada "deployer"
# Tip: stellar keys generate ...

echo -e "${GREEN}✅ Identidad creada${NC}\n"

# ═══════════════════════════════════════
# PASO 3: FONDEAR
# ═══════════════════════════════════════

echo -e "${YELLOW}[3/6]${NC} Fondeando cuenta..."

# TODO: Fondear la identidad
# Tip: stellar keys fund ...

echo -e "${GREEN}✅ Cuenta fondeada${NC}\n"

# ═══════════════════════════════════════
# PASO 4: DEPLOY
# ═══════════════════════════════════════

echo -e "${YELLOW}[4/6]${NC} Deployando contrato..."

# TODO: Deploy el contrato y capturar el Contract ID
# Tip: CONTRACT_ID=$(stellar contract deploy ...)

echo -e "${GREEN}✅ Contrato deployado${NC}"
echo -e "${BLUE}📦 Contract ID: $CONTRACT_ID${NC}\n"

# ═══════════════════════════════════════
# PASO 5: GUARDAR ID
# ═══════════════════════════════════════

echo -e "${YELLOW}[5/6]${NC} Guardando Contract ID..."

# TODO: Guardar en archivo
echo $CONTRACT_ID > deployed-contract-id.txt

echo -e "${GREEN}✅ Guardado en deployed-contract-id.txt${NC}\n"

# ═══════════════════════════════════════
# PASO 6: PROBAR CONTRATO
# ═══════════════════════════════════════

echo -e "${YELLOW}[6/6]${NC} Probando contrato..."

# TODO: Invocar función hello con tu nombre

echo -e "${GREEN}✅ Test exitoso${NC}\n"

# ═══════════════════════════════════════
# RESUMEN
# ═══════════════════════════════════════

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════╗"
echo "║         🎉 DEPLOY COMPLETO 🎉        ║"
echo "╚═══════════════════════════════════════╝"
echo -e "${NC}\n"

echo "📝 Resumen:"
echo "  Contract ID: $CONTRACT_ID"
echo "  Archivo: deployed-contract-id.txt"
echo "  StellarExpert: https://stellar.expert/explorer/testnet/contract/$CONTRACT_ID"
echo ""

echo -e "${GREEN}✨ Todo listo para usar tu contrato ✨${NC}\n"
```

---

**Hacer ejecutable y correr:**

```bash
chmod +x deploy.sh
./deploy.sh
```

---

**Entregables:**

- [ ] Script funcionando
- [ ] Screenshot de ejecución completa

---

### Desafío D: Tu Cheatsheet Personal (15%)

**Crear:** `mi-cheatsheet-cli.md`

**Tu misión:**

Documentar TODOS los comandos CLI que aprendiste, con explicaciones EN TUS PROPIAS PALABRAS.

---

**Estructura sugerida:**

```markdown
# Mi Cheatsheet de Stellar CLI

> Documentación personal de [Tu Nombre]  
> Fecha: [Hoy]

---

## 🔑 Gestión de Identidades

### Generar identidad
```bash
stellar keys generate NOMBRE --network testnet
```

**Para qué sirve:**  
[Tu explicación con tus palabras]

**Cuándo usarlo:**  
[Tu respuesta]

**Ejemplo real:**  
[Un caso de uso específico]

---

### Ver public key
```bash
stellar keys address NOMBRE
```

**Para qué sirve:**  
[Tu explicación]

[Continuar con TODOS los comandos que aprendiste...]

---

## 💰 Fondeo y Balances

[Tus comandos...]

---

## 📦 Smart Contracts

[Tus comandos...]

---

## 🌐 Redes

[Tus comandos...]

---

## 💡 Mis Tips Personales

1. **[Tu tip #1]**
   - Por qué es útil
   - Cuándo lo uso

2. **[Tu tip #2]**
   - ...

[Al menos 3 tips]

---

## 🐛 Errores que Tuve y Cómo los Resolví

### Error 1: [Nombre del error]
**Qué pasó:**  
[Tu experiencia]

**Cómo lo resolví:**  
[Tus pasos]

**Qué aprendí:**  
[Tu lección]

[Al menos 2 errores]

---

## 🚀 Comandos que Quiero Aprender

1. [Comando que viste pero no probaste]
2. [Funcionalidad que quieres explorar]
3. ...

---

## 📚 Recursos que Me Ayudaron

- [Link 1] - Por qué fue útil
- [Link 2] - Qué aprendí
- ...
```

---

**Requisitos mínimos:**

- [ ] Mínimo 10 comandos diferentes documentados
- [ ] Explicaciones en TUS palabras (no copiar/pegar)
- [ ] Al menos 3 "tips personales"
- [ ] Al menos 2 errores que tuviste
- [ ] Formato Markdown correcto
- [ ] Bien organizado y fácil de leer

---

## 📝 PARTE 3: REFLEXIÓN CREATIVA (20%)

### Essay: Smart Contracts en Latinoamérica

**Crear:** `smart-contracts-latam.md`

**Extensión:** 300-500 palabras

---

**Prompt:**

Investiga 2 proyectos reales que usan smart contracts en Stellar (o blockchain en general). Luego, propone TU idea de un smart contract que resuelva un problema en tu comunidad.

---

**Estructura sugerida:**

```markdown
# Smart Contracts en Latinoamérica: Del Problema a la Solución

**Autoras:** [Los nombres del equipo]  

---

## Introducción

[1 párrafo: Por qué los smart contracts importan en LATAM]

---

## Proyecto 1: [Nombre]

**¿Qué hace?**  
[Descripción breve]

**¿Qué problema resuelve?**  
[El problema específico]

**¿Cómo lo resuelve?**  
[La solución técnica]

**¿Por qué es importante?**  
[Impacto en la comunidad]

---

## Proyecto 2: [Nombre]

[Misma estructura]

---

## Mi Propuesta: [Nombre de tu idea]

**El problema que veo:**  
[Describe un problema REAL de tu comunidad]

**Mi solución con smart contracts:**  
[Cómo un contrato lo resolvería]

**Cómo funcionaría técnicamente:**  
[Explicación simple de la implementación]

**Impacto esperado:**  
[Qué cambiaría si existiera]

**Desafíos a considerar:**  
[Obstáculos realistas]

---

## Conclusión

[Reflexión final sobre el potencial de blockchain en LATAM]

---

## Referencias

- [Link del proyecto 1]
- [Link del proyecto 2]
- [Otros recursos consultados]
```

---

**Proyectos sugeridos para investigar:**

**En Stellar:**
- **MoneyGram Access:** Remesas usando Stellar
- **Vibrant:** Stablecoin en USDC para comunidades
- **Aquarius:** DEX descentralizado
- **Blend Protocol:** Préstamos DeFi

**General blockchain:**
- **Bitso:** Exchange mexicano usando blockchain
- **Ripio:** Plataforma argentina de cripto
- Cualquier proyecto LATAM que encuentres

---

**Recursos para investigación:**

- https://stellar.org/ecosystem/projects
- https://sorobandev.com/projects
- https://stellar.expert/explorer/public/
- Artículos sobre blockchain en LATAM

---

**Ejemplos de problemas latinoamericanos:**

💡 **Remesas caras**  
Problema: Enviar $100 a familia cuesta $10-15 en fees

💡 **Vendedores informales sin acceso bancario**  
Problema: No pueden aceptar pagos digitales

💡 **Inflación**  
Problema: Ahorros pierden valor rápidamente

💡 **Falta de crédito**  
Problema: Bancos no prestan a pequeños emprendedores

💡 **Verificación de títulos/certificados**  
Problema: Falsificación de diplomas

**Elige uno que REALMENTE veas en tu entorno.**

---

**Criterios de evaluación:**

- [ ] Investigación seria de 2 proyectos reales
- [ ] Propuesta original y bien pensada
- [ ] Solución técnicamente factible
- [ ] Problema real y relevante
- [ ] Escritura clara y bien estructurada
- [ ] 300-500 palabras
- [ ] Referencias correctas

---

## 📊 RESUMEN DE ENTREGA

### Checklist completo

**JavaScript (50 puntos):**
- [ ] multi-transaccion.js funciona (20 pts)
- [ ] Screenshots de transacción (5 pts)
- [ ] monitor-pagos.js funciona (20 pts)
- [ ] Demo de monitoreo (5 pts)
- [ ] BONUS: Funcionalidades extra (5 pts)

**CLI (30 puntos):**
- [ ] deploy.sh funciona (15 pts)
- [ ] deployed-contract-id.txt generado (2 pts)
- [ ] Screenshot de ejecución (3 pts)
- [ ] mi-cheatsheet-cli.md completo (10 pts)

**Essay (20 puntos):**
- [ ] 2 proyectos investigados (6 pts)
- [ ] Propuesta original (8 pts)
- [ ] Calidad de escritura (4 pts)
- [ ] Referencias (2 pts)

**TOTAL: 100 puntos**

---

### Formato de entrega final

```
Tarea-2-[TuNombre].zip
│
└── Tarea-2-[TuNombre]/
    ├── README.md (explicando qué hay en cada carpeta)
    ├── javascript/
    │   ├── multi-transaccion.js
    │   ├── monitor-pagos.js
    │   └── screenshots/
    │       ├── multi-tx-explorer.png
    │       └── monitor-demo.png
    ├── cli/
    │   ├── deploy.sh
    │   ├── mi-cheatsheet-cli.md
    │   └── deployed-contract-id.txt
    └── essay/
        └── smart-contracts-latam.md
```

---

## 🎯 PRÓXIMA CLASE: RUST DESDE CERO

**Martes 14/10/2025 - Corroborar hs en nuestra planilla**

### Lo que aprenderás

**Clase 3 será diferente:**
- 🦀 Sintaxis básica de Rust
- 📦 Variables, tipos, funciones
- 🔄 Control de flujo
- 🎯 Ownership (el superpoder de Rust)
- 📝 Escribir hello world en Rust

---

### ¿Por qué Rust?

**Porque es el lenguaje de Soroban.**

Rust elimina bugs que otros lenguajes permiten:
- No hay null pointer exceptions
- No hay memory leaks
- No hay race conditions
- Si compila, probablemente funciona

**¿Es difícil?** Sí, un poco. Rust es diferente a otros lenguajes.

**¿Vale la pena?** ABSOLUTAMENTE.
- Rust developers están entre los mejor pagados
- Es el futuro de sistemas seguros
- Es lo que necesitas para escribir contratos

---

### Preparación para Clase 3

**Instalar antes de la clase:**

1. **Rust (con rustup):**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

2. **Verificar instalación:**
```bash
rustc --version
cargo --version
```

**Deberías ver:**
```
rustc 1.75.0 (o superior)
cargo 1.75.0 (o superior)
```

---

### Recursos para adelantar

**Si quieres prepararte (opcional):**

📚 **The Rust Book (en español):**
- https://doc.rust-lang.org/book/
- Lee los primeros 3 capítulos

🎮 **Rustlings (ejercicios interactivos):**
- https://github.com/rust-lang/rustlings

🎥 **Videos introductorios:**
- Busca "Rust crash course" en YouTube

**No te preocupes si no entiendes todo.** En clase lo veremos desde cero.

---

## 💡 TIPS PARA COMPLETAR LA TAREA

### Gestión del tiempo

**Sugerencia de horario:**

- **Día 1 (2 horas):** JavaScript
  - 1 hora: multi-transaccion.js
  - 1 hora: monitor-pagos.js

- **Día 2 (1.5 horas):** CLI
  - 1 hora: deploy.sh
  - 0.5 horas: cheatsheet

- **Día 3 (1.5 horas):** Essay
  - 0.5 horas: Investigación
  - 1 hora: Escritura

**Total: 5 horas** distribuidas en 3 días.

---

### Cuándo pedir ayuda

**SIEMPRE está bien pedir ayuda si:**
- Estás atascada más de 30 minutos
- El error no tiene sentido
- No sabes por dónde empezar

**Dónde pedir ayuda:**
- Discord del curso
- Stellar Discord (#soroban-dev)
- Stack Overflow
- A tus compañeras

**La comunidad blockchain es muy colaborativa. ¡Úsala!**

---

### Debugging tips

**Si algo no funciona:**

1. **Lee el error completo** (no solo la primera línea)
2. **Google el error exacto** (entre comillas)
3. **Verifica las versiones** (Node, SDK, CLI)
4. **Revisa la documentación oficial**
5. **Compara con el código de clase**
6. **Pide ayuda después de 30 min**

---

## 📚 RECURSOS ADICIONALES

### Documentación técnica

- **Stellar SDK JS:** https://stellar.github.io/js-stellar-sdk/
- **Stellar CLI:** https://developers.stellar.org/docs/tools/cli/stellar-cli
- **Soroban Docs:** https://developers.stellar.org/docs/build/smart-contracts
- **Horizon API:** https://developers.stellar.org/api/horizon

---

### Herramientas útiles

- **Laboratory:** https://laboratory.stellar.org
- **StellarExpert:** https://stellar.expert/explorer/testnet
- **Friendbot:** https://friendbot.stellar.org

---

### Comunidad

- **Discord Stellar:** https://discord.gg/stellardev
  - Canales: #general, #soroban-dev, #stellar-cli

- **GitHub Discussions:**
  - https://github.com/stellar/stellar-cli/discussions

- **Stack Overflow:**
  - Tag: [stellar], [soroban]

---

### Inspiración

**Proyectos de estudiantes previos:**
- Mini wallet CLI
- Bot de monitoreo de precios
- Sistema de pagos automatizado
- Dashboard de balances

**Tu tarea es el primer paso para crear TU proyecto.**

---

## 🎯 OBJETIVOS DE APRENDIZAJE

### Al completar esta tarea, habrás:

✅ **Consolidado JavaScript + Stellar**
- Transacciones multi-operación
- Programación asíncrona
- Manejo de errores
- Streams en tiempo real

✅ **Dominado Stellar CLI**
- Automatización con bash
- Gestión de identidades
- Deploy de contratos
- Documentación técnica

✅ **Desarrollado pensamiento crítico**
- Investigación de proyectos
- Identificación de problemas
- Propuesta de soluciones
- Escritura técnica

✅ **Ganado confianza**
- En tu habilidad de aprender
- En tu capacidad de construir
- En tu futuro como developer

---

## 💬 REFLEXIÓN PERSONAL

**Antes de empezar la tarea, tómate 5 minutos:**

1. **¿Qué fue lo más difícil de la Clase 2?**

2. **¿Qué fue lo más emocionante?**

3. **¿Qué quieres dominar mejor?**

4. **¿Cómo te sientes con tu progreso?**

**Escribe tus respuestas.** Te ayudará a enfocar tu energía.

---

## 🦈 PALABRAS FINALES

### Un mensaje de Tiburona a Tiburona

> "Esta tarea no es un examen.  
> Es tu oportunidad de practicar.  
> De experimentar.  
> De romper cosas y aprender.  
>  
> No busques perfección.  
> Busca progreso.  
>  
> Cada línea de código que escribas  
> te acerca más a tus metas.  
>  
> No estás sola en esto.  
> Toda la comunidad está aquí para ayudarte.  
>  
> Pregunta.  
> Experimenta.  
> Construye.  
>  
> Porque así son las Tiburonas:  
> Persistentes.  
> Valientes.  
> Imparables."

---

### Tu progreso hasta ahora

**Semana 1 - Clase 1:**
- ✅ Creaste tu primera cuenta Stellar
- ✅ Enviaste tu primera transacción
- ✅ Entendiste los conceptos básicos

**Semana 1 - Clase 2:**
- ✅ Escribiste código JavaScript real
- ✅ Usaste la terminal como pro
- ✅ Deployaste un smart contract

**Próxima semana:**
- 🎯 Aprenderás Rust
- 🎯 Escribirás tu primer contrato
- 🎯 Construirás algo único

**¿Ves el patrón?**  
Cada clase te lleva más lejos.  
Cada día eres más capaz.  
Cada línea de código suma.

---

## 📅 RECORDATORIOS IMPORTANTES

**Entrega de tarea:**
- 📅 Fecha límite: Martes 14/10 antes de clase
- 📧 Enviar a: Link de GitHub a Chamverse
- ✅ Verifica antes de enviar: README.md incluido

**Próxima clase:**
- 📅 Martes 14/10/2025
- ⏰ Corroborar el horario en tu país
- 📍 Zoom
- 🦀 Tema: Rust desde Cero

**Instalación para clase:**
- ⚙️ Rust + Cargo
- ⚙️ Verificar que compile
- ⚙️ Tener VS Code listo

---

## 🎁 BONUS: DESAFÍO EXTREMO (OPCIONAL)

**Para las Tiburonas más aventureras:**

### Proyecto: Mini DEX

**Crear un script que:**
1. Crea 2 cuentas
2. Una ofrece vender 100 USDC a 0.5 XLM cada uno
3. Otra acepta la oferta
4. Verifica que el trade se completó

**Si lo logras:**
- 🏆 +20 puntos bonus
- 🏆 Reconocimiento especial en clase
- 🏆 Una sesión 1-on-1 con la profe

**Es difícil. Muy difícil. Pero posible.**

**Recursos:**
- `Operation.manageSellOffer()`
- `Operation.manageBuyOffer()`
- Stellar Docs sobre Offers

**Si lo intentas (aunque no funcione), aprendes MUCHO.**

---

## 🌟 CIERRE

**Has llegado hasta aquí.**

Eso dice mucho de ti.

No solo leíste la clase.  
No solo asististe.  
Estás aquí, leyendo hasta el final, lista para hacer la tarea.

**Esa determinación es lo que separa a las que aprenden de las que construyen.**

**Tú estás construyendo.**

Sigue así, Tiburona. El futuro que estás creando para ti es increíble.

**Nos vemos el martes. Con Rust. Con más poder. Con más conocimiento.**

**Sigue nadando. Sigue construyendo.** 🦈⚡

---

**Documento anterior:** [04-smart-contracts.md](./04-smart-contracts.md)  
**Volver al índice:** [README.md](./README.md)

---

*Creado con ❤️ para las Tiburonas Builders*  
*Curso: Codigo Futura*  
*Buen Día Builders 2025* 🦈⚡