# 🦈 Parte 3: Storage Patterns en Soroban
## Donde viven tus datos en la blockchain

**Tiempo estimado:** 22 minutos

---

## 🎯 ¿Qué vas a entender en esta sección?

Al final de estos 22 minutos, vas a poder:

- [ ] Explicar los 3 tipos de storage en Soroban
- [ ] Decidir qué tipo usar según el dato
- [ ] Entender qué es TTL y por qué importa
- [ ] Usar DataKey enums para organizar storage
- [ ] Reconocer patrones de storage profesional

---

## 💾 El concepto fundamental: Storage en blockchain

### En una app web tradicional:

```
Usuario crea cuenta
    ↓
Datos se guardan en base de datos
    ↓
La base de datos vive en un servidor
    ↓
El servidor lo mantienes tú
```

**Costo:** Pagas hosting mensual (fijo)

### En blockchain:

```
Usuario interactúa con contrato
    ↓
Datos se guardan en la blockchain
    ↓
La blockchain es distribuida (miles de nodos)
    ↓
Cada nodo guarda una copia
```

**Costo:** Pagas por cada byte guardado (variable)

**Diferencia crítica:** En blockchain, el storage es CARO. Por eso hay 3 tipos optimizados para diferentes necesidades.

---

## 🗄️ Los 3 tipos de storage en Soroban

Según la [documentación oficial de Soroban](https://developers.stellar.org/docs/learn/fundamentals/contract-development/storage/persisting-data), existen tres tipos:

### 1. Instance Storage 📦
**Para qué:** Configuración del contrato (global)

```rust
env.storage().instance()
```

**Características:**
- ✅ Asociado al contrato completo
- ✅ Dura mientras el contrato esté activo
- ✅ Costo medio
- ✅ Se extiende con el contrato

**Ejemplos:**
- Dirección del admin
- Nombre del token
- Configuración global
- Contador total de operaciones

**Decisión:** Úsalo para datos que son "del contrato" no "de usuarios específicos"

---

### 2. Persistent Storage 💎
**Para qué:** Datos críticos que DEBEN persistir

```rust
env.storage().persistent()
```

**Características:**
- ✅ Datos específicos por usuario
- ✅ Se controla TTL individualmente
- ✅ Más caro (datos críticos)
- ✅ Requiere extensión periódica

**Ejemplos:**
- Balances de usuarios
- Propiedad de NFTs
- Historial de transacciones
- Registros de préstamos

**Decisión:** Úsalo para datos que representan valor o derechos

---

### 3. Temporary Storage ⚡
**Para qué:** Datos temporales o cache

```rust
env.storage().temporary()
```

**Características:**
- ✅ TTL corto
- ✅ Más barato
- ✅ Puede expirar rápido
- ✅ Ideal para cache

**Ejemplos:**
- Precios de oracles (se actualizan frecuentemente)
- Locks temporales durante transacciones
- Cache de cálculos
- Datos que se recalculan periódicamente

**Decisión:** Úsalo para datos que NO son críticos y pueden regenerarse

---

## 📊 Tabla de decisión: ¿Qué storage usar?

| Tipo de dato | Storage | Razón |
|--------------|---------|-------|
| Dirección del admin | Instance | Es configuración del contrato |
| Nombre del token | Instance | Metadato global |
| Balance de María | Persistent | Crítico, específico de usuario |
| NFT #123 pertenece a Ana | Persistent | Prueba de propiedad |
| Precio actual de XLM | Temporary | Se actualiza constantemente |
| Lock durante transfer | Temporary | Solo necesario durante operación |
| Contador total de donaciones | Instance | Estadística global |
| Última donación de Sofía | Persistent | Registro específico de usuario |

---

## 🔑 DataKey Pattern: Organizando el storage

### El problema sin DataKey:

```rust
// ❌ MAL: Strings literales por todos lados
pub fn set_admin(env: Env, admin: Address) {
    env.storage().instance().set(&"admin", &admin);
}

pub fn set_balance(env: Env, user: Address, balance: i128) {
    // ❌ No se puede hacer esto en Soroban
    let key = format!("balance_{}", user);
    env.storage().persistent().set(&key, &balance);
}

pub fn get_admin(env: Env) -> Address {
    env.storage().instance().get(&"admon")  // ❌ TYPO: "admon" vs "admin"
}
```

**Problemas:**

1. **Typos silenciosos:** "admin" vs "admon" → bug que el compilador NO detecta
2. **Sin autocomplete:** No sabes qué keys existen
3. **Imposible refactorizar:** Cambiar nombres requiere buscar strings en todo el código
4. **No documentado:** ¿Qué keys usa el contrato? Hay que leer todo el código

---

### La solución: DataKey Enum

```rust
use soroban_sdk::contracttype;

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    // Instance storage - configuración global
    Admin,
    NombreToken,
    TotalDonaciones,
    
    // Persistent storage - datos de usuarios
    Balance(Address),           // Key compuesta
    UltimaDonacion(Address),    // Key compuesta
    Donacion(u32),              // Key compuesta por ID
}
```

**Análisis de decisiones:**

1. **`#[contracttype]`** 
   - Macro de Soroban para tipos en storage
   - Genera código de serialización automáticamente

2. **`enum` en lugar de constantes**
   - El compilador verifica que uses keys válidas
   - Autocomplete en el IDE
   - Refactoring seguro

3. **Keys simples vs compuestas**
   - `Admin` → key simple, un solo valor
   - `Balance(Address)` → key compuesta, un valor por dirección
   - `Donacion(u32)` → key compuesta, un valor por ID

---

### Uso del DataKey:

```rust
#[contract]
pub struct PlataformaDonaciones;

#[contractimpl]
impl PlataformaDonaciones {
    // Configuración global (Instance)
    pub fn set_admin(env: Env, admin: Address) {
        env.storage()
            .instance()
            .set(&DataKey::Admin, &admin);
    }
    
    pub fn get_admin(env: Env) -> Address {
        env.storage()
            .instance()
            .get(&DataKey::Admin)
            .expect("Admin no inicializado")
    }
    
    // Datos de usuario (Persistent)
    pub fn get_balance(env: Env, usuario: Address) -> i128 {
        env.storage()
            .persistent()
            .get(&DataKey::Balance(usuario))
            .unwrap_or(0)
    }
    
    pub fn set_balance(env: Env, usuario: Address, balance: i128) {
        env.storage()
            .persistent()
            .set(&DataKey::Balance(usuario), &balance);
    }
    
    // Datos indexados (Persistent)
    pub fn guardar_donacion(env: Env, id: u32, donacion: DonacionInfo) {
        env.storage()
            .persistent()
            .set(&DataKey::Donacion(id), &donacion);
    }
    
    pub fn get_donacion(env: Env, id: u32) -> Option<DonacionInfo> {
        env.storage()
            .persistent()
            .get(&DataKey::Donacion(id))
    }
}
```

**Ventajas:**

1. **Type safety:** `DataKey::Admon` → Error de compilación ✅
2. **Documentación automática:** Todas las keys visibles en un lugar
3. **Refactoring seguro:** Renombrar `Admin` → cambia en todos lados
4. **IDE support:** Autocomplete te muestra todas las keys disponibles

---

## ⏰ Time To Live (TTL): La vida de los datos

### ¿Por qué existe el TTL?

En Soroban, el storage NO es eterno por defecto.

**Problema a resolver:**
- Contratos abandonados ocuparían espacio para siempre
- La blockchain crecería sin límite
- Costos de mantenimiento serían insostenibles

**Solución:**
- Cada dato tiene un TTL (Time To Live)
- El TTL se mide en ledgers (bloques)
- Si el TTL expira, el dato se borra
- Los contratos activos DEBEN extender el TTL periódicamente

**Analogía:** Es como renovar una suscripción. Si no renuevas, pierdes acceso.

---

### Extender TTL: La sintaxis

```rust
env.storage()
    .instance()
    .extend_ttl(threshold, extend_to);
```

**Parámetros:**

1. **threshold:** "Si quedan menos de N ledgers..."
2. **extend_to:** "...extiende la vida por M ledgers"

**Ejemplo:**

```rust
env.storage()
    .instance()
    .extend_ttl(100, 100);
```

**Significado:**
- "Si quedan menos de 100 ledgers antes de expirar..."
- "...extiende por 100 ledgers más"

**Decisión:** Valores comunes son 100-200 ledgers (conservative)

---

### Estrategia de TTL: Cuándo extender

#### Opción 1: Extender en cada operación

```rust
pub fn transfer(
    env: Env,
    de: Address,
    para: Address,
    monto: i128
) -> Result<(), Error> {
    // Validaciones...
    
    // Actualizar balances...
    
    // Extender TTL después de usar los datos
    env.storage()
        .persistent()
        .extend_ttl(&DataKey::Balance(de.clone()), 100, 100);
    
    env.storage()
        .persistent()
        .extend_ttl(&DataKey::Balance(para), 100, 100);
    
    Ok(())
}
```

**Ventajas:**
- ✅ Datos activos nunca expiran
- ✅ Simple de implementar

**Desventajas:**
- ❌ Cada operación paga por extensión (más gas)

---

#### Opción 2: Extender selectivamente

```rust
pub fn transfer(
    env: Env,
    de: Address,
    para: Address,
    monto: i128
) -> Result<(), Error> {
    // Validaciones...
    
    // Actualizar balances...
    
    // Solo extender si está cerca de expirar
    let ttl_actual = env.storage()
        .persistent()
        .get_ttl(&DataKey::Balance(de.clone()));
    
    if ttl_actual < 50 {
        env.storage()
            .persistent()
            .extend_ttl(&DataKey::Balance(de), 100, 100);
    }
    
    Ok(())
}
```

**Ventajas:**
- ✅ Ahorra gas (solo extiende cuando necesario)

**Desventajas:**
- ❌ Más complejo
- ❌ Requiere verificación adicional

---

#### Decisión recomendada: Opción 1 para contratos críticos

**Razón:** 
- Simplicidad > Optimización prematura
- El costo extra de gas es predecible
- No hay riesgo de que datos críticos expiren

**Caso de uso:** Token o sistema de donaciones → Opción 1

**Excepción:** Cache o datos temporales → No extender (dejar expirar)

---

## 🏗️ Ejemplo completo: Plataforma de donaciones

```rust
#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    // Instance: Configuración del contrato
    Admin,
    NombrePlataforma,
    TotalDonaciones,
    
    // Persistent: Datos críticos de usuarios
    BalanceDonante(Address),
    DonacionesRecibidas(Address),  // Total recibido por beneficiaria
    Donacion(u32),                 // Detalle de donación por ID
    
    // Temporary: Cache
    CacheTotalDonado,  // Se recalcula cada 100 ledgers
}

#[contracttype]
#[derive(Clone)]
pub struct DonacionInfo {
    pub donante: Address,
    pub beneficiaria: Address,
    pub monto: i128,
    pub timestamp: u64,
}

#[contract]
pub struct PlataformaDonaciones;

#[contractimpl]
impl PlataformaDonaciones {
    // Inicializar (una sola vez)
    pub fn initialize(env: Env, admin: Address, nombre: Symbol) -> Result<(), Error> {
        if env.storage().instance().has(&DataKey::Admin) {
            return Err(Error::YaInicializado);
        }
        
        // Guardar configuración global
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::NombrePlataforma, &nombre);
        env.storage().instance().set(&DataKey::TotalDonaciones, &0u32);
        
        // Extender TTL de configuración
        env.storage().instance().extend_ttl(100, 100);
        
        Ok(())
    }
    
    // Donar (operación crítica)
    pub fn donar(
        env: Env,
        donante: Address,
        beneficiaria: Address,
        monto: i128
    ) -> Result<(), Error> {
        // 1. Validaciones
        donante.require_auth();
        
        if monto <= 0 {
            return Err(Error::MontoInvalido);
        }
        
        // 2. Actualizar balance del donante
        let balance_donante = env.storage()
            .persistent()
            .get(&DataKey::BalanceDonante(donante.clone()))
            .unwrap_or(0);
        
        if balance_donante < monto {
            return Err(Error::BalanceInsuficiente);
        }
        
        env.storage()
            .persistent()
            .set(&DataKey::BalanceDonante(donante.clone()), &(balance_donante - monto));
        
        // 3. Actualizar donaciones recibidas por beneficiaria
        let total_recibido = env.storage()
            .persistent()
            .get(&DataKey::DonacionesRecibidas(beneficiaria.clone()))
            .unwrap_or(0);
        
        env.storage()
            .persistent()
            .set(&DataKey::DonacionesRecibidas(beneficiaria.clone()), &(total_recibido + monto));
        
        // 4. Guardar detalle de donación
        let id_donacion: u32 = env.storage()
            .instance()
            .get(&DataKey::TotalDonaciones)
            .unwrap_or(0);
        
        let donacion = DonacionInfo {
            donante: donante.clone(),
            beneficiaria: beneficiaria.clone(),
            monto,
            timestamp: env.ledger().timestamp(),
        };
        
        env.storage()
            .persistent()
            .set(&DataKey::Donacion(id_donacion), &donacion);
        
        // 5. Incrementar contador global
        env.storage()
            .instance()
            .set(&DataKey::TotalDonaciones, &(id_donacion + 1));
        
        // 6. Extender TTL de datos críticos
        env.storage()
            .persistent()
            .extend_ttl(&DataKey::BalanceDonante(donante), 100, 100);
        
        env.storage()
            .persistent()
            .extend_ttl(&DataKey::DonacionesRecibidas(beneficiaria), 100, 100);
        
        env.storage()
            .persistent()
            .extend_ttl(&DataKey::Donacion(id_donacion), 100, 100);
        
        // 7. Extender TTL de instance storage
        env.storage().instance().extend_ttl(100, 100);
        
        Ok(())
    }
    
    // Consultas (no modifican estado)
    pub fn get_balance_donante(env: Env, donante: Address) -> i128 {
        env.storage()
            .persistent()
            .get(&DataKey::BalanceDonante(donante))
            .unwrap_or(0)
    }
    
    pub fn get_total_recibido(env: Env, beneficiaria: Address) -> i128 {
        env.storage()
            .persistent()
            .get(&DataKey::DonacionesRecibidas(beneficiaria))
            .unwrap_or(0)
    }
    
    pub fn get_donacion(env: Env, id: u32) -> Option<DonacionInfo> {
        env.storage()
            .persistent()
            .get(&DataKey::Donacion(id))
    }
    
    pub fn get_total_donaciones(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::TotalDonaciones)
            .unwrap_or(0)
    }
}
```

---

## 📊 Análisis de decisiones de diseño

### 1. Separación por tipo de storage

```rust
pub enum DataKey {
    // Instance: Configuración global
    Admin,
    NombrePlataforma,
    TotalDonaciones,
    
    // Persistent: Datos de usuarios
    BalanceDonante(Address),
    DonacionesRecibidas(Address),
    Donacion(u32),
    
    // Temporary: Cache
    CacheTotalDonado,
}
```

**Decisión:** Agrupar keys por tipo de storage (comentarios)

**Razón:** 
- Documentación clara
- Fácil identificar qué va en cada storage
- Ayuda en auditorías

---

### 2. Keys compuestas vs simples

```rust
// ✅ Key compuesta - un valor por usuario
BalanceDonante(Address)

// ✅ Key simple - un solo valor global
TotalDonaciones
```

**Decisión:** Usar keys compuestas para datos por entidad

**Razón:**
- `Balance(Address)` crea automáticamente claves únicas
- No hay colisión entre usuarios
- Fácil de extender (agregar más usuarios sin cambiar estructura)

---

### 3. Orden de operaciones en `donar()`

```rust
pub fn donar(...) -> Result<(), Error> {
    // 1. Validaciones
    // 2. Actualizar balance donante
    // 3. Actualizar balance beneficiaria
    // 4. Guardar detalle
    // 5. Incrementar contador
    // 6. Extender TTL
}
```

**Decisión:** TTL al final, después de todas las operaciones

**Razón:**
- Si una validación falla, no se desperdicia gas en TTL
- Solo extender si la operación fue exitosa
- Más eficiente en gas

---

### 4. Instance vs Persistent para contador

```rust
// Contador global en Instance
env.storage().instance().set(&DataKey::TotalDonaciones, &contador);
```

**Decisión:** Instance storage para contador global

**Razón:**
- Es un dato del contrato, no de un usuario específico
- Se extiende con el contrato completo (eficiente)
- No necesita TTL individual

**Alternativa (menos eficiente):**
```rust
// ❌ Menos eficiente: contador en Persistent
env.storage().persistent().set(&DataKey::TotalDonaciones, &contador);
// Tendríamos que extender TTL específicamente para el contador
```

---

### 5. Struct para datos complejos

```rust
#[contracttype]
#[derive(Clone)]
pub struct DonacionInfo {
    pub donante: Address,
    pub beneficiaria: Address,
    pub monto: i128,
    pub timestamp: u64,
}
```

**Decisión:** Usar struct para agrupar datos relacionados

**Razón:**
- Una key → todos los datos de la donación
- Más eficiente que múltiples keys
- Fácil de serializar/deserializar

**Alternativa (menos eficiente):**
```rust
// ❌ Múltiples keys para una donación
DataKey::DonacionDonante(u32)
DataKey::DonacionBeneficiaria(u32)
DataKey::DonacionMonto(u32)
DataKey::DonacionTimestamp(u32)
// 4 lecturas/escritas vs 1
```

---

## 🎯 Patrones avanzados de storage

### Patrón 1: Lazy initialization

```rust
pub fn get_balance(env: Env, usuario: Address) -> i128 {
    env.storage()
        .persistent()
        .get(&DataKey::Balance(usuario))
        .unwrap_or(0)  // Si no existe, devuelve 0 (inicialización perezosa)
}
```

**Ventaja:** No necesitas inicializar explícitamente cada usuario

---

### Patrón 2: Verificación de existencia

```rust
pub fn usuario_existe(env: Env, usuario: Address) -> bool {
    env.storage()
        .persistent()
        .has(&DataKey::Balance(usuario))
}
```

**Decisión:** Usar `has()` en lugar de `get()`

**Razón:** Más barato (no deserializa el valor, solo verifica existencia)

---

### Patrón 3: Datos relacionados

```rust
pub fn eliminar_usuario(env: Env, usuario: Address) -> Result<(), Error> {
    // Eliminar todos los datos relacionados
    env.storage().persistent().remove(&DataKey::Balance(usuario.clone()));
    env.storage().persistent().remove(&DataKey::UltimaDonacion(usuario.clone()));
    env.storage().persistent().remove(&DataKey::TotalDonado(usuario));
    
    Ok(())
}
```

**Decisión:** Eliminar datos relacionados juntos

**Razón:** Evitar datos huérfanos, mantener consistencia

---

## ✅ Mejores prácticas de storage

### DO (Hacer) ✅

1. **Usa DataKey enums**
   ```rust
   #[contracttype]
   pub enum DataKey { ... }
   ```

2. **Extiende TTL en operaciones críticas**
   ```rust
   env.storage().persistent().extend_ttl(&key, 100, 100);
   ```

3. **Instance para configuración global**
   ```rust
   env.storage().instance().set(&DataKey::Admin, &admin);
   ```

4. **Persistent para datos de usuarios**
   ```rust
   env.storage().persistent().set(&DataKey::Balance(user), &balance);
   ```

5. **Temporary para cache**
   ```rust
   env.storage().temporary().set(&DataKey::CachePrice, &price);
   ```

### DON'T (No hacer) ❌

1. **No uses strings literales**
   ```rust
   // ❌ MAL
   env.storage().instance().set(&"admin", &admin);
   ```

2. **No olvides extend_ttl**
   ```rust
   // ❌ MAL: guardar sin extender TTL
   env.storage().persistent().set(&key, &value);
   // Los datos pueden expirar
   ```

3. **No uses Persistent para todo**
   ```rust
   // ❌ MAL: cache en persistent (caro)
   env.storage().persistent().set(&DataKey::Cache, &value);
   ```

4. **No mezcles tipos de storage arbitrariamente**
   ```rust
   // ❌ Confuso: mismo dato en diferentes storages
   env.storage().instance().set(&DataKey::Balance(user), &balance);
   // Más tarde...
   env.storage().persistent().set(&DataKey::Balance(user), &balance);
   ```

---

## ✅ Checklist de conceptos

Antes de pasar a la siguiente sección, verifica que entiendes:

- [ ] Los 3 tipos de storage: Instance, Persistent, Temporary
- [ ] Instance = configuración global, Persistent = datos de usuarios
- [ ] TTL debe extenderse periódicamente
- [ ] DataKey enum organiza y hace type-safe el storage
- [ ] Keys compuestas permiten datos por entidad
- [ ] Extender TTL después de operaciones exitosas

---

## 💭 Reflexión: El costo del storage

**Pregunta para ti:**

Si tienes 10,000 usuarios, cada uno con:
- Balance
- Última donación
- Historial de 100 transacciones

¿Prefieres:

**A)** Guardar TODO en Persistent (seguro pero caro)

**B)** Balance en Persistent, historial en Temporary (balance crítico, historial regenerable)

La respuesta depende de tu caso de uso. Pero ahora tienes las herramientas para decidir.

---

## 🔄 Conexión con la siguiente sección

Ya entiendes:
- ✅ Traits (cómo estructurar contratos)
- ✅ Result/Option (cómo manejar errores)
- ✅ Storage (dónde guardar datos)

Ahora veremos CÓMO todo esto se junta en un contrato completo y profesional.

En la Parte 4 analizaremos el Hello World mejorado — línea por línea, decisión por decisión.

---

🦈⚡ **Siguiente:** [04-ejemplo-completo.md - Hello World Mejorado](./04-ejemplo-completo.md) ⚡🦈