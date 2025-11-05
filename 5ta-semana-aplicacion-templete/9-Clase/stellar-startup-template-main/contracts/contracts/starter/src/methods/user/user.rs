use soroban_sdk::{Address, Env};

use crate::{
    storage::{
        types::{error::Error, user::User},
        user::{has_user, read_user, write_user},
    },
    utils::math_operations,
};

pub(crate) fn update_transfer_amount(env: &Env, address: &Address) -> Result<(), Error> {
    if !has_user(env, address) {
        let user = User {
            address: address.clone(),
            transactions_count: 1,
        };
        write_user(env, &user);
    } else {
        let mut user = read_user(env, address);

        user.transactions_count = math_operations::sum(&user.transactions_count, &1)?;
        write_user(env, &user);
    }

    Ok(())
}

pub(crate) fn get_user(env: &Env, address: &Address) -> Result<User, Error> {
    if !has_user(env, address) {
        return Err(Error::NonExistentUser);
    }

    Ok(read_user(env, address))
}
