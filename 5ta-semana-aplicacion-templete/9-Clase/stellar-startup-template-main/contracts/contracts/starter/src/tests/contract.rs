use crate::{
    storage::types::storage::DataKey,
    tests::config::{
        constants::BASE_MINT_AMOUNT, contract::ContractTest, utils::get_contract_events,
    },
};
use soroban_sdk::{
    testutils::{MockAuth, MockAuthInvoke},
    vec, IntoVal, Symbol,
};

#[test]
fn set_admin_test() {
    let ContractTest {
        env,
        admin,
        contract,
        user_a,
        ..
    } = ContractTest::setup();
    contract.mock_all_auths().set_admin(&user_a);

    let contract_events = get_contract_events(&env, contract.address.clone());

    assert_eq!(
        contract_events,
        vec![
            &env,
            (
                contract.address.clone(),
                vec![
                    &env,
                    Symbol::new(&env, "admin_changed").into_val(&env),
                    admin.into_val(&env),
                ],
                vec![&env, admin.clone(), user_a.clone()].into_val(&env),
            )
        ]
    );
}

#[test]
#[should_panic = "Error(Contract, #1)"]
fn set_admin_fail_test() {
    let ContractTest {
        env,
        contract,
        admin,
        ..
    } = ContractTest::setup();

    let contract_id = contract.address.clone();

    let key = DataKey::Admin;
    env.as_contract(&contract_id, || {
        env.storage().instance().remove(&key);
    });

    contract.mock_all_auths().set_admin(&admin);
}

#[test]
#[should_panic(expected = "Error(Auth, InvalidAction)")]
pub fn set_admin_with_unauthorized_admin_test() {
    let ContractTest {
        env,
        contract,
        user_a,
        ..
    } = ContractTest::setup();

    contract
        .mock_auths(&[MockAuth {
            address: &user_a,
            invoke: &MockAuthInvoke {
                contract: &contract.address.clone(),
                fn_name: "set_admin",
                args: (user_a.clone(),).into_val(&env),
                sub_invokes: &[],
            },
        }])
        .set_admin(&user_a);
}

#[test]
fn transfer_test() {
    let ContractTest {
        env,
        contract,
        user_a,
        user_b,
        token,
        ..
    } = ContractTest::setup();

    env.mock_all_auths();
    let (token_client, _, _) = token;

    let transfer_amount = BASE_MINT_AMOUNT / 2;

    assert_eq!(token_client.balance(&user_a), BASE_MINT_AMOUNT);
    assert_eq!(token_client.balance(&user_b), BASE_MINT_AMOUNT);

    contract.transfer(&user_a, &user_b, &token_client.address, &transfer_amount);

    assert_eq!(
        token_client.balance(&user_a),
        BASE_MINT_AMOUNT - transfer_amount
    );
    assert_eq!(
        token_client.balance(&user_b),
        BASE_MINT_AMOUNT + transfer_amount
    );
}

#[test]
#[should_panic(expected = "Error(Auth, InvalidAction)")]
pub fn transfer_with_unauthorized_sender_test() {
    let ContractTest {
        env,
        contract,
        user_a,
        user_b,
        token,
        ..
    } = ContractTest::setup();

    env.mock_all_auths();
    let (token_client, _, _) = token;

    let transfer_amount = BASE_MINT_AMOUNT / 2;

    assert_eq!(token_client.balance(&user_a), BASE_MINT_AMOUNT);
    assert_eq!(token_client.balance(&user_b), BASE_MINT_AMOUNT);

    contract
        .mock_auths(&[MockAuth {
            address: &user_b,
            invoke: &MockAuthInvoke {
                contract: &contract.address.clone(),
                fn_name: "set_admin",
                args: (
                    user_a.clone(),
                    user_b.clone(),
                    token_client.address.clone(),
                    transfer_amount,
                )
                    .into_val(&env),
                sub_invokes: &[],
            },
        }])
        .transfer(&user_a, &user_b, &token_client.address, &transfer_amount);
}

#[test]
fn get_user_test() {
    let ContractTest {
        env,
        contract,
        user_a,
        user_b,
        token,
        ..
    } = ContractTest::setup();
    env.mock_all_auths();
    let (token_client, _, _) = token;

    let transfer_amount = BASE_MINT_AMOUNT / 2;

    contract.transfer(&user_a, &user_b, &token_client.address, &transfer_amount);

    let user_a_historical_data = contract.get_user(&user_a);
    assert_eq!(user_a_historical_data.transactions_count, 1);
    contract.transfer(&user_a, &user_b, &token_client.address, &transfer_amount);

    let user_a_historical_data_2 = contract.get_user(&user_a);
    assert_eq!(user_a_historical_data_2.transactions_count, 2);
}

#[test]
#[should_panic = "Error(Contract, #2)"]
fn get_user_fail_test() {
    let ContractTest {
        contract, user_a, ..
    } = ContractTest::setup();

    contract.mock_all_auths().get_user(&user_a);
}
