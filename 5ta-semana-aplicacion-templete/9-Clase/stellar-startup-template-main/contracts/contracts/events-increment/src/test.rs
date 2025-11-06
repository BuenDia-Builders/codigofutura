#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Events, Env};

#[test]
fn test_increment_emits_event() {
    let env = Env::default();
    let contract_id = env.register(EventsIncrementContract, ());
    let client = EventsIncrementContractClient::new(&env, &contract_id);

    assert_eq!(client.increment(), 1);

    let evts = env.events().all();
    assert!(evts.len() >= 1);
}


