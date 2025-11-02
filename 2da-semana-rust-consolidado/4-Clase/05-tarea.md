# 🦈 Tarea Clase 4: Implementa Hello Tiburona Profesional
## De la teoría a la práctica

---

## ⚠️ **UPDATE 19 de Octubre 2025** ⚠️

**CORRECCIÓN IMPORTANTE:** La versión original de esta tarea contenía un error en el Paso 4.2 que impedía la compilación. El tipo `Symbol` en soroban-sdk NO tiene método `.to_string()` ni `.len()`.

**SOLUCIÓN:** Usar `String` en lugar de `Symbol` para el parámetro `nombre` cuando necesitamos validar su longitud.

**Cambios aplicados:**
- ✅ Paso 2.2: Agregado `String` a los imports
- ✅ Paso 4.1: Cambiado tipo del parámetro `nombre` de `Symbol` a `String`
- ✅ Paso 4.2-4.3: Simplificadas validaciones (String ya tiene `.len()`)
- ✅ Paso 7.3-7.6: Actualizados tests para usar `String::from_str()`

**Créditos:** Bug reportado y solucionado por Tiburona Karen 🦈⚡

---

## 🎯 Objetivo de esta tarea

**En clase viste** cómo se construye un contrato profesional.  
**Ahora vas a construirlo** tú misma, paso a paso.

Al completar esta tarea, habrás:

-  Implementado tu primer contrato con manejo de errores
-  Usado storage organizado con DataKey
-  Aplicado validaciones profesionales
-  Gestionado TTL correctamente
-  Creado un sistema de control de acceso
-  Escrito tests para verificar que funciona

**Tiempo estimado:** 2-3 horas  
**Dificultad:** Media  
**Prerequisito:** Haber visto la Clase 4 completa

---

## 📋 Antes de empezar

###  Checklist de preparación:

- [ ] Tienes Rust y Soroban CLI instalados
- [ ] Revisaste los 4 documentos de la clase
- [ ] Tienes los archivos de referencia a mano
- [ ] Terminal abierta en tu carpeta de proyectos
- [ ] Mente fresca y lista para construir 

###  Lo que necesitas tener cerca:

1. **04-hello-tiburona.md** → El código completo de referencia
2. **02-result-option.md** → Para recordar manejo de errores
3. **03-storage.md** → Para recordar tipos de storage
4. **Esta guía** → Para seguir paso a paso

---

## 🚀 Fase 1: Crear el proyecto

### Paso 1.1: Crear el contrato

Abre tu terminal y ejecuta:

```bash
cd ~/proyectos-soroban
soroban contract init hello-tiburona
cd hello-tiburona
```

**Resultado esperado:**
```
Created `hello-tiburona` project
```

### Paso 1.2: Verificar estructura

```bash
ls -la
```

**Deberías ver:**
```
contracts/
Cargo.toml
README.md
```

### Paso 1.3: Abrir en VS Code

```bash
code .
```

**Checkpoint 1:** 
- [ ] Proyecto creado
- [ ] VS Code abierto
- [ ] Puedes ver la carpeta `contracts/`

---

## 📝 Fase 2: Implementar las definiciones base

### Paso 2.1: Abrir lib.rs

Navega a: `contracts/hello-tiburona/src/lib.rs`

Verás el código template. **Vamos a reemplazarlo completamente.**

### Paso 2.2: Imports y setup inicial 🔪CORREGIDO 

**Borra todo el contenido** y empieza con:

```rust
#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracterror, contracttype,
    Env, Symbol, Address, String  // ⭐ String agregado
};
```

**💡 Nota:** 
- `contracterror` → Para definir errores
- `contracttype` → Para DataKey
- `Address` → Para control de acceso
- `String` → ⭐ Para validar inputs de texto

### Paso 2.3: Definir errores

Agrega debajo de los imports:

```rust
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    NombreVacio = 1,
    NombreMuyLargo = 2,
    NoAutorizado = 3,
    NoInicializado = 4,
}
```

**Reflexiona:**
- ¿Por qué cada error tiene un número?
- ¿Qué error usarías si alguien intenta resetear el contador sin ser admin?

### Paso 2.4: Definir DataKey

Agrega después de los errores:

```rust
#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Admin,
    ContadorSaludos,
    UltimoSaludo(Address),
}
```

**Reflexiona:**
- ¿Por qué `Admin` no tiene parámetros pero `UltimoSaludo` sí?
- ¿Qué storage usarás para cada key?

### Paso 2.5: Definir el contrato

Agrega la estructura base:

```rust
#[contract]
pub struct HelloContract;

#[contractimpl]
impl HelloContract {
    // Aquí irán las funciones
}
```

**Checkpoint 2:**
- [ ] Imports correctos (incluyendo String)
- [ ] 4 errores definidos
- [ ] 3 keys en DataKey
- [ ] Estructura del contrato creada
- [ ] El código compila (puedes verificar con `cargo check`)

---

## 🏗️ Fase 3: Implementar initialize()

### Paso 3.1: La firma de la función

Dentro del bloque `impl HelloContract`, agrega:

```rust
    pub fn initialize(env: Env, admin: Address) -> Result<(), Error> {
        // Implementación aquí
    }
```

**Pensa antes de continuar:**
- ¿Por qué retorna `Result<(), Error>` y no solo `()`?
- ¿Qué podría salir mal en una inicialización?

### Paso 3.2: Verificar si ya está inicializado

Dentro de `initialize()`:

```rust
        if env.storage().instance().has(&DataKey::Admin) {
            return Err(Error::NoInicializado);
        }
```

**Pregunta clave:** ¿Por qué usamos `has()` en lugar de `get()`?

**Respuesta:** `has()` es más barato, solo verifica existencia sin deserializar.

### Paso 3.3: Guardar el admin

Agrega después de la verificación:

```rust
        env.storage()
            .instance()
            .set(&DataKey::Admin, &admin);
```

**Decisión:** ¿Por qué instance storage para Admin?

### Paso 3.4: Inicializar contador

```rust
        env.storage()
            .instance()
            .set(&DataKey::ContadorSaludos, &0u32);
```

**Nota:** `&0u32` = referencia a unsigned 32-bit integer con valor 0

### Paso 3.5: Extender TTL

```rust
        env.storage()
            .instance()
            .extend_ttl(100, 100);
        
        Ok(())
```

**Reflexiona:** ¿Qué significan los dos 100?

### Paso 3.6: Compilar y verificar

```bash
cargo build --target wasm32-unknown-unknown --release
```

**Resultado esperado:**
```
✅ Compiling hello-tiburona v0.0.0
   Finished release [optimized] target(s)
```

**Checkpoint 3:**
- [ ] Función `initialize()` implementada
- [ ] Verifica que no esté inicializado
- [ ] Guarda admin y contador
- [ ] Extiende TTL
- [ ] Compila sin errores

---

## Fase 4: Implementar hello()

### Paso 4.1: Firma de la función 🔪  CORREGIDO

Después de `initialize()`, agrega:

```rust
    pub fn hello(
        env: Env,
        usuario: Address,
        nombre: String  // ⭐ String en lugar de Symbol
    ) -> Result<Symbol, Error> {
        // Implementación aquí
    }
```

**Pregunta:** ¿Por qué retorna `Result<Symbol, Error>` en lugar de solo `Symbol`?

**Nota importante:** Usamos `String` para el parámetro porque necesitamos validar su longitud. `Symbol` NO tiene métodos `.len()` ni `.to_string()`.

### Paso 4.2: Validación - Nombre no vacío 🔪 CORREGIDO

Dentro de `hello()`:

```rust
        // ⭐ String ya tiene .len(), no necesitamos .to_string()
        if nombre.len() == 0 {
            return Err(Error::NombreVacio);
        }
```

**Early return:** Si el nombre está vacío, salimos inmediatamente.

### Paso 4.3: Validación - Nombre no muy largo 🔪 CORREGIDO

```rust
        if nombre.len() > 32 {
            return Err(Error::NombreMuyLargo);
        }
```

**Pregunta:** ¿Por qué validar la longitud antes de tocar storage?

### Paso 4.4: Incrementar contador

```rust
        let key_contador = DataKey::ContadorSaludos;
        let contador: u32 = env.storage()
            .instance()
            .get(&key_contador)
            .unwrap_or(0);
        
        env.storage()
            .instance()
            .set(&key_contador, &(contador + 1));
```

**Patrón:** Lee → Modifica → Guarda

### Paso 4.5: Guardar último saludo

```rust
        env.storage()
            .persistent()
            .set(&DataKey::UltimoSaludo(usuario.clone()), &nombre);
```

**Decisión:** ¿Por qué persistent storage aquí?

**Respuesta:** Es dato específico de usuario (crítico).

### Paso 4.6: Extender TTL

```rust
        env.storage()
            .persistent()
            .extend_ttl(&DataKey::UltimoSaludo(usuario), 100, 100);
        
        env.storage()
            .instance()
            .extend_ttl(100, 100);
```

**Orden:** Persistent primero, instance después.

### Paso 4.7: Retornar saludo

```rust
        Ok(Symbol::new(&env, "Hola"))
```

### Paso 4.8: Compilar

```bash
cargo build --target wasm32-unknown-unknown --release
```

**Checkpoint 4:**
- [ ] Función `hello()` implementada
- [ ] 2 validaciones de input
- [ ] Contador incrementado
- [ ] Saludo guardado
- [ ] TTL extendido
- [ ] Compila sin errores

---

##  Fase 5: Implementar funciones de consulta

### Paso 5.1: get_contador()

Después de `hello()`:

```rust
    pub fn get_contador(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::ContadorSaludos)
            .unwrap_or(0)
    }
```

**Pregunta:** ¿Por qué no retorna `Result`?

**Respuesta:** Esta función nunca falla. `unwrap_or(0)` maneja el caso de no existencia.

### Paso 5.2: get_ultimo_saludo() ⭐ NOTA

```rust
    pub fn get_ultimo_saludo(env: Env, usuario: Address) -> Option<String> {
        env.storage()
            .persistent()
            .get(&DataKey::UltimoSaludo(usuario))
    }
```

**Pregunta:** ¿Por qué `Option<String>` y no `String`?

**Respuesta:** Porque puede no existir (Tiburona nunca saludó).

**Nota:** Cambiamos a `Option<String>` porque ahora guardamos `String` en storage.

### Paso 5.3: Compilar

```bash
cargo build --target wasm32-unknown-unknown --release
```

**Checkpoint 5:**
- [ ] `get_contador()` implementado
- [ ] `get_ultimo_saludo()` implementado
- [ ] Entiendes Option vs Result
- [ ] Compila sin errores

---

## Fase 6: Implementar función administrativa

### Paso 6.1: reset_contador() - Estructura

```rust
    pub fn reset_contador(env: Env, caller: Address) -> Result<(), Error> {
        // Implementación aquí
    }
```

### Paso 6.2: Obtener admin y verificar

Dentro de `reset_contador()`:

```rust
        let admin: Address = env.storage()
            .instance()
            .get(&DataKey::Admin)
            .ok_or(Error::NoInicializado)?;
```

**Magia del `?`:** Si `get()` retorna `None`, se convierte en `Err(NoInicializado)` y la función retorna inmediatamente.

### Paso 6.3: Verificar permisos

```rust
        if caller != admin {
            return Err(Error::NoAutorizado);
        }
```

**Seguridad:** Solo el admin puede resetear.

### Paso 6.4: Resetear contador

```rust
        env.storage()
            .instance()
            .set(&DataKey::ContadorSaludos, &0u32);
        
        Ok(())
```

### Paso 6.5: Compilar

```bash
cargo build --target wasm32-unknown-unknown --release
```

**Checkpoint 6:**
- [ ] `reset_contador()` implementado
- [ ] Verifica admin
- [ ] Control de acceso funcional
- [ ] Compila sin errores

---

## 🧪 Fase 7: Tests comprehensivos

### Paso 7.1: Agregar módulo de tests

**Al final del archivo** (después de cerrar `impl HelloContract`), agrega:

```rust
#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::Env;

    #[test]
    fn test_initialize() {
        let env = Env::default();
        let contract_id = env.register_contract(None, HelloContract);
        let client = HelloContractClient::new(&env, &contract_id);
        
        let admin = Address::generate(&env);
        
        // Primera inicialización debe funcionar
        client.initialize(&admin);
        
        // Verificar contador en 0
        assert_eq!(client.get_contador(), 0);
    }
}
```

### Paso 7.2: Test - No inicializar dos veces

Agrega dentro del módulo `test`:

```rust
    #[test]
    #[should_panic(expected = "NoInicializado")]
    fn test_no_reinicializar() {
        let env = Env::default();
        let contract_id = env.register_contract(None, HelloContract);
        let client = HelloContractClient::new(&env, &contract_id);
        
        let admin = Address::generate(&env);
        
        client.initialize(&admin);
        client.initialize(&admin);  // Segunda vez debe fallar
    }
```

### Paso 7.3: Test - Hello con validaciones 🔪 CORREGIDO

```rust
    #[test]
    fn test_hello_exitoso() {
        let env = Env::default();
        let contract_id = env.register_contract(None, HelloContract);
        let client = HelloContractClient::new(&env, &contract_id);
        
        let admin = Address::generate(&env);
        let usuario = Address::generate(&env);
        
        client.initialize(&admin);
        
        // ⭐ Usar String::from_str en lugar de Symbol::new
        let nombre = String::from_str(&env, "Ana");
        let resultado = client.hello(&usuario, &nombre);
        
        assert_eq!(resultado, Symbol::new(&env, "Hola"));
        assert_eq!(client.get_contador(), 1);
        assert_eq!(client.get_ultimo_saludo(&usuario), Some(nombre));
    }
```

### Paso 7.4: Test - Nombre vacío falla 🔪 CORREGIDO

```rust
    #[test]
    #[should_panic(expected = "NombreVacio")]
    fn test_nombre_vacio() {
        let env = Env::default();
        let contract_id = env.register_contract(None, HelloContract);
        let client = HelloContractClient::new(&env, &contract_id);
        
        let admin = Address::generate(&env);
        let usuario = Address::generate(&env);
        
        client.initialize(&admin);
        
        // ⭐ Usar String::from_str para string vacío
        let vacio = String::from_str(&env, "");
        client.hello(&usuario, &vacio);  // Debe fallar
    }
```

### Paso 7.5: Test - Reset solo admin 🔪 CORREGIDO

```rust
    #[test]
    fn test_reset_solo_admin() {
        let env = Env::default();
        let contract_id = env.register_contract(None, HelloContract);
        let client = HelloContractClient::new(&env, &contract_id);
        
        let admin = Address::generate(&env);
        let otro = Address::generate(&env);
        let usuario = Address::generate(&env);
        
        client.initialize(&admin);
        
        // ⭐ Hacer saludos con String
        client.hello(&usuario, &String::from_str(&env, "Test"));
        assert_eq!(client.get_contador(), 1);
        
        // Admin puede resetear
        client.reset_contador(&admin);
        assert_eq!(client.get_contador(), 0);
    }
```

### Paso 7.6: Test - Usuario no admin no puede resetear

```rust
    #[test]
    #[should_panic(expected = "NoAutorizado")]
    fn test_reset_no_autorizado() {
        let env = Env::default();
        let contract_id = env.register_contract(None, HelloContract);
        let client = HelloContractClient::new(&env, &contract_id);
        
        let admin = Address::generate(&env);
        let otro = Address::generate(&env);
        
        client.initialize(&admin);
        
        // Otro usuario intenta resetear
        client.reset_contador(&otro);  // Debe fallar
    }
```

### Paso 7.7: Ejecutar tests

```bash
cargo test
```

**Resultado esperado:**
```
running 6 tests
test test::test_hello_exitoso ... ok
test test::test_initialize ... ok
test test::test_no_reinicializar ... ok
test test::test_nombre_vacio ... ok
test test::test_reset_solo_admin ... ok
test test::test_reset_no_autorizado ... ok

test result: ok. 6 passed; 0 failed
```

**Checkpoint 7:**
- [ ] 6 tests implementados
- [ ] Todos los tests pasan
- [ ] Entiendes cada test
- [ ] Verificaste casos exitosos y de error

---

## Fase 8: Build final y despliegue local

### Paso 8.1: Build optimizado

```bash
soroban contract build
```

**Resultado esperado:**
```
✅ Finished release [optimized] target(s)
```

### Paso 8.2: Verificar el WASM generado

```bash
ls -lh target/wasm32-unknown-unknown/release/*.wasm
```

Deberías ver:
```
hello_tiburona.wasm
```

### Paso 8.3: Optimizar el WASM

```bash
soroban contract optimize --wasm target/wasm32-unknown-unknown/release/hello_tiburona.wasm
```

**Checkpoint 8:**
- [ ] Build exitoso
- [ ] WASM generado
- [ ] WASM optimizado

---

## ✅ Verificación final

### Checklist completo de la tarea:

**Implementación:**
- [ ] Errores personalizados (4 tipos)
- [ ] DataKey enum (3 keys)
- [ ] `initialize()` con verificación
- [ ] `hello()` con validaciones usando `String`
- [ ] `get_contador()` y `get_ultimo_saludo()`
- [ ] `reset_contador()` con control de acceso

**Tests:**
- [ ] Test de inicialización
- [ ] Test de no reinicializar
- [ ] Test de hello exitoso
- [ ] Test de validaciones
- [ ] Test de control de acceso

**Build:**
- [ ] Compila sin warnings
- [ ] Todos los tests pasan
- [ ] WASM generado

---

## 🎓 Reflexión post-implementación

### Preguntas para ti:

1. **¿Cuál fue la parte más difícil?**
   - ¿Fue el manejo de errores?
   - ¿La organización del storage?
   - ¿Los tests?

2. **¿Qué aprendiste sobre el operador `?`?**
   - ¿Dónde lo usaste?
   - ¿Por qué es útil?

3. **¿Por qué el orden de validaciones importa?**
   - ¿Qué validaste primero?
   - ¿Por qué ese orden?

4. **¿Entiendes la diferencia entre Instance y Persistent?**
   - ¿Qué pusiste en cada uno?
   - ¿Por qué?

5. **¿Por qué usamos `String` en lugar de `Symbol`?**
   - ¿Qué métodos tiene `String` que `Symbol` no tiene?
   - ¿En qué casos usarías cada uno?

---

## 🚀 Retos adicionales (Opcionales)

### Reto 1: Agregar estadísticas por usuario

Modifica el contrato para rastrear cuántas veces cada Tiburona ha saludado:

```rust
// Agregar a DataKey:
ContadorPorUsuario(Address)

// Modificar hello() para:
// 1. Leer contador de usuario
// 2. Incrementar
// 3. Guardar

// Agregar función:
pub fn get_contador_usuario(env: Env, usuario: Address) -> u32
```

### Reto 2: Implementar transfer_admin

Crea una función para transferir el ownership:

```rust
pub fn transfer_admin(
    env: Env,
    caller: Address,
    nuevo_admin: Address
) -> Result<(), Error> {
    // 1. Verificar que caller sea el admin actual
    // 2. Cambiar el admin
    // 3. Retornar Ok
}
```

### Reto 3: Agregar límite de longitud configurable

Modifica para que el límite de caracteres sea configurable:

```rust
// Agregar a DataKey:
LimiteCaracteres

// Agregar función:
pub fn set_limite(
    env: Env,
    caller: Address,
    limite: u32
) -> Result<(), Error> {
    // Solo admin puede cambiar
}

// Modificar hello() para usar el límite guardado
```

---

## 📚 Recursos adicionales

### Si te quedaste atascada:

1. **Revisa la documentación:**
   - [Manejo de errores en Soroban](https://developers.stellar.org/docs/learn/fundamentals/contract-development/errors-and-debugging)
   - [Storage en Soroban](https://developers.stellar.org/docs/learn/fundamentals/contract-development/storage/persisting-data)

2. **Consulta los ejemplos oficiales:**
   - [Soroban Examples en GitHub](https://github.com/stellar/soroban-examples)

3. **Pregunta en la clase de refuerzo:**
   - Sábado 18 de octubre, 18:30-19:30

---

## 🦈 Mensaje final

Tiburona, si completaste esta tarea:

**NO solo escribiste código. Construiste un contrato profesional.**

Ahora sabes:
- ✅ Manejar errores como las profesionales
- ✅ Organizar storage eficientemente
- ✅ Validar inputs antes de cambiar estado
- ✅ Implementar control de acceso
- ✅ Escribir tests comprehensivos
- ✅ **Entender cuándo usar `String` vs `Symbol`**

**Esto es lo que separa un "Hello World" de un contrato production-ready.**

Y lo hiciste tú. Con tus manos. Línea por línea.

**Eso no es poca cosa.**

En la próxima clase (Clase 5), vas a construir tu primer TOKEN completo. Y ahora tienes las bases sólidas para hacerlo.

Celebra este logro. Te lo ganaste.

---

## 📝 Entrega (Opcional)

Si quieres feedback personalizado, comparte:

1. **Tu código** (link a GitHub o archivo .rs)
2. **Screenshot de tests pasando**
3. **Una reflexión corta:**
   - ¿Qué fue lo más retador?
   - ¿Qué aprendiste que no esperabas?
   - ¿Qué aplicarías en tus propios proyectos?

---

## 🔄 Próximos pasos

1. **Completa esta tarea**
2. **Asiste a la clase de refuerzo** (si tienes dudas)
3. **Prepárate para Clase 5:** Construirás tu primer token (¡el verdadero poder!)
4. **Empieza a pensar:** ¿Qué proyecto blockchain quieres crear?

---

🦈⚡ **¡Vamos a construir!** ⚡🦈

*"El código que escribas hoy puede cambiar vidas mañana. Pero primero, debes aprender a escribir código que importe."*