# 🪙 Código Futura — Stellar Wallet  
Pequeña **wallet de consola** construida con `@stellar/stellar-sdk` sobre la **Testnet de Stellar**.  
Permite crear cuentas, consultar balances y enviar pagos de forma automatizada desde la terminal.  

---

## 🧭 Descripción general  
Este proyecto forma parte de la **Tarea 2 — Fundamentos de Programación Stellar** del programa Código Futura.  
El objetivo fue consolidar los conocimientos sobre el SDK de Stellar y la interacción con la red mediante JavaScript, aplicando los patrones esenciales de manejo de cuentas, pagos y balances.

La wallet implementa un **menú interactivo** en consola que permite realizar operaciones básicas de blockchain sin necesidad de interfaz gráfica.  
Sirve como base para entender la lógica detrás de wallets reales y preparar el camino hacia los **smart contracts en Rust (Soroban)**.  

**Funciones principales:**
- 🆕 Crear cuentas y fondearlas con Friendbot.  
- 💸 Enviar pagos únicos o múltiples en serie.  
- 👀 Consultar balances y trustlines.  
- ⚙️ Calcular tarifas de red (fees) según número de operaciones.  
- 🧾 Revisar historial de transacciones recientes.  

---

## ⚙️ Requisitos  

Antes de ejecutar el proyecto, asegúrate de tener:  
- **Node.js** (versión 18 o superior)  
- **npm** o **yarn** instalado  
- Conexión a Internet (usa la red de prueba de Stellar: `https://horizon-testnet.stellar.org`)  

---

## 🚀 Instalación y uso  

1. **Clona el repositorio:**  
   ```bash
   git clone https://github.com/Julilugo09/Codigo-Futura.git
   cd Codigo-Futura
   ```

2. **Instala las dependencias:**  
   ```bash
   npm install
   ```

3. **Ejecuta la wallet en consola:**  
   ```bash
   node wallet.js
   ```
   O el archivo correspondiente a cada ejercicio:  
   - `crear-cuenta.js`  
   - `enviar-pago.js`  
   - `consultar-balance.js`  

---

## 🔍 Funcionamiento de la wallet paso a paso  

### 1️⃣ Creación y fondeo de cuentas  
El script genera pares de claves (`publicKey`, `secretKey`) usando `StellarSdk.Keypair.random()`.  
Luego, envía una solicitud a **Friendbot**, el servicio de Stellar Testnet que fondea cuentas nuevas con 10.000 XLM de prueba.  

> Cada cuenta se guarda en un array con su información y balance inicial mostrado en consola.

### 2️⃣ Envío de pagos  
El sistema automatiza el envío de pagos entre múltiples cuentas:  
- Envía **2 XLM** a tres destinatarios.  
- Cada pago incluye un **memo único** que identifica la transacción (ej. `Pago-001`).  
- Verifica en consola el **hash de la transacción** y el estado final.  
- Usa promesas y `await` para ejecutar las operaciones en serie, garantizando que cada una se complete antes de continuar.

### 3️⃣ Consulta de balances  
Permite ingresar un array de `publicKeys` y muestra:  
- Balance de XLM disponible.  
- Número de trustlines activas.  
- Número de secuencia (`sequence number`) actual.  

> La salida está formateada para facilitar la lectura de varias cuentas al tiempo.

### 4️⃣ Menú de la wallet (interactivo)  
Desde `wallet.js` puedes acceder a un menú con tres herramientas:  
- 💸 **Airdrop automático:** crea nuevas cuentas y las fondea usando Friendbot.  
- 👁️ **Monitor de balance:** revisa balances y trustlines de cualquier cuenta.  
- ⚙️ **Calculadora de fees:** estima el costo de transacciones según número de operaciones (útil para entender la estructura de comisiones de Stellar).  

> Todo corre en terminal. Ideal para aprender la mecánica interna de una wallet sin depender de interfaces gráficas.

---

## 🧠 Cómo funciona la wallet internamente  

- Se conecta a **Horizon Testnet**, el servidor de API pública de Stellar (`https://horizon-testnet.stellar.org`).  
- Cada cuenta se maneja mediante un **Keypair**, formado por una clave pública (identidad visible) y una clave secreta (firma de transacciones).  
- Las transacciones se crean con `StellarSdk.TransactionBuilder`, se firman localmente y luego se envían al servidor Horizon.  
- El sistema usa `async/await` para manejar las operaciones de red de forma secuencial.  
- Todos los datos se imprimen en consola, simulando el flujo de una wallet real: generación, fondeo, transacción y monitoreo.

---

## 🌟 Reflexión final  

Este ejercicio permite comprender los fundamentos de la red Stellar de forma práctica:  
- Cómo se crean y financian cuentas.  
- Cómo se envían transacciones seguras firmadas localmente.  
- Cómo se consulta el estado de las cuentas en la blockchain.  

La wallet es una herramienta educativa que combina **JavaScript + Stellar SDK**, y te prepara para dar el siguiente paso: escribir **smart contracts en Rust con Soroban**.  

> “No busques perfección, busca progreso. Cada línea de código te acerca más a construir tu futuro.” 🦈⚡  
