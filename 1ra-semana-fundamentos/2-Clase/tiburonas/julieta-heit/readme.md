# 🌟 Stellar SDK - Clase 2

> Proyecto de aprendizaje de Stellar SDK para crear cuentas, enviar pagos y consultar balances en Testnet.

---

## 📁 Estructura del Proyecto

Proyecto de aprendizaje de Stellar SDK para crear cuentas, enviar pagos y consultar balances.
```
stellar-clase-2/
├── javascript-skd/
│ ├── .env.example
│ ├── .gitignore
│ ├── package.json
│ │
│ ├── 📝 Ejercicios de la Tarea
│ ├── crear-cuentas-masivo.js # Ejercicio 1: Creación masiva de cuentas
│ ├── enviar-pagos-masivo.js # Ejercicio 2: Sistema de pagos automatizado
│ ├── monitor-balances.js # Ejercicio 3: Monitor de balances
│ │
│ └── 🎯 Scripts Base (Práctica)
│ ├── crear-cuenta.js # Crear una cuenta individual
│ ├── enviar-pago.js # Enviar un pago simple
│ └── ver-balance.js # Consultar balance de una cuenta
│
└── readme.md
```
---

## 🚀 Ejercicios Realizados

### 🪐 Ejercicio 1: Creación Masiva de Cuentas

**Archivo:** `crear-cuentas-masivo.js`

✨ **Funcionalidades:**
- Genera automáticamente 5 pares de llaves (keypairs)
- Fondea cada cuenta con Friendbot (10,000 XLM en Testnet)
- Muestra public key, secret key y balance inicial
- Guarda toda la información en un array para referencia

```bash
node javascript-skd/crear-cuentas-masivo.js
```
---

### 💸 Ejercicio 2: Sistema de Pagos Automatizado

**Archivo:** `enviar-pagos-masivo.js`

✨ **Funcionalidades:**
- Envía 2 XLM a 3 cuentas diferentes en una sola ejecución.  
- Cada pago incluye un memo único (Pago-001, Pago-002, Pago-003).  
- Verifica el éxito de cada transacción antes de continuar.  
- Muestra el transaction hash para seguimiento.

```bash
node javascript-skd/enviar-pagos-masivo.js
```
---

### 📊 Ejercicio 3: Monitor de Balances

**Archivo:** `monitor-balances.js`

✨ **Funcionalidades:**
- Acepta un array de public keys como entrada  
- Muestra para cada cuenta:  
  - Balance de XLM  
  - Número de trustlines activos  
  - Sequence number actual  

```bash
node javascript-skd/monitor-balances.js
```
---

### 📦 Instalación

1. **Clonar el repositorio**
```bash
cd stellar-clase-2/javascript-skd
```
2. **Instalar dependencias**
```bash
cd stellar-clase-2/javascript-skd
```
3. **Configurar variables de entorno**
   
  Crea un archivo .env basándote en .env.example:
```bash
cp .env.example .env
```
---

### 🎯 Uso

**Scripts de Práctica**

Crear una cuenta individual
```bash
node javascript-skd/crear-cuenta.js
```
Enviar un pago simple
```bash
node javascript-skd/enviar-pago.js
```
Consultar balance de una cuenta
```bash
node javascript-skd/ver-balance.js
```
---

### 🛠️ Tecnologías Utilizadas

✨ **Tecnologías Principales:**
- **Node.js** – Entorno de ejecución  
- **@stellar/stellar-sdk** – SDK oficial de Stellar  
- **dotenv** – Manejo de variables de entorno  
- **Stellar Testnet** – Red de pruebas  
- **Friendbot** – Servicio de fondeo para Testnet  

---

### 📚 Recursos de Aprendizaje

📖 **Documentación y Recursos Útiles:**
- [Documentación Stellar](https://developers.stellar.org/docs)  
- [Stellar Laboratory](https://laboratory.stellar.org/)  
- [Stellar Quest](https://quest.stellar.org/)  
- [Stellar SDK JavaScript](https://github.com/stellar/js-stellar-sdk)  

---

### 👩‍💻 Sobre este Proyecto

Este proyecto fue desarrollado como parte de la **Clase 2 del programa Código Futura 🦈**,  
enfocado en aprender **blockchain con Stellar**.  

Incluye ejercicios prácticos para:  
- Crear y fondear cuentas en la Testnet  
- Enviar pagos automatizados  
- Monitorear balances y transacciones  

💫 El objetivo es comprender de forma práctica el funcionamiento del **SDK de Stellar** y los fundamentos de la tecnología **blockchain**.

---
