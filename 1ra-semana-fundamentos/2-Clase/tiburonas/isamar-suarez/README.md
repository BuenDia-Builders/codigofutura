# 🌟 Stellar SDK - Clase 2

Scripts básicos para interactuar con la blockchain de Stellar usando JavaScript y Node.js.

## 📋 Requisitos

- Node.js v18+
- npm

## 🚀 Instalación
```bash
npm install
```

## 📜 Scripts Disponibles

1. Crear Cuenta
```bash
node crear-cuenta.js
```
Genera un nuevo par de llaves (public key y secret key) y fondea la cuenta con 10,000 XLM de Friendbot (testnet).

2. Enviar Pago
```bash
node enviar-pago.js
```
Envía XLM desde una cuenta hacia otra.

⚠️ Importante: Edita el archivo enviar-pago.js y reemplaza:

SECRET_KEY con tu secret key de la cuenta origen
DESTINATION con la public key de la cuenta destino

3. Consultar Balance
```bash
node consultar-balance.js
```
Consulta el balance de una cuenta en la testnet de Stellar.

⚠️ Importante: Edita el archivo consultar-balance.js y reemplaza publicKey con la cuenta que deseas consultar.🔒

## Algunos scripts más avanzados
1. Crear cuentas masivas
```bash
node crear-cuentas-masivas.js
```
Te permite crear 5 cuentas, que son fondeadas con Friendbot. Muestra en consola: public key, secret key y
balance inicial de cada una y guarda toda la información en un array.

2. Enviar pagos masivos
```bash
node enviar-pagos-masivos.js
```
Puedes enviar XLM a cuentas diferentes en una sola ejecución, cada pago es identificado con el memo,
verifica el status de cada transacción antes de continuar con la próxima y muestra el hash de cada transacción.

3. Monitor de balances
```bash
node monitor-balances.js
```
Es un monitor que verifica balances de múltiples cuentas.

Importante:
❌ NUNCA compartas tu SECRET KEY

✅ Solo trabaja en TESTNET para aprender


📚 Recursos

- [Stellar Developers](https://developers.stellar.org/)
- [JavaScript SDK](https://github.com/stellar/js-stellar-sdk)
- [Stellar Expert (Testnet)](https://stellar.expert/explorer/testnet)

👩‍💻 Autora
Isamar Suarez - Tiburona de Código Futura 🦈

⭐ Proyecto desarrollado para el Desafío 2