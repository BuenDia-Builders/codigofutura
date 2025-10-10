# 📝 TAREA CLASE 2 - FUNDAMENTOS DE PROGRAMACIÓN STELLAR
**Tu Camino hacia el Desarrollo Blockchain Continúa**

---

## 🎯 INFORMACIÓN GENERAL DE LA TAREA

**Entrega:** Antes del domingo 12/10 por medio de Chamverse dejar el link de GitHub, la tarea puede ser realizada entre los equipos pero recuerden que cada entrega es individual en Chamver.
**Tiempo estimado:** 4-5 horas  
**Objetivo:** Consolidar todo lo que aprendiste

---

## 💡 FILOSOFÍA DE ESTA TAREA

### 🎓 Objetivos Principales
- **Consolidar** los conocimientos de JavaScript + Stellar SDK
- **Ganar confianza** trabajando con transacciones blockchain
- **Prepararte** para el desafío de Smart Contracts en Rust
- **Desarrollar muscle memory** con los patrones esenciales de Stellar

### 🛡️ Enfoque Anti-Frustración
**Evitamos:**
- Ejercicios excesivamente complejos
- Configuraciones complicadas sin contexto
- Tareas que requieran más de 4 horas

**Promovemos:**
- Refuerzo progresivo de lo aprendido
- Éxitos tempranos que generen confianza
- Tiempo para descansar y procesar

---

## 📂 EJERCICIOS PRÁCTICOS DETALLADOS

### 🚀 Ejercicio 1: Creación Masiva de Cuentas
**Archivo:** `crear-cuenta.js`  
**Objetivo:** Modificar el script para crear 5 cuentas automáticamente

**Requisitos:**
- Usar un bucle `for` para generar 5 keypairs
- Cada cuenta debe ser fondeada con Friendbot
- Mostrar en consola: public key, secret key y balance inicial de cada una
- Guardar toda la información en un array

**Código de referencia (Página 46):**
```javascript
// Ejemplo de estructura del bucle
for (let i = 1; i <= 5; i++) {
    console.log(`Creando cuenta ${i}...`);
    // Tu código aquí
}
```
### Página de referencia: 53 del PDF

---

### 🚀 Ejercicio 2: Sistema de Pagos Automatizado
**Archivo:** `cenviar-pago.js`  
**Objetivo:** Crear un sistema que envíe pagos a múltiples destinos

**Requisitos:**
- Enviar 2 XLM a 3 cuentas diferentes en una sola ejecución
- Cada pago debe tener un memo único identificando el número de transacción
- Verificar que cada transacción fue exitosa antes de proceder con la siguiente
- Mostrar el hash de cada transacción para seguimiento

```javascript
const destinatarios = [
    { publicKey: "G...1", memo: "Pago-001" },
    { publicKey: "G...2", memo: "Pago-002" },
    { publicKey: "G...3", memo: "Pago-003" }
];
```
### Página de referencia: 55-62 del PDF

---

### 🔍 Ejercicio 3: Monitor de Balances
**Archivo:** `consultar-balance.js`  
**Objetivo:** Desarrollar un monitor que verifique balances de múltiples cuentas

**Requisitos:**
- Aceptar un array de public keys como entrada
- Mostrar para cada cuenta:
  - Balance de XLM
  - Número de trustlines activos
  - Sequence number actual
- Formatear la salida de manera legible

**Ejemplo de salida esperada::**


```javascript
=== MONITOR DE CUENTAS ===
Cuenta: GBXXX...123
  Balance: 100.50 XLM
  Trustlines: 2
  Sequence: 123456789

Cuenta: GBYYY...456
  Balance: 25.00 XLM  
  Trustlines: 0
  Sequence: 987654321
```
### Página de referencia: 71-72 del PDF

---

## 💡 TIPS PARA COMPLETAR LA TAREA

### Gestión del tiempo

**Sugerencia de horario:**

- **Día 1 (2 horas):** JavaScript
  - 1 hora: multi-transaccion.js
  - 1 hora: monitor-pagos.js

- **Día 2 (1.5 horas):** CLI
  - 1 hora: deploy.sh
  - 0.5 horas: cheatsheet

- **Día 3 (1.5 horas):** Essay
  - 0.5 horas: Investigación
  - 1 hora: Escritura

**Total: 5 horas** distribuidas en 3 días.

---

### Cuándo pedir ayuda

**SIEMPRE está bien pedir ayuda si:**
- Estás atascada más de 30 minutos
- El error no tiene sentido
- No sabes por dónde empezar

**Dónde pedir ayuda:**
- Discord del curso
- Stellar Discord (#soroban-dev)
- Stack Overflow
- A tus compañeras

**La comunidad blockchain es muy colaborativa. ¡Úsala!**

---

### Debugging tips

**Si algo no funciona:**

1. **Lee el error completo** (no solo la primera línea)
2. **Google el error exacto** (entre comillas)
3. **Verifica las versiones** (Node, SDK, CLI)
4. **Revisa la documentación oficial**
5. **Compara con el código de clase**
6. **Pide ayuda después de 30 min**

---

## 📚 RECURSOS ADICIONALES

### Documentación técnica

- **Stellar SDK JS:** https://stellar.github.io/js-stellar-sdk/
- **Stellar CLI:** https://developers.stellar.org/docs/tools/cli/stellar-cli
- **Soroban Docs:** https://developers.stellar.org/docs/build/smart-contracts
- **Horizon API:** https://developers.stellar.org/api/horizon

---

### Herramientas útiles

- **Laboratory:** https://laboratory.stellar.org
- **StellarExpert:** https://stellar.expert/explorer/testnet
- **Friendbot:** https://friendbot.stellar.org

---
## 🎯 OBJETIVOS DE APRENDIZAJE

### Al completar esta tarea, habrás:

✅ **Consolidado JavaScript + Stellar**
- Transacciones multi-operación
- Programación asíncrona
- Manejo de errores
- Streams en tiempo real

✅ **Dominado Stellar CLI**
- Automatización con bash
- Gestión de identidades
- Deploy de contratos
- Documentación técnica

✅ **Desarrollado pensamiento crítico**
- Investigación de proyectos
- Identificación de problemas
- Propuesta de soluciones
- Escritura técnica

✅ **Ganado confianza**
- En tu habilidad de aprender
- En tu capacidad de construir
- En tu futuro como developer

---

## 💬 REFLEXIÓN PERSONAL

**Antes de empezar la tarea, tómate 5 minutos:**

1. **¿Qué fue lo más difícil de la Clase 2?**

2. **¿Qué fue lo más emocionante?**

3. **¿Qué quieres dominar mejor?**

4. **¿Cómo te sientes con tu progreso?**

**Escribe tus respuestas.** Te ayudará a enfocar tu energía.

---

## 🦈 PALABRAS FINALES

### Un mensaje de Tiburona a Tiburona

> "Esta tarea no es un examen.  
> Es tu oportunidad de practicar.  
> De experimentar.  
> De romper cosas y aprender.  
>  
> No busques perfección.  
> Busca progreso.  
>  
> Cada línea de código que escribas  
> te acerca más a tus metas.  
>  
> No estás sola en esto.  
> Toda la comunidad está aquí para ayudarte.  
>  
> Pregunta.  
> Experimenta.  
> Construye.  
>  
> Porque así son las Tiburonas:  
> Persistentes.  
> Valientes.  
> Imparables."

---

### Tu progreso hasta ahora

**Semana 1 - Clase 1:**
- ✅ Creaste tu primera cuenta Stellar
- ✅ Enviaste tu primera transacción
- ✅ Entendiste los conceptos básicos

**Semana 1 - Clase 2:**
- ✅ Escribiste código JavaScript real
- ✅ Usaste la terminal como pro
- ✅ Deployaste un smart contract

**Próxima semana:**
- 🎯 Aprenderás Rust
- 🎯 Escribirás tu primer contrato
- 🎯 Construirás algo único

**¿Ves el patrón?**  
Cada clase te lleva más lejos.  
Cada día eres más capaz.  
Cada línea de código suma.

---
## 🌟 CIERRE

**Has llegado hasta aquí.**

Eso dice mucho de ti.

No solo leíste la clase.  
No solo asististe.  
Estás aquí, leyendo hasta el final, lista para hacer la tarea.

**Esa determinación es lo que separa a las que aprenden de las que construyen.**

**Tú estás construyendo.**

Sigue así, Tiburona. El futuro que estás creando para ti es increíble.

**Nos vemos el martes. Con Rust. Con más poder. Con más conocimiento.**

**Sigue nadando. Sigue construyendo.** 🦈⚡

---

**Documento anterior:** [04-smart-contracts.md](./04-smart-contracts.md)  
**Volver al índice:** [README.md](./README.md)

---

*Creado con ❤️ para las Tiburonas Builders*  
*Curso: Codigo Futura*  
*Buen Día Builders 2025* 🦈⚡