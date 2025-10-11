# 🦈 Recursos y Referencias - Clase 4
## Todo lo que necesitas para profundizar

---

## 📚 Documentación oficial

### Stellar/Soroban (Prioridad alta)

1. **Manejo de Errores en Soroban**  
   [https://developers.stellar.org/docs/learn/fundamentals/contract-development/errors-and-debugging](https://developers.stellar.org/docs/learn/fundamentals/contract-development/errors-and-debugging)
   - Cómo definir errores personalizados
   - Debugging de contratos
   - Mejores prácticas de error handling

2. **Storage en Soroban**  
   [https://developers.stellar.org/docs/learn/fundamentals/contract-development/storage/persisting-data](https://developers.stellar.org/docs/learn/fundamentals/contract-development/storage/persisting-data)
   - Instance vs Persistent vs Temporary
   - TTL y cómo gestionarlo
   - Costos de storage

3. **Tipos de datos en Soroban**  
   [https://developers.stellar.org/docs/learn/fundamentals/contract-development/types/built-in-types](https://developers.stellar.org/docs/learn/fundamentals/contract-development/types/built-in-types)
   - Address, Symbol, Vec, Map
   - Conversiones entre tipos
   - Custom types con #[contracttype]

4. **Seguridad en contratos**  
   [https://developers.stellar.org/docs/build/security-docs](https://developers.stellar.org/docs/build/security-docs)
   - Validaciones esenciales
   - Control de acceso
   - Patrones de seguridad

5. **Ejemplos oficiales de Soroban**  
   [https://github.com/stellar/soroban-examples](https://github.com/stellar/soroban-examples)
   - Token estándar
   - Timelock
   - Atomic swap
   - Y muchos más

---

### Rust (Fundamentos)

6. **The Rust Book en Español**  
   [https://book.rustlang-es.org/](https://book.rustlang-es.org/)
   - Capítulo 6: Enums y Pattern Matching
   - Capítulo 9: Manejo de errores
   - Capítulo 10: Traits

7. **Rust by Example - Error Handling**  
   [https://doc.rust-lang.org/rust-by-example/error.html](https://doc.rust-lang.org/rust-by-example/error.html)
   - Ejemplos de Option y Result
   - Operador ?
   - Múltiples tipos de error

---

## 🎥 Videos y tutoriales

### En español:

1. **Canal de Stellar en Español**
   - Busca "Stellar Español" en YouTube
   - Tutoriales de Soroban básicos

2. **Rust en Español - MoureDev**
   - Fundamentos de Rust
   - Manejo de errores explicado

### En inglés (con subtítulos):

3. **Soroban Quest**
   [https://quest.stellar.org/soroban](https://quest.stellar.org/soroban)
   - Tutorial interactivo oficial
   - 6 quests progresivos

4. **Stellar Developers YouTube**
   - Workshops de Soroban
   - Ejemplos en vivo

---

## 🛠️ Herramientas útiles

### 1. Soroban CLI

**Documentación:**  
[https://developers.stellar.org/docs/tools/developer-tools/cli/stellar-cli](https://developers.stellar.org/docs/tools/developer-tools/cli/stellar-cli)

**Comandos esenciales:**
```bash
# Ver todos los comandos
soroban --help

# Compilar contrato
soroban contract build

# Optimizar WASM
soroban contract optimize --wasm <path>

# Deployar a testnet
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/hello_tiburona.wasm \
  --network testnet

# Invocar función
soroban contract invoke \
  --id <CONTRACT_ID> \
  --network testnet \
  -- \
  hello \
  --usuario <ADDRESS> \
  --nombre "Ana"
```

### 2. Stellar Laboratory

[https://laboratory.stellar.org/](https://laboratory.stellar.org/)
- Explorador de transacciones
- Crear y firmar transacciones
- Ver contratos deployados

### 3. Freighter Wallet

[https://www.freighter.app/](https://www.freighter.app/)
- Wallet para desarrollo
- Manejo de cuentas testnet
- Firmar transacciones de contratos

### 4. Stellar Expert

[https://stellar.expert/](https://stellar.expert/)
- Explorador de blockchain
- Ver contratos en testnet/mainnet
- Analizar transacciones

---

## ❓ FAQ - Preguntas Frecuentes

### Sobre Errores y Result

**P: ¿Siempre debo usar Result para funciones públicas?**

R: No. Usa Result cuando la función puede fallar de formas que el caller debe manejar. Para funciones de solo lectura que siempre funcionan (como `get_contador()`), un tipo directo está bien.

```rust
// ✅ BIEN: Nunca falla
pub fn get_contador(env: Env) -> u32 { ... }

// ✅ BIEN: Puede fallar
pub fn transfer(env: Env, ...) -> Result<(), Error> { ... }
```

---

**P: ¿Cuándo usar unwrap() vs unwrap_or() vs ?**

R: 
- `unwrap()` → Solo si estás 100% segura que hay valor (raro, peligroso)
- `unwrap_or(default)` → Cuando quieres un valor por defecto seguro
- `?` → Cuando quieres propagar el error al caller

```rust
// unwrap_or - Usuario nuevo = balance 0
let balance = storage.get(...).unwrap_or(0);

// ? - Propagar error si admin no existe
let admin = storage.get(...).ok_or(Error::NoInicializado)?;

// unwrap - Solo si imposible que falle (evitar)
let admin = storage.get(...).unwrap();  // ❌ Peligroso
```

---

**P: ¿Puedo tener múltiples tipos de Error en un contrato?**

R: Sí, pero normalmente un solo enum Error es suficiente. Si necesitas errores de múltiples módulos, puedes usar enums anidados:

```rust
#[contracterror]
pub enum Error {
    // Errores de autenticación
    NoAutorizado = 1,
    CredencialesInvalidas = 2,
    
    // Errores de validación
    MontoInvalido = 10,
    BalanceInsuficiente = 11,
    
    // Errores de estado
    NoInicializado = 20,
    YaInicializado = 21,
}
```

---

### Sobre Storage

**P: ¿Qué pasa si no extiendo el TTL?**

R: Los datos eventualmente expirarán y se borrarán. Para contratos en producción, **siempre** extender TTL de datos críticos.

```rust
// ❌ MAL: Guardar sin extender TTL
env.storage().persistent().set(&key, &value);
// Los datos pueden expirar

// ✅ BIEN: Guardar y extender
env.storage().persistent().set(&key, &value);
env.storage().persistent().extend_ttl(&key, 100, 100);
```

---

**P: ¿Cuánto cuesta el storage en Soroban?**

R: El costo varía según:
- **Tipo de storage:** Persistent > Instance > Temporary
- **Duración del TTL:** Más tiempo = más caro
- **Tamaño de datos:** Más bytes = más caro

Para datos frecuentemente accedidos, el costo se amortiza. Usa Temporary para cache cuando sea posible.

---

**P: ¿Puedo migrar datos de Instance a Persistent?**

R: Sí, pero requiere:
1. Leer datos de Instance
2. Escribir en Persistent
3. (Opcional) Eliminar de Instance

```rust
// Migrar admin de Instance a Persistent
let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
env.storage().persistent().set(&DataKey::AdminPersistent, &admin);
env.storage().instance().remove(&DataKey::Admin);
```

---

**P: ¿Cuál es el límite de tamaño para storage?**

R: Actualmente no hay límite hard-coded, pero considera:
- Más datos = más gas
- Strings muy largos son costosos
- Usa límites razonables (ej: 32 chars para nombres)

---

### Sobre DataKey

**P: ¿Puedo usar strings como keys en lugar de DataKey enum?**

R: Técnicamente sí, pero **NO es recomendado**:

```rust
// ❌ MAL: Sin type safety
env.storage().instance().set(&"admin", &admin);

// ✅ BIEN: Type-safe
env.storage().instance().set(&DataKey::Admin, &admin);
```

Razones para usar DataKey enum:
- El compilador previene typos
- Autocomplete en IDE
- Fácil refactorizar
- Autodocumentación

---

**P: ¿Cómo organizo DataKey para muchos tipos de datos?**

R: Agrúpalas por storage type y añade comentarios:

```rust
#[contracttype]
pub enum DataKey {
    // ========== INSTANCE STORAGE ==========
    // Configuración del contrato
    Admin,
    NombreToken,
    TotalSupply,
    
    // ========== PERSISTENT STORAGE ==========
    // Datos de usuarios
    Balance(Address),
    Allowance(Address, Address),
    
    // Registros históricos
    Transaction(u64),  // Por timestamp
    
    // ========== TEMPORARY STORAGE ==========
    // Cache
    PrecioCache,
    UltimaActualizacion,
}
```

---

### Sobre Traits

**P: ¿Necesito implementar traits manualmente?**

R: Depende:
- **Traits de Soroban** (Contract, etc.) → Automáticos con macros
- **Traits custom** (Ownable, Token) → Debes implementarlos

```rust
// Automático con #[contract]
#[contract]
pub struct MiContrato;

// Manual si defines tu propio trait
trait Ownable {
    fn get_owner(&self) -> Address;
}

impl Ownable for MiContrato {
    fn get_owner(&self) -> Address { ... }
}
```

---

**P: ¿Puedo usar traits de Rust estándar en Soroban?**

R: Solo algunos, porque Soroban es `#![no_std]`:

✅ Sí disponibles:
- `Clone`, `Copy`
- `Debug`, `PartialEq`, `Eq`
- `Default`

❌ No disponibles:
- `std::io::Read`
- `std::error::Error`
- `std::fmt::Display` (parcialmente)

---

### Sobre Testing

**P: ¿Cómo testeo funciones que requieren autenticación?**

R: Usa `mock_all_auths()` en el environment de test:

```rust
#[test]
fn test_con_auth() {
    let env = Env::default();
    env.mock_all_auths();  // 👈 Mock todas las autenticaciones
    
    let contract_id = env.register_contract(None, HelloContract);
    let client = HelloContractClient::new(&env, &contract_id);
    
    let usuario = Address::generate(&env);
    
    // Ahora esto funciona sin require_auth real
    client.hello(&usuario, &Symbol::new(&env, "Ana"));
}
```

---

**P: ¿Cómo testeo que un error específico se lance?**

R: Usa `#[should_panic]` con `expected`:

```rust
#[test]
#[should_panic(expected = "NombreVacio")]
fn test_error_nombre_vacio() {
    let env = Env::default();
    let contract_id = env.register_contract(None, HelloContract);
    let client = HelloContractClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let usuario = Address::generate(&env);
    
    client.initialize(&admin);
    client.hello(&usuario, &Symbol::new(&env, ""));  // Debe fallar
}
```

---

**P: ¿Cómo verifico el estado del storage en tests?**

R: Lee directamente del storage o usa funciones getter:

```rust
#[test]
fn test_storage_state() {
    let env = Env::default();
    let contract_id = env.register_contract(None, HelloContract);
    let client = HelloContractClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    client.initialize(&admin);
    
    // Verificar usando getter
    assert_eq!(client.get_contador(), 0);
    
    // O leer directamente del storage (avanzado)
    let contador: u32 = env.as_contract(&contract_id, || {
        env.storage()
            .instance()
            .get(&DataKey::ContadorSaludos)
            .unwrap()
    });
    assert_eq!(contador, 0);
}
```

---

## 🔧 Troubleshooting

### Error: "cannot find derive macro `contracttype`"

**Causa:** Falta importar el macro.

**Solución:**
```rust
use soroban_sdk::{contracttype, ...};

#[contracttype]  // Ahora funcionará
pub enum DataKey { ... }
```

---

### Error: "mismatched types: expected `Result<...>` found `()`"

**Causa:** Olvidaste retornar `Ok(())` o `Err(...)`.

**Solución:**
```rust
pub fn mi_funcion(...) -> Result<(), Error> {
    // ... código ...
    
    Ok(())  // 👈 No olvides esto
}
```

---

### Error: "value borrowed after move"

**Causa:** Usaste un valor después de moverlo (común con Address).

**Solución:** Usa `.clone()`:
```rust
// ❌ Error
let key = DataKey::Balance(usuario);
env.storage().set(&key, &balance);
log(&usuario);  // Error: usuario ya se movió

// ✅ Correcto
let key = DataKey::Balance(usuario.clone());  // Clone aquí
env.storage().set(&key, &balance);
log(&usuario);  // Ahora funciona
```

---

### Error: "no method named `unwrap_or` found"

**Causa:** El tipo no es `Option` o `Result`.

**Solución:** Verifica el tipo:
```rust
// Esto retorna Option<T>
let valor: Option<i128> = env.storage().get(&key);
let valor_seguro = valor.unwrap_or(0);  // OK

// Si retorna directamente, no necesitas unwrap_or
let valor: i128 = mi_funcion();  // Ya es i128
```

---

### Warning: "unused Result that must be used"

**Causa:** No manejaste un `Result`.

**Solución:**
```rust
// ❌ Warning
mi_funcion_que_retorna_result();

// ✅ Correcto - Manejarlo
mi_funcion_que_retorna_result()?;

// ✅ O ignorar explícitamente (solo si es seguro)
let _ = mi_funcion_que_retorna_result();
```

---

### Tests fallan con "ContractError"

**Causa:** El contrato lanzó un error que no esperabas.

**Solución:** Agrega prints para debuggear:
```rust
#[test]
fn test_debug() {
    let env = Env::default();
    
    // Activar logging
    env.budget().reset_default();
    
    // Tu test...
    
    // Ver qué salió mal
    println!("Budget usado: {:?}", env.budget());
}
```

---

## 📖 Glosario de términos

**Address:** Identificador único de una cuenta o contrato en Stellar.

**Контracttype:** Macro que marca tipos para ser usados en storage.

**Contracterror:** Macro para definir errores personalizados del contrato.

**DataKey:** Enum que organiza las keys del storage (patrón recomendado).

**Early return:** Salir de una función antes del final (ej: con `return Err(...)`).

**Instance Storage:** Storage asociado al contrato completo (configuración global).

**Ledger:** Un "bloque" en Stellar. TTL se mide en ledgers.

**Panic:** Error fatal que detiene la ejecución (evitar en producción).

**Persistent Storage:** Storage para datos críticos que deben persistir largo plazo.

**Result<T, E>:** Tipo que representa éxito (`Ok(T)`) o error (`Err(E)`).

**Option<T>:** Tipo que representa valor presente (`Some(T)`) o ausente (`None`).

**Symbol:** Tipo de string inmutable en Soroban (máx 32 chars).

**Temporary Storage:** Storage barato para cache y datos temporales.

**Trait:** "Contrato de comportamiento" - define funciones que un tipo debe implementar.

**TTL (Time To Live):** Tiempo de vida de datos en storage antes de expirar.

**WASM:** WebAssembly - formato de bytecode que ejecuta Soroban.

---

## 🎯 Patrones de código comunes

### Patrón 1: Inicialización segura

```rust
pub fn initialize(env: Env, admin: Address) -> Result<(), Error> {
    // Verificar no inicializado
    if env.storage().instance().has(&DataKey::Admin) {
        return Err(Error::YaInicializado);
    }
    
    // Guardar configuración
    env.storage().instance().set(&DataKey::Admin, &admin);
    
    // Extender TTL
    env.storage().instance().extend_ttl(100, 100);
    
    Ok(())
}
```

---

### Patrón 2: Validación en capas

```rust
pub fn transfer(env: Env, de: Address, para: Address, monto: i128) -> Result<(), Error> {
    // Capa 1: Autenticación
    de.require_auth();
    
    // Capa 2: Validaciones baratas
    if monto <= 0 {
        return Err(Error::MontoInvalido);
    }
    
    // Capa 3: Validaciones de estado (storage)
    let balance = get_balance(env.clone(), de.clone())?;
    if balance < monto {
        return Err(Error::BalanceInsuficiente);
    }
    
    // Capa 4: Ejecución
    actualizar_balances(env, de, para, monto)?;
    
    Ok(())
}
```

---

### Patrón 3: Control de acceso

```rust
fn require_admin(env: &Env, caller: Address) -> Result<(), Error> {
    let admin: Address = env.storage()
        .instance()
        .get(&DataKey::Admin)
        .ok_or(Error::NoInicializado)?;
    
    if caller != admin {
        return Err(Error::NoAutorizado);
    }
    
    Ok(())
}

pub fn funcion_admin(env: Env, caller: Address) -> Result<(), Error> {
    require_admin(&env, caller)?;
    
    // Operación privilegiada
    Ok(())
}
```

---

### Patrón 4: Lectura con default

```rust
pub fn get_balance(env: Env, usuario: Address) -> i128 {
    env.storage()
        .persistent()
        .get(&DataKey::Balance(usuario))
        .unwrap_or(0)
}
```

---

### Patrón 5: Incremento atómico

```rust
fn increment_counter(env: &Env, key: &DataKey) -> u32 {
    let contador: u32 = env.storage()
        .instance()
        .get(key)
        .unwrap_or(0);
    
    let nuevo = contador + 1;
    
    env.storage()
        .instance()
        .set(key, &nuevo);
    
    nuevo
}
```

---

## 🌟 Próximos pasos en tu aprendizaje

### Nivel actual: ✅ Completaste Clase 4
Has dominado:
- Manejo de errores profesional
- Organización de storage
- Validaciones exhaustivas
- Control de acceso básico

### Siguiente nivel: Clase 5 - Token completo
Aprenderás:
- Implementar el estándar Token de Soroban
- Funciones mint, burn, transfer
- Allowances (permisos delegados)
- Eventos del token

### Más allá: Proyectos reales
Ideas para practicar:
- Sistema de votación on-chain
- Marketplace de NFTs
- Sistema de préstamos P2P
- DAO (Organización Autónoma Descentralizada)

---

## 💬 Comunidad y soporte

### Donde encontrar ayuda:

1. **Discord de Compañeras**


2. **Telegram**
   - Q&A específicas

3. **GitHub Discussions**
    - Podes armar uno en nuestro GitHub

4. **Clase de refuerzo**
   - Sábado 18 de octubre, 18:30-19:30
   - Trae tus dudas específicas

---

## 📝 Notas finales

### Recuerda:

1. **La documentación es tu amiga:** Consulta frecuentemente los docs oficiales.

2. **Los errores son normales:** Cada error es una oportunidad de aprender.

3. **Practica, practica, practica:** La teoría sin práctica es solo conocimiento pasivo.

4. **Pregunta sin miedo:** No hay preguntas "tontas" en programación.

5. **Celebra los pequeños logros:** Cada función que funciona es un triunfo.

---

🦈⚡ **¡Sigue construyendo, Tiburona!** ⚡🦈

*"El mejor código es el que escribes después de haber cometido todos los errores."*