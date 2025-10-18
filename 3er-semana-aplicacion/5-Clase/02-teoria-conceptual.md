# 📚 Teoría Conceptual - Tokens en Stellar

## 🪙 ¿Qué es un Token?

Un token es una **representación digital de valor** que vive en la blockchain. Es como tener dinero digital programable que puede representar cualquier cosa de valor.

### Ejemplos del Mundo Real

- **🎮 Créditos de videojuegos:** Como V-Bucks en Fortnite
- **✈️ Millas aéreas:** Puntos de fidelidad digitalizados
- **💵 Stablecoins:** USDC, USDT (representan dólares)
- **🏢 Acciones tokenizadas:** Propiedad fraccionada
- **🎟️ Tickets de eventos:** NFTs de entrada
- **🌳 Créditos de carbono:** Activos ambientales

## 📜 Estándar CAP-46: El Blueprint de Stellar

CAP-46 (Core Advancement Proposal 46) es el estándar oficial de Stellar para tokens fungibles.

### ¿Por qué necesitamos estándares?

```
Sin Estándar                    Con Estándar (CAP-46)
─────────────                    ─────────────────────
Wallet A → Token X ❌            Wallet A → Token X ✅
Wallet B → Token X ❌            Wallet B → Token X ✅
DEX → Token X ❌                 DEX → Token X ✅
```

### Funciones Requeridas por CAP-46

```rust
trait TokenInterface {
    // Metadatos
    fn name() -> String;
    fn symbol() -> String;
    fn decimals() -> u32;
    fn total_supply() -> u128;
    
    // Core
    fn balance(owner: Address) -> u128;
    fn transfer(from: Address, to: Address, amount: u128);
    fn approve(owner: Address, spender: Address, amount: u128);
    fn allowance(owner: Address, spender: Address) -> u128;
    fn transfer_from(spender: Address, from: Address, to: Address, amount: u128);
    
    // Admin
    fn mint(to: Address, amount: u128);
    fn burn(from: Address, amount: u128);
}
```

## 🔄 ERC-20 vs Stellar Tokens: La Gran Comparación

### Arquitectura Fundamental

| Característica | ERC-20 (Ethereum) | Stellar (Soroban) |
|---------------|-------------------|-------------------|
| **Modelo de Gas** | Dinámico (subastas) | Fijo (predecible) |
| **Lenguaje** | Solidity | Rust |
| **Seguridad** | require/assert | Result<T, Error> |
| **Storage** | Mapping infinito | TTL management |
| **Decimales** | Típicamente 18 | Típicamente 7 |
| **Upgrades** | Proxy patterns | Nativo |

### Ejemplo de Costo Real

```
Transferencia de Token:
━━━━━━━━━━━━━━━━━━━━━
Ethereum: $5 - $50 (variable)
Stellar:  $0.00001 (fijo)

Diferencia: 500,000x más barato
```

## 🔐 Conceptos de Seguridad Críticos

### 1. Authorization (require_auth)

```rust
// ❌ INSEGURO - Cualquiera puede transferir
fn transfer(from: Address, to: Address, amount: u128) {
    // Sin verificación de autorización
    update_balances(from, to, amount);
}

// ✅ SEGURO - Solo el dueño puede transferir
fn transfer(from: Address, to: Address, amount: u128) {
    from.require_auth(); // Verificación crítica
    update_balances(from, to, amount);
}
```

### 2. Overflow/Underflow Protection

```rust
// ❌ PELIGROSO - Puede causar overflow
let new_balance = balance + amount;

// ✅ SEGURO - Manejo de overflow
let new_balance = balance.checked_add(amount)
    .ok_or(TokenError::OverflowError)?;
```

### 3. Reentrancy Prevention

En Soroban, el modelo de ejecución secuencial reduce naturalmente los riesgos de reentrancy, pero siempre:
- Actualiza el estado ANTES de llamadas externas
- Valida el estado DESPUÉS de operaciones

## 💾 Storage en Stellar: Instance vs Persistent

### Instance Storage
- Para metadatos del contrato (admin, name, symbol)
- Compartido entre todas las invocaciones
- Más barato

### Persistent Storage
- Para datos de usuarios (balances, allowances)
- Específico por key
- Requiere gestión de TTL

```rust
// Instance - Metadatos globales
env.storage().instance().set(&DataKey::Admin, &admin);

// Persistent - Datos de usuario
env.storage().persistent().set(&DataKey::Balance(user), &amount);
```

## ⏰ TTL (Time To Live) Management

En Stellar, los datos no viven para siempre por defecto:

```rust
// Extender vida de los datos
env.storage().persistent().extend_ttl(
    &DataKey::Balance(user),
    100_000,  // threshold (cuando extender)
    200_000   // extend_to (nueva duración)
);
```

### TTL en Diferentes Redes

| Red | TTL Default | Costo Storage |
|-----|------------|---------------|
| Testnet | ~30 días | Gratis |
| Mainnet | Configurable | Mínimo |

## 📊 Eventos: La Caja Negra del Blockchain

Los eventos son críticos para:
- 📱 Actualizar interfaces de usuario
- 📈 Analytics y monitoreo
- 🔍 Auditoría y compliance
- 🔄 Sincronización con sistemas externos

### Evento Rico vs Básico

```rust
// ❌ Evento básico - información limitada
env.events().publish(
    Symbol::new(&env, "transfer"),
    amount
);

// ✅ Evento rico - información completa
env.events().publish(
    (Symbol::new(&env, "transfer"), from, to),
    (amount, new_from_balance, new_to_balance)
);
```

## 🎯 Decisiones de Diseño Importantes

### 1. Transfer a Sí Mismo

```rust
// Opción A: Permitir (no-op)
if from == to {
    return Ok(()); // No hacer nada
}

// Opción B: Prohibir (gas-efficient)
if from == to {
    return Err(TokenError::InvalidRecipient);
}
```

**Trade-off:** UX vs Eficiencia de Gas

### 2. Burn Mechanism

```rust
// Opción A: Reduce supply (deflacionario)
total_supply = total_supply - burn_amount;

// Opción B: Solo reduce balance
balance = 0; // Supply permanece igual
```

**Trade-off:** Política monetaria del token

### 3. Decimales

```rust
// Opción A: 18 decimales (compatibilidad Ethereum)
decimals = 18;

// Opción B: 7 decimales (estándar Stellar)
decimals = 7;
```

**Trade-off:** Compatibilidad vs Eficiencia

## 🌟 Mejores Prácticas

1. **Siempre validar autorización**
2. **Usar Result<T, Error> en lugar de panic!**
3. **Emitir eventos ricos con contexto**
4. **Extender TTL en operaciones críticas**
5. **Testear casos edge, no solo happy path**
6. **Documentar decisiones de diseño**

## 🚨 Antipatrones Comunes

### ❌ No hacer esto:

```rust
// Permitir mint sin autorización
fn mint(to: Address, amount: u128) {
    // Sin verificar admin
    update_balance(to, amount);
}

// Usar panic en producción
if balance < amount {
    panic!("Insufficient balance");
}

// Olvidar extender TTL
env.storage().persistent().set(&key, &value);
// Sin extend_ttl
```

### ✅ Hacer esto en su lugar:

```rust
// Verificar admin siempre
fn mint(to: Address, amount: u128) -> Result<(), TokenError> {
    admin.require_auth();
    update_balance(to, amount)
}

// Usar Result para errores
if balance < amount {
    return Err(TokenError::InsufficientBalance);
}

// Siempre extender TTL
env.storage().persistent().set(&key, &value);
env.storage().persistent().extend_ttl(&key, 100_000, 200_000);
```

---

## 📚 Referencias

- [CAP-46 Specification](https://stellar.org/protocol/cap-46)
- [Soroban Token Interface](https://soroban.stellar.org/docs/tokens/token-interface)
- [Security Best Practices](https://soroban.stellar.org/docs/security)

---

*"Entender la teoría es el 50%, implementarla correctamente es el otro 50%" 🦈*