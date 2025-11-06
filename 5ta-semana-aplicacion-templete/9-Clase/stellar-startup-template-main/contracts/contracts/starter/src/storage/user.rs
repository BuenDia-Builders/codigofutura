use soroban_sdk::{Address, Env};

use super::types::{storage::DataKey, user::User};

pub(crate) fn has_user(env: &Env, address: &Address) -> bool {
    let key = DataKey::User(address.clone());

    env.storage().instance().has(&key)
}

pub(crate) fn write_user(env: &Env, user: &User) {
    let key = DataKey::User(user.address.clone());

    env.storage().instance().set(&key, user);
}

pub(crate) fn read_user(env: &Env, address: &Address) -> User {
    let key = DataKey::User(address.clone());

    env.storage().instance().get(&key).unwrap()
}
