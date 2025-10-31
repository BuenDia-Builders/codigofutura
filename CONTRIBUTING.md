# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al curso de Stellar de Buen Día Builders! 🦈⚡

Esta guía te ayudará a hacer contribuciones efectivas.

---

## 🎯 Filosofía de Contribución

Las Tiburonas construimos juntas. Todas las contribuciones son bienvenidas:
- 📝 Correcciones de typos
- 🐛 Reportar bugs
- ✨ Nuevas features
- 📚 Mejoras de documentación
- 🌍 Traducciones
- 💡 Sugerencias pedagógicas

---

## 🚀 Cómo Contribuir

### 1️⃣ Fork el Repositorio

```bash
# Haz fork desde GitHub
# Luego clona tu fork
git clone https://github.com/BuenDia-Builders/codigofutura
cd codigofutura
```

### 2️⃣ Crea una Branch

```bash
# Nombra tu branch descriptivamente
git checkout -b mejora/explicacion-trustlines
# O
git checkout -b fix/typo-clase-3
# O
git checkout -b docs/agregar-diagrama-assets
```

**Convención de nombres:**
- `mejora/` - Mejoras de contenido existente
- `fix/` - Corrección de errores
- `docs/` - Documentación
- `feature/` - Nueva funcionalidad

### 3️⃣ Haz tus Cambios

**Mantén el Tono Tiburona:**
- ✅ Empoderamiento: "Vas a construir"
- ✅ Celebración: "¡Excelente trabajo!"
- ✅ Claridad: Instrucciones paso a paso
- ✅ Contexto: Analogías relacionables


**Formato Markdown:**
```markdown
## Título Claro

Introducción breve.

### Subtítulo

**Negrita** para énfasis.
*Cursiva* para términos técnicos.

- Lista con puntos
- Cada ítem es acción

```código
// Comentarios claros
función ejemplo()
```

💡 **Tip:** Usa emojis estratégicamente.
```

### 4️⃣ Prueba tus Cambios

**Para código:**
```bash
# Si es código Rust
cargo test

# Si es código JavaScript
npm test
```

**Para documentación:**
- Lee en voz alta
- Verifica links funcionan
- Preview en GitHub antes de PR

### 5️⃣ Commit con Mensaje Claro

```bash
git add .
git commit -m "Agrego diagrama de trustlines en Clase 3"

# O más descriptivo:
git commit -m "Fix: Corrige comando CLI en setup Soroban

- Actualiza versión de stellar-cli
- Agrega troubleshooting para error común
- Cierra #42"
```

**Convención de commits:**
```
Tipo: Descripción breve (máx 50 caracteres)

Detalles opcionales:
- Qué cambió
- Por qué cambió
- Referencias a issues

Cierra #número-issue
```

**Tipos de commit:**
- `Fix:` - Corrección de bug
- `Feat:` - Nueva funcionalidad
- `Docs:` - Solo documentación
- `Style:` - Formato, typos
- `Refactor:` - Reestructuración de código
- `Test:` - Agregar tests
- `Chore:` - Mantenimiento

### 6️⃣ Push a tu Fork

```bash
git push origin mejora/explicacion-trustlines
```

### 7️⃣ Abre un Pull Request

1. Ve a tu fork en GitHub
2. Click en "Compare & pull request"
3. Llena la plantilla (ver abajo)
4. Espera review

---

## 📋 Plantilla de Pull Request

```markdown
## 📝 Descripción

[Describe qué cambiaste y por qué]

## 🎯 Tipo de Cambio

- [ ] 🐛 Bug fix
- [ ] ✨ Nueva feature
- [ ] 📚 Documentación
- [ ] 🎨 Estilo/formato
- [ ] ♻️ Refactorización
- [ ] ✅ Tests

## 🧪 Cómo Probaste

[Describe cómo verificaste que funciona]

## 📸 Screenshots (si aplica)

[Agrega capturas si es cambio visual]

## ✅ Checklist

- [ ] Mi código sigue el tono Tiburona
- [ ] Probé los cambios localmente
- [ ] Actualicé documentación relevante
- [ ] Verifiqué que no rompe nada
- [ ] Agregué comentarios en código complejo

## 🔗 Issues Relacionados

Cierra #[número]
```

---

## 📁 Estructura del Proyecto

```
stellar-course/
│
├── clase-0-bienvenida/
│   ├── README.md                    # Siempre empieza aquí
│   ├── 01-instalacion.md
│   └── 02-primera-tx.md
│
├── semana-X-nombre/
│   ├── clase-Y-nombre/
│   │   ├── 00-README.md            # Índice de la clase
│   │   ├── 01-concepto.md
│   │   ├── 02-practica.md
│   │   ├── codigo/                 # Ejemplos de código
│   │   └── imagenes/               # Screenshots
│   └── README.md                    # Índice de la semana
│
├── recursos/
│   ├── glosario.md
│   ├── troubleshooting.md
│   └── comunidad.md
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── workflows/
│
├── README.md                        # Principal
├── CONTRIBUTING.md                  # Este archivo
├── CODE_OF_CONDUCT.md
├── LICENSE
└── ROADMAP.md
```

---

## ✍️ Guías de Estilo

### Documentación

**Lenguaje:**
- Español neutro (sin modismos regionales excesivos)
- Tú en lugar de usted
- Inclusivo: "las alumnas", "las Tiburonas"

**Estructura:**
- Títulos con `##`, `###`
- Listas con `-` o números `1.`
- Código en bloques con lenguaje: ```rust
- Emojis al inicio de secciones importantes

**Ejemplo:**
```markdown
## 🚀 Deployar Contrato

Vas a deployar tu primer contrato en testnet.

### Prerrequisitos

- [ ] Stellar CLI instalado
- [ ] Cuenta fondeada en testnet

### Paso 1: Compilar

```bash
stellar contract build
```

💡 **Tip:** Si ves error X, revisa Y.
```

### Código

**Rust:**
```rust
// Comentarios en español
// Explica QUÉ y POR QUÉ, no solo QUÉ

pub fn transfer(env: Env, to: Address, amount: i128) -> Result<(), Error> {
    // Verificar balance antes de transferir
    let balance = get_balance(&env, &from);
    
    if balance < amount {
        return Err(Error::InsufficientBalance);
    }
    
    // Realizar transferencia...
}
```

**JavaScript:**
```javascript
// Comentarios claros
async function mintTokens(amount) {
  try {
    // Intenta mint
    const tx = await contract.mint({ amount });
    console.log('✅ Mint exitoso:', tx);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}
```

---

## 🐛 Reportar Bugs

**Usa el template de issue:**
```markdown
**Describe el bug**
[Descripción clara]

**Para reproducir**
1. Ir a clase X
2. Ejecutar comando Y
3. Ver error Z

**Comportamiento esperado**
[Qué debería pasar]

**Screenshots**
[Si aplica]

**Entorno:**
- OS: [e.g. Ubuntu 22.04]
- Rust: [e.g. 1.75.0]
- Stellar CLI: [e.g. 20.0.0]

**Contexto adicional**
[Cualquier info relevante]
```

---

## 💡 Sugerir Features

**Antes de sugerir:**
1. Verifica que no exista en [issues](https://github.com/BuenDia-Builders/codigofutura/issues)
2. Lee el [ROADMAP.md](./ROADMAP.md) -en construcción
3. Considera si encaja con filosofía del curso

**Template:**
```markdown
**¿Qué problema resuelve?**
[Describe el problema]

**Solución propuesta**
[Tu idea]

**Alternativas consideradas**
[Otras opciones que pensaste]

**Contexto adicional**
[Mockups, ejemplos, referencias]
```

---

## 🌍 Contribuciones Especiales

### Traducciones

Actualmente el curso está en español. Si queres:
- **Traducir a otro idioma**: Abre un issue primero
- **Mejorar español**: PRs directos bienvenidos

### Ejemplos de Código

Siempre bienvenidos:
- Casos de uso reales
- Optimizaciones
- Patrones de diseño
- Tests adicionales

**Requisitos:**
- Código comentado
- Explicación pedagógica
- Funciona en testnet

### Diagramas e Imágenes

**Herramientas sugeridas:**
- [Excalidraw](https://excalidraw.com/) - Diagramas
- [Mermaid](https://mermaid.js.org/) - Diagramas en código
- Screenshots con anotaciones

**Formato:**
- PNG o SVG
- Máx 1MB por imagen
- Nombrar descriptivamente: `trustline-flujo.png`

---

## 🔍 Proceso de Review

### Qué Revisamos

1. ✅ **Funcionalidad** - ¿Funciona correctamente?
2. ✅ **Pedagogía** - ¿Ayuda a aprender?
3. ✅ **Tono** - ¿Mantiene estilo Tiburona?
4. ✅ **Claridad** - ¿Fácil de entender?
5. ✅ **Formato** - ¿Sigue guías de estilo?

### Tiempos

- **Feedback inicial**: 2-3 días hábiles
- **Review completo**: 5-7 días
- **Urgente** (bugs críticos): 24 horas

### Cambios Solicitados

Si pedimos cambios:
1. No te desanimes - es parte del proceso
2. Haz los cambios en la misma branch
3. Push de nuevo
4. Comenta en el PR cuando esté listo

---

## 🏆 Reconocimiento de Contributors

Todas las contributors aparecen en:
- README principal
- Menciones en redes sociales

**Contributors frecuentes** pueden:
- Convertirse en reviewers
- Ser mentoras en siguientes cohorts
- Recibir badge especial de Tiburona Contributor

---

## 📞 ¿Preguntas?

**Antes de contribuir:**
- 💬 Telegram
- 📧 Email

**Durante el proceso:**
- Comenta en el PR o issue
- Pide ayuda sin pena
- Todas estamos aprendiendo

---

## 🙏 Gracias

Cada contribución, por pequeña que sea, hace este curso mejor.

**Eres parte de algo más grande: estás ayudando a formar a las próximas líderes de tecnología blockchain en Latinoamérica.**

---

<div align="center">

### 🦈⚡ Vamos a construir, Tiburonas ⚡🦈

**¿Lista para contribuir?** [Abre un issue](https://github.com/BuenDia-Builders/codigofutura/issues) o [haz tu primer PR]()

</div>