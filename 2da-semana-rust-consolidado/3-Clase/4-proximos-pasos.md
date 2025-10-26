# 🚀 PRÓXIMOS PASOS - Práctica y Desafíos

## 🎯 Objetivo de este documento

Ahora que dominás los conceptos fundamentales, es momento de practicar. Aquí encontrarás ejercicios progresivos para consolidar lo aprendido.

**No tengas miedo de romper cosas.** En testnet, todo se puede reiniciar. La mejor forma de aprender es experimentando. 🦈

---

## 📋 Checklist de repaso

Antes de empezar con los ejercicios, asegurate de que entendés:

- [ ] La diferencia entre `u32` y `u128`
- [ ] Cuándo usar `Symbol` vs `String`
- [ ] Qué significa `mut` y cuándo usarlo
- [ ] La diferencia entre move y copy
- [ ] Qué son `&T` y `&mut T`
- [ ] Cómo funciona `match` con `Option` y `Result`
- [ ] El patrón leer-modificar-guardar en storage
- [ ] Por qué emitimos eventos

**Si algún punto no está claro, volvé a `02-PASO-A-PASO.md` antes de continuar.**

---

## 🎓 Nivel 1: Entendiendo el código

### Ejercicio 1.1: Lectura de código

Lee estas funciones y respondé las preguntas:

```rust
pub fn mystery_function_a(env: Env) -> u32 {
    let value: u32 = env.storage()
        .instance()
        .get(&symbol_short!("DATA"))
        .unwrap_or(10);
    
    value * 2
}

pub fn mystery_function_b(env: Env, x: u32) {
    let mut current: u32 = env.storage()
        .instance()
        .get(&symbol_short!("TOTAL"))
        .unwrap_or(0);
    
    current += x;
    
    env.storage().instance().set(
        &symbol_short!("TOTAL"),
        &current
    );
}
```

**Preguntas:**
1. ¿Qué hace `mystery_function_a`? ¿Modifica el storage?
2. ¿Qué valor inicial usa `mystery_function_a` si "DATA" no existe?
3. ¿Qué hace `mystery_function_b`? ¿Modifica el storage?
4. ¿Por qué `current` necesita `mut` en `mystery_function_b`?
5. ¿Qué pasa si llamamos `mystery_function_b(env, 5)` tres veces seguidas?

<details>
<summary>👀 Ver respuestas</summary>

1. **mystery_function_a:** Lee "DATA" del storage y retorna el valor multiplicado por 2. NO modifica el storage (solo lectura).

2. **Valor inicial:** 10 (por el `unwrap_or(10)`)

3. **mystery_function_b:** Lee "TOTAL", le suma `x`, y guarda el nuevo valor. SÍ modifica el storage.

4. **Necesita mut:** Porque hace `current += x`, que modifica la variable.

5. **Llamadas múltiples:**
   - Primera llamada: 0 + 5 = 5
   - Segunda llamada: 5 + 5 = 10
   - Tercera llamada: 10 + 5 = 15
   - "TOTAL" termina valiendo 15

</details>

---

### Ejercicio 1.2: Detectar errores

Este código tiene errores. Encontralos y explicá por qué fallan:

```rust
// ERROR 1
pub fn bad_function_1(env: Env) {
    let contador = 0;
    contador += 1;
    env.storage().instance().set(&symbol_short!("COUNT"), &contador);
}

// ERROR 2
pub fn bad_function_2(env: Env) -> String {
    let s = String::from("hola");
    let s2 = s;
    s
}

// ERROR 3
pub fn bad_function_3(env: Env) {
    let mut x = String::from("test");
    let r1 = &mut x;
    let r2 = &mut x;
    println!("{}, {}", r1, r2);
}
```

<details>
<summary>👀 Ver respuestas</summary>

**ERROR 1:**
```rust
let contador = 0;  // ❌ Falta `mut`
contador += 1;     // ❌ No puede modificar variable inmutable
```
**Solución:**
```rust
let mut contador = 0;  // ✅
```

**ERROR 2:**
```rust
let s2 = s;  // Move: s ya no es válido
s            // ❌ Intentando usar s después del move
```
**Solución:**
```rust
s2  // ✅ Retornar s2 en lugar de s
```

**ERROR 3:**
```rust
let r1 = &mut x;
let r2 = &mut x;  // ❌ Segunda referencia mutable
```
**Solución:** Solo una referencia mutable a la vez. Usar r1 y esperar a que termine antes de crear r2.

</details>

---

## 🔨 Nivel 2: Modificando el contador

### Ejercicio 2.1: Agregar función increment_by

Implementá una nueva función que incremente el contador por una cantidad específica:

```rust
pub fn increment_by(env: Env, amount: u32) -> u32 {
    // Tu código aquí
    // Debe:
    // 1. Leer el contador actual
    // 2. Sumarle 'amount'
    // 3. Guardar el nuevo valor
    // 4. Emitir evento
    // 5. Retornar el nuevo valor
}
```

**Hint:** Es muy similar a `increment()`, pero en lugar de `+= 1`, usás `+= amount`.

<details>
<summary>💡 Ver solución</summary>

```rust
pub fn increment_by(env: Env, amount: u32) -> u32 {
    let mut contador: u32 = env.storage()
        .instance()
        .get(&symbol_short!("COUNTER"))
        .unwrap_or(0);
    
    contador += amount;
    
    env.storage().instance().set(
        &symbol_short!("COUNTER"),
        &contador
    );
    
    env.events().publish(
        (symbol_short!("incr_by"),),
        contador
    );
    
    contador
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
```

</details>

---

### Ejercicio 2.2: Agregar límite máximo

Modificá el contador para que tenga un límite máximo de 1000:

```rust
pub fn increment(env: Env) -> u32 {
    let mut contador: u32 = env.storage()
        .instance()
        .get(&symbol_short!("COUNTER"))
        .unwrap_or(0);
    
    // AGREGAR: Validación de límite máximo
    // Si contador >= 1000, hacer panic con mensaje apropiado
    
    contador += 1;
    
    env.storage().instance().set(
        &symbol_short!("COUNTER"),
        &contador
    );
    
    env.events().publish(
        (symbol_short!("increment"),),
        contador
    );
    
    contador
}
```

<details>
<summary>💡 Ver solución</summary>

```rust
pub fn increment(env: Env) -> u32 {
    let mut contador: u32 = env.storage()
        .instance()
        .get(&symbol_short!("COUNTER"))
        .unwrap_or(0);
    
    // Validación de límite
    if contador >= 1000 {
        panic!("Contador ha alcanzado el máximo de 1000");
    }
    
    contador += 1;
    
    env.storage().instance().set(
        &symbol_short!("COUNTER"),
        &contador
    );
    
    env.events().publish(
        (symbol_short!("increment"),),
        contador
    );
    
    contador
}
```

**Test para validación:**
```rust
#[test]
#[should_panic(expected = "máximo de 1000")]
fn test_increment_max_limit() {
    let env = Env::default();
    let contract_id = env.register_contract(None, ContadorContract);
    let client = ContadorContractClient::new(&env, &contract_id);
    
    // Llevar a 1000
    for _ in 0..1000 {
        client.increment();
    }
    
    // Esto debe fallar
    client.increment();
}
```

</details>

---

### Ejercicio 2.3: Función set_value

Implementá una función que permita establecer el contador a un valor específico:

```rust
pub fn set_value(env: Env, new_value: u32) {
    // Tu código aquí
    // Debe:
    // 1. Validar que new_value esté en rango (0-1000)
    // 2. Guardar el nuevo valor
    // 3. Emitir evento
}
```

**Consideraciones:**
- Validá que `new_value` no sea mayor a 1000
- Emití un evento "set_value" con el nuevo valor

<details>
<summary>💡 Ver solución</summary>

```rust
pub fn set_value(env: Env, new_value: u32) {
    // Validación
    if new_value > 1000 {
        panic!("Valor debe estar entre 0 y 1000");
    }
    
    // Guardar
    env.storage().instance().set(
        &symbol_short!("COUNTER"),
        &new_value
    );
    
    // Emitir evento
    env.events().publish(
        (symbol_short!("set_val"),),
        new_value
    );
}
```

**Test:**
```rust
#[test]
fn test_set_value() {
    let env = Env::default();
    let contract_id = env.register_contract(None, ContadorContract);
    let client = ContadorContractClient::new(&env, &contract_id);
    
    client.set_value(500);
    assert_eq!(client.get_count(), 500);
    
    client.set_value(0);
    assert_eq!(client.get_count(), 0);
}

#[test]
#[should_panic(expected = "entre 0 y 1000")]
fn test_set_value_invalid() {
    let env = Env::default();
    let contract_id = env.register_contract(None, ContadorContract);
    let client = ContadorContractClient::new(&env, &contract_id);
    
    client.set_value(2000);  // Debe fallar
}
```

</details>

---

## 🎨 Nivel 3: Proyecto nuevo

### Ejercicio 3.1: Contador con historial

Crea un contador que mantenga historial de los últimos 5 valores:

**Requisitos:**
1. Usar `Vec<u32>` para almacenar historial
2. Al incrementar/decrementar, agregar el nuevo valor al historial
3. Si el historial tiene más de 5 elementos, remover el más viejo
4. Función `get_history()` que retorne el Vec completo

**Estructura básica:**

```rust
#[contract]
pub struct ContadorConHistorial;

#[contractimpl]
impl ContadorConHistorial {
    pub fn increment(env: Env) -> u32 {
        // 1. Leer contador actual
        // 2. Incrementar
        // 3. Leer historial actual
        // 4. Agregar nuevo valor al historial
        // 5. Si historial > 5, remover el primero
        // 6. Guardar contador e historial
        // 7. Retornar nuevo valor
    }
    
    pub fn get_history(env: Env) -> Vec<u32> {
        // Retornar historial del storage
    }
}
```

<details>
<summary>💡 Ver pistas</summary>

**Pistas:**
1. Usá dos keys diferentes: "COUNT" para el contador, "HIST" para el historial
2. `Vec::new(&env)` crea Vec vacío
3. `vec.push_back(valor)` agrega al final
4. `vec.len()` retorna tamaño
5. Si `vec.len() > 5`, podés crear un nuevo Vec con los últimos 5

**Storage:**
```rust
// Leer historial
let mut history: Vec<u32> = env.storage()
    .instance()
    .get(&symbol_short!("HIST"))
    .unwrap_or(Vec::new(&env));

// Agregar nuevo valor
history.push_back(new_value);

// Limitar a 5 elementos (lógica depende de tu implementación)

// Guardar historial
env.storage().instance().set(&symbol_short!("HIST"), &history);
```

</details>

---

### Ejercicio 3.2: Sistema de votación simple

Crea un contrato de votación con dos opciones:

**Requisitos:**
1. Dos contadores: "option_a" y "option_b"
2. Función `vote_a(env: Env)` - vota por opción A
3. Función `vote_b(env: Env)` - vota por opción B
4. Función `get_results(env: Env) -> (u32, u32)` - retorna (votos_a, votos_b)
5. Función `get_winner(env: Env) -> Symbol` - retorna "A", "B", o "tie"

**Bonus:** Emití eventos para cada voto.

<details>
<summary>💡 Ver pistas</summary>

**Pistas:**
1. Cada opción tiene su propia key en storage
2. `vote_b()` es casi idéntico a `vote_a()`
3. `get_results()` lee ambas keys y retorna una tupla
4. `get_winner()` compara los valores

</details>

---

## 📚 Recursos adicionales

### Para profundizar en Rust

**The Rust Book (Oficial)**
- 📖 URL: https://doc.rust-lang.org/book/
- Capítulos recomendados:
  - Cap 3: Common Programming Concepts
  - Cap 4: Understanding Ownership ⭐
  - Cap 6: Enums and Pattern Matching

**Rust by Example**
- 📖 URL: https://doc.rust-lang.org/rust-by-example/
- Código ejecutable que podés modificar

**Rustlings - Ejercicios interactivos**
- 🏋️ URL: https://github.com/rust-lang/rustlings
- Instalación: `cargo install rustlings`
- Comando: `rustlings watch`

### Para profundizar en Soroban

**Soroban Learn (Oficial)**
- 📖 URL: https://soroban.stellar.org/docs/learn
- Ejemplos de contratos completos

**Soroban Examples Repository**
- 💻 URL: https://github.com/stellar/soroban-examples
- Código fuente de tokens, NFTs, AMMs

### Herramientas para practicar

**Rust Playground**
- 🎮 URL: https://play.rust-lang.org/
- Probá código sin instalar nada

**Soroban Testnet**
- 🌐 URL: https://soroban.stellar.org/docs/getting-started/deploy-to-testnet
- Desplegá contratos reales en testnet

---

## 🗺️ Roadmap de práctica sugerido

### Esta semana (opcional):
- [ ] Completar ejercicios Nivel 1 (Lectura de código)
- [ ] Intentar al menos 1 ejercicio del Nivel 2
- [ ] Leer Rust Book Capítulo 4

### Próxima semana (opcional):
- [ ] Experimentar con el contador
- [ ] Hacer ejercicios de Rustlings
- [ ] Explorar Soroban Examples

### Cuando tengas más tiempo:
- [ ] Proyecto del Nivel 3
- [ ] Implementar un token simple
- [ ] Desplegar en testnet

---

## 🤔 Preguntas frecuentes

### "¿Debo hacer todos estos ejercicios?"

**No.** Son sugerencias para practicar cuando quieras. No hay obligación ni deadline por ahora.

### "¿Cuánto tiempo toma dominar ownership?"

Para entenderlo conceptualmente: 1-2 semanas. Para usarlo naturalmente: 1-2 meses de práctica. Es normal luchar con el compilador al principio.

### "¿Debo memorizar todas las reglas?"

No. Entendé los conceptos fundamentales. El compilador te recordará las reglas cuando las necesites.

### "¿Qué hago si me trabo?"

1. Lee el mensaje de error completo
2. Buscá el código de error en https://doc.rust-lang.org/error-index.html
3. Preguntá en Discord
4. No te frustres - es parte del aprendizaje

---

## 🎯 Lo más importante

**No hay presión.** Este material es para que explores a tu ritmo.

Las **tareas obligatorias llegarán más adelante** en el curso. Por ahora, disfrutá experimentando con los conceptos.

**Rust es un marathon, no un sprint.** 🦈

---

## 📞 Canales de soporte

**¿Te trabás en algo?**
- 💬 Telegram en Consultas: Arrobanos y usa el #rust-ayuda

**¿Querés compartir tu progreso?**
- 🐦 Twitter: Usa #TiburonasBuilders y [arrobanos](https://x.com/buendiabuilders)

---

## 🦈 Mensaje final

### Lo que lograste hoy

No solo aprendiste sobre Rust. Dominaste conceptos fundamentales que te permiten escribir código seguro para blockchain:

✅ Tipos de datos optimizados  
✅ Ownership - seguridad por diseño  
✅ Borrowing - eficiencia sin sacrificar seguridad  
✅ Pattern matching - manejar todos los casos  
✅ Storage persistente  
✅ Tests para verificar

**La mayoría de la gente que habla de blockchain no entiende estos conceptos. Vos ahora sí.** 🦈

### El camino del Builder

Como las tiburonas reales:
- **Persistente:** Seguís nadando aunque el compilador te detenga
- **Precisa:** Cada línea de código tiene un propósito
- **Poderosa:** Dominás herramientas que previenen bugs millonarios
- **Pionera:** Estás construyendo el futuro

**No te compares con otros.** Compará con vos misma de ayer.

### Siguiente paso

La **Clase 4** profundizará en Structs y Enums. Vas a diseñar estructuras de datos complejas para aplicaciones reales.

**Pero primero:** Disfrutá haber dominado los fundamentos. Experimentá. Jugá con el código.

---

🦈⚡ **¡Vamos a construir, Tiburonas!** ⚡🦈

**Nos vemos en la Clase 4. Sigue construyendo, sigue nadando.**

---

> 💡 **Última reflexión:** Rust no es difícil porque sea mal diseñado. Es difícil porque te enseña a pensar en seguridad desde el día 1. Esa "dificultad" es en realidad entrenamiento para escribir código de producción de clase mundial.
    let mut to_balance = get_balance(env, to);
    
    from_balance -= amount;
    to_balance += amount;
    
    set_balance(env, from, from_balance);
    set_balance(env, to, to_balance);
}
```

**Preguntas:**
1. ¿Este código compila? ¿Por qué sí o no?
2. Si no compila, ¿cómo lo arreglarías?
3. ¿Qué validaciones faltan?

---

## 📚 Recursos adicionales

### Para profundizar en Rust

**The Rust Book (Oficial)**
- 📖 URL: https://doc.rust-lang.org/book/
- Capítulos recomendados:
  - Cap 3: Common Programming Concepts
  - Cap 4: Understanding Ownership ⭐
  - Cap 6: Enums and Pattern Matching
  - Cap 8: Common Collections

**Rust by Example**
- 📖 URL: https://doc.rust-lang.org/rust-by-example/
- Código ejecutable que podés modificar y experimentar
- Secciones recomendadas: Ownership, Borrowing, Match

**Rustlings - Ejercicios interactivos**
- 🏋️ URL: https://github.com/rust-lang/rustlings
- Pequeños ejercicios con retroalimentación inmediata
- Instalación: `cargo install rustlings`
- Comando: `rustlings watch`

### Para profundizar en Soroban

**Soroban Learn (Oficial)**
- 📖 URL: https://soroban.stellar.org/docs/learn
- Ejemplos de contratos completos
- Mejores prácticas
- Patrones comunes

**Soroban Examples Repository**
- 💻 URL: https://github.com/stellar/soroban-examples
- Código fuente de contratos de ejemplo
- Tokens, NFTs, AMMs, y más
- Perfecto para estudiar código real

### Herramientas para practicar

**Rust Playground**
- 🎮 URL: https://play.rust-lang.org/
- Probá código Rust sin instalar nada
- Compartí snippets con compañeras
- Perfecta para experimentar con ownership

**Soroban Testnet**
- 🌐 URL: https://soroban.stellar.org/docs/getting-started/deploy-to-testnet
- Desplegá contratos reales en testnet
- Tokens de prueba gratis
- Práctica en ambiente real

---

## 🗺️ Roadmap de práctica

### Semana 1: Fundamentos sólidos
- [ ] Completar ejercicios Nivel 1 (Lectura de código)
- [ ] Completar ejercicios Nivel 2 (Modificar contador)
- [ ] Hacer al menos 10 ejercicios de Rustlings
- [ ] Leer Rust Book Capítulo 4 completo

### Semana 2: Proyectos propios
- [ ] Completar ejercicio 3.1 (Contador con historial)
- [ ] Completar ejercicio 3.2 (Sistema de votación)
- [ ] Crear un proyecto original simple
- [ ] Escribir tests para todos tus proyectos

### Semana 3: Profundización
- [ ] Estudiar código de Soroban Examples
- [ ] Implementar un token simple (ERC20-like)
- [ ] Desplegar un contrato en testnet
- [ ] Compartir tu código con la comunidad

---

## ✅ Checklist de dominio

Antes de avanzar a la Clase 4, verificá que podés:

### Conceptos básicos
- [ ] Explicar qué es `mut` y cuándo usarlo
- [ ] Distinguir entre tipos Copy y Move
- [ ] Elegir entre u32 y u128 apropiadamente
- [ ] Decidir entre Symbol y String en cualquier contexto

### Ownership y Borrowing
- [ ] Explicar las 3 reglas de ownership
- [ ] Predecir cuándo ocurre un move
- [ ] Usar `&T` correctamente para lectura
- [ ] Usar `&mut T` correctamente para modificación
- [ ] Entender por qué solo puede haber una referencia mutable

### Pattern Matching
- [ ] Usar `match` con enums
- [ ] Manejar `Option<T>` con match y unwrap_or
- [ ] Manejar `Result<T, E>` apropiadamente
- [ ] Escribir validaciones con match y rangos

### Soroban específico
- [ ] Leer y escribir en storage
- [ ] Usar `symbol_short!` correctamente
- [ ] Emitir eventos para transparencia
- [ ] Escribir tests con `Env::default()`
- [ ] Validar inputs antes de modificar estado

---

## 🎯 Proyecto integrador (Opcional)

### Sistema de reputación simple

Implementá un contrato que permita:

**Funcionalidades:**
1. Los usuarios pueden dar "likes" a una entidad (identificada por Symbol)
2. Los usuarios pueden dar "dislikes" a una entidad
3. Cada usuario solo puede votar una vez por entidad
4. Funciones de consulta: get_likes, get_dislikes, get_score (likes - dislikes)
5. Función para ver si un usuario ya votó

**Estructura sugerida:**

```rust
#[contract]
pub struct ReputationContract;

// Necesitarás almacenar:
// - Map de (entity, user) -> vote_type
// - Contador de likes por entity
// - Contador de dislikes por entity
```

**Desafíos técnicos:**
- Necesitás guardar relaciones usuario-entidad
- Validar que un usuario no vote dos veces
- Manejar múltiples entidades simultáneamente

**Hints:**
- Podés usar keys compuestas como `symbol_short!("like_ENT")`
- Para verificar si un usuario votó, intentá leer su voto del storage
- Usá Vec para almacenar listas de usuarios si es necesario

<details>
<summary>💡 Ver estructura básica</summary>

```rust
#[contract]
pub struct ReputationContract;

#[contractimpl]
impl ReputationContract {
    pub fn like(env: Env, entity: Symbol, user: Address) {
        // 1. Verificar que el usuario no haya votado
        // 2. Incrementar contador de likes para entity
        // 3. Registrar que user votó por entity
        // 4. Emitir evento
    }
    
    pub fn dislike(env: Env, entity: Symbol, user: Address) {
        // Similar a like pero para dislikes
    }
    
    pub fn get_likes(env: Env, entity: Symbol) -> u32 {
        // Leer contador de likes para entity
    }
    
    pub fn get_dislikes(env: Env, entity: Symbol) -> u32 {
        // Leer contador de dislikes para entity
    }
    
    pub fn get_score(env: Env, entity: Symbol) -> i32 {
        // likes - dislikes (puede ser negativo, por eso i32)
    }
    
    pub fn has_voted(env: Env, entity: Symbol, user: Address) -> bool {
        // Verificar si user ya votó por entity
    }
}
```

</details>

---

## 🤔 Preguntas frecuentes

### "¿Por qué Rust es tan estricto?"

**Respuesta:** Porque está diseñado para prevenir bugs que en otros lenguajes solo se descubren en producción. En blockchain, un bug puede significar pérdida de fondos reales. La estrictez es protección.

### "¿Cuánto tiempo toma dominar ownership?"

**Respuesta:** Para entenderlo conceptualmente: 1-2 semanas. Para usarlo naturalmente: 1-2 meses de práctica. Es normal que al principio luches con el compilador. Todas pasamos por eso. 🦈

### "¿Debo memorizar todas las reglas?"

**Respuesta:** No. Entendé los conceptos fundamentales. El compilador te recordará las reglas específicas cuando las necesites. Con práctica, se vuelve intuitivo.

### "¿Qué hago si el compilador me da un error que no entiendo?"

**Respuesta:**
1. Lee el error completo (Rust da explicaciones muy buenas)
2. Buscá el código de error (ej: E0382) en https://doc.rust-lang.org/error-index.html
3. Preguntá en Discord con el código y el error
4. No te frustres - todos luchamos con el compilador al principio

### "¿Cuándo uso clone() y cuándo borrowing?"

**Respuesta:**
- **Borrowing (`&T`):** Cuando solo necesitás leer o modificar temporalmente
- **Clone:** Solo cuando realmente necesitás una copia independiente
- En smart contracts, preferí borrowing por eficiencia
- Clone cuesta gas - usalo conscientemente

### "¿Es normal que mis primeros contratos sean lentos de escribir?"

**Respuesta:** ¡Totalmente! Al principio, el compilador te detendrá mucho. Es parte del aprendizaje. Con práctica, escribirás código que compile al primer intento. Rust te entrena a pensar en seguridad desde el inicio.

---

## 🎓 Autoevaluación final

Respondé estas preguntas sin mirar las notas:

**Parte 1: Conceptos básicos**
1. ¿Cuál es la diferencia entre `let x = 5` y `let mut x = 5`?
2. ¿Por qué usarías `u128` en lugar de `u32` para un balance?
3. ¿Cuándo usarías `Symbol` en lugar de `String`?

**Parte 2: Ownership**
4. ¿Qué pasa con `s1` después de `let s2 = s1` si `s1` es un `String`?
5. ¿Por qué `let y = x` no invalida `x` cuando `x` es `u32`?
6. ¿Cuáles son las 3 reglas de ownership?

**Parte 3: Borrowing**
7. ¿Cuál es la diferencia entre `&String` y `&mut String`?
8. ¿Por qué no puedo tener dos `&mut` al mismo tiempo?
9. ¿Cuántas referencias `&` puedo tener simultáneamente?

**Parte 4: Pattern Matching**
10. ¿Qué hace `unwrap_or(0)` en un `Option<u32>`?
11. ¿Cuál es la diferencia entre `Option` y `Result`?
12. ¿Por qué `match` es mejor que `if/else` en muchos casos?

**Parte 5: Soroban**
13. ¿Qué hace `env.storage().instance().get()`?
14. ¿Por qué emitimos eventos en smart contracts?
15. ¿Qué pasa si llamás `panic!()` en una función?

<details>
<summary>👀 Ver respuestas modelo</summary>

**Respuestas:**

1. Sin `mut`, la variable es inmutable (no puede cambiar). Con `mut`, puede modificarse.

2. `u128` puede representar números mucho más grandes. Para balances de tokens que pueden tener millones o miles de millones, u128 previene overflow.

3. `Symbol` cuando el texto es fijo y conocido al programar (keys, eventos). `String` cuando el texto viene del usuario o es dinámico.

4. `s1` se MUEVE a `s2`. `s1` queda inválido y no puede usarse más. Solo `s2` tiene acceso al String.

5. Porque `u32` implementa `Copy`. Los números pequeños se copian automáticamente en lugar de moverse.

6. a) Cada valor tiene un owner. b) Solo un owner a la vez. c) Cuando el owner sale de scope, el valor se destruye.

7. `&String` es solo lectura (referencia inmutable). `&mut String` permite modificar (referencia mutable).

8. Para prevenir data races. Si dos referencias pudieran modificar simultáneamente, el comportamiento sería impredecible y peligroso.

9. Infinitas. Múltiples lecturas simultáneas son seguras - el problema surge cuando alguien escribe mientras otros leen.

10. Si el `Option` es `Some(valor)`, retorna `valor`. Si es `None`, retorna 0 (el valor por defecto).

11. `Option` para valores que pueden no existir. `Result` para operaciones que pueden tener éxito (`Ok`) o fallar (`Err`) con información del error.

12. `match` fuerza a manejar todos los casos. El compilador verifica que no olvidemos ninguna variante. Con `if/else`, podemos olvidar casos accidentalmente.

13. Intenta leer un valor del storage. Retorna `Option<T>` - `Some(valor)` si existe, `None` si no.

14. Para transparencia (cualquiera puede ver qué pasó), debugging (rastrear operaciones), y para que frontends puedan reaccionar a cambios en tiempo real.

15. La ejecución se detiene inmediatamente. Toda la transacción revierte (rollback). Ningún cambio de estado se guarda. El usuario recibe el mensaje de error.

</details>

Si respondiste 12+ correctamente: ¡Dominás los fundamentos! 🦈⚡  
Si respondiste 8-11 correctamente: Vas muy bien, repasá los temas que fallaste.  
Si respondiste menos de 8: Volvé a `02-PASO-A-PASO.md` y repasá los conceptos.

---

## 🦈 Mensaje final

### Lo que lograste hoy

No solo aprendiste sintaxis de Rust. Dominaste conceptos fundamentales que te permiten escribir código seguro para blockchain:

✅ Tipos de datos optimizados para smart contracts  
✅ Ownership - el sistema único que hace a Rust seguro por diseño  
✅ Borrowing - eficiencia sin sacrificar seguridad  
✅ Pattern matching - manejar todos los casos sin olvidar ninguno  
✅ Storage persistente en blockchain  
✅ Tests para verificar que todo funciona

**Esto no es poca cosa.**

La mayoría de la gente que habla de blockchain no entiende estos conceptos. Vos ahora sí.

### El camino del Builder

Como las tiburonas reales:
- **Persistente:** Seguís nadando aunque el compilador te detenga
- **Precisa:** Cada línea de código tiene un propósito
- **Poderosa:** Dominás herramientas que previenen bugs millonarios
- **Pionera:** Estás construyendo el futuro de las finanzas

**No te compares con otros.** Compará con vos misma de ayer. ¿Sabías más ayer sobre ownership? No. ¿Podías escribir un contador en Soroban ayer? No. **Estás progresando.**

### Siguiente paso

La Clase 4 profundizará en Structs y Enums. Vas a diseñar estructuras de datos complejas para aplicaciones reales. Con los fundamentos que dominaste hoy, estás más que lista.

**Pero primero:** Practicá. Hacé los ejercicios. Rompé cosas. Arreglalas. Así se aprende de verdad.

---

## 📞 Canales de soporte

**¿Te trabás en un ejercicio?**
- 📅 Consultas en vivo: Sábados

**¿Querés compartir tu progreso?**
- 🐦 Twitter: Etiqueta #TiburonasBuilders y arrobanos @buendiabuilders
- 📸 Screenshot de tus tests pasando → ¡celebralo!

**Recordá:** Preguntar no es debilidad. Es inteligencia. Todas las Tiburonas empezamos en el mismo lugar. 🦈

---

## 🎯 Tu compromiso

Antes de la próxima clase:

- [ ] Completar al menos 5 ejercicios de este documento(de nuevo, no son obligatorios)
- [ ] Escribir tests para todo tu código
- [ ] Preguntar en Discord al menos UNA vez (rompe el hielo)
- [ ] Leer Rust Book Capítulo 4 completo
- [ ] Experimentar con el código - romperlo y arreglarlo

**El éxito no viene de entender todo perfectamente la primera vez.**  
**Viene de practicar, fallar, aprender, y seguir adelante.**

---

🦈⚡ **¡Vamos a construir!** ⚡🦈

**Nos vemos en la Clase 4. Sigue construyendo, sigue nadando.**

---

> 💡 **Última reflexión:** Rust no es difícil porque sea mal diseñado. Es difícil porque te enseña a pensar en seguridad desde el día 1. Esa "dificultad" es en realidad entrenamiento para escribir código de producción de clase mundial.
