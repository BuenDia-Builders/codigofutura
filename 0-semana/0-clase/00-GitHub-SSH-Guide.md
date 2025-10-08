
# 🚀 Acceso a GitHub con SSH
Guía paso a paso para entender por qué GitHub ya no acepta contraseña en Git y cómo usar **claves SSH**.  
Pensado para alumnas que recién comienzan a usar Git y GitHub.

---

## 📌 El Problema
- Antes podíamos usar **usuario + contraseña** para `git clone` o `git push`.
- Desde 2021, GitHub **eliminó la autenticación con contraseña**.
- Ahora SOLO acepta dos métodos seguros:
  1. **Tokens personales (PAT)**
  2. **Claves SSH** ✅ (más cómodo y recomendado)

---

## 🔑 ¿Qué es SSH?
- Es un sistema de autenticación con un **par de claves**:
  - **Clave privada** → se guarda en tu computadora.
  - **Clave pública** → se copia en GitHub.
- Funciona como una cerradura y su llave: GitHub solo acepta conexiones de quienes tengan la llave correcta.
- Permite conectarse sin escribir usuario/contraseña cada vez.

---

## 📝 Paso 1: Ver si ya tienes una clave
En tu terminal, escribe:

```bash
ls -al ~/.ssh
```

Si aparecen archivos como:

```
id_ed25519
id_ed25519.pub
```

¡Ya tienes una clave generada! 🎉

---

## 📝 Paso 2: Mostrar tu clave pública
La clave que necesitas es la que termina en **.pub**.  
Para verla:

```bash
cat ~/.ssh/id_ed25519.pub
```

Te mostrará algo como:

```
ssh-ed25519 AAAAC3Nz... usuario@maquina
```

⚠️ Copia **todo el contenido**.

---

## 📝 Paso 3: Agregar la clave en GitHub
1. Ve a [GitHub Settings → SSH and GPG Keys](https://github.com/settings/keys).
2. Haz clic en **New SSH key**.
3. Pega la clave que copiaste.
4. Guarda.

---

## 📝 Paso 4: Probar conexión con GitHub
En la terminal, escribe:

```bash
ssh -T git@github.com
```

Si todo está bien, deberías ver:

```
Hi Builder! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## 📝 Paso 5: Clonar con SSH
Ahora ya no necesitas usuario ni contraseña.  
Simplemente clona con:

```bash
git clone git@github.com:yourusername/BuenDia-Builders/codigofutura.git
```

---

## 🎯 Resumen Final
- GitHub ya no acepta contraseñas para Git.
- Usamos claves SSH porque son seguras y cómodas.
- Solo necesitas configurar tu clave **una vez** y ya podrás trabajar siempre sin contraseñas.

✨ ¡Listo! Ahora puedes usar GitHub de manera profesional y segura.