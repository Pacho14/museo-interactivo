# Museo Interactivo

Página web interactiva para museo con recorrido virtual 360° y experiencia de Realidad Aumentada.

🌐 **[Ver Demo en Vivo](https://tu-usuario.github.io/museo-interactivo)**

## ✨ Características

- 🌐 **Recorrido Virtual 360°** - Navegación panorámica usando Pannellum
- 📱 **Realidad Aumentada** - Experiencia AR sin marcadores usando Google Model Viewer
- 🎨 **Diseño Moderno** - Estética premium tipo museo digital
- 📱 **Responsive** - Optimizado para móviles y tablets

## 🚀 Demo

![Banner del Museo](banner.svg)

### Recorrido 360°
Explora el museo desde cualquier ángulo con controles intuitivos de mouse y táctiles.

### Experiencia AR
Coloca modelos 3D en tu espacio real usando tu dispositivo móvil.

## 📋 Requisitos

### Para el Recorrido 360°
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Imagen panorámica equirectangular (exportada de Luma 3D)

### Para AR
- **Android:** Android 7.0+, ARCore compatible
- **iOS:** iOS 12+, ARKit compatible (iPhone 6S+)
- Navegador compatible: Chrome (Android), Safari (iOS)

## 🛠️ Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/museo-interactivo.git
   cd museo-interactivo
   ```

2. **Agrega tus archivos de Luma 3D:**
   - Exporta tu recorrido 360° como imagen equirectangular → guarda como `panorama.jpg`
   - Exporta tu modelo 3D en formato GLB → guarda como `modelo.glb`

3. **Inicia un servidor local:**
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx http-server -p 8000
   ```

4. **Abre en tu navegador:**
   ```
   http://localhost:8000
   ```

## 📱 Probar AR en Móvil

1. Asegúrate de que tu computadora y móvil están en la misma red WiFi
2. Encuentra tu IP local:
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```
3. En tu móvil, abre: `http://TU-IP:8000`
4. Presiona el botón "Ver en AR"

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
}
```

### Modificar Textos

Edita el contenido directamente en `index.html`.

### Ajustar Configuración 360°

En `script.js`, modifica los parámetros de Pannellum:

```javascript
"autoRotate": -2,
"hfov": 100,
"minHfov": 50,
"maxHfov": 120
```

## 📁 Estructura del Proyecto

```
museo-interactivo/
├── index.html          # Página principal
├── styles.css          # Estilos y diseño
├── script.js           # Lógica 360° y AR
├── banner.svg          # Banner del sitio
├── panorama.jpg        # Tu imagen 360° (agregar)
├── modelo.glb          # Tu modelo 3D (agregar)
└── README.md           # Este archivo
```

## 🌐 Desplegar en GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** → **Pages**
3. En "Source", selecciona la rama `main` y carpeta `/ (root)`
4. Click en **Save**
5. Tu sitio estará disponible en: `https://tu-usuario.github.io/museo-interactivo`

## 🐛 Solución de Problemas

### El visor 360° no carga
- ✅ Verifica que `panorama.jpg` existe
- ✅ Comprueba que la imagen es equirectangular (ratio 2:1)

### AR no funciona
- ✅ Usa HTTPS (servidor local o GitHub Pages)
- ✅ Verifica que estás en un dispositivo móvil compatible
- ✅ Comprueba permisos de cámara

### El modelo 3D no aparece
- ✅ Verifica que `modelo.glb` existe
- ✅ Prueba con un modelo más pequeño (<10MB)

## 📚 Tecnologías

- [Pannellum](https://pannellum.org/) - Visor panorámico 360°
- [Google Model Viewer](https://modelviewer.dev/) - Experiencia AR
- HTML5/CSS3/JavaScript

## 📄 Licencia

Este proyecto es de código abierto. Puedes usarlo y modificarlo libremente.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

---

**Desarrollado con ❤️ para museos digitales**
