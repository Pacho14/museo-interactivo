# Guía: Crear Repositorio en GitHub y Configurar GitHub Pages

## 📋 Pasos para Crear el Repositorio

### 1. Crear el Repositorio en GitHub

1. **Ir a GitHub:**
   - Abre tu navegador y ve a: https://github.com/new
   - Si no has iniciado sesión, hazlo primero

2. **Configurar el Repositorio:**
   - **Repository name:** `museo-interactivo` (o el nombre que prefieras)
   - **Description:** "Página web interactiva con recorrido 360° y experiencia AR"
   - **Visibility:** Selecciona **Public** (necesario para GitHub Pages gratuito)
   - **NO marques** "Add a README file" (ya lo tenemos)
   - **NO agregues** .gitignore ni licencia (ya los tenemos)
   - Click en **Create repository**

### 2. Subir los Archivos al Repositorio

Tienes dos opciones:

#### Opción A: Usando Git (Recomendado)

1. **Abrir PowerShell en la carpeta del proyecto:**
   ```powershell
   cd "C:\Users\Pacho\Documents\PAGINA WEB MUSEO"
   ```

2. **Inicializar Git (si no lo has hecho):**
   ```powershell
   git init
   ```

3. **Agregar todos los archivos:**
   ```powershell
   git add .
   ```

4. **Hacer el primer commit:**
   ```powershell
   git commit -m "Initial commit: Museo interactivo con 360° y AR"
   ```

5. **Conectar con GitHub:**
   ```powershell
   git remote add origin https://github.com/TU-USUARIO/museo-interactivo.git
   ```
   ⚠️ **Reemplaza `TU-USUARIO`** con tu nombre de usuario de GitHub

6. **Subir los archivos:**
   ```powershell
   git branch -M main
   git push -u origin main
   ```

7. **Si te pide credenciales:**
   - Usuario: tu nombre de usuario de GitHub
   - Contraseña: usa un **Personal Access Token** (no tu contraseña)
   - Para crear un token: https://github.com/settings/tokens

#### Opción B: Subir Archivos Manualmente (Más Simple)

1. Ve a tu repositorio recién creado en GitHub
2. Click en **uploading an existing file**
3. Arrastra todos los archivos desde la carpeta `PAGINA WEB MUSEO`
4. Escribe un mensaje de commit: "Initial commit"
5. Click en **Commit changes**

### 3. Configurar GitHub Pages

1. **Ir a Settings:**
   - En tu repositorio, click en **Settings** (arriba a la derecha)

2. **Ir a Pages:**
   - En el menú lateral izquierdo, busca **Pages** (en la sección "Code and automation")

3. **Configurar la fuente:**
   - En "Build and deployment"
   - **Source:** Selecciona "Deploy from a branch"
   - **Branch:** Selecciona `main` y carpeta `/ (root)`
   - Click en **Save**

4. **Esperar el despliegue:**
   - GitHub Pages tardará 1-2 minutos en construir tu sitio
   - Verás un mensaje: "Your site is live at https://TU-USUARIO.github.io/museo-interactivo"

5. **Visitar tu sitio:**
   - Click en el enlace o ve a: `https://TU-USUARIO.github.io/museo-interactivo`

### 4. Agregar tus Archivos de Luma 3D

**IMPORTANTE:** Antes de que el sitio funcione completamente, necesitas agregar:

1. **panorama.jpg** - Tu imagen 360° exportada de Luma 3D
2. **modelo.glb** - Tu modelo 3D exportado de Luma 3D

**Cómo agregarlos:**

**Si usas Git:**
```powershell
# Copia tus archivos a la carpeta del proyecto
# Luego:
git add panorama.jpg modelo.glb
git commit -m "Agregar assets de Luma 3D"
git push
```

**Si subes manualmente:**
1. Ve a tu repositorio en GitHub
2. Click en **Add file** → **Upload files**
3. Arrastra `panorama.jpg` y `modelo.glb`
4. Commit changes

## 🎉 ¡Listo!

Tu sitio estará disponible en:
```
https://TU-USUARIO.github.io/museo-interactivo
```

## 📱 Probar AR

Para probar la funcionalidad AR:
1. Abre el sitio desde tu **teléfono móvil** (no desktop)
2. Usa **Chrome** (Android) o **Safari** (iOS)
3. Presiona el botón "Ver en AR"
4. Permite el acceso a la cámara
5. Apunta a una superficie plana (piso, mesa)

## 🔄 Actualizar el Sitio

Cada vez que hagas cambios:

**Con Git:**
```powershell
git add .
git commit -m "Descripción de los cambios"
git push
```

**Manualmente:**
- Sube los archivos modificados desde GitHub

GitHub Pages se actualizará automáticamente en 1-2 minutos.

## 🐛 Problemas Comunes

### "Git no se reconoce como comando"
- Necesitas instalar Git: https://git-scm.com/download/win

### "Permission denied" al hacer push
- Usa un Personal Access Token en lugar de tu contraseña
- Crear token: https://github.com/settings/tokens

### El sitio muestra 404
- Espera 2-3 minutos después de configurar Pages
- Verifica que la rama sea `main` y carpeta `/ (root)`

### AR no funciona
- Asegúrate de estar usando HTTPS (GitHub Pages usa HTTPS automáticamente)
- Verifica que `modelo.glb` esté subido al repositorio
- Usa un dispositivo móvil compatible

---

**¿Necesitas ayuda?** Revisa la documentación de GitHub Pages: https://docs.github.com/pages
