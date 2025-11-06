use soroban_sdk::{Address, Env};

use crate::{
    events,
    storage::{
        admin::{get_admin, has_admin, set_admin as set_admin_on_storage},
        types::error::Error,
    },
};

pub fn set_admin(env: &Env, admin: Address) -> Result<Address, Error> {
    if !has_admin(env) {
        return Err(Error::ContractNotInitialized);
    }

    let current_admin = get_admin(env);

    current_admin.require_auth();

    set_admin_on_storage(env, &admin);

    events::admin::admin_changed(&env, &current_admin, &admin);

    Ok(admin)
}
