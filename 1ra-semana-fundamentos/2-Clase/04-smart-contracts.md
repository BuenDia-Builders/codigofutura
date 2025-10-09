# 🚀 SMART CONTRACTS EN SOROBAN

**Clase 2 - Tu Primer Contrato Deployado**

---

## 🎯 LO QUE LOGRASTE

Hoy hiciste algo que muy pocas personas en el mundo han hecho:

✅ **Deployaste un smart contract a una blockchain real**  
✅ **Obtuviste un Contract ID funcionando**  
✅ **Invocaste funciones del contrato**  
✅ **Verificaste todo en un explorador**

**Esto no es poca cosa. Eres oficialmente una Smart Contract Developer.**

---

## 💡 ¿QUÉ ES UN SMART CONTRACT?

### Definición simple

**Un smart contract es código que vive en blockchain.**

**Imagina:**
- Una máquina expendedora inteligente
- Funciona 24/7
- Nadie puede apagarla
- Nadie puede cambiar sus reglas
- Todos pueden usarla

### Características clave

**1. Inmutable**
- Una vez deployado, el código no cambia
- Eso da seguridad y confianza

**2. Descentralizado**
- No vive en un servidor de una empresa
- Vive en miles de nodos simultáneamente

**3. Transparente**
- Cualquiera puede ver el código
- Todas las transacciones son públicas

**4. Sin intermediarios**
- No necesita bancos, notarios, o abogados
- El código ES la ley

---

## 🦀 ¿POR QUÉ RUST?

**Soroban usa Rust como lenguaje principal.**

### Ventajas de Rust

**1. Seguridad**
- Elimina bugs comunes (memory leaks, race conditions)
- El compilador te obliga a escribir código seguro

**2. Performance**
- Tan rápido como C/C++
- Sin garbage collector

**3. Confiabilidad**
- Si compila, probablemente funciona
- Menos bugs en producción

**4. Ecosistema moderno**
- Excelentes herramientas
- Comunidad activa y amigable

---

## 📦 EL CONTRATO QUE DEPLOYASTE

### El archivo WASM

```bash
hello.wasm
```

**¿Qué es WASM?**
- WebAssembly
- Código compilado que corre en blockchain
- Como un ejecutable, pero universal

**¿De dónde vino?**
- Se escribió en Rust
- Se compiló a WASM
- Tú lo deployaste

---

### El código fuente (Rust)

**Próxima semana escribirás esto desde cero. Hoy solo lo entendemos:**

```rust
#[contract]
pub struct HelloContract;

#[contractimpl]
impl HelloContract {
    pub fn hello(to: Symbol) -> Vec<Symbol> {
        vec![&env, symbol_short!("Hello"), to]
    }
}
```

---

### Desglose línea por línea

#### `#[contract]`
```rust
#[contract]
pub struct HelloContract;
```
**¿Qué hace?** Define que esto es un smart contract.  
**`pub struct`:** Crea una estructura pública (como una clase).

---

#### `#[contractimpl]`
```rust
#[contractimpl]
impl HelloContract {
```
**¿Qué hace?** Implementa las funciones del contrato.  
**Como:** Los métodos de una clase en otros lenguajes.

---

#### La función `hello`
```rust
pub fn hello(to: Symbol) -> Vec<Symbol> {
```
**Desglose:**
- `pub fn`: Función pública
- `hello`: Nombre de la función
- `to: Symbol`: Recibe un parámetro tipo Symbol
- `-> Vec<Symbol>`: Retorna un vector de Symbols

---

#### El cuerpo
```rust
vec![&env, symbol_short!("Hello"), to]
```
**¿Qué hace?** Crea un vector (array) con:
1. Referencia al environment
2. El símbolo "Hello"
3. El parámetro `to` que pasaste

**Resultado:** `["Hello", "Ana"]` (por ejemplo)

---

## 🚀 EL PROCESO DE DEPLOYMENT

### Paso a paso de lo que hiciste

#### 1. Descargar el contrato
```bash
curl -L -o hello.wasm https://github.com/stellar/soroban-examples/.../hello.wasm
```
**Descargaste:** El archivo WASM compilado.

---

#### 2. Deploy a blockchain
```bash
stellar contract deploy \
  --wasm hello.wasm \
  --source yo-clase2 \
  --network testnet
```

**¿Qué pasó internamente?**

1. **Lectura:** CLI lee el archivo hello.wasm
2. **Transacción:** Crea una transacción de tipo "InstallContractCode"
3. **Firma:** La firma con tu identidad
4. **Envío:** La envía a Horizon API
5. **Propagación:** Se propaga por la red
6. **Validación:** Los validadores la procesan
7. **Confirmación:** Se agrega a un ledger
8. **Contract ID:** Se genera tu ID único

**Todo esto en 5-10 segundos.**

---

#### 3. Resultado: Tu Contract ID
```
CBQHNQXVZHKFGPZKDV5YXGPFVQTE6EXNIXKYFKBMJBQTBUKQRX7FE2OV
```

**Este es tu contrato.**
- 56 caracteres
- Empieza con 'C'
- Es único en toda la blockchain
- Cualquiera puede usarlo

---

## 📞 INVOCAR EL CONTRATO

### El comando que usaste

```bash
stellar contract invoke \
  --id CBQH... \
  --source yo-clase2 \
  --network testnet \
  -- \
  hello \
  --to "Ana"
```

---

### ¿Qué sucede al invocar?

**1. Construcción de la transacción**
- CLI prepara una transacción "InvokeContract"
- Incluye: Contract ID, función, argumentos

**2. Firma**
- Tu identidad firma la transacción
- Pagas el fee de ejecución

**3. Ejecución**
- El contrato corre en la blockchain
- Ejecuta la función `hello` con tu argumento
- Retorna el resultado

**4. Resultado**
```
["Hello", "Ana"]
```

---

### Tipos de invocación

**1. Read-only (view)**
- Solo lee datos
- No modifica estado
- Más barato

**2. Write (transactional)**
- Modifica estado del contrato
- Cuesta más
- Requiere firma

**El contrato `hello` es read-only** - solo retorna un valor, no guarda nada.

---

## 🔍 VERIFICAR EN STELLAREXPERT

### URL de tu contrato

```
https://stellar.expert/explorer/testnet/contract/CBQH...
```

**Reemplaza `CBQH...` con tu Contract ID real.**

---

### Qué puedes ver

**1. Información general**
- Contract ID
- Fecha de creación
- WASM code hash
- Creator account

**2. Invocaciones**
- Todas las veces que se llamó
- Qué función
- Qué argumentos
- Resultados

**3. Código WASM**
- Hash del código
- Tamaño del archivo
- Link al código fuente (si está disponible)

---

## 💡 CONCEPTOS CLAVE

### Contract ID vs WASM Hash

**WASM Hash:**
- Hash del código compilado
- Identifica el código en sí
- Puede haber múltiples contratos con el mismo WASM

**Contract ID:**
- Dirección única de UNA instancia
- Como deployar la misma app varias veces
- Cada instancia tiene su propio ID

---

### Storage (Almacenamiento)

**Los contratos pueden guardar datos:**
- Persistent: Datos permanentes
- Temporary: Datos temporales
- Instance: Datos de la instancia

**El contrato `hello` no guarda nada** - es stateless (sin estado).

---

### Fees de contratos

**Costos al usar contratos:**

1. **Deploy fee:** Subir el contrato
2. **Invocation fee:** Cada llamada
3. **Storage fee:** Guardar datos
4. **Resource fee:** CPU, memoria usada

**En Testnet:** No importa, es dinero de prueba.  
**En Mainnet:** Planificar costos es importante.

---

## 🎮 EJERCICIOS CON TU CONTRATO

### 1. Invocaciones múltiples

**Probar con diferentes nombres:**

```bash
stellar contract invoke --id $CONTRACT_ID --source yo-clase2 --network testnet -- hello --to "Maria"
stellar contract invoke --id $CONTRACT_ID --source yo-clase2 --network testnet -- hello --to "Juan"
stellar contract invoke --id $CONTRACT_ID --source yo-clase2 --network testnet -- hello --to "Pedro"
```

**Observa en StellarExpert:** Verás todas las invocaciones en el historial.

---

### 2. Script de invocación masiva

**Crear:** `invoke-many.sh`

```bash
#!/bin/bash

CONTRACT_ID="CBQH..."  # Tu Contract ID
NOMBRES=("Ana" "Luis" "Sofia" "Carlos" "Elena")

for nombre in "${NOMBRES[@]}"; do
  echo "🚀 Invocando para $nombre..."
  
  stellar contract invoke \
    --id $CONTRACT_ID \
    --source yo-clase2 \
    --network testnet \
    -- \
    hello \
    --to "$nombre"
  
  echo "✅ Hecho"
  echo ""
done
```

**Ejecutar:**
```bash
chmod +x invoke-many.sh
./invoke-many.sh
```

---

### 3. Medir tiempo de ejecución

```bash
time stellar contract invoke \
  --id $CONTRACT_ID \
  --source yo-clase2 \
  --network testnet \
  -- \
  hello \
  --to "Test"
```

**Resultado:**
```
real    0m2.341s
user    0m0.156s
sys     0m0.032s
```

**2.3 segundos** - incluye red + blockchain.

---

## 🔄 CICLO DE VIDA DE UN CONTRATO

### 1. Desarrollo
```
Escribir código Rust → Compilar a WASM
```

### 2. Testing local
```
Probar con stellar-cli en local
```

### 3. Deploy a Testnet
```
stellar contract deploy --network testnet
```

### 4. Testing en Testnet
```
Invocar y verificar funcionalidad
```

### 5. Audit (opcional pero recomendado)
```
Revisión de seguridad por expertos
```

### 6. Deploy a Mainnet
```
stellar contract deploy --network mainnet
```

### 7. Uso en producción
```
Apps/usuarios interactúan con el contrato
```

---

## 🛡️ SEGURIDAD DE CONTRATOS

### Principios importantes

**1. Inmutabilidad = Cuidado**
- Una vez deployado, no puedes cambiar bugs
- Prueba MUCHO antes de Mainnet

**2. Código es ley**
- Si tiene un bug, el bug es permanente
- No hay "deshacer" en blockchain

**3. Transparencia**
- Todo el mundo puede ver tu código
- Incluyendo atacantes
- El código debe ser a prueba de todo

---

### Mejores prácticas

✅ **Auditar código antes de Mainnet**  
✅ **Probar exhaustivamente en Testnet**  
✅ **Usar librerías auditadas**  
✅ **Documentar todas las funciones**  
✅ **Implementar access control cuando sea necesario**  
✅ **Manejar errores elegantemente**  

---

## 📊 COMPARACIÓN: HELLO CONTRACT

### Versión JavaScript (no smart contract)

```javascript
function hello(nombre) {
  return `Hello ${nombre}`;
}

hello("Ana");  // "Hello Ana"
```

**Características:**
- Corre en tu computadora
- Depende de Node.js
- Si apagas la computadora, se apaga
- Solo tú puedes usarla

---

### Versión Smart Contract (Soroban)

```rust
pub fn hello(to: Symbol) -> Vec<Symbol> {
    vec![&env, symbol_short!("Hello"), to]
}
```

**Características:**
- Corre en blockchain
- Independiente de cualquier servidor
- Funciona 24/7 para siempre
- Cualquiera en el mundo puede usarla
- No se puede apagar
- No se puede modificar

**Ese es el poder de los smart contracts.**

---

## 🌟 CASOS DE USO REALES

### ¿Qué se puede hacer con contratos?

**1. DeFi (Finanzas Descentralizadas)**
- Lending/Borrowing (prestar/pedir prestado)
- DEX (intercambios descentralizados)
- Stablecoins
- Yield farming

**2. NFTs**
- Arte digital
- Coleccionables
- Tickets para eventos
- Certificados

**3. DAO (Organizaciones Descentralizadas)**
- Votaciones on-chain
- Tesorería comunitaria
- Gobernanza transparente

**4. Gaming**
- Items in-game como NFTs
- Economías virtuales
- Play-to-earn

**5. Supply Chain**
- Tracking de productos
- Certificaciones
- Anti-falsificación

---

## 🚀 PRÓXIMOS PASOS

### Lo que aprenderás después

**Próxima clase: Rust desde cero**
- Sintaxis básica
- Variables y tipos
- Funciones
- Ownership (el superpoder de Rust)

**Semana 2: Escribir tus contratos**
- Hello World en Rust
- Contrato de contador
- Contrato de token simple
- Tests automatizados

**Semana 3: Contratos avanzados**
- Storage persistente
- Auth y permisos
- Eventos y logs
- Optimización

---

## 📚 RECURSOS PARA APRENDER MÁS

### Documentación oficial
- **Soroban Docs:** https://developers.stellar.org/docs/build/smart-contracts
- **Rust Book:** https://doc.rust-lang.org/book/
- **Soroban Examples:** https://github.com/stellar/soroban-examples

### Tutoriales interactivos
- **Soroban Quest:** Aprende haciendo misiones
- **Rustlings:** Ejercicios de Rust

### Comunidad
- **Discord Soroban:** Canal #soroban-dev
- **Stack Overflow:** Tag [soroban]

---

## 🎯 CHECKLIST DE COMPRENSIÓN

**Marca lo que entendiste:**

### Conceptos
- [ ] Sé qué es un smart contract
- [ ] Entiendo por qué Rust
- [ ] Sé qué es WASM
- [ ] Entiendo la diferencia entre código y instancia
- [ ] Sé qué es un Contract ID

### Práctico
- [ ] Puedo deployar un contrato con CLI
- [ ] Sé invocar funciones
- [ ] Puedo verificar contratos en StellarExpert
- [ ] Entiendo el flujo completo

### Filosofía
- [ ] Entiendo la inmutabilidad
- [ ] Comprendo la importancia de testing
- [ ] Valoro la transparencia del código
- [ ] Veo el potencial de los contratos

---

## 💬 REFLEXIÓN

**Piensa en esto:**

1. **¿Qué problema de tu comunidad podría resolver con un smart contract?**

2. **¿Por qué es importante que los contratos sean inmutables?**

3. **¿Qué aplicación te gustaría construir usando Soroban?**

**Escribe tus respuestas.** En unas semanas, cuando ya sepas Rust, podrás construir esas ideas.

---

## 🦈 MOMENTO DE CELEBRACIÓN

**Lee esto en voz alta:**

> "Hoy deployé un smart contract a una blockchain real.  
> Mi código está corriendo en miles de nodos.  
> Cualquier persona en el mundo puede usarlo.  
> Nadie puede apagarlo.  
> Nadie puede modificarlo.  
>  
> No solo aprendí teoría.  
> Construí algo permanente.  
>  
> Soy una Smart Contract Developer.  
> Soy una Tiburona Builder."

**Esto es real. Esto es lo que hiciste hoy.** 🦈⚡

---

## 🎁 BONUS: TU PRIMER CONTRATO CUSTOM

### Mini proyecto para casa

**Desafío:** Modifica el contrato hello para que salude en español.

**Pista:** Necesitarás aprender Rust básico (próxima clase).

**Meta:** Tener tu propio contrato custom corriendo.

**Premio:** Sentirte como la rockstar developer que eres.

---

**Siguiente documento:** [05-tarea-y-proximos-pasos.md](./05-tarea-y-proximos-pasos.md)

---

*Creado con ❤️ para las Tiburonas Builders*