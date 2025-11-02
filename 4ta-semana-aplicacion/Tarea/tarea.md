# 📝 TAREA: Conexión Básica con Freighter Wallet

## 🎯 Objetivo
Crear una aplicación Next.js simple que permita **conectar y desconectar la wallet Freighter**, mostrando la dirección pública del usuario.

---

## ✅ Requisitos Previos

Antes de empezar, asegúrate de tener:

- ✅ Node.js instalado (versión 16 o superior)
- ✅ Extensión Freighter instalada en tu navegador
  - **Descargar:** https://www.freighter.app/
- ✅ Editor de código (VS Code recomendado)

---

## 📋 Pasos de la Tarea

### 1️⃣ Setup del Proyecto (5 minutos)

---

### 2️⃣ Crear el Componente de Conexión (15 minutos)

### 3️⃣ Actualizar la Página Principal (5 minutos)

### 4️⃣ Probar la Aplicación (5 minutos)


Luego abre tu navegador en: **http://localhost:3000**

---

## 🧪 Pruebas que Debes Hacer

### ✅ Prueba 1: Wallet NO instalada
1. Desinstala Freighter temporalmente
2. Click en "Conectar Wallet"
3. ❓ **¿Qué debe pasar?** → Debe mostrar error: "Freighter no está instalado"

### ✅ Prueba 2: Wallet instalada pero bloqueada
1. Instala Freighter pero mantenla bloqueada (con candado)
2. Click en "Conectar Wallet"
3. ❓ **¿Qué debe pasar?** → Freighter te pedirá desbloquear con tu password

### ✅ Prueba 3: Conexión exitosa
1. Desbloquea Freighter
2. Click en "Conectar Wallet"
3. Autoriza la conexión en el popup de Freighter
4. ❓ **¿Qué debe pasar?** → Debe mostrar tu dirección pública (empieza con G...)

### ✅ Prueba 4: Desconexión
1. Estando conectado, click en "Desconectar Wallet"
2. ❓ **¿Qué debe pasar?** → La pantalla vuelve al estado inicial

---

## 📸 Capturas de Pantalla Esperadas

### Estado Inicial
```
┌─────────────────────────────────┐
│       🦈 Stellar Wallet         │
│   Conecta tu Freighter Wallet   │
│                                 │
│  [🔗 Conectar Wallet]           │
│                                 │
│  💡 Asegúrate de tener          │
│     Freighter instalado         │
└─────────────────────────────────┘
```

### Estado Conectado
```
┌─────────────────────────────────┐
│       🦈 Stellar Wallet         │
│   Conecta tu Freighter Wallet   │
│                                 │
│  ✅ Wallet Conectada            │
│  ┌─────────────────────────┐   │
│  │ GCKD...ABCD             │   │
│  └─────────────────────────┘   │
│                                 │
│  [🚪 Desconectar Wallet]        │
└─────────────────────────────────┘
```

---

## 🎓 ¿Qué Aprendiste?

Al completar esta tarea, ahora sabes:

✅ Cómo verificar si Freighter está instalado (`isConnected()`)  
✅ Cómo obtener la clave pública del usuario (`getPublicKey()`)  
✅ Cómo manejar estados de conexión en React (`useState`)  
✅ Cómo manejar errores al conectar wallets  
✅ Cómo crear una UI responsive con Tailwind CSS  

---

## 🚀 Siguiente Nivel (Opcional)

Si terminaste rápido y quieres un desafío extra, intenta agregar:

### Challenge 1: Mostrar balance de XLM
Instala el Stellar SDK y muestra cuántos XLM tiene el usuario:

```bash
npm install stellar-sdk
```

### Challenge 2: Copiar dirección al clipboard
Agrega un botón que copie la dirección pública:

```javascript
const copyToClipboard = () => {
  navigator.clipboard.writeText(publicKey);
  alert('¡Dirección copiada!');
};
```

---

## 📦 Entregables

Al terminar, debes tener:

1. ✅ Proyecto Next.js funcionando o no funcionando debe ser entregado en Chamverse en la sección de envios, titulo SEMANA 4 - nombre y apellido. 
2. ✅ Componente `WalletConnect.jsx` creado
3. ✅ Capacidad de conectar/desconectar Freighter
4. ✅ Manejo de errores implementado
5. ✅ UI responsive y atractiva

---

## 🎯 Criterios de Éxito

Tu tarea está completa cuando:

- [ ] El botón "Conectar Wallet" funciona
- [ ] Se muestra la dirección pública del usuario
- [ ] El botón "Desconectar" limpia el estado
- [ ] Los errores se muestran correctamente
- [ ] La UI se ve bien en mobile y desktop

---

## 💡 Tips Importantes

1. **No necesitas crear cuenta en Stellar todavía** - Solo conectas la wallet
2. **La clave pública es segura** - Puedes mostrarla sin problemas
3. **NUNCA pidas la clave privada** - Freighter la maneja por ti
4. **Testea con Freighter desbloqueada** - Es más fácil para empezar

---

## 📚 Recursos Adicionales

- **Freighter Docs:** https://docs.freighter.app/
- **Stellar Docs:** https://developers.stellar.org/
- **Next.js Docs:** https://nextjs.org/docs

---

## 🦈 ¡Éxito!

Esta es la base de TODA dApp en Stellar. Una vez que domines esto, podrás:

- ✅ Ver balances de assets
- ✅ Crear trustlines
- ✅ Enviar pagos
- ✅ Interactuar con contratos Sorobanç
- ✅ Podes continuar con la clase 8 y hacer los demás componentes

**Todo empieza con conectar la wallet. ¡Tú puedes!** 🚀

---

**Versión:** 1.0  
**Autor:** Tiburonas Builders  
