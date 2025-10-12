# Resumen de la Clase de Refuerzo - Buen Día Builders

## 📋 Información General de la Cursada

### Sistema de Puntos y Premios

#### Ranking Semanal (se reinicia cada semana)
- 🥇 **1er lugar**: $15 USD en XLM
- 🥈 **2do lugar**: $10 USD en XLM
- 🥉 **3er lugar**: $5 USD en XLM

#### Puntos Acumulativos (durante las 6 semanas)
- Se acumulan para aumentar las posibilidades de ganar la beca
- Viaje a Buenos Aires para la Builder House Stellar (noviembre)
- ⚠️ **Importante**: Los puntos no son el único criterio, también se evalúa el código y la performance general

### Formas de Sumar Puntos
1. ✅ Completar desafíos semanales
2. 👥 Asistir a clases en vivo
3. 💬 Comentar en el foro
4. 🤝 Apoyar a otras compañeras
5. 🎯 Participar en retos extra

---

## 🖥️ Plataforma Chamverse

### ¿Qué es Chamverse?
- Plataforma principal de la cursada (Web3, para DAOs)
- Como usarlo está en inglés, pero se irá adaptando
- Permite ver sesiones, presentaciones y videos
- Es colaborativo y de código abierto

### Navegación en Chamverse

#### Start (Página de Inicio)
- Enlaces importantes
- Links al grupo de Telegram
- Información general

#### Sesiones (Clases)
Cada sesión tiene:
- 📄 **PPT descargable** (flecha abajo)
- 🔗 **Link al GitHub** con el contenido
- 📹 **Video de la clase**

Ejemplo de navegación:
```
Código Futura Sesiones → Clase 0/1/2
  ├── Ver PPT en PDF
  ├── Ver en GitHub
  └── Ver video
```

### Foro de Chamverse

#### Sección "Presentaciones" o "Introduction"
- Espacio para presentarse (Desafío 0 - 10 puntos)
- Se puede:
  - Dar "me gusta" (🌸)
  - Comentar
  - Conectar con compañeras
- **Fomentar la comunidad**: Buscar compañeras con habilidades complementarias

### Cómo Entregar Tareas en Chamverse

⚠️ **IMPORTANTE**: Siempre marcar la opción **"Tareas"** al enviar

#### Pasos para enviar:
1. Ir a **Envíos** → Click en la flecha desplegable
2. Seleccionar **"Tareas"** 
3. Poner **título** (ejemplo:"Semana 1 Tarea 2")
4. Agregar **descripción** opcional en el campo de texto
5. **Adjuntar archivo** (PDF o imagen) si es necesario
6. Click en **"Publish"**


### Equipos en Chamverse
- Ver la pestaña **"Equipos"**
- Buscar tu nombre para encontrar tu equipo
- Ver compañeras de equipo
- Cada equipo entre 4 personas a 6 personas

⚠️ **Nota**: No editar la información de equipos/puntajes, solo ver

---

## 📚 Clase 0: Introducción y Freighter Wallet

### Desafío 0: Presentación
- **Tarea**: Presentación personal en el foro de Chamverse
- **Puntos**: 10
- **Contenido**: 
  - Contar algo sobre ti
  - Presentarte a la comunidad
  - Primera impresión

### Freighter Wallet
- Billetera oficial de Stellar
- Extensión de navegador
- Similar a Lemon o Mercado Pago pero Web3
- Para recibir dinero **real**
- Se configura en **Mainnet** para pagos reales
- Tiene su propia Public Key y Secret Key

---

## 🔬 Clase 1: Stellar Laboratory

### Conceptos Básicos de Stellar

#### Pares de Llaves (Keypairs)

**Public Key (Llave Pública)**:
```
- Comienza con: G
- Longitud: 56 caracteres
- Función: Como un correo electrónico (se puede compartir)
- Uso: Para RECIBIR pagos
- Ejemplo: GBIXXX...XXRUL
```

**Secret Key (Llave Secreta)**:
```
- Comienza con: S
- Longitud: 56 caracteres
- Función: Como una contraseña
- ❌ NUNCA COMPARTIR
- Uso: Para FIRMAR transacciones y ENVIAR pagos
- Ejemplo: SBXXX...XXXXX
```

**Recovery Phrase**:
```
- 12 palabras en orden específico
- Para recuperar la cuenta
- Guardar en lugar seguro
```

#### Redes de Stellar

**Testnet** (Red de Prueba):
- ✅ Lo que usamos en la cursada
- Dinero ficticio
- Para aprender y practicar
- Mismos cuidados que con dinero real

**Mainnet** (Red Principal):
- Dinero real
- Para producción
- Freighter opera aquí

### Crear Cuenta en Stellar Laboratory

#### Paso a paso:

1. Ir a [laboratory.stellar.org](https://laboratory.stellar.org)
2. Verificar que estés en **Testnet** (arriba a la derecha)
3. Click en **Account** → **Create Account Keypair**
4. Click en **"Generate Keypair"**
5. Guardar en un bloc de notas:
   ```
   Public Key: GXXX...XXX
   Secret Key: SXXX...XXX (oculta, click en el ojo para ver)
   Recovery Phrase: palabra1 palabra2 ... palabra12
   ```

⚠️ **Importante**: Esto es solo para demostración. NO compartan su Secret Key con nadie, ni siquiera con compañeras.

### Fondear la Cuenta

Dos opciones para agregar fondos de prueba:

#### Opción 1: Desde Stellar Laboratory
```
1. En la misma página de crear cuenta
2. Click "Fund Account With Friendbot"
3. Recibe automáticamente 10,000 XLM
```

#### Opción 2: Friendbot Manual
```
1. Ir a https://friendbot.stellar.org
2. Pegar tu Public Key en el campo
3. Click "Get Lumens"
4. Esperar confirmación
5. Ver link "View on stellar expert"
```

### Stellar Expert (Explorador de Blockchain)

Es como el "inspector" de la blockchain de Stellar.

#### Información que muestra:
```
- Balance actual en XLM
- Total de Payments (pagos realizados)
- Total de Trades (intercambios)
- Fecha de creación (en UTC)
- Hora actual UTC (Buenos Aires = UTC-3)
- Signers (firmantes de la cuenta)
- Historial completo de transacciones
```

#### Acceder a Stellar Expert:
```
URL: https://stellar.expert/explorer/testnet/account/[TU_PUBLIC_KEY]
```

### Realizar una Transacción Manual en Laboratory

#### Estructura de una transacción:

```
Transaction Builder
├── Source Account (Cuenta origen)
├── Transaction Sequence Number (Número de secuencia)
├── Base Fee (Tarifa base - predeterminada)
├── Memo (Nota opcional)
└── Operation (Operación a realizar)
    ├── Type: Payment
    ├── Destination (Cuenta destino)
    ├── Asset (Tipo de moneda: Native = XLM)
    └── Amount (Cantidad a enviar)
```

#### Paso a paso detallado:

**1. Iniciar Transacción**
```
1. Ir a "Transaction Builder"
2. En "Source Account": Pegar tu Public Key
3. Click "Fetch next sequence number" 
   (Trae automáticamente el número de secuencia)
4. Base Fee: Dejar como está
```

**2. Agregar Memo (Opcional)**
```
Tipo: Text
Contenido: "Mi primera transacción tiburona" 
(máximo 28 caracteres)
```

**3. Configurar Operación**
```
Operation Type: Payment
Destination: [Public Key de la cuenta destino]
Asset: Native (para XLM)
Amount: 50 (cantidad a enviar)
Source Account: (opcional, ya está configurado arriba)
```

**4. Firmar la Transacción**
```
1. Click "Sign in Transaction Signer"
2. Pegar tu Secret Key en el campo
3. Click "Sign Transaction"
4. Aparece "Transaction signed successfully"
```

**5. Enviar la Transacción**
```
1. Click "Submit to Post Transaction endpoint"
2. Confirmar
3. Esperar resultado
4. Ver "Transaction Success" con:
   - Transaction Hash (ID único)
   - Ledger Number (número de página del libro)
```

#### Verificar la Transacción

**En Stellar Expert**:
```
1. Click en "View in Stellar Expert"
2. Ver detalles:
   - Source Account (quién envió)
   - Fee Charged (tarifa cobrada: 0.00001 XLM)
   - Hora de procesamiento
   - Memo
   - Operación: Payment de X XLM
```

**Verificar Balance**:
```
1. Ir a tu cuenta en Stellar Expert
2. Recargar página
3. Ver balance actualizado:
   Balance anterior - Monto enviado - Fee = Balance nuevo
```

### Desafío 1: Transacción entre Compañeras

**Objetivo**: Realizar una transacción a una compañera

**Grupos**: Entre 4 y 6 personas por equipo

**Ejemplo de Entrega**:
```
Plantilla en GitHub:
├── Nombre: [Tu nombre]
├── Email: [Tu email]
├── Username Stellar: [Tu Public Key]
├── Wallet Freighter: [Tu cuenta Freighter]
├── A quién enviaste: [Nombre del equipo]
└── Relato: "¿Cómo Stellar va a cambiar tu vida/comunidad?"
```

**Formato de entrega**:
- Por Chamverse
- Individual (aunque se hace en grupo)
- En "Tareas"

**¿Por qué individual?**: 
- Constancia de entrar a Chamverse
- Responsabilidad personal
- No dejar todo a una sola persona
- Las becas se evalúan individualmente

---

## 💻 Clase 2: JavaScript SDK

### Preparación del Entorno

#### Instalación Previa
```bash
# Verificar instalaciones:
node --version
npm --version
```

Si no están instalados:
- Node.js: https://nodejs.org
- npm: viene con Node.js
- Visual Studio Code: https://code.visualstudio.com

#### Crear Estructura de Carpetas

**Desde la terminal**:
```bash
# Ir al escritorio
cd Desktop

# Crear carpeta principal
mkdir stellar-clase-2

# Entrar a la carpeta
cd stellar-clase-2

# Crear subcarpetas
mkdir javascript-sdk
mkdir hello-contract
mkdir stellar-click
```

### Configurar JavaScript SDK

#### Inicializar Proyecto

```bash
# Entrar a la carpeta
cd javascript-sdk

# Inicializar npm (crea package.json)
npm init

# Responder las preguntas (o presionar Enter para valores por defecto)
```

#### Instalar Stellar SDK

⚠️ **Importante sobre terminales**:
- Recomendado: **Git Bash**
- Puede dar errores en: PowerShell
- Si hay errores: cambiar a Git Bash

**Comando de instalación**:
```bash
npm install @stellar/stellar-sdk
```

Esto crea:
```
javascript-sdk/
├── package.json
├── package-lock.json
└── node_modules/  (NO subir a GitHub)
```

#### Configurar package.json para ES Modules

**Agregar esta línea al package.json**:
```json
{
  "type": "module",
  "name": "javascript-sdk",
  "version": "1.0.0",
  ...
}
```

⚠️ **Importante**: Sin `"type": "module"` no funcionarán los imports de ES6.

### Abrir Proyecto en VS Code

```bash
# Desde la carpeta stellar-clase-2
# Click derecho → "Abrir con Code"

# O desde la terminal:
code .
```

### Scripts del Proyecto

#### 1. Crear Cuenta (`crear-cuenta.js`)

**Importaciones necesarias**:
```javascript
import { Keypair } from '@stellar/stellar-sdk';
```

**Código completo** (también lo pueden ver en GitHub):
```javascript
import { Keypair } from '@stellar/stellar-sdk';

console.log('Generando tu nuevo par de llaves...');

// Función asíncrona para crear cuenta
async function crearCuenta() {
  // Generar par de llaves aleatorio
  const pair = Keypair.random();
  
  console.log('¡Cuenta creada!');
  console.log('Public Key:', pair.publicKey());
  console.log('Secret Key (NUNCA COMPARTIR):', pair.secret());
  
  // Fondear automáticamente con Friendbot
  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${pair.publicKey()}`
    );
    const result = await response.json();
    
    if (result.successful || response.ok) {
      console.log('¡Cuenta fondeada con 10,000 XLM!');
      console.log('Transaction Hash:', result.hash);
    } else {
      console.log('Error al fondear');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  
  console.log('IMPORTANTE: Guardar estas llaves en un lugar seguro');
}

// Ejecutar la función
crearCuenta();
```

**Ejecutar**:
```bash
node crear-cuenta.js
```

**Salida esperada**:
```
Generando tu nuevo par de llaves...
¡Cuenta creada!
Public Key: GXXX...XXX
Secret Key (NUNCA COMPARTIR): SXXX...XXX
¡Cuenta fondeada con 10,000 XLM!
Transaction Hash: abc123...
IMPORTANTE: Guardar estas llaves en un lugar seguro
```

#### 2. Enviar Pago (`enviar-pago.js`)

**Importaciones necesarias**:
```javascript
import { 
  Keypair, 
  Horizon,
  TransactionBuilder, 
  Networks, 
  Operation, 
  Asset, 
  BASE_FEE, 
  Memo 
} from '@stellar/stellar-sdk';
```

⚠️ **Cambio importante**: `Server` ya no existe, ahora es `Horizon.Server`

**Configuración inicial**:
```javascript
// Crear servidor Horizon para Testnet
const server = new Horizon.Server('https://horizon-testnet.stellar.org');

// Configurar red
const networkPassphrase = Networks.TESTNET;

// TUS CREDENCIALES (NO SUBIR A GITHUB)
const sourceSecretKey = 'SXXX...XXX';  // Tu Secret Key
const destinationPublicKey = 'GXXX...XXX';  // Public Key destino
```

**Función para enviar pago**:
```javascript
async function enviarPago(amount, memo = '') {
  try {
    console.log('Iniciando pago...');
    
    // Paso 1: Cargar la cuenta origen
    const sourceKeypair = Keypair.fromSecret(sourceSecretKey);
    const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());
    
    console.log('Balance actual:', sourceAccount.balances);
    
    // Paso 2: Construir la transacción
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: networkPassphrase
    })
    .addOperation(
      Operation.payment({
        destination: destinationPublicKey,
        asset: Asset.native(), // XLM
        amount: amount.toString()
      })
    )
    .addMemo(memo ? Memo.text(memo) : Memo.none())
    .setTimeout(30)
    .build();
    
    // Paso 3: Firmar la transacción
    transaction.sign(sourceKeypair);
    
    // Paso 4: Enviar al servidor
    const result = await server.submitTransaction(transaction);
    
    console.log('¡Pago exitoso!');
    console.log('Enviaste:', amount, 'XLM');
    console.log('Transaction Hash:', result.hash);
    
  } catch (error) {
    console.error('Error al enviar pago:', error);
  }
}

// Ejecutar: enviar 50 XLM con un memo
enviarPago('50', 'Primer TX');
```

**Explicación paso a paso**:

1. **Cargar cuenta origen**:
```javascript
const sourceKeypair = Keypair.fromSecret(sourceSecretKey);
const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());
```
- Crea el keypair desde la Secret Key
- Carga la información actual de la cuenta

2. **Transaction Builder**:
```javascript
new TransactionBuilder(sourceAccount, {
  fee: BASE_FEE,  // Tarifa estándar
  networkPassphrase: Networks.TESTNET  // Red de prueba
})
```

3. **Agregar operación de pago**:
```javascript
.addOperation(
  Operation.payment({
    destination: destinationPublicKey,  // A quién
    asset: Asset.native(),  // Tipo de moneda (XLM)
    amount: amount.toString()  // Cantidad
  })
)
```

4. **Agregar memo opcional**:
```javascript
.addMemo(memo ? Memo.text(memo) : Memo.none())
```

5. **Timeout y build**:
```javascript
.setTimeout(30)  // 30 segundos
.build();
```

6. **Firmar con Secret Key**:
```javascript
transaction.sign(sourceKeypair);
```

7. **Enviar**:
```javascript
const result = await server.submitTransaction(transaction);
```

**Ejecutar**:
```bash
node enviar-pago.js
```

#### 3. Ver Balance (`ver-balance.js`)

**Importaciones**:
```javascript
import { Horizon } from '@stellar/stellar-sdk';
```

**Código completo**:
```javascript
import { Horizon } from '@stellar/stellar-sdk';

// Servidor
const server = new Horizon.Server('https://horizon-testnet.stellar.org');

// Public Key a consultar
const publicKey = 'GXXX...XXX';

// Función para consultar balance
async function consultarBalance() {
  console.log('Consultando cuenta...');
  
  try {
    // Cargar información de la cuenta
    const account = await server.loadAccount(publicKey);
    
    console.log('Account ID:', account.account_id);
    console.log('Account Sequence Number:', account.sequence);
    
    console.log('\n=== BALANCES ===');
    
    // Iterar sobre cada balance
    account.balances.forEach((balance, index) => {
      if (balance.asset_type === 'native') {
        const reserva = 0.5; // Mínimo requerido
        const disponible = parseFloat(balance.balance) - reserva;
        
        console.log(`\nBalance ${index + 1}:`);
        console.log('  Tipo: XLM (nativo)');
        console.log('  Balance total:', balance.balance, 'XLM');
        console.log('  Reserva (bloqueada):', reserva, 'XLM');
        console.log('  Disponible para enviar:', disponible.toFixed(7), 'XLM');
      }
    });
    
  } catch (error) {
    if (error.response) {
      console.error('Cuenta no encontrada. Posibles causas:');
      console.error('- La cuenta nunca fue creada o fondeada');
      console.error('- Error de tipeo en la Public Key');
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Ejecutar
consultarBalance();
```

**Conceptos importantes**:

**Account Sequence Number**:
```
- Número único que se incrementa con cada transacción
- Previene transacciones duplicadas
- Similar al "Fetch next sequence" del Laboratory
```

**Reserva de Stellar**:
```
Reserva base: 0.5 XLM (bloqueada)
+ 0.5 XLM por cada subentry (trustlines, offers, etc.)

Balance disponible = Balance total - Reservas
```

**Ejecutar**:
```bash
node ver-balance.js
```

**Salida esperada**:
```
Consultando cuenta...
Account ID: GXXX...XXX
Account Sequence Number: 123456789

=== BALANCES ===

Balance 1:
  Tipo: XLM (nativo)
  Balance total: 9949.9999900 XLM
  Reserva (bloqueada): 0.5 XLM
  Disponible para enviar: 9949.4999900 XLM
```

### Errores Comunes y Soluciones

#### Error: Cannot use import statement

**Problema**:
```
SyntaxError: Cannot use import statement outside a module
```

**Solución**:
```json
// Agregar a package.json:
"type": "module"
```

#### Error: Server is not defined

**Problema**:
```javascript
// ❌ Código antiguo (ya no funciona)
import { Server } from '@stellar/stellar-sdk';
const server = new Server('...');
```

**Solución**:
```javascript
// ✅ Código actualizado
import { Horizon } from '@stellar/stellar-sdk';
const server = new Horizon.Server('...');
```

#### Error: Memo too long

**Problema**:
```
Memo text exceeds maximum length
```

**Solución**:
```javascript
// Memo máximo: 28 caracteres
.addMemo(Memo.text('TX')) // ✅
.addMemo(Memo.text('Mi primera transacción tiburona 🦈')) // ❌
```

#### Error al instalar en PowerShell

**Solución**:
```bash
# Cambiar a Git Bash
# O eliminar node_modules y reinstalar:
rm -rf node_modules
npm install @stellar/stellar-sdk
```

### Recursos Importantes

#### Documentación Oficial
```
Stellar Developers: https://developers.stellar.org
JavaScript SDK: https://developers.stellar.org/docs/tools/sdks/library
SDK en GitHub: https://github.com/stellar/js-stellar-sdk
SDK en NPM: https://www.npmjs.com/package/@stellar/stellar-sdk
```

#### Herramientas
```
Stellar Laboratory: https://laboratory.stellar.org
Stellar Expert: https://stellar.expert
Friendbot: https://friendbot.stellar.org
```

---

## 📦 Desafío 2: Crear y Subir Repositorio

### Requisitos del Desafío

**Trabajo**: En equipo (4 personas)

**Entrega**: Individual (cada una sube su propio repo)

**Fecha límite**: Domingo a la medianohe

### Contenido del Repositorio

```
tu-repo-stellar/
├── .gitignore          (Obligatorio)
├── package.json
├── package-lock.json
├── crear-cuenta.js
├── enviar-pago.js
├── ver-balance.js
└── README.md           (Opcional pero recomendado)
```

### Archivo .gitignore (OBLIGATORIO)

**Contenido mínimo**:
```
# Node modules
node_modules/

# Variables de entorno
.env
.env.local

```

⚠️ **Importante**: 
- Sin `.gitignore`, node_modules (890,000 archivos) se subirá a GitHub
- Tu computadora dirá "no puedo más" 😅
- GitHub puede rechazar el push

### Variables de Entorno (Recomendado)

**Archivo `.env`** (NO subir a GitHub):
```env
SECRET_KEY=SXXX...XXX
PUBLIC_KEY=GXXX...XXX
DESTINATION_KEY=GXXX...XXX
```

**Archivo `.env.example`** (SÍ subir a GitHub):
```env
SECRET_KEY=SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
PUBLIC_KEY=GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
DESTINATION_KEY=GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Usar en el código**:
```javascript
import dotenv from 'dotenv';
dotenv.config();

const sourceSecretKey = process.env.SECRET_KEY;
const destinationPublicKey = process.env.DESTINATION_KEY;
```

### Seguridad: Qué NO Subir

❌ **NUNCA subir**:
- Secret Keys
- Recovery phrases
- Archivos .env con datos reales
- node_modules/

✅ **SÍ se puede subir**:
- Public Keys
- Código
- .env.example (con datos de ejemplo)
- Documentación

### Cómo Subir a GitHub

#### Opción 1: Desde VS Code
```
1. Instalar extensión Git en VS Code
2. Click en Source Control (Ctrl + Shift + G)
3. Click "Publish to GitHub"
4. Seleccionar "Public Repository"
5. Seguir los pasos
```

#### Opción 2: Desde Terminal
```bash
# Inicializar git
git init

# Agregar archivos
git add .

# Primer commit
git commit -m "Initial commit - Stellar SDK scripts"

# Conectar con GitHub (crear repo primero en github.com)
git remote add origin https://github.com/tu-usuario/tu-repo.git

# Subir
git push -u origin main
```

### Entregar en Chamverse

**Formato de entrega**:
```
1. Ir a Chamverse
2. Envíos → Tareas
3. Título: ""Semana 1 Tarea 2"
4. Contenido: Solo la URL del repositorio
   Ejemplo: https://github.com/tu-usuario/stellar-clase-2
5. Publish 
```

### Trabajo en Equipo vs Individual

**En equipo**: Pueden juntarse para resolver problemas
```
- Discord
- Google Meet
- Telegram
- Ayudarse mutuamente
```

**Individual**: Cada una debe:
```
- Crear su propio repositorio
- Subir su propio código
- Entregar en Chamverse individualmente
- Entender el código (no solo copiar)
```

**Motivo**: Las becas se evalúan individualmente basándose en:
- Tu código
- Tu progreso
- Tu performance personal
- Tu acumulación de puntos

### README.md Sugerido

```markdown
# Stellar SDK - Clase 2

Scripts básicos para interactuar con la blockchain de Stellar usando JavaScript.

## Requisitos
- Node.js
- npm

## Instalación
```bash
npm install
```

## Configuración
Crear archivo `.env` con tus credenciales:
```env
SECRET_KEY=tu_secret_key
PUBLIC_KEY=tu_public_key
DESTINATION_KEY=cuenta_destino
```

## Scripts

### Crear Cuenta
```bash
node crear-cuenta.js
```
Genera un nuevo par de llaves y fondea la cuenta.

### Enviar Pago
```bash
node enviar-pago.js
```
Envía XLM a otra cuenta.

### Ver Balance
```bash
node ver-balance.js
```
Consulta el balance de una cuenta.

## Recursos
- [Stellar Developers](https://developers.stellar.org)
- [JavaScript SDK](https://github.com/stellar/js-stellar-sdk)


---

## 💡 Consejos Finales

### Para el Código
1. **Lee la documentación**: Todo está en https://developers.stellar.org
2. **Usa el GitHub colaborativo**: Pueden agregar fixes 
3. **Prueba en Testnet**: Nunca trabajes directo en Mainnet
4. **Guarda tus llaves**: Usa un gestor de contraseñas

### Para las Entregas
1. **No te abrumes**: Si no llegas, empieza de 0 la próxima semana
2. **Entrega aunque no funcione**: Es mejor entregar con errores que no entregar
3. **Pide ayuda**: Telegram y Discord de las Tiburonas están activos
4. **Documenta tus cambios**: Si modificas código, explica por qué

### Para el Aprendizaje
1. **Ve los videos**: Están en Chamverse para repasar
2. **Lee el código**: No solo copies, entiende qué hace cada línea
3. **Experimenta**: Cambia valores, rompe cosas, aprende
4. **Ayuda a otras**: Enseñar es la mejor forma de aprender

### Para la Comunidad
1. **Conecta con compañeras**: Busca personas con habilidades complementarias
2. **Comparte tus soluciones**: Si resolviste un problema, ayuda a otras
3. **Usa el Discord/Telegram**: Hay mucha actividad y apoyo

### Para la Beca
1. **Los puntos no son todo**: También evalúan código y performance
2. **Entrega constante**: Mejor entregar poco pero consistente
3. **Calidad sobre cantidad**: Un código bien hecho vale más que muchos incompletos
4. **Sé tú misma**: Muestra tu proceso de aprendizaje real

---

## 🐛 Debugging y Solución de Problemas

### Metodología General

1. Lee el error completo (no te asustes)
2. Busca la línea específica del error
3. Google el error (en inglés da mejores resultados)
4. Revisa la documentación oficial
5. Pregunta en Telegram/Discord con:
   - Captura del error
   - Código relevante
   - Lo que ya intentaste


### Errores Más Comunes

#### Error 1: Module not found
```bash
Error: Cannot find module '@stellar/stellar-sdk'
```
**Solución**:
```bash
npm install @stellar/stellar-sdk
```

#### Error 2: Package.json no configurado
```
SyntaxError: Cannot use import statement outside a module
```
**Solución**:
```json
// Agregar al package.json
"type": "module"
```

#### Error 3: Cuenta no fondeada
```
Error: Account not found
```
**Solución**:
```bash
# Fondear con Friendbot
curl "https://friendbot.stellar.org?addr=TU_PUBLIC_KEY"
```

#### Error 4: Horizonte caído
```
Error: Network Error
```
**Solución**:
```javascript
// Verificar que el servidor esté correcto
const server = new Horizon.Server('https://horizon-testnet.stellar.org');

// Si falla, probar después
// Stellar mantiene varios nodos
```

#### Error 5: Secret Key inválida
```
Error: Invalid secret key
```
**Solución**:
```javascript
// Verificar que:
// 1. Empiece con 'S'
// 2. Tenga exactamente 56 caracteres
// 3. No tenga espacios ni caracteres extraños
// 4. Sea de Testnet (si trabajas en Testnet)
```

---

## 📖 Glosario de Términos

### Blockchain y Stellar

**Blockchain**: 
- Libro contable distribuido
- Metáfora: Instagram de transacciones
- Inmutable y transparente

**Ledger**:
- Página del libro blockchain
- Cada 5 segundos aprox en Stellar
- Contiene múltiples transacciones

**XLM (Lumens)**:
- Criptomoneda nativa de Stellar
- Usada para fees y transacciones
- En Testnet: dinero ficticio

**Transaction Hash**:
- ID único de cada transacción
- 64 caracteres hexadecimales
- Como un número de seguimiento

**Sequence Number**:
- Contador de transacciones de una cuenta
- Previene duplicados
- Se incrementa automáticamente

**Fee (Tarifa)**:
- Costo por transacción
- BASE_FEE = 0.00001 XLM
- Muy económico en Stellar

**Memo**:
- Nota opcional en transacciones
- Máximo 28 caracteres
- Útil para identificar pagos

**Trustline**:
- Permiso para recibir un asset específico
- Cuesta 0.5 XLM de reserva
- No necesario para XLM nativo

### Cuentas y Llaves

**Keypair (Par de llaves)**:
- Public Key + Secret Key
- Generadas matemáticamente juntas
- Único e irrepetible

**Public Key**:
- Dirección pública de tu cuenta
- Comienza con 'G'
- Compartible

**Secret Key**:
- Llave privada
- Comienza con 'S'
- ❌ NUNCA compartir

**Recovery Phrase**:
- 12-24 palabras
- Backup de tu Secret Key
- Para recuperar acceso

**Signer**:
- Entidad que puede autorizar transacciones
- Puede haber múltiples signers
- Para cuentas multi-firma

### Desarrollo

**SDK (Software Development Kit)**:
- Conjunto de herramientas para desarrollar
- En este caso: @stellar/stellar-sdk
- JavaScript/TypeScript

**Horizon**:
- API de Stellar
- Servidor que procesa consultas
- https://horizon-testnet.stellar.org

**Laboratory**:
- Herramienta web de Stellar
- Para probar transacciones manualmente
- https://laboratory.stellar.org

**Stellar Expert**:
- Explorador de blockchain
- Ver cuentas y transacciones
- https://stellar.expert

**Freighter**:
- Wallet oficial de Stellar
- Extensión de navegador
- Para Mainnet y Testnet

**Friendbot**:
- Robot que fondea cuentas en Testnet
- Da 10,000 XLM ficticios
- Solo para pruebas

### Redes

**Testnet**:
- Red de pruebas
- Dinero ficticio
- Para aprender y desarrollar

**Mainnet**:
- Red principal
- Dinero real
- Para producción

**Network Passphrase**:
- Identificador de red
- Previene transacciones en red incorrecta
- Diferente para Testnet y Mainnet

### Programación

**Asynchronous (Asíncrono)**:
- No bloquea la ejecución
- Usa async/await
- Para operaciones que toman tiempo

**Promise**:
- Objeto que representa operación futura
- Puede resolver o rechazar
- Base de async/await

**Try-Catch**:
- Manejo de errores
- Try: intenta ejecutar
- Catch: atrapa errores

**Import/Export**:
- Sistema de módulos ES6
- Import: traer código
- Export: compartir código

**API (Application Programming Interface)**:
- Interfaz para comunicarse con servicios
- En Stellar: Horizon API
- REST endpoints

---

## 🔗 Links Importantes

### Stellar Oficial
```
🌐 Website: https://stellar.org
📚 Developers: https://developers.stellar.org
📖 Docs: https://developers.stellar.org/docs
🔧 Laboratory: https://laboratory.stellar.org
🔍 Expert: https://stellar.expert
```

### SDK y Herramientas
```
💻 JavaScript SDK: https://github.com/stellar/js-stellar-sdk
📦 NPM Package: https://www.npmjs.com/package/@stellar/stellar-sdk
🤖 Friendbot: https://friendbot.stellar.org
💼 Freighter Wallet: https://www.freighter.app
```



### Recursos Adicionales
```
📺 Videos Explicativos: En Chamverse
📄 Documentación en Español: En el GitHub del curso
❓ Preguntas Frecuentes: Canal de consultas en Telegram
```

---

## 📅 Calendario de Entregas

### Semana 1 (Actual)
- **Desafío 0**: Presentación en foro ✅
- **Desafío 1**: Transacción en Laboratory 📅 Dom 12 noche
- **Desafío 2**: Scripts JavaScript SDK 📅 Dom 12 noche

### Próximas Semanas
- Semana 2: Smart Contracts básicos
- Semana 3: Frontend + integración
- Semana 4: Proyecto intermedio
- Semana 5: Proyecto avanzado
- Semana 6: Proyecto final

**Formato**: Cada semana tiene puntos independientes, pero se acumulan para la beca final.

---

## 🎓 Siguiente Clase

### Temas a Ver
- Repaso de Scripts SDK
- Introducción a Smart Contracts
- Soroban (plataforma de contratos de Stellar)
- Hello World Contract
- Testing y deployment

### Preparación Recomendada
1. Tener instalado todo de la Clase 2
2. Revisar documentación de Soroban
3. Completar Desafíos 1 y 2
4. Repasar conceptos de blockchain

---

## ❓ Preguntas Frecuentes

### Sobre Entregas

**P: ¿Puedo entregar tarde?**
R: Sí, pero no sumas puntos para esa semana. La próxima semana empiezas de 0.

**P: ¿Entrego en grupo o individual?**
R: Individual. Aunque trabajen en grupo, cada una sube su propio repo.

**P: ¿Qué pasa si mi código no funciona?**
R: Entrégalo igual. Es mejor entregar con errores que no entregar.

**P: ¿Puedo modificar el código del GitHub del curso?**
R: ¡Sí! Es colaborativo. Si encuentras mejoras, haz un Pull Request.

### Sobre el Código

**P: ¿Tengo que entender todo el código?**
R: Idealmente sí, pero está bien copiar y después investigar qué hace.

**P: Mi código funciona diferente en Mac/Linux/Windows**
R: Normal. Comparte tu solución en el repo colaborativo.

**P: ¿Puedo usar IA para ayudarme?**
R: Sí, pero asegúrate de entender lo que hace el código.

**P: ¿Importa el estilo del código?**
R: No demasiado por ahora. Lo importante es que funcione.

### Sobre Stellar


**P: ¿Cuánto cuesta una transacción en Mainnet?**
R: Aproximadamente 0.00001 XLM (menos de $0.001 USD).

**P: ¿Pierdo mi dinero si me equivoco en Testnet?**
R: No, es dinero ficticio. Puedes experimentar libremente.

**P: ¿Cómo consigo XLM real?**
R: Exchanges como Binance, Kraken, o Coinbase. Pero NO necesitas para el curso.

### Sobre la Beca

**P: ¿Cómo se eligen las becadas?**
R: Puntos acumulados + calidad de código + performance general.

**P: ¿Si no gano la beca, puedo seguir aprendiendo?**
R: ¡Sí! Todo el contenido queda disponible y la comunidad sigue activa.

**P: ¿Cuántas becas hay?**
R: SHay en total 20 becas

**P: ¿Qué incluye la beca?**
R: Viaje a Buenos Aires, alojamiento, Builder House Stellar, networking.

---

## 🎯 Checklist de la Clase

### Clase 0
- [ ] Me presenté en el foro de Chamverse
- [ ] Instalé Freighter Wallet
- [ ] Creé mi cuenta en Freighter
- [ ] Me uní al grupo de Telegram
- [ ] Revisé mi equipo en Chamverse

### Clase 1
- [ ] Creé cuenta en Stellar Laboratory
- [ ] Fondeé mi cuenta con Friendbot
- [ ] Guardé mis llaves en lugar seguro
- [ ] Realicé una transacción manual
- [ ] Verifiqué la transacción en Stellar Expert
- [ ] Completé la plantilla del Desafío 1
- [ ] Envié el Desafío 1 en Chamverse

### Clase 2
- [ ] Instalé Node.js y npm
- [ ] Instalé Visual Studio Code
- [ ] Creé la estructura de carpetas
- [ ] Instalé @stellar/stellar-sdk
- [ ] Configuré package.json con "type": "module"
- [ ] Creé crear-cuenta.js y lo ejecuté
- [ ] Creé enviar-pago.js y lo ejecuté
- [ ] Creé ver-balance.js y lo ejecuté
- [ ] Configuré .gitignore
- [ ] Subí mi código a GitHub
- [ ] Envié la URL en Chamverse

---

## 💪 Motivación Final

### Recuerda:
- 🌟 **Estás aprendiendo blockchain**: Una tecnología revolucionaria
- 🌎 **Eres parte de una comunidad**: LatinoAmérica unida en Web3
- 🚀 **Cada error es aprendizaje**: Los bugs son maestros
- 👭 **No estás sola**: Tiburona que no avanza... tiene 100+ compañeras que la ayudan
- 🎓 **El proceso importa más que el resultado**: Aprender es ganar

### Frases de las Profes:
> "Si está roto igual lo suben, chicas. El código imperfecto entregado vale más que el código perfecto nunca terminado." - Tati

> "Esto es colaborativo. El GitHub es de todas nosotras, no es mío ni de Tati." - Lisa

> "No le tengan miedo a los errores. Todos tenemos errores. Es parte del proceso." - Ambas

### Para la Próxima Semana:
- Vuelve a ver los videos si es necesario
- Pregunta todo en Telegram/Discord
- Ayuda a una compañera si puedes
- Celebra cada pequeño logro
- Y sobre todo: **¡SIGUE PROGRAMANDO!** 🦈💻

---

## 📝 Notas Adicionales

### Sobre las Grabaciones
- Todas las clases quedan grabadas en Chamverse
- Puedes verlas las veces que necesites
- Están subtituladas (automáticas)
- Recomendado: verlas a 1.25x o 1.5x para repasar

### Sobre el Horario
- Clases los sábados de refuerzo
- Duración: ~1.5 horas
- Asistencia en vivo suma puntos

### Sobre el Contenido
- Se va actualizando semanalmente
- Si Stellar cambia, la documentación también
- Lo que funciona hoy puede cambiar mañana
- Por eso es importante la documentación oficial

### Agradecimientos
Un reconocimiento especial a:
- 🌟 Todas las participantes por su dedicación
- 🎯 BAF y Stellar por hacer posible el programa
- 🌎 La comunidad que se está formando

---

**¡Éxito en tus proyectos, Tiburona! 🦈✨**

*Última actualización: Clase del 11 de Octubre 2025*
