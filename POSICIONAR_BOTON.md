# 🎯 Guía: Posicionar el Botón AR sobre el Traje

## Método Rápido - Encontrar Coordenadas

### Opción 1: Usar la Consola del Navegador (Recomendado)

1. **Abre tu sitio web:**
   - Si tienes un servidor local: `http://localhost:8000`
   - O abre directamente: `C:\Users\Pacho\Documents\PAGINA WEB MUSEO\index.html`

2. **Abre la Consola del Navegador:**
   - Presiona `F12` en tu teclado
   - O clic derecho → "Inspeccionar" → pestaña "Console"

3. **Navega el panorama 360°:**
   - Usa el mouse para girar hasta que veas el traje
   - Centra el traje en tu vista

4. **Obtén las coordenadas:**
   - En la consola, escribe:
   ```javascript
   viewer360.getPitch()
   ```
   - Presiona Enter, anota el número (ejemplo: -15.5)
   
   - Luego escribe:
   ```javascript
   viewer360.getYaw()
   ```
   - Presiona Enter, anota el número (ejemplo: 45.2)

5. **Actualiza el código:**
   - Abre `script.js`
   - Ve a las líneas 44-45
   - Reemplaza los valores:
   ```javascript
   "pitch": -15.5,  // Tu valor de getPitch()
   "yaw": 45.2,     // Tu valor de getYaw()
   ```

6. **Guarda y recarga:**
   - Guarda el archivo
   - Recarga la página (F5)
   - El botón debería aparecer sobre el traje

### Opción 2: Modo Debug Automático

Puedes agregar este código temporal para ver las coordenadas al hacer clic:

1. **Abre `script.js`**

2. **Agrega este código después de `initViewer360()` (línea 73):**

```javascript
// MODO DEBUG - Eliminar después de encontrar coordenadas
viewer360.on('click', function(event) {
    console.log('=== COORDENADAS DEL CLICK ===');
    console.log('Pitch:', viewer360.getPitch());
    console.log('Yaw:', viewer360.getYaw());
    alert('Pitch: ' + viewer360.getPitch() + '\nYaw: ' + viewer360.getYaw());
});
```

3. **Guarda y recarga la página**

4. **Haz clic sobre el traje en el panorama**
   - Aparecerá un alert con las coordenadas
   - Anota los valores

5. **Actualiza las coordenadas en líneas 44-45**

6. **Elimina el código debug**

## 📍 Valores Actuales

Actualmente el botón está en:
- **pitch: -8** (altura vertical)
- **yaw: 5** (posición horizontal)

## 🎯 Ajuste Fino

Una vez que tengas el botón cerca del traje, puedes hacer ajustes finos:

- **Mover ARRIBA:** Aumenta el pitch (ejemplo: -8 → -5)
- **Mover ABAJO:** Disminuye el pitch (ejemplo: -8 → -12)
- **Mover DERECHA:** Aumenta el yaw (ejemplo: 5 → 15)
- **Mover IZQUIERDA:** Disminuye el yaw (ejemplo: 5 → -5)

## 💡 Consejos

1. **Pequeños cambios:** Ajusta de 2-5 grados a la vez
2. **Guarda frecuentemente:** Ctrl+S después de cada cambio
3. **Recarga la página:** F5 para ver los cambios
4. **Zoom:** Si el traje está lejos, ajusta el zoom en el panorama primero

## 🔄 Proceso Completo

```
1. Abrir sitio → 2. F12 (Consola) → 3. Navegar al traje → 
4. getPitch() y getYaw() → 5. Actualizar script.js → 
6. Guardar → 7. Recargar → 8. Verificar posición
```

---

**¿Necesitas ayuda?** Dime las coordenadas que obtuviste y las actualizo por ti.
