# CLASE 6: TU TOKEN COBRA VIDA
## 04 - Freighter Wallet + Primera Interacción

## POR QUÉ NECESITAMOS UNA WALLET

Hasta ahora el scaffold puede LEER tu contrato (ver balances, datos públicos). Pero para ESCRIBIR (hacer transfers, mint tokens) necesitás:

1. **Firmar transacciones** - Probar que sos vos
2. **Pagar fees** - Cada transacción cuesta aproximadamente 0.00001 XLM

Para eso necesitás una wallet. Y **Freighter es la mejor para Stellar.**

Ya la usaste en Clase 1, así que esto es un repaso rápido + integración con el frontend.

---

## PARTE 3A: CONECTAR FREIGHTER WALLET

### IMPORTANTE - Compatibilidad de navegador

Freighter es una extensión de navegador.

**Usá Chrome o Firefox para esta clase.**

Safari NO es compatible con la extensión.

---

### PASO 1: Verificar instalación

#### Si ya tenés Freighter:

1. Deberías ver el ícono en la barra de extensiones del navegador
2. Click en el ícono
3. Verificá que estás en **TESTNET** (no Mainnet)

#### Para cambiar a Testnet:

1. Abrí Freighter (click en el ícono)
2. Click en el menú (tres líneas arriba a la derecha)
3. **Settings**
4. **Network:** seleccioná "Testnet"

#### Si NO tenés Freighter instalada:

1. Andá a: https://freighter.app
2. Click en "Install"
3. Seguí los pasos de instalación
4. Durante el setup, seleccioná **TESTNET**

**Documentación oficial:** https://docs.freighter.app/

---

### PASO 2: Importar tu cuenta testnet

#### Si ya tenés XLM testnet en Freighter:

Saltá al Paso 3.

#### Si necesitás importar tu cuenta:

```bash
# Obtener tu secret key (CUIDADO, es privada)
stellar keys show testnet
```

**ADVERTENCIA:** Esta es tu SECRET KEY. Nunca la compartas.

**NUNCA hagas esto:**
- ❌ No pegues tu secret key en el código fuente
- ❌ No la compartas en Discord, Telegram, o cualquier chat público
- ❌ No la guardes en un archivo de texto sin encriptar
- ❌ No tomes screenshots que la muestren y las subas
- ❌ No la pongas en variables de entorno públicas (como .env que subís a GitHub)

**PIENSA EN ESTO COMO:** Tu secret key es como la combinación de tu caja fuerte + tu PIN bancario + tu firma legal, todo en uno. Si alguien la tiene, controla TODO tu dinero en esa cuenta.

#### En Freighter:

1. Click en "Import Account"
2. Pegá tu secret key
3. Dale un nombre: "Testnet Builder"
4. Listo

---

### PASO 3: Verificar fondos

Necesitás XLM testnet para pagar fees (muy baratos, pero necesarios).

#### En Freighter:

- Deberías ver tu balance de XLM
- Si tenés menos de 1000 XLM, pedí más

#### Pedir XLM testnet gratis:

```bash
stellar keys fund testnet
```

**O usá el Friendbot web:** https://laboratory.stellar.org/#account-creator?network=test

**Verificar balance:**

Andá a https://stellar.expert/explorer/testnet y buscá tu public key (empieza con G).

---

### PASO 4: Conectar Freighter a tu app

Ahora vamos a conectar tu wallet al frontend.

#### Abrir el código:

```bash
# En tu editor favorito
code src/App.tsx

# O con nano
nano src/App.tsx

# O con vim
vim src/App.tsx
```

#### Borrar TODO el contenido de App.tsx

Sí, borrá todo. Vamos a empezar desde cero con código bien comentado.

#### Pegar este código:

```typescript
// ========================================
// IMPORTS - Librerías que necesitamos
// ========================================

// React hooks para manejar estado
import { useState } from 'react'

// Freighter API para conectar la wallet
import { isConnected, getPublicKey } from '@stellar/freighter-api'

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

function App() {
  // ========================================
  // ESTADO - Variables que React va a "vigilar"
  // ========================================
  
  // Public key del usuario (su dirección Stellar)
  const [publicKey, setPublicKey] = useState<string>('')
  
  // Si la wallet está conectada o no
  const [connected, setConnected] = useState<boolean>(false)

  // ========================================
  // FUNCIÓN: Conectar Wallet
  // ========================================
  
  const connectWallet = async () => {
    try {
      // 1. Verificar si Freighter está instalado
      if (await isConnected()) {
        // 2. Pedir la public key del usuario
        const pk = await getPublicKey()
        
        // 3. Guardar en el estado
        setPublicKey(pk)
        setConnected(true)
        
        // 4. Log para debugging (ver en consola F12)
        console.log('Wallet conectada:', pk)
      } else {
        // Si Freighter no está instalado, mostrar alerta
        alert('Por favor instalá Freighter wallet desde https://freighter.app')
      }
    } catch (error) {
      // Si algo sale mal, mostrar el error
      console.error('Error conectando wallet:', error)
      alert('Error al conectar. Asegurate de que Freighter esté instalado y desbloqueado.')
    }
  }

  // ========================================
  // INTERFAZ - Lo que el usuario ve
  // ========================================
  
  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Título principal */}
      <h1 style={{ color: '#0088cc' }}>Mi Token BDB</h1>
      
      {/* Mostrar diferentes cosas según si está conectado o no */}
      {!connected ? (
        // ====================================
        // SI NO ESTÁ CONECTADO - Mostrar botón
        // ====================================
        <div>
          <p>Conectá tu wallet para interactuar con el token BDB</p>
          
          <button 
            onClick={connectWallet}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#0088cc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Conectar Wallet
          </button>
        </div>
      ) : (
        // ====================================
        // SI ESTÁ CONECTADO - Mostrar info
        // ====================================
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f0f0f0', 
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <p style={{ fontWeight: 'bold' }}>Conectado como:</p>
          
          {/* Mostrar public key truncada (primeros y últimos caracteres) */}
          <code style={{ 
            backgroundColor: '#fff', 
            padding: '8px', 
            borderRadius: '4px',
            display: 'block',
            marginTop: '8px',
            wordBreak: 'break-all'
          }}>
            {publicKey.slice(0, 8)}...{publicKey.slice(-8)}
          </code>
        </div>
      )}
    </div>
  )
}

// Exportar para que React pueda usar este componente
export default App
```

#### Guardar el archivo

**Si usaste code/VSCode:** `Ctrl+S` o `Cmd+S`

**Si usaste nano:** `Ctrl+X` → `Y` → `Enter`

**Si usaste vim:** `Esc` → `:wq` → `Enter`

---

### PASO 5: Probar la conexión

El navegador debería actualizarse automáticamente (hot reload).

Si no se actualiza, refrescá manualmente: `F5` o `Cmd+R`

#### Probar:

1. Mirá el navegador
2. Deberías ver "Mi Token BDB" y un botón "Conectar Wallet"
3. Click en "Conectar Wallet"
4. Freighter hace popup (ventana emergente)
5. Aprobá la conexión
6. Deberías ver tu public key truncada en pantalla

---

### CHECKLIST DE VERIFICACIÓN

Antes de continuar:

- [ ] Botón "Conectar Wallet" aparece
- [ ] Click abre Freighter popup
- [ ] Después de aprobar, veo mi public key
- [ ] No hay errores en consola del navegador (F12)

**Pausa para Troubleshooting (1-2 min):** Si algo no funciona, revisá la sección de Troubleshooting o levantá la mano.

---

## CELEBRÁ ESTO

**Tu frontend ahora puede hablar con tu wallet.**

Esto significa que puede firmar transacciones en tu nombre (con tu permiso).

Sos oficialmente una Full-Stack Blockchain Builder.

---

## PARTE 3B: PRIMERA INTERACCIÓN CON TU TOKEN

### Vamos a hacer algo REAL

Hasta ahora:
- ✅ Tu token está en testnet
- ✅ Tu frontend está corriendo
- ✅ Tu wallet está conectada

**Ahora vamos a unir todo:** Ver tu balance de BDB desde el frontend.

---

### PASO 6: Agregar funcionalidad de balance

Vamos a actualizar `src/App.tsx` para agregar la función de ver balance.

#### Código completo actualizado:

```typescript
// ========================================
// IMPORTS
// ========================================

import { useState } from 'react'
import { isConnected, getPublicKey } from '@stellar/freighter-api'

// NUEVO: Importar el cliente del contrato BDB
// Este archivo fue generado automáticamente en Paso 5 de la Parte 2
import { BuenDiaTokenClient } from '../packages/buen_dia_token'

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

function App() {
  // ========================================
  // ESTADO
  // ========================================
  
  const [publicKey, setPublicKey] = useState<string>('')
  const [connected, setConnected] = useState<boolean>(false)
  
  // NUEVO: Estado para el balance
  const [balance, setBalance] = useState<string>('0')
  
  // NUEVO: Estado para mostrar "Cargando..."
  const [loading, setLoading] = useState<boolean>(false)

  // ========================================
  // FUNCIÓN: Conectar Wallet
  // ========================================
  
  const connectWallet = async () => {
    try {
      if (await isConnected()) {
        const pk = await getPublicKey()
        setPublicKey(pk)
        setConnected(true)
        console.log('Wallet conectada:', pk)
      } else {
        alert('Por favor instalá Freighter wallet desde https://freighter.app')
      }
    } catch (error) {
      console.error('Error conectando wallet:', error)
      alert('Error al conectar. Asegurate de que Freighter esté instalado.')
    }
  }

  // ========================================
  // FUNCIÓN NUEVA: Obtener Balance
  // ========================================
  
  const getBalance = async () => {
    // 1. Verificar que la wallet esté conectada
    if (!connected) {
      alert('Conectá tu wallet primero')
      return
    }

    // 2. Mostrar estado de carga
    setLoading(true)
    
    try {
      // 3. Obtener Contract ID desde variables de entorno
      const contractId = import.meta.env.VITE_BDB_CONTRACT_ID
      
      // 4. Crear instancia del cliente del contrato
      const client = new BuenDiaTokenClient({
        contractId: contractId,
        networkPassphrase: 'Test SDF Network ; September 2015', // Testnet
        rpcUrl: 'https://soroban-testnet.stellar.org'
      })

      // 5. Llamar a la función balance del contrato
      // Le pasamos la public key del usuario
      const result = await client.balance({ id: publicKey })
      
      // 6. Guardar el resultado en el estado
      setBalance(result.toString())
      
      // 7. Log para debugging
      console.log('Balance obtenido:', result.toString())
      
    } catch (error) {
      // Si algo sale mal, mostrar el error
      console.error('Error obteniendo balance:', error)
      alert('Error al obtener balance. Verificá que el contrato esté deployado.')
    } finally {
      // 8. Ocultar estado de carga (pase lo que pase)
      setLoading(false)
    }
  }

  // ========================================
  // INTERFAZ
  // ========================================
  
  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#0088cc' }}>Mi Token BDB</h1>
      
      {!connected ? (
        <div>
          <p>Conectá tu wallet para interactuar con el token BDB</p>
          
          <button 
            onClick={connectWallet}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#0088cc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Conectar Wallet
          </button>
        </div>
      ) : (
        <div>
          {/* Información de conexión */}
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#f0f0f0', 
            borderRadius: '8px',
            marginTop: '20px'
          }}>
            <p style={{ fontWeight: 'bold' }}>Conectado como:</p>
            <code style={{ 
              backgroundColor: '#fff', 
              padding: '8px', 
              borderRadius: '4px',
              display: 'block',
              marginTop: '8px',
              wordBreak: 'break-all'
            }}>
              {publicKey.slice(0, 8)}...{publicKey.slice(-8)}
            </code>
          </div>

          {/* NUEVO: Botón para ver balance */}
          <div style={{ marginTop: '30px' }}>
            <button 
              onClick={getBalance}
              disabled={loading} // Deshabilitar mientras carga
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: loading ? '#ccc' : '#00cc88', // Gris si está cargando
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Cargando...' : 'Ver mi Balance BDB'}
            </button>

            {/* NUEVO: Mostrar el balance */}
            <div style={{
              marginTop: '20px',
              padding: '20px',
              backgroundColor: '#e8f5e9',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '14px', margin: '0 0 8px 0', color: '#666' }}>
                Balance actual:
              </p>
              <p style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                margin: '0',
                color: '#00cc88'
              }}>
                {balance} BDB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
```

#### Guardar el archivo

El navegador debería actualizarse automáticamente.

---

### PASO 7: Probar el balance

1. Si no estás conectada, conectá tu wallet
2. Click en "Ver mi Balance BDB"
3. Esperá unos segundos
4. Deberías ver tu balance

---

### CHECKLIST DE VERIFICACIÓN

- [ ] Botón "Ver mi Balance BDB" aparece después de conectar
- [ ] Click muestra "Cargando..."
- [ ] Después de unos segundos, veo mi balance
- [ ] No hay errores en consola (F12)

---

### Si tu balance es 0

**Es normal** si no has minteado tokens todavía. Lo importante es que la conexión funciona.

#### OPCIONAL: Mintear tokens para probar

Si tu balance es 0 y querés ver números más interesantes, podés mintear tokens de prueba desde la terminal:

```bash
stellar contract invoke \
  --id TU_CONTRACT_ID \
  --source testnet \
  --network testnet \
  -- mint \
  --to TU_PUBLIC_KEY \
  --amount 10000000
```

**IMPORTANTE:** Reemplazá:
- `TU_CONTRACT_ID` = Tu Contract ID (de `.env`)
- `TU_PUBLIC_KEY` = Tu public key (de Freighter o `stellar keys address testnet`)

**Nota sobre el amount:** El número depende de la precisión de tu token. Si tiene 7 decimales, `10000000` = 1 BDB.

**Después de mintear:**
1. Volvé al navegador
2. Click en "Ver mi Balance BDB" de nuevo
3. Ahora deberías ver el balance actualizado

**Pausa para Troubleshooting (1-2 min):** Si tu balance no aparece o tenés errores, levantá la mano ahora.

---

### ALTERNATIVA: Verificar balance desde terminal (Debugging)

Si querés verificar que tu contrato funciona sin usar el frontend, podés probarlo desde la terminal:

```bash
stellar contract invoke \
  --id TU_CONTRACT_ID \
  --source testnet \
  --network testnet \
  -- balance \
  --id TU_PUBLIC_KEY
```

**Esto es útil para:**
- Debugging
- Verificar que el contrato está bien deployado
- Comparar resultados (terminal vs frontend)
- Si tenés problemas con Freighter

---

## CELEBRÁ ESTO

**Acabás de leer datos de un smart contract en testnet desde una UI que VOS construiste.**

Esto es desarrollo blockchain real. No es un tutorial. No es un mockup. Es tu producto funcionando.

---

## TROUBLESHOOTING: PARTE 3

### Error: "El popup de Freighter no aparece"

**Síntomas:**
- Click en "Conectar Wallet"
- Nada pasa

**Solución:**

1. Asegurate de que Freighter está desbloqueado:
   - Click en el ícono de Freighter
   - Si pide contraseña, ingresala

2. Comprobá que estás en TESTNET:
   - Freighter → Settings → Network → Testnet

3. Refrescá la página del navegador:
   - `F5` o `Cmd+R`
   - Intentá de nuevo

4. Verificá que no hay extensiones bloqueando popups:
   - Deshabilitá bloqueadores de popups
   - Probá en ventana de incógnito

5. Probá en otro navegador:
   - Chrome o Firefox (Safari no funciona)

---

### Error: "Cannot read property 'balance' of undefined"

**Síntomas:**
```
TypeError: Cannot read property 'balance' of undefined
```

**Solución:**

1. Verificá que corriste `npm run build:contracts`
2. Verificá que el import es correcto:
   ```typescript
   import { BuenDiaTokenClient } from '../packages/buen_dia_token'
   ```
3. Verificá que el archivo existe:
   ```bash
   ls packages/buen_dia_token/index.ts
   ```

---

### Error: "Contract ID is undefined"

**Síntomas:**
- Click en "Ver Balance"
- Error sobre Contract ID

**Solución:**

1. Verificá tu `.env`:
   ```bash
   cat .env | grep VITE_BDB_CONTRACT_ID
   ```

2. Debe tener un valor:
   ```bash
   VITE_BDB_CONTRACT_ID=CXXXXX...
   ```

3. Si está vacío, agregá tu Contract ID
4. Reiniciá el servidor:
   ```bash
   # Ctrl+C para parar
   npm run dev
   ```

**IMPORTANTE:** Las variables de entorno solo se cargan al iniciar el servidor. Si cambiás `.env`, tenés que reiniciar.

---

### Error: "Network request failed"

**Síntomas:**
- Click en "Ver Balance"
- Error sobre network o RPC

**Solución:**

1. Verificá tu conexión a internet
2. Verificá que el RPC URL es correcto:
   ```bash
   cat .env | grep VITE_STELLAR_RPC_URL
   ```
   Debe ser: `https://soroban-testnet.stellar.org`

3. Probá si el RPC funciona:
   ```bash
   curl https://soroban-testnet.stellar.org
   ```

4. Si Stellar Testnet está caído:
   - Esperá 5-10 minutos
   - Revisá el status: https://status.stellar.org/

---

### El balance muestra un número raro (ej: 10000000 en vez de 1)

**Síntomas:**
- Balance muestra: `10000000 BDB`
- Esperabas ver: `1 BDB`

**Explicación:**
Los tokens en Stellar usan números enteros (sin decimales). Si tu token tiene 7 decimales, entonces:
- `10000000` = 1 token
- `100000000` = 10 tokens

**Solución (opcional para tarea):**
Podés formatear el número dividiéndolo:

```typescript
// En lugar de:
setBalance(result.toString())

// Usar:
const formatted = (Number(result) / 10000000).toFixed(2)
setBalance(formatted)
```

---

## COMANDOS ÚTILES PARA ESTA PARTE

```bash
# Ver tu public key
stellar keys address testnet

# Ver tu secret key (CUIDADO)
stellar keys show testnet

# Pedir XLM testnet
stellar keys fund testnet

# Mintear tokens de prueba
stellar contract invoke \
  --id CONTRACT_ID \
  --source testnet \
  --network testnet \
  -- mint \
  --to PUBLIC_KEY \
  --amount 10000000

# Ver balance desde terminal
stellar contract invoke \
  --id CONTRACT_ID \
  --source testnet \
  --network testnet \
  -- balance \
  --id PUBLIC_KEY

# Reiniciar servidor (si cambiaste .env)
# Ctrl+C para parar
npm run dev
```

---

## LO QUE LOGRASTE EN ESTA PARTE

Mirá todo lo que hiciste:

1. ✅ Instalaste/verificaste Freighter
2. ✅ Conectaste tu wallet al frontend
3. ✅ Creaste una UI para mostrar conexión
4. ✅ Importaste el cliente TypeScript generado
5. ✅ Llamaste a una función del smart contract
6. ✅ Mostraste el resultado en la UI
7. ✅ Manejaste estados de carga
8. ✅ Manejaste errores apropiadamente

**Esto no es un tutorial básico.** Esto es arquitectura de producción.

---

## DIAGRAMA: CÓMO FUNCIONA TODO JUNTO

```
[Usuario en el navegador]
       ↓
   (click en botón)
       ↓
[App.tsx - función getBalance()]
       ↓
   (llama al cliente)
       ↓
[BuenDiaTokenClient] ← (generado automáticamente)
       ↓
   (hace request RPC)
       ↓
[Stellar Testnet RPC Server]
       ↓
   (lee el contrato)
       ↓
[Tu Contrato BDB en blockchain]
       ↓
   (devuelve el balance)
       ↓
[De vuelta a App.tsx]
       ↓
   (actualiza el estado)
       ↓
[React re-renderiza]
       ↓
[Usuario ve el balance actualizado]
```


---

## PRÓXIMO PASO

Si tu balance aparece correctamente en la UI, completaste exitosamente la parte técnica de la clase.

Ahora viene la **Parte 4: Tarea para Casa** donde vas a:
- Personalizar tu UI
- Agregar funcionalidad de transferencia (opcional)
- Crear features avanzadas (opcional)
- Prepararte para el Product Quest del sábado

**Guardá este archivo como referencia.** Lo vas a necesitar cuando trabajes en tu tarea.

**Vamos a construir, Tiburonas!**

---

**Siguiente:** `05-tarea-recursos.md` - Desafíos, Recursos y Cierre