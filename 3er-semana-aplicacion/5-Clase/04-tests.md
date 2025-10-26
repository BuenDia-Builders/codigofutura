# 🧪 Tests Unitarios Completos - Token BDB

## Introducción

Este documento contiene los **tests esenciales** para el Token BDB. La suite completa incluye 33+ tests, pero en este documento mostramos los más importantes con explicaciones detalladas.

Además de los tests mostrados se puede investigar:

- **Tests de eventos** para cada operación (initialize, mint, burn, transfer, approve, transfer_from)
- **Tests de overflow** para detectar desbordamientos aritméticos
- **Tests de cantidad negativa** en mint, transfer, y burn
- **Tests de metadata** antes y después de inicializar
- **Tests de revocación** de allowances (approve con amount = 0)
- **Tests de atomicidad** en transfer_from (verificar que balance, allowance se actualizan juntos)
- **Tests de múltiples usuarios** con secuencias complejas de transferencias
- **Tests de consistencia** entre suma de balances y total_supply

---

## Tests Esenciales

### Imports y Setup

```rust
// src/test.rs
#![cfg(test)]

use super::*;
use soroban_sdk::{
    testutils::{Address as _, Events},
    Address, Env, String, symbol_short,
};
```

---

## 1️⃣ Tests de Inicialización

### Test Básico de Initialize

```rust
/// Test básico de inicialización del token
/// 
/// Verifica que:
/// - El contrato se inicializa correctamente con metadatos válidos
/// - Los metadatos se pueden leer después de la inicialización
/// - El supply inicial es 0
#[test]
fn test_initialize() {
    // Arrange: Setup del entorno de testing
    let env = Env::default();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let name = String::from_str(&env, "Builder Token");
    let symbol = String::from_str(&env, "BDB");
    
    // Act: Inicializar el token
    let result = client.initialize(&admin, &name, &symbol, &7);
    assert!(result.is_ok());
    
    // Assert: Verificar que los metadatos se guardaron correctamente
    assert_eq!(client.name(), name);
    assert_eq!(client.symbol(), symbol);
    assert_eq!(client.decimals(), 7);
    assert_eq!(client.total_supply(), 0);
}
```

**💡 Explicación:**
- Usamos el patrón **Arrange-Act-Assert** (AAA) para estructura clara
- `env.register_contract(None, TokenBDB)` registra el contrato para testing
- `Address::generate(&env)` crea addresses aleatorias para tests
- Verificamos que cada metadato se guardó correctamente

---

### Test de Protección contra Doble Inicialización

```rust
/// Test de protección contra doble inicialización
/// 
/// Verifica que el contrato no puede ser inicializado dos veces,
/// lo cual es crítico para la seguridad del token.
#[test]
fn test_initialize_twice_fails() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let name = String::from_str(&env, "Token");
    let symbol = String::from_str(&env, "TOK");
    
    // Primera inicialización debe funcionar
    assert!(client.initialize(&admin, &name, &symbol, &7).is_ok());
    
    // Segunda debe fallar con AlreadyInitialized
    let result = client.try_initialize(&admin, &name, &symbol, &7);
    assert_eq!(result, Err(Ok(TokenError::AlreadyInitialized)));
}
```

**💡 Explicación:**
- `try_initialize` captura el error sin hacer panic
- Verificamos que el error es exactamente `AlreadyInitialized`
- Este test previene vulnerabilidades de re-inicialización

---

### Test de Validación de Decimales

```rust
/// Test de validación de decimales
/// 
/// Los decimales deben estar en el rango 0-18.
/// 18 es el máximo para compatibilidad con Ethereum,
/// 7 es el estándar en Stellar (alineado con XLM).
#[test]
fn test_invalid_decimals() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    
    // Decimales > 18 debe fallar
    let result = client.try_initialize(
        &admin,
        &String::from_str(&env, "Token"),
        &String::from_str(&env, "TOK"),
        &19  // ❌ Inválido: excede MAX_DECIMALS (18)
    );
    assert_eq!(result, Err(Ok(TokenError::InvalidDecimals)));
}
```

**💡 Explicación:**
- MAX_DECIMALS = 18 (compatibilidad Ethereum)
- Stellar usa típicamente 7 decimales
- Este test valida que rechazamos valores fuera de rango

---

## 2️⃣ Tests de Mint

### Test Básico de Mint y Balance

```rust
/// Test básico de mint y consulta de balance
/// 
/// Verifica el flujo completo:
/// 1. Initialize del token
/// 2. Mint de tokens a un usuario
/// 3. Consulta de balance
/// 4. Verificación de total supply
#[test]
fn test_mint_and_balance() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let user = Address::generate(&env);
    
    // Initialize el token
    client.initialize(
        &admin, 
        &String::from_str(&env, "Builder Token"),
        &String::from_str(&env, "BDB"),
        &7
    ).unwrap();
    
    // Mock auth: En tests, simulamos autorizaciones sin firmas reales
    env.mock_all_auths();
    
    // Mintear 1000 tokens
    client.mint(&user, &1000).unwrap();
    
    // Verificar estado actualizado
    assert_eq!(client.balance(&user), 1000);
    assert_eq!(client.total_supply(), 1000);
}
```

**💡 Explicación:**
- `env.mock_all_auths()` simula autorizaciones para simplificar tests
- En producción, se requiere firma real del admin
- Verificamos tanto balance individual como supply total

---

### Test de Mint con Amount = 0

```rust
/// Test: mint con amount = 0 debe fallar
/// 
/// Mintear 0 tokens no tiene sentido y podría
/// causar eventos innecesarios o confusión.
#[test]
fn test_mint_zero_fails() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let user = Address::generate(&env);
    
    client.initialize(
        &admin,
        &String::from_str(&env, "Token"),
        &String::from_str(&env, "TOK"),
        &7
    ).unwrap();
    
    env.mock_all_auths();
    
    // Mintear 0 debe fallar con InvalidAmount
    let result = client.try_mint(&user, &0);
    assert_eq!(result, Err(Ok(TokenError::InvalidAmount)));
}
```

**💡 Explicación:**
- Este es un "edge case" importante
- Previene operaciones sin sentido
- El contrato debe validar amount > 0

---

## 3️⃣ Tests de Transfer

### Test Básico de Transfer

```rust
/// Test básico de transferencia entre dos usuarios
/// 
/// Verifica el flujo completo de transfer:
/// 1. Alice tiene 1000 tokens
/// 2. Alice transfiere 250 tokens a Bob
/// 3. Ambos balances se actualizan correctamente
#[test]
fn test_transfer() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let alice = Address::generate(&env);
    let bob = Address::generate(&env);
    
    // Setup: Initialize y dar tokens a Alice
    client.initialize(
        &admin,
        &String::from_str(&env, "Builder Token"),
        &String::from_str(&env, "BDB"),
        &7
    ).unwrap();
    
    env.mock_all_auths();
    client.mint(&alice, &1000).unwrap();
    
    // Act: Alice transfiere a Bob
    client.transfer(&alice, &bob, &250).unwrap();
    
    // Assert: Verificar ambos balances
    assert_eq!(client.balance(&alice), 750);  // 1000 - 250
    assert_eq!(client.balance(&bob), 250);
}
```

**💡 Explicación:**
- Transfer actualiza dos balances simultáneamente
- Verificamos que la suma de tokens se conserva
- Este es el test más importante del token

---

### Test de Balance Insuficiente

```rust
/// Test: transfer con balance insuficiente debe fallar
/// 
/// No puedes transferir más tokens de los que tienes.
/// Este es uno de los errores más comunes en tokens.
#[test]
fn test_transfer_insufficient_balance() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let alice = Address::generate(&env);
    let bob = Address::generate(&env);
    
    client.initialize(
        &admin,
        &String::from_str(&env, "Token"),
        &String::from_str(&env, "TOK"),
        &7
    ).unwrap();
    
    env.mock_all_auths();
    client.mint(&alice, &100).unwrap();
    
    // Intentar transferir más de lo que tiene debe fallar
    let result = client.try_transfer(&alice, &bob, &200);
    assert_eq!(result, Err(Ok(TokenError::InsufficientBalance)));
}
```

**💡 Explicación:**
- Este test previene uno de los bugs más comunes
- El contrato debe validar `balance >= amount` antes de transferir
- El error debe ser específico: `InsufficientBalance`

---

### Test de Transfer a Sí Mismo

```rust
/// Test: transfer a sí mismo debe fallar
/// 
/// Decisión de diseño: prohibimos transferencias a sí mismo por:
/// - Ahorro de gas (operación inútil)
/// - Evitar eventos confusos
/// - Prevenir errores del usuario
#[test]
fn test_transfer_to_self() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let alice = Address::generate(&env);
    
    client.initialize(
        &admin,
        &String::from_str(&env, "Token"),
        &String::from_str(&env, "TOK"),
        &7
    ).unwrap();
    
    env.mock_all_auths();
    client.mint(&alice, &1000).unwrap();
    
    // Transfer a sí mismo debe fallar con InvalidRecipient
    let result = client.try_transfer(&alice, &alice, &100);
    assert_eq!(result, Err(Ok(TokenError::InvalidRecipient)));
    assert_eq!(client.balance(&alice), 1000); // Balance no debe cambiar
}
```

**💡 Explicación:**
- Esta es una **decisión de diseño** (no todos los tokens la implementan)
- Razones: ahorro de gas, evitar confusión, prevenir errores
- Alternativa válida: permitirlo como no-op (return Ok sin hacer nada)

---

## 4️⃣ Tests de Approve y Transfer From

### Test del Flujo Completo Approve + Transfer From

```rust
/// Test del flujo completo de approve + transfer_from
/// 
/// Este es el patrón "allowance" usado en DeFi:
/// 1. Alice aprueba a Bob para gastar hasta 300 tokens
/// 2. Bob usa transfer_from para mover 200 tokens de Alice a Charlie
/// 3. El allowance se reduce automáticamente a 100
#[test]
fn test_approve_and_transfer_from() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let alice = Address::generate(&env);
    let bob = Address::generate(&env);
    let charlie = Address::generate(&env);
    
    // Setup
    client.initialize(
        &admin,
        &String::from_str(&env, "Token"),
        &String::from_str(&env, "TOK"),
        &7
    ).unwrap();
    
    env.mock_all_auths();
    client.mint(&alice, &1000).unwrap();
    
    // Alice aprueba a Bob para gastar hasta 300 tokens
    client.approve(&alice, &bob, &300).unwrap();
    assert_eq!(client.allowance(&alice, &bob), 300);
    
    // Bob transfiere 200 tokens de Alice a Charlie
    client.transfer_from(&bob, &alice, &charlie, &200).unwrap();
    
    // Verificar estado final
    assert_eq!(client.balance(&alice), 800);          // 1000 - 200
    assert_eq!(client.balance(&charlie), 200);        // 0 + 200
    assert_eq!(client.allowance(&alice, &bob), 100);  // 300 - 200
}
```

**💡 Explicación:**
- Este es el patrón usado por DEXs y protocolos DeFi
- **Approve** da permiso, **transfer_from** lo ejecuta
- El allowance se reduce automáticamente
- Bob necesita autorización, Alice no (ya dio approve)

---

### Test de Allowance Insuficiente

```rust
/// Test: transfer_from con allowance insuficiente debe fallar
/// 
/// Bob solo puede gastar hasta el límite aprobado por Alice.
#[test]
fn test_transfer_from_insufficient_allowance() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let alice = Address::generate(&env);
    let bob = Address::generate(&env);
    let charlie = Address::generate(&env);
    
    client.initialize(
        &admin,
        &String::from_str(&env, "Token"),
        &String::from_str(&env, "TOK"),
        &7
    ).unwrap();
    
    env.mock_all_auths();
    client.mint(&alice, &1000).unwrap();
    client.approve(&alice, &bob, &100).unwrap();  // Solo 100 aprobados
    
    // Bob intenta transferir más de lo aprobado
    let result = client.try_transfer_from(&bob, &alice, &charlie, &200);
    assert_eq!(result, Err(Ok(TokenError::InsufficientAllowance)));
}
```

**💡 Explicación:**
- Este test verifica que el sistema de allowances funciona
- Bob no puede exceder el límite aprobado por Alice
- Error específico: `InsufficientAllowance` (no `InsufficientBalance`)

---

## 5️⃣ Tests de Burn

### Test Básico de Burn

```rust
/// Test básico de burn (quemar tokens)
/// 
/// Burn reduce tanto el balance del usuario como el supply total.
/// Es usado para reducir supply (deflación), fees, etc.
#[test]
fn test_burn() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let alice = Address::generate(&env);
    
    client.initialize(
        &admin,
        &String::from_str(&env, "Token"),
        &String::from_str(&env, "TOK"),
        &7
    ).unwrap();
    
    env.mock_all_auths();
    client.mint(&alice, &1000).unwrap();
    
    // Alice quema 300 de sus tokens
    client.burn(&alice, &300).unwrap();
    
    // Verificar que tanto balance como supply se redujeron
    assert_eq!(client.balance(&alice), 700);    // 1000 - 300
    assert_eq!(client.total_supply(), 700);     // 1000 - 300
}
```

**💡 Explicación:**
- Burn es el proceso inverso a mint
- Reduce **tanto balance como supply total**
- Usado para: deflación, quemar fees, eliminar tokens

---

## 6️⃣ Test de Operaciones sin Inicializar

```rust
/// Test: todas las operaciones deben fallar si no se inicializó
/// 
/// Verifica que el flag de inicialización se verifica en
/// TODAS las funciones que modifican estado.
#[test]
fn test_operations_without_init() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let alice = Address::generate(&env);
    let bob = Address::generate(&env);
    
    env.mock_all_auths();
    
    // Todas las operaciones deben fallar con NotInitialized
    assert_eq!(
        client.try_mint(&alice, &100),
        Err(Ok(TokenError::NotInitialized))
    );
    
    assert_eq!(
        client.try_transfer(&alice, &bob, &50),
        Err(Ok(TokenError::NotInitialized))
    );
    
    assert_eq!(
        client.try_burn(&alice, &10),
        Err(Ok(TokenError::NotInitialized))
    );
}
```

**💡 Explicación:**
- Este test verifica que **todas** las funciones verifican inicialización
- Previene uso del contrato antes de setup completo
- Cada función debe fallar con el mismo error: `NotInitialized`

---

## Ejecutar los Tests

### Comandos Básicos

```powershell
# Ejecutar todos los tests
cargo test

# Ver output detallado
cargo test -- --nocapture

# Test específico
cargo test test_transfer

# Tests en modo release (más rápido)
cargo test --release
```

### Cobertura de Tests

```powershell
# Instalar cargo-tarpaulin (una sola vez)
cargo install cargo-tarpaulin

# Generar reporte de cobertura
cargo tarpaulin --out Html

# Abrir reporte en Windows
start tarpaulin-report.html
```

---

## 📊 Resumen de Tests

### Tests Mostrados en este Documento (Esenciales)

| Categoría | Tests | Descripción |
|-----------|-------|-------------|
| **Inicialización** | 3 | Setup, doble init, decimales inválidos |
| **Mint** | 2 | Mint básico, amount = 0 |
| **Transfer** | 3 | Transfer básico, balance insuficiente, a sí mismo |
| **Approve/TransferFrom** | 2 | Flujo completo, allowance insuficiente |
| **Burn** | 1 | Burn básico |
| **Sin Inicializar** | 1 | Operaciones antes de init |

**Total Mostrados: 12 tests esenciales**

### Tests Adicionales Recomendados (No Mostrados)

- ✅ 6 tests de eventos (uno por cada operación)
- ✅ 3 tests de overflow/underflow
- ✅ 2 tests de cantidades negativas
- ✅ 3 tests de validación de metadata
- ✅ 2 tests de atomicidad
- ✅ 5 tests avanzados de múltiples usuarios

**Total Recomendado: 33+ tests para cobertura completa**

---

## 🎯 Patrones de Testing Usados

### 1. Arrange-Act-Assert (AAA)
```
Arrange: Setup del entorno y datos
Act: Ejecutar la operación a testear
Assert: Verificar el resultado esperado
```

### 2. Test de Errores con try_*
```rust
let result = client.try_mint(&user, &0);
assert_eq!(result, Err(Ok(TokenError::InvalidAmount)));
```

### 3. Mock de Autenticación
```rust
env.mock_all_auths();  // Simula firmas sin cryptografía
```

---

## ✅ Checklist de Testing

Antes de considerar los tests completos:

- [ ] ✅ Tests de happy path (flujos normales)
- [ ] ✅ Tests de edge cases (0, negativos, máximos)
- [ ] ✅ Tests de errores esperados
- [ ] ✅ Tests de eventos (CAP-46 obligatorio)
- [ ] ✅ Tests sin inicializar
- [ ] ✅ Todos los tests pasan: `cargo test`
- [ ] ✅ Cobertura > 90%: `cargo tarpaulin`

---

## 📚 Referencias

- [Soroban Testing Guide](https://developers.stellar.org/docs/build/guides/testing)
- [CAP-46 Token Standard](https://stellar.org/protocol/cap-46)
- [Soroban SDK testutils](https://docs.rs/soroban-sdk/latest/soroban_sdk/testutils/)

---

*Suite de tests esenciales para garantizar un token robusto y seguro 🦈*