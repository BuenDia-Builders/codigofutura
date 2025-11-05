use soroban_sdk::{contracttype, Address};

#[derive(Clone)]
#[contracttype]
pub struct User {
    pub address: Address,
    pub transactions_count: u64,
}
