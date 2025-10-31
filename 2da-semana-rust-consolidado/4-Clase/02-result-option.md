# 🦈 Parte 2: Result y Option - Manejo de Errores
## Cuando las cosas pueden salir mal (y cómo manejarlo bien)

**Tiempo estimado:** 22 minutos

---

## 🎯 ¿Qué vas a entender en esta sección?

Al final de estos 22 minutos, vas a poder:

- [ ] Explicar por qué los panics son peligrosos en blockchain
- [ ] Diferenciar cuándo usar `Option<T>` vs `Result<T, E>`
- [ ] Entender el operador `?` y por qué es poderoso
- [ ] Identificar el orden correcto de validaciones
- [ ] Reconocer patrones de manejo de errores profesional

---

## 💥 El problema: Panics en blockchain

### Escenario real:

Tu amiga Sofía creó un contrato de transferencias. El código se ve así:

```rust
pub fn transfer(env: Env, de: Address, para: Address, monto: i128) {
    let balance = env.storage()
        .persistent()
        .get(&DataKey::Balance(de.clone()))
        .unwrap();  // 💣 BOMBA DE TIEMPO
    
    // Restar balance
    let nuevo_balance = balance - monto;  // 💣 OTRA BOMBA
    
    env.storage()
        .persistent()
        .set(&DataKey::Balance(de), &nuevo_balance);
}
```

**¿Qué puede salir mal?**

### Problema 1: Usuario nuevo
```rust
// Ana nunca ha usado el contrato
let ana = Address::generate(&env);
contrato.transfer(env, ana, beneficiaria, 100);

// Resultado: 💥 PANIC
// Razón: .unwrap() falla porque Ana no tiene balance guardado
// Consecuencia: La transacción falla, Ana pierde gas, nada funciona
```

### Problema 2: Balance insuficiente
```rust
// María tiene 50 tokens, intenta enviar 100
contrato.transfer(env, maria, beneficiaria, 100);

// Resultado: Balance = 50 - 100 = -50 ❌
// Razón: No hay validación
// Consecuencia: Balance negativo (imposible en la realidad)
```

### Problema 3: Monto negativo
```rust
// Alguien intenta ser astuta
contrato.transfer(env, atacante, victima, -1000);

// Resultado: Balance aumenta en lugar de disminuir ❌
// Razón: -(-1000) = +1000
// Consecuencia: Creación de dinero de la nada
```

---

## 🔍 La diferencia crítica en blockchain

En una aplicación web normal:
- Un error → mensaje de error → usuario intenta de nuevo
- Costo: Tiempo del usuario

En blockchain:
- Un error → transacción falla → usuario pierde gas
- Costo: **Dinero real**

**Por eso el manejo de errores NO es opcional. Es crítico.**

---

## 💡 Option<T>: Para valores que pueden no existir

### ¿Qué es Option?

```rust
enum Option<T> {
    Some(T),  // Existe un valor
    None,     // No existe valor
}
```

**Úsalo cuando:** Algo puede legítimamente no existir.

### Ejemplo: Balance de usuario

```rust
// ❌ MAL: Devolver 0 cuando no existe
pub fn get_balance_malo(env: Env, usuario: Address) -> i128 {
    env.storage()
        .persistent()
        .get(&DataKey::Balance(usuario))
        .unwrap_or(0)  // ¿0 significa "no tiene" o "tiene 0"?
}
```

**Problema:** Ambigüedad
- Usuario nuevo → devuelve 0
- Usuario con balance 0 → devuelve 0
- ¿Cómo diferencias entre "no existe" y "existe pero es 0"?

```rust
// ✅ BIEN: Ser explícito con Option
pub fn get_balance(env: Env, usuario: Address) -> Option<i128> {
    env.storage()
        .persistent()
        .get(&DataKey::Balance(usuario))
}
```

**Uso:**
```rust
let balance = get_balance(env, usuario);

match balance {
    Some(b) => {
        // Usuario existe, trabajar con balance b
        log!("Balance: {}", b);
    }
    None => {
        // Usuario nuevo, inicializar
        log!("Usuario nuevo, creando cuenta...");
    }
}
```

**Decisión de diseño:**
- `Option<i128>` comunica claramente: "Puede no haber valor"
- El compilador OBLIGA a manejar el caso `None`
- No hay forma de olvidar el caso de usuario nuevo

---

### Métodos útiles de Option

```rust
let balance: Option<i128> = get_balance(env, usuario);

// 1. unwrap_or() - Valor por defecto
let balance_seguro = balance.unwrap_or(0);
// Si es Some(50) → 50
// Si es None → 0

// 2. unwrap_or_else() - Cálculo por defecto
let balance_calculado = balance.unwrap_or_else(|| {
    // Lógica para calcular balance inicial
    calcular_balance_inicial()
});

// 3. map() - Transformar el valor si existe
let balance_doble = balance.map(|b| b * 2);
// Si es Some(50) → Some(100)
// Si es None → None

// 4. and_then() - Encadenar operaciones
let balance_validado = balance.and_then(|b| {
    if b > 0 {
        Some(b)
    } else {
        None
    }
});
```

**Decisión:** Usar el método apropiado según el contexto
- `unwrap_or()` → Cuando quieres un default simple
- `map()` → Cuando quieres transformar el valor
- `and_then()` → Cuando quieres validaciones adicionales

---

## ✅ Result<T, E>: Para operaciones que pueden fallar

### ¿Qué es Result?

```rust
enum Result<T, E> {
    Ok(T),   // Operación exitosa con valor T
    Err(E),  // Operación falló con error E
}
```

**Úsalo cuando:** Una operación puede fallar con información específica del error.

### Definir errores personalizados

```rust
use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    BalanceInsuficiente = 1,
    MontoInvalido = 2,
    NoAutorizada = 3,
    LimiteExcedido = 4,
}
```

**Análisis de decisiones:**

1. **`#[contracterror]`** → Macro de Soroban para errores de contrato
2. **`#[repr(u32)]`** → Cada error es un número (eficiente en blockchain)
3. **Números únicos** → `= 1`, `= 2`, etc. (fácil de loggear y debuggear)
4. **Nombres descriptivos** → Sabes exactamente qué salió mal

**¿Por qué números?**
- Los errores se transmiten por la red como números
- Ahorran espacio y gas
- Son únicos y trazables en logs

---

## 🔄 Transfer seguro: Antes vs Después

### ❌ ANTES: Sin validaciones

```rust
pub fn transfer_inseguro(env: Env, de: Address, para: Address, monto: i128) {
    // Sin autenticación
    let balance = env.storage()
        .persistent()
        .get(&DataKey::Balance(de.clone()))
        .unwrap();  // 💣 Panic si no existe
    
    // Sin validar balance suficiente
    let nuevo_balance = balance - monto;  // 💣 Puede ser negativo
    
    env.storage()
        .persistent()
        .set(&DataKey::Balance(de), &nuevo_balance);
}
```

**Problemas:**
1. ❌ No verifica que `de` autorizó la operación
2. ❌ Panic si `de` no existe
3. ❌ No valida que `monto` sea positivo
4. ❌ No verifica balance suficiente
5. ❌ No informa por qué falló

---

### ✅ DESPUÉS: Con validaciones completas

```rust
pub fn transfer(
    env: Env,
    de: Address,
    para: Address,
    monto: i128
) -> Result<(), Error> {
    // VALIDACIÓN 1: Autenticación
    // El que llama debe ser el dueño de los fondos
    de.require_auth();
    
    // VALIDACIÓN 2: Monto positivo
    // Verificar ANTES de tocar storage (barato)
    if monto <= 0 {
        return Err(Error::MontoInvalido);
    }
    
    // VALIDACIÓN 3: Balance del remitente
    // Leer storage solo si validaciones anteriores pasaron
    let balance_de = env.storage()
        .persistent()
        .get(&DataKey::Balance(de.clone()))
        .unwrap_or(0);  // Usuario nuevo = balance 0
    
    // VALIDACIÓN 4: Fondos suficientes
    if balance_de < monto {
        return Err(Error::BalanceInsuficiente);
    }
    
    // ✅ TODAS LAS VALIDACIONES PASARON
    // Ahora SÍ es seguro cambiar el estado
    
    let balance_para = env.storage()
        .persistent()
        .get(&DataKey::Balance(para.clone()))
        .unwrap_or(0);
    
    // Actualizar balances
    env.storage()
        .persistent()
        .set(&DataKey::Balance(de), &(balance_de - monto));
    
    env.storage()
        .persistent()
        .set(&DataKey::Balance(para), &(balance_para + monto));
    
    Ok(())  // ✅ Éxito
}
```

---

## 📊 Análisis de decisiones de diseño

### 1. Orden de validaciones (CRÍTICO)

```rust
// ✅ ORDEN CORRECTO:
// 1. Autenticación (require_auth)
// 2. Validaciones baratas (monto > 0)
// 3. Lectura de storage
// 4. Validaciones de estado (balance suficiente)
// 5. Modificación de storage
```

**¿Por qué este orden?**

#### Primero lo más barato:
```rust
if monto <= 0 {
    return Err(Error::MontoInvalido);
}
```
- No toca storage
- No consume gas extra
- Falla rápido si el monto es inválido

#### Después lo que requiere storage:
```rust
let balance_de = env.storage()
    .persistent()
    .get(&DataKey::Balance(de.clone()))
    .unwrap_or(0);

if balance_de < monto {
    return Err(Error::BalanceInsuficiente);
}
```
- Leer storage cuesta gas
- Pero es necesario para validar
- Solo se ejecuta si validaciones baratas pasaron

**Principio:** Fail fast (Falla rápido)
- Si va a fallar, mejor que falle temprano
- Ahorra gas al usuario
- Mejor experiencia de usuario

---

### 2. unwrap_or(0) vs expect()

#### Cuándo usar cada uno:

```rust
// ✅ unwrap_or(0) - Cuando None es legítimo
let balance = env.storage()
    .persistent()
    .get(&DataKey::Balance(usuario))
    .unwrap_or(0);
// Razón: Usuario nuevo = balance 0 es válido
```

```rust
// ✅ expect() - Cuando None es un error de programación
let admin = env.storage()
    .instance()
    .get(&DataKey::Admin)
    .expect("Contrato no inicializado");
// Razón: Si no hay admin, el contrato está mal configurado
```

**Decisión:**
- `unwrap_or(default)` → Estado válido, queremos default
- `expect(mensaje)` → Estado inválido, queremos panic con mensaje

---

### 3. require_auth() - El guardián

```rust
de.require_auth();
```

**¿Qué hace esta línea?**

1. Verifica que quien llama la función (el caller) es `de`
2. Si no, la transacción se rechaza ANTES de hacer nada
3. Previene que alguien transfiera fondos de otra persona

**Sin require_auth():**
```rust
// ❌ VULNERABLE
pub fn transfer(env: Env, de: Address, para: Address, monto: i128) {
    // Cualquiera puede llamar esto y vaciar la cuenta de otro
}
```

**Con require_auth():**
```rust
// ✅ SEGURO
pub fn transfer(env: Env, de: Address, para: Address, monto: i128) -> Result<(), Error> {
    de.require_auth();  // Solo el dueño puede transferir SUS fondos
}
```

**Decisión:** SIEMPRE usa `require_auth()` en funciones que mueven fondos.

---

## 🔧 Operador `?` - Propagación de errores

### El problema del manejo manual:

```rust
pub fn procesar_prestamo(
    env: Env,
    solicitante: Address,
    monto: i128
) -> Result<(), Error> {
    // Validar solicitante
    let info = match validar_solicitante(env.clone(), solicitante.clone()) {
        Ok(i) => i,
        Err(e) => return Err(e),
    };
    
    // Verificar límite
    let limite = match obtener_limite(env.clone(), solicitante.clone()) {
        Ok(l) => l,
        Err(e) => return Err(e),
    };
    
    // Verificar monto
    if monto > limite {
        return Err(Error::LimiteExcedido);
    }
    
    // Ejecutar préstamo
    match ejecutar_prestamo(env, solicitante, monto) {
        Ok(_) => Ok(()),
        Err(e) => Err(e),
    }
}
```

**Problema:** Extremadamente verboso. Mucho código repetitivo.

---

### La solución: Operador `?`

```rust
pub fn procesar_prestamo(
    env: Env,
    solicitante: Address,
    monto: i128
) -> Result<(), Error> {
    // Si falla, retorna el error automáticamente
    let info = validar_solicitante(env.clone(), solicitante.clone())?;
    let limite = obtener_limite(env.clone(), solicitante.clone())?;
    
    if monto > limite {
        return Err(Error::LimiteExcedido);
    }
    
    ejecutar_prestamo(env, solicitante, monto)?;
    Ok(())
}
```

**¿Qué hace `?`?**

```rust
let resultado = funcion_que_puede_fallar()?;

// Es equivalente a:
let resultado = match funcion_que_puede_fallar() {
    Ok(valor) => valor,          // Si es Ok, extrae el valor y continúa
    Err(e) => return Err(e),     // Si es Err, retorna inmediatamente
};
```

**Decisiones de diseño:**

1. **Reduce boilerplate** → Código más limpio y legible
2. **Early return** → Si falla, retorna inmediatamente
3. **Propagación automática** → El error sube a quien llamó la función
4. **Type-safe** → El compilador verifica que los tipos coincidan

**Importante:** Solo funciona en funciones que retornan `Result` o `Option`.

---

## 🎯 Patrones de validación profesional

### Patrón 1: Validaciones en capas

```rust
pub fn crear_donacion(
    env: Env,
    donante: Address,
    beneficiaria: Address,
    monto: i128
) -> Result<(), Error> {
    // CAPA 1: Autenticación
    donante.require_auth();
    
    // CAPA 2: Validaciones de input (baratas)
    if monto <= 0 {
        return Err(Error::MontoInvalido);
    }
    
    if monto > 1_000_000 {
        return Err(Error::LimiteExcedido);
    }
    
    // CAPA 3: Validaciones de estado (requieren storage)
    let balance = env.storage()
        .persistent()
        .get(&DataKey::Balance(donante.clone()))
        .unwrap_or(0);
    
    if balance < monto {
        return Err(Error::BalanceInsuficiente);
    }
    
    // CAPA 4: Ejecución (solo si todo pasó)
    ejecutar_donacion(env, donante, beneficiaria, monto)?;
    
    Ok(())
}
```

**Razón del orden:**
1. Autenticación → Quien llama debe estar autorizado
2. Inputs → Son lo más barato de validar
3. Estado → Requiere leer blockchain, más caro
4. Ejecución → Solo si TODO está bien

---

### Patrón 2: Conversión Option → Result

```rust
pub fn obtener_admin(env: &Env) -> Result<Address, Error> {
    env.storage()
        .instance()
        .get(&DataKey::Admin)
        .ok_or(Error::NoInicializado)?  // 👈 Convierte Option → Result
}
```

**¿Qué hace `ok_or()`?**

```rust
// Option<T> → Result<T, E>
Some(valor) → Ok(valor)
None → Err(error_especificado)
```

**Caso de uso:**
```rust
// Obtener admin (puede no existir)
let admin: Option<Address> = env.storage()
    .instance()
    .get(&DataKey::Admin);

// Convertir a Result porque "no existir" es un error
let admin: Result<Address, Error> = admin.ok_or(Error::NoInicializado);

// Propagar el error si no existe
let admin = admin?;  // Si es None → retorna Err(NoInicializado)
```

**Decisión:** Usa `ok_or()` cuando `None` debe tratarse como error.

---

### Patrón 3: Validación con helper functions

```rust
// Helper function reutilizable
fn validar_monto(monto: i128) -> Result<(), Error> {
    if monto <= 0 {
        return Err(Error::MontoInvalido);
    }
    
    if monto > 1_000_000 {
        return Err(Error::LimiteExcedido);
    }
    
    Ok(())
}

// Usar en múltiples funciones
pub fn transfer(env: Env, de: Address, para: Address, monto: i128) -> Result<(), Error> {
    de.require_auth();
    validar_monto(monto)?;  // 👈 Reutilizable
    // ... resto de la lógica
}

pub fn donar(env: Env, donante: Address, monto: i128) -> Result<(), Error> {
    donante.require_auth();
    validar_monto(monto)?;  // 👈 Misma validación
    // ... resto de la lógica
}
```

**Ventajas:**
- Una fuente de verdad para validación
- Fácil de actualizar (cambias en un lugar)
- Testeable de forma aislada
- Código más limpio

---

## 📊 Tabla de decisión: Option vs Result

| Situación | Tipo | Ejemplo |
|-----------|------|---------|
| Dato que puede no existir (válido) | `Option<T>` | Balance de usuario nuevo |
| Operación que puede fallar | `Result<T, E>` | Transfer de fondos |
| Configuración opcional | `Option<T>` | Descripción de perfil |
| Validación de input | `Result<(), E>` | Verificar monto positivo |
| Búsqueda en base de datos | `Option<T>` | Encontrar usuario por ID |
| Operación de escritura | `Result<(), E>` | Guardar en storage |

---

## 🔍 Ejemplo completo: Sistema de préstamos

```rust
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    BalanceInsuficiente = 1,
    MontoInvalido = 2,
    LimiteExcedido = 3,
    SolicitanteNoValida = 4,
}

#[contract]
pub struct MicroCredito;

#[contractimpl]
impl MicroCredito {
    // Obtener límite de crédito (puede no existir)
    pub fn get_limite(env: Env, solicitante: Address) -> Option<i128> {
        env.storage()
            .persistent()
            .get(&DataKey::LimiteCredito(solicitante))
    }
    
    // Solicitar préstamo (puede fallar)
    pub fn solicitar_prestamo(
        env: Env,
        solicitante: Address,
        monto: i128
    ) -> Result<(), Error> {
        // 1. Autenticación
        solicitante.require_auth();
        
        // 2. Validar monto
        if monto <= 0 {
            return Err(Error::MontoInvalido);
        }
        
        // 3. Verificar límite (Option → Result)
        let limite = Self::get_limite(env.clone(), solicitante.clone())
            .ok_or(Error::SolicitanteNoValida)?;
        
        // 4. Verificar que no excede límite
        if monto > limite {
            return Err(Error::LimiteExcedido);
        }
        
        // 5. Procesar préstamo
        Self::ejecutar_prestamo(env, solicitante, monto)?;
        
        Ok(())
    }
    
    fn ejecutar_prestamo(
        env: Env,
        solicitante: Address,
        monto: i128
    ) -> Result<(), Error> {
        // Lógica de préstamo
        let balance_actual = env.storage()
            .persistent()
            .get(&DataKey::Balance(solicitante.clone()))
            .unwrap_or(0);
        
        env.storage()
            .persistent()
            .set(&DataKey::Balance(solicitante), &(balance_actual + monto));
        
        Ok(())
    }
}
```

**Análisis de decisiones:**

1. **`get_limite()` retorna `Option`**
   - Razón: Es válido que una solicitante no tenga límite aún
   - Decisión: Dejar que el caller decida cómo manejar `None`

2. **`solicitar_prestamo()` retorna `Result`**
   - Razón: Puede fallar por múltiples motivos específicos
   - Decisión: Informar exactamente qué salió mal

3. **`.ok_or(Error::SolicitanteNoValida)?`**
   - Razón: Convertir `None` en error específico
   - Decisión: "No tener límite" = "No válida para préstamo"

4. **Validaciones en orden de costo**
   - Más barato: Verificar monto > 0
   - Después: Leer storage (límite)
   - Al final: Modificar storage

---

## ✅ Checklist de conceptos

Antes de pasar a la siguiente sección, verifica que entiendes:

- [ ] Un panic en blockchain consume gas sin completar la operación
- [ ] `Option<T>` es para "puede no existir" (None es válido)
- [ ] `Result<T, E>` es para "puede fallar" (error tiene información)
- [ ] El operador `?` propaga errores automáticamente
- [ ] Las validaciones deben ir de lo más barato a lo más caro
- [ ] `require_auth()` SIEMPRE en funciones que mueven fondos

---

## 💭 Reflexión: El costo de NO validar

**Pregunta para ti:**

Si tu contrato NO validara que el monto es positivo, ¿qué podría pasar?

```rust
// Sin validación
let balance = 100;
let monto = -50;
let nuevo_balance = balance - monto;  // 100 - (-50) = 150 ❌
```

Resultado: Alguien podría "donar" -50 tokens y recibir 50 tokens gratis.

**Esto no es teoría.** Contratos reales han perdido millones por no validar inputs.

Tu código debe ser paranoico. Debe asumir que alguien intentará romperlo.

---

## 🔄 Conexión con la siguiente sección

Ya sabes cómo manejar errores. Ahora necesitas entender DÓNDE guardas los datos que validas.

En la Parte 3 veremos Storage Patterns — cómo organizar y persistir datos en la blockchain de forma eficiente y segura.

Porque de nada sirve validar perfectamente si pierdes los datos después.

---

🦈⚡ **Siguiente:** [03-storage.md - Storage Patterns en Soroban](./03-storage.md) ⚡🦈