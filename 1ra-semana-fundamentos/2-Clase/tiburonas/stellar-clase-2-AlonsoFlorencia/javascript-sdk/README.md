# 🦈✨ _Stellar JavaScript SDK - Tiburonas Builders_ ✨🦈

_Proyecto desarrollado con amor por las Tiburonas de Código Futura_ 🚀

---

## 🌟 _Descripción_

_Este proyecto contiene ejemplos prácticos para trabajar con la red Stellar usando el JavaScript SDK oficial. Desarrollado para aprender los fundamentos de la blockchain Stellar y el desarrollo con JavaScript._ 💫

---

## 📋 _Requisitos_

- **Node.js** 22.20.0 o superior 🟢
- **npm** 📦
- **Cuenta en Stellar Testnet** 🌐

---

## 🚀 _Instalación_

```bash
# Instalar dependencias
npm install

# Verificar instalación
node --version
```

---

## 📁 _Archivos del Proyecto_

### 🦈 _1. crear-cuenta.js_

_Crear una nueva cuenta Stellar y fondearla automáticamente_

**Características:**

- ✨ Genera par de llaves aleatorio
- 💰 Fondeo automático con Friendbot (10,000 XLM)
- 🔑 Muestra las llaves generadas

**Uso:**

```bash
node crear-cuenta.js
```

---

### 🦈 _2. ver-balance.js_

_Consultar el balance de una cuenta específica_

**Características:**

- 🌐 Conecta con Horizon Testnet
- 📊 Muestra información completa de la cuenta
- 💎 Calcula balance disponible (total - reserva)

**Uso:**

```bash
node ver-balance.js
```

---

### 🦈 _3. enviar-pago.js_

_Sistema de pagos automatizado para múltiples destinos_

**Características:**

- 💸 Envía 2 XLM a 3 cuentas diferentes
- 🏷️ Memos únicos para cada transacción
- ✅ Verifica éxito antes de continuar
- 🔗 Muestra hash de cada transacción

**Uso:**

```bash
node enviar-pago.js
```

---

### 🦈 _4. consultar-balance.js_

_Monitor de balances para múltiples cuentas_

**Características:**

- 📊 Consulta múltiples cuentas simultáneamente
- 💰 Balance XLM, trustlines y sequence number
- 🎨 Formato de salida legible y profesional

**Uso:**

```bash
node consultar-balance.js
```

---

## 🔧 _Configuración_

### _Variables Importantes_

```javascript
// En ver-balance.js
const publicKey = "TU_PUBLIC_KEY_AQUI";

// En enviar-pago.js
const sourceSecretKey = "TU_SECRET_KEY_AQUI";
const destinationPublicKey = "PUBLIC_KEY_DESTINO";
```

### _Red de Prueba (Testnet)_

_Todos los ejemplos están configurados para usar la red de prueba de Stellar:_

- **Horizon Server:** `https://horizon-testnet.stellar.org` 🌐
- **Network Passphrase:** `Test SDF Network ; September 2015` 🔐

---

## 📚 _Conceptos Importantes_

### 💎 _Reserva de Cuenta_

_Cada cuenta debe mantener un mínimo de 0.5 XLM como reserva_

### 💰 _Fees_

_Cada transacción tiene un fee mínimo (100 stroops = 0.00001 XLM)_

### 🏷️ _Memos_

_Mensajes opcionales que se pueden incluir en las transacciones_

---

## 🛠️ _Comandos Útiles_

```bash
# Ver balance de una cuenta
node ver-balance.js

# Crear nueva cuenta
node crear-cuenta.js

# Sistema de pagos automatizado
node enviar-pago.js

# Monitor de balances
node consultar-balance.js
```

---

## 🔒 _Seguridad_

- **NUNCA** compartas tu Secret Key 🚫
- **NUNCA** subas archivos con Secret Keys a repositorios públicos 🚫
- Usa variables de entorno para credenciales en producción 🔐
- Siempre usa la red de prueba para desarrollo 🧪

---

## 🎯 _Ejercicios Completados_

### 🦈 _Ejercicio 1: Creación de Cuentas Stellar_

**Archivo:** `crear-cuenta.js`

_Genera una nueva cuenta Stellar automáticamente, la fondea con Friendbot y muestra toda la información necesaria._

**Requisitos cumplidos:**

- ✅ Genera par de llaves aleatorio
- ✅ Fondeo automático con Friendbot (10,000 XLM)
- ✅ Muestra public key, secret key y hash de transacción
- ✅ Manejo completo de errores

---

### 🦈 _Ejercicio 2: Sistema de Pagos Automatizado_

**Archivo:** `enviar-pago.js`

_Sistema que envía 2 XLM a 3 cuentas diferentes con memos únicos, verificando el éxito de cada transacción._

**Requisitos cumplidos:**

- ✅ Envía 2 XLM a 3 destinatarios diferentes
- ✅ Memos únicos (Pago-001, Pago-002, Pago-003)
- ✅ Verifica éxito antes de continuar
- ✅ Muestra hash de cada transacción
- ✅ Usa variables de entorno para seguridad

**Resultado esperado:**

```
🚀 Iniciando sistema de pagos automatizado...

💸 Enviando pago 1 a GBSPYV...GATRN...
✅ Pago 1 exitoso
🔗 Hash: 5c8fa17c647d818de04df56e587d63b5237ed9a7dd813f344605c091da73ab8a

💸 Enviando pago 2 a GD4PFX...MPU2...
✅ Pago 2 exitoso
🔗 Hash: 8d9fa17c647d818de04df56e587d63b5237ed9a7dd813f344605c091da73ab8b

💸 Enviando pago 3 a GBQAY5...RSQ7...
✅ Pago 3 exitoso
🔗 Hash: 9e0fa17c647d818de04df56e587d63b5237ed9a7dd813f344605c091da73ab8c

🏁 Sistema de pagos completado.
```

---

### 🦈 _Ejercicio 3: Monitor de Balances_

**Archivo:** `consultar-balance.js`

_Monitor que consulta múltiples cuentas mostrando balance de XLM, número de trustlines activos y sequence number._

**Requisitos cumplidos:**

- ✅ Acepta array de public keys como entrada
- ✅ Muestra balance de XLM para cada cuenta
- ✅ Muestra número de trustlines activos
- ✅ Muestra sequence number actual
- ✅ Formato de salida legible y profesional
- ✅ Función `short()` para public keys más legibles

**Resultado esperado:**

```
=== MONITOR DE CUENTAS ===
Cuenta: GBSPYV...GATRN
  Balance: 10002.00 XLM
  Trustlines: 0
  Sequence: 4403002903363584

Cuenta: GD4PFX...MPU2
  Balance: 10002.00 XLM
  Trustlines: 0
  Sequence: 4403002903363584

Cuenta: GBQAY5...RSQ7
  Balance: 10002.00 XLM
  Trustlines: 0
  Sequence: 4403002903363584
```

---

## 🏆 _Logros del Proyecto_

- ✅ **4 archivos funcionales** con ejemplos prácticos 🦈
- ✅ **Manejo completo de errores** en todas las operaciones 🛡️
- ✅ **Variables de entorno** para mayor seguridad 🔐
- ✅ **Código limpio y documentado** en español 📝
- ✅ **Formato profesional** de salida 🎨
- ✅ **Buenas prácticas** de desarrollo blockchain ⭐

---

## 🐛 _Solución de Problemas_

### _Error: "Cuenta no encontrada"_

- Verifica que la Public Key sea correcta 🔍
- Asegúrate de que la cuenta esté fondeada 💰
- Confirma que estés usando la red correcta (Testnet) 🌐

### _Error: "Insufficient balance"_

- Verifica que tengas suficiente balance 💰
- Recuerda la reserva mínima de 0.5 XLM ⚠️
- Incluye el fee de transacción 💸

---

## 📖 _Recursos Adicionales_

- [Documentación oficial de Stellar](https://developers.stellar.org/) 📚
- [JavaScript SDK](https://github.com/stellar/js-stellar-sdk) 🛠️
- [Horizon API](https://developers.stellar.org/api) 🌐
- [Laboratorio de Stellar](https://laboratory.stellar.org/) 🧪

---

## 📝 _Notas de Desarrollo_

- Este proyecto usa ES6 modules (`"type": "module"` en package.json) 📦
- Todas las funciones son asíncronas para manejar operaciones de red ⚡
- Los ejemplos incluyen manejo completo de errores 🛡️
- El código está comentado en español para facilitar el aprendizaje 📚

---

## 🦈 _Hecho con dedicación por las Tiburonas Builders_ 🦈

**Curso Código Futura 2025** - Clase 2: Stellar JavaScript SDK

_Desarrollado para aprender los fundamentos de la blockchain Stellar y el desarrollo con JavaScript._ ✨

---

_¡Buen Día Builders! 🦈✨_
