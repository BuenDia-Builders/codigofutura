#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Env, Address};

#[test]
fn test_mint_and_transfer() {
    let env = Env::default();
    let admin = Address::generate(&env);
    let alice = Address::generate(&env);
    let bob = Address::generate(&env);

    let contract_id = env.register(FungibleToken, ());
    let client = FungibleTokenClient::new(&env, &contract_id);

    env.mock_all_auths();

    // mint to alice by admin
    assert_eq!(client.mint(&admin, &alice, &100), 100);
    assert_eq!(client.balance(&alice), 100);

    // transfer from alice to bob
    assert_eq!(client.transfer(&alice, &bob, &40), 40);
    assert_eq!(client.balance(&alice), 60);
    assert_eq!(client.balance(&bob), 40);
}


