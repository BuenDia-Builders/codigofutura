use soroban_sdk::{token, Address, Env};

pub fn transfer(env: &Env, from: Address, to: Address, token: Address, amount: i128) -> i128 {
    from.require_auth();

    let client = token::Client::new(env, &token);

    client.transfer(&from, &to, &amount);

    client.balance(&to)
}
