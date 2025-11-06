#![no_std]

use soroban_sdk::{contract, contractimpl, symbol_short, Env, Symbol};

const COUNTER: Symbol = symbol_short!("COUNTER");

#[contract]
pub struct EventsIncrementContract;

#[contractimpl]
impl EventsIncrementContract {
    pub fn increment(env: Env) -> u32 {
        let mut count: u32 = env.storage().instance().get(&COUNTER).unwrap_or(0);

        count += 1;
        env.storage().instance().set(&COUNTER, &count);
        env.storage().instance().extend_ttl(50, 100);

        let topics = (symbol_short!("INCREMENT"), symbol_short!("COUNT"));
        env.events().publish(topics, count);

        count
    }
}

#[cfg(test)]
mod test;


