// src/lib.rs
#![no_std]

use soroban_sdk::{
    contract, contractimpl, contractevent, Address, Env, String
};

mod storage;
mod errors;

#[cfg(test)]
mod test;

use storage::DataKey;
use errors::TokenError;

/// Constantes de configuración
const MAX_DECIMALS: u32 = 18;
const MAX_NAME_LENGTH: u32 = 100;
const MAX_SYMBOL_LENGTH: u32 = 32;

/// Eventos del contrato usando la nueva sintaxis #[contractevent]
#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct InitializeEvent {
    pub admin: Address,
    pub name: String,
    pub symbol: String,
    pub decimals: u32,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct MintEvent {
    pub to: Address,
    pub amount: i128,
    pub new_balance: i128,
    pub new_total_supply: i128,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct BurnEvent {
    pub from: Address,
    pub amount: i128,
    pub new_balance: i128,
    pub new_total_supply: i128,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct TransferEvent {
    pub from: Address,
    pub to: Address,
    pub amount: i128,
    pub new_from_balance: i128,
    pub new_to_balance: i128,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ApproveEvent {
    pub from: Address,
    pub spender: Address,
    pub old_allowance: i128,
    pub new_allowance: i128,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct TransferFromEvent {
    pub spender: Address,
    pub from: Address,
    pub to: Address,
    pub amount: i128,
    pub new_from_balance: i128,
    pub new_to_balance: i128,
    pub new_allowance: i128,
}

/// Trait que define la interfaz del token según CAP-46
/// 
/// Esta es la interfaz estándar de tokens fungibles en Stellar
/// Compatible con wallets, DEXs, y el ecosistema completo
pub trait TokenTrait {
    /// Inicializa el token con metadatos y admin
    fn initialize(
        env: Env, 
        admin: Address, 
        name: String, 
        symbol: String,
        decimals: u32
    ) -> Result<(), TokenError>;
    
    /// Crea nuevos tokens (solo admin)
    fn mint(env: Env, to: Address, amount: i128) -> Result<(), TokenError>;
    
    /// Destruye tokens reduciendo el supply
    fn burn(env: Env, from: Address, amount: i128) -> Result<(), TokenError>;
    
    /// Consulta el balance de una cuenta
    fn balance(env: Env, account: Address) -> i128;
    
    /// Transfiere tokens entre cuentas
    fn transfer(
        env: Env, 
        from: Address, 
        to: Address, 
        amount: i128
    ) -> Result<(), TokenError>;
    
    /// Aprueba a otro usuario para gastar tokens
    fn approve(
        env: Env, 
        from: Address, 
        spender: Address, 
        amount: i128
    ) -> Result<(), TokenError>;
    
    /// Consulta el allowance entre dos cuentas
    fn allowance(env: Env, from: Address, spender: Address) -> i128;
    
    /// Transfiere tokens en nombre de otro usuario
    fn transfer_from(
        env: Env, 
        spender: Address, 
        from: Address, 
        to: Address, 
        amount: i128
    ) -> Result<(), TokenError>;
    
    // Métodos de consulta (getters)
    fn name(env: Env) -> String;
    fn symbol(env: Env) -> String;
    fn decimals(env: Env) -> u32;
    fn total_supply(env: Env) -> i128;
    fn admin(env: Env) -> Address;
}

/// Estructura del contrato Token BDB
#[contract]
pub struct TokenBDB;

/// Implementación del contrato
#[contractimpl]
impl TokenTrait for TokenBDB {
    fn initialize(
        env: Env, 
        admin: Address, 
        name: String, 
        symbol: String,
        decimals: u32
    ) -> Result<(), TokenError> {
        // 1. Verificar que no esté inicializado
        if env.storage().instance().has(&DataKey::Initialized) {
            return Err(TokenError::AlreadyInitialized);
        }
        
        // 2. Validar decimales (máximo 18 como Ethereum)
        if decimals > MAX_DECIMALS {
            return Err(TokenError::InvalidDecimals);
        }
        
        // 3. Validar metadatos (name y symbol no vacíos)
        if name.len() == 0 || name.len() > MAX_NAME_LENGTH {
            return Err(TokenError::InvalidMetadata);
        }
        
        if symbol.len() == 0 || symbol.len() > MAX_SYMBOL_LENGTH {
            return Err(TokenError::InvalidMetadata);
        }
        
        // 4. Guardar metadata en instance storage
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::TokenName, &name);
        env.storage().instance().set(&DataKey::TokenSymbol, &symbol);
        env.storage().instance().set(&DataKey::Decimals, &decimals);
        env.storage().instance().set(&DataKey::TotalSupply, &0i128);
        env.storage().instance().set(&DataKey::Initialized, &true);
        
        // 5. Extender TTL del storage de instance (30 días)
        env.storage().instance().extend_ttl(100_000, 200_000);
        
            // 6. Emitir evento rico con todos los metadatos
            InitializeEvent {
                admin: admin.clone(),
                name: name.clone(),
                symbol: symbol.clone(),
                decimals,
            }.publish(&env);
        
        Ok(())
    }
    
    fn mint(env: Env, to: Address, amount: i128) -> Result<(), TokenError> {
        // 1. Verificar inicialización
        if !env.storage().instance().has(&DataKey::Initialized) {
            return Err(TokenError::NotInitialized);
        }
        
        // 2. Solo el admin puede mintear
        let admin: Address = env.storage().instance()
            .get(&DataKey::Admin)
            .ok_or(TokenError::NotInitialized)?;
        admin.require_auth();
        
        // 3. Validaciones
        if amount <= 0 {
            return Err(TokenError::InvalidAmount);
        }
        
        // 4. Obtener balance actual y verificar overflow
        let balance = Self::balance(env.clone(), to.clone());
        let new_balance = balance.checked_add(amount)
            .ok_or(TokenError::OverflowError)?;
        
        // 5. Actualizar balance con TTL extendido
        env.storage().persistent().set(
            &DataKey::Balance(to.clone()), 
            &new_balance
        );
        env.storage().persistent().extend_ttl(
            &DataKey::Balance(to.clone()),
            100_000,
            200_000
        );
        
        // 6. Actualizar total supply
        let total: i128 = env.storage().instance()
            .get(&DataKey::TotalSupply)
            .unwrap_or(0);
        let new_total = total.checked_add(amount)
            .ok_or(TokenError::OverflowError)?;
        env.storage().instance().set(
            &DataKey::TotalSupply, 
            &new_total
        );
        
            // 7. Emitir evento detallado
            MintEvent {
                to: to.clone(),
                amount,
                new_balance,
                new_total_supply: new_total,
            }.publish(&env);
        
        Ok(())
    }
    
    fn burn(env: Env, from: Address, amount: i128) -> Result<(), TokenError> {
        // 1. Verificar inicialización
        if !env.storage().instance().has(&DataKey::Initialized) {
            return Err(TokenError::NotInitialized);
        }
        
        // 2. Requiere autorización del dueño de los tokens
        from.require_auth();
        
        // 3. Validaciones
        if amount <= 0 {
            return Err(TokenError::InvalidAmount);
        }
        
        let balance = Self::balance(env.clone(), from.clone());
        if balance < amount {
            return Err(TokenError::InsufficientBalance);
        }
        
        // 4. Actualizar balance
        let new_balance = balance - amount;
        if new_balance == 0 {
            // Optimización: eliminar key si balance = 0
            env.storage().persistent().remove(&DataKey::Balance(from.clone()));
        } else {
            env.storage().persistent().set(
                &DataKey::Balance(from.clone()),
                &new_balance
            );
            env.storage().persistent().extend_ttl(
                &DataKey::Balance(from.clone()),
                100_000,
                200_000
            );
        }
        
        // 5. Actualizar total supply
        let total: i128 = env.storage().instance()
            .get(&DataKey::TotalSupply)
            .unwrap_or(0);
        let new_total = total.checked_sub(amount)
            .ok_or(TokenError::OverflowError)?;
        env.storage().instance().set(
            &DataKey::TotalSupply,
            &new_total
        );
        
            // 6. Emitir evento
            BurnEvent {
                from: from.clone(),
                amount,
                new_balance,
                new_total_supply: new_total,
            }.publish(&env);
        
        Ok(())
    }
    
    fn balance(env: Env, account: Address) -> i128 {
        env.storage().persistent()
            .get(&DataKey::Balance(account))
            .unwrap_or(0)
    }
    
    fn transfer(
        env: Env, 
        from: Address, 
        to: Address, 
        amount: i128
    ) -> Result<(), TokenError> {
        // 1. Verificar inicialización
        if !env.storage().instance().has(&DataKey::Initialized) {
            return Err(TokenError::NotInitialized);
        }
        
        // 2. Verificar autorización del sender
        from.require_auth();
        
        // 3. Validaciones
        if amount <= 0 {
            return Err(TokenError::InvalidAmount);
        }
        
        // 4. No permitir transferencia a sí mismo (gas-efficient)
        if from == to {
            return Err(TokenError::InvalidRecipient);
        }
        
        let from_balance = Self::balance(env.clone(), from.clone());
        if from_balance < amount {
            return Err(TokenError::InsufficientBalance);
        }
        
        // 5. Calcular nuevos balances con verificación de overflow
        let new_from_balance = from_balance - amount;
        let to_balance = Self::balance(env.clone(), to.clone());
        let new_to_balance = to_balance.checked_add(amount)
            .ok_or(TokenError::OverflowError)?;
        
        // 6. Actualizar balances con TTL
        // Optimización: si from_balance = 0, eliminar key
        if new_from_balance == 0 {
            env.storage().persistent().remove(&DataKey::Balance(from.clone()));
        } else {
            env.storage().persistent().set(
                &DataKey::Balance(from.clone()),
                &new_from_balance
            );
            env.storage().persistent().extend_ttl(
                &DataKey::Balance(from.clone()),
                100_000,
                200_000
            );
        }
        
        env.storage().persistent().set(
            &DataKey::Balance(to.clone()),
            &new_to_balance
        );
        env.storage().persistent().extend_ttl(
            &DataKey::Balance(to.clone()),
            100_000,
            200_000
        );
        
            // 7. Emitir evento con balances post-transferencia
            TransferEvent {
                from: from.clone(),
                to: to.clone(),
                amount,
                new_from_balance,
                new_to_balance,
            }.publish(&env);
        
        Ok(())
    }
    
    fn approve(
        env: Env, 
        from: Address, 
        spender: Address, 
        amount: i128
    ) -> Result<(), TokenError> {
        // 1. Verificar inicialización
        if !env.storage().instance().has(&DataKey::Initialized) {
            return Err(TokenError::NotInitialized);
        }
        
        // 2. Verificar autorización del owner
        from.require_auth();
        
        // 3. Validación: amount debe ser >= 0 (permitir 0 para revocar)
        if amount < 0 {
            return Err(TokenError::InvalidAmount);
        }
        
        // 4. Obtener allowance anterior para el evento
        let old_allowance = Self::allowance(env.clone(), from.clone(), spender.clone());
        
        // 5. Actualizar allowance
        if amount == 0 {
            // Optimización: eliminar key si allowance = 0
            env.storage().persistent().remove(
                &DataKey::Allowance(from.clone(), spender.clone())
            );
        } else {
            env.storage().persistent().set(
                &DataKey::Allowance(from.clone(), spender.clone()),
                &amount
            );
            env.storage().persistent().extend_ttl(
                &DataKey::Allowance(from.clone(), spender.clone()),
                100_000,
                200_000
            );
        }
        
            // 6. Evento mejorado con allowance anterior y nuevo
            ApproveEvent {
                from: from.clone(),
                spender: spender.clone(),
                old_allowance,
                new_allowance: amount,
            }.publish(&env);
        
        Ok(())
    }
    
    fn allowance(env: Env, from: Address, spender: Address) -> i128 {
        env.storage().persistent()
            .get(&DataKey::Allowance(from, spender))
            .unwrap_or(0)
    }
    
    fn transfer_from(
        env: Env, 
        spender: Address, 
        from: Address, 
        to: Address, 
        amount: i128
    ) -> Result<(), TokenError> {
        // 1. Verificar inicialización
        if !env.storage().instance().has(&DataKey::Initialized) {
            return Err(TokenError::NotInitialized);
        }
        
        // 2. Verificar autorización del spender
        spender.require_auth();
        
        // 3. Validaciones
        if amount <= 0 {
            return Err(TokenError::InvalidAmount);
        }
        
        // 4. No permitir transferencia a sí mismo
        if from == to {
            return Err(TokenError::InvalidRecipient);
        }
        
        // 5. Verificar allowance
        let allowed = Self::allowance(env.clone(), from.clone(), spender.clone());
        if allowed < amount {
            return Err(TokenError::InsufficientAllowance);
        }
        
        // 6. Verificar balance
        let from_balance = Self::balance(env.clone(), from.clone());
        if from_balance < amount {
            return Err(TokenError::InsufficientBalance);
        }
        
        // 7. Calcular nuevos valores
        let new_from_balance = from_balance - amount;
        let to_balance = Self::balance(env.clone(), to.clone());
        let new_to_balance = to_balance.checked_add(amount)
            .ok_or(TokenError::OverflowError)?;
        let new_allowance = allowed - amount;
        
        // 8. Actualizar estado atómicamente
        // Optimización: eliminar keys si son 0
        if new_from_balance == 0 {
            env.storage().persistent().remove(&DataKey::Balance(from.clone()));
        } else {
            env.storage().persistent().set(
                &DataKey::Balance(from.clone()),
                &new_from_balance
            );
            env.storage().persistent().extend_ttl(
                &DataKey::Balance(from.clone()),
                100_000,
                200_000
            );
        }
        
        env.storage().persistent().set(
            &DataKey::Balance(to.clone()),
            &new_to_balance
        );
        env.storage().persistent().extend_ttl(
            &DataKey::Balance(to.clone()),
            100_000,
            200_000
        );
        
        if new_allowance == 0 {
            env.storage().persistent().remove(
                &DataKey::Allowance(from.clone(), spender.clone())
            );
        } else {
            env.storage().persistent().set(
                &DataKey::Allowance(from.clone(), spender.clone()),
                &new_allowance
            );
            env.storage().persistent().extend_ttl(
                &DataKey::Allowance(from.clone(), spender.clone()),
                100_000,
                200_000
            );
        }
        
            // 9. Emitir evento completo
            TransferFromEvent {
                spender: spender.clone(),
                from: from.clone(),
                to: to.clone(),
                amount,
                new_from_balance,
                new_to_balance,
                new_allowance,
            }.publish(&env);
        
        Ok(())
    }
    
    // Métodos de consulta
    fn name(env: Env) -> String {
        // Verificar inicialización antes de devolver metadata
        if !env.storage().instance().has(&DataKey::Initialized) {
            return String::from_str(&env, "");
        }
        
        env.storage().instance()
            .get(&DataKey::TokenName)
            .unwrap_or(String::from_str(&env, ""))
    }
    
    fn symbol(env: Env) -> String {
        if !env.storage().instance().has(&DataKey::Initialized) {
            return String::from_str(&env, "");
        }
        
        env.storage().instance()
            .get(&DataKey::TokenSymbol)
            .unwrap_or(String::from_str(&env, ""))
    }
    
    fn decimals(env: Env) -> u32 {
        if !env.storage().instance().has(&DataKey::Initialized) {
            return 0;
        }
        
        env.storage().instance()
            .get(&DataKey::Decimals)
            .unwrap_or(0)
    }
    
    fn total_supply(env: Env) -> i128 {
        env.storage().instance()
            .get(&DataKey::TotalSupply)
            .unwrap_or(0)
    }
    
    fn admin(env: Env) -> Address {
        env.storage().instance()
            .get(&DataKey::Admin)
            .expect("Admin not initialized")
    }
}