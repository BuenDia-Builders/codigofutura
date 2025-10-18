# 🦈 Tips de la Tiburona Senior

*"Después de deployar cientos de tokens y ver todo tipo de bugs, estos son los consejos que me hubiera gustado recibir cuando empecé..."*

---

## 💎 Las Joyas que No Están en la Documentación

### 1. **El Estado Inicial es Sagrado**

Mira, cuando trabajas con smart contracts, hay algo que aprendés después de mucho debugging a las 3am: **siempre, SIEMPRE verificá que tu contrato esté inicializado antes de hacer cualquier cosa**.

```rust
// Esta línea te va a salvar mil dolores de cabeza
if !env.storage().instance().has(&DataKey::Initialized) {
    return Err(TokenError::NotInitialized);
}
```

¿Por qué? Porque en blockchain no hay "rollback". Si alguien llama `transfer` antes de `initialize`, no querés que pase nada raro. Trust me on this one.

### 2. **Los Eventos Son Tu Mejor Amigo (Especialmente a las 2am)**

Cuando estés debuggeando por qué los balances no cuadran, vas a agradecer haber puesto eventos EVERYWHERE. No seas tímida con los eventos:

```rust
// En transfer_from, no te olvides del evento!
env.events().publish(
    (Symbol::new(&env, "transfer_from"), spender, from, to),
    (amount, new_from_balance, new_to_balance, new_allowance)
);
```

Los eventos son como breadcrumbs en el bosque. Cuando algo sale mal (y algo SIEMPRE sale mal la primera vez), estos te van a guiar de vuelta.

### 3. **Overflow: El Enemy Silencioso**

Real talk: el overflow en transfers es más común de lo que pensás. No es solo en `mint` donde puede pasar:

```rust
// Siempre, SIEMPRE checkea overflow en el destinatario
let new_to_balance = to_balance.checked_add(amount)
    .ok_or(TokenError::OverflowError)?;
```

Imaginate que Bob tiene `u128::MAX - 10` tokens y Alice le quiere mandar 20. Boom 💥. Sin el check, tu token se rompe. Con el check, error controlado.

---

## 🚀 Optimizaciones que Van a Hacer la Diferencia

### 4. **No Iteres, Contá**

Cuando hagas el desafío de analytics, tu primer instinto va a ser iterar sobre todos los balances. DON'T. En mainnet, eso es carísimo en gas.

```rust
// ❌ Lo que NO hay que hacer
let all_holders = get_all_holders(); // Iterar sobre todo? Nope.

// ✅ Lo que una Tiburona Senior hace
pub enum DataKey {
    HolderCount,     // Mantené contadores
    LargestHolder,   // Actualizá on-the-fly
    LargestBalance,
}
```

Actualizá estos contadores en `mint`, `transfer`, y `burn`. Sí, es más código. Pero tu billetera (y la de tus personas usuarias) te lo va a agradecer.

### 5. **El Deploy Script Inteligente**

Antes de deployar, SIEMPRE chequeá que tengas fondos. Nada más frustrante que un deploy fallido por falta de XLM:

```bash
# Agregá esto a tu script de deploy
BALANCE=$(stellar account balance alice --network testnet)
if [[ -z "$BALANCE" || "$BALANCE" < "10" ]]; then
    echo "Fondeando cuenta..."
    curl "https://friendbot.stellar.org?addr=$(stellar keys address alice)"
fi
```

---

## 🎯 Los Patterns que Separan a las Juniors de las Seniors

### 6. **Early Returns Son Tu Amigo**

No anides 10 niveles de if. Fail fast, fail early:

```rust
fn transfer(...) -> Result<(), TokenError> {
    // Primero todas las validaciones
    if !initialized { return Err(...); }
    if amount == 0 { return Err(...); }
    if from == to { return Err(...); }
    if balance < amount { return Err(...); }
    
    // Recién después la lógica principal
    // ...
}
```

### 7. **Tests para los Edge Cases Raros**

El happy path lo testea cualquiera. Una Tiburona de verdad testea lo weird:

```rust
#[test]
fn test_transfer_max_u128_to_account_with_balance() {
    // Este es el tipo de test que encuentra bugs que 
    // solo aparecen en producción a las 3am un domingo
}
```

---

## 🔮 Lo que Nadie Te Dice Sobre Mainnet

### 8. **TTL es Más Importante de lo que Pensás**

En testnet todo vive ~30 días. En mainnet, si no extendés el TTL, tus datos pueden archivarse. No es broma:

```rust
// Siempre después de modificar datos persistentes
env.storage().persistent().extend_ttl(
    &DataKey::Balance(address),
    100_000,  // threshold - cuándo empezar a preocuparse
    200_000   // extend_to - hasta cuándo extender
);
```

### 9. **Los Contadores de Analytics Van en Instance, No en Persistent**

Small detail, huge difference:

```rust
// HolderCount, LargestHolder -> Instance storage (global del contrato)
env.storage().instance().set(&DataKey::HolderCount, &count);

// Balance -> Persistent storage (por usuario)
env.storage().persistent().set(&DataKey::Balance(user), &amount);
```

¿Por qué? Instance es para metadata global. Persistent es para datos de usuarios. Mix them up y vas a tener problemas de performance.

---

## 💭 Filosofía de una Tiburona Blockchain

### 10. **El Código Que No Escribís No Tiene Bugs**

Si podés hacer algo simple, hacelo simple. No necesitás un sistema de roles complejo si solo hay un admin. No necesitás un oráculo de precios si tu token tiene precio fijo.

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

## 🎁 Bonus: El Checklist Pre-Deploy

Antes de irte a dormir pensando que tu token está listo:

- [ ] ¿Todas las funciones verifican inicialización?
- [ ] ¿Todos los eventos están implementados?
- [ ] ¿Checkeaste overflow en TODAS las sumas?
- [ ] ¿Los tests cubren casos raros?
- [ ] ¿El script de deploy verifica fondos?
- [ ] ¿Los contadores están optimizados?
- [ ] ¿Extendiste TTL donde corresponde?
- [ ] ¿Probaste en testnet al menos 10 operaciones diferentes?

---

## 🌊 Palabras Finales

Look, programar smart contracts es diferente a todo lo demás. No hay segundo intento, no hay hotfixes rápidos, no hay "lo arreglo en producción". 

Pero eso es lo que lo hace emocionante. Cada línea de código que escribís tiene que ser perfecta. Cada decisión importa. Y cuando finalmente ves tu token funcionando en mainnet, con personas usuarias reales transfiriendo valor real... 

Ese feeling no tiene precio.

Ahora andá, escribí ese token, rompé cosas en testnet, aprendé de cada error. Y cuando te stuck-ees (porque te vas a stuck-ear), acordate: todas empezamos sin saber la diferencia entre Instance y Persistent storage.

La diferencia entre una junior y una senior no es no cometer errores. Es haberlos cometido todos ya, en testnet, donde no duelen. 😉

---

*P.D.: Si tu token llega a mainnet, avisame, que la primera transfer va por cuenta mía y de Tati. Es tradición tiburona.* 🦈

---

**¿Tenés alguna duda específica? Encontrame en el Telegram. Las Tiburonas nos cuidamos entre nosotras.**

*- Una Tiburona que ya pasó por todos estos bugs*