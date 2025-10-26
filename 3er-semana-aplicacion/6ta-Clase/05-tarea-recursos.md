# CLASE 6: TU TOKEN COBRA VIDA
## 05 - Tarea para Casa + Recursos + Cierre

---

## CIERRE: LO QUE LOGRASTE HOY

Hoy no solo aprendiste sobre frontends y wallets.

**Te convertiste en una Full-Stack Blockchain Builder.**

### Lo que hiciste:

- ✅ Compilaste tu contrato con el target correcto (`wasm32v1-none`)
- ✅ Optimizaste el WASM para producción
- ✅ Deployaste tu token BDB a Stellar Testnet (blockchain REAL)
- ✅ Levantaste un frontend profesional con Scaffold Stellar
- ✅ Generaste clientes TypeScript automáticamente
- ✅ Conectaste tu Freighter Wallet
- ✅ Hiciste tu primera llamada a un smart contract desde una UI

### Lo que esto significa:

**Antes de hoy:** Eras una backend builder (contratos, terminal, código invisible)

**Después de hoy:** Eres una full-stack builder (backend + frontend + wallet)

**Estadística real:** Menos del 1% de las personas que "aprenden blockchain" llegan hasta aquí. La mayoría se queda en tutoriales teóricos.

Vos CONSTRUISTE un producto funcional.

---

## TAREA PARA CASA: DESAFÍO TIBURONA

La tarea está dividida en 3 niveles. Elegí según tu nivel de comodidad y tiempo disponible.

---

### NIVEL 1: BÁSICO (Esperemos que Todas puedan completar esto)

**Objetivo:** Personalizar la UI básica

**Tareas:**

- [ ] Cambiá los colores de los botones a tus colores favoritos
- [ ] Agregá un título personalizado (ej: "Token BDB - Mi Primera DApp")
- [ ] Mejorá el mensaje de bienvenida cuando no hay wallet conectada
- [ ] Agregá tu nombre o apodo en algún lugar de la UI

**Ejemplo de personalización:**

```typescript
// En App.tsx, cambiar colores:

<button 
  onClick={connectWallet}
  style={{
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#ff6b9d', // ← Cambiá este color
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }}
>
  Conectar Wallet
</button>

// Agregar tu nombre:
<h1 style={{ color: '#0088cc' }}>
  Token BDB por [Tu Nombre] 🦈
</h1>
```

**Entregable:** 
- Screenshot de tu UI personalizada
- Subir antes del domingo a la madrugada al Chamverse

---

### NIVEL 2: INTERMEDIO (Para las que quieren ir más allá)

**Objetivo:** Agregar funcionalidad de transferencia

Creá un formulario simple para transferir tokens BDB entre cuentas.

#### Código sugerido para agregar en App.tsx:

```typescript
// ========================================
// IMPORTS ADICIONALES
// ========================================

import { Server } from '@stellar/stellar-sdk'
import { signTransaction } from '@stellar/freighter-api'

// ========================================
// ESTADO ADICIONAL (agregar dentro de App())
// ========================================

const [toAddress, setToAddress] = useState<string>('')
const [amount, setAmount] = useState<number>(0)
const [transferring, setTransferring] = useState<boolean>(false)

// ========================================
// FUNCIÓN: Transferir Tokens
// ========================================

const transferTokens = async () => {
  // 1. VALIDACIÓN BÁSICA
  if (!toAddress || amount <= 0) {
    alert('Por favor ingresá una dirección y cantidad válidas')
    return
  }
  
  // 2. VALIDACIÓN DE DIRECCIÓN STELLAR
  // Las direcciones Stellar empiezan con G y tienen 56 caracteres
  if (!toAddress.startsWith('G') || toAddress.length !== 56) {
    alert('Dirección destino inválida. Debe empezar con G y tener 56 caracteres')
    return
  }

  // 3. INICIAR PROCESO DE TRANSFERENCIA
  setTransferring(true)
  
  try {
    // 4. OBTENER CONTRACT ID
    const contractId = import.meta.env.VITE_BDB_CONTRACT_ID
    
    // 5. CREAR CLIENTE DEL CONTRATO
    const client = new BuenDiaTokenClient({
      contractId: contractId,
      networkPassphrase: 'Test SDF Network ; September 2015',
      rpcUrl: 'https://soroban-testnet.stellar.org'
    })

    // 6. CONSTRUIR TRANSACCIÓN
    // Llamamos a la función transfer de nuestro contrato
    const tx = await client.transfer({
      from: publicKey,      // Quien envía (nosotros)
      to: toAddress,        // Quien recibe
      amount: BigInt(amount) // Cantidad (convertida a BigInt)
    })

    // 7. FIRMAR CON FREIGHTER
    // El usuario debe aprobar la transacción en el popup
    const signedTx = await signTransaction(tx, {
      network: 'TESTNET',
      accountToSign: publicKey
    })

    // 8. ENVIAR A LA RED
    const server = new Server('https://soroban-testnet.stellar.org')
    const result = await server.submitTransaction(signedTx)
    
    // 9. ÉXITO
    console.log('Transfer exitoso:', result)
    alert('¡Transferencia exitosa!')
    
    // 10. ACTUALIZAR BALANCE
    getBalance()
    
    // 11. LIMPIAR FORMULARIO
    setToAddress('')
    setAmount(0)
    
  } catch (error) {
    // SI ALGO SALE MAL
    console.error('Error en transfer:', error)
    alert('Error en la transferencia: ' + error.message)
  } finally {
    // SIEMPRE OCULTAR LOADING (pase lo que pase)
    setTransferring(false)
  }
}
```

#### JSX para el formulario (agregar después del balance):

```typescript
{/* FORMULARIO DE TRANSFERENCIA */}
<div style={{ marginTop: '30px' }}>
  <h3>Transferir BDB</h3>
  
  {/* Input para dirección destino */}
  <input 
    type="text" 
    placeholder="Dirección destino (G...)" 
    value={toAddress}
    onChange={(e) => setToAddress(e.target.value)}
    style={{
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '14px'
    }}
  />
  
  {/* Input para cantidad */}
  <input 
    type="number" 
    placeholder="Cantidad" 
    value={amount}
    onChange={(e) => setAmount(Number(e.target.value))}
    style={{
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '14px'
    }}
  />
  
  {/* Botón de transferir */}
  <button 
    onClick={transferTokens}
    disabled={transferring}
    style={{
      padding: '12px 24px',
      fontSize: '16px',
      backgroundColor: transferring ? '#ccc' : '#ff6b6b',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: transferring ? 'not-allowed' : 'pointer',
      width: '100%'
    }}
  >
    {transferring ? 'Transfiriendo...' : 'Transferir BDB'}
  </button>
</div>
```

**Nota sobre la validación:** El código verifica que la dirección empiece con 'G' (public key de Stellar) y tenga exactamente 56 caracteres. Esto previene errores comunes al copiar/pegar direcciones incorrectas.

#### Checklist Nivel 2:

- [ ] Formulario de transferencia agregado
- [ ] Inputs funcionan correctamente
- [ ] Botón está deshabilitado durante la transferencia
- [ ] Mensaje de éxito/error se muestra apropiadamente
- [ ] Balance se actualiza después de transferir

**Entregable (Opcional):** 
- Video corto (30 seg) en YouTube mostrando una transferencia exitosa
- Link al video en Chamverse y tu nombre y apellido

---

### NIVEL 3: AVANZADO (Para las Tiburonas hardcore)

**Objetivo:** Construir una feature completa profesional

Elegí UNA de estas opciones:

#### Opción A: Historial de Transacciones

Mostrá las últimas 10 transacciones del token:
- Timestamp
- From (dirección que envió)
- To (dirección que recibió)
- Amount (cantidad)
- Estilo de tabla o cards

**Pistas:**
- Usá Stellar SDK para buscar transacciones
- Endpoint: `https://horizon-testnet.stellar.org/accounts/[PUBLIC_KEY]/operations`

#### Opción B: Dashboard Visual

Creá un dashboard con:
- Gráfico de balance histórico
- Total supply del token
- Número de holders
- Usá Chart.js o Recharts

**Pistas:**
- Chart.js ya está disponible en el proyecto
- Podés hacer múltiples queries al contrato

#### Opción C: Multi-Wallet Support

Permitir conectar múltiples cuentas:
- Cambiar entre ellas con un dropdown
- Mostrar balance de cada una
- Recordar las cuentas conectadas

**Pistas:**
- Guardar cuentas en `localStorage`
- Usar un array de public keys en el estado

#### Opción D: Modo Oscuro/Claro

Implementar toggle de tema:
- Cambiar colores automáticamente
- Guardar preferencia en `localStorage`
- Colores que no quemen los ojos

**Pistas:**
- Crear un objeto con los colores del tema
- Usar un estado `darkMode` boolean
- Aplicar colores condicionalmente

#### Checklist Nivel 3:

- [ ] Feature elegida está funcionando
- [ ] Código está limpio y comentado
- [ ] UI se ve profesional
- [ ] No hay errores en consola

**Entregable:** 
- Repo de GitHub en Chamverse
- README explicando tu feature
- Deploy en Vercel/Netlify (bonus points)
- Video en YouTube (bonus points)

---

## IMPORTANTE ANTES DE SUBIR A GITHUB

**Antes de hacer commit y push, verificá:**

### 1. Archivo .gitignore existe

Asegurate de que tu `.gitignore` incluye:

```
# Variables de entorno
.env
.env.local

# Dependencias
node_modules/

# Build
dist/
build/

# Logs
*.log

# Sistema
.DS_Store
```

### 2. Tu .env NO debe estar en Git

```bash
# Verificar que .env está ignorado
git status

# NO deberías ver .env en la lista
# Si aparece, es porque falta en .gitignore
```

### 3. Crear .env.example

Creá un archivo de ejemplo para que otros sepan qué configurar:

```bash
# Archivo: .env.example

VITE_STELLAR_NETWORK=testnet
VITE_STELLAR_RPC_URL=https://soroban-testnet.stellar.org
VITE_BDB_CONTRACT_ID=YOUR_CONTRACT_ID_HERE
```

### 4. NUNCA subas secret keys

- Freighter las guarda en el navegador (no en código)
- NUNCA pongas secret keys en `.env`
- NUNCA commitees archivos con secret keys

---

## BUFFER DE TROUBLESHOOTING EN GRUPO 


### Errores Comunes y Soluciones Colaborativas

**Problema 1: "Popup de Freighter no aparece"**

Solución en grupo:
- Revisar que Freighter está desbloqueado
- Verificar que el navegador permite popups
- Probar en ventana de incógnito

**Problema 2: "npm run build:contracts falla"**

Solución en grupo:
- Verificar estructura de carpetas
- Revisar `Cargo.toml`
- Intentar compilar solo: `cd contracts/buen_dia_token && stellar contract build`

**Problema 3: "Cannot find module '@stellar/freighter-api'"**

Solución en grupo:
- Verificar que corriste `npm install @stellar/freighter-api`
- Si persiste: borrar `node_modules/` y `package-lock.json`, luego `npm install`

**Problema 4: "Balance siempre muestra 0"**

Solución en grupo:
- Verificar Contract ID en `.env`
- Probar desde terminal
- Mintear tokens de prueba

**Actividad en grupo:**
1. Levantá la mano si tenés algún error que no resolviste
2. Formá grupos de 3-4 Tiburonas
3. Cada una explica su problema
4. Trabajen juntas para resolver (peer debugging)
5. Si nadie sabe, llamá a la instructora

**Filosofía:** Las mejores builders no son las que nunca tienen errores. Son las que saben cómo resolver errores colaborativamente.

---

## RECURSOS PARA TU TAREA

### Documentación Oficial

**Scaffold Stellar:**
- Repo: https://github.com/AhaLabs/scaffold-stellar
- Ejemplos de componentes ya incluidos en tu proyecto
- **Nota:** Asegurate de usar la versión más reciente. Revisá el README para actualizaciones.

**Freighter Wallet:**
- Docs: https://docs.freighter.app/
- API Reference: https://docs.freighter.app/docs/guide/introduction

**Stellar SDK:**
- Developers: https://developers.stellar.org/docs
- Soroban Docs: https://soroban.stellar.org/docs

**React + TypeScript:**
- React Docs: https://react.dev/
- TypeScript: https://www.typescriptlang.org/docs/

---

### Inspiración de UI/UX

**Ejemplos de DeFi UI:**
- Uniswap: https://app.uniswap.org/ (simple, limpio)
- Aave: https://app.aave.com/ (dashboard complejo)
- Lido: https://lido.fi/ (animaciones sutiles)

**Diseño de Wallets:**
- Dribbble: https://dribbble.com/search/crypto-wallet
- Behance: Buscá "blockchain dashboard"

**Paletas de colores:**
- Coolors: https://coolors.co/
- Color Hunt: https://colorhunt.co/

---

### Herramientas Útiles

**Para deployment:**
- Vercel: https://vercel.com/ (deploy gratis, conecta con GitHub)
- Netlify: https://www.netlify.com/ (similar a Vercel)

**Para gráficos (si hacés Nivel 3):**
- Chart.js: Ya disponible en el proyecto
- Recharts: Gráficos para React
- D3.js: Avanzado pero poderoso

**Para debugging:**
- Stellar Laboratory: https://laboratory.stellar.org/
- Stellar Expert: https://stellar.expert/explorer/testnet

---

### Ayuda y Soporte

**Si te trabás:**
1. Leé el error en la consola del navegador (F12)
2. Buscá en la documentación oficial
3. Preguntá en el canal de Telegram
4. Stack Overflow con tag `stellar-blockchain`

**Comunidad:**
- Formá grupos de estudio con otras Tiburonas
- Compartí tu progreso en el grupo de Telegram
- Ayudá a otras cuando puedas

---

## PREPARACIÓN PARA EL SÁBADO: PRODUCT QUEST 1

### Qué esperar

El sábado (25 octubre) vamos a hacer algo diferente. No más tutoriales. No más "seguí estos pasos".

**Vas a diseñar TU propio producto blockchain desde cero.**

### Metodología Product Quest

**Fase 1: Problem Discovery**
- Identificar problemas REALES en tu comunidad
- Validar que blockchain es la solución apropiada
- No todo necesita blockchain

**Fase 2: Solution Design**
- Definir tu propuesta de valor
- Diseñar la arquitectura básica
- Decidir qué contratos necesitás

**Fase 3: MVP Definition**
- Qué es lo MÍNIMO que necesitás construir
- Qué features son críticas vs nice-to-have
- Timeline realista

**Fase 4: Pitch Prep**
- Si queres podes realizar una presentación
- Defender tus decisiones técnicas
- Recibir feedback

---

### Pensá en esto ANTES del sábado

**Pregunta clave:** ¿Qué problema enfrentan las personas en tu comunidad que blockchain podría resolver?

**Áreas comunes en Latinoamérica:**
- Remesas (enviar dinero a familia)
- Micropagos (vendedores ambulantes)
- Identidad digital (documentos)
- Acceso a crédito (sin bancos tradicionales)
- Pagos internacionales (freelancers)

**NO necesitás tener la respuesta perfecta.** Solo vení con:
- Mente abierta
- Ganas de explorar
- Disposición a iterar

**Materiales que vas a necesitar:**
- Cuaderno o laptop para tomar notas
- Todo lo que construiste hasta ahora (tus contratos, tu frontend)
- Ideas locas (las mejores soluciones empiezan así)

---

## REFLEXIÓN FINAL

Hace 6 clases no sabías qué era un smart contract.

Hoy:
- Tenés un token funcionando en testnet
- Construiste un frontend que habla con blockchain
- Podés firmar transacciones con tu wallet
- Entendés la arquitectura completa: backend + frontend + wallet

**Eso no es teoría. Es producción.**

### El viaje hasta aquí

**Clase 1:** Conociste Stellar y creaste tu primera wallet  
**Clase 2:** Entendiste cómo funciona blockchain  
**Clase 3:** Escribiste tu primer smart contract  
**Clase 4:** Dominaste el CLI de Stellar  
**Clase 5:** Construiste tu token BDB desde cero  
**Clase 6 (HOY):** Le diste vida con un frontend real  

### Lo que viene

**Sábado:** De builder a founder (diseñá tu producto)  
**Próximas clases:** Construí productos (para real)

---

## ÚLTIMO MENSAJE

Hoy cruzaste una línea invisible.

Dejaste de ser alguien que "aprende sobre blockchain" y te convertiste en alguien que "construye en blockchain".

Tu token BDB existe en una red real. Tu frontend puede interactuar con él. Tu wallet puede firmarlo.

**Mirá lo que construiste:**
- Backend: Smart contract en Rust
- Frontend: React + TypeScript
- Infraestructura: Stellar Testnet
- Wallet Integration: Freighter
- Deployment: Todo corriendo en producción

**Hace 6 clases esto era imposible para vos. Hoy es tu realidad.**

### Como las tiburonas reales:

- No te quedás en aguas poco profundas (localhost)
- Nadás hacia mar abierto (testnet, pronto mainnet)
- No temés a lo desconocido (bugs, errores, troubleshooting)
- Construís, probás, iterás, mejorás

La tarea para casa no es obligatoria pero es IMPORTANTE. Cada línea de código que escribas por tu cuenta, cada error que resuelvas con o sin ayuda, cada feature que agregues te hace más fuerte.

**El sábado vas a necesitar toda esa fuerza.** Porque vamos a diseñar algo que el mundo todavía no tiene.

Nos vemos el sábado para Product Quest y si hay dudas de esto también lo hacemos.

Seguí construyendo, seguí nadando.

**Vamos a construir**

---

## ANEXO: COMANDOS ÚTILES DE REFERENCIA

Para que tengas todo en un solo lugar:

### Compilación y Deploy

```bash
# Compilar contrato
stellar contract build

# Deploy a testnet
stellar contract deploy \
  --wasm target/wasm32v1-none/release/tu_contrato.wasm \
  --source testnet \
  --network testnet

# Optimizar WASM
wasm-opt -Oz -o optimized.wasm target/wasm32v1-none/release/tu_contrato.wasm

# Ver funciones del contrato
stellar contract invoke \
  --id CONTRACT_ID \
  --source testnet \
  --network testnet \
  -- \
  --help
```

### Scaffold Stellar

```bash
# Crear proyecto
stellar scaffold init mi-proyecto

# Instalar dependencias
npm install
npm install @stellar/freighter-api @stellar/stellar-sdk

# Generar clientes TypeScript
npm run build:contracts

# Arrancar servidor
npm run dev
```

### Freighter Wallet

```bash
# Ver tu public key
stellar keys address testnet

# Ver tu secret key (CUIDADO)
stellar keys show testnet

# Pedir XLM testnet
stellar keys fund testnet
```

### Debugging

```bash
# Ver versiones
node --version
stellar --version
rustup show

# Ver estructura de archivos
ls target/wasm32v1-none/release/

# Ver logs en el navegador
# Presiona F12 y ve a la pestaña "Console"

# Ver variables de entorno
cat .env

# Verificar instalación de dependencias
npm list @stellar/freighter-api @stellar/stellar-sdk
```

### Operaciones con el contrato

```bash
# Mintear tokens
stellar contract invoke \
  --id CONTRACT_ID \
  --source testnet \
  --network testnet \
  -- mint \
  --to PUBLIC_KEY \
  --amount 10000000

# Ver balance
stellar contract invoke \
  --id CONTRACT_ID \
  --source testnet \
  --network testnet \
  -- balance \
  --id PUBLIC_KEY

# Transferir tokens
stellar contract invoke \
  --id CONTRACT_ID \
  --source testnet \
  --network testnet \
  -- transfer \
  --from PUBLIC_KEY_FROM \
  --to PUBLIC_KEY_TO \
  --amount 1000000
```

---

## CHECKLIST FINAL DE LA CLASE

Antes de cerrar, verificá que completaste todo:

### Parte 1: Deploy
- [ ] Contrato compilado con `wasm32v1-none`
- [ ] WASM optimizado (opcional)
- [ ] Contrato deployado a testnet
- [ ] Contract ID guardado en múltiples lugares
- [ ] Verificado que funciona con `--help`

### Parte 2: Scaffold
- [ ] Proyecto Scaffold inicializado
- [ ] Contrato integrado en `contracts/`
- [ ] Archivo `.env` configurado
- [ ] Dependencias instaladas
- [ ] Cliente TypeScript generado
- [ ] Servidor corriendo en http://localhost:5173/

### Parte 3: Wallet
- [ ] Freighter instalada y configurada
- [ ] En modo TESTNET
- [ ] Cuenta con XLM testnet
- [ ] Wallet conectada al frontend
- [ ] Public key visible en la UI

### Parte 4: Interacción
- [ ] Función `getBalance()` implementada
- [ ] Balance visible en la UI
- [ ] No hay errores en consola
- [ ] (Opcional) Tokens minteados para testing

---

## PALABRAS FINALES D

Mirá todo el camino que recorriste hoy:

Empezaste con código Rust en tu computadora. Lo compilaste a WASM. Lo subiste a una blockchain pública. Creaste un frontend que cualquiera puede usar. Conectaste una wallet real. Hiciste transacciones en una red descentralizada.

**Esto no es un ejercicio académico.** Esto es lo que hacen las empresas de DeFi valuadas en millones de dólares.

La diferencia entre vos y ellas ya no es técnica. La diferencia ahora es:
- Tener una idea que resuelva un problema real
- Persistir cuando las cosas se pongan difíciles
- Seguir construyendo todos los días

**El sábado vas a trabajar en la primera parte: la idea.**

Pero hoy, celebrá. Porque hiciste algo que el 99% de las personas que dicen "quiero aprender blockchain" nunca logra.

Construiste algo REAL.

---

## RECURSOS ADICIONALES (PARA EXPLORAR)

Si terminaste tu tarea y querés aprender más:

### Tutoriales Avanzados

**Soroban by Example:**
- https://soroban.stellar.org/docs/learn/examples
- Ejemplos de contratos más complejos
- DeFi, NFTs, DAOs

**Stellar Quest:**
- https://quest.stellar.org/
- Desafíos interactivos
- Aprendé haciendo

**OpenZeppelin para Stellar:**
- Contratos auditados y seguros
- Patrones de diseño probados

### Comunidad

**Stellar Discord:**
- https://discord.gg/stellar
- Canal #soroban para preguntas técnicas
- Comunidad muy activa

**Foro de Stellar:**
- https://stellar.stackexchange.com/
- Para preguntas más profundas

**Twitter/X:**
- Seguí @StellarOrg
- Seguí #Soroban
- Conectá con otras builders

### Eventos

**Stellar Meridian:**
- Conferencia anual de Stellar
- Networking con builders del mundo

**Hackathons:**
- Stellar regularmente organiza hackathons
- Premios en XLM
- Oportunidad de ganar financiamiento

---

## SI QUERÉS LLEVAR ESTO MÁS ALLÁ

### Deploy a Mainnet (cuando estés lista)

**NO hagas esto todavía**, pero cuando tu proyecto esté listo para producción:

```bash
# 1. Crear cuenta mainnet
stellar keys generate mainnet --network mainnet

# 2. Fondear con XLM REAL (comprar en exchange)

# 3. Deploy a mainnet
stellar contract deploy \
  --wasm optimized.wasm \
  --source mainnet \
  --network mainnet
```

**IMPORTANTE:** Mainnet usa XLM real. Cada transacción cuesta dinero real. Probá TODO en testnet primero.

### Monetización

Si tu dApp tiene tracción, podés monetizar:
- **Fees:** Cobrá un pequeño fee por transacciones
- **Premium features:** Funcionalidad adicional paga
- **Token propio:** Lanzá un token de utilidad
- **Sponsorships:** Empresas que quieran integrarse

### Financiamiento

**Stellar Community Fund:**
- Grants para proyectos en Stellar
- Hasta $50k USD
- Aplicaciones abren periódicamente

**Venture Capital:**
- Si tu proyecto crece, podés buscar inversión
- Muchos VCs buscan proyectos en Stellar

---

## RECORDATORIO IMPORTANTE

### Antes del sábado:

1. **Completá al menos el Nivel 1 de la tarea** - Te va a dar confianza
2. **Pensá en problemas que ves en tu día a día** - Ideas para Product Quest
3. **Descansá bien** - El sábado va a ser intenso

### Durante la semana:

1. **Compartí tu progreso** en Telegram - Inspirá a otras
2. **Ayudá a compañeras** que estén trabadas
3. **Experimentá** con el código - Rompé cosas, arreglalas
4. **No te frustres** si algo no funciona - Pedí ayuda

---

## ÚLTIMA REFLEXIÓN

Recordá por qué empezaste este bootcamp.

Tal vez querías:
- Cambiar de carrera
- Construir algo propio
- Entender la tecnología del futuro
- Ser parte de algo más grande

**Hoy te acercaste más a ese objetivo.**

Cada línea de código que escribiste, cada error que resolviste, cada concepto que entendiste... son pasos hacia tu meta.

No importa si tu tarea es la más bonita o la más compleja. Lo que importa es que TERMINASTE algo. Que CONSTRUISTE algo.

**Eso te hace una builder.**

---

## AGRADECIMIENTOS

Gracias por:
- Venir a clase con ganas de aprender
- No rendirte cuando las cosas se pusieron difíciles
- Ayudar a tus compañeras
- Confiar en el proceso
- Ser parte de esta comunidad de Tiburonas

Sos parte de algo especial. Una comunidad de mujeres builders en Latinoamérica que está cambiando el juego.

**Sigan construyendo, sigan nadando.**

---

## NOS VEMOS EL SÁBADO

**Fecha:** Sábado 26 octubre  
**Hora:** Por confirmar  
**Tema:** Product Quest 1 - De Idea a MVP  
**Qué traer:**
- Laptop
- Cuaderno
- Ideas (aunque sean locas)
- Muchas ganas

**Qué vamos a hacer:**
- Identificar problemas reales
- Diseñar soluciones blockchain
- Definir tu MVP
- Preparar tu pitch

**No es necesario tener una idea perfecta.** Vamos a trabajar juntas para encontrarla.

---

## FIN DE LA CLASE 6

Si llegaste hasta acá y completaste todas las actividades, sos oficialmente una **Full-Stack Blockchain Builder**.

Guardá todos estos documentos. Los vas a necesitar como referencia.

Y recordá: cada Tiburona profesional que existe hoy empezó exactamente donde estás vos ahora.

**La diferencia es que ellas siguieron construyendo.**

**Vos también podés.**

---

### 🦈⚡ VAMOS A CONSTRUIR, TIBURONAS! ⚡🦈

---