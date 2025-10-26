# 🦈 TAREA CLASE 2 – CÓDIGO FUTURA

## 🌟 Fundamentos de Programación Stellar

Este repositorio contiene los tres ejercicios prácticos de la Clase 2 del curso **Código Futura x Buen Día Builders**, usando **Stellar SDK en JavaScript** para interactuar con la red de pruebas (testnet).

---

## 📋 Ejercicios incluidos

### 🚀 **Ejercicio 1: Creación Masiva de Cuentas**
- **Archivo**: `crear-cuenta.js`
- **Objetivo**: Crear 5 cuentas automáticamente con fondeo
- **Funcionalidad**: Genera keypairs, fondea con Friendbot, muestra credenciales

### 💸 **Ejercicio 2: Sistema de Pagos Automatizado** 
- **Archivo**: `enviar-pago.js`
- **Objetivo**: Enviar 2 XLM a múltiples destinatarios
- **Funcionalidad**: Pagos batch con memos únicos, verificación de éxito

### 🔍 **Ejercicio 3: Monitor de Balances**
- **Archivo**: `consultar-balance.js` 
- **Objetivo**: Monitorear múltiples cuentas
- **Funcionalidad**: Balance XLM, trustlines activos, sequence numbers

---

## ⚙️ Instalación

### 1. **Clonar el repositorio**
```bash
git clone https://github.com/kaream-badillo/codigofutura-bdb.git
cd codigofutura-bdb
```

### 2. **Instalar dependencias**
```bash
npm install
```

### 3. **Requisitos del sistema**
- Node.js 18+
- Conexión a internet (para testnet de Stellar)

---

## 🎯 Instrucciones de uso

### **Paso 1: Crear 5 cuentas**
```bash
node crear-cuenta.js
```
**Salida esperada:**
```
🚀 Iniciando creación masiva de cuentas...

🔹 Creando cuenta 1...
   ✅ Public Key: GDKL...F4AX
   🔐 Secret Key: SAAG...HW6Q  
   💰 Balance inicial: 10000.0000000 XLM

🔹 Creando cuenta 2...
   ✅ Public Key: GDCJ...4L24
   🔐 Secret Key: SA2P...ZTX7
   💰 Balance inicial: 10000.0000000 XLM
   
[... continúa con las 5 cuentas...]

📋 Resumen de cuentas creadas:
[Array con toda la información]
```

### **Paso 2: Configurar archivos con las claves generadas**

#### **A) Actualizar `enviar-pago.js`**
Copiar del output anterior:
- **Secret Key** de la cuenta 1 → variable `sourceSecret`
- **Public Keys** de cuentas 2, 3, 4 → array `destinatarios`

```javascript
// Ejemplo de configuración
const sourceSecret = "SAAG...HW6Q";  // Secret Key cuenta 1
const destinatarios = [
    { publicKey: "GDCJ...4L24", memo: "Pago-001" },  // Cuenta 2
    { publicKey: "GAK4...KHBG", memo: "Pago-002" },  // Cuenta 3  
    { publicKey: "GDZX...QBBE", memo: "Pago-003" }   // Cuenta 4
];
```

#### **B) Actualizar `consultar-balance.js`**
Copiar los **5 Public Keys** → array `cuentas`

```javascript
const cuentas = [
  "GDKL...F4AX",  // Cuenta 1 (emisora)
  "GDCJ...4L24",  // Cuenta 2 
  "GAK4...KHBG",  // Cuenta 3
  "GDZX...QBBE",  // Cuenta 4
  "GCJ4...IVOX"   // Cuenta 5
];
```

### **Paso 3: Ejecutar sistema de pagos**
```bash
node enviar-pago.js
```
**Salida esperada:**
```
💸 Iniciando sistema de pagos automatizado...

✅ Pago-001 - Pago exitoso
   📤 Destinatario: GDCJ...4L24
   💰 Monto: 2 XLM
   🔗 Hash: a1b2c3d4...
   ⏰ Timestamp: 12/10/2025, 8:42:27 PM

[... continúa con los 3 pagos...]

🎉 Sistema de pagos completado
```

### **Paso 4: Monitorear balances**
```bash
node consultar-balance.js
```
**Salida esperada:**
```
=== MONITOR DE CUENTAS ===
Cuenta: GDKL...F4AX
  Balance: 9994.00 XLM
  Trustlines: 0
  Sequence: 4393283392372739

Cuenta: GDCJ...4L24
  Balance: 10002.00 XLM
  Trustlines: 0  
  Sequence: 4393283392372737

[... continúa con las 5 cuentas...]
```

---

## 🔧 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run crear-cuenta` | Ejecuta el ejercicio 1 |
| `npm run enviar-pago` | Ejecuta el ejercicio 2 |
| `npm run consultar-balance` | Ejecuta el ejercicio 3 |
| `npm test` | Ejecuta los 3 ejercicios en secuencia |

---

## 🧩 Estructura del proyecto

```
├── crear-cuenta.js        # 🚀 Ejercicio 1: Creación masiva
├── enviar-pago.js         # 💸 Ejercicio 2: Pagos automatizados  
├── consultar-balance.js   # 🔍 Ejercicio 3: Monitor de balances
├── package.json           # Configuración y dependencias
├── README.md              # Este archivo
```

---

## ⚠️ Notas importantes

1. **Red de pruebas**: Usa Stellar testnet, no mainnet
2. **Credenciales**: Los secret keys se muestran en terminal para fines educativos
3. **Friendbot**: Fondea automáticamente con 10,000 XLM de prueba
4. **Secuencial**: Ejecutar ejercicios en orden (1 → 2 → 3)
5. **Copiar/Pegar**: Las claves se copian manualmente entre ejercicios

---

## 📚 Referencias

- **Stellar SDK**: https://stellar.github.io/js-stellar-sdk/
- **Horizon API**: https://developers.stellar.org/api/
- **Código Futura**: Clase 2 - Páginas 46, 53, 55-62

---

## 👥 Autor

**Kaream Badillo** - Código Futura x Buen Día Builders  
📧 kaream.badillo@usach.cl
