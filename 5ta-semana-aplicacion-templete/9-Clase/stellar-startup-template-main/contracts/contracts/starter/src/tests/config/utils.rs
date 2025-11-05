use soroban_sdk::{testutils::Events, token, vec, Address, Env, Val, Vec};

pub(crate) fn create_token_contract<'a>(
    e: &Env,
    admin: &Address,
) -> (token::Client<'a>, token::StellarAssetClient<'a>) {
    let addr = e.register_stellar_asset_contract_v2(admin.clone());

    (
        token::Client::new(e, &addr.address()),
        token::StellarAssetClient::new(e, &addr.address()),
    )
}

pub(crate) fn get_contract_events(
    env: &Env,
    contract_address: Address,
) -> Vec<(Address, Vec<Val>, Val)> {
    let mut contract_events = vec![env];

    env.events()
        .all()
        .iter()
        .filter(|event| event.0 == contract_address)
        .for_each(|event| contract_events.push_back(event));

    contract_events
}
