# 🦈 PASO A PASO - Rust Esencial para Soroban

## 🎯 Objetivo de este documento

Este es tu guía completa para entender Rust desde cero. Aquí vas a aprender los conceptos fundamentales que necesitás para escribir smart contracts seguros en Soroban.

**No tengas prisa.** Rust piensa diferente a otros lenguajes que quizás conozcas (como JavaScript o Python). Eso es bueno - es lo que lo hace perfecto para blockchain. Vamos a ir paso a paso, con ejemplos claros.

**💡 Los ejercicios prácticos están al final del documento** para que puedas practicar después de leer todos los conceptos.

---

## 🌟 ¿Por qué Rust para Soroban?

### Rust es diferente (y eso es bueno)

Si venís de JavaScript, Python o Java, Rust va a parecer extraño al principio. Rust te hace pensar en cosas que otros lenguajes ocultan: ¿quién "posee" este dato? ¿Puede modificarse? ¿Qué pasa cuando termino de usarlo?

**¿Por qué esta "molestia"?**

En blockchain, estás manejando **dinero real**. Un pequeño error puede significar:
- 💸 Tokens que desaparecen
- 🔓 Fondos bloqueados para siempre
- 🐛 Vulnerabilidades que otros pueden explotar

**Ejemplo real:** En 2016, un contrato de Ethereum llamado "The DAO" perdió $60 millones de dólares debido a bugs de memoria y manejo de números. Rust previene estos errores ANTES de que tu código se ejecute.

### Lo que vas a lograr hoy

Al terminar este documento, vas a poder:

✅ **Entender mutabilidad** - Por qué algunas variables pueden cambiar y otras no  
✅ **Trabajar con números grandes** - Balances de tokens sin miedo a overflow  
✅ **Elegir el tipo correcto** - Symbol vs String, u32 vs u128  
✅ **Dominar ownership** - El concepto que hace a Rust único  
✅ **Usar borrowing** - Prestar datos sin copiarlos innecesariamente  
✅ **Manejar errores** - Option y Result para código robusto  
✅ **Entender el entorno Soroban** - Qué es `Env` y por qué lo necesitamos

---

## 📚 Glosario completo (consultá cuando necesites)

Estos son TODOS los términos que vas a encontrar. No necesitás memorizarlos - simplemente volvé acá cuando veas algo que no entendés:

| Término | Qué significa | Ejemplo simple |
|---------|---------------|----------------|
| **Stack** | Memoria rápida y ordenada donde se guardan datos pequeños | Como una pila de platos: agregas arriba, sacas arriba |
| **Heap** | Memoria flexible donde se guardan datos grandes o variables | Como un almacén: guardas cosas de cualquier tamaño |
| **Compile-time** | Cuando el compilador revisa tu código ANTES de ejecutarlo | Rust detecta errores antes de que el código corra |
| **Runtime** | Cuando tu código se está ejecutando en la blockchain | Lo que pasa después de desplegar el contrato |
| **Data race** | Error donde dos partes modifican el mismo dato simultáneamente | Como dos personas editando el mismo documento a la vez |
| **Overflow** | Cuando un número es demasiado grande para su tipo | 255 + 1 en u8 = problema (255 es el máximo) |
| **Underflow** | Cuando un número se vuelve negativo cuando no debería | 0 - 1 en u32 = problema (no puede ser negativo) |
| **Mut** | Abreviación de "mutable" - que puede cambiar | `let mut x = 5` permite cambiar x después |
| **Move** | Transferir ownership de una variable a otra | Después del move, la variable original no es válida |
| **Copy** | Duplicar un valor (números pequeños) | Ambas variables quedan válidas |
| **Reference** | Apuntar a un valor sin tomar ownership | `&x` crea una referencia a x |
| **Borrow** | Prestar temporalmente acceso a un valor | Como prestar un libro de la biblioteca |
| **Panic** | Detener la ejecución inmediatamente con un error | Todo revierte, como cancelar una transacción |
| **Unwrap** | Extraer valor de Option/Result (peligroso si es None/Err) | Puede causar panic si no hay valor |
| **Env** | El entorno de Soroban que provee acceso al blockchain | Storage, eventos, criptografía |
| **Symbol** | Identificador fijo optimizado (máx 10 caracteres) | Keys de storage, nombres de eventos |
| **Macro** | Código que genera código en compile-time | `symbol_short!()` es una macro |

**💡 Tip:** Marcá esta sección. Vas a volver a consultarla varias veces. Es totalmente normal.

---

## 🔧 Verificación técnica rápida

Antes de profundizar en conceptos, asegurate de que tu entorno funciona:

```bash
# Verificar Rust
rustc --version
# Esperado: rustc 1.70.0 o superior

# Verificar Cargo
cargo --version
# Esperado: cargo 1.70.0 o superior

# Verificar Stellar CLI
stellar --version
# Esperado: stellar 20.0.0 o superior
```

Si algo falla, revisá las instrucciones de instalación de la Clase 1. ✅

---

## 📍 Veamos este código:

```rust
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
```

**Hoy vas a entender cada símbolo:**
- ¿Qué es `mut` y por qué es necesario?
- ¿Qué es `Env` y por qué lo necesitamos?
- ¿Por qué `u32` en lugar de simplemente "número"?
- ¿Qué hace ese `&` antes de `symbol_short!`?
- ¿Qué significa `unwrap_or(0)` y por qué lo usamos?
- ¿Por qué necesitamos `&contador` en el set?
- ¿Qué hacen los eventos y por qué los emitimos?

Al final de este documento, todas estas preguntas tendrán respuestas claras. 🎓

> 📝 **Nota:** Este es el mismo código que analizaremos en detalle en `03-CODIGO-EXPLICADO.md`

---

## 🌐 PARTE 0: Entendiendo el Entorno Soroban

### ¿Qué es `Env` y por qué lo necesitamos?

Antes de empezar con Rust, necesitás entender algo específico de Soroban: **`Env`** (Environment).

**`Env` es el contexto del blockchain** que provee acceso a:

```
Env (Environment)
│
├─ 💾 Storage → Almacenamiento persistente
│   └─ Guardar y leer datos que sobreviven entre transacciones
│
├─ 📢 Eventos → Emitir notificaciones
│   └─ Publicar cambios que apps externas pueden escuchar
│
├─ 🔐 Criptografía → Firmas y verificaciones
│   └─ Validar identidades y permisos
│
└─ 🧠 Memoria dinámica (Heap)
    └─ Crear String, Vec, y otras estructuras variables
```

### ¿Por qué String y Vec necesitan `&env`?

Cuando creamos un `String` o `Vec`, necesitamos `&env` porque:

1. **Viven en el heap** (memoria dinámica)
2. **Soroban maneja la memoria** a través del entorno blockchain
3. **No hay allocator estándar** en WASM (el formato de los contratos)

**Ejemplo:**

```rust
// ❌ Esto NO funciona en Soroban:
let texto = String::from("hola");  // String::from no existe

// ✅ Esto SÍ funciona:
let texto = String::from_str(&env, "hola");
//                          ^^^^
//                          Necesita el entorno
```

**Regla simple:** Si una función de Soroban pide `&env`, simplemente pasáselo. Es la forma en que Soroban maneja recursos del blockchain.

---

## 🔐 PARTE 1: Mutabilidad - La Primera Diferencia

### Por qué Rust piensa diferente

En JavaScript o Python, podés hacer esto sin pensar:

```javascript
// JavaScript
let x = 5;
x = 6;  // ✅ Funciona sin problema
```

En Rust, esto NO funciona:

```rust
// Rust
let x = 5;
x = 6;  // ❌ ERROR: cannot assign twice to immutable variable
```

**¿Por qué Rust "se queja"?**

Porque **Rust protege tus datos por defecto**. Si una variable puede cambiar accidentalmente, pueden pasar cosas malas. En blockchain, esto puede significar balances que cambian sin querer, o tokens que desaparecen.

### La regla fundamental

```rust
let x = 5;      // Inmutable por defecto (NO puede cambiar)
// x = 6;       // ❌ ERROR

let mut y = 5;  // Mutable explícito (SÍ puede cambiar)
y = 6;          // ✅ OK
```

**La palabra `mut` significa:** "Sé que esta variable va a cambiar, y lo estoy haciendo a propósito."

### Analogía simple

Pensá en tus apuntes:

- **`let x`** es como escribir con **lapicera** → No podés borrarlo después
- **`let mut x`** es como escribir con **lápiz** → Podés borrarlo y cambiar

En Rust, por defecto todo es "lapicera" (inmutable). Si necesitás "lápiz" (mutable), lo decís explícitamente con `mut`.

### Por qué importa en blockchain

```rust
// Imaginá un balance de tokens
let balance = 1_000_000;  // Sin mut
// balance = 0;  // ❌ ERROR: el compilador te protege

// Si realmente necesitás modificarlo:
let mut balance = 1_000_000;  // Con mut
balance -= 100;  // ✅ OK, porque dijiste explícitamente que puede cambiar
```

**Regla de oro:** Solo usá `mut` cuando realmente necesités modificar la variable. Menos `mut` = código más seguro.

---

## 💎 PARTE 2: Tipos de Datos - Eligiendo Correctamente

### Por qué los tipos importan en blockchain

En JavaScript, podés escribir:

```javascript
let numero = 5;  // JavaScript decide automáticamente el tipo
```

En Rust, especificás el tipo:

```rust
let numero: u32 = 5;  // Tipo explícito: u32
```

**¿Por qué tanta precisión?**

Porque en blockchain:
1. **Storage cuesta dinero** (gas fees) - cada byte cuenta
2. **Overflow puede ser catastrófico** - números demasiado grandes = bugs
3. **Seguridad es crítica** - el tipo correcto previene errores

### 2.1 Números Enteros - Tu Herramienta Principal

#### Entendiendo los tipos numéricos

Rust tiene muchos tipos de números. Los más importantes para Soroban:

| Tipo | Rango | Cuándo usarlo |
|------|-------|---------------|
| `u8` | 0 a 255 | IDs pequeños, flags, estados (máx 255) |
| `u32` | 0 a 4,294,967,295 | Contadores, IDs medianos, cantidades normales |
| `u128` | 0 a 340 undecillones | **Balances de tokens** (el más importante) |

**La "u" significa "unsigned" (sin signo) = solo números positivos o cero.**

#### Visualización de rangos

```
u8:   0 ━━━━━━━━━━━━━━━━━━━━━━━ 255
      |_________________________|
           256 valores posibles

u32:  0 ━━━━━━━━━━━━━━━━━━━━━━━ 4,294,967,295
      |____________________________|
          4 mil millones de valores

u128: 0 ━━━━━━━━━━━━━━━━━━━━━━━ 340 undecillones
      |_____________________________|
      Suficiente para cualquier cantidad imaginable
```

#### u128 - EL MÁS IMPORTANTE PARA SOROBAN

```rust
let balance: u128 = 1_000_000_0000000;
```

**Desglose de este número:**
```
1_000_000   = un millón de tokens
0000000     = siete decimales (estándar de Stellar)
Total       = 1,000,000.0000000 tokens
```

**¿Por qué u128?**
- Suficientemente grande para cualquier cantidad de tokens
- Previene overflow en sumas/restas normales
- Es el estándar en Soroban para balances

#### u32 - Para contadores e IDs

```rust
let contador: u32 = 100;
let id_producto: u32 = 50_450;
```

**¿Cuándo usar u32?**
- Contadores que no van a pasar de 4 mil millones
- IDs de productos, usuarios, transacciones
- Índices en listas
- Usa menos espacio que u128 (más eficiente)

#### Notación con guiones bajos

```rust
let un_millon: u128 = 1_000_000;      // Más fácil de leer
let mil: u32 = 1000;                   // También válido
let supply: u128 = 1_000_000_0000000; // 1M tokens con decimales
```

**Los guiones bajos son SOLO para humanos.** El compilador los ignora.  
`1_000_000` y `1000000` son exactamente lo mismo.

### 2.2 Operaciones Seguras - Evitando Catástrofes

#### El problema del overflow

**En otros lenguajes (como Solidity antiguo):**

```solidity
// Solidity pre-0.8.0
uint8 x = 255;
x = x + 1;  // Vuelve a 0 silenciosamente 💀
            // Los tokens DESAPARECEN
```

**Esto causó pérdidas millonarias en contratos reales.**

#### La solución de Rust: checked_*

```rust
let a: u8 = 255;  // Máximo valor de u8
let resultado = a.checked_add(1);  // Intenta sumar 1

match resultado {
    Some(valor) => println!("Suma: {}", valor),
    None => println!("¡Overflow! No se puede sumar"),
}
// Output: "¡Overflow! No se puede sumar"
```

**¿Qué pasó aquí?**

1. `checked_add(1)` intenta sumar 1 a 255
2. Como 256 no cabe en u8, retorna `None`
3. El `match` nos OBLIGA a manejar ambos casos
4. **No hay overflow silencioso** - debemos decidir qué hacer

#### Ejemplo en Soroban: Actualizar balance

```rust
pub fn depositar(env: Env, cuenta: Address, monto: u128) -> Result<(), String> {
    // Leer balance actual
    let balance_actual = env.storage()
        .instance()
        .get(&cuenta)
        .unwrap_or(0);
    
    // Sumar de forma segura
    let nuevo_balance = balance_actual
        .checked_add(monto)
        .ok_or("Overflow: balance demasiado grande")?;
    
    // Guardar nuevo balance
    env.storage().instance().set(&cuenta, &nuevo_balance);
    
    Ok(())
}
```

**Lección:** En smart contracts, SIEMPRE usá `checked_*` para operaciones con dinero.

---

### 2.3 String vs Symbol - Ahorrando Gas Fees

#### El problema del storage costoso

En blockchain, **cada byte guardado cuesta dinero** (gas fees).

Por eso Soroban tiene dos tipos para texto:
- **String:** Flexible pero costoso
- **Symbol:** Optimizado y barato

#### Tabla comparativa completa

| Característica | String | Symbol |
|---------------|--------|---------|
| **Tamaño** | Variable (crece según contenido) | Fijo (8 bytes siempre) |
| **Caracteres** | Cualquier UTF-8 (emojis, acentos) | Solo ASCII: a-z, A-Z, 0-9, _ |
| **Longitud máxima** | Ilimitada (limitada por gas) | **10 caracteres** |
| **Creación** | Runtime: `String::from_str(&env, "...")` | Compile-time: `symbol_short!("...")` |
| **Costo storage** | ~23 bytes + contenido | ~8 bytes fijos |
| **Validación** | En runtime | En compile-time |
| **Uso típico** | Mensajes de usuarios | Keys, identificadores, eventos |

### ¿Qué es `symbol_short!`?

**`symbol_short!` es una macro de Soroban** que convierte texto fijo en un tipo `Symbol` en compile-time.

**Esto asegura que:**
- Solo se usen hasta 10 caracteres
- El texto sea válido (solo ASCII alfanumérico + `_`)
- El costo de almacenamiento sea mínimo (~8 bytes)
- Los errores se detecten al compilar, no al ejecutar

**Ejemplo de validación:**

```rust
symbol_short!("balance")     // ✅ OK: 7 caracteres, ASCII válido
symbol_short!("my_counter")  // ✅ OK: 10 caracteres exactos
symbol_short!("COUNTER")     // ✅ OK: mayúsculas válidas

// symbol_short!("este_nombre_muy_largo")  
// ❌ ERROR EN COMPILACIÓN: más de 10 caracteres

// symbol_short!("holá")  
// ❌ ERROR: acento no es ASCII
```

#### Ejemplos prácticos

**Symbol - Para identificadores fijos:**

```rust
// Keys de storage - SIEMPRE usar Symbol
let key_balance = symbol_short!("balance");
let key_owner = symbol_short!("owner");

// Nombres de eventos - SIEMPRE usar Symbol
let evento_transfer = symbol_short!("transfer");
let evento_mint = symbol_short!("mint");

// Estados del contrato
let estado_activo = symbol_short!("active");
```

**String - Para texto variable del usuario:**

```rust
// Mensajes que vienen del usuario
let mensaje = String::from_str(
    &env, 
    "Transferencia completada exitosamente"
);

// Nombres de tokens (pueden ser largos)
let nombre_token = String::from_str(
    &env, 
    "Mi Token Increíble 🚀"  // Emojis OK en String
);
```

**Comparación de costos:**

```
Guardar Symbol("balance"): ~8 bytes
Guardar String("balance"): ~30 bytes
AHORRO: 73% usando Symbol ✨
```

---

### 2.4 Vec - Listas Dinámicas

`Vec` (vector) es una lista ordenada que puede crecer o achicarse.

**Analogía:** Una caja con compartimientos numerados (0, 1, 2, 3...) que crece automáticamente si necesitás más espacio.

#### Operaciones básicas

```rust
use soroban_sdk::Vec;

// Crear Vec vacío
let mut lista: Vec<u32> = Vec::new(&env);
//     ^^^ mut necesario para modificar

// Agregar elementos
lista.push_back(10);
lista.push_back(20);
lista.push_back(30);

// Acceder por índice
let primero = lista.get(0);   // Some(10)
let decimo = lista.get(10);   // None - no existe

// Obtener tamaño
let longitud = lista.len();   // 3

// Iterar
for numero in lista.iter() {
    // Hacer algo con cada número
}
```

#### Ejemplo en Soroban: Lista de votantes

```rust
pub fn registrar_votante(env: Env, votante: Address) -> Result<(), String> {
    // Leer lista actual de votantes
    let mut votantes: Vec<Address> = env.storage()
        .instance()
        .get(&symbol_short!("voters"))
        .unwrap_or(Vec::new(&env));
    
    // Verificar si ya está registrado
    for v in votantes.iter() {
        if v == votante {
            return Err("Votante ya registrado".to_string());
        }
    }
    
    // Agregar nuevo votante
    votantes.push_back(votante.clone());
    
    // Guardar lista actualizada
    env.storage().instance().set(&symbol_short!("voters"), &votantes);
    
    // Emitir evento
    env.events().publish(
        (symbol_short!("voter_add"),),
        votante
    );
    
    Ok(())
}
```

---

### 2.5 Struct y Enum - Vista Práctica

> **📝 Nota:** Profundizaremos en la **Clase 4**. Aquí una introducción práctica.

#### Struct - Agrupar datos relacionados

**En lugar de variables sueltas:**
```rust
let nombre = String::from_str(&env, "Alice");
let balance = 1_000_000u128;
let activo = true;
```

**Usamos un struct:**
```rust
#[contracttype]
pub struct Usuario {
    pub nombre: String,
    pub balance: u128,
    pub activo: bool,
}

// Crear instancia
let alice = Usuario {
    nombre: String::from_str(&env, "Alice"),
    balance: 1_000_000,
    activo: true,
};

// Acceder a campos
let nombre = alice.nombre;
let balance = alice.balance;
```

#### Ejemplo en Soroban: Almacenar usuarios

```rust
pub fn guardar_usuario(env: Env, address: Address, usuario: Usuario) {
    env.storage().instance().set(&address, &usuario);
}

pub fn obtener_usuario(env: Env, address: Address) -> Option<Usuario> {
    env.storage().instance().get(&address)
}
```

**Ventaja:** Toda la información del usuario está agrupada y se guarda/lee como una unidad.

#### Enum - Uno de varios estados

```rust
#[contracttype]
pub enum ContractStatus {
    Active,
    Paused,
    Finalized,
}

let estado = ContractStatus::Active;

// Pattern matching para manejar cada caso
match estado {
    ContractStatus::Active => println!("Funcionando"),
    ContractStatus::Paused => println!("En pausa"),
    ContractStatus::Finalized => println!("Terminado"),
}
```

---

## 🧠 PARTE 3: Entendiendo la Memoria

### Stack vs Heap - Analogía simple

Pensá en una oficina:

**Stack (Pila):**
- Como una pila de bandejas: agregás arriba, sacás arriba
- MUY rápido
- Tamaño fijo
- Guarda: números, booleanos, referencias

**Heap (Montón):**
- Como un almacén con estanterías
- Más lento que el stack
- Tamaño variable
- Guarda: String, Vec, structs grandes

```
STACK (rápido):
┌─────────┐
│ x = 5   │ ← 4 bytes
├─────────┤
│ y = 10  │ ← 4 bytes
└─────────┘

HEAP (flexible):
┌────────────────┐
│ "Hola mundo"   │ ← String variable
├────────────────┤
│ [1, 2, 3, ...] │ ← Vec que crece
└────────────────┘
```

**Por qué importa:** Ownership maneja el heap automáticamente, sin garbage collector.

---

## 🔐 PARTE 4: Ownership - El Concepto Único de Rust

### Por qué Ownership es revolucionario

**Ownership es el concepto MÁS IMPORTANTE de Rust.**

**El problema que resuelve:**

```javascript
// JavaScript - sin ownership
let datos = [1, 2, 3];
let copia1 = datos;
let copia2 = datos;
copia1.push(4);
// ¿Qué valor tiene datos? ¿y copia2?
// Difícil de rastrear, fácil de crear bugs
```

**La solución de Rust:**

```rust
// Rust - con ownership
let datos = vec![1, 2, 3];
let movido = datos;
// println!("{:?}", datos); // ❌ ERROR: datos ya no es válido
```

El compilador te dice: "No podés usar `datos` porque ya no sos el dueño".

### Las tres reglas fundamentales

```
1. Cada valor tiene exactamente un "dueño" (owner)
2. Solo puede haber un owner a la vez
3. Cuando el owner sale de scope, el valor se destruye automáticamente
```

**Analogía del juguete:**

1. **Regla 1:** Solo VOS sos el dueño del juguete
2. **Regla 2:** Si se lo das a un amigo, YA NO es tuyo - es de él
3. **Regla 3:** Cuando tu amigo se va, se lleva el juguete

### Entendiendo "Move" (Movimiento)

**Ejemplo simple:**

```rust
let s1 = String::from("hola");
let s2 = s1;  // MOVE

// println!("{}", s1);  // ❌ ERROR
println!("{}", s2);     // ✅ OK
```

**Visualización:**

```
ANTES:
s1 → "hola"

DESPUÉS:
s1 → ✗ (inválido)
s2 → "hola"
```

### Copy vs Move

**Tipos que se COPIAN:**
```rust
let x: u32 = 5;
let y = x;  // COPY

println!("{}, {}", x, y);  // ✅ Ambos funcionan
```

**Tipos que se MUEVEN:**
```rust
let s1 = String::from("hola");
let s2 = s1;  // MOVE

// println!("{}", s1);  // ❌ ERROR
```

| Característica | Copy (números) | Move (String, Vec) |
|---------------|----------------|-------------------|
| Después de asignar | Ambas válidas | Solo la nueva válida |
| Ubicación | Stack | Heap |
| Costo | Barato | Costoso si se copia |

---

## 🔄 PARTE 5: Borrowing - Prestar Sin Dar Ownership

### La analogía del libro

**Borrowing** = Prestar un libro de la biblioteca:
- Podés leerlo
- Podés escribir notas (si tenés permiso)
- NO te convertís en el dueño
- Cuando terminás, lo devolvés

### Los dos tipos de borrowing

1. **`&T`** - Referencia inmutable (solo lectura)
2. **`&mut T`** - Referencia mutable (lectura y escritura)

### Referencias inmutables (&)

```rust
fn calcular_longitud(s: &String) -> usize {
    s.len()  // Solo lee
}

let texto = String::from("hola");
let longitud = calcular_longitud(&texto);
println!("{} tiene {} caracteres", texto, longitud);
// texto SIGUE siendo válido
```

**Múltiples referencias inmutables:**

```rust
let texto = String::from("rust");
let r1 = &texto;
let r2 = &texto;
let r3 = &texto;
// ✅ Todas funcionan simultáneamente
```

### Referencias mutables (&mut)

```rust
fn agregar_mundo(s: &mut String) {
    s.push_str(" mundo");
}

let mut texto = String::from("hola");
agregar_mundo(&mut texto);
println!("{}", texto);  // "hola mundo"
```

**Solo UNA a la vez:**

```rust
let mut x = String::from("test");
let r1 = &mut x;
// let r2 = &mut x;  // ❌ ERROR
```

**¿Por qué?** Previene **data races** (modificación simultánea).

### Tabla comparativa

| Característica | &T | &mut T |
|---------------|-----|--------|
| Puede leer | ✅ Sí | ✅ Sí |
| Puede modificar | ❌ No | ✅ Sí |
| Cuántas simultáneas | Infinitas | Solo UNA |
| Variable debe ser mut | No necesario | SÍ necesario |

### Guía de decisión

```
¿Qué necesito hacer?

Solo LEER
   └→ Usar &T
      fn leer(dato: &String)

MODIFICAR
   └→ Usar &mut T
      fn modificar(dato: &mut Vec<u32>)

CONSUMIR
   └→ Tomar ownership (T)
      fn guardar(dato: String)
```

---

## 🎯 PARTE 6: Pattern Matching

### Por qué es poderoso

**En otros lenguajes:**
```javascript
// Fácil olvidar casos
if (estado === "active") { ... }
else if (estado === "paused") { ... }
// ¿Y si es "finalized"? 💀
```

**En Rust:**
```rust
// El compilador OBLIGA a manejar todos
match estado {
    Status::Active => ...,
    Status::Paused => ...,
    Status::Finalized => ...,
    // Si falta uno: ERROR
}
```

### Match con valores y rangos

```rust
fn categorizar_balance(balance: u128) -> String {
    match balance {
        0 => "Cuenta vacía".to_string(),
        1..=1_000_000 => "Balance bajo".to_string(),
        1_000_001..=1_000_000_000 => "Balance medio".to_string(),
        _ => "Balance alto".to_string(),
    }
}
```

---

### Option - El reemplazo seguro de "null"

**El problema de null:**
```javascript
let usuario = encontrarUsuario(999);  // puede ser null
console.log(usuario.nombre);          // 💀 CRASH
```

**La solución de Rust:**
```rust
pub fn buscar_usuario(id: u32) -> Option<String> {
    match id {
        1 => Some("Alice".to_string()),
        2 => Some("Bob".to_string()),
        _ => None,
    }
}
```

**Manejar Option:**

```rust
let resultado = buscar_usuario(999);

match resultado {
    Some(nombre) => println!("Usuario: {}", nombre),
    None => println!("No existe"),
}
```

**Atajos útiles:**

```rust
// unwrap_or - valor por defecto
let nombre = buscar_usuario(999).unwrap_or("Desconocido".to_string());
```

### ⚠️ El peligro de unwrap() en producción

**unwrap() es PELIGROSO en smart contracts:**

```rust
// ❌ MAL: Usar unwrap en producción
let balance = env.storage()
    .instance()
    .get(&symbol_short!("balance"))
    .unwrap();  // Si no existe: PANIC!
                // La transacción falla
                // El usuario pierde gas
```

**✅ BIEN: Manejar con unwrap_or o match**

```rust
// Opción 1: unwrap_or con valor por defecto
let balance = env.storage()
    .instance()
    .get(&symbol_short!("balance"))
    .unwrap_or(0);  // Si no existe, asumimos 0

// Opción 2: match explícito
let balance = match env.storage().instance().get(&symbol_short!("balance")) {
    Some(b) => b,
    None => {
        // Decidir qué hacer cuando no existe
        0
    }
};
```

**Por qué importa en blockchain:**

- Un `panic!` **detiene toda la transacción**
- Los cambios de estado **revierten** (rollback)
- El usuario **pierde el gas** pagado
- Es como cancelar un pago después de pagar la comisión bancaria

**Regla de oro:** NUNCA uses `unwrap()` en producción. Siempre usá `unwrap_or()`, `unwrap_or_else()`, o `match`.

---

### Result - Operaciones que pueden fallar

**Diferencia con Option:**

```
Option<T>:
├─ Some(T) → Hay un valor
└─ None → No hay valor

Result<T, E>:
├─ Ok(T) → Operación exitosa
└─ Err(E) → Operación falló (con info del error)
```

**Ejemplo:**

```rust
pub fn dividir(a: u128, b: u128) -> Result<u128, String> {
    if b == 0 {
        Err("División por cero no permitida".to_string())
    } else {
        Ok(a / b)
    }
}

// Usar Result
match dividir(10, 0) {
    Ok(resultado) => println!("Resultado: {}", resultado),
    Err(error) => println!("Error: {}", error),
}
```

---

## 📢 PARTE 7: Eventos en Soroban

### ¿Por qué usamos eventos?

Los eventos son mensajes que el contrato emite al blockchain para:

**1. Notificar a aplicaciones externas (dApps)**
- Un frontend puede escuchar eventos y actualizar la UI en tiempo real
- Ejemplo: mostrar "Transferencia completada" cuando se emite evento `transfer`

**2. Permitir indexación**
- Los exploradores de blockchain pueden rastrear todas las transferencias
- Facilita crear historial de transacciones

**3. Servir como registro auditable**
- Los eventos son permanentes e inmutables
- Cualquiera puede verificar qué pasó y cuándo

### Anatomía de un evento

```rust
env.events().publish(
    (symbol_short!("transfer"),),  // Topics (para filtrar)
    (from, to, amount)              // Data (información del evento)
);
```

**Topics vs Data:**
- **Topics:** Símbolos para filtrar eventos (indexables)
- **Data:** La información completa del evento

### Ejemplo completo: Evento de transferencia

```rust
pub fn transferir(
    env: Env, 
    from: Address, 
    to: Address, 
    amount: u128
) -> Result<(), String> {
    // ... lógica de transferencia ...
    
    // Emitir evento con múltiples datos
    env.events().publish(
        (symbol_short!("transfer"),),  // Topic: tipo de evento
        (from.clone(), to.clone(), amount)  // Data: quién, a quién, cuánto
    );
    
    Ok(())
}
```

**Lo que ven las apps:**
```
Evento: transfer
From: GABC...123
To: GXYZ...789
Amount: 1000000 (10 XLM)
```

---

## 📊 Resumen Visual de Conceptos

### Mapa conceptual completo

```
RUST PARA SOROBAN
│
├─ ENTORNO
│   └─ Env → Storage, Eventos, Memoria
│
├─ MUTABILIDAD
│   ├─ let x → inmutable (default)
│   └─ let mut x → mutable (explícito)
│
├─ TIPOS DE DATOS
│   ├─ Números: u8, u32, u128
│   ├─ Texto: Symbol (fijo), String (variable)
│   ├─ Listas: Vec<T>
│   └─ Agrupación: struct, enum
│
├─ OWNERSHIP
│   ├─ Regla 1: Un owner por valor
│   ├─ Regla 2: Solo un owner a la vez
│   ├─ Regla 3: Sale de scope = destrucción
│   ├─ Copy: números (se copian)
│   └─ Move: String, Vec (se mueven)
│
├─ BORROWING
│   ├─ &T → solo leer (múltiples)
│   └─ &mut T → leer y modificar (solo una)
│
├─ PATTERN MATCHING
│   ├─ match → maneja todos los casos
│   ├─ Option<T> → Some/None
│   └─ Result<T,E> → Ok/Err
│
└─ EVENTOS
    └─ Transparencia y notificaciones
```

---

## 🚨 Errores Comunes y Soluciones

### Error 1: Olvidar `mut`

```rust
let x = 5;
x = 6; // ❌ cannot assign twice to immutable variable
```

**Solución:**
```rust
let mut x = 5; // ✅
x = 6;
```

---

### Error 2: Usar valor después de moverlo

```rust
let s1 = String::from("hola");
let s2 = s1;
println!("{}", s1); // ❌ value borrowed after move
```

**Solución - Usar referencia:**
```rust
let s1 = String::from("hola");
let s2 = &s1;  // ✅ Borrowing
println!("{}", s1); // ✅ Funciona
```

---

### Error 3: No manejar Option/Result

```rust
let valor = env.storage().instance().get(&symbol_short!("COUNTER"));
println!("{}", valor); // ❌ can't display Option<u32>
```

**Solución:**
```rust
let valor = env.storage()
    .instance()
    .get(&symbol_short!("COUNTER"))
    .unwrap_or(0); // ✅
println!("{}", valor);
```

---

### Error 4: String en lugar de Symbol

```rust
// ❌ COSTOSO
env.storage().instance().set(
    &String::from_str(&env, "COUNTER"), 
    &valor
);
```

**Solución:**
```rust
// ✅ EFICIENTE
env.storage().instance().set(
    &symbol_short!("COUNTER"),
    &valor
);
```

---

### Error 5: Múltiples &mut

```rust
let mut x = String::from("test");
let r1 = &mut x;
let r2 = &mut x; // ❌ cannot borrow as mutable more than once
```

**Solución:**
```rust
let mut x = String::from("test");
let r1 = &mut x;
println!("{}", r1);
// r1 ya no se usa

let r2 = &mut x; // ✅ OK ahora
```

---

## 🎓 Autoevaluación Rápida

Verificá que entendés:

**Entorno Soroban:**
- [ ] ¿Qué es `Env` y para qué sirve?
- [ ] ¿Por qué String y Vec necesitan `&env`?

**Mutabilidad:**
- [ ] ¿Diferencia entre `let x` y `let mut x`?
- [ ] ¿Por qué Rust prefiere inmutabilidad?

**Tipos:**
- [ ] ¿Cuándo usar u32 vs u128?
- [ ] ¿Cuándo usar Symbol vs String?
- [ ] ¿Qué es `symbol_short!`?
- [ ] ¿Qué hace `checked_add()`?

**Ownership:**
- [ ] ¿Las 3 reglas de ownership?
- [ ] ¿Qué es un "move"?
- [ ] ¿Qué tipos se copian y cuáles se mueven?

**Borrowing:**
- [ ] ¿Diferencia entre `&T` y `&mut T`?
- [ ] ¿Por qué solo una referencia mutable?

**Pattern Matching:**
- [ ] ¿Qué hace `unwrap_or(0)`?
- [ ] ¿Diferencia entre Option y Result?
- [ ] ¿Por qué NO usar `unwrap()` en producción?

**Eventos:**
- [ ] ¿Para qué sirven los eventos?
- [ ] ¿Diferencia entre topics y data?

---

## 🏋️ EJERCICIOS PRÁCTICOS

### 📝 Instrucciones

Estos ejercicios consolidan todo lo aprendido. Hacelos en orden y verificá las soluciones solo después de intentarlo.

**No tengas miedo de equivocarte** - los errores del compilador son tus maestros. 🦈

---

### Ejercicio 1: mut o no mut

Para cada caso, decidí si necesitás `mut`:

```rust
// CASO 1
let nombre = "Alice";
// Nunca cambia el nombre

// CASO 2
let edad = 25;
// Querés incrementar la edad cada año

// CASO 3
let precio_fijo = 100;
// El precio nunca cambia

// CASO 4
let contador = 0;
// Incrementás el contador con cada venta
```

<details>
<summary>👀 Ver respuestas</summary>

```rust
// CASO 1: NO necesita mut
let nombre = "Alice";

// CASO 2: SÍ necesita mut
let mut edad = 25;
edad += 1;

// CASO 3: NO necesita mut
let precio_fijo = 100;

// CASO 4: SÍ necesita mut
let mut contador = 0;
contador += 1;
```

</details>

---

### Ejercicio 2: Predecir Overflow

¿Qué imprimirá cada caso?

```rust
// CASO A
let x: u8 = 255;
match x.checked_add(1) {
    Some(valor) => println!("A: {}", valor),
    None => println!("A: Overflow"),
}

// CASO B
let y: u32 = 100;
match y.checked_sub(50) {
    Some(valor) => println!("B: {}", valor),
    None => println!("B: Underflow"),
}

// CASO C
let z: u8 = 200;
match z.checked_add(100) {
    Some(valor) => println!("C: {}", valor),
    None => println!("C: Overflow"),
}
```

<details>
<summary>👀 Ver respuestas</summary>

```
A: Overflow (255 + 1 = 256, no cabe en u8)
B: 50 (100 - 50 = 50, válido)
C: Overflow (200 + 100 = 300, no cabe en u8)
```

</details>

---

### Ejercicio 3: String vs Symbol

Para cada caso, elegí String o Symbol:

1. Key para almacenar balance en storage
2. Descripción de producto (escrita por vendedor)
3. Estado del contrato: "active", "paused", "finalized"
4. Comentario de usuario en review
5. Topic de evento de transferencia
6. Nombre de token (puede ser "Mi Token Super Largo 2024")
7. Key para almacenar owner del contrato
8. Mensaje de error personalizado

<details>
<summary>👀 Ver respuestas</summary>

1. **Symbol** - `symbol_short!("balance")` - identificador fijo
2. **String** - contenido variable del usuario
3. **Symbol** - `symbol_short!("active")` - solo 3 estados posibles
4. **String** - contenido del usuario
5. **Symbol** - `symbol_short!("transfer")` - nombre fijo
6. **String** - puede ser largo (>10 chars) y tener caracteres especiales
7. **Symbol** - `symbol_short!("owner")` - key fija
8. **String** - mensajes largos y descriptivos

</details>

---

### Ejercicio 4: Quiz de Ownership

¿Cuáles líneas causarían error?

```rust
// BLOQUE 1: String
let s1 = String::from("rust");
let s2 = s1;
// println!("{}", s1);  // Línea A - ¿Error?
println!("{}", s2);     // Línea B - ¿Error?

// BLOQUE 2: u32
let x: u32 = 10;
let y = x;
println!("{}, {}", x, y);  // Línea C - ¿Error?

// BLOQUE 3: Vec
let v1 = Vec::from([1, 2, 3]);
let v2 = v1;
// let v3 = v1;  // Línea D - ¿Error?
```

<details>
<summary>👀 Ver respuestas</summary>

- Línea A: ❌ ERROR - s1 fue movido
- Línea B: ✅ OK - s2 es el owner
- Línea C: ✅ OK - u32 se copia, ambos válidos
- Línea D: ❌ ERROR - v1 fue movido

</details>

---

### Ejercicio 5: Función con Vec

Implementá una función que cuenta cuántos números son mayores a 100:

```rust
pub fn contar_mayores(env: Env, numeros: Vec<u32>) -> u32 {
    // Tu código aquí
}

// Ejemplos:
// contar_mayores([50, 150, 200, 80]) → 2
// contar_mayores([10, 20, 30]) → 0
```

<details>
<summary>💡 Ver solución</summary>

```rust
pub fn contar_mayores(env: Env, numeros: Vec<u32>) -> u32 {
    let mut contador: u32 = 0;
    
    for numero in numeros.iter() {
        if numero > 100 {
            contador += 1;
        }
    }
    
    contador
}
```

**Explicación:**
1. Contador empieza en 0
2. Iteramos sobre cada número
3. Si es > 100, incrementamos
4. Retornamos el total

</details>

---

### Ejercicio 6: Validar cantidad

Implementá validación con Result:

```rust
pub fn validar_cantidad(cantidad: u32) -> Result<u32, String> {
    // Reglas:
    // - Si cantidad == 0: Error "Cantidad no puede ser 0"
    // - Si cantidad > 1000: Error "Cantidad máxima: 1000"
    // - Si 1 <= cantidad <= 1000: Ok(cantidad)
}
```

<details>
<summary>💡 Ver solución</summary>

```rust
pub fn validar_cantidad(cantidad: u32) -> Result<u32, String> {
    match cantidad {
        0 => Err("Cantidad no puede ser 0".to_string()),
        1..=1000 => Ok(cantidad),
        _ => Err("Cantidad máxima: 1000".to_string()),
    }
}

// Usar la validación
pub fn procesar_deposito(env: Env, cantidad: u32) {
    match validar_cantidad(cantidad) {
        Ok(monto_valido) => {
            println!("Depositando {} tokens", monto_valido);
        },
        Err(mensaje) => {
            panic!("Depósito rechazado: {}", mensaje);
        },
    }
}
```

**Pruebas:**
- `validar_cantidad(0)` → Err
- `validar_cantidad(500)` → Ok(500)
- `validar_cantidad(2000)` → Err

</details>

---

### Ejercicio 7: Corregir código ineficiente

Corregí este código usando referencias en lugar de clones:

```rust
struct TokenInfo {
    name: String,
    symbol: Symbol,
    total_supply: u128,
}

// ❌ INEFICIENTE
fn procesar_mal(info: TokenInfo) -> u128 {
    verificar_nombre(info.name.clone());
    verificar_supply(info.clone());
    info.total_supply
}

fn verificar_nombre(name: String) {
    if name.len() == 0 {
        panic!("Nombre vacío");
    }
}

fn verificar_supply(info: TokenInfo) {
    if info.total_supply == 0 {
        panic!("Supply no puede ser 0");
    }
}
```

<details>
<summary>💡 Ver solución</summary>

```rust
// ✅ EFICIENTE
fn procesar_bien(info: &TokenInfo) -> u128 {
    verificar_nombre(&info.name);
    verificar_supply(info);
    info.total_supply
}

fn verificar_nombre(name: &String) {
    if name.len() == 0 {
        panic!("Nombre vacío");
    }
}

fn verificar_supply(info: &TokenInfo) {
    if info.total_supply == 0 {
        panic!("Supply no puede ser 0");
    }
}
```

**Ahorro:** De ~120 bytes copiados a solo 16 bytes de referencias.

</details>

---

### Ejercicio 8: Transferencia de Tokens (DESAFÍO)

Implementá una función completa de transferencia que:
- Recibe: `from: Address`, `to: Address`, `amount: u128`
- Valida que `amount > 0`
- Valida que `from` tenga suficiente balance
- Usa `checked_sub` y `checked_add` para evitar overflow
- Actualiza balances en storage
- Emite evento de transferencia
- Retorna `Result<(), String>`

<details>
<summary>💡 Ver solución completa</summary>

```rust
pub fn transferir(
    env: Env,
    from: Address,
    to: Address,
    amount: u128
) -> Result<(), String> {
    // Validación 1: Amount mayor a 0
    if amount == 0 {
        return Err("El monto debe ser mayor a 0".to_string());
    }
    
    // Leer balance del remitente
    let balance_from = env.storage()
        .instance()
        .get(&from)
        .unwrap_or(0);
    
    // Validación 2: Balance suficiente
    if balance_from < amount {
        return Err("Balance insuficiente".to_string());
    }
    
    // Leer balance del destinatario
    let balance_to = env.storage()
        .instance()
        .get(&to)
        .unwrap_or(0);
    
    // Restar de forma segura (prevenir underflow)
    let nuevo_balance_from = balance_from
        .checked_sub(amount)
        .ok_or("Error: underflow al restar")?;
    
    // Sumar de forma segura (prevenir overflow)
    let nuevo_balance_to = balance_to
        .checked_add(amount)
        .ok_or("Error: overflow al sumar")?;
    
    // Actualizar balances en storage
    env.storage().instance().set(&from, &nuevo_balance_from);
    env.storage().instance().set(&to, &nuevo_balance_to);
    
    // Emitir evento
    env.events().publish(
        (symbol_short!("transfer"),),
        (from, to, amount)
    );
    
    Ok(())
}
```

**Conceptos aplicados:**
- ✅ Validaciones con Result
- ✅ checked_sub/checked_add para seguridad
- ✅ unwrap_or para balances no inicializados
- ✅ Storage para persistencia
- ✅ Eventos para transparencia

</details>

---

## 🎯 Siguiente Paso

¡Felicitaciones! Dominaste los conceptos fundamentales de Rust para Soroban.

**Ahora pasá a:** `03-CODIGO-EXPLICADO.md`

Ahí verás cómo todos estos conceptos se unen en el contador completo:
- Mutabilidad en acción
- Tipos optimizados
- Borrowing en funciones
- Option en storage
- Pattern matching
- Eventos

**Todo trabajando junto.** 🚀

---

## 💡 Reflexión Final

Si sentís que ownership y borrowing todavía no están 100% claros, **está perfecto**.

Estos conceptos son únicos de Rust. No hay equivalentes en JavaScript, Python, o Java. Es normal que tomen tiempo.

**La comprensión profunda viene con la práctica.** El compilador te va entrenando. Cada error es una oportunidad.

**Como las tiburonas reales: persistentes, precisas, y cada día más poderosas.** 🦈⚡

---

> 📚 **Recordatorio:** Este documento es para consultar siempre que necesites. Los conceptos se construyen uno sobre otro.

---

🦈 **¡Vamos a construir, Tiburona!** 🦈

**Nos vemos en el código explicado del contador.**
