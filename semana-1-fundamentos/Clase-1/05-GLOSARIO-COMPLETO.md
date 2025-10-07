# 📖 GLOSARIO COMPLETO DE STELLAR

Guía de referencia rápida para todos los términos que vas a encontrar.

---

## 🔑 ACCOUNT (Cuenta)

**Definición**: Tu "billetera digital" en Stellar

**Analogía**: Como una cuenta bancaria, pero descentralizada

**Componentes**:
- Public Key (dirección)
- Secret Key (contraseña)
- Balances (cuánto tienes)
- Configuración de seguridad

**Ejemplo**: GBXXX...XXX

---

## 💰 ASSET (Activo/Token)

**Definición**: Cualquier cosa de valor en Stellar

**Analogía**: Como diferentes tipos de dinero o puntos

**Tipos**:
- **XLM (nativo)**: Moneda oficial de Stellar
- **Tokens custom**: USDC, AQUA, etc.

**Ejemplo**: XLM, USDC:GA5ZSE...

---

## ⚖️ BALANCE (Saldo)

**Definición**: Cuánto de cada asset tienes

**Componentes**:
- **Total**: Cantidad total
- **Reserved**: Bloqueado (reserves)
- **Available**: Disponible para gastar

**Ejemplo**: 10,000 XLM total, 9,999.5 disponible

---

## 📖 BLOCKCHAIN

**Definición**: Cadena de bloques inmutable

**Analogía**: Libro de contabilidad que nadie puede borrar

**Propiedades**:
- Distribuida (copiada en muchos nodos)
- Inmutable (no se puede cambiar)
- Transparente (todos pueden ver)
- Segura (criptografía)

---

## 💸 FEE (Comisión)

**Definición**: Costo por transacción

**En Stellar**: 100 stroops = $0.00001 USD

**Por qué existe**: Prevenir spam

**A dónde va**: Se quema (destruye)

---

## 🤖 FRIENDBOT

**Definición**: Bot que da XLM gratis en testnet

**Analogía**: Cajero automático de dinero de prueba

**Función**: Crear y fondear cuentas de prueba

**Solo en**: Testnet (no funciona en mainnet)

**Cantidad**: 10,000 XLM por cuenta

---

## 🔍 HASH (Hash de Transacción)

**Definición**: ID único de una transacción

**Analogía**: Número de tracking de un envío

**Formato**: 64 caracteres hexadecimales

**Ejemplo**: a1b2c3d4e5f6789abcdef...

**Uso**: Buscar transacciones, prueba de pago

---

## 📚 LEDGER (Libro Mayor)

**Definición**: "Bloque" o "página" de la blockchain

**Analogía**: Una página del libro de contabilidad

**Frecuencia**: Nuevo ledger cada 3-5 segundos

**Contiene**:
- Todas las transacciones de ese periodo
- Hash del ledger anterior (cadena)
- Timestamp

**Ejemplo**: Ledger #1,234,567

---

## 🌐 MAINNET vs TESTNET

### MAINNET:
- Red principal de producción
- XLM tiene valor real ($$$)
- Transacciones permanentes
- Usar solo cuando sepas lo que haces

### TESTNET:
- Red de pruebas
- XLM sin valor ($0)
- Para aprender y experimentar
- Resetea periódicamente

> ⚠️ **IMPORTANTE**: SIEMPRE verifica en qué red estás

---

## 📝 MEMO

**Definición**: Mensaje opcional en transacciones

**Analogía**: El "concepto" o "nota" en transfer bancario

**Tipos**:
- **TEXT**: Mensaje legible (hasta 28 bytes)
- **ID**: Número (exchanges lo requieren)
- **HASH**: Hash de 32 bytes
- **RETURN**: Para reembolsos

**Ejemplo**: "Pago de renta octubre"

> ⚠️ Es PÚBLICO, todos pueden verlo

---

## ⚙️ OPERATION (Operación)

**Definición**: Acción individual en una transacción

**Tipos comunes**:
- **Payment**: Enviar assets
- **Create Account**: Crear nueva cuenta
- **Change Trust**: Aceptar un token
- **Manage Offer**: Crear orden en DEX

> Una transacción puede tener 1-100 operations

---

## 📧 PUBLIC KEY (Llave Pública)

**Definición**: Tu "dirección" en Stellar

**Analogía**: Tu dirección de email

**Formato**:
- 56 caracteres alfanuméricos
- Empieza con "G"
- Ejemplo: GBXM7KFQFXZY6Y...

**Uso**: Para RECIBIR pagos

**Compartible**: ✅ SÍ, es pública

---

## 💎 RESERVE (Reserva)

**Definición**: XLM mínimo bloqueado en cuenta

**Analogía**: Saldo mínimo requerido en banco

**Base Reserve**: 0.5 XLM (por cuenta)

**Subentry Reserve**: 0.5 XLM por cada:
- Trustline
- Offer en DEX
- Data entry
- Signer adicional

**Recuperable**: Sí (eliminando subentries)

---

## 🔐 SECRET KEY (Llave Secreta)

**Definición**: Tu "contraseña" de la cuenta

**Analogía**: PIN de tu tarjeta bancaria

**Formato**:
- 56 caracteres alfanuméricos
- Empieza con "S"
- Ejemplo: SBXM7KFQFXZY6Y...

**Uso**: Para ENVIAR pagos (firmar transacciones)

**Compartible**: ❌ NUNCA

### ⚠️ CRÍTICO:
- Si la pierdes: pierdes acceso a fondos
- Si alguien la obtiene: puede robar tus fondos
- No hay "recuperar contraseña"

---

## 🔢 SEQUENCE NUMBER

**Definición**: Contador de transacciones enviadas

**Analogía**: Número de cheque

**Función**: Prevenir replay attacks

**Funcionamiento**:
- Empieza en timestamp de creación
- Se incrementa +1 con cada tx enviada
- Cada tx debe usar sequence+1

**Ejemplo**: 123456789012345 → 123456789012346

---

## ✍️ SIGNATURE (Firma Digital)

**Definición**: Prueba criptográfica de autorización

**Analogía**: Tu firma en un contrato

**Cómo funciona**:
1. Firmas tx con tu secret key
2. Genera firma única para ESA transacción
3. Red verifica con tu public key

**Propiedades**:
- No revela secret key
- Solo válida para esa tx
- No se puede reutilizar

---

## ⏱️ STROOP

**Definición**: Unidad más pequeña de XLM

**Analogía**: Centavo es a peso, stroop es a XLM

**Conversión**:
- 1 XLM = 10,000,000 stroops
- 1 stroop = 0.0000001 XLM

**Uso**: Medir fees precisamente

**Ejemplo**: Fee de 100 stroops = 0.00001 XLM

---

## 📨 TRANSACTION (Transacción)

**Definición**: Conjunto de operaciones firmadas

**Analogía**: Sobre con instrucciones firmadas

**Componentes**:
- Source account
- Operations (1 o más)
- Fee
- Memo (opcional)
- Signatures

**Propiedad clave**: Atómica (todo o nada)

---

## 🤝 TRUSTLINE

**Definición**: Autorización para recibir un token

**Analogía**: Decir "acepto cheques de este banco"

**Por qué existe**: Prevenir spam de tokens

**Cómo crear**: Operation "Change Trust"

**Costo**: 0.5 XLM reserve (recuperable)

**Ejemplo**: Trustline para USDC de Circle

> ⚠️ Necesitas trustline para TODO token (excepto XLM)

---

## 🌟 XLM (Lumens)

**Definición**: Criptomoneda nativa de Stellar

**Usos**:
- Pagar fees de transacciones
- Reserves en cuentas
- Anti-spam
- Bridge currency (conversiones)

**Símbolo**: XLM

**Decimales**: 7 (0.0000001 = 1 stroop)

**No requiere**: Trustline (es nativo)

---

## 🔤 XDR (External Data Representation)

**Definición**: Formato binario de Stellar

**Analogía**: "Código de barras" de transacciones

**Para qué**: Transmitir datos eficientemente

**Formato**: Base64 encoded

**Uso típico**:
- Firmar transacciones offline
- Debugging
- Análisis técnico

> No necesitas entenderlo para usar Stellar

---

## 📚 RECURSOS ADICIONALES

Para profundizar en estos conceptos:

- **Documentación Oficial**: https://developers.stellar.org
- **Glosario Interactivo**: https://stellar.org/learn

---

## 💡 TIPS PARA USAR ESTE GLOSARIO

1. **Referencia rápida**: Usa Ctrl+F para buscar términos
2. **Aprende gradualmente**: No memorices todo, consúltalo cuando lo necesites
3. **Práctica**: Los conceptos se entienden mejor usándolos
4. **Anota**: Agrega tus propias notas o ejemplos

---

🚀 **Este glosario es tu compa/colega durante todo el curso. ¡Guárdalo cerca!**