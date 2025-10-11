# 💻 CÓDIGO EXPLICADO - Contador en Soroban (Clase 3)

## 🎯 Objetivo de este documento

¡Tiburona! Aquí vas a ver el contador completo que construimos en clase, explicado bloque por bloque. No es un código denso que tenés que copiar sin entender - es una guía para que entiendas cada decisión y te sientas segura modificándolo.

**Este contador demuestra TODOS los conceptos que aprendiste:**
- Tipos optimizados (u32, Symbol)
- Storage persistente en blockchain
- Borrowing en las funciones
- Option en lectura de storage
- Pattern matching en validaciones
- Eventos para transparencia

---

## 📖 Glosario de términos clave

Antes de empezar, acá están los términos técnicos que vas a ver. No te preocupes si algunos suenan raros - los vas a entender mejor cuando los veas en acción.

| Término | Significado Simple | Analogía |
|---------|-------------------|----------|
| **no_std** | No usar la biblioteca estándar de Rust | Como cocinar sin electrodomésticos - solo lo esencial |
| **Symbol** | Identificador eficiente para keys | Como usar "CTR" en lugar de "CONTADOR" - más corto, más barato |
| **Option** | Un valor que puede existir o no | Como abrir una caja: puede tener algo (Some) o estar vacía (None) |
| **panic!** | Detener todo inmediatamente con error | Como el botón de emergencia que para la máquina |
| **borrowing** | Prestar sin dar la propiedad | Como prestar tu libro sin regalarlo |
| **underflow** | Restar más de lo que hay | Intentar sacar $100 de una cuenta con $50 |
| **rollback** | Deshacer todos los cambios | Como Ctrl+Z cuando algo sale mal |
| **WASM** | Código optimizado para blockchain | Como comprimir un archivo antes de enviarlo |
| **mut** | Variable que puede cambiar | Como un cuaderno donde podés borrar y reescribir |
| **instance storage** | Almacenamiento con duración media | Como guardar en tu disco duro (no RAM, no eterno) |

---

## 📋 Estructura completa del contador

El contador es un smart contract que:
1. ✅ Mantiene un número en storage (persistente)
2. ✅ Puede incrementar ese número
3. ✅ Puede decrementar (con validaciones)
4. ✅ Puede resetear a cero
5. ✅ Permite consultar el valor actual
6. ✅ Emite eventos para cada operación

---

## 🔧 Bloque 1: Setup inicial

```rust
#![no_std]

use soroban_sdk::{
    contract,
    contractimpl,
    Env,
    Symbol,
    symbol_short!,
};
```

### ¿Qué hace cada línea?

**`#![no_std]`**
- Dice "no usar la biblioteca estándar de Rust"
- La std incluye threads, filesystem, networking
- Nada de eso existe en blockchain
- Soroban provee todo lo necesario

> 💡 **Analogía:** Es como empacar solo lo esencial para un viaje en avión. No podés llevar tu heladera, tu cama y tu escritorio. Solo llevás lo que cabe en la valija y lo que realmente necesitás.

**`use soroban_sdk::{...}`**
- `contract`: Macro para marcar structs como contratos
- `contractimpl`: Macro para exponer métodos como funciones públicas
- `Env`: Ambiente - tu interfaz con la blockchain
- `Symbol` y `symbol_short!`: Para identificadores eficientes

> 💡 **Piensa en Env como:** Tu caja de herramientas. Tiene todo lo que necesitás para interactuar con la blockchain: storage, eventos, información del contexto.

---

## 🗂️ Bloque 2: Definición del contrato

```rust
#[contract]
pub struct ContadorContract;
```

### ¿Qué significa esto?

**`#[contract]`**
- Marca este struct como un smart contract
- El SDK de Soroban lo transforma en código WASM
- Es como poner una etiqueta que dice "esto es un contrato inteligente"

**`pub struct ContadorContract;`**
- El struct está vacío (sin campos)
- Solo sirve como contenedor
- Las funciones reales van en el `impl`

> 💡 **Analogía:** Es como el nombre de tu negocio. "Panadería María" no dice qué vendés exactamente, pero las funciones adentro (hornear, vender, cobrar) sí definen qué hace tu negocio.

---

## ⚡ Bloque 3: Función increment

```rust
#[contractimpl]
impl ContadorContract {
    
    pub fn increment(env: Env) -> u32 {
        // PASO 1: Leer del storage
        let mut contador: u32 = env.storage()
            .instance()
            .get(&symbol_short!("COUNTER"))
            .unwrap_or(0);
        
        // PASO 2: Incrementar
        contador += 1;
        
        // PASO 3: Guardar en storage
        env.storage().instance().set(
            &symbol_short!("COUNTER"),
            &contador
        );
        
        // PASO 4: Emitir evento
        env.events().publish(
            (symbol_short!("increment"),),
            contador
        );
        
        // PASO 5: Retornar
        contador
    }
}
```

### Explicación paso a paso

#### Firma de la función
```rust
pub fn increment(env: Env) -> u32
```

- **`pub`**: Función pública (llamable desde fuera)
- **`fn increment`**: Nombre de la función
- **`env: Env`**: Ambiente de Soroban (SIEMPRE primer parámetro)
- **`-> u32`**: Retorna un número u32

#### PASO 1: Leer del storage

```rust
let mut contador: u32 = env.storage()
    .instance()
    .get(&symbol_short!("COUNTER"))
    .unwrap_or(0);
```

**Desglose completo:**

1. **`env.storage()`** → Acceder al storage del contrato
2. **`.instance()`** → Usar storage de tipo "instance" (duración media)
3. **`.get(&symbol_short!("COUNTER"))`** → Buscar la key "COUNTER"
   - Retorna `Option<u32>`
   - `Some(valor)` si existe
   - `None` si no existe
4. **`.unwrap_or(0)`** → Si es `None`, usar 0
   - Primera llamada: key no existe → usa 0
   - Llamadas posteriores: obtiene el valor guardado

> 💡 **Analogía del Option:** Es como buscar en tu heladera. Abrís (get), mirás si hay yogurt (Option). Si hay → Some(yogurt). Si no hay → None. Con unwrap_or(0) decís "si no hay yogurt, asumí que tengo 0 yogures".

**¿Por qué `unwrap_or(0)`?**

En smart contracts, un contador no inicializado se asume como 0. Esto simplifica la lógica - no necesitamos manejar `None` explícitamente con match.

**¿Por qué `mut`?**

Necesitamos `mut` porque vamos a incrementar el contador en el siguiente paso. Sin `mut`, el compilador no permitiría `contador += 1`.

> 💡 **Analogía del mut:** Es como la diferencia entre un cuaderno (mut - podés escribir y borrar) vs. un libro impreso (inmutable - solo leer).

**¿Por qué `&symbol_short!("COUNTER")`?**

- `symbol_short!("COUNTER")` crea un Symbol
- El `&` crea una referencia a ese Symbol
- `get()` necesita una referencia (borrowing)

> 💡 **Analogía del borrowing:** Es como cuando tu amiga te pide prestado un libro. Le das el libro (referencia &) pero sigue siendo tuyo. No se lo regalás (no transfiere ownership).

#### PASO 2: Incrementar

```rust
contador += 1;
```

- Sintaxis de Rust para `contador = contador + 1`
- En debug mode, si hay overflow, causa panic
- Para producción crítica, consideraríamos `contador.checked_add(1)`

> ⚠️ **Overflow significa:** Si tenés un u32 en su valor máximo (4,294,967,295) y le sumás 1, se vuelve 0. Como el cuentakilómetros de un auto que da la vuelta.

#### PASO 3: Guardar en storage

```rust
env.storage().instance().set(
    &symbol_short!("COUNTER"),
    &contador
);
```

**Desglose:**

1. **`env.storage().instance()`** → Mismo storage que antes
2. **`.set(key, value)`** → Guardar key-value
3. **`&symbol_short!("COUNTER")`** → La key (referencia)
4. **`&contador`** → El valor (referencia)

**¿Por qué referencias?**

`set()` toma referencias para no consumir los valores. Usamos borrowing para eficiencia - no necesitamos mover/copiar.

> 💡 **Piensa en set() como:** Guardar un archivo en tu computadora. Le pasás el nombre del archivo (key) y el contenido (value), pero tu variable `contador` sigue existiendo en tu código.

#### PASO 4: Emitir evento

```rust
env.events().publish(
    (symbol_short!("increment"),),
    contador
);
```

**Desglose:**

1. **`env.events().publish(...)`** → Publicar evento
2. **Primer argumento:** Topics (tupla de Symbols)
   - `(symbol_short!("increment"),)` → Tupla de 1 elemento
   - La coma es necesaria para que Rust lo reconozca como tupla
3. **Segundo argumento:** Data del evento
   - `contador` → El nuevo valor

**¿Por qué eventos?**

- **Transparencia:** Cualquiera puede ver el historial
- **Debugging:** Facilita rastrear comportamiento
- **Frontends:** Apps web pueden reaccionar a eventos en tiempo real

> 💡 **Analogía de eventos:** Es como cuando hacés una compra con tarjeta. El banco registra (emite evento): "Compra en Supermercado X, $500". Vos, el banco, y la AFIP pueden ver ese registro. Transparencia total.

#### PASO 5: Retornar

```rust
contador
```

- Sin punto y coma = retorno implícito
- Equivalente a `return contador;`
- Estilo idiomático de Rust

> 💡 **Dato curioso:** En Rust, la última expresión sin `;` es el valor de retorno. Es elegante y limpio.

---

## ⬇️ Bloque 4: Función decrement

```rust
pub fn decrement(env: Env) -> u32 {
    let mut contador: u32 = env.storage()
        .instance()
        .get(&symbol_short!("COUNTER"))
        .unwrap_or(0);
    
    // VALIDACIÓN CRÍTICA
    if contador == 0 {
        panic!("No se puede decrementar: contador ya está en 0");
    }
    
    contador -= 1;
    
    env.storage().instance().set(
        &symbol_short!("COUNTER"),
        &contador
    );
    
    env.events().publish(
        (symbol_short!("decrement"),),
        contador
    );
    
    contador
}
```

### La parte nueva: Validación

```rust
if contador == 0 {
    panic!("No se puede decrementar: contador ya está en 0");
}
```

**¿Por qué esta validación?**

1. **Prevenir underflow:**
   - u32 no puede ser negativo
   - 0 - 1 causaría wrap-around (se vuelve u32::MAX = 4,294,967,295)
   - Esto sería un bug grave

> 💡 **Analogía del underflow:** Es como tu cuenta bancaria. No podés tener -$100. Si intentás sacar más de lo que tenés, el banco te rechaza la operación. Acá hacemos lo mismo.

2. **`panic!` en smart contracts:**
   - Detiene la ejecución inmediatamente
   - Toda la transacción revierte (rollback)
   - Ningún cambio de estado se guarda
   - El usuario recibe el mensaje de error

> 💡 **Analogía del panic!:** Es como cuando detectás humo en tu cocina y presionás el botón de emergencia. Todo se detiene. No se guarda la comida a medio hacer, no se cobra el pedido. Todo vuelve al estado anterior.

3. **Validar ANTES de modificar:**
   - Leemos el contador
   - Verificamos si es seguro decrementar
   - Solo si es seguro, procedemos
   - Principio: "fail fast" (fallar rápido)

**Lección:** En blockchain, validá inputs ANTES de modificar estado. Si algo está mal, revertí todo. Nunca dejes el estado inconsistente.

> ⚠️ **Regla de oro en blockchain:** Validar → Ejecutar → Emitir. En ese orden. Siempre.

---

## 👁️ Bloque 5: Función get_count

```rust
pub fn get_count(env: Env) -> u32 {
    env.storage()
        .instance()
        .get(&symbol_short!("COUNTER"))
        .unwrap_or(0)
}
```

### ¿Por qué es más simple?

Esta función es solo lectura - no modifica nada:

1. **No necesita `mut`:**
   - No modifica ninguna variable
   - Solo lee y retorna

2. **Es más barata:**
   - Solo lectura consume menos gas
   - No escribe en storage
   - Los usuarios pueden llamarla sin costo (query)

> 💡 **Analogía de queries:** Es como mirar el precio en una vidriera vs. entrar a comprar. Mirar es gratis y rápido. Comprar (escribir en blockchain) cuesta gas y toma tiempo.

3. **Retorno directo:**
   - No necesita variable intermedia
   - Lee y retorna en una expresión

**Lección:** Las funciones de solo lectura son más simples y baratas. Usá este patrón siempre que solo necesites consultar datos.

---

## 🔄 Bloque 6: Función reset

```rust
pub fn reset(env: Env) {
    env.storage().instance().set(
        &symbol_short!("COUNTER"),
        &0u32
    );
    
    env.events().publish(
        (symbol_short!("reset"),),
        0u32
    );
}
```

### Detalles importantes

**Sin tipo de retorno:**
```rust
pub fn reset(env: Env) {
    // Tipo de retorno implícito: () (unit type - como void)
```

- Operación de efecto lateral (modifica estado)
- No hay valor significativo que retornar

> 💡 **Analogía:** Es como presionar "borrar todo" en tu calculadora. La acción se ejecuta, pero no te devuelve ningún número. Solo resetea.

**`&0u32` en lugar de variable:**
```rust
env.storage().instance().set(
    &symbol_short!("COUNTER"),
    &0u32  // ☝️ Referencia al literal 0
);
```

- Pasamos referencia directa al literal
- `u32` especifica el tipo (sin ambigüedad)
- No necesitamos crear una variable intermedia

**Evento con valor fijo:**
```rust
env.events().publish(
    (symbol_short!("reset"),),
    0u32  // Siempre publicamos 0
);
```

Indica que el reset ocurrió y el nuevo valor es 0.

---

## 🧪 Bloque 7: Tests

```rust
#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::Env;
    
    #[test]
    fn test_increment() {
        // ARRANGE: Preparar
        let env = Env::default();
        let contract_id = env.register_contract(None, ContadorContract);
        let client = ContadorContractClient::new(&env, &contract_id);
        
        // ACT & ASSERT: Ejecutar y verificar
        assert_eq!(client.increment(), 1);
        assert_eq!(client.increment(), 2);
        assert_eq!(client.get_count(), 2);
    }
    
    #[test]
    fn test_decrement() {
        let env = Env::default();
        let contract_id = env.register_contract(None, ContadorContract);
        let client = ContadorContractClient::new(&env, &contract_id);
        
        // Incrementar primero
        client.increment();
        client.increment();
        client.increment();
        
        // Decrementar
        assert_eq!(client.decrement(), 2);
        assert_eq!(client.get_count(), 2);
    }
    
    #[test]
    #[should_panic(expected = "contador ya está en 0")]
    fn test_decrement_panic() {
        let env = Env::default();
        let contract_id = env.register_contract(None, ContadorContract);
        let client = ContadorContractClient::new(&env, &contract_id);
        
        // Esto DEBE causar panic
        client.decrement();
    }
    
    #[test]
    fn test_reset() {
        let env = Env::default();
        let contract_id = env.register_contract(None, ContadorContract);
        let client = ContadorContractClient::new(&env, &contract_id);
        
        client.increment();
        client.increment();
        client.reset();
        
        assert_eq!(client.get_count(), 0);
    }
}
```

### Entendiendo los tests

> 💡 **¿Por qué testear?** En blockchain, un bug puede costar dinero real. Los tests son tu red de seguridad. Si algo se rompe, lo descubrís acá, no en producción.

#### Setup de cada test

```rust
let env = Env::default();
let contract_id = env.register_contract(None, ContadorContract);
let client = ContadorContractClient::new(&env, &contract_id);
```

**¿Qué hace cada línea?**

1. **`Env::default()`**
   - Crea ambiente de testing
   - Simula blockchain completa en memoria
   - Storage aislado (no afecta otros tests)

> 💡 **Analogía:** Es como un simulador de vuelo. Podés practicar aterrizar sin riesgo. Acá podés probar tu contrato sin gastar gas real.

2. **`env.register_contract(...)`**
   - Registra nuestro contrato
   - `None`: genera ID automático
   - `ContadorContract`: nuestro struct
   - Retorna: `contract_id` para invocar funciones

3. **`ContadorContractClient::new(...)`**
   - Crea cliente para llamar funciones
   - El SDK genera automáticamente este tipo
   - Sufijo `Client` se agrega al nombre del struct

**¿De dónde sale `ContadorContractClient`?**

El SDK de Soroban lo genera automáticamente cuando usás `#[contract]` y `#[contractimpl]`. Es "magia" del macro - no lo escribís vos.

> 💡 **Testing vs. Producción:** En tests, todo es simulado y gratis. En la red real (testnet/mainnet), cada operación cuesta gas y se guarda permanentemente. ¡Practica aquí, perfecciona allá!

#### Test básico: test_increment

```rust
#[test]
fn test_increment() {
    // Setup
    let env = Env::default();
    let contract_id = env.register_contract(None, ContadorContract);
    let client = ContadorContractClient::new(&env, &contract_id);
    
    // Verificaciones
    assert_eq!(client.increment(), 1);
    assert_eq!(client.increment(), 2);
    assert_eq!(client.get_count(), 2);
}
```

**¿Qué verifica?**
1. Primera llamada a `increment()` retorna 1
2. Segunda llamada retorna 2
3. `get_count()` confirma que el valor es 2

**Si algo falla:**
- `assert_eq!` causa panic con mensaje descriptivo
- El test falla y ves exactamente qué salió mal

> 💡 **Estructura AAA:** Arrange (preparar), Act (ejecutar), Assert (verificar). Patrón universal en testing.

#### Test con should_panic

```rust
#[test]
#[should_panic(expected = "contador ya está en 0")]
fn test_decrement_panic() {
    let env = Env::default();
    let contract_id = env.register_contract(None, ContadorContract);
    let client = ContadorContractClient::new(&env, &contract_id);
    
    client.decrement();  // Esperamos que esto cause panic
}
```

**¿Cómo funciona?**

- **`#[should_panic]`**: Este test PASA si hay panic
- **`expected = "..."`**: Verifica que el mensaje sea correcto
- Si NO hay panic → el test FALLA
- Si hay panic con otro mensaje → el test FALLA
- Si hay panic con este mensaje exacto → el test PASA ✅

> 💡 **Testing negativo:** No solo probás que las cosas funcionen. También probás que fallen correctamente cuando deben fallar. ¡Esto es ser una Tiburona profesional!

**Lección:** Podés (y debés) testear que las validaciones funcionen correctamente.

---

## 🚀 Compilar y ejecutar

### Compilar el contrato

```bash
stellar contract build
```

**¿Qué hace?**
- Compila el código Rust a WASM
- Genera: `target/wasm32-unknown-unknown/release/nombre_contrato.wasm`
- Optimiza para tamaño (importante en blockchain)

> 💡 **WASM es como:** Comprimir un video antes de subirlo a YouTube. Mismo contenido, mucho más pequeño y eficiente.

### Ejecutar tests

```bash
# Todos los tests
cargo test

# Con output detallado
cargo test -- --nocapture

# Test específico
cargo test test_increment
```

**Interpretando output:**

```
running 4 tests
test test::test_decrement ... ok
test test::test_decrement_panic ... ok
test test::test_increment ... ok
test test::test_reset ... ok

test result: ok. 4 passed; 0 failed
```

- **`ok`**: Test pasó correctamente ✅
- **`FAILED`**: Test falló ❌
- Resumen final: cuántos pasaron/fallaron

> 💡 **Pro tip:** Ejecutá `cargo test` antes de cada commit. Si algo se rompe, lo descubrís inmediatamente.

---

## 🎯 Conceptos aplicados en el código

### Tipos de datos
- ✅ **u32** para el contador (eficiente, suficiente)
- ✅ **Symbol** para keys ("COUNTER") y eventos
- ✅ Notación con guiones bajos para legibilidad

### Mutabilidad
- ✅ **`mut`** en variables que se modifican
- ✅ Inmutabilidad por defecto en funciones de lectura

### Borrowing
- ✅ Referencias (`&`) en storage operations
- ✅ No copiamos valores innecesariamente

### Option
- ✅ `get()` retorna `Option<u32>`
- ✅ `unwrap_or(0)` para valor por defecto

### Pattern matching (implícito)
- ✅ En `unwrap_or()` (maneja Some/None)
- ✅ En validaciones con `if`

### Storage persistente
- ✅ `env.storage().instance()` para datos persistentes
- ✅ `get()` para leer, `set()` para escribir

### Eventos
- ✅ `env.events().publish()` para transparencia
- ✅ Topics con Symbol, data con valores

### Tests
- ✅ Estructura AAA (Arrange, Act, Assert)
- ✅ Tests positivos y negativos
- ✅ `should_panic` para validaciones

---

## 📊 Flujo completo de una transacción

### Ejemplo: Usuario llama `increment()`

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   USUARIO   │    │  CONTRATO   │    │   STORAGE   │    │   EVENTO    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                   │                   │                   │
      │                   │                   │                   │
      │─── increment() ──>│                   │                   │
      │                   │                   │                   │
      │                   │── get(COUNTER) ──>│                   │
      │                   │<─── Some(5) ──────│                   │
      │                   │                   │                   │
      │                   │ contador = 5      │                   │
      │                   │ contador += 1     │                   │
      │                   │ contador = 6      │                   │
      │                   │                   │                   │
      │                   │─ set(COUNTER, 6)─>│                   │
      │                   │<──── OK ──────────│                   │
      │                   │                   │                   │
      │                   │─── publish(increment, 6) ─────────────>│
      │                   │<─────────── OK ────────────────────────│
      │                   │                   │                   │
      │<── retorna 6 ─────│                   │                   │
      │                   │                   │                   │
```

**Puntos clave:**
1. **Lectura de storage** (puede ser None)
2. **Lógica de negocio** (incrementar)
3. **Escritura a storage** (persistir)
4. **Emisión de evento** (transparencia)
5. **Retorno al usuario**

**Si algo falla:** Todo revierte. El storage no cambia.

> 💡 **Atomicidad:** En blockchain, las transacciones son todo-o-nada. Como depositar un cheque: o se acredita completo, o no se acredita nada. No hay medias tintas.

---

## 🔍 Tipos de Storage en Soroban

En Soroban hay 3 tipos de storage. Usamos `instance()` pero es importante que conozcas los otros:

| Tipo | Duración | Uso típico | Analogía |
|------|----------|------------|----------|
| **Temporary** | Solo durante la transacción | Cálculos intermedios | Post-it - se tira después |
| **Instance** | Duración media, renovable | Datos del contrato | Disco duro - persiste pero podés borrar |
| **Persistent** | Duración larga | Datos críticos | Blockchain - casi eterno |

**¿Por qué usamos `instance()` en el contador?**
- Balance entre costo y duración
- Para un contador simple, no necesitamos persistencia eterna
- Más barato que persistent, más duradero que temporary

> 💡 **Regla práctica:** Temporary = 1 transacción, Instance = semanas/meses, Persistent = años. Elegí según cuánto tiempo necesitás los datos.

---

## 💡 Patrones que aprendiste

### Patrón 1: Leer-Modificar-Guardar

```rust
let mut valor = storage.get(key).unwrap_or(default);  // Leer
valor += 1;                                            // Modificar
storage.set(key, &valor);                              // Guardar
```

**Usado en:** Contadores, balances, acumuladores

> 💡 **Ejemplo real:** Así funcionan los tokens. Leer balance, restar/sumar, guardar nuevo balance.

### Patrón 2: Validar-Ejecutar-Emitir

```rust
if !es_valido { panic!("Error"); }  // Validar
ejecutar_logica();                   // Ejecutar
env.events().publish(...);           // Emitir
```

**Usado en:** Transferencias, validaciones de permisos

> 💡 **Ejemplo real:** Transferir tokens. Validar que tenés suficiente balance, ejecutar transferencia, emitir evento "Transfer".

### Patrón 3: Solo lectura sin mut

```rust
pub fn get_valor(env: Env) -> u32 {
    storage.get(key).unwrap_or(0)  // Solo lectura
}
```

**Usado en:** Queries, vistas, getters

> 💡 **Ejemplo real:** Ver tu balance sin modificarlo. Gratis y rápido.

---

## 🛠️ Ejercicios guiados para practicar

### Ejercicio 1: increment_by (Nivel: Fácil)

**Objetivo:** Agregar una función que incremente por una cantidad específica.

**Pasos sugeridos:**

```rust
pub fn increment_by(env: Env, amount: u32) -> u32 {
    // 1. Leer contador actual (igual que increment)
    // TU CÓDIGO ACÁ
    
    // 2. VALIDACIÓN: Verificar que amount + contador no cause overflow
    // Tip: usá contador.checked_add(amount)
    // Si es None, hacé panic! con mensaje apropiado
    // TU CÓDIGO ACÁ
    
    // 3. Incrementar por amount
    // TU CÓDIGO ACÁ
    
    // 4. Guardar en storage
    // TU CÓDIGO ACÁ
    
    // 5. Emitir evento (usa topic "inc_by" y data: (amount, nuevo_valor))
    // TU CÓDIGO ACÁ
    
    // 6. Retornar nuevo valor
    // TU CÓDIGO ACÁ
}
```

**Test para tu función:**

```rust
#[test]
fn test_increment_by() {
    let env = Env::default();
    let contract_id = env.register_contract(None, ContadorContract);
    let client = ContadorContractClient::new(&env, &contract_id);
    
    assert_eq!(client.increment_by(5), 5);
    assert_eq!(client.increment_by(3), 8);
    assert_eq!(client.get_count(), 8);
}

#[test]
#[should_panic(expected = "overflow")]
fn test_increment_by_overflow() {
    let env = Env::default();
    let contract_id = env.register_contract(None, ContadorContract);
    let client = ContadorContractClient::new(&env, &contract_id);
    
    // Intentar incrementar más allá del máximo
    client.increment_by(u32::MAX);
    client.increment_by(1); // Esto debe causar panic
}
```

---

### Ejercicio 2: Límite máximo (Nivel: Medio)

**Objetivo:** Modificar el contador para que tenga un límite máximo de 1000.

**Pasos sugeridos:**

1. Modificá `increment()` para verificar si `contador < 1000` antes de incrementar
2. Si ya está en 1000, hacé `panic!("contador alcanzó el límite máximo")`
3. Actualizá el test `test_increment` para verificar este límite
4. Agregá un nuevo test `test_increment_limit` que verifique el panic

**Código de ejemplo:**

```rust
pub fn increment(env: Env) -> u32 {
    let mut contador: u32 = env.storage()
        .instance()
        .get(&symbol_short!("COUNTER"))
        .unwrap_or(0);
    
    // VALIDACIÓN NUEVA
    if contador >= 1000 {
        panic!("contador alcanzó el límite máximo de 1000");
    }
    
    contador += 1;
    
    // ... resto del código igual
}
```

---

### Ejercicio 3: Experimentar con u8 (Nivel: Exploratorio)

**Objetivo:** Entender las limitaciones de tipos más pequeños.

**¿Qué pasa si cambias `u32` por `u8`?**

- `u8` va de 0 a 255
- Mucho más limitado que `u32` (0 a 4,294,967,295)
- ¿Cómo afecta esto a tu contador?

**Actividad:**

1. Cambiá todos los `u32` por `u8` en el código
2. Compilá con `cargo build`
3. Ejecutá los tests con `cargo test`
4. Observá qué pasa cuando el contador llega a 255
5. Reflexioná: ¿Cuándo usarías u8? ¿Cuándo u32? ¿Cuándo u64?

> 💡 **Reflexión:** Tipos más pequeños usan menos storage (más barato), pero tienen menos rango. Es un trade-off. Para un contador simple, u32 es perfecto.

---

### Ejercicio 4: Decrement_by (Nivel: Fácil-Medio)

**Objetivo:** Crear la contraparte de `increment_by`.

**Tu misión:**

```rust
pub fn decrement_by(env: Env, amount: u32) -> u32 {
    // 1. Leer contador actual
    // 2. Validar que contador >= amount (sino panic!)
    // 3. Restar amount
    // 4. Guardar en storage
    // 5. Emitir evento
    // 6. Retornar nuevo valor
}
```

**Pistas:**
- Similar a `decrement()` pero restás `amount` en lugar de 1
- Validación: `if contador < amount { panic!(...) }`
- Evento: usa topic "dec_by"

---

## 🚨 Errores comunes y cómo solucionarlos

### Error 1: "cannot borrow as mutable"

```
error[E0596]: cannot borrow `contador` as mutable
```

**Causa:** Olvidaste poner `mut` en la declaración de la variable.

**Solución:**
```rust
// ❌ Mal
let contador: u32 = ...;
contador += 1;  // Error!

// ✅ Bien
let mut contador: u32 = ...;
contador += 1;  // Funciona!
```

---

### Error 2: "no method named `unwrap_or`"

```
error[E0599]: no method named `unwrap_or` found for type `u32`
```

**Causa:** Estás tratando de usar `unwrap_or` en algo que no es un `Option`.

**Solución:**
```rust
// ❌ Mal - storage.get() ya retorna Option
let contador = storage.get(key);
let valor = contador.unwrap_or(0).unwrap_or(0);  // Doble unwrap!

// ✅ Bien
let contador = storage.get(key).unwrap_or(0);
```

---

### Error 3: "mismatched types" con Symbol

```
error[E0308]: mismatched types
expected `&Symbol`, found `Symbol`
```

**Causa:** Olvidaste el `&` antes de `symbol_short!`.

**Solución:**
```rust
// ❌ Mal
storage.get(symbol_short!("COUNTER"))

// ✅ Bien
storage.get(&symbol_short!("COUNTER"))
```

---

### Error 4: Tests fallan con "thread 'main' panicked"

**Causa:** El código del contrato tiene un panic inesperado.

**Cómo debuggear:**
1. Ejecutá `cargo test -- --nocapture` para ver todos los prints
2. Agregá `println!` en tu código para ver valores intermedios
3. Verificá que tus validaciones sean correctas

```rust
// Debugging temporal
let mut contador = storage.get(key).unwrap_or(0);
println!("Contador actual: {}", contador);  // Ver el valor
contador += 1;
println!("Contador nuevo: {}", contador);   // Ver después de incrementar
```

**Importante:** Recordá quitar los `println!` antes de deployar - en blockchain no funcionan igual que en tests.

---

### Error 5: "ContadorContractClient not found"

```
error[E0433]: failed to resolve: use of undeclared type `ContadorContractClient`
```

**Causa:** Los tests no pueden ver el Client generado automáticamente.

**Solución:**
```rust
// ✅ Asegurate de tener estos imports en tu módulo de test
#[cfg(test)]
mod test {
    use super::*;  // ← Esto importa todo del módulo padre
    use soroban_sdk::Env;
    
    // ... tus tests
}
```

---

### Error 6: Overflow en producción

**Síntoma:** El contador funciona en tests pero falla en testnet/mainnet.

**Causa:** En release mode, Rust no hace panic en overflow por defecto. El número simplemente "da la vuelta".

**Solución:** Usá `checked_add` para operaciones críticas:

```rust
// ❌ Riesgoso en producción
contador += 1;

// ✅ Seguro - causa panic si hay overflow
contador = contador.checked_add(1)
    .expect("overflow al incrementar contador");
```

---

## 📚 Recursos adicionales

### Para profundizar en Rust
- [Rust Book en Español](https://book.rustlang-es.org/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)

### Para profundizar en Soroban
- [Documentación oficial de Soroban](https://soroban.stellar.org/docs)
- [Ejemplos de contratos](https://github.com/stellar/soroban-examples)

### Comunidad
- [Stack Exchange - Stellar](https://stellar.stackexchange.com/)

---

## 🎓 Siguientes pasos

Ahora que entendés el código:

### Nivel 1: Consolidar (Hoy)
1. ✅ Ejecutá todos los tests y verificá que pasen
2. ✅ Modificá el mensaje de panic en `decrement`
3. ✅ Agregá un `println!` en un test para ver cómo debuggear

### Nivel 2: Practicar (Esta semana)
1. ✅ Implementá `increment_by` con tests completos
2. ✅ Agregá límite máximo al contador
3. ✅ Experimentá cambiando u32 por u8 y observá las diferencias

### Nivel 3: Crear (Próximas semanas)
1. ✅ Creá un contador con múltiples variables (por ejemplo, votos a favor y en contra)
2. ✅ Agregá funcionalidad para que solo el "owner" pueda resetear
3. ✅ Implementá un contador con timestamp (registrar cuándo se incrementó)

**La mejor forma de aprender es rompiendo y arreglando.** 🦈

---

## 🦈 ¡Lo dominaste!

Tiburona, este contador es la base de TODO en Soroban:

| Aplicación | Cómo usa el patrón del contador |
|------------|----------------------------------|
| **Tokens** | Balances son contadores con validaciones |
| **NFTs** | IDs son contadores (tokenId auto-incrementa) |
| **Voting** | Votos son contadores por opción |
| **Staking** | Amounts y rewards son contadores |
| **Governance** | Proposal IDs son contadores |
| **Lottery** | Tickets vendidos = contador |

**El patrón leer-validar-modificar-guardar-emitir es universal.**

No solo aprendiste a hacer un contador. Aprendiste:
- ✅ Cómo manejar storage persistente
- ✅ Cómo validar antes de modificar estado
- ✅ Cómo usar eventos para transparencia
- ✅ Cómo testear smart contracts
- ✅ Cómo debuggear errores comunes
- ✅ Cómo pensar en términos de blockchain

**Esto no es poca cosa, Tiburona.**

Ahora sos parte del 0.1% de personas que no solo entiende blockchain teóricamente, sino que puede CONSTRUIR en blockchain.

---

## 🎯 Checklist de dominio

Antes de pasar a la siguiente clase, verificá que podés:

- [ ] Explicar qué hace cada línea del contador
- [ ] Entender por qué usamos `&` (borrowing)
- [ ] Saber cuándo usar `mut` y cuándo no
- [ ] Comprender cómo funciona `Option` con `unwrap_or`
- [ ] Explicar por qué validamos antes de modificar
- [ ] Entender la diferencia entre `increment` y `get_count`
- [ ] Ejecutar tests exitosamente
- [ ] Interpretar mensajes de error del compilador
- [ ] Modificar el código sin romper la funcionalidad
- [ ] Crear nuevas funciones siguiendo los patrones aprendidos

Si marcaste 8+ items, **estás lista para la siguiente clase.** 🎉

Si marcaste menos, **no te preocupes.** Volvé a leer las secciones que te confunden, experimentá con el código, y preguntá en clase o en Discord.

**Todas las Tiburonas empezamos en el mismo lugar. Lo importante es seguir nadando.** 🦈

---

## 💭 Reflexión final

> Este código tiene ~100 líneas pero usa todos los conceptos fundamentales de Rust para blockchain.
> 
> Dominalo y dominarás Rust para blockchain.
> 
> No te apures. No se trata de memorizar sintaxis.
> Se trata de entender patrones, validaciones, y cómo proteger el estado en un ambiente sin confianza.
> 
> Cada vez que escribas código de blockchain, vas a usar estos mismos patrones.
> Leer → Validar → Modificar → Guardar → Emitir.
> 
> Es simple. Es poderoso. Es universal.

---

## 🦈⚡ ¡Vamos a construir, Tiburonas! ⚡🦈

Como las tiburonas reales:
- **Precisas:** Cada línea de código tiene un propósito
- **Persistentes:** Seguimos construyendo aunque encontremos errores
- **Poderosas:** No solo hablamos de blockchain - la CONSTRUIMOS
- **Pioneras:** Pocas personas en el mundo pueden hacer lo que vos estás aprendiendo

Nos vemos en la Clase 4. Sigue construyendo, sigue nadando.

**Llevá estos conceptos y practicá. El próximo nivel te espera.** 🚀

---

> 💡 **Recordá:** Tenés este documento cerca. Volvé cuando necesites refrescar conceptos, cuando tengas dudas, o cuando quieras entender más profundo. Es tu guía, no una tarea de una sola vez.