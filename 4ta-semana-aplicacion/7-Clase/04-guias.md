# 📖 VOCABULARIO Y TROUBLESHOOTING

## ¡TU GUÍA DE RESCATE, TIBURONA! 🦈⚡

Esta es tu guía de referencia rápida. Cuando no entiendas un término o algo no funcione, ven aquí.

Las tiburonas reales no se rinden cuando encuentran un obstáculo - encuentran otra ruta. Esta es tu mapa.

---

## 📚 PARTE 1: VOCABULARIO COMPLETO

### A

**Account (Cuenta)**
- Tu identidad en Stellar
- Identificada por una **public key** (empieza con G)
- Necesita mínimo 1 XLM para existir
- Guarda todas tus trustlines y balances

*Ejemplo:* `GABC123...XYZ789` (56 caracteres)

---

**Asset (Activo)**
- Cualquier cosa de valor en Stellar
- Puede ser XLM o un asset personalizado
- Identificado por: `código + issuer`

*Ejemplo:* `USDC:GA5ZSE...` (USDC emitido por Circle)

---

**Asset Code (Código de Asset)**
- Nombre corto del asset (hasta 12 caracteres)
- Puede repetirse si tiene diferente issuer
- Case sensitive (USDC ≠ usdc)

*Ejemplos:* `USDC`, `EURC`, `XLM`, `EMPANADAS`

---

**Asset Nativo**
- Token que existe directamente en el protocolo de Stellar
- NO necesita contrato inteligente
- Se integra automáticamente con el DEX

*Lo opuesto:* Token Soroban (necesita contrato)

---

**Authorization Flags**
- Configuraciones de control para issuers
- Tipos:
  - `AUTH_REQUIRED`: Issuer debe aprobar trustlines
  - `AUTH_REVOCABLE`: Issuer puede revocar acceso
  - `AUTH_CLAWBACK_ENABLED`: Issuer puede recuperar assets

*Use case:* Compliance, regulación, seguridad

---

### B

**Balance (Saldo)**
- Cantidad de un asset que tienes
- Mostrado con 7 decimales
- Actualizado en tiempo real en blockchain

*Ejemplo:* `100.5000000 USDC`

---

**Base Reserve**
- XLM mínimo que debes mantener en tu cuenta
- Actualmente: 1 XLM (cuenta) + 0.5 XLM por trustline
- Es un depósito, no un gasto (recuperable)

*Ejemplo:* Cuenta con 2 trustlines = 1 + 0.5 + 0.5 = 2 XLM mínimo

---

**Blockchain**
- Base de datos distribuida e inmutable
- En Stellar: registra todas las transacciones
- Nadie puede cambiar el historial

*Analogía:* Libro contable gigante que todos pueden ver pero nadie puede borrar

---

### C

**ChangeTrust (Operation)**
- Operación para crear/modificar trustlines
- Parámetros: asset, limit
- Cuesta ~$0.000005

*Código:*
```javascript
Operation.changeTrust({
  asset: new Asset('USDC', issuerKey),
  limit: '10000'
})
```

---

**Clawback**
- Poder del issuer de recuperar assets de una cuenta
- Solo si `AUTH_CLAWBACK_ENABLED` está activado
- Use case: Fraude, orden judicial, error

*Analogía:* Como cuando un banco cancela un cheque

---

### D

**dApp (Aplicación Descentralizada)**
- App que usa blockchain
- No tiene servidor central
- Los usuarios controlan sus datos

*Ejemplo:* La dApp que construiste en esta clase

---

**DEX (Decentralized Exchange)**
- Exchange descentralizado
- En Stellar: parte del protocolo (built-in)
- Usa order books, no AMM

*Analogía:* Mercado global donde todos pueden intercambiar assets

---

### F

**Fee (Tarifa)**
- Costo de hacer una transacción
- En Stellar: ~$0.000005 (100 stroops)
- Pagado en XLM

*Comparación:* Ethereum = $5-50, Stellar = $0.000005

---

**Freighter**
- Wallet no custodial para Stellar
- Extensión de navegador
- Almacena tu secret key localmente

*Similar a:* MetaMask para Ethereum

---

### H

**Horizon**
- API de Stellar para consultar la red
- Endpoints:
  - Testnet: `https://horizon-testnet.stellar.org`
  - Mainnet: `https://horizon.stellar.org`

*Use case:* Consultar balances, enviar transacciones, ver historial

---

### I

**Issuer (Emisor)**
- Cuenta que crea un asset
- Identificada por su public key
- Controla supply y authorization

*Ejemplo:* Circle es el issuer de USDC en Stellar

---

### L

**Lumens (XLM)**
- Moneda nativa de Stellar
- No requiere trustline
- Usada para fees y base reserves

*Analogía:* Como Ether (ETH) en Ethereum

---

### M

**Mainnet (Red Principal)**
- Red de producción de Stellar
- Assets tienen valor REAL
- Transacciones son permanentes

*⚠️ Cuidado:* Verifica TODO en testnet primero

---

### N

**Networks (Redes)**
- Mainnet: Red de producción
- Testnet: Red de prueba
- Cada una tiene su propia passphrase

*IMPORTANTE:* NO mezcles assets entre redes

---

### O

**Operation (Operación)**
- Acción específica en una transacción
- Tipos: Payment, ChangeTrust, CreateAccount, etc.
- Una transacción puede tener múltiples operaciones

*Ejemplo:* `Operation.changeTrust()` crea una trustline

---

**Order Book**
- Lista de órdenes de compra/venta en el DEX
- Organizadas por precio
- Matching automático

*Analogía:* Como el libro de órdenes en Binance

---

### P

**Path Payment**
- Transacción que convierte assets automáticamente
- Usa múltiples steps si es necesario
- Busca el mejor rate

*Ejemplo:* Envías XLM, receptor recibe USDC (conversión automática)

---

**Public Key (Clave Pública)**
- Tu "dirección" en Stellar
- Empieza con G (56 caracteres)
- Puedes compartirla libremente

*Analogía:* Como tu dirección de email

*Ejemplo:* `GABC123...XYZ789`

---

### S

**Secret Key (Clave Secreta)**
- Tu contraseña para firmar transacciones
- Empieza con S (56 caracteres)
- NUNCA la compartas

*Analogía:* Como tu contraseña bancaria + PIN + firma legal

*Ejemplo:* `SABC123...XYZ789`

---

**Sequence Number**
- Número único para cada transacción de una cuenta
- Incrementa en 1 con cada transacción
- Previene replay attacks

*Se maneja automáticamente* por Stellar SDK

---

**Stroop**
- Unidad más pequeña en Stellar
- 1 stroop = 0.0000001 XLM
- 10,000,000 stroops = 1 XLM

*Analogía:* Como satoshi en Bitcoin

---

**Supabase**
- Backend-as-a-Service (BaaS)
- Base de datos PostgreSQL
- APIs automáticas

*Use case:* Guardar metadata de transacciones

---

### T

**Testnet (Red de Prueba)**
- Red para testing
- XLM gratis de friendbot
- Transacciones NO tienen valor real

*⚠️ IMPORTANTE:* SIEMPRE prueba aquí primero

---

**Transaction (Transacción)**
- Conjunto de operaciones firmadas
- Enviada a la red Stellar
- Confirmada en 3-5 segundos

*Estructura:* Source account + Operations + Fee + Signature

---

**TransactionBuilder**
- Clase de Stellar SDK para construir transacciones
- Pasos:
  1. Cargar account
  2. Agregar operations
  3. Set timeout
  4. Build
  5. Firmar

---

**Trustline**
- Permiso para recibir un asset específico
- Costo: 0.5 XLM (base reserve)
- Tiene un límite máximo

*Analogía:* Abrir una cuenta bancaria para una moneda específica

---

### V

**Vercel**
- Plataforma para deploy de apps
- Optimizado para Next.js
- Deploy automático desde Git

*Alternativas:* Netlify, Cloudflare Pages

---

### X

**XDR (External Data Representation)**
- Formato binario para serializar datos
- Usado para transacciones en Stellar
- Freighter firma transacciones en XDR

*No necesitas entenderlo a fondo* - SDK lo maneja

---

### Otros Términos Importantes

**Friendbot**
- Servicio que da XLM gratis en testnet
- URL: `https://friendbot.stellar.org`
- Solo para testing

---

**Horizon API**
- Ver arriba en H

---

**Network Passphrase**
- String único para cada red
- Testnet: `"Test SDF Network ; September 2015"`
- Mainnet: `"Public Global Stellar Network ; September 2015"`

*Previene:* Transacciones en red equivocada

---

## 🔧 PARTE 2: TROUBLESHOOTING COMPLETO

### ERROR 1: "Freighter is not installed"

**Síntoma:**
```
Error: Freighter Wallet no está instalada
```

**Causas posibles:**
1. Freighter no instalada
2. Extensión deshabilitada
3. Navegador no soportado

**Soluciones:**

**Opción 1: Instalar Freighter**
```
1. Ve a https://www.freighter.app
2. Click en "Add to Chrome" (o Firefox)
3. Confirma instalación
4. Pin la extensión en toolbar
5. Refresca la página de tu dApp
```

**Opción 2: Habilitar extensión**
```
1. En Chrome: chrome://extensions
2. Busca "Freighter"
3. Asegúrate que esté ON
4. Refresca la página
```

**Opción 3: Probar otro navegador**
```
Freighter soporta:
- Chrome
- Firefox
- Brave
- Edge

NO soporta:
- Safari (aún)
- Navegadores móviles
```

---

### ERROR 2: "Account not found"

**Síntoma:**
```
Error: Account not found. ¿Tienes XLM en testnet?
```

**Causa:**
Tu cuenta no existe en la blockchain (no está fondeada).

**Solución:**

**Paso 1: Verificar que estás en testnet**
```
1. Abre Freighter
2. Click en ⚙️ Settings
3. Ve a Network
4. Debe decir "Testnet" (NO Mainnet)
```

**Paso 2: Fondear cuenta con Friendbot**
```
1. Copia tu public key de Freighter
2. Ve a https://friendbot.stellar.org
3. Pega tu public key
4. Click en "Get test network lumens"
5. Espera confirmación
6. Refresca tu dApp
```

**Paso 3: Verificar en Stellar Expert**
```
1. Ve a https://stellar.expert/explorer/testnet
2. Busca tu public key
3. Deberías ver: Balance de 10,000 XLM
```

---

### ERROR 3: "User declined transaction"

**Síntoma:**
```
Error: User declined transaction
```

**Causa:**
Rechazaste la transacción en el popup de Freighter.

**Solución:**

**No es un error** - simplemente no confirmaste.

Para probar de nuevo:
```
1. Click de nuevo en el botón
2. Cuando Freighter abra
3. Revisa los detalles
4. Click en "Approve"
```

**Tips:**
- ✅ Verifica que los detalles sean correctos
- ✅ Asegúrate de tener suficiente XLM para fee
- ✅ Confirma que estás en la red correcta

---

### ERROR 4: "Insufficient balance"

**Síntoma:**
```
Error de Stellar: tx_insufficient_balance
```

**Causa:**
No tienes suficiente XLM para la operación.

**Por qué pasa:**
```
Tienes: 1 XLM
Necesitas:
- Base reserve de cuenta: 1 XLM
- Base reserve de trustline: 0.5 XLM
- Fee de transacción: 0.00001 XLM

Total necesario: 1.50001 XLM
```

**Solución:**

```
1. Ve a friendbot.stellar.org
2. Consigue más XLM (10,000 más)
3. Intenta de nuevo
```

**En mainnet:**
```
Necesitas comprar XLM en un exchange:
- Binance
- Coinbase
- Kraken
```

---

### ERROR 5: "Transaction failed: op_malformed"

**Síntoma:**
```
Error: Transaction failed
result_codes: { operations: ['op_malformed'] }
```

**Causas posibles:**
1. Asset issuer incorrecto
2. Limit negativo o inválido
3. Parámetros mal formateados

**Solución:**

**Verificar issuer:**
```javascript
// ❌ INCORRECTO
const asset = new Asset('USDC', 'GA5ZSE');  // Muy corto

// ✅ CORRECTO
const asset = new Asset(
  'USDC', 
  'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'
);
```

**Verificar limit:**
```javascript
// ❌ INCORRECTO
limit: -100  // Negativo
limit: '0'   // Cero (eliminaría trustline)

// ✅ CORRECTO
limit: '10000'  // String, positivo
```

---

### ERROR 6: "Component is not rendered"

**Síntoma:**
Tu componente no aparece en pantalla.

**Causas posibles:**
1. Importación incorrecta
2. Export/import no coinciden
3. Error de JavaScript no detectado

**Solución:**

**Verificar imports:**
```javascript
// En component:
export default function MiComponente() { ... }

// En page:
import MiComponente from '../components/MiComponente';
```

**Verificar console:**
```
1. Abre DevTools (F12)
2. Ve a Console
3. Busca errores en rojo
4. Corrige el error mencionado
```

**Verificar conditional render:**
```javascript
// ¿Está dentro de un condicional?
{publicKey && <MiComponente />}  
// Solo renderiza si publicKey existe
```

---

### ERROR 7: "Network request failed"

**Síntoma:**
```
Error: Network request failed
```

**Causas posibles:**
1. No hay internet
2. Horizon está caído (raro)
3. URL de Horizon incorrecta
4. CORS issue

**Solución:**

**Verificar internet:**
```
1. Abre otra página web
2. Si no carga, problema de conexión
```

**Verificar URL de Horizon:**
```javascript
// ❌ INCORRECTO
const server = new Server('https://horizon.stellar.org');  // Mainnet

// ✅ CORRECTO (para testnet)
const server = new Server('https://horizon-testnet.stellar.org');
```

**Probar status de Horizon:**
```
Ve a: https://status.stellar.org
Verifica que todo esté verde
```

---

### ERROR 8: "Supabase error: relation does not exist"

**Síntoma:**
```
Error: relation "trustlines" does not exist
```

**Causa:**
No creaste las tablas en Supabase.

**Solución:**

```
1. Ve a tu proyecto en Supabase
2. SQL Editor
3. Copia el SQL de la Sección 3
4. Click en "Run"
5. Verifica en Table Editor
```

**SQL necesario:**
```sql
CREATE TABLE trustlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(56) NOT NULL,
  asset_code VARCHAR(12) NOT NULL,
  asset_issuer VARCHAR(56) NOT NULL,
  trust_limit DECIMAL DEFAULT 10000,
  tx_hash VARCHAR(64),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### ERROR 9: "Environment variables not defined"

**Síntoma:**
```
Missing Supabase credentials in .env.local
```

**Causa:**
No configuraste las variables de entorno.

**Solución:**

**Desarrollo local:**
```
1. Crea .env.local en la raíz del proyecto
2. Agrega:
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
3. Reinicia npm run dev
```

**En Vercel:**
```
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega ambas variables
4. Redeploy
```

---

### ERROR 10: "Transaction timeout"

**Síntoma:**
```
Error: Transaction timed out
```

**Causa:**
La transacción tardó más de 30 segundos.

**Posibles razones:**
1. Confirmaste muy tarde en Freighter
2. Red de Stellar lenta (muy raro)

**Solución:**

```
1. Intenta de nuevo más rápido
2. Confirma en Freighter en <30 segundos
3. Si persiste, verifica status.stellar.org
```

**Opcional: Aumentar timeout**
```javascript
// En TransactionBuilder
.setTimeout(60)  // 60 segundos en vez de 30
```

---

## 🎯 DEBUGGING TIPS

### Tip 1: Console.log es tu amigo

```javascript
// Agregar logs para entender el flujo
console.log('1. Conectando wallet...');
const publicKey = await getPublicKey();
console.log('2. Public key:', publicKey);

const account = await server.loadAccount(publicKey);
console.log('3. Account loaded:', account);

// etc.
```

### Tip 2: Verifica en Stellar Expert

Después de cada transacción:
```
1. Ve a https://stellar.expert/explorer/testnet
2. Busca tu public key
3. Ve el historial de transacciones
4. Verifica que la operación apareció
```

### Tip 3: Usa Stellar Laboratory

Para testing rápido:
```
1. Ve a https://laboratory.stellar.org
2. Network: Testnet
3. Build Transaction
4. Prueba operations manualmente
```

### Tip 4: Lee los códigos de error

Stellar devuelve códigos específicos:
```
tx_insufficient_balance → Necesitas más XLM
tx_bad_seq → Sequence number incorrecto (raro)
op_malformed → Operación mal formada
op_no_trust → No tienes trustline
```

### Tip 5: Vercel Logs

Si algo falla en producción:
```
1. Ve a tu proyecto en Vercel
2. Deployments → Latest
3. Click en "View Function Logs"
4. Busca el error
```

---

## 🆘 CUANDO TODO FALLA

### Último Recurso: Reset completo

```bash
# 1. Limpiar node_modules
rm -rf node_modules package-lock.json

# 2. Reinstalar
npm install

# 3. Limpiar cache de Next.js
rm -rf .next

# 4. Reiniciar
npm run dev
```

### Pedir Ayuda

**Antes de preguntar, ten listo:**
1. ✅ Mensaje de error completo
2. ✅ Código relevante
3. ✅ Qué intentaste
4. ✅ Screenshot del problema

**Dónde preguntar:**
- Discord de Stellar
- Stack Overflow (tag: stellar)
- GitHub Issues del repo
- Tu grupo de Tiburonas

---

## 📋 CHECKLIST DE VERIFICACIÓN

Antes de decir "no funciona", verifica:

### Desarrollo Local
- [ ] Node.js instalado (v18+)
- [ ] npm install ejecutado
- [ ] .env.local creado con credenciales
- [ ] npm run dev corriendo
- [ ] No hay errores en consola

### Freighter
- [ ] Extensión instalada
- [ ] Configurada en Testnet
- [ ] Cuenta fondeada (10,000+ XLM)
- [ ] Public key copiada correctamente

### Supabase
- [ ] Proyecto creado
- [ ] Tablas creadas (SQL ejecutado)
- [ ] Credenciales copiadas a .env.local
- [ ] Variables en Vercel (si deployaste)

### Código
- [ ] Imports correctos
- [ ] Exports coinciden
- [ ] No hay typos en variables
- [ ] Asset issuer correcto (testnet vs mainnet)
- [ ] Network passphrase correcta

---

## 💡 TIPS FINALES

### 1. SIEMPRE prueba en testnet primero
```
❌ NO: Desplegar directo en mainnet
✅ SÍ: Probar TODO en testnet, LUEGO mainnet
```

### 2. Guarda tus public keys
```
Crea un archivo keys.txt:
- Testnet: GABC...
- Mainnet: GXYZ...
```

### 3. Documenta tus issuers
```
// USDC Testnet
const USDC_TEST = {
  code: 'USDC',
  issuer: 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5'
};

// USDC Mainnet
const USDC_MAIN = {
  code: 'USDC',
  issuer: 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'
};
```

### 4. Comenta tu código
```javascript
// ✅ BUENO
// Crear trustline para USDC con límite de 10,000
const operation = Operation.changeTrust({
  asset: USDC,
  limit: '10000'
});

// ❌ MALO
const operation = Operation.changeTrust({ asset: USDC, limit: '10000' });
```

### 5. Usa try-catch SIEMPRE
```javascript
try {
  // Código que puede fallar
  const result = await server.submitTransaction(tx);
} catch (error) {
  // Manejar el error
  console.error('Error:', error);
  setError(error.message);
}
```

---

## 🦈 MENTALIDAD TIBURONA PARA DEBUGGING

Cuando algo no funciona:

**NO digas:**
❌ "No funciona"
❌ "Está roto"
❌ "No entiendo nada"

**SÍ di:**
✅ "Voy a revisar el error paso a paso"
✅ "¿Qué me está diciendo el error?"
✅ "Voy a probar otra cosa"

**Recuerda:**
- 🦈 Cada error es una oportunidad de aprender
- 🦈 Todos los builders encuentran bugs
- 🦈 La diferencia es cómo respondes

**Como tiburona:**
1. Lee el error con calma
2. Busca en esta guía
3. Prueba la solución
4. Si no funciona, busca ayuda
5. Cuando lo resuelvas, documenta cómo

---

## 🎓 RECURSOS ADICIONALES

### Documentación Oficial
- **Stellar Docs:** https://developers.stellar.org
- **Stellar SDK:** https://stellar.github.io/js-stellar-sdk/
- **Freighter Docs:** https://docs.freighter.app

### Herramientas
- **Stellar Laboratory:** https://laboratory.stellar.org
- **Stellar Expert:** https://stellar.expert
- **Friendbot:** https://friendbot.stellar.org

### Comunidad
- **Discord de Stellar:** https://discord.gg/stellardev
- **Stack Overflow:** [stellar] tag
- **GitHub Stellar:** https://github.com/stellar

---

## 🦈 ¡NUNCA TE RINDAS!

Los bugs son parte del proceso. Cada error que resuelves te hace más fuerte.

Las tiburonas no se detienen cuando encuentran un obstáculo - encuentran otra ruta.

Tienes esta guía. Tienes tu comunidad. Tienes las herramientas.

**Ahora a debuggear como tiburona.** 🦈⚡

---

**Anterior:** [← 💻 SECCIÓN 3: CÓDIGO COMPLETO](./clase7-3-codigo.md)

**Volver al inicio:** [📋 SECCIÓN 1: RESUMEN](./clase7-1-resumen.md)

---

🦈⚡ **¡Sigue nadando, Tiburona!** ⚡🦈