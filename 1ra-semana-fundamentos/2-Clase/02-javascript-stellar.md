# 💻 JAVASCRIPT Y STELLAR SDK

**Clase 2 - Tus Scripts Explicados**

---

## 🎯 QUÉ VAS A ENCONTRAR AQUÍ

En esta clase escribiste **3 scripts en JavaScript**. Aquí te explicamos:
- Cómo funciona cada uno
- Por qué tomamos cada decisión
- Cómo modificarlos
- Qué más puedes hacer

---

## 📦 CONFIGURACIÓN INICIAL

### ¿Qué instalaste?

**Node.js** - El cerebro que ejecuta JavaScript fuera del navegador

**Stellar SDK** - La caja de herramientas para Stellar

```bash
npm install @stellar/stellar-sdk
```

### Configuración importante

**En tu `package.json` agregaste:**
```json
{
  "type": "module"
}
```

**¿Por qué?**  
Esto le dice a Node.js: "Voy a usar `import` en vez de `require`". Es el estilo moderno de JavaScript (ESM).

---

## 🔧 SCRIPT 1: CREAR CUENTA

### El código completo

```javascript
import { Keypair } from '@stellar/stellar-sdk';

async function crearCuenta() {
  console.log('🔐 Generando tu nuevo par de llaves...\n');
  
  // Generar llaves aleatorias
  const pair = Keypair.random();
  
  console.log('✅ ¡Cuenta creada!\n');
  console.log('📧 PUBLIC KEY (puedes compartir):');
  console.log(pair.publicKey());
  console.log('\n🔑 SECRET KEY (NUNCA COMPARTIR):');
  console.log(pair.secret());
  
  // Fondear con Friendbot
  console.log('\n💰 Fondeando con Friendbot...');
  
  try {
    const response = await fetch(
      `https://friendbot.stellar.org/?addr=${pair.publicKey()}`
    );
    
    const result = await response.json();
    
    if (result.successful || response.ok) {
      console.log('✅ ¡Cuenta fondeada con 10,000 XLM!\n');
      console.log('🔗 Transaction hash:', result.hash);
    }
  } catch (error) {
    console.error('❌ Error al fondear:', error.message);
  }
  
  console.log('\n⚠️  IMPORTANTE: Guarda estas llaves en un lugar seguro\n');
}

crearCuenta();
```

---

### 🔍 EXPLICACIÓN LÍNEA POR LÍNEA

#### Importar herramientas
```javascript
import { Keypair } from '@stellar/stellar-sdk';
```
**¿Qué hace?** Trae la función `Keypair` del SDK de Stellar.  
**¿Por qué?** Sin esto, JavaScript no sabe qué es `Keypair`.

---

#### Función async
```javascript
async function crearCuenta() {
```
**¿Qué es `async`?** Dice "esta función va a esperar cosas".  
**¿Por qué?** Porque hablar con blockchain no es instantáneo. Necesitamos esperar respuestas.

---

#### Generar llaves
```javascript
const pair = Keypair.random();
```
**¿Qué hace?** Genera un par de llaves criptográficamente seguras.  
**¿Cómo?** Usa algoritmos de criptografía (Ed25519).  
**¿Es seguro?** Sí, es el mismo nivel de seguridad que usan los bancos.

---

#### Mostrar llaves
```javascript
console.log(pair.publicKey());  // GB...
console.log(pair.secret());     // SB...
```
**Public Key:** Empieza con 'G' - Puedes compartirla  
**Secret Key:** Empieza con 'S' - NUNCA compartir

---

#### Llamar a Friendbot
```javascript
const response = await fetch(
  `https://friendbot.stellar.org/?addr=${pair.publicKey()}`
);
```
**¿Qué es `fetch()`?** Hace una llamada HTTP (como abrir una página web).  
**¿Qué es `await`?** "Espera a que termine antes de continuar".  
**Template strings:** `${variable}` inserta el valor dentro del texto.

---

#### Manejar errores
```javascript
try {
  // Código que puede fallar
} catch (error) {
  // Qué hacer si falla
}
```
**¿Por qué?** Las cosas pueden salir mal (internet lento, Friendbot caído).  
**Buena práctica:** Siempre manejar errores en código que habla con externa.

---

### 🎮 CÓMO EJECUTARLO

```bash
node crear-cuenta.js
```

**Resultado esperado:**
```
🔐 Generando tu nuevo par de llaves...

✅ ¡Cuenta creada!

📧 PUBLIC KEY: GBXM7...
🔑 SECRET KEY: SBXM7...

💰 Fondeando con Friendbot...
✅ ¡Cuenta fondeada con 10,000 XLM!
```

---

### 🔄 MODIFICACIONES QUE PUEDES HACER

**1. Crear múltiples cuentas**
```javascript
for (let i = 0; i < 5; i++) {
  const pair = Keypair.random();
  console.log(`Cuenta ${i + 1}: ${pair.publicKey()}`);
}
```

**2. Guardar en archivo**
```javascript
import fs from 'fs';

const pair = Keypair.random();
const data = {
  publicKey: pair.publicKey(),
  secretKey: pair.secret()
};

fs.writeFileSync('mi-cuenta.json', JSON.stringify(data, null, 2));
```

**3. Validar formato de llaves**
```javascript
function esPublicKeyValida(key) {
  return key.startsWith('G') && key.length === 56;
}
```

---

## 💸 SCRIPT 2: ENVIAR PAGO

### El código completo

```javascript
import {
  Keypair,
  Server,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  BASE_FEE,
  Memo
} from '@stellar/stellar-sdk';

const server = new Server('https://horizon-testnet.stellar.org');
const networkPassphrase = Networks.TESTNET;

const SECRET_KEY = 'SBXXX...'; // Tu secret key
const DESTINATION = 'GBYYY...'; // Cuenta destino

async function enviarPago(amount, memo = '') {
  try {
    console.log('🚀 Iniciando pago...\n');
    
    // Paso 1: Cargar tu cuenta
    const sourceKeys = Keypair.fromSecret(SECRET_KEY);
    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());
    
    console.log(`Balance actual: ${sourceAccount.balances[0].balance} XLM\n`);
    
    // Paso 2: Construir transacción
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: networkPassphrase
    })
      .addOperation(Operation.payment({
        destination: DESTINATION,
        asset: Asset.native(),
        amount: amount.toString()
      }))
      .addMemo(memo ? Memo.text(memo) : Memo.none())
      .setTimeout(30)
      .build();
    
    // Paso 3: Firmar
    transaction.sign(sourceKeys);
    
    // Paso 4: Enviar
    const result = await server.submitTransaction(transaction);
    
    console.log('🎉 ¡PAGO EXITOSO!\n');
    console.log(`💰 Enviaste: ${amount} XLM`);
    console.log(`🔗 Hash: ${result.hash}\n`);
    
    return result;
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    throw error;
  }
}

enviarPago('25', '¡Mi primer pago con código! 🚀');
```

---

### 🔍 EXPLICACIÓN DETALLADA

#### Conectar a Horizon
```javascript
const server = new Server('https://horizon-testnet.stellar.org');
```
**¿Qué es Horizon?** Es la API de Stellar. Es como la puerta de entrada a blockchain.  
**¿Por qué Testnet?** Para practicar sin dinero real.

---

#### Network Passphrase
```javascript
const networkPassphrase = Networks.TESTNET;
```
**¿Para qué?** Identifica en qué red estás (Testnet o Mainnet).  
**Importante:** Una transacción firmada para Testnet NO funciona en Mainnet (por seguridad).

---

#### Cargar cuenta
```javascript
const sourceKeys = Keypair.fromSecret(SECRET_KEY);
const sourceAccount = await server.loadAccount(sourceKeys.publicKey());
```
**Paso 1:** Crear objeto Keypair desde tu secret key.  
**Paso 2:** Cargar datos de tu cuenta desde blockchain (balance, sequence number).

**¿Por qué necesitamos sequence number?** Cada transacción tiene un número único. Evita que la misma transacción se ejecute dos veces.

---

#### TransactionBuilder
```javascript
const transaction = new TransactionBuilder(sourceAccount, {
  fee: BASE_FEE,
  networkPassphrase: networkPassphrase
})
```
**Es como construir un paquete:**
- Remitente: `sourceAccount`
- Costo: `BASE_FEE` (100 stroops)
- Red: `networkPassphrase` (Testnet)

---

#### Agregar operación
```javascript
.addOperation(Operation.payment({
  destination: DESTINATION,
  asset: Asset.native(),
  amount: amount.toString()
}))
```
**Payment operation contiene:**
- `destination`: A quién le envías
- `asset`: Qué moneda (XLM nativo)
- `amount`: Cuánto (debe ser string!)

**¿Por qué string?** Para evitar problemas de precisión con decimales en JavaScript.

---

#### Agregar memo
```javascript
.addMemo(memo ? Memo.text(memo) : Memo.none())
```
**¿Qué es un memo?** Como el concepto de una transferencia bancaria.  
**Opcional pero útil:** Para identificar pagos, dejar mensajes, etc.

---

#### Timeout
```javascript
.setTimeout(30)
```
**¿Qué significa?** La transacción es válida por 30 segundos.  
**¿Por qué?** Si pasa mucho tiempo, los datos de la cuenta pueden cambiar.

---

#### Firmar
```javascript
transaction.sign(sourceKeys);
```
**Tu firma digital:** Prueba que TÚ autorizaste esta transacción.  
**Usa tu secret key:** Por eso nunca la compartas.

---

#### Enviar a blockchain
```javascript
const result = await server.submitTransaction(transaction);
```
**Aquí pasa la magia:**
1. Se envía a Horizon
2. Se propaga a la red Stellar
3. Los validadores la confirman
4. Se agrega a un ledger (bloque)
5. Todo en 3-5 segundos

---

### 🎮 CÓMO EJECUTARLO

**1. Reemplaza tus llaves:**
```javascript
const SECRET_KEY = 'TU_SECRET_KEY_AQUI';
const DESTINATION = 'PUBLIC_KEY_DESTINO';
```

**2. Ejecuta:**
```bash
node enviar-pago.js
```

**3. Resultado:**
```
🚀 Iniciando pago...
Balance actual: 9974.99999 XLM

🎉 ¡PAGO EXITOSO!
💰 Enviaste: 25 XLM
🔗 Hash: a1b2c3d4...
```

---

### 🔄 MODIFICACIONES POSIBLES

**1. Enviar múltiples pagos**
```javascript
async function enviarVariosPagos(destinatarios, amount) {
  for (const dest of destinatarios) {
    await enviarPago(amount, `Pago a ${dest}`);
    console.log(`✅ Enviado a ${dest}\n`);
  }
}

const cuentas = ['GBXXX...', 'GBYYY...', 'GBZZZ...'];
enviarVariosPagos(cuentas, '10');
```

**2. Validar balance antes de enviar**
```javascript
if (parseFloat(sourceAccount.balances[0].balance) < amount) {
  throw new Error('Balance insuficiente');
}
```

**3. Agregar múltiples operaciones**
```javascript
.addOperation(Operation.payment({ /* pago 1 */ }))
.addOperation(Operation.payment({ /* pago 2 */ }))
.addOperation(Operation.payment({ /* pago 3 */ }))
```
**Ventaja:** 3 pagos en UNA transacción = 1 solo fee.

---

## 📊 SCRIPT 3: CONSULTAR BALANCE

### El código completo

```javascript
import { Server } from '@stellar/stellar-sdk';

const server = new Server('https://horizon-testnet.stellar.org');
const PUBLIC_KEY = 'GBXXX...'; // Cuenta a consultar

async function consultarBalance(publicKey) {
  try {
    console.log(`🔍 Consultando cuenta: ${publicKey.substring(0, 8)}...\n`);
    
    const account = await server.loadAccount(publicKey);
    
    console.log('╔═══════════════════════════════════╗');
    console.log('📊 INFORMACIÓN DE CUENTA');
    console.log('╚═══════════════════════════════════╝\n');
    
    console.log(`📧 Account ID:`);
    console.log(`   ${account.id}\n`);
    
    console.log(`🔢 Sequence Number:`);
    console.log(`   ${account.sequenceNumber()}\n`);
    
    console.log('╔═══════════════════════════════════╗');
    console.log('💰 BALANCES');
    console.log('╚═══════════════════════════════════╝\n');
    
    account.balances.forEach((balance, index) => {
      if (balance.asset_type === 'native') {
        console.log(`${index + 1}. 🌟 XLM (Lumens):`);
        console.log(`   Total: ${balance.balance} XLM`);
        
        const baseReserve = 0.5;
        const subentryReserve = account.subentry_count * 0.5;
        const totalReserve = baseReserve + subentryReserve;
        const available = parseFloat(balance.balance) - totalReserve;
        
        console.log(`   Bloqueado: ${totalReserve.toFixed(7)} XLM`);
        console.log(`   Disponible: ${available.toFixed(7)} XLM\n`);
      } else {
        console.log(`${index + 1}. 🪙 ${balance.asset_code}:`);
        console.log(`   Balance: ${balance.balance}`);
        console.log(`   Emisor: ${balance.asset_issuer.substring(0, 8)}...\n`);
      }
    });
    
    return account;
    
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('❌ Cuenta no encontrada');
      console.log('💡 Posibles causas:');
      console.log('   - La cuenta nunca fue creada/fondeada');
      console.log('   - Error de tipeo en la public key\n');
    } else {
      console.error('❌ Error:', error.message);
    }
    throw error;
  }
}

consultarBalance(PUBLIC_KEY);
```

---

### 🔍 CONCEPTOS CLAVE

#### Reserves (Bloqueados)
```javascript
const baseReserve = 0.5;
const subentryReserve = account.subentry_count * 0.5;
```

**¿Qué es esto?**  
Stellar bloquea una pequeña cantidad de XLM en cada cuenta:
- **Base reserve:** 0.5 XLM (por existir)
- **Subentry reserve:** 0.5 XLM por cada trustline, offer, data entry

**¿Por qué?**  
Para evitar spam en la red. Cada cuenta debe tener "skin in the game".

---

#### Asset Types
```javascript
if (balance.asset_type === 'native') {
  // XLM nativo
} else {
  // Token personalizado (USDC, etc.)
}
```

**Tipos de assets:**
- **native:** XLM (la moneda nativa)
- **credit_alphanum4:** Tokens de 4 letras (USDC, ARST)
- **credit_alphanum12:** Tokens de hasta 12 letras

---

### 🎮 CÓMO EJECUTARLO

```bash
node consultar-balance.js
```

**Resultado:**
```
🔍 Consultando cuenta: GBXM7...

╔═══════════════════════════════════╗
📊 INFORMACIÓN DE CUENTA
╚═══════════════════════════════════╝

📧 Account ID: GBXM7...
🔢 Sequence Number: 123456789

╔═══════════════════════════════════╗
💰 BALANCES
╚═══════════════════════════════════╝

1. 🌟 XLM (Lumens):
   Total: 9949.9999900 XLM
   Bloqueado: 0.5000000 XLM
   Disponible: 9949.4999900 XLM
```

---

## 🎯 RESUMEN: LO QUE APRENDISTE

### Patrones que usaste

**1. Patrón async/await**
```javascript
async function miFunc() {
  const resultado = await operacionLenta();
  // Continuar después de que termine
}
```
**¿Cuándo usar?** Cuando necesitas esperar respuestas (API, blockchain, archivos).

---

**2. Patrón try/catch**
```javascript
try {
  const resultado = await operacionRiesgosa();
} catch (error) {
  console.error('Algo salió mal:', error);
}
```
**¿Cuándo usar?** SIEMPRE que hables con cosas externas.

---

**3. Patrón Builder**
```javascript
const transaction = new TransactionBuilder(account, config)
  .addOperation(op1)
  .addOperation(op2)
  .setTimeout(30)
  .build();
```
**¿Por qué es útil?** Construyes cosas complejas paso a paso, de forma clara.

---

### Funciones del SDK que dominaste

| Función | Para qué sirve |
|---------|----------------|
| `Keypair.random()` | Generar nuevas llaves |
| `Keypair.fromSecret()` | Cargar llaves existentes |
| `server.loadAccount()` | Obtener datos de cuenta |
| `TransactionBuilder` | Construir transacciones |
| `Operation.payment()` | Crear operación de pago |
| `transaction.sign()` | Firmar transacción |
| `server.submitTransaction()` | Enviar a blockchain |

---

## 💡 TIPS Y BUENAS PRÁCTICAS

### 1. Manejo de Secret Keys

**❌ NUNCA hagas:**
```javascript
const SECRET_KEY = 'SB...'; // Hardcodeado en el código
// Luego subes a GitHub = ¡Todos ven tu secret key!
```

**✅ MEJOR:**
```javascript
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
```

**Crear archivo `.env`:**
```
SECRET_KEY=SBXXX...
DESTINATION=GBYYY...
```

**Agregar a `.gitignore`:**
```
.env
```

---

### 2. Validación de inputs

**✅ Siempre valida antes de enviar:**
```javascript
function validarAmount(amount) {
  const num = parseFloat(amount);
  if (isNaN(num) || num <= 0) {
    throw new Error('Amount debe ser un número positivo');
  }
  if (num > 1000000) {
    throw new Error('Amount demasiado grande');
  }
  return num;
}
```

---

### 3. Logs informativos

**✅ Usa emojis y colores en console.log:**
```javascript
console.log('🚀 Iniciando...');
console.log('✅ Éxito!');
console.log('⚠️  Advertencia');
console.log('❌ Error');
```

**Ayuda a leer los logs rápidamente.**

---

### 4. Funciones reutilizables

**En vez de repetir código, crea funciones:**

```javascript
// ❌ Repetitivo
const pair1 = Keypair.random();
console.log(pair1.publicKey());

const pair2 = Keypair.random();
console.log(pair2.publicKey());

// ✅ Reutilizable
function crearYMostrar() {
  const pair = Keypair.random();
  console.log(`Nueva cuenta: ${pair.publicKey()}`);
  return pair;
}

const pair1 = crearYMostrar();
const pair2 = crearYMostrar();
```

---

## 🐛 ERRORES COMUNES

### Error: "Cannot use import"

**Causa:** Falta `"type": "module"` en `package.json`

**Solución:**
```json
{
  "type": "module",
  "dependencies": { ... }
}
```

---

### Error: "Cannot find module"

**Causa:** No instalaste el SDK

**Solución:**
```bash
npm install @stellar/stellar-sdk
```

---

### Error: "Account not found"

**Causa:** La cuenta no existe en blockchain

**Solución:**
1. Verifica que la public key sea correcta
2. Fondea con Friendbot primero
3. Verifica que estás en Testnet

---

### Error: "tx_bad_seq"

**Causa:** Sequence number incorrecto

**Solución:**
- Vuelve a cargar la cuenta con `server.loadAccount()`
- No reutilices la misma transacción

---

### Error: "Insufficient balance"

**Causa:** No tienes suficiente XLM

**Solución:**
- Verifica tu balance primero
- Recuerda los reserves bloqueados
- Fondea más con Friendbot

---

## 🔄 EJERCICIOS PARA PRACTICAR

### 1. Script de Airdrop

**Desafío:** Enviar 10 XLM a 5 cuentas diferentes

```javascript
async function airdrop(cuentas, amount) {
  for (const cuenta of cuentas) {
    // Tu código aquí
  }
}

const destinatarios = [
  'GBXXX...',
  'GBYYY...',
  'GBZZZ...'
];

airdrop(destinatarios, '10');
```

---

### 2. Monitor de Balance

**Desafío:** Script que revisa tu balance cada 10 segundos

```javascript
async function monitorear(publicKey, intervalo) {
  setInterval(async () => {
    const account = await server.loadAccount(publicKey);
    console.log(`Balance: ${account.balances[0].balance} XLM`);
  }, intervalo);
}

monitorear('GBXXX...', 10000); // cada 10 segundos
```

---

### 3. Calculadora de Fees

**Desafío:** Calcular cuánto costaría enviar N transacciones

```javascript
function calcularCostoTotal(numTransacciones, opsPerTx) {
  // BASE_FEE = 100 stroops por operation
  // 1 XLM = 10,000,000 stroops
  
  // Tu código aquí
}

console.log(calcularCostoTotal(100, 1)); // 100 transacciones, 1 op cada una
```

---

## 📚 RECURSOS ADICIONALES

### Documentación oficial
- **Stellar SDK Docs:** https://stellar.github.io/js-stellar-sdk/
- **Horizon API:** https://developers.stellar.org/api/horizon
- **Stellar Expert (Explorer):** https://stellar.expert/explorer/testnet

### Ejemplos de código
- **GitHub Examples:** https://github.com/stellar/js-stellar-sdk/tree/master/docs

### Debugging
- **Stellar Laboratory:** https://laboratory.stellar.org
  - Útil para verificar transacciones
  - Ver estructura de operaciones

---

## 🎯 CHECKLIST DE COMPRENSIÓN

**Marca lo que entendiste:**

### Conceptos
- [ ] Entiendo qué es async/await
- [ ] Sé por qué usar try/catch
- [ ] Entiendo la diferencia entre public y secret key
- [ ] Sé qué es un sequence number
- [ ] Entiendo qué son los reserves

### Práctico
- [ ] Puedo crear cuentas con código
- [ ] Puedo enviar pagos con código
- [ ] Puedo consultar balances con código
- [ ] Sé modificar los scripts para mis necesidades
- [ ] Sé manejar errores básicos

### Siguiente nivel
- [ ] Quiero aprender a crear trustlines
- [ ] Quiero aprender sobre multi-sig
- [ ] Quiero crear tokens personalizados
- [ ] Quiero hacer un proyecto real

---

## 🚀 PROYECTO MINI: TU PRIMERA WALLET

**Desafío completo:** Combina todo lo que aprendiste

**Crear:** `mi-wallet.js`

**Funcionalidades:**
1. Crear nueva cuenta
2. Cargar cuenta existente
3. Ver balance
4. Enviar pago
5. Ver historial

**Estructura base:**
```javascript
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function menu() {
  console.log('\n=== MI WALLET STELLAR ===\n');
  console.log('1. Crear nueva cuenta');
  console.log('2. Ver balance');
  console.log('3. Enviar pago');
  console.log('4. Salir\n');
  
  rl.question('Elige opción: ', async (opcion) => {
    switch(opcion) {
      case '1':
        await crearCuenta();
        break;
      case '2':
        await verBalance();
        break;
      // Continuar...
    }
    menu();
  });
}

menu();
```

**Este es un proyecto real.** Si lo completas, tienes una wallet funcional.

---

## 💬 REFLEXIÓN

**Pregúntate:**

1. ¿Cuál script te resultó más fácil? ¿Por qué?
2. ¿Cuál te costó más? ¿Qué parte específicamente?
3. ¿Qué modificación harías a estos scripts?
4. ¿Qué proyecto te gustaría construir con esto?

**Escribe tus respuestas. Te sorprenderás en unas semanas al releer.**

---

## 🦈 PALABRAS FINALES

> "El código que escribiste hoy no es solo código.  
> Es poder.  
> El poder de mover dinero sin intermediarios.  
> El poder de construir apps financieras.  
> El poder de ser independiente."

**Cada script que dominas es una herramienta más en tu arsenal.**

**Sigue practicando. Sigue construyendo.** 🦈⚡

---

**Siguiente documento:** [03-terminal-y-cli.md](./03-terminal-y-cli.md)

---

*Creado con ❤️ para las Tiburonas Builders*