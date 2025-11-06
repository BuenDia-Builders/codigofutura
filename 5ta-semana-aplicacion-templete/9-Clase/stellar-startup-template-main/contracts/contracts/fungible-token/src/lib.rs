#![no_std]

use soroban_sdk::{contract, contracterror, contractimpl, contracttype, Address, Env};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Balance(Address),
}

#[derive(Clone, Copy, PartialEq, Eq, Debug)]
#[contracterror]
pub enum Error {
    NotAuthorized = 1,
    InsufficientBalance = 2,
}

#[contract]
pub struct FungibleToken;

fn read_balance(env: &Env, addr: &Address) -> i128 {
    env.storage()
        .instance()
        .get(&DataKey::Balance(addr.clone()))
        .unwrap_or(0)
}

fn write_balance(env: &Env, addr: &Address, amount: i128) {
    env.storage()
        .instance()
        .set(&DataKey::Balance(addr.clone()), &amount);
}

#[contractimpl]
impl FungibleToken {
    pub fn balance(env: Env, id: Address) -> i128 {
        read_balance(&env, &id)
    }

    pub fn mint(env: Env, admin: Address, to: Address, amount: i128) -> i128 {
        admin.require_auth();

        let new_balance = read_balance(&env, &to) + amount;
        write_balance(&env, &to, new_balance);
        new_balance
    }

    pub fn transfer(env: Env, from: Address, to: Address, amount: i128) -> Result<i128, Error> {
        from.require_auth();

        let from_balance = read_balance(&env, &from);
        if from_balance < amount {
            return Err(Error::InsufficientBalance);
        }
        let to_balance = read_balance(&env, &to);

        write_balance(&env, &from, from_balance - amount);
        let new_to_balance = to_balance + amount;
        write_balance(&env, &to, new_to_balance);

        Ok(new_to_balance)
    }
}

#[cfg(test)]
mod test;


