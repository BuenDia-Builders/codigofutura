#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env};

#[test]
fn test_mint_and_transfer_nft() {
    let env = Env::default();
    let admin = Address::generate(&env);
    let alice = Address::generate(&env);
    let bob = Address::generate(&env);

    let contract_id = env.register(NonFungibleToken, ());
    let client = NonFungibleTokenClient::new(&env, &contract_id);

    env.mock_all_auths();

    let token_id = client.mint(&admin, &alice);
    assert_eq!(client.owner_of(&token_id), alice);

    client.transfer(&alice, &bob, &token_id);
    assert_eq!(client.owner_of(&token_id), bob);
}


