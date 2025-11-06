<<<<<<< HEAD
# 🪙 Token BDB - Buen Dia Token

> **Un token fungible completo implementado en Soroban siguiendo el estándar CAP-46**

[![Stellar](https://img.shields.io/badge/Stellar-Soroban-blue)](https://soroban.stellar.org/)
[![Rust](https://img.shields.io/badge/Rust-1.70+-orange)](https://www.rust-lang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## 🎯 Descripción

**Token BDB** es una implementación completa de un token fungible en la blockchain de Stellar usando Soroban. Este proyecto demuestra las mejores prácticas para el desarrollo de smart contracts, incluyendo manejo de errores, optimización de storage, y emisión de eventos.

### ✨ Características

- ✅ **Estándar CAP-46**: Compatible con el ecosistema completo de Stellar
- ✅ **Funciones completas**: `mint`, `burn`, `transfer`, `approve`, `transfer_from`
- ✅ **Manejo de errores**: Sistema robusto de errores personalizados
- ✅ **Storage optimizado**: Separación entre instance y persistent storage
- ✅ **Eventos estructurados**: Emisión de eventos con `#[contractevent]`
- ✅ **Tests completos**: Suite de tests unitarios con validaciones
- ✅ **Deploy en Testnet**: Contrato funcionando en Stellar Testnet

## 🚀 Deploy en Testnet

### Contract Details
- **Contract ID**: `CCJVPYPPUWDQ7PYUZGHLSLOSWHRHYXWYOC6LJPE65E25TNC73LW4NDML`
- **Network**: Stellar Testnet
- **WASM Hash**: `2377e8f484e2cdba8e848371fbae63eb7160eb9b4a53603174d465ec851e6c67`

### Token Metadata
- **Nombre**: "Buen Dia Token"
- **Símbolo**: "BDB"
- **Decimales**: 7
- **Total Supply**: 1,000,000 tokens
- **Admin**: `GAP2YICTBDY2ZZ43BPITOGUFIGSDPF62REUYJUELBNYPILP7A6F5VAWL`

### Verificar en Exploradores
- **Stellar Laboratory**: [Ver Contrato](https://laboratory.stellar.org/)
- **Stellar Expert**: [Ver en Testnet](https://stellar.expert/explorer/testnet/contract/CCJVPYPPUWDQ7PYUZGHLSLOSWHRHYXWYOC6LJPE65E25TNC73LW4NDML)

## 🏗️ Arquitectura

### Estructura del Proyecto
```
token_bdb/
├── src/
│   ├── lib.rs          # Implementación principal del contrato
│   ├── storage.rs      # Definición de claves de storage
│   ├── errors.rs       # Errores personalizados
│   └── test.rs         # Tests unitarios
├── Cargo.toml          # Configuración del proyecto
└── README.md           # Este archivo
```

### Storage Design
- **Instance Storage**: Metadatos globales (más barato)
  - `Admin`, `TokenName`, `TokenSymbol`, `Decimals`, `TotalSupply`, `Initialized`
- **Persistent Storage**: Datos de usuarios (requiere TTL)
  - `Balance(Address)`, `Allowance(Address, Address)`

## 🔧 Funciones del Contrato

### Funciones Principales
- `initialize(admin, name, symbol, decimals)` - Inicializar el token
- `mint(to, amount)` - Crear nuevos tokens (solo admin)
- `burn(from, amount)` - Destruir tokens
- `transfer(from, to, amount)` - Transferir tokens
- `approve(from, spender, amount)` - Aprobar gasto
- `transfer_from(spender, from, to, amount)` - Transferir en nombre de otro

### Funciones de Consulta
- `balance(account)` - Consultar balance
- `allowance(from, spender)` - Consultar allowance
- `name()`, `symbol()`, `decimals()`, `total_supply()`, `admin()` - Metadatos

## 🧪 Testing

### Ejecutar Tests
```bash
# Compilar y ejecutar todos los tests
cargo test

# Ejecutar tests específicos
cargo test test_initialize
cargo test test_mint_and_balance
cargo test test_transfer
cargo test test_initialize_empty_name_fails
cargo test test_initialize_empty_symbol_fails
```

### Cobertura de Tests
- ✅ Inicialización del contrato
- ✅ Mint y consulta de balance
- ✅ Transferencias entre cuentas
- ✅ Validaciones de metadatos
- ✅ Manejo de errores

## 🚀 Deploy y Uso

### Prerrequisitos
- Rust 1.70+
- Stellar CLI
- Docker (opcional, para entorno aislado)

### Compilación
```bash
# Compilar a WASM
stellar contract build

# El archivo compilado estará en:
# target/wasm32v1-none/release/token_bdb.wasm
```

### Deploy en Testnet
```bash
# 1. Crear cuenta y obtener fondos
stellar keys generate alice --network testnet
curl "https://friendbot.stellar.org?addr=<TU_ADDRESS>"

# 2. Deploy del contrato
stellar contract deploy \
  --wasm target/wasm32v1-none/release/token_bdb.wasm \
  --source alice \
  --network testnet

# 3. Inicializar el token
stellar contract invoke \
  --id <CONTRACT_ID> \
  --source alice \
  --network testnet \
  -- initialize \
  --admin <ADMIN_ADDRESS> \
  --name "Buen Dia Token" \
  --symbol "BDB" \
  --decimals 7

# 4. Mintear tokens
stellar contract invoke \
  --id <CONTRACT_ID> \
  --source alice \
  --network testnet \
  -- mint \
  --to <ADMIN_ADDRESS> \
  --amount 10000000000000
```

## 📊 Eventos Emitidos

El contrato emite eventos estructurados para cada operación:

- `InitializeEvent` - Al inicializar el contrato
- `MintEvent` - Al mintear tokens
- `BurnEvent` - Al quemar tokens
- `TransferEvent` - Al transferir tokens
- `ApproveEvent` - Al aprobar gasto
- `TransferFromEvent` - Al transferir en nombre de otro

## 🔒 Seguridad

### Validaciones Implementadas
- ✅ Verificación de autorización en todas las operaciones
- ✅ Protección contra overflow/underflow
- ✅ Validación de metadatos (nombre/símbolo no vacíos)
- ✅ Verificación de balances antes de transferencias
- ✅ Verificación de allowances antes de transfer_from

### Optimizaciones
- ✅ Eliminación de keys con valor 0 (ahorro de gas)
- ✅ TTL management para storage persistente
- ✅ Separación de storage por tipo de datos

## 🎓 Aprendizajes

Este proyecto demuestra:
- **Smart Contract Development** con Soroban
- **Rust para Blockchain** con `#![no_std]`
- **Token Standards** (CAP-46)
- **Testing Best Practices** para contratos
- **Deployment Pipeline** en Stellar

## 📚 Recursos

- [Soroban Documentation](https://soroban.stellar.org/docs)
- [CAP-46 Token Standard](https://stellar.org/protocol/cap-46)
- [Stellar Laboratory](https://laboratory.stellar.org/)
- [Stellar Expert](https://stellar.expert/)

## 🤝 Contribuciones

Este proyecto es parte del curso "Buen Dia Builders" - Clase 5: Smart Contract Development.

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

---

**¡Construido con ❤️ en Stellar Soroban!** 🌟

*"El futuro del dinero programable está aquí"* 🚀
=======
# 🦈 Proyecto Stellar - Desafíos y Tareas

_Proyecto personal de desarrollo blockchain con Stellar y Soroban_ 🚀

---

## 🌟 Descripción

Este repositorio contiene mis proyectos y tareas de desarrollo blockchain utilizando la red Stellar y el SDK de Soroban. A lo largo de aproximadamente un mes, voy a completar diferentes desafíos que me permitirán aprender y dominar las tecnologías de blockchain.

---

## 📋 Objetivos de Aprendizaje

- **Stellar Network**: Comprender la red de pagos global
- **Soroban**: Desarrollar contratos inteligentes en Rust
- **JavaScript SDK**: Integrar aplicaciones web con Stellar
- **Smart Contracts**: Crear tokens y aplicaciones descentralizadas
- **Testing**: Implementar pruebas unitarias y de integración

---

## 📁 Estructura del Proyecto

```
stellar-clases/
├── 4-Clase/                    # Material de la clase 4
│   ├── 01-traits.md
│   ├── 02-result-option.md
│   ├── 03-storage.md
│   ├── 04-hello-tiburona.md
│   ├── 05-tarea.md
│   ├── README.md
│   └── recursos.md
├── hello-tiburona/             # Tarea 5: Contrato Hello World
│   ├── contracts/
│   │   └── hello-world/
│   ├── .gitignore
│   ├── Cargo.lock
│   ├── Cargo.toml
│   └── README.md
├── javascript-sdk/             # Proyectos con JavaScript SDK
└── README.md                   # Este archivo
```

---

## 🎯 Tareas Completadas

### ✅ Clase 2 - Tarea 2: Stellar JavaScript SDK

**Descripción**: Proyecto con ejemplos prácticos para trabajar con la red Stellar usando el JavaScript SDK oficial. Sistema completo de gestión de cuentas y transacciones.

**Características**:

- Creación automática de cuentas Stellar
- Sistema de pagos automatizado para múltiples destinos
- Monitor de balances para múltiples cuentas
- Consulta de información completa de cuentas
- Manejo completo de errores
- Variables de entorno para seguridad

**Archivos**:

- `crear-cuenta.js` - Generación de cuentas con Friendbot
- `ver-balance.js` - Consulta de balances
- `enviar-pago.js` - Sistema de pagos automatizado
- `consultar-balance.js` - Monitor de múltiples cuentas

**Tecnologías**: JavaScript, Stellar SDK, Node.js

**Estado**: ✅ Completado

### ✅ Clase 4 - Tarea 5: Hello Tiburona Profesional

**Descripción**: Contrato inteligente desarrollado en Soroban (Stellar) que implementa un sistema de mensajes personalizados con contador y gestión de estado.

**Características**:

- Sistema de inicialización con administrador
- Mensajes personalizados con contador automático
- Gestión de estado persistente
- Autenticación y validación de permisos
- 8 tests unitarios completos
- Contrato optimizado para producción

**Tecnologías**: Rust, Soroban, Stellar

**Estado**: ✅ Completado

---

## 🚀 Próximas Tareas

- [ ] **Tarea 6**: Sistema de tokens personalizados
- [ ] **Tarea 7**: Integración con frontend React
- [ ] **Tarea 8**: Aplicación de intercambio descentralizado (DEX)
- [ ] **Tarea 9**: Sistema de crowdfunding
- [ ] **Tarea 10**: Proyecto final integrado

---

## 🛠️ Tecnologías Utilizadas

| Tecnología     | Descripción                       | Estado |
| -------------- | --------------------------------- | ------ |
| **Rust**       | Lenguaje principal para contratos | ✅     |
| **Soroban**    | SDK de contratos inteligentes     | ✅     |
| **JavaScript** | SDK para integración web          | 🔄     |
| **React**      | Frontend framework                | 📋     |
| **Docker**     | Entorno de desarrollo             | ✅     |
| **Git**        | Control de versiones              | ✅     |

---

## 📚 Recursos de Aprendizaje

- [Documentación de Soroban](https://soroban.stellar.org/docs)
- [Stellar Developer Portal](https://developers.stellar.org/)
- [Rust Book](https://doc.rust-lang.org/book/)
- [Curso Código Futura](https://github.com/BuenDia-Builders/codigofutura)

---

## 🏆 Logros

- ✅ **Sistema JavaScript SDK** con 4 archivos funcionales
- ✅ **Contrato Hello World** con 8 tests unitarios
- ✅ **Optimización de contrato** (reducción del 35% en tamaño)
- ✅ **Documentación completa** de ambos proyectos
- ✅ **Estructura de proyecto** profesional

---

## 🔒 Seguridad

- **NUNCA** compartir Secret Keys
- **Siempre** usar Testnet para desarrollo
- **Validar** todas las transacciones
- **Auditar** código antes de producción

---

## 📝 Notas de Desarrollo

- Cada tarea tiene su propia carpeta con documentación
- Los contratos incluyen tests unitarios completos
- Se usa Docker para entornos consistentes
- El código está comentado en español

---

## 🤝 Contribuciones

Este es un proyecto personal de aprendizaje, pero las sugerencias y mejoras son bienvenidas.

---

## 📞 Contacto

**Desarrollador**: AlonsoFi
**Curso**: Código Futura 2025 - Stellar Development
**Instructoras**: Elisa Araya y Tatiana Borda (BuenDia-Builders)

---

## 📄 Licencia

Este proyecto es para fines educativos. Basado en el material del curso [Código Futura](https://github.com/BuenDia-Builders/codigofutura).

---

## 🦈 Hecho con dedicación por una Tiburona Builder 🦈

**Curso Código Futura 2025** - Desarrollo Blockchain con Stellar

_Desarrollado para aprender los fundamentos de la blockchain Stellar y el desarrollo de contratos inteligentes._ ✨

---

_¡Buen Día Builders! 🦈✨_

**#TiburonaBuilders** • **#StellarDevelopment** • **#Web3enEspañol**
>>>>>>> cea1a4bdf90ae605f9210ee3026efbd9047e2eab
