# 🦈 Tips de la Tiburona Senior (en Linux, en Windows y Mac hablemos)

*"Después de deployar cientos de tokens y ver todo tipo de bugs, estos son los consejos que me hubiera gustado recibir cuando empecé..."*

---

## 💎 Las Joyas que No Están en la Documentación

### 1. **El Estado Inicial es Sagrado**

Mira, cuando trabajas con smart contracts, hay algo que aprendés después de mucho debugging a las 3am: **siempre, SIEMPRE verificá que tu contrato esté inicializado antes de hacer cualquier cosa**. Y no te olvides de validar `name` y `symbol`.

```rust
fn initialize(
    env: Env,
    admin: Address,
    name: String,
    symbol: String,
    decimals: u32
) -> Result<(), TokenError> {
    if env.storage().instance().has(&DataKey::Initialized) {
        return Err(TokenError::AlreadyInitialized);
    }
    if name.is_empty() { 
        return Err(TokenError::InvalidName); 
    }
    if symbol.is_empty() { 
        return Err(TokenError::InvalidSymbol); 
    }
    // Resto del código de inicialización
    env.storage().instance().set(&DataKey::Initialized, &true);
    Ok(())
}

fn transfer(env: Env, from: Address, to: Address, amount: u128) -> Result<(), TokenError> {
    if !env.storage().instance().has(&DataKey::Initialized) {
        return Err(TokenError::NotInitialized);
    }
    // Resto del código
}
```

¿Por qué? En blockchain no hay "rollback". Si alguien llama `transfer` antes de `initialize`, o usa un `name` vacío, tu contrato puede romperse. Trust me on this one.

### 2. **Los Eventos Son Tu Mejor Amigo (Especialmente a las 2am)**

Cuando estés debuggeando por qué los balances no cuadran, vas a agradecer haber puesto eventos EVERYWHERE. No seas tímida con los eventos:

```rust
// En transfer
env.events().publish(
    (Symbol::new(&env, "transfer"), from, to),
    (amount, new_from_balance, new_to_balance)
);

// En transfer_from, no te olvides del evento!
env.events().publish(
    (Symbol::new(&env, "transfer_from"), spender, from, to),
    (amount, new_from_balance, new_to_balance, new_allowance)
);
```

Los eventos son como breadcrumbs en el bosque. Cuando algo sale mal (y algo SIEMPRE sale mal la primera vez), estos te guían de vuelta. En testnet, revisalos con:

```bash
stellar events --id $TOKEN_CONTRACT_ID --network testnet --output json
```

### 3. **Overflow: El Enemigo Silencioso**

Real talk: el overflow en transfers es más común de lo que pensás. No es solo en `mint`:

```rust
// Siempre, SIEMPRE checkea overflow en el destinatario
let new_to_balance = to_balance.checked_add(amount)
    .ok_or(TokenError::OverflowError)?;
```

Imaginate que Bob tiene `u128::MAX - 10` tokens y Alice le quiere mandar 20. Boom 💥. Sin el check, tu token se rompe. Con el check, error controlado.

---

## 🚀 Optimizaciones que Van a Hacer la Diferencia

### 4. **No Iteres, Contá**

Para el desafío de analytics, tu primer instinto será iterar sobre todos los balances. DON'T. En mainnet, eso es carísimo en gas.

```rust
// ❌ Lo que NO hay que hacer
let all_holders = get_all_holders(); // Iterar? Nope.

// ✅ Lo que una Tiburona Senior hace
pub enum DataKey {
    Initialized,
    Admin,
    Name,
    Symbol,
    Decimals,
    TotalSupply,
    Balance(Address),
    Allowance(Address, Address),
    HolderCount,     // Contador de holders
    LargestHolder,   // Actualizá on-the-fly
    LargestBalance,
}
```

Actualizá estos contadores en `mint`, `transfer`, y `burn`. Ejemplo para `balance_formatted`:

```rust
fn balance_formatted(env: Env, account: Address) -> String {
    let balance = Self::balance(env.clone(), account);
    let decimals = Self::decimals(env.clone());
    let whole = balance / 10u128.pow(decimals);
    let fractional = balance % 10u128.pow(decimals);
    String::from_str(&env, &format!("{}.{}", whole, fractional))
}
```

Más código, menos gas. Tu billetera te lo agradecerá.

### 5. **El Deploy Script Inteligente**

Antes de deployar, SIEMPRE chequeá fondos y corre tests. Nada más frustrante que un deploy fallido:

```bash
#!/bin/bash

# Agregá esto a tu script
cargo test

BALANCE=$(stellar account balance alice --network testnet)
if [[ -z "$BALANCE" || "$BALANCE" < "10" ]]; then
    echo "🦈 Fondeando cuenta..."
    curl "https://friendbot.stellar.org?addr=$(stellar keys address alice)"
    sleep 5
fi

# Deploy con el target correcto
stellar contract build
stellar contract deploy \
    --wasm target/wasm32v1-none/release/token_bdb.wasm \
    --source alice \
    --network testnet
```

**Nota importante:** El target correcto es `wasm32v1-none`, no `wasm32-unknown-unknown`. Esto previene errores como "can't find crate for core".

---

## 🎯 Los Patterns que Separan a las Juniors de las Seniors

### 6. **Early Returns Son Tu Amigo**

No anides 10 niveles de if. Fail fast, fail early:

```rust
fn transfer(
    env: Env,
    from: Address,
    to: Address,
    amount: u128
) -> Result<(), TokenError> {
    // Primero todas las validaciones
    if !env.storage().instance().has(&DataKey::Initialized) { 
        return Err(TokenError::NotInitialized); 
    }
    if amount == 0 { 
        return Err(TokenError::InvalidAmount); 
    }
    if from == to { 
        return Err(TokenError::InvalidRecipient); 
    }
    
    let from_balance = env.storage().persistent()
        .get(&DataKey::Balance(from.clone()))
        .unwrap_or(0);
    
    if from_balance < amount { 
        return Err(TokenError::InsufficientBalance); 
    }
    
    // Recién después la lógica principal
    // ...
}
```

### 7. **Tests para los Edge Cases Raros**

El happy path lo testea cualquiera. Una Tiburona de verdad testea lo weird:

```rust
#[test]
fn test_transfer_to_self_fails() {
    let env = Env::default();
    env.mock_all_auths();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    client.initialize(
        &admin,
        &String::from_str(&env, "Token"),
        &String::from_str(&env, "BDB"),
        &7
    ).unwrap();
    client.mint(&admin, &1000).unwrap();
    
    assert_eq!(
        client.transfer(&admin, &admin, &100),
        Err(Ok(TokenError::InvalidRecipient))
    );
}

#[test]
fn test_transfer_max_u128_to_account_with_balance() {
    let env = Env::default();
    env.mock_all_auths();
    let contract_id = env.register_contract(None, TokenBDB);
    let client = TokenBDBClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let bob = Address::generate(&env);
    client.initialize(
        &admin,
        &String::from_str(&env, "Token"),
        &String::from_str(&env, "BDB"),
        &7
    ).unwrap();
    client.mint(&bob, &u128::MAX).unwrap();
    
    // Intentar transferir 1 token a Bob que ya tiene u128::MAX
    assert_eq!(
        client.transfer(&admin, &bob, &1),
        Err(Ok(TokenError::OverflowError))
    );
}
```

---

## 🔮 Lo que Nadie Te Dice Sobre Mainnet

### 8. **TTL es Más Importante de lo que Pensás**

**¿Qué es TTL?** En Stellar, los datos en storage tienen un "Tiempo de Vida" (TTL) medido en ledgers (~5 segundos cada uno). En testnet, duran ~30 días (~100,000 ledgers). En mainnet, si no extiendes el TTL, tus datos pueden desaparecer, rompiendo tu contrato. Usa `extend_ttl` para mantenerlos vivos.

```rust
// Siempre después de modificar datos persistentes
env.storage().persistent().extend_ttl(
    &DataKey::Balance(address),
    100_000,  // threshold: cuándo preocuparse
    200_000   // extend_to: hasta cuándo extender
);
```

### 9. **Los Contadores de Analytics Van en Instance, No en Persistent**

Small detail, huge difference:

```rust
// HolderCount, LargestHolder -> Instance storage (global)
env.storage().instance().set(&DataKey::HolderCount, &count);

// Balance -> Persistent storage (por usuario)
env.storage().persistent().set(&DataKey::Balance(user), &amount);
```

¿Por qué? Instance es para metadata global, más barato y rápido. Persistent es para datos de usuarios. Mezclarlos causa problemas de performance.

---

## 💭 Filosofía de una Tiburona Blockchain

### 10. **El Código Que No Escribís No Tiene Bugs**

Si podés hacer algo simple, hacelo simple. ¿Ejemplo? Para `max_supply`:

```rust
fn mint(env: Env, to: Address, amount: u128) -> Result<(), TokenError> {
    if !env.storage().instance().has(&DataKey::Initialized) {
        return Err(TokenError::NotInitialized);
    }
    
    let total_supply = env.storage().instance()
        .get(&DataKey::TotalSupply)
        .unwrap_or(0);
    let max_supply = env.storage().instance()
        .get(&DataKey::MaxSupply)
        .unwrap_or(u128::MAX);
    
    if total_supply.checked_add(amount).ok_or(TokenError::OverflowError)? > max_supply {
        return Err(TokenError::MaxSupplyExceeded);
    }
    
    // Resto del código
}
```

No necesitás un sistema complejo si solo hay un admin.

> "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."

### 11. **Pensá en la Peor Persona Usuaria Posible**

Alguien va a intentar:
- Mintear `u128::MAX` tokens
- Transferir 0 tokens un millón de veces
- Aprobar y des-aprobar en el mismo bloque
- Llamar funciones en orden random

Tu contrato tiene que sobrevivir a todo eso.

### 12. **La Seguridad No es Negociable**

Si tenés que elegir entre una feature cool y seguridad, elegí seguridad. SIEMPRE. Las personas usuarias pueden perdonar que falte una feature. No van a perdonar perder sus tokens.

---

## 🦈 Tarea Simplificada para Tiburonas Nuevas

Si estás empezando, ¡no te preocupes! Podés aplicar estos consejos con una tarea simple:

1. **Copiá el código** de `lib.rs`, `storage.rs`, `errors.rs`, y `test.rs` de `03-codigo-completo.md`.

2. **Asegurate de verificar la inicialización** en todas las funciones (Consejo #1):
   ```rust
   if !env.storage().instance().has(&DataKey::Initialized) {
       return Err(TokenError::NotInitialized);
   }
   ```

3. **Agregá un evento en transfer** (Consejo #2):
   ```rust
   env.events().publish(
       (Symbol::new(&env, "transfer"), from, to),
       (amount, new_from_balance, new_to_balance)
   );
   ```

4. **Corré 3 tests clave**:
   ```bash
   cargo test test_initialize
   cargo test test_mint_and_balance
   cargo test test_transfer
   ```

5. **(Opcional)** Desplegá hasta `initialize`:
   ```bash
   stellar contract build
   CONTRACT_ID=$(stellar contract deploy \
       --wasm target/wasm32v1-none/release/token_bdb.wasm \
       --source alice \
       --network testnet)
   stellar contract invoke \
       --id $CONTRACT_ID \
       --source alice \
       --network testnet \
       -- initialize \
       --admin $(stellar keys address alice) \
       --name "Buen Dia Token" \
       --symbol "BDB" \
       --decimals 7
   ```

**Criterios de Éxito:** Los 3 tests pasan, y el contrato tiene verificaciones de inicialización y eventos.

---

## 🎁 Bonus: El Checklist Pre-Deploy

Antes de irte a dormir pensando que tu token está listo:

- [ ] ¿Todas las funciones verifican inicialización?
- [ ] ¿`name` y `symbol` están validados?
- [ ] ¿Todos los eventos están implementados?
- [ ] ¿Checkeaste overflow en TODAS las sumas?
- [ ] ¿Los tests cubren casos raros?
- [ ] ¿El script de deploy verifica fondos y tests?
- [ ] ¿Los contadores están optimizados?
- [ ] ¿Extendiste TTL donde corresponde?
- [ ] ¿Probaste en testnet al menos 10 operaciones diferentes?

---

## 🌊 Palabras Finales

Look, programar smart contracts es diferente a todo lo demás. No hay segundo intento, no hay hotfixes rápidos, no hay "lo arreglo en producción". 

Pero eso es lo que lo hace emocionante. Cada línea de código tiene que ser perfecta. Cada decisión importa. Y cuando veas tu token en mainnet, con personas usuarias reales transfiriendo valor real... 

Ese feeling no tiene precio.

Ahora andá, escribí ese token, rompé cosas en testnet, aprendé de cada error. Y cuando te stuck-ees (porque te vas a stuck-ear), acordate: todas empezamos sin saber la diferencia entre Instance y Persistent storage.

La diferencia entre una junior y una senior no es no cometer errores. Es haberlos cometido todos ya, en testnet, donde no duelen. 😉

---

*P.D.: Si tu token llega a mainnet, avisame, que la primera transfer va por cuenta mía y de Tati. Es tradición tiburona.* 🦈

---

**¿Tenés alguna duda específica? Encontrame en el Telegram. Las Tiburonas nos cuidamos entre nosotras.**

*- Una Tiburona que ya pasó por todos estos bugs*