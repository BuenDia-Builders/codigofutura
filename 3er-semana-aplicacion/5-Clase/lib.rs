// lib.rs - Token BDB (Buen Día Builders) - Versión Corregida para SDK 23.0.2

use soroban_sdk::{
    contract, contractimpl, contracttype, contracterror, contractevent,
    Address, Env, String
};

mod storage;
mod errors;

use storage::{DataKey, MAX_NAME_LENGTH, MAX_SYMBOL_LENGTH, MAX_DECIMALS};
use errors::TokenError;

// ============================================================================
// EVENTOS - Usando el nuevo sistema con #[contractevent]
// ============================================================================

#[contractevent]
pub struct InitEvent {
    pub admin: Address,
    pub name: String,
    pub symbol: String,
    pub decimals: u32,
}

#[contractevent]
pub struct MintEvent {
    pub admin: Address,
    pub to: Address,
    pub amount: i128,
}

#[contractevent]
pub struct BurnEvent {
    pub from: Address,
    pub amount: i128,
}

#[contractevent]
pub struct TransferEvent {
    pub from: Address,
    pub to: Address,
    pub amount: i128,
}

#[contractevent]
pub struct ApproveEvent {
    pub from: Address,
    pub spender: Address,
    pub amount: i128,
    pub live_until_ledger: u32,
}

// ============================================================================
// INTERFAZ DEL TOKEN
// ============================================================================

#[contract]
pub struct TokenBDB;

pub trait TokenTrait {
    fn initialize(
        env: Env,
        admin: Address,
        name: String,
        symbol: String,
        decimals: u32,
    ) -> Result<(), TokenError>;

    fn mint(env: Env, to: Address, amount: i128) -> Result<(), TokenError>;

    fn burn(env: Env, from: Address, amount: i128) -> Result<(), TokenError>;

    fn balance(env: Env, id: Address) -> i128;

    fn transfer(
        env: Env,
        from: Address,
        to: Address,
        amount: i128,
    ) -> Result<(), TokenError>;

    fn approve(
        env: Env,
        from: Address,
        spender: Address,
        amount: i128,
        live_until_ledger: u32,
    ) -> Result<(), TokenError>;

    fn allowance(env: Env, from: Address, spender: Address) -> i128;

    fn transfer_from(
        env: Env,
        spender: Address,
        from: Address,
        to: Address,
        amount: i128,
    ) -> Result<(), TokenError>;

    fn name(env: Env) -> String;
    fn symbol(env: Env) -> String;
    fn decimals(env: Env) -> u32;
    fn total_supply(env: Env) -> i128;
    fn admin(env: Env) -> Address;
}

// ============================================================================
// IMPLEMENTACIÓN DEL TOKEN
// ============================================================================

#[contractimpl]
impl TokenTrait for TokenBDB {
    fn initialize(
        env: Env,
        admin: Address,
        name: String,
        symbol: String,
        decimals: u32,
    ) -> Result<(), TokenError> {
        // Verificar que no esté ya inicializado
        if env.storage().instance().has(&DataKey::Initialized) {
            return Err(TokenError::AlreadyInitialized);
        }

        // Validar parámetros
        if name.len() == 0 || name.len() > MAX_NAME_LENGTH {
            return Err(TokenError::InvalidMetadata);
        }
        if symbol.len() == 0 || symbol.len() > MAX_SYMBOL_LENGTH {
            return Err(TokenError::InvalidMetadata);
        }
        if decimals > MAX_DECIMALS {
            return Err(TokenError::InvalidMetadata);
        }

        // Autenticar admin
        admin.require_auth();

        // Guardar configuración
        env.storage().instance().set(&DataKey::Initialized, &true);
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::TokenName, &name);
        env.storage().instance().set(&DataKey::TokenSymbol, &symbol);
        env.storage().instance().set(&DataKey::Decimals, &decimals);
        env.storage().instance().set(&DataKey::TotalSupply, &0i128);

        // Emitir evento usando el nuevo sistema
        InitEvent {
            admin: admin.clone(),
            name: name.clone(),
            symbol: symbol.clone(),
            decimals,
        }.publish(&env);

        Ok(())
    }

    fn mint(env: Env, to: Address, amount: i128) -> Result<(), TokenError> {
        if amount <= 0 {
            return Err(TokenError::InvalidAmount);
        }

        let admin: Address = env.storage()
            .instance()
            .get(&DataKey::Admin)
            .ok_or(TokenError::NotInitialized)?;

        admin.require_auth();

        let balance_key = DataKey::Balance(to.clone());
        let current_balance: i128 = env.storage()
            .persistent()
            .get(&balance_key)
            .unwrap_or(0);

        let new_balance = current_balance
            .checked_add(amount)
            .ok_or(TokenError::Overflow)?;

        env.storage().persistent().set(&balance_key, &new_balance);
        env.storage()
            .persistent()
            .extend_ttl(&balance_key, 5184000, 6048000);

        let total_supply: i128 = env.storage()
            .instance()
            .get(&DataKey::TotalSupply)
            .unwrap_or(0);

        let new_total_supply = total_supply
            .checked_add(amount)
            .ok_or(TokenError::Overflow)?;

        env.storage()
            .instance()
            .set(&DataKey::TotalSupply, &new_total_supply);

        // Emitir evento usando el nuevo sistema
        MintEvent {
            admin: admin.clone(),
            to: to.clone(),
            amount,
        }.publish(&env);

        Ok(())
    }

    fn burn(env: Env, from: Address, amount: i128) -> Result<(), TokenError> {
        if amount <= 0 {
            return Err(TokenError::InvalidAmount);
        }

        from.require_auth();

        let balance_key = DataKey::Balance(from.clone());
        let current_balance: i128 = env.storage()
            .persistent()
            .get(&balance_key)
            .unwrap_or(0);

        if current_balance < amount {
            return Err(TokenError::InsufficientBalance);
        }

        let new_balance = current_balance - amount;

        if new_balance == 0 {
            env.storage().persistent().remove(&balance_key);
        } else {
            env.storage().persistent().set(&balance_key, &new_balance);
            env.storage()
                .persistent()
                .extend_ttl(&balance_key, 5184000, 6048000);
        }

        let total_supply: i128 = env.storage()
            .instance()
            .get(&DataKey::TotalSupply)
            .unwrap_or(0);

        let new_total_supply = total_supply
            .checked_sub(amount)
            .ok_or(TokenError::Overflow)?;

        env.storage()
            .instance()
            .set(&DataKey::TotalSupply, &new_total_supply);

        // Emitir evento usando el nuevo sistema
        BurnEvent {
            from: from.clone(),
            amount,
        }.publish(&env);

        Ok(())
    }

    fn balance(env: Env, id: Address) -> i128 {
        let balance_key = DataKey::Balance(id);
        env.storage().persistent().get(&balance_key).unwrap_or(0)
    }

    fn transfer(
        env: Env,
        from: Address,
        to: Address,
        amount: i128,
    ) -> Result<(), TokenError> {
        if amount <= 0 {
            return Err(TokenError::InvalidAmount);
        }

        if from == to {
            return Err(TokenError::SameAccount);
        }

        from.require_auth();

        let from_key = DataKey::Balance(from.clone());
        let from_balance: i128 = env.storage()
            .persistent()
            .get(&from_key)
            .unwrap_or(0);

        if from_balance < amount {
            return Err(TokenError::InsufficientBalance);
        }

        let new_from_balance = from_balance - amount;
        if new_from_balance == 0 {
            env.storage().persistent().remove(&from_key);
        } else {
            env.storage().persistent().set(&from_key, &new_from_balance);
            env.storage()
                .persistent()
                .extend_ttl(&from_key, 5184000, 6048000);
        }

        let to_key = DataKey::Balance(to.clone());
        let to_balance: i128 = env.storage()
            .persistent()
            .get(&to_key)
            .unwrap_or(0);

        let new_to_balance = to_balance
            .checked_add(amount)
            .ok_or(TokenError::Overflow)?;

        env.storage().persistent().set(&to_key, &new_to_balance);
        env.storage()
            .persistent()
            .extend_ttl(&to_key, 5184000, 6048000);

        // Emitir evento usando el nuevo sistema
        TransferEvent {
            from: from.clone(),
            to: to.clone(),
            amount,
        }.publish(&env);

        Ok(())
    }

    fn approve(
        env: Env,
        from: Address,
        spender: Address,
        amount: i128,
        live_until_ledger: u32,
    ) -> Result<(), TokenError> {
        if amount < 0 {
            return Err(TokenError::InvalidAmount);
        }

        from.require_auth();

        let allowance_key = DataKey::Allowance(from.clone(), spender.clone());

        if amount == 0 {
            env.storage().persistent().remove(&allowance_key);
        } else {
            env.storage().persistent().set(&allowance_key, &amount);
            env.storage()
                .persistent()
                .extend_ttl(&allowance_key, 5184000, 6048000);
        }

        // Emitir evento usando el nuevo sistema
        ApproveEvent {
            from: from.clone(),
            spender: spender.clone(),
            amount,
            live_until_ledger,
        }.publish(&env);

        Ok(())
    }

    fn allowance(env: Env, from: Address, spender: Address) -> i128 {
        let allowance_key = DataKey::Allowance(from, spender);
        env.storage().persistent().get(&allowance_key).unwrap_or(0)
    }

    fn transfer_from(
        env: Env,
        spender: Address,
        from: Address,
        to: Address,
        amount: i128,
    ) -> Result<(), TokenError> {
        if amount <= 0 {
            return Err(TokenError::InvalidAmount);
        }

        if from == to {
            return Err(TokenError::SameAccount);
        }

        spender.require_auth();

        let allowance_key = DataKey::Allowance(from.clone(), spender.clone());
        let current_allowance: i128 = env.storage()
            .persistent()
            .get(&allowance_key)
            .unwrap_or(0);

        if current_allowance < amount {
            return Err(TokenError::InsufficientAllowance);
        }

        let from_key = DataKey::Balance(from.clone());
        let from_balance: i128 = env.storage()
            .persistent()
            .get(&from_key)
            .unwrap_or(0);

        if from_balance < amount {
            return Err(TokenError::InsufficientBalance);
        }

        let new_from_balance = from_balance - amount;
        if new_from_balance == 0 {
            env.storage().persistent().remove(&from_key);
        } else {
            env.storage().persistent().set(&from_key, &new_from_balance);
            env.storage()
                .persistent()
                .extend_ttl(&from_key, 5184000, 6048000);
        }

        let to_key = DataKey::Balance(to.clone());
        let to_balance: i128 = env.storage()
            .persistent()
            .get(&to_key)
            .unwrap_or(0);

        let new_to_balance = to_balance
            .checked_add(amount)
            .ok_or(TokenError::Overflow)?;

        env.storage().persistent().set(&to_key, &new_to_balance);
        env.storage()
            .persistent()
            .extend_ttl(&to_key, 5184000, 6048000);

        let new_allowance = current_allowance - amount;
        if new_allowance == 0 {
            env.storage().persistent().remove(&allowance_key);
        } else {
            env.storage().persistent().set(&allowance_key, &new_allowance);
            env.storage()
                .persistent()
                .extend_ttl(&allowance_key, 5184000, 6048000);
        }

        // Emitir evento usando el nuevo sistema
        TransferEvent {
            from: from.clone(),
            to: to.clone(),
            amount,
        }.publish(&env);

        Ok(())
    }

    fn name(env: Env) -> String {
        if !env.storage().instance().has(&DataKey::Initialized) {
            return String::from_str(&env, "");
        }

        env.storage()
            .instance()
            .get(&DataKey::TokenName)
            .unwrap_or(String::from_str(&env, ""))
    }

    fn symbol(env: Env) -> String {
        if !env.storage().instance().has(&DataKey::Initialized) {
            return String::from_str(&env, "");
        }

        env.storage()
            .instance()
            .get(&DataKey::TokenSymbol)
            .unwrap_or(String::from_str(&env, ""))
    }

    fn decimals(env: Env) -> u32 {
        if !env.storage().instance().has(&DataKey::Initialized) {
            return 0;
        }

        env.storage().instance().get(&DataKey::Decimals).unwrap_or(0)
    }

    fn total_supply(env: Env) -> i128 {
        env.storage()
            .instance()
            .get(&DataKey::TotalSupply)
            .unwrap_or(0)
    }

    fn admin(env: Env) -> Address {
        env.storage()
            .instance()
            .get(&DataKey::Admin)
            .expect("Admin not initialized")
    }
}

// ============================================================================
// TESTS
// ============================================================================

#[cfg(test)]
mod test;