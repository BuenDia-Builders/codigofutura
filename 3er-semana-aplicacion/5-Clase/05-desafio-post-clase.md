# 🏆 Desafío Post-Clase (Opcional pero Recomendado)

## 🎯 Objetivo: Consolidar lo Aprendido

Después de la clase, te sugerimos implementar tu propio Token BDB y probar que funciona correctamente. Este desafío es **opcional** pero **altamente recomendado** para consolidar tu aprendizaje.

**⏱️ Tiempo estimado:** 20-30 minutos  
**📊 Dificultad:** ⭐⭐☆☆☆ (Básica)  
**📅 Cuándo:** En casa, el mismo día o al día siguiente de la clase

---

## 📋 Lo Que Vas a Hacer

1. ✅ Configurar el proyecto desde cero
2. ✅ Copiar el código del Token BDB
3. ✅ Compilar el contrato
4. ✅ Ejecutar 3 tests básicos
5. 🌟 (Opcional) Añadir validaciones extras
6. 🚀 (Opcional) Deployar en testnet

---

## 🚀 Paso a Paso

### Paso 1: Configurar el Proyecto (5 min)

Abre PowerShell y ejecuta:

```powershell
# Crear carpeta del proyecto
mkdir token_bdb
cd token_bdb

# Inicializar proyecto Rust
cargo init --lib
```

**💡 Qué está pasando:**
- `cargo init --lib` crea un proyecto de librería (necesario para contratos Soroban)
- Esto genera `Cargo.toml` y `src/lib.rs` automáticamente

---

### Paso 2: Copiar el Código (5 min)

Copia los archivos del documento **03-codigo-completo.md** a tu proyecto:

```
token_bdb/
├── Cargo.toml          # Copiar el contenido completo
└── src/
    ├── lib.rs          # Copiar el contrato principal
    ├── storage.rs      # Copiar tipos de datos
    ├── errors.rs       # Copiar errores
    └── test.rs         # Copiar los tests
```

**⚠️ Importante:** Verifica que tu `Cargo.toml` tenga:

```toml
[dependencies]
soroban-sdk = "23.0.2"

[dev-dependencies]
soroban-sdk = { version = "23.0.2", features = ["testutils"] }
```

---

### Paso 3: Compilar el Contrato (3 min)

```powershell
# Instalar target wasm (solo la primera vez)
rustup target add wasm32-unknown-unknown

# Compilar con Stellar CLI
stellar contract build
```

**✅ Resultado esperado:**
```
   Compiling token_bdb v0.1.0
    Finished release [optimized] target(s) in 12.34s
```

Esto genera: `target/wasm32-none/release/token_bdb.wasm`

**🐛 Si ves errores:**
- Verifica que copiaste todos los archivos correctamente
- Revisa que los `use` statements en cada archivo sean correctos
- Ejecuta `cargo clean` y vuelve a compilar

---

### Paso 4: Ejecutar 3 Tests Básicos (5 min)

Ejecuta estos 3 tests esenciales uno por uno:

```powershell
# Test 1: Verificar que el token se inicializa correctamente
cargo test test_initialize -- --nocapture

# Test 2: Verificar que se pueden mintear tokens
cargo test test_mint_and_balance -- --nocapture

# Test 3: Verificar que las transferencias funcionan
cargo test test_transfer -- --nocapture
```

**✅ Si los 3 tests pasan:**
¡Felicitaciones! Tu token está funcionando correctamente. Pasaste el desafío básico. 🎉

**❌ Si algún test falla:**
Lee el mensaje de error cuidadosamente. Probablemente sea:
- Código copiado incorrectamente
- Falta algún import
- Tipos de datos incorrectos

---

## 🌟 Desafíos Opcionales (Si Quieres Más)

### Opción A: Agregar Validaciones (10 min extra)

**Objetivo:** Validar que `name` y `symbol` no estén vacíos al inicializar.

**1. Modificar `errors.rs`:**
Ya está el error `InvalidMetadata` en el código.

**2. La validación ya está implementada en `lib.rs`:**
```rust
// En la función initialize:
if name.len() == 0 || name.len() > MAX_NAME_LENGTH {
    return Err(TokenError::InvalidMetadata);
}
```

**3. Ejecutar tests de validación:**
```powershell
cargo test test_initialize_empty_name_fails
cargo test test_initialize_empty_symbol_fails
```

**✅ Criterio de éxito:** Ambos tests pasan.

---

### Opción B: Deployar en Testnet (15 min extra)

**Requisitos previos:**
- Tener Stellar CLI instalado
- Crear una cuenta en testnet

**Paso 1: Crear cuenta y obtener fondos**

```powershell
# Generar una identidad
stellar keys generate alice --network testnet

# Ver tu dirección pública
stellar keys address alice

# Fondear con XLM gratis de testnet
# (Reemplaza <TU_ADDRESS> con la dirección que obtuviste)
curl "https://friendbot.stellar.org?addr=<TU_ADDRESS>"
```

**Paso 2: Deployar el contrato**

```powershell
stellar contract deploy `
  --wasm target\wasm32-none\release\token_bdb.wasm `
  --source alice `
  --network testnet
```

**💡 Guarda el CONTRACT_ID que te devuelve!**

**Paso 3: Inicializar tu token**

```powershell
# Reemplaza <CONTRACT_ID> y <ADMIN_ADDRESS>
stellar contract invoke `
  --id <CONTRACT_ID> `
  --source alice `
  --network testnet `
  -- initialize `
  --admin <ADMIN_ADDRESS> `
  --name "Buen Dia Token" `
  --symbol "BDB" `
  --decimals 7
```

**Paso 4: Mintear tus primeros tokens**

```powershell
stellar contract invoke `
  --id <CONTRACT_ID> `
  --source alice `
  --network testnet `
  -- mint `
  --to <TU_ADDRESS> `
  --amount 10000000000000
```

**Nota:** 10000000000000 = 1,000,000 tokens (con 7 decimales)

**✅ Verificar en Stellar Laboratory:**
1. Ve a https://laboratory.stellar.org/
2. Busca tu CONTRACT_ID
3. Verifica que tu token existe en testnet

---

## ✅ Criterios de Éxito

Has completado el desafío si logras:

### Nivel Básico (Requerido)
- [ ] ✅ El proyecto compila sin errores
- [ ] ✅ Los 3 tests pasan: `initialize`, `mint_and_balance`, `transfer`
- [ ] ✅ Entiendes qué hace cada test

### Nivel Intermedio (Opcional)
- [ ] 🌟 Tests de validación pasan
- [ ] 🌟 Agregaste al menos 1 test adicional propio

### Nivel Avanzado (Opcional)
- [ ] 🚀 Token deployado en testnet
- [ ] 🚀 Minteaste tokens exitosamente
- [ ] 🚀 Verificaste en Stellar Laboratory

---

## 🐛 Troubleshooting Común

### Error: "can't find crate for core"

**Solución:**
```powershell
rustup target add wasm32-none
rustup show  # Verificar que está instalado
```

---

### Error: "no field `to_string` on type `Symbol`"

**Causa:** Código desactualizado del material de clase.

**Solución:** Verifica que estés usando `String` (no `Symbol`) para `name` y `symbol`:
```rust
// ✅ Correcto
fn initialize(env: Env, admin: Address, name: String, symbol: String, decimals: u32)

// ❌ Incorrecto
fn initialize(env: Env, admin: Address, name: Symbol, symbol: Symbol, decimals: u32)
```

---

### Tests fallan con "NotInitialized"

**Causa:** Olvidaste llamar `initialize()` antes de las operaciones.

**Solución:**
```rust
// ✅ Siempre inicializar primero en los tests
client.initialize(&admin, &name, &symbol, &7).unwrap();
env.mock_all_auths();
client.mint(&user, &1000).unwrap();  // Ahora sí funciona
```

---

### Stellar CLI no reconoce comandos

**Causa:** Stellar CLI no está en tu PATH.

**Solución:**
1. Verifica instalación: `stellar --version`
2. Si falla, reinstala desde: https://developers.stellar.org/docs/tools/developer-tools

---

## 💡 Tips para el Éxito

### 1. No te apures
- Lee cada error cuidadosamente
- Google es tu amigo
- La documentación de Soroban es excelente

### 2. Usa los comentarios del código
- El código del material tiene comentarios explicativos
- Úsalos para entender qué hace cada parte

### 3. Experimenta
- Cambia valores en los tests
- Prueba casos edge (0, negativos, muy grandes)
- Rompe cosas a propósito para ver qué pasa

### 4. Pide ayuda si la necesitas
- La comunidad de Stellar es muy activa
- Discord de Stellar Developers
- Grupo de Buen Día Builders

---

## 📊 Inversión de Tiempo Real

| Actividad | Tiempo | Prioridad |
|-----------|--------|-----------|
| Setup + Copiar código | 10 min | ⭐⭐⭐ Obligatorio |
| Compilar | 3 min | ⭐⭐⭐ Obligatorio |
| Correr 3 tests | 5 min | ⭐⭐⭐ Obligatorio |
| Validaciones extras | 10 min | ⭐⭐ Recomendado |
| Deploy en testnet | 15 min | ⭐ Opcional |

**Tiempo mínimo:** 18 minutos  
**Tiempo con todo:** 43 minutos

---

## 🎓 ¿Qué Aprendiste?

Al completar este desafío, habrás:

✅ **Configurado** un proyecto Soroban desde cero  
✅ **Compilado** un smart contract a WASM  
✅ **Ejecutado** tests unitarios  
✅ **Entendido** el flujo completo de desarrollo  
✅ **Verificado** que tu token funciona correctamente  
🌟 **Optativo:** Deployado en una blockchain real (testnet)

---

## 🔗 Próximos Pasos

### Para la Clase 6: Frontend con Scaffold Stellar

En la próxima clase construiremos una interfaz web para nuestro token usando:
- **React + TypeScript**
- **Scaffold Stellar** (https://github.com/theahaco/scaffold-stellar)
- **Freighter Wallet** para firmar transacciones
- **Componentes UI** pre-construidos

**¿Qué necesitas hacer ahora?**
- ✅ Completar este desafío (tu token debe funcionar)
- ✅ Tener tu token deployado en testnet (para conectarlo al frontend)
- ✅ Instalar Freighter Wallet (lo haremos juntas en la clase)

**NO necesitas:**
- ❌ Saber React avanzado (partimos desde cero)
- ❌ Instalar nada de JavaScript aún
- ❌ Preocuparte por el frontend ahora


---

## Comparte tu Progreso en tus Redes Sociales preferidas (nosotras lo vamos a hacer)

1. 📸 **Captura de pantalla** de los tests pasando
2. 🔗 **Contract ID** si lo deployaste en testnet
3. 💬 **Comparte** en el grupo de Buen Día Builders y en las redes arrobandonos
   - X https://x.com/buendiabuilders
   - Instragam https://www.instagram.com/buendia_builders/
   - LinkedIn https://www.linkedin.com/company/buen-dia-builders
   - y otras redes important!
       - https://x.com/lumenloop
       - https://x.com/BuildOnStellar
       - https://www.instagram.com/stellarorg/
       - https://www.linkedin.com/company/stellar-development-foundation      

**Formato sugerido pero obvio te animamos a escribir lo que vos quieras:**
```
✅ Desafío completado!
Tests: 3/3 pasando 
Deploy: [SÍ/NO]
Contract ID: [si aplicable]
Tiempo: [cuánto tardaste]
Comentario: [lo que más te costó o gustó]
```

---

*"El mejor momento para consolidar el aprendizaje es justo después de la clase, cuando todo está fresco en tu mente" 🦈*

---

## 📚 Referencias Útiles

- [Soroban Getting Started](https://developers.stellar.org/docs/build/smart-contracts)
- [Stellar CLI Docs](https://developers.stellar.org/docs/tools/stellar-cli)
- [Token Example](https://github.com/stellar/soroban-examples/tree/main/token)
- [Testnet Friendbot](https://friendbot.stellar.org)

**¿Preguntas? ¡Nos vemos en la Clase 6! 🚀**
