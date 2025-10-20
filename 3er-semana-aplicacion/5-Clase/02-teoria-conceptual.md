# 📚 Teoría Conceptual - Tokens en Stellar

## 📖 Mini-Glosario

Antes de comenzar, estos términos clave te ayudarán a seguir el ritmo:

- **Fungible:** Tokens idénticos e intercambiables entre sí, como dinero (un billete de $10 vale igual que otro)
- **TTL (Time To Live):** Tiempo de vida de los datos almacenados en la blockchain de Stellar antes de que expiren
- **Allowance:** Permiso que le das a otra cuenta para que gaste tus tokens en tu nombre
- **Reentrancy:** Vulnerabilidad donde una función puede ser llamada recursivamente antes de terminar su ejecución anterior
- **Mint:** Crear nuevos tokens de la nada, aumentando el supply total
- **Burn:** Destruir tokens permanentemente, reduciendo el supply total

---

## 🪙 ¿Qué es un Token?

Un token es una **representación digital de valor** que vive en la blockchain. Es como tener dinero digital programable que puede representar cualquier cosa de valor.

### Ejemplos del Mundo Real

- **🎮 Créditos de videojuegos:** Como V-Bucks en Fortnite
- **✈️ Millas aéreas:** Puntos de fidelidad digitalizados
- **💵 Stablecoins:** USDC, USDT (representan dólares)
- **🏢 Acciones tokenizadas:** Propiedad fraccionada de empresas
- **🎟️ Tickets de eventos:** NFTs de entrada
- **🌳 Créditos de carbono:** Activos ambientales

---

## 📜 Estándar CAP-46: El Blueprint de Stellar

**CAP-46 (Core Advancement Proposal 46) es el estándar de Stellar para tokens fungibles, similar a ERC-20 en Ethereum, pero optimizado para la velocidad y costos bajos de Stellar.**

### ¿Por qué necesitamos estándares?

```
Sin Estándar                    Con Estándar (CAP-46)
─────────────                    ─────────────────────
Wallet A → Token X ❌            Wallet A → Token X ✅
Wallet B → Token X ❌            Wallet B → Token X ✅
DEX → Token X ❌                 DEX → Token X ✅
```

**Beneficio clave:** Una vez que implementas CAP-46, tu token automáticamente funciona con wallets como Freighter, DEXs como StellarX, y cualquier aplicación del ecosistema Stellar.

### Casos de Uso de CAP-46 en el Ecosistema Stellar

1. **Integración con DEXs:** Tokens CAP-46 se listan automáticamente en StellarX y otros exchanges descentralizados
2. **Pagos transfronterizos:** Stablecoins como USDC en Stellar usan este estándar para transferencias rápidas y baratas
3. **Programas de lealtad:** Empresas tokenizando puntos de recompensa que usuarios pueden intercambiar
4. **Remesas:** Envío de dinero internacional con comisiones casi nulas

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

---

## 🔄 ERC-20 vs Stellar Tokens: La Gran Comparación

### Arquitectura Fundamental

| Característica | ERC-20 (Ethereum) | Stellar (Soroban) |
|---------------|-------------------|-------------------|
| **Modelo de Gas** | Dinámico (subastas) | Fijo (predecible) |
| **Lenguaje** | Solidity | Rust |
| **Seguridad** | require/assert | Result<T, Error> |
| **Storage** | Mapping infinito | TTL management |
| **Decimales** | Configurable, típicamente 18 | Configurable, típicamente 7 (alineado con XLM) |
| **Upgrades** | Proxy patterns | Nativo |

### Ejemplo de Costo Real

```
Transferencia de Token:
━━━━━━━━━━━━━━━━━━━━━
Ethereum: $5 - $50 (variable)
Stellar:  $0.00001 (fijo)

Diferencia: 500,000x más barato
```

---

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

---

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

---

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

### ⚠️ Ejemplo: ¿Qué pasa si no extiendes TTL?

```rust
// ❌ Error si TTL expira
let balance = env.storage().persistent().get(&DataKey::Balance(user))
    .ok_or(TokenError::DataExpired)?; 
    // ^ Esto fallará si pasaron 30 días sin extender TTL

// ✅ Siempre extender al leer datos críticos
let balance = env.storage().persistent().get(&DataKey::Balance(user))
    .ok_or(TokenError::DataExpired)?;

env.storage().persistent().extend_ttl(
    &DataKey::Balance(user),
    100_000,
    200_000
);
```

**Consecuencia:** Si intentas acceder a un balance cuyo TTL expiró, el contrato no podrá leer los datos y las transacciones fallarán. Es como si el balance desapareciera de la blockchain.

---

## 📊 Eventos: La Caja Negra del Blockchain

Los eventos son críticos para:
- 📱 Actualizar interfaces de usuario en tiempo real
- 📈 Analytics y monitoreo
- 🔍 Auditoría y compliance
- 🔄 Sincronización con sistemas externos

### ¿Cómo consumen eventos las UIs?

**Ejemplo práctico:** Una wallet como **Freighter** escucha el evento `transfer` para actualizar el saldo en la UI sin necesidad de consultar el contrato directamente. Cuando haces una transferencia:

1. El contrato emite evento: `transfer(from, to, amount)`
2. Freighter detecta el evento en tiempo real
3. La UI actualiza el balance instantáneamente
4. Usuario ve el cambio sin refrescar la página

### Evento Rico vs Básico

```rust
// ❌ Evento básico - información limitada
env.events().publish(
    (Symbol::new(&env, "transfer"),),
    amount
);

// ✅ Evento rico - información completa
env.events().publish(
    (Symbol::new(&env, "transfer"), from, to),
    (amount, new_from_balance, new_to_balance)
);
```

**Por qué eventos ricos:** Permiten que las UIs muestren más contexto (ej: "Enviaste 100 USDC a Alice. Tu nuevo balance: 400 USDC").

---

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

**Trade-off:** 
- **UX:** Permitir transferencias a uno mismo mejora la experiencia para wallets que no validan el destinatario antes de enviar
- **Eficiencia:** Prohibirlas ahorra gas al evitar operaciones innecesarias

### 2. Burn Mechanism

```rust
// Opción A: Reduce supply (deflacionario)
total_supply = total_supply - burn_amount;

// Opción B: Solo reduce balance
balance = 0; // Supply permanece igual
```

**Trade-off:** 
- **Política monetaria:** Reducir el supply hace el token deflacionario (puede aumentar valor con el tiempo)
- **Transparencia:** Mantener supply constante es más simple para auditoría

### 3. Decimales

```rust
// Opción A: 18 decimales (compatibilidad Ethereum)
decimals = 18;

// Opción B: 7 decimales (estándar Stellar)
decimals = 7;
```

**Trade-off:**
- **Compatibilidad:** 18 decimales facilita bridges con Ethereum
- **Eficiencia:** 7 decimales se alinea con XLM y reduce tamaño de transacciones en Stellar

---

## 🌟 Mejores Prácticas

1. **Siempre validar autorización** con `require_auth()`
2. **Usar Result<T, Error> en lugar de panic!** para errores manejables
3. **Emitir eventos ricos con contexto** para mejor experiencia de usuario
4. **Extender TTL en operaciones críticas** para evitar pérdida de datos
5. **Testear casos edge, no solo happy path**
6. **Documentar decisiones de diseño** en comentarios del código

---

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
    let admin: Address = env.storage().instance()
        .get(&DataKey::Admin)
        .unwrap();
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

## 🔗 Conexión con la Próxima Clase

Ahora que entiendes cómo funciona un token en Stellar a nivel conceptual y de seguridad, en la **Clase 6 (Frontend Integration)** aprenderás a integrarlo con una UI en React para que los usuarios puedan interactuar con tu token desde una wallet como Freighter. ¡Verás cómo todo este código cobra vida en una aplicación real!

---

## 📚 Referencias

- [CAP-46 Specification](https://stellar.org/protocol/cap-46)
- [Soroban Token Interface](https://developers.stellar.org/docs/tokens/token-interface)
- [Soroban Security Best Practices](https://developers.stellar.org/docs/build/smart-contracts/security)
- [State Archival & TTL](https://developers.stellar.org/docs/learn/smart-contract-internals/state-archival)

---

*"Entender la teoría es el 50%, implementarla correctamente es el otro 50%" 🦈*