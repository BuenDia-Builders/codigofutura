#![no_std]

use soroban_sdk::{contract, contracterror, contractimpl, contracttype, Address, Env};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    NextId,
    Owner(u128),
}

#[derive(Clone, Copy, PartialEq, Eq, Debug)]
#[contracterror]
pub enum Error {
    NotOwner = 1,
    TokenDoesNotExist = 2,
}

#[contract]
pub struct NonFungibleToken;

fn read_next_id(env: &Env) -> u128 {
    env.storage().instance().get(&DataKey::NextId).unwrap_or(0u128)
}

fn write_next_id(env: &Env, id: u128) {
    env.storage().instance().set(&DataKey::NextId, &id);
}

fn read_owner(env: &Env, id: u128) -> Option<Address> {
    env.storage().instance().get(&DataKey::Owner(id))
}

fn write_owner(env: &Env, id: u128, owner: &Address) {
    env.storage().instance().set(&DataKey::Owner(id), owner);
}

#[contractimpl]
impl NonFungibleToken {
    pub fn mint(env: Env, admin: Address, to: Address) -> u128 {
        admin.require_auth();

        let id = read_next_id(&env);
        write_owner(&env, id, &to);
        write_next_id(&env, id + 1);
        id
    }

    pub fn owner_of(env: Env, id: u128) -> Address {
        read_owner(&env, id).unwrap()
    }

    pub fn transfer(env: Env, from: Address, to: Address, id: u128) -> Result<Address, Error> {
        from.require_auth();

        let current_owner = read_owner(&env, id).ok_or(Error::TokenDoesNotExist)?;
        if current_owner != from {
            return Err(Error::NotOwner);
        }
        write_owner(&env, id, &to);
        Ok(to)
    }
}

#[cfg(test)]
mod test;


