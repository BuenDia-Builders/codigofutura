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
| 5 | Arquitectura | 🟡 Moderada | 2 + 1 obligatorio | Templete + Seguridad |
| 6 | Despedida | 🟢 Ligera | última Clase| Despedida + Preguntas + Dudas |

---
| 17 AL 24 | ¡Hackathon en la casa Stellar para las elegidas!| 🟠 Alta | 1 + 2 hackathon | Proyecto portfolio |

**Total**: ~60-80 horas de contenido

---

## 📺 SEMANA 0: Bienvenida (Pregrabada)

### 🎬 Clase 0: Construyendo el Futuro de los Pagos Globales

**Duración**: ~2 horas  
**Formato**: Video pregrabado  
**Disponible**: Antes del inicio oficial

---

## 🌟 SEMANA 1: Fundamentos Stellar

### 🔵 Martes 07/10 - Clase 1: Stellar Classic Parte 1

#### 📚 Contenido

**¿Qué es Stellar?**
- Video introductorio

**Laboratorio Práctico**
- Acceder a Stellar Laboratory
- Verificar red (Testnet)

**Explorando la Blockchain**
- Tour de StellarExpert

#### 📝 Tarea
Ver [06-TAREA.md](./semana-1-fudamentos/clase-1/06-TAREA.md)

---

### 🔵 Jueves 09/10 - Clase 2: Stellar Classic Parte 2 + Primer Smart Contract

#### 📚 Contenido

**Transacciones Programáticas**
- JavaScript SDK
- Crear transacción con código

**Introducción a Stellar CLI**
- Instalación de Stellar CLI
- Comandos básicos
- Estructura de proyecto Soroban

**Deployar Hello World**
- Compilar contrato
- Deploy en testnet
- Copiar Contract ID
- Invocar función

---

### 🟢 Sábado - Refuerzo: Consolidación Clase 2

#### 📚 Contenido
- Refuerzo de transacciones programáticas
- Revisión de primer smart contract
- Resolución de dudas de setup
- Troubleshooting de instalaciones

---

## 🦀 SEMANA 2: Rust Consolidado

### 🔵 Martes 14/10 - Clase 3: Rust Básico para Soroban

#### 📚 Contenido

**Tipos en Rust**
- Vec, String, u128, i128
- struct, enum
- Tipos específicos de Soroban

**Ownership y Borrowing**
- Concepto de ownership
- Referencias (&)
- Borrowing mutable

**Funciones**
- Definir funciones
- Parámetros y retorno
- Funciones en contratos

---

### 🔵 Jueves 16/10 - Clase 4: Rust Avanzado para Soroban

#### 📚 Contenido

**Traits e Implementaciones**
- Qué son traits
- Implementar traits
- Traits en Soroban

**Result y Option**
- Manejo de errores
- ? operator
- Propagación de errores

**Patrones de Storage**
- DataKey
- env.storage()
- Persistencia de datos

---

### 🟢 Sábado - Refuerzo: Rust Profundo

#### 📚 Contenido
- Consolidar traits y Result/Option
- Práctica adicional
- Última oportunidad para dudas de Rust
- Preparación para Clase 5 (Token)

---

## ⚡ SEMANA 3: Aplicación Intensiva (CRÍTICA)

### 🔵 Martes 21/10 - Clase 5: Token Contract ERC-20-like

#### 📚 Contenido

**Teoría: Token en Stellar**
- Qué es un token
- Funciones estándar (mint, balance, transfer)
- Diferencias con Ethereum

---

### 🔵 Jueves 23/10 - Clase 6: Frontend React + Freighter Wallet

#### 📚 Contenido

**Setup React**
- Create React App
- Instalar Stellar SDK
- Estructura del proyecto

**Integración FreighteR**
- Conectar wallet
- Obtener public key del usuario
- Firmar transacciones

**Template Preconfigurado**
- Explorar template
- Modificar componentes
- Estilizar con Tailwind

---

### 🟢 Sábado - Refuerzo: Scalffold + Token

#### 📚 Contenido
- Consolidar Token BdB
- Práctica adicional
- Última oportunidad para dudas de Scalffold
- Preparación para Clase 7 (Token)

---

## 🔗 SEMANA 4: Integración y Soroban

### 🔵 Martes 28/1O - Clase 7: Assets + Frontend Integrado


### Entender
- ✅ Qué son los Assets Nativos y por qué son poderosos
- ✅ Por qué grandes empresas (Circle, MoneyGram) los usan
- ✅ Cómo funcionan trustlines (tu seguridad)
- ✅ Qué es el DEX y path payments (la magia)
- ✅ Cuándo usar Assets Nativos vs Soroban

### Construir
- ✅ Una dApp completa con Next.js
- ✅ 3 componentes funcionales (Wallet, Balance, Trustline)
- ✅ Backend con Supabase
- ✅ Deploy en Vercel (URL pública)


---

### 🔵 Jueves 30/10 - Clase 8: Ver el código de ASSETS con más profundidad

**Duración**: 90 min

#### 📚 Contenido

### Tecnologías usadas:

- ✅ **Next.js**: Framework de React
- ✅ **Tailwind CSS**: Estilos
- ✅ **Stellar SDK**: Interacción con blockchain
- ✅ **Freighter API**: Wallet connection
- ✅ **Supabase**: Base de datos
- ✅ **Vercel**: Hosting

Tu código solo:
1. Llama operaciones que ya existen (ChangeTrust)
2. Firma transacciones con Freighter
3. Consulta datos con Horizon API

**Eso es todo. Simple. Poderoso.**

---

### 🟠 Sábado 01/11 - 1 clase de Producto ⚠️ OBLIGATORIO

#### 📚 Contenido
- Figma - Producto - Preguntas

---

## 🏗️ SEMANA 5: Arquitectura y Seguridad

### 🔵 Martes 04/11 - Clase 9: Arquitectura - Templete para que se lleven a su casa

#### 📚 Contenido

**Patrones de Diseño**
- Factory pattern
- Proxy pattern
- Decisiones arquitecturales

**Ejemplo: Templete**

#### 🎯 Objetivos
- Diseñar arquitectura completa
- Tomar decisiones conscientes
- Unir Stellar Classic + Soroban

#### 💡 Une TODO
Stellar Classic, Soroban, Frontend, Assets/DEX → **Arquitectura completa**

---

### 🔵 Jueves 06/11 - Clase 10: Seguridad y Testing de nuestro Templete

#### 📚 Contenido

**Best Practices de Seguridad**
- Common vulnerabilities
- Reentrancy attacks
- Integer overflow/underflow
- Access control

#### 🎯 Objetivos
- Desarrollar con mentalidad segura
- Escribir tests comprehensivos
- Auditar contratos básicamente

---

### 🟠 Sábado 08/11 -2da clase de Producto ⚠️ OBLIGATORIO

#### 📚 Contenido
- Armar pitch
- Brainstorming en equipos
- Seleccionar caso de uso
- Definir MVP

---

# 🏗️ SEMANA 6: Despedida y nuevos ánimos

### 🔵 Martes 11/11 - Clase 11: 

#### 🎯 Objetivos
- Tomar decisiones conscientes
- Preguntas y respuestas

---

# 🏆 SEMANA 16 al 24: Hackathon con Stellar

#### 📚 Estructura que BdB te recomienda seguir

**Kickoff**
- Presentación de equipos
- Reglas del hackathon
- Recursos disponibles

**Ideación y Planning**
- Brainstorming en equipos
- Seleccionar caso de uso
- Definir MVP

**Desarrollo Inicial**
- Setup de proyecto
- Dividir tareas
- Comenzar desarrollo

**Trabajo Asíncrono**
- Continuar desarrollo
- Coordinación por Discord
- Office hours disponibles

---

## 📈 Métricas de Éxito

### Al Finalizar el Curso

**Habilidades Técnicas:**
- ✅ Crear transacciones Stellar programáticamente
- ✅ Escribir smart contracts Soroban en Rust
- ✅ Integrar contratos con frontend React
- ✅ Decidir arquitectura de dApps
- ✅ Implementar testing y seguridad
- ✅ Deployar en testnet

**Proyecto Final:**
- ✅ dApp funcional deployada
- ✅ Código en GitHub
- ✅ Presentación grabada
- ✅ Documentación completa

**Comunidad:**
- ✅ Acceso a red de alumni de Buen Día Builders
- ✅ Certificado NFT
- ✅ Conexiones con ecosistema Stellar


---

## 🔮 Roadmap Futuro de BDB

### 2025 Q3-Q4
- ✅ Este curso (Stellar Fundamentals)
- 🔜 Módulo avanzado: Soroban Patterns
- 🔜 Workshop: SCF Application Masterclass

### 2026 Q1-Q2
- 🔜 Curso: Auditoría de Smart Contracts
- 🔜 Curso: DeFi Protocols en Stellar
- 🔜 Programa de Mentorías 1-on-1

### 2026 Q3-14
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

**6 semanas.**  
**De principiante a builder.**  
**De idea a dApp deployada.**

### ¿Lista para el viaje?

**[🚀 Empezar Clase 0](./clase-0-bienvenida/README.md)**

---

### 🦈⚡ Vamos a construir⚡🦈

**Última actualización**: Noviembre 2025  
**Versión**: 1.0  
**Mantenido por**: Equipo Buen Día Builders

</div>
