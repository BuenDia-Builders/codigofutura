// src/test.rs
#![cfg(test)]

use super::*;
use soroban_sdk::{
    testutils::Address as _,
    Address, Env, String,
};

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
    let contract_id = env.register(TokenBDB, ());
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let name = String::from_str(&env, "Builder Token");
    let symbol = String::from_str(&env, "BDB");
    
    // Act: Inicializar el token
    client.initialize(&admin, &name, &symbol, &7);
    
    // Assert: Verificar que los metadatos se guardaron correctamente
    assert_eq!(client.name(), name);
    assert_eq!(client.symbol(), symbol);
    assert_eq!(client.decimals(), 7);
    assert_eq!(client.total_supply(), 0);
}

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
    let contract_id = env.register(TokenBDB, ());
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let user = Address::generate(&env);
    
    // Initialize el token
    client.initialize(
        &admin, 
        &String::from_str(&env, "Builder Token"),
        &String::from_str(&env, "BDB"),
        &7
    );
    
    // Mock auth: En tests, simulamos autorizaciones sin firmas reales
    env.mock_all_auths();
    
    // Mintear 1000 tokens
    client.mint(&user, &1000);
    
    // Verificar estado actualizado
    assert_eq!(client.balance(&user), 1000);
    assert_eq!(client.total_supply(), 1000);
}

/// Test básico de transferencia entre dos usuarios
/// 
/// Verifica el flujo completo de transfer:
/// 1. Alice tiene 1000 tokens
/// 2. Alice transfiere 250 tokens a Bob
/// 3. Ambos balances se actualizan correctamente
#[test]
fn test_transfer() {
    let env = Env::default();
    let contract_id = env.register(TokenBDB, ());
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
    );
    
    env.mock_all_auths();
    client.mint(&alice, &1000);
    
    // Act: Alice transfiere a Bob
    client.transfer(&alice, &bob, &250);
    
    // Assert: Verificar ambos balances
    assert_eq!(client.balance(&alice), 750);  // 1000 - 250
    assert_eq!(client.balance(&bob), 250);
}

/// Test: inicialización con name vacío debe fallar
/// 
/// Verifica que el contrato rechaza inicializaciones con name vacío
/// para prevenir tokens sin identidad.
#[test]
fn test_initialize_empty_name_fails() {
    let env = Env::default();
    let contract_id = env.register(TokenBDB, ());
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let empty_name = String::from_str(&env, "");  // ❌ Name vacío
    let symbol = String::from_str(&env, "BDB");
    
    // Intentar inicializar con name vacío debe fallar
    let result = client.try_initialize(&admin, &empty_name, &symbol, &7);
    assert_eq!(result, Err(Ok(TokenError::InvalidMetadata)));
}

/// Test: inicialización con symbol vacío debe fallar
/// 
/// Verifica que el contrato rechaza inicializaciones con symbol vacío
/// para prevenir tokens sin símbolo identificable.
#[test]
fn test_initialize_empty_symbol_fails() {
    let env = Env::default();
    let contract_id = env.register(TokenBDB, ());
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let name = String::from_str(&env, "Builder Token");
    let empty_symbol = String::from_str(&env, "");  // ❌ Symbol vacío
    
    // Intentar inicializar con symbol vacío debe fallar
    let result = client.try_initialize(&admin, &name, &empty_symbol, &7);
    assert_eq!(result, Err(Ok(TokenError::InvalidMetadata)));
}
