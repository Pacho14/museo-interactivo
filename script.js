// ============================================
// CONFIGURACIÓN DEL VISOR 360°
// ============================================

let viewer360 = null;

// Inicializar el visor 360° cuando la página cargue
document.addEventListener('DOMContentLoaded', function () {
    initViewer360();
    initARExperience();
});

function initViewer360() {
    try {
        viewer360 = pannellum.viewer('viewer360', {
            "type": "equirectangular",
            "panorama": "panorama.jpg", // Reemplaza con tu imagen equirectangular de Luma 3D
            "autoLoad": true,
            "autoRotate": -2, // Rotación automática lenta (opcional, puedes eliminar esta línea)
            "autoRotateInactivityDelay": 3000,
            "showControls": true,
            "showFullscreenCtrl": false, // Desactivar pantalla completa
            "showZoomCtrl": true,
            "mouseZoom": true,
            "draggable": true,
            "friction": 0.15,
            "hfov": 100, // Campo de visión horizontal inicial
            "minHfov": 50,
            "maxHfov": 120,
            "pitch": 0,
            "yaw": 0,
            "compass": false,
            "orientationOnByDefault": false,
            "strings": {
                "loadButtonLabel": "Haz clic para cargar el recorrido",
                "loadingLabel": "Cargando...",
                "bylineLabel": "Museo Digital"
            },
            // ============================================
            // HOTSPOTS INTERACTIVOS PARA AR
            // ============================================
            "hotSpots": [
                {
                    "pitch": 10,      // Posición elevada para mejor visibilidad
                    "yaw": -30.45,    // Posición horizontal ajustada
                    "type": "custom",
                    "cssClass": "ar-hotspot",
                    "createTooltipFunc": createARHotspot,
                    "clickHandlerFunc": showInfoMessage,
                    "createTooltipArgs": "Palenquera antioqueña"
                }
            ]
        });

        console.log('Visor 360° inicializado correctamente con hotspots AR');
    } catch (error) {
        console.error('Error al inicializar el visor 360°:', error);
        document.getElementById('viewer360').innerHTML =
            '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; color: #666;">' +
            '<p>⚠️ Error al cargar el visor 360°. Verifica que la imagen panorama.jpg existe.</p>' +
            '</div>';
    }
}

// ============================================
// FUNCIONES PARA HOTSPOTS AR
// ============================================

/**
 * Crea el elemento visual del hotspot AR
 */
function createARHotspot(hotSpotDiv, args) {
    hotSpotDiv.classList.add('ar-hotspot-container');

    // Crear el botón del hotspot
    const button = document.createElement('div');
    button.className = 'hotspot-button';

    // Icono
    const icon = document.createElement('span');
    icon.className = 'hotspot-icon';
    icon.innerHTML = '📱';

    // Texto del botón
    const text = document.createElement('span');
    text.className = 'hotspot-text';
    text.textContent = args || 'Ver en AR';

    button.appendChild(icon);
    button.appendChild(text);
    hotSpotDiv.appendChild(button);

    // Agregar efecto hover
    button.addEventListener('mouseenter', function () {
        button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', function () {
        button.style.transform = 'scale(1)';
    });
}

/**
 * Muestra un mensaje informativo cuando se hace clic en el hotspot
 */
function showInfoMessage() {
    console.log('Hotspot informativo clickeado - Mostrando información');

    // Crear overlay oscuro
    const overlay = document.createElement('div');
    overlay.id = 'info-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    // Crear caja de mensaje
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        background: white;
        padding: 2.5rem;
        border-radius: 20px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
        animation: slideUp 0.4s ease;
    `;

    // Título
    const title = document.createElement('h2');
    title.textContent = 'Palenquera antioqueña';
    title.style.cssText = `
        color: #2c3e50;
        font-size: 2rem;
        margin-bottom: 1rem;
        font-weight: 700;
    `;

    // Descripción
    const description = document.createElement('p');
    description.textContent = '¿Deseas ver este objeto en Realidad Aumentada?';
    description.style.cssText = `
        color: #555;
        font-size: 1.1rem;
        margin-bottom: 2rem;
        line-height: 1.6;
    `;

    // Contenedor de botones
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    `;

    // Botón Ver en AR
    const arButton = document.createElement('button');
    arButton.textContent = '📱 Ver en AR';
    arButton.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    `;
    arButton.onmouseover = () => {
        arButton.style.transform = 'translateY(-2px)';
        arButton.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
    };
    arButton.onmouseout = () => {
        arButton.style.transform = 'translateY(0)';
        arButton.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    };
    arButton.onclick = () => {
        document.body.removeChild(overlay);
        // Scroll a la sección AR y activar
        const arContainer = document.getElementById('ar-container');
        arContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => activateAR(), 800);
    };

    // Botón Cerrar
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.style.cssText = `
        background: #e0e0e0;
        color: #555;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    closeButton.onmouseover = () => {
        closeButton.style.background = '#d0d0d0';
        closeButton.style.transform = 'translateY(-2px)';
    };
    closeButton.onmouseout = () => {
        closeButton.style.background = '#e0e0e0';
        closeButton.style.transform = 'translateY(0)';
    };
    closeButton.onclick = () => {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => document.body.removeChild(overlay), 300);
    };

    // Ensamblar elementos
    buttonContainer.appendChild(arButton);
    buttonContainer.appendChild(closeButton);
    messageBox.appendChild(title);
    messageBox.appendChild(description);
    messageBox.appendChild(buttonContainer);
    overlay.appendChild(messageBox);

    // Agregar al DOM
    document.body.appendChild(overlay);

    // Cerrar al hacer clic fuera del mensaje
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => document.body.removeChild(overlay), 300);
        }
    };
}

// ============================================
// CONFIGURACIÓN DE LA EXPERIENCIA AR
// ============================================

let arViewer = null;
let arActive = false;

function initARExperience() {
    const arButton = document.getElementById('ar-button');
    const arViewerElement = document.getElementById('ar-viewer');
    const arPlaceholder = document.getElementById('ar-placeholder');
    const arNotSupported = document.getElementById('ar-not-supported');

    // Verificar si el dispositivo soporta AR
    if (arViewerElement) {
        arViewer = arViewerElement;

        // Detectar si AR está disponible
        arViewer.addEventListener('load', () => {
            console.log('Model Viewer cargado');

            // Verificar capacidades AR
            if (!arViewer.canActivateAR) {
                console.warn('AR no disponible en este dispositivo');
                arNotSupported.style.display = 'block';
            }
        });

        // Evento cuando se activa AR
        arViewer.addEventListener('ar-status', (event) => {
            if (event.detail.status === 'session-started') {
                console.log('Sesión AR iniciada');
                arActive = true;
            } else if (event.detail.status === 'not-presenting') {
                console.log('Sesión AR finalizada');
                arActive = false;
            }
        });
    }

    // Manejar clic en el botón AR
    if (arButton) {
        arButton.addEventListener('click', function () {
            activateAR();
        });
    }
}

function activateAR() {
    const arViewer = document.getElementById('ar-viewer');
    const arPlaceholder = document.getElementById('ar-placeholder');
    const arButton = document.getElementById('ar-button');

    if (!arViewer) {
        console.error('AR Viewer no encontrado');
        return;
    }

    // Verificar si AR está disponible
    if (!arViewer.canActivateAR) {
        alert('Tu dispositivo no soporta AR. Intenta desde un dispositivo móvil compatible (Android con ARCore o iOS con ARKit).');
        document.getElementById('ar-not-supported').style.display = 'block';
        return;
    }

    // Mostrar el visor AR y ocultar el placeholder
    arPlaceholder.style.display = 'none';
    arViewer.style.display = 'block';

    // Cambiar el texto del botón
    arButton.innerHTML = '<span class="ar-icon">✨</span> AR Activado';
    arButton.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';

    // Pequeño delay para asegurar que el elemento esté visible
    setTimeout(() => {
        try {
            // Activar AR
            arViewer.activateAR();
            console.log('Intentando activar AR...');
        } catch (error) {
            console.error('Error al activar AR:', error);
            alert('Error al iniciar AR. Asegúrate de estar en un dispositivo compatible.');
            resetARButton();
        }
    }, 100);

    // Escuchar cuando el usuario salga de AR
    arViewer.addEventListener('ar-status', function (event) {
        if (event.detail.status === 'not-presenting') {
            resetARButton();
        }
    });
}

function resetARButton() {
    const arButton = document.getElementById('ar-button');
    const arViewer = document.getElementById('ar-viewer');
    const arPlaceholder = document.getElementById('ar-placeholder');

    arButton.innerHTML = '<span class="ar-icon">📱</span> Ver en AR';
    arButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

    // Opcional: volver a mostrar el placeholder
    // arViewer.style.display = 'none';
    // arPlaceholder.style.display = 'flex';
}

// ============================================
// OPTIMIZACIONES PARA MÓVILES
// ============================================

// Prevenir zoom en doble tap en iOS
document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Detectar orientación del dispositivo
window.addEventListener('orientationchange', function () {
    console.log('Orientación cambiada');
    // Reajustar el visor si es necesario
    if (viewer360) {
        setTimeout(() => {
            viewer360.resize();
        }, 200);
    }
});

// Manejar cambios de tamaño de ventana
let resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        if (viewer360) {
            viewer360.resize();
        }
    }, 250);
});

// ============================================
// UTILIDADES Y DEBUGGING
// ============================================

// Función para verificar el estado del sistema
function checkSystemStatus() {
    console.log('=== Estado del Sistema ===');
    console.log('Visor 360° inicializado:', viewer360 !== null);
    console.log('AR Viewer disponible:', document.getElementById('ar-viewer') !== null);

    const arViewer = document.getElementById('ar-viewer');
    if (arViewer) {
        console.log('AR soportado:', arViewer.canActivateAR);
    }

    console.log('Ancho de ventana:', window.innerWidth);
    console.log('Alto de ventana:', window.innerHeight);
    console.log('User Agent:', navigator.userAgent);
}

// Llamar al estado del sistema (útil para debugging)
// Descomenta la siguiente línea si necesitas debugging
// setTimeout(checkSystemStatus, 2000);
