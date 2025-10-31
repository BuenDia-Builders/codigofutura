# 🔧 GUÍA DE TROUBLESHOOTING

Soluciones rápidas para los problemas más comunes que puedes encontrar.

---

## 🚨 PROBLEMA: Friendbot no responde

### Síntomas:
- Botón no hace nada
- Carga indefinida
- Timeout error

### ✅ Soluciones (intentar en orden):

1. **Espera 10 segundos y reintenta**
   - Friendbot puede estar procesando muchas solicitudes

2. **Refresca la página (F5)**
   - Limpia el estado de la página

3. **Verifica tu conexión a internet**
   - Abre otra página web para confirmar

4. **Prueba el método alternativo**
   - Usa la URL directa: `https://friendbot.stellar.org/?addr=TU_PUBLIC_KEY`

5. **Espera 1 minuto**
   - Friendbot puede estar temporalmente ocupado

### 🎯 Prevención:
- No hagas múltiples requests rápidos
- Usa Friendbot solo cuando sea necesario

---

## 🚨 PROBLEMA: Error 400 - Bad Request

### Síntomas:
- "400 Bad Request"
- Transacción rechazada
- "Invalid request"

### ✅ Soluciones:

1. **Verifica la red**
   - Asegúrate de estar en **TESTNET** (no Mainnet)
   - Revisa la esquina superior derecha

2. **Verifica la public key**
   - 56 caracteres
   - Empieza con "G"
   - Sin espacios al inicio o final

3. **Revisa el formato de datos**
   - Números sin comas
   - Decimales con punto, no coma (25.5, no 25,5)

4. **Confirma que la cuenta exista**
   - La cuenta debe estar fondeada con Friendbot

### 🎯 Prevención:
- SIEMPRE verifica la red al inicio
- Copia/pega con cuidado (sin espacios extra)

---

## 🚨 PROBLEMA: Transacción fallida (tx_failed)

### Síntomas:
- Transacción enviada pero rechazada
- Error code en respuesta
- Status: Failed ❌

### ✅ Causas comunes y soluciones:

#### 1. Balance insuficiente
**Síntoma**: "Insufficient balance"  
**Solución**:
- Verifica tu balance en StellarExpert
- Recuerda: necesitas mantener 0.5 XLM de reserve
- Si enviaste todo, usa Friendbot de nuevo

#### 2. Destination incorrecta
**Síntoma**: "Invalid destination"  
**Solución**:
- Verifica que copiaste bien la public key
- Debe empezar con "G"
- Debe tener 56 caracteres

#### 3. Sequence number incorrecto
**Síntoma**: "Sequence number mismatch"  
**Solución**:
- En Transaction Builder, click "Fetch next sequence number"
- NO reutilices una transacción vieja

#### 4. Cuenta destino no existe
**Síntoma**: "Destination account does not exist"  
**Solución**:
- Para crear una cuenta nueva, necesitas enviar al menos 1 XLM
- O usa la operación "Create Account"

### 🎯 Prevención:
- Siempre "fetch" sequence antes de enviar
- Verifica balances disponibles
- Double-check todas las direcciones

---

## 🚨 PROBLEMA: No veo mi transacción en StellarExpert

### Síntomas:
- Búsqueda no encuentra nada
- Hash no aparece
- Cuenta muestra balance viejo

### ✅ Soluciones:

1. **Espera 10-15 segundos**
   - La indexación puede tardar

2. **Refresca la página**
   - F5 o Ctrl+R

3. **Verifica el hash completo**
   - Debe tener 64 caracteres
   - Sin espacios

4. **Confirma que estás en Testnet**
   - URL debe incluir: `/testnet`
   - Si estás en mainnet, cambia a testnet

5. **Busca por public key**
   - En lugar de hash, busca tu cuenta
   - Ve a la pestaña "Payments"

### 🎯 Prevención:
- Guarda el hash completo al enviarlo
- Verifica la red antes de buscar

---

## 🚨 PROBLEMA: "Account not found"

### Síntomas:
- Error al cargar cuenta
- "Account does not exist"
- 404 error

### ✅ Causas y soluciones:

#### 1. Cuenta nunca fue fondeada
**Solución**: Usa Friendbot primero

#### 2. Public key incorrecta
**Solución**:
- Verifica que copiaste bien
- Debe empezar con "G"
- Debe tener 56 caracteres

#### 3. Estás en la red incorrecta
**Solución**: Cambia a Testnet

#### 4. Cuenta fue mergeada (avanzado)
**Solución**: Crea una nueva cuenta

### 🎯 Prevención:
- Fondea con Friendbot inmediatamente después de generar llaves
- Guarda tus llaves correctamente

---

## 🚨 PROBLEMA: JavaScript bloqueado / Página no carga

### Síntomas:
- Página en blanco
- Botones no responden
- Elementos no cargan

### ✅ Soluciones:

1. **Deshabilita bloqueadores de ads temporalmente**
   - Muchos bloqueadores afectan Laboratory

2. **Permite JavaScript**
   - Configuración del navegador → Privacidad → JavaScript

3. **Prueba modo incógnito**
   - Ctrl+Shift+N (Chrome) o Ctrl+Shift+P (Firefox)

4. **Prueba otro navegador**
   - Chrome, Firefox, Brave o Edge

5. **Limpia caché y cookies**
   - Configuración → Privacidad → Limpiar datos

### 🎯 Prevención:
- Usa navegador actualizado
- Whitelist stellar.org y stellar.expert

---

## 🚨 PROBLEMA: Perdí mi Secret Key

### Situación crítica

#### ✅ En Testnet (ahora):
**SOLUCIÓN**: Genera nuevas llaves
- No hay problema, el XLM de testnet no vale nada
- Crea una nueva cuenta con Friendbot
- Guarda mejor esta vez

#### ❌ En Mainnet (futuro):
**NO HAY SOLUCIÓN**
- Fondos perdidos **PERMANENTEMENTE**
- No hay "recuperar contraseña"
- No hay soporte que pueda ayudar
- Nadie puede recuperar tu secret key

### 🎯 Prevención (CRÍTICO para Mainnet):

**DEBES hacer esto**:
- [ ] Guardar en 3+ lugares diferentes
- [ ] Backup en USB físico
- [ ] Considerar hardware wallet
- [ ] Escribir en papel (guardado seguro)
- [ ] NUNCA almacenar solo digitalmente

**NUNCA hagas esto**:
- ❌ Guardar en un solo lugar
- ❌ Subir a la nube sin encriptar
- ❌ Mandar por WhatsApp/email
- ❌ Tomar foto sin protección
- ❌ Confiar solo en tu memoria

---

## 🚨 PROBLEMA: Cantidad con muchos decimales

### Síntoma:
Balance muestra: 9,999.9999999 XLM

### ✅ Explicación:

Esto es **NORMAL**. Stellar usa 7 decimales.

- 1 XLM = 10,000,000 stroops
- Los fees se miden en stroops (100 stroops típicamente)

No necesitas preocuparte por esto, solo usa números enteros o con pocos decimales cuando envíes.

---

## 🚨 PROBLEMA: "Fee too low"

### Síntomas:
- Transacción rechazada
- Error: Fee insuficiente

### ✅ Solución:

1. **Aumenta el fee**
   - Fee mínimo: 100 stroops
   - Fee recomendado: 100-1000 stroops

2. **Usa el fee sugerido**
   - Laboratory calcula automáticamente
   - Acepta el fee predeterminado

### 🎯 Nota:
- Incluso con fee alto (10,000 stroops), solo pagas $0.0001
- No te preocupes por "pagar mucho"

---

## 🚨 PROBLEMA: No puedo copiar/pegar

### En dispositivos móviles:

### ✅ Soluciones:

1. **Usa laptop/desktop**
   - Recomendado para este curso

2. **Mantén presionado**
   - En móvil: mantén presionado para copiar

3. **Usa compartir/enviar**
   - Envíate las llaves a ti misma (con precaución)

---

## 🚨 PROBLEMA: Página muy lenta

### Síntomas:
- Laboratory carga muy lento
- Requests tardan mucho
- Timeouts frecuentes

### ✅ Soluciones:

1. **Verifica tu internet**
   - Necesitas mínimo 5 Mbps
   - Haz speed test

2. **Cierra otras pestañas**
   - Libera recursos del navegador

3. **Prueba en otro momento**
   - La red puede estar congestionada

4. **Usa VPN (si sospechas bloqueo)**
   - Algunos ISPs bloquean sitios crypto

---

## 🔒 PROBLEMAS DE SEGURIDAD

### 🚨 "¿Este sitio es legítimo?"

**URLs OFICIALES** (✅ Seguras):
- https://laboratory.stellar.org
- https://stellar.expert
- https://stellarchain.io
- https://stellar.org
- https://developers.stellar.org

**CUIDADO con** (❌):
- URLs con errores de ortografía
- Sitios que piden tu secret key
- Emails de "soporte" pidiendo llaves
- Promesas de "duplicar tu XLM"

### 🎯 Regla de oro:
Si no estás 100% segura, no ingreses tu secret key.

---

## 🆘 CUANDO NADA FUNCIONA

### Paso a paso:

1. **Toma un screenshot del error**
   - Captura toda la pantalla

2. **Anota lo que hiciste**
   - Pasos que seguiste antes del error

3. **Revisa este documento completo**
   - Quizás te saltaste algo

4. **Busca en Google**
   - "Stellar [tu error]"
   - Muchos problemas ya fueron resueltos

5. **Pregunta en la comunidad**
   - Grupo de Telegram del curso
   - Stack Exchange
   - Discord de Stellar

### Al pedir ayuda, incluye:

- ✅ Descripción clara del problema
- ✅ Pasos para reproducirlo
- ✅ Screenshots
- ✅ Mensajes de error completos
- ✅ Navegador y sistema operativo
- ❌ NUNCA tu secret key

---

## 📞 CONTACTOS DE SOPORTE

### Dentro del Curso:
- **Telegram**: Grupo del curso

---

## 💡 TIPS GENERALES DE TROUBLESHOOTING

### Antes de pedir ayuda:

1. **Lee el mensaje de error completo**
   - A menudo explica el problema

2. **Reproduce el problema**
   - Confirma que sucede consistentemente

3. **Busca en la documentación**
   - Muchas respuestas están ahí

4. **Intenta en modo incógnito**
   - Descarta problemas de extensiones

5. **Verifica lo obvio**
   - ¿Estás en Testnet?
   - ¿Copiaste bien?
   - ¿Hay internet?

---

## 🎓 APRENDE DE LOS ERRORES

### Los errores son oportunidades

**Cada error te enseña**:
- Cómo funciona el sistema
- Qué no hacer la próxima vez
- Cómo depurar problemas

**No te frustres**:
- Todas las desarrolladoras cometen errores
- Estamos en Testnet (sin riesgo)
- La práctica hace al maestro

---

## ✅ CHECKLIST DE PROBLEMAS RESUELTOS

Marca los que ya resolviste:

- [ ] Friendbot funcionó
- [ ] Creé mi cuenta exitosamente
- [ ] Encontré mi transacción en StellarExpert
- [ ] Entiendo los mensajes de error
- [ ] Sé dónde pedir ayuda
- [ ] Guardé mis llaves de forma segura

---

**Recuerda**: No hay preguntas tontas. Si tenes dudas, ¡pregunta!

🚀 **¡Sigue adelante!**