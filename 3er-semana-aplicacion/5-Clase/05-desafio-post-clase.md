# 🏆 Desafío Post-Clase

## 🎯 Mini Desafío: "Token Analytics" (30 minutos)

### 📋 Descripción
Después de la clase, implementa una función que proporcione análisis básicos de tu token. Este desafío te ayudará a consolidar lo aprendido sin ser abrumador.

**Tiempo estimado:** 30 minutos  
**Dificultad:** ⭐⭐☆☆☆  
**Cuándo hacerlo:** En casa, después de la clase

### 🎯 Objetivo
Agregar una función `get_analytics` que retorne estadísticas básicas del token.

### 📝 Especificaciones

```rust
// Agregar en storage.rs
#[contracttype]
pub struct TokenAnalytics {
    pub total_holders: u32,      // Número de cuentas con balance > 0
    pub largest_holder: Address,  // Dirección con mayor balance
    pub average_balance: u128,    // Balance promedio (total_supply / holders)
}

// Agregar en lib.rs
fn get_analytics(env: Env) -> TokenAnalytics {
    // TODO: Implementar
    // Pista 1: Necesitarás iterar sobre los balances
    // Pista 2: Considera guardar una lista de holders en storage
    // Pista 3: Actualiza la lista en mint/transfer/burn
}
```

### 💡 Pistas de Implementación

#### Opción A: Simple (Recomendada para empezar)
```rust
// En storage.rs, agregar:
pub enum DataKey {
    // ... otros campos
    Holders,  // Vec<Address> de todos los holders
}

// Actualizar en mint/transfer/burn cuando un balance cambia:
fn update_holders_list(env: &Env, account: Address, new_balance: u128) {
    let mut holders: Vec<Address> = env.storage().instance()
        .get(&DataKey::Holders)
        .unwrap_or(Vec::new(&env));
    
    if new_balance > 0 && !holders.contains(&account) {
        holders.push_back(account);
    } else if new_balance == 0 && holders.contains(&account) {
        // Remover de la lista
        holders.retain(|h| h != &account);
    }
    
    env.storage().instance().set(&DataKey::Holders, &holders);
}
```

#### Opción B: Más Eficiente
```rust
// Mantener un contador en lugar de una lista
pub enum DataKey {
    // ... otros campos
    HolderCount,      // u32
    LargestHolder,    // Address
    LargestBalance,   // u128
}

// Actualizar contadores en cada operación
```

### 🧪 Test para tu Implementación

```rust
#[test]
fn test_analytics() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    // Setup
    let admin = Address::generate(&env);
    let alice = Address::generate(&env);
    let bob = Address::generate(&env);
    let charlie = Address::generate(&env);
    
    client.initialize(/* ... */).unwrap();
    
    env.mock_all_auths();
    
    // Distribuir tokens
    client.mint(&alice, &5000).unwrap();
    client.mint(&bob, &3000).unwrap();
    client.mint(&charlie, &2000).unwrap();
    
    // Obtener analytics
    let stats = client.get_analytics();
    
    // Verificar
    assert_eq!(stats.total_holders, 3);
    assert_eq!(stats.largest_holder, alice);
    assert_eq!(stats.average_balance, 3333); // (5000+3000+2000)/3
}
```

### ✅ Criterios de Éxito

Tu implementación está completa si:
- [ ] La función retorna los 3 valores correctamente
- [ ] Se actualiza cuando cambian los balances
- [ ] Los tests pasan
- [ ] No afecta el gas significativamente

### 🎁 Bonus (Opcional, +15 min)

Si terminas rápido, agrega:
```rust
pub struct TokenAnalytics {
    // ... campos existentes
    pub total_transactions: u64,  // Contador de todas las transfers
    pub total_minted: u128,        // Total histórico minteado
    pub total_burned: u128,        // Total histórico quemado
}
```

---

## 🚀 Desafíos Opcionales para la Semana

### 📝 Desafío 2: Balance Formateado (20 min)
**Dificultad:** ⭐⭐☆☆☆

```rust
fn balance_formatted(env: Env, account: Address) -> String {
    let balance = Self::balance(env.clone(), account);
    let decimals = Self::decimals(env.clone());
    
    // Convertir 1000000 con 6 decimales → "1.000000"
    // TODO: Implementar formato con punto decimal
}
```

### 📝 Desafío 3: Token Pausable (45 min)
**Dificultad:** ⭐⭐⭐☆☆

```rust
fn pause(env: Env) -> Result<(), TokenError>;
fn unpause(env: Env) -> Result<(), TokenError>;
fn is_paused(env: Env) -> bool;

// Modificar transfer para verificar:
if Self::is_paused(env.clone()) {
    return Err(TokenError::ContractPaused);
}
```

### 📝 Desafío 4: Max Supply (30 min)
**Dificultad:** ⭐⭐⭐☆☆

Implementar un límite máximo de supply que no se pueda exceder en `mint`.

---

## 🎯 Para la Clase 6: Scaffold Stellar

### ¿Qué es Scaffold Stellar?

[Scaffold Stellar](https://scaffoldstellar.com/) es una herramienta que proporciona:
- 🛠️ Boilerplate para dApps en Stellar
- 🎨 Componentes UI pre-construidos
- 🔧 Integración con wallets lista
- ⚡ Hot reload y desarrollo rápido

### ¿Lo usaremos en Clase 6?

**SÍ**, Scaffold Stellar será perfecto para la Clase 6 porque:

1. **Acelera el desarrollo frontend**
   - No reinventamos la rueda
   - Componentes probados y optimizados

2. **Mejores prácticas incluidas**
   - Manejo de errores
   - Loading states
   - Wallet connection

3. **Compatible con nuestro token**
   - Soporta contratos custom
   - Fácil integración

### Preparación para Clase 6

En la Clase 6 comenzaremos con JavaScript/TypeScript para el frontend:

```bash
# Para la Clase 6 (no ahora) instalaremos:
# - React
# - Stellar SDK (JavaScript)
# - Freighter Wallet
# - Scaffold Stellar

# Por ahora, solo asegúrate de que tu token funcione perfectamente en Rust
```

La Clase 5 es 100% Rust. JavaScript vendrá en la Clase 6 cuando construyamos la interfaz web.

### Preview de lo que construirás:
- 🖥️ Dashboard con balance y supply
- 💸 Interfaz para transfer
- 🔐 Approve y allowances UI
- 📊 Analytics en tiempo real
- 🎨 Diseño profesional

---

## 📊 Tiempo de Inversión Real

| Actividad | Tiempo | Prioridad |
|-----------|--------|-----------|
| Desafío Principal (Analytics) | 30 min | ⭐⭐⭐ Alta |
| Test del desafío | 10 min | ⭐⭐⭐ Alta |
| Desafío Balance Format | 20 min | ⭐⭐ Media |
| Desafío Pausable | 45 min | ⭐ Opcional |
| Preparar Scaffold | 15 min | ⭐⭐⭐ Para Clase 6 |

**Total mínimo requerido:** 40 minutos  
**Total si haces todo:** 2 horas

---

## 💡 Tips para el Desafío Principal

1. **Empieza simple**: No optimices prematuramente
2. **Test primero**: Escribe el test antes del código
3. **Incrementa gradualmente**: Primero `total_holders`, luego el resto
4. **No te preocupes por gas**: En testnet es gratis

### Errores Comunes a Evitar

```rust
// ❌ No hagas esto
let all_balances = /* obtener TODOS los balances */; // Muy costoso

// ✅ Haz esto
let holder_count = env.storage().instance()
    .get(&DataKey::HolderCount)
    .unwrap_or(0);
```

---

## 🏆 Sistema de Validación

Cuando completes el desafío, verifica:

```bash
# 1. Que compile
cargo build --target wasm32-unknown-unknown --release

# 2. Que los tests pasen
cargo test test_analytics

# 3. Que funcione en testnet
stellar contract invoke \
    --id $TOKEN_CONTRACT_ID \
    --network testnet \
    -- get_analytics
```

---

*"Un pequeño desafío después de clase consolida el aprendizaje mejor que horas de teoría" 🦈*