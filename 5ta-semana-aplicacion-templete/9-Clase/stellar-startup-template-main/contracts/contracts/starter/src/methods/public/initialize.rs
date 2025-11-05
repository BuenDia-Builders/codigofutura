use soroban_sdk::{Address, Env};

use crate::{
    events,
    storage::{
        admin::{has_admin, set_admin},
        types::error::Error,
    },
};

pub fn initialize(env: &Env, admin: Address) -> Result<(), Error> {
    if has_admin(env) {
        return Err(Error::ContractInitialized);
    }

    set_admin(&env, &admin);
    events::contract::contract_initialized(&env, &admin);

    Ok(())
}
