# 🦈 Parte 1: Traits e Implementaciones
## El lenguaje común de los contratos inteligentes

**Tiempo estimado:** 25-30 minutos (22 min lectura + 5-8 min reflexión/práctica)

---

## 📖 Mini-glosario (referencia rápida)

Términos que verás en esta sección:

**Trait:** "Contrato de comportamiento" - define funciones que un tipo debe tener  
**Address:** Dirección en blockchain (como una billetera o contrato)  
**Symbol:** Texto corto en Soroban (máx 32 caracteres), usado para nombres  
**Storage:** "Base de datos" persistente en blockchain donde guardas datos  
**Ownable:** Patrón estándar para control de acceso (quién es dueño del contrato)

---

## 🎯 ¿Qué vas a entender en esta sección?

Al final de estos 25-30 minutos, vas a poder:

- [ ] Explicar qué es un trait y por qué existe
- [ ] Entender por qué los traits son críticos en blockchain
- [ ] Identificar cuándo usar traits en tus propios contratos
- [ ] Reconocer el patrón Ownable (control de acceso)
- [ ] Diferenciar entre código con y sin traits

---

## 💡 El problema que resuelven los traits

### Imagina esta situación:

Tu amiga María está construyendo una plataforma de donaciones. Quiere que diferentes ONGs puedan recibir fondos, pero cada ONG tiene su propia forma de hacer las cosas:

**ONG de Educación:**
```rust
struct DonacionEducacion {
    beneficiaria: Address,  // 📍 Address = dirección en blockchain
    monto: i128,
}

// Sus funciones
fn obtener_beneficiaria() { ... }
fn obtener_monto() { ... }
```

**ONG de Salud:**
```rust
struct DonacionSalud {
    receptora: Address,  // 🤔 Nota: nombre diferente (Address es lo mismo)
    cantidad: i128,      // 🤔 Nota: "cantidad" vs "monto"
}

// Sus funciones
fn get_receptora() { ... }  // 🤔 Nota: "get_receptora" vs "obtener_beneficiaria"
fn get_cantidad() { ... }   // 🤔 Nota: nombres completamente diferentes
}
```

> **💡 ¿Qué es Address?**  
> `Address` es un tipo de dato en Soroban que representa una dirección en la blockchain. Piensa en ella como la "dirección de email" de una billetera o contrato - única e inmutable.

### El problema real:

María quiere crear una función que procese CUALQUIER tipo de donación:

```rust
fn procesar_donaciones(donaciones: Vec<???>) {
    for donacion in donaciones {
        // ❌ ¿Cómo obtengo la beneficiaria?
        // ¿Es "beneficiaria", "receptora", o "destinataria"?
        
        // ❌ ¿Cómo obtengo el monto?
        // ¿Es "monto", "cantidad", o "valor"?
    }
}
```

**Sin traits, María necesitaría código diferente para cada ONG:**

```rust
// ❌ Código sin traits - repetitivo y frágil
fn procesar_donaciones(donaciones: Vec<Donacion>) {
    for donacion in donaciones {
        if donacion.tipo == "educacion" {
            let benef = donacion.obtener_beneficiaria();
            let monto = donacion.obtener_monto();
        } else if donacion.tipo == "salud" {
            let benef = donacion.get_receptora();  // Nombre diferente ❌
            let monto = donacion.get_cantidad();   // Nombre diferente ❌
        } else if donacion.tipo == "ambiente" {
            // Otro código diferente...
        }
        // ... 10 ONGs más = 10 bloques de código diferentes
    }
}
```

**Resultado:** María tiene que reescribir TODO cada vez que llega una ONG nueva. Si llegan 10 ONGs, tiene 10 versiones del mismo código.

---

## ✅ La solución: Traits (Contratos de comportamiento)

Un **trait** es como un acuerdo o contrato:

> "Si quieres participar en mi plataforma, DEBES tener estas funciones con estos nombres exactos."

**Analogía del mundo real:**

Imagina que estás organizando un evento de emprendedoras. Para participar, TODAS deben cumplir:
- Tener un número de identificación
- Poder mostrar sus productos
- Aceptar pagos digitales

No importa si eres artesana, cocinera, o diseñadora - si cumples esos 3 requisitos, puedes participar.

**Los traits funcionan igual:** Definen requisitos que todos deben cumplir.

### Veamos el código:

```rust
// DEFINICIÓN DEL TRAIT
// Esto es el "contrato" que todos deben cumplir
trait Donacion {
    fn beneficiaria(&self) -> Address;
    fn monto(&self) -> i128;
    fn procesar(&mut self, donante: Address) -> Result<(), Error>;
}
```

**Análisis línea por línea:**

1. **`trait Donacion`** 
   - Estamos creando un "contrato de comportamiento"
   - Cualquier struct que quiera ser "Donacion" debe implementarlo

2. **`fn beneficiaria(&self) -> Address`** 
   - Toda donación DEBE poder decir quién es la beneficiaria
   - Retorna `Address` (la dirección de la beneficiaria)
   - `&self` significa "esta función puede leer los datos de la struct"

3. **`fn monto(&self) -> i128`** 
   - Toda donación DEBE poder decir cuál es el monto
   - Retorna `i128` (número entero grande para evitar problemas de redondeo)

4. **`fn procesar(...)`** 
   - Toda donación DEBE tener una forma de procesarse
   - `&mut self` significa "puede modificar los datos de la struct"
   - Retorna `Result` porque puede fallar

---

### Ahora cada ONG implementa el trait:

```rust
// ONG de Educación IMPLEMENTA el trait
struct DonacionEducacion {
    beneficiaria: Address,
    monto: i128,
    escuela: Symbol,  // 📍 Symbol = texto corto en Soroban (máx 32 chars)
}

impl Donacion for DonacionEducacion {
    fn beneficiaria(&self) -> Address {
        self.beneficiaria.clone()
    }
    
    fn monto(&self) -> i128 {
        self.monto
    }
    
    fn procesar(&mut self, donante: Address) -> Result<(), Error> {
        // Lógica específica para donaciones educativas
        // Por ejemplo: verificar que la escuela esté registrada
        Ok(())
    }
}
```

```rust
// ONG de Salud IMPLEMENTA el trait
struct DonacionSalud {
    beneficiaria: Address,  // ✅ Ahora usa el mismo nombre internamente
    monto: i128,
    hospital: Symbol,  // Dato específico de salud
}

impl Donacion for DonacionSalud {
    fn beneficiaria(&self) -> Address {
        self.beneficiaria.clone()
    }
    
    fn monto(&self) -> i128 {
        self.monto
    }
    
    fn procesar(&mut self, donante: Address) -> Result<(), Error> {
        // Lógica específica para donaciones de salud
        // Por ejemplo: verificar que el hospital tenga licencia
        Ok(())
    }
}
```

---

### El poder de los traits:

Ahora María puede escribir UNA función que trabaje con TODAS las donaciones:

```rust
// ✅ Código con traits - funciona con CUALQUIER donación
// Esta función trabaja con CUALQUIER tipo que implemente Donacion
fn registrar_donacion<T: Donacion>(donacion: &T, registro: &mut Vec<Address>) {
    // ✅ Sabemos que TIENE que tener beneficiaria()
    registro.push(donacion.beneficiaria());
    
    // ✅ Sabemos que TIENE que tener monto()
    let total = donacion.monto();
    
    // No importa si es DonacionEducacion o DonacionSalud
    // ¡Funciona con ambas!
}
```

**Decisión de diseño clave:**
- `<T: Donacion>` significa "T puede ser cualquier tipo, PERO debe implementar Donacion"
- El compilador GARANTIZA que T tiene las funciones `beneficiaria()` y `monto()`
- No hay posibilidad de error en runtime - todo se verifica en compilación

**Ventajas del enfoque con traits:**
- **Estandarización:** Todas las donaciones tienen la misma interfaz
- **Interoperabilidad:** Un contrato puede trabajar con cualquier tipo de donación
- **Extensibilidad:** Agregar nuevos tipos de donación no requiere cambiar código existente
- **Type safety:** El compilador verifica que implementemos todos los métodos requeridos

---

## 🌟 ¿Por qué son especialmente críticos en blockchain?

En blockchain, los traits son aún más importantes que en programación tradicional:

**1. Interoperabilidad entre contratos desconocidos**
- En una blockchain pública, miles de contratos de diferentes desarrolladores deben interactuar
- Los traits aseguran que todos "hablan el mismo idioma"
- Un DEX puede interactuar con CUALQUIER token que implemente el trait Token estándar

**2. Auditorías de seguridad**
- Si tu contrato sigue un trait estándar (como Token), los auditores ya saben qué esperar
- Más fácil encontrar vulnerabilidades
- Menos sorpresas = más seguro

**3. Composabilidad**
- Los contratos pueden construirse unos sobre otros
- Tu token puede funcionar en CUALQUIER exchange que espere el trait Token
- "Lego blocks" de finanzas descentralizadas

**Ejemplo real:**  
Cuando Stellar lanzó Soroban, definió el trait estándar para tokens. Ahora CUALQUIER DEX, wallet, o aplicación puede interactuar con CUALQUIER token que implemente ese trait - sin conocer los detalles internos.

---

## 🪙 Ejemplo adicional: Trait Token (estándar blockchain)

Veamos otro caso común - un trait para tokens (como ERC-20 en Ethereum):

```rust
// Trait estándar para tokens en blockchain
trait Token {
    fn balance_of(&self, env: &Env, owner: Address) -> i128;
    fn transfer(&self, env: &Env, from: Address, to: Address, amount: i128) -> Result<(), Error>;
    fn total_supply(&self, env: &Env) -> i128;
}
```

**¿Por qué este trait es poderoso?**

Imagina que construyes un exchange (DEX). Con este trait, tu exchange puede listar CUALQUIER token que lo implemente:

```rust
// Tu DEX puede trabajar con cualquier token
fn swap<T: Token>(token_a: &T, token_b: &T, amount: i128) {
    // Sabés que ambos tokens tienen balance_of y transfer
    let balance = token_a.balance_of(&env, usuario);
    token_a.transfer(&env, usuario, exchange, amount)?;
    // ... lógica de swap
}
```

**Sin traits, necesitarías:**
- Código específico para cada token
- Verificar manualmente qué funciones tiene cada uno
- Actualizar tu exchange cada vez que sale un token nuevo

**Con traits:**
- Un solo código funciona con TODOS los tokens
- Los nuevos tokens funcionan automáticamente
- Zero code changes necesarios

---

## 🔒 Patrón Ownable: Control de acceso en contratos

Uno de los traits MÁS IMPORTANTES en contratos inteligentes es **Ownable**.

### ¿Por qué existe?

En blockchain, muchos contratos necesitan funciones administrativas que SOLO una persona puede ejecutar:

- Cambiar tasas de interés
- Pausar el contrato en emergencia
- Agregar nuevos administradores
- Actualizar configuraciones

**Pregunta crítica:** ¿Cómo evitamos que CUALQUIERA ejecute estas funciones?

**Respuesta:** El patrón Ownable.

---

### Implementación del trait Ownable:

**Primero, definimos qué funciones DEBE tener un contrato "Ownable":**

```rust
use soroban_sdk::{contracttype, Env, Address};

// El trait Ownable define el "contrato" de control de acceso
// Es como un acuerdo: "Si tu contrato es Ownable, DEBE tener estas 3 funciones"
trait Ownable {
    // Función 1: Consultar quién es el dueño
    fn get_owner(&self, env: &Env) -> Address;
    
    // Función 2: Transferir el ownership a otra persona
    fn transfer_ownership(&self, env: &Env, new_owner: Address) -> Result<(), Error>;
    
    // Función 3: Verificar que quien llama es el dueño (guardián)
    fn require_owner(&self, env: &Env, caller: Address) -> Result<(), Error>;
}
```

**¿Qué hace cada función?**

| Función | Propósito | Ejemplo de uso |
|---------|-----------|----------------|
| `get_owner()` | Consultar quién es el dueño actual | "¿Quién controla este contrato?" |
| `transfer_ownership()` | Cambiar el dueño (solo el owner actual puede) | "Vendo mi negocio, el nuevo dueño es Ana" |
| `require_owner()` | Verificar que el caller es el owner | "Antes de cambiar la tasa, verifico que seas el dueño" |

**Analogía:** Es como tener las llaves de un negocio:
- `get_owner()` → Ver en el registro quién tiene las llaves
- `transfer_ownership()` → Entregar las llaves a otra persona
- `require_owner()` → Verificar que quien intenta abrir la caja fuerte tiene las llaves

---

### ¿Dónde guardamos el owner?

Necesitamos definir las "keys" para el storage:

```rust
#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Owner,  // Aquí se guarda la dirección del owner
}
```

> **💡 ¿Qué es storage?**  
> El storage en Soroban es como una base de datos persistente en la blockchain donde guardamos datos clave. Cada dato necesita una "key" para identificarlo - como un diccionario donde cada entrada tiene una clave única.

**Decisión de diseño:**
- Usamos un `enum` para organizar las keys del storage (mejor que strings)
- `Owner` es una key de "instance storage" (configuración del contrato)
- Lo veremos en detalle en la Parte 3

---

### Implementación completa con comentarios detallados:

```rust
#[contract]
pub struct MiContrato;

#[contractimpl]
impl Ownable for MiContrato {
    
    // FUNCIÓN 1: Obtener el owner actual
    fn get_owner(&self, env: &Env) -> Address {
        env.storage()                    // 1️⃣ Acceder al almacenamiento del contrato
            .instance()                  // 2️⃣ Usar el storage de "configuración global"
            .get(&DataKey::Owner)        // 3️⃣ Buscar el valor guardado en la key "Owner"
            .expect("Owner no inicializado")  // 4️⃣ Si no existe → ERROR fatal
        
        // ⚠️ ¿Por qué expect() y no unwrap_or()?
        // Porque si no hay owner, el contrato está MAL configurado
        // Mejor fallar explícitamente que asumir un valor por defecto
    }
    
    // FUNCIÓN 2: Transferir ownership a otra persona
    fn transfer_ownership(&self, env: &Env, new_owner: Address) -> Result<(), Error> {
        // PASO 1: Obtener quien está llamando esta función
        let caller = env.current_contract_address(); // Simplificado para el ejemplo
        
        // PASO 2: VALIDAR PRIMERO - Verificar que el caller ES el owner actual
        self.require_owner(env, caller)?;
        // ☝️ El "?" significa: si require_owner retorna error, salir inmediatamente
        
        // PASO 3: Si llegamos aquí, el caller es el owner
        // AHORA SÍ es seguro cambiar el owner en storage
        env.storage()
            .instance()                      // Acceder al storage de configuración
            .set(&DataKey::Owner, &new_owner); // Guardar el nuevo owner
        
        Ok(())  // ✅ Éxito - ownership transferido
    }
    
    // FUNCIÓN 3: El "guardián" - Verificar que caller es owner
    fn require_owner(&self, env: &Env, caller: Address) -> Result<(), Error> {
        // PASO 1: Obtener el owner guardado en storage
        let owner = self.get_owner(env);
        
        // PASO 2: Comparar el caller con el owner guardado
        if caller != owner {
            // ❌ No coinciden → retornar error
            return Err(Error::NotOwner);
        }
        
        // ✅ Coinciden → todo bien
        Ok(())
    }
}
```

**🔍 Análisis paso a paso de cada función:**

#### Función 1: `get_owner()` - La consulta
```rust
env.storage().instance().get(&DataKey::Owner).expect("mensaje")
```

**Desglose:**
1. `env.storage()` → Acceder al sistema de almacenamiento
2. `.instance()` → Zona de "configuración global" del contrato
3. `.get(&DataKey::Owner)` → Buscar el valor asociado a la key "Owner"
4. `.expect("...")` → Si no existe, detener todo con este mensaje de error

**💡 ¿Por qué expect()?**  
Porque si no hay owner configurado, el contrato NO está listo para usarse. Es mejor fallar de forma clara que continuar en un estado inválido.

#### Función 2: `transfer_ownership()` - El cambio de manos
```rust
self.require_owner(env, caller)?;  // ← Primero valida
env.storage().instance().set(...); // ← Después modifica
```

**Orden crítico:**
1. ✅ PRIMERO: Verificar permisos (require_owner)
2. ✅ DESPUÉS: Modificar storage (set)

**❌ NUNCA al revés:**
```rust
// ❌ MAL - No hagas esto
env.storage().instance().set(...);  // Modificar primero
self.require_owner(env, caller)?;   // Validar después → ya es tarde!
```

**¿Por qué?** Si la validación falla DESPUÉS de modificar, ya cambiaste el owner. El daño está hecho.

#### Función 3: `require_owner()` - El guardián
```rust
if caller != owner {
    return Err(Error::NotOwner);  // Salir inmediatamente con error
}
Ok(())  // Solo si la verificación pasó
```

**Patrón:** Early return on error
- Si hay problema → salir inmediatamente
- Si todo está bien → continuar hasta el final

---

## 🌟 Caso de uso real: Contrato de Microcréditos

Imagina un contrato que otorga microcréditos a emprendedoras:

```rust
#[contract]
pub struct MicroCredito;

#[contractimpl]
impl MicroCredito {
    // ✅ Función pública - cualquiera puede llamarla
    pub fn solicitar_credito(env: Env, solicitante: Address, monto: i128) -> Result<(), Error> {
        // Lógica para solicitar crédito
        Ok(())
    }
    
    // ⚠️ Función administrativa - SOLO el owner
    pub fn cambiar_tasa_interes(env: Env, caller: Address, nueva_tasa: u32) -> Result<(), Error> {
        // PRIMERO: Verificar que el caller es el owner
        Self::require_owner(&env, caller)?;
        
        // SEGUNDO: Si llegamos aquí, es seguro cambiar la tasa
        env.storage()
            .instance()
            .set(&DataKey::TasaInteres, &nueva_tasa);
        
        Ok(())
    }
}
```

**Análisis de seguridad:**

1. **`solicitar_credito()`:**
   - ✅ Pública
   - ✅ Cualquier emprendedora puede llamarla
   - ✅ No requiere permisos especiales

2. **`cambiar_tasa_interes()`:**
   - ⚠️ Administrativa
   - ⚠️ Solo el owner puede ejecutarla
   - ⚠️ `require_owner()` protege esta función

**¿Qué pasa si alguien más intenta cambiar la tasa?**

```rust
// Escenario: Una usuaria maliciosa intenta cambiar la tasa
let usuaria_maliciosa = Address::generate(&env);
let resultado = contrato.cambiar_tasa_interes(env, usuaria_maliciosa, 100);

// Resultado: Err(Error::NotOwner)
// ✅ El contrato rechaza la operación
// ✅ No se cambia la tasa
// ✅ No se desperdicia gas en operaciones inválidas
```

---

## 🔍 Traits en Soroban SDK (lo que viene incorporado)

Cuando usas los macros de Soroban, automáticamente se implementan traits importantes:

```rust
use soroban_sdk::{contract, contractimpl, Env, Symbol};

#[contract]  // 👈 Este macro implementa traits automáticamente
pub struct MiContrato;

#[contractimpl]  // 👈 Este macro también
impl MiContrato {
    pub fn saludar(env: Env, nombre: Symbol) -> Symbol {
        Symbol::new(&env, "Hola")
    }
}
```

**¿Qué traits se implementan automáticamente?**

1. **IntoVal / TryFromVal:**
   - Conversión entre tipos Rust → tipos Soroban
   - Ejemplo: `i128` (Rust) ↔️ `Val` (Soroban)

2. **Contract:**
   - Marca la struct como contrato invocable
   - Permite que la blockchain llame tus funciones

3. **Serialización:**
   - Tus parámetros se serializan/deserializan automáticamente
   - No tienes que escribir código de conversión manual

**Decisión de diseño de Soroban:**
- Los macros ocultan la complejidad
- Tú escribes Rust normal
- El SDK maneja la comunicación con la blockchain

---

## 📊 Comparación visual: SIN traits vs CON traits

### Escenario: Procesar 3 tipos de donaciones diferentes

#### ❌ SIN traits - Código específico para cada tipo

```rust
fn procesar_todas_donaciones(
    educacion: Vec<DonacionEducacion>,
    salud: Vec<DonacionSalud>,
    ambiente: Vec<DonacionAmbiente>
) {
    // Procesar educación
    for don in educacion {
        let benef = don.obtener_beneficiaria();  // Nombre específico
        let monto = don.obtener_monto();
        registrar(benef, monto);
    }
    
    // Procesar salud - CÓDIGO REPETIDO
    for don in salud {
        let benef = don.get_receptora();  // Nombre diferente ❌
        let cantidad = don.get_cantidad();  // Nombre diferente ❌
        registrar(benef, cantidad);
    }
    
    // Procesar ambiente - MÁS CÓDIGO REPETIDO
    for don in ambiente {
        let dest = don.destinataria();  // Otro nombre diferente ❌
        let valor = don.valor();  // Otro nombre diferente ❌
        registrar(dest, valor);
    }
}

// Problema: Si llega un 4to tipo, escribir TODO de nuevo
```

**Resultado:** 
- 3 bloques de código casi idénticos
- Difícil de mantener
- Agregar un tipo nuevo = reescribir función completa

---

#### ✅ CON traits - Código unificado

```rust
fn procesar_todas_donaciones<T: Donacion>(donaciones: Vec<T>) {
    for don in donaciones {
        let benef = don.beneficiaria();  // ✅ Mismo nombre siempre
        let monto = don.monto();  // ✅ Mismo nombre siempre
        registrar(benef, monto);
    }
}

// Funciona con CUALQUIER tipo que implemente Donacion:
procesar_todas_donaciones(educacion_vec);
procesar_todas_donaciones(salud_vec);
procesar_todas_donaciones(ambiente_vec);
// Agregar un 4to tipo: CERO cambios en esta función
```

**Resultado:**
- UN solo bloque de código
- Fácil de mantener
- Agregar tipo nuevo = CERO cambios (solo implementar el trait)

---

### Diagrama conceptual:

```
SIN TRAITS:
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Contrato Token  │     │ Contrato NFT    │     │ Contrato DAO    │
│                 │     │                 │     │                 │
│ get_balance()   │     │ saldo()         │     │ consultar_bal() │
│ send()          │     │ transferir()    │     │ enviar()        │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        ❌                      ❌                      ❌
    Cada uno diferente - imposible tener código genérico


CON TRAITS:
           ┌──────────────────────────┐
           │   Trait Token            │
           │                          │
           │  balance_of() -> i128    │
           │  transfer(...)           │
           └──────────────────────────┘
                      ▲
                      │ implementan
         ┌────────────┼────────────┐
         │            │            │
┌────────┴──────┐  ┌──┴────────┐  ┌┴──────────┐
│ Token Estable │  │ NFT Token │  │ DAO Token │
│      ✅       │  │     ✅    │  │     ✅    │
└───────────────┘  └───────────┘  └───────────┘

Resultado: Un DEX puede listar TODOS sin cambios
```

---

## 🎯 Mini-ejercicio de reflexión

**Antes de continuar, reflexiona:**

Imagina que estás construyendo un sistema de votación. Tienes:
- Propuestas de cambio de ley
- Propuestas de presupuesto
- Propuestas de eventos

Todas necesitan:
- Ver los votos a favor
- Ver los votos en contra
- Determinar si pasó (más del 50%)

**Pregunta:** ¿Cómo diseñarías esto con traits?

<details>
<summary>💡 Ver una posible solución</summary>

```rust
trait Votable {
    fn votos_a_favor(&self) -> u32;
    fn votos_en_contra(&self) -> u32;
    fn paso(&self) -> bool {
        self.votos_a_favor() > self.votos_en_contra()
    }
}

struct PropuestaLey {
    votos_si: u32,
    votos_no: u32,
    titulo: Symbol,
}

impl Votable for PropuestaLey {
    fn votos_a_favor(&self) -> u32 {
        self.votos_si
    }
    
    fn votos_en_contra(&self) -> u32 {
        self.votos_no
    }
}

// Ahora puedes:
fn contar_aprobadas<T: Votable>(propuestas: Vec<T>) -> u32 {
    propuestas.iter()
        .filter(|p| p.paso())
        .count() as u32
}
```

¡Nota cómo una sola función funciona con CUALQUIER tipo de propuesta!

</details>

---

## ✅ Checklist de conceptos

Antes de pasar a la siguiente sección, verifica que entiendes:

- [ ] Un trait es un "contrato de comportamiento"
- [ ] Los traits permiten interoperabilidad entre contratos desconocidos
- [ ] En blockchain, los traits son críticos para que contratos de diferentes desarrolladores funcionen juntos
- [ ] Ownable es el patrón estándar de control de acceso
- [ ] Las validaciones SIEMPRE van antes de modificar estado
- [ ] Soroban implementa traits automáticamente con sus macros
- [ ] `Address` es una dirección en blockchain (como billetera/contrato)
- [ ] `Symbol` es texto corto en Soroban (máx 32 caracteres)
- [ ] `env.storage()` es la "base de datos" del contrato en blockchain

---

## 💭 Reflexión: ¿Para qué te sirve esto?

**Pregunta para ti:**

Si estuvieras construyendo una plataforma de donaciones para 5 ONGs diferentes, ¿preferirías:

**A)** Escribir código único para cada ONG (5 implementaciones diferentes, 5 veces el mantenimiento)

**B)** Definir un trait `Donacion` que todas implementen (1 implementación base, 5 adaptaciones simples)

La respuesta obvia es B. Y eso es exactamente lo que vas a aplicar en tu tarea.

**Piensa en tu proyecto futuro:**
- ¿Qué traits podrías necesitar?
- ¿Qué funcionalidades se repiten entre diferentes partes?
- ¿Cómo podrías hacer tu código más reutilizable?

---

## 🔄 Conexión con la siguiente sección

Ahora que entiendes **CÓMO** estructurar contratos con traits, necesitas entender **CÓMO** manejar cuando las cosas salen mal.

En la Parte 2 veremos `Result` y `Option` — las herramientas que hacen que tu código sea robusto ante errores.

Porque en blockchain, un error puede costar dinero real. Y eso NO es aceptable.

**Spoiler:** Verás cómo `Result` y `Error` trabajan juntos con traits para crear contratos seguros.

---

🦈⚡ **Siguiente:** [02-result-option.md - Result y Option](./02-result-option.md) ⚡🦈