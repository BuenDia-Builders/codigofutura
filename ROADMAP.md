# 🗺️ ROADMAP DEL CURSO

## 🎯 Visión General

Este roadmap detalla las **7 semanas + 1 pregrabada** del curso de Desarrollo Blockchain con Stellar de Buen Día Builders.

**Objetivo**: Convertir principiantes en desarrolladoras blockchain capaces de construir dApps completas en Stellar.

---

## 📊 Resumen Ejecutivo

| Semana | Tema Principal | Intensidad | Sesiones | Logro Clave |
|--------|----------------|------------|----------|-------------|
| 0 | Bienvenida | 🟢 Ligera | 1 pregrabada | Primera transacción blockchain |
| 1 | Fundamentos Stellar | 🟡 Moderada | 2 + 1 refuerzo | Cuenta + transacciones en Laboratory |
| 2 | Rust Consolidado | 🟠 Alta | 2 + 1 refuerzo | Dominar Rust para Soroban |
| 3 | Aplicación Intensiva | 🔴 MUY ALTA | 2 + 1 obligatorio | Token ERC-20 + Frontend React |
| 4 | Integración | 🟠 Moderada-alta | 2 + 1 obligatorio | dApp completa funcional |
| 5 | Arquitectura | 🟡 Moderada | 2 + 1 obligatorio | Crowdfunding + Seguridad |
| 6 | Hackathon | 🟠 Alta | 1 + 2 hackathon | Proyecto portfolio |

**Total**: ~60-80 horas de contenido

---

## 📺 SEMANA 0: Bienvenida (Pregrabada)

### 🎬 Clase 0: Construyendo el Futuro de los Pagos Globales

**Duración**: ~2 horas  
**Formato**: Video pregrabado  
**Disponible**: Antes del inicio oficial

#### 📚 Contenido

**Bloque 1: Bienvenida (15 min)**
- Por qué tomar este curso
- Quiénes somos (Elisa, Tatiana, equipo)
- Patrocinadores (SDF, BAF)
- Estructura del programa

**Bloque 2: Mejores Prácticas (10 min)**
- Recursos esenciales
- 10 mejores prácticas para Tiburonas
- Cómo interactuar con la comunidad

**Bloque 3: Bitcoin a Stellar (20 min)**
- De Bitcoin a Stellar: Una evolución lógica
- Smart Contracts: Programas en blockchain
- Oracles: Conectando blockchain con el mundo real
- Terminología esencial

**Bloque 4: Smart Contracts (15 min)**
- El problema con acuerdos tradicionales
- Ejemplos del mundo real (remesas, DeFi)
- Más allá de la confianza

**Bloque 5: Stellar (10 min)**
- Características de Stellar
- Descentralización, transparencia, velocidad
- Aplicaciones: DeFi, DAOs, NFTs

**Bloque 6: Freighter Wallet (15 min)**
- Instalación de Freighter
- Frase de recuperación de 12 palabras
- Mainnet vs Testnet
- Configuración final

**Bloque 7: Primera Transacción (15 min)**
- Fondos de testnet con Friendbot
- Enviar primera transacción
- Explorar en StellarExpert
- Comparación con sistemas tradicionales

**Bloque 8: Fundamentos Blockchain (18 min)**
- Funciones Hash
- Bloques en Stellar
- Inmutabilidad y distribución
- Stellar Consensus Protocol (SCP)

**Bloque 9: Firmado de Transacciones (10 min)**
- Claves públicas y privadas
- Formato de claves en Stellar
- Cómo ocurre el firmado
- Multi-firma

**Bloque 10: Panorama Blockchain (19 min)**
- Mecanismos de consenso: PoW, PoS, SCP
- Tarifas de transacción comparadas
- Ataques y defensas
- L1s, L2s y por qué Stellar no necesita L2s

**Bloque 11: Por Qué Stellar (4 min)**
- Seguridad nativa
- Simplicidad sobre complejidad
- Costos ultra-bajos
- Diseñado para inclusión financiera

#### 🎯 Objetivos de Aprendizaje

Al terminar, vas a:
- ✅ Comprender qué es Stellar y por qué es revolucionario
- ✅ Tener Freighter instalado y configurado
- ✅ Haber enviado tu primera transacción blockchain
- ✅ Entender fundamentos de blockchain y consenso
- ✅ Apreciar las ventajas de Stellar

#### ⚙️ Requisitos Técnicos
- Computadora con navegador Chrome/Brave
- Conexión a internet estable
- Extensión Freighter instalada
- Papel y lápiz para frase semilla

---

## 🌟 SEMANA 1: Fundamentos Stellar

### 🔵 Martes - Clase 1: Stellar Classic Parte 1

**Duración**: 90 min  
**Modalidad**: 90% Práctica, 10% Teoría

#### 📚 Contenido

**¿Qué es Stellar? (10 min)**
- Video introductorio
- Problema vs Solución
- Conceptos básicos: ledger, cuentas, assets, transacciones

**Laboratorio Práctico (35 min)**
- Acceder a Stellar Laboratory
- Verificar red (Testnet)
- Generar par de llaves (Public Key + Secret Key)
- Guardar llaves de forma segura
- Fondear con Friendbot (10,000 XLM)
- Verificar cuenta creada

**Break (5 min)**

**Explorando la Blockchain (25 min)**
- Tour de StellarExpert
- Analizar tu transacción
- Actividad grupal comparativa
- Otras herramientas (Stellarchain.io)

**Cierre + Quiz (15 min)**
- Blockchain Quiz
- Resumen visual de conceptos
- Presentación de tarea

#### 🎯 Objetivos
- Crear y fondear cuenta Stellar
- Realizar transacción básica
- Explorar transacciones con herramientas
- Comprender ledgers, cuentas y assets

#### 💻 Práctica
```
✅ Crear cuenta en Laboratory
✅ Fondear con Friendbot
✅ Explorar transacción en StellarExpert
✅ Intercambiar public keys con compañera
✅ Enviar 25 XLM a compañera
```

#### 📝 Tarea
Ver [06-TAREA.md](./semana-1-fudamentos/clase-1/06-TAREA.md)

---

### 🔵 Jueves - Clase 2: Stellar Classic Parte 2 + Primer Smart Contract

**Duración**: 90 min

#### 📚 Contenido

**Transacciones Programáticas (30 min)**
- JavaScript SDK
- Crear transacción con código
- Operaciones avanzadas

**Introducción a Stellar CLI (20 min)**
- Instalación de Stellar CLI
- Comandos básicos
- Estructura de proyecto Soroban

**Deployar Hello World (30 min)**
- Compilar contrato
- Deploy en testnet
- Copiar Contract ID
- Invocar función

**Cierre (10 min)**
- Resumen
- Preparación para Rust

#### 🎯 Objetivos
- Transacciones programáticas con SDK
- Entender Stellar CLI
- **Deployar primer smart contract** 🚀

#### 💻 Práctica
```bash
# Tu primer contrato
stellar contract build
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/hello_world.wasm \
  --network testnet

# ¡Éxito! 🎉
```

#### 💡 Por Qué Aquí
**Momentum**: Segunda sesión presencial y ya deployaste un contrato.  
**Contexto**: Ver Soroban funcionar motiva para que puedas aprender Rust.

---

### 🟢 Sábado - Refuerzo: Consolidación Clase 2

**Duración**: 60 min  
**Asistencia**: Opcional (pero recomendado)

#### 📚 Contenido
- Refuerzo de transacciones programáticas
- Revisión de primer smart contract
- Resolución de dudas de setup
- Troubleshooting de instalaciones

---

## 🦀 SEMANA 2: Rust Consolidado

### 🔵 Martes - Clase 3: Rust Básico para Soroban

**Duración**: 90 min

#### 📚 Contenido

**Tipos en Rust (25 min)**
- Vec, String, u128, i128
- struct, enum
- Tipos específicos de Soroban

**Ownership y Borrowing (25 min)**
- Concepto de ownership
- Referencias (&)
- Borrowing mutable

**Funciones (20 min)**
- Definir funciones
- Parámetros y retorno
- Funciones en contratos

**Práctica: Contador (20 min)**
```rust
pub fn increment(env: Env) -> u32 {
    let count = env.storage()
        .instance()
        .get(&COUNTER)
        .unwrap_or(0);
    
    let new_count = count + 1;
    env.storage().instance().set(&COUNTER, &new_count);
    new_count
}
```

#### 🎯 Objetivos
- Entender tipos básicos de Rust
- Comprender ownership
- Escribir funciones simples

#### 💡 Por Qué Aquí
Rust ya tiene contexto (viste Soroban en Clase 2).  
No es teoría abstracta, es "explicar lo que ya hiciste".

---

### 🔵 Jueves - Clase 4: Rust Avanzado para Soroban

**Duración**: 90 min

#### 📚 Contenido

**Traits e Implementaciones (25 min)**
- Qué son traits
- Implementar traits
- Traits en Soroban

**Result y Option (25 min)**
- Manejo de errores
- ? operator
- Propagación de errores

**Patrones de Storage (25 min)**
- DataKey
- env.storage()
- Persistencia de datos

**Práctica: Transfer con Errores (15 min)**
```rust
pub fn transfer(
    env: Env,
    to: Address,
    amount: i128
) -> Result<(), Error> {
    let balance = get_balance(&env, &from)?;
    
    if balance < amount {
        return Err(Error::InsufficientBalance);
    }
    
    // Transfer logic...
    Ok(())
}
```

#### 🎯 Objetivos
- Dominar traits
- Manejar errores correctamente
- Usar storage en contratos

---

### 🟢 Sábado - Refuerzo: Rust Profundo

**Duración**: 60 min

#### 📚 Contenido
- Consolidar traits y Result/Option
- Práctica adicional
- Última oportunidad para dudas de Rust
- Preparación para Clase 5 (Token)

---

## ⚡ SEMANA 3: Aplicación Intensiva (CRÍTICA)

### 🔵 Martes - Clase 5: Token Contract ERC-20-like

**Duración**: 90 min

#### 📚 Contenido

**Teoría: ERC-20 en Stellar (15 min)**
- Qué es un token
- Funciones estándar (mint, balance, transfer)
- Diferencias con Ethereum

**Implementación: Token (60 min)**
```rust
pub trait TokenTrait {
    fn mint(env: Env, to: Address, amount: i128);
    fn balance(env: Env, account: Address) -> i128;
    fn transfer(env: Env, to: Address, amount: i128);
    fn approve(env: Env, spender: Address, amount: i128);
}
```

**Tests Unitarios (15 min)**
```rust
#[test]
fn test_transfer() {
    // Setup
    let env = Env::default();
    let contract_id = env.register_contract(None, Token);
    
    // Test
    // Assert
}
```

#### 🎯 Objetivos
- Implementar token completo funcional
- Escribir tests
- Deployar en testnet

#### 💡 Por Qué Aquí
**Momentum Máximo**: Inmediatamente después de Rust completo (3-4-5 sin interrupciones).  
**Aplicación**: Todo lo aprendido se usa AHORA.

---

### 🔵 Jueves - Clase 6: Frontend React + Freighter Wallet

**Duración**: 90 min

#### 📚 Contenido

**Setup React (20 min)**
- Create React App
- Instalar Stellar SDK
- Estructura del proyecto

**Integración Freighter (25 min)**
- Conectar wallet
- Obtener public key del usuario
- Firmar transacciones

**Consultar Balance e Historial (30 min)**
```jsx
function TokenBalance({ address }) {
  const [balance, setBalance] = useState(0);
  
  useEffect(() => {
    // Fetch balance from contract
  }, [address]);
  
  return <div>Balance: {balance} tokens</div>;
}
```

**Template Preconfigurado (15 min)**
- Explorar template
- Modificar componentes
- Estilizar con Tailwind

#### 🎯 Objetivos
- Setup React + Stellar SDK
- Integrar Freighter
- Mostrar balance e historial



---

### 🟠 Sábado - Assets Nativos y DEX (60 min) ⚠️ OBLIGATORIO

**Duración**: 60 min  
**Asistencia**: OBLIGATORIA

#### 📚 Contenido

**Assets Nativos (25 min)**
- Qué son assets (CAP-40)
- Diferencia con tokens Soroban
- Cuándo usar cada uno

**Trustlines (20 min)**
- Qué es una trustline
- Por qué son necesarias
- Authorization flags

**Path Payments y DEX (10 min)**
- Path payments
- DEX integrado de Stellar
- Demo visual en Laboratory

**Práctica: Exploración (5 min)**
- Explorar asset en Laboratory
- Simular trustline (NO implementación completa)

#### 🎯 Objetivos
- Entender "dos sistemas de tokens"
- Overview conceptual (no dominio técnico)
- Contexto para arquitectura (Clase 9)

#### 💡 Por Qué Aquí
1. ✅ Después de dominar Token Soroban
2. ✅ Después de ver Frontend básico
3. ✅ Antes de arquitectura completa
4. ✅ 60 min = suficiente para overview

---

## 🔗 SEMANA 4: Integración y Soroban Avanzado

### 🔵 Martes - Clase 7: Token + Frontend Integrado

**Duración**: 90 min

#### 📚 Contenido

**Invocar Contrato desde Frontend (35 min)**
```jsx
async function mintTokens(amount) {
  const contract = new SorobanClient.Contract(contractId);
  
  const tx = await contract.mint({
    to: userAddress,
    amount: BigInt(amount)
  });
  
  // Sign with Freighter
  const signedTx = await freighter.signTransaction(tx);
  
  // Submit
  const result = await server.sendTransaction(signedTx);
}
```

**Estados y Eventos (25 min)**
- Manejar estados de loading/success/error
- Escuchar eventos del contrato
- Actualizar UI

**Botones Mint/Transfer (20 min)**
```jsx
<button onClick={() => mintTokens(1000)}>
  Mint 1000 Tokens 🪙
</button>

<button onClick={() => transfer(recipientAddress, 100)}>
  Transfer 100 Tokens →
</button>
```

**Autenticación Básica (10 min)**
- Verificar firma
- Proteger funciones

#### 🎯 Objetivos
- Ciclo completo: Contrato → UI → dApp funcional
- Botones interactivos que funcionan
- Manejo de estados


---

### 🔵 Jueves - Clase 8: Soroban Avanzado

**Duración**: 90 min

#### 📚 Contenido

**Events (30 min)**
```rust
env.events().publish((
    symbol!("transfer"),
    from,
    to
), amount);
```
- Emitir eventos
- Escuchar eventos en frontend
- Debugging con eventos

**Patrones de Autenticación (35 min)**
- Multi-sig
- Custom authorization
- Address verification

**Optimización de Contratos (25 min)**
- Gas optimization
- Storage optimization
- Best practices

#### 🎯 Objetivos
- Emitir y escuchar eventos
- Implementar multi-sig básico
- Optimizar contratos

---

### 🟠 Sábado - Refuerzo de Producto (60 min) ⚠️ OBLIGATORIO

#### 📚 Contenido
- Consolidar integración frontend-backend
- Troubleshooting de proyectos
- Code review en parejas
- Preparación para arquitectura (Clase 9)

---

## 🏗️ SEMANA 5: Arquitectura y Seguridad

### 🔵 Martes - Clase 9: Arquitectura - Crowdfunding

**Duración**: 90 min

#### 📚 Contenido

**Patrones de Diseño (25 min)**
- Factory pattern
- Proxy pattern
- Decisiones arquitecturales

**Ejemplo: Crowdfunding (50 min)**
```
Arquitectura:
1. Contrato Soroban para lógica de campaña
2. Asset nativo para recaudación (USDC)
3. Frontend con ambos integrados

Decisión crítica:
¿Cuándo usar asset nativo vs token Soroban?
```

**Revisión Crítica (15 min)**
- ¿Por qué asset nativo para fondos?
- ¿Por qué contrato para lógica?
- Trade-offs de cada decisión

#### 🎯 Objetivos
- Diseñar arquitectura completa
- Tomar decisiones conscientes
- Unir Stellar Classic + Soroban

#### 💡 Une TODO
Stellar Classic, Soroban, Frontend, Assets/DEX → **Arquitectura completa**

---

### 🔵 Jueves - Clase 10: Seguridad y Testing

**Duración**: 90 min

#### 📚 Contenido

**Best Practices de Seguridad (30 min)**
- Common vulnerabilities
- Reentrancy attacks
- Integer overflow/underflow
- Access control

**Testing Avanzado (40 min)**
- Fuzzing con Proptest
- Tests de integración
- Coverage analysis

**Auditoría Básica (20 min)**
```rust
// Checklist de auditoría
✓ Authorization checks
✓ Input validation
✓ Error handling
✓ Events logging
✓ Storage patterns
```

#### 🎯 Objetivos
- Desarrollar con mentalidad segura
- Escribir tests comprehensivos
- Auditar contratos básicamente

---

### 🟠 Sábado - Refuerzo + Presentaciones (60 min) ⚠️ OBLIGATORIO

#### 📚 Contenido

**Refuerzo (30 min)**
- Consolidar arquitectura y seguridad
- Code review final

**Preparación de Presentaciones (30 min)**
- Estructura: Problema → Solución → Demo
- Storytelling efectivo
- Tips para demo en vivo
- Practice pitches

---

## 🏆 SEMANA 6: Consolidación y Hackathon

### 🟢 Sábado - Hackathon Prep Workshop (60 min)

**Duración**: 60 min

#### 📚 Contenido
- Revisión de conceptos clave
- Troubleshooting de setups finales
- Q&A abierto
- Formar equipos
- Esbozar ideas de proyectos

---

### 🔵 Martes - Clase 11: Hackathon Día 1

**Duración**: 90 min + trabajo asíncrono

#### 📚 Estructura

**Kickoff (15 min)**
- Presentación de equipos
- Reglas del hackathon
- Recursos disponibles

**Ideación y Planning (30 min)**
- Brainstorming en equipos
- Seleccionar caso de uso
- Definir MVP

**Desarrollo Inicial (45 min)**
- Setup de proyecto
- Dividir tareas
- Comenzar desarrollo

**Trabajo Asíncrono**
- Continuar desarrollo
- Coordinación por Discord
- Office hours disponibles

---

### 🔵 Jueves - Clase 12: Hackathon Día 2 + Demo Day

**Duración**: 90 min

#### 📚 Estructura

**Finalizar MVP (45 min)**
- Últimos ajustes
- Testing
- Preparar demo

**🎬 Presentaciones (40 min)**
- 5-7 min por equipo
- Demo en vivo
- Q&A

**Cierre y Próximos Pasos (5 min)**
- Recursos para continuar
- SCF (Stellar Community Fund)
- Grants y oportunidades
- Certificación

#### 🎯 Portfolio Piece
Cada Tiburona presenta un proyecto real deployado.

---

## 📈 Métricas de Éxito

### Al Finalizar el Curso

**Habilidades Técnicas:**
- ✅ Crear transacciones Stellar programáticamente
- ✅ Escribir smart contracts Soroban en Rust
- ✅ Integrar contratos con frontend React
- ✅ Decidir arquitectura de dApps
- ✅ Implementar testing y seguridad
- ✅ Deployar en testnet y mainnet

**Proyecto Final:**
- ✅ dApp funcional deployada
- ✅ Código en GitHub
- ✅ Presentación grabada
- ✅ Documentación completa

**Comunidad:**
- ✅ Acceso a red de alumni
- ✅ Certificado NFT
- ✅ Conexiones con ecosistema Stellar

---

## 🎯 Principios Pedagógicos

### 1. Momentum sin Fragmentación
**Problema evitado**: Saltar entre temas  
**Solución**: Rust consolidado (3-4-5)

### 2. Aplicación Inmediata
**Problema evitado**: Teoría sin práctica  
**Solución**: Cada concepto se usa inmediatamente

### 3. Contexto Antes de Complejidad
**Problema evitado**: Assets antes de entender tokens  
**Solución**: Token Soroban → Assets → Arquitectura

### 4. Engagement Temprano
**Problema evitado**: 3 clases de teoría  
**Solución**: Smart contract en Clase 2


---

## 🔮 Roadmap Futuro de BDB

### 2025 Q1-Q2
- ✅ Este curso (Stellar Fundamentals)
- 🔜 Módulo avanzado: Soroban Patterns
- 🔜 Workshop: SCF Application Masterclass

### 2025 Q3-Q4
- 🔜 Curso: Auditoría de Smart Contracts
- 🔜 Curso: DeFi Protocols en Stellar
- 🔜 Programa de Mentorías 1-on-1

### 2026
- 🔜 Curso Avanzado: Cross-chain con Stellar
- 🔜 Certificación Profesional
- 🔜 Placement Program con startups

---

## 📞 Feedback y Sugerencias

**¿Tenes ideas para mejorar el roadmap?**

- 📧 Email: feedback@buendiabuilders.com
- 🐛 GitHub: [Abrir issue](https://github.com/BuenDia-Builders/codigofutura/issues)

**Revisamos el roadmap cada 3 meses** basándonos en feedback de Tiburonas.

---

<div align="center">

## 🦈 Este es Tu Camino

**7 semanas.**  
**De principiante a builder.**  
**De idea a dApp deployada.**

### ¿Lista para el viaje?

**[🚀 Empezar Clase 0](./clase-0-bienvenida/README.md)**

---

### 🦈⚡ Vamos a construir⚡🦈

**Última actualización**: Octubre 2025  
**Versión**: 1.0  
**Mantenido por**: Equipo Buen Día Builders

</div>