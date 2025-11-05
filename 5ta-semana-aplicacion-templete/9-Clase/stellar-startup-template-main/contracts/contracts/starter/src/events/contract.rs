use soroban_sdk::{Address, Env, Symbol};

pub(crate) fn contract_initialized(env: &Env, admin: &Address) {
    let topics = (Symbol::new(env, "contrat_initialized"), admin);
    env.events().publish(topics, admin);
}
